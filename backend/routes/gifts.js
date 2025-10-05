import express from 'express';
import { createGift, getGift, getAllGifts, updateGift } from '../data/storage.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { type, quantity, message, recipientName, senderName, totalCost } = req.body;

    if (!type || !quantity || !message || !recipientName || !senderName) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['type', 'quantity', 'message', 'recipientName', 'senderName']
      });
    }

    const gift = await createGift({
      type,
      quantity,
      message,
      recipientName,
      senderName,
      totalCost
    });

    res.status(201).json({ 
      success: true,
      gift,
      shareUrl: `${req.protocol}://${req.get('host')}/gift/${gift._id}`
    });
  } catch (error) {
    console.error('Error creating gift:', error);
    res.status(500).json({ error: 'Failed to create gift' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const gift = await getGift(req.params.id);
    
    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    res.json({ gift });
  } catch (error) {
    console.error('Error retrieving gift:', error);
    res.status(500).json({ error: 'Failed to retrieve gift' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const gift = await updateGift(req.params.id, { message });

    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    res.json({ 
      success: true,
      gift 
    });
  } catch (error) {
    console.error('Error updating gift:', error);
    res.status(500).json({ error: 'Failed to update gift' });
  }
});

router.get('/', async (req, res) => {
  try {
    const gifts = await getAllGifts();
    res.json({ 
      gifts,
      count: gifts.length
    });
  } catch (error) {
    console.error('Error retrieving gifts:', error);
    res.status(500).json({ error: 'Failed to retrieve gifts' });
  }
});

export default router;
