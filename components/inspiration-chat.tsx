"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, type FormEvent } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Paperclip, Send } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
}

export function InspirationChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hello! How can I help you get inspired for your building project today?", sender: "ai" },
  ])
  const [input, setInput] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const userMessage: Message = { id: Date.now().toString(), text: input, sender: "user" }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `That's a great idea! For a modern Scandinavian look, consider using light woods and large windows.`,
        sender: "ai",
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Start Inspirasjons-chat</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg lg:max-w-2xl grid-rows-[auto_1fr_auto] p-0 max-h-[90vh]">
        <DialogHeader className="p-6">
          <DialogTitle>Inspirasjons-chat</DialogTitle>
          <DialogDescription>
            Få ideer og inspirasjon til ditt neste byggeprosjekt. Still spørsmål og få svar fra vår AI-assistent.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[50vh] px-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${message.sender === "user" ? "justify-end" : ""}`}
              >
                {message.sender === "ai" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?width=32&height=32" alt="AI Assistant" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[75%] rounded-lg p-3 text-sm ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?width=32&height=32" alt="User" />
                    <AvatarFallback>DU</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter className="p-6 border-t">
          <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <Paperclip className="h-4 w-4" />
              <span className="sr-only">Attach file</span>
            </Button>
            <Input
              id="message"
              placeholder="Skriv din melding..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" size="icon" className="flex-shrink-0">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
