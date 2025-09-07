"use client"
import { motion } from "framer-motion"
import { ArrowRight, Mail, Globe } from "lucide-react"
import Link from "next/link"

export default function CallToActionSection() {
  return (
    <section className="relative min-h-[500px] bg-black pt-24 md:pt-32 pb-24 md:pb-32">
      {/* Subtle animated dots */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,104,97,0.2)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(16,104,97,0.1)_0%,transparent_50%)]" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6">
            Ready to <span className="font-medium italic">Shape</span> the Future?
          </h2>
          
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the movement to reshape career development. Whether you're a recent graduate, career switcher, 
            or professional seeking hands-on experience, we're here to connect you with meaningful opportunities.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button onClick={() => window.openSecurityPopup?.('register')} className="group px-8 py-4 rounded-full bg-white text-black font-medium text-sm transition-all duration-300 hover:bg-white/90 hover:scale-105 cursor-pointer flex items-center gap-2">
              Get Started Today
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <Link
              href="/#about"
              className="group px-8 py-4 rounded-full border border-white/30 text-white font-medium text-sm transition-all duration-300 hover:bg-white/10 hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              Learn More
              <Globe className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/60"
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="text-sm">info@bridvia.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="text-sm">Connecting Future Workforce</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}