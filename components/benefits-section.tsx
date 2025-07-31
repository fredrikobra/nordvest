"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Clock, Recycle, Leaf, TrendingUp, Shield } from "lucide-react"

export default function BenefitsSection() {
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
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const benefits = [
    {
      title: "Kortere byggetid",
      description: "Prefabrikkerte løsninger reduserer byggetiden betydelig sammenlignet med tradisjonelle metoder.",
      icon: <Clock className="h-10 w-10 text-green-600" />,
    },
    {
      title: "Høy ombruksgrad",
      description: "Våre systemløsninger kan enkelt demonteres og gjenbrukes ved ombygging eller flytting.",
      icon: <Recycle className="h-10 w-10 text-green-600" />,
    },
    {
      title: "Miljøvennlig",
      description: "Mindre svinn, kapp, støv, støy og utslipp på byggeplass gir et lavere miljøavtrykk.",
      icon: <Leaf className="h-10 w-10 text-green-600" />,
    },
    {
      title: "Økonomisk gevinst",
      description: "Kortere byggetid og mulighet for gjenbruk gir betydelige økonomiske besparelser over tid.",
      icon: <TrendingUp className="h-10 w-10 text-green-600" />,
    },
    {
      title: "Sporbare råvarer",
      description: "Vi bruker anerkjente leverandører som sikrer at råvarene kan spores i hele verdikjeden.",
      icon: <CheckCircle2 className="h-10 w-10 text-green-600" />,
    },
    {
      title: "Fremtidssikret",
      description: "Våre løsninger møter dagens og fremtidens krav til byggeiere og byggbesittere.",
      icon: <Shield className="h-10 w-10 text-green-600" />,
    },
  ]

  return (
    <section id="fordeler" className="py-16 md:py-24 bg-slate-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 border border-green-200 rounded-full bg-green-50 text-green-600 text-sm">
            Fordeler
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hvorfor velge systeminnredning?</h2>
          <p className="text-slate-600 leading-relaxed">
            Ved å velge våre smarte prefabrikkerte løsninger får du en rekke fordeler som gir både økonomisk og
            miljømessig gevinst.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
