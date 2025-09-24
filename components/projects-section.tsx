"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { motion } from "framer-motion"
import { MotionWrapper, HoverWrapper, staggerContainer } from "./motion-wrapper"

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with modern UI, secure payments, and admin dashboard. Built with Next.js and Laravel backend.",
    image: "/ecommerce-project.jpg",
    technologies: ["Next.js", "Laravel", "MySQL", "Stripe", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Blog Management System",
    description:
      "Content management system with rich text editor, user authentication, and SEO optimization. Perfect for modern blogging needs.",
    image: "/blog-system-project.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Express", "JWT"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "IT Solutions Dashboard",
    description:
      "Comprehensive dashboard for IT infrastructure monitoring, analytics, and management with real-time data visualization.",
    image: "/dashboard-project.jpg",
    technologies: ["Vue.js", "Laravel", "MySQL", "Chart.js", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task management application with team features, real-time updates, and project tracking capabilities.",
    image: "/task-management-project.jpg",
    technologies: ["React", "Firebase", "TypeScript", "Material-UI"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "API Gateway Service",
    description:
      "Microservices API gateway with authentication, rate limiting, and monitoring. Built for scalable enterprise applications.",
    image: "/api-gateway-project.jpg",
    technologies: ["Node.js", "Express", "Redis", "JWT", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Real Estate Platform",
    description:
      "Property listing platform with advanced search, virtual tours, and agent management system for real estate businesses.",
    image: "/real-estate-project.jpg",
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Mapbox", "AWS"],
    liveUrl: "#",
    githubUrl: "#",
  },
]

export function ProjectsSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  }

  const imageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  }

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <MotionWrapper>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Featured <span className="text-primary">Projects</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Showcasing innovative solutions and technical expertise across various domains
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
            {projects.map((project, index) => (
              <motion.div key={index} variants={cardVariants}>
                <HoverWrapper scale={1.02}>
                  <Card className="bg-card border-border overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 group">
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <motion.img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        variants={imageVariants}
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.4 },
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />
                    </div>

                    <CardContent className="p-6">
                      <motion.h3
                        className="text-xl font-semibold text-card-foreground mb-3"
                        whileHover={{ color: "oklch(0.7 0.15 200)" }}
                        transition={{ duration: 0.2 }}
                      >
                        {project.title}
                      </motion.h3>

                      <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                      <motion.div
                        className="flex flex-wrap gap-2 mb-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {project.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={techIndex}
                            variants={{
                              hidden: { opacity: 0, scale: 0.8 },
                              visible: {
                                opacity: 1,
                                scale: 1,
                                transition: { duration: 0.3 },
                              },
                            }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Badge variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>

                      <div className="flex gap-3">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                          >
                            <Github className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </HoverWrapper>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
