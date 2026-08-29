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
      description: 'Discover how Conference Manager brings guests, catering, services, requirements and room context into one guided workplace conference journey.',
      body: 'Conference Manager is designed around the professional conference request. It gives employees a guided experience while keeping the operational context Workplace Teams need in one coherent place.',
    },
    'how-it-works': {
      eyebrow: 'How it works',
      title: 'From conference request to prepared experience.',
      description: 'See the Conference Manager journey from initial request through connected room booking, requirements and Workplace Team coordination.',
      body: 'The journey starts with the conference itself, connects the organisation’s existing room-booking capability and captures the information required to prepare the experience.',
    },
    integrations: {
      eyebrow: 'Integrations',
      title: 'Keep the systems that already solve a problem well.',
      description: 'Conference Manager is designed to connect with existing workplace, identity and collaboration capabilities instead of creating an isolated ecosystem.',
      body: 'The integration direction starts with existing room-booking capabilities and the Microsoft 365 / Entra ecosystem, while internal contracts remain designed for future provider expansion.',
      note: 'Only integration capabilities verified against the current product implementation are presented as available.',
    },
    'workplace-teams': {
      eyebrow: 'For Workplace Teams',
      title: 'Operational context without exposing operational complexity.',
      description: 'Conference Manager helps Workplace Teams understand and coordinate the complete conference request while keeping the employee journey simple.',
      body: 'Workplace Teams need structured information, clear responsibilities and enough context to prepare a professional conference. The product is designed to make that work visible without turning the requester experience into an internal checklist.',
    },
    'security-trust': {
      eyebrow: 'Security & Trust',
      title: 'Simple for users. Deliberate about control.',
      description: 'Security, privacy, tenant isolation, access control and auditable operation are treated as product requirements for Conference Manager.',
      body: 'The public website does not own application authentication or session state. The Conference Manager application and trusted API retain those security boundaries. Public claims on this page remain limited to capabilities that can be evidenced from the current implementation.',
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'Pricing that will be clear before it is public.',
      description: 'Conference Manager pricing is being prepared for a transparent public model. No unapproved prices are published.',
      body: 'The commercial model is not yet formally approved. This page is already part of the public information architecture so the future pricing model can be introduced without restructuring the website.',
      note: 'No monetary amount shown here should be inferred as an offer or approved price.',
    },
    insights: {
      eyebrow: 'Insights',
      title: 'Practical thinking for better workplace conferences.',
      description: 'Insights on conference operations, workplace experience, governance and connected workplace services.',
      body: 'Insights will focus on the operational realities behind professional workplace conferences. During the initial phase, every published article is maintained as a complete English and German pair.',
    },
    'book-a-demo': {
      eyebrow: 'Book a demo',
      title: 'See how Conference Manager fits your workplace.',
      description: 'Request a Conference Manager demo and discuss how the product can fit existing room-booking and workplace processes.',
      body: 'The governed demo-request form is the next conversion capability. It will send requests through a first-party EU-hosted processing boundary to a functional mailbox, without adding marketing tracking.',
      note: 'The production form is not active until its processing endpoint, recipient, privacy text and anti-abuse controls are configured and validated.',
    },
  },
  de: {
    product: {
      eyebrow: 'Produkt',
      title: 'Konferenzmanagement rund um die vollständige Anfrage.',
      description: 'Entdecke, wie Conference Manager Gäste, Catering, Services, Anforderungen und Raumkontext in einem geführten Workplace-Konferenzablauf zusammenführt.',
      body: 'Conference Manager ist rund um die professionelle Konferenzanfrage gestaltet. Mitarbeitende erhalten ein geführtes Erlebnis, während Workplace Teams den operativen Kontext an einem zusammenhängenden Ort sehen.',
    },
    'how-it-works': {
      eyebrow: 'So funktioniert es',
      title: 'Von der Konferenzanfrage zur vorbereiteten Erfahrung.',
      description: 'Sieh den Conference-Manager-Ablauf von der ersten Anfrage über die verbundene Raumbuchung bis zu Anforderungen und Workplace-Team-Koordination.',
      body: 'Der Ablauf beginnt bei der Konferenz selbst, bindet die bestehende Raumbuchungsfähigkeit des Unternehmens ein und erfasst die Informationen, die für die Vorbereitung benötigt werden.',
    },
    integrations: {
      eyebrow: 'Integrationen',
      title: 'Behalte Systeme, die ein Problem bereits gut lösen.',
      description: 'Conference Manager ist darauf ausgelegt, bestehende Workplace-, Identity- und Collaboration-Fähigkeiten einzubinden, statt ein isoliertes Ökosystem zu schaffen.',
      body: 'Die Integrationsrichtung beginnt mit bestehenden Raumbuchungsfähigkeiten und dem Microsoft-365-/Entra-Ökosystem. Interne Verträge bleiben gleichzeitig für spätere Provider-Erweiterungen ausgelegt.',
      note: 'Als verfügbar werden nur Integrationsfähigkeiten dargestellt, die gegen den aktuellen Produktstand verifiziert sind.',
    },
    'workplace-teams': {
      eyebrow: 'Für Workplace Teams',
      title: 'Operativer Kontext, ohne operative Komplexität offenzulegen.',
      description: 'Conference Manager unterstützt Workplace Teams dabei, die vollständige Konferenzanfrage zu verstehen und zu koordinieren, während der Employee Journey einfach bleibt.',
      body: 'Workplace Teams benötigen strukturierte Informationen, klare Zuständigkeiten und ausreichend Kontext für eine professionell vorbereitete Konferenz. Das Produkt macht diese Arbeit sichtbar, ohne die anfragende Person mit internen Checklisten zu belasten.',
    },
    'security-trust': {
      eyebrow: 'Security & Trust',
      title: 'Einfach für Nutzer. Kontrolliert im Fundament.',
      description: 'Security, Datenschutz, Tenant-Isolation, Zugriffskontrolle und auditierbarer Betrieb werden als Produktanforderungen des Conference Manager behandelt.',
      body: 'Die öffentliche Website besitzt weder Anwendungsauthentifizierung noch Session-State. Diese Security-Grenzen verbleiben bei der Conference-Manager-Anwendung und der vertrauenswürdigen API. Öffentliche Aussagen bleiben auf Fähigkeiten begrenzt, die aus dem aktuellen Produktstand belegt werden können.',
    },
    pricing: {
      eyebrow: 'Preise',
      title: 'Preise werden transparent, bevor sie öffentlich werden.',
      description: 'Das Conference-Manager-Pricing wird für ein transparentes öffentliches Modell vorbereitet. Nicht freigegebene Preise werden nicht veröffentlicht.',
      body: 'Das kommerzielle Modell ist noch nicht formal freigegeben. Die Seite ist dennoch bereits Teil der Informationsarchitektur, damit das spätere Pricing ohne Umbau der Website eingeführt werden kann.',
      note: 'Aus dieser Seite darf kein Betrag als Angebot oder freigegebener Preis abgeleitet werden.',
    },
    insights: {
      eyebrow: 'Insights',
      title: 'Praktische Perspektiven für bessere Workplace-Konferenzen.',
      description: 'Insights zu Konferenzbetrieb, Workplace Experience, Governance und vernetzten Workplace Services.',
      body: 'Insights konzentrieren sich auf die operative Realität professioneller Workplace-Konferenzen. In der ersten Phase wird jeder veröffentlichte Beitrag vollständig auf Deutsch und Englisch gepflegt.',
    },
    'book-a-demo': {
      eyebrow: 'Demo buchen',
      title: 'Sieh, wie Conference Manager in deine Arbeitswelt passt.',
      description: 'Fordere eine Conference-Manager-Demo an und besprich, wie sich das Produkt in bestehende Raumbuchungs- und Workplace-Prozesse einfügen kann.',
      body: 'Das kontrollierte Demo-Formular ist die nächste Conversion-Funktion. Anfragen werden künftig über eine eigene EU-gehostete Verarbeitung an ein Funktionspostfach gesendet – ohne Marketing-Tracking.',
      note: 'Das produktive Formular wird erst aktiv, wenn Endpoint, Empfänger, Datenschutzhinweise und Anti-Abuse-Kontrollen konfiguriert und validiert sind.',
    },
  },
};

export function getPublicPageCopy(locale: Locale, slug: PublicPageSlug): PublicPageCopy {
  return pages[locale][slug];
}
