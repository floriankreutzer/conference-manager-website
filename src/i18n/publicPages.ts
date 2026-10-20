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
      title: 'Conference management around the complete request.',
      description:
        'See how Conference Manager brings guests, catering, services, requirements and room context into one guided conference journey for modern workplaces.',
      body: 'Conference Manager is designed around the professional conference request. Employees get a clear journey while Workplace Teams retain the context needed to prepare and manage the experience.',
    },
    'how-it-works': {
      eyebrow: 'How it works',
      title: 'From conference request to prepared experience.',
      description:
        'Follow a conference from the first request through room context, services, catering, review and Workplace Team preparation.',
      body: 'Start with the conference itself, keep the information needed for preparation together and connect the room-booking capability your organisation already uses.',
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
      eyebrow: 'For Workplace Teams',
      title: 'More context for the team. Less process for the requester.',
      description:
        'Give Workplace Teams the information to prepare and coordinate conferences while keeping the employee request journey simple.',
      body: 'Workplace Teams need structured information, clear responsibilities and enough context to prepare a professional conference. Conference Manager makes that work visible without turning the requester experience into an internal checklist.',
    },
    'security-trust': {
      eyebrow: 'Security & Trust',
      title: 'Enterprise trust without making the employee experience complicated.',
      description:
        'See how Conference Manager combines a simple employee experience with controlled access, customer-specific integrations and evidence-led security claims.',
      body: 'Employees should be able to request a conference without learning the security model behind the product. Your organisation still needs control over sign-in, roles, integrations and operational access. Conference Manager is designed to support both needs without turning Security & Trust into a page of infrastructure language.',
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
      title: 'Practical thinking for better workplace conferences.',
      description:
        'Insights on conference operations, workplace experience, governance and connected workplace services.',
      body: 'Insights focus on the operational realities behind professional workplace conferences and the decisions that help Workplace Teams create clearer, more dependable experiences.',
    },
    company: {
      eyebrow: 'About',
      title: 'Built around the conference, not around another system.',
      description:
        'Learn why Conference Manager focuses on the complete workplace conference journey, how it supports employees and Workplace Teams, and what Pavurel contributes to the product experience.',
      body: 'Conference Manager is built for the work that begins after a room is chosen: guests, catering, services, requirements and the coordination that makes a professional conference feel prepared. The product combines a simple requester experience with the operational context Workplace Teams need.',
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
      title: 'Konferenzmanagement rund um die vollständige Anfrage.',
      description:
        'Sehen Sie, wie Conference Manager Gäste, Catering, Services, Anforderungen und Raumkontext in einem geführten Konferenzablauf für moderne Arbeitswelten zusammenführt.',
      body: 'Conference Manager ist rund um die professionelle Konferenzanfrage gestaltet. Mitarbeitende erhalten einen klaren Ablauf, während Workplace Teams den Kontext für Vorbereitung und Steuerung behalten.',
    },
    'how-it-works': {
      eyebrow: 'So funktioniert es',
      title: 'Von der Konferenzanfrage zur vorbereiteten Erfahrung.',
      description:
        'Verfolgen Sie eine Konferenz von der ersten Anfrage über Raumkontext, Services, Catering und Prüfung bis zur Vorbereitung durch das Workplace Team.',
      body: 'Beginnen Sie bei der Konferenz selbst, halten Sie die für die Vorbereitung benötigten Informationen zusammen und binden Sie die bestehende Raumbuchung Ihres Unternehmens ein.',
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
      eyebrow: 'Für Workplace Teams',
      title: 'Mehr Kontext für das Team. Weniger Prozess für die anfragende Person.',
      description:
        'Geben Sie Workplace Teams die Informationen für Vorbereitung und Koordination, während der Anfrageprozess für Mitarbeitende einfach bleibt.',
      body: 'Workplace Teams benötigen strukturierte Informationen, klare Zuständigkeiten und ausreichend Kontext für eine professionell vorbereitete Konferenz. Conference Manager macht diese Arbeit sichtbar, ohne die anfragende Person mit internen Checklisten zu belasten.',
    },
    'security-trust': {
      eyebrow: 'Security & Trust',
      title: 'Enterprise-Sicherheit, ohne den Anfrageprozess kompliziert zu machen.',
      description:
        'Sehen Sie, wie Conference Manager einen einfachen Anfrageprozess mit kontrolliertem Zugriff, kundenspezifischen Integrationen und evidenzbasierten Security-Aussagen verbindet.',
      body: 'Mitarbeitende sollen eine Konferenz anfragen können, ohne das Sicherheitsmodell des Produkts verstehen zu müssen. Ihr Unternehmen benötigt trotzdem Kontrolle über Anmeldung, Rollen, Integrationen und operativen Zugriff. Conference Manager ist darauf ausgelegt, beides zu verbinden, ohne Security & Trust zu einer Seite voller Infrastrukturbegriffe zu machen.',
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
      title: 'Praktische Perspektiven für bessere Workplace-Konferenzen.',
      description:
        'Insights zu Konferenzbetrieb, Workplace Experience, Governance und vernetzten Workplace Services.',
      body: 'Insights konzentrieren sich auf die operative Realität professioneller Workplace-Konferenzen und auf Entscheidungen, mit denen Workplace Teams klarere und verlässlichere Erfahrungen schaffen können.',
    },
    company: {
      eyebrow: 'Über uns',
      title: 'Rund um die Konferenz gebaut – nicht rund um ein weiteres System.',
      description:
        'Erfahren Sie, warum Conference Manager den vollständigen Workplace-Konferenzablauf in den Mittelpunkt stellt, wie Mitarbeitende und Workplace Teams davon profitieren und welche Rolle Pavurel im Produkterlebnis spielt.',
      body: 'Conference Manager ist für die Arbeit gebaut, die nach der Raumentscheidung beginnt: Gäste, Catering, Services, Anforderungen und die Koordination, durch die eine professionelle Konferenz vorbereitet wirkt. Das Produkt verbindet einen einfachen Anfrageprozess mit dem operativen Kontext, den Workplace Teams benötigen.',
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
