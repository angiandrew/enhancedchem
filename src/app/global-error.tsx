'use client'

const isDev = process.env.NODE_ENV === 'development'

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	return (
		<html>
			<body>
				<div style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					minHeight: '100vh',
					padding: '2rem',
					fontFamily: 'system-ui, sans-serif',
					maxWidth: '48rem',
					margin: '0 auto',
				}}>
					<h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#dc2626' }}>
						Application Error
					</h1>
					<p style={{ marginBottom: '0.5rem', color: '#666', fontWeight: 600 }}>
						{error.message || 'An unexpected error occurred'}
					</p>
					{isDev && error.digest && (
						<p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#999' }}>
							Digest: {error.digest}
						</p>
					)}
					{isDev && error.stack && (
						<details style={{ width: '100%', marginBottom: '1.5rem', textAlign: 'left' }}>
							<summary style={{ cursor: 'pointer', fontSize: '0.875rem', color: '#666' }}>
								Error stack (development)
							</summary>
							<pre style={{
								fontSize: '0.75rem',
								background: '#f5f5f5',
								padding: '1rem',
								borderRadius: '0.5rem',
								overflow: 'auto',
								maxHeight: '16rem',
								marginTop: '0.5rem',
							}}>
								{error.stack}
							</pre>
						</details>
					)}
					<button
						onClick={reset}
						style={{
							padding: '0.75rem 1.5rem',
							backgroundColor: '#9333ea',
							color: 'white',
							border: 'none',
							borderRadius: '0.5rem',
							cursor: 'pointer',
							fontSize: '1rem'
						}}
					>
						Try again
					</button>
				</div>
			</body>
		</html>
	)
}
