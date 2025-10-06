# 🚀 START HERE - Quick Start Guide

## ⚡ **GET EVERYTHING RUNNING (2 MINUTES)**

### **Step 1: Start Backend** (Terminal 1)
```bash
cd /Users/macbook/Desktop/GiftedAir2/backend
node server.js
```

**Wait for:**
```
✓ Server running on port 3000
✓ MongoDB connected
```

---

### **Step 2: Start Frontend** (Terminal 2)
```bash
cd /Users/macbook/Desktop/GiftedAir2/frontend
npm run dev
```

**Wait for:**
```
➜ Local: http://localhost:5173/
```

---

### **Step 3: Open Browser**
```
http://localhost:5173
```

---

## 🎯 **WHAT TO TEST FIRST:**

### **1. Dark Mode** 🌙
- Look at **bottom-right corner**
- Click the floating button
- Theme toggles light/dark
- **If not working:** See TESTING_GUIDE.md

### **2. Referral Program** 💰
```
http://localhost:5173/referral

1. Enter name: "Your Name"
2. Enter email: "you@email.com"
3. Click "Generate My Code"
4. Copy your code
5. Share with friends!
```

### **3. Search** 🔍
```
Gallery: http://localhost:5173/gallery
Leaderboard: http://localhost:5173/leaderboard

Type in search bar to filter results!
```

### **4. Keyboard Shortcuts** ⌨️
Press these keys (when not in an input):
- **H** → Home
- **C** → Create Gift
- **G** → Gallery
- **L** → Leaderboard
- **?** → Show help

---

## 🐛 **TROUBLESHOOTING:**

### **Dark Mode Button Missing?**
```bash
# Restart frontend:
cd frontend
# Ctrl+C
npm run dev
```

### **Referral Not Working?**
```bash
# Check backend is running
# Should see in terminal:
# "Server running on port 3000"

# Restart if needed:
cd backend
# Ctrl+C  
node server.js
```

### **Nothing Works?**
```bash
# Full restart:

# Terminal 1:
cd /Users/macbook/Desktop/GiftedAir2/backend
node server.js

# Terminal 2:
cd /Users/macbook/Desktop/GiftedAir2/frontend
npm run dev

# Browser:
http://localhost:5173
```

---

## 📚 **MORE INFO:**

- **Full Testing Guide:** TESTING_GUIDE.md
- **All Features:** ALL_FEATURES_COMPLETE.md
- **Test Suite:** TEST_SUITE.md

---

## ✅ **YOU SHOULD SEE:**

1. ✅ App loads at http://localhost:5173
2. ✅ Dark mode button (bottom-right)
3. ✅ Navigation on all pages
4. ✅ Referral page works (/referral)
5. ✅ Search in gallery/leaderboard
6. ✅ Keyboard shortcuts work

**If you see all 6 ✅ - EVERYTHING WORKS!** 🎉

---

## 🚀 **NEXT STEPS:**

1. **Test Everything** → Follow TESTING_GUIDE.md
2. **Create a Gift** → http://localhost:5173/compose
3. **Try Bulk Order** → http://localhost:5173/bulk
4. **Get Referral Code** → http://localhost:5173/referral
5. **Toggle Dark Mode** → Click bottom-right button

**Your platform is AMAZING! Start testing!** 💚✨
