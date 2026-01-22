'use client'

import { useState } from 'react'
import { ShoppingCart, Truck, Award, Lock, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function Retatrutide15mgPage() {
	const [quantity, setQuantity] = useState(1)
	const { addItem } = useCart()

	const product = {
		name: 'Retatrutide 15mg',
		price: 164.99,
		originalPrice: 183.99,
		image: '/products/Reta/Reta 15mg.png',
		description: 'Retatrutide is a triple agonist peptide targeting GLP-1, GIP, and glucagon receptors. This research-grade peptide in 15mg concentration is designed for scientific studies and laboratory research purposes only.',
		inStock: true,
		label: 'Limited Time Offer',
		discount: 10,
		specs: {
			purity: '≥98%',
			molecularWeight: 'N/A',
			sequence: 'Triple agonist (GLP-1, GIP, Glucagon)'
		},
		storage: {
			temperature: 'Store at -20°C',
			handling: 'Keep away from direct sunlight and moisture. Reconstitute with sterile water for research use.',
			shelfLife: '24 months when stored properly'
		}
	}

	const handleAddToCart = () => {
		if (!product.inStock) return
		for (let i = 0; i < quantity; i++) {
			addItem({
				id: 'retatrutide-15mg',
				name: product.name,
				price: product.price,
				image: product.image
			})
		}
	}

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container mx-auto px-6 pt-36 pb-16">
				{/* Breadcrumb */}
				<nav className="mb-6 pt-4">
					<ol className="flex items-center space-x-2 text-sm text-muted-foreground flex-wrap gap-y-1">
						<li className="whitespace-nowrap"><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
						<li className="whitespace-nowrap">/</li>
						<li className="whitespace-nowrap"><Link href="/products" className="hover:text-primary transition-colors">Products</Link></li>
						<li className="whitespace-nowrap">/</li>
						<li className="text-foreground font-medium whitespace-nowrap">{product.name}</li>
					</ol>
				</nav>

				{/* Two-column Hero Grid */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="grid lg:grid-cols-2 gap-12 mb-16"
				>
					{/* Left Column - Product Image */}
					<div className="relative aspect-square bg-secondary/30 rounded-lg border border-border overflow-hidden">
						<Image
							src={product.image}
							alt={product.name}
							fill
							className="object-contain p-8"
							priority
							unoptimized
						/>
						{/* Top-left Badge - Limited Time Offer only */}
						<div className="absolute top-4 left-4">
							<span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
								{product.label}
							</span>
						</div>
					</div>

					{/* Right Column - Product Info */}
					<div className="flex flex-col gap-6">
						{/* H1 Name */}
						<h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
							{product.name}
						</h1>

						{/* Price with Strikethrough */}
						<div className="flex items-baseline gap-3">
							<span className="text-3xl md:text-4xl font-serif font-medium text-primary">
								${product.price.toFixed(2)}
							</span>
							<span className="text-lg text-muted-foreground line-through">
								${product.originalPrice.toFixed(2)}
							</span>
						</div>

						{/* Description Paragraph */}
						<p className="text-muted-foreground leading-relaxed">
							{product.description}
						</p>

						{/* Quantity Selector */}
						<div className="flex items-center gap-4">
							<label className="text-sm font-medium text-foreground">Quantity:</label>
							<div className="flex items-center gap-2 border border-border rounded-lg">
								<button
									onClick={() => setQuantity(Math.max(1, quantity - 1))}
									className="px-3 py-2 text-foreground hover:bg-secondary transition-colors"
								>
									−
								</button>
								<span className="px-4 py-2 text-sm font-medium text-foreground min-w-[3rem] text-center">
									{quantity}
								</span>
								<button
									onClick={() => setQuantity(quantity + 1)}
									className="px-3 py-2 text-foreground hover:bg-secondary transition-colors"
								>
									+
								</button>
							</div>
						</div>

						{/* Add to Cart Button */}
						<Button
							onClick={handleAddToCart}
							disabled={!product.inStock}
							size="lg"
							className="w-full"
						>
							<ShoppingCart className="w-5 h-5 mr-2" />
							{product.inStock ? 'Add to Cart' : 'Sold Out'}
						</Button>

						{/* Trust Badges Grid - 3 columns */}
						<div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
							<div className="flex flex-col items-center gap-2 text-center">
								<div className="bg-primary/10 p-3 rounded-lg">
									<Truck className="w-6 h-6 text-primary" />
								</div>
								<p className="text-xs font-medium text-foreground">Free Shipping</p>
							</div>
							<div className="flex flex-col items-center gap-2 text-center">
								<div className="bg-primary/10 p-3 rounded-lg">
									<Award className="w-6 h-6 text-primary" />
								</div>
								<p className="text-xs font-medium text-foreground">Premium Quality</p>
							</div>
							<div className="flex flex-col items-center gap-2 text-center">
								<div className="bg-primary/10 p-3 rounded-lg">
									<Lock className="w-6 h-6 text-primary" />
								</div>
								<p className="text-xs font-medium text-foreground">Secure Checkout</p>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Specifications Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="grid md:grid-cols-2 gap-8 mb-16"
				>
					{/* Left Card - Specs Table */}
					<div className="bg-card rounded-lg border border-border p-6">
						<h2 className="font-serif text-2xl font-medium text-foreground mb-6">
							Specifications
						</h2>
						<div className="space-y-4">
							<div className="flex justify-between py-2 border-b border-border/50">
								<span className="font-medium text-foreground">Purity:</span>
								<span className="text-muted-foreground">{product.specs.purity}</span>
							</div>
							<div className="flex justify-between py-2 border-b border-border/50">
								<span className="font-medium text-foreground">Molecular Weight:</span>
								<span className="text-muted-foreground">{product.specs.molecularWeight}</span>
							</div>
							<div className="flex justify-between py-2">
								<span className="font-medium text-foreground">Type:</span>
								<span className="text-muted-foreground text-right text-sm">{product.specs.sequence}</span>
							</div>
						</div>
					</div>

					{/* Right Card - Storage & Handling */}
					<div className="bg-card rounded-lg border border-border p-6">
						<h2 className="font-serif text-2xl font-medium text-foreground mb-6">
							Storage & Handling
						</h2>
						<div className="space-y-4">
							<div>
								<span className="font-medium text-foreground block mb-2">Temperature:</span>
								<span className="text-muted-foreground">{product.storage.temperature}</span>
							</div>
							<div>
								<span className="font-medium text-foreground block mb-2">Handling:</span>
								<span className="text-muted-foreground">{product.storage.handling}</span>
							</div>
							<div>
								<span className="font-medium text-foreground block mb-2">Shelf Life:</span>
								<span className="text-muted-foreground">{product.storage.shelfLife}</span>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Disclaimer */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="bg-secondary/50 rounded-lg p-6 text-center"
				>
					<p className="text-muted-foreground leading-relaxed">
						⚠️ <strong className="text-foreground">Research Purposes Only</strong> - This product is sold for research purposes only. Not for human consumption, diagnosis, treatment, cure, or prevention of any disease. By purchasing this product, you certify that you are 18+ years of age and agree to use this product only for legitimate research purposes in accordance with applicable laws and regulations.
					</p>
				</motion.div>
			</main>
			<Footer />
		</div>
	)
}
