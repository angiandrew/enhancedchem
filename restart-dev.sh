#!/bin/bash
# Clean restart script for Next.js dev server - ALWAYS USE THIS

cd "$(dirname "$0")"

echo "🛑 Stopping any running dev servers..."
pkill -9 -f "next dev" 2>/dev/null
lsof -ti:3001 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null
sleep 2

echo "🧹 Cleaning ALL build caches..."
rm -rf .next node_modules/.cache .turbo .swc .vercel 2>/dev/null

echo "🔨 Running build check..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed - check errors above"
    exit 1
fi

echo "🚀 Starting dev server on port 3001..."
PORT=3001 npm run dev
