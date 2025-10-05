import express from 'express';
import Gift from '../models/Gift.js';
import { sendThankYouNotification } from '../services/email.js';

const router = express.Router();

// Send thank you note
router.post('/gifts/:id/thank-you', async (req, res) => {
  try {
    const { id } = req.params;
    const { message, recipientName } = req.body;

    if (!message || !recipientName) {
      return res.status(400).json({ error: 'Message and recipient name required' });
    }

    // Find the gift
    const gift = await Gift.findById(id);
    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    // Update gift with thank you note
    gift.thankYouNote = {
      message,
      sentAt: new Date()
    };
    await gift.save();

    // Send email notification to original sender
    const giftUrl = `${process.env.FRONTEND_URL || 'http://localhost:5174'}/gift/${gift._id}`;
    
    await sendThankYouNotification({
      senderEmail: gift.recipientEmail, // Original recipient is now sending thanks
      senderName: recipientName,
      originalSenderName: gift.senderName,
      giftType: gift.type,
      giftQuantity: gift.quantity,
      thankYouMessage: message,
      giftUrl
    });

    res.json({ 
      success: true, 
      message: 'Thank you note sent!',
      thankYouNote: gift.thankYouNote
    });
  } catch (error) {
    console.error('Error sending thank you:', error);
    res.status(500).json({ error: 'Failed to send thank you note' });
  }
});

export default router;
