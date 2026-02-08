import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'GLOW 70mg | GHK-Cu + BPC-157 + TB-500 Research Peptide Blend | Enhanced Chem',
  description: 'Buy GLOW 70mg - Premium peptide blend: GHK-Cu, BPC-157, TB-500. Research-grade, third-party tested. Fast shipping. For research use only.',
  keywords: 'GLOW 70mg, peptide blend, GHK-Cu BPC-157 TB-500, research peptide, Enhanced Chem',
  openGraph: {
    title: 'GLOW 70mg | Peptide Blend | Enhanced Chem',
    description: 'GLOW 70mg - GHK-Cu, BPC-157, TB-500 blend. Third-party tested. Fast shipping.',
    url: `${baseUrl}/products/mix-peptide`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/mix-peptide` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
