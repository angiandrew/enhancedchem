// Order tracking utilities
// Note: For production, this should use a database (PostgreSQL, MongoDB, etc.)
// For now, using a simple JSON file approach

import fs from 'fs'
import path from 'path'

// Use absolute path for data directory
// This ensures it works in both development and production
const ORDERS_FILE = path.resolve(process.cwd(), 'data', 'orders.json')
const ORDERS_DIR = path.resolve(process.cwd(), 'data')

// Ensure data directory exists
if (!fs.existsSync(ORDERS_DIR)) {
	fs.mkdirSync(ORDERS_DIR, { recursive: true })
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

// Initialize orders file if it doesn't exist
function initializeOrdersFile() {
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
	} catch (error) {
		console.error('Error initializing orders file:', error)
		throw error
	}
}

// Get next order number
export function getNextOrderNumber(): string {
	initializeOrdersFile()
	
	try {
		const data = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'))
		const nextNumber = data.lastOrderNumber + 1
		
		// Update last order number
		data.lastOrderNumber = nextNumber
		fs.writeFileSync(ORDERS_FILE, JSON.stringify(data, null, 2))
		
		return `#${nextNumber}`
	} catch (error) {
		console.error('Error getting next order number:', error)
		// Fallback: start from 1000
		const fallbackData = {
			lastOrderNumber: 1000,
			orders: []
		}
		fs.writeFileSync(ORDERS_FILE, JSON.stringify(fallbackData, null, 2))
		return '#1000'
	}
}

// Save order
export function saveOrder(order: Omit<Order, 'timestamp' | 'status'>): Order {
	initializeOrdersFile()
	
	try {
		const data = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'))
		
		const newOrder: Order = {
			...order,
			timestamp: new Date().toISOString(),
			status: 'pending'
		}
		
		data.orders.push(newOrder)
		fs.writeFileSync(ORDERS_FILE, JSON.stringify(data, null, 2))
		
		return newOrder
	} catch (error) {
		console.error('Error saving order:', error)
		throw error
	}
}

// Get all orders
export function getAllOrders(): Order[] {
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
		console.error('Error getting orders:', error)
		// Return empty array on error instead of crashing
		return []
	}
}

// Get order by order number
export function getOrderByNumber(orderNumber: string): Order | null {
	const orders = getAllOrders()
	return orders.find(order => order.orderNumber === orderNumber) || null
}

// Update order status
export function updateOrderStatus(orderNumber: string, status: Order['status']): boolean {
	initializeOrdersFile()
	
	try {
		const data = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'))
		const orderIndex = data.orders.findIndex((o: Order) => o.orderNumber === orderNumber)
		
		if (orderIndex !== -1) {
			data.orders[orderIndex].status = status
			fs.writeFileSync(ORDERS_FILE, JSON.stringify(data, null, 2))
			return true
		}
		return false
	} catch (error) {
		console.error('Error updating order status:', error)
		return false
	}
}
