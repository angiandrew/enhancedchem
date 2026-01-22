'use client'

import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const products = [
  {
    id: 'bpc-157-5mg',
    name: 'BPC-157 5mg',
    description: 'Body Protection Compound-157 for research purposes. High purity peptide for scientific studies.',
    price: 49.99,
    originalPrice: 89.99,
    image: '/products/bpc-157/BPC-157 5mg.png',
    rating: 5,
    reviews: 127,
    badge: 'Best Seller',
    inStock: false,
  },
  {
    id: 'tb-500',
    name: 'TB-500 10mg',
    description: 'Thymosin Beta-4 fragment for research applications. Premium quality peptide.',
    price: 149.99,
    originalPrice: 199.99,
    image: '/products/tb-500/TB-500 10mg.png',
    rating: 5,
    reviews: 89,
    badge: 'Popular',
  },
  {
    id: 'ghk-cu',
    name: 'GHK-CU 50mg',
    description: 'Copper peptide complex for advanced research. Laboratory-grade purity.',
    price: 129.99,
    originalPrice: 169.99,
    image: '/products/ghk-cu/GHK-Cu 50mg.png',
    rating: 4.8,
    reviews: 64,
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 block font-sans">
            Our Collection
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
            Popular Products this Month
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Research-grade peptides with certified purity and comprehensive documentation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/products">
            <Button variant="elegant-outline" size="lg" className="gap-2">
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
