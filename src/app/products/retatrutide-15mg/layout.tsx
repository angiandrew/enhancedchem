import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'Reta 15mg | Buy Reta Research Peptide | Enhanced Chem',
  description: 'Buy Reta 15mg research peptide. Triple agonist (GLP-1, GIP, glucagon). Premium quality, third-party tested. For research use only. Fast shipping.',
  keywords: 'reta 15mg, retatrutide 15mg, buy reta 15mg, research peptide, Enhanced Chem',
  openGraph: {
    title: 'Reta 15mg | Research Peptide | Enhanced Chem',
    description: 'Reta 15mg - Triple agonist research peptide. Third-party tested. Fast shipping.',
    url: `${baseUrl}/products/retatrutide-15mg`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/retatrutide-15mg` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
