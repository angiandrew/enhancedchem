import { NextRequest, NextResponse } from 'next/server'
import { getAllOrders, updateOrderStatus } from '@/lib/orders'

// GET - Fetch all orders
export async function GET() {
	try {
		const orders = getAllOrders()
		return NextResponse.json({ success: true, orders })
	} catch (error) {
		console.error('Error fetching orders:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch orders' },
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

		const success = updateOrderStatus(orderNumber, status)
		
		if (success) {
			return NextResponse.json({ success: true })
		} else {
			return NextResponse.json(
				{ error: 'Order not found' },
				{ status: 404 }
			)
		}
	} catch (error) {
		console.error('Error updating order status:', error)
		return NextResponse.json(
			{ error: 'Failed to update order status' },
			{ status: 500 }
		)
	}
}
