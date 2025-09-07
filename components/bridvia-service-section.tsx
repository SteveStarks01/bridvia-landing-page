"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Users, Target, TrendingUp, UserCheck, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import SafeUnicornScene from "./safe-unicorn-scene"
import { cn } from "@/lib/utils"

// Hook for window size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Animated background component
const AnimatedBlueBackground = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const { width, height } = useWindowSize();
  const [isMounted, setIsMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsClient(true);
    
    // Detect mobile devices
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileUA = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileUA || isSmallScreen);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Fallback gradient for SSR only
  const FallbackGradient = () => (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#106861] via-[#104661] to-[#0d4449]" />
  );

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Animated Background - Render consistently on all devices */}
      <div className="absolute inset-0">
        {isClient && isMounted ? (
          <>
            <SafeUnicornScene 
              production={true} 
              projectId="ed7SJMvTJEVxfqzypOOQ" 
              width={width} 
              height={height}
              fallbackGradient={{
                from: 'from-[#106861]',
                via: 'via-[#104661]', 
                to: 'to-[#0d4449]'
              }}
            />
            {/* Brand color overlay to blend with teal theme */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#106861]/25 via-transparent to-[#0d4449]/30 mix-blend-overlay" />
          </>
        ) : (
          <FallbackGradient />
        )}
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default function BridviaServiceSection() {
  return (
    <AnimatedBlueBackground>
      <section id="services" className="relative flex items-center justify-center min-h-[600px] pt-24 md:pt-32 pb-0">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
        
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Header Section - Maintaining original styling */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-white/90 mr-2" />
              <span className="text-white/90 text-sm font-light">Phase 1 • Now Available</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6">
              Where <span className="font-medium italic">Students</span>
              <br />
              Meet <span className="font-medium italic">Opportunity</span>
            </h2>
            
            <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              BridviaConnect is our Phase 1 solution, providing early access to internship opportunities that bridge 
              the gap between education and industry readiness, preparing talent for tomorrow's challenges.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex items-center justify-center">
              <Link
                href="/bridvia-connect"
                className="group px-8 py-4 rounded-full bg-white text-black font-medium text-sm transition-all duration-300 hover:bg-white/90 hover:scale-105 cursor-pointer flex items-center gap-2"
              >
                Explore BridviaConnect
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </AnimatedBlueBackground>
  )
}