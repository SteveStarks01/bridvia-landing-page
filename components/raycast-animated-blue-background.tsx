import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import SafeUnicornScene from "./safe-unicorn-scene";

export const useWindowSize = () => {
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
    
    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export const Component = () => {

  const { width, height } = useWindowSize();

  return (
    <div className={cn("flex flex-col items-center")}>
        <SafeUnicornScene 
        production={true} projectId="ed7SJMvTJEVxfqzypOOQ" width={width} height={height} 
        fallbackGradient={{
          from: 'from-blue-900/30',
          via: 'via-teal-900/30',
          to: 'to-cyan-900/40'
        }}
        />
    </div>
  );
};

