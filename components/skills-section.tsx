"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Server, Database, Globe, Smartphone, Cloud, Layers } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { MotionWrapper, HoverWrapper, staggerContainer } from "./motion-wrapper"
// Custom animation variants for Technologies & Tools section
const techToolsContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
}

const techToolItem = {
  hidden: { 
    opacity: 0, 
    y: 15,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      mass: 0.8,
    },
  },
}

const techToolHover = {
  scale: 1.05,
  y: -2,
  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 17,
    mass: 0.5,
  },
}

const techToolTap = {
  scale: 0.98,
  transition: {
    type: "spring",
    stiffness: 600,
    damping: 30,
  },
}

// Icons for categorized sections (Frontend, Backend, Database & DevOps)
const categorySkillIcons = [
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
  { name: "MySQL", icon: "/skills/mysql1.png", level: "Expert" },
  { name: "Mongodb", icon: "/skills/mongodb.png", level: "Advanced" },
  { name: "Git", icon: "/skills/Git.png", level: "Advanced" },
  { name: "Laravel", icon: "/skills/laravel.png", level: "Expert" },
]

// Icons for Technologies & Tools grid section
const techToolsIcons = [
  { name: "GitHub", icon: "/assets/skills/github1.png", level: "Expert" },
  { name: "GitLab", icon: "/assets/skills/gitlab.png", level: "Advanced" },
  { name: "Jira", icon: "/assets/skills/jira1.png", level: "Advanced" },
  { name: "Scrum", icon: "/assets/skills/scrum1.png", level: "Advanced" },
  { name: "Trello", icon: "/assets/skills/trello.png", level: "Intermediate" },
  { name: "VMware", icon: "/assets/skills/vmware.png", level: "Advanced" },
  { name: "VirtualBox", icon: "/assets/skills/virtualbox.png", level: "Advanced" },
  { name: "Android Studio", icon: "/assets/skills/android-studio.png", level: "Intermediate" },
  { name: "n8n", icon: "/assets/skills/n8n.png", level: "Intermediate" },
  { name: "Linux", icon: "/assets/skills/linux.png", level: "Advanced" },
  { name: "UML", icon: "/assets/skills/uml.png", level: "Intermediate" },
  { name: "Postman", icon: "/assets/skills/postman.png", level: "Advanced" },
  { name: "Figma", icon: "/assets/skills/figma.png", level: "Advanced" },
  { name: "Docker", icon: "/assets/skills/docker.png", level: "Intermediate" },
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
      { name: "Mongodb", level: "Advanced" },
      { name: "Git", level: "Advanced" },
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
      transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] as const },
    },
  }

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] as const },
    },
  }

  return (
    <section id="skills" className="py-20 bg-muted/30 min-h-screen flex items-center">
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
                      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] as const },
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
                            const skillIcon = categorySkillIcons.find(s => s.name === skill.name)
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
                variants={techToolsContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {techToolsIcons.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center group"
                    variants={techToolItem}
                  >
                    <motion.div
                      className="relative p-4 rounded-2xl bg-card border border-border"
                      whileHover={techToolHover}
                      whileTap={techToolTap}
                    >
                      <Image
                        src={skill.icon}
                        alt={`${skill.name} technology icon`}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain"
                      />
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-primary/10"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                    <motion.span 
                      className="text-xs mt-2"
                      initial={{ color: "hsl(var(--muted-foreground))" }}
                      whileHover={{ color: "hsl(var(--foreground))" }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill.name}
                    </motion.span>
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
