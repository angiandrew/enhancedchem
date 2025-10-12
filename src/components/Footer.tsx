import Link from 'next/link'
import { Mail, Instagram } from 'lucide-react'

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Company Info */}
					<div className="col-span-1 md:col-span-2">
						<div className="text-2xl font-bold text-blue-400 mb-4">
							Enhanced Chem
						</div>
						<p className="text-gray-300 mb-4">
							Premium research peptides for scientific purposes only. 
							High-quality products with fast shipping and exceptional customer service.
						</p>
						<div className="flex space-x-4">
							<Link 
								href="https://www.instagram.com/enhancedchem/" 
								target="_blank" 
								rel="noopener noreferrer"
								className="flex items-center text-gray-300 hover:text-pink-400 transition-colors"
							>
								<Instagram className="h-4 w-4 mr-2" />
								<span>@enhancedchem</span>
							</Link>
							<div className="flex items-center text-gray-300">
								<Mail className="h-4 w-4 mr-2" />
								<span>info@enhancedchem.com</span>
							</div>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Quick Links</h3>
						<ul className="space-y-2">
							<li>
								<Link href="/products" className="text-gray-300 hover:text-blue-400 transition-colors">
									Products
								</Link>
							</li>
							<li>
								<Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">
									About Us
								</Link>
							</li>
							<li>
								<Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">
									Contact
								</Link>
							</li>
							<li>
								<Link href="/shipping" className="text-gray-300 hover:text-blue-400 transition-colors">
									Shipping Info
								</Link>
							</li>
						</ul>
					</div>

					{/* Legal */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Legal</h3>
						<ul className="space-y-2">
							<li>
								<Link href="/terms" className="text-gray-300 hover:text-blue-400 transition-colors">
									Terms of Service
								</Link>
							</li>
							<li>
								<Link href="/privacy" className="text-gray-300 hover:text-blue-400 transition-colors">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link href="/disclaimer" className="text-gray-300 hover:text-blue-400 transition-colors">
									Research Disclaimer
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Research Disclaimer */}
				<div className="border-t border-gray-700 mt-8 pt-8">
					<div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
						<h4 className="text-red-400 font-semibold mb-2">⚠️ Research Purposes Only</h4>
						<p className="text-gray-300 text-sm">
							All products are sold for research purposes only. Not for human consumption, 
							diagnosis, treatment, cure, or prevention of any disease. By purchasing our products, 
							you certify that you are 21+ years of age and agree to use these products only for 
							legitimate research purposes in accordance with applicable laws and regulations.
						</p>
					</div>
				</div>

				{/* Copyright */}
				<div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
					<p>&copy; 2024 Enhanced Chem. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)
}
