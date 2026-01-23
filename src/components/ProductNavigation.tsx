'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getPreviousProduct, getNextProduct } from '@/utils/productOrder'
import { motion } from 'framer-motion'

interface ProductNavigationProps {
  currentProductId: string
}

export default function ProductNavigation({ currentProductId }: ProductNavigationProps) {
  const prevProductId = getPreviousProduct(currentProductId)
  const nextProductId = getNextProduct(currentProductId)

  return (
    <>
      {/* Left Arrow */}
      {prevProductId && (
        <Link href={`/products/${prevProductId}`}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            className="fixed left-4 top-1/2 -translate-y-1/2 z-50 bg-background/80 backdrop-blur-sm border-2 border-border rounded-full p-3 shadow-lg hover:shadow-xl hover:border-primary transition-all cursor-pointer"
            aria-label="Previous product"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </motion.div>
        </Link>
      )}

      {/* Right Arrow */}
      {nextProductId && (
        <Link href={`/products/${nextProductId}`}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: 5 }}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-50 bg-background/80 backdrop-blur-sm border-2 border-border rounded-full p-3 shadow-lg hover:shadow-xl hover:border-primary transition-all cursor-pointer"
            aria-label="Next product"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </motion.div>
        </Link>
      )}
    </>
  )
}
