'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export type CarouselSlide = {
	src: string
	alt: string
	/** Show "COA" badge on this slide */
	isCoa?: boolean
}

type ProductImageCarouselProps = {
	slides: CarouselSlide[]
	/** First slide (product) padding; COA slides often use less */
	productPadding?: string
	priority?: boolean
}

export default function ProductImageCarousel({ slides = [], productPadding = 'p-4 sm:p-8', priority }: ProductImageCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const safeSlides = Array.isArray(slides) ? slides : []
	const hasMultiple = safeSlides.length > 1

	// Reset to first slide when slides change (e.g. strength selector)
	const slidesKey = safeSlides.length > 0 ? `${safeSlides.length}-${safeSlides[0].src}` : '0'
	useEffect(() => {
		setCurrentIndex(0)
	}, [slidesKey])

	const goTo = (index: number) => {
		setCurrentIndex(Math.max(0, Math.min(index, safeSlides.length - 1)))
	}

	const goPrev = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		goTo(currentIndex - 1)
	}

	const goNext = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		goTo(currentIndex + 1)
	}

	if (safeSlides.length === 0) return null

	return (
		<div className="relative w-full">
			{/* Single aspect-square container with overflow for sliding */}
			<div className="relative aspect-square bg-secondary/30 rounded-lg border border-border overflow-hidden">
				{/* Slide track */}
				<div
					className="flex h-full transition-transform duration-300 ease-out"
					style={{ transform: `translateX(-${currentIndex * 100}%)` }}
				>
					{safeSlides.map((slide, i) => (
						<div
							key={i}
							className="relative flex-shrink-0 w-full h-full"
							style={{ minWidth: '100%' }}
						>
							<Image
								src={slide.src}
								alt={slide.alt}
								fill
								className={`object-contain ${i === 0 ? productPadding : 'p-4'}`}
								priority={priority && i === 0}
								unoptimized
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
							{slide.isCoa && (
								<div className="absolute bottom-2 left-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded">
									COA
								</div>
							)}
						</div>
					))}
				</div>

				{/* Arrows - only when 2+ slides */}
				{hasMultiple && (
					<>
						<button
							type="button"
							onClick={goPrev}
							disabled={currentIndex === 0}
							className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 border border-border shadow-sm flex items-center justify-center text-foreground disabled:opacity-40 disabled:pointer-events-none touch-manipulation z-10 active:bg-background"
							aria-label="Previous image"
						>
							<ChevronLeft className="w-5 h-5" />
						</button>
						<button
							type="button"
							onClick={goNext}
							disabled={currentIndex === safeSlides.length - 1}
							className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 border border-border shadow-sm flex items-center justify-center text-foreground disabled:opacity-40 disabled:pointer-events-none touch-manipulation z-10 active:bg-background"
							aria-label="Next image"
						>
							<ChevronRight className="w-5 h-5" />
						</button>
					</>
				)}
			</div>

			{/* Dot indicators - only when 2+ slides */}
			{hasMultiple && (
				<div className="flex justify-center gap-2 mt-3" role="tablist" aria-label="Image gallery">
					{safeSlides.map((_, i) => (
						<button
							key={i}
							type="button"
							onClick={(e) => {
								e.preventDefault()
								e.stopPropagation()
								goTo(i)
							}}
							role="tab"
							aria-selected={currentIndex === i}
							aria-label={`Image ${i + 1} of ${safeSlides.length}`}
							className={`w-2.5 h-2.5 rounded-full touch-manipulation transition-colors ${
								currentIndex === i
									? 'bg-primary scale-110'
									: 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
							}`}
						/>
					))}
				</div>
			)}
		</div>
	)
}
