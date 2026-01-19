import { NextRequest, NextResponse } from 'next/server'

// Simple endpoint to check Redis connection and view stored data
export async function GET(request: NextRequest) {
	// Password protection
	const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
	const authHeader = request.headers.get('authorization')
	const providedPassword = authHeader?.replace('Bearer ', '')
	
	// Check password (simple authentication)
	if (!providedPassword || providedPassword !== adminPassword) {
		return NextResponse.json(
			{ error: 'Unauthorized - Admin password required' },
			{ status: 401 }
		)
	}
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
			const orders: Array<{orderNumber: string, email: string, timestamp: string, status: string}> = ordersStr ? JSON.parse(ordersStr) : []
			const recentOrders = orders.slice(-10) // Last 10 orders
			
			// Close connection
			await redis.quit()

			return NextResponse.json({
				connected: true,
				message: 'Redis connected successfully',
				data: {
					lastOrderNumber: lastOrderNumber || 'Not set (will start at #1000)',
					totalOrders: orders.length,
					recentOrders: recentOrders.map((order) => ({
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
		} catch {
			return NextResponse.json(
				{ error: 'Internal server error' },
				{ status: 500 }
			)
		}
}
