"use client"

import { useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Github, Linkedin, Mail, Heart, Twitter, Send } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Reset form
    setFormData({ name: "", email: "", message: "" })
    setIsSubmitting(false)
    
    // You can integrate with your preferred form handling service here
    console.log("Form submitted:", formData)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  // Animation constants for footer background
  const codeParticleCount = windowSize.width < 768 ? 6 : windowSize.width < 1024 ? 10 : 14
  const networkNodeCount = windowSize.width < 768 ? 4 : windowSize.width < 1024 ? 7 : 10
  const codeSymbols = ["<>", "{}", "[]", "()", "0", "1", "0", "1", "</", "/>", "&&", "||"]

  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg 
          className="relative block w-full h-20" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <motion.path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-background"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </div>
      
      {/* Gradient Background */}
      <div className="bg-gradient-to-br from-[#0d1821] to-[#344966] pt-20 relative">
        {/* Footer Background Animations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Code Particles */}
          {Array.from({ length: codeParticleCount }).map((_, i) => {
            const symbol = codeSymbols[i % codeSymbols.length]
            const isBinary = symbol === "0" || symbol === "1"
            return (
              <motion.div
                key={`footer-code-particle-${i}`}
                className="absolute font-mono text-xs opacity-10 select-none"
                style={{
                  color: isBinary ? "#b4cded" : "#f0f4ef",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: windowSize.width < 768 ? "8px" : "10px",
                  fontWeight: isBinary ? "300" : "400",
                }}
                animate={{
                  y: [0, -120 - Math.random() * 80, 0],
                  x: [0, (Math.random() - 0.5) * 60, 0],
                  opacity: [0, 0.15, 0],
                  rotate: [0, (Math.random() - 0.5) * 15, 0],
                }}
                transition={{
                  duration: 10 + Math.random() * 8,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 6,
                  ease: "easeInOut",
                }}
              >
                {symbol}
              </motion.div>
            )
          })}

          {/* Network/Plexus Animation */}
          <svg className="absolute inset-0 w-full h-full opacity-5" style={{ filter: "blur(0.5px)" }}>
            {Array.from({ length: networkNodeCount }).map((_, i) => {
              const x = (Math.sin(i * 2.2) * 0.4 + 0.5) * 100
              const y = (Math.cos(i * 1.6) * 0.4 + 0.5) * 100
              return (
                <g key={`footer-network-node-${i}`}>
                  <motion.circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r={windowSize.width < 768 ? "0.8" : "1"}
                    fill="#b4cded"
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                      r: [0.8, 1.5, 0.8],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 3,
                      ease: "easeInOut",
                    }}
                  />
                  {Array.from({ length: Math.min(2, networkNodeCount - i - 1) }).map((_, j) => {
                    const nextIndex = i + j + 1
                    if (nextIndex >= networkNodeCount) return null
                    const nextX = (Math.sin(nextIndex * 2.2) * 0.4 + 0.5) * 100
                    const nextY = (Math.cos(nextIndex * 1.6) * 0.4 + 0.5) * 100
                    const distance = Math.sqrt(Math.pow(nextX - x, 2) + Math.pow(nextY - y, 2))

                    if (distance < 35) {
                      return (
                        <motion.line
                          key={`footer-connection-${i}-${nextIndex}`}
                          x1={`${x}%`}
                          y1={`${y}%`}
                          x2={`${nextX}%`}
                          y2={`${nextY}%`}
                          stroke="#f0f4ef"
                          strokeWidth="0.3"
                          animate={{
                            opacity: [0, 0.2, 0],
                          }}
                          transition={{
                            duration: 5 + Math.random() * 4,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: Math.random() * 4,
                            ease: "easeInOut",
                          }}
                        />
                      )
                    }
                    return null
                  })}
                </g>
              )
            })}
          </svg>

          {/* Subtle Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.01]"
            style={{
              backgroundImage: `
                linear-gradient(#f0f4ef 1px, transparent 1px),
                linear-gradient(90deg, #f0f4ef 1px, transparent 1px)
              `,
              backgroundSize: windowSize.width < 768 ? "50px 50px" : "70px 70px",
            }}
          />

          {/* Floating Particles */}
          {Array.from({ length: windowSize.width < 768 ? 8 : 12 }).map((_, i) => (
            <motion.div
              key={`footer-particle-${i}`}
              className="absolute rounded-full opacity-10"
              style={{
                width: windowSize.width < 768 ? "1px" : "2px",
                height: windowSize.width < 768 ? "1px" : "2px",
                background: Math.random() > 0.5 ? "#b4cded" : "#f0f4ef",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100 - Math.random() * 60, 0],
                x: [0, (Math.random() - 0.5) * 80, 0],
                opacity: [0, 0.3, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 6,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 py-16 relative z-10">
          <motion.div 
            ref={ref}
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left Section - Brand & Social */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div>
                  <motion.h3 
                    className="text-3xl lg:text-4xl font-bold text-[#f0f4ef] mb-4 font-bitcount-single-ink"
                    variants={itemVariants}
                  >
                    ABDELHAMID
                  </motion.h3>
                  <motion.p 
                    className="text-[#b4cded] leading-relaxed text-lg max-w-md"
                    variants={itemVariants}
                  >
                    Full Stack Developer & IT Solutions specialist passionate about creating innovative digital experiences and delivering exceptional results.
                  </motion.p>
                </div>
                
                {/* Social Links */}
                <motion.div variants={itemVariants}>
                  <h4 className="text-[#f0f4ef] font-semibold mb-4 text-lg">Connect with me</h4>
                  <div className="flex space-x-4">
                    <motion.a
                      href="https://github.com/Abdelhamid-elaali"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#344966] border border-[#b4cded]/20 rounded-xl flex items-center justify-center text-[#b4cded] hover:text-[#f0f4ef] hover:bg-[#b4cded]/20 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title="GitHub Profile - Abdelhamid-elaali"
                      aria-label="Visit Abdelhamid's GitHub profile"
                    >
                      <Github className="w-5 h-5" aria-hidden="true" />
                    </motion.a>
                    <motion.a
                      href="https://www.linkedin.com/in/abdelhamid-el-aali-76893a2a5/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#344966] border border-[#b4cded]/20 rounded-xl flex items-center justify-center text-[#b4cded] hover:text-[#f0f4ef] hover:bg-[#b4cded]/20 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title="LinkedIn Profile - Abdelhamid El Aali"
                      aria-label="Visit Abdelhamid's LinkedIn profile"
                    >
                      <Linkedin className="w-5 h-5" aria-hidden="true" />
                    </motion.a>
                    <motion.a
                      href="https://x.com/vtx__007"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#344966] border border-[#b4cded]/20 rounded-xl flex items-center justify-center text-[#b4cded] hover:text-[#f0f4ef] hover:bg-[#b4cded]/20 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title="X (Twitter) Profile - @vtx__007"
                      aria-label="Visit Abdelhamid's X (Twitter) profile"
                    >
                      <Twitter className="w-5 h-5" aria-hidden="true" />
                    </motion.a>
                    <motion.a
                      href="mailto:abdelhamidelaali.bs007@gmail.com"
                      className="w-12 h-12 bg-[#344966] border border-[#b4cded]/20 rounded-xl flex items-center justify-center text-[#b4cded] hover:text-[#f0f4ef] hover:bg-[#b4cded]/20 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title="Send Email to abdelhamidelaali.bs007@gmail.com"
                      aria-label="Send email to Abdelhamid El Aali"
                    >
                      <Mail className="w-5 h-5" aria-hidden="true" />
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Section - Contact Form */}
              <motion.div variants={itemVariants} className="bg-[#344966]/30 backdrop-blur-sm rounded-2xl p-8 border border-[#b4cded]/10">
                <motion.h4 
                  className="text-2xl font-bold text-[#f0f4ef] mb-6"
                  variants={itemVariants}
                >
                  Get In Touch
                </motion.h4>
                
                <motion.form onSubmit={handleSubmit} className="space-y-6" variants={itemVariants}>
                  <div>
                    <label htmlFor="name" className="block text-[#b4cded] text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[#0d1821]/50 border border-[#344966] rounded-xl text-[#f0f4ef] placeholder-[#b4cded]/50 focus:outline-none focus:ring-2 focus:ring-[#b4cded] focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-[#b4cded] text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[#0d1821]/50 border border-[#344966] rounded-xl text-[#f0f4ef] placeholder-[#b4cded]/50 focus:outline-none focus:ring-2 focus:ring-[#b4cded] focus:border-transparent transition-all duration-300"
                      placeholder="your.email@gmail.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-[#b4cded] text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-[#0d1821]/50 border border-[#344966] rounded-xl text-[#f0f4ef] placeholder-[#b4cded]/50 focus:outline-none focus:ring-2 focus:ring-[#b4cded] focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#344966] hover:bg-[#b4cded] text-[#f0f4ef] hover:text-[#0d1821] font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-[#f0f4ef] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              </motion.div>
            </div>

            {/* Bottom Section */}
            <motion.div 
              variants={itemVariants}
              className="border-t border-[#b4cded]/20 mt-16 pt-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-[#b4cded] text-sm">
                  © {currentYear} ABDELHAMID. All rights reserved.
                </p>
                <p className="text-[#b4cded] text-sm flex items-center">
                  Made with <Heart className="w-4 h-4 text-[#b4cded] mx-1" /> using Next.js & Tailwind CSS
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
