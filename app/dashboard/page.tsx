"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Building2, Leaf, DollarSign, MessageSquare, TrendingUp, Plus, Eye, Edit } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  name: string
  description: string
  status: "draft" | "active" | "completed" | "cancelled"
  created_at: string
  estimated_cost: number
  sustainability_score: number
  location: string
  project_type: string
  square_meters: number
}

interface ProjectStats {
  total_projects: number
  active_projects: number
  completed_projects: number
  average_sustainability_score: number
  total_estimated_value: number
  events_last_30_days: number
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [stats, setStats] = useState<ProjectStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch projects
      const projectsResponse = await fetch("/api/projects")
      if (!projectsResponse.ok) throw new Error("Failed to fetch projects")
      const projectsData = await projectsResponse.json()

      // Fetch analytics stats
      const statsResponse = await fetch("/api/analytics")
      if (!statsResponse.ok) throw new Error("Failed to fetch stats")
      const statsData = await statsResponse.json()

      setProjects(projectsData.data || [])
      setStats(statsData.data || null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("no-NO", {
      style: "currency",
      currency: "NOK",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="border-red-200">
          <CardContent className="p-6">
            <p className="text-red-600">Error: {error}</p>
            <Button onClick={fetchDashboardData} className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Oversikt over dine byggeprosjekter</p>
        </div>
        <Link href="/projects/new">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Nytt Prosjekt
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totale Prosjekter</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_projects}</div>
              <p className="text-xs text-muted-foreground">{stats.active_projects} aktive prosjekter</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bærekraftsscore</CardTitle>
              <Leaf className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(stats.average_sustainability_score)}</div>
              <Progress value={stats.average_sustainability_score} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Verdi</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.total_estimated_value)}</div>
              <p className="text-xs text-muted-foreground">Estimert prosjektverdi</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktivitet</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.events_last_30_days}</div>
              <p className="text-xs text-muted-foreground">Hendelser siste 30 dager</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Projects Section */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Alle Prosjekter</TabsTrigger>
          <TabsTrigger value="active">Aktive</TabsTrigger>
          <TabsTrigger value="completed">Fullførte</TabsTrigger>
          <TabsTrigger value="draft">Utkast</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <ProjectsList projects={projects} />
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <ProjectsList projects={projects.filter((p) => p.status === "active")} />
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <ProjectsList projects={projects.filter((p) => p.status === "completed")} />
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <ProjectsList projects={projects.filter((p) => p.status === "draft")} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProjectsList({ projects }: { projects: Project[] }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("no-NO", {
      style: "currency",
      currency: "NOK",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen prosjekter funnet</h3>
          <p className="text-gray-600 mb-4">Kom i gang ved å opprette ditt første prosjekt</p>
          <Link href="/projects/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Opprett Prosjekt
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <CardTitle className="text-xl">{project.name}</CardTitle>
                <CardDescription className="text-sm">{project.description?.slice(0, 150)}...</CardDescription>
              </div>
              <Badge className={getStatusColor(project.status)}>
                {project.status === "active" && "Aktiv"}
                {project.status === "completed" && "Fullført"}
                {project.status === "draft" && "Utkast"}
                {project.status === "cancelled" && "Kansellert"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Lokasjon</p>
                <p className="font-medium">{project.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <p className="font-medium">{project.project_type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Areal</p>
                <p className="font-medium">{project.square_meters} m²</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Budsjett</p>
                <p className="font-medium">{formatCurrency(project.estimated_cost)}</p>
              </div>
            </div>

            {project.sustainability_score && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Bærekraftsscore</span>
                  <span className="text-sm font-medium">{project.sustainability_score}/100</span>
                </div>
                <Progress value={project.sustainability_score} className="h-2" />
              </div>
            )}

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Opprettet {new Date(project.created_at).toLocaleDateString("no-NO")}
              </p>
              <div className="flex space-x-2">
                <Link href={`/projects/${project.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Vis
                  </Button>
                </Link>
                <Link href={`/projects/${project.id}/chat`}>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                </Link>
                <Link href={`/projects/${project.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Rediger
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
