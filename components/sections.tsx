"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Users,
  Building2,
  GraduationCap,
  Target,
  Network,
  TrendingUp,
  ArrowRight,
} from "lucide-react"
import { RaycastBackground } from "@/components/raycast-animated-background"
import { GridFeatureCards } from "@/components/grid-feature-cards"
import FooterSection from "@/components/footer"
import { WavePath } from "@/components/wave-path"

function SectionHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center mb-12">
      {eyebrow ? (
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/60 text-foreground/80 backdrop-blur-sm mb-4 border border-border">
          <span className="text-xs font-light">{eyebrow}</span>
        </div>
      ) : null}
      <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm text-muted-foreground max-w-prose mx-auto">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export default function Sections() {
  return (
    <>
      <AboutSection />
      <HowItWorksSection />
      <BenefitsSection />
      <WhyBridviaSection />
      <RaycastShowcaseSection />
      <CTASection />
    </>
  )
}

function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="About BridviaConnect"
          title="The bridge between talents and companies"
          description="We're focused on helping students gain practical experience while building their future careers through real, structured, and career-oriented internships."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-foreground">Bridging Education and Industry</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                BridviaConnect addresses the critical gap between education and industry readiness. We partner with companies of all sizes to provide hands-on internship experiences for graduates, career switchers, certification completers, and professionals seeking real-world skills.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We believe in the power of practical experience to transform careers and prepare talent for the demands of tomorrow's workplace.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative rounded-2xl border border-border bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.02] backdrop-blur p-8"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Users className="size-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">For Students</h4>
                  <p className="text-xs text-muted-foreground">Build your career foundation</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Building2 className="size-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">For Companies</h4>
                  <p className="text-xs text-muted-foreground">Access eager, trainable talent</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Sign Up",
      desc: "Create your profile and showcase your skills, interests, and career aspirations."
    },
    {
      number: "02", 
      title: "Get Matched",
      desc: "Our platform connects you with internship opportunities that align with your goals and company needs."
    },
    {
      number: "03",
      title: "Start Learning",
      desc: "Gain real-world skills, build professional networks, and accelerate your career growth."
    }
  ]

  return (
    <section id="how-it-works" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="How It Works"
          title="Your journey in three simple steps"
          description="From profile creation to career acceleration - we've streamlined the process to get you started quickly."
        />

        <div className="relative flex flex-col items-center">
          {/* Interactive Wave Path */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16"
          >
            <WavePath className="text-primary" />
          </motion.div>

          {/* Steps Layout */}
          <div className="relative w-full max-w-4xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-12 md:space-y-0 md:space-x-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                  className="flex-1 text-center group"
                >
                  <div className="relative">
                    {/* Step Number */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 text-primary font-medium text-lg mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      {step.number}
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                      {step.desc}
                    </p>

                    {/* Connecting Line for Desktop */}
                    {i < steps.length - 1 && (
                      <div className="hidden md:block absolute top-6 left-[calc(100%+1rem)] w-8 h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BenefitsSection() {
  const benefits = [
    {
      icon: GraduationCap,
      title: "Practical Work Experience",
      description: "Get hands-on experience with real projects and industry-standard tools and processes."
    },
    {
      icon: Network,
      title: "Professional Network",
      description: "Connect with industry professionals, mentors, and peers who can guide your career."
    },
    {
      icon: TrendingUp,
      title: "Increased Employability",
      description: "Build a strong portfolio and gain the skills that make you stand out to employers."
    },
    {
      icon: Target,
      title: "Career Clarity",
      description: "Discover your strengths and interests through real-world application and feedback."
    },
    {
      icon: Building2,
      title: "Industry Exposure",
      description: "Learn how top companies operate and understand different career paths available."
    },
    {
      icon: Users,
      title: "Mentorship Access",
      description: "Get guidance from experienced professionals who are invested in your growth."
    }
  ]

  return (
    <section id="benefits" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Benefits"
          title="Why choose BridviaConnect"
          description="Unlock opportunities that bridge the gap between education and industry, preparing you for tomorrow's workplace demands."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <GridFeatureCards features={benefits} />
        </motion.div>
      </div>
    </section>
  )
}

function WhyBridviaSection() {
  const items = [
    {
      k: "01",
      title: "Structured Programs",
      desc: "Every internship is carefully designed with clear learning objectives, mentorship, and career development paths."
    },
    {
      k: "02", 
      title: "Quality Partnerships", 
      desc: "We work exclusively with reputable companies committed to providing meaningful learning experiences."
    },
    {
      k: "03", 
      title: "Future-Ready Skills", 
      desc: "Focus on in-demand technical and soft skills that prepare you for the evolving job market."
    }
  ]
  
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.02] backdrop-blur p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
              Why Choose Bridvia
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Bridvia is more than internships — we are shaping the future workforce through strategic partnerships and comprehensive career development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {items.map((it, i) => (
              <motion.div
                key={it.k}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
              >
                <div className="text-muted-foreground text-xs tracking-widest mb-2">{it.k}</div>
                <h3 className="text-lg text-foreground mb-2 font-normal">{it.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function RaycastShowcaseSection() {
  return (
    <section className="relative">
      <RaycastBackground height={600} className="flex items-center justify-center">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="text-white/90 text-sm font-light">✨ Experience the Future</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6">
              Where <span className="font-medium italic">Innovation</span>
              <br />
              Meets <span className="font-medium italic">Opportunity</span>
            </h2>
            
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Step into the future of career development with immersive experiences that prepare you for tomorrow's challenges.
            </p>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button onClick={() => window.openHighlightPopup?.()} className="group px-8 py-4 rounded-full bg-white text-black font-medium text-sm transition-all duration-300 hover:bg-white/90 hover:scale-105 cursor-pointer flex items-center gap-2">
                Explore Opportunities
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </RaycastBackground>
    </section>
  )
}

function CTASection() {
  return (
    <section id="get-started" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-r from-foreground/[0.06] to-foreground/[0.02] p-8 md:p-12">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -left-24 size-48 rounded-full bg-foreground/10 blur-3xl" />
            <div className="absolute -bottom-16 -right-12 size-40 rounded-full bg-foreground/10 blur-2xl" />
          </div>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-light text-foreground tracking-tight mb-2">
                Start your career journey today
              </h3>
              <p className="text-sm text-muted-foreground max-w-prose">
                Join BridviaConnect and unlock opportunities that will accelerate your professional growth and shape your future.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="#about"
                className="px-8 py-3 rounded-full border border-border text-foreground text-sm hover:bg-foreground/10 transition-colors"
              >
                Learn More
              </Link>
              <button onClick={() => window.openSecurityPopup?.('apply')} className="px-8 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-colors hover:bg-primary/90">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}