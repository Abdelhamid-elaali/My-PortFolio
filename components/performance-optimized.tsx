"use client"

import { memo, useMemo, useCallback, useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

// Performance-optimized background that reduces updates
export const OptimizedBackground = memo(function OptimizedBackground() {
  const gradientVariants = useMemo(() => ({
    animate: {
      background: [
        "radial-gradient(ellipse at 20% 50%, #0d1821 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, #344966 0%, transparent 50%), radial-gradient(ellipse at 40% 80%, #0d1821 0%, transparent 50%)",
        "radial-gradient(ellipse at 60% 30%, #344966 0%, transparent 50%), radial-gradient(ellipse at 30% 70%, #0d1821 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, #344966 0%, transparent 50%)",
        "radial-gradient(ellipse at 40% 20%, #0d1821 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, #344966 0%, transparent 50%), radial-gradient(ellipse at 20% 60%, #0d1821 0%, transparent 50%)",
      ],
    },
    transition: {
      duration: 30,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    },
  }), [])

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden pointer-events-none -z-10"
      animate={gradientVariants.animate}
      transition={gradientVariants.transition}
    />
  )
})

// Optimized scroll indicator with throttled updates
export const OptimizedScrollIndicator = memo(function OptimizedScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  const throttledUpdateScroll = useCallback(
    (() => {
      let lastCall = 0
      return () => {
        const now = Date.now()
        if (now - lastCall >= 50) { // Throttle to 50ms
          lastCall = now
          const scrollTop = window.scrollY
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          const progress = (scrollTop / docHeight) * 100
          setScrollProgress(progress)
        }
      }
    })(),
    []
  )

  useEffect(() => {
    window.addEventListener("scroll", throttledUpdateScroll, { passive: true })
    return () => window.removeEventListener("scroll", throttledUpdateScroll)
  }, [throttledUpdateScroll])

  return (
    <div 
      className="scroll-indicator"
      style={{ transform: `scaleX(${scrollProgress / 100})` }}
    />
  )
})

// Lazy load wrapper for intersection observer
export const LazyLoadWrapper = memo(function LazyLoadWrapper({ 
  children, 
  threshold = 0.1,
  rootMargin = "50px"
}: {
  children: React.ReactNode
  threshold?: number
  rootMargin?: string
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return (
    <div ref={ref}>
      {isVisible ? children : <div className="animate-pulse bg-muted/20 h-32 rounded" />}
    </div>
  )
})
