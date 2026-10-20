import type { Locale } from '@config/locales';

export const publicPageSlugs = [
  'product',
  'how-it-works',
  'integrations',
  'workplace-teams',
  'security-trust',
  'pricing',
  'insights',
  'company',
  'book-a-demo',
] as const;

export type PublicPageSlug = (typeof publicPageSlugs)[number];

type PublicPageCopy = {
  eyebrow: string;
  title: string;
  description: string;
  body: string;
  note?: string;
};

const pages: Record<Locale, Record<PublicPageSlug, PublicPageCopy>> = {
  en: {
    product: {
      eyebrow: 'Product',
      title: 'One request. Everything for your meeting.',
      description:
        'Bring meeting details, guests, catering and equipment together. Conference Manager helps your office team coordinate preparation alongside your existing systems.',
      body: 'Bring guests, catering and equipment into one meeting request. Your office or conference team can follow the details and supported changes while your existing room-booking system handles the reservation.',
    },
    'how-it-works': {
      eyebrow: 'How it works',
      title: 'One meeting. Three clear steps.',
      description:
        'Follow a meeting from the first request through preparation and a change from 12 to 18 people. See how Conference Manager brings the details together.',
      body: 'Start the request in Conference Manager, coordinate preparation and keep changes visible. Follow one workshop from 12 to 18 people in the example below.',
    },
    integrations: {
      eyebrow: 'Integrations',
      title: 'Your systems. One meeting workflow.',
      description:
        'Room reservations, Microsoft sign-in and catering coordination: we work with you to confirm how Conference Manager fits your company.',
      body: 'Keep your existing room reservations and company sign-in. Conference Manager brings guest information, catering and technical requirements into one shared workflow. We work with you to confirm which connections fit your company.',
      note: 'Only capabilities verified against the current product are presented as available.',
    },
    'workplace-teams': {
      eyebrow: 'For your team',
      title: 'Fewer follow-ups. Clearer responsibilities.',
      description:
        'Help employees, office teams and service teams prepare meetings together. Keep requests, responsibilities and changes in view.',
      body: 'For office and conference teams in mid-sized companies: collect the information you need, coordinate the people involved and see what still needs a decision.',
    },
    'security-trust': {
      eyebrow: 'Security & trust',
      title: 'Clear answers for your IT team.',
      description:
        'Understand Microsoft sign-in, roles and customer-specific connections. Discuss access and data requirements before setting up Conference Manager.',
      body: 'Who can sign in? Who can work on a request? Which systems will be connected? We clarify access, responsibilities and your requirements together before setup.',
    },
    pricing: {
      eyebrow: 'Setup & pilot',
      title: 'Try it with your own meetings.',
      description:
        'Start with a demo. Once your customer environment is set up, use the software free for 30 days. A one-time setup fee applies.',
      body: 'Start with a demo. Once your customer environment is set up, use the software free for 30 days. A one-time setup fee applies.',
      note: 'Prices and terms for continued use are agreed separately.',
    },
    insights: {
      eyebrow: 'Insights',
      title: 'Practical ideas for better meeting preparation.',
      description:
        'Practical guidance for office and conference teams: organise meeting details, coordinate catering and connect the systems you already use.',
      body: 'A meeting takes more than a room. Explore practical ways to coordinate guests, catering, equipment and changes with your team.',
    },
    company: {
      eyebrow: 'Conference Manager by Pavurel',
      title: 'From first conversation to everyday meetings.',
      description:
        'See how Pavurel helps you agree the setup of Conference Manager, connect supported systems and try the software with your own meetings.',
      body: 'Pavurel helps set up Conference Manager for your office or conference team. Together, we agree the workflow and supported connections before you start using it for your own meetings.',
    },
    'book-a-demo': {
      eyebrow: 'Book a demo',
      title: 'See Conference Manager in action.',
      description:
        'Discuss your current process and existing systems. Explore Conference Manager together in a demo.',
      body: 'Bring your current meeting workflow and the systems your team uses today.',
      note: 'Demo requests are available only where the approved processing and privacy configuration is active.',
    },
  },
  de: {
    product: {
      eyebrow: 'Produkt',
      title: 'Eine Anfrage. Alles für Ihre Besprechung.',
      description:
        'Gäste, Catering und Technik gemeinsam organisieren. Conference Manager unterstützt Ihr Office-Team bei der Vorbereitung und ergänzt Ihre vorhandenen Systeme.',
      body: 'Gäste, Catering und Technik kommen in einer Besprechungsanfrage zusammen. Ihr Office- oder Konferenzteam behält die Angaben und unterstützten Änderungen im Blick. Die Reservierung übernimmt Ihre bestehende Raumbuchung.',
    },
    'how-it-works': {
      eyebrow: 'So funktioniert es',
      title: 'Eine Besprechung. Drei klare Schritte.',
      description:
        'Von der Anfrage über die Vorbereitung bis zur Änderung von 12 auf 18 Personen: Ein Beispiel zeigt, wie Conference Manager die Angaben zusammenführt.',
      body: 'Die Anfrage im Conference Manager starten, die Vorbereitung abstimmen und Änderungen nachvollziehen. Begleiten Sie im Beispiel einen Workshop, der von 12 auf 18 Personen wächst.',
    },
    integrations: {
      eyebrow: 'Integrationen',
      title: 'Ihre Systeme. Ein gemeinsamer Ablauf.',
      description:
        'Raumreservierung, Microsoft-Anmeldung und Cateringkoordination: Wir prüfen gemeinsam, wie Conference Manager zu Ihrem Unternehmen passt.',
      body: 'Ihre Raumreservierung und Unternehmensanmeldung bleiben erhalten. Conference Manager führt Angaben zu Gästen, Catering und Technik in einem gemeinsamen Ablauf zusammen. Welche Anbindungen zu Ihrem Unternehmen passen, klären wir gemeinsam.',
      note: 'Als verfügbar werden nur Fähigkeiten dargestellt, die gegen den aktuellen Produktstand verifiziert sind.',
    },
    'workplace-teams': {
      eyebrow: 'Für Ihr Team',
      title: 'Weniger Rückfragen. Klarere Zuständigkeiten.',
      description:
        'Mitarbeitende, Office-Team und Service-Teams bereiten Besprechungen gemeinsam vor. Behalten Sie Anfragen, Zuständigkeiten und Änderungen im Blick.',
      body: 'Für Office- und Konferenzteams im Mittelstand: benötigte Angaben sammeln, beteiligte Teams koordinieren und erkennen, wo noch eine Entscheidung fehlt.',
    },
    'security-trust': {
      eyebrow: 'Sicherheit & Vertrauen',
      title: 'Klare Antworten für Ihre IT.',
      description:
        'Microsoft-Anmeldung, Rollen und kundenspezifische Anbindungen verständlich erklärt. Klären Sie Zugriff und Datenanforderungen vor der Einrichtung.',
      body: 'Wer kann sich anmelden? Wer darf eine Anfrage bearbeiten? Welche Systeme werden angebunden? Zugriff, Zuständigkeiten und Ihre Anforderungen klären wir gemeinsam vor der Einrichtung.',
    },
    pricing: {
      eyebrow: 'Einrichtung & Pilot',
      title: 'Mit eigenen Besprechungen erproben.',
      description:
        'Starten Sie mit einer Demo. Nach abgeschlossener, einmalig kostenpflichtiger Einrichtung nutzen Sie die Software 30 Tage kostenlos in Ihrer Kundenumgebung.',
      body: 'Starten Sie mit einer Demo. Nach abgeschlossener, einmalig kostenpflichtiger Einrichtung nutzen Sie die Software 30 Tage kostenlos in Ihrer Kundenumgebung.',
      note: 'Preise und Bedingungen für eine weitere Nutzung werden gesondert vereinbart.',
    },
    insights: {
      eyebrow: 'Insights',
      title: 'Besprechungen besser vorbereiten.',
      description:
        'Praxiswissen für Office- und Konferenzteams: Besprechungsdetails organisieren, Catering abstimmen und vorhandene Systeme sinnvoll verbinden.',
      body: 'Zu einer Besprechung gehört mehr als der Raum. Hier finden Sie Anregungen, wie Ihr Team Gäste, Catering, Technik und Änderungen gemeinsam organisieren kann.',
    },
    company: {
      eyebrow: 'Conference Manager by Pavurel',
      title: 'Mit Pavurel vom ersten Gespräch in den Arbeitsalltag.',
      description:
        'So begleitet Pavurel die Einrichtung von Conference Manager: Ablauf abstimmen, unterstützte Systeme anbinden und mit eigenen Besprechungen erproben.',
      body: 'Pavurel begleitet die Einrichtung von Conference Manager für Ihr Office- oder Konferenzteam. Gemeinsam stimmen wir den Ablauf und die unterstützten Anbindungen ab, bevor Sie mit eigenen Besprechungen starten.',
    },
    'book-a-demo': {
      eyebrow: 'Demo anfragen',
      title: 'Lernen Sie Conference Manager kennen.',
      description:
        'Besprechen Sie Ihren heutigen Ablauf und Ihre vorhandenen Systeme. Lernen Sie Conference Manager in einer gemeinsamen Demo kennen.',
      body: 'Bringen Sie Ihren heutigen Besprechungsablauf und die Systeme mit, die Ihr Team nutzt.',
      note: 'Demo-Anfragen sind nur verfügbar, wenn die freigegebene Verarbeitung und Datenschutzkonfiguration aktiv sind.',
    },
  },
};

export function getPublicPageCopy(locale: Locale, slug: PublicPageSlug): PublicPageCopy {
  return pages[locale][slug];
}
