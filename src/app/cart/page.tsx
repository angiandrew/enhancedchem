'use client'

import { useCart } from '@/contexts/CartContext'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
	const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart()

	if (items.length === 0) {
		return (
			<div className="min-h-screen bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="text-center">
						<ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-4" />
						<h1 className="text-3xl font-bold text-gray-900 mb-4">
							Your Cart is Empty
						</h1>
						<p className="text-lg text-gray-600 mb-8">
							Looks like you haven't added any items to your cart yet.
						</p>
						<Link 
							href="/products"
							className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
						>
							Continue Shopping
						</Link>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">
					Shopping Cart ({totalItems} items)
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Cart Items */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-lg shadow-sm">
							{items.map((item) => (
								<div key={item.id} className="p-6 border-b border-gray-200 last:border-b-0">
									<div className="flex items-center space-x-4">
										{/* Product Image */}
										<div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
											<span className="text-gray-500 text-sm">{item.name}</span>
										</div>

										{/* Product Info */}
										<div className="flex-1">
											<h3 className="text-lg font-semibold text-gray-900">
												{item.name}
											</h3>
											<p className="text-gray-600">
												${item.price.toFixed(2)} each
											</p>
										</div>

										{/* Quantity Controls */}
										<div className="flex items-center space-x-2">
											<button
												onClick={() => updateQuantity(item.id, item.quantity - 1)}
												className="p-1 rounded-full hover:bg-gray-100 transition-colors"
											>
												<Minus className="h-4 w-4" />
											</button>
											<span className="w-8 text-center font-semibold">
												{item.quantity}
											</span>
											<button
												onClick={() => updateQuantity(item.id, item.quantity + 1)}
												className="p-1 rounded-full hover:bg-gray-100 transition-colors"
											>
												<Plus className="h-4 w-4" />
											</button>
										</div>

										{/* Price */}
										<div className="text-right">
											<p className="text-lg font-semibold text-gray-900">
												${(item.price * item.quantity).toFixed(2)}
											</p>
										</div>

										{/* Remove Button */}
										<button
											onClick={() => removeItem(item.id)}
											className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
										>
											<Trash2 className="h-4 w-4" />
										</button>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Order Summary */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">
								Order Summary
							</h2>
							
							<div className="space-y-3 mb-6">
								<div className="flex justify-between">
									<span className="text-gray-600">Subtotal ({totalItems} items)</span>
									<span className="font-semibold">${totalPrice.toFixed(2)}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Shipping</span>
									<span className="font-semibold">$9.99</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Tax</span>
									<span className="font-semibold">${(totalPrice * 0.08).toFixed(2)}</span>
								</div>
								<div className="border-t pt-3">
									<div className="flex justify-between text-lg font-bold">
										<span>Total</span>
										<span>${(totalPrice + 9.99 + (totalPrice * 0.08)).toFixed(2)}</span>
									</div>
								</div>
							</div>

							<button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
								Proceed to Checkout
							</button>

							<Link 
								href="/products"
								className="block w-full text-center text-blue-600 hover:text-blue-700 transition-colors"
							>
								Continue Shopping
							</Link>
						</div>
					</div>
				</div>

				{/* Research Disclaimer */}
				<div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
					<h3 className="text-lg font-semibold text-red-800 mb-2">
						⚠️ Research Purposes Only
					</h3>
					<p className="text-red-700">
						All products in your cart are sold for research purposes only. Not for human consumption, 
						diagnosis, treatment, cure, or prevention of any disease. By proceeding with your purchase, 
						you certify that you are 18+ years of age and agree to use these products only for 
						legitimate research purposes in accordance with applicable laws and regulations.
					</p>
				</div>
			</div>
		</div>
	)
}
