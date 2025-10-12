'use client'

import { useState, useMemo } from 'react'
import ProductCard from '@/components/ProductCard'
import { Search } from 'lucide-react'

export default function ProductsPage() {
	const [searchTerm, setSearchTerm] = useState('')
	const products = [
		{
			id: "bpc-157-5mg",
			name: "BPC-157 5mg",
			description: "Body Protection Compound-157 in smaller dosage for research purposes. High purity peptide for scientific studies.",
			price: 49.99,
			originalPrice: 89.99,
			image: "/products/bpc-157/BPC-157_5MG_new.png",
			rating: 5,
			reviews: 89,
			badge: "Popular"
		},
		{
			id: "bpc-157",
			name: "BPC-157 10mg",
			description: "Body Protection Compound-157 for research purposes. High purity peptide for scientific studies.",
			price: 89.99,
			originalPrice: 119.99,
			image: "/products/bpc-157/BPC-157_new.png",
			rating: 5,
			reviews: 127,
			badge: "Best Seller"
		},
		{
			id: "tb-500-5mg",
			name: "TB-500 5mg",
			description: "Thymosin Beta-4 fragment in smaller dosage for research applications. Premium quality peptide.",
			price: 89.99,
			originalPrice: 119.99,
			image: "/products/tb-500/TB 500_5MG_new.png",
			rating: 5,
			reviews: 34,
			badge: "Limited"
		},
		{
			id: "tb-500",
			name: "TB-500 10mg",
			description: "Thymosin Beta-4 fragment for research applications. Premium quality peptide.",
			price: 149.99,
			originalPrice: 199.99,
			image: "/products/tb-500/TB 500_10MG_new.png",
			rating: 5,
			reviews: 89,
			badge: "Sale"
		},
		{
			id: "ghk-cu",
			name: "GHK-Cu 50mg",
			description: "Copper peptide GHK-Cu for research applications. Known for its regenerative properties in scientific studies.",
			price: 199.99,
			originalPrice: 249.99,
			image: "/products/ghk-cu/GHK-Cu-50MG_new.png",
			rating: 5,
			reviews: 67,
			badge: "Featured"
		},
		{
			id: "ghk-cu-100mg",
			name: "GHK-Cu 100mg",
			description: "Higher concentration copper peptide GHK-Cu for advanced research applications. Known for its regenerative properties in scientific studies.",
			price: 349.99,
			originalPrice: 449.99,
			image: "/products/ghk-cu/GHK-Cu 100MG_neww.png",
			rating: 5,
			reviews: 23,
			badge: "Premium"
		},
		{
			id: "kpv",
			name: "KPV 10mg",
			description: "Lysine-Proline-Valine peptide for research applications. Known for its anti-inflammatory properties in scientific studies.",
			price: 79.99,
			originalPrice: 99.99,
			image: "/products/KPV/KPV_10M.png",
			rating: 5,
			reviews: 45,
			badge: "New"
		},
		{
			id: "semax",
			name: "Semax 10mg",
			description: "Synthetic peptide for research applications. Known for its neuroprotective properties in scientific studies.",
			price: 129.99,
			originalPrice: 159.99,
			image: "/products/Semax/Semax.png",
			rating: 5,
			reviews: 38,
			badge: "Premium"
		},
		{
			id: "bpc-tb-mix",
			name: "BPC-157 (5MG) + TB-500 (5MG) Mix",
			description: "Premium peptide blend combining BPC-157 (5MG) and TB-500 (5MG) for comprehensive research applications.",
			price: 149.99,
			originalPrice: 199.99,
			image: "/products/bpc-tb-mix/Bpc-tb-5MG.png",
			rating: 5,
			reviews: 32,
			badge: "New"
		},
		{
			id: "bpc-tb-mix-10mg",
			name: "BPC-157 (10MG) + TB-500 (10MG) Mix",
			description: "Premium peptide blend combining BPC-157 (10MG) and TB-500 (10MG) for comprehensive research applications.",
			price: 199.99,
			originalPrice: 249.99,
			image: "/products/bpc-tb-mix/BPC:Tb_10MG mix.png",
			rating: 5,
			reviews: 28,
			badge: "Premium"
		},
		{
			id: "mix-peptide",
			name: "GHK-Cu (50MG) + BPC-157 (10MG) + TB500 (10MG) Mix",
			description: "Premium peptide blend combining GHK-Cu (50MG), BPC-157 (10MG), and TB-500 (10MG) for comprehensive research.",
			price: 299.99,
			originalPrice: 399.99,
			image: "/products/bpc-tb-ghk-mix/bpc-tb-ghk-mix.png",
			rating: 5,
			reviews: 45,
			badge: "New"
		}
	]

	// Filter products based on search term
	const filteredProducts = useMemo(() => {
		if (!searchTerm.trim()) {
			return products
		}
		
		const searchLower = searchTerm.toLowerCase()
		return products.filter(product => 
			product.name.toLowerCase().includes(searchLower) ||
			product.description.toLowerCase().includes(searchLower) ||
			product.badge?.toLowerCase().includes(searchLower)
		)
	}, [searchTerm])

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="relative w-full h-80 md:h-96 overflow-hidden">
				{/* Background Image with Gradient Overlay */}
				<div 
					className="absolute inset-0 bg-cover bg-center bg-no-repeat"
					style={{
						backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.6), rgba(30, 58, 138, 0.6)), url('/hero-lab.jpg')`
					}}
				></div>
				
				{/* Content */}
				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
					<div className="text-center w-full">
						<h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
							Research Peptides
						</h1>
						<p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto">
							Premium quality peptides for scientific research purposes only
						</p>
						<div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mt-6 rounded-full"></div>
					</div>
				</div>
			</section>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Header with Search */}
				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16">
					<div className="text-center lg:text-left mb-8 lg:mb-0">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Our Products
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
							Browse our comprehensive collection of research-grade peptides
						</p>
					</div>
					
					{/* Search Bar */}
					<div className="relative max-w-md mx-auto lg:mx-0">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Search className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type="text"
							placeholder="Search products..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
						/>
					</div>
				</div>

				{/* Search Results Count */}
				{searchTerm && (
					<div className="mb-6">
						<p className="text-gray-600">
							{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found for &ldquo;{searchTerm}&rdquo;
						</p>
					</div>
				)}

				{/* Products Grid */}
				{filteredProducts.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
						{filteredProducts.map((product) => (
							<ProductCard key={product.id} {...product} />
						))}
					</div>
				) : (
					<div className="text-center py-12">
						<div className="text-gray-400 mb-4">
							<Search className="h-16 w-16 mx-auto" />
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
						<p className="text-gray-600">Try adjusting your search terms or browse all products</p>
						<button
							onClick={() => setSearchTerm('')}
							className="mt-4 text-blue-600 hover:text-blue-700 font-medium transition-colors"
						>
							Clear search
						</button>
					</div>
				)}

				{/* Research Disclaimer */}
				<div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
					<h3 className="text-lg font-semibold text-red-800 mb-2">
						⚠️ Research Purposes Only
					</h3>
					<p className="text-red-700">
						All products are sold for research purposes only. Not for human consumption, 
						diagnosis, treatment, cure, or prevention of any disease. By purchasing our products, 
						you certify that you are 21+ years of age and agree to use these products only for 
						legitimate research purposes in accordance with applicable laws and regulations.
					</p>
				</div>
			</div>
		</div>
	)
}
