"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Moderne Tilbygg",
    location: "Ålesund",
    description: "Et moderne tilbygg med store vindusflater og bærekraftige materialer.",
    image: "/images/aalesund-harbor-view.jpeg",
    year: "2023",
    category: "Tilbygg",
  },
  {
    id: 2,
    title: "Påbygg Enebolig",
    location: "Ålesund",
    description: "Påbygg med ekstra etasje og takterrasse med utsikt over fjorden.",
    image: "/images/aalesund-mountain-view.jpeg",
    year: "2022",
    category: "Påbygg",
  },
  {
    id: 3,
    title: "Garasje med Anneks",
    location: "Ålesund",
    description: "Kombinert garasje og anneks med moderne design og smarte løsninger.",
    image: "/images/aalesund-city-view.jpeg",
    year: "2021",
    category: "Garasje",
  },
]

export default function ProjectShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const currentProject = projects[currentIndex]

  return (
    <div className="relative">
      <div className={`grid ${expanded ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"} gap-8 items-center`}>
        {/* Project Image */}
        <div className="relative overflow-hidden rounded-xl shadow-lg aspect-video">
          <AnimatePresence mode="wait">
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
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    {currentProject.category}
                  </span>
                  <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">{currentProject.year}</span>
                </div>
                <h3 className="text-white text-xl md:text-2xl font-bold">{currentProject.title}</h3>
                <p className="text-zinc-200 text-sm">{currentProject.location}</p>
              </div>

              <button
                onClick={() => setExpanded(!expanded)}
                className="absolute top-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <Maximize2 className="h-4 w-4 text-white" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Project Details */}
        {!expanded && (
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800"
          >
            <h3 className="text-2xl font-bold mb-2">{currentProject.title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">{currentProject.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Lokasjon</h4>
                <p className="font-medium">{currentProject.location}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">År</h4>
                <p className="font-medium">{currentProject.year}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Kategori</h4>
                <p className="font-medium">{currentProject.category}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Status</h4>
                <p className="font-medium">Fullført</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Se Detaljer</Button>
              <Button variant="outline">3D Modell</Button>
            </div>
          </motion.div>
        )}
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
                i === currentIndex ? "w-8 bg-purple-600 dark:bg-purple-500" : "w-2 bg-zinc-300 dark:bg-zinc-700"
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
