"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface FormData {
  user_name: string
  user_email: string
  message: string
}

interface FormErrors {
  user_name?: string
  user_email?: string
  message?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    user_name: "",
    user_email: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")
  const [debugInfo, setDebugInfo] = useState<string>("")

  useEffect(() => {
    // Initialize EmailJS with public key
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
    console.log("EmailJS Public Key:", publicKey ? "Set" : "Not set")
    emailjs.init(publicKey)
  }, [])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Full name validation
    if (!formData.user_name.trim()) {
      newErrors.user_name = "Full name is required"
    } else if (formData.user_name.trim().length < 2) {
      newErrors.user_name = "Name must be at least 2 characters"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.user_email.trim()) {
      newErrors.user_email = "Email is required"
    } else if (!emailRegex.test(formData.user_email)) {
      newErrors.user_email = "Please enter a valid email address"
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = "Message must be less than 1000 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")
    setDebugInfo("")

    // Debug information
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_mjicue8"
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_placeholder"
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
    
    console.log("Sending email with:", {
      serviceId,
      templateId,
      publicKey: publicKey ? "Set" : "Not set",
      formData
    })
    
    setDebugInfo(`Service ID: ${serviceId}, Template ID: ${templateId}`)

    try {
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        e.currentTarget,
        publicKey
      )

      console.log("EmailJS result:", result)
      setDebugInfo(prev => prev + `\nResult: ${JSON.stringify(result)}`)

      if (result.status === 200) {
        setSubmitStatus("success")
        setStatusMessage("Thank you! Your message has been sent successfully.")
        setFormData({ user_name: "", user_email: "", message: "" })
      } else {
        throw new Error(`EmailJS returned status: ${result.status}`)
      }
    } catch (error) {
      console.error("EmailJS error:", error)
      setSubmitStatus("error")
      setStatusMessage("Oops! Something went wrong. Please try again later.")
      setDebugInfo(prev => prev + `\nError: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-border bg-card shadow-xl">
        <CardContent className="p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Get In Touch
            </h2>
            <p className="text-muted-foreground">
              I'd love to hear from you. Send me a message and I'll respond as soon as possible.
            </p>
          </motion.div>

          {/* Debug Information */}
          {process.env.NODE_ENV === 'development' && debugInfo && (
            <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">
              <strong>Debug Info:</strong>
              <pre className="whitespace-pre-wrap">{debugInfo}</pre>
            </div>
          )}

          {/* Status Messages */}
          {submitStatus !== "idle" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                submitStatus === "success"
                  ? "bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200"
                  : "bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200"
              }`}
            >
              {submitStatus === "success" ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="text-sm font-medium">{statusMessage}</span>
            </motion.div>
          )}

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Label htmlFor="user_name" className="text-sm font-medium text-foreground mb-2 block">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className={`w-full px-4 py-3 bg-background border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                  errors.user_name ? "border-destructive focus:ring-destructive" : "border-border"
                }`}
                disabled={isSubmitting}
              />
              {errors.user_name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-destructive flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.user_name}
                </motion.p>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Label htmlFor="user_email" className="text-sm font-medium text-foreground mb-2 block">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                type="email"
                id="user_email"
                name="user_email"
                value={formData.user_email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className={`w-full px-4 py-3 bg-background border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                  errors.user_email ? "border-destructive focus:ring-destructive" : "border-border"
                }`}
                disabled={isSubmitting}
              />
              {errors.user_email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-destructive flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.user_email}
                </motion.p>
              )}
            </motion.div>

            {/* Message Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Label htmlFor="message" className="text-sm font-medium text-foreground mb-2 block">
                Message <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project, ideas, or just say hello..."
                rows={6}
                className={`w-full px-4 py-3 bg-background border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-none ${
                  errors.message ? "border-destructive focus:ring-destructive" : "border-border"
                }`}
                disabled={isSubmitting}
              />
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-destructive flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.message}
                </motion.p>
              )}
              <p className="mt-1 text-xs text-muted-foreground text-right">
                {formData.message.length}/1000 characters
              </p>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4"
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 focus:ring-4 focus:ring-primary/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
