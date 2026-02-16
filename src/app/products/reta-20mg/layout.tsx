import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'Reta 20mg | Buy Reta Research Peptide | Enhanced Chem',
  description: 'Buy Reta 20mg research peptide. Triple agonist (GLP-1, GIP, glucagon). Premium quality, third-party tested. For research use only. Fast shipping.',
  keywords: 'reta 20mg, retatrutide 20mg, buy reta 20mg, research peptide, Enhanced Chem',
  openGraph: {
    title: 'Reta 20mg | Research Peptide | Enhanced Chem',
    description: 'Reta 20mg - Triple agonist research peptide. Third-party tested. Fast shipping.',
    url: `${baseUrl}/products/reta-20mg`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/reta-20mg` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
