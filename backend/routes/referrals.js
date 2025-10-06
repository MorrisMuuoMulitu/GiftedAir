import express from 'express';
import ReferralCode from '../models/ReferralCode.js';
import Referral from '../models/Referral.js';

const router = express.Router();

// Generate a unique referral code
function generateCode(name) {
  const cleanName = name.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 6);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${cleanName}${random}`;
}

// Create/Get referral code for a user
router.post('/create-code', async (req, res) => {
  try {
    const { userId, userName } = req.body;

    // Check if user already has a code
    let existingCode = await ReferralCode.findOne({ userId });
    if (existingCode) {
      return res.json({
        success: true,
        code: existingCode
      });
    }

    // Generate unique code
    let code;
    let isUnique = false;
    while (!isUnique) {
      code = generateCode(userName);
      const existing = await ReferralCode.findOne({ code });
      if (!existing) isUnique = true;
    }

    // Create new code
    const referralCode = await ReferralCode.create({
      code,
      userId,
      userName
    });

    res.json({
      success: true,
      code: referralCode
    });
  } catch (error) {
    console.error('Error creating referral code:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create referral code'
    });
  }
});

// Validate a referral code
router.get('/validate/:code', async (req, res) => {
  try {
    const { code } = req.params;
    
    const referralCode = await ReferralCode.findOne({
      code: code.toUpperCase(),
      active: true,
      $or: [
        { expiresAt: null },
        { expiresAt: { $gt: new Date() } }
      ]
    });

    if (!referralCode) {
      return res.json({
        success: false,
        valid: false,
        message: 'Invalid or expired referral code'
      });
    }

    res.json({
      success: true,
      valid: true,
      code: referralCode,
      discount: referralCode.refereeDiscount
    });
  } catch (error) {
    console.error('Error validating code:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to validate code'
    });
  }
});

// Track a referral (called after successful payment)
router.post('/track', async (req, res) => {
  try {
    const {
      referralCode,
      refereeEmail,
      refereeName,
      giftId,
      giftValue
    } = req.body;

    // Get the referral code
    const code = await ReferralCode.findOne({
      code: referralCode.toUpperCase()
    });

    if (!code) {
      return res.json({
        success: false,
        message: 'Referral code not found'
      });
    }

    // Create referral record
    const referral = await Referral.create({
      referrerId: code.userId,
      referrerName: code.userName,
      referralCode: code.code,
      refereeEmail,
      refereeName,
      giftId,
      giftValue,
      referrerRewardGiven: code.referrerReward,
      refereeDiscountGiven: giftValue * code.refereeDiscount
    });

    // Update code stats
    await ReferralCode.findByIdAndUpdate(code._id, {
      $inc: {
        timesUsed: 1,
        totalRevenue: giftValue
      }
    });

    res.json({
      success: true,
      referral
    });
  } catch (error) {
    console.error('Error tracking referral:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to track referral'
    });
  }
});

// Get user's referral stats
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Get user's code
    const code = await ReferralCode.findOne({ userId });
    
    if (!code) {
      return res.json({
        success: true,
        stats: {
          hasCode: false,
          totalReferrals: 0,
          totalRevenue: 0,
          totalRewards: 0
        }
      });
    }

    // Get all referrals
    const referrals = await Referral.find({
      referrerId: userId
    }).populate('giftId');

    const totalRewards = referrals.reduce((sum, ref) => sum + ref.referrerRewardGiven, 0);

    res.json({
      success: true,
      stats: {
        hasCode: true,
        code: code.code,
        totalReferrals: code.timesUsed,
        totalRevenue: code.totalRevenue,
        totalRewards: totalRewards,
        recentReferrals: referrals.slice(0, 10)
      }
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get stats'
    });
  }
});

// Leaderboard - top referrers
router.get('/leaderboard', async (req, res) => {
  try {
    const topReferrers = await ReferralCode.find({ active: true })
      .sort({ timesUsed: -1 })
      .limit(10)
      .select('userName code timesUsed totalRevenue');

    res.json({
      success: true,
      leaderboard: topReferrers
    });
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get leaderboard'
    });
  }
});

export default router;
