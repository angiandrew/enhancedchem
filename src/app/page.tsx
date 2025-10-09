import ProductCard from "@/components/ProductCard"
import { Shield, Truck, Award, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
	const products = [
		{
			id: "bpc-157",
			name: "BPC-157 5mg",
			description: "Body Protection Compound-157 for research purposes. High purity peptide for scientific studies.",
			price: 49.99,
			originalPrice: 89.99,
			image: "/products/bpc-157/BPC-157_5mg.png",
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
			image: "/products/tb-500/3019f3ef-7005-4530-85ad-a5d75c56fce0 copy.png",
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
			image: "/products/mix-peptide/4bf12ccf-4897-4ae6-9a56-22cf47adf0b4 copy.png",
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
			{/* Hero Section - Clean Professional Layout */}
			<section className="relative w-full h-[72vh] bg-white overflow-hidden">
				{/* Background with subtle pattern */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 transition-all duration-500"></div>
				<div className="absolute inset-0 opacity-5 transition-opacity duration-500">
					<div className="absolute inset-0" style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
					}}></div>
				</div>
				
				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
					<div className="flex items-center h-full">
						{/* Left Content - 45% width */}
						<div className="w-full lg:w-[45%] pr-8 transition-all duration-500 ease-out">
							<div className="max-w-lg">
								<h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight transition-all duration-500 ease-out transform hover:scale-102">
									Same-Day Shipping on USA Orders*
								</h1>
								<div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8 transition-all duration-500 ease-out">
									<div className="flex items-center text-lg text-gray-700 transition-all duration-400 hover:text-green-600">
										<div className="w-3 h-3 bg-green-500 rounded-full mr-3 transition-all duration-400 hover:scale-110"></div>
										<span className="font-semibold">99% Purity Guaranteed</span>
									</div>
									<div className="flex items-center text-lg text-gray-700 transition-all duration-400 hover:text-blue-600">
										<div className="w-3 h-3 bg-blue-500 rounded-full mr-3 transition-all duration-400 hover:scale-110"></div>
										<span className="font-semibold">Safe & Secure</span>
									</div>
								</div>
								<Link href="/products" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all duration-400 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5">
									Shop Now
								</Link>
							</div>
						</div>
						
						{/* Right Image - 55% width */}
						<div className="hidden lg:block w-[55%] pl-8 transition-all duration-500 ease-out">
							<div className="relative transform hover:scale-102 transition-all duration-500 ease-out">
								<img 
									src="/hero-image.png" 
									alt="Enhanced Chem Research Peptides"
									className="w-full h-auto object-contain drop-shadow-2xl transition-all duration-500 ease-out"
								/>
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-blue-100 opacity-0 hover:opacity-15 transition-opacity duration-500"></div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section - SwissChems Style */}
			<section className="bg-gray-50 py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						{features.map((feature, index) => (
							<div key={index} className="text-center">
								<div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									<feature.icon className="h-8 w-8 text-blue-600" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									{feature.title}
								</h3>
								<p className="text-gray-600 text-sm">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Products Section - SwissChems Style */}
			<section className="bg-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Most Popular
						</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{products.map((product) => (
							<ProductCard key={product.id} {...product} />
						))}
					</div>
					<div className="text-center mt-12">
						<Link href="/products" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
							Explore All
						</Link>
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