"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [logoClicked, setLogoClicked] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50)
          
          // Real-time scroll spy calculation
          const scrollPosition = window.scrollY + 100 // Offset for navbar height
          const sections = navItems.map((item) => item.href.substring(1))
          
          for (const sectionId of sections) {
            const element = document.getElementById(sectionId)
            if (element) {
              const { offsetTop, offsetHeight } = element
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(sectionId)
                break
              }
            }
          }
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Initial call
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Enhanced Intersection Observer for backup detection
  useEffect(() => {
    const sections = navItems.map((item) => item.href.substring(1))
    const sectionElements = sections.map((id) => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: "-10% 0px -60% 0px", // More lenient for better detection
      },
    )

    sectionElements.forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(href.substring(1))
    }
  }

  const handleLogoClick = () => {
    setLogoClicked(true)
    scrollToSection("#home")
    // Re-enable hover effects after 2 seconds
    setTimeout(() => {
      setLogoClicked(false)
    }, 2000)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className={`transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full overflow-hidden ${
                logoClicked ? "" : "hover:scale-105"
              }`}
              aria-label="Go to Home section"
            >
              {/* Try to load custom logo first, fallback to text logo */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center">
                <Image
                  src="/images/abdelhamid-logo.png"
                  alt="Abdelhamid Portfolio Logo"
                  width={40}
                  height={40}
                  className="w-full h-full rounded-full object-cover"
                  priority
                  onError={(e) => {
                    // Hide image on error and show text fallback
                    e.currentTarget.style.display = 'none';
                    const textFallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (textFallback) textFallback.style.display = 'flex';
                  }}
                />
                {/* Text fallback logo */}
                <span className="text-primary-foreground font-bold text-xs sm:text-sm md:text-base hidden items-center justify-center w-full h-full">
                  A
                </span>
              </div>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`transition-colors duration-200 ${
                  activeSection === item.href.substring(1)
                    ? "text-primary font-medium" // indigo_dye for active state
                    : "text-foreground hover:text-primary" // default foreground with primary hover
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <Button
            onClick={() => scrollToSection("#contact")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Hire Me
          </Button>
        </div>
      </div>
    </nav>
  )
}
