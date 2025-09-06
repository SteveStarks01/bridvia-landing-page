"use client"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import UnicornScene from "unicornstudio-react"
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
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-black via-gray-900/80 to-black" />
  );

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        {isClient && isMounted ? (
          <UnicornScene 
            production={true} 
            projectId="erpu4mAlEe8kmhaGKYe9" 
            width={width} 
            height={height} 
          />
        ) : (
          <FallbackGradient />
        )}
      </div>
      
      {/* Blur overlay for suspense effect */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-black/30" />
      
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
      <section className="relative flex items-center justify-center min-h-[500px] -mt-24 pt-32 pb-20">
        {/* Smooth gradient transition from Phase 1 */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-blue-900/20 via-gray-900/40 to-transparent pointer-events-none" />
        
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* Mysterious Badge - Now Visible */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6 relative">
              <Sparkles className="w-4 h-4 text-white/60 mr-2" />
              <span className="text-white/70 text-sm font-light">Phase 2 • Coming Soon</span>
            </div>
            
            {/* Clear Main Headline */}
            <div className="relative">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white mb-4">
                The Next <span className="font-medium italic text-transparent bg-gradient-to-r from-white to-white/80 bg-clip-text">Evolution</span>
                <br />
                <span className="text-white/90">Beyond Connection</span>
              </h2>
              
              {/* Coming Soon Text */}
              <p className="text-lg text-white/70 mb-8 font-light tracking-wide">
                Coming Soon
              </p>
              
              {/* Everything below heavily blurred and abstract */}
              <div className="space-y-4 mb-10 blur-[12px]">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 bg-gray-700/40 rounded" />
                  <div className="w-32 h-3 bg-gray-600/30 rounded" />
                </div>
                
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 bg-gray-700/40 rounded" />
                  <div className="w-36 h-3 bg-gray-600/30 rounded" />
                </div>
                
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 bg-gray-700/40 rounded" />
                  <div className="w-28 h-3 bg-gray-600/30 rounded" />
                </div>
              </div>
              
              {/* Abstract blurred paragraph */}
              <div className="mb-12 max-w-xl mx-auto space-y-2 blur-[15px]">
                <div className="w-full h-3 bg-gray-600/20 rounded" />
                <div className="w-5/6 h-3 bg-gray-600/20 rounded mx-auto" />
                <div className="w-4/5 h-3 bg-gray-600/20 rounded mx-auto" />
              </div>
            </div>
            
            {/* Heavily blurred CTA */}
            <div className="flex items-center justify-center">
              <div className="px-8 py-4 rounded-full bg-black/20 border border-gray-800/20 backdrop-blur-lg blur-[10px]">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-700/40 rounded" />
                  <div className="w-16 h-3 bg-gray-600/30 rounded" />
                  <div className="w-2 h-2 bg-gray-700/40 rounded-full" />
                </div>
              </div>
            </div>
            
            {/* Abstract hint - heavily blurred */}
            <div className="mt-8 blur-[12px]">
              <div className="w-48 h-2 bg-gray-700/20 rounded mx-auto" />
            </div>
          </motion.div>
        </div>
      </section>
    </AnimatedBlackBackground>
  )
}