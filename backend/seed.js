import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Gift from './models/Gift.js';
import { connectDB } from './config/database.js';

dotenv.config();

const sampleGifts = [
  {
    type: 'tree',
    quantity: 50,
    message: 'Planting seeds of hope for a greener future. May these trees stand tall as a testament to our love for this planet.',
    recipientName: 'Sarah Johnson',
    senderName: 'Michael Chen',
    totalCost: 250,
    location: 'Kenya Mangrove Restoration',
    status: 'sent',
    showInGallery: true
  },
  {
    type: 'cookstove',
    quantity: 5,
    message: 'Clean cooking for a healthier tomorrow. This gift reduces smoke, saves time, and protects our shared atmosphere.',
    recipientName: 'David Okonkwo',
    senderName: 'Emma Williams',
    totalCost: 25,
    location: 'Uplift Her Kenya',
    status: 'sent',
    showInGallery: true
  },
  {
    type: 'solar',
    quantity: 10,
    message: 'Bringing light to those who need it most. Solar energy is the future, and you are making it happen today.',
    recipientName: 'Fatima Hassan',
    senderName: 'James Rodriguez',
    totalCost: 50,
    location: 'Kaiti Greening Champions',
    status: 'sent',
    showInGallery: true
  },
  {
    type: 'ocean',
    quantity: 25,
    message: 'Every kilogram of plastic removed is a victory for our oceans. Thank you for being a guardian of the seas.',
    recipientName: 'Ocean Conservation Project',
    senderName: 'Lisa Park',
    totalCost: 125,
    location: 'Coastal Kenya',
    status: 'sent',
    showInGallery: true
  },
  {
    type: 'tree',
    quantity: 100,
    message: 'A century of trees for a century of hope. This forest will breathe life into the land for generations to come.',
    recipientName: 'Kaiti Community',
    senderName: 'Robert Taylor',
    totalCost: 500,
    location: 'Kaiti Greening',
    status: 'sent',
    showInGallery: true
  },
  {
    type: 'wildlife',
    quantity: 20,
    message: 'Protecting the magnificent creatures that call Earth home. Your gift safeguards biodiversity and wild spaces.',
    recipientName: 'Wildlife Conservation Trust',
    senderName: 'Anna Martinez',
    totalCost: 100,
    location: 'Maasai Mara Region',
    status: 'sent',
    showInGallery: true
  },
  {
    type: 'water',
    quantity: 15,
    message: 'Clean water is life. Your gift brings health, dignity, and hope to families who need it most.',
    recipientName: 'Community Water Project',
    senderName: 'Thomas Anderson',
    totalCost: 75,
    location: 'Rural Kenya',
    status: 'sent',
    showInGallery: true
  },
  {
    type: 'rainforest',
    quantity: 75,
    message: 'The lungs of our planet need protection. This gift helps preserve the incredible biodiversity of the rainforest.',
    recipientName: 'Rainforest Alliance',
    senderName: 'Maria Santos',
    totalCost: 375,
    location: 'Amazon Basin',
    status: 'sent',
    showInGallery: true
  },
  {
    type: 'coral',
    quantity: 30,
    message: 'Rebuilding the underwater gardens that sustain marine life. Your gift brings color and life back to our reefs.',
    recipientName: 'Coral Restoration Foundation',
    senderName: 'Kevin Brown',
    totalCost: 150,
    location: 'Indian Ocean',
    status: 'sent',
    showInGallery: true
  },
  {
    type: 'tree',
    quantity: 200,
    message: 'A legacy gift for future generations. These trees will stand as monuments to climate love and action.',
    recipientName: 'beVisioneers Kenya',
    senderName: 'Jennifer Lee',
    totalCost: 1000,
    location: 'Nairobi Region',
    status: 'sent',
    showInGallery: true
  }
];

async function seedDatabase() {
  try {
    await connectDB();
    
    // Clear existing gifts
    await Gift.deleteMany({});
    console.log('🗑️  Cleared existing gifts');
    
    // Insert sample gifts
    const inserted = await Gift.insertMany(sampleGifts);
    console.log(`✅ Seeded ${inserted.length} gifts to database`);
    
    // Verify
    const count = await Gift.countDocuments();
    console.log(`📊 Total gifts in database: ${count}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seedDatabase();
