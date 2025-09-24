"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Settings, Layers, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { MotionWrapper, HoverWrapper, staggerContainer } from "./motion-wrapper"

const services = [
  {
    title: "Web Development",
    description:
      "Custom web applications built with modern frameworks and technologies. From responsive websites to complex web platforms, I deliver scalable and performant solutions.",
    icon: Code,
    features: ["Responsive Design", "Modern Frameworks", "Performance Optimization", "SEO Implementation"],
    gradient: "from-primary to-primary/70",
  },
  {
    title: "IT Consulting",
    description:
      "Strategic IT guidance to help businesses leverage technology effectively. From architecture planning to technology stack selection and digital transformation strategies.",
    icon: Settings,
    features: ["Technology Strategy", "Architecture Planning", "Digital Transformation", "Performance Audits"],
    gradient: "from-secondary to-secondary/70",
  },
  {
    title: "System Integration",
    description:
      "Seamless integration of various systems and platforms. API development, third-party integrations, and custom solutions to connect your business processes.",
    icon: Layers,
    features: ["API Development", "Third-party Integration", "Database Migration", "Cloud Solutions"],
    gradient: "from-accent to-accent/70",
  },
]

export function ServicesSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  }

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  }

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <MotionWrapper>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                IT Solutions & <span className="text-primary">Services</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive technology services to drive your business forward
              </p>
            </div>
          </MotionWrapper>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div key={index} variants={cardVariants}>
                  <HoverWrapper scale={1.03}>
                    <Card className="bg-card border-border overflow-hidden relative transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 group h-full">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />

                      <CardContent className="p-8 relative flex flex-col h-full">
                        <div className="mb-6">
                          <motion.div
                            className={`w-16 h-16 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4`}
                            whileHover={{
                              rotate: 360,
                              scale: 1.1,
                              transition: { duration: 0.5 },
                            }}
                          >
                            <IconComponent className="w-8 h-8 text-white" />
                          </motion.div>
                          <motion.h3
                            className="text-2xl font-semibold text-card-foreground mb-3"
                            whileHover={{ color: "oklch(0.7 0.15 200)" }}
                            transition={{ duration: 0.2 }}
                          >
                            {service.title}
                          </motion.h3>
                        </div>

                        <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                        <motion.ul
                          className="space-y-2 mb-8 flex-grow"
                          variants={staggerContainer}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          {service.features.map((feature, featureIndex) => (
                            <motion.li
                              key={featureIndex}
                              className="flex items-center text-sm text-muted-foreground"
                              variants={featureVariants}
                            >
                              <motion.div whileHover={{ scale: 1.2, rotate: 90 }} transition={{ duration: 0.2 }}>
                                <ArrowRight className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                              </motion.div>
                              {feature}
                            </motion.li>
                          ))}
                        </motion.ul>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-auto">
                          <Button
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group/btn"
                            onClick={() => {
                              const element = document.querySelector("#contact")
                              if (element) {
                                element.scrollIntoView({ behavior: "smooth" })
                              }
                            }}
                          >
                            Get Started
                            <motion.div className="ml-2" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                              <ArrowRight className="w-4 h-4" />
                            </motion.div>
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </HoverWrapper>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
