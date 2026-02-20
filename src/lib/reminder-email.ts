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
 * Stage 1 = 2h (gentle), 2 = 24h, 3 = 48h, 4 = 72h, 5 = 7d (final).
 */
export function buildPaymentReminderEmail(
	order: Order,
	stage: number
): { subject: string; html: string } {
	const orderNumber = order.orderNumber
	const totalFormatted = formatPrice(order.orderTotal)
	const methodLabel = paymentMethodLabel(order.paymentMethod)

	const stageCopy: Record<number, { subjectLine: string; intro: string }> = {
		1: {
			subjectLine: 'Complete your payment',
			intro: 'You started an order with us. Your order is ready — we just need payment to proceed.',
		},
		2: {
			subjectLine: 'Reminder: payment pending for your order',
			intro: 'A quick reminder: your order is still awaiting payment.',
		},
		3: {
			subjectLine: 'Your order is still waiting',
			intro: 'Your order is still pending payment. Complete payment to avoid delays.',
		},
		4: {
			subjectLine: 'Payment needed for your Enhanced Chem order',
			intro: 'We haven’t received payment yet. Please complete payment to avoid delays.',
		},
		5: {
			subjectLine: 'Last reminder: complete your payment',
			intro: 'This is a final reminder. Please complete payment to avoid delays.',
		},
	}

	const copy = stageCopy[stage] || stageCopy[1]

	const html = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
	<h1 style="color: #111; border-bottom: 2px solid #00d632; padding-bottom: 10px;">
		Payment reminder – Enhanced Chem
	</h1>
	<p style="font-size: 16px; color: #333; margin-top: 20px;">
		${copy.intro}
	</p>
	<div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 20px 0;">
		<p style="margin: 0 0 8px 0; color: #333;"><strong>Order:</strong> ${orderNumber}</p>
		<p style="margin: 0 0 8px 0; color: #333;"><strong>Amount due:</strong> $${totalFormatted}</p>
		<p style="margin: 0; color: #333;"><strong>Payment method:</strong> ${methodLabel}</p>
	</div>
	<p style="font-size: 16px; color: #333;">
		Please complete payment to avoid delays. Use the payment instructions from our original email, or contact us if you need them again.
	</p>
	<p style="color: #666; font-size: 14px; margin-top: 24px;">
		Questions? Contact us at <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>
	</p>
	<p style="color: #999; font-size: 12px; margin-top: 16px;">
		<a href="${SITE_URL}">Enhanced Chem</a>
	</p>
</div>
`.trim()

	const subject = `${copy.subjectLine} – ${orderNumber} – Enhanced Chem`
	return { subject, html }
}
