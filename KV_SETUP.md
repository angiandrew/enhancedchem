# Vercel KV Setup Guide - Persistent Order Numbers

✅ **Status**: Redis database connected and working!

This guide will help you set up Vercel KV (Redis) to store order numbers persistently across deployments.

## Why Vercel KV?

Without Vercel KV, order numbers reset to #1000 every time your Vercel deployment restarts or redeploys. Vercel KV provides persistent storage so your order numbers continue incrementing correctly.

## Setup Steps

### 1. Create a Vercel KV Database

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (`enhancedchem`)
3. Go to the **Storage** tab
4. Click **Create Database**
5. Select **KV** (Redis)
6. Give it a name (e.g., `enhancedchem-kv`)
7. Select a region (choose closest to your users)
8. Click **Create**

### 2. Connect to Your Project

1. After creating the KV database, Vercel will automatically detect your project
2. Click **Connect** to link it to your project
3. Vercel will automatically add the environment variables:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`

### 3. Redeploy Your Application

After connecting the KV database:

1. Go to **Settings** → **Environment Variables** in your Vercel project
2. Verify the KV variables are present:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
3. Go to **Deployments** tab
4. Click the three dots (⋯) on your latest deployment
5. Click **Redeploy** to apply the new environment variables

### 4. Test It

1. Place a test order on your production site
2. Check the order number (should start from #1000 or continue from last number)
3. Place another order
4. Order numbers should increment sequentially (#1001, #1002, etc.)

## How It Works

- **Order numbers**: Stored in KV under the key `lastOrderNumber`
- **Orders**: Stored in KV under the key `orders` (last 1000 orders)
- **Fallback**: If KV is not configured, the system falls back to in-memory storage (which resets on restart)

## Free Tier

Vercel KV has a generous free tier:
- **30,000 commands/day**
- **256 MB storage**
- Perfect for storing order numbers and order history

## Troubleshooting

**Order numbers still resetting?**
- Verify KV environment variables are set in Vercel
- Check that the KV database is connected to your project
- Redeploy your application after connecting KV

**Need to reset order numbers?**
You can manually set the starting number in Vercel KV:
1. Go to Vercel Dashboard → Your KV database
2. Use the KV web interface to set `lastOrderNumber` to the desired starting number (e.g., `999` for next order to be `#1000`)

## Local Development

For local development, the system will use file-based storage (`data/orders.json`) instead of KV. This works perfectly for testing without setting up KV locally.
