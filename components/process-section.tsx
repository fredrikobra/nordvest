"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function ProcessSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  const steps = [
    {
      number: "01",
      title: "Behovskartlegging",
      description: "Vi starter med en grundig kartlegging av dine behov og ønsker for å skape den optimale løsningen.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-Zx35XPU1csvXyYRyhOYpO8B1q5j488.png",
    },
    {
      number: "02",
      title: "Design og planlegging",
      description: "Våre eksperter designer en skreddersydd løsning basert på dine behov og byggets forutsetninger.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-w1JSIzFsADtt7SqQdWa0TpU6Q0o8N0.png",
    },
    {
      number: "03",
      title: "Produksjon",
      description: "Komponentene produseres med høy presisjon i fabrikk, noe som sikrer kvalitet og minimerer svinn.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-UCIHq3wJjRDOauSJ5AO0kNHoISCqPR.png",
    },
    {
      number: "04",
      title: "Installasjon",
      description: "Våre erfarne montører installerer systemløsningene raskt og effektivt med minimal forstyrrelse.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-vCOg330zbBVhSVE6YaQGtvS9mwa7Qm.png",
    },
  ]

  return (
    <section id="prosess" className="py-16 md:py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 border border-green-200 rounded-full bg-green-50 text-green-600 text-sm font-medium">
            Vår prosess
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Fra idé til ferdig løsning
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Vi følger en strukturert prosess for å sikre at du får den beste løsningen for dine behov, med høy kvalitet
            og minimal miljøpåvirkning.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants} className="relative flex flex-col">
              <div className="relative h-48 w-full rounded-lg overflow-hidden mb-6 shadow-lg">
                <Image src={step.image || "/placeholder.svg"} alt={step.title} fill className="object-cover" />
                <div className="absolute top-0 left-0 bg-green-600 text-white text-xl font-bold p-2 px-3 rounded-br-lg">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{step.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-24 transform -translate-y-1/2 translate-x-1/2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="#D1D5DB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
