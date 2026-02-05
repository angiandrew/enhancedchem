'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Shield, Truck, Award, CalendarCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative w-full mt-[3.25rem] md:mt-24">
      {/* Background Image Container */}
      <div className="relative w-full bg-background">
        <img
          src="/logos/NEW NEW banner new.png"
          alt="Premium research peptides - BPC-157, TB-500, GHK-Cu, and NAD+ vials"
          className="w-full h-auto object-contain object-center block"
          style={{ 
            maxHeight: 'none', 
            height: 'auto',
            width: '100%',
            display: 'block'
          }}
        />
      </div>

      {/* Text Content - Overlay on top of banner; on mobile stacked and tighter so not over badges */}
      <div className="absolute inset-0 z-10 container mx-auto px-4 md:px-6 flex items-end pb-4 md:pb-16 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center lg:text-left max-w-3xl w-full"
        >
          <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-2 md:gap-4">
            <Link href="/products" className="w-full sm:w-auto">
              <Button variant="elegant" size="default" className="w-full sm:w-auto gap-2 text-sm md:text-base md:size-lg">
                View Products
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </Button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <Button variant="elegant-outline" size="default" className="w-full sm:w-auto text-sm md:text-base md:size-lg bg-white/10 border-white/20 text-white hover:bg-white/20">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Trust Badges - compact on mobile so they don't fight with CTAs */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-1 md:pb-0">
        <div className="container mx-auto px-3 md:px-6">
          <div className="grid grid-cols-3 gap-2 md:gap-6 max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-lg md:text-4xl font-serif font-medium mb-0.5 md:mb-2 text-white">99.9%+</div>
              <div className="text-[10px] md:text-xs text-white/60 uppercase tracking-wide font-sans">Purity</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-lg md:text-4xl font-serif font-medium mb-0.5 md:mb-2 text-white">GMP</div>
              <div className="text-[10px] md:text-xs text-white/60 uppercase tracking-wide font-sans">Compliant</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="text-lg md:text-4xl font-serif font-medium mb-0.5 md:mb-2 text-white">3rd Party</div>
              <div className="text-[10px] md:text-xs text-white/60 uppercase tracking-wide font-sans">Tested</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FeaturesStrip() {
  const features = [
    { icon: Shield, label: '99.9%+ Purity Certified' },
    { icon: Award, label: 'GMP Compliant' },
    { icon: Truck, label: 'Fast & Secure Shipping' },
    { icon: CalendarCheck, label: 'Trusted Since 2019' },
  ]

  return (
    <section className="py-3 md:py-6 border-y border-border bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap justify-center gap-3 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 md:gap-3"
            >
              <feature.icon className="w-4 h-4 md:w-5 md:h-5 shrink-0 text-muted-foreground" />
              <span className="text-xs md:text-sm font-medium tracking-wide">{feature.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
