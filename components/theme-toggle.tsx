"use client"
import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

// A glassy dark/light mode toggle with a subtle gooey/liquid feel.
// It relies on the #gooey-filter defined in components/hero.tsx <svg><defs/></svg>.
// If used outside of Hero, you can duplicate that filter in a global <defs>.
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Hydration-safe: read initial theme from DOM/localStorage (layout pre-hydrates it)
    try {
      const root = document.documentElement
      const hasDark = root.classList.contains("dark")
      setIsDark(hasDark)
    } catch {}
    setMounted(true)
  }, [])

  const applyTheme = useCallback((dark: boolean) => {
    const root = document.documentElement
    try {
      // Add a short-lived class to smoothly transition colors
      root.classList.add("theme-transition")
      window.setTimeout(() => root.classList.remove("theme-transition"), 300)

      if (dark) {
        root.classList.add("dark")
        localStorage.setItem("theme", "dark")
      } else {
        root.classList.remove("dark")
        localStorage.setItem("theme", "light")
      }
    } catch {}
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    applyTheme(next)
  }

  // Avoid rendering mismatched UI before mount
  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="relative inline-flex items-center justify-center h-8 w-14 rounded-full border border-border/80 bg-foreground/[0.05] text-foreground/80 backdrop-blur px-1 cursor-pointer"
      />
    )
  }

  return (
    <div className="relative" style={{ filter: "url(#gooey-filter)" }}>
      <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="relative inline-flex items-center h-8 w-16 rounded-full border border-border bg-foreground/[0.06] hover:bg-foreground/[0.08] transition-colors backdrop-blur px-1 cursor-pointer overflow-hidden"
      >
        {/* Track sheen */}
        <span className="pointer-events-none absolute inset-0 opacity-30">
          <span className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent rounded-full" />
        </span>

        {/* Bubbles to create a liquid look when toggling */}
        <AnimatePresence initial={false}>
          {isDark ? (
            <motion.span
              key="bubble-dark"
              initial={{ x: -10, scale: 0.8, opacity: 0 }}
              animate={{ x: 0, scale: 1, opacity: 1 }}
              exit={{ x: -10, scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="absolute left-1 top-1 size-6 rounded-full bg-white text-black flex items-center justify-center shadow"
            >
              {/* Moon icon (cutout style) */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="bubble-light"
              initial={{ x: 10, scale: 0.8, opacity: 0 }}
              animate={{ x: 0, scale: 1, opacity: 1 }}
              exit={{ x: 10, scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="absolute right-1 top-1 size-6 rounded-full bg-black text-white flex items-center justify-center shadow"
            >
              {/* Sun icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.8 1.8-1.8zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zm7.03-2.03l1.8 1.79 1.79-1.79-1.79-1.8-1.8 1.8zM20 11v2h3v-2h-3zM6.76 19.16l-1.8 1.8 1.8 1.79 1.79-1.79-1.79-1.8zM11 1h2v3h-2V1zm7.07 3.93l1.79-1.79-1.79-1.79-1.8 1.79 1.8 1.79zM12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>

        {/* Sliding capsule behind the bubble to enhance liquid feel */}
        <motion.span
          aria-hidden
          className="absolute top-1 bottom-1 left-1 right-1 rounded-full bg-foreground/[0.08]"
          animate={{ x: isDark ? 0 : 8 }}
          transition={{ type: "spring", stiffness: 180, damping: 16 }}
        />

        {/* Labels (subtle) */}
        <span className="relative z-10 flex-1 text-[10px] font-medium text-foreground/60 text-center select-none">Dark</span>
        <span className="relative z-10 flex-1 text-[10px] font-medium text-foreground/60 text-center select-none">Light</span>
      </button>
    </div>
  )
}
