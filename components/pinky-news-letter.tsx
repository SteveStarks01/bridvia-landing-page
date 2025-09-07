"use client"
import { Warp } from "@paper-design/shaders-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

// Global function to trigger Brid AI with inquiry
const triggerBridAI = (inquiry: string) => {
  // Scroll to the second section (BrandIntroSection)
  const scrollToSecondSection = () => {
    const brandIntroSection = document.querySelector('[data-first-section]')?.nextElementSibling;
    if (brandIntroSection) {
      const rect = brandIntroSection.getBoundingClientRect();
      const scrollTarget = window.scrollY + rect.top - 50; // Small offset from top
      window.scrollTo({ 
        top: scrollTarget,
        behavior: 'smooth' 
      });
    }
  };
  
  // Scroll to second section
  scrollToSecondSection();
  
  // Use a timeout to allow scroll animation to complete before triggering AI
  setTimeout(() => {
    // Dispatch a custom event that the AI component can listen to
    window.dispatchEvent(new CustomEvent('triggerBridAI', {
      detail: { inquiry }
    }));
  }, 1200); // 1.2 seconds to allow smooth scroll to complete
};

export default function NewsLetter() {
  const [isMounted, setIsMounted] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [inquiry, setInquiry] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleInquirySubmit = async () => {
    if (!inquiry.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Trigger Brid AI with the inquiry
      triggerBridAI(inquiry.trim());
      
      // Clear the input
      setInquiry("");
      
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    } finally {
      // Reset submitting state after a short delay
      setTimeout(() => setIsSubmitting(false), 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInquirySubmit();
    }
  };

  // Fallback gradient for mobile and SSR
  const FallbackGradient = () => (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1a8a7f] via-[#106861] to-[#0d5249]" />
  )
  return (
    <main className="relative min-h-screen overflow-hidden pb-24 md:pb-32">
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
            colors={["#1a8a7f", "#106861", "#0d5249", "#0a3d35"]}
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
            {/* Replace text "Bridvia" with Logo */}
            <div className="flex justify-center mb-4">
              <Image 
                src="/logos/Logo Text White.png" 
                alt="Bridvia" 
                width={250} 
                height={60}
                className="object-contain"
              />
            </div>
            <p className="text-white/90 text-xl md:text-2xl font-light mb-8">
              Building Infrastructure that Connects Talent with Opportunity
            </p>
          </motion.div>

          {/* Inquiry input with submit button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative max-w-lg mx-auto"
          >
            <input
              type="text"
              value={inquiry}
              onChange={(e) => setInquiry(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Have any inquiries?"
              className="w-full px-6 py-4 pr-20 text-lg bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#106861] focus:border-[#106861] transition-all duration-300"
              disabled={isSubmitting}
            />
            <button 
              onClick={handleInquirySubmit}
              disabled={!inquiry.trim() || isSubmitting}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full"
                />
              ) : (
                <svg
                  className="w-5 h-5 text-gray-800 group-hover:translate-x-0.5 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
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
              Join us as we build the infrastructure that connects talent with opportunity, creating pathways for sustainable career growth through hands-on experiences.
            </p>
            <div className="text-white/75 text-base font-light">
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-3 h-3 border border-white/50 border-t-white rounded-full"
                  />
                  Connecting you to Brid AI...
                </span>
              ) : (
                "Have questions? Ask Brid AI and get instant answers about our platform and opportunities."
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
