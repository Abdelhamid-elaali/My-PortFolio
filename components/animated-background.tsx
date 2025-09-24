"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize()
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const particleCount = windowSize.width < 768 ? 15 : windowSize.width < 1024 ? 25 : 35
  const waveCount = windowSize.width < 768 ? 3 : 5
  const codeParticleCount = windowSize.width < 768 ? 8 : windowSize.width < 1024 ? 12 : 18
  const networkNodeCount = windowSize.width < 768 ? 6 : windowSize.width < 1024 ? 10 : 15
  const codeSymbols = ["<>", "{}", "[]", "()", "0", "1", "0", "1", "</", "/>", "&&", "||"]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 50%, #0d1821 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, #344966 0%, transparent 50%), radial-gradient(ellipse at 40% 80%, #0d1821 0%, transparent 50%)",
            "radial-gradient(ellipse at 60% 30%, #344966 0%, transparent 50%), radial-gradient(ellipse at 30% 70%, #0d1821 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, #344966 0%, transparent 50%)",
            "radial-gradient(ellipse at 40% 20%, #0d1821 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, #344966 0%, transparent 50%), radial-gradient(ellipse at 20% 60%, #0d1821 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute rounded-full opacity-20"
        style={{
          width: windowSize.width < 768 ? "200px" : "384px",
          height: windowSize.width < 768 ? "200px" : "384px",
          background: "radial-gradient(circle, #b4cded 0%, #344966 30%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
          scale: [1, 1.1, 1],
        }}
        transition={{
          x: { type: "spring", stiffness: 50, damping: 30 },
          y: { type: "spring", stiffness: 50, damping: 30 },
          scale: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
        initial={{ x: "10%", y: "20%" }}
      />

      <motion.div
        className="absolute rounded-full opacity-15"
        style={{
          width: windowSize.width < 768 ? "160px" : "320px",
          height: windowSize.width < 768 ? "160px" : "320px",
          background: "radial-gradient(circle, #b4cded 0%, #f0f4ef 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: mousePosition.x * -0.01,
          y: mousePosition.y * -0.01,
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          x: { type: "spring", stiffness: 30, damping: 40 },
          y: { type: "spring", stiffness: 30, damping: 40 },
          scale: { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
        initial={{ x: "70%", y: "60%" }}
      />

      <motion.div
        className="absolute rounded-full opacity-10"
        style={{
          width: windowSize.width < 768 ? "120px" : "256px",
          height: windowSize.width < 768 ? "120px" : "256px",
          background: "radial-gradient(circle, #344966 0%, #0d1821 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: mousePosition.x * 0.015,
          y: mousePosition.y * 0.015,
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{
          x: { type: "spring", stiffness: 40, damping: 35 },
          y: { type: "spring", stiffness: 40, damping: 35 },
          scale: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
        initial={{ x: "40%", y: "80%" }}
      />

      {Array.from({ length: codeParticleCount }).map((_, i) => {
        const symbol = codeSymbols[i % codeSymbols.length]
        const isBinary = symbol === "0" || symbol === "1"
        return (
          <motion.div
            key={`code-particle-${i}`}
            className="absolute font-mono text-xs opacity-20 select-none"
            style={{
              color: isBinary ? "#b4cded" : "#344966",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: windowSize.width < 768 ? "10px" : "12px",
              fontWeight: isBinary ? "300" : "500",
            }}
            animate={{
              y: [0, -200 - Math.random() * 150, 0],
              x: [0, (Math.random() - 0.5) * 80, 0],
              opacity: [0, 0.3, 0],
              rotate: [0, (Math.random() - 0.5) * 20, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          >
            {symbol}
          </motion.div>
        )
      })}

      <svg className="absolute inset-0 w-full h-full opacity-10" style={{ filter: "blur(0.5px)" }}>
        {Array.from({ length: networkNodeCount }).map((_, i) => {
          const x = (Math.sin(i * 2.5) * 0.3 + 0.5) * 100
          const y = (Math.cos(i * 1.8) * 0.3 + 0.5) * 100
          return (
            <g key={`network-node-${i}`}>
              <motion.circle
                cx={`${x}%`}
                cy={`${y}%`}
                r={windowSize.width < 768 ? "1" : "1.5"}
                fill="#b4cded"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  r: [1, 2, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
              {Array.from({ length: Math.min(3, networkNodeCount - i - 1) }).map((_, j) => {
                const nextIndex = i + j + 1
                if (nextIndex >= networkNodeCount) return null
                const nextX = (Math.sin(nextIndex * 2.5) * 0.3 + 0.5) * 100
                const nextY = (Math.cos(nextIndex * 1.8) * 0.3 + 0.5) * 100
                const distance = Math.sqrt(Math.pow(nextX - x, 2) + Math.pow(nextY - y, 2))

                if (distance < 30) {
                  return (
                    <motion.line
                      key={`connection-${i}-${nextIndex}`}
                      x1={`${x}%`}
                      y1={`${y}%`}
                      x2={`${nextX}%`}
                      y2={`${nextY}%`}
                      stroke="#344966"
                      strokeWidth="0.5"
                      animate={{
                        opacity: [0, 0.4, 0],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 3,
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

      {Array.from({ length: waveCount }).map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute opacity-5"
          style={{
            width: "200%",
            height: windowSize.width < 768 ? "100px" : "200px",
            background: `linear-gradient(90deg, transparent, #b4cded 50%, transparent)`,
            borderRadius: "50%",
            filter: "blur(20px)",
            left: "-50%",
            top: `${20 + i * 20}%`,
          }}
          animate={{
            x: ["-100%", "100%"],
            scaleY: [0.5, 1, 0.5],
          }}
          transition={{
            x: {
              duration: 15 + i * 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scaleY: {
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
        />
      ))}

      {Array.from({ length: particleCount }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: windowSize.width < 768 ? "2px" : "3px",
            height: windowSize.width < 768 ? "2px" : "3px",
            background: Math.random() > 0.5 ? "#b4cded" : "#344966",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -150 - Math.random() * 100, 0],
            x: [0, (Math.random() - 0.5) * 100, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(#b4cded 1px, transparent 1px),
            linear-gradient(90deg, #b4cded 1px, transparent 1px)
          `,
          backgroundSize: windowSize.width < 768 ? "40px 40px" : "60px 60px",
        }}
      />

      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute opacity-5"
          style={{
            width: "2px",
            height: "100%",
            background: `linear-gradient(to bottom, transparent, ${i % 2 === 0 ? "#b4cded" : "#344966"} 50%, transparent)`,
            left: `${25 + i * 25}%`,
            filter: "blur(1px)",
          }}
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 0.1, 0],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
