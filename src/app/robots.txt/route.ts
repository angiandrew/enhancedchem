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

# Crawl delay for non-Google bots (Googlebot ignores this directive)
Crawl-delay: 5

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'}/sitemap.xml

# Googlebot - No crawl delay, full access
User-agent: Googlebot
Allow: /
Allow: /products/
Allow: /equipment/
Allow: /about/
Allow: /contact/
Crawl-delay: 0

# Bingbot
User-agent: Bingbot
Allow: /
Allow: /products/
Allow: /equipment/
Allow: /about/
Allow: /contact/`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  })
}





