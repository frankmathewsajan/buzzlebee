# Build stage - Build the Next.js static site
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Build the static export
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production stage - Serve with Nginx
FROM nginx:alpine

# Copy the static build output to Nginx html directory
COPY --from=builder /app/out /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run expects the container to listen on port 8080
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
