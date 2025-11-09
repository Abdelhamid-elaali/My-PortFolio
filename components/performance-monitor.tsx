"use client"

import { useEffect, useState } from "react"

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fcp: 0,
    lcp: 0,
    cls: 0,
    fid: 0,
  })

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Monitor First Contentful Paint
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, fcp: entry.startTime }))
          }
        }
      })
      observer.observe({ entryTypes: ['paint'] })

      // Monitor Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }))
      }).observe({ entryTypes: ['largest-contentful-paint'] })

      // Monitor Cumulative Layout Shift
      let clsValue = 0
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        setMetrics(prev => ({ ...prev, cls: clsValue }))
      }).observe({ entryTypes: ['layout-shift'] })

      // Monitor First Input Delay
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          setMetrics(prev => ({ ...prev, fid: (entry as any).processingStart - entry.startTime }))
        }
      }).observe({ entryTypes: ['first-input'] })
    }
  }, [])

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 text-xs font-mono z-50">
      <div className="space-y-1">
        <div>FCP: {metrics.fcp.toFixed(0)}ms</div>
        <div>LCP: {metrics.lcp.toFixed(0)}ms</div>
        <div>CLS: {metrics.cls.toFixed(3)}</div>
        <div>FID: {metrics.fid.toFixed(0)}ms</div>
      </div>
    </div>
  )
}
