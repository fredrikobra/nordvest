import prisma from "@/lib/prisma"
import type { Project } from "@prisma/client"
import DashboardClient from "./client-page"

async function getProjects(): Promise<Project[]> {
  // Liten endring for å tvinge en oppdatering av forhåndsvisningen.
  // Forsøker nå å hente prosjekter fra databasen igjen.
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return projects
  } catch (error) {
    console.error("Database query failed:", error)
    // Returnerer en tom liste hvis databasen feiler, for å unngå en svart skjerm.
    return []
  }
}

export default async function DashboardPage() {
  const projects = await getProjects()
  return <DashboardClient projects={projects} />
}
