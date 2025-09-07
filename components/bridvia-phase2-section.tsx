"use client"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import SafeUnicornScene from "./safe-unicorn-scene"
import { cn } from "@/lib/utils"
import { Lock, Sparkles } from "lucide-react"

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

// Animated black background component
const AnimatedBlackBackground = ({ children, className }: { children: React.ReactNode; className?: string }) => {
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

  // Fallback gradient for SSR
  const FallbackGradient = () => (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0d4449] via-[#0a3d35] to-black" />
  );

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Animated Background - Render consistently on all devices */}
      <div className="absolute inset-0">
        {isClient && isMounted ? (
          <SafeUnicornScene 
            production={true} 
            projectId="erpu4mAlEe8kmhaGKYe9" 
            width={width} 
            height={height}
            fallbackGradient={{
              from: 'from-[#0d4449]',
              via: 'via-[#0a3d35]', 
              to: 'to-black'
            }}
          />
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

export default function BridviaPhase2Section() {
  return (
    <AnimatedBlackBackground>
      <section className="relative min-h-[600px] flex flex-col items-center justify-center pt-24 md:pt-32 pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center justify-center space-y-8"
          >
            {/* Mysterious Badge - Perfectly Centered */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <Sparkles className="w-4 h-4 text-white/60 mr-2" />
              <span className="text-white/70 text-sm font-light">Phase 2 • Coming Soon</span>
            </div>
            
            {/* Main Headline - Perfectly Centered */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">
                The Next <span className="font-medium italic text-transparent bg-gradient-to-r from-white to-white/80 bg-clip-text">Evolution</span>
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white/90">
                Beyond Connection
              </h3>
              
              {/* Coming Soon Text */}
              <p className="text-xl text-white/70 font-light tracking-wide mt-6">
                Coming Soon
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </AnimatedBlackBackground>
  )
}