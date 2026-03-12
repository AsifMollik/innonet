#!/bin/bash

echo "🚀 Innonet Vercel Deployment Script"
echo "===================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git repository already initialized"
fi

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo ""
    echo "⚠️  Vercel CLI not found. Installing..."
    npm install -g vercel
    echo "✅ Vercel CLI installed"
else
    echo "✅ Vercel CLI already installed"
fi

echo ""
echo "📋 Pre-deployment checklist:"
echo "1. Ensure your code is committed to Git"
echo "2. Have your Neon DATABASE_URL ready"
echo "3. Have a Vercel account (https://vercel.com)"
echo ""

read -p "Ready to deploy? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🔨 Building project locally to check for errors..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful!"
        echo ""
        echo "🚀 Starting Vercel deployment..."
        echo ""
        vercel --prod
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "🎉 Deployment successful!"
            echo ""
            echo "📝 Next steps:"
            echo "1. Go to https://vercel.com/dashboard"
            echo "2. Find your project and click on it"
            echo "3. Go to Settings → Environment Variables"
            echo "4. Add your DATABASE_URL"
            echo "5. Redeploy if needed"
            echo ""
            echo "✨ Your app should be live shortly!"
        else
            echo "❌ Deployment failed. Check the error messages above."
        fi
    else
        echo "❌ Build failed. Please fix the errors before deploying."
        exit 1
    fi
else
    echo "Deployment cancelled."
    exit 0
fi
