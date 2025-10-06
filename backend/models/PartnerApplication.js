import mongoose from 'mongoose';

const partnerApplicationSchema = new mongoose.Schema({
  // Organization Information
  organizationName: {
    type: String,
    required: true,
    trim: true
  },
  contactPerson: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  organizationType: {
    type: String,
    required: true,
    enum: ['NGO', 'CBO', 'Social Enterprise', 'Registered Charity', 'Other']
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  focusArea: {
    type: String,
    required: true,
    enum: [
      'Reforestation',
      'Wildlife Conservation',
      'Clean Energy',
      'Water',
      'Agriculture',
      'Ocean',
      'Climate Education',
      'Other'
    ]
  },
  description: {
    type: String,
    required: true
  },
  currentFunding: {
    type: String,
    enum: ['<100k', '100k-500k', '500k-1M', '1M-5M', '5M+', '']
  },
  teamSize: {
    type: String,
    trim: true
  },
  registrationNumber: {
    type: String,
    trim: true
  },
  yearsOfOperation: {
    type: Number
  },
  socialMediaLinks: {
    type: String,
    trim: true
  },
  whyPartner: {
    type: String,
    required: true
  },
  
  // Application Status
  status: {
    type: String,
    enum: ['pending', 'under_review', 'approved', 'rejected'],
    default: 'pending'
  },
  
  // Timestamps
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  
  // Admin Notes
  reviewNotes: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes
partnerApplicationSchema.index({ email: 1 });
partnerApplicationSchema.index({ status: 1 });
partnerApplicationSchema.index({ submittedAt: -1 });

export default mongoose.model('PartnerApplication', partnerApplicationSchema);
