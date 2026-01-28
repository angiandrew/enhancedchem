'use client'

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
    <div className="group bg-card rounded-lg border border-border/50 overflow-hidden shadow-sm active:shadow-md transition-shadow h-full flex flex-col backdrop-blur-sm">
      {/* Image Container */}
      <div className="relative aspect-square bg-gradient-to-br from-secondary/30 to-secondary/10 overflow-hidden">
        <Link href={`/products/${id}`}>
          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
            className={`w-full h-full object-contain p-1 sm:p-2 md:p-3 ${
              !inStock ? 'opacity-75' : ''
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
      <div className="p-2 sm:p-3 md:p-4 flex flex-col bg-card">
        <Link href={`/products/${id}`} className="group/link">
          <h3 className="font-serif text-xs sm:text-sm font-medium mb-0.5 sm:mb-1 text-foreground line-clamp-1">{name}</h3>
          <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground mb-1 sm:mb-2 line-clamp-2 leading-tight">{description}</p>
        </Link>

        {/* Price & Action */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 mt-auto pt-1.5 sm:pt-2 border-t border-border/30">
          <div className="flex items-baseline gap-1">
            <span className="text-xs sm:text-sm md:text-base font-semibold text-foreground">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-[8px] sm:text-[9px] md:text-[10px] text-muted-foreground line-through font-medium">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button 
            variant="elegant" 
            size="sm" 
            onClick={handleAddToCart} 
            disabled={!inStock}
            className={`text-[8px] sm:text-[9px] md:text-xs px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1.5 font-medium transition-colors touch-manipulation ${
              !inStock ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {inStock ? 'Add' : 'Out'}
          </Button>
        </div>
      </div>
    </div>
  )
}
