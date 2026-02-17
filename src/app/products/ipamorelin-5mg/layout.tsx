import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'Ipamorelin 5mg | Buy Ipamorelin Research Peptide | Enhanced Chem',
  description: 'Buy Ipamorelin 5mg research peptide. Growth hormone-releasing peptide. In vitro and laboratory use only. Third-party tested. USA.',
  keywords: 'Ipamorelin 5mg, buy Ipamorelin, research peptide, Enhanced Chem',
  openGraph: {
    title: 'Ipamorelin 5mg | Research Peptide | Enhanced Chem',
    description: 'Ipamorelin 5mg. In vitro and laboratory use only. Third-party tested.',
    url: `${baseUrl}/products/ipamorelin-5mg`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/ipamorelin-5mg` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
