import express from 'express';
import Feedback from '../models/Feedback.js';
import { Resend } from 'resend';

const router = express.Router();

// Lazy-load Resend to ensure env vars are loaded
let resend = null;
function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

// Submit new feedback
router.post('/', async (req, res) => {
  try {
    const { name, email, category, message, rating } = req.body;

    const feedback = new Feedback({
      name,
      email,
      category,
      message,
      rating
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      feedback
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback',
      error: error.message
    });
  }
});

// Get all feedback (admin only)
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .sort({ submittedAt: -1 });

    res.json({
      success: true,
      count: feedback.length,
      feedback
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback',
      error: error.message
    });
  }
});

// Update feedback status (admin only)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { status, adminNotes },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    res.json({
      success: true,
      message: 'Feedback updated successfully',
      feedback
    });
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update feedback',
      error: error.message
    });
  }
});

// Send email response to feedback submitter
router.post('/:id/send-email', async (req, res) => {
  try {
    const { id } = req.params;
    const { emailBody, recipientEmail, recipientName, originalMessage } = req.body;

    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    // Send email via Resend
    const resendClient = getResend();
    if (!resendClient) {
      return res.status(500).json({
        success: false,
        message: 'Email service not configured'
      });
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    
    await resendClient.emails.send({
      from: `Gifted Air Team <${fromEmail}>`,
      to: recipientEmail,
      subject: 'Re: Your Feedback for Gifted Air',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .message-box { background: white; padding: 20px; border-left: 4px solid #9333ea; margin: 20px 0; border-radius: 5px; }
            .footer { text-align: center; color: #666; padding: 20px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💭 Response to Your Feedback</h1>
              <p style="font-size: 18px; margin: 10px 0 0 0;">Gifted Air Team</p>
            </div>
            <div class="content">
              <p style="font-size: 16px; color: #1f2937; margin-bottom: 20px;">
                Hi ${recipientName},
              </p>
              
              <p style="font-size: 16px; color: #1f2937; margin-bottom: 20px;">
                Thank you for your feedback! We appreciate you taking the time to share your thoughts with us.
              </p>

              <div class="message-box">
                <p style="margin: 0; color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Our Response:</p>
                <p style="font-size: 16px; color: #1f2937; margin: 15px 0 0 0; line-height: 1.6; white-space: pre-wrap;">
${emailBody}
                </p>
              </div>

              <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 0; color: #78350f; font-size: 14px;">
                  <strong>Your Original Feedback:</strong>
                </p>
                <p style="margin: 10px 0 0 0; color: #92400e; font-size: 14px; font-style: italic;">
                  "${originalMessage}"
                </p>
              </div>

              <p style="text-align: center; color: #666; margin-top: 30px; font-size: 14px;">
                Have more questions? Just reply to this email!
              </p>
            </div>
            <div class="footer">
              <p>Gifted Air - Climate Love</p>
              <p>Transforming climate action into meaningful gifts</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    // Save the email response to the feedback document
    feedback.emailResponse = emailBody;
    feedback.emailSentAt = new Date();
    feedback.status = 'responded';
    await feedback.save();

    res.json({
      success: true,
      message: 'Email sent successfully',
      feedback
    });
  } catch (error) {
    console.error('Error sending feedback email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
});

export default router;
