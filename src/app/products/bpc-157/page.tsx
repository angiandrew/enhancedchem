'use client'

import { useState } from 'react'
import { ShoppingCart, Truck, Award, Lock, Headphones } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

export default function BPC157Page() {
	const [selectedMG, setSelectedMG] = useState('10mg')
	const [quantity, setQuantity] = useState(1)
	const { addItem } = useCart()

	const mgOptions = [
		{ value: '5mg', price: 49.99, originalPrice: 89.99, image: '/products/bpc-157/BPC-157_5MG_new.png' },
		{ value: '10mg', price: 89.99, originalPrice: 119.99, image: '/products/bpc-157/BPC-157_new.png' }
	]

	const currentPrice = mgOptions.find(option => option.value === selectedMG)?.price || 89.99
	const currentOriginalPrice = mgOptions.find(option => option.value === selectedMG)?.originalPrice || 119.99
	const currentImage = mgOptions.find(option => option.value === selectedMG)?.image || '/products/bpc-157/BPC-157_new.png'

	const handleAddToCart = () => {
		for (let i = 0; i < quantity; i++) {
			addItem({
				id: `bpc-157-${selectedMG}`,
				name: `BPC-157 ${selectedMG}`,
				price: currentPrice,
				image: currentImage
			})
		}
	}

	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Breadcrumb */}
				<nav className="mb-8">
					<ol className="flex items-center space-x-2 text-sm text-gray-500">
						<li><Link href="/" className="hover:text-blue-600">Home</Link></li>
						<li>/</li>
						<li><Link href="/products" className="hover:text-blue-600">Best Sellers</Link></li>
						<li>/</li>
						<li className="text-gray-900">BPC-157 {selectedMG}</li>
					</ol>
				</nav>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Product Image */}
					<div className="flex justify-center">
						<div className="relative w-full max-w-md">
							<Image
								src={currentImage}
								alt={`BPC-157 ${selectedMG}`}
								width={400}
								height={400}
								className="w-full h-auto object-contain"
							/>
						</div>
					</div>

					{/* Product Info */}
					<div className="space-y-6">
						{/* Availability */}
						<p className="text-sm text-gray-600">Availability: <span className="text-green-600 font-semibold">In stock</span></p>

						{/* Product Name */}
						<h1 className="text-4xl font-bold text-gray-900">
							BPC-157 {selectedMG}
						</h1>

						{/* Price */}
						<div className="flex items-center space-x-4">
							<span className="text-4xl font-bold text-blue-600">
								${currentPrice}
							</span>
							{currentOriginalPrice > currentPrice && (
								<span className="text-xl text-gray-500 line-through">
									${currentOriginalPrice}
								</span>
							)}
						</div>

						{/* MG Selection */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Select Strength:
							</label>
							<div className="flex space-x-3">
								{mgOptions.map((option) => (
								<button
									key={option.value}
									onClick={() => setSelectedMG(option.value)}
									className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all ${
										selectedMG === option.value
											? 'border-blue-600 bg-blue-50 text-blue-600'
											: 'border-gray-400 bg-gray-200 text-gray-700 hover:border-gray-500 hover:bg-gray-300'
									}`}
								>
										{option.value}
									</button>
								))}
							</div>
						</div>

						{/* Quantity Selector */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Quantity:
							</label>
							<div className="flex items-center space-x-3">
								<button
									onClick={() => setQuantity(Math.max(1, quantity - 1))}
									className="w-10 h-10 rounded-lg border border-gray-400 bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 hover:border-gray-500"
								>
									-
								</button>
								<input
									type="number"
									value={quantity}
									onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
									className="w-20 h-10 text-center border border-gray-400 bg-gray-200 text-gray-700 rounded-lg"
									min="1"
								/>
								<button
									onClick={() => setQuantity(quantity + 1)}
									className="w-10 h-10 rounded-lg border border-gray-400 bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 hover:border-gray-500"
								>
									+
								</button>
							</div>
						</div>

						{/* Add to Cart Button */}
						<button
							onClick={handleAddToCart}
							className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-3"
						>
							<ShoppingCart className="h-6 w-6" />
							<span>ADD TO CART</span>
						</button>


						{/* Trust Badges */}
						<div className="grid grid-cols-1 gap-4">
							<div className="flex items-center space-x-3">
								<div className="bg-blue-100 p-2 rounded-lg">
									<Truck className="h-5 w-5 text-blue-600" />
								</div>
								<div>
									<p className="text-sm font-semibold text-gray-900">Free Shipping on Orders Over $150</p>
								</div>
							</div>
							<div className="flex items-center space-x-3">
								<div className="bg-blue-100 p-2 rounded-lg">
									<Award className="h-5 w-5 text-blue-600" />
								</div>
								<div>
									<p className="text-sm font-semibold text-gray-900">High grade purity Premium quality</p>
								</div>
							</div>
							<div className="flex items-center space-x-3">
								<div className="bg-blue-100 p-2 rounded-lg">
									<Headphones className="h-5 w-5 text-blue-600" />
								</div>
								<div>
									<p className="text-sm font-semibold text-gray-900">Customer Happiness 100% Guaranteed</p>
								</div>
							</div>
							<div className="flex items-center space-x-3">
								<div className="bg-blue-100 p-2 rounded-lg">
									<Lock className="h-5 w-5 text-blue-600" />
								</div>
								<div>
									<p className="text-sm font-semibold text-gray-900">256-Bit SSL Encryption 100% Privacy Assurance</p>
								</div>
							</div>
							<div className="flex items-center space-x-3">
								<div className="bg-blue-100 p-2 rounded-lg">
									<Headphones className="h-5 w-5 text-blue-600" />
								</div>
								<div>
									<p className="text-sm font-semibold text-gray-900">Exceptional Support Team is Here to Help</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Product Description */}
				<div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-6">DESCRIPTION</h2>
						<div className="space-y-4">
							<div className="flex justify-between">
								<span className="font-semibold text-gray-700">Appearance:</span>
								<span className="text-gray-600">White powder</span>
							</div>
							<div className="flex justify-between">
								<span className="font-semibold text-gray-700">Cas No:</span>
								<span className="text-gray-600">137525-51-0</span>
							</div>
							<div className="flex justify-between">
								<span className="font-semibold text-gray-700">Molecular Formula:</span>
								<span className="text-gray-600">C₆₂H₉₈N₁₆O₂₂</span>
							</div>
							<div className="flex justify-between">
								<span className="font-semibold text-gray-700">Physical State:</span>
								<span className="text-gray-600">Lyophilized powder</span>
							</div>
							<div className="flex justify-between">
								<span className="font-semibold text-gray-700">Storage:</span>
								<span className="text-gray-600">Room Temperature</span>
							</div>
						</div>
					</div>
					
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-6">STORAGE</h2>
						<p className="text-gray-600 leading-relaxed mb-4">
							Store in a cool, dry place at room temperature. Keep away from direct sunlight and moisture. 
							For research purposes only.
						</p>
						<p className="text-gray-600 leading-relaxed">
							BPC-157 (Body Protection Compound-157) is a synthetic peptide derived from 
							body protection compound found in gastric juice. This research-grade peptide 
							is designed for scientific studies and laboratory research purposes only.
						</p>
					</div>
				</div>

				{/* Research Disclaimer */}
				<div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
					<h3 className="text-lg font-semibold text-red-800 mb-2">
						⚠️ Research Purposes Only
					</h3>
					<p className="text-red-700">
						This product is sold for research purposes only. Not for human consumption, 
						diagnosis, treatment, cure, or prevention of any disease. By purchasing this product, 
						you certify that you are 18+ years of age and agree to use this product only for 
						legitimate research purposes in accordance with applicable laws and regulations.
					</p>
				</div>
			</div>
		</div>
	)
}