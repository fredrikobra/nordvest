"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Users, Building, ShoppingBag, Briefcase } from "lucide-react"

type Location = {
  id: string
  name: string
  description: string
  type: "client" | "partner" | "event" | "office"
  coordinates: { x: number; y: number }
}

const locations: Location[] = [
  {
    id: "office",
    name: "iaalesund.no Hovedkontor",
    description: "Vårt hovedkontor i sentrum av Ålesund",
    type: "office",
    coordinates: { x: 50, y: 50 },
  },
  {
    id: "client1",
    name: "Ålesund Seafood",
    description: "Lokal sjømatprodusent med fokus på bærekraft",
    type: "client",
    coordinates: { x: 30, y: 40 },
  },
  {
    id: "client2",
    name: "Møre Interiør",
    description: "Ledende interiørbutikk i Ålesund sentrum",
    type: "client",
    coordinates: { x: 70, y: 30 },
  },
  {
    id: "client3",
    name: "Sunnmøre Aktiv",
    description: "Arrangør av utendørsaktiviteter i regionen",
    type: "client",
    coordinates: { x: 60, y: 70 },
  },
  {
    id: "partner1",
    name: "Ålesund Næringsforening",
    description: "Strategisk samarbeidspartner for lokalt næringsliv",
    type: "partner",
    coordinates: { x: 40, y: 60 },
  },
  {
    id: "event1",
    name: "Jugendfest",
    description: "Årlig festival hvor vi bidrar med markedsføring",
    type: "event",
    coordinates: { x: 20, y: 65 },
  },
]

export default function InteractiveMap() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("all")

  const filteredLocations = filter === "all" ? locations : locations.filter((loc) => loc.type === filter)

  const getIconForType = (type: string) => {
    switch (type) {
      case "client":
        return <Users className="h-4 w-4" />
      case "partner":
        return <Briefcase className="h-4 w-4" />
      case "event":
        return <ShoppingBag className="h-4 w-4" />
      case "office":
        return <Building className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getColorForType = (type: string) => {
    switch (type) {
      case "client":
        return "bg-teal-500"
      case "partner":
        return "bg-purple-500"
      case "event":
        return "bg-amber-500"
      case "office":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          className={filter === "all" ? "bg-teal-600 hover:bg-teal-700" : ""}
          onClick={() => setFilter("all")}
        >
          Alle lokasjoner
        </Button>
        <Button
          variant={filter === "client" ? "default" : "outline"}
          className={filter === "client" ? "bg-teal-600 hover:bg-teal-700" : ""}
          onClick={() => setFilter("client")}
        >
          <Users className="h-4 w-4 mr-2" /> Kunder
        </Button>
        <Button
          variant={filter === "partner" ? "default" : "outline"}
          className={filter === "partner" ? "bg-teal-600 hover:bg-teal-700" : ""}
          onClick={() => setFilter("partner")}
        >
          <Briefcase className="h-4 w-4 mr-2" /> Partnere
        </Button>
        <Button
          variant={filter === "event" ? "default" : "outline"}
          className={filter === "event" ? "bg-teal-600 hover:bg-teal-700" : ""}
          onClick={() => setFilter("event")}
        >
          <ShoppingBag className="h-4 w-4 mr-2" /> Events
        </Button>
        <Button
          variant={filter === "office" ? "default" : "outline"}
          className={filter === "office" ? "bg-teal-600 hover:bg-teal-700" : ""}
          onClick={() => setFilter("office")}
        >
          <Building className="h-4 w-4 mr-2" /> Kontor
        </Button>
      </div>

      <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
        {/* Map Background */}
        <div className="absolute inset-0">
          <div className="w-full h-full relative">
            <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 to-transparent"></div>
            <div className="absolute inset-0">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Map Locations */}
        {filteredLocations.map((location) => (
          <motion.div
            key={location.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute cursor-pointer"
            style={{
              left: `${location.coordinates.x}%`,
              top: `${location.coordinates.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => setActiveLocation(location.id === activeLocation ? null : location.id)}
          >
            <div
              className={`
              ${getColorForType(location.type)}
              ${activeLocation === location.id ? "scale-125" : "scale-100"}
              w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg transition-transform
            `}
            >
              {getIconForType(location.type)}
            </div>

            {/* Location Name Tooltip */}
            <div
              className={`
              absolute left-1/2 -translate-x-1/2 -bottom-2 transform translate-y-full
              bg-white dark:bg-slate-900 px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap
              transition-opacity
              ${activeLocation === location.id ? "opacity-100" : "opacity-0"}
            `}
            >
              {location.name}
            </div>
          </motion.div>
        ))}

        {/* Location Details */}
        {activeLocation && (
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
              <CardContent className="p-4">
                {(() => {
                  const location = locations.find((loc) => loc.id === activeLocation)
                  if (!location) return null

                  return (
                    <div className="flex items-start gap-3">
                      <div className={`${getColorForType(location.type)} p-2 rounded-full text-white mt-1`}>
                        {getIconForType(location.type)}
                      </div>
                      <div>
                        <h4 className="font-medium">{location.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{location.description}</p>
                      </div>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Map Attribution */}
        <div className="absolute bottom-2 right-2 text-xs text-slate-500 dark:text-slate-400">
          Interaktivt kart over Ålesund
        </div>
      </div>
    </div>
  )
}
