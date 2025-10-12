import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()

// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 30, // 30 requests per minute per IP
  maxRequestsPerHour: 1000, // 1000 requests per hour per IP
}

// Bot detection patterns
const BOT_PATTERNS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /curl/i,
  /wget/i,
  /python/i,
  /java/i,
  /php/i,
  /go-http/i,
  /okhttp/i,
  /postman/i,
  /insomnia/i,
]

// Suspicious user agents
const SUSPICIOUS_UA = [
  'masscan',
  'nmap',
  'sqlmap',
  'nikto',
  'dirb',
  'gobuster',
  'wfuzz',
  'burpsuite',
]

function getRateLimitKey(request: NextRequest): string {
  // Use IP address as the key
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded ? forwarded.split(',')[0] : realIp || 'unknown'
  return ip
}

function isBot(userAgent: string): boolean {
  // Check against bot patterns
  if (BOT_PATTERNS.some(pattern => pattern.test(userAgent))) {
    return true
  }
  
  // Check against suspicious user agents
  if (SUSPICIOUS_UA.some(ua => userAgent.toLowerCase().includes(ua))) {
    return true
  }
  
  // Check for empty or very short user agents (often bots)
  if (!userAgent || userAgent.length < 10) {
    return true
  }
  
  // Check for missing common browser headers
  return false
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT.windowMs
  
  // Clean up old entries
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.lastReset < windowStart) {
      rateLimitMap.delete(key)
    }
  }
  
  const current = rateLimitMap.get(ip) || { count: 0, lastReset: now }
  
  // Reset if window has passed
  if (current.lastReset < windowStart) {
    current.count = 0
    current.lastReset = now
  }
  
  // Check if limit exceeded
  if (current.count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, remaining: 0 }
  }
  
  // Increment counter
  current.count++
  rateLimitMap.set(ip, current)
  
  return { 
    allowed: true, 
    remaining: Math.max(0, RATE_LIMIT.maxRequests - current.count) 
  }
}

function isSuspiciousRequest(request: NextRequest): boolean {
  // Check for suspicious query parameters
  const url = request.url
  const suspiciousParams = ['union', 'select', 'drop', 'delete', 'insert', 'update', 'script', 'javascript', 'onload', 'onerror']
  
  if (suspiciousParams.some(param => url.toLowerCase().includes(param))) {
    return true
  }
  
  // Check for excessive query parameters
  const searchParams = new URL(url).searchParams
  if (searchParams.size > 20) {
    return true
  }
  
  // Check for suspicious paths
  const pathname = request.nextUrl.pathname
  const suspiciousPaths = ['/admin', '/wp-admin', '/phpmyadmin', '/.env', '/config', '/backup']
  
  if (suspiciousPaths.some(path => pathname.toLowerCase().includes(path))) {
    return true
  }
  
  return false
}

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  const ip = getRateLimitKey(request)
  
  // Block bots
  if (isBot(userAgent)) {
    console.log(`Blocked bot: ${ip} - ${userAgent}`)
    return new NextResponse('Access Denied', { 
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
      }
    })
  }
  
  // Block suspicious requests
  if (isSuspiciousRequest(request)) {
    console.log(`Blocked suspicious request: ${ip} - ${request.url}`)
    return new NextResponse('Access Denied', { 
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
      }
    })
  }
  
  // Rate limiting
  const rateLimit = checkRateLimit(ip)
  if (!rateLimit.allowed) {
    console.log(`Rate limit exceeded: ${ip}`)
    return new NextResponse('Rate limit exceeded. Please try again later.', { 
      status: 429,
      headers: {
        'Content-Type': 'text/plain',
        'Retry-After': '60',
        'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': new Date(Date.now() + RATE_LIMIT.windowMs).toISOString(),
      }
    })
  }
  
  // Add security headers
  const response = NextResponse.next()
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';"
  )
  
  // Rate limit headers
  response.headers.set('X-RateLimit-Limit', RATE_LIMIT.maxRequests.toString())
  response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString())
  response.headers.set('X-RateLimit-Reset', new Date(Date.now() + RATE_LIMIT.windowMs).toISOString())
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
