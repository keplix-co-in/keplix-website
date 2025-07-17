# GitHub Pages Deployment Instructions

## Quick Setup

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/Keplix-website.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"
   - Save the settings

3. **Automatic Deployment:**
   - Every push to the `main` branch will trigger automatic deployment
   - Check the "Actions" tab to see deployment progress
   - Your site will be live at: `https://yourusername.github.io/Keplix-website/`

## Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Install dependencies (if not already done)
npm install

# Deploy manually
npm run deploy
```

## Important Notes

1. **Repository Name:** The repository should be named `Keplix-website` to match the base path in `vite.config.ts`

2. **Custom Domain (Optional):** 
   - If you want to use a custom domain, create a `CNAME` file in the `public` folder
   - Add your domain name to the CNAME file

3. **Base Path:** 
   - The site is configured with base path `/Keplix-website/`
   - If you change the repository name, update the `base` property in `vite.config.ts`

## Troubleshooting

- **404 Error:** Make sure the repository name matches the base path in vite.config.ts
- **Build Fails:** Check the Actions tab for error details
- **Assets Not Loading:** Verify the base path configuration

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
