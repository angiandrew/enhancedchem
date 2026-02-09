import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'BPC-157 + TB-500 Mix | Buy Peptide Blend for Research | Enhanced Chem',
  description: 'Buy BPC-157 and TB-500 peptide blend for scientific research. In vitro and laboratory use only. Third-party tested. USA.',
  keywords: 'BPC-157 TB-500, peptide blend, buy peptides, research peptide, scientific research, laboratory, in vitro, Enhanced Chem, USA',
  openGraph: {
    title: 'BPC-157 + TB-500 Mix | Buy Peptide Blend | Enhanced Chem',
    description: 'BPC-157 and TB-500 blend. In vitro and laboratory use only. Third-party tested.',
    url: `${baseUrl}/products/bpc-tb-mix`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/bpc-tb-mix` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
