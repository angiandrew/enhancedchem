'use client'

import { motion } from 'framer-motion'
import { Tag } from 'lucide-react'

export default function DiscountBanner() {
	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="bg-primary/5 border-b border-border/30 py-1.5 md:py-2"
		>
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex items-center justify-center gap-1.5 md:gap-2 text-[11px] md:text-sm">
					<Tag className="w-3 h-3 md:w-4 md:h-4 shrink-0 text-primary/70" />
					<span className="text-foreground font-medium">
						<span className="text-primary font-semibold">10%+ Storewide Discount</span>
						<span className="text-muted-foreground ml-1">on all products</span>
					</span>
				</div>
			</div>
		</motion.div>
	)
}
