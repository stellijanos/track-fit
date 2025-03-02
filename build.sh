#!/bin/bash

FRONTEND_DIR="./frontend"
BACKEND_PUBLIC_FRONTEND_DIR="./backend/public/frontend"

set -e

echo "Starting frontend build..."
cd "$FRONTEND_DIR"

npm run build
cd ..

echo "Ensuring backend public frontend folder exists..."
mkdir -p "$BACKEND_PUBLIC_FRONTEND_DIR"

echo "Cleaning old files from backend public frontend folder..."
rm -rf "$BACKEND_PUBLIC_FRONTEND_DIR"/*

echo "Copying frontend build to backend public folder..."
cp -r "$FRONTEND_DIR"/dist/angular-app/browser/* "$BACKEND_PUBLIC_FRONTEND_DIR"

echo "Frontend build successfully copied to backend/public/frontend."
