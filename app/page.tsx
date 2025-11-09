import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { AnimatedBackground } from "@/components/animated-background"
import { PerformanceMonitor } from "@/components/performance-monitor"

// Lazy load heavy sections
const ProjectsSection = dynamic(() => import("@/components/projects-section").then(mod => ({ default: mod.ProjectsSection })), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>,
  ssr: false
})

const ServicesSection = dynamic(() => import("@/components/services-section").then(mod => ({ default: mod.ServicesSection })), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>,
  ssr: false
})

const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="h-20 bg-muted/20"></div>,
  ssr: false
})

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background relative z-0">
      <AnimatedBackground />
      <div className="relative z-10 overflow-x-hidden scroll-smooth">
        <ScrollIndicator />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ServicesSection />
        <Footer />
      </div>
      <PerformanceMonitor />
    </main>
  )
}
