import express from 'express';
import PartnerApplication from '../models/PartnerApplication.js';

const router = express.Router();

// Submit a new partner application
router.post('/', async (req, res) => {
  try {
    const application = new PartnerApplication({
      ...req.body,
      status: 'pending',
      submittedAt: new Date()
    });

    await application.save();

    res.status(201).json({
      success: true,
      message: 'Partner application submitted successfully',
      applicationId: application._id
    });
  } catch (error) {
    console.error('Error submitting partner application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message
    });
  }
});

// Get all partner applications (admin only - you can add auth middleware later)
router.get('/', async (req, res) => {
  try {
    const applications = await PartnerApplication.find()
      .sort({ submittedAt: -1 });

    res.json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    console.error('Error fetching partner applications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message
    });
  }
});

// Get a single partner application by ID
router.get('/:id', async (req, res) => {
  try {
    const application = await PartnerApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      application
    });
  } catch (error) {
    console.error('Error fetching partner application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application',
      error: error.message
    });
  }
});

// Update application status (admin only)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, notes } = req.body;

    const application = await PartnerApplication.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        reviewNotes: notes,
        reviewedAt: new Date()
      },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      message: 'Application status updated',
      application
    });
  } catch (error) {
    console.error('Error updating partner application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update application',
      error: error.message
    });
  }
});

export default router;
