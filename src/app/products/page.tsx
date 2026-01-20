'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'

const allProducts = [
  {
    id: 'bpc-157-5mg',
    name: 'BPC-157 5mg',
    description: 'Body Protection Compound-157 for research purposes. High purity peptide for scientific studies.',
    price: 49.99,
    originalPrice: 89.99,
    image: '/products/bpc-157/BPC-157_5MG_new.png',
    rating: 5,
    reviews: 127,
    badge: 'Best Seller',
  },
  {
    id: 'bpc-157',
    name: 'BPC-157 10mg',
    description: 'Body Protection Compound-157 in higher concentration for extended research applications.',
    price: 89.99,
    originalPrice: 149.99,
    image: '/products/bpc-157/BPC-157_new.png',
    rating: 5,
    reviews: 94,
  },
  {
    id: 'tb-500',
    name: 'TB-500 10mg',
    description: 'Thymosin Beta-4 fragment for research applications. Premium quality peptide.',
    price: 149.99,
    originalPrice: 199.99,
    image: '/products/tb-500/TB 500_10MG_new.png',
    rating: 5,
    reviews: 89,
    badge: 'Popular',
  },
  {
    id: 'tb-500-5mg',
    name: 'TB-500 5mg',
    description: 'Thymosin Beta-4 fragment in smaller dosage for research applications. Premium quality peptide.',
    price: 89.99,
    originalPrice: 119.99,
    image: '/products/tb-500/TB 500_5MG_new.png',
    rating: 5,
    reviews: 34,
    badge: 'Limited',
  },
  {
    id: 'ghk-cu',
    name: 'GHK-CU 50mg',
    description: 'Copper peptide complex for advanced research. Laboratory-grade purity.',
    price: 129.99,
    originalPrice: 169.99,
    image: '/products/ghk-cu/GHK-Cu-50MG_new.png',
    rating: 4.8,
    reviews: 64,
  },
  {
    id: 'ghk-cu-100mg',
    name: 'GHK-CU 100mg',
    description: 'Copper peptide complex in bulk quantity for extended research protocols.',
    price: 229.99,
    originalPrice: 299.99,
    image: '/products/ghk-cu/GHK-Cu 100MG_neww.png',
    rating: 4.9,
    reviews: 42,
  },
  {
    id: 'kpv',
    name: 'KPV 10mg',
    description: 'Lysine-Proline-Valine peptide for research applications. Known for its anti-inflammatory properties.',
    price: 79.99,
    originalPrice: 99.99,
    image: '/products/KPV/KPV_10M.png',
    rating: 5,
    reviews: 45,
    badge: 'New',
  },
  {
    id: 'semax',
    name: 'Semax 10mg',
    description: 'Synthetic peptide for research applications. Known for its neuroprotective properties.',
    price: 129.99,
    originalPrice: 159.99,
    image: '/products/Semax/Semax.png',
    rating: 5,
    reviews: 38,
    badge: 'Premium',
  },
  {
    id: 'bpc-tb-mix',
    name: 'BPC-157 (5MG) + TB-500 (5MG) Mix',
    description: 'Premium peptide blend combining BPC-157 and TB-500 for comprehensive research applications.',
    price: 149.99,
    originalPrice: 199.99,
    image: '/products/bpc-tb-mix/Bpc-tb-5MG.png',
    rating: 5,
    reviews: 32,
    badge: 'New',
  },
  {
    id: 'bpc-tb-mix-10mg',
    name: 'BPC-157 (10MG) + TB-500 (10MG) Mix',
    description: 'Premium peptide blend in higher concentration for extended research studies.',
    price: 199.99,
    originalPrice: 249.99,
    image: '/products/bpc-tb-mix/BPC:Tb_10MG mix.png',
    rating: 5,
    reviews: 28,
    badge: 'Premium',
  },
  {
    id: 'mix-peptide',
    name: 'GHK-Cu (50MG) + BPC-157 (10MG) + TB-500 (10MG) Mix',
    description: 'Premium peptide blend combining GHK-Cu, BPC-157, and TB-500 for comprehensive research.',
    price: 299.99,
    originalPrice: 399.99,
    image: '/products/bpc-tb-ghk-mix/bpc-tb-ghk-mix.png',
    rating: 5,
    reviews: 45,
    badge: 'New',
  },
]

export default function Products() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 block font-sans">
              Our Products
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">
              Research Peptides
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Premium quality peptides for scientific research. All products come with certificates of analysis and are manufactured in GMP-compliant facilities.
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Research Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-16 p-6 bg-secondary/50 rounded-lg border border-border/40 text-center"
          >
            <p className="text-sm text-muted-foreground">
              <strong>Research Use Only:</strong> These products are intended for laboratory research purposes only. 
              Not for human consumption. Please ensure compliance with local regulations.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
