"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

type BeforeAfterProject = {
  id: string
  title: string
  description: string
  beforeImage: string
  afterImage: string
  category: string
}

const projects: BeforeAfterProject[] = [
  {
    id: "project1",
    title: "Ålesund Bakeri - Instagram Makeover",
    description:
      "Vi redesignet Instagram-profilen til Ålesund Bakeri med profesjonelle bilder og konsistent visuell identitet.",
    beforeImage: "/images/before-after-1-before.png",
    afterImage: "/images/before-after-1-after.png",
    category: "instagram",
  },
  {
    id: "project2",
    title: "Møre Møbler - Nettbutikk Redesign",
    description: "Konverteringsoptimalisert redesign av nettbutikken til Møre Møbler med fokus på brukeropplevelse.",
    beforeImage: "/images/before-after-2-before.png",
    afterImage: "/images/before-after-2-after.png",
    category: "web",
  },
  {
    id: "project3",
    title: "Sunnmøre Turlag - Visuell Identitet",
    description: "Ny visuell identitet og innholdsstrategi for Sunnmøre Turlag som økte engasjementet med 250%.",
    beforeImage: "/images/before-after-3-before.png",
    afterImage: "/images/before-after-3-after.png",
    category: "branding",
  },
]

export default function BeforeAfterShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const currentProject = projects[currentIndex]

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
    setSliderPosition(50) // Reset slider position
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setSliderPosition(50) // Reset slider position
  }

  const handleMouseDown = () => {
    isDragging.current = true
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))

    setSliderPosition(percentage)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width))
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))

    setSliderPosition(percentage)
  }

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      isDragging.current = false
    }

    document.addEventListener("mouseup", handleMouseUpGlobal)
    return () => {
      document.removeEventListener("mouseup", handleMouseUpGlobal)
    }
  }, [])

  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">{currentProject.title}</h3>
        <p className="text-slate-600 dark:text-slate-400">{currentProject.description}</p>
      </div>

      {/* Before/After Slider */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-ew-resize mb-6"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchStart={() => (isDragging.current = true)}
        onTouchEnd={() => (isDragging.current = false)}
      >
        {/* After Image (Full) */}
        <div className="absolute inset-0">
          <Image
            src={currentProject.afterImage || "/placeholder.svg"}
            alt={`${currentProject.title} - Etter`}
            fill
            className="object-cover"
          />
        </div>

        {/* Before Image (Clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
          <Image
            src={currentProject.beforeImage || "/placeholder.svg"}
            alt={`${currentProject.title} - Før`}
            fill
            className="object-cover"
            style={{ width: `${100 / (sliderPosition / 100)}%` }}
          />

          {/* Labels */}
          <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 text-sm rounded">Før</div>
        </div>

        <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 text-sm rounded">Etter</div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="flex flex-col items-center">
              <ChevronLeft className="h-3 w-3 -ml-1" />
              <ChevronRight className="h-3 w-3 -mr-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4">
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
