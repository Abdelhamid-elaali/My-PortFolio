"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedBackground } from "./animated-background"
import { TypewriterEffect } from "./typewriter-effect"

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  }

  const nameVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  }

  return (
    <section id="home" className="min-h-screen bg-muted/30 flex items-center justify-center relative overflow-hidden">
      <AnimatedBackground />

      <motion.div
        className="container mx-auto px-6 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 font-bitcount-single-ink"
            variants={nameVariants}
          >
            <TypewriterEffect
              words={["ABDELHAMID", "EL AALI", "FullStack Developer", "Creative Coder", "Problem Solver"]}
              className="text-[#b4cded]"
              speed={200}
              deleteSpeed={150}
              pauseDuration={3000}
              loop={true}
            />
          </motion.h1>

          <motion.p className="text-xl md:text-2xl text-muted-foreground mb-8" variants={itemVariants}>
            Full Stack Developer & IT Solutions
          </motion.p>

          <motion.p
            className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Crafting modern web applications and delivering comprehensive IT solutions with cutting-edge technologies
            and innovative approaches.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={() => scrollToSection("#projects")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
              >
                View My Work
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={() => scrollToSection("#contact")}
                className="bg-[#344966] hover:bg-[#b4cded] text-[#f0f4ef] hover:text-[#0d1821] border-2 border-[#344966] hover:border-[#b4cded] transition-all duration-300 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl"
              >
                Hire Me
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <motion.button
          onClick={() => scrollToSection("#about")}
          className="text-muted-foreground hover:text-primary transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>
    </section>
  )
}
