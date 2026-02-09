import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'KPV | Buy KPV Research Peptide | Enhanced Chem',
  description: 'Buy KPV (Lysine-Proline-Valine) research peptide for scientific research. In vitro and laboratory use only. Third-party tested. USA.',
  keywords: 'KPV, buy KPV, research peptide, scientific research, laboratory peptide, in vitro, Enhanced Chem, USA',
  openGraph: {
    title: 'KPV | Buy KPV Research Peptide | Enhanced Chem',
    description: 'KPV research peptide. In vitro and laboratory use only. Third-party tested.',
    url: `${baseUrl}/products/kpv`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/kpv` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
