# 💳 Stripe Payment Setup Guide

## ✅ What's Already Built

- ✅ Stripe SDK installed in backend
- ✅ Payment routes created (`/api/payments`)
- ✅ Checkout session creation endpoint
- ✅ Payment success page with gift creation
- ✅ Beautiful payment flow integrated
- ✅ Webhook handler for payment events
- ✅ Compose form updated with checkout button

---

## 🚀 Setup Instructions (10 Minutes)

### Step 1: Create Stripe Account

1. Go to: **https://dashboard.stripe.com/register**
2. Sign up for a free account
3. Complete email verification
4. You'll start in **Test Mode** (perfect for development!)

---

### Step 2: Get Your API Keys

1. In Stripe dashboard, click **"Developers"** in the left sidebar
2. Click **"API keys"**
3. You'll see two keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (click "Reveal test key" - starts with `sk_test_`)

4. Copy the **Secret Key** (sk_test_...)

---

### Step 3: Configure Backend

**Local Development:**

1. Open `/backend/.env`
2. Replace the placeholder:
   ```bash
   STRIPE_SECRET_KEY=sk_test_your_actual_key_here
   ```

**Production (Render):**

1. Go to https://dashboard.render.com/
2. Select your backend service
3. Go to **Environment** tab
4. Add environment variable:
   ```
   STRIPE_SECRET_KEY=sk_test_your_actual_key_here
   FRONTEND_URL=https://gifted-air.vercel.app
   ```
5. Click **"Save Changes"**
6. Wait for auto-redeploy (~5 min)

---

### Step 4: Test the Payment Flow

**Local Testing:**

1. Start backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Start frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Go to http://localhost:5174/compose

4. Fill out the gift form

5. Click **"Proceed to Payment"**

6. You'll be redirected to Stripe Checkout!

7. **Use Test Cards:**
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/34`)
   - CVC: Any 3 digits (e.g., `123`)
   - ZIP: Any 5 digits (e.g., `12345`)

8. Complete payment

9. You'll be redirected back to success page!

10. Gift is automatically created ✅

---

## 💳 Stripe Test Cards

### Successful Payments:
- **4242 4242 4242 4242** - Visa (succeeds)
- **5555 5555 5555 4444** - Mastercard (succeeds)
- **3782 822463 10005** - American Express (succeeds)

### Failed Payments (for testing errors):
- **4000 0000 0000 0002** - Card declined
- **4000 0000 0000 9995** - Insufficient funds
- **4000 0000 0000 0069** - Expired card

**For all cards:**
- Expiry: Any future date
- CVC: Any 3 digits (4 for Amex)
- ZIP: Any 5 digits

---

## 🎯 Payment Flow

```
User fills out gift form
         ↓
Clicks "Proceed to Payment"
         ↓
Backend creates Stripe Checkout session
         ↓
User redirected to Stripe (secure payment page)
         ↓
User enters card details
         ↓
Stripe processes payment
         ↓
User redirected to success page
         ↓
Gift automatically created in database
         ↓
Email notification sent (if email provided)
         ↓
Done! 🎉
```

---

## 🔧 Webhook Setup (Optional - For Production)

Webhooks notify your backend when payments succeed/fail.

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click **"Add endpoint"**
3. Enter your endpoint URL:
   ```
   https://your-backend.onrender.com/api/payments/webhook
   ```
4. Select events to listen to:
   - `checkout.session.completed`
5. Click **"Add endpoint"**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add to environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
   ```

**Note:** Webhooks aren't required for basic functionality but are recommended for production!

---

## 💰 Pricing on Stripe

**Your Cut:**
- Set your prices in the Compose form
- Currently: Trees ($5), Cookstoves ($25), Solar ($50), Ocean ($15)

**Stripe Fees:**
- 2.9% + $0.30 per successful charge
- Example: $50 gift = $1.75 fee, you get $48.25

**Payout Schedule:**
- Test mode: No real money
- Live mode: Automatic payouts to your bank account
  - Daily, weekly, or monthly (you choose)
  - First payout: 7-14 days after first payment

---

## 🎨 Features Included

✅ **Secure Checkout** - Stripe-hosted payment page  
✅ **Multiple Payment Methods** - Credit cards, Apple Pay, Google Pay  
✅ **Mobile Responsive** - Works perfectly on all devices  
✅ **Currency Support** - USD (can add more)  
✅ **Tax Calculation** - Can be enabled in Stripe settings  
✅ **Receipt Emails** - Stripe automatically sends receipts  
✅ **Payment Success Page** - Beautiful confirmation  
✅ **Error Handling** - Graceful failures with retry option  

---

## 🔐 Security

- ✅ **PCI Compliant** - Stripe handles all card data
- ✅ **No card data on your server** - Stripe handles everything
- ✅ **3D Secure** - Automatic fraud protection
- ✅ **Encrypted** - All data encrypted in transit

**You never touch card numbers!** Stripe handles all sensitive data.

---

## 🚀 Going Live (When Ready)

### Switch to Live Mode:

1. In Stripe Dashboard, toggle **"Test mode"** OFF
2. Get your **Live API keys** (starts with `pk_live_` and `sk_live_`)
3. Complete Stripe account verification:
   - Business details
   - Bank account for payouts
   - Tax information
4. Update environment variables with live keys
5. Test one more time with a real card (small amount)
6. You're live! 🎉

---

## 📊 Monitor Payments

**Stripe Dashboard shows:**
- ✅ All payments (succeeded/failed)
- ✅ Revenue graphs
- ✅ Customer details
- ✅ Payout schedule
- ✅ Disputes/Chargebacks
- ✅ Export to CSV

Access: https://dashboard.stripe.com/payments

---

## 🆘 Troubleshooting

### "Stripe not configured" error
- Check API key is in `.env`
- Make sure key starts with `sk_test_`
- Restart backend server

### Payment succeeds but gift not created
- Check backend logs
- Verify `/payment/success` route works
- Check MongoDB connection

### Redirect loops after payment
- Verify `FRONTEND_URL` in backend `.env`
- Check success URL in checkout session

### Webhook signature verification failed
- Verify `STRIPE_WEBHOOK_SECRET` is correct
- Check webhook endpoint URL matches

---

## 💡 Tips

1. **Start in Test Mode** - Perfect your flow before going live
2. **Test Failed Payments** - Use test cards that decline
3. **Monitor Dashboard** - Check payments in real-time
4. **Set Up Webhooks** - For production reliability
5. **Enable Fraud Protection** - In Stripe Radar settings

---

## 📈 Next Steps After Setup

1. ✅ Test with test cards
2. ✅ Verify success page works
3. ✅ Check emails are sent
4. ✅ Test on mobile
5. ✅ Complete Stripe verification
6. ✅ Switch to live mode
7. ✅ Process your first real payment! 💰

---

**Ready to accept payments and monetize your climate gifts!** 💳💚

Questions? Check [Stripe Documentation](https://stripe.com/docs)

**LET'S MAKE MONEY FOR THE PLANET!** 🌍💰🚀
