import { ShieldCheck, TrendingUp, Recycle } from "lucide-react"

export default function SustainabilitySection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm dark:bg-gray-700">
              Bærekraft & Lønnsomhet
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Bygg for Fremtiden, I Dag</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              EUs taksonomi og strengere miljøkrav er ikke lenger valgfrie. De definerer fremtidens lønnsomhet i
              byggebransjen. Ved å velge smarte, sertifiserte løsninger sikrer du verdi, overholder krav og tiltrekker
              deg de beste leietakerne.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
          <div className="grid gap-1 text-center">
            <div className="flex justify-center items-center">
              <ShieldCheck className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-lg font-bold">Sertifisert Trygghet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Vi leverer løsninger med de høyeste miljøgodkjenningene som BREEAM og Cradle to Cradle. Dette garanterer
              kvalitet og dokumentert bærekraft.
            </p>
          </div>
          <div className="grid gap-1 text-center">
            <div className="flex justify-center items-center">
              <TrendingUp className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-lg font-bold">Lavere Livssykluskostnad (LCC)</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Prefabrikkerte og ombrukbare systemer reduserer byggetid, avfall og fremtidige ombyggingskostnader. En
              smart investering som betaler seg.
            </p>
          </div>
          <div className="grid gap-1 text-center">
            <div className="flex justify-center items-center">
              <Recycle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-lg font-bold">Økt Ombruk, Mindre Utslipp</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Vår visjon er å redusere bransjens fotavtrykk. Ved å velge ombrukbare produkter bidrar du direkte til
              mindre avfall og lavere CO2-utslipp.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
