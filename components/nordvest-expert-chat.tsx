"use client"

import { useState, useEffect } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"

export default function NordvestExpertChat() {
  const [sessionId, setSessionId] = useState<string>("")

  useEffect(() => {
    // Generate a unique session ID
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setSessionId(newSessionId)

    // Create session in database
    const createSession = async () => {
      const supabase = getSupabaseClient()
      await supabase.from("chat_sessions").insert({
        session_id: newSessionId,
        title: "Nordvest Eksperten Chat",
      })
    }

    createSession()
  }, [])

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: { sessionId },
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hei! Jeg er Nordvest Eksperten. Jeg kan hjelpe deg med spørsmål om bygginnredning, renovering, materialvalg og planlegging av prosjekter. Hva kan jeg hjelpe deg med i dag?",
      },
    ],
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="h-[80vh] flex flex-col">
          <CardHeader className="bg-green-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              Nordvest Eksperten
            </CardTitle>
            <p className="text-green-100 text-sm">Din AI-assistent for bygginnredning og renovering</p>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.role === "user" ? "bg-blue-500 text-white" : "bg-green-500 text-white"
                        }`}
                      >
                        {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
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
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Skriv din melding her..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !input.trim()} className="bg-green-600 hover:bg-green-700">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
