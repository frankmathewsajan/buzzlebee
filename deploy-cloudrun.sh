#!/bin/bash

# Configuration - UPDATE THESE VALUES
PROJECT_ID="itzfrank"
SERVICE_NAME="buzzlebee-portfolio"
REGION="us-central1"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting deployment to Google Cloud Run${NC}"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ Error: gcloud CLI is not installed${NC}"
    echo "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if PROJECT_ID is set
if [ "$PROJECT_ID" = "your-gcp-project-id" ]; then
    echo -e "${RED}❌ Error: Please update PROJECT_ID in this script${NC}"
    echo "Edit deploy-cloudrun.sh and set your Google Cloud project ID"
    exit 1
fi

echo -e "${BLUE}📦 Building Docker image...${NC}"
docker build -t ${IMAGE_NAME} .

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Docker build failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker image built successfully${NC}"

echo -e "${BLUE}🔐 Configuring Docker authentication...${NC}"
gcloud auth configure-docker

echo -e "${BLUE}⬆️  Pushing image to Google Container Registry...${NC}"
docker push ${IMAGE_NAME}

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Docker push failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Image pushed successfully${NC}"

echo -e "${BLUE}🌐 Deploying to Cloud Run...${NC}"
gcloud run deploy ${SERVICE_NAME} \
  --image=${IMAGE_NAME} \
  --platform=managed \
  --region=${REGION} \
  --allow-unauthenticated \
  --memory=512Mi \
  --cpu=1 \
  --max-instances=10 \
  --labels=dev-tutorial=devnewyear2026 \
  --project=${PROJECT_ID}

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Deployment successful!${NC}"

# Get the service URL
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} \
  --platform=managed \
  --region=${REGION} \
  --format='value(status.url)' \
  --project=${PROJECT_ID})

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 Your portfolio is live at:${NC}"
echo -e "${BLUE}${SERVICE_URL}${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Verify the label
echo -e "${BLUE}🏷️  Verifying label...${NC}"
gcloud run services describe ${SERVICE_NAME} \
  --platform=managed \
  --region=${REGION} \
  --format='value(metadata.labels)' \
  --project=${PROJECT_ID}

echo -e "${GREEN}✅ Deployment complete with label: dev-tutorial=devnewyear2026${NC}"
