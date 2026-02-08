import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'TB-500 | Buy TB-500 Research Peptide 5mg 10mg | Enhanced Chem',
  description: 'Buy TB-500 (Thymosin Beta-4 fragment) research peptide - 5mg and 10mg. Premium quality, third-party tested. Fast shipping. For research use only.',
  keywords: 'TB-500, buy TB-500, TB-500 peptide, thymosin beta-4, research peptide, Enhanced Chem',
  openGraph: {
    title: 'TB-500 | Research Peptide | Enhanced Chem',
    description: 'TB-500 5mg & 10mg - Research-grade peptide. Third-party tested. Fast shipping.',
    url: `${baseUrl}/products/tb-500`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/tb-500` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
