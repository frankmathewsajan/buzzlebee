# Configuration - UPDATE THESE VALUES
$PROJECT_ID = "itzfrank"
$SERVICE_NAME = "itzfrank"
$REGION = "us-central1"
$IMAGE_NAME = "gcr.io/$PROJECT_ID/$SERVICE_NAME"

Write-Host "🚀 Starting deployment to Google Cloud Run" -ForegroundColor Blue

# Check if gcloud is installed
if (-not (Get-Command gcloud -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Error: gcloud CLI is not installed" -ForegroundColor Red
    Write-Host "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
}

# Check if PROJECT_ID is set
if ($PROJECT_ID -eq "your-gcp-project-id") {
    Write-Host "❌ Error: Please update PROJECT_ID in this script" -ForegroundColor Red
    Write-Host "Edit deploy-cloudrun.ps1 and set your Google Cloud project ID"
    exit 1
}

Write-Host "📦 Building Docker image..." -ForegroundColor Blue
docker build -t $IMAGE_NAME .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker build failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Docker image built successfully" -ForegroundColor Green

Write-Host "🔐 Configuring Docker authentication..." -ForegroundColor Blue
gcloud auth configure-docker

Write-Host "⬆️  Pushing image to Google Container Registry..." -ForegroundColor Blue
docker push $IMAGE_NAME

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker push failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Image pushed successfully" -ForegroundColor Green

Write-Host "🌐 Deploying to Cloud Run..." -ForegroundColor Blue
gcloud run deploy $SERVICE_NAME `
  --image=$IMAGE_NAME `
  --platform=managed `
  --region=$REGION `
  --allow-unauthenticated `
  --memory=512Mi `
  --cpu=1 `
  --max-instances=10 `
  --labels=dev-tutorial=devnewyear2026 `
  --project=$PROJECT_ID

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Deployment successful!" -ForegroundColor Green

# Get the service URL
$SERVICE_URL = gcloud run services describe $SERVICE_NAME `
  --platform=managed `
  --region=$REGION `
  --format='value(status.url)' `
  --project=$PROJECT_ID

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "🎉 Your portfolio is live at:" -ForegroundColor Green
Write-Host $SERVICE_URL -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green

# Verify the label
Write-Host "🏷️  Verifying label..." -ForegroundColor Blue
gcloud run services describe $SERVICE_NAME `
  --platform=managed `
  --region=$REGION `
  --format='value(metadata.labels)' `
  --project=$PROJECT_ID

Write-Host "✅ Deployment complete with label: dev-tutorial=devnewyear2026" -ForegroundColor Green
