'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Loader2, Lock, Truck, Package } from 'lucide-react'

interface RedisData {
	connected: boolean
	message: string
	data: {
		lastOrderNumber: string | number
		totalOrders: number
		recentOrders: Array<{
			orderNumber: string
			email: string
			timestamp: string
			status: string
		}>
	} | null
}

type OrderStatus = 'pending' | 'paid' | 'shipped' | 'completed'

export default function RedisCheckPage() {
	const [data, setData] = useState<RedisData | null>(null)
	const [loading, setLoading] = useState(false)
	const [password, setPassword] = useState('')
	const [authenticated, setAuthenticated] = useState(false)
	const [error, setError] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)
	const ordersPerPage = 25

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		
		if (!password) {
			setError('Please enter a password')
			return
		}

		// Just authenticate immediately - password check happens when fetching data
		setAuthenticated(true)
		setLoading(false)
		// Fetch data separately
		fetchRedisData()
	}

	const fetchRedisData = async () => {
		try {
			setLoading(true)
			
			// Add timeout to prevent infinite loading
			const controller = new AbortController()
			const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
			
			const response = await fetch('/api/admin/redis-check', {
				headers: {
					'Authorization': `Bearer ${password}`
				},
				signal: controller.signal
			})
			
			clearTimeout(timeoutId)
			
			if (response.status === 401) {
				setAuthenticated(false)
				setLoading(false)
				return
			}

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const result = await response.json()
			setData(result)
			// Reset to first page when new data loads
			setCurrentPage(1)
		} catch (error) {
			console.error('Error fetching Redis data:', error)
			if (error instanceof Error && error.name === 'AbortError') {
				setData({
					connected: false,
					message: 'Request timed out',
					data: null
				})
			} else {
				setData({
					connected: false,
					message: `Failed to fetch Redis data: ${error instanceof Error ? error.message : 'Unknown error'}`,
					data: null
				})
			}
		} finally {
			setLoading(false)
		}
	}

	const updateOrderStatus = async (orderNumber: string, newStatus: OrderStatus) => {
		setUpdatingStatus(orderNumber)
		try {
			const response = await fetch('/api/admin/orders', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ orderNumber, status: newStatus }),
			})

			if (response.ok) {
				// Refresh data after update
				await fetchRedisData()
			} else {
				const errorData = await response.json().catch(() => ({ error: 'Failed to update' }))
				alert(`Failed to update order status: ${errorData.error || 'Unknown error'}`)
			}
		} catch (error) {
			console.error('Error updating order status:', error)
			alert(`Error updating order status: ${error instanceof Error ? error.message : 'Unknown error'}`)
		} finally {
			setUpdatingStatus(null)
		}
	}

	// Don't auto-fetch on mount - let user login first

	// Show login form if not authenticated
	if (!authenticated) {
		return (
			<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md mx-auto">
					<div className="bg-white rounded-lg shadow-sm p-6">
						<div className="flex items-center justify-center mb-6">
							<div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
								<Lock className="w-6 h-6 text-red-600" />
							</div>
						</div>
						<h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
							Admin Access Required
						</h1>
						<p className="text-gray-600 text-center mb-6">
							Please enter the admin password to continue
						</p>
						
						<form onSubmit={handleLogin}>
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Password
								</label>
								<input
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Enter admin password"
									autoFocus
								/>
							</div>
							
							{error && (
								<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
									<p className="text-sm text-red-800">{error}</p>
								</div>
							)}
							
							<button
								type="submit"
								disabled={loading}
								className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
							>
								{loading ? (
									<span className="flex items-center justify-center">
										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
										Checking...
									</span>
								) : (
									'Login'
								)}
							</button>
						</form>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				<div className="bg-white rounded-lg shadow-sm p-6 mb-6">
					<div className="flex items-center justify-between mb-4">
						<h1 className="text-2xl font-bold text-gray-900">
							Redis Connection Status
						</h1>
						<button
							onClick={() => {
								setAuthenticated(false)
								setPassword('')
								setData(null)
							}}
							className="text-sm text-gray-600 hover:text-gray-900"
						>
							Logout
						</button>
					</div>
					
					<button
						onClick={fetchRedisData}
						disabled={loading}
						className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
					>
						{loading ? (
							<span className="flex items-center">
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
								Checking...
							</span>
						) : (
							'Refresh'
						)}
					</button>

					{loading && !data ? (
						<div className="flex items-center justify-center py-8">
							<Loader2 className="w-8 h-8 animate-spin text-blue-600" />
						</div>
					) : data ? (
						<div>
							{/* Connection Status */}
							<div className={`mb-6 p-4 rounded-lg ${
								data.connected 
									? 'bg-green-50 border border-green-200' 
									: 'bg-red-50 border border-red-200'
							}`}>
								<div className="flex items-center space-x-3">
									{data.connected ? (
										<CheckCircle className="w-6 h-6 text-green-600" />
									) : (
										<XCircle className="w-6 h-6 text-red-600" />
									)}
									<div>
										<p className={`font-semibold ${
											data.connected ? 'text-green-800' : 'text-red-800'
										}`}>
											{data.connected ? 'Connected' : 'Not Connected'}
										</p>
										<p className={`text-sm ${
											data.connected ? 'text-green-700' : 'text-red-700'
										}`}>
											{data.message}
										</p>
									</div>
								</div>
							</div>

							{/* Redis Data */}
							{data.data && (
								<div className="space-y-4">
									<div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
										<h2 className="font-semibold text-gray-900 mb-2">Current State</h2>
										<div className="space-y-2">
											<div className="flex justify-between">
												<span className="text-gray-700">Last Order Number:</span>
												<span className="font-semibold text-gray-900">
													{data.data.lastOrderNumber}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-700">Total Orders:</span>
												<span className="font-semibold text-gray-900">
													{data.data.totalOrders}
												</span>
											</div>
										</div>
									</div>

									{/* Orders List */}
									{data.data.recentOrders.length > 0 && (
										<div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
											<div className="flex items-center justify-between mb-3">
												<h2 className="font-semibold text-gray-900">
													All Orders ({data.data?.recentOrders.length || 0} total)
												</h2>
												{data.data && data.data.recentOrders.length > 0 && (
													<div className="text-sm text-gray-600">
														Page {currentPage} of {Math.ceil(data.data.recentOrders.length / ordersPerPage)}
													</div>
												)}
											</div>
											
											{/* Pagination Controls */}
											{data.data && data.data.recentOrders.length > ordersPerPage && (
												<div className="flex items-center justify-between mb-4">
													<button
														onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
														disabled={currentPage === 1}
														className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
													>
														Previous
													</button>
													<span className="text-sm text-gray-600">
														Showing {((currentPage - 1) * ordersPerPage) + 1} - {Math.min(currentPage * ordersPerPage, data.data!.recentOrders.length)} of {data.data!.recentOrders.length}
													</span>
													<button
														onClick={() => setCurrentPage(prev => Math.min(Math.ceil(data.data!.recentOrders.length / ordersPerPage), prev + 1))}
														disabled={currentPage >= Math.ceil(data.data!.recentOrders.length / ordersPerPage)}
														className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
													>
														Next
													</button>
												</div>
											)}
											
											<div className="space-y-3">
												{data.data?.recentOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage).map((order, index) => (
													<div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
														<div className="flex justify-between items-start mb-3">
															<div className="flex-1">
																<p className="font-semibold text-gray-900">{order.orderNumber}</p>
																<p className="text-sm text-gray-600">{order.email}</p>
																<p className="text-xs text-gray-500">
																	{new Date(order.timestamp).toLocaleString()}
																</p>
															</div>
															<span className={`px-3 py-1 rounded text-xs font-semibold ${
																order.status === 'completed' ? 'bg-green-100 text-green-800' :
																order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
																order.status === 'paid' ? 'bg-yellow-100 text-yellow-800' :
																'bg-gray-100 text-gray-800'
															}`}>
																{order.status}
															</span>
														</div>
														
														{/* Status Update Buttons */}
														<div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200">
															<button
																onClick={() => updateOrderStatus(order.orderNumber, 'paid')}
																disabled={updatingStatus === order.orderNumber || order.status === 'paid'}
																className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
																	order.status === 'paid'
																		? 'bg-yellow-200 text-yellow-800 cursor-not-allowed'
																		: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-300'
																}`}
															>
																{updatingStatus === order.orderNumber ? 'Updating...' : order.status === 'paid' ? '✓ Paid' : 'Mark as Paid'}
															</button>
															
															<button
																onClick={() => updateOrderStatus(order.orderNumber, 'shipped')}
																disabled={updatingStatus === order.orderNumber || order.status === 'shipped' || order.status === 'completed'}
																className={`px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1 ${
																	order.status === 'shipped' || order.status === 'completed'
																		? 'bg-blue-200 text-blue-800 cursor-not-allowed'
																		: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-300'
																}`}
															>
																<Truck className="w-3 h-3" />
																{updatingStatus === order.orderNumber ? 'Updating...' : order.status === 'shipped' || order.status === 'completed' ? '✓ Shipped' : 'Mark as Shipped'}
															</button>
															
															<button
																onClick={() => updateOrderStatus(order.orderNumber, 'completed')}
																disabled={updatingStatus === order.orderNumber || order.status === 'completed'}
																className={`px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1 ${
																	order.status === 'completed'
																		? 'bg-green-200 text-green-800 cursor-not-allowed'
																		: 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-300'
																}`}
															>
																<Package className="w-3 h-3" />
																{updatingStatus === order.orderNumber ? 'Updating...' : order.status === 'completed' ? '✓ Completed' : 'Mark as Completed'}
															</button>
															
															{order.status !== 'pending' && (
																<button
																	onClick={() => updateOrderStatus(order.orderNumber, 'pending')}
																	disabled={updatingStatus === order.orderNumber}
																	className="px-3 py-1.5 text-xs font-medium rounded bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-300 transition-colors"
																>
																	{updatingStatus === order.orderNumber ? 'Updating...' : 'Reset to Pending'}
																</button>
															)}
														</div>
													</div>
												))}
											</div>
										</div>
									)}

									{data.data.recentOrders.length === 0 && (
										<div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center text-gray-600">
											No orders stored in Redis yet. Place an order to see it here.
										</div>
									)}
								</div>
							)}
						</div>
					) : null}
				</div>
			</div>
		</div>
	)
}
