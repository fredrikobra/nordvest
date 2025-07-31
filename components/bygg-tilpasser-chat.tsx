"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, ChevronDown, X, ImageIcon, Paperclip, Mic, Bot, Sparkles } from "lucide-react"
import Image from "next/image"

type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  image?: string
}

export default function ByggTilpasserChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hei! Jeg er Byggtilpasseren, din digitale assistent for kontorløsninger. Hvordan kan jeg hjelpe deg i dag?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responseContent = generateResponse(inputMessage)

      const newAssistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent.text,
        sender: "assistant",
        timestamp: new Date(),
        image: responseContent.image,
      }

      setMessages((prev) => [...prev, newAssistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  // Generate a response based on user input
  const generateResponse = (userMessage: string): { text: string; image?: string } => {
    const lowerCaseMessage = userMessage.toLowerCase()

    if (lowerCaseMessage.includes("hei") || lowerCaseMessage.includes("hallo")) {
      return {
        text: "Hei! Jeg er Byggtilpasseren fra Nordvest System & Bygginnredning. Jeg kan hjelpe deg med å finne den perfekte kontorløsningen. Hva slags type kontor er du interessert i?",
      }
    }

    if (
      lowerCaseMessage.includes("møterom") ||
      lowerCaseMessage.includes("møte") ||
      lowerCaseMessage.includes("konferanse")
    ) {
      return {
        text: "Vi har flere elegante løsninger for møterom med glassvegger som gir en åpen og profesjonell atmosfære. Her er et eksempel på et av våre populære møteromsdesign:",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modul-calculator-2png-17%20Large-Wg3Bd3ugr5Xa9Z3XAfKH1k3gM62N3u.jpeg",
      }
    }

    if (
      lowerCaseMessage.includes("kontor") ||
      lowerCaseMessage.includes("arbeidsplass") ||
      lowerCaseMessage.includes("åpent landskap")
    ) {
      return {
        text: "For kontorlandskap tilbyr vi fleksible løsninger som kombinerer private områder med åpne samarbeidsområder. Her er et eksempel på hvordan det kan se ut:",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modul-calculator-2png-16%20Large-hYRcoCwt9YbPd4IMOwQTpgViXDX0zV.jpeg",
      }
    }

    if (
      lowerCaseMessage.includes("glass") ||
      lowerCaseMessage.includes("glassvegger") ||
      lowerCaseMessage.includes("transparent")
    ) {
      return {
        text: "Våre glassveggsystemer er populære for moderne kontorer. De gir en følelse av åpenhet samtidig som de skaper separate rom. Her er et eksempel:",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modul-calculator-img-17%20Large-nBwOSeMHVimCmA359Tt5h4EijVxqyj.jpeg",
      }
    }

    if (
      lowerCaseMessage.includes("pris") ||
      lowerCaseMessage.includes("kostnad") ||
      lowerCaseMessage.includes("tilbud")
    ) {
      return {
        text: "Prisen avhenger av størrelse, materialer og kompleksitet. For et nøyaktig tilbud, kan du bruke vår byggtilpasser-kalkulator på nettsiden eller kontakte oss direkte. Vil du at jeg skal vise deg kalkulatoren?",
      }
    }

    if (lowerCaseMessage.includes("takk") || lowerCaseMessage.includes("tusen takk")) {
      return {
        text: "Bare hyggelig! Er det noe annet jeg kan hjelpe deg med angående kontorløsninger?",
      }
    }

    if (
      lowerCaseMessage.includes("materialer") ||
      lowerCaseMessage.includes("bærekraft") ||
      lowerCaseMessage.includes("miljø")
    ) {
      return {
        text: "Vi bruker miljøvennlige materialer med høy ombruksgrad. Våre systemløsninger er designet for å kunne demonteres og gjenbrukes ved ombygging, noe som reduserer avfall og miljøpåvirkning.",
      }
    }

    return {
      text: "Takk for henvendelsen. For å gi deg best mulig hjelp, kan du fortelle meg mer om hva slags kontorløsning du er ute etter? For eksempel, er det et møterom, åpent landskap eller kanskje en kombinasjon?",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modul-calculator-img-16%20Large-A8QQL2SPyOofP7SibW8giLvDD0CE1G.jpeg",
    }
  }

  if (!isMounted) return null

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <Card className="w-[350px] md:w-[400px] shadow-lg border-green-200">
              <div className="bg-green-600 text-white p-3 flex justify-between items-center rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <h3 className="font-medium">Byggtilpasser</h3>
                  <Badge variant="outline" className="bg-white/20 text-white text-xs">
                    AI
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white hover:bg-green-700"
                    onClick={() => setIsMinimized(true)}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white hover:bg-green-700"
                    onClick={() => setIsMinimized(true)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-0">
                <div className="h-[350px] overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        {message.image && (
                          <div className="mt-2 rounded-md overflow-hidden">
                            <Image
                              src={message.image || "/placeholder.svg"}
                              alt="Office solution example"
                              width={300}
                              height={200}
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        )}
                        <div className="text-xs mt-1 opacity-70">
                          {new Intl.DateTimeFormat("no", {
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-zinc-800 rounded-lg p-3 max-w-[80%]">
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <div className="border-t p-3">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Skriv en melding..."
                      className="text-sm"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button
                      variant="default"
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center mt-2 px-1">
                    <div className="flex gap-2">
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Paperclip className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <ImageIcon className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Mic className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-xs text-gray-400 flex items-center">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Powered by AI
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat button */}
      <motion.button
        className={`flex items-center justify-center p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors ${
          isMinimized ? "" : "hidden"
        }`}
        onClick={() => setIsMinimized(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare className="h-6 w-6" />
        {isMinimized && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </motion.button>
    </div>
  )
}
