"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MorphPanel } from "@/components/ai-input";

interface ScrollAIPanelProps {
  heroSectionSelector?: string;
  userLocation?: 'main' | 'bridvia-connect';
}

export default function ScrollAIPanel({ heroSectionSelector = ".hero-section", userLocation = 'main' }: ScrollAIPanelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // For main page, check if we've scrolled past the NewsLetter component (which is the first section)
      // For bridvia-connect page, check if we've scrolled past the Hero component
      const firstSection = document.querySelector('[data-first-section]') || 
                          document.querySelector('section') ||
                          document.body.firstElementChild;
      
      if (firstSection) {
        const rect = firstSection.getBoundingClientRect();
        // Show when the first section is no longer fully visible (scrolled past it)
        const shouldShow = rect.bottom <= window.innerHeight * 0.8;
        setIsVisible(shouldShow);
      }
    };

    // Check initial scroll position
    handleScroll();
    
    // Add scroll listener with throttling for better performance
    let timeoutId: NodeJS.Timeout;
    const throttledHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 16); // ~60fps
    };
    
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <motion.div
      className="fixed bottom-2 right-6 z-50"
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
      <MorphPanel userLocation={userLocation} />
    </motion.div>
  );
}