'use client'

import { useEffect } from 'react'

export default function SecurityMonitor() {
  useEffect(() => {
    // Monitor for suspicious activity
    const monitorActivity = () => {
      // Track page views and user behavior
      const sessionData = {
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        url: window.location.href,
      }

      // Send to monitoring endpoint (you can implement this)
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
        // Only track in production
        fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sessionData),
        }).catch(() => {
          // Silently fail - don't break the user experience
        })
      }
    }

    // Monitor on page load
    monitorActivity()

    // Monitor for rapid navigation (potential bot behavior)
    let navigationCount = 0
    const resetNavigationCount = () => {
      navigationCount = 0
    }

    const handleNavigation = () => {
      navigationCount++
      if (navigationCount > 10) {
        // Suspicious rapid navigation detected
        console.warn('Suspicious navigation pattern detected')
        // You could implement additional security measures here
      }
      setTimeout(resetNavigationCount, 5000) // Reset after 5 seconds
    }

    // Add event listeners
    window.addEventListener('beforeunload', handleNavigation)

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleNavigation)
    }
  }, [])

  return null // This component doesn't render anything
}



