import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'GLOW 70mg | GHK-Cu + BPC-157 + TB-500 Research Peptide Blend | Enhanced Chem',
  description: 'Buy GLOW 70mg peptide blend for scientific research. GHK-Cu, BPC-157, TB-500. In vitro and laboratory use only. Third-party tested. USA.',
  keywords: 'GLOW 70mg, peptide blend, GHK-Cu BPC-157 TB-500, buy peptides, research peptide, scientific research, laboratory, Enhanced Chem, USA',
  openGraph: {
    title: 'GLOW 70mg | Buy Peptide Blend for Research | Enhanced Chem',
    description: 'GLOW 70mg - GHK-Cu, BPC-157, TB-500. In vitro and laboratory use only. Third-party tested.',
    url: `${baseUrl}/products/mix-peptide`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/mix-peptide` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
