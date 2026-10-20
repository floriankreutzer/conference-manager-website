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
      body: 'See how guest details, catering, equipment and supported changes are organised within a meeting request. Your existing room-booking system remains responsible for reservations.',
    },
    'how-it-works': {
      eyebrow: 'How it works',
      title: 'One meeting. Three clear steps.',
      description:
        'See how employees, the office team and service teams pass a meeting request through preparation and review changes in Conference Manager.',
      body: 'See who supplies the information, coordinates preparation and reviews a requested change. Each step keeps the meeting and its current status together.',
    },
    integrations: {
      eyebrow: 'Integrations',
      title: 'Your systems. One meeting workflow.',
      description:
        'Room reservations, Microsoft sign-in and catering coordination: we work with you to confirm how Conference Manager fits your company.',
      body: 'Keep the systems that already manage rooms and company sign-in. Review which connections are available and which requirements need a separate assessment.',
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
      body: 'Clarify who can access meeting details, which information is exchanged and which requirements your IT team needs to assess before setup.',
    },
    pricing: {
      eyebrow: 'Setup & pilot',
      title: 'Try it with your own meetings.',
      description:
        'Start with a demo. Once your customer environment is set up, use the software free for 30 days. A one-time setup fee applies.',
      body: 'From the first conversation to your own customer environment: agree the scope, prepare the setup and try the process in everyday use.',
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
      title: 'Pavurel supports your setup.',
      description:
        'Learn how Pavurel prepares your Conference Manager environment, what your team contributes and how later adjustments are agreed.',
      body: 'We agree your Conference Manager setup, prepare the customer environment and handle agreed adjustments.',
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
      body: 'Erfahren Sie, wie Gästeangaben, Catering, Technik und unterstützte Änderungen in einer Besprechungsanfrage zusammenkommen. Ihr vorhandenes Raumbuchungssystem bleibt für Reservierungen zuständig.',
    },
    'how-it-works': {
      eyebrow: 'So funktioniert es',
      title: 'Eine Besprechung. Drei klare Schritte.',
      description:
        'So geben Mitarbeitende, Office-Team und Service-Teams eine Besprechungsanfrage weiter, stimmen die Vorbereitung ab und prüfen Änderungen im Conference Manager.',
      body: 'Wer liefert die Angaben, wer stimmt die Vorbereitung ab und wer prüft eine angefragte Änderung? Jeder Schritt bleibt mit der Besprechung und ihrem aktuellen Stand verbunden.',
    },
    integrations: {
      eyebrow: 'Integrationen',
      title: 'Ihre Systeme. Ein gemeinsamer Ablauf.',
      description:
        'Raumreservierung, Microsoft-Anmeldung und Cateringkoordination: Wir prüfen gemeinsam, wie Conference Manager zu Ihrem Unternehmen passt.',
      body: 'Nutzen Sie die Systeme weiter, die Ihre Räume und Unternehmensanmeldung verwalten. Erfahren Sie, welche Anbindungen verfügbar sind und was gesondert geprüft werden muss.',
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
      body: 'Klären Sie, wer Besprechungsangaben sehen darf, welche Informationen ausgetauscht werden und welche Anforderungen Ihre IT vor der Einrichtung prüfen muss.',
    },
    pricing: {
      eyebrow: 'Einrichtung & Pilot',
      title: 'Mit eigenen Besprechungen erproben.',
      description:
        'Starten Sie mit einer Demo. Nach abgeschlossener, einmalig kostenpflichtiger Einrichtung nutzen Sie die Software 30 Tage kostenlos in Ihrer Kundenumgebung.',
      body: 'Vom ersten Gespräch zur eigenen Kundenumgebung: den Umfang abstimmen, die Einrichtung vorbereiten und den Ablauf im Alltag erproben.',
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
      title: 'Pavurel begleitet Ihre Einführung.',
      description:
        'Erfahren Sie, wie Pavurel Ihre Conference-Manager-Umgebung vorbereitet, was Ihr Team einbringt und wie spätere Anpassungen abgestimmt werden.',
      body: 'Wir stimmen die Einrichtung von Conference Manager mit Ihnen ab, bereiten die Kundenumgebung vor und begleiten vereinbarte Anpassungen.',
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
