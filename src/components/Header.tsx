'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'
import DiscountBanner from './DiscountBanner'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/3rd-party-testing', label: '3rd Party Testing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/affiliate', label: 'Become an Affiliate' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <DiscountBanner />
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-12 md:h-20">
          {/* Logo - compact on mobile */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 min-w-0">
            <div className="w-9 h-9 md:w-14 md:h-14 relative shrink-0">
              <Image
                src="/logos/NEW-new LOGO.png"
                alt="Enhanced Chem Logo"
                width={56}
                height={56}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-serif text-base md:text-xl tracking-tight truncate">
              <span className="font-semibold">ENHANCED</span>
              <span className="font-normal">CHEM</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide transition-colors hover:text-foreground text-muted-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <Link href="/checkout">
              <Button variant="ghost" size="icon" className="relative h-9 w-9 md:h-10 md:w-10">
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/40 bg-background"
          >
            <nav className="container mx-auto px-4 md:px-6 py-4 md:py-6 flex flex-col gap-3 md:gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium py-2 transition-colors text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
