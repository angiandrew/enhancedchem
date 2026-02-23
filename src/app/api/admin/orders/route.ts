import { NextRequest, NextResponse } from 'next/server'
import { getAllOrders, updateOrderStatus, setOrderTestFlag } from '@/lib/orders'

// Disable caching for this route
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const fetchCache = 'force-no-store'

const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

function isAuthorized(request: NextRequest): boolean {
	const authHeader = request.headers.get('authorization')
	const providedPassword = authHeader?.replace('Bearer ', '')
	return !!providedPassword && providedPassword === adminPassword
}

// GET - Fetch all orders
export async function GET(request: NextRequest) {
	if (!isAuthorized(request)) {
		return NextResponse.json(
			{ error: 'Unauthorized - Admin password required' },
			{ status: 401 }
		)
	}
	try {
		const orders = await getAllOrders()
		return NextResponse.json({ success: true, orders })
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error'
		console.error('Error fetching orders:', error)
		return NextResponse.json(
			{
				error: 'Failed to fetch orders',
				...(process.env.NODE_ENV === 'development' && { details: message }),
			},
			{ status: 500 }
		)
	}
}

// PATCH - Update order status
export async function PATCH(request: NextRequest) {
	if (!isAuthorized(request)) {
		return NextResponse.json(
			{ error: 'Unauthorized - Admin password required' },
			{ status: 401 }
		)
	}
	try {
		const body = await request.json()
		const { orderNumber, status, isTest } = body

		if (!orderNumber || (status === undefined && isTest === undefined)) {
			return NextResponse.json(
				{ error: 'Order number and at least one of status or isTest are required' },
				{ status: 400 }
			)
		}

		if (status !== undefined) {
			const validStatuses = ['pending', 'paid', 'shipped', 'completed']
			if (!validStatuses.includes(status)) {
				return NextResponse.json(
					{ error: 'Invalid status' },
					{ status: 400 }
				)
			}
			const success = await updateOrderStatus(orderNumber, status)
			if (!success) {
				return NextResponse.json(
					{ error: 'Order not found' },
					{ status: 404 }
				)
			}
		}

		if (isTest !== undefined) {
			const success = await setOrderTestFlag(orderNumber, !!isTest)
			if (!success) {
				return NextResponse.json(
					{ error: 'Order not found' },
					{ status: 404 }
				)
			}
		}

		return NextResponse.json({ success: true })
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error'
		console.error('Error updating order status:', error)
		return NextResponse.json(
			{
				error: 'Failed to update order status',
				...(process.env.NODE_ENV === 'development' && { details: message }),
			},
			{ status: 500 }
		)
	}
}
