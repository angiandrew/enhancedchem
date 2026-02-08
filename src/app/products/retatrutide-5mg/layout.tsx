import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'Retatrutide 5mg | Buy Retatrutide Research Peptide | Enhanced Chem',
  description: 'Buy Retatrutide 5mg research peptide. Triple agonist (GLP-1, GIP, glucagon). Premium quality, third-party tested. For research use only. Fast shipping.',
  keywords: 'retatrutide 5mg, buy retatrutide 5mg, retatrutide peptide, research peptide, Enhanced Chem',
  openGraph: {
    title: 'Retatrutide 5mg | Research Peptide | Enhanced Chem',
    description: 'Retatrutide 5mg - Triple agonist research peptide. Third-party tested. Fast shipping.',
    url: `${baseUrl}/products/retatrutide-5mg`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/retatrutide-5mg` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
