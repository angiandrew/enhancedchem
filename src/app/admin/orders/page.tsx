'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Clock, Truck, Package } from 'lucide-react'

interface Order {
	orderNumber: string
	email: string
	paymentMethod: string
	orderTotal: number
	items: Array<{ name: string; quantity: number; price: number }>
	timestamp: string
	status: 'pending' | 'paid' | 'shipped' | 'completed'
}

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState<Order[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchOrders()
	}, [])

	const fetchOrders = async () => {
		try {
			const response = await fetch('/api/admin/orders')
			if (response.ok) {
				const data = await response.json()
				setOrders(data.orders || [])
			}
		} catch (error) {
			console.error('Error fetching orders:', error)
		} finally {
			setLoading(false)
		}
	}

	const updateOrderStatus = async (orderNumber: string, newStatus: Order['status']) => {
		try {
			const response = await fetch('/api/admin/orders', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ orderNumber, status: newStatus }),
			})

			if (response.ok) {
				fetchOrders() // Refresh orders list
			}
		} catch (error) {
			console.error('Error updating order status:', error)
		}
	}

	const formatPrice = (price: number) => {
		return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}

	const formatDate = (timestamp: string) => {
		return new Date(timestamp).toLocaleString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	const getStatusColor = (status: Order['status']) => {
		switch (status) {
			case 'pending':
				return 'bg-yellow-100 text-yellow-800 border-yellow-200'
			case 'paid':
				return 'bg-blue-100 text-blue-800 border-blue-200'
			case 'shipped':
				return 'bg-purple-100 text-purple-800 border-purple-200'
			case 'completed':
				return 'bg-green-100 text-green-800 border-green-200'
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200'
		}
	}

	const getStatusIcon = (status: Order['status']) => {
		switch (status) {
			case 'pending':
				return <Clock className="w-4 h-4" />
			case 'paid':
				return <CheckCircle className="w-4 h-4" />
			case 'shipped':
				return <Truck className="w-4 h-4" />
			case 'completed':
				return <Package className="w-4 h-4" />
			default:
				return null
		}
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-gray-600">Loading orders...</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
					<p className="text-gray-600">View and manage all customer orders</p>
				</div>

				{/* Orders Table */}
				<div className="bg-white rounded-lg shadow-sm overflow-hidden">
					{orders.length === 0 ? (
						<div className="p-12 text-center">
							<Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
							<p className="text-gray-600 text-lg">No orders yet</p>
							<p className="text-gray-500 text-sm mt-2">Orders will appear here once customers complete checkout</p>
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Order #
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Date
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Customer Email
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Payment Method
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Items
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Total
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Status
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{orders.map((order) => (
										<tr key={order.orderNumber} className="hover:bg-gray-50">
											<td className="px-6 py-4 whitespace-nowrap">
												<span className="text-sm font-semibold text-gray-900">{order.orderNumber}</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className="text-sm text-gray-600">{formatDate(order.timestamp)}</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className="text-sm text-gray-600">{order.email}</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className="text-sm text-gray-600 capitalize">{order.paymentMethod}</span>
											</td>
											<td className="px-6 py-4">
												<div className="text-sm text-gray-600">
													{order.items.map((item, idx) => (
														<div key={idx}>
															{item.name} × {item.quantity}
														</div>
													))}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className="text-sm font-semibold text-gray-900">
													${formatPrice(order.orderTotal)}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
													{getStatusIcon(order.status)}
													<span className="ml-1 capitalize">{order.status}</span>
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
												<select
													value={order.status}
													onChange={(e) => updateOrderStatus(order.orderNumber, e.target.value as Order['status'])}
													className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
												>
													<option value="pending">Pending</option>
													<option value="paid">Paid</option>
													<option value="shipped">Shipped</option>
													<option value="completed">Completed</option>
												</select>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>

				{/* Summary Stats */}
				{orders.length > 0 && (
					<div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
						<div className="bg-white rounded-lg shadow-sm p-6">
							<div className="text-sm text-gray-600">Total Orders</div>
							<div className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</div>
						</div>
						<div className="bg-white rounded-lg shadow-sm p-6">
							<div className="text-sm text-gray-600">Pending</div>
							<div className="text-2xl font-bold text-yellow-600 mt-1">
								{orders.filter(o => o.status === 'pending').length}
							</div>
						</div>
						<div className="bg-white rounded-lg shadow-sm p-6">
							<div className="text-sm text-gray-600">Total Revenue</div>
							<div className="text-2xl font-bold text-gray-900 mt-1">
								${formatPrice(orders.reduce((sum, o) => sum + o.orderTotal, 0))}
							</div>
						</div>
						<div className="bg-white rounded-lg shadow-sm p-6">
							<div className="text-sm text-gray-600">Completed</div>
							<div className="text-2xl font-bold text-green-600 mt-1">
								{orders.filter(o => o.status === 'completed').length}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
