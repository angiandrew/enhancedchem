import { NextRequest, NextResponse } from 'next/server'
import { markOrdersAsPaidUpTo } from '@/lib/orders'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const fetchCache = 'force-no-store'

const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

function isAuthorized(request: NextRequest): boolean {
	const authHeader = request.headers.get('authorization')
	const providedPassword = authHeader?.replace('Bearer ', '')
	return !!providedPassword && providedPassword === adminPassword
}

/**
 * POST /api/admin/orders/mark-paid-up-to?upTo=4510
 * One-time bulk: mark every order with order number <= upTo as paid (and stop reminder emails).
 * Requires Authorization: Bearer <ADMIN_PASSWORD>.
 */
export async function POST(request: NextRequest) {
	if (!isAuthorized(request)) {
		return NextResponse.json(
			{ error: 'Unauthorized - Admin password required' },
			{ status: 401 }
		)
	}

	const upToParam = request.nextUrl.searchParams.get('upTo')
	const upTo = upToParam ? parseInt(upToParam, 10) : NaN
	if (!Number.isFinite(upTo) || upTo < 0) {
		return NextResponse.json(
			{ error: 'Query parameter "upTo" required and must be a non-negative number (e.g. 4510)' },
			{ status: 400 }
		)
	}

	try {
		const { updated } = await markOrdersAsPaidUpTo(upTo)
		return NextResponse.json({
			success: true,
			updated,
			message: `Marked ${updated} order(s) with order number ≤ ${upTo} as paid. Reminder emails will no longer be sent for those orders.`,
		})
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error'
		console.error('Error in mark-paid-up-to:', error)
		return NextResponse.json(
			{ error: 'Failed to update orders', ...(process.env.NODE_ENV === 'development' && { details: message }) },
			{ status: 500 }
		)
	}
}
