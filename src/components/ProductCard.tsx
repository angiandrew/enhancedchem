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
    <div className="group bg-white/90 backdrop-blur-sm rounded-lg border border-border/30 border-t-0 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] active:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-shadow h-full flex flex-col">
      <div className="relative w-full aspect-[3/4] sm:aspect-[3/3.4] min-h-0 rounded-t-lg overflow-hidden">
        <Link href={`/products/${id}`} className="block w-full h-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 280px"
            className={`object-cover object-center transition-transform duration-300 group-hover:scale-105 ${
              !inStock ? 'opacity-75' : ''
            }`}
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

      <div className="p-1.5 sm:p-2.5 md:p-3 flex flex-col bg-white/90">
        <Link href={`/products/${id}`} className="group/link">
          <h3 className="font-serif text-[10px] sm:text-sm font-medium mb-0.5 text-foreground line-clamp-1">{name}</h3>
          <p className="text-[8px] sm:text-[10px] text-muted-foreground mb-0.5 sm:mb-1 line-clamp-2 leading-tight">{description}</p>
        </Link>

        <div className="flex items-center justify-between gap-0.5 sm:gap-2 mt-auto pt-0.5 sm:pt-1.5 border-t border-border/30">
          <div className="flex items-baseline gap-0.5 min-w-0">
            <span className="text-[10px] sm:text-sm md:text-base font-semibold text-foreground truncate">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-[7px] sm:text-[9px] md:text-[10px] text-muted-foreground line-through font-medium shrink-0">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button 
            variant="elegant" 
            size="sm" 
            onClick={handleAddToCart} 
            disabled={!inStock}
            className={`text-[8px] sm:text-[9px] md:text-xs px-1 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1.5 font-medium transition-colors touch-manipulation shrink-0 ${
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
