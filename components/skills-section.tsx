"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Server, Database, Globe, Smartphone, Cloud, Layers } from "lucide-react"
import { motion } from "framer-motion"
import { MotionWrapper, HoverWrapper, staggerContainer } from "./motion-wrapper"
import Image from "next/image"

// Individual skill icons mapping
const skillIcons = [
  { name: "React", icon: "/skills/react.png", level: "Expert" },
  { name: "Next.js", icon: "/skills/next.png", level: "Expert" },
  { name: "TypeScript", icon: "/skills/Ts.png", level: "Advanced" },
  { name: "JavaScript", icon: "/skills/js.png", level: "Expert" },
  { name: "HTML", icon: "/skills/html.png", level: "Expert" },
  { name: "CSS", icon: "/skills/css.png", level: "Expert" },
  { name: "Bootstrap", icon: "/skills/bootstrap.png", level: "Advanced" },
  { name: "Node.js", icon: "/skills/node.png", level: "Advanced" },
  { name: "PHP", icon: "/skills/php.png", level: "Expert" },
  { name: "Python", icon: "/skills/python.png", level: "Intermediate" },
  { name: "MySQL", icon: "/skills/mysql.png", level: "Expert" },
  { name: "Docker", icon: "/skills/docker.png", level: "Advanced" },
  { name: "Linux", icon: "/skills/lunix.png", level: "Advanced" },
  { name: "Laravel", icon: "/skills/laravel.png", level: "Expert" },
]

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code2,
    color: "text-primary",
    skills: [
      { name: "React", level: "Expert" },
      { name: "Next.js", level: "Expert" },
      { name: "TypeScript", level: "Advanced" },
      { name: "JavaScript", level: "Expert" },
      { name: "HTML", level: "Expert" },
      { name: "CSS", level: "Expert" },
      { name: "Bootstrap", level: "Advanced" },
    ],
  },
  {
    title: "Backend Development",
    icon: Server,
    color: "text-secondary",
    skills: [
      { name: "Laravel", level: "Expert" },
      { name: "Node.js", level: "Advanced" },
      { name: "PHP", level: "Expert" },
      { name: "Python", level: "Intermediate" },
    ],
  },
  {
    title: "Database & DevOps",
    icon: Database,
    color: "text-accent",
    skills: [
      { name: "MySQL", level: "Expert" },
      { name: "Docker", level: "Advanced" },
      { name: "Linux", level: "Advanced" },
    ],
  },
]

const getLevelColor = (level: string) => {
  switch (level) {
    case "Expert":
      return "bg-primary text-primary-foreground"
    case "Advanced":
      return "bg-secondary text-secondary-foreground"
    case "Intermediate":
      return "bg-accent text-accent-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function SkillsSection() {
  const skillItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  }

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  }

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <MotionWrapper>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                My <span className="text-primary">Skills</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Expertise across the full technology stack with modern tools and frameworks
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
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
                    },
                  }}
                >
                  <HoverWrapper scale={1.03}>
                    <Card className="bg-card border-border transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-6">
                          <motion.div
                            variants={iconVariants}
                            whileHover={{
                              rotate: 360,
                              scale: 1.2,
                              transition: { duration: 0.5 },
                            }}
                          >
                            <IconComponent className={`w-8 h-8 ${category.color} mr-3`} />
                          </motion.div>
                          <h3 className="text-xl font-semibold text-card-foreground">{category.title}</h3>
                        </div>

                        <motion.div
                          className="space-y-4"
                          variants={staggerContainer}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          {category.skills.map((skill, skillIndex) => {
                            const skillIcon = skillIcons.find(s => s.name === skill.name)
                            return (
                              <motion.div
                                key={skillIndex}
                                className="flex items-center justify-between"
                                variants={skillItemVariants}
                              >
                                <div className="flex items-center space-x-3">
                                  {skillIcon && (
                                    <motion.div
                                      whileHover={{ scale: 1.2, rotate: 5 }}
                                      whileTap={{ scale: 0.9 }}
                                      className="relative"
                                    >
                                      <Image
                                        src={skillIcon.icon}
                                        alt={`${skill.name} icon`}
                                        width={32}
                                        height={32}
                                        className="w-8 h-8 object-contain"
                                      />
                                    </motion.div>
                                  )}
                                  <span className="text-card-foreground font-medium">{skill.name}</span>
                                </div>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                  <Badge className={getLevelColor(skill.level)}>{skill.level}</Badge>
                                </motion.div>
                              </motion.div>
                            )
                          })}
                        </motion.div>
                      </CardContent>
                    </Card>
                  </HoverWrapper>
                </motion.div>
              )
            })}
          </motion.div>

          {/* All Skills Grid */}
          <MotionWrapper delay={0.4}>
            <div className="mt-16 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                Technologies & <span className="text-primary">Tools</span>
              </h3>
              <motion.div
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {skillIcons.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center group"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] },
                      },
                    }}
                  >
                    <motion.div
                      className="relative p-4 rounded-2xl bg-card border border-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                      whileHover={{
                        scale: 1.1,
                        y: -5,
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={skill.icon}
                        alt={`${skill.name} technology icon`}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain"
                      />
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                    </motion.div>
                    <span className="text-xs text-muted-foreground mt-2 group-hover:text-foreground transition-colors duration-300">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.6}>
            <div className="mt-16 text-center">
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { icon: Globe, label: "Web Development", color: "text-primary" },
                  { icon: Smartphone, label: "Mobile Responsive", color: "text-primary" },
                  { icon: Cloud, label: "Cloud Solutions", color: "text-primary" },
                  { icon: Layers, label: "System Architecture", color: "text-primary" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] },
                      },
                    }}
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.2,
                        rotate: 360,
                        transition: { duration: 0.5 },
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <item.icon className={`w-12 h-12 ${item.color} mb-2`} />
                    </motion.div>
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
