import { ShoppingCart, Star, Shield, Truck, Award } from 'lucide-react'
import PlaceholderImage from '@/components/PlaceholderImage'

export default function BPC157Page() {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Breadcrumb */}
				<nav className="mb-8">
					<ol className="flex items-center space-x-2 text-sm text-gray-500">
						<li><a href="/" className="hover:text-blue-600">Home</a></li>
						<li>/</li>
						<li><a href="/products" className="hover:text-blue-600">Products</a></li>
						<li>/</li>
						<li className="text-gray-900">BPC-157 5mg</li>
					</ol>
				</nav>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Product Image */}
					<div>
						<PlaceholderImage
							width={500}
							height={400}
							text="BPC-157 5mg"
							className="w-full h-96 rounded-lg"
						/>
					</div>

					{/* Product Info */}
					<div>
						<div className="mb-4">
							<span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
								Best Seller
							</span>
						</div>
						
						<h1 className="text-3xl font-bold text-gray-900 mb-4">
							BPC-157 5mg
						</h1>
						
						<div className="flex items-center mb-4">
							<div className="flex items-center">
								{[...Array(5)].map((_, i) => (
									<Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
								))}
							</div>
							<span className="text-sm text-gray-600 ml-2">
								5.0 (127 reviews)
							</span>
						</div>

						<div className="mb-6">
							<div className="flex items-center space-x-4">
								<span className="text-3xl font-bold text-blue-600">
									$89.99
								</span>
								<span className="text-xl text-gray-500 line-through">
									$119.99
								</span>
								<span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
									Save 25%
								</span>
							</div>
						</div>

						<div className="mb-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Product Description
							</h3>
							<p className="text-gray-600 leading-relaxed">
								BPC-157 (Body Protection Compound-157) is a synthetic peptide derived from 
								body protection compound found in gastric juice. This research-grade peptide 
								is designed for scientific studies and laboratory research purposes only.
							</p>
						</div>

						<div className="mb-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Key Features
							</h3>
							<ul className="space-y-2 text-gray-600">
								<li>• High purity research-grade peptide</li>
								<li>• Third-party tested for quality assurance</li>
								<li>• Lyophilized powder form</li>
								<li>• Certificate of Analysis included</li>
								<li>• Temperature-controlled storage</li>
							</ul>
						</div>

						<div className="mb-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Specifications
							</h3>
							<div className="bg-gray-100 rounded-lg p-4">
								<div className="grid grid-cols-2 gap-4 text-sm">
									<div>
										<span className="font-semibold">Purity:</span> ≥98%
									</div>
									<div>
										<span className="font-semibold">Molecular Weight:</span> 1419.55 Da
									</div>
									<div>
										<span className="font-semibold">Sequence:</span> Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val
									</div>
									<div>
										<span className="font-semibold">Storage:</span> -20°C
									</div>
								</div>
							</div>
						</div>

						<div className="flex space-x-4 mb-6">
							<button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
								<ShoppingCart className="h-5 w-5" />
								<span>Add to Cart</span>
							</button>
							<button className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
								Wishlist
							</button>
						</div>

						{/* Features */}
						<div className="grid grid-cols-3 gap-4">
							<div className="text-center">
								<div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
									<Shield className="h-6 w-6 text-blue-600" />
								</div>
								<p className="text-sm text-gray-600">Premium Quality</p>
							</div>
							<div className="text-center">
								<div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
									<Truck className="h-6 w-6 text-blue-600" />
								</div>
								<p className="text-sm text-gray-600">Fast Shipping</p>
							</div>
							<div className="text-center">
								<div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
									<Award className="h-6 w-6 text-blue-600" />
								</div>
								<p className="text-sm text-gray-600">Research Grade</p>
							</div>
						</div>
					</div>
				</div>

				{/* Research Disclaimer */}
				<div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
					<h3 className="text-lg font-semibold text-red-800 mb-2">
						⚠️ Research Purposes Only
					</h3>
					<p className="text-red-700">
						This product is sold for research purposes only. Not for human consumption, 
						diagnosis, treatment, cure, or prevention of any disease. By purchasing this product, 
						you certify that you are 18+ years of age and agree to use this product only for 
						legitimate research purposes in accordance with applicable laws and regulations.
					</p>
				</div>
			</div>
		</div>
	)
}
