'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
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
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    if (!inStock) return
    addItem({
      id,
      name,
      price,
      image
    })
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-card rounded-xl border border-border/50 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col backdrop-blur-sm"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gradient-to-br from-secondary/30 to-secondary/10 overflow-hidden">
        <Link href={`/products/${id}`}>
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className={`w-full h-full object-contain p-4 transition-transform duration-500 ${
              inStock ? 'group-hover:scale-105' : 'opacity-60'
            }`}
          />
        </Link>
        
        {/* Sold Out Overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <Badge className="bg-red-600 text-white text-sm font-bold px-4 py-2">
              SOLD OUT
            </Badge>
          </div>
        )}
        
        {/* Badges */}
        {badge && inStock && (
          <Badge className="absolute top-3 left-3 bg-primary/95 backdrop-blur-sm text-primary-foreground text-xs font-semibold px-2.5 py-1 shadow-md z-20">
            {badge}
          </Badge>
        )}
        {discount > 0 && inStock && (
          <Badge className="absolute top-3 right-3 bg-gold/95 backdrop-blur-sm text-gold-foreground text-xs font-semibold px-2.5 py-1 shadow-md z-20">
            -{discount}%
          </Badge>
        )}
        {!inStock && (
          <Badge className="absolute top-3 right-3 bg-destructive/95 backdrop-blur-sm text-destructive-foreground text-xs font-semibold px-2.5 py-1 shadow-md z-20">
            OUT
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col bg-card">
        <Link href={`/products/${id}`} className="group/link">
          <h3 className="font-serif text-base font-medium mb-2 text-foreground group-hover/link:text-primary transition-colors">{name}</h3>
          <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed min-h-[2.5rem]">{description}</p>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 transition-colors ${
                  i < Math.floor(rating)
                    ? 'text-gold fill-gold'
                    : 'text-border/40'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            ({reviews})
          </span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-border/30">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-foreground">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-xs text-muted-foreground line-through font-medium">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button 
            variant="elegant" 
            size="sm" 
            onClick={handleAddToCart} 
            disabled={!inStock}
            className={`text-xs px-4 py-2 font-medium transition-all ${
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
