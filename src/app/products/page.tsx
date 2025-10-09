import ProductCard from '@/components/ProductCard'

export default function ProductsPage() {
	const products = [
		{
			id: "bpc-157",
			name: "BPC-157 10mg",
			description: "Body Protection Compound-157 for research purposes. High purity peptide for scientific studies.",
			price: 89.99,
			originalPrice: 119.99,
			image: "/products/bpc-157/4ba41c3c-29b9-4162-91c1-456b643512d4 copy.png",
			rating: 5,
			reviews: 127,
			badge: "Best Seller"
		},
		{
			id: "bpc-157-5mg",
			name: "BPC-157 5mg",
			description: "Body Protection Compound-157 in smaller dosage for research purposes. High purity peptide for scientific studies.",
			price: 49.99,
			originalPrice: 89.99,
			image: "/products/bpc-157/BPC-157_5mg.png",
			rating: 5,
			reviews: 89,
			badge: "Popular"
		},
		{
			id: "tb-500",
			name: "TB-500 10mg",
			description: "Thymosin Beta-4 fragment for research applications. Premium quality peptide.",
			price: 149.99,
			originalPrice: 199.99,
			image: "/products/tb-500/3019f3ef-7005-4530-85ad-a5d75c56fce0 copy.png",
			rating: 5,
			reviews: 89,
			badge: "Sale"
		},
		{
			id: "mix-peptide",
			name: "GHK-Cu (50MG) + BPC-157 (10MG) + TB500 (10MG) Mix",
			description: "Premium peptide blend combining GHK-Cu (50MG), BPC-157 (10MG), and TB-500 (10MG) for comprehensive research.",
			price: 299.99,
			originalPrice: 399.99,
			image: "/products/mix-peptide/4bf12ccf-4897-4ae6-9a56-22cf47adf0b4 copy.png",
			rating: 5,
			reviews: 45,
			badge: "New"
		},
		{
			id: "ghk-cu",
			name: "GHK-Cu 50mg",
			description: "Copper peptide GHK-Cu for research applications. Known for its regenerative properties in scientific studies.",
			price: 199.99,
			originalPrice: 249.99,
			image: "/products/ghk-cu/GHK-CU_50MG.png",
			rating: 5,
			reviews: 67,
			badge: "Featured"
		},
		{
			id: "tb-500-5mg",
			name: "TB-500 5mg",
			description: "Thymosin Beta-4 fragment in smaller dosage for research applications. Premium quality peptide.",
			price: 89.99,
			originalPrice: 119.99,
			image: "/products/tb-500/Tb-500_5MG.png",
			rating: 5,
			reviews: 34,
			badge: "Limited"
		},
		{
			id: "ghk-cu-100mg",
			name: "GHK-Cu 100mg",
			description: "Higher concentration copper peptide GHK-Cu for advanced research applications. Known for its regenerative properties in scientific studies.",
			price: 349.99,
			originalPrice: 449.99,
			image: "/products/ghk-cu/GHK-CU_100MG.png",
			rating: 5,
			reviews: 23,
			badge: "Premium"
		}
	]

	return (
		<div className="min-h-screen scientific-theme relative">
			<div className="relative z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					{/* Header */}
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-gray-900 mb-4">
							Research Peptides
						</h1>
						<p className="text-lg text-gray-600">
							Premium quality peptides for scientific research purposes only
						</p>
					</div>


					{/* Products Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{products.map((product) => (
							<ProductCard key={product.id} {...product} />
						))}
					</div>

					{/* Research Disclaimer */}
					<div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
						<h3 className="text-lg font-semibold text-red-800 mb-2">
							⚠️ Research Purposes Only
						</h3>
						<p className="text-red-700">
							All products are sold for research purposes only. Not for human consumption, 
							diagnosis, treatment, cure, or prevention of any disease. By purchasing our products, 
							you certify that you are 18+ years of age and agree to use these products only for 
							legitimate research purposes in accordance with applicable laws and regulations.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
