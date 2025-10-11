import ProductCard from "@/components/ProductCard"
import { Shield, Truck, Award, Lock, Microscope, ArrowRight } from "lucide-react"
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
			image: "/products/bpc-157/BPC-157_5MG_new.png",
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
			image: "/products/tb-500/TB 500_10MG_new.png",
			rating: 5,
			reviews: 89,
			badge: "Sale"
		},
		{
			id: "mix-peptide",
			name: "GHK-Cu (50MG) + BPC-157 (10MG) + TB-500 (10MG) Mix",
			description: "Premium peptide blend combining GHK-Cu (50MG), BPC-157 (10MG), and TB-500 (10MG) for comprehensive research.",
			price: 299.99,
			originalPrice: 399.99,
			image: "/products/bpc-tb-ghk-mix/bpc-tb-ghk-mix.png",
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
			{/* Hero Section - Professional Research Theme */}
			<section className="relative w-full min-h-[90vh] overflow-hidden">
				{/* Background Image with Dark Blue Gradient Overlay */}
				<div 
					className="absolute inset-0 bg-cover bg-center bg-no-repeat"
					style={{
						backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.7), rgba(30, 58, 138, 0.7)), url('/hero-lab.jpg')`
					}}
				></div>
				
				{/* Content Container */}
				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[90vh] flex items-center justify-center">
					<div className="text-center max-w-5xl mx-auto animate-fade-in">
						{/* Badge */}
						<div className="inline-flex items-center bg-blue-500/10 border border-blue-400/20 rounded-full px-6 py-2 mb-8">
							<Microscope className="h-4 w-4 text-blue-400 mr-2" />
							<span className="text-blue-400 text-sm font-medium">Research-Grade Therapeutic Peptides</span>
						</div>

						{/* Main Heading */}
						<h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
							Advanced Peptide Solutions
							<br />
							<span className="text-cyan-400">For Medical Professionals</span>
						</h1>

						{/* Subheading */}
						<p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto mb-12">
							Pharmaceutical-grade GHK-CU, BPC-157, and TB-500 with certified purity standards and comprehensive scientific documentation.
						</p>

						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
							<Link 
								href="/products" 
								className="inline-flex items-center bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
							>
								View Products
								<ArrowRight className="ml-2 h-5 w-5" />
							</Link>
							<Link 
								href="/about" 
								className="inline-flex items-center bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
							>
								Scientific Documentation
							</Link>
						</div>

						{/* Trust Indicators */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
							<div className="text-center">
								<div className="text-4xl font-bold text-cyan-400 mb-2">99.9%+</div>
								<div className="text-white/80 text-sm">Purity Certified</div>
							</div>
							<div className="text-center">
								<div className="text-4xl font-bold text-cyan-400 mb-2">GMP</div>
								<div className="text-white/80 text-sm">Compliant Facility</div>
							</div>
							<div className="text-center">
								<div className="text-4xl font-bold text-cyan-400 mb-2">3rd Party</div>
								<div className="text-white/80 text-sm">Lab Tested</div>
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