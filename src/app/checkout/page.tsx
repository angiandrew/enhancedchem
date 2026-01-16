'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import { Minus, Plus, Trash2, ChevronDown, ChevronUp, Edit3, Check } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
	const { items, updateQuantity, removeItem, totalPrice, totalItems, clearCart } = useCart()
	const router = useRouter()

	// Helper function to format numbers with commas
	const formatPrice = (price: number) => {
		return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}
	const [selectedInstitution, setSelectedInstitution] = useState('')
	const [ageVerified, setAgeVerified] = useState(false)
	const [researchPurposesVerified, setResearchPurposesVerified] = useState(false)
	const [researchLimitationsVerified, setResearchLimitationsVerified] = useState(false)
	const [termsAccepted, setTermsAccepted] = useState(false)
	const [customerEmail, setCustomerEmail] = useState('')
	const [selectedAlternativeMethod, setSelectedAlternativeMethod] = useState('')
	const [cardNumber, setCardNumber] = useState('')
	const [expiryDate, setExpiryDate] = useState('')
	const [securityCode, setSecurityCode] = useState('')
	const [cardName, setCardName] = useState('')
	const [isVerificationCollapsed, setIsVerificationCollapsed] = useState(false)
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card')

	const institutionOptions = [
		'University laboratory',
		'Independent research facility', 
		'Contract Research Organization (CRO)',
		'Biotech/Pharma R&D company',
		'Government or public research institute'
	]

	const isAlternativePayment = selectedPaymentMethod === 'alternative'
	const isCreditCardComplete = selectedPaymentMethod === 'credit-card' && cardNumber.trim() !== '' && expiryDate.trim() !== '' && securityCode.trim() !== '' && cardName.trim() !== ''
	const isBankTransferComplete = selectedPaymentMethod === 'bank-transfer'
	const isAlternativeComplete = isAlternativePayment && customerEmail.trim() !== '' && selectedAlternativeMethod !== ''
	
	const canProceed = selectedInstitution && ageVerified && researchPurposesVerified && researchLimitationsVerified && termsAccepted && (isCreditCardComplete || isBankTransferComplete || isAlternativeComplete)
	const isVerificationComplete = selectedInstitution && ageVerified && researchPurposesVerified && researchLimitationsVerified && termsAccepted
	
	// Auto-collapse verification when completed (only once)
	useEffect(() => {
		if (isVerificationComplete && !isVerificationCollapsed) {
			const timer = setTimeout(() => {
				setIsVerificationCollapsed(true)
			}, 500)
			return () => clearTimeout(timer)
		}
	}, [isVerificationComplete, isVerificationCollapsed]) // Include all dependencies

	const handleCompletePurchase = async () => {
		if (!canProceed) return

		// Here you would typically:
		// 1. Process the payment (if credit card/bank transfer)
		// 2. Send email with payment instructions (if alternative payment)
		// 3. Create order record in database
		// 4. Clear cart
		// 5. Redirect to success page

		// For now, we'll simulate the process
		try {
			if (isAlternativePayment) {
				// Send email with payment instructions IMMEDIATELY
				const response = await fetch('/api/send-payment-email', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: customerEmail,
						paymentMethod: selectedAlternativeMethod,
						orderTotal: totalPrice + 9.99 + (totalPrice * 0.07),
						items: items.map(item => ({
							name: item.name,
							quantity: item.quantity,
							price: item.price
						}))
					}),
				})

				const result = await response.json()

				if (!response.ok) {
					throw new Error(result.error || 'Failed to send payment email')
				}

				// Pass order number and payment method info to success page
				router.push(`/checkout/success?method=${selectedAlternativeMethod}&email=${encodeURIComponent(customerEmail)}&orderNumber=${encodeURIComponent(result.orderNumber)}`)
			} else {
				// Clear the cart
				clearCart()
				
				// Redirect to success page
				router.push('/checkout/success')
			}
		} catch (error) {
			console.error('Order processing failed:', error)
			alert('There was an error processing your order. Please try again or contact support.')
			// Handle error (show toast, etc.)
		}
	}

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

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
					{/* Checkout Form */}
					<div className="lg:col-span-2">
						{/* Institutional Verification */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
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

                        <div>
								{isVerificationCollapsed ? (
									/* Collapsed Summary */
									<div className="bg-green-50 border border-green-200 rounded-lg p-4">
										<div className="flex items-center space-x-3">
											<Check className="h-5 w-5 text-green-600" />
											<div className="flex-1">
												<p className="text-sm font-medium text-green-800">Verification Complete</p>
											<p className="text-xs text-green-700">
												{selectedInstitution} • Age 21+ • Research Purposes Only • Not for Human/Animal Use
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
															{option}
														</option>
													))}
												</select>
											</div>

											{/* Verification Checkboxes */}
											<div className="space-y-4 pt-4 pl-2 border-t border-gray-200">
												<div className="flex items-start space-x-3">
													<input
														type="checkbox"
														id="ageVerification"
														checked={ageVerified}
														onChange={(e) => setAgeVerified(e.target.checked)}
														className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-2 border-gray-400 rounded"
													/>
													<label htmlFor="ageVerification" className="text-sm text-gray-700">
														I certify that I am 21+ years of age
													</label>
												</div>

												<div className="flex items-start space-x-3">
													<input
														type="checkbox"
														id="researchPurposes"
														checked={researchPurposesVerified}
														onChange={(e) => setResearchPurposesVerified(e.target.checked)}
														className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-2 border-gray-400 rounded"
													/>
													<label htmlFor="researchPurposes" className="text-sm text-gray-700">
														I agree that all purchases are strictly for in-vitro laboratory research purposes only.
													</label>
												</div>

												<div className="flex items-start space-x-3">
													<input
														type="checkbox"
														id="researchLimitations"
														checked={researchLimitationsVerified}
														onChange={(e) => setResearchLimitationsVerified(e.target.checked)}
														className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-2 border-gray-400 rounded"
													/>
													<label htmlFor="researchLimitations" className="text-sm text-gray-700">
														These products are not for human or animal use, diagnosis, treatment, cure, or prevention of any disease.
													</label>
												</div>

												<div className="flex items-start space-x-3">
													<input
														type="checkbox"
														id="termsAccepted"
														checked={termsAccepted}
														onChange={(e) => setTermsAccepted(e.target.checked)}
														className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-2 border-gray-400 rounded"
													/>
													<label htmlFor="termsAccepted" className="text-sm text-gray-700">
														I have read and agree to the{' '}
														<Link href="/terms" className="text-blue-600 hover:text-blue-700 underline">
															Terms of Service
														</Link>
														{' '}and{' '}
														<Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
															Privacy Policy
														</Link>
													</label>
												</div>
											</div>
										</div>
									</>
								)}
							</div>
						</div>

						{/* Order Items */}
						<div className="bg-white rounded-lg shadow-sm p-6 mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">
								Order Items
							</h2>
							<div className="space-y-4">
								{items.map((item) => (
									<div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
										<div className="flex items-center space-x-4">
                                            <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center border border-gray-200 overflow-hidden">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={80}
                                                    height={80}
                                                    className="object-contain rounded-lg max-w-full max-h-full"
                                                />
                                            </div>
											<div>
												<h3 className="font-semibold text-gray-900">{item.name}</h3>
												<p className="text-gray-600">${formatPrice(item.price)} each</p>
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
												${formatPrice(item.price * item.quantity)}
											</span>
										</div>
									</div>
								))}
							</div>
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
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600"
										placeholder="Enter full name"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Address Line 1
									</label>
									<input
										type="text"
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600"
										placeholder="Street address"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Address Line 2 (Optional)
									</label>
									<input
										type="text"
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600"
										placeholder="Apartment, suite, etc."
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										City
									</label>
									<input
										type="text"
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600"
										placeholder="City"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										State/Province
									</label>
									<input
										type="text"
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600"
										placeholder="State"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										ZIP/Postal Code
									</label>
									<input
										type="text"
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600"
										placeholder="ZIP code"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Country
									</label>
									<select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
										<option value="" className="text-gray-600">Select Country</option>
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
								Payment
							</h2>
							<p className="text-sm text-gray-600 mb-6">All transactions are secure and encrypted.</p>
							
							<div className="space-y-4">
								{/* Credit Card */}
								<div className="border border-gray-200 rounded-lg">
									<label className="flex items-center p-4 cursor-pointer hover:bg-gray-50">
										<input
											type="radio"
											name="paymentMethod"
											value="credit-card"
											checked={selectedPaymentMethod === 'credit-card'}
											onChange={(e) => setSelectedPaymentMethod(e.target.value)}
											className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
										/>
										<div className="ml-3 flex items-center space-x-3">
											<span className="text-gray-900 font-medium">Credit card</span>
											<div className="flex space-x-2">
												{/* Visa Logo */}
												<div className="w-8 h-5 bg-white border border-gray-300 rounded flex items-center justify-center">
													<Image
														src="/logos/visa logo.png"
														alt="Visa"
														width={32}
														height={20}
														className="object-contain"
													/>
												</div>
												{/* Mastercard Logo */}
												<div className="w-8 h-5 bg-white border border-gray-300 rounded flex items-center justify-center">
													<Image
														src="/logos/mastercard logo.png"
														alt="Mastercard"
														width={32}
														height={20}
														className="object-contain"
													/>
												</div>
											</div>
										</div>
									</label>
									{selectedPaymentMethod === 'credit-card' && (
										<div className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
											<div className="pt-4 space-y-4">
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">
														Card number
													</label>
													<div className="relative">
														<input
															type="text"
															value={cardNumber}
															onChange={(e) => setCardNumber(e.target.value)}
															className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600"
															placeholder="1234 5678 9012 3456"
															autoComplete="cc-number"
														/>
														<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
															<div className="w-4 h-4 bg-gray-400 rounded"></div>
														</div>
													</div>
												</div>
												<div className="grid grid-cols-2 gap-4">
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Expiration date (MM / YY)
														</label>
														<input
															type="text"
															value={expiryDate}
															onChange={(e) => setExpiryDate(e.target.value)}
															className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600"
															placeholder="MM / YY"
															autoComplete="cc-exp"
														/>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Security code
														</label>
														<div className="relative">
														<input
															type="text"
															value={securityCode}
															onChange={(e) => setSecurityCode(e.target.value)}
															className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600"
															placeholder="123"
															autoComplete="cc-csc"
														/>
															<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
																<div className="w-4 h-4 bg-gray-400 rounded-full text-white text-xs flex items-center justify-center">?</div>
															</div>
														</div>
													</div>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">
														Name on card
													</label>
													<input
														type="text"
														value={cardName}
														onChange={(e) => setCardName(e.target.value)}
														className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600"
														placeholder="Name on card"
														autoComplete="cc-name"
													/>
												</div>
												<div className="flex items-start space-x-3">
													<input
														type="checkbox"
														id="billingSameAsShipping"
														className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
													/>
													<label htmlFor="billingSameAsShipping" className="text-sm text-gray-700">
														Use shipping address as billing address
													</label>
												</div>
											</div>
										</div>
									)}
								</div>

								{/* Alternative Payments */}
								<div className="border border-gray-200 rounded-lg">
									<label className="flex items-center p-4 cursor-pointer hover:bg-gray-50">
										<input
											type="radio"
											name="paymentMethod"
											value="alternative"
											checked={selectedPaymentMethod === 'alternative'}
											onChange={(e) => setSelectedPaymentMethod(e.target.value)}
											className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
										/>
										<div className="ml-3 flex items-center space-x-3">
											<span className="text-gray-900 font-medium">Alternative Payments</span>
											<div className="flex space-x-2">
												{/* Zelle Logo */}
												<div className="w-6 h-6 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">Z</div>
												{/* Bitcoin Logo */}
												<div className="w-6 h-6 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">₿</div>
												{/* Venmo Logo */}
												<div className="w-6 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">V</div>
											</div>
										</div>
									</label>
									{selectedPaymentMethod === 'alternative' && (
										<div className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
											<div className="pt-4 space-y-4">
												{/* Email Input */}
												<div className="bg-white border border-gray-300 rounded-lg p-4">
													<label className="block text-sm font-medium text-gray-700 mb-2">
														Your Email Address *
													</label>
													<input
														type="email"
														value={customerEmail}
														onChange={(e) => setCustomerEmail(e.target.value)}
														className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600 text-gray-900"
														placeholder="Enter your email address"
														required
													/>
													<p className="text-xs text-gray-500 mt-1">
														We&apos;ll send payment instructions to this email address
													</p>
												</div>
												{/* Zelle */}
												<div 
													onClick={() => setSelectedAlternativeMethod('zelle')}
													className={`border rounded-lg p-4 cursor-pointer transition-all ${
														selectedAlternativeMethod === 'zelle' 
															? 'border-purple-500 bg-purple-50' 
															: 'border-gray-300 hover:border-purple-300 hover:bg-purple-25'
													}`}
												>
													<div className="flex items-center space-x-3 mb-3">
														{/* Radio Button */}
														<div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
															{selectedAlternativeMethod === 'zelle' && (
																<div className="w-3 h-3 bg-purple-600 rounded-full"></div>
															)}
														</div>
														{/* Zelle Icon */}
														<div className="w-6 h-6 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">Z</div>
														<span className="font-medium text-gray-900">Zelle</span>
														<span className="text-xs text-gray-500">Instant transfer</span>
													</div>
													<div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
														<p className="text-sm text-purple-800">
															Send payment to enhancedchem@email.com via Zelle. Include your order number in the memo.
														</p>
													</div>
												</div>

												{/* Bitcoin */}
												<div 
													onClick={() => setSelectedAlternativeMethod('bitcoin')}
													className={`border rounded-lg p-4 cursor-pointer transition-all ${
														selectedAlternativeMethod === 'bitcoin' 
															? 'border-orange-500 bg-orange-50' 
															: 'border-gray-300 hover:border-orange-300 hover:bg-orange-25'
													}`}
												>
													<div className="flex items-center space-x-3 mb-3">
														{/* Radio Button */}
														<div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
															{selectedAlternativeMethod === 'bitcoin' && (
																<div className="w-3 h-3 bg-orange-600 rounded-full"></div>
															)}
														</div>
														{/* Bitcoin Icon */}
														<div className="w-6 h-6 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">₿</div>
														<span className="font-medium text-gray-900">Bitcoin</span>
														<span className="text-xs text-gray-500">Cryptocurrency</span>
													</div>
													<div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3">
														<p className="text-sm text-orange-800">
															Send Bitcoin to the address below. Payment will be confirmed once we receive 3 confirmations on the blockchain.
														</p>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Bitcoin Address
														</label>
														<input
															type="text"
															className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-sm text-gray-900 font-mono"
															value="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
															readOnly
														/>
													</div>
												</div>

												{/* Venmo */}
												<div 
													onClick={() => setSelectedAlternativeMethod('venmo')}
													className={`border rounded-lg p-4 cursor-pointer transition-all ${
														selectedAlternativeMethod === 'venmo' 
															? 'border-blue-500 bg-blue-50' 
															: 'border-gray-300 hover:border-blue-300 hover:bg-blue-25'
													}`}
												>
													<div className="flex items-center space-x-3 mb-3">
														{/* Radio Button */}
														<div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
															{selectedAlternativeMethod === 'venmo' && (
																<div className="w-3 h-3 bg-blue-600 rounded-full"></div>
															)}
														</div>
														{/* Venmo Icon */}
														<div className="w-6 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">V</div>
														<span className="font-medium text-gray-900">Venmo</span>
														<span className="text-xs text-gray-500">Mobile payment</span>
													</div>
													<div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
														<p className="text-sm text-blue-800">
															Send payment to @EnhancedChem on Venmo. Please include your order number in the payment note.
														</p>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Venmo Username
														</label>
														<input
															type="text"
															className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-sm text-gray-900"
															value="@EnhancedChem"
															readOnly
														/>
													</div>
												</div>
											</div>
										</div>
									)}
								</div>


								{/* Bank Transfer */}
								<div className="border border-gray-200 rounded-lg">
									<label className="flex items-center p-4 cursor-pointer hover:bg-gray-50">
										<input
											type="radio"
											name="paymentMethod"
											value="bank-transfer"
											checked={selectedPaymentMethod === 'bank-transfer'}
											onChange={(e) => setSelectedPaymentMethod(e.target.value)}
											className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
										/>
										<span className="ml-3 text-gray-900 font-medium">Bank Transfer via Plaid</span>
									</label>
									{selectedPaymentMethod === 'bank-transfer' && (
										<div className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
											<div className="pt-4 space-y-4">
												<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
													<p className="text-sm text-blue-800">
														Securely connect your bank account through Plaid for instant verification and payment.
													</p>
												</div>
												<button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
													Connect Bank Account
												</button>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>

					</div>

					{/* Order Summary */}
					<div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
							<div>
								<h2 className="text-xl font-semibold text-gray-900 mb-4">
									Order Summary
								</h2>
								
								<div className="space-y-3 mb-6">
									<div className="flex justify-between">
										<span className="text-gray-800">Subtotal ({totalItems} items)</span>
										<span className="font-semibold text-gray-900">${formatPrice(totalPrice)}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-800">Shipping</span>
										<span className="font-semibold text-gray-900">$9.99</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-800">Tax</span>
										<span className="font-semibold text-gray-900">${formatPrice(totalPrice * 0.07)}</span>
									</div>
									<div className="border-t pt-3">
										<div className="flex justify-between text-lg font-bold">
											<span className="text-gray-900">Total</span>
											<span className="text-gray-900">${formatPrice(totalPrice + 9.99 + (totalPrice * 0.07))}</span>
										</div>
									</div>
								</div>
							</div>

                        <div className="mt-6">
							<button 
								onClick={handleCompletePurchase}
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
				</div>

				{/* Research Disclaimer */}
				<div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
					<h3 className="text-lg font-semibold text-red-800 mb-2">
						⚠️ Research Purposes Only
					</h3>
					<p className="text-red-700">
						All products are sold for research purposes only. Not for human consumption, 
						diagnosis, treatment, cure, or prevention of any disease. By proceeding with your purchase, 
						you certify that you are 21+ years of age and agree to use these products only for 
						legitimate research purposes in accordance with applicable laws and regulations.
					</p>
				</div>
			</div>
		</div>
	)
}
