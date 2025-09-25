interface PlaceholderImageProps {
	width: number
	height: number
	text?: string
	className?: string
}

export default function PlaceholderImage({ 
	width, 
	height, 
	text = "Product Image", 
	className = "" 
}: PlaceholderImageProps) {
	return (
		<div 
			className={`bg-gray-200 flex items-center justify-center text-gray-500 font-medium ${className}`}
			style={{ width, height }}
		>
			{text}
		</div>
	)
}
