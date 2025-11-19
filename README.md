# 🌿✨ Gifted Air - Full Stack Platform

**Give the gift of environmental impact** 🌍

Transform climate action into emotional connection. Send symbolic gifts that combine personal messages with real-world environmental impact. Plant trees, clean oceans, protect wildlife—all in someone's name.

**Live Demo:** [gifted-air.vercel.app](https://gifted-air.vercel.app)  
**Venture Page:** [gifted-air.vercel.app/venture](https://gifted-air.vercel.app/venture)

---

## 🚀 Quick Start

### 1. Setup MongoDB
You need a MongoDB database. Choose one option:

**Option A: MongoDB Atlas (Recommended - Free Cloud)**
- Follow instructions in `backend/MONGODB_SETUP.md`
- Get your connection string and add to `backend/.env`

**Option B: Local MongoDB**
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

### 2. Backend API
```bash
cd backend
npm install
# Update .env with your MONGODB_URI
npm run dev
```
API runs at `http://localhost:3000`

### 3. Frontend App
```bash
cd frontend
npm install
npm run dev
```
App runs at `http://localhost:5174`

**Open two terminals and start both servers!**

---

## ✨ Complete Feature Set

### Platform is 66% Complete with Production-Ready Features:

### 🎁 Core Gifting Experience

#### 1. **Landing Page** (`/`)
- Poetic hero section with animated floating leaf emoji
- Overview of 8 gift types with pricing
- Referral program highlight
- Call-to-action to create gifts
- SEO optimized with meta tags
- Responsive design for all devices

#### 2. **Gift Composer** (`/compose`)
- Select from **8 climate actions**:
  - 🌳 Plant a Tree ($1-10/tree)
  - 🏡 Clean Cookstove ($25/stove)
  - ☀️ Solar Panel ($50/panel)
  - 🌊 Ocean Cleanup ($5-15/kg)
  - 🪸 Coral Reef Protection ($10-25/project)
  - 🦁 Wildlife Conservation ($10-50/habitat)
  - 🌴 Rainforest Protection ($20-40/acre)
  - 💧 Clean Water Access ($15-30/person)
- Flexible quantity adjustment with +/- buttons
- Dynamic price ranges based on gift type
- Enter sender and recipient names + email
- Write personalized message (300 chars)
- Real-time cost calculation
- **Stripe payment integration**
- Receipt generation and email delivery

#### 3. **Gift View** (`/gift/:id`)
- Beautiful animated gift card display
- Climate action icon and impact details
- Personal message prominently displayed
- Real-world impact breakdown
- Shareable URL with copy-to-clipboard
- Certificate download button
- Option to send your own gift
- Social sharing optimization

#### 4. **Payment Success** (`/payment/success`)
- Confirmation page after payment
- Gift link display and copy button
- Email sent confirmation
- Certificate download option
- Create another gift CTA
- Referral program promotion

### 📊 Discovery & Community

#### 5. **Public Gallery** (`/gallery`)
- Browse all public gifts
- Filter by gift type
- Search by sender or recipient name
- Pinned gifts highlighted at top
- Shows gift message, type, and quantity
- Click to view full gift details
- Responsive grid layout

#### 6. **Leaderboard** (`/leaderboard`)
- Top contributors ranked by total impact
- Shows total gifts sent, trees planted, etc.
- Search functionality to find specific users
- Responsive table design
- Motivates recurring gifting behavior

#### 7. **Impact Dashboard** (`/impact`)
- Total platform statistics
- Gifts sent, trees planted, CO2 offset
- Impact broken down by category
- Real-time data visualization
- Shareable stats for marketing

### 📜 Trust & Transparency

#### 8. **Transparency Page** (`/transparency`)
- Financial breakdown (revenue split)
- Where money goes: 50% to partners, 41% platform, 9% fees
- Partner verification process
- Impact tracking methodology
- FAQ section
- Contact information

#### 9. **Certificate View** (`/certificate/:id`)
- Beautiful printable certificate
- Personalized with names and gift details
- Impact statement and verification
- Environmental organization logo
- Download as PDF option
- Shareable design

### 💼 Business Tools

#### 10. **Admin Dashboard V2** (`/admin`)
- PIN-protected access (12April@Muuo)
- **4 Tabs:**
  1. **Overview** - Platform stats, recent gifts
  2. **Gift Management** - Delete, pin/unpin, bulk actions
  3. **Analytics** - Revenue tracking, gift trends
  4. **Financials** - Revenue by type, partner cuts, Stripe fees, platform income
- Search and filter gifts
- Export capabilities
- Real-time data updates

#### 11. **Bulk Gift Orders** (`/bulk`)
- Upload CSV file for mass gifting
- Corporate orders and event partnerships
- Batch processing
- Individual gift URLs for each recipient
- Progress tracking during upload
- Email delivery to all recipients

#### 12. **Bulk Success Page** (`/bulk/success`)
- Confirmation of bulk order
- List of all gift links
- Download links as CSV
- Individual copy buttons
- Total cost breakdown

### 🔄 Growth Features

#### 13. **Referral Program** (`/referral`)
- Unique referral link generation
- Track referrals and rewards
- Earn credits for referring friends
- Leaderboard of top referrers
- Social sharing buttons
- Copy link functionality

### 🎓 Investor Materials

#### 14. **Venture Page** (`/venture`)
- **Comprehensive business plan page for investors/advisors**
- **5 Tabs:**
  1. **Overview** - Executive summary, unit economics, use cases, competitive advantages
  2. **Vision** - Mission, values, impact goals
  3. **Business Model** - Revenue streams, financial projections
  4. **Market** - TAM/SAM/SOM, competition, positioning
  5. **Roadmap** - Development timeline, milestones

- **Use Cases Section:**
  - Personal Milestone Gifting (viral mechanics)
  - Community-Led Climate Action (grassroots model)
  - Corporate Sustainability Partnerships (B2B)
  - Event & Conference Ecosystem Building

- **Financial Highlights:**
  - Unit Economics: 41% margin per transaction
  - Scale Projections: $2K → $246K → $2.46M/year
  - Target Partner Categories (12 fields)
  - Viral Growth Engine (K-Factor 1.5-2.0)

- **Tailored for Aneri Pradhan** (BeVisioneers Fellowship venture coach)
- Systems thinking language throughout
- Focus on win-win partnerships and inclusive access
- Dark theme, ultra-modern design

### 🌙 Quality of Life

#### 15. **Dark Mode Support**
- Toggle between light and dark themes
- Persistent preference saved
- Smooth transitions
- Optimized for readability
- Icon indicator (☀️/🌙)

#### 16. **Keyboard Shortcuts**
- **G** - Go to Gallery
- **C** - Compose new gift
- **L** - View Leaderboard
- **I** - Impact Dashboard
- **A** - Admin Dashboard
- **R** - Referral Program
- **Cmd/Ctrl + K** - Quick navigate menu
- **?** - Show shortcuts help

#### 17. **SEO Optimization**
- Dynamic page titles and meta descriptions
- Canonical URLs
- Page-specific keywords
- Open Graph tags for social sharing
- Twitter Card support
- Search engine friendly

---

## 🎨 Design Philosophy

- **Tailwind CSS** - Responsive, modern UI design
- **Custom animations** - Floating leaves, growing effects, smooth transitions
- **Poetic typography** - Georgia serif for messages, modern sans-serif UI
- **Color-coded themes** - Each gift type has unique gradient and colors
- **Gradient backgrounds** - Visual depth and emotional impact
- **Dark mode support** - Light/dark themes with smooth transitions
- **Accessible** - WCAG AA compliant, keyboard navigation
- **Mobile-first** - Responsive on all screen sizes

---

## 💾 Database & Storage

**MongoDB Atlas** - Cloud-hosted database for production
- Persistent storage for all gifts
- Mongoose ODM for schema management
- Indexes for fast queries
- Aggregation pipelines for analytics

**Gift Schema:**
```javascript
{
  type: String,          // Gift type (tree, cookstove, etc.)
  quantity: Number,       // Amount of impact units
  message: String,        // Personal message (max 300 chars)
  recipientName: String,  // Recipient's name
  recipientEmail: String, // Recipient's email
  senderName: String,     // Sender's name
  senderEmail: String,    // Sender's email
  totalCost: Number,      // Total transaction amount
  createdAt: Date,        // Timestamp
  showInGallery: Boolean, // Public/private toggle
  isPinned: Boolean       // Admin pin status
}
```

---

## 🛠️ Tech Stack

### Frontend
- **Vite 7** - Lightning-fast build tool
- **React 19** - Latest UI framework with Server Components
- **React Router 7** - Client-side routing with data loading
- **Tailwind CSS 3** - Utility-first styling
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API calls
- **Vercel Analytics** - Web analytics and insights

### Backend
- **Node.js 20+** - JavaScript runtime
- **Express 5** - Fast, minimalist web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose 8** - Elegant MongoDB ODM
- **Stripe** - Payment processing
- **Resend** - Transactional emails
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers

### Services & Integrations
- **Stripe Checkout** - Secure payment processing
- **Resend Email API** - Gift delivery emails and receipts
- **Vercel** - Frontend hosting and deployment
- **Render** - Backend API hosting
- **MongoDB Atlas** - Database hosting

### Developer Experience
- **ESLint** - Code linting
- **Prettier** - Code formatting (implicit via Vite)
- **Hot Module Replacement** - Instant feedback during development
- **Environment Variables** - Secure config management

---

## 📱 User Journeys

### Individual Gifting Flow
1. User lands on homepage
2. Clicks "Create a Gift"
3. Selects from 8 climate action types
4. Adjusts quantity (1-100)
5. Enters sender/recipient names and emails
6. Writes personalized message (up to 300 chars)
7. Reviews total cost
8. Proceeds to Stripe Checkout
9. Completes payment
10. Receives confirmation page with gift link
11. Email sent to recipient with gift URL
12. Recipient views beautiful gift card
13. Recipient can download certificate
14. Recipient shares gift on social media → viral loop
15. New users discover platform → growth

### Bulk Corporate Flow
1. Corporate admin accesses `/bulk`
2. Downloads CSV template
3. Fills in employee/client names and emails
4. Uploads CSV file
5. Reviews order summary
6. Completes bulk payment
7. Individual gift URLs generated for each recipient
8. Bulk email delivery to all recipients
9. Each recipient gets personal gift page
10. Corporate brand awareness through employee sharing

### Referral Loop
1. User sends gift
2. Discovers referral program
3. Shares unique referral link
4. Friend signs up and sends gift
5. User earns credits
6. Leaderboard recognition
7. Continues referring for rewards

---

## 📡 API Endpoints

### Gift Management
- **POST /api/gifts** - Create a new gift
- **GET /api/gifts/:id** - Retrieve a gift by ID
- **GET /api/gifts** - Get all gifts (paginated)
- **DELETE /api/gifts/:id** - Delete a gift (admin)
- **PATCH /api/gifts/:id** - Update a gift (admin)
- **POST /api/gifts/bulk/update** - Bulk update gifts (admin)
- **POST /api/gifts/bulk/delete** - Bulk delete gifts (admin)

### Payment Processing
- **POST /api/create-checkout-session** - Create Stripe payment session
- **POST /api/verify-payment** - Verify payment completion

### Analytics & Stats
- **GET /api/stats** - Platform-wide statistics
- **GET /api/leaderboard** - Top contributors

### Email Delivery
- **POST /api/send-gift-email** - Send gift notification to recipient
- **POST /api/send-receipt-email** - Send payment receipt to sender

---

## 🔐 Environment Variables

### Backend (.env)
```bash
MONGODB_URI=mongodb+srv://...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
RESEND_API_KEY=re_...
PORT=3000
# Set SKIP_PAYMENT=true to run without requiring payment (for testing)
SKIP_PAYMENT=false
```

### Frontend (.env)
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:3000
```

### Testing Without Payment
To run the application without requiring payment (for testing purposes):

1. Set `SKIP_PAYMENT=true` in your backend `.env` file
2. When enabled, gifts will be created directly without payment processing
3. The application will skip Stripe checkout and create gifts immediately

---

## 📊 Vercel Analytics Setup

1. Install package:
   ```bash
   cd frontend
   npm i @vercel/analytics
   ```

2. Add to App.jsx:
   ```javascript
   import { Analytics } from '@vercel/analytics/react';
   
   function App() {
     return (
       <Router>
         <AppContent />
         <Analytics />
       </Router>
     );
   }
   ```

3. Deploy and visit your site
4. Analytics will start tracking automatically
5. Check dashboard at vercel.com/analytics

---

## 🎯 Roadmap & Next Steps

### Completed ✅
- ✅ Core gifting platform (8 gift types)
- ✅ Stripe payment integration
- ✅ Email delivery (Resend)
- ✅ Admin dashboard with analytics
- ✅ Public gallery and leaderboard
- ✅ Referral program
- ✅ Bulk gift orders
- ✅ Dark mode support
- ✅ SEO optimization
- ✅ Vercel Analytics
- ✅ Keyboard shortcuts
- ✅ Certificate generation
- ✅ Transparency page
- ✅ Venture page for investors

### In Progress 🚧
- 🚧 Partner organization integrations (API connections)
- 🚧 First 1,000 users milestone
- 🚧 Marketing campaign launch
- 🚧 Content creation (blog, social media)

### Planned 📋
- 📋 User authentication (Firebase or Auth0)
- 📋 User profiles and gift history
- 📋 Subscription model for monthly giving
- 📋 Mobile app (React Native)
- 📋 Corporate portal with bulk ordering UI
- 📋 API for third-party integrations
- 📋 Multi-language support (i18next)
- 📋 Advanced impact tracking dashboard
- 📋 Lottie animations for gift delivery
- 📋 Social media auto-sharing
- 📋 Gift scheduling (send later)
- 📋 Recurring gifts (birthdays, anniversaries)
- 📋 Custom branding for corporate clients
- 📋 Affiliate program for influencers

### Partnership Goals 🤝
- Partner with verified environmental organizations
- Integrate with carbon credit marketplaces (Verra, Gold Standard)
- Corporate sustainability partnerships
- Climate tech accelerator programs
- Event and conference partnerships

---

## 📂 Project Structure

```
GiftedAir2/
├── frontend/
│   ├── public/
│   │   └── leaf.svg             # Favicon
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx      # Homepage
│   │   │   ├── Compose.jsx      # Gift creator
│   │   │   ├── GiftView.jsx     # Gift display
│   │   │   ├── Gallery.jsx      # Public gifts
│   │   │   ├── Leaderboard.jsx  # Top contributors
│   │   │   ├── Impact.jsx       # Platform stats
│   │   │   ├── Transparency.jsx # Financial transparency
│   │   │   ├── Certificate.jsx  # Gift certificates
│   │   │   ├── PaymentSuccess.jsx # Post-payment
│   │   │   ├── AdminV2.jsx      # Admin dashboard
│   │   │   ├── BulkGift.jsx     # Bulk orders
│   │   │   ├── BulkSuccess.jsx  # Bulk confirmation
│   │   │   ├── Referral.jsx     # Referral program
│   │   │   ├── Venture.jsx      # Investor page
│   │   │   └── NotFound.jsx     # 404 page
│   │   ├── components/
│   │   │   ├── Navigation.jsx   # Header navigation
│   │   │   ├── ThemeToggle.jsx  # Dark mode toggle
│   │   │   ├── LoadingScreen.jsx # Initial loader
│   │   │   ├── EmptyState.jsx   # No data state
│   │   │   └── SEO.jsx          # Meta tags component
│   │   ├── hooks/
│   │   │   └── useKeyboardShortcuts.js # Keyboard nav
│   │   ├── utils/
│   │   │   └── config.js        # Environment config
│   │   ├── App.jsx              # Router setup
│   │   ├── index.css            # Tailwind + animations
│   │   └── main.jsx             # React entry point
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── .env
├── backend/
│   ├── models/
│   │   └── Gift.js              # Mongoose schema
│   ├── routes/
│   │   ├── gifts.js             # Gift CRUD operations
│   │   ├── payment.js           # Stripe integration
│   │   └── email.js             # Resend email API
│   ├── middleware/
│   │   └── cors.js              # CORS configuration
│   ├── utils/
│   │   └── validation.js        # Input validation
│   ├── server.js                # Express app
│   ├── package.json
│   ├── .env
│   └── MONGODB_SETUP.md
├── docs/
│   ├── ADMIN_V2_GUIDE.md
│   ├── VENTURE_SUGGESTIONS.md
│   ├── VENTURE_V2_MONEY_FOCUSED.md
│   └── [30+ documentation files]
└── README.md
```

---

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch
4. Custom domain: gifted-air.vercel.app

### Backend (Render / Railway / Fly.io)
1. Connect GitHub repo
2. Set environment variables
3. Deploy with:
   ```bash
   cd backend
   npm start
   ```

### Database (MongoDB Atlas)
- Already deployed and configured
- Connection string in backend .env
- Automated backups enabled

---

## 📈 Current Status

**Platform Completion: 66%**

**What's Working:**
- ✅ Full gifting flow with 8 gift types
- ✅ Stripe payment processing
- ✅ Email delivery system
- ✅ Public gallery and discovery
- ✅ Admin dashboard with analytics
- ✅ Referral program
- ✅ Bulk ordering system
- ✅ Dark mode support
- ✅ SEO optimization
- ✅ Vercel Analytics tracking
- ✅ Investor materials (Venture page)

**What's Next:**
- Partner organization API integrations
- User authentication system
- Marketing and user acquisition
- Corporate partnership program
- Mobile app development

---

## 👥 Team & Advisors

**Founder:** Morris Muuο Mulitu  
**Venture Coach:** Aneri Pradhan ([BeVisioneers Fellowship](https://bevisioneers.world))  
**Program:** [Do School](https://thedoschool.org)

---

## 📄 License

MIT License - Built with 💚 for the planet

---

## 🤝 Contributing

Interested in contributing? We're looking for:
- Partner organizations (climate action, clean energy)
- Technical contributors (React, Node.js, MongoDB)
- Corporate sustainability partnerships
- Investor connections and advisor

**Contact:** via GitHub Issues or the platform's contact form

---

**🌿 Gifted Air - Where profitability meets planetary healing**

*Making climate action personal, emotional, and viral. One gift at a time.* 🌍✨
