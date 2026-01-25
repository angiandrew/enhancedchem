'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// Log the error to console for debugging
		console.error('Application error:', error)
	}, [error])

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-6">
			<div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
				<AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Something went wrong
				</h1>
				<p className="text-gray-600 mb-6">
					{error.message || 'An unexpected error occurred. Please try again.'}
				</p>
				{process.env.NODE_ENV === 'development' && error.stack && (
					<details className="mb-6 text-left">
						<summary className="cursor-pointer text-sm text-gray-500 mb-2">
							Error details (development only)
						</summary>
						<pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-48">
							{error.stack}
						</pre>
					</details>
				)}
				<div className="flex gap-4 justify-center">
					<Button onClick={reset} variant="elegant">
						<RefreshCw className="w-4 h-4 mr-2" />
						Try again
					</Button>
					<Link href="/">
						<Button variant="outline">
							Go home
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
