# 🧪 TESTING GUIDE - What We Added & How to Test

## 🎯 **WHAT WAS ADDED IN THIS SESSION:**

### **1. Quick Wins (7 Features)**
- ✅ Favicon (green leaf icon)
- ✅ 404 Page
- ✅ Loading Screen
- ✅ Meta Tags (SEO)
- ✅ Google Analytics Setup
- ✅ Keyboard Shortcuts
- ✅ **Dark Mode**

### **2. Big Features**
- ✅ SEO (robots.txt, sitemap.xml, structured data)
- ✅ Advanced Analytics (25+ tracking events)
- ✅ Share Button Component
- ✅ Performance Optimization (lazy loading)
- ✅ Comprehensive Test Suite
- ✅ **Referral Program**

### **3. Infrastructure**
- ✅ Domain updated to giftedair.com
- ✅ Theme Context for dark mode
- ✅ Referral backend models & routes
- ✅ Analytics tracking utilities

---

## 🌙 **TESTING DARK MODE:**

### **Step 1: Start the App**
```bash
# Terminal 1 - Backend
cd /Users/macbook/Desktop/GiftedAir2/backend
node server.js

# Terminal 2 - Frontend
cd /Users/macbook/Desktop/GiftedAir2/frontend
npm run dev
```

### **Step 2: Open Browser**
```
http://localhost:5173
```

### **Step 3: Find Dark Mode Button**
- Look at **bottom-right corner** of screen
- You should see a **floating button** with 🌙 or ☀️
- Click it to toggle

### **What Should Happen:**
- Button shows 🌙 in light mode
- Button shows ☀️ in dark mode
- Background changes to dark
- Text becomes light
- All pages should support it

### **If Not Working:**
```bash
# Check browser console (F12)
# Look for errors

# Verify files exist:
ls frontend/src/contexts/ThemeContext.jsx
ls frontend/src/components/ThemeToggle.jsx

# Rebuild frontend:
cd frontend
npm run build
npm run dev
```

---

## 💰 **TESTING REFERRAL PROGRAM:**

### **Step 1: Make Sure Backend is Running**
```bash
cd /Users/macbook/Desktop/GiftedAir2/backend
node server.js

# You should see:
# Server running on port 3000
# MongoDB connected
```

### **Step 2: Go to Referral Page**
```
http://localhost:5173/referral
```

### **Step 3: Generate Code**
1. Enter your name: "John Doe"
2. Enter your email: "john@example.com"
3. Click "Generate My Code"

### **What Should Happen:**
- Code appears (e.g., "JOHNDOE4K2X")
- Stats section shows
- Copy code button appears
- Copy link button appears

### **If Not Working:**

#### **Check Backend Routes:**
```bash
# In backend terminal, you should see route registered
# Look for: /api/referrals routes

# Test API directly:
curl http://localhost:3000/api/referrals/leaderboard

# Should return JSON (even if empty)
```

#### **Check for Errors:**
```bash
# Backend terminal - look for errors
# Frontend console (F12) - check Network tab

# Verify route file exists:
ls backend/routes/referrals.js

# Verify models exist:
ls backend/models/ReferralCode.js
ls backend/models/Referral.js
```

#### **Manual Fix if Needed:**
```bash
# Stop backend (Ctrl+C)
# Restart:
cd /Users/macbook/Desktop/GiftedAir2/backend
node server.js

# Check it loaded referral routes
# Should see in startup logs
```

---

## ⌨️ **TESTING KEYBOARD SHORTCUTS:**

### **Step 1: Go to Homepage**
```
http://localhost:5173
```

### **Step 2: Press Keys** (when NOT in an input field)
- Press **H** → Should go to Home
- Press **C** → Should go to Create Gift
- Press **G** → Should go to Gallery
- Press **L** → Should go to Leaderboard
- Press **T** → Should go to Transparency
- Press **B** → Should go to Bulk Orders
- Press **?** → Should show help popup
- Press **Cmd/Ctrl + K** → Should show quick nav menu

### **What Should Happen:**
- Page navigates instantly
- No typing in inputs interferes
- Help shows all shortcuts

---

## 🔍 **TESTING SEARCH (Already Built):**

### **Gallery Search:**
```
1. Go to: http://localhost:5173/gallery
2. See search bar under title
3. Type any text
4. Results filter instantly
5. Click X to clear
```

### **Leaderboard Search:**
```
1. Go to: http://localhost:5173/leaderboard
2. See search bar under title
3. Type any text
4. Podium hides when searching
5. Clear to see podium again
```

---

## 📊 **TESTING ANALYTICS TRACKING:**

### **Step 1: Open Browser Console**
```
Press F12 → Console tab
```

### **Step 2: Perform Actions**
```
- Create a gift
- Search in gallery
- Click share button
- View leaderboard
```

### **What You'll See:**
```
📊 Event: gift_type_interest {gift_type: "tree", price: 1}
📊 Event: search {search_term: "john", results_count: 3}
📊 Event: share {method: "twitter", content_type: "gift"}
```

---

## 🎨 **TESTING 404 PAGE:**

```
http://localhost:5173/nonexistent

Should see:
- Giant "404"
- Bouncing 🌍
- "Oops! Page Not Found"
- Action buttons
- Quick links
```

---

## ⏳ **TESTING LOADING SCREEN:**

```
1. Open incognito/private window
2. Go to: http://localhost:5173
3. Should see 2-second loading animation
4. Refresh - won't show again (session-based)
5. Close and reopen private window - shows again
```

---

## 📤 **TESTING SHARE BUTTON:**

### **Where to Find It:**
Currently needs to be added to pages. Here's how:

```jsx
// Add to any page (e.g., GiftView.jsx)
import ShareButton from '../components/ShareButton';

// In JSX:
<ShareButton 
  url="https://giftedair.com/gift/123"
  title="Check out this climate gift!"
  description="I planted trees!"
/>
```

---

## 🐛 **COMMON ISSUES & FIXES:**

### **Issue 1: Dark Mode Button Not Showing**
```bash
# Check if ThemeProvider is wrapping App
# File: frontend/src/main.jsx

# Should have:
<ThemeProvider>
  <App />
</ThemeProvider>

# Rebuild:
cd frontend
npm run build
npm run dev
```

### **Issue 2: Referral Routes 404**
```bash
# Check backend/server.js has:
const referralRoutes = require('./routes/referrals');
app.use('/api/referrals', referralRoutes);

# Restart backend:
cd backend
# Ctrl+C to stop
node server.js
```

### **Issue 3: Search Not Working**
```bash
# Already implemented! Just go to:
http://localhost:5173/gallery
# or
http://localhost:5173/leaderboard

# Search bar is under the page title
```

### **Issue 4: Keyboard Shortcuts Not Working**
```bash
# Make sure you're NOT in an input field
# Click on empty space
# Then press keys (H, C, G, L, T, B, ?)
```

---

## ✅ **COMPLETE TESTING CHECKLIST:**

```
□ Backend running (http://localhost:3000)
□ Frontend running (http://localhost:5173)
□ Dark mode button visible (bottom-right)
□ Dark mode toggles on click
□ Referral page loads (/referral)
□ Can generate referral code
□ Gallery search works
□ Leaderboard search works
□ Keyboard shortcuts work (H,C,G,L,T,B,?)
□ 404 page shows on bad URL
□ Loading screen shows (first visit)
□ Console shows analytics events
□ All pages have navigation
□ Mobile menu works (resize window)
```

---

## 🚀 **FULL RESTART PROCEDURE:**

If nothing works, do a full restart:

```bash
# 1. Stop everything (Ctrl+C in all terminals)

# 2. Backend
cd /Users/macbook/Desktop/GiftedAir2/backend
node server.js
# Wait for "Server running on port 3000"
# Wait for "MongoDB connected"

# 3. Frontend (new terminal)
cd /Users/macbook/Desktop/GiftedAir2/frontend
npm run dev
# Wait for "Local: http://localhost:5173"

# 4. Open browser
open http://localhost:5173

# 5. Test dark mode (bottom-right button)

# 6. Test referral
open http://localhost:5173/referral

# 7. Check console for errors (F12)
```

---

## 📝 **QUICK COMMAND REFERENCE:**

```bash
# Start Backend
cd backend && node server.js

# Start Frontend
cd frontend && npm run dev

# Build Frontend
cd frontend && npm run build

# Test API
curl http://localhost:3000/api/referrals/leaderboard

# Check if files exist
ls frontend/src/components/ThemeToggle.jsx
ls backend/routes/referrals.js

# View backend logs
# Just look at terminal where "node server.js" is running

# View frontend logs
# Browser console (F12 → Console)
```

---

## 🎯 **WHAT TO EXPECT:**

### **Working Features:**
1. **Dark Mode** - Floating button bottom-right
2. **Referral System** - /referral page, generate codes
3. **Search** - Gallery & leaderboard pages
4. **Keyboard Shortcuts** - H,C,G,L,T,B,?
5. **404 Page** - Any bad URL
6. **Loading Screen** - First visit only
7. **Analytics** - Console logs events
8. **Navigation** - All pages, mobile menu
9. **Meta Tags** - View page source
10. **Lazy Loading** - Fast page loads

### **Files Added:**
```
frontend/src/contexts/ThemeContext.jsx
frontend/src/components/ThemeToggle.jsx
frontend/src/pages/Referral.jsx
frontend/src/components/ShareButton.jsx
frontend/src/utils/analytics.js
frontend/public/robots.txt
frontend/public/sitemap.xml
frontend/public/favicon.svg
backend/models/ReferralCode.js
backend/models/Referral.js
backend/routes/referrals.js
```

---

## 💡 **NEED HELP?**

Check these in order:
1. Are both servers running?
2. Any errors in terminals?
3. Any errors in browser console (F12)?
4. Try hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
5. Try incognito window
6. Restart both servers

**Most issues = backend not running or routes not registered!**

---

## 🎊 **YOU SHOULD SEE:**

- 🌙 Dark mode button (bottom-right, always visible)
- 💰 Referral page working (/referral)
- 🔍 Search bars (gallery & leaderboard)
- ⌨️ Keyboard shortcuts working
- 🎨 Beautiful 404 page
- ⏳ Loading animation (first visit)
- 📊 Analytics in console
- 🧭 Navigation on all pages

**Everything is there - just need servers running!** 🚀
