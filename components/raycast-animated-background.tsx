import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import UnicornScene from "unicornstudio-react";

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
        <UnicornScene 
        production={true} projectId="cbmTT38A0CcuYxeiyj5H" width={width} height={height} />
    </div>
  );
};

// Background wrapper component for section usage
export const RaycastBackground = ({ 
  children, 
  className, 
  height = 600 
}: { 
  children?: React.ReactNode;
  className?: string;
  height?: number;
}) => {
  const { width } = useWindowSize();
  const [isMounted, setIsMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsClient(true);
  }, []);

  if (!isMounted || !isClient) {
    return (
      <div className={cn("relative overflow-hidden", className)} style={{ height }}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-indigo-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {children}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)} style={{ height }}>
      <div className="absolute inset-0">
        <UnicornScene 
          production={true} 
          projectId="cbmTT38A0CcuYxeiyj5H" 
          width={width} 
          height={height} 
        />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

