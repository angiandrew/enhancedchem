import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const products = [
    'bpc-157-5mg',
    'bpc-157',
    'bpc-157-10mg',
    'bpc-157-20mg',
    'tb-500-5mg',
    'tb-500',
    'ghk-cu',
    'ghk-cu-100mg',
    'kpv-5mg',
    'kpv',
    'semax',
    'selank',
    'bpc-tb-mix',
    'bpc-tb-mix-10mg',
    'mix-peptide',
    'nad-500mg',
    'reta-5mg',
    'reta',
    'reta-15mg',
    'reta-20mg',
    'melanotan-2',
    'tesamorelin-10mg',
    'glp-2tz',
    'klow-80mg',
    'cjc-1295-2mg',
    'cjc-1295-5mg',
    'cjc-1295-no-dac-5mg',
    'cjc-1295-no-dac',
    'ipamorelin-5mg',
    'ipamorelin',
    'ipamorelin-cjc-1295-5mg',
    'ipamorelin-cjc-1295-10mg',
  ]

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/equipment`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...routes, ...productRoutes]
}
