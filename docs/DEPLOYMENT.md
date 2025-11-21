# 🚀 Deployment Guide - Gifted Air

## Prerequisites
- GitHub account
- Render.com account (free)
- Vercel account (free)

---

## 🔧 Step 1: Deploy Backend to Render

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial commit - Ready for deployment"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy on Render
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `giftedair-api`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: `production`
   - `PORT`: `3000` (Render will override this automatically)

6. Click "Create Web Service"
7. Wait 5-10 minutes for deployment
8. **Copy your backend URL**: `https://giftedair-api.onrender.com`

---

## 🎨 Step 2: Deploy Frontend to Vercel

### 1. Update Frontend API URL

Create `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

Update frontend code to use environment variable:
- Replace `http://localhost:3000` with `import.meta.env.VITE_API_URL || 'http://localhost:3000'`

### 2. Deploy on Vercel
1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variables:
   - `VITE_API_URL`: Your Render backend URL (from Step 1.8)

6. Click "Deploy"
7. Wait 2-3 minutes
8. **Your app is live!** 🎉

---

## ✅ Step 3: Test Production

1. Visit your Vercel URL
2. Create a gift
3. Share the gift link
4. Test editing a message

---

## 🔄 Future Deployments

### Backend Updates
```bash
git add .
git commit -m "Update backend"
git push
```
Render auto-deploys from main branch.

### Frontend Updates
```bash
git add .
git commit -m "Update frontend"
git push
```
Vercel auto-deploys from main branch.

---

## 🐛 Troubleshooting

### Backend won't start
- Check Render logs
- Verify MongoDB connection string
- Ensure all environment variables are set

### Frontend can't connect to backend
- Check CORS settings in backend
- Verify VITE_API_URL is correct
- Check browser console for errors

### CORS Errors
Add your Vercel URL to backend CORS config:
```javascript
app.use(cors({
  origin: ['https://your-app.vercel.app', 'http://localhost:5174']
}));
```
