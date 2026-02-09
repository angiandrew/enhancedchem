'use client'

import { useState } from 'react'
import { ShoppingCart, Truck, Award, Lock, Headphones, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ProductImageCarousel from '@/components/ProductImageCarousel'
import { useCart } from '@/contexts/CartContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductNavigation from '@/components/ProductNavigation'
import ProductStructuredData from '@/components/ProductStructuredData'
import ProductSEO from '@/components/ProductSEO'

export default function RetatrutidePage() {
	const [selectedMG, setSelectedMG] = useState('10mg')
	const [quantity, setQuantity] = useState(1)
	const { addItem } = useCart()

	const mgOptions = [
		// Final price (discount ~10% rounded to .99): 5mg=39.99, 10mg=79.99, 15mg=109.99, 20mg=139.99
		{ value: '5mg', price: 39.99, originalPrice: 43.99, image: '/products/Reta/Reta 5mg.png', inStock: false },
		{ value: '10mg', price: 79.99, originalPrice: 89.99, image: '/products/Reta/Reta 10mg.png', inStock: true },
		{ value: '15mg', price: 109.99, originalPrice: 121.99, image: '/products/Reta/Reta 15mg.png', inStock: true, badge: 'Limited Time Offer' },
		{ value: '20mg', price: 139.99, originalPrice: 155.99, image: '/products/Reta/Reta 20mg.png', inStock: true }
	]

	const currentOption = mgOptions.find(option => option.value === selectedMG)
	const currentPrice = currentOption?.price || 79.99
	const currentOriginalPrice = currentOption?.originalPrice || 89.99
	const currentImage = currentOption?.image || '/products/Reta/Reta 10mg.png'
	const isInStock = currentOption?.inStock ?? true

	const handleAddToCart = () => {
		if (!isInStock) return
		for (let i = 0; i < quantity; i++) {
			addItem({
				id: `retatrutide-${selectedMG === '5mg' ? '5mg' : selectedMG === '10mg' ? '' : selectedMG}`,
				name: `Retatrutide ${selectedMG}`,
				price: currentPrice,
				image: currentImage
			})
		}
	}

	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'
	const productName = `Retatrutide ${selectedMG}`
	const productDescription = `Buy ${productName} - Triple agonist peptide targeting GLP-1, GIP, and glucagon receptors for research applications. Premium quality research peptides from Enhanced Chem with fast shipping. Price: $${currentPrice.toFixed(2)}.`

	return (
		<div className="min-h-screen bg-background">
			<ProductSEO
				title={productName}
				description={productDescription}
				price={currentPrice}
				image={currentImage}
				url={`${baseUrl}/products/retatrutide`}
				brand="Enhanced Chem"
			/>
			<Header />
			<ProductNavigation currentProductId="retatrutide" />
			<ProductStructuredData 
				product={{
					name: productName,
					description: 'Triple agonist peptide targeting GLP-1, GIP, and glucagon receptors for research applications.',
					price: currentPrice,
					originalPrice: currentOriginalPrice,
					image: currentImage,
					inStock: isInStock,
					brand: 'Enhanced Chem',
					url: `${baseUrl}/products/retatrutide`
				}}
			/>
			<main className="pt-36 pb-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Breadcrumb */}
					<nav className="mb-6 pt-4">
					<ol className="flex items-center space-x-2 text-sm text-muted-foreground flex-wrap gap-y-1">
							<li className="whitespace-nowrap"><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
							<li className="whitespace-nowrap">/</li>
							<li className="whitespace-nowrap"><Link href="/products" className="hover:text-primary transition-colors">Products</Link></li>
							<li className="whitespace-nowrap">/</li>
							<li className="text-foreground font-medium whitespace-nowrap">Retatrutide {selectedMG}</li>
						</ol>
					</nav>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
						{/* Product Images - carousel with dots when product + COA */}
						<div className="lg:sticky lg:top-28">
							<ProductImageCarousel
								slides={
									selectedMG === '10mg'
										? [
												{ src: currentImage, alt: `Retatrutide ${selectedMG}` },
												{ src: '/COAs/3rd party testing/reta10.jpg', alt: 'Retatrutide 10mg Certificate of Analysis', isCoa: true },
											]
										: [{ src: currentImage, alt: `Retatrutide ${selectedMG}` }]
								}
								priority
							/>
						</div>

						{/* Product Info */}
						<div className="space-y-4 sm:space-y-6">
							{/* Availability */}
							<div className="flex items-center gap-2">
								{isInStock ? (
									<>
										<CheckCircle className="w-4 h-4 text-green-600" />
										<p className="text-xs text-muted-foreground">
											<span className="text-green-600 font-semibold">In stock</span> - Ready to ship
										</p>
									</>
								) : (
									<>
										<div className="w-4 h-4 rounded-full bg-muted-foreground/40"></div>
										<p className="text-xs text-muted-foreground">
											<span className="text-muted-foreground font-medium">Sold Out</span>
										</p>
									</>
								)}
							</div>

							{/* Product Name */}
							<h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
								Retatrutide {selectedMG}
							</h1>

							{/* Price */}
							<div className="flex items-baseline gap-3">
								<span className="text-3xl md:text-4xl font-serif font-medium text-primary">
									${currentPrice.toFixed(2)}
								</span>
								{currentOriginalPrice > currentPrice && (
									<span className="text-lg text-muted-foreground line-through">
										${currentOriginalPrice.toFixed(2)}
									</span>
								)}
							</div>

							{/* MG Selection */}
							<div>
								<label className="block text-xs sm:text-sm font-medium text-foreground mb-3">
									Select Strength:
								</label>
								<div className="flex flex-wrap gap-3 items-end">
									{mgOptions.map((option) => (
									<div key={option.value} className="relative flex flex-col items-center gap-1.5">
										{option.badge && option.inStock && (
											<span className="bg-primary text-primary-foreground text-[9px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
												{option.badge}
											</span>
										)}
										<button
											type="button"
											onClick={(e) => {
												e.preventDefault()
												e.stopPropagation()
												setSelectedMG(option.value)
											}}
											disabled={!option.inStock && selectedMG !== option.value}
											className={`min-w-[80px] px-5 py-3 rounded-lg border-2 text-sm font-semibold transition-colors relative touch-manipulation ${
												selectedMG === option.value
													? option.inStock
														? 'border-primary bg-primary/10 text-primary'
														: 'border-border bg-muted/50 text-muted-foreground'
													: option.inStock
														? 'border-border bg-card text-foreground active:border-primary active:bg-primary/5'
														: 'border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50'
											}`}
										>
											{option.value}
											{!option.inStock && (
												<span className="absolute -top-1.5 -right-1.5 bg-muted-foreground/60 text-background text-[9px] px-1.5 py-0.5 rounded-full font-medium">
													OUT
												</span>
											)}
										</button>
									</div>
									))}
								</div>
							</div>

						{/* Quantity Selector */}
						<div>
							<label className="block text-xs font-medium text-foreground mb-3">
						Quantity:
							</label>
							<div className="flex items-center gap-2">
									<button
										type="button"
										onClick={(e) => {
											e.preventDefault()
											e.stopPropagation()
											setQuantity(Math.max(1, quantity - 1))
										}}
										disabled={quantity === 1}
										className="w-12 h-12 rounded-lg border-2 border-border bg-card text-foreground flex items-center justify-center active:bg-primary/10 active:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold touch-manipulation"
								>
									-
								</button>
								<input
									type="number"
									value={quantity}
									onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
									className="w-20 h-12 text-center border-2 border-border bg-card text-foreground rounded-lg font-medium text-sm focus:outline-none focus:border-primary"
									min="1"
								/>
								<button
									type="button"
									onClick={(e) => {
										e.preventDefault()
										e.stopPropagation()
										setQuantity(quantity + 1)
									}}
									className="w-12 h-12 rounded-lg border-2 border-border bg-card text-foreground flex items-center justify-center active:bg-primary/10 active:border-primary transition-colors text-lg font-semibold touch-manipulation"
								>
									+
								</button>
							</div>
						</div>

						{/* Add to Cart Button */}
						<button type="button"
							onClick={handleAddToCart}
							disabled={!isInStock}
							className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-3 ${
								isInStock
									? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg'
									: 'bg-muted text-muted-foreground cursor-not-allowed'
							}`}
						>
							<ShoppingCart className="h-4 w-4" />
							<span>{isInStock ? 'Add to Cart' : 'Sold Out'}</span>
						</button>

						{/* Trust Badges */}
						<div className="grid grid-cols-1 gap-2 pt-3 border-t border-border">
							<div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
								<div className="bg-primary/10 p-1.5 rounded-md">
									<Truck className="h-4 w-4 text-primary" />
								</div>
								<p className="text-xs font-medium text-foreground">Free Shipping on Orders Over $250</p>
							</div>
							<div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
								<div className="bg-primary/10 p-1.5 rounded-md">
									<Award className="h-4 w-4 text-primary" />
								</div>
								<p className="text-xs font-medium text-foreground">High grade purity Premium quality</p>
							</div>
							<div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
								<div className="bg-primary/10 p-1.5 rounded-md">
									<Headphones className="h-4 w-4 text-primary" />
								</div>
								<p className="text-xs font-medium text-foreground">Customer Happiness 100% Guaranteed</p>
							</div>
							<div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
								<div className="bg-primary/10 p-1.5 rounded-md">
									<Lock className="h-4 w-4 text-primary" />
								</div>
								<p className="text-xs font-medium text-foreground">256-Bit SSL Encryption 100% Privacy Assurance</p>
							</div>
						</div>
					</div>
				</div>

				{/* Product Description */}
				<div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:p-8 lg:gap-12">
						<div className="bg-card rounded-2xl p-4 sm:p-8 border border-border shadow-sm">
							<h2 className="font-serif text-2xl font-medium text-foreground mb-6">Description</h2>
							<div className="space-y-4">
								<div className="flex justify-between py-2 border-b border-border/50">
									<span className="font-medium text-foreground">Appearance:</span>
									<span className="text-muted-foreground">White powder</span>
								</div>
								<div className="flex justify-between py-2 border-b border-border/50">
									<span className="font-medium text-foreground">Cas No:</span>
									<span className="text-muted-foreground">Not applicable</span>
								</div>
								<div className="flex justify-between py-2 border-b border-border/50">
									<span className="font-medium text-foreground">Molecular Formula:</span>
									<span className="text-muted-foreground">C₁₈₄H₂₈₂N₅₀O₅₉</span>
								</div>
								<div className="flex justify-between py-2 border-b border-border/50">
									<span className="font-medium text-foreground">Physical State:</span>
									<span className="text-muted-foreground">Lyophilized powder</span>
								</div>
								<div className="flex justify-between py-2">
									<span className="font-medium text-foreground">Storage:</span>
									<span className="text-muted-foreground">Store at -20°C</span>
								</div>
							</div>
						</div>
						
						<div className="bg-card rounded-2xl p-4 sm:p-8 border border-border shadow-sm">
							<h2 className="font-serif text-2xl font-medium text-foreground mb-6">Storage & Information</h2>
							<p className="text-muted-foreground leading-relaxed mb-4">
								Store in a freezer at -20°C. Keep away from direct sunlight and moisture.
							</p>
							<p className="text-muted-foreground leading-relaxed mb-4">
								Retatrutide is a triple agonist peptide targeting GLP-1, GIP, and glucagon receptors. It is supplied for in vitro testing and laboratory experimentation only. This product is intended as a research chemical for educational and scientific research purposes only.
							</p>
							<p className="text-muted-foreground leading-relaxed text-sm">
								Product use: For in vitro research and laboratory use only. Not for introduction into humans or animals. Educational purposes only.
							</p>
						</div>
					</div>

					{/* Frequently Bought Together */}
					<div className="mt-16">
					<h2 className="font-serif text-2xl font-medium text-foreground mb-6">Frequently Bought Together</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{[
							{ id: 'bpc-157', name: 'BPC-157 10mg', price: 41.99, originalPrice: 46.99, image: '/products/bpc-157/BPC 10mgnew-new.png' },
							{ id: 'tb-500', name: 'TB-500 10mg', price: 49.99, originalPrice: 54.99, image: '/products/tb-500/TB-500 10mg.png' },
							{ id: 'ghk-cu', name: 'GHK-Cu 50mg', price: 34.99, originalPrice: 38.99, image: '/products/ghk-cu/GHK-Cu 50mg.png' },
							{ id: 'kpv', name: 'KPV 10mg', price: 54.99, originalPrice: 61.99, image: '/products/KPV/KPV 10mg.png' },
							{ id: 'nad-500mg', name: 'NAD+ 500mg', price: 64.99, originalPrice: 72.99, image: '/products/NAD%2B%20500MG/NAD%2B%20500mg.png' },
						].map((product) => (
							<Link key={product.id} href={`/products/${product.id}`}>
								<div className="bg-card rounded-lg border border-border/50 overflow-hidden shadow-sm hover:shadow-md transition-colors cursor-pointer h-full flex flex-col">
									<div className="relative aspect-square bg-secondary/30 p-3">
										<Image
											src={product.image}
											alt={product.name}
											fill
											className="object-contain"
											unoptimized
										/>
									</div>
									<div className="p-3 flex flex-col flex-1">
										<h3 className="font-serif text-sm font-medium text-foreground mb-1 line-clamp-2">{product.name}</h3>
										<div className="flex items-baseline gap-1.5 mt-auto pt-2">
											<span className="text-sm font-semibold text-primary">${product.price.toFixed(2)}</span>
											{product.originalPrice > product.price && (
												<span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
											)}
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>

					{/* Research Disclaimer */}
					<div className="mt-12 bg-destructive/10 border-2 border-destructive/20 rounded-2xl p-6 lg:p-4 sm:p-8">
						<h3 className="font-serif text-lg font-semibold text-destructive mb-3 flex items-center gap-2">
							Research Use Only
						</h3>
						<p className="text-destructive/90 leading-relaxed">
							This product is intended as a research chemical only. For in vitro testing and laboratory experimentation only. Educational and scientific research purposes only. Not for introduction into humans or animals. By purchasing, you certify that you are 18+ and will use only for lawful research in accordance with applicable laws.
						</p>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	)
}
