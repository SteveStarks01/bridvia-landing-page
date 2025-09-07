"use client"

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import UnicornErrorBoundary from './unicorn-error-boundary';

// Dynamic import to handle potential loading issues
const UnicornScene = React.lazy(() => 
  import('unicornstudio-react')
    .then((module) => {
      // Validate the module before using it
      if (!module || !module.default) {
        throw new Error('UnicornStudio module failed to load properly');
      }
      return module;
    })
    .catch((error) => {
      console.warn('UnicornStudio failed to load:', error?.message || 'Unknown error');
      // Return a safe fallback component that matches the expected interface
      return { 
        default: (props: any) => {
          React.useEffect(() => {
            if (props.onError) {
              props.onError(new Error('UnicornStudio failed to load'));
            }
          }, [props.onError]);
          return React.createElement('div', { className: 'unicorn-fallback' });
        }
      };
    })
);

interface SafeUnicornSceneProps {
  production?: boolean;
  projectId: string;
  width: number;
  height: number;
  className?: string;
  fallbackGradient?: {
    from: string;
    via: string;
    to: string;
  };
}

const LoadingFallback = ({ width, height, className }: { width: number; height: number; className?: string }) => (
  <div className={`absolute inset-0 w-full h-full ${className || ''}`}>
    {/* Base loading gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/50 to-gray-900 opacity-80" />
    
    {/* Loading animation */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    {/* Loading indicator */}
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="w-8 h-8 border-2 border-white/30 border-t-white/80 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  </div>
);

const SafeUnicornScene: React.FC<SafeUnicornSceneProps> = ({ 
  production = true, 
  projectId, 
  width, 
  height, 
  className,
  fallbackGradient = {
    from: 'from-gray-900',
    via: 'via-blue-900/50',
    to: 'to-gray-900'
  }
}) => {
  const [isClient, setIsClient] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const maxLoadAttempts = 3;

  useEffect(() => {
    setIsClient(true);
    
    // Detect mobile devices
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileUA = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth <= 768;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      setIsMobile(isMobileUA || isSmallScreen || isTouchDevice);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    // Set a timeout for loading state with retry logic
    const timer = setTimeout(() => {
      if (loadAttempts < maxLoadAttempts) {
        setLoadAttempts(prev => prev + 1);
        setIsLoading(true);
      } else {
        setIsLoading(false);
        if (!hasError) {
          console.warn(`UnicornScene failed to load after ${maxLoadAttempts} attempts, using fallback`);
          setHasError(true);
        }
      }
    }, 8000); // 8 second timeout

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [loadAttempts, hasError]);
  
  // Handle error callback
  const handleSceneError = React.useCallback((error?: any) => {
    console.warn(`UnicornScene error for project ${projectId}:`, error?.message || 'Unknown error');
    setHasError(true);
    setIsLoading(false);
  }, [projectId]);
  
  // Early return for invalid project ID
  if (!projectId || projectId.trim() === '') {
    console.warn('UnicornScene: Invalid or empty project ID provided');
    setHasError(true);
  }

  // Don't render anything on server-side
  if (!isClient) {
    return <LoadingFallback width={width} height={height} className={className} />;
  }

  // If there's an error, invalid project ID, or loading issues, show fallback
  if (hasError || !projectId || projectId.trim() === '' || (isLoading && loadAttempts >= maxLoadAttempts)) {
    return (
      <div className={`absolute inset-0 w-full h-full ${className || ''}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient.from} ${fallbackGradient.via} ${fallbackGradient.to} opacity-80`} />
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20"
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
        
        {/* Add subtle loading indicator for better UX */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-6 h-6 border-2 border-white/40 border-t-white/80 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        )}
      </div>
    );
  }
  
  // For mobile devices, prefer fallback to avoid performance issues
  if (isMobile && window.innerWidth <= 480) {
    return (
      <div className={`absolute inset-0 w-full h-full ${className || ''}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient.from} ${fallbackGradient.via} ${fallbackGradient.to} opacity-90`} />
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-transparent to-purple-600/15"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    );
  }

  return (
    <UnicornErrorBoundary 
      className={className}
      fallback={
        <div className={`absolute inset-0 w-full h-full ${className || ''}`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient.from} ${fallbackGradient.via} ${fallbackGradient.to} opacity-80`} />
          
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20"
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
        </div>
      }
    >
      <Suspense fallback={<LoadingFallback width={width} height={height} className={className} />}>
        <UnicornScene
          production={production}
          projectId={projectId}
          width={width}
          height={height}
          onError={handleSceneError}
          onLoad={() => {
            setIsLoading(false);
            setHasError(false);
          }}
          // Add mobile-optimized props
          lazyLoad={isMobile}
          scale={isMobile ? 0.8 : 1}
          fps={isMobile ? 30 : 60}
        />
      </Suspense>
    </UnicornErrorBoundary>
  );
};

export default SafeUnicornScene;