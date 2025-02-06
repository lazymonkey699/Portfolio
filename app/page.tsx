"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DownloadIcon, ExternalLinkIcon } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Home() {
  const skills = [
    "HTML", "CSS", "JavaScript", "React", "Next.js",
    "Node.js", "Python", "SQL", "MongoDB", "Figma",
    "Adobe XD", "UI Design", "UX Research", "Responsive Design",
  ]

  const [typedText, setTypedText] = useState("")
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const phrases = ["Web Developer", "Aspiring UI/UX Designer"]

  useEffect(() => {
    let i = 0
    let currentText = ""
    let isDeleting = false

    const typingInterval = setInterval(() => {
      const fullText = phrases[currentPhrase]

      if (!isDeleting && i <= fullText.length) {
        currentText = fullText.slice(0, i)
        i++
      } else if (isDeleting && i >= 0) {
        currentText = fullText.slice(0, i)
        i--
      }

      setTypedText(currentText)

      if (!isDeleting && i > fullText.length) {
        isDeleting = true
        setTimeout(() => {
          i--
        }, 1000)
      } else if (isDeleting && i === 0) {
        isDeleting = false
        setCurrentPhrase((prev) => (prev + 1) % phrases.length)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [currentPhrase])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="container mx-auto px-4 py-16 space-y-32">
      <motion.section 
        className="flex flex-col-reverse md:flex-row items-center justify-between gap-12"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <div className="flex-1 space-y-6">
          <h2 className="text-xl font-semibold text-primary">Welcome to my Portfolio</h2>
          <h1 className="text-4xl font-bold sm:text-6xl">
            Hi! I'm Abhishek Bam
          </h1>
          <p className="text-2xl text-primary">
            <span className="typing-animation">
              {typedText}
              <span className="animate-blink">|</span>
            </span>
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="#contact">Contact Me</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/Abhishek_Bam_CV.pdf" download>
                <DownloadIcon className="mr-2 h-4 w-4" />
                Download CV
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 flex justify-center relative">
          <div className="w-80 h-80 bg-gradient-to-r from-primary to-purple-600 rounded-full absolute blur-3xl opacity-20 animate-pulse"></div>
          <Image
            src="/Coder.jpeg"
            alt="Abhishek Bam"
            width={400}
            height={400}
            className="rounded-lg shadow-2xl relative z-10"
            priority
          />
        </div>
      </motion.section>

      <motion.section 
        id="about" 
        className="space-y-8"
        initial="initial"
        whileInView="animate"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center">About Me</h2>
        <Card className="bg-background/50 backdrop-blur-md border-primary/20">
          <CardContent className="p-6 space-y-4">
            <p className="text-lg">
            Hi, I am a developer passionate about building intuitive and visually appealing web applications. I specialize in Flask, Python, and Tailwind CSS, with a focus on clean design and user experience.

I’ve worked on projects like PopcornPicks, a movie recommendation website that combines smart algorithms with stylish UI. I enjoy solving challenges and turning ideas into functional, impactful solutions.

When I’m not coding, I’m exploring new design trends or watching classic films.

Let’s connect and create something amazing!
            </p>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section 
        id="education" 
        className="space-y-8"
        initial="initial"
        whileInView="animate"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center">Education</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-background/50 backdrop-blur-md border-primary/20 transform transition-all hover:scale-105">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-primary">
                Bachelor of Science in Computer Science and Information Technology
              </h3>
              <p className="text-muted-foreground">
                Nagarjuna College of IT, Sankhamul, Lalitpur, Nepal
              </p>
              <p>April 2020 – Present</p>
            </CardContent>
          </Card>
          <Card className="bg-background/50 backdrop-blur-md border-primary/20 transform transition-all hover:scale-105">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-primary">Intermediate in Science</h3>
              <p className="text-muted-foreground">
                NASA Secondary School, Kathmandu, Nepal
              </p>
              <p>July 2018 – November 2020</p>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      <motion.section 
        id="experience" 
        className="space-y-8"
        initial="initial"
        whileInView="animate"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center">Experience</h2>
        <div className="grid gap-6">
          {[
            {
              title: "Frontend Web Development Internship",
              company: "School of Information and Technology",
              location: "Kathmandu, Nepal",
              date: "March 2022 – May 2022",
              points: [
                "Developed responsive and user-friendly web interfaces using HTML, CSS, and JavaScript",
                "Collaborated with the design team to implement UI/UX improvements",
                "Gained practical experience in version control using Git",
              ],
            },
            {
              title: "UI/UX Design Workshop",
              company: "DesignX Nepal",
              location: "Virtual",
              date: "August 2023",
              points: [
                "Participated in an intensive 2-week workshop on UI/UX design principles",
                "Created user personas, wireframes, and prototypes for a mobile app project",
                "Received mentorship from industry professionals on design thinking and user-centered design",
              ],
            },
          ].map((exp, index) => (
            <Card key={index} className="bg-background/50 backdrop-blur-md border-primary/20 transform transition-all hover:scale-105">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-primary">{exp.title}</h3>
                <p className="text-muted-foreground">{exp.company}</p>
                <p>{exp.date}</p>
                <ul className="list-disc list-inside space-y-2">
                  {exp.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section 
        id="projects" 
        className="space-y-8"
        initial="initial"
        whileInView="animate"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center">Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-background/50 backdrop-blur-md border-primary/20 transform transition-all hover:scale-105">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-primary">PopcornPicks</h3>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="https://github.com/yourusername/popcornpicks">
                    <ExternalLinkIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "MongoDB", "TMDb API"].map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
              <ul className="list-disc list-inside space-y-2">
                <li>Developed a full-stack movie recommendation web app</li>
                <li>Implemented user authentication and personalized watchlists</li>
                <li>Designed an intuitive UI for browsing and discovering movies</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-background/50 backdrop-blur-md border-primary/20 transform transition-all hover:scale-105">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-primary">Watchmandu</h3>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="https://github.com/yourusername/watchmandu">
                    <ExternalLinkIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "Tailwind CSS", "Stripe", "Vercel"].map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
              <ul className="list-disc list-inside space-y-2">
                <li>Created a modern e-commerce platform for watch enthusiasts</li>
                <li>Implemented responsive design for seamless mobile experience</li>
                <li>Integrated Stripe for secure payment processing</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      <motion.section 
        id="skills" 
        className="space-y-8"
        initial="initial"
        whileInView="animate"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center">Technical Skills</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill) => (
            <Badge 
              key={skill} 
              variant="secondary" 
              className="text-lg px-4 py-2 transform transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </motion.section>

      <motion.section 
        id="contact" 
        className="space-y-8"
        initial="initial"
        whileInView="animate"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center">Get In Touch</h2>
        <Card className="bg-background/50 backdrop-blur-md border-primary/20">
          <CardContent className="p-6 space-y-4">
            <p className="text-center text-lg">
              I'm always open to new opportunities and collaborations. Feel free to reach out!
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild>
                <Link href="mailto:abhishek.bam10@gmail.com">
                  Email Me
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="http://www.linkedin.com/in/abhishek-bam-423273257">
                  LinkedIn
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  )
}

