'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  rating?: number
  reviews?: number
  badge?: string
  inStock?: boolean
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  originalPrice,
  image,
  rating = 5,
  reviews = 0,
  badge,
  inStock = true,
}: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (!inStock) return
    try {
      addItem({
        id: id || 'unknown',
        name: name || 'Product',
        price: typeof price === 'number' ? price : 0,
        image: image || '/logos/NEW-new LOGO.png'
      })
    } catch (error) {
      // Silently handle cart errors
      console.warn('Failed to add item to cart:', error)
    }
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group bg-card rounded-lg border border-border/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col backdrop-blur-sm"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gradient-to-br from-secondary/30 to-secondary/10 overflow-hidden">
        <Link href={`/products/${id}`}>
          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
            className={`w-full h-full object-contain p-2 sm:p-3 transition-transform duration-500 ${
              inStock ? 'group-hover:scale-105' : 'opacity-75'
            }`}
            unoptimized
          />
        </Link>
        
        {/* Sold Out Overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center z-10">
            <Badge className="bg-muted/90 text-muted-foreground text-[10px] font-medium px-2 py-1 border border-border/50">
              Sold Out
            </Badge>
          </div>
        )}
        
        {/* Badges */}
        {badge && inStock && (
          <Badge className="absolute top-2 left-2 bg-primary/95 backdrop-blur-sm text-primary-foreground text-[10px] font-semibold px-2 py-0.5 shadow-md z-20">
            {badge}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col bg-card">
        <Link href={`/products/${id}`} className="group/link">
          <h3 className="font-serif text-sm font-medium mb-1 text-foreground group-hover/link:text-primary transition-colors line-clamp-1">{name}</h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3 line-clamp-2 leading-relaxed min-h-[2rem]">{description}</p>
        </Link>

        {/* Price & Action */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-2 sm:pt-3 border-t border-border/30">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-semibold text-foreground">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-[10px] text-muted-foreground line-through font-medium">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button 
            variant="elegant" 
            size="sm" 
            onClick={handleAddToCart} 
            disabled={!inStock}
            className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 font-medium transition-all ${
              !inStock ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
          >
            {inStock ? 'Add to Cart' : 'Sold Out'}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
