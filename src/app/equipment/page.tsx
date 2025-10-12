'use client'

import { useState, useMemo } from 'react'
import ProductCard from '@/components/ProductCard'
import { Search } from 'lucide-react'

export default function EquipmentPage() {
	const [searchTerm, setSearchTerm] = useState('')
	const products = [
		{
			id: "luer-lock-syringe-1ml",
			name: "1mL Luer Lock Syringe - For Liquid Measurement and Transfer",
			description: "Precision 1mL syringe with Luer lock connection for accurate liquid measurement and sterile transfer applications.",
			price: 0.99,
			image: "/products/equipment/Lock-syringe.png",
			rating: 5,
			reviews: 127
		},
		{
			id: "lab-coat-white",
			name: "Professional Lab Coat - White",
			description: "High-quality white laboratory coat with long sleeves and button closure. Perfect for research environments.",
			price: 47.99,
			image: "/products/equipment/lab-coat.png",
			rating: 5,
			reviews: 42
		},
		{
			id: "laboratory-goggles",
			name: "Laboratory Safety Goggles",
			description: "Professional safety goggles with clear polycarbonate lenses and comfortable foam padding. Essential for eye protection in laboratory environments.",
			price: 14.99,
			image: "/products/equipment/lab goggles.png",
			rating: 5,
			reviews: 89
		},
		{
			id: "glass-flask-500ml",
			name: "Glass Erlenmeyer Flask - 1000mL",
			description: "Borosilicate glass Erlenmeyer flask with precise graduations. Ideal for mixing and heating solutions.",
			price: 20.99,
			image: "/products/equipment/Erlenmeyer Flask.png",
			rating: 5,
			reviews: 38
		},
		{
			id: "glass-beaker-250ml",
			name: "Glass Beaker - 250mL",
			description: "High-quality borosilicate glass beaker with spout and graduation marks. Perfect for laboratory measurements.",
			price: 14.99,
			image: "/products/equipment/Glass beaker.png",
			rating: 5,
			reviews: 56
		},
		{
			id: "measuring-cylinder-100ml",
			name: "Graduated Cylinder - 100mL",
			description: "Precision glass graduated cylinder with clear graduations for accurate volume measurements.",
			price: 25.99,
			image: "/products/equipment/Graduated Cylinder.png",
			rating: 5,
			reviews: 29
		},
		{
			id: "pipette-dropper-5ml",
			name: "Pasteur Pipette Dropper - 5mL",
			description: "Disposable plastic pipette with rubber bulb for precise liquid handling and transfer.",
			price: 9.99,
			image: "/products/equipment/pipette.png",
			rating: 5,
			reviews: 73
		},
		{
			id: "glass-test-tubes",
			name: "Glass Test Tubes - Set of 12",
			description: "Borosilicate glass test tubes with rimmed tops. Perfect for sample storage and reactions.",
			price: 30.99,
			image: "/products/equipment/glass test tubes-12.png",
			rating: 5,
			reviews: 31
		},
		{
			id: "lab-gloves-latex",
			name: "Disposable Latex Gloves - Box of 100",
			description: "Powder-free latex examination gloves. Provides excellent dexterity and protection.",
			price: 23.99,
			image: "/products/equipment/latex gloves-100pack.png",
			rating: 5,
			reviews: 67
		},
		{
			id: "lab-thermometer",
			name: "Laboratory Thermometer - Digital",
			description: "High-precision digital thermometer with probe for accurate temperature measurements.",
			price: 99.99,
			image: "/products/equipment/Digital thermometer.png",
			rating: 5,
			reviews: 23
		},
		{
			id: "bunsen-burner",
			name: "Bunsen Burner - Laboratory Grade",
			description: "Professional laboratory Bunsen burner with adjustable air intake and gas control. Perfect for heating and flame testing.",
			price: 49.99,
			image: "/products/equipment/bunsen-burner.png",
			rating: 5,
			reviews: 18
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
			product.description.toLowerCase().includes(searchLower)
		)
	}, [searchTerm, products])

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
							Laboratory Equipment
						</h1>
						<p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto">
							Professional-grade laboratory equipment and supplies for research applications
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
							Lab Equipment & Supplies
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
							Essential laboratory equipment for professional research environments
						</p>
					</div>
					
					{/* Search Bar */}
					<div className="relative max-w-md mx-auto lg:mx-0">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Search className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type="text"
							placeholder="Search equipment..."
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
							{filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''} found for &ldquo;{searchTerm}&rdquo;
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
						<h3 className="text-xl font-semibold text-gray-900 mb-2">No equipment found</h3>
						<p className="text-gray-600">Try adjusting your search terms or browse all equipment</p>
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
						⚠️ Research Equipment Only
					</h3>
					<p className="text-red-700">
						All equipment is sold for research purposes only. Not for human consumption, 
						diagnosis, treatment, cure, or prevention of any disease. By purchasing our equipment, 
						you certify that you are 21+ years of age and agree to use these items only for 
						legitimate research purposes in accordance with applicable laws and regulations.
					</p>
				</div>
			</div>
		</div>
	)
}
