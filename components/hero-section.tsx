"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Building2, VolumeX } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 to-green-50">
      <div className="container relative z-10 px-4">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 items-center">
          <div className="space-y-6 md:space-y-8 text-center xl:text-left">
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-2 text-green-600 font-medium justify-center xl:justify-start text-sm md:text-base">
                <Leaf className="h-4 w-4 md:h-5 md:w-5" />
                <span>Bærekraftige systemløsninger</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-slate-900 leading-tight">
                Fremtidens <span className="text-green-600">bygginnredning</span> starter her
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto xl:mx-0">
                Vi leverer prefabrikkerte, ombrukbare systemløsninger som reduserer utslipp, byggetid og
                livssykluskostnader. Våre løsninger oppfyller EU-taksonomi og moderne miljøkrav.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center xl:justify-start">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white h-11 md:h-12 text-sm md:text-base"
              >
                Book gratis befaring
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent h-11 md:h-12 text-sm md:text-base"
              >
                Se våre løsninger
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-slate-200 max-w-sm md:max-w-md mx-auto xl:max-w-none xl:mx-0">
              <div className="text-center">
                <div className="bg-green-100 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Building2 className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-slate-900">90%</div>
                <div className="text-xs md:text-sm text-slate-600">Redusert byggetid</div>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <VolumeX className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-slate-900">0</div>
                <div className="text-xs md:text-sm text-slate-600">Støv og støy</div>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Leaf className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-slate-900">C2C</div>
                <div className="text-xs md:text-sm text-slate-600">Sertifiserte produkter</div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center xl:justify-end mt-8 xl:mt-0">
            <div className="relative z-10 w-full max-w-sm md:max-w-lg xl:max-w-none">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/overview-realism1-cySgHcMLIRpufddcgYq8FyyLfF1vKf.jpeg"
                alt="Moderne kontorinnredning med glassvegger og bærekraftige materialer"
                width={600}
                height={720}
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>

            <div className="absolute -top-4 -right-4 w-16 h-16 md:w-24 md:h-24 bg-green-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-20 h-20 md:w-32 md:h-32 bg-blue-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent"></div>
    </section>
  )
}
