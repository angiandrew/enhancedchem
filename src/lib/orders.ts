// Order tracking utilities
// Note: For production, this should use a database (PostgreSQL, MongoDB, etc.)
// For now, using a simple JSON file approach (works locally only)
// On Vercel/serverless, file writes are not possible, so we use fallback methods

import fs from 'fs'
import path from 'path'

// Check if we're in a serverless environment (Vercel)
const isServerless = process.env.VERCEL === '1' || !fs.existsSync || typeof fs.mkdirSync === 'undefined'

// Use absolute path for data directory (only works locally)
const ORDERS_FILE = isServerless ? null : path.resolve(process.cwd(), 'data', 'orders.json')
const ORDERS_DIR = isServerless ? null : path.resolve(process.cwd(), 'data')

// In-memory fallback for serverless environments
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
	} catch (error) {
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
export function getNextOrderNumber(): string {
	if (isServerless || !ORDERS_FILE) {
		// Use in-memory counter for serverless
		inMemoryOrders.lastOrderNumber += 1
		return `#${inMemoryOrders.lastOrderNumber}`
	}
	
	initializeOrdersFile()
	
	try {
		if (!ORDERS_FILE || !fs.existsSync(ORDERS_FILE)) {
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
		console.warn('Error getting next order number, using in-memory:', error)
		// Fallback to in-memory
		inMemoryOrders.lastOrderNumber += 1
		return `#${inMemoryOrders.lastOrderNumber}`
	}
}

// Save order
export function saveOrder(order: Omit<Order, 'timestamp' | 'status'>): Order {
	const newOrder: Order = {
		...order,
		timestamp: new Date().toISOString(),
		status: 'pending'
	}
	
	if (isServerless || !ORDERS_FILE) {
		// Use in-memory storage for serverless
		inMemoryOrders.orders.push(newOrder)
		console.warn('Order saved to in-memory storage (not persistent in serverless)')
		return newOrder
	}
	
	initializeOrdersFile()
	
	try {
		if (!ORDERS_FILE || !fs.existsSync(ORDERS_FILE)) {
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
		// Fallback to in-memory - don't throw
		inMemoryOrders.orders.push(newOrder)
		return newOrder
	}
}

// Get all orders
export function getAllOrders(): Order[] {
	if (isServerless || !ORDERS_FILE) {
		// Return in-memory orders for serverless
		return inMemoryOrders.orders.sort((a: Order, b: Order) => 
			new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
		)
	}
	
	try {
		initializeOrdersFile()
		
		if (!ORDERS_FILE || !fs.existsSync(ORDERS_FILE)) {
			return []
		}
		
		const fileContent = fs.readFileSync(ORDERS_FILE, 'utf8')
		const data = JSON.parse(fileContent)
		
		// Return orders in reverse chronological order (newest first)
		return (data.orders || []).sort((a: Order, b: Order) => 
			new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
		)
	} catch (error) {
		console.warn('Error getting orders, using in-memory:', error)
		// Return in-memory orders as fallback
		return inMemoryOrders.orders.sort((a: Order, b: Order) => 
			new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
		)
	}
}

// Get order by order number
export function getOrderByNumber(orderNumber: string): Order | null {
	const orders = getAllOrders()
	return orders.find(order => order.orderNumber === orderNumber) || null
}

// Update order status
export function updateOrderStatus(orderNumber: string, status: Order['status']): boolean {
	if (isServerless || !ORDERS_FILE) {
		// Update in-memory orders
		const orderIndex = inMemoryOrders.orders.findIndex((o: Order) => o.orderNumber === orderNumber)
		if (orderIndex !== -1) {
			inMemoryOrders.orders[orderIndex].status = status
			return true
		}
		return false
	}
	
	initializeOrdersFile()
	
	try {
		if (!ORDERS_FILE || !fs.existsSync(ORDERS_FILE)) {
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
		console.warn('Error updating order status, using in-memory:', error)
		// Fallback to in-memory
		const orderIndex = inMemoryOrders.orders.findIndex((o: Order) => o.orderNumber === orderNumber)
		if (orderIndex !== -1) {
			inMemoryOrders.orders[orderIndex].status = status
			return true
		}
		return false
	}
}
