import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'Reta 5mg | Buy Reta Research Peptide | Enhanced Chem',
  description: 'Buy Reta 5mg research peptide. Triple agonist (GLP-1, GIP, glucagon). Premium quality, third-party tested. For research use only. Fast shipping.',
  keywords: 'reta 5mg, retatrutide 5mg, buy reta 5mg, research peptide, Enhanced Chem',
  openGraph: {
    title: 'Reta 5mg | Research Peptide | Enhanced Chem',
    description: 'Reta 5mg - Triple agonist research peptide. Third-party tested. Fast shipping.',
    url: `${baseUrl}/products/retatrutide-5mg`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/retatrutide-5mg` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
