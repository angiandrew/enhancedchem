import type { Order } from '@/lib/orders'

const SUPPORT_EMAIL = 'contact@enhancedchem.com'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

function formatPrice(price: number): string {
	return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function paymentMethodLabel(method: string): string {
	const m = (method || '').toLowerCase()
	if (m === 'zelle') return 'Zelle'
	if (m === 'cashapp') return 'CashApp'
	if (m === 'usdc' || m === 'usdt' || m === 'bitcoin') return method.toUpperCase()
	return method
}

/**
 * Build subject and HTML for a payment reminder email by stage.
 * Current schedule (order age since creation):
 * - Stage 1: ~12 hours
 * - Stage 2: ~2 days
 * - Stage 3: ~3 days
 * - Stage 4: ~4 days
 * - Stage 5: ~7 days (final, includes SAVE15 discount offer)
 */
export function buildPaymentReminderEmail(
	order: Order,
	stage: number
): { subject: string; html: string } {
	const orderNumber = order.orderNumber
	const totalFormatted = formatPrice(order.orderTotal)
	const methodLabel = paymentMethodLabel(order.paymentMethod)
	const customerName = order.shippingAddress?.fullName?.trim() || 'there'
	const paymentMethod = (order.paymentMethod || '').toLowerCase()

	// Order items table
	const itemsRows = (order.items || []).map((item) => {
		const lineTotal = item.price * item.quantity
		return `
			<tr style="border-bottom: 1px solid #e5e7eb;">
				<td style="padding: 8px 0; color: #333;">${item.name}</td>
				<td style="padding: 8px 0; text-align: center; color: #666;">${item.quantity}</td>
				<td style="padding: 8px 0; text-align: right; color: #333; font-weight: 600;">$${formatPrice(lineTotal)}</td>
			</tr>
		`
	}).join('')

	const shippingAddressBlock = order.shippingAddress
		? `
	<div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
		<h2 style="color: #9333ea; margin-top: 0; margin-bottom: 15px; font-size: 16px;">Shipping address</h2>
		<div style="color: #333; line-height: 1.7;">
			<div style="font-weight: 600; margin-bottom: 6px;">${order.shippingAddress.fullName}</div>
			<div>${order.shippingAddress.addressLine1}</div>
			${order.shippingAddress.addressLine2 ? `<div>${order.shippingAddress.addressLine2}</div>` : ''}
			<div>${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}</div>
			<div>${order.shippingAddress.country}</div>
		</div>
	</div>
	`
		: ''

	const stageCopy: Record<number, { subjectLine: string; intro: string; cta: string }> = {
		1: {
			subjectLine: 'Quick reminder: complete your payment',
			intro: `Hi ${customerName}, you started an order with us and we're still holding it — we just need payment to ship it. Your order summary is below.`,
			cta: 'Complete your payment using the instructions from the email we sent when you placed the order. If you need those instructions again, reply to this email and we\'ll resend them right away.',
		},
		2: {
			subjectLine: 'Your order is still awaiting payment',
			intro: `Hi ${customerName}, we haven't received payment for your order yet. Your items and total are below so you have everything in one place.`,
			cta: 'Please complete payment as soon as you can so we can ship your order. Use the payment details from your original order confirmation email, or contact us and we\'ll send them again.',
		},
		3: {
			subjectLine: 'Payment needed – your order is waiting',
			intro: `Hi ${customerName}, your order is still pending payment. We'd like to get it out to you — please complete payment when you can.`,
			cta: 'Pay using the method you chose (see below). If you\'ve already paid, please reply to this email with the date and method so we can match it and update your order.',
		},
		4: {
			subjectLine: 'Payment needed – your order will be closed soon',
			intro: `Hi ${customerName}, your order has been pending payment for several days. We\'ll need to close it soon if payment isn\'t received.`,
			cta: `If you'd like us to keep this order active, please complete payment using the instructions in this email or contact us at ${SUPPORT_EMAIL} so we can help.`,
		},
		5: {
			subjectLine: 'Final check-in: 15% off if you still want your order',
			intro: `Hi ${customerName}, we haven’t seen your payment come through and we’re not sure where you went — but if you still want to move forward, we’d love to help you finish on a better note.`,
			cta: `As a one-time courtesy, you can place a **new** order on our website and get **15% off** by using the promo code **SAVE15** at checkout. Your original pending order may be closed soon, but you’re welcome to reorder anytime at ${SITE_URL} with this code.`,
		},
	}

	const copy = stageCopy[stage] || stageCopy[1]

	// Payment method–specific instructions (short version, no QR codes)
	let paymentInstructions = ''
	if (paymentMethod === 'zelle') {
		paymentInstructions = `
	<div style="background-color: #f3f4f6; border-left: 4px solid #9333ea; padding: 15px; margin: 20px 0; border-radius: 6px;">
		<h2 style="color: #9333ea; margin-top: 0; margin-bottom: 10px; font-size: 15px;">How to complete your Zelle payment</h2>
		<ol style="color: #333; line-height: 1.7; font-size: 14px; padding-left: 20px; margin: 0;">
			<li>Open your Zelle app or your bank&apos;s Zelle section.</li>
			<li>Send payment to: <strong>enhancedchem4@gmail.com</strong>.</li>
			<li>Send the exact amount: <strong style="color: #9333ea;">$${totalFormatted}</strong>.</li>
			<li>In the memo/note field, include only your order number <strong>${orderNumber}</strong>. <strong style="color: #dc2626;">Do not include product names or any sensitive keywords.</strong></li>
		</ol>
	</div>`
	} else if (paymentMethod === 'cashapp') {
		paymentInstructions = `
	<div style="background-color: #f3f4f6; border-left: 4px solid #00d632; padding: 15px; margin: 20px 0; border-radius: 6px;">
		<h2 style="color: #00d632; margin-top: 0; margin-bottom: 10px; font-size: 15px;">How to complete your CashApp payment</h2>
		<ol style="color: #333; line-height: 1.7; font-size: 14px; padding-left: 20px; margin: 0;">
			<li>Open your CashApp app.</li>
			<li>Send payment to: <strong>$enhancedchem</strong>.</li>
			<li>Send the exact amount: <strong style="color: #00d632;">$${totalFormatted}</strong>.</li>
			<li>In the &quot;For&quot; field, include only your order number <strong>${orderNumber}</strong>. <strong style="color: #dc2626;">Do not include product names or any sensitive keywords.</strong></li>
		</ol>
	</div>`
	} else if (paymentMethod === 'usdc') {
		paymentInstructions = `
	<div style="background-color: #f3f4f6; border-left: 4px solid #2775ca; padding: 15px; margin: 20px 0; border-radius: 6px;">
		<h2 style="color: #2775ca; margin-top: 0; margin-bottom: 10px; font-size: 15px;">How to complete your USDC payment</h2>
		<ol style="color: #333; line-height: 1.7; font-size: 14px; padding-left: 20px; margin: 0;">
			<li>Open your crypto wallet (MetaMask, Coinbase Wallet, Trust Wallet, etc.).</li>
			<li>Send <strong>$${totalFormatted} USDC</strong> to this address:<br /><span style="font-family: monospace; font-size: 13px;">2GLM4Z18kCNSYb3stFoquDeQeK97gnPVE8LhikCS4sxH</span></li>
			<li>In the memo/note field, include only your order number <strong>${orderNumber}</strong>. <strong style="color: #dc2626;">Do not include product names or any sensitive keywords.</strong></li>
		</ol>
	</div>`
	} else if (paymentMethod === 'usdt') {
		paymentInstructions = `
	<div style="background-color: #f3f4f6; border-left: 4px solid #26a17b; padding: 15px; margin: 20px 0; border-radius: 6px;">
		<h2 style="color: #26a17b; margin-top: 0; margin-bottom: 10px; font-size: 15px;">How to complete your USDT payment</h2>
		<ol style="color: #333; line-height: 1.7; font-size: 14px; padding-left: 20px; margin: 0;">
			<li>Open your crypto wallet (MetaMask, Coinbase Wallet, Trust Wallet, etc.).</li>
			<li>Send <strong>$${totalFormatted} USDT</strong> to this address:<br /><span style="font-family: monospace; font-size: 13px;">0xFca3deb5b7AF0558d5CE6acE6C47AF2C2d4EAe97</span></li>
			<li>In the memo/note field, include only your order number <strong>${orderNumber}</strong>. <strong style="color: #dc2626;">Do not include product names or any sensitive keywords.</strong></li>
		</ol>
	</div>`
	} else if (paymentMethod === 'bitcoin') {
		paymentInstructions = `
	<div style="background-color: #f3f4f6; border-left: 4px solid #f97316; padding: 15px; margin: 20px 0; border-radius: 6px;">
		<h2 style="color: #f97316; margin-top: 0; margin-bottom: 10px; font-size: 15px;">How to complete your Bitcoin payment</h2>
		<ol style="color: #333; line-height: 1.7; font-size: 14px; padding-left: 20px; margin: 0;">
			<li>Open your Bitcoin wallet (Coinbase, Blockchain.com, Electrum, etc.).</li>
			<li>Send Bitcoin equal to <strong>$${totalFormatted}</strong> (including any surcharge) to:<br /><span style="font-family: monospace; font-size: 13px;">bc1qvrc9ls2kq2f2x9clva84n89qxe550k7e9r0lhl</span></li>
			<li>In the memo/note field, include only your order number <strong>${orderNumber}</strong>. <strong style="color: #dc2626;">Do not include product names or any sensitive keywords.</strong></li>
		</ol>
	</div>`
	} else {
		paymentInstructions = `
	<div style="background-color: #f3f4f6; border-left: 4px solid #6b7280; padding: 15px; margin: 20px 0; border-radius: 6px;">
		<h2 style="color: #111827; margin-top: 0; margin-bottom: 10px; font-size: 15px;">How to complete your payment</h2>
		<p style="color: #333; font-size: 14px; line-height: 1.7; margin: 0;">
			Use your selected payment method to send exactly <strong>$${totalFormatted}</strong> and include only your order number <strong>${orderNumber}</strong> in the memo/note field. If you need help, reply to this email and we&apos;ll walk you through it.
		</p>
	</div>`
	}

	const html = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
	<h1 style="color: #111; border-bottom: 2px solid #00d632; padding-bottom: 10px;">
		Payment reminder – Enhanced Chem
	</h1>
	<p style="font-size: 16px; color: #333; margin-top: 20px; line-height: 1.6;">
		${copy.intro}
	</p>
	<div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
		<h2 style="color: #00d632; margin-top: 0; margin-bottom: 15px; font-size: 16px;">Order ${orderNumber}</h2>
		<table style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
			<thead>
				<tr style="border-bottom: 2px solid #00d632;">
					<th style="padding: 8px 0; text-align: left; color: #666; font-size: 13px; font-weight: 600;">Item</th>
					<th style="padding: 8px 0; text-align: center; color: #666; font-size: 13px; font-weight: 600;">Qty</th>
					<th style="padding: 8px 0; text-align: right; color: #666; font-size: 13px; font-weight: 600;">Price</th>
				</tr>
			</thead>
			<tbody>
				${itemsRows}
			</tbody>
		</table>
		<div style="border-top: 2px solid #00d632; padding-top: 12px; margin-top: 12px;">
			<div style="display: flex; justify-content: space-between; font-size: 17px; font-weight: bold; color: #00d632;">
				<span>Total due</span>
				<span>$${totalFormatted}</span>
			</div>
			<p style="margin: 8px 0 0 0; color: #666; font-size: 13px;">Payment method: ${methodLabel}</p>
		</div>
	</div>
	${shippingAddressBlock}
	${paymentInstructions}
	<p style="font-size: 15px; color: #333; line-height: 1.6;">
		${copy.cta}
	</p>
	<p style="color: #666; font-size: 14px; margin-top: 24px;">
		Questions? Reply to this email or contact us at <a href="mailto:${SUPPORT_EMAIL}" style="color: #00d632;">${SUPPORT_EMAIL}</a>.
	</p>
	<p style="color: #999; font-size: 12px; margin-top: 16px;">
		<a href="${SITE_URL}" style="color: #999;">Enhanced Chem</a>
	</p>
</div>
`.trim()

	const subject = `${copy.subjectLine} – ${orderNumber}`
	return { subject, html }
}
