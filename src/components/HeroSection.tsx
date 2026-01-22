'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Shield, Truck, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-sans font-medium"
            >
              Research-Grade Peptides
            </motion.span>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-foreground">
              Premium Peptide
              <span className="block mt-2">Solutions</span>
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl font-sans">
              Pharmaceutical-grade BPC-157, TB-500, and GHK-CU with certified 99.9%+ purity standards and comprehensive scientific documentation.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/products">
                <Button variant="elegant" size="lg" className="gap-2">
                  View Products
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="elegant-outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-serif font-medium mb-2 text-foreground">99.9%+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide font-sans">Purity</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-serif font-medium mb-2 text-foreground">GMP</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide font-sans">Compliant</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-serif font-medium mb-2 text-foreground">3rd Party</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide font-sans">Tested</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Product Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <Image
                src="/logos/hero-vials.png"
                alt="Premium research peptides - BPC-157, TB-500, GHK-Cu, and NAD+ vials"
                fill
                className="object-contain rounded-lg"
                priority
                unoptimized
              />
            </div>
          </motion.div>
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
  ]

  return (
    <section className="py-6 border-y border-border bg-secondary">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <feature.icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium tracking-wide">{feature.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
