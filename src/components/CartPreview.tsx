'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { Check } from 'lucide-react'

export default function CartPreview() {
  const { lastAddedItem, clearLastAddedItem } = useCart()

  useEffect(() => {
    if (lastAddedItem) {
      const timer = setTimeout(() => {
        clearLastAddedItem()
      }, 1600) // 1.6 seconds

      return () => clearTimeout(timer)
    }
  }, [lastAddedItem, clearLastAddedItem])

  return (
    <AnimatePresence>
      {lastAddedItem && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-16 left-4 right-4 sm:left-auto sm:right-6 sm:top-20 z-50 bg-card border border-border rounded-lg shadow-lg p-3 sm:p-4 w-auto sm:min-w-[280px] sm:max-w-[320px]"
        >
          <div className="flex items-start gap-3">
            {/* Check Icon */}
            <div className="flex-shrink-0 mt-1">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>

            {/* Item Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground mb-1">
                Added to cart
              </p>
              <div className="flex items-center gap-3">
                {/* Product Image */}
                <div className="relative w-12 h-12 flex-shrink-0 bg-secondary/30 rounded overflow-hidden">
                  <Image
                    src={lastAddedItem.image}
                    alt={lastAddedItem.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                
                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {lastAddedItem.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">
                      Qty: {lastAddedItem.quantity}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs font-medium text-foreground">
                      ${lastAddedItem.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
