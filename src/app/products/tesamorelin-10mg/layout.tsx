import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'Tesamorelin 10mg | Buy Tesamorelin for Research | Enhanced Chem',
  description: 'Buy Tesamorelin 10mg for scientific research. Synthetic peptide analog for analytical and laboratory use. In vitro only. USA.',
  keywords: 'Tesamorelin, buy Tesamorelin, research peptide, laboratory, in vitro, Enhanced Chem, USA',
  openGraph: {
    title: 'Tesamorelin 10mg | Buy Tesamorelin for Research | Enhanced Chem',
    description: 'Tesamorelin 10mg for research. In vitro and laboratory use only.',
    url: `${baseUrl}/products/tesamorelin-10mg`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/tesamorelin-10mg` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
