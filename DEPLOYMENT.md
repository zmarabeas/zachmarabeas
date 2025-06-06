# Deployment Guide

## Quick Deploy to Vercel

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit - Portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the configuration from `vercel.json`
5. Click "Deploy"

### Step 3: Configure Domain (Optional)
1. In your Vercel dashboard, go to your project
2. Navigate to "Settings" > "Domains"
3. Add your custom domain if you have one

## Manual Configuration

If automatic detection doesn't work, use these settings in Vercel:

**Build & Development Settings:**
- Framework Preset: `Other`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables:**
No environment variables are required for this project.

## File Structure for Deployment

The project is configured with:
- `vercel.json` - Vercel deployment configuration
- `.vercelignore` - Files to exclude from deployment
- Static files in `public/` directory
- API routes in `server/` directory

## Troubleshooting

### Common Issues:

1. **Build Fails**: Check that all dependencies are in package.json
2. **API Routes Don't Work**: Ensure server files are in the `server/` directory
3. **Static Files Missing**: Verify files are in the `public/` directory
4. **PDF Download Issues**: Confirm `ZachMarabeas_2025.pdf` is in the `public/` folder

### Build Output:
- Client files: `dist/`
- Server function: `server/index.ts`
- Static assets: `public/`

## Performance Optimizations

The deployment includes:
- Automatic code splitting
- Image optimization
- Static file caching
- API route optimization
- CSS/JS minification

## Updates and Maintenance

To update your deployed site:
1. Make changes to your code
2. Push to GitHub
3. Vercel automatically redeploys from the main branch

## Local Testing

Test production build locally:
```bash
npm run build
npm run start
```

Visit `http://localhost:5000` to test the production build.