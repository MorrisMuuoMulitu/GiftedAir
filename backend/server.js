import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import giftRoutes from './routes/gifts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: '🌿 Gifted Air API',
    version: '1.0.0',
    endpoints: {
      gifts: '/api/gifts'
    }
  });
});

app.use('/api/gifts', giftRoutes);

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
