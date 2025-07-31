import { TrendingDown, Recycle, Award, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const highlights = [
  {
    icon: <TrendingDown className="h-8 w-8 text-green-600" />,
    title: "Reduserte utslipp",
    description: "Mindre transport og produksjon av nye materialer",
  },
  {
    icon: <Recycle className="h-8 w-8 text-green-600" />,
    title: "100% ombruk",
    description: "Alle systemkomponenter kan gjenbrukes",
  },
  {
    icon: <Award className="h-8 w-8 text-green-600" />,
    title: "C2C sertifisert",
    description: "Cradle to Cradle sølv/bronse produkter",
  },
  {
    icon: <Search className="h-8 w-8 text-green-600" />,
    title: "Full sporbarhet",
    description: "Alle råvarer kan spores i hele sitt løp",
  },
]

export default function SustainabilityHighlights() {
  return (
    <section className="w-full py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <Card
              key={item.title}
              className="bg-white dark:bg-slate-950 shadow-md hover:shadow-lg transition-shadow rounded-2xl"
            >
              <CardContent className="flex flex-col items-center text-center p-8">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
