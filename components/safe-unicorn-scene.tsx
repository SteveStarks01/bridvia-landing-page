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

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Don't render anything on server-side
  if (!isClient) {
    return <div className={`absolute inset-0 w-full h-full ${className || ''}`} />;
  }

  // Always attempt to render the UnicornScene - no fallbacks
  return (
    <UnicornErrorBoundary 
      className={className}
      fallback={
        <div className={`absolute inset-0 w-full h-full ${className || ''}`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient.from} ${fallbackGradient.via} ${fallbackGradient.to} opacity-80`} />
        </div>
      }
    >
      <Suspense fallback={<div className={`absolute inset-0 w-full h-full ${className || ''}`} />}>
        <UnicornScene
          production={production}
          projectId={projectId}
          width={width}
          height={height}
          // Keep mobile optimizations for performance but no fallbacks
          scale={typeof window !== 'undefined' && window.innerWidth <= 768 ? 0.9 : 1}
          fps={typeof window !== 'undefined' && window.innerWidth <= 768 ? 30 : 60}
        />
      </Suspense>
    </UnicornErrorBoundary>
  );
};

export default SafeUnicornScene;