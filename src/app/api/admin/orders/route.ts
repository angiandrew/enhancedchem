import { NextRequest, NextResponse } from 'next/server'
import { getAllOrders, updateOrderStatus } from '@/lib/orders'

// Disable caching for this route
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const fetchCache = 'force-no-store'

// GET - Fetch all orders
export async function GET() {
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
	try {
		const body = await request.json()
		const { orderNumber, status } = body

		if (!orderNumber || !status) {
			return NextResponse.json(
				{ error: 'Order number and status are required' },
				{ status: 400 }
			)
		}

		const validStatuses = ['pending', 'paid', 'shipped', 'completed']
		if (!validStatuses.includes(status)) {
			return NextResponse.json(
				{ error: 'Invalid status' },
				{ status: 400 }
			)
		}

		const success = await updateOrderStatus(orderNumber, status)
		
		if (success) {
			return NextResponse.json({ success: true })
		} else {
			return NextResponse.json(
				{ error: 'Order not found' },
				{ status: 404 }
			)
		}
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
