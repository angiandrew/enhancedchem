'use client'

import { useState } from 'react'
import { ArrowLeft, ShoppingCart, Truck, Award, Lock, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function BPC15710mgPage() {
	const [quantity, setQuantity] = useState(1)
	const { addItem } = useCart()

	const product = {
		name: 'BPC-157 10mg',
		price: 41.99,
		originalPrice: 46.99,
		image: '/products/bpc-157/BPC 10mgnew-new.png',
		description: 'BPC-157 (Body Protection Compound-157) is a synthetic peptide derived from body protection compound found in gastric juice. This research-grade peptide is designed for scientific studies and laboratory research purposes only.',
		inStock: true,
		rating: 4.8,
		reviewCount: 127,
		label: 'Best Seller',
		discount: 25,
		specs: {
			purity: '≥98%',
			molecularWeight: '1419.56 g/mol',
			sequence: 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Asp-Asp-Ala-Gly-Leu-Val'
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
				id: 'bpc-157-10mg',
				name: product.name,
				price: product.price,
				image: product.image
			})
		}
	}

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container mx-auto px-6 pt-28 pb-16">
				{/* Back Link */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="mb-8"
				>
					<Link
						href="/products"
						className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
					>
						<ArrowLeft className="w-4 h-4" />
						<span className="text-sm font-medium">Back to Products</span>
					</Link>
				</motion.div>

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
								<span className="font-medium text-foreground">Sequence:</span>
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
