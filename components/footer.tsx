import type React from "react"
import Link from "next/link"
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react"

const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="h-10 w-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors"
  >
    {children}
  </a>
)

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-2xl font-semibold text-white">Gjennomtenkt design, formet av kvalitet.</h3>
            <p className="text-gray-400">Vi skaper rom med tilstedeværelse – fundert, bevisst og tidløst.</p>
            <div className="flex space-x-3 pt-2">
              <SocialIcon href="#">
                <Instagram className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon href="#">
                <Linkedin className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon href="#">
                <Twitter className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon href="#">
                <Facebook className="h-5 w-5" />
              </SocialIcon>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-lg font-semibold text-white mb-4">Meny</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Hjem
                </Link>
              </li>
              <li>
                <Link href="/tjenester" className="hover:text-white transition-colors">
                  Tjenester
                </Link>
              </li>
              <li>
                <Link href="/prosjekter" className="hover:text-white transition-colors">
                  Prosjekter
                </Link>
              </li>
              <li>
                <Link href="/om-oss" className="hover:text-white transition-colors">
                  Om Oss
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-lg font-semibold text-white mb-4">Vårt Showroom</h4>
            <div className="space-y-2 text-gray-400">
              <p>Industrivegen 23, 6490 Eide</p>
              <p>Norge</p>
              <div className="pt-2">
                <p className="font-semibold text-gray-300">Åpningstider:</p>
                <p>Man – Fre / 08.00 – 16.00</p>
                <p>Stengt på helligdager</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-20 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Nordvest Bygginnredning. Alle rettigheter forbeholdt.
          </p>
          <div className="flex space-x-6">
            <Link href="/terms" className="hover:text-white transition-colors">
              Vilkår og betingelser
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Personvern
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
