// Order tracking utilities
// Note: For production, this should use a database (PostgreSQL, MongoDB, etc.)
// For now, using a simple JSON file approach (works locally only)
// On Vercel/serverless, file writes are not possible, so we use Vercel KV for persistence

import fs from 'fs'
import path from 'path'

// Dynamically import Vercel KV (only if configured)
let kv: typeof import('@vercel/kv').kv | null = null
const kvConfigured = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)

// Get KV client lazily (only when needed)
async function getKVClient() {
	if (!kvConfigured || kv !== null) {
		return kv
	}
	
	try {
		// Use dynamic import instead of require
		const kvModule = await import('@vercel/kv')
		kv = kvModule.kv
		return kv
	} catch {
		console.warn('Vercel KV not available, will use fallback storage')
		kv = null
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
	// Try Vercel KV first (for production/serverless)
	if (kvConfigured) {
		const kvClient = await getKVClient()
		if (kvClient) {
			try {
				// Get current order number from KV, or start at 999 (next will be 1000)
				let lastOrderNumber = await kvClient.get<number>('lastOrderNumber')
				if (lastOrderNumber === null || lastOrderNumber === undefined) {
					lastOrderNumber = 999
				}
				
				// Increment and save back to KV
				const nextNumber = lastOrderNumber + 1
				await kvClient.set('lastOrderNumber', nextNumber)
				
				return `#${nextNumber}`
			} catch (error) {
				console.warn('Error using Vercel KV for order number, falling back:', error)
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
	
	// Try Vercel KV first (for production/serverless)
	if (kvConfigured) {
		const kvClient = await getKVClient()
		if (kvClient) {
			try {
				// Get existing orders from KV
				const existingOrders = await kvClient.get<Order[]>('orders') || []
				existingOrders.push(newOrder)
				// Store orders in KV (limit to last 1000 orders to avoid size issues)
				const ordersToStore = existingOrders.slice(-1000)
				await kvClient.set('orders', ordersToStore)
				return newOrder
			} catch (error) {
				console.warn('Error saving order to Vercel KV, falling back:', error)
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
	// Try Vercel KV first (for production/serverless)
	if (kvConfigured) {
		const kvClient = await getKVClient()
		if (kvClient) {
			try {
				const orders = await kvClient.get<Order[]>('orders') || []
				return orders.sort((a: Order, b: Order) => 
					new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
				)
			} catch (error) {
				console.warn('Error getting orders from Vercel KV, falling back:', error)
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
	// Try Vercel KV first (for production/serverless)
	if (kvConfigured) {
		const kvClient = await getKVClient()
		if (kvClient) {
			try {
				const orders = await kvClient.get<Order[]>('orders') || []
				const orderIndex = orders.findIndex((o: Order) => o.orderNumber === orderNumber)
				
				if (orderIndex !== -1) {
					orders[orderIndex].status = status
					await kvClient.set('orders', orders)
					return true
				}
				return false
			} catch (error) {
				console.warn('Error updating order status in Vercel KV, falling back:', error)
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
