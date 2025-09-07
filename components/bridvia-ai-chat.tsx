"use client"

import React, { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "motion/react"
import { X, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

interface AIKnowledgeBase {
  bridvia: {
    mission: string
    vision: string
    values: string[]
    services: string[]
    targetAudience: string[]
    benefits: string[]
    contact: string
  }
  bridviaConnect: {
    description: string
    phase: string
    targetUsers: string[]
    benefits: string[]
    howItWorks: string[]
    companies: string[]
    features: string[]
  }
  general: {
    faqs: Array<{ question: string; answer: string }>
  }
}

const knowledgeBase: AIKnowledgeBase = {
  bridvia: {
    mission: "Building infrastructure that connects talent with opportunity, creating pathways for sustainable career growth through hands-on experiences.",
    vision: "To reshape career development by bridging the gap between education and industry readiness.",
    values: ["Enterprise partnerships", "Talent development", "Industry alignment", "Hands-on experience"],
    services: ["BridviaConnect (Phase 1)", "Future phases in development"],
    targetAudience: ["Recent graduates", "Career switchers", "Certification completers", "Professionals seeking experience", "Companies of all sizes"],
    benefits: ["Bridge education-industry gap", "Hands-on experience", "Industry-ready skills", "Strategic partnerships"],
    contact: "info@bridvia.com"
  },
  bridviaConnect: {
    description: "Phase 1 of Bridvia's ecosystem, providing early access to internship opportunities that bridge the gap between education and industry readiness.",
    phase: "Phase 1 - Internship Opportunities",
    targetUsers: ["Graduates lacking hands-on experience", "Career switchers", "Certification completers", "Professionals seeking real-world experience"],
    benefits: ["Practical work experience", "Professional network building", "Increased employability", "Career clarity", "Industry exposure", "Mentorship access"],
    howItWorks: ["Sign up and create your profile", "Get matched with relevant opportunities", "Start learning through hands-on experiences"],
    companies: ["Partners with companies of all sizes", "Creates mutual benefits", "Builds talent pipeline", "Enhances company reputation"],
    features: ["Structured internship programs", "Real project experience", "Professional mentorship", "Industry-standard tools"]
  },
  general: {
    faqs: [
      {
        question: "What is the difference between Bridvia and BridviaConnect?",
        answer: "Bridvia is the main company that builds infrastructure connecting talent with opportunity. BridviaConnect is Phase 1 of our platform, specifically focused on internship opportunities."
      },
      {
        question: "Who can use BridviaConnect?",
        answer: "BridviaConnect is designed for graduates, career switchers, certification completers, and professionals seeking hands-on experience to bridge the gap between education and industry."
      },
      {
        question: "How do companies benefit from partnering with Bridvia?",
        answer: "Companies gain access to a motivated talent pool, enhance their reputation as industry contributors, and build long-term talent pipelines while supporting workforce development."
      },
      {
        question: "What makes Bridvia different?",
        answer: "We focus on solving the critical gap between education and industry readiness through structured, hands-on experiences rather than just job placement."
      },
      {
        question: "Is there a cost to use BridviaConnect?",
        answer: "We're currently in development phase. Please contact us at info@bridvia.com for the latest information about our programs."
      }
    ]
  }
}

interface BridviaAIChatProps {
  context: 'bridvia' | 'bridviaConnect'
  className?: string
}

export function BridviaAIChat({ context, className }: BridviaAIChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: context === 'bridvia' 
          ? "Hello! I'm here to help you learn about Bridvia and how we're building infrastructure that connects talent with opportunity. What would you like to know?"
          : "Hi! I'm here to answer questions about BridviaConnect, our Phase 1 platform for internship opportunities. How can I help you today?",
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, context, messages.length])

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Check for specific keywords and provide contextual responses
    if (lowerMessage.includes('what is bridvia') || lowerMessage.includes('about bridvia')) {
      return knowledgeBase.bridvia.mission + " " + knowledgeBase.bridvia.vision
    }
    
    if (lowerMessage.includes('bridviaconnect') || lowerMessage.includes('phase 1')) {
      return knowledgeBase.bridviaConnect.description
    }
    
    if (lowerMessage.includes('who can') || lowerMessage.includes('target') || lowerMessage.includes('audience')) {
      const users = context === 'bridvia' ? knowledgeBase.bridvia.targetAudience : knowledgeBase.bridviaConnect.targetUsers
      return `Our platform is designed for: ${users.join(', ')}. We serve anyone looking to bridge the gap between education and industry readiness.`
    }
    
    if (lowerMessage.includes('how') && lowerMessage.includes('work')) {
      return `Here's how BridviaConnect works: ${knowledgeBase.bridviaConnect.howItWorks.join(' → ')}. Each step is designed to provide meaningful, hands-on experience.`
    }
    
    if (lowerMessage.includes('benefit') || lowerMessage.includes('advantage')) {
      const benefits = context === 'bridvia' ? knowledgeBase.bridvia.benefits : knowledgeBase.bridviaConnect.benefits
      return `Key benefits include: ${benefits.join(', ')}. Our focus is on practical experience that prepares you for industry demands.`
    }
    
    if (lowerMessage.includes('companies') || lowerMessage.includes('partner')) {
      return "We partner with companies of all sizes to create meaningful internship opportunities. Companies benefit by accessing motivated talent, building their reputation, and developing long-term talent pipelines."
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      return `You can contact us at ${knowledgeBase.bridvia.contact}. We're here to help answer any questions about our programs.`
    }
    
    if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('free')) {
      return "We're currently in development phase. Please contact us at info@bridvia.com for the latest information about our programs and any associated costs."
    }
    
    if (lowerMessage.includes('difference') && (lowerMessage.includes('bridvia') || lowerMessage.includes('connect'))) {
      return knowledgeBase.general.faqs[0].answer
    }
    
    // Check FAQ matches
    for (const faq of knowledgeBase.general.faqs) {
      if (lowerMessage.includes(faq.question.toLowerCase().split(' ').slice(0, 3).join(' '))) {
        return faq.answer
      }
    }
    
    // Fallback responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm here to help you learn about our platform. What specific aspect would you like to know more about?"
    }
    
    return "I'd be happy to help you with that! You can ask me about our mission, how our platform works, who we serve, benefits for users and companies, or how to get started. What specific information are you looking for?"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(userMessage.content),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 800 + Math.random() * 1200) // Random delay between 0.8-2s
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 h-96 bg-background border border-border rounded-lg shadow-lg overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="font-medium text-sm">
                  {context === 'bridvia' ? 'Bridvia AI Assistant' : 'BridviaConnect AI Assistant'}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.type === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                      message.type === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                  className="h-9 w-9"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <Button
        onClick={toggleChat}
        className={cn(
          "h-12 w-12 rounded-full shadow-lg transition-all duration-200",
          isOpen ? "rotate-0" : "hover:scale-110"
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </div>
  )
}

export default BridviaAIChat