"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"
import { MotionWrapper, HoverWrapper, staggerContainer } from "./motion-wrapper"

export function AboutSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  }

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <MotionWrapper>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                About <span className="text-primary">Me</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Passionate about creating innovative solutions and delivering exceptional results
              </p>
            </div>
          </MotionWrapper>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <MotionWrapper variant="fadeInLeft" delay={0.2}>
              <div className="flex justify-center lg:justify-center -mt-16">
                <HoverWrapper scale={1.02}>
                  <motion.div
                    className="w-80 h-80 rounded-full bg-gradient-to-br from-primary to-secondary p-1.5"
                    whileHover={{
                      boxShadow: "0 20px 40px rgba(56, 189, 248, 0.3)",
                      transition: { duration: 0.3 },
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                      <img
                        src="/professional-developer-portrait.png"
                        alt="ABDELHAMID Profile"
                        className="w-72 h-72 rounded-full object-cover"
                      />
                    </div>
                  </motion.div>
                </HoverWrapper>
              </div>
            </MotionWrapper>

            <MotionWrapper variant="fadeInRight" delay={0.4}>
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Hi I'm <span className="text-sky-300 font-semibold">Abdelhamid</span>, a passionate Full Stack
                    Developer with expertise in modern web technologies and comprehensive IT solutions. With a strong
                    foundation in both frontend and backend development, I create scalable, efficient, and user-friendly
                    applications.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    My approach combines technical excellence with creative problem-solving, ensuring that every project
                    delivers exceptional value and meets the highest standards of quality and performance.
                  </p>
                </div>

                <motion.div
                  className="grid md:grid-cols-3 gap-4"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <motion.div variants={cardVariants}>
                    <HoverWrapper scale={1.05}>
                      <Card className="bg-card border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                        <CardContent className="p-6 text-center">
                          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                            <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
                          </motion.div>
                          <h3 className="font-semibold text-card-foreground mb-1">Experience</h3>
                          <p className="text-sm text-muted-foreground">5+ Years</p>
                        </CardContent>
                      </Card>
                    </HoverWrapper>
                  </motion.div>

                  <motion.div variants={cardVariants}>
                    <HoverWrapper scale={1.05}>
                      <Card className="bg-card border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                        <CardContent className="p-6 text-center">
                          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                            <GraduationCap className="w-8 h-8 text-primary mx-auto mb-3" />
                          </motion.div>
                          <h3 className="font-semibold text-card-foreground mb-1">Education</h3>
                          <p className="text-sm text-muted-foreground">Computer Science</p>
                        </CardContent>
                      </Card>
                    </HoverWrapper>
                  </motion.div>

                  <motion.div variants={cardVariants}>
                    <HoverWrapper scale={1.05}>
                      <Card className="bg-card border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                        <CardContent className="p-6 text-center">
                          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                            <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                          </motion.div>
                          <h3 className="font-semibold text-card-foreground mb-1">Location</h3>
                          <p className="text-sm text-muted-foreground">Available Remote</p>
                        </CardContent>
                      </Card>
                    </HoverWrapper>
                  </motion.div>
                </motion.div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </div>
    </section>
  )
}
