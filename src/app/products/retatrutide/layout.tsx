import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'Reta | Buy Reta 5mg 10mg 15mg 20mg Research Peptide | Enhanced Chem',
  description: 'Buy Reta research peptide for scientific research. 5mg, 10mg, 15mg, 20mg. Triple agonist (GLP-1, GIP, glucagon). In vitro and laboratory use only. Third-party tested. USA.',
  keywords: 'reta, retatrutide, buy reta, research peptide, scientific research, laboratory peptide, in vitro, Enhanced Chem, USA',
  openGraph: {
    title: 'Reta | Buy Reta Research Peptide | Enhanced Chem',
    description: 'Reta research peptide. In vitro and laboratory use only. Third-party tested.',
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
