'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Building2, Calendar, DollarSign } from 'lucide-react'

const projects = [
  {
    id: 1,
    name: "Moderne Kontorløsning - Oslo Sentrum",
    location: "Oslo",
    coordinates: { lat: 59.9139, lng: 10.7522 },
    status: "Fullført",
    year: "2023",
    budget: "850.000 NOK",
    description: "Komplett renovering av kontorlandskap med fokus på bærekraft",
    image: "/placeholder.svg?height=200&width=300&text=Oslo+Office"
  },
  {
    id: 2,
    name: "Bærekraftig Showroom - Bergen",
    location: "Bergen",
    coordinates: { lat: 60.3913, lng: 5.3221 },
    status: "Pågående",
    year: "2024",
    budget: "450.000 NOK",
    description: "Miljøvennlig showroom med gjenbruksmaterialer",
    image: "/placeholder.svg?height=200&width=300&text=Bergen+Showroom"
  },
  {
    id: 3,
    name: "Kontoroppgradering - Trondheim",
    location: "Trondheim",
    coordinates: { lat: 63.4305, lng: 10.3951 },
    status: "Planlagt",
    year: "2024",
    budget: "320.000 NOK",
    description: "Modernisering av eksisterende kontorlokaler",
    image: "/placeholder.svg?height=200&width=300&text=Trondheim+Office"
  }
]

export default function MapClient() {
  const [selectedProject, setSelectedProject] = useState(projects[0])
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simple Google Maps embed fallback
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <iframe
          width="100%"
          height="400"
          style="border:0"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000000!2d10.7522!3d59.9139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416e61f267f039%3A0x7e92605fd3231e9a!2sNorway!5e0!3m2!1sen!2sno!4v1640995200000!5m2!1sen!2sno">
        </iframe>
      `
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Fullført":
        return "bg-green-500"
      case "Pågående":
        return "bg-blue-500"
      case "Planlagt":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Map Placeholder - Using Google Maps embed */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
          <div ref={mapRef} className="w-full h-full" />
        </div>
        
        {/* Project markers overlay */}
        <div className="p-4 border-t">
          <div className="flex flex-wrap gap-2">
            {projects.map((project) => (
              <Button
                key={project.id}
                variant={selectedProject.id === project.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedProject(project)}
                className="flex items-center gap-2"
              >
                <MapPin className="w-3 h-3" />
                {project.location}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <div className="aspect-video bg-gray-100">
            <img
              src={selectedProject.image || "/placeholder.svg"}
              alt={selectedProject.name}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{selectedProject.name}</h3>
              <Badge className={`${getStatusColor(selectedProject.status)} text-white`}>
                {selectedProject.status}
              </Badge>
            </div>
            
            <p className="text-gray-600 mb-4">{selectedProject.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{selectedProject.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{selectedProject.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span>{selectedProject.budget}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span>Kontorinnredning</span>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <Button className="flex-1">
                Se Detaljer
              </Button>
              <Button variant="outline" className="flex-1">
                Kontakt Oss
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">15+</div>
              <div className="text-sm text-gray-600">Fullførte Prosjekter</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-sm text-gray-600">Pågående Prosjekter</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">8</div>
              <div className="text-sm text-gray-600">Planlagte Prosjekter</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
