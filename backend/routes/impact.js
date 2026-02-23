import express from 'express';
import { getAllGifts } from '../data/storage.js';

const router = express.Router();

// Get environmental impact statistics
router.get('/stats', async (req, res) => {
  try {
    const gifts = await getAllGifts();
    
    const totalValue = gifts.reduce((sum, gift) => sum + (gift.totalCost || 0), 0);
    
    // Calculate Environmental funds (70% of total gift value)
    const environmentalFunds = totalValue * 0.7;
    
    const stats = {
      totalGiftValue: totalValue,
      environmentalFunds: environmentalFunds,
      totalGifts: gifts.length,
      goal: 100000, // Example goal for environmental impact
      progressPercentage: Math.min(100, Math.round((environmentalFunds / 100000) * 100)),
      countries: new Set(),
      treesPlanted: Math.floor(environmentalFunds / 1) // Assuming $1 per tree
    };

    // Extract unique countries from gift locations
    gifts.forEach(gift => {
      if (gift.location) {
        const country = extractCountryFromLocation(gift.location);
        if (country) {
          stats.countries.add(country);
        }
      }
    });

    stats.countries = Array.from(stats.countries);

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error getting impact stats:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get environmental impact statistics' 
    });
  }
});

// Helper function to extract country from location string
function extractCountryFromLocation(location) {
  const countries = [
    'Kenya', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 
    'Japan', 'China', 'India', 'Brazil', 'Mexico', 'South Africa'
  ];
  
  for (const country of countries) {
    if (location.toLowerCase().includes(country.toLowerCase())) {
      return country;
    }
  }
  
  return null;
}

// Get environmental impact progress
router.get('/progress', async (req, res) => {
  try {
    const gifts = await getAllGifts();
    
    const totalValue = gifts.reduce((sum, gift) => sum + (gift.totalCost || 0), 0);
    const environmentalFunds = totalValue * 0.7;
    
    const progress = {
      current: environmentalFunds,
      goal: 100000,
      percentage: Math.min(100, Math.round((environmentalFunds / 100000) * 100)),
      fundsRaised: environmentalFunds,
      treesPlanted: Math.floor(environmentalFunds / 1),
      lastUpdated: new Date().toISOString()
    };

    res.json({
      success: true,
      progress
    });
  } catch (error) {
    console.error('Error getting impact progress:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get environmental impact progress' 
    });
  }
});

export default router;
