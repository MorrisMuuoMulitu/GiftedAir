#!/bin/bash

# 🚀 Gifted Air - Quick Deploy Script

echo "🚀 Gifted Air Deployment Script"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Must run from GiftedAir2 root directory"
    exit 1
fi

# Step 1: Check for GA4 ID
echo "📊 Step 1: Checking Google Analytics..."
if grep -q "G-XXXXXXXXXX" frontend/index.html; then
    echo "⚠️  WARNING: Google Analytics ID not updated!"
    echo "   Please update frontend/index.html lines 71 & 77"
    echo "   Replace G-XXXXXXXXXX with your actual GA4 ID"
    echo ""
    read -p "   Continue anyway? (y/n): " continue
    if [ "$continue" != "y" ]; then
        echo "   Aborted. Update GA4 ID first."
        exit 0
    fi
else
    echo "✅ GA4 ID configured"
fi
echo ""

# Step 2: Build frontend
echo "🔨 Step 2: Building frontend..."
cd frontend
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Check errors above."
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Step 3: Check Vercel CLI
echo "📦 Step 3: Checking Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI not found!"
    echo ""
    read -p "   Install Vercel CLI now? (y/n): " install
    if [ "$install" = "y" ]; then
        echo "   Installing Vercel CLI..."
        npm install -g vercel
        if [ $? -ne 0 ]; then
            echo "   ❌ Failed to install. Try: sudo npm install -g vercel"
            exit 1
        fi
        echo "   ✅ Vercel CLI installed!"
    else
        echo "   Aborted. Install Vercel CLI first: npm install -g vercel"
        exit 0
    fi
else
    echo "✅ Vercel CLI ready"
fi
echo ""

# Step 4: Deploy
echo "🚀 Step 4: Deploying to production..."
echo ""
read -p "Ready to deploy? (y/n): " deploy

if [ "$deploy" = "y" ]; then
    echo ""
    echo "🚀 Deploying..."
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 DEPLOYMENT SUCCESSFUL!"
        echo ""
        echo "Next steps:"
        echo "1. Test your live site"
        echo "2. Point giftedair.com domain (if not already)"
        echo "3. Submit sitemap to Google Search Console"
        echo ""
        echo "See LAUNCH_CHECKLIST.md for details"
    else
        echo ""
        echo "❌ Deployment failed. Check errors above."
    fi
else
    echo "Deployment cancelled."
fi

cd ..
