import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ServicesSection } from "@/components/services-section"
import { Footer } from "@/components/footer"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { AnimatedBackground } from "@/components/animated-background"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background relative z-0">
      <AnimatedBackground />
      <div className="relative z-10">
        <ScrollIndicator />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ServicesSection />
        <Footer />
      </div>
    </main>
  )
}
