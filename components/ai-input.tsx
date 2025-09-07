"use client"

import React from "react"
import { cx } from "class-variance-authority"
import { AnimatePresence, motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getUserLocation, getContextualPlaceholder } from "@/lib/user-location"

interface OrbProps {
  dimension?: string
  className?: string
  tones?: {
    base?: string
    accent1?: string
    accent2?: string
    accent3?: string
  }
  spinDuration?: number
}

const ColorOrb: React.FC<OrbProps> = ({
  dimension = "192px",
  className,
  tones,
  spinDuration = 20,
}) => {
  const fallbackTones = {
    base: "oklch(95% 0.02 264.695)",
    accent1: "oklch(75% 0.15 350)",
    accent2: "oklch(80% 0.12 200)",
    accent3: "oklch(78% 0.14 280)",
  }

  const palette = { ...fallbackTones, ...tones }

  const dimValue = parseInt(dimension.replace("px", ""), 10)

  const blurStrength =
    dimValue < 50 ? Math.max(dimValue * 0.008, 1) : Math.max(dimValue * 0.015, 4)

  const contrastStrength =
    dimValue < 50 ? Math.max(dimValue * 0.004, 1.2) : Math.max(dimValue * 0.008, 1.5)

  const pixelDot = dimValue < 50 ? Math.max(dimValue * 0.004, 0.05) : Math.max(dimValue * 0.008, 0.1)

  const shadowRange = dimValue < 50 ? Math.max(dimValue * 0.004, 0.5) : Math.max(dimValue * 0.008, 2)

  const maskRadius =
    dimValue < 30 ? "0%" : dimValue < 50 ? "5%" : dimValue < 100 ? "15%" : "25%"

  const adjustedContrast =
    dimValue < 30 ? 1.1 : dimValue < 50 ? Math.max(contrastStrength * 1.2, 1.3) : contrastStrength

  return (
    <div
      className={cn("color-orb", className)}
      style={{
        width: dimension,
        height: dimension,
        "--base": palette.base,
        "--accent1": palette.accent1,
        "--accent2": palette.accent2,
        "--accent3": palette.accent3,
        "--spin-duration": `${spinDuration}s`,
        "--blur": `${blurStrength}px`,
        "--contrast": adjustedContrast,
        "--dot": `${pixelDot}px`,
        "--shadow": `${shadowRange}px`,
        "--mask": maskRadius,
      } as React.CSSProperties}
    >
      <style jsx>{`
        @property --angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        .color-orb {
          display: grid;
          grid-template-areas: "stack";
          overflow: hidden;
          border-radius: 50%;
          position: relative;
          transform: scale(1.1);
        }

        .color-orb::before,
        .color-orb::after {
          content: "";
          display: block;
          grid-area: stack;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: translateZ(0);
        }

        .color-orb::before {
          background:
            conic-gradient(
              from calc(var(--angle) * 2) at 25% 70%,
              var(--accent3),
              transparent 20% 80%,
              var(--accent3)
            ),
            conic-gradient(
              from calc(var(--angle) * 2) at 45% 75%,
              var(--accent2),
              transparent 30% 60%,
              var(--accent2)
            ),
            conic-gradient(
              from calc(var(--angle) * -3) at 80% 20%,
              var(--accent1),
              transparent 40% 60%,
              var(--accent1)
            ),
            conic-gradient(
              from calc(var(--angle) * 2) at 15% 5%,
              var(--accent2),
              transparent 10% 90%,
              var(--accent2)
            ),
            conic-gradient(
              from calc(var(--angle) * 1) at 20% 80%,
              var(--accent1),
              transparent 10% 90%,
              var(--accent1)
            ),
            conic-gradient(
              from calc(var(--angle) * -2) at 85% 10%,
              var(--accent3),
              transparent 20% 80%,
              var(--accent3)
            );
          box-shadow: inset var(--base) 0 0 var(--shadow) calc(var(--shadow) * 0.2);
          filter: blur(var(--blur)) contrast(var(--contrast));
          animation: spin var(--spin-duration) linear infinite;
        }

        .color-orb::after {
          background-image: radial-gradient(
            circle at center,
            var(--base) var(--dot),
            transparent var(--dot)
          );
          background-size: calc(var(--dot) * 2) calc(var(--dot) * 2);
          backdrop-filter: blur(calc(var(--blur) * 2)) contrast(calc(var(--contrast) * 2));
          mix-blend-mode: overlay;
        }

        .color-orb[style*="--mask: 0%"]::after {
          mask-image: none;
        }

        .color-orb:not([style*="--mask: 0%"])::after {
          mask-image: radial-gradient(black var(--mask), transparent 75%);
        }

        @keyframes spin {
          to {
            --angle: 360deg;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .color-orb::before {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

const SPEED_FACTOR = 1

interface ContextShape {
  showForm: boolean
  successFlag: boolean
  isThinking: boolean
  response: string
  showResponse: boolean
  conversationHistory: Array<{role: string, content: string}>
  userLocation: 'main' | 'bridvia-connect'
  triggerOpen: () => void
  triggerClose: () => void
  askNewQuestion: () => void
}

const FormContext = React.createContext({} as ContextShape)
const useFormContext = () => React.useContext(FormContext)

export function MorphPanel({ userLocation }: { userLocation?: 'main' | 'bridvia-connect' }) {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)
  
  // Generate unique session ID for this component instance
  const [sessionId] = React.useState(() => `brid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`)
  
  // Auto-detect location if not provided
  const [detectedLocation, setDetectedLocation] = React.useState<'main' | 'bridvia-connect'>('main')
  const currentLocation = userLocation || detectedLocation
  
  React.useEffect(() => {
    if (!userLocation) {
      setDetectedLocation(getUserLocation())
    }
  }, [userLocation])

  const [showForm, setShowForm] = React.useState(false)
  const [successFlag, setSuccessFlag] = React.useState(false)
  const [isThinking, setIsThinking] = React.useState(false)
  const [response, setResponse] = React.useState("")
  const [showResponse, setShowResponse] = React.useState(false)
  const [conversationHistory, setConversationHistory] = React.useState<Array<{role: string, content: string}>>([])

  const triggerClose = React.useCallback(() => {
    setShowForm(false)
    setShowResponse(false)
    setIsThinking(false)
    setResponse("")
    textareaRef.current?.blur()
  }, [])

  const triggerOpen = React.useCallback(() => {
    setShowForm(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }, [])

  const handleSuccess = React.useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) return
    
    // Add user message to conversation history
    const newHistory = [...conversationHistory, { role: 'user', content: userMessage.trim() }]
    setConversationHistory(newHistory)
    
    // Morph to thinking state
    setShowForm(false)
    setIsThinking(true)
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.trim(),
          conversationHistory: newHistory.slice(-10), // Keep last 10 messages
          userLocation: currentLocation,
          sessionId: sessionId // Add unique session identifier
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }
      
      const data = await response.json()
      let aiResponse = data.response || data.fallbackResponse || 'I apologize, but I encountered an issue. Please contact us at info@bridvia.com.'
      
      // Filter out thinking process from AI response with multiple strategies
      let cleanResponse = aiResponse;
      
      // Remove explicit thinking markers
      cleanResponse = cleanResponse.replace(/◁think▷[\s\S]*?◁\/think▷/g, '');
      
      // Remove thinking content that starts with common thinking patterns
      cleanResponse = cleanResponse.replace(/^[\s\S]*?(?=(?:Hello|Hi|Hey|Welcome|Good|I'm|Brid|Thanks|Great|What|Sure|Absolutely|Of course|That's|This|Bridvia|The|Our|For|We're|BridviaConnect))/i, '');
      
      // If the response is too short or empty after filtering, try a different approach
      if (cleanResponse.trim().length < 20) {
        // Look for content after thinking markers
        const sentences = aiResponse.split('.');
        const goodSentences = sentences.filter((sentence: string) => {
          const s = sentence.trim().toLowerCase();
          return s.length > 10 && 
                 !s.startsWith('okay') && 
                 !s.startsWith('let\'s see') && 
                 !s.startsWith('looking at') && 
                 !s.startsWith('wait') && 
                 !s.startsWith('but wait') && 
                 !s.startsWith('first') && 
                 !s.startsWith('the user') && 
                 !s.startsWith('i need') && 
                 !s.includes('the correct response') &&
                 !s.includes('should be');
        });
        
        if (goodSentences.length > 0) {
          cleanResponse = goodSentences.join('.').trim();
          if (!cleanResponse.endsWith('.') && !cleanResponse.endsWith('!') && !cleanResponse.endsWith('?')) {
            cleanResponse += '.';
          }
        }
      }
      
      aiResponse = cleanResponse.trim();
      
      // Add AI response to conversation history
      const updatedHistory = [...newHistory, { role: 'assistant', content: aiResponse }]
      setConversationHistory(updatedHistory)
      
      setResponse(aiResponse)
      setIsThinking(false)
      setShowResponse(true)
      
    } catch (error) {
      console.error('AI API Error:', error)
      
      // Fallback response
      let fallbackResponse = `I understand you're asking about "${userMessage.substring(0, 50)}${userMessage.length > 50 ? '...' : ''}". I apologize, but I'm currently unable to process your request. Please contact us at info@bridvia.com for assistance with your inquiry about our platform and services.`
      
      // Filter out any thinking process that might be in fallback responses too
      let cleanFallback = fallbackResponse;
      
      // Remove explicit thinking markers
      cleanFallback = cleanFallback.replace(/◁think▷[\s\S]*?◁\/think▷/g, '');
      
      // Remove thinking content that starts with common thinking patterns
      cleanFallback = cleanFallback.replace(/^[\s\S]*?(?=(?:Hello|Hi|Hey|Welcome|Good|I'm|Brid|Thanks|Great|What|Sure|Absolutely|Of course|That's|This|Bridvia|The|Our|For|We're|BridviaConnect))/i, '');
      
      fallbackResponse = cleanFallback.trim();
      
      const updatedHistory = [...newHistory, { role: 'assistant', content: fallbackResponse }]
      setConversationHistory(updatedHistory)
      setResponse(fallbackResponse)
      setIsThinking(false)
      setShowResponse(true)
    }
  }, [conversationHistory, currentLocation])

  const askNewQuestion = React.useCallback(() => {
    setShowResponse(false)
    setResponse("")
    setShowForm(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }, [])

  // Listen for external trigger events from inquiry form
  React.useEffect(() => {
    const handleBridAITrigger = (event: CustomEvent) => {
      const { inquiry } = event.detail;
      if (inquiry) {
        // Auto-trigger the AI with the inquiry
        setTimeout(() => {
          triggerOpen();
          // Set the message and auto-submit after the form opens
          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.value = inquiry;
              // Trigger the handleSuccess function directly
              handleSuccess(inquiry);
            }
          }, 100);
        }, 500); // Small delay to ensure component is ready
      }
    };

    window.addEventListener('triggerBridAI', handleBridAITrigger as EventListener);
    
    return () => {
      window.removeEventListener('triggerBridAI', handleBridAITrigger as EventListener);
    };
  }, [triggerOpen, handleSuccess]);

  React.useEffect(() => {
    function clickOutsideHandler(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node) && showForm) {
        triggerClose()
      }
    }
    document.addEventListener("mousedown", clickOutsideHandler)
    return () => document.removeEventListener("mousedown", clickOutsideHandler)
  }, [showForm, triggerClose])

  const ctx = React.useMemo(
    () => ({ showForm, successFlag, isThinking, response, showResponse, conversationHistory, userLocation: currentLocation, triggerOpen, triggerClose, askNewQuestion }),
    [showForm, successFlag, isThinking, response, showResponse, conversationHistory, currentLocation, triggerOpen, triggerClose, askNewQuestion]
  )

  // Calculate dynamic dimensions based on state with mobile responsiveness
  const getWidth = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
    if (showResponse) return isMobile ? Math.min(window.innerWidth - 32, 380) : 420
    if (showForm) return isMobile ? Math.min(window.innerWidth - 32, 320) : FORM_WIDTH
    if (isThinking) return isMobile ? Math.min(window.innerWidth - 32, 260) : 280
    return "auto"
  }
  
  const getHeight = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
    if (showResponse) return isMobile ? Math.min(window.innerHeight - 120, 300) : 340
    if (showForm) return isMobile ? Math.min(window.innerHeight - 120, 180) : FORM_HEIGHT
    if (isThinking) return 120
    return 44
  }

  const getContainerDimensions = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
    if (isMobile) {
      return {
        width: Math.min(window.innerWidth - 16, 400),
        height: Math.min(window.innerHeight - 100, 360)
      }
    }
    return {
      width: Math.max(FORM_WIDTH, 420),
      height: Math.max(FORM_HEIGHT, 340)
    }
  }

  const containerDimensions = getContainerDimensions();

  return (
    <div className="flex items-center justify-center px-2 sm:px-0" style={containerDimensions}>
      <motion.div
        ref={wrapperRef}
        data-panel
        className={cx(
          "bg-background relative bottom-8 z-3 flex flex-col items-center overflow-hidden border",
          "max-sm:bottom-2 max-sm:mx-2 max-sm:rounded-lg"
        )}
        initial={false}
        animate={{
          width: getWidth(),
          height: getHeight(),
          borderRadius: showForm || showResponse ? 14 : 20,
        }}
        transition={{
          type: "spring",
          stiffness: 550 / SPEED_FACTOR,
          damping: 45,
          mass: 0.7,
          delay: showForm ? 0 : 0.08,
        }}
      >
        <FormContext.Provider value={ctx}>
          <DockBar />
          <InputForm ref={textareaRef} onSuccess={handleSuccess} />
          <ThinkingState />
          <ResponseDisplay />
        </FormContext.Provider>
      </motion.div>
    </div>
  )
}

function DockBar() {
  const { showForm, isThinking, showResponse, triggerOpen } = useFormContext()
  const isActive = showForm || isThinking || showResponse
  
  return (
    <AnimatePresence>
      {!isActive && (
        <motion.footer 
          className="mt-auto flex h-[44px] items-center justify-center whitespace-nowrap select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-center gap-3 px-4 max-sm:h-10 max-sm:px-3">
            <div className="flex w-fit items-center gap-2">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 25,
                  duration: 0.3 
                }}
              >
                <ColorOrb dimension="24px" tones={{ base: "oklch(22.64% 0 0)" }} />
                <motion.div
                  className="absolute inset-0 border border-foreground/20 rounded-full"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                className="flex h-fit flex-1 justify-center rounded-full px-4 py-2 bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 backdrop-blur-sm transition-all duration-200"
                variant="ghost"
                onClick={triggerOpen}
              >
                <span className="truncate text-sm font-medium">
                  Ask Brid AI
                </span>
              </Button>
            </motion.div>
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  )
}

const FORM_WIDTH = 360
const FORM_HEIGHT = 200

function InputForm({ ref, onSuccess }: { ref: React.Ref<HTMLTextAreaElement>; onSuccess: (message: string) => void }) {
  const { triggerClose, showForm, userLocation } = useFormContext()
  const [message, setMessage] = React.useState("")
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  React.useImperativeHandle(ref, () => textareaRef.current!)

  // Mobile responsive form dimensions
  const getFormDimensions = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
    if (isMobile) {
      return {
        width: Math.min(window.innerWidth - 32, 320),
        height: Math.min(window.innerHeight - 120, 180)
      }
    }
    return { width: FORM_WIDTH, height: FORM_HEIGHT }
  }

  async function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault()
    if (message?.trim()) {
      onSuccess(message.trim())
      setMessage("")
    }
  }

  function handleSendClick() {
    handleSubmit()
  }

  function handleKeys(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Escape") {
      triggerClose()
      return
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // No auto-resize needed - textarea will scroll internally
  React.useEffect(() => {
    // Focus management only
    if (textareaRef.current && showForm) {
      textareaRef.current.focus()
    }
  }, [showForm])

  const formDimensions = getFormDimensions();

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute bottom-0"
      style={{ ...formDimensions, pointerEvents: showForm ? "all" : "none" }}
    >
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 550 / SPEED_FACTOR, damping: 45, mass: 0.7 }}
            className="flex h-full flex-col p-1"
          >
            <div className="flex justify-between py-2 px-1">
              <div className="flex items-center gap-2">
                <ColorOrb dimension="20px" tones={{ base: "oklch(22.64% 0 0)" }} />
                <p className="text-foreground text-sm font-medium select-none">
                  Brid AI
                </p>
              </div>
              <button
                type="button"
                onClick={triggerClose}
                className="text-foreground/60 hover:text-foreground text-sm p-1 rounded transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 flex flex-col gap-3 p-3">
              <div className="flex-1 min-h-0">
                <textarea
                  ref={textareaRef}
                  placeholder={getContextualPlaceholder(userLocation)}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-full min-h-[80px] resize-none rounded-lg border border-border bg-background/50 backdrop-blur-sm p-3 text-sm outline-none focus:border-foreground/30 transition-colors placeholder:text-muted-foreground overflow-y-auto"
                  onKeyDown={handleKeys}
                  spellCheck={false}
                  style={{ 
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                />
                <style jsx>{`
                  textarea::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
              </div>
              
              {/* Fixed footer - always visible */}
              <div className="flex justify-between items-center pt-2 border-t border-border/20 bg-background/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <kbd className="px-2 py-1 bg-foreground/5 rounded border text-[10px]">Enter</kbd>
                  <span>to send</span>
                  <span className="text-foreground/30">•</span>
                  <kbd className="px-2 py-1 bg-foreground/5 rounded border text-[10px]">Shift+Enter</kbd>
                  <span>new line</span>
                </div>
                
                <motion.button
                  type="button"
                  onClick={handleSendClick}
                  disabled={!message.trim()}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground/10 hover:bg-foreground/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  whileHover={{ scale: message.trim() ? 1.05 : 1 }}
                  whileTap={{ scale: message.trim() ? 0.95 : 1 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-foreground">
                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

const SPRING_LOGO = { type: "spring", stiffness: 350 / SPEED_FACTOR, damping: 35 } as const

function KeyHint({ children, className }: { children: string; className?: string }) {
  return (
    <kbd
      className={cx(
        "text-foreground flex h-6 w-fit items-center justify-center rounded-sm border px-[6px] font-sans",
        className
      )}
    >
      {children}
    </kbd>
  )
}

function ThinkingState() {
  const { isThinking } = useFormContext()
  
  return (
    <AnimatePresence>
      {isThinking && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 550 / SPEED_FACTOR, damping: 45, mass: 0.7 }}
          className="absolute bottom-0 w-full flex flex-col items-center justify-center"
          style={{ width: 280, height: 120 }}
        >
          <div className="flex flex-col items-center gap-4">
            <ColorOrb dimension="24px" tones={{ base: "oklch(22.64% 0 0)" }} />
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-foreground/60 rounded-full"
                  animate={{ 
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ 
                    duration: 1.2, 
                    repeat: Infinity, 
                    delay: i * 0.2,
                    ease: "easeInOut",
                    repeatType: "loop"
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Component to format AI responses with markdown-like formatting
function FormattedResponse({ text }: { text: string }) {
  const formatText = (text: string) => {
    // Clean up the text and split into paragraphs
    const cleanText = text.replace(/\n{3,}/g, '\n\n').trim(); // Replace multiple line breaks with double
    const paragraphs = cleanText.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map((paragraph, pIndex) => {
      // Split into lines for processing
      const lines = paragraph.split('\n');
      const isNumberedList = lines.some(line => /^\d+\.\s/.test(line.trim()));
      const isBulletList = lines.some(line => /^[-*]\s/.test(line.trim()));
      
      if (isNumberedList) {
        return (
          <div key={pIndex} className="mb-4">
            <ol className="list-none space-y-3">
              {lines.map((line, lIndex) => {
                const trimmed = line.trim();
                if (/^\d+\.\s/.test(trimmed)) {
                  // Extract number and content
                  const match = trimmed.match(/^(\d+)\.\s(.*)/);
                  if (match) {
                    const [, number, content] = match;
                    return (
                      <li key={lIndex} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-foreground/10 text-foreground text-xs font-semibold rounded-full flex items-center justify-center mt-0.5">
                          {number}
                        </span>
                        <span className="text-sm leading-relaxed flex-1">
                          {formatInlineText(content)}
                        </span>
                      </li>
                    );
                  }
                }
                return null;
              }).filter(Boolean)}
            </ol>
          </div>
        );
      } else if (isBulletList) {
        return (
          <div key={pIndex} className="mb-4">
            <ul className="list-none space-y-2">
              {lines.map((line, lIndex) => {
                const trimmed = line.trim();
                if (/^[-*]\s/.test(trimmed)) {
                  const content = trimmed.replace(/^[-*]\s/, '');
                  return (
                    <li key={lIndex} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 bg-foreground/60 rounded-full mt-2"></span>
                      <span className="text-sm leading-relaxed flex-1">
                        {formatInlineText(content)}
                      </span>
                    </li>
                  );
                }
                return null;
              }).filter(Boolean)}
            </ul>
          </div>
        );
      } else {
        // Regular paragraph
        return (
          <p key={pIndex} className="mb-3 text-sm leading-relaxed">
            {formatInlineText(paragraph)}
          </p>
        );
      }
    });
  };
  
  const formatInlineText = (text: string) => {
    // Handle bold text (**text**) and email addresses
    let formattedText = text;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    
    // First handle bold text
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;
    
    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      // Add the bold text
      parts.push(
        <strong key={`bold-${match.index}`} className="font-semibold text-foreground">
          {match[1]}
        </strong>
      );
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    
    // If no bold text found, just return the original text with email formatting
    if (parts.length === 0) {
      return formatEmails(text);
    }
    
    // Format emails in each part
    return parts.map((part, index) => {
      if (typeof part === 'string') {
        return <span key={index}>{formatEmails(part)}</span>;
      }
      return part;
    });
  };
  
  const formatEmails = (text: string) => {
    const emailRegex = /(\S+@\S+\.\S+)/g;
    const parts = text.split(emailRegex);
    
    return parts.map((part, index) => {
      if (emailRegex.test(part)) {
        return (
          <a
            key={index}
            href={`mailto:${part}`}
            className="text-blue-600 hover:text-blue-800 underline transition-colors"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };
  
  return <div className="space-y-1">{formatText(text)}</div>;
}

function ResponseDisplay() {
  const { showResponse, response, triggerClose, askNewQuestion } = useFormContext()
  
  // Mobile responsive response dimensions
  const getResponseDimensions = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
    if (isMobile) {
      return {
        width: Math.min(window.innerWidth - 32, 380),
        height: Math.min(window.innerHeight - 120, 300)
      }
    }
    return { width: 420, height: 340 }
  }
  
  const responseDimensions = getResponseDimensions();
  
  return (
    <AnimatePresence>
      {showResponse && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 550 / SPEED_FACTOR, damping: 45, mass: 0.7 }}
          className="absolute bottom-0 w-full"
          style={responseDimensions}
        >
          <div className="flex flex-col h-full bg-background/95 backdrop-blur-md rounded-lg border border-border/50 shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center p-3 sm:p-4 border-b border-border/30">
              <div className="flex items-center gap-2 sm:gap-3">
                <ColorOrb dimension="20px" tones={{ base: "oklch(22.64% 0 0)" }} />
                <div>
                  <p className="text-foreground text-xs sm:text-sm font-medium">Brid AI</p>
                  <p className="text-muted-foreground text-xs">Here's your answer</p>
                </div>
              </div>
              <button
                onClick={triggerClose}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-foreground/10 text-foreground/60 hover:text-foreground transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* Response Content */}
            <div className="flex-1 p-3 sm:p-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="h-full"
              >
                <div 
                  className="h-full bg-gradient-to-br from-foreground/5 to-foreground/10 rounded-lg p-3 sm:p-5 text-foreground border border-foreground/10 backdrop-blur-sm overflow-y-auto"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    maxHeight: typeof window !== 'undefined' && window.innerWidth <= 640 ? '120px' : '160px'
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    <FormattedResponse text={response} />
                  </motion.div>
                </div>
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
              </motion.div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3 p-3 sm:p-4 pt-2 border-t border-border/20">
              <button
                onClick={askNewQuestion}
                className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-foreground/10 rounded-lg text-xs sm:text-sm font-medium text-foreground transition-colors duration-200 hover:bg-foreground/15"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="sm:w-4 sm:h-4">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="hidden sm:inline">Ask Another Question</span>
                <span className="sm:hidden">Ask Again</span>
              </button>
              
              <motion.button
                onClick={triggerClose}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MorphPanel
