'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { Minus, Plus, Trash2, ChevronDown, ChevronUp, Edit3, Check } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
	const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart()
	const [selectedInstitution, setSelectedInstitution] = useState('')
	const [ageVerified, setAgeVerified] = useState(false)
	const [researchPurposesVerified, setResearchPurposesVerified] = useState(false)
	const [isVerificationCollapsed, setIsVerificationCollapsed] = useState(false)

	const institutionOptions = [
		'University laboratory',
		'Independent research facility', 
		'Contract Research Organization (CRO)',
		'Biotech/Pharma R&D company',
		'Government or public research institute'
	]

	const canProceed = selectedInstitution && ageVerified && researchPurposesVerified
	const isVerificationComplete = selectedInstitution && ageVerified && researchPurposesVerified

	if (items.length === 0) {
		return (
			<div className="min-h-screen bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="text-center">
						<h1 className="text-3xl font-bold text-gray-900 mb-4">
							No Items to Checkout
						</h1>
						<p className="text-lg text-gray-600 mb-8">
							Your cart is empty. Please add items before proceeding to checkout.
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
					Checkout
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Checkout Form */}
					<div className="lg:col-span-2 space-y-8">
						{/* Institutional Verification */}
						<div className="bg-white rounded-lg shadow-sm p-6">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-semibold text-gray-900">
									Institutional Verification
								</h2>
								{isVerificationComplete && (
									<button
										onClick={() => setIsVerificationCollapsed(!isVerificationCollapsed)}
										className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
									>
										{isVerificationCollapsed ? (
											<>
												<ChevronDown className="h-4 w-4" />
												<span className="text-sm">Show Details</span>
											</>
										) : (
											<>
												<ChevronUp className="h-4 w-4" />
												<span className="text-sm">Hide Details</span>
											</>
										)}
									</button>
								)}
							</div>

							{isVerificationCollapsed ? (
								/* Collapsed Summary */
								<div className="bg-green-50 border border-green-200 rounded-lg p-4">
									<div className="flex items-center space-x-3">
										<Check className="h-5 w-5 text-green-600" />
										<div className="flex-1">
											<p className="text-sm font-medium text-green-800">Verification Complete</p>
											<p className="text-xs text-green-700">
												{selectedInstitution} • Age 18+ • Research Purposes Only
											</p>
										</div>
										<button
											onClick={() => setIsVerificationCollapsed(false)}
											className="text-blue-600 hover:text-blue-700 transition-colors"
										>
											<Edit3 className="h-4 w-4" />
										</button>
									</div>
								</div>
							) : (
								/* Full Form */
								<>
									<p className="text-gray-700 mb-6 leading-relaxed">
										To complete checkout, you must verify your institutional affiliation and agree that all purchases are strictly for in-vitro laboratory research purposes only. These products are not for human or animal use.
									</p>

									<div className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												I verify that I am affiliated with or purchasing on behalf of:
											</label>
											<select
												value={selectedInstitution}
												onChange={(e) => setSelectedInstitution(e.target.value)}
												className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
											>
												<option value="" className="text-gray-500">Select your institution type...</option>
												{institutionOptions.map((option, index) => (
													<option key={index} value={option} className="text-gray-900">
														{index + 1}. {option}
													</option>
												))}
											</select>
										</div>

										{/* Verification Checkboxes */}
										<div className="space-y-4 pt-4 border-t border-gray-200">
											<div className="flex items-start space-x-3">
												<input
													type="checkbox"
													id="ageVerification"
													checked={ageVerified}
													onChange={(e) => setAgeVerified(e.target.checked)}
													className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
												/>
												<label htmlFor="ageVerification" className="text-sm text-gray-700">
													I certify that I am 18+ years of age
												</label>
											</div>

											<div className="flex items-start space-x-3">
												<input
													type="checkbox"
													id="researchPurposes"
													checked={researchPurposesVerified}
													onChange={(e) => setResearchPurposesVerified(e.target.checked)}
													className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
												/>
												<label htmlFor="researchPurposes" className="text-sm text-gray-700">
													I agree that all purchases are strictly for in-vitro laboratory research purposes only. These products are not for human or animal use, diagnosis, treatment, cure, or prevention of any disease.
												</label>
											</div>
										</div>
									</div>
								</>
							)}
						</div>

						{/* Shipping Address */}
						<div className="bg-white rounded-lg shadow-sm p-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">
								Shipping Address
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="md:col-span-2">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Full Name
									</label>
									<input
										type="text"
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="Enter full name"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Address Line 1
									</label>
									<input
										type="text"
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="Street address"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Address Line 2 (Optional)
									</label>
									<input
										type="text"
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="Apartment, suite, etc."
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										City
									</label>
									<input
										type="text"
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="City"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										State/Province
									</label>
									<input
										type="text"
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="State"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										ZIP/Postal Code
									</label>
									<input
										type="text"
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="ZIP code"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Country
									</label>
									<select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
										<option value="">Select Country</option>
										<option value="US">United States</option>
										<option value="CA">Canada</option>
										<option value="UK">United Kingdom</option>
										<option value="AU">Australia</option>
									</select>
								</div>
							</div>
						</div>

						{/* Payment Method */}
						<div className="bg-white rounded-lg shadow-sm p-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">
								Payment Method
							</h2>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Card Number
									</label>
									<input
										type="text"
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="1234 5678 9012 3456"
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Expiry Date
										</label>
										<input
											type="text"
											className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											placeholder="MM/YY"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											CVV
										</label>
										<input
											type="text"
											className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											placeholder="123"
										/>
									</div>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Cardholder Name
									</label>
									<input
										type="text"
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="Name on card"
									/>
								</div>
								<div className="flex items-start space-x-3">
									<input
										type="checkbox"
										id="billingSameAsShipping"
										className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
									/>
									<label htmlFor="billingSameAsShipping" className="text-sm text-gray-700">
										Billing address is the same as shipping address
									</label>
								</div>
							</div>
						</div>

						{/* Order Items */}
						<div className="bg-white rounded-lg shadow-sm p-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">
								Order Items
							</h2>
							<div className="space-y-4">
								{items.map((item) => (
									<div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
										<div className="flex items-center space-x-4">
											<div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
												<span className="text-gray-500 text-xs">{item.name}</span>
											</div>
											<div>
												<h3 className="font-semibold text-gray-900">{item.name}</h3>
												<p className="text-gray-600">${item.price.toFixed(2)} each</p>
											</div>
										</div>
										<div className="flex items-center space-x-4">
											{/* Quantity Controls */}
											<div className="flex items-center space-x-2">
												<button
													onClick={() => updateQuantity(item.id, item.quantity - 1)}
													className="w-8 h-8 rounded-full border border-gray-300 bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 hover:border-gray-400 transition-colors"
												>
													<Minus className="h-4 w-4" />
												</button>
												<span className="w-8 text-center font-semibold text-gray-900">
													{item.quantity}
												</span>
												<button
													onClick={() => updateQuantity(item.id, item.quantity + 1)}
													className="w-8 h-8 rounded-full border border-gray-300 bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 hover:border-gray-400 transition-colors"
												>
													<Plus className="h-4 w-4" />
												</button>
											</div>
											{/* Remove Button */}
											<button
												onClick={() => removeItem(item.id)}
												className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
											>
												<Trash2 className="h-4 w-4" />
											</button>
											{/* Total Price */}
											<span className="font-bold text-gray-900 min-w-[80px] text-right">
												${(item.price * item.quantity).toFixed(2)}
											</span>
										</div>
									</div>
								))}
							</div>
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
									<span className="text-gray-800">Subtotal ({totalItems} items)</span>
									<span className="font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-800">Shipping</span>
									<span className="font-semibold text-gray-900">$9.99</span>
								</div>
							<div className="flex justify-between">
								<span className="text-gray-800">Tax</span>
								<span className="font-semibold text-gray-900">${(totalPrice * 0.07).toFixed(2)}</span>
							</div>
							<div className="border-t pt-3">
								<div className="flex justify-between text-lg font-bold">
									<span className="text-gray-900">Total</span>
									<span className="text-gray-900">${(totalPrice + 9.99 + (totalPrice * 0.07)).toFixed(2)}</span>
								</div>
							</div>
							</div>

							<button 
								disabled={!canProceed}
								className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors mb-4 ${
									canProceed 
										? 'bg-blue-600 text-white hover:bg-blue-700' 
										: 'bg-gray-300 text-gray-500 cursor-not-allowed'
								}`}
							>
								Complete Purchase
							</button>

							{!canProceed && (
								<p className="text-sm text-gray-500 text-center">
									Please complete all verification requirements to proceed
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Research Disclaimer */}
				<div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
					<h3 className="text-lg font-semibold text-red-800 mb-2">
						⚠️ Research Purposes Only
					</h3>
					<p className="text-red-700">
						All products are sold for research purposes only. Not for human consumption, 
						diagnosis, treatment, cure, or prevention of any disease. By proceeding with your purchase, 
						you certify that you are 18+ years of age and agree to use these products only for 
						legitimate research purposes in accordance with applicable laws and regulations.
					</p>
				</div>
			</div>
		</div>
	)
}
