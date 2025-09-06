"use client"
import { Warp } from "@paper-design/shaders-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function NewsLetter() {
  const [isMounted, setIsMounted] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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

  // Fallback gradient for mobile and SSR
  const FallbackGradient = () => (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-pink-900 via-purple-900 to-pink-800" />
  )
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background shader - Render on both desktop and mobile */}
      <div className="absolute inset-0">
        {isClient && isMounted ? (
          <Warp
            style={{ height: "100%", width: "100%" }}
            proportion={isMobile ? 0.3 : 0.45}
            softness={1}
            distortion={isMobile ? 0.15 : 0.25}
            swirl={isMobile ? 0.6 : 0.8}
            swirlIterations={isMobile ? 6 : 10}
            shape="checks"
            shapeScale={isMobile ? 0.15 : 0.1}
            scale={1}
            rotation={0}
            speed={isMobile ? 0.5 : 1}
            colors={["hsl(340, 100%, 20%)", "hsl(320, 100%, 75%)", "hsl(350, 90%, 30%)", "hsl(330, 100%, 80%)"]}
          />
        ) : (
          <FallbackGradient />
        )}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <div className="max-w-4xl w-full text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-white text-6xl md:text-8xl font-sans font-light italic mb-4">
              Bridvia
            </h1>
            <p className="text-white/90 text-xl md:text-2xl font-light mb-8">
              Shaping Africa's Future Workforce
            </p>
          </motion.div>

          {/* Email input with submit button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative max-w-lg mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email for updates"
              className="w-full px-6 py-4 pr-20 text-lg bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
              <svg
                className="w-5 h-5 text-gray-800 group-hover:translate-x-0.5 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>

          {/* Description text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="space-y-4"
          >
            <p className="text-white/90 text-lg font-sans font-light leading-relaxed max-w-2xl mx-auto">
              Join us as we revolutionize career development across Africa through innovative technology solutions.
            </p>
            <p className="text-white/75 text-base font-light">
              Stay updated on our latest services and opportunities.
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
