"use client"
import { Timeline } from "@/components/ui/timeline"
import { Clock, VolumeX, Leaf, TrendingUp, Award, Users, LayoutGrid, Recycle, Info, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const AdvantageCard = ({ icon, percentage, title, description, linkText }: any) => (
  <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col text-center items-center h-full">
    <div className="bg-green-100 p-3 rounded-full mb-3">{icon}</div>
    <p className="text-4xl font-bold text-green-600 mb-1">{percentage}</p>
    <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-500 text-sm mb-4 flex-grow">{description}</p>
    <a href="#" className="text-sm font-medium text-green-600 hover:underline">
      {linkText}
    </a>
  </div>
)

const AdvantagesGrid = () => {
  const advantages = [
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      percentage: "90%",
      title: "Raskere installasjon",
      description: "Prefabrikkerte moduler reduserer byggetid drastisk.",
      linkText: "Redusert byggetid",
    },
    {
      icon: <VolumeX className="h-8 w-8 text-green-600" />,
      percentage: "70%",
      title: "Mindre støy & støv",
      description: "Redusert byggeplassaktivitet gir bedre arbeidsmiljø.",
      linkText: "Mindre støy og støv",
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      percentage: "50%",
      title: "Lavere CO₂-utslipp",
      description: "Bærekraftige materialer og effektiv produksjon.",
      linkText: "CO₂-reduksjon",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      percentage: "15%",
      title: "Økt eiendomsverdi",
      description: "Moderne, fleksible løsninger som øker verdien.",
      linkText: "Verdiøkning",
    },
    {
      icon: <Award className="h-8 w-8 text-green-600" />,
      percentage: "100%",
      title: "C2C-sertifiserte produkter",
      description: "Cradle to Cradle-sertifisering for sirkulær økonomi.",
      linkText: "Sertifiserte produkter",
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      percentage: "95%",
      title: "Forbedret arbeidsmiljø",
      description: "Bedre akustikk og luftkvalitet for medarbeiderne.",
      linkText: "Fornøyde brukere",
    },
    {
      icon: <LayoutGrid className="h-8 w-8 text-green-600" />,
      percentage: "100%",
      title: "Fleksible løsninger",
      description: "Enkelt å rekonfigurere og tilpasse fremtidige behov.",
      linkText: "Modulær fleksibilitet",
    },
    {
      icon: <Recycle className="h-8 w-8 text-green-600" />,
      percentage: "85%",
      title: "Høy gjenbruksgrad",
      description: "Materialer kan demonteres og gjenbrukes.",
      linkText: "Gjenbrukbare komponenter",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {advantages.map((adv, index) => (
        <AdvantageCard key={index} {...adv} />
      ))}
    </div>
  )
}

const CertificationsSection = () => {
  const certifications = [
    { name: "Cradle to Cradle", level: "Gold", color: "bg-green-100 text-green-800" },
    { name: "BREEAM", level: "Outstanding", color: "bg-green-100 text-green-800" },
    { name: "EU Taxonomy", level: "Compliant", color: "bg-green-100 text-green-800" },
  ]

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 md:p-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Sertifisert for sirkulær økonomi</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Alle våre produkter er designet for gjenbruk og oppfyller de strengeste internasjonale standardene.
          </p>
          <Button>
            Les vår bærekraftsrapport <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-lg p-4 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full mr-4">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{cert.name}</span>
              </div>
              <div className="flex items-center">
                <Badge variant="secondary" className={`${cert.color} mr-2`}>
                  {cert.level}
                </Badge>
                <Info className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function HistorySection() {
  const data = [
    {
      title: "Våre Fordeler",
      content: <AdvantagesGrid />,
    },
    {
      title: "Bærekraft",
      content: <CertificationsSection />,
    },
  ]
  return (
    <div className="w-full bg-white dark:bg-neutral-950">
      <Timeline data={data} />
    </div>
  )
}
