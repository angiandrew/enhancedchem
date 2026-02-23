import { NextRequest, NextResponse } from 'next/server'
import { getOrderByNumber } from '@/lib/orders'
import { buildPaymentReminderEmail } from '@/lib/reminder-email'
import type { Resend } from 'resend'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Dev-only: send a single payment reminder email for a given order and stage (1–4).
 * Use this to preview all 4 stages without waiting 1d/2d/3d/7d.
 *
 * GET /api/dev/send-reminder-preview?orderNumber=4505&stage=1
 * (Use order number without # so the URL works; we look up #4505.)
 * Optional: &to=your@email.com to override recipient (default: order's email)
 *
 * Only works when NODE_ENV !== 'production'.
 */
export async function GET(request: NextRequest) {
	if (process.env.NODE_ENV === 'production') {
		return NextResponse.json({ error: 'Not available in production' }, { status: 404 })
	}

	const orderNumber = request.nextUrl.searchParams.get('orderNumber')
	const stageParam = request.nextUrl.searchParams.get('stage')
	const overrideTo = request.nextUrl.searchParams.get('to')

	if (!orderNumber || !stageParam) {
		return NextResponse.json(
			{ error: 'Query params required: orderNumber (e.g. 4505) and stage (1, 2, 3, or 4). Use number without # so the URL works.' },
			{ status: 400 }
		)
	}

	const stage = parseInt(stageParam, 10)
	if (![1, 2, 3, 4].includes(stage)) {
		return NextResponse.json({ error: 'stage must be 1, 2, 3, or 4' }, { status: 400 })
	}

	// Normalize: store uses "#4505", URL should use 4505 (no #) so the hash isn't stripped
	const normalizedOrderNumber = orderNumber.trim().startsWith('#') ? orderNumber.trim() : `#${orderNumber.trim()}`
	const order = await getOrderByNumber(normalizedOrderNumber)
	if (!order) {
		return NextResponse.json({ error: `Order not found: ${normalizedOrderNumber}` }, { status: 404 })
	}

	const { subject, html } = buildPaymentReminderEmail(order, stage)
	const toEmail = overrideTo?.trim() || order.email

	let resend: Resend | null = null
	try {
		const { Resend: ResendClass } = await import('resend')
		resend = new ResendClass(process.env.RESEND_API_KEY || '')
	} catch {
		// ignore
	}

	if (!resend || !process.env.RESEND_API_KEY) {
		return NextResponse.json(
			{ error: 'Resend not configured. Set RESEND_API_KEY in .env.local' },
			{ status: 500 }
		)
	}

	// Dev preview: use Resend's verified dev sender so it works locally even if RESEND_FROM_EMAIL differs from production
	const fromEmail = 'Enhanced Chem <onboarding@resend.dev>'

	try {
		const result = await resend.emails.send({
			from: fromEmail,
			to: toEmail,
			subject,
			html,
		})
		if (result.error) {
			return NextResponse.json(
				{ error: 'Resend send failed', details: result.error },
				{ status: 500 }
			)
		}
		return NextResponse.json({
			success: true,
			message: `Stage ${stage} reminder sent to ${toEmail}`,
			orderNumber: order.orderNumber,
			stage,
			subject,
		})
	} catch (err) {
		console.error('send-reminder-preview error:', err)
		return NextResponse.json(
			{ error: err instanceof Error ? err.message : 'Send failed' },
			{ status: 500 }
		)
	}
}
