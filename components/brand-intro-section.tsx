"use client"
import { motion } from "framer-motion"
import { Building2, Users, Target } from "lucide-react"

export default function BrandIntroSection() {
  return (
    <section id="about" className="relative min-h-[400px] bg-black pt-24 md:pt-32 pb-24 md:pb-32">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,104,97,0.3)_1px,transparent_1px)] bg-[length:50px_50px]" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white mb-6">
            Empowering the <span className="font-medium italic">Next Generation</span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            We're building the infrastructure that connects talent with opportunity, 
            creating pathways for sustainable career growth through hands-on experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Building2,
              title: "Enterprise Ready",
              description: "Partnering with companies of all sizes to create meaningful opportunities"
            },
            {
              icon: Users,
              title: "Talent Development",
              description: "Supporting graduates, career switchers, and professionals seeking hands-on experience"
            },
            {
              icon: Target,
              title: "Industry Alignment",
              description: "Bridging the gap between education and industry-ready skills"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <item.icon className="w-8 h-8 text-white/90" />
              </div>
              <h3 className="text-xl font-medium text-white mb-4">{item.title}</h3>
              <p className="text-white/70 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}