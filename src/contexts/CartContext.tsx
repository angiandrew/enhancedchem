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

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([])
	const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null)

	// Load cart from localStorage on mount
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedCart = localStorage.getItem('enhanced-chem-cart')
			if (savedCart) {
				try {
					setItems(JSON.parse(savedCart))
				} catch (error) {
					console.error('Error loading cart from localStorage:', error)
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

	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
	const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

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
