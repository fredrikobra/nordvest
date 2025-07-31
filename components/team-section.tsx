"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Instagram, Linkedin, Mail, Phone } from "lucide-react"

type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  image: string
  contact: {
    email?: string
    phone?: string
    instagram?: string
    linkedin?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    id: "member1",
    name: "Marte Johansen",
    role: "Daglig Leder & Fotograf",
    bio: "Marte har over 10 års erfaring med digital markedsføring og er spesialist på visuell kommunikasjon for lokale bedrifter i Ålesund.",
    image: "/images/team-member-1.png",
    contact: {
      email: "marte@iaalesund.no",
      phone: "+47 999 88 777",
      instagram: "@martejohansen",
      linkedin: "martejohansen",
    },
  },
  {
    id: "member2",
    name: "Anders Berg",
    role: "Innholdsprodusent & Strateg",
    bio: "Anders er ekspert på innholdsstrategi og hjelper bedrifter med å fortelle sine historier på en engasjerende måte som skaper resultater.",
    image: "/images/team-member-2.png",
    contact: {
      email: "anders@iaalesund.no",
      instagram: "@andersbergcontent",
      linkedin: "andersbergcontent",
    },
  },
  {
    id: "member3",
    name: "Sofie Larsen",
    role: "SoMe Manager & Videograf",
    bio: "Sofie er vår ekspert på sosiale medier og videoredigering, med spesiell kompetanse på TikTok og Instagram Reels.",
    image: "/images/team-member-3.png",
    contact: {
      email: "sofie@iaalesund.no",
      instagram: "@sofielarsenvisual",
      linkedin: "sofielarsen",
    },
  },
  {
    id: "member4",
    name: "Thomas Nilsen",
    role: "Web Designer & AI-spesialist",
    bio: "Thomas utvikler våre landingssider og AI-løsninger, med fokus på konverteringsoptimalisering og brukeropplevelse.",
    image: "/images/team-member-4.png",
    contact: {
      email: "thomas@iaalesund.no",
      linkedin: "thomasnilsendev",
    },
  },
]

export default function TeamSection() {
  const [activeTeamMember, setActiveTeamMember] = useState<string | null>(null)

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card
              className={`
              overflow-hidden h-full transition-all hover:shadow-lg
              ${activeTeamMember === member.id ? "border-teal-300 dark:border-teal-700" : ""}
            `}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-teal-600 dark:text-teal-500 text-sm mb-2">{member.role}</p>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">{member.bio}</p>

                <div className="flex gap-2">
                  {member.contact.email && (
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Mail className="h-4 w-4" />
                    </Button>
                  )}
                  {member.contact.phone && (
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Phone className="h-4 w-4" />
                    </Button>
                  )}
                  {member.contact.instagram && (
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Instagram className="h-4 w-4" />
                    </Button>
                  )}
                  {member.contact.linkedin && (
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <Button
                  variant="ghost"
                  className="w-full mt-3 text-teal-600 dark:text-teal-500"
                  onClick={() => setActiveTeamMember(activeTeamMember === member.id ? null : member.id)}
                >
                  {activeTeamMember === member.id ? "Vis mindre" : "Les mer"}
                </Button>

                {activeTeamMember === member.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800"
                  >
                    <p className="text-sm text-slate-600 dark:text-slate-400">{member.bio}</p>

                    <div className="mt-3 space-y-1">
                      {member.contact.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-teal-600 dark:text-teal-500" />
                          <span>{member.contact.email}</span>
                        </div>
                      )}
                      {member.contact.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-teal-600 dark:text-teal-500" />
                          <span>{member.contact.phone}</span>
                        </div>
                      )}
                      {member.contact.instagram && (
                        <div className="flex items-center gap-2 text-sm">
                          <Instagram className="h-4 w-4 text-teal-600 dark:text-teal-500" />
                          <span>{member.contact.instagram}</span>
                        </div>
                      )}
                      {member.contact.linkedin && (
                        <div className="flex items-center gap-2 text-sm">
                          <Linkedin className="h-4 w-4 text-teal-600 dark:text-teal-500" />
                          <span>{member.contact.linkedin}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
