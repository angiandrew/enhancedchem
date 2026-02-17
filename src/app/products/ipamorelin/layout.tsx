import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'Ipamorelin | Buy Ipamorelin 5mg 10mg Research Peptide | Enhanced Chem',
  description: 'Buy Ipamorelin research peptide for scientific research. 5mg and 10mg. Growth hormone-releasing peptide. In vitro and laboratory use only. Third-party tested. USA.',
  keywords: 'Ipamorelin, buy Ipamorelin, research peptide, growth hormone, scientific research, laboratory peptide, in vitro, Enhanced Chem, USA',
  openGraph: {
    title: 'Ipamorelin | Buy Ipamorelin Research Peptide | Enhanced Chem',
    description: 'Ipamorelin research peptide. In vitro and laboratory use only. Third-party tested.',
    url: `${baseUrl}/products/ipamorelin`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/ipamorelin` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
