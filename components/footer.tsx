import type React from "react"
import Link from "next/link"
import { Instagram, Linkedin, Facebook } from "lucide-react"

const SocialLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-green-600 hover:text-white transition-colors"
  >
    {children}
  </a>
)

export default function Footer() {
  return (
    <footer className="bg-black text-slate-300 py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-4">
              Bærekraftig bygginnredning, formet av presisjon.
            </h2>
            <p className="text-slate-400 mb-6 max-w-sm">
              Vi designer rom med en tilstedeværelse forankret i det bevisste, intensjonelle og tidløse.
            </p>
            <div className="flex gap-3">
              <SocialLink href="#">
                <Instagram className="h-5 w-5" />
              </SocialLink>
              <SocialLink href="#">
                <Linkedin className="h-5 w-5" />
              </SocialLink>
              <SocialLink href="#">
                <Facebook className="h-5 w-5" />
              </SocialLink>
            </div>
          </div>

          <div className="md:col-span-1" />

          <div className="md:col-span-2">
            <ul className="space-y-3 text-lg">
              <li>
                <Link href="#om-oss" className="hover:text-white transition-colors">
                  Om oss
                </Link>
              </li>
              <li>
                <Link href="#tjenester" className="hover:text-white transition-colors">
                  Tjenester
                </Link>
              </li>
              <li>
                <Link href="#fordeler" className="hover:text-white transition-colors">
                  Fordeler
                </Link>
              </li>
              <li>
                <Link href="#prosess" className="hover:text-white transition-colors">
                  Prosess
                </Link>
              </li>
              <li>
                <Link href="#kontakt" className="hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-lg font-medium text-white mb-4">Vårt Kontor</h3>
            <div className="text-slate-400 space-y-4">
              <p>
                Tua 24, 6010 Ålesund
                <br />
                Norge
              </p>
              <div>
                <p>
                  <a href="mailto:post@nvbi.no" className="hover:text-white transition-colors">
                    post@nvbi.no
                  </a>
                </p>
                <p>
                  <a href="tel:+4790560977" className="hover:text-white transition-colors">
                    +47 905 60 977
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500">
          <p className="text-sm text-center md:text-left mb-4 md:mb-0">
            © {new Date().getFullYear()} Nordvest Bygginnredning AS. Alle rettigheter reservert.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="hover:text-white transition-colors">
              Vilkår
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Personvern
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
