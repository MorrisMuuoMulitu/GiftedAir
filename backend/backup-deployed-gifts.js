import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Gift from './models/Gift.js';
import { connectDB } from './config/database.js';

dotenv.config();

const DEPLOYED_API_URL = 'https://giftedair-api.onrender.com';

async function backupDeployedGifts() {
  try {
    // Fetch gifts from deployed API
    console.log('📥 Fetching gifts from deployed API...');
    const response = await fetch(`${DEPLOYED_API_URL}/api/gifts`);
    const data = await response.json();
    
    console.log(`Found ${data.gifts.length} gifts in deployed API`);
    
    // Connect to local database
    await connectDB();
    
    // Get existing gifts from local DB to avoid duplicates
    const existingIds = new Set();
    const localGifts = await Gift.find({});
    localGifts.forEach(gift => existingIds.add(gift._id.toString()));
    
    console.log(`Local DB has ${localGifts.length} gifts`);
    
    // Filter out gifts that already exist
    const giftsToAdd = data.gifts.filter(gift => !existingIds.has(gift._id));
    
    if (giftsToAdd.length === 0) {
      console.log('✅ All deployed gifts already exist locally!');
      process.exit(0);
    }
    
    console.log(`📦 Adding ${giftsToAdd.length} new gifts to local DB...`);
    
    // Add gifts to local database
    for (const giftData of giftsToAdd) {
      const gift = new Gift(giftData);
      await gift.save();
      console.log(`  ✓ Added: ${gift.type} - ${gift.senderName} → ${gift.recipientName}`);
    }
    
    // Verify
    const finalCount = await Gift.countDocuments();
    console.log(`\n✅ Success! Total gifts in local DB: ${finalCount}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

backupDeployedGifts();
