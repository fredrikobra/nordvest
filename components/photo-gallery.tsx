"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"

type GalleryImage = {
  id: number
  src: string
  alt: string
  category: string
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/aalesund-harbor-view.jpeg",
    alt: "Ålesund havn sett fra Aksla",
    category: "bybilder",
  },
  {
    id: 2,
    src: "/images/aalesund-mountain-view.jpeg",
    alt: "Fjelllandskap rundt Ålesund",
    category: "natur",
  },
  {
    id: 3,
    src: "/images/aalesund-city-view.jpeg",
    alt: "Ålesund sentrum fra fugleperspektiv",
    category: "bybilder",
  },
  {
    id: 4,
    src: "/images/social-media-content.png",
    alt: "Sosiale media innhold for lokale bedrifter",
    category: "markedsføring",
  },
  {
    id: 5,
    src: "/images/photo-session.png",
    alt: "Profesjonell fotosesjon i Ålesund",
    category: "foto",
  },
  {
    id: 6,
    src: "/images/drone-filming.png",
    alt: "Drone filming over Ålesund",
    category: "foto",
  },
  {
    id: 7,
    src: "/images/event-coverage.png",
    alt: "Event dekning i Ålesund",
    category: "foto",
  },
  {
    id: 8,
    src: "/images/iphone-photoshoot.png",
    alt: "iPhone fotoshoot i Ålesund",
    category: "foto",
  },
]

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("alle")

  const categories = [
    { id: "alle", name: "Alle bilder" },
    { id: "bybilder", name: "Bybilder" },
    { id: "natur", name: "Natur" },
    { id: "foto", name: "Fotografi" },
    { id: "markedsføring", name: "Markedsføring" },
  ]

  const filteredImages =
    activeCategory === "alle" ? galleryImages : galleryImages.filter((img) => img.category === activeCategory)

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  const navigateImage = (direction: "next" | "prev") => {
    if (!selectedImage) return

    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id)
    let newIndex: number

    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredImages.length
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
    }

    setSelectedImage(filteredImages[newIndex])
  }

  return (
    <div className="w-full">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={activeCategory === category.id ? "bg-teal-600 hover:bg-teal-700" : ""}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <motion.div
            key={image.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => openLightbox(image)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <p className="text-white text-sm font-medium">{image.alt}</p>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
                <Maximize2 className="h-4 w-4 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="absolute top-4 right-4 z-10">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={closeLightbox}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="absolute left-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage("prev")
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>

            <div className="absolute right-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage("next")
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl max-h-[80vh] aspect-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4 text-white">
                <p className="text-lg font-medium">{selectedImage.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
