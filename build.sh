#!/bin/bash

FRONTEND_DIR="./frontend"
BACKEND_PUBLIC_FRONTEND_DIR="./backend/public/frontend"
APP_NAME="frontend"

set -e

echo "Starting frontend build..."
cd "$FRONTEND_DIR"

ng build --configuration production
cd ..

echo "Ensuring backend public frontend folder exists..."
mkdir -p "$BACKEND_PUBLIC_FRONTEND_DIR"

echo "Cleaning old files from backend public frontend folder..."
rm -rf "$BACKEND_PUBLIC_FRONTEND_DIR"/*

echo "Moving frontend build to backend public folder..."
mv "$FRONTEND_DIR"/dist/$APP_NAME/browser/* "$BACKEND_PUBLIC_FRONTEND_DIR"

echo "Frontend build successfully copied to backend/public/frontend."
