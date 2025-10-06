import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: 'Anonymous'
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: 'not-provided@anonymous.user'
  },
  category: {
    type: String,
    enum: ['general', 'feature_request', 'bug_report', 'business_idea', 'partnership', 'other'],
    default: 'general'
  },
  message: {
    type: String,
    trim: true,
    default: 'No message provided'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  status: {
    type: String,
    enum: ['new', 'read', 'responded', 'archived'],
    default: 'new'
  },
  adminNotes: {
    type: String,
    trim: true
  },
  emailResponse: {
    type: String,
    trim: true
  },
  emailSentAt: {
    type: Date
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes
feedbackSchema.index({ email: 1 });
feedbackSchema.index({ status: 1 });
feedbackSchema.index({ submittedAt: -1 });

export default mongoose.model('Feedback', feedbackSchema);
