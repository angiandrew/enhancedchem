'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import { Minus, Plus, Trash2, ChevronDown, ChevronUp, Edit3, CheckCircle, AlertCircle, ArrowUp, Tag, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import AddressAutocomplete from '@/components/AddressAutocomplete'

// Promo codes: key = uppercase normalized code, value = discount (0.10 = 10%). Matching is case-insensitive.
const VALID_PROMO_CODES: Record<string, number> = {
	'CAM': 0.10,
	'ECNA10': 0.10,
	'GINGER20': 0.10,
	'JADEALEXA': 0.10,
	'MATT10': 0.10,
	'NICK8': 0.20,
	'NICK10': 0.10,
	'NICKTEST': 0.05,
	'ORBITROPIN': 0.10,
}

function normalizePromoCode(input: string): string {
	return input.replace(/\s+/g, '').toUpperCase()
}

export default function CheckoutPage() {
	const { items, updateQuantity, removeItem, totalPrice, totalItems, clearCart } = useCart()

	// Helper function to format numbers with commas
	const formatPrice = (price: number) => {
		return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}

	// Free shipping threshold
	const FREE_SHIPPING_THRESHOLD = 250
	
	// Shipping method options
	const shippingMethods = [
		{ id: 'ground', name: 'USPS Ground', price: 9.78, days: '3-5 business days' },
		{ id: '2day', name: 'USPS Priority', price: 11.39, days: '2-3 business days' },
		{ id: 'nextday', name: 'USPS Priority Mail Express', price: 40.00, days: '1-2 business days' }
	]
	const [selectedShippingMethod, setSelectedShippingMethod] = useState('ground')
	const selectedShipping = shippingMethods.find(m => m.id === selectedShippingMethod) || shippingMethods[0]
	// Apply free shipping if order meets threshold
	const shippingCost = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : selectedShipping.price
	const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice)
	const progressPercentage = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100)
	const hasFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD
	const [selectedInstitution, setSelectedInstitution] = useState('')
	const [ageVerified, setAgeVerified] = useState(false)
	const [researchPurposesVerified, setResearchPurposesVerified] = useState(false)
	const [researchLimitationsVerified, setResearchLimitationsVerified] = useState(false)
	const [termsAccepted, setTermsAccepted] = useState(false)
	const [customerEmail, setCustomerEmail] = useState('')
	const [emailOptIn, setEmailOptIn] = useState(false)
	const [selectedAlternativeMethod, setSelectedAlternativeMethod] = useState('')
	const [selectedCryptoType, setSelectedCryptoType] = useState<'usdc' | 'usdt' | 'bitcoin' | ''>('')
	const [isVerificationCollapsed, setIsVerificationCollapsed] = useState(false)
	const [orderCompleted, setOrderCompleted] = useState(false)
	const [orderNumber, setOrderNumber] = useState('')
	const [orderTotal, setOrderTotal] = useState(0)
	const [selectedPaymentMethodName, setSelectedPaymentMethodName] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [promoCode, setPromoCode] = useState('')
	const [promoApplied, setPromoApplied] = useState(false)
	const [promoError, setPromoError] = useState('')
	const [apiErrorDev, setApiErrorDev] = useState<string | null>(null)

	// In development, show API error on success page if the server returned an error
	useEffect(() => {
		if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return
		const stored = sessionStorage.getItem('checkout_api_error')
		if (stored) {
			sessionStorage.removeItem('checkout_api_error')
			setApiErrorDev(stored)
		}
	}, [orderCompleted])

	// Affiliate tracking - purchases
	useEffect(() => {
		if (orderCompleted && orderNumber && orderTotal > 0) {
			// Wait a bit to ensure the visits script has loaded
			const timer = setTimeout(() => {
				// Use actual order data (not placeholders)
				const affi_id_order = orderNumber // Unique order ID from API response
				const affi_order_price = orderTotal.toFixed(2) // Actual order price (no currency sign)
				const affi_order_coupons = promoApplied && promoCode?.trim() ? promoCode.trim().toUpperCase() : '' // Coupon code if used
				
				// Build the tracking URL exactly as specified
				const url_affi = "https://static.affiliatly.com/v3/affiliatly.js?affiliatly_code=AF-1074129&conversion=1&id_order=" + encodeURIComponent(affi_id_order) + "&order_price=" + affi_order_price + "&order_coupons=" + encodeURIComponent(affi_order_coupons)
				
				// Check if script already exists to prevent duplicates
				const existingScript = document.querySelector(`script[src*="affiliatly.js"][src*="conversion=1"]`)
				if (existingScript) {
					return // Script already loaded
				}
				
				// Create and append the script exactly as specified
				const script_affi = document.createElement("script")
				script_affi.type = "text/javascript"
				script_affi.src = url_affi
				document.getElementsByTagName("head")[0].appendChild(script_affi)
				
				// Debug logging to verify data
				console.log('Affiliate tracking fired:', {
					orderId: affi_id_order,
					orderPrice: affi_order_price,
					coupons: affi_order_coupons
				})
			}, 500) // Small delay to ensure visits script is loaded
			
			return () => clearTimeout(timer)
		}
	}, [orderCompleted, orderNumber, orderTotal, promoApplied, promoCode])
	
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
		'Government or public research institute'
	]

	// Email validation function
	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email.trim())
	}
	
	const handlePromoCode = () => {
		if (!promoCode?.trim()) {
			setPromoApplied(false)
			setPromoError('Please enter a promo code')
			return
		}
		const code = normalizePromoCode(promoCode.trim())
		if (code && VALID_PROMO_CODES[code] !== undefined) {
			setPromoApplied(true)
			setPromoError('')
		} else {
			setPromoApplied(false)
			setPromoError('Invalid promo code')
		}
	}

	// Calculate totals with promo discount
	const subtotal = totalPrice
	const tax = totalPrice * 0.07
	const orderSubtotal = subtotal + shippingCost + tax
	const promoCodeUpper = normalizePromoCode(promoCode?.trim() || '')
	const promoDiscount = promoApplied && promoCodeUpper && VALID_PROMO_CODES[promoCodeUpper] != null
		? orderSubtotal * VALID_PROMO_CODES[promoCodeUpper]
		: 0
	// Add 10% increase for Bitcoin
	const bitcoinSurcharge = selectedCryptoType === 'bitcoin' ? (orderSubtotal - promoDiscount) * 0.10 : 0
	const finalTotal = orderSubtotal - promoDiscount + bitcoinSurcharge

	const isEmailValid = isValidEmail(customerEmail)
	const isCryptoSelected = selectedAlternativeMethod === 'crypto'
	const isCryptoComplete = isCryptoSelected ? selectedCryptoType !== '' : true
	const isAlternativeComplete = isEmailValid && selectedAlternativeMethod !== '' && isCryptoComplete
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

		// Calculate and save order total before clearing cart (with promo discount)
		const subtotalCalc = totalPrice + shippingCost + (totalPrice * 0.07)
		const promoCodeUpper = normalizePromoCode(promoCode?.trim() || '')
		const promoDiscountCalc = promoApplied && promoCodeUpper && VALID_PROMO_CODES[promoCodeUpper] != null 
			? subtotalCalc * VALID_PROMO_CODES[promoCodeUpper]
			: 0
		// Add 10% increase for Bitcoin
		const bitcoinSurchargeCalc = selectedCryptoType === 'bitcoin' ? (subtotalCalc - promoDiscountCalc) * 0.10 : 0
		const finalTotal = subtotalCalc - promoDiscountCalc + bitcoinSurchargeCalc
		
		// Prevent Venmo selection
		if (selectedAlternativeMethod === 'venmo') {
			alert('Venmo is currently unavailable. Please select another payment method.')
			setIsSubmitting(false)
			return
		}
		
		// Check if crypto is selected but no type chosen
		if (selectedAlternativeMethod === 'crypto' && !selectedCryptoType) {
			alert('Please select a cryptocurrency option (USDC, USDT, or Bitcoin).')
			setIsSubmitting(false)
			return
		}
		
		const paymentMethodName = selectedAlternativeMethod === 'zelle' ? 'Zelle' 
			: selectedAlternativeMethod === 'crypto' 
				? (selectedCryptoType === 'usdc' ? 'USDC' : selectedCryptoType === 'usdt' ? 'USDT' : 'Bitcoin')
				: selectedAlternativeMethod === 'cashapp' ? 'CashApp' : 'Venmo'
		
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
					paymentMethod: selectedAlternativeMethod === 'crypto' ? selectedCryptoType : selectedAlternativeMethod,
					cryptoType: selectedAlternativeMethod === 'crypto' ? selectedCryptoType : null,
					orderTotal: finalTotal,
					shippingMethod: selectedShipping.name,
					shippingCost: shippingCost,
					emailOptIn: emailOptIn,
					promoCode: promoApplied && promoCode?.trim() ? promoCode.trim().toUpperCase() : null,
					promoDiscount: promoApplied ? promoDiscountCalc : 0,
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

			// Check if response is ok before parsing
			if (!response.ok) {
				let errorData: { error?: string; details?: string } = {}
				try {
					errorData = await response.json()
				} catch {
					errorData = { error: `HTTP ${response.status}: ${response.statusText}` }
				}
				console.error('API Error Response:', errorData)
				// In development, store so we can show the real error on the success page
				if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
					sessionStorage.setItem('checkout_api_error', errorData.details || errorData.error || JSON.stringify(errorData))
				}
				return
			}

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
				<main className="pt-32 md:pt-36 pb-16">
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
			<main className="pt-32 md:pt-36 pb-8 sm:pb-16">
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

								{process.env.NODE_ENV === 'development' && apiErrorDev && (
									<div className="mb-6 p-4 bg-amber-50 border-2 border-amber-400 rounded-lg text-amber-900 max-w-2xl mx-auto text-left">
										<p className="font-semibold">Development: API error (so you can see what went wrong)</p>
										<pre className="mt-2 text-sm whitespace-pre-wrap break-words">{apiErrorDev}</pre>
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
												<div className="w-16 h-16 sm:w-20 sm:h-20 bg-secondary/30 rounded-lg flex items-center justify-center border border-border overflow-hidden shrink-0 relative">
													{item.image && (
														<img
															src={item.image}
															alt={item.name}
															className="object-contain rounded-lg max-w-full max-h-full p-1 sm:p-2 w-full h-full"
															loading="lazy"
															onError={(e) => {
																// Silently fallback to logo if image fails to load
																if (e.currentTarget.src !== '/logos/NEW-new LOGO.png') {
																	e.currentTarget.src = '/logos/NEW-new LOGO.png'
																}
															}}
														/>
													)}
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

							{/* Shipping Method */}
							<div className="bg-card rounded-lg border-2 border-border shadow-[var(--shadow-elevated)] p-4 sm:p-6 md:p-8">
								<h2 className="font-serif text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
									Shipping Method
								</h2>
								<label className="block text-sm text-muted-foreground mb-4 sm:mb-6">
									Shipping Method
								</label>
								<div className="space-y-3">
									{shippingMethods.map((method) => (
										<label
											key={method.id}
											className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
												selectedShippingMethod === method.id
													? 'border-primary bg-primary/5'
													: 'border-border hover:border-primary/50 bg-card'
											}`}
										>
											<div className="flex items-center gap-3 sm:gap-4 flex-1">
												<input
													type="radio"
													name="shipping-method"
													value={method.id}
													checked={selectedShippingMethod === method.id}
													onChange={(e) => setSelectedShippingMethod(e.target.value)}
													className="w-5 h-5 text-primary border-2 border-border focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
												/>
												<div className="flex-1">
													<div className="font-medium text-sm sm:text-base text-foreground">
														{method.name}
													</div>
													<div className="text-xs sm:text-sm text-muted-foreground">
														({method.days})
													</div>
												</div>
											</div>
											<div className="font-semibold text-sm sm:text-base text-foreground">
												${formatPrice(method.price)}
											</div>
										</label>
									))}
								</div>
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
									{/* Email Input - prominent so customers don't miss it */}
									<div className="bg-primary/10 border-2 border-primary/30 rounded-lg p-4 sm:p-5">
										<label className="block text-base sm:text-lg font-semibold text-foreground mb-2">
											Your Email Address <span className="text-primary">*</span>
										</label>
										<p className="text-sm text-muted-foreground mb-3">
											Payment instructions will be sent here — double-check it&apos;s correct.
										</p>
										<Input
											type="email"
											value={customerEmail}
											onChange={(e) => setCustomerEmail(e.target.value)}
											placeholder="you@example.com"
											required
											className={`h-12 text-base border-2 ${customerEmail && !isEmailValid ? 'border-red-500 focus-visible:ring-red-500 bg-red-50/50' : 'border-primary/40 focus-visible:ring-primary bg-background'}`}
										/>
										{customerEmail && !isEmailValid && (
											<p className="text-xs text-red-600 mt-2 font-medium">
												Please enter a valid email address
											</p>
										)}
										{customerEmail && isEmailValid && (
											<p className="text-xs text-green-600 mt-2 font-medium">
												✓ Valid email address
											</p>
										)}
										{!customerEmail && (
											<p className="text-xs text-muted-foreground mt-2">
												We&apos;ll send payment instructions to this email address
											</p>
										)}
									</div>

									{/* Email Opt-In */}
									<div className="bg-secondary/30 rounded-lg border border-border p-4 sm:p-5">
										<h3 className="font-semibold text-sm sm:text-base text-foreground mb-3">
											Opt-In
										</h3>
										<label className="flex items-start gap-3 cursor-pointer">
											<Checkbox
												id="emailOptIn"
												checked={emailOptIn}
												onCheckedChange={(checked) => setEmailOptIn(checked === true)}
												className="mt-0.5"
											/>
											<span className="text-sm text-foreground leading-relaxed flex-1">
												I would like to receive exclusive emails with discounts and product information
											</span>
										</label>
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
											<p className={`text-xs sm:text-sm font-medium ${
												selectedAlternativeMethod === 'zelle' ? 'text-purple-950' : ''
											}`}>
												Payment instructions will be sent to your email after order submission. ONLY include your order number when sending payment.
											</p>
										</div>
									</div>

									{/* Crypto Payment Option */}
									<div 
										onClick={() => setSelectedAlternativeMethod('crypto')}
										className={`border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${
											selectedAlternativeMethod === 'crypto' 
												? 'border-orange-600 bg-orange-100 shadow-lg' 
												: 'border-border hover:border-orange-400 hover:bg-orange-50'
										}`}
									>
										<div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
											<div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
												selectedAlternativeMethod === 'crypto' ? 'border-orange-700 bg-orange-200' : 'border-border'
											}`}>
												{selectedAlternativeMethod === 'crypto' && (
													<div className="w-3 h-3 bg-orange-700 rounded-full"></div>
												)}
											</div>
											<div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-600 rounded text-white text-xs flex items-center justify-center font-bold shadow-md shrink-0">₿</div>
											<span className="font-bold text-sm sm:text-base">Crypto</span>
											<span className="text-xs text-muted-foreground ml-auto">Cryptocurrency</span>
										</div>
										<div className={`rounded-lg p-2 sm:p-3 mb-2 sm:mb-3 border-2 ${
											selectedAlternativeMethod === 'crypto' 
												? 'bg-orange-200 border-orange-400' 
												: 'bg-secondary/50 border-border'
										}`}>
											<p className={`text-xs sm:text-sm font-medium ${
												selectedAlternativeMethod === 'crypto' ? 'text-orange-950' : ''
											}`}>
												Payment instructions will be sent to your email after order submission. ONLY include your order number when sending payment.
											</p>
										</div>
										
										{/* Crypto Type Selection - Show when Crypto is selected */}
										{selectedAlternativeMethod === 'crypto' && (
											<div className="mt-4 space-y-2">
												<label className="block text-xs sm:text-sm font-medium mb-2">Select Cryptocurrency:</label>
												
												{/* USDC Option */}
												<div 
													onClick={(e) => {
														e.stopPropagation()
														setSelectedCryptoType('usdc')
													}}
													className={`border-2 rounded-lg p-2 sm:p-3 cursor-pointer transition-all ${
														selectedCryptoType === 'usdc'
															? 'border-blue-600 bg-blue-100'
															: 'border-border hover:border-blue-400 hover:bg-blue-50'
													}`}
												>
													<div className="flex items-center gap-2">
														<div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
															selectedCryptoType === 'usdc' ? 'border-blue-700 bg-blue-200' : 'border-border'
														}`}>
															{selectedCryptoType === 'usdc' && (
																<div className="w-2 h-2 bg-blue-700 rounded-full"></div>
															)}
														</div>
														<span className="font-semibold text-sm">USDC</span>
														<span className="text-xs text-muted-foreground ml-auto">USD Coin</span>
													</div>
													{selectedCryptoType === 'usdc' && (
														<div className="mt-2 pt-2 border-t border-blue-300">
															<div className="flex flex-col sm:flex-row gap-4 items-start">
																<div className="flex-1 w-full">
																	<label className="block text-xs font-medium mb-1">USDC Wallet Address:</label>
																	<Input
																		type="text"
																		value="2GLM4Z18kCNSYb3stFoquDeQeK97gnPVE8LhikCS4sxH"
																		readOnly
																		className="font-mono text-[10px] sm:text-xs break-all bg-blue-200 border-blue-400"
																	/>
																</div>
																<div className="flex flex-col items-center">
																	<label className="block text-xs font-medium mb-2">Scan QR Code:</label>
																	<div className="border-2 border-blue-400 rounded-lg p-2 bg-white">
																	<Image 
																		src="/logos/USDC QR.png" 
																		alt="USDC QR Code" 
																		width={160}
																		height={160}
																		className="object-contain rounded"
																	/>
																	</div>
																</div>
															</div>
														</div>
													)}
												</div>

												{/* USDT Option */}
												<div 
													onClick={(e) => {
														e.stopPropagation()
														setSelectedCryptoType('usdt')
													}}
													className={`border-2 rounded-lg p-2 sm:p-3 cursor-pointer transition-all ${
														selectedCryptoType === 'usdt'
															? 'border-green-600 bg-green-100'
															: 'border-border hover:border-green-400 hover:bg-green-50'
													}`}
												>
													<div className="flex items-center gap-2">
														<div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
															selectedCryptoType === 'usdt' ? 'border-green-700 bg-green-200' : 'border-border'
														}`}>
															{selectedCryptoType === 'usdt' && (
																<div className="w-2 h-2 bg-green-700 rounded-full"></div>
															)}
														</div>
														<span className="font-semibold text-sm">USDT</span>
														<span className="text-xs text-muted-foreground ml-auto">Tether</span>
													</div>
													{selectedCryptoType === 'usdt' && (
														<div className="mt-2 pt-2 border-t border-green-300">
															<div className="flex flex-col sm:flex-row gap-4 items-start">
																<div className="flex-1 w-full">
																	<label className="block text-xs font-medium mb-1">USDT Wallet Address:</label>
																	<Input
																		type="text"
																		value="0xFca3deb5b7AF0558d5CE6acE6C47AF2C2d4EAe97"
																		readOnly
																		className="font-mono text-[10px] sm:text-xs break-all bg-green-200 border-green-400"
																	/>
																</div>
																<div className="flex flex-col items-center">
																	<label className="block text-xs font-medium mb-2">Scan QR Code:</label>
																	<div className="border-2 border-green-400 rounded-lg p-2 bg-white">
																		<Image 
																			src="/logos/USDT QR .png" 
																			alt="USDT QR Code" 
																			width={160}
																			height={160}
																			className="object-contain rounded"
																		/>
																	</div>
																</div>
															</div>
														</div>
													)}
												</div>

												{/* Bitcoin Option with 10% Surcharge */}
												<div 
													onClick={(e) => {
														e.stopPropagation()
														setSelectedCryptoType('bitcoin')
													}}
													className={`border-2 rounded-lg p-2 sm:p-3 cursor-pointer transition-all ${
														selectedCryptoType === 'bitcoin'
															? 'border-orange-600 bg-orange-100'
															: 'border-border hover:border-orange-400 hover:bg-orange-50'
													}`}
												>
													<div className="flex items-center gap-2">
														<div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
															selectedCryptoType === 'bitcoin' ? 'border-orange-700 bg-orange-200' : 'border-border'
														}`}>
															{selectedCryptoType === 'bitcoin' && (
																<div className="w-2 h-2 bg-orange-700 rounded-full"></div>
															)}
														</div>
														<span className="font-semibold text-sm">Bitcoin</span>
														<span className="text-xs text-red-600 font-semibold ml-auto">+10% Surcharge</span>
													</div>
													{selectedCryptoType === 'bitcoin' && (
														<>
															<div className="mt-2 pt-2 border-t border-orange-300">
																<div className="bg-yellow-50 border border-yellow-200 rounded p-2 mb-2">
																	<p className="text-xs text-yellow-900 font-medium">
																		⚠️ <strong>10% Surcharge Applied:</strong> Bitcoin payments include a 10% processing fee. Your total will be increased by 10%.
																	</p>
																</div>
																<div className="flex flex-col sm:flex-row gap-4 items-start">
																	<div className="flex-1 w-full">
																		<label className="block text-xs font-medium mb-1">Bitcoin Wallet Address:</label>
																		<Input
																			type="text"
																			value="bc1qvrc9ls2kq2f2x9clva84n89qxe550k7e9r0lhl"
																			readOnly
																			className="font-mono text-[10px] sm:text-xs break-all bg-orange-200 border-orange-400"
																		/>
																	</div>
																	<div className="flex flex-col items-center">
																		<label className="block text-xs font-medium mb-2">Scan QR Code:</label>
																		<div className="border-2 border-orange-400 rounded-lg p-2 bg-white">
																			<Image 
																				src="/logos/BTC QR.png" 
																				alt="Bitcoin QR Code" 
																				width={160}
																				height={160}
																				className="object-contain rounded"
																			/>
																		</div>
																	</div>
																</div>
															</div>
														</>
													)}
												</div>
											</div>
										)}
									</div>

									{/* CashApp */}
									<div 
										onClick={() => setSelectedAlternativeMethod('cashapp')}
										className={`border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${
											selectedAlternativeMethod === 'cashapp' 
												? 'border-green-600 bg-green-100 shadow-lg' 
												: 'border-border hover:border-green-400 hover:bg-green-50'
										}`}
									>
										<div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
											<div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
												selectedAlternativeMethod === 'cashapp' ? 'border-green-700 bg-green-200' : 'border-border'
											}`}>
												{selectedAlternativeMethod === 'cashapp' && (
													<div className="w-3 h-3 bg-green-700 rounded-full"></div>
												)}
											</div>
											<div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold shadow-md shrink-0">$</div>
											<span className="font-bold text-sm sm:text-base">CashApp</span>
											<span className="text-xs text-muted-foreground ml-auto">Instant payment</span>
										</div>
										<div className={`rounded-lg p-2 sm:p-3 border-2 ${
											selectedAlternativeMethod === 'cashapp' 
												? 'bg-green-200 border-green-400' 
												: 'bg-secondary/50 border-border'
										}`}>
											<p className={`text-xs sm:text-sm font-medium ${
												selectedAlternativeMethod === 'cashapp' ? 'text-green-950' : ''
											}`}>
												Payment instructions will be sent to your email after order submission. ONLY include your order number when sending payment.
											</p>
										</div>
									</div>

									{/* Venmo */}
									<div 
										className="border-2 rounded-lg p-3 sm:p-4 cursor-not-allowed transition-all opacity-50 grayscale relative"
									>
										<div className="absolute top-3 right-3 z-10">
											<span className="bg-muted-foreground/90 text-background text-xs font-medium px-2.5 py-1 rounded-full border border-border/50">
												Currently Unavailable
											</span>
										</div>
										<div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
											<div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 border-border">
											</div>
											<div className="w-7 h-7 sm:w-8 sm:h-8 bg-muted-foreground/40 rounded text-muted-foreground text-xs flex items-center justify-center font-bold shrink-0">V</div>
											<span className="font-bold text-sm sm:text-base text-muted-foreground">Venmo</span>
											<span className="text-xs text-muted-foreground ml-auto">Mobile payment</span>
										</div>
										<div className="rounded-lg p-2 sm:p-3 border-2 bg-secondary/50 border-border">
											<p className="text-xs sm:text-sm font-medium text-muted-foreground">
												Payment instructions will be sent to your email after order submission. ONLY include your order number when sending payment.
											</p>
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
										
										{/* Free Shipping Progress Bar */}
										<div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg">
											{hasFreeShipping ? (
												<div className="text-center">
													<div className="flex items-center justify-center gap-2 mb-2">
														<CheckCircle className="w-5 h-5 text-green-600" />
														<span className="font-semibold text-green-700 text-sm sm:text-base">
															🎉 You&apos;ve unlocked FREE shipping!
														</span>
													</div>
													<div className="w-full h-3 bg-green-200 rounded-full overflow-hidden">
														<div 
															className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500 ease-out"
															style={{ width: '100%' }}
														/>
													</div>
												</div>
											) : (
												<div>
													<div className="flex items-center justify-between mb-2">
														<span className="text-xs sm:text-sm font-medium text-gray-700">
															Add ${formatPrice(remainingForFreeShipping)} more for free shipping
														</span>
														<span className="text-xs sm:text-sm font-semibold text-green-600">
															${formatPrice(FREE_SHIPPING_THRESHOLD)}
														</span>
													</div>
													<div className="relative w-full h-12 bg-gray-200 rounded-full overflow-visible px-2">
														{/* Progress bar */}
														<div 
															className="absolute top-1/2 left-2 right-2 h-4 -translate-y-1/2 bg-gray-200 rounded-full overflow-hidden"
														>
															<div 
																className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500 ease-out"
																style={{ width: `${progressPercentage}%` }}
															/>
														</div>
														{/* Carrot indicator - constrained to stay within bounds */}
														<div 
															className="absolute top-0 bottom-0 flex flex-col items-center transition-all duration-500 ease-out pointer-events-none"
															style={{ 
																left: `calc(${Math.min(Math.max(progressPercentage, 5), 95)}% + 8px - 50%)`,
																maxWidth: 'calc(100% - 16px)'
															}}
														>
															<ArrowUp className="w-4 h-4 text-green-600 drop-shadow-sm shrink-0" />
															<div className="mt-0.5 px-2 py-0.5 bg-green-600 text-white text-[10px] font-semibold rounded whitespace-nowrap shadow-md shrink-0">
																${formatPrice(totalPrice)}
															</div>
														</div>
													</div>
													{remainingForFreeShipping < 50 && remainingForFreeShipping > 0 && (
														<p className="text-xs text-green-600 font-medium mt-2 text-center">
															Almost there! 🎯
														</p>
													)}
												</div>
											)}
										</div>
										
										{/* Promo Code Section */}
										<div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border">
											<label className="block text-sm font-medium mb-2 flex items-center gap-2">
												<Tag className="w-4 h-4 text-muted-foreground" />
												Promo Code
											</label>
											<div className="flex gap-2">
												<Input
													type="text"
													value={promoCode}
													onChange={(e) => {
														setPromoCode(e.target.value)
														setPromoError('')
														if (promoApplied) setPromoApplied(false)
													}}
													onKeyDown={(e) => {
														if (e.key === 'Enter') {
															e.preventDefault()
															handlePromoCode()
														}
													}}
													placeholder="Enter promo code"
													className={`flex-1 uppercase ${promoApplied ? 'border-green-500 bg-green-50' : promoError ? 'border-red-500' : ''}`}
													disabled={promoApplied}
												/>
												{promoApplied ? (
													<Button
														type="button"
														variant="outline"
														size="sm"
														onClick={() => {
															setPromoCode('')
															setPromoApplied(false)
															setPromoError('')
														}}
														className="shrink-0"
													>
														<X className="w-4 h-4" />
													</Button>
												) : (
													<Button
														type="button"
														variant="elegant"
														size="sm"
														onClick={handlePromoCode}
														disabled={!promoCode.trim()}
														className="shrink-0"
													>
														Apply
													</Button>
												)}
											</div>
											{promoError && (
												<p className="text-xs text-red-600 mt-1 font-medium">{promoError}</p>
											)}
											{promoApplied && (
												<p className="text-xs text-green-600 mt-1 font-medium flex items-center gap-1">
													<CheckCircle className="w-3 h-3" />
													Promo code applied! {promoCode?.trim() && VALID_PROMO_CODES[normalizePromoCode(promoCode.trim())] != null ? Math.round(VALID_PROMO_CODES[normalizePromoCode(promoCode.trim())] * 100) : 10}% discount
												</p>
											)}
										</div>
										
										<div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
											<div className="flex justify-between">
												<span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
												<span className="font-medium">${formatPrice(totalPrice)}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">Shipping ({selectedShipping.name})</span>
												<span className={`font-medium ${hasFreeShipping ? 'text-green-600' : ''}`}>
													{hasFreeShipping ? (
														<>
															<span className="text-gray-400 line-through">${formatPrice(selectedShipping.price)}</span>
															<span className="ml-2 text-green-600">FREE</span>
														</>
													) : (
														`$${formatPrice(shippingCost)}`
													)}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">Tax</span>
												<span className="font-medium">${formatPrice(tax)}</span>
											</div>
											{promoApplied && promoDiscount > 0 && (
												<div className="flex justify-between text-green-600">
													<span className="font-medium">Promo Discount ({promoCode?.trim().toUpperCase() || ''})</span>
													<span className="font-medium">-${formatPrice(promoDiscount)}</span>
												</div>
											)}
											{selectedCryptoType === 'bitcoin' && bitcoinSurcharge > 0 && (
												<div className="flex justify-between text-orange-600">
													<span className="font-medium">Bitcoin Processing Fee (10%)</span>
													<span className="font-medium">+${formatPrice(bitcoinSurcharge)}</span>
												</div>
											)}
											<div className="border-t border-border pt-3">
												<div className="flex justify-between text-lg font-semibold">
													<span>Total</span>
													<span>${formatPrice(finalTotal)}</span>
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
