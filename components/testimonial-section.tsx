"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Instagram, Linkedin, InstagramIcon as TiktokIcon } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Ålesund Seafood",
    description:
      "Vi hjalp Ålesund Seafood med å øke sin synlighet på sosiale medier og forbedre sin online tilstedeværelse.",
    results: [
      "300% økning i Instagram-følgere",
      "150% økning i engasjement",
      "25% økning i nettbutikksalg",
      "180K visninger i måneden i Ålesund",
    ],
    platforms: ["instagram", "facebook"],
    image: "/images/aalesund-city-view.jpeg",
  },
  {
    id: 2,
    title: "Møre Interiør",
    description:
      "Strategisk innholdsmarkedsføring og LinkedIn-strategi for å posisjonere Møre Interiør som en ledende aktør i bransjen.",
    results: [
      "200% økning i LinkedIn-følgere",
      "15 nye B2B-kunder",
      "45% økning i nettsidetrafikk",
      "120K visninger i måneden i Ålesund",
    ],
    platforms: ["linkedin", "web"],
    image: "/images/aalesund-mountain-view.jpeg",
  },
  {
    id: 3,
    title: "Sunnmøre Aktiv",
    description: "TikTok-strategi og innholdsproduksjon for å nå en yngre målgruppe og øke deltakelse i aktiviteter.",
    results: [
      "500K+ visninger på TikTok",
      "30% økning i påmeldinger",
      "Viral video med 1.2M visninger",
      "200K visninger i måneden i Ålesund",
    ],
    platforms: ["tiktok", "instagram"],
    image: "/images/event-coverage.png",
  },
]

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const currentProject = projects[currentIndex]

  // Platform icons
  const platformIcons = {
    instagram: <Instagram className="h-5 w-5" />,
    facebook: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
      </svg>
    ),
    linkedin: <Linkedin className="h-5 w-5" />,
    tiktok: <TiktokIcon className="h-5 w-5" />,
    web: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Project Image */}
        <div className="relative overflow-hidden rounded-3xl shadow-lg aspect-video">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <Image
              src={currentProject.image || "/placeholder.svg"}
              alt={currentProject.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
              <div className="flex items-center gap-2 mb-2">
                {currentProject.platforms.map((platform) => (
                  <span key={platform} className="bg-white/20 text-white p-2 rounded-full">
                    {platformIcons[platform as keyof typeof platformIcons]}
                  </span>
                ))}
              </div>
              <h3 className="text-white text-xl md:text-2xl font-medium">{currentProject.title}</h3>
            </div>
          </motion.div>
        </div>

        {/* Project Details */}
        <motion.div
          key={currentProject.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800"
        >
          <h3 className="text-2xl font-medium mb-2">{currentProject.title}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{currentProject.description}</p>

          <div className="mb-6">
            <h4 className="text-lg font-medium mb-3">Resultater</h4>
            <ul className="space-y-2">
              {currentProject.results.map((result, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="bg-teal-100 dark:bg-teal-900/30 p-1 rounded-full mt-0.5">
                    <svg
                      className="h-4 w-4 text-teal-600 dark:text-teal-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full">Se Detaljer</Button>
            <Button variant="outline" className="rounded-full">
              Kontakt Oss
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center mt-8 gap-4">
        <Button variant="outline" size="icon" onClick={prevProject} className="rounded-full">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? "w-8 bg-teal-600 dark:bg-teal-500" : "w-2 bg-slate-300 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>
        <Button variant="outline" size="icon" onClick={nextProject} className="rounded-full">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
