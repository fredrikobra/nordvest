"use client"

import { useFormState, useFormStatus } from "react-dom"
import { createProject } from "@/app/dashboard/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Oppretter..." : "Opprett Prosjekt"}
    </Button>
  )
}

export function NewProjectForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(createProject, initialState)
  const { toast } = useToast()

  useEffect(() => {
    if (state.message && !state.errors) {
      toast({
        title: "Suksess!",
        description: state.message,
      })
      setOpen(false)
    } else if (state.message && state.errors) {
      toast({
        title: "Feil ved validering",
        description: state.message,
        variant: "destructive",
      })
    }
  }, [state, toast, setOpen])

  return (
    <form action={dispatch} className="space-y-4 py-4">
      <div className="space-y-1">
        <Label htmlFor="name">Prosjektnavn</Label>
        <Input id="name" name="name" required />
        {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name}</p>}
      </div>
      <div className="space-y-1">
        <Label htmlFor="description">Beskrivelse</Label>
        <Textarea id="description" name="description" placeholder="En kort beskrivelse av prosjektet..." />
      </div>
      <div className="space-y-1">
        <Label htmlFor="projectType">Prosjekttype</Label>
        <Select name="projectType" defaultValue="office">
          <SelectTrigger>
            <SelectValue placeholder="Velg en type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="office">Kontor</SelectItem>
            <SelectItem value="residential">Bolig</SelectItem>
            <SelectItem value="school">Skole</SelectItem>
            <SelectItem value="healthcare">Helse</SelectItem>
            <SelectItem value="retail">Butikk</SelectItem>
            <SelectItem value="other">Annet</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label htmlFor="location">Sted</Label>
        <Input id="location" name="location" placeholder="f.eks. Ålesund" />
      </div>
      <div className="pt-4">
        <SubmitButton />
      </div>
    </form>
  )
}
