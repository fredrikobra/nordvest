import NordvestExpertChat from "@/components/nordvest-expert-chat"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "Nordvest Eksperten - AI Assistent | Nordvest Bygginnredning",
  description:
    "Din AI-drevne assistent for kontorløsninger og bygginnredning. Få ekspertråd om glassvegger, møteromssystemer, og bærekraftige kontorløsninger.",
}

export default function NordvestExpertPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nordvest Eksperten</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Din AI-drevne assistent for kontorløsninger og bygginnredning. Få ekspertråd om glassvegger,
            møteromssystemer, og bærekraftige kontorløsninger.
          </p>
        </div>

        <NordvestExpertChat />

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Trenger du mer hjelp?{" "}
            <a href="#contact" className="text-green-600 hover:underline">
              Kontakt oss direkte
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
