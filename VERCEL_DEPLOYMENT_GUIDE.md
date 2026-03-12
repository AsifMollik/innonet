# Innonet - Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Your Neon PostgreSQL database URL

## Step 1: Push Code to GitHub

If you haven't already pushed your code to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Ready for Vercel deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure your project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: ./
   - **Build Command**: `prisma generate && next build`
   - **Output Directory**: .next
   - **Install Command**: `npm install`

5. Add Environment Variables (click "Environment Variables"):
   ```
   DATABASE_URL=your_neon_database_url
   NODE_ENV=production
   ```

6. Click "Deploy"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - What's your project's name? innonet
# - In which directory is your code located? ./
# - Want to override the settings? No

# After successful deployment, deploy to production:
vercel --prod
```

## Step 3: Configure Environment Variables on Vercel

1. Go to your project on Vercel Dashboard
2. Click "Settings" → "Environment Variables"
3. Add the following variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `DATABASE_URL` | Your Neon PostgreSQL connection string | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

**Important**: Make sure your DATABASE_URL includes `?sslmode=require` at the end for Neon:
```
postgresql://user:password@host/database?sslmode=require
```

## Step 4: Verify Deployment

1. Wait for the deployment to complete (usually 2-3 minutes)
2. Vercel will provide you with a URL like: `https://innonet.vercel.app`
3. Visit the URL and test:
   - Login/Signup functionality
   - Feed page
   - Post creation
   - Post sharing
   - Messaging
   - Profile pages

## Step 5: Set Up Custom Domain (Optional)

1. Go to your project on Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to configure DNS

## Troubleshooting

### Build Fails

**Issue**: Prisma Client not generated
**Solution**: Ensure `prisma generate` is in the build command

**Issue**: Database connection fails
**Solution**: Check DATABASE_URL environment variable and ensure it includes `?sslmode=require`

### Runtime Errors

**Issue**: 500 Internal Server Error
**Solution**: Check Vercel logs (Project → Deployments → Click deployment → View Function Logs)

**Issue**: Database queries fail
**Solution**: Ensure your Neon database is accessible and the connection string is correct

### Environment Variables Not Working

1. Make sure variables are set for all environments (Production, Preview, Development)
2. Redeploy after adding/changing environment variables
3. Check variable names match exactly (case-sensitive)

## Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Authentication works (login/signup)
- [ ] Posts can be created and viewed
- [ ] Post sharing functionality works
- [ ] Messages can be sent and received
- [ ] Profile pages display correctly
- [ ] Search functionality works
- [ ] Connection requests work
- [ ] Real-time features function properly

## Continuous Deployment

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you push to any other branch or create a PR

To trigger a new deployment:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## Useful Commands

```bash
# View deployment logs
vercel logs

# List all deployments
vercel ls

# Remove a deployment
vercel rm [deployment-url]

# Check project info
vercel inspect
```

## Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Next.js Documentation: https://nextjs.org/docs

## Production URL

After deployment, your app will be available at:
- **Vercel URL**: `https://your-project-name.vercel.app`
- **Custom Domain**: (if configured)

---

**Note**: Make sure to keep your environment variables secure and never commit them to your repository!
