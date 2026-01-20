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
}: ProductCardProps) {
  const { addItem } = useCart()
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
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
      className="group bg-card rounded-lg border border-border/60 overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-secondary/30 overflow-hidden">
        <Link href={`/products/${id}`}>
          <Image
            src={image}
            alt={name}
            width={400}
            height={400}
            className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* Badges */}
        {badge && (
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-medium">
            {badge}
          </Badge>
        )}
        {discount > 0 && (
          <Badge className="absolute top-4 right-4 bg-gold text-gold-foreground text-xs font-medium">
            -{discount}%
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <Link href={`/products/${id}`}>
          <h3 className="font-serif text-lg font-medium mb-2">{name}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{description}</p>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(rating)
                    ? 'text-gold fill-gold'
                    : 'text-border'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({reviews} reviews)
          </span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button variant="elegant" size="sm" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
