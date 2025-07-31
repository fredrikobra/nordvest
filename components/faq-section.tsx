import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqSection() {
  const faqs = [
    {
      question: "Hvem er Nordvest Bygginnredning?",
      answer:
        "Vi er et erfarent team med Tommy Juul og Frode Vårdal som eiere og gründere. Med 2-4 faste ansatte, er vi dedikerte til å levere topp kvalitet.",
    },
    {
      question: "Hvor opererer dere?",
      answer:
        "Vi er lokalt forankret i Ålesund og betjener primært Møre og Romsdal, med et sterkt fokus på næringsbygg, offentlige bygg og kontorprosjekter.",
    },
    {
      question: "Hva slags kvalitet kan jeg forvente?",
      answer:
        "Vi har et kompromissløst kvalitetsfokus og benytter utelukkende skandinaviske leverandører med de høyeste miljøgodkjenningene for å sikre de beste og mest bærekraftige resultatene.",
    },
    {
      question: "Hva gjør løsningene deres bærekraftige?",
      answer:
        "Våre prefabrikkerte systemer reduserer avfall, støy og byggetid. Mange av produktene våre er Cradle to Cradle-sertifiserte, noe som betyr at de er designet for gjenbruk og en sirkulær økonomi.",
    },
  ]

  return (
    <section id="faq" className="w-full py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
            Ofte stilte spørsmål
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Få svar på det du lurer på om våre tjenester og vår tilnærming.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-slate-600 dark:text-slate-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
