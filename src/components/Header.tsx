'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Menu, X, ShoppingCart, Search, Check } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const { totalItems, lastAddedItem, clearLastAddedItem } = useCart()
	const router = useRouter()

	// Watch for new items added to cart
	useEffect(() => {
		if (lastAddedItem) {
			const timer = setTimeout(() => {
				clearLastAddedItem()
			}, 3000) // 3 seconds
			
			return () => clearTimeout(timer)
		}
	}, [lastAddedItem, clearLastAddedItem])

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault()
		if (searchTerm.trim()) {
			router.push(`/products?search=${encodeURIComponent(searchTerm)}`)
		} else {
			router.push('/products')
		}
	}

	return (
		<header className="bg-white shadow-lg sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-3 group hover:scale-105 transition-all duration-300">
						<div className="relative">
							<Image 
								src="/transparent logo copy.png" 
								alt="Enhanced Chem Logo" 
								width={40}
								height={40}
								className="h-10 w-10 object-contain filter drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300"
							/>
							<div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300"></div>
						</div>
						<div className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
							Enhanced Chem
						</div>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex space-x-8">
						<Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
							Home
						</Link>
						<Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
							Products
						</Link>
						<Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
							About
						</Link>
					</nav>

					{/* Right side - Search and icons */}
					<div className="flex items-center space-x-4">
						{/* Search Bar - Desktop */}
						<form onSubmit={handleSearch} className="hidden lg:block">
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Search className="h-4 w-4 text-gray-400" />
								</div>
								<input
									type="text"
									placeholder="Search products..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm leading-5 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
								/>
							</div>
						</form>

						<div className="relative">
							<Link href="/checkout" className="relative text-gray-700 hover:text-blue-600 transition-colors">
								<ShoppingCart className="h-6 w-6" />
								{totalItems > 0 && (
									<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
										{totalItems}
									</span>
								)}
							</Link>

							{/* Cart Notification Popup */}
							{lastAddedItem && (
								<div className="absolute top-12 right-0 bg-white border-2 border-green-500 rounded-xl shadow-2xl p-4 w-80 animate-slide-in z-50">
									<div className="flex items-start space-x-3">
										<div className="flex-shrink-0 bg-green-500 rounded-full p-1">
											<Check className="h-4 w-4 text-white" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-semibold text-gray-900 mb-2">Added to cart!</p>
											<div className="flex items-center space-x-3">
												<div className="relative w-16 h-16 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
													<Image
														src={lastAddedItem.image}
														alt={lastAddedItem.name}
														fill
														className="object-contain"
													/>
												</div>
												<div className="flex-1 min-w-0">
													<p className="text-sm text-gray-900 font-medium truncate">{lastAddedItem.name}</p>
													<p className="text-sm text-blue-600 font-bold">${lastAddedItem.price.toFixed(2)}</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
						
						{/* Mobile menu button */}
						<button
							className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className="md:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
							<Link href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
								Home
							</Link>
							<Link href="/products" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
								Products
							</Link>
							<Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
								About
							</Link>
						</div>
					</div>
				)}
			</div>
		</header>
	)
}
