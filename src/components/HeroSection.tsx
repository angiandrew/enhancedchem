'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Shield, Truck, Award, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

// Hero images array - add your photos here later
const heroImages = [
  {
    src: "/logos/hero-vials.png",
    alt: "Premium research peptides - BPC-157, TB-500, GHK-Cu, and NAD+ vials"
  },
  // Add more images here when you provide them
  // Example:
  // {
  //   src: "/logos/your-image-2.png",
  //   alt: "Description of image 2"
  // },
]

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // Auto-play carousel (optional - remove if you don't want auto-play)
  useEffect(() => {
    if (heroImages.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentIndex < heroImages.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-sans font-medium"
            >
              Research-Grade Peptides
            </motion.span>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
              Premium Peptide
              <span className="block text-muted-foreground mt-2">Solutions</span>
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 font-sans">
              Pharmaceutical-grade BPC-157, TB-500, and GHK-CU with certified 99.9%+ purity standards and comprehensive scientific documentation.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
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

            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-serif font-medium mb-2">99.9%+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide font-sans">Purity</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-serif font-medium mb-2">GMP</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide font-sans">Compliant</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-serif font-medium mb-2">3rd Party</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide font-sans">Tested</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={heroImages[currentIndex].src}
                  alt={heroImages[currentIndex].alt}
                  fill
                  className="object-cover object-center"
                  priority={currentIndex === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {heroImages.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {heroImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
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
