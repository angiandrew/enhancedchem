'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, User, ShoppingCart } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { totalItems } = useCart()

	return (
		<header className="bg-white shadow-lg sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-3 group hover:scale-105 transition-all duration-300">
						<div className="relative">
							<img 
								src="/transparent logo copy.png" 
								alt="Enhanced Chem Logo" 
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

					{/* Right side icons */}
					<div className="flex items-center space-x-4">
						<Link href="/account" className="text-gray-700 hover:text-blue-600 transition-colors">
							<User className="h-6 w-6" />
						</Link>
						<Link href="/checkout" className="relative text-gray-700 hover:text-blue-600 transition-colors">
							<ShoppingCart className="h-6 w-6" />
							{totalItems > 0 && (
								<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
									{totalItems}
								</span>
							)}
						</Link>
						
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
