'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CartItem {
	id: string
	name: string
	price: number
	quantity: number
	image: string
}

interface CartContextType {
	items: CartItem[]
	addItem: (item: Omit<CartItem, 'quantity'>) => void
	removeItem: (id: string) => void
	updateQuantity: (id: string, quantity: number) => void
	clearCart: () => void
	totalItems: number
	totalPrice: number
	lastAddedItem: CartItem | null
	clearLastAddedItem: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Image path migration map for old incorrect paths (moved outside component to prevent recreation)
const IMAGE_PATH_MIGRATIONS: Record<string, string> = {
	'/products/bpc-157/BPC-157_5MG_new.png': '/products/bpc-157/BPC-157 5mg.png',
	'/products/bpc-157/BPC-157_5mg.png': '/products/bpc-157/BPC-157 5mg.png',
	'/products/bpc-tb-ghk-mix/bpc-tb-ghk-mix.png': '/products/bpc-tb-ghk-mix/GLOW70.png',
	'/products/bpc-tb-mix/BPC:Tb_10MG mix.png': '/products/bpc-tb-mix/BPC_TB Blend 10_10.png',
	'/products/bpc-tb-mix/BPC Tb 10MG mix.png': '/products/bpc-tb-mix/BPC_TB Blend 10_10.png',
}

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([])
	const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null)

	// Load cart from localStorage on mount
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedCart = localStorage.getItem('enhanced-chem-cart')
			if (savedCart) {
				try {
					const parsedCart = JSON.parse(savedCart)
					// Validate and migrate cart items
					if (Array.isArray(parsedCart)) {
						const migratedCart = parsedCart
							.filter((item: unknown): item is CartItem => 
								typeof item === 'object' && 
								item !== null && 
								'id' in item && 
								'name' in item && 
								typeof (item as CartItem).price === 'number'
							)
							.map((item: CartItem) => {
								// Migrate old image paths to new ones
								if (item.image && IMAGE_PATH_MIGRATIONS[item.image]) {
									return { ...item, image: IMAGE_PATH_MIGRATIONS[item.image] }
								}
								return item
							})
						setItems(migratedCart)
						// Save migrated cart back to localStorage if changed
						if (JSON.stringify(parsedCart) !== JSON.stringify(migratedCart)) {
							localStorage.setItem('enhanced-chem-cart', JSON.stringify(migratedCart))
						}
					} else {
						// Invalid cart format, clear it
						localStorage.removeItem('enhanced-chem-cart')
					}
				} catch {
					// Silently handle errors - clear corrupted cart data
					localStorage.removeItem('enhanced-chem-cart')
				}
			}
		}
	}, [])

	// Save cart to localStorage whenever items change
	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('enhanced-chem-cart', JSON.stringify(items))
		}
	}, [items])

	const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
		try {
			// Validate item before adding
			if (!newItem || !newItem.id || !newItem.name || typeof newItem.price !== 'number' || newItem.price < 0) {
				console.warn('Invalid item data:', newItem)
				return
			}
			
			setItems(prevItems => {
				// First try to find by exact ID match
				let existingItem = prevItems.find(item => item.id === newItem.id)
				
				// If no exact ID match, try to find by name and price (for same products with different IDs)
				if (!existingItem) {
					existingItem = prevItems.find(item => 
						item.name === newItem.name && item.price === newItem.price
					)
				}
				
				if (existingItem) {
					const updatedItems = prevItems.map(item =>
						item.id === existingItem!.id
							? { ...item, quantity: item.quantity + 1 }
							: item
					)
					setLastAddedItem({ ...newItem, quantity: existingItem.quantity + 1 })
					return updatedItems
				}
				const newCartItem = { ...newItem, quantity: 1 }
				setLastAddedItem(newCartItem)
				return [...prevItems, newCartItem]
			})
		} catch (error) {
			console.warn('Error adding item to cart:', error)
		}
	}

	const clearLastAddedItem = () => {
		setLastAddedItem(null)
	}

	const removeItem = (id: string) => {
		setItems(prevItems => prevItems.filter(item => item.id !== id))
	}

	const updateQuantity = (id: string, quantity: number) => {
		if (quantity <= 0) {
			removeItem(id)
			return
		}
		setItems(prevItems =>
			prevItems.map(item =>
				item.id === id ? { ...item, quantity } : item
			)
		)
	}

	const clearCart = () => {
		setItems([])
	}

	const totalItems = items.reduce((sum, item) => {
		const qty = typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 0
		return sum + qty
	}, 0)
	const totalPrice = items.reduce((sum, item) => {
		const price = typeof item.price === 'number' && item.price >= 0 ? item.price : 0
		const qty = typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 0
		return sum + (price * qty)
	}, 0)

	return (
		<CartContext.Provider
			value={{
				items,
				addItem,
				removeItem,
				updateQuantity,
				clearCart,
				totalItems,
				totalPrice,
				lastAddedItem,
				clearLastAddedItem
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export function useCart() {
	const context = useContext(CartContext)
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider')
	}
	return context
}
