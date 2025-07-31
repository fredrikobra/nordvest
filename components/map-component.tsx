"use client"

import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone } from "lucide-react"

// Fikser et problem med standardikonet i Next.js
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
})

const position: [number, number] = [62.4722, 6.1495] // Koordinater for Tua 24, Ålesund

// Egendefinert SVG-ikon for kartnålen for å matche designet
const customIcon = new L.DivIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"><path fill="#2563EB" d="M16 0C10.48 0 6 4.48 6 10c0 7 10 17 10 17s10-10 10-17C26 4.48 21.52 0 16 0z" /><circle cx="16" cy="10" r="4" fill="white" /></svg>`,
  className: "bg-transparent border-0",
  iconSize: [32, 32],
  iconAnchor: [16, 32], // Forankre nederst i midten
})

const MapComponent = () => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg h-[450px] md:h-[500px] border">
      <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="h-full w-full" zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topleft" />
        <Marker position={position} icon={customIcon} />
      </MapContainer>
      <Card className="absolute top-4 right-4 md:top-8 md:right-8 w-[300px] z-[1000] shadow-xl">
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Nordvest Bygginnredning AS</h3>
          <div className="space-y-3 text-slate-700">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-slate-500 flex-shrink-0" />
              <span>Tua 24, 6010 Ålesund</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-slate-500 flex-shrink-0" />
              <span>+47 905 60 977</span>
            </div>
          </div>
          <Button
            asChild
            variant="outline"
            className="w-full mt-6 border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700 bg-transparent"
          >
            <a
              href={`https://www.google.com/maps/search/?api=1&query=Tua+24,+6010+Ålesund`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Åpne i kart
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default MapComponent
