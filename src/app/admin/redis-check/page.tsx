'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

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

export default function RedisCheckPage() {
	const [data, setData] = useState<RedisData | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchRedisData()
	}, [])

	const fetchRedisData = async () => {
		try {
			setLoading(true)
			const response = await fetch('/api/admin/redis-check')
			const result = await response.json()
			setData(result)
		} catch (error) {
			console.error('Error fetching Redis data:', error)
			setData({
				connected: false,
				message: 'Failed to fetch Redis data',
				data: null
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				<div className="bg-white rounded-lg shadow-sm p-6 mb-6">
					<h1 className="text-2xl font-bold text-gray-900 mb-4">
						Redis Connection Status
					</h1>
					
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

									{/* Recent Orders */}
									{data.data.recentOrders.length > 0 && (
										<div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
											<h2 className="font-semibold text-gray-900 mb-3">Recent Orders (Last 10)</h2>
											<div className="space-y-2">
												{data.data.recentOrders.map((order, index) => (
													<div key={index} className="bg-white border border-gray-200 rounded p-3">
														<div className="flex justify-between items-center">
															<div>
																<p className="font-semibold text-gray-900">{order.orderNumber}</p>
																<p className="text-sm text-gray-600">{order.email}</p>
																<p className="text-xs text-gray-500">
																	{new Date(order.timestamp).toLocaleString()}
																</p>
															</div>
															<span className={`px-2 py-1 rounded text-xs font-semibold ${
																order.status === 'completed' ? 'bg-green-100 text-green-800' :
																order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
																order.status === 'paid' ? 'bg-yellow-100 text-yellow-800' :
																'bg-gray-100 text-gray-800'
															}`}>
																{order.status}
															</span>
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
