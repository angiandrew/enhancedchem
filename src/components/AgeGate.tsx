'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export default function AgeGate() {
  const pathname = usePathname()
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [ageVerified, setAgeVerified] = useState(false)
  const [agreementAccepted, setAgreementAccepted] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Don't show age gate on terms and privacy pages
  const excludedPaths = ['/terms', '/privacy']
  const shouldShowAgeGate = !excludedPaths.includes(pathname)

  useEffect(() => {
    setMounted(true)
    // Temporarily force show for testing - remove this to restore normal behavior
    setIsVerified(false)
    // Check if user has already verified
    // const verified = localStorage.getItem('ageGateVerified')
    // if (verified === 'true') {
    //   setIsVerified(true)
    // } else {
    //   setIsVerified(false)
    // }
  }, [])

  const handleVerify = () => {
    if (ageVerified && agreementAccepted) {
      localStorage.setItem('ageGateVerified', 'true')
      setIsVerified(true)
    }
  }

  const handleExit = () => {
    window.location.href = 'https://www.google.com'
  }

  const canProceed = ageVerified && agreementAccepted

  useEffect(() => {
    // Prevent scrolling only when age gate is actually shown
    const excludedPaths = ['/terms', '/privacy']
    const shouldShow = !excludedPaths.includes(pathname)
    
    if (mounted && shouldShow && isVerified === false) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isVerified, mounted, pathname])

  // Don't render until we've checked localStorage on the client
  if (!mounted || isVerified === null) {
    return null
  }

  // Don't show on excluded paths (terms, privacy)
  if (!shouldShowAgeGate) {
    return null
  }

  if (isVerified) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/10 flex items-center justify-center p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-card border border-border rounded-lg shadow-2xl max-w-lg w-full p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-6">
            <h1 className="font-serif text-2xl md:text-3xl font-medium mb-3">
              Age Verification Required
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This website is restricted. To continue, please confirm you meet the minimum age requirement and accept the agreement below.
            </p>
          </div>

          <div className="space-y-5 mb-6">
            {/* Age Verification */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="age"
                checked={ageVerified}
                onCheckedChange={(checked) => setAgeVerified(checked === true)}
                className="mt-1"
              />
              <label
                htmlFor="age"
                className="text-sm leading-relaxed cursor-pointer flex-1"
              >
                I confirm I am 21+ years of age or older.
              </label>
            </div>

            {/* Agreement */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="agreement"
                checked={agreementAccepted}
                onCheckedChange={(checked) => setAgreementAccepted(checked === true)}
                className="mt-1"
              />
              <label
                htmlFor="agreement"
                className="text-sm leading-relaxed cursor-pointer flex-1"
              >
                I agree that products and information on this website are provided for <strong>laboratory research use only</strong> and are <strong>not intended for use in or on humans or animals</strong>. I will not use any any products or information from this website for diagnosis, treatment, cure, or prevention of any condition. I agree to follow applicable laws and regulations, and I agree to the{' '}
                <Link href="/terms" className="text-primary underline hover:text-primary/80">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-primary underline hover:text-primary/80">Privacy Policy</Link>.
              </label>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
            By clicking "I Agree & Enter", you confirm the statements above and acknowledge responsibility for compliance with applicable laws and regulations.
          </p>

          <div className="flex gap-4">
            <Button
              onClick={handleExit}
              variant="destructive"
              size="lg"
              className="flex-1"
            >
              EXIT
            </Button>
            <Button
              onClick={handleVerify}
              disabled={!canProceed}
              variant="elegant"
              size="lg"
              className="flex-1"
            >
              I AGREE & ENTER
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
