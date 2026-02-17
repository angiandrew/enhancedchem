import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'Ipamorelin/CJC-1295 (no DAC) 10mg | Buy Peptide Blend | Enhanced Chem',
  description: 'Buy Ipamorelin and CJC-1295 (no DAC) 10mg blend for research. Growth hormone-releasing peptide blend. In vitro and laboratory use only. USA.',
  keywords: 'Ipamorelin CJC-1295 10mg, peptide blend, research peptide, Enhanced Chem',
  openGraph: {
    title: 'Ipamorelin/CJC-1295 (no DAC) 10mg | Research Peptide Blend | Enhanced Chem',
    description: 'Ipamorelin and CJC-1295 (no DAC) 10mg blend. In vitro and laboratory use only.',
    url: `${baseUrl}/products/ipamorelin-cjc-1295-10mg`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/ipamorelin-cjc-1295-10mg` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
