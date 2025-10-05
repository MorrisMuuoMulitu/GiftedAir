# 📧 Resend Email Setup (SUPER SIMPLE!)

## ✅ Why Resend is Better

- ✅ **No email verification needed** - works instantly!
- ✅ **Simpler API** - cleaner, easier to use
- ✅ **Better free tier** - 3,000 emails/month (100/day)
- ✅ **2 minute setup** - literally just need an API key
- ✅ **Modern developer experience** - built for devs

---

## 🚀 Setup (2 Minutes Total!)

### **Step 1: Create Resend Account**

1. Go to: **https://resend.com/signup**
2. Sign up with your email
3. Verify your email (click the link they send)
4. That's it! ✅

### **Step 2: Get API Key**

1. After login, you'll be on the dashboard
2. Click **"API Keys"** in the sidebar
   - Or go to: https://resend.com/api-keys
3. Click **"Create API Key"**
4. **Name:** `Gifted Air`
5. **Permission:** Select **"Sending access"**
6. Click **"Create"**
7. **COPY THE KEY** - looks like: `re_xxxxxxxxxxxxxxxxxx`

That's it! No sender verification needed! 🎉

### **Step 3: Update .env**

**Local Backend (.env):**
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
FRONTEND_URL=http://localhost:5174
```

**Note:** Use `onboarding@resend.dev` for testing - it works immediately!

### **Step 4: Add to Render (Production)**

1. Go to https://dashboard.render.com/
2. Click your backend service
3. Go to **Environment** tab
4. Add these THREE variables:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
FRONTEND_URL=https://gifted-air.vercel.app
```

5. Click **"Save Changes"**
6. Wait for redeploy (~5 min)

### **Step 5: Test It!**

**Local Testing:**
```bash
cd backend
npm run dev
```

**Create Test Gift:**
1. Go to http://localhost:5174/compose
2. Fill out form
3. **Add YOUR email** as recipient
4. Submit
5. Check inbox! 📬

**Production Testing:**
- Go to https://gifted-air.vercel.app/compose (after deployment)
- Create gift with your email
- Get beautiful email!

---

## 🎨 What Recipients Get

- Beautiful responsive HTML email
- Gift icon + details
- Personal message
- "View Your Gift" button
- Professional branding
- Works on all devices

---

## 📊 Free Tier

- ✅ **3,000 emails per month**
- ✅ **100 emails per day**
- ✅ No credit card required
- ✅ All features included
- ✅ Great analytics

**Perfect for MVP!** When you grow, upgrade for $20/month (50k emails).

---

## 🎯 Using Your Own Domain (Optional)

Want to send from `hello@giftedair.com`? 

1. Go to **Domains** in Resend dashboard
2. Click **"Add Domain"**
3. Add your domain
4. Add DNS records (they show you exactly what)
5. Wait for verification (~10 min)
6. Update `.env`:
   ```
   RESEND_FROM_EMAIL=hello@giftedair.com
   ```

But for now, **`onboarding@resend.dev` works perfectly!**

---

## ⚡ That's It!

Seriously. Just:
1. ✅ Sign up at resend.com
2. ✅ Copy API key
3. ✅ Add to .env files
4. ✅ Deploy
5. ✅ Send emails!

**No sender verification. No domain setup. No hassle.**

---

## 🔧 Troubleshooting

### "Email not sent" in logs
- Check API key is in `.env`
- Make sure it starts with `re_`

### "Invalid API key"
- Regenerate API key in Resend dashboard
- Make sure you copied the full key

### Emails in spam
- Normal for `onboarding@resend.dev`
- Set up custom domain to improve deliverability

---

## 📈 Monitor Your Emails

Resend dashboard shows:
- ✅ Emails sent
- ✅ Delivery status
- ✅ Open rates
- ✅ Click rates
- ✅ Bounces

All in real-time!

---

**Ready to send beautiful emails in 2 minutes!** 📧💚

No complicated setup. No verification headaches. Just works. 🚀
