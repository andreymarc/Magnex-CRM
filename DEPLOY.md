# Deploying to Netlify

## Option 1: Deploy via Netlify CLI (Recommended)

1. Install Netlify CLI globally:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize and deploy:
```bash
netlify init
# Follow the prompts:
# - Create & configure a new site
# - Team: Select your team
# - Site name: (choose a name or press enter for random)
# - Build command: npm run build
# - Directory to deploy: dist

# Or deploy directly:
netlify deploy --prod
```

## Option 2: Deploy via Netlify Dashboard (Easiest)

1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign up or log in
3. Click "Add new site" → "Import an existing project"
4. Connect to Git (GitHub, GitLab, or Bitbucket)
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click "Deploy site"

## Option 3: Drag & Drop (Quick Test)

1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag and drop the `dist` folder to the deploy area
3. Your site will be live in seconds!

## Important Notes

- The `netlify.toml` file is already configured for React Router
- All routes will redirect to `index.html` for client-side routing
- The build output is in the `dist` folder
- Make sure to commit and push your code to git before deploying

## After Deployment

- Your site will have a URL like: `https://your-site-name.netlify.app`
- You can customize the domain in Netlify settings
- Enable HTTPS (automatic on Netlify)
- Set up custom domain if needed

