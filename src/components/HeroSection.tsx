'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Shield, Truck, Award, CalendarCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative w-full mt-[3.25rem] md:mt-24">
      {/* Hero Image - clean on mobile, no overlay */}
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

      {/* Mobile only: buttons + trust badges BELOW the photo (no overlay) */}
      <div className="md:hidden bg-background border-b border-border">
        <div className="container mx-auto px-4 py-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-3"
          >
            <Link href="/products" className="w-full">
              <Button variant="elegant" size="lg" className="w-full gap-2">
                View Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/about" className="w-full">
              <Button variant="outline" size="lg" className="w-full">
                Learn More
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-3 gap-4 pt-2 border-t border-border"
          >
            <div className="text-center">
              <div className="text-xl font-serif font-medium text-foreground">99.9%+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Purity</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-serif font-medium text-foreground">GMP</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-serif font-medium text-foreground">3rd Party</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Tested</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Desktop/tablet: overlay on top of banner (unchanged) */}
      <div className="hidden md:block absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 container mx-auto px-6 flex items-end pb-16 lg:pb-32 pointer-events-none">
          <div className="pointer-events-auto text-center lg:text-left max-w-3xl w-full">
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link href="/products">
                <Button variant="elegant" size="lg" className="gap-2">
                  View Products
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="elegant-outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-0 pointer-events-none">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-3 gap-6 max-w-md">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-serif font-medium mb-2 text-white">99.9%+</div>
                <div className="text-xs text-white/60 uppercase tracking-wide font-sans">Purity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-serif font-medium mb-2 text-white">GMP</div>
                <div className="text-xs text-white/60 uppercase tracking-wide font-sans">Compliant</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-serif font-medium mb-2 text-white">3rd Party</div>
                <div className="text-xs text-white/60 uppercase tracking-wide font-sans">Tested</div>
              </div>
            </div>
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
