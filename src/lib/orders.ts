// Order tracking utilities
// Note: For production, this should use a database (PostgreSQL, MongoDB, etc.)
// For now, using a simple JSON file approach (works locally only)
// On Vercel/serverless, file writes are not possible, so we use Redis for persistence

import fs from 'fs'
import path from 'path'

// Dynamically import Redis client (only if configured)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let redisClient: any = null
const redisConfigured = !!process.env.REDIS_URL

// Get Redis client lazily (only when needed)
async function getRedisClient() {
	if (!redisConfigured || redisClient !== null) {
		return redisClient
	}
	
	try {
		// Use ioredis for Redis connection
		const Redis = (await import('ioredis')).default
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		redisClient = new Redis(process.env.REDIS_URL!) as any
		return redisClient
	} catch {
		console.warn('Redis not available, will use fallback storage')
		redisClient = null
		return null
	}
}

// Check if we're in a serverless environment (Vercel)
const isServerless = process.env.VERCEL === '1' || !fs.existsSync || typeof fs.mkdirSync === 'undefined'

// Use absolute path for data directory (only works locally)
const ORDERS_FILE = isServerless ? null : path.resolve(process.cwd(), 'data', 'orders.json')
const ORDERS_DIR = isServerless ? null : path.resolve(process.cwd(), 'data')

// In-memory fallback for serverless environments without KV
const inMemoryOrders: { lastOrderNumber: number; orders: Order[] } = {
	lastOrderNumber: 999,
	orders: []
}

// Ensure data directory exists (only locally)
if (!isServerless && ORDERS_DIR) {
	try {
		if (!fs.existsSync(ORDERS_DIR)) {
			fs.mkdirSync(ORDERS_DIR, { recursive: true })
		}
	} catch {
		console.warn('Could not create data directory, using in-memory storage')
	}
}

export interface Order {
	orderNumber: string
	email: string
	paymentMethod: string
	orderTotal: number
	items: Array<{ name: string; quantity: number; price: number }>
	shippingAddress?: {
		fullName: string
		addressLine1: string
		addressLine2?: string
		city: string
		state: string
		zipCode: string
		country: string
	}
	timestamp: string
	status: 'pending' | 'paid' | 'shipped' | 'completed'
}

// Initialize orders file if it doesn't exist (local only)
function initializeOrdersFile() {
	if (isServerless || !ORDERS_FILE || !ORDERS_DIR) {
		return // Skip file operations in serverless
	}
	
	try {
		// Ensure directory exists
		if (!fs.existsSync(ORDERS_DIR)) {
			fs.mkdirSync(ORDERS_DIR, { recursive: true })
		}
		
		// Create file if it doesn't exist
		if (!fs.existsSync(ORDERS_FILE)) {
			const initialData = {
				lastOrderNumber: 999, // Next order will be #1000
				orders: []
			}
			fs.writeFileSync(ORDERS_FILE, JSON.stringify(initialData, null, 2), { mode: 0o644 })
		}
	} catch {
		console.warn('Could not initialize orders file, using in-memory storage')
		// Don't throw - fall back to in-memory
	}
}

// Get next order number
export async function getNextOrderNumber(): Promise<string> {
	// Try Redis first (for production/serverless)
	if (redisConfigured) {
		const redis = await getRedisClient()
		if (redis) {
			try {
				// Get current order number from Redis, or start at 999 (next will be 1000)
				const lastOrderNumberStr = await redis.get('lastOrderNumber')
				let lastOrderNumber = lastOrderNumberStr ? parseInt(lastOrderNumberStr, 10) : 999
				
				if (isNaN(lastOrderNumber)) {
					lastOrderNumber = 999
				}
				
				// Increment and save back to Redis
				const nextNumber = lastOrderNumber + 1
				await redis.set('lastOrderNumber', nextNumber.toString())
				
				return `#${nextNumber}`
			} catch (error) {
				console.warn('Error using Redis for order number, falling back:', error)
				// Fall through to file-based or in-memory
			}
		}
	}
	
	// Use file-based storage for local development
	if (!isServerless && ORDERS_FILE) {
		initializeOrdersFile()
		
		try {
			if (!fs.existsSync(ORDERS_FILE)) {
				// Fallback to in-memory
				inMemoryOrders.lastOrderNumber += 1
				return `#${inMemoryOrders.lastOrderNumber}`
			}
			
			const data = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'))
			const nextNumber = data.lastOrderNumber + 1
			
			// Update last order number
			data.lastOrderNumber = nextNumber
			fs.writeFileSync(ORDERS_FILE, JSON.stringify(data, null, 2))
			
			return `#${nextNumber}`
		} catch (error) {
			console.warn('Error getting next order number from file, using in-memory:', error)
			// Fall through to in-memory
		}
	}
	
	// Fallback to in-memory (for serverless without KV configured)
	inMemoryOrders.lastOrderNumber += 1
	return `#${inMemoryOrders.lastOrderNumber}`
}

// Save order
export async function saveOrder(order: Omit<Order, 'timestamp' | 'status'>): Promise<Order> {
	const newOrder: Order = {
		...order,
		timestamp: new Date().toISOString(),
		status: 'pending'
	}
	
	// Try Redis first (for production/serverless)
	if (redisConfigured) {
		const redis = await getRedisClient()
		if (redis) {
			try {
				// Get existing orders from Redis
				const ordersStr = await redis.get('orders')
				const existingOrders: Order[] = ordersStr ? JSON.parse(ordersStr) : []
				existingOrders.push(newOrder)
				// Store orders in Redis (limit to last 1000 orders to avoid size issues)
				const ordersToStore = existingOrders.slice(-1000)
				await redis.set('orders', JSON.stringify(ordersToStore))
				return newOrder
			} catch (error) {
				console.warn('Error saving order to Redis, falling back:', error)
				// Fall through to file-based or in-memory
			}
		}
	}
	
	// Use file-based storage for local development
	if (!isServerless && ORDERS_FILE) {
		initializeOrdersFile()
		
		try {
			if (!fs.existsSync(ORDERS_FILE)) {
				// Fallback to in-memory
				inMemoryOrders.orders.push(newOrder)
				return newOrder
			}
			
			const data = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'))
			data.orders.push(newOrder)
			fs.writeFileSync(ORDERS_FILE, JSON.stringify(data, null, 2))
			
			return newOrder
		} catch (error) {
			console.warn('Error saving order to file, using in-memory:', error)
			// Fall through to in-memory
		}
	}
	
	// Fallback to in-memory (for serverless without KV configured)
	inMemoryOrders.orders.push(newOrder)
	console.warn('Order saved to in-memory storage (not persistent). Set up Vercel KV for persistence.')
	return newOrder
}

// Get all orders
export async function getAllOrders(): Promise<Order[]> {
	// Try Redis first (for production/serverless)
	if (redisConfigured) {
		const redis = await getRedisClient()
		if (redis) {
			try {
				const ordersStr = await redis.get('orders')
				const orders: Order[] = ordersStr ? JSON.parse(ordersStr) : []
				return orders.sort((a: Order, b: Order) => 
					new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
				)
			} catch (error) {
				console.warn('Error getting orders from Redis, falling back:', error)
				// Fall through to file-based or in-memory
			}
		}
	}
	
	// Use file-based storage for local development
	if (!isServerless && ORDERS_FILE) {
		try {
			initializeOrdersFile()
			
			if (!fs.existsSync(ORDERS_FILE)) {
				return []
			}
			
			const fileContent = fs.readFileSync(ORDERS_FILE, 'utf8')
			const data = JSON.parse(fileContent)
			
			// Return orders in reverse chronological order (newest first)
			return (data.orders || []).sort((a: Order, b: Order) => 
				new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
			)
		} catch (error) {
			console.warn('Error getting orders from file, using in-memory:', error)
			// Fall through to in-memory
		}
	}
	
	// Fallback to in-memory (for serverless without KV configured)
	return inMemoryOrders.orders.sort((a: Order, b: Order) => 
		new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
	)
}

// Get order by order number
export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
	const orders = await getAllOrders()
	return orders.find(order => order.orderNumber === orderNumber) || null
}

// Update order status
export async function updateOrderStatus(orderNumber: string, status: Order['status']): Promise<boolean> {
	// Try Redis first (for production/serverless)
	if (redisConfigured) {
		const redis = await getRedisClient()
		if (redis) {
			try {
				const ordersStr = await redis.get('orders')
				const orders: Order[] = ordersStr ? JSON.parse(ordersStr) : []
				const orderIndex = orders.findIndex((o: Order) => o.orderNumber === orderNumber)
				
				if (orderIndex !== -1) {
					orders[orderIndex].status = status
					await redis.set('orders', JSON.stringify(orders))
					return true
				}
				return false
			} catch (error) {
				console.warn('Error updating order status in Redis, falling back:', error)
				// Fall through to file-based or in-memory
			}
		}
	}
	
	// Use file-based storage for local development
	if (!isServerless && ORDERS_FILE) {
		initializeOrdersFile()
		
		try {
			if (!fs.existsSync(ORDERS_FILE)) {
				// Fallback to in-memory
				const orderIndex = inMemoryOrders.orders.findIndex((o: Order) => o.orderNumber === orderNumber)
				if (orderIndex !== -1) {
					inMemoryOrders.orders[orderIndex].status = status
					return true
				}
				return false
			}
			
			const data = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'))
			const orderIndex = data.orders.findIndex((o: Order) => o.orderNumber === orderNumber)
			
			if (orderIndex !== -1) {
				data.orders[orderIndex].status = status
				fs.writeFileSync(ORDERS_FILE, JSON.stringify(data, null, 2))
				return true
			}
			return false
		} catch (error) {
			console.warn('Error updating order status in file, using in-memory:', error)
			// Fall through to in-memory
		}
	}
	
	// Fallback to in-memory (for serverless without KV configured)
	const orderIndex = inMemoryOrders.orders.findIndex((o: Order) => o.orderNumber === orderNumber)
	if (orderIndex !== -1) {
		inMemoryOrders.orders[orderIndex].status = status
		return true
	}
	return false
}
