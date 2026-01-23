#!/bin/bash
# Clean restart script for Next.js dev server

cd "$(dirname "$0")"

echo "🛑 Stopping any running dev servers..."
lsof -ti:3001 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null
pkill -f "next dev" 2>/dev/null
sleep 2

echo "🧹 Cleaning build cache..."
rm -rf .next node_modules/.cache .turbo .swc 2>/dev/null

echo "🚀 Starting dev server on port 3001..."
PORT=3001 npm run dev
