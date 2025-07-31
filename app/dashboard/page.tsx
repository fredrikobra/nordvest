import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DatabaseService } from "@/lib/database"
import { Building2, TrendingUp, Leaf, MessageSquare, Plus } from "lucide-react"

export default async function DashboardPage() {
  const [projects, conversations, stats] = await Promise.all([
    DatabaseService.getProjects(),
    DatabaseService.getConversations(),
    DatabaseService.getProjectStats(),
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "in_progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "planning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "on_hold":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Fullført"
      case "in_progress":
        return "Pågående"
      case "planning":
        return "Planlegging"
      case "on_hold":
        return "På vent"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Oversikt over prosjekter og AI-assistanse</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nytt prosjekt
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totale prosjekter</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_projects || 0}</div>
              <p className="text-xs text-muted-foreground">{stats.active_projects || 0} aktive</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fullførte</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed_projects || 0}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total_projects > 0 ? Math.round((stats.completed_projects / stats.total_projects) * 100) : 0}% av
                totalt
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bærekraft snitt</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.avg_sustainability_score ? Math.round(stats.avg_sustainability_score) : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">av 100 poeng</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI-samtaler</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversations.length}</div>
              <p className="text-xs text-muted-foreground">Totalt antall</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Nylige prosjekter</CardTitle>
              <CardDescription>Oversikt over de siste prosjektene</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.slice(0, 5).map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{project.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {project.description || "Ingen beskrivelse"}
                      </p>
                      {project.budget && (
                        <p className="text-sm text-gray-500 mt-1">
                          Budget: {project.budget.toLocaleString("no-NO")} NOK
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                      {project.sustainability_score && (
                        <div className="text-sm text-green-600 dark:text-green-400">
                          🌱 {project.sustainability_score}/100
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {projects.length === 0 && <p className="text-gray-500 text-center py-4">Ingen prosjekter ennå</p>}
              </div>
            </CardContent>
          </Card>

          {/* Recent Conversations */}
          <Card>
            <CardHeader>
              <CardTitle>Nylige AI-samtaler</CardTitle>
              <CardDescription>Siste interaksjoner med AI-assistenten</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversations.slice(0, 5).map((conversation) => (
                  <div key={conversation.id} className="p-3 border rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Bruker:</strong> {conversation.user_message.slice(0, 100)}
                      {conversation.user_message.length > 100 && "..."}
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">
                      <strong>AI:</strong> {conversation.ai_response.slice(0, 100)}
                      {conversation.ai_response.length > 100 && "..."}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      {new Date(conversation.created_at).toLocaleDateString("no-NO")}
                    </div>
                  </div>
                ))}
                {conversations.length === 0 && <p className="text-gray-500 text-center py-4">Ingen samtaler ennå</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Systemstatus</CardTitle>
            <CardDescription>Status for integrerte tjenester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Neon Database</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Grok AI</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Redis Cache</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Blob Storage</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
