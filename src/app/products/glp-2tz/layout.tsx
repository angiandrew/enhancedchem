import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'GLP-2TZ 10mg | Buy Tirzepatide Analog for Research | Enhanced Chem',
  description: 'Buy GLP-2TZ 10mg (tirzepatide analog) for scientific research. Dual incretin receptor agonist for analytical and laboratory use. In vitro only. USA.',
  keywords: 'GLP-2TZ 10mg, tirzepatide, research peptide, laboratory, in vitro, Enhanced Chem, USA',
  openGraph: {
    title: 'GLP-2TZ 10mg | Buy Tirzepatide Analog for Research | Enhanced Chem',
    description: 'GLP-2TZ 10mg for research. In vitro and laboratory use only.',
    url: `${baseUrl}/products/glp-2tz`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/glp-2tz` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
