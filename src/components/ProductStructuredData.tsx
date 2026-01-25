'use client'

import Script from 'next/script'

interface ProductStructuredDataProps {
  product: {
    name: string
    description: string
    price: number
    originalPrice?: number
    image: string
    inStock: boolean
    brand?: string
    sku?: string
    url: string
  }
}

export default function ProductStructuredData({ product }: ProductStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'
  const fullImageUrl = product.image.startsWith('http') 
    ? product.image 
    : `${baseUrl}${product.image.startsWith('/') ? '' : '/'}${product.image}`

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const structuredData: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: fullImageUrl,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Enhanced Chem'
    },
    sku: product.sku || product.name.replace(/\s+/g, '-').toLowerCase(),
    offers: {
      '@type': 'Offer',
      url: product.url,
      priceCurrency: 'USD',
      price: product.price.toFixed(2),
      availability: product.inStock 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Enhanced Chem'
      },
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '50'
    }
  }

  if (product.originalPrice && product.originalPrice > product.price) {
    structuredData.offers.priceSpecification = {
      '@type': 'UnitPriceSpecification',
      price: product.price.toFixed(2),
      priceCurrency: 'USD',
      referenceQuantity: {
        '@type': 'QuantitativeValue',
        value: 1,
        unitCode: 'C62'
      }
    }
  }

  return (
    <Script
      id="product-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
