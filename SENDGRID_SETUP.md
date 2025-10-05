# 📧 SendGrid Email Setup Guide

## ✅ What's Already Done

- ✅ SendGrid SDK installed (`@sendgrid/mail`)
- ✅ Email template created (beautiful HTML + text)
- ✅ Gift model updated with `recipientEmail` field
- ✅ Compose form updated with email input
- ✅ Email sending logic integrated into gift creation

## 🚀 How to Set Up SendGrid (5 minutes)

### Step 1: Create SendGrid Account

1. Go to [https://signup.sendgrid.com/](https://signup.sendgrid.com/)
2. Sign up (FREE plan includes 100 emails/day - perfect for testing!)
3. Verify your email address

### Step 2: Get API Key

1. Log into SendGrid dashboard
2. Go to **Settings** → **API Keys** (or visit [https://app.sendgrid.com/settings/api_keys](https://app.sendgrid.com/settings/api_keys))
3. Click **"Create API Key"**
4. Name it: `Gifted Air Production`
5. Select **"Full Access"** (for simplicity)
6. Click **"Create & View"**
7. **COPY THE KEY** (you won't see it again!)

### Step 3: Configure Backend

1. Open `/backend/.env`
2. Replace this line:
   ```
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   ```
   
   With your actual API key:
   ```
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxx
   ```

3. Update the sender email (must be a verified domain or use SendGrid sandbox):
   ```
   SENDGRID_FROM_EMAIL=hello@giftedair.com
   ```

### Step 4: Verify Sender Email (IMPORTANT!)

**Option A: Use Sandbox (Testing Only)**
- SendGrid sandbox sends to verified recipients only
- Good for testing before domain setup

**Option B: Single Sender Verification (Quick Start)**
1. Go to **Settings** → **Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Use your personal email (e.g., `yourname@gmail.com`)
4. Fill in the form
5. Check your email and click verify link
6. Update `.env`:
   ```
   SENDGRID_FROM_EMAIL=yourname@gmail.com
   ```

**Option C: Domain Authentication (Professional)**
1. Go to **Settings** → **Sender Authentication**
2. Click **"Authenticate Your Domain"**
3. Enter your domain (e.g., `giftedair.com`)
4. Add DNS records to your domain provider
5. Wait for verification (5-10 minutes)
6. Use any email from that domain

### Step 5: Configure Render (Production Backend)

1. Go to your Render dashboard
2. Select your backend service
3. Go to **Environment**
4. Add these environment variables:
   ```
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxx
   SENDGRID_FROM_EMAIL=yourverified@email.com
   FRONTEND_URL=https://gifted-air.vercel.app
   ```
5. Click **"Save Changes"**
6. Render will auto-redeploy

### Step 6: Test It!

**Local Testing:**
```bash
cd backend
npm run dev
```

**Create a test gift:**
1. Go to http://localhost:5174/compose
2. Fill out the form
3. **Add YOUR email** as recipient email
4. Click "Create Gift"
5. Check your inbox! 📬

**Production Testing:**
1. Go to https://gifted-air.vercel.app/compose
2. Create a gift with your email
3. Check inbox for beautiful email!

## 🎨 Email Features

The email includes:

- ✅ Beautiful gradient header with gift icon
- ✅ Gift details (quantity, type, impact)
- ✅ Personal message in styled box
- ✅ Sender location (if provided)
- ✅ "View Your Gift" button → direct link
- ✅ Climate value display
- ✅ Fully responsive (mobile + desktop)
- ✅ Plain text fallback
- ✅ Professional footer with branding

## 🔧 Troubleshooting

### "Email not sent" in logs

**Check 1: API Key**
```bash
# Make sure API key is set in .env
echo $SENDGRID_API_KEY
```

**Check 2: Sender Email**
- Must be verified in SendGrid
- Check Settings → Sender Authentication

**Check 3: Recipient Email**
- Make sure it's a valid email format
- Check spam folder

### "403 Forbidden" Error

- Your API key doesn't have permissions
- Create new API key with "Full Access"

### "550 Cannot receive from specified address"

- Sender email not verified
- Complete sender verification (Step 4)

## 📊 SendGrid Free Tier Limits

- ✅ **100 emails/day** (3,000/month)
- ✅ Unlimited contacts
- ✅ Email API + SMTP
- ✅ Email validation
- ✅ All features included

**Perfect for MVP and early growth!**

## 🎯 Email Sending Flow

```
User creates gift with email
         ↓
Backend creates gift in DB
         ↓
Backend calls sendGiftNotification()
         ↓
SendGrid sends beautiful email
         ↓
Recipient gets notified! 🎉
```

## 🚀 Next Steps After Setup

1. **Test with real email** (your own)
2. **Share with friends** to test recipient flow
3. **Monitor in SendGrid dashboard** (Activity → Email Activity)
4. **Upgrade if needed** (when you hit 100/day limit)

## 💡 Tips

- Emails are **optional** - gifts work without email too
- Email sending is **non-blocking** (won't slow down gift creation)
- All emails are **logged** in backend console
- SendGrid provides **detailed analytics** (open rates, clicks)

---

**Questions?** Check [SendGrid Documentation](https://docs.sendgrid.com/)

**Ready to send beautiful climate love emails!** 📧💚🌍
