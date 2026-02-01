# Deploy to Google Cloud Run - Dev New Year 2026 Challenge

This guide will help you deploy your portfolio to Google Cloud Run with the required label `dev-tutorial=devnewyear2026`.

## Prerequisites

### 1. Google Cloud Account
- Create a Google Cloud account at [cloud.google.com](https://cloud.google.com)
- Enable billing (free tier available)

### 2. Install Google Cloud CLI
Download and install from: https://cloud.google.com/sdk/docs/install

#### Verify installation:
```bash
gcloud --version
```

### 3. Install Docker Desktop
Download from: https://www.docker.com/products/docker-desktop

## Setup Steps

### 1. Authenticate with Google Cloud
```bash
gcloud auth login
```

### 2. Create a New Project (or use existing)
```bash
# Create new project
gcloud projects create your-unique-project-id --name="Buzzlebee Portfolio"

# Set as active project
gcloud config set project your-unique-project-id
```

### 3. Enable Required APIs
```bash
# Enable Cloud Run API
gcloud services enable run.googleapis.com

# Enable Container Registry API
gcloud services enable containerregistry.googleapis.com
```

### 4. Configure Deployment Script
Edit `deploy-cloudrun.sh` and update the `PROJECT_ID`:
```bash
PROJECT_ID="your-unique-project-id"  # Change this to your actual project ID
```

## Deployment

### Option 1: Using the Deployment Script (Recommended)

Make the script executable (Git Bash or WSL on Windows):
```bash
chmod +x deploy-cloudrun.sh
```

Run the deployment:
```bash
npm run deploy:cloudrun
```

### Option 2: Manual Deployment

1. **Build the Docker image:**
```bash
docker build -t gcr.io/your-project-id/buzzlebee-portfolio .
```

2. **Push to Container Registry:**
```bash
gcloud auth configure-docker
docker push gcr.io/your-project-id/buzzlebee-portfolio
```

3. **Deploy to Cloud Run:**
```bash
gcloud run deploy buzzlebee-portfolio \
  --image=gcr.io/your-project-id/buzzlebee-portfolio \
  --platform=managed \
  --region=us-central1 \
  --allow-unauthenticated \
  --memory=512Mi \
  --cpu=1 \
  --labels=dev-tutorial=devnewyear2026 \
  --project=your-project-id
```

## Verify Deployment

### Check Service URL
```bash
gcloud run services describe buzzlebee-portfolio \
  --platform=managed \
  --region=us-central1 \
  --format='value(status.url)'
```

### Verify Label
```bash
gcloud run services describe buzzlebee-portfolio \
  --platform=managed \
  --region=us-central1 \
  --format='value(metadata.labels)'
```

You should see: `dev-tutorial=devnewyear2026`

## Embedding in Submission Post

Once deployed, you'll get a URL like: `https://buzzlebee-portfolio-xxxxx-uc.a.run.app`

### Embed using iframe:
```html
<iframe 
  src="https://your-cloudrun-url.run.app" 
  width="100%" 
  height="600px" 
  frameborder="0"
  title="Buzzlebee Portfolio">
</iframe>
```

### Or provide as a link:
```markdown
[View Live Portfolio](https://your-cloudrun-url.run.app)
```

## Updating Your Deployment

To update your portfolio after making changes:

1. Make your code changes
2. Run the deployment script again:
```bash
npm run deploy:cloudrun
```

The script will rebuild and redeploy automatically.

## Troubleshooting

### "Permission Denied" Error
Make sure you've authenticated and set the correct project:
```bash
gcloud auth login
gcloud config set project your-project-id
```

### Docker Build Fails
- Ensure Docker Desktop is running
- Check that all files are committed (the build uses your local files)

### Deployment Fails
- Verify billing is enabled on your Google Cloud project
- Check that all required APIs are enabled
- Ensure you have sufficient quotas

### Site Not Loading
- Check the logs: `gcloud run logs tail buzzlebee-portfolio --region=us-central1`
- Verify the build output folder (`out/`) has all necessary files
- Ensure `next.config.mjs` has `output: "export"` set

## Cost Information

Cloud Run pricing:
- **Free tier**: 2 million requests/month, 360,000 GB-seconds/month
- This portfolio should stay well within free tier limits
- You only pay for actual requests (serverless)

## Support

For issues:
1. Check Cloud Run logs: `gcloud run logs tail buzzlebee-portfolio`
2. Review the [Cloud Run documentation](https://cloud.google.com/run/docs)
3. Check the [Dev New Year 2026 challenge guidelines](https://dev.to/challenges/newyear2026)
