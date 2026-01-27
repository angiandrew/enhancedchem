'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FileText, CheckCircle } from 'lucide-react'

const coaTests = [
	{
		name: 'BPC-157 10mg',
		image: '/COAs/3rd party testing/BPC10.jpg',
		product: 'bpc-157-10mg'
	},
	{
		name: 'BPC-157 5mg',
		image: '/COAs/3rd party testing/bpc5.jpg',
		product: 'bpc-157-5mg'
	},
	{
		name: 'BPC-TB Mix 10mg',
		image: '/COAs/3rd party testing/bpctb1010.jpg',
		product: 'bpc-tb-mix-10mg'
	},
	{
		name: 'BPC-TB Mix 5mg',
		image: '/COAs/3rd party testing/bpctb55.jpg',
		product: 'bpc-tb-mix'
	},
	{
		name: 'CJC-1295 No DAC 5mg',
		image: '/COAs/3rd party testing/cjc no dac5.jpg',
		product: 'cjc-1295-no-dac-5mg'
	},
	{
		name: 'GHK-Cu 50mg',
		image: '/COAs/3rd party testing/GHK-Cu 50mg.JPG',
		product: 'ghk-cu'
	},
	{
		name: 'Melanotan 2',
		image: '/COAs/3rd party testing/MT2.jpg',
		product: 'melanotan-2'
	},
	{
		name: 'NAD+ 500mg',
		image: '/COAs/3rd party testing/NAD500.jpg',
		product: 'nad-500mg'
	},
	{
		name: 'Retatrutide 10mg',
		image: '/COAs/3rd party testing/reta10.jpg',
		product: 'retatrutide'
	},
	{
		name: 'Retatrutide 15mg',
		image: '/COAs/3rd party testing/reta15.jpg',
		product: 'retatrutide-15mg'
	},
	{
		name: 'Selank 10mg',
		image: '/COAs/3rd party testing/Selank10.jpg',
		product: 'selank'
	},
	{
		name: 'TB-500 10mg',
		image: '/COAs/3rd party testing/TB500-10mg.JPG',
		product: 'tb-500'
	}
]

export default function ThirdPartyTestingPage() {
	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="pt-32 md:pt-36 pb-16">
				<div className="container mx-auto px-6">
					{/* Header Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12"
					>
						<div className="flex items-center justify-center gap-3 mb-4">
							<FileText className="w-8 h-8 text-primary" />
							<h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
								3rd Party Testing
							</h1>
						</div>
						<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
							All our products undergo rigorous third-party laboratory testing to ensure purity, quality, and authenticity. 
							Below are the Certificate of Analysis (COA) documents for our tested products.
						</p>
					</motion.div>

					{/* Quality Assurance Banner */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-12"
					>
						<div className="flex items-start gap-4">
							<CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
							<div>
								<h2 className="font-serif text-xl font-semibold mb-2">Quality Assurance</h2>
								<p className="text-muted-foreground">
									Every batch is tested by independent, certified laboratories to verify:
								</p>
								<ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
									<li>Purity levels (≥98% minimum)</li>
									<li>Molecular weight verification</li>
									<li>Sequence confirmation</li>
									<li>Contaminant screening</li>
									<li>Sterility testing</li>
								</ul>
							</div>
						</div>
					</motion.div>

					{/* COA Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{coaTests.map((test, index) => (
							<motion.div
								key={test.product}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
							>
								<div className="aspect-[3/4] relative bg-secondary/30">
									<Image
										src={test.image}
										alt={`${test.name} Certificate of Analysis`}
										fill
										className="object-contain p-4"
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									/>
								</div>
								<div className="p-4">
									<h3 className="font-serif text-lg font-semibold mb-2">{test.name}</h3>
									<p className="text-sm text-muted-foreground">Certificate of Analysis</p>
								</div>
							</motion.div>
						))}
					</div>

					{/* Additional Info */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.8 }}
						className="mt-12 text-center"
					>
						<p className="text-muted-foreground">
							For questions about our testing procedures or to request additional documentation, 
							please <a href="/contact" className="text-primary hover:underline">contact us</a>.
						</p>
					</motion.div>
				</div>
			</main>
			<Footer />
		</div>
	)
}
