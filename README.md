# 🌿✨ Gifted Air - Full Stack MVP

**A Ritual of Climate Love**

Transform climate action into emotional connection. Send symbolic gifts that combine personal messages with real-world environmental impact.

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

## ✨ Features Built

### 1. **Landing Page** (`/`)
- Poetic hero section with animated floating leaf emoji
- Overview of gift types (Trees, Cookstoves, Solar, Ocean)
- Clear call-to-action to create gifts

### 2. **Gift Composer** (`/compose`)
- Select from 4 climate actions:
  - 🌳 Plant a Tree ($5/tree)
  - 🏡 Clean Cookstove ($25/stove)
  - ☀️ Solar Panel ($50/panel)
  - 🌊 Ocean Cleanup ($15/kg)
- Adjust quantity with +/- buttons
- Enter sender and recipient names
- Write personalized message
- Real-time cost calculation

### 3. **Gift View** (`/gift/:id`)
- Beautiful animated gift card display
- Shows climate action icon and details
- Displays personal message
- Real-world impact breakdown
- Shareable URL (copy link button)
- Option to send your own gift

## 🎨 Design Features

- **Tailwind CSS** for responsive, beautiful UI
- **Custom animations**: floating, growing effects
- **Poetic typography**: Georgia serif font for messages
- **Color-coded themes** per gift type
- **Gradient backgrounds** for visual depth

## 💾 Data Storage

**MongoDB** - Persistent database storage for gifts. All data is saved permanently and survives server restarts. Uses Mongoose ODM for elegant schema design.

## 🛠️ Tech Stack

### Frontend
- **Vite** - Fast build tool
- **React 19** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling

### Backend
- **Node.js** - Runtime
- **Express 5** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin requests

## 📱 User Flow

1. User lands on homepage
2. Clicks "Create a Gift"
3. Selects climate action type
4. Chooses quantity
5. Enters names and personal message
6. Creates gift → generates unique URL
7. Shares URL with recipient
8. Recipient views beautiful gift card

## 📡 API Endpoints

### `POST /api/gifts`
Create a new gift
```json
{
  "type": "tree",
  "quantity": 5,
  "message": "Happy birthday!",
  "recipientName": "Sarah",
  "senderName": "John",
  "totalCost": 25
}
```

### `GET /api/gifts/:id`
Retrieve a gift by ID

### `GET /api/gifts`
Get all gifts (for admin/debugging)

## 🔮 Next Steps

- Persist data with MongoDB
- Integrate payment processing (Stripe)
- Connect to real carbon offset providers (Verra, Gold Standard)
- Add authentication (Firebase)
- Multi-language support (i18next)
- Add Lottie animations
- Social media sharing with Open Graph
- Email notifications
- Admin dashboard

## 📂 Project Structure

```
GiftedAir2/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx      # Homepage
│   │   │   ├── Compose.jsx      # Gift creator
│   │   │   └── GiftView.jsx     # Gift display
│   │   ├── App.jsx              # Router setup
│   │   ├── index.css            # Tailwind + animations
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
├── backend/
│   ├── routes/
│   │   └── gifts.js             # Gift API routes
│   ├── data/
│   │   └── storage.js           # In-memory storage
│   ├── server.js                # Express app
│   ├── package.json
│   └── .env
└── README.md
```

---

Built with 💚 for the planet
