import { NextRequest, NextResponse } from 'next/server'
import { getNextOrderNumber, saveOrder } from '@/lib/orders'

// Disable caching for this route
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const fetchCache = 'force-no-store'

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
	} catch {
		console.warn('Resend not installed. Run: npm install resend')
		return null
	}
}

// Order number generation is now handled by getNextOrderNumber() from @/lib/orders

// Email templates for each payment method
function getPaymentInstructions(
	method: string, 
	orderNumber: string, 
	orderTotal: number, 
	items: Array<{name: string, quantity: number, price: number}>,
	shippingAddress?: {
		fullName: string
		addressLine1: string
		addressLine2?: string
		city: string
		state: string
		zipCode: string
		country: string
	}
) {
	const formatPrice = (price: number) => price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	const totalFormatted = formatPrice(orderTotal)
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'
	const usdcQrCodeUrl = `${baseUrl}/logos/USDC%20QR.png`
	const usdtQrCodeUrl = `${baseUrl}/logos/USDT%20QR%20.png`
	const btcQrCodeUrl = `${baseUrl}/logos/BTC%20QR.png`
	
	// Build order items list HTML
	const itemsListHTML = items.map(item => {
		const itemTotal = item.price * item.quantity
		return `
			<tr style="border-bottom: 1px solid #e5e7eb;">
				<td style="padding: 8px 0; color: #333;">${item.name}</td>
				<td style="padding: 8px 0; text-align: center; color: #666;">${item.quantity}</td>
				<td style="padding: 8px 0; text-align: right; color: #333; font-weight: 600;">$${formatPrice(itemTotal)}</td>
			</tr>
		`
	}).join('')
	
	// Build shipping address HTML
	const shippingAddressHTML = shippingAddress ? `
		<div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
			<h2 style="color: #9333ea; margin-top: 0; margin-bottom: 15px;">Shipping Address</h2>
			<div style="color: #333; line-height: 1.8;">
				<div style="font-weight: 600; margin-bottom: 8px;">${shippingAddress.fullName}</div>
				<div>${shippingAddress.addressLine1}</div>
				${shippingAddress.addressLine2 ? `<div>${shippingAddress.addressLine2}</div>` : ''}
				<div>${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}</div>
				<div>${shippingAddress.country}</div>
			</div>
		</div>
	` : ''
	
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
					<div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
						<h2 style="color: #9333ea; margin-top: 0; margin-bottom: 15px;">Order Summary</h2>
						<table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
							<thead>
								<tr style="border-bottom: 2px solid #9333ea;">
									<th style="padding: 8px 0; text-align: left; color: #666; font-size: 14px; font-weight: 600;">Item</th>
									<th style="padding: 8px 0; text-align: center; color: #666; font-size: 14px; font-weight: 600;">Qty</th>
									<th style="padding: 8px 0; text-align: right; color: #666; font-size: 14px; font-weight: 600;">Price</th>
								</tr>
							</thead>
							<tbody>
								${itemsListHTML}
							</tbody>
						</table>
						<div style="border-top: 2px solid #9333ea; padding-top: 12px; margin-top: 12px;">
							<div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #9333ea;">
								<span>Total Amount Due:</span>
								<span>$${totalFormatted}</span>
							</div>
						</div>
					</div>
					
					${shippingAddressHTML}
					
					<div style="background-color: #f3f4f6; border-left: 4px solid #9333ea; padding: 15px; margin: 20px 0;">
						<h2 style="color: #9333ea; margin-top: 0;">How to Complete Your Payment:</h2>
						<ol style="color: #333; line-height: 1.8;">
							<li>Open your Zelle app or log into your bank&apos;s Zelle service</li>
							<li>Send payment to: <strong>enhancedchem4@gmail.com</strong></li>
							<li>Include your order number <strong>${orderNumber}</strong> in the memo/note field. <strong style="color: #dc2626;">DO NOT INCLUDE PRODUCT NAMES OR ANY MENTION OF PEPTIDES.</strong></li>
							<li>Send the exact amount: <strong style="color: #9333ea;">$${totalFormatted}</strong></li>
						</ol>
					</div>
					<div style="background-color: #fef3c7; border: 1px solid #fbbf24; padding: 15px; margin: 20px 0; border-radius: 5px;">
						<p style="margin: 0; color: #92400e;">
							<strong>Important:</strong> Please include your order number <strong>${orderNumber}</strong> in the memo and send exactly <strong>$${totalFormatted}</strong> to ensure prompt processing.
						</p>
					</div>
					<p style="color: #666; font-size: 14px; margin-top: 30px;">
						Once we receive your payment, your order will be processed within 1-2 business days.
						You&apos;ll receive tracking information via email once your order ships.
					</p>
					<p style="color: #666; font-size: 14px; margin-top: 20px;">
						Questions? Contact us at contact@enhancedchem.com
					</p>
				</div>
			`
		},
		usdc: {
			subject: `Payment Instructions for Order ${orderNumber} - Enhanced Chem`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
					<h1 style="color: #2775ca; border-bottom: 2px solid #2775ca; padding-bottom: 10px;">
						Payment Instructions - USDC
					</h1>
					<p style="font-size: 16px; color: #333; margin-top: 20px;">
						Thank you for your order! Your order number is: <strong style="color: #2775ca;">${orderNumber}</strong>
					</p>
					<div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
						<h2 style="color: #2775ca; margin-top: 0; margin-bottom: 15px;">Order Summary</h2>
						<table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
							<thead>
								<tr style="border-bottom: 2px solid #2775ca;">
									<th style="padding: 8px 0; text-align: left; color: #666; font-size: 14px; font-weight: 600;">Item</th>
									<th style="padding: 8px 0; text-align: center; color: #666; font-size: 14px; font-weight: 600;">Qty</th>
									<th style="padding: 8px 0; text-align: right; color: #666; font-size: 14px; font-weight: 600;">Price</th>
								</tr>
							</thead>
							<tbody>
								${itemsListHTML}
							</tbody>
						</table>
						<div style="border-top: 2px solid #2775ca; padding-top: 12px; margin-top: 12px;">
							<div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #2775ca;">
								<span>Total Amount Due:</span>
								<span>$${totalFormatted}</span>
							</div>
						</div>
					</div>
					
					${shippingAddressHTML}
					
					<div style="background-color: #f3f4f6; border-left: 4px solid #2775ca; padding: 15px; margin: 20px 0;">
						<h2 style="color: #2775ca; margin-top: 0;">How to Complete Your Payment:</h2>
						<ol style="color: #333; line-height: 1.8;">
							<li>Open your cryptocurrency wallet (MetaMask, Coinbase Wallet, Trust Wallet, etc.)</li>
							<li>Make sure you have USDC (USD Coin) in your wallet</li>
							<li>Scan the QR code below or send USDC to the following wallet address:</li>
						</ol>
						<div style="text-align: center; margin: 20px 0;">
							<img src="${usdcQrCodeUrl}" alt="USDC QR Code" style="max-width: 300px; width: 100%; height: auto; border: 2px solid #2775ca; border-radius: 8px; padding: 10px; background-color: #fff;" />
							<p style="color: #666; font-size: 12px; margin-top: 10px;">Scan this QR code with your wallet app to pay</p>
						</div>
						<div style="background-color: #fff; border: 1px solid #e5e7eb; padding: 15px; margin: 15px 0; border-radius: 5px; word-break: break-all; font-family: monospace; font-size: 14px; font-weight: 600; color: #2775ca;">
							2GLM4Z18kCNSYb3stFoquDeQeK97gnPVE8LhikCS4sxH
						</div>
						<ol style="color: #333; line-height: 1.8; counter-reset: list-counter 3;">
							<li style="counter-increment: list-counter;">Send the exact amount: <strong style="color: #2775ca;">$${totalFormatted} USDC</strong></li>
							<li style="counter-increment: list-counter;">Include your order number <strong>${orderNumber}</strong> in the memo/note field when sending. <strong style="color: #dc2626;">DO NOT INCLUDE PRODUCT NAMES OR ANY MENTION OF PEPTIDES.</strong></li>
							<li style="counter-increment: list-counter;">Double-check the wallet address before confirming the transaction</li>
						</ol>
					</div>
					<div style="background-color: #fef3c7; border: 1px solid #fbbf24; padding: 15px; margin: 20px 0; border-radius: 5px;">
						<p style="margin: 0; color: #92400e;">
							<strong>Important:</strong> Please include your order number <strong>${orderNumber}</strong> in the memo/note field and send exactly <strong>$${totalFormatted} USDC</strong> to ensure prompt processing. Payment will be confirmed once we receive the transaction on the blockchain.
						</p>
					</div>
					<p style="color: #666; font-size: 14px; margin-top: 30px;">
						Once your USDC payment is confirmed on the blockchain, your order will be processed within 1-2 business days.
						You&apos;ll receive tracking information via email once your order ships.
					</p>
					<p style="color: #666; font-size: 14px; margin-top: 20px;">
						Questions? Contact us at contact@enhancedchem.com
					</p>
				</div>
			`
		},
		usdt: {
			subject: `Payment Instructions for Order ${orderNumber} - Enhanced Chem`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
					<h1 style="color: #26a17b; border-bottom: 2px solid #26a17b; padding-bottom: 10px;">
						Payment Instructions - USDT
					</h1>
					<p style="font-size: 16px; color: #333; margin-top: 20px;">
						Thank you for your order! Your order number is: <strong style="color: #26a17b;">${orderNumber}</strong>
					</p>
					<div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
						<h2 style="color: #26a17b; margin-top: 0; margin-bottom: 15px;">Order Summary</h2>
						<table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
							<thead>
								<tr style="border-bottom: 2px solid #26a17b;">
									<th style="padding: 8px 0; text-align: left; color: #666; font-size: 14px; font-weight: 600;">Item</th>
									<th style="padding: 8px 0; text-align: center; color: #666; font-size: 14px; font-weight: 600;">Qty</th>
									<th style="padding: 8px 0; text-align: right; color: #666; font-size: 14px; font-weight: 600;">Price</th>
								</tr>
							</thead>
							<tbody>
								${itemsListHTML}
							</tbody>
						</table>
						<div style="border-top: 2px solid #26a17b; padding-top: 12px; margin-top: 12px;">
							<div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #26a17b;">
								<span>Total Amount Due:</span>
								<span>$${totalFormatted}</span>
							</div>
						</div>
					</div>
					
					${shippingAddressHTML}
					
					<div style="background-color: #f3f4f6; border-left: 4px solid #26a17b; padding: 15px; margin: 20px 0;">
						<h2 style="color: #26a17b; margin-top: 0;">How to Complete Your Payment:</h2>
						<ol style="color: #333; line-height: 1.8;">
							<li>Open your cryptocurrency wallet (MetaMask, Coinbase Wallet, Trust Wallet, etc.)</li>
							<li>Make sure you have USDT (Tether) in your wallet</li>
							<li>Scan the QR code below or send USDT to the following wallet address:</li>
						</ol>
						<div style="text-align: center; margin: 20px 0;">
							<img src="${usdtQrCodeUrl}" alt="USDT QR Code" style="max-width: 300px; width: 100%; height: auto; border: 2px solid #26a17b; border-radius: 8px; padding: 10px; background-color: #fff;" />
							<p style="color: #666; font-size: 12px; margin-top: 10px;">Scan this QR code with your wallet app to pay</p>
						</div>
						<div style="background-color: #fff; border: 1px solid #e5e7eb; padding: 15px; margin: 15px 0; border-radius: 5px; word-break: break-all; font-family: monospace; font-size: 14px; font-weight: 600; color: #26a17b;">
							0xFca3deb5b7AF0558d5CE6acE6C47AF2C2d4EAe97
						</div>
						<ol style="color: #333; line-height: 1.8; counter-reset: list-counter 3;">
							<li style="counter-increment: list-counter;">Send the exact amount: <strong style="color: #26a17b;">$${totalFormatted} USDT</strong></li>
							<li style="counter-increment: list-counter;">Include your order number <strong>${orderNumber}</strong> in the memo/note field when sending. <strong style="color: #dc2626;">DO NOT INCLUDE PRODUCT NAMES OR ANY MENTION OF PEPTIDES.</strong></li>
							<li style="counter-increment: list-counter;">Double-check the wallet address before confirming the transaction</li>
						</ol>
					</div>
					<div style="background-color: #fef3c7; border: 1px solid #fbbf24; padding: 15px; margin: 20px 0; border-radius: 5px;">
						<p style="margin: 0; color: #92400e;">
							<strong>Important:</strong> 
							<ul style="margin: 10px 0; padding-left: 20px; color: #92400e;">
								<li>Send the exact amount: <strong>$${totalFormatted} USDT</strong></li>
								<li>Payment will be confirmed once we receive the transaction on the blockchain</li>
								<li>Include your order number <strong>${orderNumber}</strong> when sending. <strong style="color: #dc2626;">DO NOT INCLUDE PRODUCT NAMES OR ANY MENTION OF PEPTIDES.</strong></li>
							</ul>
						</p>
					</div>
					<p style="color: #666; font-size: 14px; margin-top: 30px;">
						Once your USDT payment is confirmed on the blockchain, your order will be processed within 1-2 business days.
						You&apos;ll receive tracking information via email once your order ships.
					</p>
					<p style="color: #666; font-size: 14px; margin-top: 20px;">
						Questions? Contact us at contact@enhancedchem.com
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
					<div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
						<h2 style="color: #f97316; margin-top: 0; margin-bottom: 15px;">Order Summary</h2>
						<table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
							<thead>
								<tr style="border-bottom: 2px solid #f97316;">
									<th style="padding: 8px 0; text-align: left; color: #666; font-size: 14px; font-weight: 600;">Item</th>
									<th style="padding: 8px 0; text-align: center; color: #666; font-size: 14px; font-weight: 600;">Qty</th>
									<th style="padding: 8px 0; text-align: right; color: #666; font-size: 14px; font-weight: 600;">Price</th>
								</tr>
							</thead>
							<tbody>
								${itemsListHTML}
							</tbody>
						</table>
						<div style="border-top: 2px solid #f97316; padding-top: 12px; margin-top: 12px;">
							<div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #f97316;">
								<span>Total Amount Due:</span>
								<span>$${totalFormatted}</span>
							</div>
						</div>
					</div>
					
					${shippingAddressHTML}
					
					<div style="background-color: #fef3c7; border: 2px solid #fbbf24; padding: 15px; margin: 20px 0; border-radius: 5px;">
						<p style="margin: 0; color: #92400e; font-weight: bold; font-size: 16px;">
							⚠️ 10% Processing Fee Applied: Your total includes a 10% Bitcoin processing surcharge.
						</p>
					</div>
					
					<div style="background-color: #f3f4f6; border-left: 4px solid #f97316; padding: 15px; margin: 20px 0;">
						<h2 style="color: #f97316; margin-top: 0;">How to Complete Your Payment:</h2>
						<ol style="color: #333; line-height: 1.8;">
							<li>Open your Bitcoin wallet (Coinbase, Blockchain.com, Electrum, etc.)</li>
							<li>Make sure you have Bitcoin (BTC) in your wallet</li>
							<li>Scan the QR code below or send Bitcoin to the following wallet address:</li>
						</ol>
						<div style="text-align: center; margin: 20px 0;">
							<img src="${btcQrCodeUrl}" alt="Bitcoin QR Code" style="max-width: 300px; width: 100%; height: auto; border: 2px solid #f97316; border-radius: 8px; padding: 10px; background-color: #fff;" />
							<p style="color: #666; font-size: 12px; margin-top: 10px;">Scan this QR code with your wallet app to pay</p>
						</div>
						<div style="background-color: #fff; border: 1px solid #e5e7eb; padding: 15px; margin: 15px 0; border-radius: 5px; word-break: break-all; font-family: monospace; font-size: 14px; font-weight: 600; color: #f97316;">
							bc1qvrc9ls2kq2f2x9clva84n89qxe550k7e9r0lhl
						</div>
						<ol style="color: #333; line-height: 1.8; counter-reset: list-counter 3;">
							<li style="counter-increment: list-counter;">Send the exact amount: <strong style="color: #f97316;">$${totalFormatted}</strong> (includes 10% processing fee)</li>
							<li style="counter-increment: list-counter;">Include your order number <strong>${orderNumber}</strong> in the memo/note field when sending. <strong style="color: #dc2626;">DO NOT INCLUDE PRODUCT NAMES OR ANY MENTION OF PEPTIDES.</strong></li>
							<li style="counter-increment: list-counter;">Double-check the wallet address before confirming the transaction</li>
							<li style="counter-increment: list-counter;">Payment will be confirmed once we receive 3 confirmations on the blockchain</li>
						</ol>
					</div>
					<div style="background-color: #fef3c7; border: 1px solid #fbbf24; padding: 15px; margin: 20px 0; border-radius: 5px;">
						<p style="margin: 0; color: #92400e;">
							<strong>Important:</strong> 
							<ul style="margin: 10px 0; padding-left: 20px; color: #92400e;">
								<li>Send the exact amount: <strong>$${totalFormatted}</strong> (includes 10% processing fee)</li>
								<li>Payment will be confirmed once we receive 3 confirmations on the blockchain</li>
								<li>Include your order number <strong>${orderNumber}</strong> when sending. <strong style="color: #dc2626;">DO NOT INCLUDE PRODUCT NAMES OR ANY MENTION OF PEPTIDES.</strong></li>
							</ul>
						</p>
					</div>
					<p style="color: #666; font-size: 14px; margin-top: 30px;">
						Once your Bitcoin payment is confirmed on the blockchain, your order will be processed within 1-2 business days.
						You&apos;ll receive tracking information via email once your order ships.
					</p>
					<p style="color: #666; font-size: 14px; margin-top: 20px;">
						Questions? Contact us at contact@enhancedchem.com
					</p>
				</div>
			`
		},
		cashapp: {
			subject: `Payment Instructions for Order ${orderNumber} - Enhanced Chem`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
					<h1 style="color: #00d632; border-bottom: 2px solid #00d632; padding-bottom: 10px;">
						Payment Instructions - CashApp
					</h1>
					<p style="font-size: 16px; color: #333; margin-top: 20px;">
						Thank you for your order! Your order number is: <strong style="color: #00d632;">${orderNumber}</strong>
					</p>
					<div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
						<h2 style="color: #00d632; margin-top: 0; margin-bottom: 15px;">Order Summary</h2>
						<table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
							<thead>
								<tr style="border-bottom: 2px solid #00d632;">
									<th style="padding: 8px 0; text-align: left; color: #666; font-size: 14px; font-weight: 600;">Item</th>
									<th style="padding: 8px 0; text-align: center; color: #666; font-size: 14px; font-weight: 600;">Qty</th>
									<th style="padding: 8px 0; text-align: right; color: #666; font-size: 14px; font-weight: 600;">Price</th>
								</tr>
							</thead>
							<tbody>
								${itemsListHTML}
							</tbody>
						</table>
						<div style="border-top: 2px solid #00d632; padding-top: 12px; margin-top: 12px;">
							<div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #00d632;">
								<span>Total Amount Due:</span>
								<span>$${totalFormatted}</span>
							</div>
						</div>
					</div>
					
					${shippingAddressHTML}
					
					<div style="background-color: #f3f4f6; border-left: 4px solid #00d632; padding: 15px; margin: 20px 0;">
						<h2 style="color: #00d632; margin-top: 0;">How to Complete Your Payment:</h2>
						<ol style="color: #333; line-height: 1.8;">
							<li>Open your CashApp app</li>
							<li>Send payment to: <strong>$enhancedchem</strong></li>
							<li>Send the exact amount: <strong style="color: #00d632;">$${totalFormatted}</strong></li>
							<li>Include your order number <strong>${orderNumber}</strong> in the "For" field. <strong style="color: #dc2626;">DO NOT INCLUDE PRODUCT NAMES OR ANY MENTION OF PEPTIDES.</strong></li>
						</ol>
					</div>
					<div style="background-color: #fef3c7; border: 1px solid #fbbf24; padding: 15px; margin: 20px 0; border-radius: 5px;">
						<p style="margin: 0; color: #92400e;">
							<strong>Important:</strong> Please include ONLY your order number <strong>${orderNumber}</strong> in the "For" field and send exactly <strong>$${totalFormatted}</strong> to ensure prompt processing.
						</p>
					</div>
					<p style="color: #666; font-size: 14px; margin-top: 30px;">
						Once we receive your payment, your order will be processed within 1-2 business days.
						You&apos;ll receive tracking information via email once your order ships.
					</p>
					<p style="color: #666; font-size: 14px; margin-top: 20px;">
						Questions? Contact us at contact@enhancedchem.com
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
					<div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
						<h2 style="color: #3b82f6; margin-top: 0; margin-bottom: 15px;">Order Summary</h2>
						<table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
							<thead>
								<tr style="border-bottom: 2px solid #3b82f6;">
									<th style="padding: 8px 0; text-align: left; color: #666; font-size: 14px; font-weight: 600;">Item</th>
									<th style="padding: 8px 0; text-align: center; color: #666; font-size: 14px; font-weight: 600;">Qty</th>
									<th style="padding: 8px 0; text-align: right; color: #666; font-size: 14px; font-weight: 600;">Price</th>
								</tr>
							</thead>
							<tbody>
								${itemsListHTML}
							</tbody>
						</table>
						<div style="border-top: 2px solid #3b82f6; padding-top: 12px; margin-top: 12px;">
							<div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #3b82f6;">
								<span>Total Amount Due:</span>
								<span>$${totalFormatted}</span>
							</div>
						</div>
					</div>
					
					${shippingAddressHTML}
					
					<div style="background-color: #f3f4f6; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0;">
						<h2 style="color: #3b82f6; margin-top: 0;">How to Complete Your Payment:</h2>
						<ol style="color: #333; line-height: 1.8;">
							<li>Open your Venmo app</li>
							<li>Search for: <strong>@EnhancedChem</strong></li>
							<li>Send payment for the exact amount: <strong style="color: #3b82f6;">$${totalFormatted}</strong></li>
							<li>Include your order number <strong>${orderNumber}</strong> in the payment note. <strong style="color: #dc2626;">DO NOT INCLUDE PRODUCT NAMES OR ANY MENTION OF PEPTIDES.</strong></li>
						</ol>
					</div>
					<div style="background-color: #fef3c7; border: 1px solid #fbbf24; padding: 15px; margin: 20px 0; border-radius: 5px;">
						<p style="margin: 0; color: #92400e;">
							<strong>Important:</strong> Please include your order number <strong>${orderNumber}</strong> in the payment note and send exactly <strong>$${totalFormatted}</strong> to ensure prompt processing.
						</p>
					</div>
					<p style="color: #666; font-size: 14px; margin-top: 30px;">
						Once we receive your payment, your order will be processed within 1-2 business days.
						You&apos;ll receive tracking information via email once your order ships.
					</p>
					<p style="color: #666; font-size: 14px; margin-top: 20px;">
						Questions? Contact us at contact@enhancedchem.com
					</p>
				</div>
			`
		}
	}

	return templates[method as keyof typeof templates] || templates.zelle
}

export async function POST(request: NextRequest) {
	try {
		let body
		try {
			body = await request.json()
		} catch (parseError) {
			console.error('Error parsing request JSON:', parseError)
			return NextResponse.json(
				{ error: 'Invalid request format. Please check your input data.' },
				{ status: 400 }
			)
		}
		
		const { email, paymentMethod, orderTotal, items, shippingAddress } = body

		if (!email || !paymentMethod) {
			return NextResponse.json(
				{ error: 'Email and payment method are required' },
				{ status: 400 }
			)
		}

		// Shipping address is required for all orders (needed for shipping)
		if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.addressLine1 || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode || !shippingAddress.country) {
			return NextResponse.json(
				{ error: 'Complete shipping address is required' },
				{ status: 400 }
			)
		}

		// Generate sequential order number starting from #1000
		const orderNumber = await getNextOrderNumber()

		// Save order to database/file storage
		try {
			await saveOrder({
				orderNumber: orderNumber,
				email: email,
				paymentMethod: paymentMethod,
				orderTotal: orderTotal,
				items: items,
				shippingAddress: shippingAddress
			})
		} catch (error) {
			console.error('Error saving order:', error)
			// Continue anyway - order number already generated
		}

		// Get payment instructions template
		const { subject, html } = getPaymentInstructions(paymentMethod, orderNumber, orderTotal, items, shippingAddress)

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
		// For testing: Use onboarding@resend.dev and only send to verified email
		// For production: Verify your domain in Resend
		const fromEmail = process.env.RESEND_FROM_EMAIL || 'Enhanced Chem <onboarding@resend.dev>'
		
		// Try to send email, but don't fail the order if email fails
		let emailSent = false
		let emailError = null
		
		try {
			const result = await resend.emails.send({
				from: fromEmail,
				to: email,
				subject: subject,
				html: html,
			})

			if (result.error) {
				console.error('Error sending email:', result.error)
				emailError = result.error
				// Don't throw - still return success with order number
			} else {
				emailSent = true
				console.log('Email sent successfully. ID:', result.data?.id)
				// Log the email ID - this should appear in Resend dashboard
			}
		} catch (err) {
			console.error('Exception sending email:', err)
			emailError = err as Error
		}

		// Always return success with order number, even if email failed
		// The order is still created, email is just a convenience
		return NextResponse.json({
			success: true,
			orderNumber: orderNumber,
			emailSent: emailSent,
			...(emailError && { emailWarning: 'Email could not be sent. Please contact support for payment instructions.' })
		})

	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
		const errorStack = error instanceof Error ? error.stack : undefined
		
		console.error('Error in send-payment-email route:', {
			message: errorMessage,
			stack: errorStack,
			timestamp: new Date().toISOString()
		})
		
		// Return specific error message instead of generic "Internal server error"
		return NextResponse.json(
			{ 
				error: 'Failed to process payment email request',
				details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
			},
			{ status: 500 }
		)
	}
}