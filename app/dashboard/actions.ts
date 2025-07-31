"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// Definerer et schema for validering med Zod
const ProjectSchema = z.object({
  name: z.string().min(3, { message: "Navn må være minst 3 tegn." }),
  description: z.string().optional(),
  projectType: z.enum(["office", "residential", "school", "healthcare", "retail", "other"]),
  location: z.string().optional(),
})

export async function createProject(prevState: any, formData: FormData) {
  // Validerer skjemadata mot schemaet
  const validatedFields = ProjectSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    projectType: formData.get("projectType"),
    location: formData.get("location"),
  })

  // Hvis validering feiler, returner feilmeldinger
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Kunne ikke opprette prosjekt. Vennligst sjekk feltene.",
    }
  }

  const { name, description, projectType, location } = validatedFields.data

  try {
    // I en ekte applikasjon ville man hentet userId fra sesjonen
    await prisma.project.create({
      data: {
        name,
        description,
        projectType,
        location,
        // userId: currentUserId,
      },
    })

    // Oppdaterer dashboard-siden for å vise det nye prosjektet
    revalidatePath("/dashboard")
    return { message: `Prosjektet "${name}" ble opprettet.` }
  } catch (e) {
    console.error(e)
    return { message: "En feil oppstod på serveren." }
  }
}
