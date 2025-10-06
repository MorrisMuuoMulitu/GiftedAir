import mongoose from 'mongoose';

const bulkOrderSchema = new mongoose.Schema({
  giftType: {
    type: String,
    required: true,
    enum: ['tree', 'cookstove', 'solar', 'ocean', 'coral', 'wildlife', 'water', 'rainforest']
  },
  quantity: {
    type: Number,
    required: true,
    min: 10
  },
  senderName: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  recipientMode: {
    type: String,
    enum: ['csv', 'manual', 'same'],
    required: true
  },
  recipients: [{
    name: String,
    email: String
  }],
  basePrice: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  totalPrice: {
    type: Number,
    required: true
  },
  stripeSessionId: {
    type: String
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  giftIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gift'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const BulkOrder = mongoose.model('BulkOrder', bulkOrderSchema);

export default BulkOrder;
