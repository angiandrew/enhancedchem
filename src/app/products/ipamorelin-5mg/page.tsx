'use client'

import { useState } from 'react'
import { ShoppingCart, Truck, Award, Lock, Headphones, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductNavigation from '@/components/ProductNavigation'

export default function Ipamorelin5mgPage() {
	const [selectedMG, setSelectedMG] = useState('5mg')
	const [quantity, setQuantity] = useState(1)
	const { addItem } = useCart()

	const mgOptions = [
		{ value: '5mg', price: 39.99, originalPrice: 44.99, image: '/products/Ipamorelin/Ipamorelin 5mg.png', inStock: true },
		{ value: '10mg', price: 59.99, originalPrice: 66.99, image: '/products/Ipamorelin/Ipamorelin 10mg.png', inStock: true }
	]

	const currentOption = mgOptions.find(option => option.value === selectedMG)
	const currentPrice = currentOption?.price || 39.99
	const currentOriginalPrice = currentOption?.originalPrice || 44.99
	const currentImage = currentOption?.image || '/products/Ipamorelin/Ipamorelin 5mg.png'
	const isInStock = currentOption?.inStock ?? true

	const handleAddToCart = () => {
		if (!isInStock) return
		for (let i = 0; i < quantity; i++) {
			addItem({
				id: selectedMG === '5mg' ? 'ipamorelin-5mg' : 'ipamorelin',
				name: `Ipamorelin ${selectedMG}`,
				price: currentPrice,
				image: currentImage
			})
		}
	}

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<ProductNavigation currentProductId="ipamorelin-5mg" />
			<main className="pt-36 pb-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<nav className="mb-6 pt-4">
						<ol className="flex items-center space-x-2 text-sm text-muted-foreground flex-wrap gap-y-1">
							<li className="whitespace-nowrap"><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
							<li className="whitespace-nowrap">/</li>
							<li className="whitespace-nowrap"><Link href="/products" className="hover:text-primary transition-colors">Products</Link></li>
							<li className="whitespace-nowrap">/</li>
							<li className="text-foreground font-medium whitespace-nowrap">Ipamorelin {selectedMG}</li>
						</ol>
					</nav>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
						<div className="lg:sticky lg:top-28 overflow-hidden rounded-lg">
							<div className="relative aspect-square overflow-hidden">
								<Image
									src={currentImage}
									alt={`Ipamorelin ${selectedMG}`}
									fill
									className="object-cover object-center"
									priority
								/>
							</div>
						</div>

						<div className="space-y-4">
							<div className="flex items-center gap-2">
								{isInStock ? (
									<><CheckCircle className="w-4 h-4 text-green-600" /><p className="text-xs text-muted-foreground"><span className="text-green-600 font-semibold">In stock</span> - Ready to ship</p></>
								) : (
									<><div className="w-4 h-4 rounded-full bg-muted-foreground/40"></div><p className="text-xs text-muted-foreground"><span className="text-muted-foreground font-medium">Sold Out</span></p></>
								)}
							</div>
							<h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground">Ipamorelin {selectedMG}</h1>
							<div className="flex items-baseline gap-3">
								<span className="text-3xl md:text-4xl font-serif font-medium text-primary">${currentPrice.toFixed(2)}</span>
								{currentOriginalPrice > currentPrice && <span className="text-lg text-muted-foreground line-through">${currentOriginalPrice.toFixed(2)}</span>}
							</div>
							<div>
								<label className="block text-xs font-medium text-foreground mb-3">Select Strength:</label>
								<div className="flex flex-wrap gap-3">
									{mgOptions.map((option) => (
										<button
											type="button"
											key={option.value}
											onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedMG(option.value); }}
											className={`px-5 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${selectedMG === option.value ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card text-foreground'}`}
										>
											{option.value}
										</button>
									))}
								</div>
							</div>
							<div>
								<label className="block text-xs font-medium text-foreground mb-3">Quantity:</label>
								<div className="flex items-center gap-2">
									<button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity === 1} className="w-12 h-12 rounded-lg border-2 border-border bg-card flex items-center justify-center disabled:opacity-50 text-lg font-semibold">-</button>
									<input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-20 h-12 text-center border-2 border-border bg-card rounded-lg font-medium text-sm" min="1" />
									<button type="button" onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 rounded-lg border-2 border-border bg-card flex items-center justify-center text-lg font-semibold">+</button>
								</div>
							</div>
							<button type="button" onClick={handleAddToCart} disabled={!isInStock} className={`w-full py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 ${isInStock ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}>
								<ShoppingCart className="h-4 w-4" /><span>{isInStock ? 'Add to Cart' : 'Sold Out'}</span>
							</button>
							<div className="grid grid-cols-1 gap-2 pt-3 border-t border-border">
								<div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50"><div className="bg-primary/10 p-1.5 rounded-md"><Truck className="h-4 w-4 text-primary" /></div><p className="text-xs font-medium">Free Shipping on Orders Over $250</p></div>
								<div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50"><div className="bg-primary/10 p-1.5 rounded-md"><Award className="h-4 w-4 text-primary" /></div><p className="text-xs font-medium">High grade purity Premium quality</p></div>
								<div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50"><div className="bg-primary/10 p-1.5 rounded-md"><Headphones className="h-4 w-4 text-primary" /></div><p className="text-xs font-medium">Customer Happiness 100% Guaranteed</p></div>
								<div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50"><div className="bg-primary/10 p-1.5 rounded-md"><Lock className="h-4 w-4 text-primary" /></div><p className="text-xs font-medium">256-Bit SSL Encryption 100% Privacy Assurance</p></div>
							</div>
						</div>
					</div>

					<div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:p-8 lg:gap-12">
						<div className="bg-card rounded-2xl p-4 sm:p-8 border border-border shadow-sm">
							<h2 className="font-serif text-2xl font-medium text-foreground mb-6">Description</h2>
							<div className="space-y-4">
								<div className="flex justify-between py-2 border-b border-border/50"><span className="font-medium">Appearance:</span><span className="text-muted-foreground">White powder</span></div>
								<div className="flex justify-between py-2 border-b border-border/50"><span className="font-medium">Molecular Formula:</span><span className="text-muted-foreground">C<sub>50</sub>H<sub>68</sub>N<sub>14</sub>O<sub>10</sub></span></div>
								<div className="flex justify-between py-2 border-b border-border/50"><span className="font-medium">Physical State:</span><span className="text-muted-foreground">Lyophilized powder</span></div>
								<div className="flex justify-between py-2"><span className="font-medium">Storage:</span><span className="text-muted-foreground">Store frozen or refrigerated</span></div>
							</div>
						</div>
						<div className="bg-card rounded-2xl p-4 sm:p-8 border border-border shadow-sm">
							<h2 className="font-serif text-2xl font-medium text-foreground mb-6">Storage & Information</h2>
							<p className="text-muted-foreground leading-relaxed mb-4">Store in a freezer at -20°C or refrigerated. Keep away from direct sunlight and moisture.</p>
							<p className="text-muted-foreground leading-relaxed">Ipamorelin is a growth hormone-releasing peptide (GHRP) used in research. This product is supplied for in vitro testing and laboratory use only. Not for human consumption.</p>
						</div>
					</div>

					<div className="mt-16">
						<h2 className="font-serif text-2xl font-medium text-foreground mb-6">Frequently Bought Together</h2>
						<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
							{[
								{ id: 'bpc-157', name: 'BPC-157 10mg', price: 41.99, originalPrice: 46.99, image: '/products/bpc-157/BPC-157 10mg.png' },
								{ id: 'tb-500', name: 'TB-500 10mg', price: 49.99, originalPrice: 54.99, image: '/products/tb-500/TB-500 10mg.png' },
								{ id: 'cjc-1295-no-dac', name: 'CJC-1295 No DAC 10mg', price: 64.99, originalPrice: 71.99, image: '/products/CJC NO DAC/CJC-1295 10mg.png' },
								{ id: 'ghk-cu', name: 'GHK-Cu 50mg', price: 34.99, originalPrice: 38.99, image: '/products/ghk-cu/GHK-Cu 50mg.png' },
								{ id: 'nad-500mg', name: 'NAD+ 500mg', price: 64.99, originalPrice: 72.99, image: '/products/NAD%2B%20500MG/NAD%20500mg.png' },
							].map((product) => (
								<Link key={product.id} href={`/products/${product.id}`}>
									<div className="bg-card rounded-lg border border-border/50 overflow-hidden shadow-sm hover:shadow-md h-full flex flex-col">
										<div className="relative aspect-square bg-secondary/30 p-3">
									<Image src={product.image} alt={product.name} fill className="object-contain" />
										</div>
										<div className="p-3 flex flex-col flex-1">
											<h3 className="font-serif text-sm font-medium mb-1 line-clamp-2">{product.name}</h3>
											<div className="flex items-baseline gap-1.5 mt-auto pt-2">
												<span className="text-sm font-semibold text-primary">${product.price.toFixed(2)}</span>
												{product.originalPrice > product.price && <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>}
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>

					<div className="mt-12 bg-destructive/10 border-2 border-destructive/20 rounded-2xl p-6">
						<h3 className="font-serif text-lg font-semibold text-destructive mb-3">Research Purposes Only</h3>
						<p className="text-destructive/90 leading-relaxed">This product is sold for research purposes only. Not for human consumption. By purchasing, you certify you are 21+ and will use only for lawful research.</p>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	)
}
