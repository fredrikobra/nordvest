"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Toggle } from "@/components/ui/toggle"
import { ArrowRight, Layers, Ruler, Shield, Repeat, Mail, Phone, User, Building, ArrowUp } from "lucide-react"
import Image from "next/image"

// Data for system components
const systemComponents = [
  {
    id: "system-walls",
    name: "Systemvegger",
    description: "Fleksible og modulære veggløsninger.",
    icon: <Layers className="h-5 w-5" />,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modul-calculator-2png-17%20Large-Wg3Bd3ugr5Xa9Z3XAfKH1k3gM62N3u.jpeg",
  },
  {
    id: "glass-walls",
    name: "Glassvegger",
    description: "Elegante glassvegger for lys og åpenhet.",
    icon: <Ruler className="h-5 w-5" />,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modul-calculator-img-17%20Large-nBwOSeMHVimCmA359Tt5h4EijVxqyj.jpeg",
  },
  {
    id: "acoustic-solutions",
    name: "Akustikkløsninger",
    description: "Optimal lyddemping for et bedre arbeidsmiljø.",
    icon: <Shield className="h-5 w-5" />,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modul-calculator-img-16%20Large-A8QQL2SPyOofP7SibW8giLvDD0CE1G.jpeg",
  },
  {
    id: "reuse-solutions",
    name: "Ombruksløsninger",
    description: "Bærekraftige løsninger med høy gjenbruksgrad.",
    icon: <Repeat className="h-5 w-5" />,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modul-calculator-2png-16%20Large-hYRcoCwt9YbPd4IMOwQTpgViXDX0zV.jpeg",
  },
]

// Reusable Progress Bar Component
const ProgressBar = ({ step }: { step: number }) => (
  <div>
    <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 h-full bg-green-600 rounded-full"
        animate={{ width: `${((step - 1) / 2) * 100}%` }}
        transition={{ type: "spring", stiffness: 100 }}
      />
    </div>
    <div className="flex justify-between text-sm mt-2">
      <span className={step >= 1 ? "text-green-600 font-semibold" : ""}>Løsninger</span>
      <span className={step >= 2 ? "text-green-600 font-semibold" : ""}>Omfang</span>
      <span className={step >= 3 ? "text-green-600 font-semibold" : ""}>Kontakt</span>
    </div>
  </div>
)

// Interactive Sticky Progress Tracker Component
const StickyProgressTracker = ({
  isVisible,
  onJumpToPlanner,
  systemComponents,
  selectedComponents,
  projectDetails,
  toggleComponent,
  updateDetails,
}: {
  isVisible: boolean
  onJumpToPlanner: () => void
  systemComponents: typeof systemComponents
  selectedComponents: string[]
  projectDetails: Record<string, number>
  toggleComponent: (id: string) => void
  updateDetails: (id: string, value: number) => void
}) => {
  const [showInspirationInput, setShowInspirationInput] = useState(false)
  const [inspirationText, setInspirationText] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInspirationClick = () => {
    setShowInspirationInput(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const handleInspirationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle inspiration submission here
    console.log("Inspiration:", inspirationText)
  }

  const handleInspirationBlur = () => {
    if (!inspirationText.trim()) {
      setShowInspirationInput(false)
    }
  }
  const isAnyComponentSelected = selectedComponents.length > 0

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-16 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 z-[1000]"
        >
          <div className="container mx-auto px-4">
            <div className="h-14 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200 hidden sm:block">
                    Valgte Løsninger
                  </h4>
                  <TooltipProvider delayDuration={0}>
                    <div className="flex items-center gap-1 sm:gap-2 rounded-full border bg-slate-100 dark:bg-slate-800 p-1">
                      {systemComponents.map((component) => (
                        <Tooltip key={component.id}>
                          <TooltipTrigger asChild>
                            <Toggle
                              size="sm"
                              pressed={selectedComponents.includes(component.id)}
                              onPressedChange={() => toggleComponent(component.id)}
                              className="rounded-full data-[state=on]:bg-green-600 data-[state=on]:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
                            >
                              {component.icon}
                            </Toggle>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p>{component.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </TooltipProvider>
                </div>
                <div className="flex items-center">
                  {showInspirationInput ? (
                    <form onSubmit={handleInspirationSubmit} className="flex items-center">
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Legg til inspirasjon..."
                        value={inspirationText}
                        onChange={(e) => setInspirationText(e.target.value)}
                        onBlur={handleInspirationBlur}
                        className="w-32 sm:w-40 md:w-48 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </form>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleInspirationClick}
                      className="text-xs sm:text-sm px-2 sm:px-3"
                    >
                      Inspirasjon
                    </Button>
                  )}
                </div>
              </div>
              <Button size="sm" variant="ghost" onClick={onJumpToPlanner}>
                <ArrowUp className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Til Planlegger</span>
              </Button>
            </div>
            <AnimatePresence>
              {isAnyComponentSelected && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="py-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
                      {systemComponents
                        .filter((c) => selectedComponents.includes(c.id))
                        .map((component) => (
                          <div key={component.id}>
                            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                              {component.name}:{" "}
                              <span className="font-bold text-slate-900 dark:text-slate-50">
                                {projectDetails[component.id] || 0} meter
                              </span>
                            </label>
                            <Slider
                              value={[projectDetails[component.id] || 0]}
                              min={5}
                              max={200}
                              step={5}
                              onValueChange={(value) => updateDetails(component.id, value[0])}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Main Project Planner Component
export default function ProjectPlanner() {
  const [step, setStep] = useState(1)
  const [selectedComponents, setSelectedComponents] = useState<string[]>([])
  const [projectDetails, setProjectDetails] = useState<Record<string, number>>({})
  const [showSticky, setShowSticky] = useState(false)

  const plannerContainerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", () => {
    const progressBarEl = progressBarRef.current
    if (!progressBarEl) return

    const { bottom } = progressBarEl.getBoundingClientRect()
    const navHeight = 64 // Main nav is h-16 (64px)

    setShowSticky(bottom < navHeight)
  })

  const handleJumpToPlanner = () => {
    if (plannerContainerRef.current) {
      const y = plannerContainerRef.current.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  const toggleComponent = (componentId: string) => {
    setSelectedComponents((prev) =>
      prev.includes(componentId) ? prev.filter((id) => id !== componentId) : [...prev, componentId],
    )
    if (!projectDetails[componentId]) {
      setProjectDetails((prev) => ({ ...prev, [componentId]: 20 }))
    }
  }

  const updateDetails = (componentId: string, value: number) => {
    setProjectDetails((prev) => ({ ...prev, [componentId]: value }))
  }

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <h3 className="text-xl font-bold mb-2">Hvilke løsninger er du interessert i?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Velg en eller flere komponenter for ditt prosjekt.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {systemComponents.map((component) => (
                <Card
                  key={component.id}
                  onClick={() => toggleComponent(component.id)}
                  className={`cursor-pointer transition-all ${
                    selectedComponents.includes(component.id)
                      ? "border-green-500 ring-2 ring-green-500"
                      : "hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={component.image || "/placeholder.svg"}
                        alt={component.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {component.icon}
                        <h4 className="font-bold">{component.name}</h4>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{component.description}</p>
                    </div>
                    <Switch checked={selectedComponents.includes(component.id)} className="ml-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <h3 className="text-xl font-bold mb-2">Spesifiser ditt prosjekt</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Gi oss et anslag på omfanget for hver løsning.</p>
            <div className="space-y-6">
              {systemComponents
                .filter((c) => selectedComponents.includes(c.id))
                .map((component) => (
                  <div key={component.id}>
                    <label className="block text-sm font-medium mb-2">
                      {component.name}: <span className="font-bold">{projectDetails[component.id] || 20} meter</span>
                    </label>
                    <Slider
                      value={[projectDetails[component.id] || 20]}
                      min={5}
                      max={200}
                      step={5}
                      onValueChange={(value) => updateDetails(component.id, value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-zinc-400 mt-1">
                      <span>5 m</span>
                      <span>200 m</span>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <h3 className="text-xl font-bold mb-2">Oppsummering og kontakt</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Se over dine valg og send inn for et uforpliktende tilbud.
            </p>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Ditt prosjekt</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {systemComponents
                    .filter((c) => selectedComponents.includes(c.id))
                    .map((component) => (
                      <li key={component.id} className="flex justify-between">
                        <span>{component.name}</span>
                        <span className="font-medium">{projectDetails[component.id] || 20} meter</span>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
            <form className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ditt navn"
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md dark:bg-slate-800 dark:border-slate-700"
                />
              </div>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Firmanavn"
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md dark:bg-slate-800 dark:border-slate-700"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  placeholder="E-post"
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md dark:bg-slate-800 dark:border-slate-700"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="tel"
                  placeholder="Telefon"
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md dark:bg-slate-800 dark:border-slate-700"
                />
              </div>
            </form>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <StickyProgressTracker
        isVisible={showSticky}
        onJumpToPlanner={handleJumpToPlanner}
        systemComponents={systemComponents}
        selectedComponents={selectedComponents}
        projectDetails={projectDetails}
        toggleComponent={toggleComponent}
        updateDetails={updateDetails}
      />
      <div
        ref={plannerContainerRef}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Prosjektplanlegger</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 md:text-xl">
            Få et raskt prisoverslag for ditt prosjekt.
          </p>
        </div>
        <div ref={progressBarRef} className="mb-6">
          <ProgressBar step={step} />
        </div>
        <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
        <div className="mt-8 flex justify-between items-center">
          {step > 1 ? (
            <Button variant="outline" onClick={prevStep}>
              Forrige
            </Button>
          ) : (
            <div />
          )}
          {step < 3 ? (
            <Button onClick={nextStep} disabled={selectedComponents.length === 0}>
              Neste <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button className="bg-green-600 hover:bg-green-700">
              Send forespørsel <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
