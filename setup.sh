#!/bin/bash

set -e

cd backend
cp .env.example .env 
npm install

cd ../frontend
npm install 
cd ..
sh build.sh
