import express from 'express';
import BulkOrder from '../models/BulkOrder.js';
import Gift from '../models/Gift.js';
import { sendGiftNotification } from '../services/email.js';

const router = express.Router();

// Manually process bulk order (for testing without webhooks)
router.post('/process/:bulkOrderId', async (req, res) => {
  try {
    const bulkOrder = await BulkOrder.findById(req.params.bulkOrderId);
    
    if (!bulkOrder) {
      return res.status(404).json({ error: 'Bulk order not found' });
    }
    
    if (bulkOrder.paymentStatus === 'paid' && bulkOrder.giftIds.length > 0) {
      return res.json({ 
        success: true, 
        message: 'Already processed', 
        giftCount: bulkOrder.giftIds.length 
      });
    }
    
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
          showInGallery: false
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
    
    res.json({ 
      success: true, 
      message: `Created ${giftIds.length} gifts`, 
      giftCount: giftIds.length 
    });
  } catch (error) {
    console.error('Error processing bulk order:', error);
    res.status(500).json({ error: 'Failed to process bulk order' });
  }
});

export default router;
