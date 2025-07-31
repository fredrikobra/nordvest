import { streamText } from "ai"
import { xai } from "@ai-sdk/xai"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  const { messages, userId } = await req.json()

  // TODO: Hent prosjektkontekst og samtalelogg for innlogget bruker
  // const userProjects = await prisma.project.findMany({ where: { userId } });
  // const recentMessages = await prisma.conversation.findMany({ where: { userId }, take: 10 });

  const systemPrompt = `Du er "Nordvest AI Assistant", en ekspert på innvendige byggløsninger for det norske markedet.
  Dine kjernekompetanser er:
  1.  **Romplanlegging og analyse**: Gi råd om funksjon, soner og trafikkflyt.
  2.  **TEK17-veiledning**: Forklar krav til energieffektivitet (kWh/m² per år for ulike byggtyper) og U-verdier (yttervegg ≤0.18, tak ≤0.13, gulv ≤0.10, vinduer/dører ≤0.80 W/(m²K)).
  3.  **Grønn finansiering**: Foreslå finansieringsordninger fra DNB, KBN, etc. Nevn krav som BREEAM-sertifisering (f.eks. DNB krever BREEAM NOR Excellent for nybygg) og energiklasse.
  4.  **Bærekraftige løsninger**: Anbefal materialer med C2C-sertifisering og god resirkulerbarhet.
  5.  **Prosjektinspirasjon**: Bruk kunnskap om stiler og materialer for å gi kreative forslag.

  Du skal lagre og hente informasjon fra databasen for å gi personlige råd og lære over tid.
  Svar alltid på norsk, vær profesjonell, hjelpsom og nøyaktig.
  `

  const result = await streamText({
    model: xai("grok-3"),
    system: systemPrompt,
    messages,
    // TODO: Når samtalelogg er hentet, kan den legges til her for bedre kontekst
  })

  // TODO: Lagre brukerens melding og assistentens svar i databasen
  // result.onFinish(async (completion) => {
  //   await prisma.conversation.createMany({
  //     data: [
  //       { userId, messageType: 'user', messageContent: messages[messages.length - 1].content, sessionId: '...' },
  //       { userId, messageType: 'assistant', messageContent: completion.text, sessionId: '...' }
  //     ]
  //   });
  // });

  const stream = result.toAIStream()
  return new Response(stream)
}
