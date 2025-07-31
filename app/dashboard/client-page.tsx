"use client"

import { useState } from "react"
import type { Project } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { NewProjectForm } from "@/components/new-project-form"

export default function DashboardClient({ projects }: { projects: Project[] }) {
  const [isDialogOpen, setDialogOpen] = useState(false)

  // Ekstra sjekk for å unngå krasj hvis 'projects' ikke er en array
  if (!Array.isArray(projects)) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600">En feil oppstod</h1>
          <p className="text-slate-600">Kunne ikke laste prosjektdata.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Prosjektdashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4 line-clamp-2">{project.description || "Ingen beskrivelse."}</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <Badge variant="secondary" className="capitalize">
                    {project.projectType}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {project.status}
                  </Badge>
                  {project.location && <Badge variant="outline">{project.location}</Badge>}
                </div>
              </CardContent>
            </Card>
          ))}

          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Card className="border-dashed border-2 flex items-center justify-center hover:border-green-500 hover:text-green-500 transition-colors cursor-pointer min-h-[200px]">
                <div className="text-center">
                  <p className="text-2xl">+</p>
                  <p>Start nytt prosjekt</p>
                </div>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start et nytt prosjekt</DialogTitle>
              </DialogHeader>
              <NewProjectForm setOpen={setDialogOpen} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
