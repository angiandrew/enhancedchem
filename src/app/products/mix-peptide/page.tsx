'use client'

import { useState } from 'react'
import { ShoppingCart, Truck, Award, Lock, Headphones, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function MixPeptidePage() {
	const [quantity, setQuantity] = useState(1)
	const { addItem } = useCart()

	const currentPrice = 299.99
	const currentOriginalPrice = 399.99
	const currentImage = '/products/bpc-tb-ghk-mix/GLOW70.png'

	const handleAddToCart = () => {
		for (let i = 0; i < quantity; i++) {
			addItem({
				id: 'mix-peptide',
				name: 'GLOW 70mg',
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
							<li className="text-foreground font-medium">GLOW 70mg</li>
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
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.3 }}
								className="relative w-full flex justify-center"
							>
								<Image
									src={currentImage}
									alt="GLOW 70mg"
									width={600}
									height={600}
									className="object-contain"
									priority
									unoptimized
									key={currentImage}
								/>
							</motion.div>
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
								GLOW 70mg
							</h1>
							<p className="text-lg text-muted-foreground mt-2">
								GHK-Cu (50MG) + BPC-157 (10MG) + TB-500 (10MG) Mix
							</p>

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
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className="w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl"
							>
								<ShoppingCart className="h-5 w-5" />
								<span>Add to Cart</span>
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
									<span className="text-muted-foreground">Multiple compounds</span>
								</div>
								<div className="flex justify-between py-2 border-b border-border/50">
									<span className="font-medium text-foreground">Molecular Formula:</span>
									<div className="text-muted-foreground text-right">
										<div>BPC-157: C₆₂H₉₈N₁₆O₂₂</div>
										<div>TB-500: C₂₁₂H₃₅₀N₅₆O₇₈S</div>
										<div>GHK-Cu: C₁₄H₂₄N₆O₄</div>
									</div>
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
								This premium peptide blend combines GHK-Cu (50MG), BPC-157 (10MG), and TB-500 (10MG) 
								for comprehensive research applications. Each component is carefully selected for 
								its research-grade quality and scientific properties.
							</p>
							<p className="text-muted-foreground leading-relaxed mt-4 font-medium">
								<strong>Product Composition:</strong> GHK-Cu (50MG) + BPC-157 (10MG) + TB-500 (10MG) Mix
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
