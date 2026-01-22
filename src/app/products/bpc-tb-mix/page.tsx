'use client'

import { useState } from 'react'
import { ShoppingCart, Truck, Award, Lock, Headphones } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

export default function BpcTbMixPage() {
	const [selectedMG, setSelectedMG] = useState('5mg')
	const [quantity, setQuantity] = useState(1)
	const { addItem } = useCart()

	const mgOptions = [
		{ value: '5mg', price: 149.99, originalPrice: 199.99, image: '/products/bpc-tb-mix/BPC_TB Blend 5_5.png' },
		{ value: '10mg', price: 199.99, originalPrice: 249.99, image: '/products/bpc-tb-mix/BPC_TB Blend 10_10.png' }
	]

	const currentPrice = mgOptions.find(option => option.value === selectedMG)?.price || 149.99
	const currentOriginalPrice = mgOptions.find(option => option.value === selectedMG)?.originalPrice || 199.99
	const currentImage = mgOptions.find(option => option.value === selectedMG)?.image || '/products/bpc-tb-mix/BPC_TB Blend 5_5.png'

	const handleAddToCart = () => {
		for (let i = 0; i < quantity; i++) {
			addItem({
				id: `bpc-tb-mix-${selectedMG}`,
				name: `BPC-157 + TB-500 Mix ${selectedMG}`,
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
						<li className="text-gray-900">BPC-157 + TB-500 Mix {selectedMG}</li>
					</ol>
				</nav>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Product Image */}
					<div className="flex justify-center">
						<div className="relative w-full max-w-md">
							<Image
								src={currentImage}
								alt={`BPC-157 + TB-500 Mix ${selectedMG}`}
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
							BPC-157 + TB-500 Mix {selectedMG}
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

						{/* Quantity Selection */}
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
									onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
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
							className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-lg"
						>
							<ShoppingCart className="w-6 h-6" />
							<span>Add to Cart</span>
						</button>

						{/* Trust Indicators */}
						<div className="space-y-4">
							<div className="flex items-center space-x-3">
								<div className="bg-blue-100 p-2 rounded-lg">
									<Truck className="h-5 w-5 text-blue-600" />
								</div>
								<div>
									<p className="text-sm font-semibold text-gray-900">Free Shipping on Orders Over $250</p>
								</div>
							</div>
							<div className="flex items-center space-x-3">
								<div className="bg-blue-100 p-2 rounded-lg">
									<Award className="h-5 w-5 text-blue-600" />
								</div>
								<div>
									<p className="text-sm font-semibold text-gray-900">Premium Quality Guarantee</p>
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
							<span className="text-gray-600">Multiple compounds</span>
						</div>
						<div className="flex justify-between">
							<span className="font-semibold text-gray-700">Molecular Formula:</span>
							<div className="text-gray-600 text-right">
								<div>BPC-157: C<sub>62</sub>H<sub>98</sub>N<sub>16</sub>O<sub>22</sub></div>
								<div>TB-500: C<sub>212</sub>H<sub>350</sub>N<sub>56</sub>O<sub>78</sub>S</div>
							</div>
						</div>
						<div className="flex justify-between">
							<span className="font-semibold text-gray-700">Physical State:</span>
							<span className="text-gray-600">Lyophilized powder</span>
						</div>
						<div className="flex justify-between">
							<span className="font-semibold text-gray-700">Storage:</span>
							<span className="text-gray-600">Store at -20°C</span>
						</div>
						<div className="flex justify-between">
							<span className="font-semibold text-gray-700">Purity:</span>
							<span className="text-gray-600">≥98%</span>
						</div>
						<div className="flex justify-between">
							<span className="font-semibold text-gray-700">Molecular Weight:</span>
							<span className="text-gray-600">Mixed blend</span>
						</div>
						<div className="flex justify-between">
							<span className="font-semibold text-gray-700">Solubility:</span>
							<span className="text-gray-600">Water soluble</span>
						</div>
					</div>
				</div>

				<div>
					<h2 className="text-2xl font-bold text-gray-900 mb-6">RESEARCH APPLICATIONS</h2>
					<div className="space-y-4">
						<div className="bg-blue-50 rounded-lg p-4">
							<h3 className="font-semibold text-blue-900 mb-2">Laboratory Studies</h3>
							<p className="text-sm text-blue-800">
								This peptide blend is designed for comprehensive laboratory research applications, 
								combining the synergistic effects of BPC-157 and TB-500 for enhanced research outcomes.
							</p>
						</div>
						<div className="bg-green-50 rounded-lg p-4">
							<h3 className="font-semibold text-green-900 mb-2">Quality Assurance</h3>
							<p className="text-sm text-green-800">
								Each batch undergoes rigorous quality testing to ensure purity and consistency 
								for reliable research results.
							</p>
						</div>
					</div>
				</div>
			</div>

				{/* Research Disclaimer */}
				<div className="mt-16 bg-red-50 border border-red-200 rounded-lg p-6">
					<h3 className="text-lg font-semibold text-red-900 mb-3">Research Use Only</h3>
					<p className="text-sm text-red-800 leading-relaxed">
						<strong>Important:</strong> This product is intended solely for research purposes in laboratory settings. 
						It is not intended for human consumption, diagnostic use, or therapeutic applications. 
						Researchers must ensure compliance with all applicable local, state, and federal regulations 
						regarding the handling and use of research chemicals. Please consult with your institutional 
						review board or regulatory compliance office before use.
					</p>
				</div>
			</div>
		</div>
	)
}
