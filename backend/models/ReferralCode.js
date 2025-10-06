const mongoose = require('mongoose');

const referralCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  userId: {
    type: String, // Can be email or user ID
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  // Tracking
  timesUsed: {
    type: Number,
    default: 0
  },
  totalRevenue: {
    type: Number,
    default: 0
  },
  // Rewards
  rewardType: {
    type: String,
    enum: ['discount', 'credit', 'both'],
    default: 'both'
  },
  referrerReward: {
    type: Number,
    default: 1 // $1 credit per referral
  },
  refereeDiscount: {
    type: Number,
    default: 0.10 // 10% off for new users
  },
  // Status
  active: {
    type: Boolean,
    default: true
  },
  expiresAt: {
    type: Date,
    default: null // null = never expires
  }
}, {
  timestamps: true
});

// Index for fast lookups
referralCodeSchema.index({ code: 1 });
referralCodeSchema.index({ userId: 1 });

module.exports = mongoose.model('ReferralCode', referralCodeSchema);
