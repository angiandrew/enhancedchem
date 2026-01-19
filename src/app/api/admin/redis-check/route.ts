import { NextResponse } from 'next/server'

// Simple endpoint to check Redis connection and view stored data
export async function GET() {
	try {
		const redisConfigured = !!process.env.REDIS_URL
		
		if (!redisConfigured) {
			return NextResponse.json({
				connected: false,
				message: 'Redis not configured - REDIS_URL not found',
				data: null
			})
		}

		// Try to connect and get data
		try {
			const Redis = (await import('ioredis')).default
			const redis = new Redis(process.env.REDIS_URL!)

			// Get the last order number
			const lastOrderNumber = await redis.get('lastOrderNumber')
			
			// Get orders (limit to last 10 for display)
			const ordersStr = await redis.get('orders')
			const orders = ordersStr ? JSON.parse(ordersStr) : []
			const recentOrders = orders.slice(-10) // Last 10 orders
			
			// Close connection
			await redis.quit()

			return NextResponse.json({
				connected: true,
				message: 'Redis connected successfully',
				data: {
					lastOrderNumber: lastOrderNumber || 'Not set (will start at #1000)',
					totalOrders: orders.length,
					recentOrders: recentOrders.map((order: any) => ({
						orderNumber: order.orderNumber,
						email: order.email,
						timestamp: order.timestamp,
						status: order.status
					}))
				}
			})
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error'
			return NextResponse.json({
				connected: false,
				message: `Redis connection error: ${errorMessage}`,
				data: null
			})
		}
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
