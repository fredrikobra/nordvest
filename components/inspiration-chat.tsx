"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PromptInput } from "@/components/ui/prompt-input"
import { X, User, Bot, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function InspirationChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [inspirationText, setInspirationText] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleInspirationSubmit = (text: string) => {
    setInspirationText(text)
    setIsOpen(true)

    // Add the inspiration as the first message
    const inspirationMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    }

    setMessages([inspirationMessage])
    sendMessage(text)
  }

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    // Only add user message if it's not the initial inspiration
    if (messages.length > 0) {
      setMessages((prev) => [...prev, userMessage])
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          context: "Norsk bygginnredning og renovering",
        }),
      })

      if (!response.ok) {
        throw new Error("Nettverksfeil")
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error("Kunne ikke lese respons")

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone

        if (value) {
          const chunk = decoder.decode(value, { stream: true })

          setMessages((prev) =>
            prev.map((msg) => (msg.id === assistantMessage.id ? { ...msg, content: msg.content + chunk } : msg)),
          )
        }
      }
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: "Beklager, det oppstod en feil. Prøv igjen senere.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleChatSubmit = (content: string) => {
    sendMessage(content)
  }

  return (
    <div className={cn("relative")}>
      {/* Inspiration Input Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <Lightbulb className="h-6 w-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-slate-900">Få inspirasjon til ditt byggeprosjekt</h2>
        </div>
        <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
          Beskriv ditt drømmeprosjekt eller still et spørsmål om bygg og innredning. Vår AI-assistent vil hjelpe deg med
          ekspertråd på norsk.
        </p>

        <div className="max-w-2xl mx-auto">
          <PromptInput
            placeholder="F.eks: Jeg vil renovere kjøkkenet mitt, hva bør jeg tenke på?"
            onSubmit={handleInspirationSubmit}
            className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-green-200 focus-within:border-green-400"
          />
        </div>
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 max-w-[calc(100vw-2rem)] z-50 animate-in slide-in-from-bottom-4 duration-300">
          <Card className="shadow-2xl border-2 border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Bygg-AI Assistent
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-green-600" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>

                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
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

              {/* Input */}
              <div className="p-4 border-t">
                <PromptInput
                  placeholder="Still et oppfølgingsspørsmål..."
                  onSubmit={handleChatSubmit}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
