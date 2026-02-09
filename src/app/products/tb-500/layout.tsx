import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'TB-500 | Buy TB-500 Research Peptide 5mg 10mg | Enhanced Chem',
  description: 'Buy TB-500 (Thymosin Beta-4 fragment) research peptide for scientific research. 5mg and 10mg. In vitro and laboratory use only. Third-party tested. USA.',
  keywords: 'TB-500, buy TB-500, thymosin beta-4, research peptide, scientific research, laboratory peptide, in vitro, Enhanced Chem, USA',
  openGraph: {
    title: 'TB-500 | Buy TB-500 Research Peptide | Enhanced Chem',
    description: 'TB-500 research peptide. In vitro and laboratory use only. Third-party tested.',
    url: `${baseUrl}/products/tb-500`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/tb-500` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
