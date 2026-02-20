import { NextRequest, NextResponse } from 'next/server'
import { getAllOrders, updateReminderStage } from '@/lib/orders'
import { buildPaymentReminderEmail } from '@/lib/reminder-email'
import type { Order } from '@/lib/orders'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const fetchCache = 'force-no-store'

/** Thresholds in ms: stage 0→1 at 1d, 1→2 at 2d, 2→3 at 3d, 3→4 at 7d (no 2h; Hobby cron runs once/day) */
const THRESHOLDS_MS = [
	24 * 60 * 60 * 1000,      // 1 day
	48 * 60 * 60 * 1000,      // 2 days
	72 * 60 * 60 * 1000,      // 3 days
	7 * 24 * 60 * 60 * 1000, // 7 days
]

/** Dev override: same 4 stages in minutes (2m, 5m, 8m, 15m) */
const THRESHOLDS_MS_DEV = [
	2 * 60 * 1000,   // 2m
	5 * 60 * 1000,   // 5m
	8 * 60 * 1000,   // 8m
	15 * 60 * 1000, // 15m
]

async function getResendClient() {
	try {
		const { Resend } = await import('resend')
		return new Resend(process.env.RESEND_API_KEY || '')
	} catch {
		return null
	}
}

function isCronAuthorized(request: NextRequest): boolean {
	const secret = process.env.CRON_SECRET
	if (!secret) return false
	const authHeader = request.headers.get('authorization')
	const bearer = authHeader?.replace(/^Bearer\s+/i, '').trim()
	return bearer === secret
}

export async function GET(request: NextRequest) {
	if (!isCronAuthorized(request)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const useDevThresholds =
		process.env.NODE_ENV !== 'production' &&
		request.nextUrl.searchParams.get('dev') === '1'

	const thresholds = useDevThresholds ? THRESHOLDS_MS_DEV : THRESHOLDS_MS

	let processed = 0
	let sent = 0

	try {
		const orders = await getAllOrders()
		const pending = orders.filter(
			(o: Order) => o.status === 'pending' && ((o.reminderStage ?? 0) < 4)
		)
		processed = pending.length

		const resend = await getResendClient()
		const fromEmail = process.env.RESEND_FROM_EMAIL || 'Enhanced Chem <onboarding@resend.dev>'

		if (!resend || !process.env.RESEND_API_KEY) {
			return NextResponse.json({
				success: true,
				processed,
				sent: 0,
				error: 'Resend not configured',
			})
		}

		const now = Date.now()
		const nowIso = new Date().toISOString()

		for (const order of pending) {
			const currentStage = order.reminderStage ?? 0
			const nextStage = currentStage + 1
			if (nextStage > 4) continue

			const createdAt = new Date(order.timestamp).getTime()
			const ageMs = now - createdAt
			const requiredMs = thresholds[currentStage]
			if (ageMs < requiredMs) continue

			const { subject, html } = buildPaymentReminderEmail(order, nextStage)

			try {
				await resend.emails.send({
					from: fromEmail,
					to: order.email,
					subject,
					html,
				})
			} catch (err) {
				console.error('Payment reminder send failed:', order.orderNumber, err)
				continue
			}

			const updated = await updateReminderStage(
				order.orderNumber,
				currentStage,
				nextStage,
				nowIso
			)
			if (updated) {
				sent += 1
			}
		}

		return NextResponse.json({ success: true, processed, sent })
	} catch (error) {
		console.error('Cron payment-reminders error:', error)
		return NextResponse.json(
			{
				success: false,
				processed,
				sent,
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		)
	}
}
