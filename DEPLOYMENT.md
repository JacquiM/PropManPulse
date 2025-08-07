# Property Management Pulse - GitHub Pages Deployment

This project has been configured for deployment to GitHub Pages with automatic demo mode for static hosting.

## Deployment Instructions

### Automatic Deployment (Recommended)

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select "GitHub Actions"

2. **Push to Main Branch**:
   ```bash
   git add .
   git commit -m "Prepare for GitHub Pages deployment"
   git push origin main
   ```

3. **Monitor Deployment**:
   - Go to the "Actions" tab in your repository
   - Watch the deployment workflow complete
   - Your site will be available at: `https://yourusername.github.io/PropManPulse/`

### Manual Deployment

If you prefer to deploy manually:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build for production**:
   ```bash
   npm run build:client
   ```

3. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

## Demo Mode

When deployed to GitHub Pages, the application automatically runs in **demo mode**:

- **Auto-login**: Users are automatically logged in as a demo user
- **Mock Data**: All data (stats, activities, inspections) comes from mock sources
- **Client-Side Only**: No server-side functionality is required
- **Full UI**: All features are accessible for demonstration

### Demo Features Available:
- Dashboard with property statistics
- Maintenance ticket management
- Compliance tracking
- Community management
- Rental management
- Property listings

## Configuration

### Environment Variables (Optional)

For production deployments with a real backend, you can set:

- `VITE_API_URL`: Your backend API URL

### Customizing the Base Path

If deploying to a different repository name, update the `base` path in `vite.config.ts`:

```typescript
base: process.env.NODE_ENV === "production" ? "/YourRepoName/" : "/",
```

## Development

For local development:

```bash
npm run dev
```

This will run the full-stack application with the Express server.

## Build Process

The GitHub Actions workflow:

1. Installs dependencies
2. Builds the client-side application
3. Uploads the built files to GitHub Pages
4. Deploys automatically

## Troubleshooting

### Deployment Fails

1. Check that GitHub Pages is enabled in repository settings
2. Ensure the workflow has proper permissions
3. Verify the build completes successfully

### Routing Issues

The application includes:
- `404.html` for handling client-side routing
- URL rewriting script in `index.html`
- Proper base path configuration

### Demo Mode Not Working

Ensure the build is running in production mode - demo mode only activates when `import.meta.env.PROD` is true and no `VITE_API_URL` is set.

## Repository Structure for Deployment

```
├── .github/workflows/deploy.yml  # GitHub Actions workflow
├── client/
│   ├── public/404.html          # Handles client-side routing
│   ├── index.html               # Updated with routing script
│   └── src/
│       ├── lib/
│       │   ├── config.ts        # Environment configuration
│       │   ├── demo-user.ts     # Demo user data
│       │   └── mock-data.ts     # Mock API data
│       └── vite-env.d.ts        # TypeScript environment types
├── vite.config.ts               # Updated with base path
└── package.json                 # Updated with deployment scripts
```
