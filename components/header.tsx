"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/farge-nordvest-OLRtor0ozO0v1w4ZNIK2M0J5Fu0Rgy.png"
              alt="Nordvest Bygginnredning AS Logo"
              width={140}
              height={30}
              className="h-auto w-auto max-h-8"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#om-oss" className="text-sm font-medium hover:text-green-600 transition-colors">
            Om oss
          </Link>
          <Link href="#tjenester" className="text-sm font-medium hover:text-green-600 transition-colors">
            Tjenester
          </Link>
          <Link href="#fordeler" className="text-sm font-medium hover:text-green-600 transition-colors">
            Fordeler
          </Link>
          <Link href="#prosess" className="text-sm font-medium hover:text-green-600 transition-colors">
            Prosess
          </Link>
          <Link href="#kontakt" className="text-sm font-medium hover:text-green-600 transition-colors">
            Kontakt
          </Link>
          <Button className="bg-green-600 hover:bg-green-700">Få tilbud</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Lukk meny" : "Åpne meny"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-white p-4">
          <nav className="flex flex-col gap-4">
            <Link
              href="#om-oss"
              className="py-2 text-lg font-medium hover:text-green-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Om oss
            </Link>
            <Link
              href="#tjenester"
              className="py-2 text-lg font-medium hover:text-green-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tjenester
            </Link>
            <Link
              href="#fordeler"
              className="py-2 text-lg font-medium hover:text-green-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fordeler
            </Link>
            <Link
              href="#prosess"
              className="py-2 text-lg font-medium hover:text-green-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Prosess
            </Link>
            <Link
              href="#kontakt"
              className="py-2 text-lg font-medium hover:text-green-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kontakt
            </Link>
            <Button className="mt-2 bg-green-600 hover:bg-green-700 w-full">Få tilbud</Button>
          </nav>
        </div>
      )}
    </header>
  )
}
