import mongoose from 'mongoose';

const giftSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['tree', 'cookstove', 'solar', 'ocean']
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  recipientName: {
    type: String,
    required: true,
    trim: true
  },
  recipientEmail: {
    type: String,
    trim: true,
    lowercase: true,
    default: ''
  },
  senderName: {
    type: String,
    required: true,
    trim: true
  },
  totalCost: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    trim: true,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

giftSchema.index({ createdAt: -1 });

const Gift = mongoose.model('Gift', giftSchema);

export default Gift;
