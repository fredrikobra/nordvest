"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactSection() {
  return (
    <section id="kontakt" className="py-12 md:py-16 bg-slate-50">
      <div className="container px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
            Kontakt oss for befaring og tilbud
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Vi tilbyr gratis befaring og utarbeider skreddersydde tilbud basert på dine behov. Kontakt oss i dag for å
            diskutere ditt prosjekt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="order-2 md:order-1 md:max-w-lg mx-auto w-full">
            <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4 md:mb-6 text-center md:text-left">
              Kontaktinformasjon
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-slate-900 text-base">Telefon</h4>
                  <p className="text-slate-600 text-base">+47 905 60 977</p>
                  <p className="text-sm text-slate-500">Ring for rask respons</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-slate-900 text-base">E-post</h4>
                  <p className="text-slate-600 text-base break-all">post@nvbi.no</p>
                  <p className="text-sm text-slate-500">Vi svarer innen 24 timer</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-slate-900 text-base">Adresse</h4>
                  <p className="text-slate-600 text-base">Tua 24, 6010 Ålesund</p>
                  <p className="text-sm text-slate-500">Møre og Romsdal</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-slate-900 text-base">Tilgjengelighet</h4>
                  <p className="text-slate-600 text-base">Når som helst</p>
                  <p className="text-sm text-slate-500">Vi er fleksible med møtetider</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2 text-base">Vårt dekningsområde</h4>
              <p className="text-green-800 text-base leading-relaxed">
                Vi betjener primært Møre og Romsdal, med fokus på større næringsbygg, offentlige bygg og
                kontorprosjekter.
              </p>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2 text-base">Spesialtjenester</h4>
              <p className="text-blue-800 text-base leading-relaxed">
                Vi tilbyr også konsulentbistand for akustiske utfordringer i moderne funkis-hus og tradisjonelle
                håndverkeroppdrag for våre systemkunder.
              </p>
            </div>
          </div>

          <Card className="order-1 md:order-2">
            <CardContent className="p-6">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-6">Send oss en melding</h3>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-base">
                      Navn *
                    </Label>
                    <Input id="name" placeholder="Ditt navn" required className="mt-1 h-11 text-base" />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-base">
                      Bedrift
                    </Label>
                    <Input id="company" placeholder="Bedriftsnavn" className="mt-1 h-11 text-base" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-base">
                      E-post *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="din@epost.no"
                      required
                      className="mt-1 h-11 text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-base">
                      Telefon
                    </Label>
                    <Input id="phone" placeholder="Telefonnummer" className="mt-1 h-11 text-base" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="project-type" className="text-base">
                    Type prosjekt
                  </Label>
                  <select
                    id="project-type"
                    className="mt-1 w-full h-11 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base bg-white"
                  >
                    <option value="">Velg prosjekttype</option>
                    <option value="systemvegger">Systemvegger</option>
                    <option value="glassvegger">Glassvegger</option>
                    <option value="ombygging">Ombygging/rehabilitering</option>
                    <option value="akustikk">Akustikkløsninger</option>
                    <option value="konsulent">Konsulentbistand</option>
                    <option value="akustiske-utredninger">Akustiske utredninger</option>
                    <option value="handverk">Tradisjonelle håndverkeroppdrag</option>
                    <option value="annet">Annet</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-base">
                    Melding *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Beskriv ditt prosjekt og dine behov..."
                    rows={4}
                    required
                    className="mt-1 text-base resize-none"
                  />
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 h-11 text-base font-medium">
                  Send melding
                </Button>
              </form>

              <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                * Påkrevde felt. Vi behandler dine personopplysninger i henhold til våre retningslinjer for personvern.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
