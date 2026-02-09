import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'GHK-Cu | Buy GHK-Cu Research Peptide 50mg 100mg | Enhanced Chem',
  description: 'Buy GHK-Cu (copper peptide) research peptide for scientific research. 50mg and 100mg. In vitro and laboratory use only. Third-party tested. USA.',
  keywords: 'GHK-Cu, buy GHK-Cu, copper peptide, research peptide, scientific research, laboratory peptide, in vitro, Enhanced Chem, USA',
  openGraph: {
    title: 'GHK-Cu | Buy GHK-Cu Research Peptide | Enhanced Chem',
    description: 'GHK-Cu research peptide. In vitro and laboratory use only. Third-party tested.',
    url: `${baseUrl}/products/ghk-cu`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/ghk-cu` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
