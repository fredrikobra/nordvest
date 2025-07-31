'use client'

import dynamic from 'next/dynamic'

const MapClient = dynamic(() => import('./map-client'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Laster kart...</div>
    </div>
  )
})

export default function MapSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Våre Prosjekter i Norge
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Se hvor vi har gjennomført byggeinnredningsprosjekter over hele landet
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <MapClient />
        </div>
      </div>
    </section>
  )
}
