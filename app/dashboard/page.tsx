import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Building2, TrendingUp, DollarSign, Leaf, MessageSquare, FileText } from "lucide-react"
import { getProjects, getConversations, getProjectStats } from "@/lib/supabase"

export default async function Dashboard() {
  const [projects, conversations, stats] = await Promise.all([getProjects(), getConversations(), getProjectStats()])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "completed":
        return "bg-blue-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "draft":
        return "Utkast"
      case "active":
        return "Aktiv"
      case "completed":
        return "Fullført"
      case "cancelled":
        return "Avbrutt"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Prosjekt Dashboard</h1>
          <p className="text-gray-600">Oversikt over alle byggeprosjekter og bærekraftsanalyser</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totale Prosjekter</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">{stats.active} aktive prosjekter</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fullførte Prosjekter</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% av alle prosjekter
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Verdi</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("no-NO", {
                  style: "currency",
                  currency: "NOK",
                  minimumFractionDigits: 0,
                }).format(stats.totalValue)}
              </div>
              <p className="text-xs text-muted-foreground">Estimert prosjektverdi</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bærekraftsscore</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgSustainabilityScore}/100</div>
              <Progress value={stats.avgSustainabilityScore} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Projects Table */}
        <Card>
          <CardHeader>
            <CardTitle>Prosjektoversikt</CardTitle>
            <CardDescription>Alle registrerte prosjekter med status og bærekraftsinformasjon</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Alle</TabsTrigger>
                <TabsTrigger value="active">Aktive</TabsTrigger>
                <TabsTrigger value="completed">Fullførte</TabsTrigger>
                <TabsTrigger value="draft">Utkast</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <ProjectList projects={projects} getStatusColor={getStatusColor} getStatusText={getStatusText} />
              </TabsContent>

              <TabsContent value="active" className="space-y-4">
                <ProjectList
                  projects={projects.filter((p) => p.status === "active")}
                  getStatusColor={getStatusColor}
                  getStatusText={getStatusText}
                />
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                <ProjectList
                  projects={projects.filter((p) => p.status === "completed")}
                  getStatusColor={getStatusColor}
                  getStatusText={getStatusText}
                />
              </TabsContent>

              <TabsContent value="draft" className="space-y-4">
                <ProjectList
                  projects={projects.filter((p) => p.status === "draft")}
                  getStatusColor={getStatusColor}
                  getStatusText={getStatusText}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ProjectList({
  projects,
  getStatusColor,
  getStatusText,
}: {
  projects: any[]
  getStatusColor: (status: string) => string
  getStatusText: (status: string) => string
}) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Ingen prosjekter funnet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <Badge className={`${getStatusColor(project.status)} text-white`}>
                    {getStatusText(project.status)}
                  </Badge>
                  {project.sustainability_score && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <Leaf className="w-3 h-3 mr-1" />
                      {project.sustainability_score}/100
                    </Badge>
                  )}
                </div>

                <p className="text-gray-600 mb-3">{project.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Kunde:</span>
                    <p className="text-gray-600">{project.user_name || "Ikke oppgitt"}</p>
                  </div>
                  <div>
                    <span className="font-medium">Bedrift:</span>
                    <p className="text-gray-600">{project.company_name || "Ikke oppgitt"}</p>
                  </div>
                  <div>
                    <span className="font-medium">Estimert kostnad:</span>
                    <p className="text-gray-600">
                      {project.estimated_cost
                        ? new Intl.NumberFormat("no-NO", {
                            style: "currency",
                            currency: "NOK",
                            minimumFractionDigits: 0,
                          }).format(project.estimated_cost)
                        : "Ikke oppgitt"}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Opprettet:</span>
                    <p className="text-gray-600">{new Date(project.created_at).toLocaleDateString("no-NO")}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Chat
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-1" />
                  Detaljer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
