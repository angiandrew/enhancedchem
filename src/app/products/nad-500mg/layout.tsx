import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: 'NAD+ 500mg | Buy NAD+ for Research | Enhanced Chem',
  description: 'Buy NAD+ 500mg for scientific research. In vitro and laboratory use only. Third-party tested. USA.',
  keywords: 'NAD+, buy NAD+, research, scientific research, laboratory, in vitro, Enhanced Chem, USA',
  openGraph: {
    title: 'NAD+ 500mg | Buy NAD+ for Research | Enhanced Chem',
    description: 'NAD+ 500mg for research. In vitro and laboratory use only. Third-party tested.',
    url: `${baseUrl}/products/nad-500mg`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/products/nad-500mg` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
