'use client'

import { CheckCircle, Mail, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="bg-white rounded-lg shadow-sm p-8 text-center">
					{/* Success Icon */}
					<div className="flex justify-center mb-6">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
							<CheckCircle className="w-8 h-8 text-green-600" />
						</div>
					</div>

					{/* Success Message */}
					<h1 className="text-2xl font-bold text-gray-900 mb-4">
						Order Successfully Placed!
					</h1>
					
					<p className="text-gray-600 mb-8 leading-relaxed">
						Your order has been processed and is currently being prepared for shipment. 
						You will receive a confirmation email with detailed tracking information shortly.
					</p>

					{/* Email Instructions */}
					<div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
						<div className="flex items-center justify-center mb-3">
							<Mail className="w-5 h-5 text-blue-600 mr-2" />
							<h2 className="text-lg font-semibold text-blue-900">
								Check Your Email
							</h2>
						</div>
						<p className="text-blue-800 text-sm leading-relaxed">
							We've sent detailed payment instructions and order confirmation to your email address. 
							Please check your inbox (and spam folder) for the next steps to complete your purchase.
						</p>
					</div>

					{/* Processing Timeline */}
					<div className="bg-gray-50 rounded-lg p-6 mb-8">
						<div className="flex items-center justify-center mb-4">
							<Clock className="w-5 h-5 text-gray-600 mr-2" />
							<h3 className="text-lg font-semibold text-gray-900">
								What Happens Next?
							</h3>
						</div>
						<div className="space-y-3 text-left max-w-md mx-auto">
							<div className="flex items-start space-x-3">
								<div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
									<span className="text-white text-xs font-bold">1</span>
								</div>
								<p className="text-sm text-gray-700">
									Complete your payment using the instructions in your email
								</p>
							</div>
							<div className="flex items-start space-x-3">
								<div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
									<span className="text-white text-xs font-bold">2</span>
								</div>
								<p className="text-sm text-gray-700">
									Your order will be processed within 1-2 business days
								</p>
							</div>
							<div className="flex items-start space-x-3">
								<div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
									<span className="text-white text-xs font-bold">3</span>
								</div>
								<p className="text-sm text-gray-700">
									You'll receive tracking information once your order ships
								</p>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							href="/"
							className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
						>
							<ArrowLeft className="w-4 h-4 mr-2" />
							Continue Shopping
						</Link>
						<Link
							href="/products"
							className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							View All Products
						</Link>
					</div>

					{/* Contact Information */}
					<div className="mt-8 pt-6 border-t border-gray-200">
						<p className="text-xs text-gray-500">
							Questions about your order? Contact us at{' '}
							<a href="mailto:support@enhancedchem.com" className="text-blue-600 hover:text-blue-700">
								support@enhancedchem.com
							</a>
							{' '}or call{' '}
							<a href="tel:+1-555-0123" className="text-blue-600 hover:text-blue-700">
								(555) 012-3456
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
