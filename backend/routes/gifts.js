import express from 'express';
import { createGift, getGift, getAllGifts, updateGift } from '../data/storage.js';
import { sendGiftNotification } from '../services/email.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { type, quantity, message, recipientName, recipientEmail, senderName, totalCost, location } = req.body;

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
      recipientEmail: recipientEmail || '',
      senderName,
      totalCost,
      location: location || ''
    });

    const giftUrl = process.env.FRONTEND_URL 
      ? `${process.env.FRONTEND_URL}/gift/${gift._id}`
      : `${req.protocol}://${req.get('host')}/gift/${gift._id}`;

    // Send email notification if recipient email provided
    if (recipientEmail) {
      await sendGiftNotification(gift, giftUrl);
    }

    res.status(201).json({ 
      success: true,
      gift,
      shareUrl: giftUrl,
      emailSent: !!recipientEmail
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
    const updates = req.body;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No updates provided' });
    }

    const gift = await updateGift(req.params.id, updates);

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

// Delete gift endpoint
router.delete('/:id', async (req, res) => {
  try {
    const Gift = (await import('../models/Gift.js')).default;
    const gift = await Gift.findByIdAndDelete(req.params.id);

    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    res.json({ 
      success: true,
      message: 'Gift deleted successfully',
      deletedGift: gift
    });
  } catch (error) {
    console.error('Error deleting gift:', error);
    res.status(500).json({ error: 'Failed to delete gift' });
  }
});

// Bulk operations endpoint
router.post('/bulk/update', async (req, res) => {
  try {
    const { ids, updates } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Gift IDs array is required' });
    }

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'Updates object is required' });
    }

    const Gift = (await import('../models/Gift.js')).default;
    const result = await Gift.updateMany(
      { _id: { $in: ids } },
      { $set: updates }
    );

    res.json({ 
      success: true,
      modifiedCount: result.modifiedCount,
      message: `Updated ${result.modifiedCount} gifts`
    });
  } catch (error) {
    console.error('Error bulk updating gifts:', error);
    res.status(500).json({ error: 'Failed to bulk update gifts' });
  }
});

// Bulk delete endpoint
router.post('/bulk/delete', async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Gift IDs array is required' });
    }

    const Gift = (await import('../models/Gift.js')).default;
    const result = await Gift.deleteMany({ _id: { $in: ids } });

    res.json({ 
      success: true,
      deletedCount: result.deletedCount,
      message: `Deleted ${result.deletedCount} gifts`
    });
  } catch (error) {
    console.error('Error bulk deleting gifts:', error);
    res.status(500).json({ error: 'Failed to bulk delete gifts' });
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

router.get('/stats/summary', async (req, res) => {
  try {
    const gifts = await getAllGifts();
    
    const stats = {
      totalGifts: gifts.length,
      totalValue: 0,
      byType: {
        tree: { count: 0, quantity: 0 },
        cookstove: { count: 0, quantity: 0 },
        solar: { count: 0, quantity: 0 },
        ocean: { count: 0, quantity: 0 }
      },
      impact: {
        treesPlanted: 0,
        co2Absorbed: 0,
        familiesHelped: 0,
        solarPanels: 0,
        plasticRemoved: 0
      }
    };

    gifts.forEach(gift => {
      stats.totalValue += gift.totalCost || 0;
      
      if (stats.byType[gift.type]) {
        stats.byType[gift.type].count += 1;
        stats.byType[gift.type].quantity += gift.quantity;
      }

      switch (gift.type) {
        case 'tree':
          stats.impact.treesPlanted += gift.quantity;
          stats.impact.co2Absorbed += gift.quantity * 48;
          break;
        case 'cookstove':
          stats.impact.familiesHelped += gift.quantity;
          break;
        case 'solar':
          stats.impact.solarPanels += gift.quantity;
          break;
        case 'ocean':
          stats.impact.plasticRemoved += gift.quantity;
          break;
        case 'coral':
          // Coral reef restoration
          break;
        case 'wildlife':
          // Wildlife conservation
          break;
        case 'water':
          // Clean water access
          break;
        case 'rainforest':
          // Rainforest protection
          break;
      }
    });

    res.json({ stats });
  } catch (error) {
    console.error('Error calculating stats:', error);
    res.status(500).json({ error: 'Failed to calculate statistics' });
  }
});

// Get sender impact stats
router.get('/impact/:senderName', async (req, res) => {
  try {
    const senderName = decodeURIComponent(req.params.senderName);
    const gifts = await getAllGifts();
    
    // Filter gifts by sender
    const senderGifts = gifts.filter(g => g.senderName.toLowerCase() === senderName.toLowerCase());
    
    if (senderGifts.length === 0) {
      return res.status(404).json({ error: 'No gifts found for this sender' });
    }
    
    // Calculate stats
    const stats = {
      name: senderGifts[0].senderName,
      totalGifts: senderGifts.length,
      totalValue: 0,
      byType: {
        tree: { count: 0, quantity: 0 },
        cookstove: { count: 0, quantity: 0 },
        solar: { count: 0, quantity: 0 },
        ocean: { count: 0, quantity: 0 }
      },
      impact: {
        treesPlanted: 0,
        co2Absorbed: 0,
        familiesHelped: 0,
        solarPanels: 0,
        plasticRemoved: 0,
        totalImpactScore: 0
      },
      recipients: [],
      locations: new Set(),
      firstGift: senderGifts[0].createdAt,
      lastGift: senderGifts[0].createdAt
    };
    
    senderGifts.forEach(gift => {
      stats.totalValue += gift.totalCost;
      stats.byType[gift.type].count++;
      stats.byType[gift.type].quantity += gift.quantity;
      stats.recipients.push(gift.recipientName);
      
      if (gift.location) stats.locations.add(gift.location);
      
      const giftDate = new Date(gift.createdAt);
      if (giftDate < new Date(stats.firstGift)) stats.firstGift = gift.createdAt;
      if (giftDate > new Date(stats.lastGift)) stats.lastGift = gift.createdAt;
      
      switch (gift.type) {
        case 'tree':
          stats.impact.treesPlanted += gift.quantity;
          stats.impact.co2Absorbed += gift.quantity * 48;
          stats.impact.totalImpactScore += gift.quantity * 48;
          break;
        case 'cookstove':
          stats.impact.familiesHelped += gift.quantity;
          stats.impact.totalImpactScore += gift.quantity * 100;
          break;
        case 'solar':
          stats.impact.solarPanels += gift.quantity;
          stats.impact.totalImpactScore += gift.quantity * 300;
          break;
        case 'ocean':
          stats.impact.plasticRemoved += gift.quantity;
          stats.impact.totalImpactScore += gift.quantity * 50;
          break;
        case 'coral':
          stats.impact.totalImpactScore += gift.quantity * 60;
          break;
        case 'wildlife':
          stats.impact.totalImpactScore += gift.quantity * 80;
          break;
        case 'water':
          stats.impact.totalImpactScore += gift.quantity * 40;
          break;
        case 'rainforest':
          stats.impact.totalImpactScore += gift.quantity * 70;
          break;
      }
    });
    
    stats.locations = Array.from(stats.locations);
    stats.uniqueRecipients = [...new Set(stats.recipients)].length;
    
    res.json({ stats, gifts: senderGifts });
  } catch (error) {
    console.error('Error getting sender impact:', error);
    res.status(500).json({ error: 'Failed to get sender impact' });
  }
});

router.get('/leaderboard/top', async (req, res) => {
  try {
    const gifts = await getAllGifts();
    
    // Aggregate by sender
    const senderStats = {};
    
    gifts.forEach(gift => {
      const sender = gift.senderName;
      if (!senderStats[sender]) {
        senderStats[sender] = {
          name: sender,
          totalGifts: 0,
          totalValue: 0,
          totalTrees: 0,
          totalImpact: 0,
          location: gift.location || '',
          lastGiftDate: gift.createdAt
        };
      }
      
      senderStats[sender].totalGifts++;
      senderStats[sender].totalValue += gift.totalCost;
      
      // Track most recent gift
      if (new Date(gift.createdAt) > new Date(senderStats[sender].lastGiftDate)) {
        senderStats[sender].lastGiftDate = gift.createdAt;
        senderStats[sender].location = gift.location || senderStats[sender].location;
      }
      
      // Calculate impact
      switch (gift.type) {
        case 'tree':
          senderStats[sender].totalTrees += gift.quantity;
          senderStats[sender].totalImpact += gift.quantity * 48; // CO2
          break;
        case 'cookstove':
          senderStats[sender].totalImpact += gift.quantity * 100; // Families * weight
          break;
        case 'solar':
          senderStats[sender].totalImpact += gift.quantity * 300; // Watts
          break;
        case 'ocean':
          senderStats[sender].totalImpact += gift.quantity * 50; // Kg plastic * weight
          break;
        case 'coral':
          senderStats[sender].totalImpact += gift.quantity * 60; // Coral fragments
          break;
        case 'wildlife':
          senderStats[sender].totalImpact += gift.quantity * 80; // Animals protected
          break;
        case 'water':
          senderStats[sender].totalImpact += gift.quantity * 40; // People with clean water
          break;
        case 'rainforest':
          senderStats[sender].totalImpact += gift.quantity * 70; // Acres protected
          break;
      }
    });
    
    // Convert to array and sort
    const leaderboard = Object.values(senderStats)
      .sort((a, b) => b.totalImpact - a.totalImpact)
      .map((sender, index) => ({
        ...sender,
        rank: index + 1,
        badge: index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : null
      }));
    
    res.json({ leaderboard });
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    res.status(500).json({ error: 'Failed to get leaderboard' });
  }
});

export default router;
