import express from 'express';
import Stripe from 'stripe';
import Gift from '../models/Gift.js';
import BulkOrder from '../models/BulkOrder.js';
import { sendGiftNotification } from '../services/email.js';

const router = express.Router();

// Lazy-load Stripe to ensure env vars are loaded first
let stripe = null;
function getStripe() {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
}

// Helper function to truncate metadata values to 500 characters maximum
const truncateMetadataValue = (value) => {
  if (!value || typeof value !== 'string') {
    return value?.toString() || '';
  }
  return value.length > 500 ? value.substring(0, 500) : value;
};

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
        giftType: truncateMetadataValue(giftData.type),
        quantity: truncateMetadataValue(giftData.quantity.toString()),
        message: truncateMetadataValue(giftData.message),
        recipientName: truncateMetadataValue(giftData.recipientName),
        recipientEmail: truncateMetadataValue(giftData.recipientEmail || ''),
        senderName: truncateMetadataValue(giftData.senderName),
        location: truncateMetadataValue(giftData.location || ''),
        totalCost: truncateMetadataValue(giftData.totalCost.toString())
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
      
      // Check if this is a bulk order
      if (session.metadata && session.metadata.type === 'bulk_order') {
        try {
          const bulkOrder = await BulkOrder.findById(session.metadata.bulkOrderId);
          
          if (bulkOrder) {
            bulkOrder.paymentStatus = 'paid';
            
            const giftTypePrices = {
              tree: 1, ocean: 2, water: 3, cookstove: 5, coral: 5,
              rainforest: 7, wildlife: 8, solar: 10
            };
            
            const pricePerGift = giftTypePrices[bulkOrder.giftType];
            const giftIds = [];
            
            // Create individual gifts
            if (bulkOrder.recipientMode === 'same') {
              // Create identical gifts
              for (let i = 0; i < bulkOrder.quantity; i++) {
                const gift = new Gift({
                  type: bulkOrder.giftType,
                  quantity: 1,
                  message: bulkOrder.message,
                  recipientName: `Recipient ${i + 1}`,
                  recipientEmail: '',
                  senderName: bulkOrder.senderName,
                  totalCost: pricePerGift,
                  status: 'sent',
                  showInGallery: false // Bulk gifts private by default
                });
                await gift.save();
                giftIds.push(gift._id);
              }
            } else {
              // Create personalized gifts
              for (const recipient of bulkOrder.recipients) {
                const gift = new Gift({
                  type: bulkOrder.giftType,
                  quantity: 1,
                  message: bulkOrder.message,
                  recipientName: recipient.name || 'Guest',
                  recipientEmail: recipient.email || '',
                  senderName: bulkOrder.senderName,
                  totalCost: pricePerGift,
                  status: 'sent',
                  showInGallery: false
                });
                await gift.save();
                giftIds.push(gift._id);
                
                // Send email if recipient has email
                if (recipient.email) {
                  const giftUrl = `${process.env.FRONTEND_URL || 'http://localhost:5174'}/gift/${gift._id}`;
                  await sendGiftNotification(gift, giftUrl);
                }
              }
            }
            
            bulkOrder.giftIds = giftIds;
            await bulkOrder.save();
            
            console.log(`✅ Created ${giftIds.length} gifts for bulk order ${bulkOrder._id}`);
          }
        } catch (error) {
          console.error('Error processing bulk order webhook:', error);
        }
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// Bulk checkout session
router.post('/bulk-checkout', async (req, res) => {
  const stripeClient = getStripe();
  
  if (!stripeClient) {
    return res.status(500).json({ error: 'Stripe not configured' });
  }

  try {
    const { giftType, quantity, senderName, recipientMode, recipients, message, basePrice, discount, totalPrice } = req.body;
    
    if (!giftType || !quantity || quantity < 10) {
      return res.status(400).json({ error: 'Invalid bulk order data' });
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

    const giftTypePrices = {
      tree: 1,
      ocean: 2,
      water: 3,
      cookstove: 5,
      coral: 5,
      rainforest: 7,
      wildlife: 8,
      solar: 10
    };

    // Create bulk order record
    const bulkOrder = new BulkOrder({
      giftType,
      quantity,
      senderName,
      message,
      recipientMode,
      recipients: recipients || [],
      basePrice,
      discount,
      totalPrice,
      paymentStatus: 'pending'
    });
    
    await bulkOrder.save();

    // Create Stripe session
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `🎁 Bulk Order: ${quantity}x ${giftTypeNames[giftType]}`,
              description: `${discount}% volume discount applied • From: ${senderName}`,
            },
            unit_amount: Math.round(totalPrice * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5174'}/payment/bulk-success?session_id={CHECKOUT_SESSION_ID}&bulk_order_id=${bulkOrder._id}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5174'}/bulk`,
      metadata: {
        bulkOrderId: truncateMetadataValue(bulkOrder._id.toString()),
        giftType: truncateMetadataValue(giftType),
        quantity: truncateMetadataValue(quantity.toString()),
        type: truncateMetadataValue('bulk_order')
      }
    });

    bulkOrder.stripeSessionId = session.id;
    await bulkOrder.save();

    res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Bulk checkout error:', error);
    res.status(500).json({ error: 'Failed to create bulk checkout session' });
  }
});

// Get bulk order details
router.get('/bulk-order/:bulkOrderId', async (req, res) => {
  try {
    const bulkOrder = await BulkOrder.findById(req.params.bulkOrderId).populate('giftIds');
    
    if (!bulkOrder) {
      return res.status(404).json({ error: 'Bulk order not found' });
    }

    const gifts = await Gift.find({ _id: { $in: bulkOrder.giftIds } });

    res.json({ bulkOrder, gifts });
  } catch (error) {
    console.error('Error fetching bulk order:', error);
    res.status(500).json({ error: 'Failed to fetch bulk order' });
  }
});

export default router;
