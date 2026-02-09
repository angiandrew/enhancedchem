import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buy Peptides for Scientific Research | Retatrutide, BPC-157, TB-500 | Enhanced Chem',
  description: 'Buy peptides for scientific research and development. Retatrutide, BPC-157, TB-500, GHK-Cu. Highly purified, third-party tested. USA. For in vitro and laboratory use only.',
  keywords: 'buy peptides, research peptides, retatrutide, BPC-157, TB-500, GHK-Cu, scientific research, laboratory peptides, USA',
  openGraph: {
    title: 'Buy Peptides for Scientific Research | Enhanced Chem',
    description: 'Highly purified research peptides. Retatrutide, BPC-157, TB-500, GHK-Cu. Third-party tested. For laboratory use only.',
    url: '/products',
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
