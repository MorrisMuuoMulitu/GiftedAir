import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import giftRoutes from './routes/gifts.js';
import paymentRoutes from './routes/payments.js';
import thankYouRoutes from './routes/thankYou.js';
import bulkOrderHelper from './routes/bulkOrderHelper.js';
import referralRoutes from './routes/referrals.js';
import partnerApplicationRoutes from './routes/partnerApplications.js';
import feedbackRoutes from './routes/feedback.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Stripe webhook needs raw body, so we add it before express.json()
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: '🌿 Gifted Air API',
    version: '1.0.0',
    endpoints: {
      gifts: '/api/gifts',
      payments: '/api/payments'
    }
  });
});

app.use('/api/gifts', giftRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api', thankYouRoutes);
app.use('/api/bulk-helper', bulkOrderHelper);
app.use('/api/referrals', referralRoutes);
app.use('/api/partner-applications', partnerApplicationRoutes);
app.use('/api/feedback', feedbackRoutes);

async function startServer() {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`🌍 Gifted Air API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
