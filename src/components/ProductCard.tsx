'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Star } from 'lucide-react'
import PlaceholderImage from './PlaceholderImage'
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
	badge
}: ProductCardProps) {
	const { addItem } = useCart()
	const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

	const handleAddToCart = () => {
		addItem({
			id,
			name,
			price,
			image
		})
	}

	return (
		<div className="glass-card hover-lift overflow-hidden cyber-border">
			{/* Product Image */}
			<div className="relative">
				{image && image !== "/placeholder.jpg" ? (
					<Image
						src={image}
						alt={name}
						width={300}
						height={200}
						className="w-full h-56 object-contain"
					/>
				) : (
					<PlaceholderImage
						width={300}
						height={200}
						text={name}
						className="w-full h-56"
					/>
				)}
				{badge && (
					<div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded text-sm font-semibold glow-effect">
						{badge}
					</div>
				)}
				{discount > 0 && (
					<div className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded text-sm font-semibold glow-effect">
						-{discount}%
					</div>
				)}
			</div>

			{/* Product Info */}
			<div className="p-4">
				<Link href={`/products/${id}`}>
					<h3 className="text-lg font-semibold text-white hover:text-cyan-300 transition-colors mb-2 text-gradient">
						{name}
					</h3>
				</Link>
				
				<p className="text-cyan-100 text-sm mb-3 line-clamp-2">
					{description}
				</p>

				{/* Rating */}
				{rating > 0 && (
					<div className="flex items-center mb-3">
						<div className="flex items-center glow-effect">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`h-4 w-4 ${
										i < rating ? 'text-yellow-400 fill-current' : 'text-cyan-500/50'
									}`}
								/>
							))}
						</div>
						<span className="text-sm text-cyan-200 ml-2">
							{rating} ({reviews} reviews)
						</span>
					</div>
				)}

				{/* Price */}
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center space-x-2">
						<span className="text-2xl font-bold text-white text-gradient">
							${price.toFixed(2)}
						</span>
						{originalPrice && (
							<span className="text-lg text-cyan-300 line-through">
								${originalPrice.toFixed(2)}
							</span>
						)}
					</div>
				</div>

				{/* Add to Cart Button */}
				<button 
					onClick={handleAddToCart}
					className="w-full scientific-glow text-white py-2 px-4 rounded-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 glow-effect"
				>
					<ShoppingCart className="h-4 w-4" />
					<span>Add to Cart</span>
				</button>
			</div>
		</div>
	)
}
