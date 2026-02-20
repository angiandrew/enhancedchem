import { NextRequest, NextResponse } from 'next/server'
import { setReminderStageForAllPending } from '@/lib/orders'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const fetchCache = 'force-no-store'

const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

function isAuthorized(request: NextRequest): boolean {
	const authHeader = request.headers.get('authorization')
	const providedPassword = authHeader?.replace(/^Bearer\s+/i, '').trim()
	return !!providedPassword && providedPassword === adminPassword
}

/**
 * One-time: set reminderStage=999 for all pending orders so they never get reminder emails.
 * Call this once before adding CRON_SECRET / enabling the payment-reminders cron.
 * Then remove this route.
 */
export async function POST(request: NextRequest) {
	if (!isAuthorized(request)) {
		return NextResponse.json(
			{ error: 'Unauthorized - Admin password required' },
			{ status: 401 }
		)
	}
	try {
		const updated = await setReminderStageForAllPending(999)
		return NextResponse.json({ success: true, updated })
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error'
		console.error('disable-reminders error:', error)
		return NextResponse.json(
			{ error: 'Failed to disable reminders', details: message },
			{ status: 500 }
		)
	}
}
