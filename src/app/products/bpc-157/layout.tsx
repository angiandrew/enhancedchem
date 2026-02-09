import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'BPC-157 10mg | Buy BPC-157 Research Peptide | Enhanced Chem',
  description: 'Buy BPC-157 research peptide for scientific research. Body Protection Compound-157. In vitro and laboratory use only. Third-party tested. USA.',
  keywords: 'BPC-157, buy BPC-157, research peptide, scientific research, laboratory peptide, in vitro, Enhanced Chem, USA',
  openGraph: {
    title: 'BPC-157 | Buy BPC-157 Research Peptide | Enhanced Chem',
    description: 'BPC-157 research peptide. In vitro and laboratory use only. Third-party tested.',
    url: `${baseUrl}/products/bpc-157`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/bpc-157` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
