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

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProjectPlanner />
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
