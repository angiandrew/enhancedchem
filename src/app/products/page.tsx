'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { Input } from '@/components/ui/input'

const allProducts = [
  {
    id: 'bpc-157',
    name: 'BPC-157 10mg',
    description: 'Body Protection Compound-157 in higher concentration for extended research applications.',
    price: 41.99,
    originalPrice: 46.99,
    image: '/products/bpc-157/BPC 10mgnew-new.png',
    rating: 5,
    reviews: 94,
    inStock: true,
  },
  {
    id: 'tb-500',
    name: 'TB-500 10mg',
    description: 'Thymosin Beta-4 fragment for research applications. Premium quality peptide.',
    price: 44.99,
    originalPrice: 49.99,
    image: '/products/tb-500/TB-500 10mg.png',
    rating: 5,
    reviews: 89,
    badge: 'Popular',
  },
  {
    id: 'tb-500-5mg',
    name: 'TB-500 5mg',
    description: 'Thymosin Beta-4 fragment in smaller dosage for research applications. Premium quality peptide.',
    price: 37.99,
    originalPrice: 42.99,
    image: '/products/tb-500/TB-500 5mg.png',
    rating: 5,
    reviews: 34,
    badge: 'Limited',
  },
  {
    id: 'ghk-cu',
    name: 'GHK-CU 50mg',
    description: 'Copper peptide complex for advanced research. Laboratory-grade purity.',
    price: 54.99,
    originalPrice: 61.99,
    image: '/products/ghk-cu/GHK-Cu 50mg.png',
    rating: 4.8,
    reviews: 64,
  },
  {
    id: 'ghk-cu-100mg',
    name: 'GHK-CU 100mg',
    description: 'Copper peptide complex in bulk quantity for extended research protocols.',
    price: 94.99,
    originalPrice: 105.99,
    image: '/products/ghk-cu/GHK-Cu 100mg.png',
    rating: 4.9,
    reviews: 42,
  },
  {
    id: 'kpv-5mg',
    name: 'KPV 5mg',
    description: 'Lysine-Proline-Valine peptide for research applications. Known for its anti-inflammatory properties.',
    price: 31.99,
    originalPrice: 35.99,
    image: '/products/KPV/KPV 5mg.png',
    rating: 5,
    reviews: 32,
    badge: 'New',
  },
  {
    id: 'kpv',
    name: 'KPV 10mg',
    description: 'Lysine-Proline-Valine peptide for research applications. Known for its anti-inflammatory properties.',
    price: 54.99,
    originalPrice: 61.99,
    image: '/products/KPV/KPV 10mg.png',
    rating: 5,
    reviews: 45,
    badge: 'Popular',
  },
  {
    id: 'semax',
    name: 'Semax 10mg',
    description: 'Synthetic peptide for research applications. Known for its neuroprotective properties.',
    price: 41.99,
    originalPrice: 46.99,
    image: '/products/Semax/Semax 10mg.png',
    rating: 5,
    reviews: 38,
    badge: 'Premium',
  },
  {
    id: 'selank',
    name: 'Selank 10mg',
    description: 'Synthetic peptide for research applications. Known for its anxiolytic and nootropic properties.',
    price: 37.99,
    originalPrice: 42.99,
    image: '/products/Selank/Selank 10mg.png',
    rating: 5,
    reviews: 35,
    badge: 'Premium',
  },
  {
    id: 'bpc-tb-mix',
    name: 'BPC-157 (5MG) + TB-500 (5MG) Mix',
    description: 'Premium peptide blend combining BPC-157 and TB-500 for comprehensive research applications.',
    price: 64.99,
    originalPrice: 72.99,
    image: '/products/bpc-tb-mix/BPC_TB Blend 5_5.png',
    rating: 5,
    reviews: 32,
    badge: 'New',
  },
  {
    id: 'bpc-tb-mix-10mg',
    name: 'BPC-157 (10MG) + TB-500 (10MG) Mix',
    description: 'Premium peptide blend in higher concentration for extended research studies.',
    price: 94.99,
    originalPrice: 105.99,
    image: '/products/bpc-tb-mix/BPC_TB Blend 10_10.png',
    rating: 5,
    reviews: 28,
    badge: 'Premium',
  },
  {
    id: 'mix-peptide',
    name: 'GLOW 70mg',
    description: 'Premium peptide blend combining GHK-Cu, BPC-157, and TB-500 for comprehensive research.',
    price: 88.99,
    originalPrice: 98.99,
    image: '/products/bpc-tb-ghk-mix/GLOW70.png',
    rating: 5,
    reviews: 45,
    badge: 'New',
  },
  {
    id: 'nad-500mg',
    name: 'NAD+ 500mg',
    description: 'Nicotinamide Adenine Dinucleotide coenzyme for research applications. Essential cellular cofactor.',
    price: 64.99,
    originalPrice: 72.99,
    image: '/products/NAD%2B%20500MG/NAD%2B%20500mg.png',
    rating: 5,
    reviews: 42,
    badge: 'Premium',
  },
  {
    id: 'retatrutide',
    name: 'Retatrutide 10mg',
    description: 'Triple agonist peptide in higher concentration for extended research studies.',
    price: 114.99,
    originalPrice: 127.99,
    image: '/products/Reta/Reta 10mg.png',
    rating: 5,
    reviews: 45,
    badge: 'Premium',
  },
  {
    id: 'retatrutide-15mg',
    name: 'Retatrutide 15mg',
    description: 'Triple agonist peptide in higher concentration for extended research studies.',
    price: 164.99,
    originalPrice: 183.99,
    image: '/products/Reta/Reta 15mg.png',
    rating: 5,
    reviews: 0,
    badge: 'Limited Time Offer',
  },
  {
    id: 'retatrutide-20mg',
    name: 'Retatrutide 20mg',
    description: 'Triple agonist peptide in highest concentration for extended research studies.',
    price: 214.99,
    originalPrice: 239.99,
    image: '/products/Reta/Reta 20mg.png',
    rating: 5,
    reviews: 0,
    badge: 'Premium',
  },
  {
    id: 'melanotan-2',
    name: 'Melanotan 2 10mg',
    description: 'Synthetic analog of alpha-melanocyte-stimulating hormone for research applications.',
    price: 37.99,
    originalPrice: 42.99,
    image: '/products/Melanotan 2 10mg/Melanotan 2 10mg.png',
    rating: 5,
    reviews: 52,
    badge: 'Popular',
  },
  {
    id: 'klow-80mg',
    name: 'KLOW 80mg',
    description: 'Premium peptide blend combining GHK-Cu, BPC-157, TB-500, and KPV for comprehensive research.',
    price: 119.99,
    originalPrice: 133.99,
    image: '/products/KLOW 80mg/KLOW80.png',
    rating: 5,
    reviews: 48,
    badge: 'New',
  },
  {
    id: 'cjc-1295-no-dac-5mg',
    name: 'CJC-1295 No DAC (5mg)',
    description: 'Growth hormone-releasing hormone analog without DAC for shorter-acting research applications.',
    price: 44.99,
    originalPrice: 49.99,
    image: '/products/CJC NO DAC/CJC1295 5mg NO DAC.png',
    rating: 5,
    reviews: 35,
    badge: 'New',
  },
  {
    id: 'cjc-1295-5mg',
    name: 'CJC-1295 w/ DAC (5mg)',
    description: 'Growth hormone-releasing hormone analog with Drug Affinity Complex for extended release research applications.',
    price: 54.99,
    originalPrice: 61.99,
    image: '/products/CJC-1295 (With DAC)/CJC DAC 5mg.png',
    rating: 5,
    reviews: 41,
    badge: 'New',
    inStock: false,
  },
  {
    id: 'cjc-1295',
    name: 'CJC-1295 w/ DAC (10mg)',
    description: 'Growth hormone-releasing hormone analog in higher concentration for extended research studies.',
    price: 94.99,
    originalPrice: 105.99,
    image: '/products/CJC-1295 (With DAC)/CJC DAC 10mg.png',
    rating: 5,
    reviews: 38,
    badge: 'Premium',
    inStock: false,
  },
  {
    id: 'cjc-1295-no-dac',
    name: 'CJC-1295 No DAC (10mg)',
    description: 'Growth hormone-releasing hormone analog without DAC in higher concentration for research studies.',
    price: 74.99,
    originalPrice: 83.99,
    image: '/products/CJC NO DAC/CJC NO DAC 10mg.png',
    rating: 5,
    reviews: 42,
    badge: 'Popular',
    inStock: false,
  },
  {
    id: 'retatrutide-5mg',
    name: 'Retatrutide 5mg',
    description: 'Triple agonist peptide targeting GLP-1, GIP, and glucagon receptors for research applications.',
    price: 64.99,
    originalPrice: 72.99,
    image: '/products/Reta/Reta 5mg.png',
    rating: 5,
    reviews: 38,
    badge: 'New',
    inStock: false,
  },
  {
    id: 'ipamorelin-cjc-1295-5mg',
    name: 'Ipamorelin/CJC-1295 (no DAC) 5mg',
    description: 'Premium peptide blend combining Ipamorelin and CJC-1295 (no DAC) for synergistic growth hormone release.',
    price: 99.00,
    originalPrice: 110.00,
    image: '/products/CJC no dac IPA/CJC(NO DAC)_IPA 5mg_5mgpng.png',
    rating: 5,
    reviews: 39,
    badge: 'New',
    inStock: false,
  },
  {
    id: 'bpc-157-5mg',
    name: 'BPC-157 5mg',
    description: 'Body Protection Compound-157 for research purposes. High purity peptide for scientific studies.',
    price: 34.99,
    originalPrice: 38.99,
    image: '/products/bpc-157/BPC-157 5mg.png',
    rating: 5,
    reviews: 127,
    badge: 'Best Seller',
    inStock: false,
  },
]

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return allProducts
    }

    const searchLower = searchTerm.toLowerCase()
    return allProducts.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(searchLower)
      const descriptionMatch = product.description.toLowerCase().includes(searchLower)
      return nameMatch || descriptionMatch
    })
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 md:pt-36 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 sm:mb-4 block font-sans">
              Our Products
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 sm:mb-4">
              Research Peptides
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-2">
              Premium quality peptides for scientific research. All products come with certificates of analysis and are manufactured in GMP-compliant facilities.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto mb-8 sm:mb-12"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Search products by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-6 text-base sm:text-sm bg-card border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-xl shadow-sm"
              />
            </div>
          </motion.div>

          {/* Search Results Count */}
          {searchTerm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 text-center sm:text-left"
            >
              <p className="text-sm sm:text-base text-muted-foreground">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found{searchTerm && ` for "${searchTerm}"`}
              </p>
            </motion.div>
          )}

          {/* Products Grid */}
          <div className="max-w-7xl mx-auto">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {filteredProducts.map((product, index) => (
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
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-lg text-muted-foreground mb-2">No products found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search terms or{' '}
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-primary underline hover:text-primary/80"
                  >
                    clear the search
                  </button>
                </p>
              </motion.div>
            )}
          </div>

          {/* Research Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 sm:mt-16 p-6 sm:p-8 bg-card rounded-xl border border-border/50 shadow-sm text-center"
          >
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              <strong className="text-foreground font-semibold">Research Use Only:</strong> These products are intended for laboratory research purposes only. 
              Not for human consumption. Please ensure compliance with local regulations.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
