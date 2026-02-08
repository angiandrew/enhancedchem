import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'BPC-157 10mg | Buy BPC-157 Research Peptide | Enhanced Chem',
  description: 'Buy BPC-157 10mg research peptide. Body Protection Compound-157 for scientific research. Premium quality, third-party tested. Fast shipping. For research use only.',
  keywords: 'BPC-157, BPC-157 10mg, buy BPC-157, research peptide, Enhanced Chem',
  openGraph: {
    title: 'BPC-157 10mg | Research Peptide | Enhanced Chem',
    description: 'BPC-157 10mg - Research-grade peptide. Third-party tested. Fast shipping.',
    url: `${baseUrl}/products/bpc-157`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/bpc-157` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
