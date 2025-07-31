"use client"

import Image from "next/image"
import { Layers, Ruler, Shield, DoorOpen } from "lucide-react"

const services = [
  {
    title: "Systemvegger",
    description:
      "Fleksible og prefabrikkerte veggløsninger som reduserer byggetid og avfall. Enkle å ombruke ved senere endringer.",
    icon: <Layers className="h-6 w-6 md:h-8 md:w-8 text-green-600" />,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/systemvegger-01%20Medium-PmD8vONsml0eY2CWLRKUFnd1A2yEF2.jpeg",
  },
  {
    title: "Glassvegger",
    description:
      "Skap lys og åpenhet med elegante glassløsninger. Perfekt for moderne kontorer som verdsetter transparens og design.",
    icon: <Ruler className="h-6 w-6 md:h-8 md:w-8 text-green-600" />,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glassvegger-02%20Medium-RU3ixwGsNkEzfVq5ix5CqoKjrDS0Dr.jpeg",
  },
  {
    title: "Akustikkløsninger",
    description:
      "Forbedre lydmiljøet med spiler, finér og treull. Vi designer løsninger som gir optimal akustikk og et behagelig inneklima.",
    icon: <Shield className="h-6 w-6 md:h-8 md:w-8 text-green-600" />,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Akustikkl%C3%B8sninger-03%20Medium-mfITIX5jxWdc0PcCVhjfjwbmF5Ie2C.jpeg",
  },
  {
    title: "Dører & Himlinger",
    description:
      "Komplette systemleveranser med integrerte dører og systemhimlinger for et helhetlig og funksjonelt resultat.",
    icon: <DoorOpen className="h-6 w-6 md:h-8 md:w-8 text-green-600" />,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/himling-dorer-02%20Medium-AnvrEEwmQyocPpjC7z7hh9jdzHjn66.jpeg",
  },
]

export default function ServicesSection() {
  return (
    <section id="tjenester" className="w-full py-12 md:py-16 lg:py-24 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-3 md:space-y-4 text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            Smarte systemløsninger for ditt bygg
          </h2>
          <p className="max-w-[700px] text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
            Vi leverer prefabrikkerte og ombrukbare løsninger som er bedre for både miljøet, byggetiden og
            livssykluskostnadene.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group flex flex-col overflow-hidden rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-800/80 transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative flex h-40 md:h-48 w-full items-center justify-center bg-gray-100 dark:bg-gray-900/50">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={`Bilde av ${service.title}`}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 bg-white p-4 md:p-6 dark:bg-gray-950">
                <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-3">
                  {service.icon}
                  <h3 className="text-lg md:text-xl font-bold">{service.title}</h3>
                </div>
                <p className="text-sm md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
