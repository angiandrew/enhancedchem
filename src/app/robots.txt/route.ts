import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `User-agent: *
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /checkout/
Disallow: /cart/

# Allow search engines to index main content
Allow: /
Allow: /products/
Allow: /equipment/

# Crawl delay to prevent excessive requests
Crawl-delay: 10

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'}/sitemap.xml`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  })
}



