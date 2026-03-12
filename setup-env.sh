#!/bin/bash

echo "Setting up environment variables for Vercel..."
echo ""

# Read DATABASE_URL from .env
DATABASE_URL=$(grep DATABASE_URL .env | cut -d '=' -f2- | tr -d '"')

echo "Adding DATABASE_URL to Vercel..."
echo "$DATABASE_URL" | vercel env add DATABASE_URL production

echo ""
echo "Adding NODE_ENV to Vercel..."
echo "production" | vercel env add NODE_ENV production

echo ""
echo "✅ Environment variables added!"
echo ""
echo "Now redeploying with environment variables..."
vercel --prod --yes

echo ""
echo "🎉 Deployment complete!"
echo "Your app is live at: https://innonet.vercel.app"
