"use client"

import { useEffect, useState } from "react"

export function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let rafId: number

    const handleScroll = () => {
      // Cancel previous RAF to prevent unnecessary updates
      if (rafId) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
        setScrollProgress(Math.min(100, Math.max(0, progress)))
      })
    }

    // Throttled scroll handler for better performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })
    
    // Initial calculation
    handleScroll()

    return () => {
      window.removeEventListener("scroll", throttledScroll)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <div
      className="scroll-indicator"
      style={{
        transform: `scaleX(${scrollProgress / 100})`,
      }}
    />
  )
}
