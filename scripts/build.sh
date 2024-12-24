#!/bin/bash

# Clean install dependencies
echo "🧹 Cleaning node_modules..."
rm -rf node_modules
rm -rf .next

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps

# Build the application
echo "🏗️ Building application..."
npm run build 