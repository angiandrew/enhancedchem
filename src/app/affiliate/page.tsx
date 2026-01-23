'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { DollarSign, TrendingUp, Users, Shield, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AffiliatePage() {
	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="pt-32 md:pt-36 pb-16">
				<div className="container mx-auto px-6">
					{/* Page Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-center mb-16"
					>
						<span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 block font-sans">
							Affiliate Program
						</span>
						<h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">
							Become an Enhanced Chem Affiliate
						</h1>
						<p className="text-muted-foreground max-w-2xl mx-auto text-lg">
							Earn commission by referring customers to Enhanced Chem&apos;s lab-grade research products. 
							Once approved, you&apos;ll receive a unique referral link to share across your website, social media, or content.
						</p>
					</motion.div>

					{/* Benefits Grid */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="grid md:grid-cols-3 gap-8 mb-16"
					>
						<div className="bg-card rounded-lg border border-border p-6 text-center">
							<div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<DollarSign className="w-8 h-8 text-primary" />
							</div>
							<h3 className="font-serif text-xl font-medium mb-2">Competitive Commissions</h3>
							<p className="text-muted-foreground text-sm">
								10-20% commission on qualifying sales from verified researcher purchases
							</p>
						</div>

						<div className="bg-card rounded-lg border border-border p-6 text-center">
							<div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<TrendingUp className="w-8 h-8 text-primary" />
							</div>
							<h3 className="font-serif text-xl font-medium mb-2">Transparent Tracking</h3>
							<p className="text-muted-foreground text-sm">
								Real-time tracking and monthly payouts with clear reporting and analytics
							</p>
						</div>

						<div className="bg-card rounded-lg border border-border p-6 text-center">
							<div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<Users className="w-8 h-8 text-primary" />
							</div>
							<h3 className="font-serif text-xl font-medium mb-2">No Upfront Cost</h3>
							<p className="text-muted-foreground text-sm">
								Join free with no fees or minimum requirements. Start earning immediately after approval
							</p>
						</div>
					</motion.div>

					{/* How It Works */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="bg-card rounded-lg border border-border p-8 md:p-12 mb-16"
					>
						<h2 className="font-serif text-3xl font-medium mb-8 text-center">How It Works</h2>
						<div className="grid md:grid-cols-3 gap-8">
							<div className="text-center">
								<div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
									<span className="text-primary font-bold text-xl">1</span>
								</div>
								<h3 className="font-serif text-lg font-medium mb-2">Apply & Get Approved</h3>
								<p className="text-muted-foreground text-sm">
									Submit your application with your website or social media details. Approval is typically within 1-2 business days.
								</p>
							</div>

							<div className="text-center">
								<div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
									<span className="text-primary font-bold text-xl">2</span>
								</div>
								<h3 className="font-serif text-lg font-medium mb-2">Get Your Unique Link</h3>
								<p className="text-muted-foreground text-sm">
									Once approved, you&apos;ll receive a unique referral link to share with your audience across any platform.
								</p>
							</div>

							<div className="text-center">
								<div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
									<span className="text-primary font-bold text-xl">3</span>
								</div>
								<h3 className="font-serif text-lg font-medium mb-2">Earn Commissions</h3>
								<p className="text-muted-foreground text-sm">
									Earn 10-20% commission on every sale made through your referral link. Payments are made monthly via PayPal, CashApp, or Venmo.
								</p>
							</div>
						</div>
					</motion.div>

					{/* Requirements */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="bg-secondary/50 rounded-lg border border-border p-8 mb-16"
					>
						<h2 className="font-serif text-2xl font-medium mb-6 text-center">Program Requirements</h2>
						<div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
							<div className="flex items-start gap-3">
								<CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
								<div>
									<h3 className="font-medium mb-1">18+ Years Old</h3>
									<p className="text-sm text-muted-foreground">Must be at least 18 years of age</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
								<div>
									<h3 className="font-medium mb-1">Professional Platform</h3>
									<p className="text-sm text-muted-foreground">Website, blog, or social media presence</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
								<div>
									<h3 className="font-medium mb-1">Compliance</h3>
									<p className="text-sm text-muted-foreground">Must comply with all program terms and guidelines</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
								<div>
									<h3 className="font-medium mb-1">Payment Method</h3>
									<p className="text-sm text-muted-foreground">PayPal, CashApp, or Venmo account required</p>
								</div>
							</div>
						</div>
					</motion.div>

					{/* CTA Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="text-center"
					>
						<div className="bg-primary/5 rounded-lg border-2 border-primary/20 p-8 md:p-12 max-w-2xl mx-auto">
							<Shield className="w-12 h-12 text-primary mx-auto mb-4" />
							<h2 className="font-serif text-3xl font-medium mb-4">Ready to Get Started?</h2>
							<p className="text-muted-foreground mb-8 max-w-xl mx-auto">
								Join our affiliate program today and start earning commissions by promoting premium research peptides to qualified researchers.
							</p>
							<a
								href="https://www.affiliatly.com/af-1074129/affiliate.panel?mode=register"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button variant="elegant" size="lg" className="gap-2">
									Apply to Become an Affiliate
									<ArrowRight className="w-4 h-4" />
								</Button>
							</a>
							<p className="text-xs text-muted-foreground mt-4">
								Already have an account? <a href="https://www.affiliatly.com/af-1074129/affiliate.panel" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Log in here</a>
							</p>
						</div>
					</motion.div>

					{/* Important Notes */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
						className="mt-16 bg-red-50 border-2 border-red-200 rounded-lg p-6 max-w-3xl mx-auto"
					>
						<h3 className="font-semibold text-red-900 mb-3">Important Program Guidelines</h3>
						<ul className="space-y-2 text-sm text-red-800">
							<li className="flex items-start gap-2">
								<span className="font-bold">•</span>
								<span>All products are for scientific research purposes only. Not for human or animal consumption.</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="font-bold">•</span>
								<span>Commissions are paid monthly when the minimum threshold of $100 is met.</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="font-bold">•</span>
								<span>All promotional materials must comply with our terms and guidelines. Violations may result in immediate termination.</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="font-bold">•</span>
								<span>For questions or support, contact us at <a href="mailto:contact@enhancedchem.com" className="underline">contact@enhancedchem.com</a></span>
							</li>
						</ul>
					</motion.div>
				</div>
			</main>
			<Footer />
		</div>
	)
}
