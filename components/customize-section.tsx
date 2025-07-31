"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import ProjectPlanner from "./project-planner"
import { CheckCircle } from "lucide-react"

export default function CustomizeSection() {
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
        duration: 0.5,
      },
    },
  }

  return (
    <section id="tilpass" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 border border-green-200 rounded-full bg-green-50 text-green-600 text-sm dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
            Skreddersydd for dine behov
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Bygg din egen kontorløsning
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Bruk vår prosjektplanlegger til å definere dine behov. Velg komponenter og spesifiser omfang for å få et
            skreddersydd, uforpliktende tilbud fra oss.
          </p>
        </div>

        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls}>
          <ProjectPlanner />
        </motion.div>

        <div className="mt-16 bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                Hvorfor velge systeminnredning?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Når du velger å innrede rom med systeminnredning, beholder du fleksibiliteten i lokalet mens du sparer
                både tid og penger - og kanskje viktigst; du skaper forutsetninger for miljøvennlige tilpasninger av
                lokalene.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mt-0.5">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 dark:text-slate-200">Spar tid</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Rask montering og installasjon sammenlignet med tradisjonelle løsninger.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mt-0.5">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 dark:text-slate-200">Spar penger</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Kostnadseffektive løsninger som kan gjenbrukes ved ombygging.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mt-0.5">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 dark:text-slate-200">Miljøvennlig</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Redusert avfall og mulighet for ombruk gir lavere miljøavtrykk.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <div className="relative h-[300px] w-full rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/additional-pHNUg0fgWSIIVM5afUko9ncikNNv07.jpeg"
                  alt="Moderne kontorløsning med systeminnredning"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
