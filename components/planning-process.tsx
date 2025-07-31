"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function PlanningProcess() {
  return (
    <section className="py-20 px-4 md:px-0 relative overflow-hidden">
      {/* Background shape */}
      <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-purple-600 rounded-bl-[100px] -z-10"></div>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Profesjonell Planlegging og Rådgivning</h2>
              <p className="text-white/90 mb-8">
                Vårt team av erfarne arkitekter og byggesaksrådgivere hjelper deg gjennom hele prosessen - fra idé til
                ferdig byggesøknad. Vi kombinerer tradisjonell ekspertise med moderne teknologi for å sikre at ditt
                prosjekt blir vellykket.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Detaljerte tegninger og 3D-modeller",
                  "Rådgivning om byggeforskrifter og reguleringer",
                  "Komplett dokumentasjon for byggesøknader",
                  "AI-drevet analyse av godkjenningssannsynlighet",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                    <p className="text-white/90">{item}</p>
                  </div>
                ))}
              </div>

              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Bestill Konsultasjon <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          <div className="order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image src="/images/drone-filming.png" alt="Drone filming av Ålesund" fill className="object-cover" />
              </div>

              <div className="absolute -bottom-6 -left-6 p-4 bg-white rounded-lg shadow-lg">
                <Image
                  src="/images/iphone-photoshoot.png"
                  alt="iPhone fotoshoot"
                  width={120}
                  height={80}
                  className="object-cover rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
