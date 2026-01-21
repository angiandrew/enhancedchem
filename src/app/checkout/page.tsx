'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import { Minus, Plus, Trash2, ChevronDown, ChevronUp, Edit3, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import AddressAutocomplete from '@/components/AddressAutocomplete'


export default function CheckoutPage() {
	const { items, updateQuantity, removeItem, totalPrice, totalItems, clearCart } = useCart()

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
	const [isVerificationCollapsed, setIsVerificationCollapsed] = useState(false)
	const [orderCompleted, setOrderCompleted] = useState(false)
	const [orderNumber, setOrderNumber] = useState('')
	const [orderTotal, setOrderTotal] = useState(0)
	const [selectedPaymentMethodName, setSelectedPaymentMethodName] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	
	// Shipping Address State
	const [fullName, setFullName] = useState('')
	const [addressLine1, setAddressLine1] = useState('')
	const [addressLine2, setAddressLine2] = useState('')
	const [city, setCity] = useState('')
	const [state, setState] = useState('')
	const [zipCode, setZipCode] = useState('')

	const institutionOptions = [
		'University laboratory',
		'Independent research facility', 
		'Contract Research Organization (CRO)',
		'Biotech/Pharma R&D company',
		'Government or public research institute'
	]

	// Email validation function
	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email.trim())
	}

	const isEmailValid = isValidEmail(customerEmail)
	const isAlternativeComplete = isEmailValid && selectedAlternativeMethod !== ''
	const isVerificationComplete = selectedInstitution && ageVerified && researchPurposesVerified && researchLimitationsVerified && termsAccepted
	const isAddressComplete = fullName.trim() !== '' && addressLine1.trim() !== '' && city.trim() !== '' && state.trim() !== '' && zipCode.trim() !== ''
	const canProceed = isVerificationComplete && isAlternativeComplete && isAddressComplete
	
	// Auto-collapse verification when completed (only once)
	useEffect(() => {
		if (isVerificationComplete && !isVerificationCollapsed) {
			const timer = setTimeout(() => {
				setIsVerificationCollapsed(true)
			}, 500)
			return () => clearTimeout(timer)
		}
	}, [isVerificationComplete, isVerificationCollapsed])

	const handleCompletePurchase = async () => {
		if (!canProceed || isSubmitting) {
			return
		}

		// Prevent multiple submissions
		setIsSubmitting(true)

		// Calculate and save order total before clearing cart
		const finalTotal = totalPrice + 9.99 + (totalPrice * 0.07)
		const paymentMethodName = selectedAlternativeMethod === 'zelle' ? 'Zelle' : selectedAlternativeMethod === 'bitcoin' ? 'Bitcoin' : 'Venmo'
		
		// Show success page immediately (order number will be set from API response)
		setOrderTotal(finalTotal)
		setSelectedPaymentMethodName(paymentMethodName)
		setOrderCompleted(true)
		clearCart()

		try {
			// Send email with payment instructions and get real order number
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
					})),
					shippingAddress: {
						fullName: fullName.trim(),
						addressLine1: addressLine1.trim(),
						addressLine2: addressLine2.trim() || undefined,
						city: city.trim(),
						state: state.trim(),
						zipCode: zipCode.trim(),
						country: 'United States'
					}
				}),
			})

				let result
			try {
				result = await response.json()
			} catch (jsonError) {
				console.error('Failed to parse API response:', jsonError)
				// Order already completed, just log the error
				return
			}

			console.log('API Response:', result)
			// Set order number from API response (always use the real order number)
			if (result.orderNumber) {
				setOrderNumber(result.orderNumber)
			}
		} catch (error) {
			console.error('Order processing failed:', error)
			// Order already completed, just log the error
			// Don't show alert since user already sees success page
		} finally {
			setIsSubmitting(false)
		}
	}

	// Show empty cart page only if order is NOT completed AND cart is empty
	if (items.length === 0 && !orderCompleted) {
		return (
			<div className="min-h-screen bg-background">
				<Header />
				<main className="pt-24 pb-16">
					<div className="container mx-auto px-6">
						<div className="text-center max-w-2xl mx-auto">
							<h1 className="font-serif text-3xl md:text-4xl font-medium mb-4">
								No Items to Checkout
							</h1>
							<p className="text-muted-foreground text-lg mb-8">
								Your cart is empty. Please add items before proceeding to checkout.
							</p>
							<Link href="/products">
								<Button variant="elegant" size="lg">
									Continue Shopping
								</Button>
							</Link>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="pt-20 sm:pt-24 pb-8 sm:pb-16">
				<div className="container mx-auto px-4 sm:px-6">
					{orderCompleted ? (
						// Full Page Success Message
						<div className="max-w-4xl mx-auto">
							<div className="text-center mb-12">
								<div className="flex justify-center mb-6">
									<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
										<CheckCircle className="w-12 h-12 text-green-600" />
									</div>
								</div>
								
								<h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-green-900 px-2">
									Order Submitted Successfully!
								</h1>
								
								{orderNumber && (
									<div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 shadow-md max-w-md mx-auto">
										<p className="text-xs sm:text-sm text-green-800 mb-2 font-medium">Your Order Number:</p>
										<p className="text-xl sm:text-2xl font-bold text-green-950 break-all">{orderNumber}</p>
									</div>
								)}
								
								<div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 shadow-md">
									<h2 className="font-serif text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-blue-900">
										Next Steps
									</h2>
									<p className="text-sm sm:text-base lg:text-lg text-blue-800 mb-4 sm:mb-6 leading-relaxed">
										Thank you for your order! We&apos;ve sent payment instructions to <strong className="break-all">{customerEmail}</strong>. 
										Please check your email (including spam folder) for detailed instructions on how to complete your payment.
									</p>
									<div className="bg-white border border-blue-300 rounded-lg p-4 sm:p-6 text-left">
										<h3 className="font-semibold text-sm sm:text-base text-blue-900 mb-2 sm:mb-3">What to expect in your email:</h3>
										<ul className="space-y-2 text-xs sm:text-sm text-blue-800">
											<li className="flex items-start gap-2">
												<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" />
												<span>Your order number: <strong className="break-all">{orderNumber}</strong></span>
											</li>
											<li className="flex items-start gap-2">
												<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" />
												<span>Payment instructions for <strong>{selectedPaymentMethodName}</strong></span>
											</li>
											<li className="flex items-start gap-2">
												<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" />
												<span>Total amount due: <strong>${formatPrice(orderTotal)}</strong></span>
											</li>
											<li className="flex items-start gap-2">
												<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" />
												<span>Shipping address confirmation</span>
											</li>
										</ul>
									</div>
								</div>
								
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<Link href="/products">
										<Button variant="elegant" size="lg" className="w-full sm:w-auto">
											Continue Shopping
										</Button>
									</Link>
									<Link href="/contact">
										<Button variant="outline" size="lg" className="w-full sm:w-auto">
											Contact Support
										</Button>
									</Link>
								</div>
							</div>
						</div>
					) : (
						<>
							{/* Page Header */}
							<div className="text-center mb-8 sm:mb-12">
								<span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 sm:mb-4 block font-sans">
									Checkout
								</span>
								<h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 sm:mb-4">
									Complete Your Order
								</h1>
								<p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-2">
									Please complete all required steps to finalize your purchase.
								</p>
							</div>

							<div className="grid lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
						{/* Main Checkout Form */}
						<div className="lg:col-span-2 space-y-6 sm:space-y-8">
							{/* Institutional Verification Notice */}
							{!isVerificationComplete && (
								<div className="bg-amber-100 border-2 border-amber-500 rounded-lg p-4 sm:p-6 shadow-md">
									<div className="flex items-start gap-3 sm:gap-4">
										<AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 shrink-0 mt-0.5" />
										<div className="min-w-0 flex-1">
											<h3 className="font-serif text-base sm:text-lg font-semibold mb-2 text-amber-950">
												Institutional Verification Required
											</h3>
											<p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
												You must complete institutional verification before proceeding with your order. 
												Please verify your affiliation and agree to all terms below.
											</p>
										</div>
									</div>
								</div>
							)}

							{/* Institutional Verification */}
							<div className={`rounded-lg border-2 shadow-[var(--shadow-elevated)] p-4 sm:p-6 md:p-8 transition-all ${
								isVerificationComplete 
									? 'bg-green-100 border-green-500 shadow-green-200/50' 
									: 'bg-card border-border'
							}`}>
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
									<h2 className={`font-serif text-xl sm:text-2xl font-semibold ${
										isVerificationComplete ? 'text-green-900' : ''
									}`}>
										Institutional Verification
									</h2>
									{isVerificationComplete && (
										<button
											onClick={() => setIsVerificationCollapsed(!isVerificationCollapsed)}
											className="flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors text-xs sm:text-sm font-medium self-start sm:self-auto"
										>
											{isVerificationCollapsed ? (
												<>
													<ChevronDown className="h-4 w-4" />
													<span>Show Details</span>
												</>
											) : (
												<>
													<ChevronUp className="h-4 w-4" />
													<span>Hide Details</span>
												</>
											)}
										</button>
									)}
								</div>

								{isVerificationCollapsed ? (
									<div className="bg-green-200 border-2 border-green-600 rounded-lg p-3 sm:p-4 shadow-md">
										<div className="flex items-start gap-2 sm:gap-3">
											<CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-700 shrink-0 mt-0.5" />
											<div className="flex-1 min-w-0">
												<p className="text-xs sm:text-sm font-bold text-green-950">Verification Complete</p>
												<p className="text-[10px] sm:text-xs text-green-900 mt-1 font-medium break-words">
													{selectedInstitution} • Age 21+ • Research Purposes Only • Not for Human/Animal Use
												</p>
											</div>
											<button
												onClick={() => setIsVerificationCollapsed(false)}
												className="text-green-800 hover:text-green-900 transition-colors shrink-0"
											>
												<Edit3 className="h-4 w-4" />
											</button>
										</div>
									</div>
								) : (
									<div className="space-y-4 sm:space-y-6">
										<p className="text-muted-foreground leading-relaxed">
											To complete checkout, you must verify your institutional affiliation and agree that all purchases are strictly for in-vitro laboratory research purposes only. These products are not for human or animal use.
										</p>

										<div>
											<label className="block text-sm font-medium mb-2">
												I verify that I am affiliated with or purchasing on behalf of:
											</label>
											<select
												value={selectedInstitution}
												onChange={(e) => setSelectedInstitution(e.target.value)}
												className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
											>
												<option value="">Select your institution type...</option>
												{institutionOptions.map((option, index) => (
													<option key={index} value={option}>
														{option}
													</option>
												))}
											</select>
										</div>

										<div className="space-y-4 pt-4 border-t border-border">
											<div className="flex items-start gap-3">
												<Checkbox
													id="ageVerification"
													checked={ageVerified}
													onCheckedChange={(checked) => setAgeVerified(checked === true)}
													className="mt-0.5"
												/>
												<label htmlFor="ageVerification" className="text-sm leading-relaxed cursor-pointer flex-1">
													I certify that I am 21+ years of age
												</label>
											</div>

											<div className="flex items-start gap-3">
												<Checkbox
													id="researchPurposes"
													checked={researchPurposesVerified}
													onCheckedChange={(checked) => setResearchPurposesVerified(checked === true)}
													className="mt-0.5"
												/>
												<label htmlFor="researchPurposes" className="text-sm leading-relaxed cursor-pointer flex-1">
													I agree that all purchases are strictly for in-vitro laboratory research purposes only.
												</label>
											</div>

											<div className="flex items-start gap-3">
												<Checkbox
													id="researchLimitations"
													checked={researchLimitationsVerified}
													onCheckedChange={(checked) => setResearchLimitationsVerified(checked === true)}
													className="mt-0.5"
												/>
												<label htmlFor="researchLimitations" className="text-sm leading-relaxed cursor-pointer flex-1">
													These products are not for human or animal use, diagnosis, treatment, cure, or prevention of any disease.
												</label>
											</div>

											<div className="flex items-start gap-3">
												<Checkbox
													id="termsAccepted"
													checked={termsAccepted}
													onCheckedChange={(checked) => setTermsAccepted(checked === true)}
													className="mt-0.5"
												/>
												<label htmlFor="termsAccepted" className="text-sm leading-relaxed cursor-pointer flex-1">
													I have read and agree to the{' '}
													<Link href="/terms" className="text-primary underline hover:text-primary/80">
														Terms of Service
													</Link>
													{' '}and{' '}
													<Link href="/privacy" className="text-primary underline hover:text-primary/80">
														Privacy Policy
													</Link>
												</label>
											</div>
										</div>
									</div>
								)}
							</div>

							{/* Order Items */}
							<div className="bg-card rounded-lg border-2 border-border shadow-[var(--shadow-elevated)] p-4 sm:p-6 md:p-8">
								<h2 className="font-serif text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
									Order Items
								</h2>
								<div className="space-y-3 sm:space-y-4">
									{items.map((item) => (
										<div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-border bg-secondary/50 rounded-lg hover:border-primary hover:shadow-md transition-all">
											<div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
												<div className="w-16 h-16 sm:w-20 sm:h-20 bg-secondary/30 rounded-lg flex items-center justify-center border border-border overflow-hidden shrink-0">
													<Image
														src={item.image}
														alt={item.name}
														width={80}
														height={80}
														className="object-contain rounded-lg max-w-full max-h-full p-1 sm:p-2"
													/>
												</div>
												<div className="flex-1 min-w-0">
													<h3 className="font-medium text-sm sm:text-base truncate">{item.name}</h3>
													<p className="text-xs sm:text-sm text-muted-foreground">${formatPrice(item.price)} each</p>
												</div>
											</div>
											<div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
												<div className="flex items-center gap-2">
													<button
														onClick={() => updateQuantity(item.id, item.quantity - 1)}
														className="w-8 h-8 rounded-full border border-border bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
													>
														<Minus className="h-4 w-4" />
													</button>
													<span className="w-8 text-center font-medium text-sm sm:text-base">
														{item.quantity}
													</span>
													<button
														onClick={() => updateQuantity(item.id, item.quantity + 1)}
														className="w-8 h-8 rounded-full border border-border bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
													>
														<Plus className="h-4 w-4" />
													</button>
												</div>
												<button
													onClick={() => removeItem(item.id)}
													className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors shrink-0"
												>
													<Trash2 className="h-4 w-4" />
												</button>
												<span className="font-semibold text-sm sm:text-base min-w-[70px] sm:min-w-[80px] text-right">
													${formatPrice(item.price * item.quantity)}
												</span>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Shipping Address */}
							<div className={`bg-card rounded-lg border-2 shadow-[var(--shadow-elevated)] p-4 sm:p-6 md:p-8 transition-all ${
								isAddressComplete 
									? 'border-green-500 bg-green-100 shadow-green-200/50' 
									: 'border-border'
							}`}>
								<h2 className={`font-serif text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 ${
									isAddressComplete ? 'text-green-900' : ''
								}`}>
									Shipping Address
									{isAddressComplete && (
										<span className="ml-2 text-green-700">
											<CheckCircle className="inline h-4 w-4 sm:h-5 sm:w-5" />
										</span>
									)}
								</h2>
								<form>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
										<div className="md:col-span-2">
											<label className="block text-sm font-medium mb-2">
												Full Name *
											</label>
											<Input
												type="text"
												name="full-name"
												value={fullName}
												onChange={(e) => setFullName(e.target.value)}
												placeholder="Enter full name"
												required
											/>
										</div>
										<div>
											<label className="block text-sm font-medium mb-2">
												Address Line 1 *
											</label>
											<AddressAutocomplete
												value={addressLine1}
												onChange={(value) => setAddressLine1(value)}
												onSelect={(suggestion) => {
													setAddressLine1(suggestion.address_line1)
													setAddressLine2(suggestion.address_line2)
													setCity(suggestion.city)
													setState(suggestion.state)
													if (suggestion.postcode) {
														setZipCode(suggestion.postcode)
													}
												}}
												placeholder="Street address"
												required
											/>
										</div>
										<div>
											<label className="block text-sm font-medium mb-2">
												Address Line 2 (Optional)
											</label>
										<Input
											type="text"
											name="address-2"
											value={addressLine2}
											onChange={(e) => setAddressLine2(e.target.value)}
											placeholder="Apartment, suite, etc."
										/>
										</div>
										<div>
											<label className="block text-sm font-medium mb-2">
												City *
											</label>
										<Input
											type="text"
											name="city"
											value={city}
											onChange={(e) => setCity(e.target.value)}
											placeholder="City"
											required
										/>
										</div>
										<div>
											<label className="block text-sm font-medium mb-2">
												State *
											</label>
										<Input
											type="text"
											name="state"
											value={state}
											onChange={(e) => setState(e.target.value)}
											placeholder="State"
											required
										/>
										</div>
										<div>
											<label className="block text-sm font-medium mb-2">
												ZIP Code *
											</label>
										<Input
											type="text"
											name="zip"
											value={zipCode}
											onChange={(e) => setZipCode(e.target.value)}
											placeholder="ZIP code"
											required
										/>
										</div>
										<div>
											<label className="block text-sm font-medium mb-2">
												Country *
											</label>
											<Input
												type="text"
												name="country"
												value="United States"
												disabled
												className="bg-secondary cursor-not-allowed"
											/>
										</div>
									</div>
								</form>
							</div>

							{/* Payment Method */}
							<div className={`bg-card rounded-lg border-2 shadow-[var(--shadow-elevated)] p-4 sm:p-6 md:p-8 transition-all ${
								isAlternativeComplete 
									? 'border-blue-500 bg-blue-100 shadow-blue-200/50' 
									: 'border-border'
							}`}>
								<h2 className={`font-serif text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 ${
									isAlternativeComplete ? 'text-blue-900' : ''
								}`}>
									Payment Method
									{isAlternativeComplete && (
										<span className="ml-2 text-blue-700">
											<CheckCircle className="inline h-4 w-4 sm:h-5 sm:w-5" />
										</span>
									)}
								</h2>
								<p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Select your preferred payment method.</p>
								
								<div className="space-y-4">
									{/* Email Input */}
									<div>
										<label className="block text-sm font-medium mb-2">
											Your Email Address *
										</label>
										<Input
											type="email"
											value={customerEmail}
											onChange={(e) => setCustomerEmail(e.target.value)}
											placeholder="Enter your email address"
											required
											className={customerEmail && !isEmailValid ? 'border-red-500 focus-visible:ring-red-500' : ''}
										/>
										{customerEmail && !isEmailValid && (
											<p className="text-xs text-red-600 mt-1 font-medium">
												Please enter a valid email address
											</p>
										)}
										{customerEmail && isEmailValid && (
											<p className="text-xs text-green-600 mt-1 font-medium">
												✓ Valid email address
											</p>
										)}
										{!customerEmail && (
											<p className="text-xs text-muted-foreground mt-1">
												We&apos;ll send payment instructions to this email address
											</p>
										)}
									</div>

									{/* Zelle */}
									<div 
										onClick={() => setSelectedAlternativeMethod('zelle')}
										className={`border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${
											selectedAlternativeMethod === 'zelle' 
												? 'border-purple-600 bg-purple-100 shadow-lg' 
												: 'border-border hover:border-purple-400 hover:bg-purple-50'
										}`}
									>
										<div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
											<div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
												selectedAlternativeMethod === 'zelle' ? 'border-purple-700 bg-purple-200' : 'border-border'
											}`}>
												{selectedAlternativeMethod === 'zelle' && (
													<div className="w-3 h-3 bg-purple-700 rounded-full"></div>
												)}
											</div>
											<div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-700 rounded text-white text-xs flex items-center justify-center font-bold shadow-md shrink-0">Z</div>
											<span className="font-bold text-sm sm:text-base">Zelle</span>
											<span className="text-xs text-muted-foreground ml-auto">Instant transfer</span>
										</div>
										<div className={`rounded-lg p-2 sm:p-3 border-2 ${
											selectedAlternativeMethod === 'zelle' 
												? 'bg-purple-200 border-purple-400' 
												: 'bg-secondary/50 border-border'
										}`}>
											<p className={`text-xs sm:text-sm font-medium break-words ${
												selectedAlternativeMethod === 'zelle' ? 'text-purple-950' : ''
											}`}>
												Send payment to <strong className="break-all">enhancedchem4@gmail.com</strong> via Zelle. Include your order number in the memo.
											</p>
										</div>
									</div>

									{/* Bitcoin */}
									<div 
										onClick={() => setSelectedAlternativeMethod('bitcoin')}
										className={`border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${
											selectedAlternativeMethod === 'bitcoin' 
												? 'border-orange-600 bg-orange-100 shadow-lg' 
												: 'border-border hover:border-orange-400 hover:bg-orange-50'
										}`}
									>
										<div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
											<div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
												selectedAlternativeMethod === 'bitcoin' ? 'border-orange-700 bg-orange-200' : 'border-border'
											}`}>
												{selectedAlternativeMethod === 'bitcoin' && (
													<div className="w-3 h-3 bg-orange-700 rounded-full"></div>
												)}
											</div>
											<div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-600 rounded text-white text-xs flex items-center justify-center font-bold shadow-md shrink-0">₿</div>
											<span className="font-bold text-sm sm:text-base">Bitcoin</span>
											<span className="text-xs text-muted-foreground ml-auto">Cryptocurrency</span>
										</div>
										<div className={`rounded-lg p-2 sm:p-3 mb-2 sm:mb-3 border-2 ${
											selectedAlternativeMethod === 'bitcoin' 
												? 'bg-orange-200 border-orange-400' 
												: 'bg-secondary/50 border-border'
										}`}>
											<p className={`text-xs sm:text-sm font-medium ${
												selectedAlternativeMethod === 'bitcoin' ? 'text-orange-950' : ''
											}`}>
												Send Bitcoin to the address below. Payment will be confirmed once we receive 3 confirmations on the blockchain.
											</p>
										</div>
										<div>
											<label className="block text-xs sm:text-sm font-medium mb-2">
												Bitcoin Address
											</label>
											<Input
												type="text"
												value="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
												readOnly
												className={`font-mono text-[10px] sm:text-xs break-all ${
													selectedAlternativeMethod === 'bitcoin' 
														? 'bg-orange-200 border-orange-400' 
														: 'bg-secondary'
												}`}
											/>
										</div>
									</div>

									{/* Venmo */}
									<div 
										onClick={() => setSelectedAlternativeMethod('venmo')}
										className={`border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${
											selectedAlternativeMethod === 'venmo' 
												? 'border-blue-600 bg-blue-100 shadow-lg' 
												: 'border-border hover:border-blue-400 hover:bg-blue-50'
										}`}
									>
										<div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
											<div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
												selectedAlternativeMethod === 'venmo' ? 'border-blue-700 bg-blue-200' : 'border-border'
											}`}>
												{selectedAlternativeMethod === 'venmo' && (
													<div className="w-3 h-3 bg-blue-700 rounded-full"></div>
												)}
											</div>
											<div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold shadow-md shrink-0">V</div>
											<span className="font-bold text-sm sm:text-base">Venmo</span>
											<span className="text-xs text-muted-foreground ml-auto">Mobile payment</span>
										</div>
										<div className={`rounded-lg p-2 sm:p-3 mb-2 sm:mb-3 border-2 ${
											selectedAlternativeMethod === 'venmo' 
												? 'bg-blue-200 border-blue-400' 
												: 'bg-secondary/50 border-border'
										}`}>
											<p className={`text-xs sm:text-sm font-medium ${
												selectedAlternativeMethod === 'venmo' ? 'text-blue-950' : ''
											}`}>
												Send payment to <strong>@EnhancedChem</strong> on Venmo. Please include your order number in the payment note.
											</p>
										</div>
										<div>
											<label className="block text-xs sm:text-sm font-medium mb-2">
												Venmo Username
											</label>
											<Input
												type="text"
												value="@EnhancedChem"
												readOnly
												className={`${
													selectedAlternativeMethod === 'venmo' 
														? 'bg-blue-200 border-blue-400' 
														: 'bg-secondary'
												}`}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

							{/* Order Summary */}
							<div className="lg:col-span-1">
								<div className="bg-card rounded-lg border-2 border-border shadow-[var(--shadow-elevated)] p-4 sm:p-6 lg:sticky lg:top-24">
									<div>
										<h2 className="font-serif text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
											Order Summary
										</h2>
										
										<div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
											<div className="flex justify-between">
												<span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
												<span className="font-medium">${formatPrice(totalPrice)}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">Shipping</span>
												<span className="font-medium">$9.99</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">Tax</span>
												<span className="font-medium">${formatPrice(totalPrice * 0.07)}</span>
											</div>
											<div className="border-t border-border pt-3">
												<div className="flex justify-between text-lg font-semibold">
													<span>Total</span>
													<span>${formatPrice(totalPrice + 9.99 + (totalPrice * 0.07))}</span>
												</div>
											</div>
										</div>
									</div>

									<div className="mt-4 sm:mt-6">
										<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
											<Button 
												onClick={handleCompletePurchase}
												disabled={!canProceed || isSubmitting}
												variant="elegant"
												size="lg"
												className="w-full sm:flex-1"
											>
												{isSubmitting ? 'Processing...' : 'Complete Purchase'}
											</Button>
											{!canProceed && (
												<p className="text-xs text-muted-foreground text-center sm:text-left sm:whitespace-nowrap">
													Please fill out all fields
												</p>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Research Disclaimer */}
						<div className="mt-8 sm:mt-12 bg-red-100 border-2 border-red-500 rounded-lg p-4 sm:p-6 max-w-7xl mx-auto shadow-md">
							<h3 className="font-serif text-base sm:text-lg font-semibold mb-2 flex items-center gap-2 text-red-950">
								<AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-700 shrink-0" />
								Research Purposes Only
							</h3>
							<p className="text-xs sm:text-sm text-red-900 leading-relaxed font-medium">
								All products are sold for research purposes only. Not for human consumption, 
								diagnosis, treatment, cure, or prevention of any disease. By proceeding with your purchase, 
								you certify that you are 21+ years of age and agree to use these products only for 
								legitimate research purposes in accordance with applicable laws and regulations.
							</p>
						</div>
					</>
					)}
				</div>
			</main>
			<Footer />
		</div>
	)
}
