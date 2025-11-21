# 🔍 All Routes in Gifted Air

## 📋 **Complete Route List:**

### **Public Routes (Visible in Navigation):**
1. **/** - Home/Landing page
2. **/compose** - Create a gift
3. **/gallery** - Public gift gallery
4. **/leaderboard** - Top senders leaderboard
5. **/impact** - View environmental impact
6. **/transparency** - Transparency page
7. **/bulk** - Bulk gift ordering

### **Hidden Routes (Not in Main Navigation):**

#### **Admin & Management:**
8. **/admin** 🔒
   - **Password protected:** `giftedair2025`
   - Advanced admin dashboard with 4 tabs:
     - 📊 Overview - Quick stats
     - 🎁 Gift Management - Delete, pin/unpin, bulk operations
     - 📈 Analytics - Charts and trends
     - 💰 **Financials** - Revenue breakdown, partner cuts, platform income
   - Features:
     - Delete gifts
     - Pin/unpin from gallery
     - Bulk operations
     - Export to CSV
     - Search & filter
     - Financial tracking
     - Partner donation calculator

#### **Payment Related:**
9. **/payment/success**
   - Shown after successful Stripe payment
   - Displays gift details
   - Shows payment confirmation

10. **/payment/bulk-success**
    - After bulk order payment
    - Shows all gifts in bulk order
    - Download links for certificates

#### **Gift Related:**
11. **/gift/:giftId**
    - View individual gift
    - Share link for recipients
    - Download certificate
    - QR code
    - Thank you note feature
    - Example: `/gift/68e2a42e55ad264c23ae1fae`

12. **/certificate/:giftId**
    - Printable gift certificate
    - Optimized for download/print
    - Example: `/certificate/68e2a42e55ad264c23ae1fae`

#### **Referral Program:**
13. **/referral**
    - Generate referral codes
    - Track rewards
    - View leaderboard
    - Share links

---

## 🔒 **Protected/Hidden Routes:**

### **1. Admin Dashboard** (`/admin`)
**Why it's hidden:**
- Password protected
- Contains sensitive financial data
- Gift management tools
- Not meant for public access

**How to access:**
1. Navigate to: `http://localhost:3001/admin`
2. Enter password: `giftedair2025`
3. Access granted!

**What you can do:**
- View all gifts and stats
- Delete gifts
- Pin/unpin from gallery
- Bulk operations (select multiple)
- Export data (CSV, reports)
- **See financials:**
  - Revenue breakdown
  - Partner donations owed
  - Stripe fees
  - Platform income
  - Profit margins
- Track monthly action items

---

### **2. Payment Success Pages**
**Why they're hidden:**
- Only accessible after payment
- URL includes session ID
- Temporary/one-time use

**Routes:**
- `/payment/success?session_id=cs_test_...`
- `/payment/bulk-success?session_id=cs_test_...&bulk_order_id=...`

---

### **3. Individual Gift Pages**
**Not exactly hidden, but:**
- Only accessible via direct link
- Not listed in navigation
- Meant for sharing with recipients

**Route:** `/gift/:giftId`

**Features:**
- View gift details
- Download certificate
- Send thank you note
- Share on social media
- QR code for sharing

---

### **4. Certificate Pages**
**Why they exist:**
- Printable version of gift
- Optimized for download
- Clean layout for printing

**Route:** `/certificate/:giftId`

---

## 📊 **Admin Dashboard Tabs:**

### **Tab 1: 📊 Overview**
- Total gifts, revenue, gallery count, average value
- Gift type distribution with percentages
- Quick stats at a glance

### **Tab 2: 🎁 Gift Management**
- Full gift list with filters
- Search by sender, recipient, message
- Filter by type and status
- Bulk actions:
  - Pin to gallery
  - Unpin from gallery
  - Delete selected
- Individual actions:
  - Delete (🗑️)
  - Pin/Unpin (📌/📍)

### **Tab 3: 📈 Analytics**
- Monthly trends chart
- Revenue by gift type
- Unique senders/recipients
- Location statistics
- Visual charts and graphs

### **Tab 4: 💰 Financials** ⭐ **NEW!**
- **Financial breakdown by gift type:**
  - Revenue per type
  - Gifts sent
  - Quantity delivered
  - Partner donations owed
  - Stripe fees
  - Platform revenue
  
- **Total Summary:**
  - Total revenue
  - Total Stripe fees (2.9% + $0.30)
  - Total owed to partners (50%)
  - Total platform revenue
  
- **Revenue Distribution Charts:**
  - Visual breakdown of where money goes
  - Partners: 50%
  - Platform: ~17-20%
  - Stripe: ~30-33%
  
- **Monthly Action Items:**
  - How much to donate to partners
  - Email reminders
  - Receipt tracking
  
- **Profit Margins:**
  - Average gift value
  - Average platform revenue per gift
  - Transaction counts
  - Quantity metrics

---

## 🎯 **Hidden Features:**

### **Keyboard Shortcuts:**
Not a route, but hidden features:
- **H** - Home
- **C** - Compose
- **G** - Gallery
- **L** - Leaderboard
- **?** - Help modal

### **Dark Mode Toggle:**
- Bottom-right corner
- Persists across sessions
- Works on all pages

---

## 🔐 **Security Considerations:**

### **Admin Route:**
- Change default password: `giftedair2025`
- Implement proper auth for production
- Consider 2FA
- Add IP restrictions if needed

### **Gift Links:**
- Anyone with link can view
- Consider adding password protection for sensitive gifts
- QR codes are public

### **Payment Routes:**
- Session IDs expire
- One-time use
- Stripe handles security

---

## 📝 **Route Summary:**

**Total Routes:** 14 main routes + dynamic gift/certificate routes

**Public (7):**
- Home, Compose, Gallery, Leaderboard, Impact, Transparency, Bulk

**Hidden (7):**
- Admin (password protected)
- Payment success pages (2)
- Gift view (dynamic)
- Certificate (dynamic)
- Referral

**Most Important Hidden Route:**
- **/admin** - Your command center for managing the platform

---

## 🚀 **Quick Access:**

### **Development:**
```
Admin: http://localhost:3001/admin
Referral: http://localhost:3001/referral
Gift Example: http://localhost:3001/gift/[gift-id]
```

### **Production:**
```
Admin: https://gifted-air.vercel.app/admin
Referral: https://gifted-air.vercel.app/referral
Gift Example: https://gifted-air.vercel.app/gift/[gift-id]
```

---

## 💡 **Pro Tips:**

### **Bookmark These:**
- `/admin` - Check daily
- `/referral` - Share with friends
- `/analytics` tab in admin - Track growth

### **Share These:**
- `/gallery` - Show off your gifts
- `/leaderboard` - Gamify giving
- Individual gift links - Send to recipients

### **Don't Share:**
- `/admin` - Keep password private
- Payment success URLs - Temporary only

---

## ✅ **Now You Know:**

All routes in your platform, including the powerful admin dashboard with:
- ✅ Gift management
- ✅ Analytics
- ✅ **Financial tracking** (NEW!)
- ✅ Bulk operations
- ✅ Export tools

**Your platform has 14+ routes, with `/admin` being the most powerful hidden gem!** 💎

---

**Password:** `giftedair2025` (remember to change this!)
