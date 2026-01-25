import { NextResponse } from 'next/server'

// Disable caching for this route
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const fetchCache = 'force-no-store'

export async function GET() {
  // Basic health check endpoint
  const timestamp = new Date().toISOString()
  
  return NextResponse.json({
    status: 'healthy',
    timestamp,
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  })
}
