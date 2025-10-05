import express from 'express';
import Stripe from 'stripe';

const router = express.Router();

// Lazy-load Stripe to ensure env vars are loaded first
let stripe = null;
function getStripe() {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
}

// Create checkout session
router.post('/create-checkout-session', async (req, res) => {
  const stripeClient = getStripe();
  
  if (!stripeClient) {
    console.log('⚠️  Stripe not configured. STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'PRESENT' : 'MISSING');
    return res.status(500).json({ error: 'Stripe not configured' });
  }

  try {
    const { giftData } = req.body;
    
    if (!giftData || !giftData.type || !giftData.totalCost) {
      return res.status(400).json({ error: 'Invalid gift data' });
    }

    const giftTypeNames = {
      tree: 'Tree Planting',
      cookstove: 'Clean Cookstove',
      solar: 'Solar Panel',
      ocean: 'Ocean Cleanup',
      coral: 'Coral Reef Restoration',
      wildlife: 'Wildlife Conservation',
      water: 'Clean Water Access',
      rainforest: 'Rainforest Protection'
    };

    const giftTypeIcons = {
      tree: '🌳',
      cookstove: '🏡',
      solar: '☀️',
      ocean: '🌊',
      coral: '🪸',
      wildlife: '🦁',
      water: '💧',
      rainforest: '🌴'
    };

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5174';

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${giftTypeIcons[giftData.type]} ${giftTypeNames[giftData.type]}`,
              description: `Gift for ${giftData.recipientName} from ${giftData.senderName} - Quantity: ${giftData.quantity}`,
            },
            unit_amount: Math.round((giftData.totalCost / giftData.quantity) * 100), // Convert to cents
          },
          quantity: giftData.quantity,
        },
      ],
      mode: 'payment',
      success_url: `${frontendUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/compose?canceled=true`,
      metadata: {
        giftType: giftData.type,
        quantity: giftData.quantity.toString(),
        message: giftData.message,
        recipientName: giftData.recipientName,
        recipientEmail: giftData.recipientEmail || '',
        senderName: giftData.senderName,
        location: giftData.location || '',
        totalCost: giftData.totalCost.toString()
      }
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session', details: error.message });
  }
});

// Retrieve session details after successful payment
router.get('/session/:sessionId', async (req, res) => {
  const stripeClient = getStripe();
  
  if (!stripeClient) {
    return res.status(500).json({ error: 'Stripe not configured' });
  }

  try {
    const session = await stripeClient.checkout.sessions.retrieve(req.params.sessionId);
    
    if (session.payment_status === 'paid') {
      res.json({
        success: true,
        metadata: session.metadata,
        customerEmail: session.customer_details?.email
      });
    } else {
      res.json({
        success: false,
        payment_status: session.payment_status
      });
    }
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).json({ error: 'Failed to retrieve session' });
  }
});

// Webhook handler for Stripe events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const stripeClient = getStripe();
  
  if (!stripeClient) {
    return res.status(500).json({ error: 'Stripe not configured' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.log('⚠️  Webhook secret not configured');
    return res.status(400).send('Webhook secret not configured');
  }

  let event;

  try {
    event = stripeClient.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('✅ Payment successful:', session.id);
      // Here you could create the gift automatically
      // or send additional notifications
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

export default router;
