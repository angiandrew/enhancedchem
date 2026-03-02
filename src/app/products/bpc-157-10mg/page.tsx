'use client'

import { useState } from 'react'
import { ArrowLeft, ShoppingCart, Truck, Award, Lock, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductNavigation from '@/components/ProductNavigation'
import ProductImageCarousel from '@/components/ProductImageCarousel'
import { Button } from '@/components/ui/button'

const mgOptions = [
	{ value: '5mg', price: 34.99, originalPrice: 38.99, image: '/products/bpc-157/BPC-157 5mg.png', inStock: false },
	{ value: '10mg', price: 41.99, originalPrice: 46.99, image: '/products/bpc-157/BPC-157 10mg.png', inStock: true },
	{ value: '20mg', price: 54.99, originalPrice: 59.99, image: '/products/bpc-157/BPC-157 20mg.png', inStock: true },
]

export default function BPC15710mgPage() {
	const [selectedMG, setSelectedMG] = useState('10mg')
	const [quantity, setQuantity] = useState(1)
	const { addItem } = useCart()

	const currentOption = mgOptions.find((o) => o.value === selectedMG) || mgOptions[1]
	const isInStock = currentOption.inStock

	const product = {
		name: `BPC-157 ${selectedMG}`,
		price: currentOption.price,
		originalPrice: currentOption.originalPrice,
		image: currentOption.image,
		description: 'BPC-157 is a synthetic pentadecapeptide composed of 15 amino acids arranged in a defined linear sequence. It is produced through controlled laboratory synthesis for analytical and experimental research applications. This material is supplied strictly for laboratory research use in controlled, non-clinical environments.',
		inStock: isInStock,
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
		if (!isInStock) return
		for (let i = 0; i < quantity; i++) {
			addItem({
				id: `bpc-157-${selectedMG}`,
				name: product.name,
				price: product.price,
				image: product.image
			})
		}
	}

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<ProductNavigation currentProductId="bpc-157-10mg" />
			<main className="container mx-auto px-6 pt-28 pb-16">
				{/* Back Link */}
				<div className="mb-8">
					<Link
						href="/products"
						className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
					>
						<ArrowLeft className="w-4 h-4" />
						<span className="text-sm font-medium">Back to Products</span>
					</Link>
				</div>

				{/* Two-column Hero Grid */}
				<div className="grid lg:grid-cols-2 gap-6 lg:gap-12 mb-16">
					{/* Left Column - Product Images carousel with dots */}
					<div>
						<ProductImageCarousel
							slides={
								selectedMG === '10mg'
									? [
											{ src: product.image, alt: product.name },
											{ src: '/COAs/3rd party testing/BPC10.jpg', alt: 'BPC-157 10mg Certificate of Analysis', isCoa: true },
										]
									: selectedMG === '5mg'
										? [
												{ src: product.image, alt: product.name },
												{ src: '/COAs/3rd party testing/bpc5.jpg', alt: 'BPC-157 5mg Certificate of Analysis', isCoa: true },
											]
										: [{ src: product.image, alt: product.name }]
							}
							priority
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

						{/* Select Strength */}
						<div>
							<label className="block text-xs font-medium text-foreground mb-3">Select Strength:</label>
							<div className="flex flex-wrap gap-2">
								{mgOptions.map((option) => (
									<button
										key={option.value}
										type="button"
										onClick={() => setSelectedMG(option.value)}
										disabled={!option.inStock && selectedMG !== option.value}
										className={`min-w-[72px] px-4 py-2.5 rounded-lg border-2 text-sm font-semibold transition-colors ${
											selectedMG === option.value
												? 'border-primary bg-primary/10 text-primary'
												: option.inStock
													? 'border-border bg-card text-foreground hover:border-primary/50'
													: 'border-border bg-muted/50 text-muted-foreground opacity-60 cursor-not-allowed'
										}`}
									>
										{option.value}
										{!option.inStock && ' (OUT)'}
									</button>
								))}
							</div>
						</div>

						{/* Quantity */}
						<div>
							<label className="block text-xs font-medium text-foreground mb-2">Quantity:</label>
							<div className="flex items-center gap-2">
								<button
									type="button"
									onClick={() => setQuantity((q) => Math.max(1, q - 1))}
									disabled={quantity <= 1}
									className="w-10 h-10 rounded-lg border-2 border-border flex items-center justify-center disabled:opacity-50"
								>
									−
								</button>
								<span className="w-8 text-center font-medium">{quantity}</span>
								<button
									type="button"
									onClick={() => setQuantity((q) => q + 1)}
									className="w-10 h-10 rounded-lg border-2 border-border flex items-center justify-center"
								>
									+
								</button>
							</div>
						</div>

						{/* Description Paragraph */}
						<p className="text-muted-foreground leading-relaxed">
							{product.description}
						</p>

						{/* Add to Cart Button */}
						<Button
							onClick={handleAddToCart}
							disabled={!isInStock}
							size="lg"
							className="w-full"
						>
							<ShoppingCart className="w-5 h-5 mr-2" />
							{isInStock ? 'Add to Cart' : 'Sold Out'}
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
				</div>

				{/* Specifications Section */}
				<div className="grid md:grid-cols-2 gap-4 sm:p-8 mb-16">
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
								<span className="font-medium text-foreground block mb-3">Temperature:</span>
								<span className="text-muted-foreground">{product.storage.temperature}</span>
							</div>
							<div>
								<span className="font-medium text-foreground block mb-3">Handling:</span>
								<span className="text-muted-foreground">{product.storage.handling}</span>
							</div>
							<div>
								<span className="font-medium text-foreground block mb-3">Shelf Life:</span>
								<span className="text-muted-foreground">{product.storage.shelfLife}</span>
							</div>
						</div>
					</div>
				</div>

				{/* Disclaimer */}
				<div className="bg-secondary/50 rounded-lg p-6 text-center">
					<p className="text-muted-foreground leading-relaxed">
						⚠️ <strong className="text-foreground">Research Purposes Only</strong> - This product is sold for research purposes only. Not for human consumption, diagnosis, treatment, cure, or prevention of any disease. By purchasing this product, you certify that you are 21+ years of age and agree to use this product only for legitimate research purposes in accordance with applicable laws and regulations.
					</p>
				</div>
			</main>
			<Footer />
		</div>
	)
}
