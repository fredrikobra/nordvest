"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Send, Bot, User, Building2, Leaf, CreditCard, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  created_at: string
}

interface Project {
  id: string
  name: string
  description: string
  location: string
  project_type: string
}

export default function ProjectChat() {
  const params = useParams()
  const projectId = params.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (projectId) {
      fetchProjectAndMessages()
    }
  }, [projectId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const fetchProjectAndMessages = async () => {
    try {
      // Fetch project details
      const projectResponse = await fetch(`/api/projects/${projectId}`)
      if (projectResponse.ok) {
        const projectData = await projectResponse.json()
        setProject(projectData.data)
      }

      // Fetch existing conversations
      const chatResponse = await fetch(`/api/chat?projectId=${projectId}`)
      if (chatResponse.ok) {
        const chatData = await chatResponse.json()
        const conversations = chatData.data || []

        if (conversations.length > 0) {
          // Get messages from the most recent conversation
          const latestConversation = conversations[0]
          setConversationId(latestConversation.id)

          const messagesResponse = await fetch(`/api/chat?conversationId=${latestConversation.id}`)
          if (messagesResponse.ok) {
            const messagesData = await messagesResponse.json()
            setMessages(messagesData.data.messages || [])
          }
        }
      }
    } catch (error) {
      console.error("Error fetching project and messages:", error)
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = inputMessage.trim()
    setInputMessage("")
    setIsLoading(true)

    // Add user message to UI immediately
    const tempUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      created_at: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, tempUserMessage])

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, tempUserMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          projectId,
          conversationId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      if (!reader) throw new Error("No response body")

      let assistantMessage = ""
      const tempAssistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        created_at: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, tempAssistantMessage])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = new TextDecoder().decode(value)
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6)
            if (data === "[DONE]") {
              setIsLoading(false)
              return
            }

            try {
              const parsed = JSON.parse(data)
              if (parsed.content) {
                assistantMessage += parsed.content
                setMessages((prev) =>
                  prev.map((m) => (m.id === tempAssistantMessage.id ? { ...m, content: assistantMessage } : m)),
                )
              }
            } catch (e) {
              // Ignore parsing errors for non-JSON lines
            }
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content: "Beklager, det oppstod en feil. Prøv igjen senere.",
          created_at: new Date().toISOString(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickActions = [
    {
      icon: Leaf,
      label: "Bærekraftsanalyse",
      message: "Kan du analysere bærekraftsaspektene ved dette prosjektet og gi anbefalinger?",
    },
    {
      icon: CreditCard,
      label: "Finansieringsmuligheter",
      message: "Hvilke finansieringsalternativer finnes for dette prosjektet?",
    },
    {
      icon: Calendar,
      label: "Prosjektplanlegging",
      message: "Kan du hjelpe meg med å lage en tidsplan for prosjektet?",
    },
    {
      icon: Building2,
      label: "Materialvalg",
      message: "Hvilke materialer anbefaler du for dette prosjektet?",
    },
  ]

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Link href={`/projects/${projectId}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tilbake
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">AI Chat</h1>
          {project && <p className="text-gray-600">{project.name}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Prosjektchat</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[450px] p-4">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Hei! Jeg er din AI-assistent</h3>
                    <p className="text-gray-600 mb-4">
                      Jeg kan hjelpe deg med bærekraft, finansiering og planlegging av prosjektet ditt.
                    </p>
                    <p className="text-sm text-gray-500">
                      Still et spørsmål eller bruk en av hurtighandlingene til høyre.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex space-x-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "assistant" && (
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-green-100">
                              <Bot className="w-4 h-4 text-green-600" />
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.role === "user" ? "text-blue-100" : "text-gray-500"}`}>
                            {new Date(message.created_at).toLocaleTimeString("no-NO", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>

                        {message.role === "user" && (
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-blue-100">
                              <User className="w-4 h-4 text-blue-600" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex space-x-3 justify-start">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-green-100">
                            <Bot className="w-4 h-4 text-green-600" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-100 rounded-lg px-4 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                )}
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Skriv din melding..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={isLoading || !inputMessage.trim()} size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Project Info */}
          {project && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Prosjektinfo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-xs text-gray-600">Navn</p>
                  <p className="text-sm font-medium">{project.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Type</p>
                  <p className="text-sm">{project.project_type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Lokasjon</p>
                  <p className="text-sm">{project.location}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Hurtighandlinger</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto p-3 bg-transparent"
                  onClick={() => setInputMessage(action.message)}
                  disabled={isLoading}
                >
                  <action.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Vær spesifikk i spørsmålene dine</li>
                <li>• Spør om norske standarder og forskrifter</li>
                <li>• Be om kostnadsestimater</li>
                <li>• Diskuter bærekraftsalternativer</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
