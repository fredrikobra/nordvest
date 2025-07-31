"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Instagram, ExternalLink } from "lucide-react"

// Mock data for Instagram feeds
// In a real implementation, this would come from the Instagram API
const mockInstagramData = {
  itonsberg: [
    {
      id: "it1",
      imageUrl: "/images/instagram/itonsberg-1.png",
      caption:
        "Ny nettside lansert for Ålesund Seafood! Sjekk ut det nye designet på aalesundseafood.no #webdesign #ålesund",
      likes: 87,
      comments: 12,
      date: "2d",
    },
    {
      id: "it2",
      imageUrl: "/images/instagram/itonsberg-2.png",
      caption: "Jobber med spennende AI-løsninger for lokale bedrifter. Fremtiden er her! #AI #teknologi #innovasjon",
      likes: 124,
      comments: 18,
      date: "5d",
    },
    {
      id: "it3",
      imageUrl: "/images/instagram/itonsberg-3.png",
      caption:
        "Workshop med teamet om digital strategi. Alltid gøy å jobbe med kreative hoder! #teamwork #digitalstrategi",
      likes: 93,
      comments: 7,
      date: "1w",
    },
    {
      id: "it4",
      imageUrl: "/images/instagram/itonsberg-4.png",
      caption:
        "Ny teknologi, nye muligheter. Vi hjelper bedrifter med å utnytte potensialet i digitale løsninger. #teknologi #digitalisering",
      likes: 156,
      comments: 21,
      date: "1w",
    },
    {
      id: "it5",
      imageUrl: "/images/instagram/itonsberg-5.png",
      caption: "Kontoret vårt i Ålesund sentrum. Her skapes magien! #kontor #ålesund #arbeidsplass",
      likes: 78,
      comments: 9,
      date: "2w",
    },
    {
      id: "it6",
      imageUrl: "/images/instagram/itonsberg-6.png",
      caption: "Møte med nye kunder om spennende prosjekter. Vi gleder oss til å komme i gang! #kundemøte #prosjekt",
      likes: 112,
      comments: 14,
      date: "2w",
    },
  ],
  iaalesund: [
    {
      id: "ia1",
      imageUrl: "/images/instagram/iaalesund-1.png",
      caption:
        "Vakre Ålesund i solnedgang. Vi er så heldige som får jobbe i Norges vakreste by! #ålesund #solnedgang #norge",
      likes: 245,
      comments: 32,
      date: "1d",
    },
    {
      id: "ia2",
      imageUrl: "/images/instagram/iaalesund-2.png",
      caption:
        "Fotoshoot for Møre Interiør i dag. Flotte produkter fortjener flotte bilder! #fotografi #interiør #design",
      likes: 189,
      comments: 24,
      date: "3d",
    },
    {
      id: "ia3",
      imageUrl: "/images/instagram/iaalesund-3.png",
      caption:
        "Innholdsproduksjon for sosiale medier. Vi skaper engasjerende innhold som treffer målgruppen. #innhold #sosiale medier",
      likes: 167,
      comments: 19,
      date: "6d",
    },
    {
      id: "ia4",
      imageUrl: "/images/instagram/iaalesund-4.png",
      caption: "Drone-filming over Ålesund havn. Fantastiske bilder fra luften! #drone #ålesund #filming",
      likes: 312,
      comments: 41,
      date: "1w",
    },
    {
      id: "ia5",
      imageUrl: "/images/instagram/iaalesund-5.png",
      caption: "Kreativt team-møte på kafé. Beste ideene kommer ofte over en god kopp kaffe! #kreativitet #team #kaffe",
      likes: 143,
      comments: 16,
      date: "1w",
    },
    {
      id: "ia6",
      imageUrl: "/images/instagram/iaalesund-6.png",
      caption:
        "Ny kampanje for lokal restaurant lansert i dag. God mat fortjener god markedsføring! #markedsføring #restaurant #lokal",
      likes: 201,
      comments: 27,
      date: "2w",
    },
  ],
}

// Create placeholder image URLs for the mock data
// In a real implementation, these would be actual Instagram image URLs
for (const account of Object.keys(mockInstagramData)) {
  mockInstagramData[account].forEach((post, index) => {
    post.imageUrl = `/placeholder.svg?height=600&width=600&query=Instagram post from ${account} ${index + 1}`
  })
}

export default function InstagramFeed() {
  const [activeTab, setActiveTab] = useState("iaalesund")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Instagram className="h-5 w-5 text-teal-600 dark:text-teal-500" />
        <h3 className="text-xl font-medium">Instagram Feed</h3>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="iaalesund" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
              @iaalesund
            </TabsTrigger>
            <TabsTrigger value="itonsberg" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
              @itonsberg
            </TabsTrigger>
          </TabsList>
        </div>

        {Object.keys(mockInstagramData).map((account) => (
          <TabsContent key={account} value={account} className="mt-0">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mockInstagramData[account].map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                  >
                    <Image
                      src={post.imageUrl || "/placeholder.svg"}
                      alt={post.caption}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                      <div className="flex justify-end">
                        <span className="text-xs text-white/80">{post.date}</span>
                      </div>

                      <div>
                        <p className="text-white text-sm line-clamp-3 mb-2">{post.caption}</p>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4 text-white/90" />
                            <span className="text-xs text-white/90">{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4 text-white/90" />
                            <span className="text-xs text-white/90">{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="flex justify-center mt-8">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full">
                <Instagram className="h-4 w-4 mr-2" />
                Følg @{account} på Instagram
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
