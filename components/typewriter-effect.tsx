"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterEffectProps {
  text: string
  className?: string
  speed?: number
  deleteSpeed?: number
  pauseDuration?: number
  loop?: boolean
}

export function TypewriterEffect({
  text,
  className = "",
  speed = 150,
  deleteSpeed = 100,
  pauseDuration = 2000,
  loop = true,
}: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const typeText = () => {
      if (!isDeleting) {
        // Typing phase
        if (displayText.length < text.length) {
          setDisplayText(text.slice(0, displayText.length + 1))
          timeout = setTimeout(typeText, speed)
        } else {
          // Pause before deleting
          timeout = setTimeout(() => {
            if (loop) {
              setIsDeleting(true)
              typeText()
            }
          }, pauseDuration)
        }
      } else {
        // Deleting phase
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
          timeout = setTimeout(typeText, deleteSpeed)
        } else {
          setIsDeleting(false)
          timeout = setTimeout(typeText, speed)
        }
      }
    }

    timeout = setTimeout(typeText, speed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, text, speed, deleteSpeed, pauseDuration, loop])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <motion.span className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {displayText}
      <span
        className={`inline-block w-1 bg-primary ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`}
        style={{ height: "1em", transition: "opacity 0.1s" }}
      >
        |
      </span>
    </motion.span>
  )
}
