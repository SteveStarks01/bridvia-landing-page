"use client"
import { useEffect } from "react";
import Hero from "@/components/hero";
import Sections from "@/components/sections";

// Note: Since this is a client component, metadata needs to be handled by the root layout
// The title will be "BridviaConnect - Bridge Your Career Journey" via document.title if needed

export default function BridviaConnectPage() {
  useEffect(() => {
    // Force dark mode on this page
    document.documentElement.classList.add('dark');
    
    // Optional: Set page title for client-side navigation
    document.title = "BridviaConnect - Bridge Your Career Journey";
    
    // Cleanup function - let the main app handle theme restoration
    return () => {
      // The main app layout will handle theme management when navigating away
    };
  }, []);

  return (
    <>
      <Hero />
      <Sections />
    </>
  );
}