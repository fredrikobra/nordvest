"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Camera,
  FileText,
  Globe,
  Instagram,
  Linkedin,
  MessageSquare,
  InstagramIcon as TiktokIcon,
  Zap,
} from "lucide-react"
import Image from "next/image"

// Service categories
const categories = [
  { id: "content", name: "Innholdsproduksjon" },
  { id: "strategy", name: "Strategi" },
  { id: "web", name: "Web & Digital" },
  { id: "ads", name: "Annonsering" },
]

// Update the services array to have all services priced at 3500 kr per month
const services = [
  {
    id: "social-posts",
    name: "Sosiale Media Innlegg",
    description:
      "Profesjonelle innlegg for Instagram og Facebook som engasjerer ditt publikum. 50-200K visninger i måneden i din by.",
    price: "Inkludert i medlemskap",
    category: "content",
    icon: <Instagram className="h-5 w-5" />,
    image: "/images/social-media-content.png",
  },
  {
    id: "photo-video",
    name: "Foto & Video",
    description:
      "Profesjonell foto- og videotjenester for din bedrift med vårt dedikerte team. 50-200K visninger i måneden i din by.",
    price: "3 500 kr",
    category: "content",
    icon: <Camera className="h-5 w-5" />,
    image: "/images/photo-session.png",
  },
  {
    id: "articles",
    name: "Artikler & Blogginnlegg",
    description:
      "Engasjerende artikler og blogginnlegg som styrker din merkevare og SEO. 50-200K visninger i måneden i din by.",
    price: "3 500 kr/mnd",
    category: "content",
    icon: <FileText className="h-5 w-5" />,
    image: "/images/content-writing.png",
  },
  {
    id: "linkedin-strategy",
    name: "LinkedIn Strategi",
    description: "Strategisk innhold og vekst på LinkedIn for B2B-bedrifter. 50-200K visninger i måneden i din by.",
    price: "3 500 kr/mnd (min. 3 mnd)",
    category: "strategy",
    icon: <Linkedin className="h-5 w-5" />,
    image: "/images/linkedin-strategy.png",
  },
  {
    id: "social-strategy",
    name: "Instagram/Facebook Strategi",
    description:
      "Helhetlig strategi for vekst og engasjement på Instagram og Facebook. 50-200K visninger i måneden i din by.",
    price: "3 500 kr/mnd (min. 6 mnd)",
    category: "strategy",
    icon: <Instagram className="h-5 w-5" />,
    image: "/images/instagram-strategy.png",
  },
  {
    id: "tiktok-strategy",
    name: "TikTok Strategi",
    description: "Kreativ strategi for å nå nye målgrupper på TikTok. 50-200K visninger i måneden i din by.",
    price: "3 500 kr/mnd (min. 6 mnd)",
    category: "strategy",
    icon: <TiktokIcon className="h-5 w-5" />,
    image: "/images/tiktok-content.png",
  },
  {
    id: "landing-page",
    name: "Landingsside",
    description:
      "Konverteringsoptimalisert landingsside med .iaalesund.no domene. 50-200K visninger i måneden i din by.",
    price: "3 500 kr",
    category: "web",
    icon: <Globe className="h-5 w-5" />,
    image: "/images/landing-page-design.png",
  },
  {
    id: "custom-ai",
    name: "Tilpasset AI Chat",
    description: "Skreddersydd AI-chatbot trent på din bedrifts informasjon. 50-200K visninger i måneden i din by.",
    price: "3 500 kr",
    category: "web",
    icon: <MessageSquare className="h-5 w-5" />,
    image: "/images/ai-chatbot.png",
  },
  {
    id: "google-ads",
    name: "Google Ads",
    description: "Målrettet annonsering på Google for økt synlighet og trafikk. 50-200K visninger i måneden i din by.",
    price: "3 500 kr/mnd",
    category: "ads",
    icon: <Zap className="h-5 w-5" />,
    image: "/images/google-ads.png",
  },
  {
    id: "meta-ads",
    name: "Meta Ads",
    description:
      "Effektiv annonsering på Facebook og Instagram for økt konvertering. 50-200K visninger i måneden i din by.",
    price: "3 500 kr/mnd",
    category: "ads",
    icon: <Zap className="h-5 w-5" />,
    image: "/images/meta-ads.png",
  },
]

export default function ServiceShowcase() {
  const [activeCategory, setActiveCategory] = useState("content")
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  const filteredServices = services.filter((service) => service.category === activeCategory)

  return (
    <div>
      <Tabs defaultValue="content" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl mx-auto mb-8">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <Card className="h-full overflow-hidden group hover:border-teal-200 dark:hover:border-teal-800 transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 transition-opacity ${
                          hoveredService === service.id ? "opacity-70" : "opacity-50"
                        }`}
                      ></div>
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        fill
                        className={`object-cover transition-transform duration-700 ${
                          hoveredService === service.id ? "scale-110" : "scale-100"
                        }`}
                      />
                      <div className="absolute top-4 left-4 z-20 bg-white dark:bg-slate-900 p-2 rounded-full">
                        <div className="text-teal-600 dark:text-teal-500">{service.icon}</div>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base sm:text-lg md:text-xl">{service.name}</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="font-medium text-sm sm:text-base text-teal-600 dark:text-teal-500">
                          {service.price}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-teal-600 dark:text-teal-500 p-0 hover:bg-transparent group-hover:translate-x-1 transition-transform"
                        >
                          Les mer <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
