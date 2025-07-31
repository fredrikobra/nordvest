import Header from "@/components/header"
import Footer from "@/components/footer"
import ProjectPlanner from "@/components/project-planner"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import ProcessSection from "@/components/process-section"
import { HistorySection } from "@/components/history-section"
import SustainabilityHighlights from "@/components/sustainability-highlights"
import MapSection from "@/components/map-section"
import ContactSection from "@/components/contact-section"
import FaqSection from "@/components/faq-section"
import { InspirationChat } from "@/components/inspiration-chat"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProjectPlanner />

        {/* AI Inspiration Chat Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <InspirationChat />
          </div>
        </section>

        <ServicesSection />
        <ProcessSection />
        <HistorySection />
        <SustainabilityHighlights />
        <MapSection />
        <ContactSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}
