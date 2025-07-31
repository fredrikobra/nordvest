"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, MessageSquare, Phone, Send } from "lucide-react"

export default function CtaSection() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setFormSubmitted(true)
    }, 1500)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="text-2xl md:text-3xl font-medium mb-4">La oss hjelpe din bedrift med å vokse digitalt</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Kontakt oss i dag for en uforpliktende samtale om hvordan vi kan hjelpe din bedrift med å øke synligheten og
          vokse i det digitale landskapet.
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3">
            <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-full mt-0.5">
              <CheckCircle className="h-5 w-5 text-teal-600 dark:text-teal-500" />
            </div>
            <div>
              <h4 className="font-medium">Lokal ekspertise</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Vi kjenner det lokale markedet i Ålesund og omegn
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-full mt-0.5">
              <CheckCircle className="h-5 w-5 text-teal-600 dark:text-teal-500" />
            </div>
            <div>
              <h4 className="font-medium">Skreddersydde løsninger</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Vi tilpasser våre tjenester til din bedrifts behov og mål
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-full mt-0.5">
              <CheckCircle className="h-5 w-5 text-teal-600 dark:text-teal-500" />
            </div>
            <div>
              <h4 className="font-medium">Målbare resultater</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Vi fokuserer på å levere målbare resultater for din bedrift
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="tel:+4799999999"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Phone className="h-5 w-5 text-teal-600 dark:text-teal-500" />
            <span>+47 999 99 999</span>
          </a>

          <a
            href="mailto:post@iaalesund.no"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <MessageSquare className="h-5 w-5 text-teal-600 dark:text-teal-500" />
            <span>post@iaalesund.no</span>
          </a>
        </div>
      </div>

      <Card className="overflow-hidden border-teal-200 dark:border-teal-800">
        <CardContent className="p-0">
          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="p-6">
              <h3 className="text-xl font-medium mb-4">Send oss en melding</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Navn</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800"
                    placeholder="Ditt navn"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">E-post</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800"
                    placeholder="din@epost.no"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Bedriftsnavn</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800"
                    placeholder="Bedriftens navn"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Melding</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800"
                    placeholder="Fortell oss om dine behov..."
                    required
                  ></textarea>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sender...
                  </div>
                ) : (
                  <>
                    Send Melding <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-teal-600 dark:text-teal-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">Takk for din henvendelse!</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Vi har mottatt din melding og vil kontakte deg innen 24 timer.
              </p>
              <Button variant="outline" className="rounded-full" onClick={() => setFormSubmitted(false)}>
                Send ny henvendelse
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
