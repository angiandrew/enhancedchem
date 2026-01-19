import { NextRequest, NextResponse } from 'next/server'

// Simple endpoint to check Redis connection and view stored data
export async function GET(request: NextRequest) {
	// Password protection
	const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
	const authHeader = request.headers.get('authorization')
	const providedPassword = authHeader?.replace('Bearer ', '')
	
	// Debug logging (remove in production if needed)
	if (process.env.NODE_ENV === 'development') {
		console.log('Admin password check:', {
			hasEnvVar: !!process.env.ADMIN_PASSWORD,
			envVarLength: process.env.ADMIN_PASSWORD?.length,
			providedLength: providedPassword?.length,
			match: providedPassword === adminPassword
		})
	}
	
	// Check password (simple authentication)
	if (!providedPassword || providedPassword !== adminPassword) {
		return NextResponse.json(
			{ error: 'Unauthorized - Admin password required or incorrect' },
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
			const redis = new Redis(process.env.REDIS_URL!, {
				connectTimeout: 5000, // 5 second timeout
				commandTimeout: 5000, // 5 second timeout per command
				retryStrategy: () => null, // Don't retry on failure
			})

			// Set timeout for connection
			const connectionPromise = redis.connect()
			const timeoutPromise = new Promise((_, reject) => 
				setTimeout(() => reject(new Error('Redis connection timeout')), 5000)
			)
			
			await Promise.race([connectionPromise, timeoutPromise])

			// Get the last order number with timeout
			const lastOrderNumberPromise = redis.get('lastOrderNumber')
			const lastOrderNumber = await Promise.race([
				lastOrderNumberPromise,
				new Promise<null>((resolve) => setTimeout(() => resolve(null), 5000))
			])
			
			// Get orders with timeout
			const ordersStrPromise = redis.get('orders')
			const ordersStr = await Promise.race([
				ordersStrPromise,
				new Promise<string | null>((resolve) => setTimeout(() => resolve(null), 5000))
			]) as string | null
			
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
