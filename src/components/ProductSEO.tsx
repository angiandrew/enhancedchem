'use client'

import { useEffect } from 'react'

interface ProductSEOProps {
  title: string
  description: string
  price?: number
  image?: string
  url: string
  brand?: string
}

export default function ProductSEO({ title, description, price, image, url, brand = 'Enhanced Chem' }: ProductSEOProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'
  const fullImageUrl = image 
    ? (image.startsWith('http') ? image : `${baseUrl}${image.startsWith('/') ? '' : '/'}${image}`)
    : `${baseUrl}/logos/Logo%20w:%20circle%20background.png`
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`

  useEffect(() => {
    // Update document title (without brand name in title)
    document.title = `${title} - Premium Research Peptides`

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', description)

    // Update or create Open Graph tags
    const ogTags = {
      'og:title': `${title} | ${brand}`,
      'og:description': description,
      'og:image': fullImageUrl,
      'og:url': fullUrl,
      'og:type': 'product',
      'og:site_name': brand,
    }

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    })

    // Add product-specific meta tags
    if (price) {
      let priceTag = document.querySelector('meta[property="product:price:amount"]')
      if (!priceTag) {
        priceTag = document.createElement('meta')
        priceTag.setAttribute('property', 'product:price:amount')
        document.head.appendChild(priceTag)
      }
      priceTag.setAttribute('content', price.toFixed(2))

      let currencyTag = document.querySelector('meta[property="product:price:currency"]')
      if (!currencyTag) {
        currencyTag = document.createElement('meta')
        currencyTag.setAttribute('property', 'product:price:currency')
        document.head.appendChild(currencyTag)
      }
      currencyTag.setAttribute('content', 'USD')
    }

    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', fullUrl)

    // Add keywords meta tag
    const keywords = `${title}, ${brand}, research peptides, peptides, research chemicals, laboratory peptides`
    let keywordsTag = document.querySelector('meta[name="keywords"]')
    if (!keywordsTag) {
      keywordsTag = document.createElement('meta')
      keywordsTag.setAttribute('name', 'keywords')
      document.head.appendChild(keywordsTag)
    }
    keywordsTag.setAttribute('content', keywords)
  }, [title, description, price, image, url, brand, fullImageUrl, fullUrl])

  return null
}
