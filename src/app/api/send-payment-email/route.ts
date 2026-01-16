import { NextRequest, NextResponse } from 'next/server'

// Note: To enable email sending, you need to:
// 1. Install Resend: npm install resend
// 2. Get API key from https://resend.com
// 3. Add RESEND_API_KEY to your .env.local file
// 4. Add RESEND_FROM_EMAIL (e.g., "Enhanced Chem <noreply@yourdomain.com>")

// Dynamically import Resend to handle if it's not installed
async function getResendClient() {
	try {
		const { Resend } = await import('resend')
		return new Resend(process.env.RESEND_API_KEY || '')
	} catch (error) {
		console.warn('Resend not installed. Run: npm install resend')
		return null
	}
}

// Generate order number
function generateOrderNumber(): string {
	const timestamp = Date.now().toString(36).toUpperCase()
	const random = Math.random().toString(36).substring(2, 6).toUpperCase()
	return `EC-${timestamp}-${random}`
}

// Email templates for each payment method
function getPaymentInstructions(method: string, orderNumber: string) {
	const templates = {
		zelle: {
			subject: `Payment Instructions for Order ${orderNumber} - Enhanced Chem`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
					<h1 style="color: #9333ea; border-bottom: 2px solid #9333ea; padding-bottom: 10px;">
						Payment Instructions - Zelle
					</h1>
					<p style="font-size: 16px; color: #333; margin-top: 20px;">
						Thank you for your order! Your order number is: <strong style="color: #9333ea;">${orderNumber}</strong>
					</p>
					<div style="background-color: #f3f4f6; border-left: 4px solid #9333ea; padding: 15px; margin: 20px 0;">
						<h2 style="color: #9333ea; margin-top: 0;">How to Complete Your Payment:</h2>
						<ol style="color: #333; line-height: 1.8;">
							<li>Open your Zelle app or log into your bank&apos;s Zelle service</li>
							<li>Send payment to: <strong>enhancedchem@email.com</strong></li>
							<li>Include your order number <strong>${orderNumber}</strong> in the memo/note field</li>
							<li>Send the exact amount shown during checkout</li>
						</ol>
					</div>
					<div style="background-color: #fef3c7; border: 1px solid #fbbf24; padding: 15px; margin: 20px 0; border-radius: 5px;">
						<p style="margin: 0; color: #92400e;">
							<strong>Important:</strong> Please include your order number in the memo to ensure prompt processing.
						</p>
					</div>
					<p style="color: #666; font-size: 14px; margin-top: 30px;">
						Once we receive your payment, your order will be processed within 1-2 business days.
						You&apos;ll receive tracking information via email once your order ships.
					</p>
					<p style="color: #666; font-size: 14px; margin-top: 20px;">
						Questions? Contact us at support@enhancedchem.com
					</p>
				</div>
			`
		},
		bitcoin: {
			subject: `Payment Instructions for Order ${orderNumber} - Enhanced Chem`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
					<h1 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
						Payment Instructions - Bitcoin
					</h1>
					<p style="font-size: 16px; color: #333; margin-top: 20px;">
						Thank you for your order! Your order number is: <strong style="color: #f97316;">${orderNumber}</strong>
					</p>
					<div style="background-color: #f3f4f6; border-left: 4px solid #f97316; padding: 15px; margin: 20px 0;">
						<h2 style="color: #f97316; margin-top: 0;">Bitcoin Payment Address:</h2>
						<div style="background-color: #fff; border: 1px solid #e5e7eb; padding: 15px; margin: 10px 0; border-radius: 5px; word-break: break-all; font-family: monospace; font-size: 14px;">
							1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
						</div>
					</div>
					<div style="background-color: #fef3c7; border: 1px solid #fbbf24; padding: 15px; margin: 20px 0; border-radius: 5px;">
						<p style="margin: 0; color: #92400e;">
							<strong>Important:</strong> 
							<ul style="margin: 10px 0; padding-left: 20px; color: #92400e;">
								<li>Send the exact amount shown during checkout</li>
								<li>Payment will be confirmed once we receive 3 confirmations on the blockchain</li>
								<li>Your order number is: <strong>${orderNumber}</strong></li>
							</ul>
						</p>
					</div>
					<p style="color: #666; font-size: 14px; margin-top: 30px;">
						Once your Bitcoin payment is confirmed on the blockchain, your order will be processed within 1-2 business days.
						You&apos;ll receive tracking information via email once your order ships.
					</p>
					<p style="color: #666; font-size: 14px; margin-top: 20px;">
						Questions? Contact us at support@enhancedchem.com
					</p>
				</div>
			`
		},
		venmo: {
			subject: `Payment Instructions for Order ${orderNumber} - Enhanced Chem`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
					<h1 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
						Payment Instructions - Venmo
					</h1>
					<p style="font-size: 16px; color: #333; margin-top: 20px;">
						Thank you for your order! Your order number is: <strong style="color: #3b82f6;">${orderNumber}</strong>
					</p>
					<div style="background-color: #f3f4f6; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0;">
						<h2 style="color: #3b82f6; margin-top: 0;">How to Complete Your Payment:</h2>
						<ol style="color: #333; line-height: 1.8;">
							<li>Open your Venmo app</li>
							<li>Search for: <strong>@EnhancedChem</strong></li>
							<li>Send payment for the exact amount shown during checkout</li>
							<li>Include your order number <strong>${orderNumber}</strong> in the payment note</li>
						</ol>
					</div>
					<div style="background-color: #fef3c7; border: 1px solid #fbbf24; padding: 15px; margin: 20px 0; border-radius: 5px;">
						<p style="margin: 0; color: #92400e;">
							<strong>Important:</strong> Please include your order number <strong>${orderNumber}</strong> in the payment note to ensure prompt processing.
						</p>
					</div>
					<p style="color: #666; font-size: 14px; margin-top: 30px;">
						Once we receive your payment, your order will be processed within 1-2 business days.
						You&apos;ll receive tracking information via email once your order ships.
					</p>
					<p style="color: #666; font-size: 14px; margin-top: 20px;">
						Questions? Contact us at support@enhancedchem.com
					</p>
				</div>
			`
		}
	}

	return templates[method as keyof typeof templates] || templates.zelle
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { email, paymentMethod, orderTotal, items } = body

		if (!email || !paymentMethod) {
			return NextResponse.json(
				{ error: 'Email and payment method are required' },
				{ status: 400 }
			)
		}

		// Generate order number
		const orderNumber = generateOrderNumber()

		// Get payment instructions template
		const { subject, html } = getPaymentInstructions(paymentMethod, orderNumber)

		// Get Resend client
		const resend = await getResendClient()
		
		// Check if Resend is configured
		if (!resend || !process.env.RESEND_API_KEY) {
			console.error('Resend API key not configured')
			// Still generate order number for success page, but warn about email
			return NextResponse.json({
				success: true,
				orderNumber: orderNumber,
				warning: 'Email service not configured. Please contact support for payment instructions.'
			})
		}

		// Send email using Resend
		const { data, error } = await resend.emails.send({
			from: process.env.RESEND_FROM_EMAIL || 'Enhanced Chem <onboarding@resend.dev>',
			to: email,
			subject: subject,
			html: html,
		})

		if (error) {
			console.error('Error sending email:', error)
			return NextResponse.json(
				{ error: 'Failed to send email', details: error },
				{ status: 500 }
			)
		}

		return NextResponse.json({
			success: true,
			orderNumber: orderNumber,
			emailId: data?.id
		})

	} catch (error) {
		console.error('Error in send-payment-email route:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}