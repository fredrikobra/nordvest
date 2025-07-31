"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Leaf, TrendingUp } from "lucide-react"
import Image from "next/image"

const caseStudies = [
  {
    id: 1,
    title: "Moderne Coworking-løsning - Ålesund Sentrum",
    client: "Yoyn Cowork Ålesund",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Referanser.jpg-JDaVCkgWbrJZZ6k2C8H2EUDJkIL8tV.jpeg",
    challenge: "Skape fleksible arbeidsområder for moderne coworking",
    solution: "Systemvegger og glassvegger for modulære arbeidsområder",
    results: [
      { icon: Clock, text: "50% raskere ferdigstillelse", color: "text-blue-600" },
      { icon: Leaf, text: "100% ombrukbare materialer", color: "text-green-600" },
      { icon: TrendingUp, text: "Økt fleksibilitet for leietakere", color: "text-purple-600" },
    ],
    description:
      "Ved å bruke våre prefabrikkerte systemløsninger skapte vi fleksible arbeidsområder som enkelt kan tilpasses ulike leietakeres behov.",
  },
]

export default function CaseStudiesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-green-600 px-3 py-1 text-sm text-white">Våre Resultater</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Bevist Suksess i Praksis</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Se hvordan våre systemløsninger har transformert arbeidsplasser i Ålesund og skapt fleksible, bærekraftige
              løsninger.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-2xl items-start gap-6 py-12">
          {caseStudies.map((study) => (
            <Card key={study.id} className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative overflow-hidden">
                <Image
                  src={study.image || "/placeholder.svg"}
                  alt={study.title}
                  width={400}
                  height={300}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">{study.client}</p>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{study.description}</p>

                <div className="space-y-3 mb-6">
                  {study.results.map((result, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <result.icon className={`h-4 w-4 ${result.color}`} />
                      <span className="text-sm font-medium">{result.text}</span>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full group bg-transparent">
                  Les hele historien
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            Kontakt oss for ditt prosjekt
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
