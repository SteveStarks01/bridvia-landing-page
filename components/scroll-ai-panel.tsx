"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MorphPanel } from "@/components/ai-input"
import { X } from "lucide-react"

interface ScrollAIPanelProps {
  heroSectionSelector?: string
  userLocation?: 'main' | 'bridvia-connect'
}

export default function ScrollAIPanel({ heroSectionSelector = ".hero-section", userLocation = 'main' }: ScrollAIPanelProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      const isMobileUA = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
      const isSmallScreen = window.innerWidth <= 768
      setIsMobile(isMobileUA || isSmallScreen)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    const handleScroll = () => {
      // For main page, check if we've scrolled past the NewsLetter component (which is the first section)
      // For bridvia-connect page, check if we've scrolled past the Hero component
      const firstSection = document.querySelector('[data-first-section]') || 
                          document.querySelector('section') ||
                          document.body.firstElementChild
      
      if (firstSection) {
        const rect = firstSection.getBoundingClientRect()
        // Show when the first section is no longer fully visible (scrolled past it)
        const shouldShow = rect.bottom <= window.innerHeight * 0.8
        setIsVisible(shouldShow)
      }
    }

    // Check initial scroll position
    handleScroll()
    
    // Add scroll listener with throttling for better performance
    let timeoutId: NodeJS.Timeout
    const throttledHandleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 16) // ~60fps
    }
    
    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
      window.removeEventListener('resize', checkIsMobile)
      clearTimeout(timeoutId)
    }
  }, [])

  const handleMobileClick = () => {
    if (isMobile) {
      setIsFullScreen(true)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }
  }

  const handleCloseFullScreen = () => {
    setIsFullScreen(false)
    // Re-enable body scroll
    document.body.style.overflow = 'unset'
  }

  // Mobile Full-Screen Modal
  if (isMobile && isFullScreen) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Blur Background */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseFullScreen}
          />
          
          {/* Close Button */}
          <motion.button
            className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-200 shadow-lg"
            onClick={handleCloseFullScreen}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 30 }}
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* AI Component Container - Properly Centered */}
          <motion.div
            className="relative z-[105] w-full max-w-sm mx-auto flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
            style={{ height: '70vh', minHeight: '400px', maxHeight: '600px' }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <MorphPanel userLocation={userLocation} isMobileFullScreen={true} onClose={handleCloseFullScreen} />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <motion.div
      className={`fixed ${isMobile ? 'bottom-4 right-4' : 'bottom-2 right-2 sm:right-6'} z-50`}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20,
        x: isVisible ? 0 : 20,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      initial={{ 
        opacity: 0, 
        scale: 0.8, 
        y: 20,
        x: 20,
        pointerEvents: 'none'
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.6
      }}
      style={{
        visibility: isVisible ? 'visible' : 'hidden'
      }}
    >
      <div 
        onClick={isMobile ? handleMobileClick : undefined}
        className={isMobile ? "cursor-pointer inline-block" : ""}
        style={{
          width: 'fit-content',
          height: 'fit-content'
        }}
      >
        <MorphPanel userLocation={userLocation} />
      </div>
    </motion.div>
  )
}