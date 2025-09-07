/**
 * Utility to detect user location context for AI responses
 */

export function getUserLocation(): 'main' | 'bridvia-connect' {
  if (typeof window === 'undefined') {
    return 'main'; // Server-side default
  }
  
  const pathname = window.location.pathname;
  
  if (pathname.includes('/bridvia-connect')) {
    return 'bridvia-connect';
  }
  
  return 'main';
}

export function getContextualPlaceholder(userLocation: 'main' | 'bridvia-connect'): string {
  switch (userLocation) {
    case 'bridvia-connect':
      return 'Ask Brid AI about internships, career development, or BridviaConnect...';
    case 'main':
    default:
      return 'Ask Brid AI about Bridvia, our services, or how we can help...';
  }
}

export function getContextualWelcome(userLocation: 'main' | 'bridvia-connect'): string {
  switch (userLocation) {
    case 'bridvia-connect':
      return 'Hello! I\'m Brid AI, here to help you learn about BridviaConnect and our internship opportunities. How can I assist you today?';
    case 'main':
    default:
      return 'Hello! I\'m Brid AI, your Bridvia assistant. I can help you learn about our platform, services, and how we connect talent with opportunity. What would you like to know?';
  }
}