"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

const MapClient = dynamic(() => import("./map-client"), {
  ssr: false,
  loading: () => <Skeleton className="h-[450px] md:h-[500px] w-full rounded-xl" />,
})

export default function MapSection() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Finn oss</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Besøk oss på Tua 24 i Ålesund for en uforpliktende samtale om ditt prosjekt.
          </p>
        </div>
        <MapClient />
      </div>
    </section>
  )
}
