import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'Retatrutide 15mg | Buy Retatrutide Research Peptide | Enhanced Chem',
  description: 'Buy Retatrutide 15mg research peptide. Triple agonist (GLP-1, GIP, glucagon). Premium quality, third-party tested. For research use only. Fast shipping.',
  keywords: 'retatrutide 15mg, buy retatrutide 15mg, retatrutide peptide, research peptide, Enhanced Chem',
  openGraph: {
    title: 'Retatrutide 15mg | Research Peptide | Enhanced Chem',
    description: 'Retatrutide 15mg - Triple agonist research peptide. Third-party tested. Fast shipping.',
    url: `${baseUrl}/products/retatrutide-15mg`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/retatrutide-15mg` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
