import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'CJC-1295 w/ DAC (2mg) | Buy Research Peptide | Enhanced Chem',
  description: 'Buy CJC-1295 with DAC 2mg for research. Growth hormone-releasing hormone analog with Drug Affinity Complex. In vitro and laboratory use only. USA.',
  keywords: 'CJC-1295 DAC 2mg, research peptide, GHRH analog, Enhanced Chem',
  openGraph: {
    title: 'CJC-1295 w/ DAC (2mg) | Research Peptide | Enhanced Chem',
    description: 'CJC-1295 with DAC 2mg. Growth hormone-releasing hormone analog for research. In vitro and laboratory use only.',
    url: `${baseUrl}/products/cjc-1295-2mg`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/cjc-1295-2mg` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
