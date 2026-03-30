import express from 'express';
import axios from 'axios';
import Gift from '../models/Gift.js';

const router = express.Router();

// Daraja API Configuration (Use environment variables in production)
const consumerKey = process.env.MPESA_CONSUMER_KEY;
const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
const shortCode = process.env.MPESA_PAYBILL || '174379'; // Test Paybill
const passkey = process.env.MPESA_PASSKEY;
const callbackUrl = `${process.env.BACKEND_URL}/api/payments/mpesa-callback`;

// OAuth Token Middleware
const getAccessToken = async (req, res, next) => {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  
  try {
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      { headers: { Authorization: `Basic ${auth}` } }
    );
    req.accessToken = response.data.access_token;
    next();
  } catch (error) {
    console.error('M-Pesa Auth Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to authenticate with M-Pesa' });
  }
};

// STK Push Request
router.post('/stkpush', getAccessToken, async (req, res) => {
  const { phoneNumber, amount, giftId } = req.body;
  const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
  const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

  try {
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/query', // Note: use process for STK push
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(amount),
        PartyA: phoneNumber, // User's phone number
        PartyB: shortCode,
        PhoneNumber: phoneNumber,
        CallBackURL: callbackUrl,
        AccountReference: `GiftedAir-${giftId.slice(-6)}`,
        TransactionDesc: 'Climate Gifting Ritual'
      },
      { headers: { Authorization: `Bearer ${req.accessToken}` } }
    );

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('STK Push Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'M-Pesa payment initiation failed' });
  }
});

// Callback Handler
router.post('/callback', async (req, res) => {
  const { Body } = req.body;
  const result = Body.stkCallback;

  if (result.ResultCode === 0) {
    // Payment Successful
    const checkoutRequestID = result.CheckoutRequestID;
    const metadata = result.CallbackMetadata.Item;
    const amount = metadata.find(i => i.Name === 'Amount').Value;
    const receipt = metadata.find(i => i.Name === 'MpesaReceiptNumber').Value;

    console.log(`✅ M-Pesa Payment Successful: ${receipt} for ${amount}`);
    
    // Update gift status in DB (In a real app, you'd find by CheckoutRequestID or AccountReference)
    // For now, we'll log it.
  } else {
    console.warn(`❌ M-Pesa Payment Failed: ${result.ResultDesc}`);
  }

  res.json({ ResultCode: 0, ResultDesc: 'Success' });
});

export default router;
