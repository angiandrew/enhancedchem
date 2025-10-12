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
		<div className="group relative bg-blue-50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100/50 shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:border-blue-200/50 flex flex-col h-full">
			
			<Link href={`/products/${id}`} className="block relative z-10 flex-1 flex flex-col">
				{/* Product Image */}
				<div className="relative bg-blue-50 p-4">
					{image && image !== "/placeholder.jpg" ? (
						<Image
							src={image}
							alt={name}
							width={300}
							height={200}
							className={`w-full object-contain transition-transform duration-300 group-hover:scale-105 ${
								id === 'mix-peptide' ? 'h-80' :
								id === 'bpc-tb-mix' ? 'h-80' :
								id === 'ghk-cu' ? 'h-80' :
								id === 'bpc-157' || id === 'bpc-157-5mg' || id === 'tb-500-5mg' || id === 'tb-500' || id === 'kpv' || id === 'ghk-cu-100mg' || id === 'semax' || id === 'bpc-tb-mix-10mg' ? 'h-72' : 'h-48'
							}`}
						/>
					) : (
						<PlaceholderImage
							width={300}
							height={200}
							text={name}
							className={`w-full transition-transform duration-300 group-hover:scale-105 ${
								id === 'mix-peptide' ? 'h-80' :
								id === 'bpc-tb-mix' ? 'h-80' :
								id === 'ghk-cu' ? 'h-80' :
								id === 'bpc-157' || id === 'bpc-157-5mg' || id === 'tb-500-5mg' || id === 'tb-500' || id === 'kpv' || id === 'ghk-cu-100mg' || id === 'semax' || id === 'bpc-tb-mix-10mg' ? 'h-72' : 'h-48'
							}`}
						/>
					)}
					
					{/* Floating Badges */}
					{badge && (
						<div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
							{badge}
						</div>
					)}
					{discount > 0 && (
						<div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
							-{discount}%
						</div>
					)}
				</div>

				{/* Product Info */}
				<div className="p-4 flex-1 flex flex-col justify-between">
					<div className="space-y-3">
						<h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
							{name}
						</h3>
						
						<p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
							{description}
						</p>

						{/* Rating */}
						{rating > 0 && (
							<div className="flex items-center">
								<div className="flex items-center space-x-1">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className={`h-4 w-4 ${
												i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
											}`}
										/>
									))}
								</div>
								<span className="text-sm text-gray-500 ml-2">
									{rating} ({reviews} reviews)
								</span>
							</div>
						)}
					</div>

					{/* Price */}
					<div className="flex items-center justify-between pt-4">
						<div className="flex items-center space-x-2">
							<span className="text-2xl font-bold text-gray-900">
								${price.toFixed(2)}
							</span>
							{originalPrice && (
								<span className="text-lg text-gray-400 line-through">
									${originalPrice.toFixed(2)}
								</span>
							)}
						</div>
					</div>
				</div>
			</Link>

			{/* Add to Cart Button */}
			<div className="p-4 pt-0 relative z-10 mt-auto">
				<button 
					onClick={handleAddToCart}
					className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
				>
					<ShoppingCart className="h-4 w-4" />
					<span>Add to Cart</span>
				</button>
			</div>
		</div>
	)
}
