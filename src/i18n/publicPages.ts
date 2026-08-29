import type { Locale } from '@config/locales';

export const publicPageSlugs = [
  'product',
  'how-it-works',
  'integrations',
  'workplace-teams',
  'security-trust',
  'pricing',
  'insights',
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
      title: 'Conference management around the complete request.',
      description:
        'See how Conference Manager brings guests, catering, services, requirements and room context into one guided conference journey for modern workplaces.',
      body: 'Conference Manager is designed around the professional conference request. Employees get a clear journey while Workplace Teams retain the operational context needed to prepare and manage the experience.',
    },
    'how-it-works': {
      eyebrow: 'How it works',
      title: 'From conference request to prepared experience.',
      description:
        'Follow the Conference Manager journey from the first request through connected room context, conference requirements and Workplace Team coordination.',
      body: 'Start with the conference itself, connect the organisation’s existing room-booking capability and keep the information needed for preparation together.',
    },
    integrations: {
      eyebrow: 'Integrations',
      title: 'Keep the systems that already solve a problem well.',
      description:
        'Connect Conference Manager with existing workplace, identity and collaboration capabilities instead of creating an isolated conference process.',
      body: 'The current enterprise integration focus starts with existing room-booking capabilities and Microsoft 365 / Entra. Provider access remains qualified by the tenant configuration and controls required for real use.',
      note: 'Only integration capabilities verified against the current product implementation are presented as available.',
    },
    'workplace-teams': {
      eyebrow: 'For Workplace Teams',
      title: 'Operational context without exposing operational complexity.',
      description:
        'Give Workplace Teams the context to prepare and coordinate conferences while keeping the employee request journey simple.',
      body: 'Workplace Teams need structured information, clear responsibilities and enough context to prepare a professional conference. Conference Manager makes that work visible without turning the requester experience into an internal checklist.',
    },
    'security-trust': {
      eyebrow: 'Security & Trust',
      title: 'Simple for users. Deliberate about control.',
      description:
        'Evaluate how Conference Manager separates public marketing, authenticated product access, integration authority and production trust controls.',
      body: 'Conference Manager keeps the public website, authenticated application and trusted API as distinct responsibilities. Public trust statements remain evidence-led and qualified where real production acceptance is still required.',
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'A clear commercial model before a public price list.',
      description:
        'Conference Manager is preparing a transparent commercial model. No price, tier or offer is published before formal approval.',
      body: 'Public pricing is not yet approved. Until it is, a demo conversation can focus on product fit and the operating model without presenting an unapproved monetary offer.',
      note: 'No monetary amount shown here should be inferred as an offer or approved price.',
    },
    insights: {
      eyebrow: 'Insights',
      title: 'Practical thinking for better workplace conferences.',
      description:
        'Insights on conference operations, workplace experience, governance and connected workplace services.',
      body: 'Insights focus on the operational realities behind professional workplace conferences. During the initial phase, every published article is maintained as a complete English and German pair.',
    },
    'book-a-demo': {
      eyebrow: 'Book a demo',
      title: 'See how Conference Manager fits your workplace.',
      description:
        'Request a Conference Manager demo and discuss how the product could fit your existing room-booking and workplace processes.',
      body: 'Bring one real conference journey: what happens after the room is chosen, what your team needs to prepare and where coordination moves between people and tools today.',
      note: 'Demo requests remain unavailable in environments where the accepted processing endpoint and privacy controls are not configured.',
    },
  },
  de: {
    product: {
      eyebrow: 'Produkt',
      title: 'Konferenzmanagement rund um die vollständige Anfrage.',
      description:
        'Sehen Sie, wie Conference Manager Gäste, Catering, Services, Anforderungen und Raumkontext in einem geführten Konferenzablauf für moderne Arbeitswelten zusammenführt.',
      body: 'Conference Manager ist rund um die professionelle Konferenzanfrage gestaltet. Mitarbeitende erhalten einen klaren Ablauf, während Workplace Teams den operativen Kontext für Vorbereitung und Steuerung behalten.',
    },
    'how-it-works': {
      eyebrow: 'So funktioniert es',
      title: 'Von der Konferenzanfrage zur vorbereiteten Erfahrung.',
      description:
        'Folgen Sie dem Conference-Manager-Ablauf von der ersten Anfrage über den verbundenen Raumkontext bis zu Anforderungen und Workplace-Team-Koordination.',
      body: 'Beginnen Sie bei der Konferenz selbst, binden Sie die bestehende Raumbuchung Ihres Unternehmens ein und halten Sie die für die Vorbereitung benötigten Informationen zusammen.',
    },
    integrations: {
      eyebrow: 'Integrationen',
      title: 'Behalten Sie Systeme, die ein Problem bereits gut lösen.',
      description:
        'Verbinden Sie Conference Manager mit bestehenden Workplace-, Identity- und Collaboration-Fähigkeiten, statt einen isolierten Konferenzprozess zu schaffen.',
      body: 'Der aktuelle Enterprise-Integrationsfokus beginnt mit vorhandener Raumbuchung und Microsoft 365 / Entra. Realer Provider-Zugriff bleibt an die jeweils erforderliche Tenant-Konfiguration und Kontrollen gebunden.',
      note: 'Als verfügbar werden nur Integrationsfähigkeiten dargestellt, die gegen den aktuellen Produktstand verifiziert sind.',
    },
    'workplace-teams': {
      eyebrow: 'Für Workplace Teams',
      title: 'Operativer Kontext, ohne operative Komplexität offenzulegen.',
      description:
        'Geben Sie Workplace Teams den Kontext für Vorbereitung und Koordination, während der Anfrageprozess für Mitarbeitende einfach bleibt.',
      body: 'Workplace Teams benötigen strukturierte Informationen, klare Zuständigkeiten und ausreichend Kontext für eine professionell vorbereitete Konferenz. Conference Manager macht diese Arbeit sichtbar, ohne die anfragende Person mit internen Checklisten zu belasten.',
    },
    'security-trust': {
      eyebrow: 'Security & Trust',
      title: 'Einfach für Nutzer. Kontrolliert im Fundament.',
      description:
        'Bewerten Sie, wie Conference Manager öffentliche Website, authentifizierten Produktzugriff, Integrationsautorität und produktive Trust-Kontrollen voneinander trennt.',
      body: 'Conference Manager hält öffentliche Website, authentifizierte Anwendung und Trusted API als getrennte Verantwortlichkeiten. Öffentliche Trust-Aussagen bleiben evidenzbasiert und werden qualifiziert, solange reale Produktionsabnahmen noch ausstehen.',
    },
    pricing: {
      eyebrow: 'Preise',
      title: 'Ein klares kommerzielles Modell vor einer öffentlichen Preisliste.',
      description:
        'Conference Manager bereitet ein transparentes kommerzielles Modell vor. Preise, Tiers oder Angebote werden nicht vor formaler Freigabe veröffentlicht.',
      body: 'Öffentliche Preise sind noch nicht freigegeben. Bis dahin kann eine Demo den Produktfit und das Betriebsmodell klären, ohne einen nicht freigegebenen Preis als Angebot darzustellen.',
      note: 'Aus dieser Seite darf kein Betrag als Angebot oder freigegebener Preis abgeleitet werden.',
    },
    insights: {
      eyebrow: 'Insights',
      title: 'Praktische Perspektiven für bessere Workplace-Konferenzen.',
      description:
        'Insights zu Konferenzbetrieb, Workplace Experience, Governance und vernetzten Workplace Services.',
      body: 'Insights konzentrieren sich auf die operative Realität professioneller Workplace-Konferenzen. In der ersten Phase wird jeder veröffentlichte Beitrag vollständig auf Deutsch und Englisch gepflegt.',
    },
    'book-a-demo': {
      eyebrow: 'Demo anfragen',
      title: 'Sehen Sie, wie Conference Manager in Ihre Arbeitswelt passt.',
      description:
        'Fordern Sie eine Conference-Manager-Demo an und besprechen Sie, wie sich das Produkt in bestehende Raumbuchungs- und Workplace-Prozesse einfügen kann.',
      body: 'Bringen Sie einen realen Konferenzablauf mit: Was passiert nach der Raumentscheidung, was benötigt Ihr Team für die Vorbereitung und wo wechselt die Koordination heute zwischen Menschen und Tools?',
      note: 'Demo-Anfragen bleiben in Umgebungen deaktiviert, in denen der abgenommene Verarbeitungs-Endpunkt und die Datenschutzkontrollen nicht konfiguriert sind.',
    },
  },
};

export function getPublicPageCopy(locale: Locale, slug: PublicPageSlug): PublicPageCopy {
  return pages[locale][slug];
}
