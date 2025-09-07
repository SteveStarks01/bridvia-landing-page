"use client"
import { useEffect, useRef, useState } from "react"
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import Image from "next/image"

export default function ShaderShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Handle client-side mounting and mobile detection
  useEffect(() => {
    setIsMounted(true)
    setIsClient(true)
    
    // Detect mobile devices
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      const isMobileUA = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
      const isSmallScreen = window.innerWidth <= 768
      setIsMobile(isMobileUA || isSmallScreen)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container && !isMobile) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [isMobile])

  // Enhanced fallback gradient with animation for mobile
  const FallbackGradient = () => (
    <div className="absolute inset-0 w-full h-full">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/50 to-black opacity-80" />
      
      {/* Animated overlay for mobile */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Moving gradient orbs for mobile animation */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/30 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  )

  // Fallback circle for mobile and SSR
  const FallbackCircle = () => (
    <div className="w-12 sm:w-15 h-12 sm:h-15 rounded-full border-2 border-white/30 bg-white/5 backdrop-blur-sm flex items-center justify-center">
      <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-full border border-white/50 animate-pulse" />
    </div>
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
          <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
        </defs>
      </svg>

      {/* Background Shaders - Render full shaders on desktop, animated fallback on mobile */}
      {isClient && isMounted ? (
        !isMobile ? (
          // Full shader animation for desktop
          <>
            <MeshGradient
              className="absolute inset-0 w-full h-full"
              colors={["#000000", "#8b5cf6", "#ffffff", "#1e1b4b", "#4c1d95"]}
              speed={0.3}
            />
            <MeshGradient
              className="absolute inset-0 w-full h-full opacity-60"
              colors={["#000000", "#ffffff", "#8b5cf6", "#000000"]}
              speed={0.2}
            />
          </>
        ) : (
          // Enhanced animated fallback for mobile
          <FallbackGradient />
        )
      ) : (
        // Simple fallback for SSR
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-black via-purple-900/50 to-black opacity-80" />
      )}

      <header className="relative z-20 flex items-center justify-between p-4 sm:p-6">
        <motion.div
          className="flex items-center group cursor-pointer"
          whileHover={!isMobile ? { scale: 1.05 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {/* Replace the SVG "M" logo with your Icon Logo */}
          <div className="relative">
            <Image 
              src="/logos/Logo Icon White.png" 
              alt="Bridvia Icon" 
              width={36} 
              height={36}
              className="object-contain"
            />
          </div>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {!isMobile && [...Array(6)].map((_, i) => {
              // Use deterministic values based on index to avoid hydration mismatch
              const positions = [
                { left: 46.9, top: 75.2, x: -5 },
                { left: 46.45, top: 26.6, x: 8 },
                { left: 48.5, top: 55, x: -3 },
                { left: 35.7, top: 50.6, x: 7 },
                { left: 33.6, top: 46.4, x: -6 },
                { left: 60.8, top: 42.5, x: 4 }
              ]
              const pos = positions[i] || { left: 50, top: 50, x: 0 }
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/60 rounded-full"
                  style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                  }}
                  animate={{
                    y: [-10, -20, -10],
                    x: [0, pos.x, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              )
            })}
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className={`items-center space-x-2 ${isMobile ? 'hidden' : 'flex'}`}>
          <a
            href="#how-it-works"
            className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            How It Works
          </a>
          <a
            href="#benefits"
            className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            Benefits
          </a>
          <a
            href="#about"
            className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            About
          </a>
        </nav>

        {/* Login Button */}
        <div className="flex items-center">
          <div id="gooey-btn" className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
            <button className="absolute right-0 px-2 py-1.5 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-7 flex items-center justify-center -translate-x-8 group-hover:-translate-x-16 z-0">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
            <button onClick={() => window.openSecurityPopup?.('login')} className="px-4 py-1.5 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-7 flex items-center z-10">
              Login
            </button>
          </div>
        </div>
      </header>

      <main className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 z-20 max-w-lg px-2 sm:px-4 md:px-0">
        <div className="text-left">
          <div
            className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-3 sm:mb-4 relative"
            style={{
              filter: "url(#glass-effect)",
            }}
          >
            <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
            <Sparkles className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-white/90 mr-1.5 sm:mr-2 relative z-10" />
            <span className="text-white/90 text-xs font-light relative z-10">Building Infrastructure that Connects Talent with Opportunity</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl lg:leading-16 tracking-tight font-light text-white mb-3 sm:mb-4">
            <span className="font-medium italic instrument">Bridge</span> Your
            <br />
            <span className="font-light tracking-tight text-white">Career Journey</span>
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm font-light text-white/70 mb-4 leading-relaxed max-w-md">
            BridviaConnect provides hands-on internship opportunities for graduates, career switchers, and professionals. 
            Gain practical experience, build your network, and prepare for industry demands.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
            <a href="#about" className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs sm:text-sm transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
              Learn More
            </a>
            <button onClick={() => window.openSecurityPopup?.('apply')} className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 rounded-full bg-white text-black font-normal text-xs sm:text-sm transition-all duration-200 hover:bg-white/90 cursor-pointer">
              Apply Now
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
