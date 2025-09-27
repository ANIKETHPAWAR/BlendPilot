#!/bin/bash

echo "🚀 Starting BlendPilot Backend Deployment..."

# Clean install
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building TypeScript..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🚀 Starting server..."
    npm start
else
    echo "❌ Build failed!"
    exit 1
fi
