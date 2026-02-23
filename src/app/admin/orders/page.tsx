'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Clock, Truck, Package, Lock, FlaskConical } from 'lucide-react'

interface Order {
	orderNumber: string
	email: string
	paymentMethod: string
	orderTotal: number
	items: Array<{ name: string; quantity: number; price: number }>
	timestamp: string
	status: 'pending' | 'paid' | 'shipped' | 'completed'
	isTest?: boolean
}

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState<Order[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [password, setPassword] = useState('')
	const [authenticated, setAuthenticated] = useState(false)
	const [loginError, setLoginError] = useState('')

	useEffect(() => {
		if (authenticated && password) fetchOrders()
	}, [authenticated])

	const fetchOrders = async () => {
		if (!password) return
		setError(null)
		setLoading(true)
		try {
			const response = await fetch('/api/admin/orders', {
				headers: { Authorization: `Bearer ${password}` },
			})
			if (response.status === 401) {
				setAuthenticated(false)
				setLoginError('Incorrect password')
				return
			}
			if (response.ok) {
				const data = await response.json()
				setOrders(data.orders || [])
				setLoginError('')
			} else {
				const body = await response.json().catch(() => ({}))
				const msg = body.details || body.error || `HTTP ${response.status}`
				setError(msg)
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : 'Failed to fetch orders'
			setError(msg)
			console.error('Error fetching orders:', err)
		} finally {
			setLoading(false)
		}
	}

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault()
		setLoginError('')
		if (!password.trim()) {
			setLoginError('Please enter the admin password')
			return
		}
		setAuthenticated(true)
	}

	const updateOrderStatus = async (orderNumber: string, newStatus: Order['status']) => {
		if (!password) return
		setError(null)
		try {
			const response = await fetch('/api/admin/orders', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${password}`,
				},
				body: JSON.stringify({ orderNumber, status: newStatus }),
			})
			if (response.status === 401) {
				setAuthenticated(false)
				setLoginError('Session expired. Please log in again.')
				return
			}
			if (response.ok) {
				fetchOrders()
			} else {
				const errorData = await response.json().catch(() => ({ error: 'Failed to update' }))
				const msg = errorData.details || errorData.error || 'Unknown error'
				setError(msg)
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : 'Unknown error'
			setError(msg)
			console.error('Error updating order status:', err)
		}
	}

	const toggleTestOrder = async (orderNumber: string, currentIsTest: boolean) => {
		if (!password) return
		setError(null)
		try {
			const response = await fetch('/api/admin/orders', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${password}`,
				},
				body: JSON.stringify({ orderNumber, isTest: !currentIsTest }),
			})
			if (response.status === 401) {
				setAuthenticated(false)
				setLoginError('Session expired. Please log in again.')
				return
			}
			if (response.ok) {
				setOrders((prev) =>
					prev.map((o) =>
						o.orderNumber === orderNumber ? { ...o, isTest: !currentIsTest } : o
					)
				)
			} else {
				const errorData = await response.json().catch(() => ({ error: 'Failed to update' }))
				const msg = errorData.details || errorData.error || 'Unknown error'
				setError(msg)
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : 'Unknown error'
			setError(msg)
			console.error('Error toggling test flag:', err)
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

	// Login gate – require admin password
	if (!authenticated) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
				<div className="w-full max-w-sm bg-white rounded-lg shadow-sm border border-gray-200 p-8">
					<div className="flex items-center gap-2 mb-6">
						<Lock className="w-8 h-8 text-gray-600" />
						<h1 className="text-xl font-bold text-gray-900">Admin Orders</h1>
					</div>
					<p className="text-gray-600 text-sm mb-4">Enter the admin password to view and manage orders.</p>
					<form onSubmit={handleLogin} className="space-y-4">
						<div>
							<label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1">
								Password
							</label>
							<input
								id="admin-password"
								type="password"
								value={password}
								onChange={(e) => { setPassword(e.target.value); setLoginError(''); }}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="Admin password"
								autoFocus
							/>
						</div>
						{loginError && (
							<p className="text-sm text-red-600">{loginError}</p>
						)}
						<button
							type="submit"
							className="w-full py-2 px-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
						>
							Log in
						</button>
					</form>
				</div>
			</div>
		)
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
				<div className="mb-8 flex items-center justify-between flex-wrap gap-4">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
						<p className="text-gray-600">View and manage all customer orders</p>
					</div>
					<button
						type="button"
						onClick={() => { setAuthenticated(false); setPassword(''); setLoginError(''); }}
						className="text-sm text-gray-500 hover:text-gray-700"
					>
						Log out
					</button>
				</div>

				{error && (
					<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
						<p className="font-medium">Error</p>
						<p className="text-sm mt-1">{error}</p>
						<button
							type="button"
							onClick={() => { setError(null); fetchOrders(); }}
							className="mt-2 text-sm underline hover:no-underline"
						>
							Try again
						</button>
					</div>
				)}

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
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center gap-2 flex-wrap">
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
												<button
													type="button"
													onClick={() => toggleTestOrder(order.orderNumber, !!order.isTest)}
													className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${
														order.isTest
															? 'bg-amber-100 text-amber-800 border-amber-200'
															: 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200'
													}`}
													title={order.isTest ? 'Excluded from Total Revenue. Click to include.' : 'Exclude from Total Revenue (mark as test)'}
												>
													<FlaskConical className="w-3 h-3" />
													{order.isTest ? 'Test' : 'Mark test'}
												</button>
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
								${formatPrice(
									orders
										.filter((o) => !o.isTest && ['paid', 'shipped', 'completed'].includes(o.status))
										.reduce((sum, o) => sum + o.orderTotal, 0)
								)}
							</div>
							<p className="text-xs text-gray-500 mt-1">Excludes orders marked as Test</p>
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
