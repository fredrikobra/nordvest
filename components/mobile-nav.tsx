"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} aria-label="Open menu">
        <Menu className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white dark:bg-slate-950 p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-8">
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="mb-6">
                <span className="text-2xl font-light tracking-tight">
                  <span className="text-teal-600 dark:text-teal-500 font-medium">i</span>
                  <span>aalesund</span>
                  <span className="text-teal-600 dark:text-teal-500">.</span>
                  <span className="text-teal-600 dark:text-teal-500">no</span>
                </span>
              </div>

              <nav className="flex flex-col gap-6">
                <Link
                  href="/"
                  className="text-lg font-medium hover:text-teal-600 dark:hover:text-teal-500"
                  onClick={() => setIsOpen(false)}
                >
                  Hjem
                </Link>
                <Link
                  href="#services"
                  className="text-lg font-medium hover:text-teal-600 dark:hover:text-teal-500"
                  onClick={() => setIsOpen(false)}
                >
                  Tjenester
                </Link>
                <Link
                  href="#membership"
                  className="text-lg font-medium hover:text-teal-600 dark:hover:text-teal-500"
                  onClick={() => setIsOpen(false)}
                >
                  Medlemskap
                </Link>
                <Link
                  href="#portfolio"
                  className="text-lg font-medium hover:text-teal-600 dark:hover:text-teal-500"
                  onClick={() => setIsOpen(false)}
                >
                  Portfolio
                </Link>
                <Link
                  href="#contact"
                  className="text-lg font-medium hover:text-teal-600 dark:hover:text-teal-500"
                  onClick={() => setIsOpen(false)}
                >
                  Kontakt
                </Link>
                <Button className="mt-4 bg-teal-600 hover:bg-teal-700 text-white" onClick={() => setIsOpen(false)}>
                  Bli Medlem
                </Button>
              </nav>

              <div className="mt-auto pt-8 border-t border-slate-200 dark:border-slate-800">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-teal-600 dark:text-teal-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-sm">+47 999 99 999</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-teal-600 dark:text-teal-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm">post@iaalesund.no</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
