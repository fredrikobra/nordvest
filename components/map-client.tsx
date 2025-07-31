"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

const Map = dynamic(() => import("./map-component"), {
  ssr: false,
  loading: () => <Skeleton className="h-[450px] md:h-[500px] w-full rounded-xl" />,
})

export default function MapClient() {
  return <Map />
}
