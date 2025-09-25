import ProductCard from "@/components/ProductCard"
import { Shield, Truck, Award, Lock } from "lucide-react"
import Link from "next/link"

export default function Home() {
	const products = [
		{
			id: "bpc-157",
			name: "BPC-157 5mg",
			description: "Body Protection Compound-157 for research purposes. High purity peptide for scientific studies.",
			price: 89.99,
			originalPrice: 119.99,
			image: "/placeholder.jpg",
			rating: 5,
			reviews: 127,
			badge: "Best Seller"
		},
		{
			id: "tb-500",
			name: "TB-500 10mg",
			description: "Thymosin Beta-4 fragment for research applications. Premium quality peptide.",
			price: 149.99,
			originalPrice: 199.99,
			image: "/placeholder.jpg",
			rating: 5,
			reviews: 89,
			badge: "Sale"
		},
		{
			id: "mix-peptide",
			name: "BPC-157 + GHK-Cu + TB-500 Mix",
			description: "Premium peptide blend combining BPC-157, GHK-Cu, and TB-500 for comprehensive research.",
			price: 299.99,
			originalPrice: 399.99,
			image: "/placeholder.jpg",
			rating: 5,
			reviews: 45,
			badge: "New"
		}
	]

	const features = [
		{
			icon: Shield,
			title: "Premium Quality",
			description: "Highest purity peptides with third-party testing and certificates of analysis."
		},
		{
			icon: Truck,
			title: "Fast Shipping",
			description: "Same-day processing on most orders with secure, temperature-controlled shipping."
		},
		{
			icon: Award,
			title: "Research Grade",
			description: "Laboratory-grade peptides suitable for scientific research and studies."
		},
		{
			icon: Lock,
			title: "Secure & Private",
			description: "256-bit SSL encryption and discreet packaging for complete privacy."
		}
	]

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="scientific-theme py-20 relative overflow-hidden">
				
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						{/* Left Content */}
						<div className="text-center lg:text-left">
							{/* Five Star Rating */}
							<div className="flex justify-center lg:justify-start mb-4">
								{[...Array(5)].map((_, i) => (
									<svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
									</svg>
								))}
							</div>
							
							<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 drop-shadow-sm">
								Five Star Quality
								<br />
								in Research Supply
							</h1>
							
							<p className="text-xl text-blue-700 mb-8 font-medium drop-shadow-sm">
								Delivering High Quality At Affordable Prices
							</p>
							
							<Link href="/products" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors uppercase tracking-wide">
								Shop Now!
							</Link>
						</div>
						
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 scientific-theme relative">
				<div className="relative z-10">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-900 mb-4 drop-shadow-sm">
								Why Choose Enhanced Chem?
							</h2>
							<p className="text-lg text-gray-700 drop-shadow-sm">
								We provide the highest quality research peptides with exceptional service
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{features.map((feature, index) => (
								<div key={index} className="text-center bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
									<div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
										<feature.icon className="h-8 w-8 text-blue-600" />
									</div>
									<h3 className="text-xl font-semibold text-gray-900 mb-2">
										{feature.title}
									</h3>
									<p className="text-gray-700">
										{feature.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Products Section */}
			<section className="py-16 scientific-theme relative">
				<div className="relative z-10">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								Our Featured Products
							</h2>
							<p className="text-lg text-gray-600">
								Premium quality peptides for scientific research purposes only
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{products.map((product) => (
								<ProductCard key={product.id} {...product} />
							))}
						</div>
						<div className="text-center mt-12">
							<Link href="/products" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
								View All Products
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Research Disclaimer */}
			<section className="scientific-theme border-t border-b border-red-200 py-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="bg-red-100 border border-red-300 rounded-lg p-6">
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
			</section>
		</div>
	)
}