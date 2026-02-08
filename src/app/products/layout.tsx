import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research Peptides | Buy Retatrutide, BPC-157, TB-500, GHK-Cu | Enhanced Chem',
  description: 'Shop research peptides: Retatrutide, BPC-157, TB-500, GHK-Cu, and more. Premium quality, third-party tested. Fast shipping. For research use only.',
  openGraph: {
    title: 'Research Peptides | Retatrutide, BPC-157, TB-500 | Enhanced Chem',
    description: 'Premium research peptides. Retatrutide, BPC-157, TB-500, GHK-Cu. Third-party tested. Fast shipping.',
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
