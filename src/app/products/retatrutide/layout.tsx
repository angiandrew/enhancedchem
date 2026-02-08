import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'Retatrutide | Buy Retatrutide 5mg 10mg 15mg 20mg Research Peptide | Enhanced Chem',
  description: 'Buy Retatrutide research peptide - 5mg, 10mg, 15mg, 20mg. Triple agonist (GLP-1, GIP, glucagon). Premium quality, third-party tested. For research use only. Fast shipping.',
  keywords: 'retatrutide, buy retatrutide, retatrutide peptide, retatrutide research, retatrutide 10mg, retatrutide 5mg, retatrutide 15mg, retatrutide 20mg, research peptide, Enhanced Chem',
  openGraph: {
    title: 'Retatrutide | Buy Retatrutide Research Peptide | Enhanced Chem',
    description: 'Retatrutide 5mg, 10mg, 15mg, 20mg. Triple agonist research peptide. Third-party tested. Fast shipping.',
    url: `${baseUrl}/products/retatrutide`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/retatrutide` },
}

export default function RetatrutideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
