"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Leaf,
  DollarSign,
  Calendar,
  MessageSquare,
  FileText,
  MapPin,
  Ruler,
  Lightbulb,
  CreditCard,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  name: string
  description: string
  status: string
  created_at: string
  estimated_cost: number
  sustainability_score: number
  location: string
  project_type: string
  square_meters: number
  budget_range: string
  special_requirements: string[]
}

interface SustainabilityRecommendation {
  id: string
  category: string
  title: string
  description: string
  impact_score: number
  cost_estimate: number
  savings_estimate: number
  implementation_time: string
  priority: number
  status: string
  environmental_impact: string
  roi_months: number
  certification_eligible: boolean
}

interface FinancingOption {
  id: string
  type: string
  title: string
  description: string
  amount: number
  interest_rate: number
  term_months: number
  requirements: string[]
  benefits: string[]
  provider: string
  eligibility_score: number
  processing_time_days: number
}

export default function ProjectDetail() {
  const params = useParams()
  const projectId = params.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [recommendations, setRecommendations] = useState<SustainabilityRecommendation[]>([])
  const [financingOptions, setFinancingOptions] = useState<FinancingOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [generatingAnalysis, setGeneratingAnalysis] = useState(false)

  useEffect(() => {
    if (projectId) {
      fetchProjectData()
    }
  }, [projectId])

  const fetchProjectData = async () => {
    try {
      setLoading(true)

      // Fetch project details
      const projectResponse = await fetch(`/api/projects/${projectId}`)
      if (!projectResponse.ok) throw new Error("Failed to fetch project")
      const projectData = await projectResponse.json()

      // Fetch sustainability recommendations
      const sustainabilityResponse = await fetch(`/api/projects/${projectId}/sustainability`)
      if (sustainabilityResponse.ok) {
        const sustainabilityData = await sustainabilityResponse.json()
        setRecommendations(sustainabilityData.data || [])
      }

      // Fetch financing options
      const financingResponse = await fetch(`/api/projects/${projectId}/financing`)
      if (financingResponse.ok) {
        const financingData = await financingResponse.json()
        setFinancingOptions(financingData.data || [])
      }

      setProject(projectData.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const generateSustainabilityAnalysis = async () => {
    try {
      setGeneratingAnalysis(true)
      const response = await fetch(`/api/projects/${projectId}/sustainability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })

      if (!response.ok) throw new Error("Failed to generate analysis")

      const data = await response.json()
      setRecommendations(data.data.recommendations || [])

      // Update project sustainability score
      if (data.data.analysis?.overall_score) {
        setProject((prev) =>
          prev
            ? {
                ...prev,
                sustainability_score: data.data.analysis.overall_score,
              }
            : null,
        )
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate analysis")
    } finally {
      setGeneratingAnalysis(false)
    }
  }

  const generateFinancingOptions = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}/financing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })

      if (!response.ok) throw new Error("Failed to generate financing options")

      const data = await response.json()
      setFinancingOptions(data.data.options || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate financing options")
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

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return "bg-red-100 text-red-800"
      case 2:
        return "bg-orange-100 text-orange-800"
      case 3:
        return "bg-yellow-100 text-yellow-800"
      case 4:
        return "bg-blue-100 text-blue-800"
      case 5:
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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

  if (error || !project) {
    return (
      <div className="container mx-auto p-6">
        <Alert className="border-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || "Project not found"}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
          </div>
          <p className="text-gray-600 max-w-2xl">{project.description}</p>
        </div>
        <div className="flex space-x-2">
          <Link href={`/projects/${projectId}/chat`}>
            <Button variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </Button>
          </Link>
          <Link href={`/projects/${projectId}/edit`}>
            <Button>Rediger Prosjekt</Button>
          </Link>
        </div>
      </div>

      {/* Project Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lokasjon</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.location}</div>
            <p className="text-xs text-muted-foreground">{project.project_type}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Areal</CardTitle>
            <Ruler className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.square_meters} m²</div>
            <p className="text-xs text-muted-foreground">Totalt areal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budsjett</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(project.estimated_cost)}</div>
            <p className="text-xs text-muted-foreground">{project.budget_range}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bærekraft</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.sustainability_score || "N/A"}</div>
            {project.sustainability_score && <Progress value={project.sustainability_score} className="mt-2" />}
          </CardContent>
        </Card>
      </div>

      {/* Special Requirements */}
      {project.special_requirements && project.special_requirements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Spesielle Krav</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.special_requirements.map((req, index) => (
                <Badge key={index} variant="outline">
                  {req}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs for different sections */}
      <Tabs defaultValue="sustainability" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sustainability">Bærekraft</TabsTrigger>
          <TabsTrigger value="financing">Finansiering</TabsTrigger>
          <TabsTrigger value="planning">Planlegging</TabsTrigger>
        </TabsList>

        <TabsContent value="sustainability" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Bærekraftsanbefalinger</h2>
            <Button onClick={generateSustainabilityAnalysis} disabled={generatingAnalysis}>
              {generatingAnalysis ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Genererer...
                </>
              ) : (
                <>
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Generer Analyse
                </>
              )}
            </Button>
          </div>

          {recommendations.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Leaf className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen anbefalinger ennå</h3>
                <p className="text-gray-600 mb-4">Generer AI-baserte bærekraftsanbefalinger for prosjektet</p>
                <Button onClick={generateSustainabilityAnalysis} disabled={generatingAnalysis}>
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Generer Anbefalinger
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {recommendations.map((rec) => (
                <Card key={rec.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{rec.title}</CardTitle>
                        <CardDescription>{rec.category}</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getPriorityColor(rec.priority)}>Prioritet {rec.priority}</Badge>
                        {rec.certification_eligible && (
                          <Badge variant="outline" className="text-green-600">
                            Sertifiseringsberettiget
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{rec.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Påvirkningsscore</p>
                        <p className="font-medium">{rec.impact_score}/10</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Kostnad</p>
                        <p className="font-medium">{rec.cost_estimate ? formatCurrency(rec.cost_estimate) : "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Årlige besparelser</p>
                        <p className="font-medium">
                          {rec.savings_estimate ? formatCurrency(rec.savings_estimate) : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Implementeringstid</p>
                        <p className="font-medium">{rec.implementation_time}</p>
                      </div>
                    </div>

                    {rec.environmental_impact && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-green-800">
                          <strong>Miljøpåvirkning:</strong> {rec.environmental_impact}
                        </p>
                      </div>
                    )}

                    {rec.roi_months && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          <strong>Tilbakebetalingstid:</strong> {rec.roi_months} måneder
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="financing" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Finansieringsmuligheter</h2>
            <Button onClick={generateFinancingOptions}>
              <CreditCard className="w-4 h-4 mr-2" />
              Generer Alternativer
            </Button>
          </div>

          {financingOptions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen finansieringsalternativer ennå</h3>
                <p className="text-gray-600 mb-4">Generer AI-baserte finansieringsanbefalinger</p>
                <Button onClick={generateFinancingOptions}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Generer Alternativer
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {financingOptions.map((option) => (
                <Card key={option.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{option.title}</CardTitle>
                        <CardDescription>{option.provider}</CardDescription>
                      </div>
                      <Badge variant="outline">{option.eligibility_score}% match</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{option.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Beløp</p>
                        <p className="font-medium">{formatCurrency(option.amount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Rente</p>
                        <p className="font-medium">{option.interest_rate ? `${option.interest_rate}%` : "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Løpetid</p>
                        <p className="font-medium">{option.term_months ? `${option.term_months} mnd` : "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Behandlingstid</p>
                        <p className="font-medium">{option.processing_time_days} dager</p>
                      </div>
                    </div>

                    {option.requirements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Krav:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {option.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {option.benefits.length > 0 && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="font-medium mb-2 text-blue-900">Fordeler:</h4>
                        <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                          {option.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Prosjektplanlegging</h2>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              Generer Plan
            </Button>
          </div>

          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Prosjektplan kommer snart</h3>
              <p className="text-gray-600 mb-4">AI-generert prosjektplanlegging med tidslinjer og milepæler</p>
              <Button disabled>
                <FileText className="w-4 h-4 mr-2" />
                Kommer snart
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
