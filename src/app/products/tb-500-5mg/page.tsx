'use client'

import { useState } from 'react'
import { ShoppingCart, Truck, Award, Lock, Headphones, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TB5005mgPage() {
	const [selectedMG, setSelectedMG] = useState('5mg')
	const [quantity, setQuantity] = useState(1)
	const { addItem } = useCart()

	const mgOptions = [
		{ value: '5mg', price: 89.99, originalPrice: 119.99, image: '/products/tb-500/TB-500 5mg.png', inStock: true },
		{ value: '10mg', price: 149.99, originalPrice: 199.99, image: '/products/tb-500/TB-500 10mg.png', inStock: true }
	]

	const currentOption = mgOptions.find(option => option.value === selectedMG)
	const currentPrice = currentOption?.price || 89.99
	const currentOriginalPrice = currentOption?.originalPrice || 119.99
	const currentImage = currentOption?.image || '/products/tb-500/TB-500 5mg.png'
	const isInStock = currentOption?.inStock ?? true

	const handleAddToCart = () => {
		if (!isInStock) return
		for (let i = 0; i < quantity; i++) {
			addItem({
				id: `tb-500-${selectedMG}`,
				name: `TB-500 ${selectedMG}`,
				price: currentPrice,
				image: currentImage
			})
		}
	}

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="pt-24 pb-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Breadcrumb */}
					<nav className="mb-6">
						<ol className="flex items-center space-x-2 text-sm text-muted-foreground">
							<li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
							<li>/</li>
							<li><Link href="/products" className="hover:text-primary transition-colors">Products</Link></li>
							<li>/</li>
							<li className="text-foreground font-medium">TB-500 {selectedMG}</li>
						</ol>
					</nav>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
						{/* Product Image */}
						<motion.div 
							className="sticky top-28 flex justify-center lg:justify-start pt-8 lg:pt-12"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
						>
							<AnimatePresence mode="wait">
								<motion.div
									key={currentImage}
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.95 }}
									transition={{ duration: 0.3 }}
									className="relative w-full flex justify-center"
								>
									<Image
										src={currentImage}
										alt={`TB-500 ${selectedMG}`}
										width={600}
										height={600}
										className="object-contain"
										priority
										unoptimized
										key={currentImage}
									/>
								</motion.div>
							</AnimatePresence>
						</motion.div>

						{/* Product Info */}
						<motion.div 
							className="space-y-6"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							{/* Availability */}
							<div className="flex items-center gap-2">
								<CheckCircle className="w-5 h-5 text-green-600" />
								<p className="text-sm text-muted-foreground">
									<span className="text-green-600 font-semibold">In stock</span> - Ready to ship
								</p>
							</div>

							{/* Product Name */}
							<h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
								TB-500 {selectedMG}
							</h1>

							{/* Price */}
							<div className="flex items-baseline gap-4">
								<span className="text-4xl md:text-5xl font-serif font-medium text-primary">
									${currentPrice.toFixed(2)}
								</span>
								{currentOriginalPrice > currentPrice && (
									<span className="text-xl text-muted-foreground line-through">
										${currentOriginalPrice.toFixed(2)}
									</span>
								)}
								{currentOriginalPrice > currentPrice && (
									<span className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm font-semibold">
										Save {Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)}%
									</span>
								)}
							</div>

							{/* MG Selection */}
							<div>
								<label className="block text-sm font-medium text-foreground mb-3">
									Select Strength:
								</label>
								<div className="flex gap-3">
									{mgOptions.map((option) => (
									<button
										key={option.value}
										onClick={() => setSelectedMG(option.value)}
										disabled={!option.inStock && selectedMG !== option.value}
										className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all relative ${
											selectedMG === option.value
												? option.inStock
													? 'border-primary bg-primary/10 text-primary shadow-md'
													: 'border-red-500 bg-red-50 text-red-600'
												: option.inStock
													? 'border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5'
													: 'border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50'
										}`}
									>
										{option.value}
										{!option.inStock && (
											<span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
												OUT
											</span>
										)}
									</button>
									))}
								</div>
							</div>

							{/* Quantity Selector */}
							<div>
								<label className="block text-sm font-medium text-foreground mb-3">
									Quantity:
								</label>
								<div className="flex items-center gap-4">
									<button
										onClick={() => setQuantity(Math.max(1, quantity - 1))}
										disabled={quantity === 1}
										className="w-12 h-12 rounded-xl border-2 border-border bg-card text-foreground flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
									>
										-
									</button>
									<input
										type="number"
										value={quantity}
										onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
										className="w-24 h-12 text-center border-2 border-border bg-card text-foreground rounded-xl font-semibold text-lg focus:outline-none focus:border-primary"
										min="1"
									/>
									<button
										onClick={() => setQuantity(quantity + 1)}
										className="w-12 h-12 rounded-xl border-2 border-border bg-card text-foreground flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all"
									>
										+
									</button>
								</div>
							</div>

							{/* Add to Cart Button */}
							<motion.button
								onClick={handleAddToCart}
								disabled={!isInStock}
								whileHover={isInStock ? { scale: 1.02 } : {}}
								whileTap={isInStock ? { scale: 0.98 } : {}}
								className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
									isInStock
										? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl'
										: 'bg-muted text-muted-foreground cursor-not-allowed'
								}`}
							>
								<ShoppingCart className="h-5 w-5" />
								<span>{isInStock ? 'Add to Cart' : 'Sold Out'}</span>
							</motion.button>

							{/* Trust Badges */}
							<div className="grid grid-cols-1 gap-3 pt-4 border-t border-border">
								<div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
									<div className="bg-primary/10 p-2 rounded-lg">
										<Truck className="h-5 w-5 text-primary" />
									</div>
									<p className="text-sm font-medium text-foreground">Free Shipping on Orders Over $250</p>
								</div>
								<div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
									<div className="bg-primary/10 p-2 rounded-lg">
										<Award className="h-5 w-5 text-primary" />
									</div>
									<p className="text-sm font-medium text-foreground">High grade purity Premium quality</p>
								</div>
								<div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
									<div className="bg-primary/10 p-2 rounded-lg">
										<Headphones className="h-5 w-5 text-primary" />
									</div>
									<p className="text-sm font-medium text-foreground">Customer Happiness 100% Guaranteed</p>
								</div>
								<div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
									<div className="bg-primary/10 p-2 rounded-lg">
										<Lock className="h-5 w-5 text-primary" />
									</div>
									<p className="text-sm font-medium text-foreground">256-Bit SSL Encryption 100% Privacy Assurance</p>
								</div>
							</div>
						</motion.div>
					</div>

					{/* Product Description */}
					<div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="bg-card rounded-2xl p-8 border border-border shadow-sm"
						>
							<h2 className="font-serif text-2xl font-medium text-foreground mb-6">Description</h2>
							<div className="space-y-4">
								<div className="flex justify-between py-2 border-b border-border/50">
									<span className="font-medium text-foreground">Appearance:</span>
									<span className="text-muted-foreground">White powder</span>
								</div>
								<div className="flex justify-between py-2 border-b border-border/50">
									<span className="font-medium text-foreground">Cas No:</span>
									<span className="text-muted-foreground">77591-33-4</span>
								</div>
								<div className="flex justify-between py-2 border-b border-border/50">
									<span className="font-medium text-foreground">Molecular Formula:</span>
									<span className="text-muted-foreground">C<sub>212</sub>H<sub>350</sub>N<sub>56</sub>O<sub>78</sub>S</span>
								</div>
								<div className="flex justify-between py-2 border-b border-border/50">
									<span className="font-medium text-foreground">Physical State:</span>
									<span className="text-muted-foreground">Lyophilized powder</span>
								</div>
								<div className="flex justify-between py-2">
									<span className="font-medium text-foreground">Storage:</span>
									<span className="text-muted-foreground">Room Temperature</span>
								</div>
							</div>
						</motion.div>
						
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="bg-card rounded-2xl p-8 border border-border shadow-sm"
						>
							<h2 className="font-serif text-2xl font-medium text-foreground mb-6">Storage & Information</h2>
							<p className="text-muted-foreground leading-relaxed mb-4">
								Store in a cool, dry place at room temperature. Keep away from direct sunlight and moisture. 
								For research purposes only.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								TB-500 (Thymosin Beta-4) is a synthetic peptide fragment derived from thymosin beta-4. 
								This research-grade peptide is designed for scientific studies and laboratory research purposes only.
							</p>
						</motion.div>
					</div>

					{/* Research Disclaimer */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="mt-12 bg-destructive/10 border-2 border-destructive/20 rounded-2xl p-6 lg:p-8"
					>
						<h3 className="font-serif text-lg font-semibold text-destructive mb-3 flex items-center gap-2">
							⚠️ Research Purposes Only
						</h3>
						<p className="text-destructive/90 leading-relaxed">
							This product is sold for research purposes only. Not for human consumption, 
							diagnosis, treatment, cure, or prevention of any disease. By purchasing this product, 
							you certify that you are 18+ years of age and agree to use this product only for 
							legitimate research purposes in accordance with applicable laws and regulations.
						</p>
					</motion.div>
				</div>
			</main>
			<Footer />
		</div>
	)
}
