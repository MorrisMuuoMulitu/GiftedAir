const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  // Who referred
  referrerId: {
    type: String,
    required: true
  },
  referrerName: {
    type: String,
    required: true
  },
  referralCode: {
    type: String,
    required: true
  },
  
  // Who was referred
  refereeEmail: {
    type: String,
    required: true
  },
  refereeName: {
    type: String
  },
  
  // What they did
  giftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gift'
  },
  giftValue: {
    type: Number,
    required: true
  },
  
  // Rewards given
  referrerRewardGiven: {
    type: Number,
    default: 0
  },
  refereeDiscountGiven: {
    type: Number,
    default: 0
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'completed', 'rewarded'],
    default: 'completed'
  },
  rewardPaidAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
referralSchema.index({ referrerId: 1 });
referralSchema.index({ refereeEmail: 1 });
referralSchema.index({ referralCode: 1 });

module.exports = mongoose.model('Referral', referralSchema);
