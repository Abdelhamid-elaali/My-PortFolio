"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, type ReactNode } from "react"

// Animation variants for different entrance effects
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 }, // Reduced from 60
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] as const }, // Reduced from 0.6
  },
}

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 }, // Reduced from 60
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] as const }, // Reduced from 0.6
  },
}

export const fadeInRight = {
  hidden: { opacity: 0, x: 40 }, // Reduced from 60
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] as const }, // Reduced from 0.6
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 }, // Reduced from 0.8
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] as const }, // Reduced from 0.5
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // Reduced from 0.1
      delayChildren: 0.05, // Reduced from 0.1
    },
  },
}

// Enhanced scroll animation component
interface MotionWrapperProps {
  children: ReactNode
  variant?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn"
  delay?: number
  className?: string
  once?: boolean
}

export function MotionWrapper({
  children,
  variant = "fadeInUp",
  delay = 0,
  className = "",
  once = true,
}: MotionWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px" })

  const variants = {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    scaleIn,
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Parallax wrapper for background elements
interface ParallaxWrapperProps {
  children: ReactNode
  offset?: number
  className?: string
}

export function ParallaxWrapper({ children, offset = 50, className = "" }: ParallaxWrapperProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, offset])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

// Hover animation wrapper
interface HoverWrapperProps {
  children: ReactNode
  scale?: number
  className?: string
}

export function HoverWrapper({ children, scale = 1.03, className = "" }: HoverWrapperProps) { // Reduced from 1.05
  return (
    <motion.div
      whileHover={{
        scale,
        transition: { duration: 0.15, ease: "easeOut" }, // Reduced from 0.2
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
