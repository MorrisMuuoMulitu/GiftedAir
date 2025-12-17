import express from 'express';
import { getAllGifts } from '../data/storage.js';

const router = express.Router();

// Get BeVisioneers fundraising statistics
router.get('/stats', async (req, res) => {
  try {
    const gifts = await getAllGifts();
    
    const totalValue = gifts.reduce((sum, gift) => sum + (gift.totalCost || 0), 0);
    
    // Calculate BeVisioneers funds (30% of total gift value)
    const beVisioneersFunds = totalValue * 0.3;
    
    // Calculate estimated number of fellows supported based on average fellowship cost
    // Assuming an average fellowship cost of $500
    const averageFellowshipCost = 500;
    const fellowsSupported = Math.floor(beVisioneersFunds / averageFellowshipCost);
    
    const stats = {
      totalGiftValue: totalValue,
      beVisioneersFunds: beVisioneersFunds,
      fellowsSupported: fellowsSupported,
      totalGifts: gifts.length,
      goal: 50000, // Example goal
      progressPercentage: Math.min(100, Math.round((beVisioneersFunds / 50000) * 100)),
      countries: new Set(), // Could be populated from location data if available
      projectsLaunched: Math.floor(fellowsSupported * 0.3) // Assuming 30% of fellows launch projects
    };

    // Extract unique countries from gift locations (if available)
    gifts.forEach(gift => {
      if (gift.location) {
        // Simple extraction of country from location string
        // This would need to be more sophisticated in a real implementation
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
    console.error('Error getting BeVisioneers stats:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get BeVisioneers fundraising statistics' 
    });
  }
});

// Helper function to extract country from location string
function extractCountryFromLocation(location) {
  // Simple implementation - in a real app, you'd want more sophisticated location parsing
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

// Get BeVisioneers fundraising progress
router.get('/progress', async (req, res) => {
  try {
    const gifts = await getAllGifts();
    
    const totalValue = gifts.reduce((sum, gift) => sum + (gift.totalCost || 0), 0);
    const beVisioneersFunds = totalValue * 0.3;
    
    const progress = {
      current: beVisioneersFunds,
      goal: 50000,
      percentage: Math.min(100, Math.round((beVisioneersFunds / 50000) * 100)),
      fundsRaised: beVisioneersFunds,
      fellowsSupported: Math.floor(beVisioneersFunds / 500),
      lastUpdated: new Date().toISOString()
    };

    res.json({
      success: true,
      progress
    });
  } catch (error) {
    console.error('Error getting BeVisioneers progress:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get BeVisioneers fundraising progress' 
    });
  }
});

export default router;