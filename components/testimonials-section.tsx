"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const testimonials = [
    {
      name: "Anne Johansen",
      role: "Prosjektleder, Møre Næringspark",
      quote:
        "Nordvest Bygginnredning leverte en fleksibel og miljøvennlig løsning til vårt nye kontorbygg. Prosessen var effektiv, og resultatet ble akkurat slik vi ønsket. Vi er spesielt fornøyd med hvor enkelt det er å tilpasse rommene etter behov.",
      image: "/placeholder.svg?height=100&width=100&query=professional woman portrait",
    },
    {
      name: "Thomas Berg",
      role: "Daglig leder, Berg Eiendom",
      quote:
        "Vi valgte Nordvest Bygginnredning for deres fokus på bærekraft og fleksibilitet. Byggetiden ble betydelig redusert sammenlignet med tradisjonelle løsninger, og kvaliteten er upåklagelig. Anbefales på det sterkeste!",
      image: "/placeholder.svg?height=100&width=100&query=professional man portrait",
    },
    {
      name: "Marte Olsen",
      role: "Arkitekt, Olsen Arkitekter",
      quote:
        "Som arkitekt setter jeg pris på systemløsningene fra Nordvest Bygginnredning. De gir oss mulighet til å skape fleksible rom med høy estetisk kvalitet, samtidig som miljøavtrykket reduseres. Et perfekt valg for fremtidsrettede bygg.",
      image: "/placeholder.svg?height=100&width=100&query=female architect portrait",
    },
  ]

  const nextTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }
  }

  const prevTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 border border-green-200 rounded-full bg-green-50 text-green-600 text-sm">
            Kundehistorier
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hva våre kunder sier</h2>
          <p className="text-slate-600 leading-relaxed">
            Vi er stolte av å ha hjulpet mange bedrifter med å skape fleksible og bærekraftige kontorløsninger.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait" onExitComplete={() => setIsAnimating(false)}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-green-200">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonials[currentIndex].image || "/placeholder.svg"}
                        alt={testimonials[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Quote className="h-10 w-10 text-green-200 mb-4" />
                      <p className="text-lg md:text-xl italic mb-6 text-slate-700">
                        "{testimonials[currentIndex].quote}"
                      </p>
                      <div>
                        <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
                        <p className="text-slate-600">{testimonials[currentIndex].role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              disabled={isAnimating}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => !isAnimating && setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex ? "w-8 bg-green-600" : "w-2 bg-slate-300"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              disabled={isAnimating}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
