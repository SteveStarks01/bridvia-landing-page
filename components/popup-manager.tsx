"use client";
import { useState, useEffect } from "react";
import SecurityPopupCard from "./security-popup-card";
import HighlightPopupCard from "./highlight-popup-card";

export default function PopupManager() {
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isHighlightOpen, setIsHighlightOpen] = useState(false);
  const [actionType, setActionType] = useState<'login' | 'register' | 'apply'>('login');

  useEffect(() => {
    // Make the popup functions globally available
    window.openSecurityPopup = (type: 'login' | 'register' | 'apply') => {
      setActionType(type);
      setIsSecurityOpen(true);
    };

    window.openHighlightPopup = () => {
      setIsHighlightOpen(true);
    };

    // Cleanup
    return () => {
      window.openSecurityPopup = undefined;
      window.openHighlightPopup = undefined;
    };
  }, []);

  return (
    <>
      <SecurityPopupCard
        actionType={actionType}
        isOpen={isSecurityOpen}
        onClose={() => setIsSecurityOpen(false)}
      />
      <HighlightPopupCard
        isOpen={isHighlightOpen}
        onClose={() => setIsHighlightOpen(false)}
      />
    </>
  );
}

// Extend the Window interface to include our custom functions
declare global {
  interface Window {
    openSecurityPopup?: (type: 'login' | 'register' | 'apply') => void;
    openHighlightPopup?: () => void;
  }
}