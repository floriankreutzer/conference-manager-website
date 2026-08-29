import type { Locale } from '@config/locales';
import type { PublicPageSlug } from './publicPages';

export const productStorySlugs = ['product', 'how-it-works'] as const;
export type ProductStorySlug = (typeof productStorySlugs)[number];

type ProductStoryPoint = { title: string; body: string };
type ProductStorySection = {
  eyebrow: string;
  title: string;
  body: string;
  points?: readonly ProductStoryPoint[];
  statement?: string;
};
type ProductStoryClosing = {
  eyebrow: string;
  title: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
};
type ProductStoryCopy = { sections: readonly ProductStorySection[]; closing: ProductStoryClosing };

const stories: Record<Locale, Record<ProductStorySlug, ProductStoryCopy>> = {
  en: {
    product: {
      sections: [
        {
          eyebrow: 'One conference request',
          title: 'Keep the decisions that belong together in one place.',
          body: 'Conference Manager guides the requester through date and time, room context, services, catering, cost allocation and review. The value is not another form: it is one conference context that stays understandable from request through preparation.',
          points: [
            {
              title: 'Room context',
              body: 'Keep the room decision connected while the existing booking system remains responsible for the reservation.',
            },
            {
              title: 'Services',
              body: 'Capture relevant workplace-service requirements without starting a separate coordination trail.',
            },
            {
              title: 'Catering',
              body: 'Keep catering needs, participant counts and dietary requirements with the conference.',
            },
            {
              title: 'Review',
              body: 'Make cost allocation and final review visible before the request moves forward.',
            },
          ],
        },
        {
          eyebrow: 'Existing-system fit',
          title: 'Improve conference coordination without replacing room booking.',
          body: 'Conference Manager is deliberately focused on the work around the reservation. Your room-booking capability remains authoritative for the booking itself; Conference Manager connects that context to the wider conference journey.',
          statement: 'Keep your room booking. Replace the coordination around it.',
        },
        {
          eyebrow: 'For Workplace Teams',
          title: 'Give employees simplicity without hiding operational context from the team.',
          body: 'Employees follow a guided request. Workplace Teams work with separate operational views for bookings, room planning, reporting and administration. The requester does not need to learn the operating model in order to give the team useful information.',
          points: [
            {
              title: 'Employee experience',
              body: 'Ask for the conference through a clear journey rather than navigating internal ownership.',
            },
            {
              title: 'Operational visibility',
              body: 'Work with the booking and management context needed to prepare and oversee the conference.',
            },
          ],
        },
        {
          eyebrow: 'Controlled lifecycle',
          title: 'Keep changes deliberate after the first request.',
          body: 'Conference Manager supports confirmation, change requests, resubmission, rejection and cancellation. Supported post-confirmation changes remain explicit instead of silently rewriting an agreed conference context.',
          statement: 'Simple to request. Clear when decisions change.',
        },
      ],
      closing: {
        eyebrow: 'See it in context',
        title: 'Bring one real conference journey to the demo.',
        body: 'The useful question is not how many features fit on a page. It is whether one real request becomes easier for the employee to make and for the Workplace Team to operate.',
        primaryCta: 'Book a demo',
        secondaryCta: 'See how it works',
      },
    },
    'how-it-works': {
      sections: [
        {
          eyebrow: '01 · Request',
          title: 'Start with the conference itself.',
          body: 'The employee begins with date, time and room context, then moves through the decisions needed for the conference instead of navigating separate internal processes.',
        },
        {
          eyebrow: '02 · Requirements',
          title: 'Keep services and catering in the same journey.',
          body: 'Service requirements, catering, participant context and dietary needs stay attached to the conference so preparation is not split across unrelated channels.',
        },
        {
          eyebrow: '03 · Review',
          title: 'Review the request before it enters processing.',
          body: 'Cost allocation and a dedicated review step keep important decisions visible before the conference request moves forward.',
        },
        {
          eyebrow: '04 · Connect',
          title: 'Keep room booking connected, not duplicated.',
          body: 'The existing room-booking capability remains responsible for the reservation. Conference Manager adds the conference context around it rather than rebuilding specialist booking infrastructure.',
          statement: "We don't replace your room booking system. We connect it.",
        },
        {
          eyebrow: '05 · Operate and change',
          title: 'Manage the conference beyond submission.',
          body: 'Workplace views support bookings, room planning, reporting and administration, while the request lifecycle keeps supported changes, rejection and cancellation explicit.',
        },
      ],
      closing: {
        eyebrow: 'Bring your current process',
        title: 'See where Conference Manager fits your workplace.',
        body: 'A useful demo starts with what happens after the room decision today: which information is needed, where it moves between people and tools, and what should remain authoritative.',
        primaryCta: 'Book a demo',
        secondaryCta: 'Explore the product',
      },
    },
  },
  de: {
    product: {
      sections: [
        {
          eyebrow: 'Eine Konferenzanfrage',
          title: 'Halten Sie zusammen, was für dieselbe Konferenz entschieden wird.',
          body: 'Conference Manager führt durch Datum und Zeit, Raumkontext, Services, Catering, Kostenverteilung und Prüfung. Der Nutzen ist nicht ein weiteres Formular, sondern ein zusammenhängender Konferenzkontext, der von der Anfrage bis zur Vorbereitung verständlich bleibt.',
          points: [
            {
              title: 'Raumkontext',
              body: 'Binden Sie die Raumentscheidung ein, während das vorhandene Buchungssystem für die Reservierung verantwortlich bleibt.',
            },
            {
              title: 'Services',
              body: 'Erfassen Sie relevante Workplace-Services, ohne einen separaten Abstimmungsweg zu starten.',
            },
            {
              title: 'Catering',
              body: 'Halten Sie Catering-Bedarf, Teilnehmerzahlen und Ernährungsanforderungen bei der Konferenz.',
            },
            {
              title: 'Prüfung',
              body: 'Machen Sie Kostenverteilung und abschließende Prüfung sichtbar, bevor die Anfrage weitergeht.',
            },
          ],
        },
        {
          eyebrow: 'Bestehende Systeme nutzen',
          title: 'Verbessern Sie die Konferenzkoordination, ohne Ihre Raumbuchung auszutauschen.',
          body: 'Conference Manager konzentriert sich bewusst auf die Arbeit rund um die Reservierung. Ihre bestehende Raumbuchung bleibt für die Buchung selbst führend; Conference Manager verbindet diesen Kontext mit dem weiteren Konferenzablauf.',
          statement:
            'Behalten Sie Ihre Raumbuchung. Strukturieren Sie die Koordination darum herum.',
        },
        {
          eyebrow: 'Für Workplace Teams',
          title: 'Einfach für Mitarbeitende, operativer Kontext für das verantwortliche Team.',
          body: 'Mitarbeitende folgen einer geführten Anfrage. Workplace Teams arbeiten mit getrennten operativen Sichten für Buchungen, Raumplanung, Reporting und Administration. Die anfragende Person muss das Betriebsmodell nicht kennen, um die richtigen Informationen bereitzustellen.',
          points: [
            {
              title: 'Employee Experience',
              body: 'Die Konferenz über einen klaren Ablauf anfragen, statt interne Zuständigkeiten navigieren zu müssen.',
            },
            {
              title: 'Operative Transparenz',
              body: 'Mit dem Buchungs- und Managementkontext arbeiten, der für Vorbereitung und Steuerung benötigt wird.',
            },
          ],
        },
        {
          eyebrow: 'Kontrollierter Lebenszyklus',
          title: 'Halten Sie Änderungen auch nach der ersten Anfrage bewusst steuerbar.',
          body: 'Conference Manager unterstützt Bestätigung, Änderungsanträge, erneutes Einreichen, Ablehnung und Stornierung. Unterstützte Änderungen nach einer Bestätigung bleiben explizit, statt einen abgestimmten Konferenzkontext still zu überschreiben.',
          statement: 'Einfach anzufragen. Klar, wenn sich Entscheidungen ändern.',
        },
      ],
      closing: {
        eyebrow: 'Im Kontext ansehen',
        title: 'Bringen Sie einen realen Konferenzablauf mit in die Demo.',
        body: 'Entscheidend ist nicht die Zahl der Features. Entscheidend ist, ob eine reale Anfrage für Mitarbeitende einfacher und für Workplace Teams besser steuerbar wird.',
        primaryCta: 'Demo anfragen',
        secondaryCta: 'So funktioniert es',
      },
    },
    'how-it-works': {
      sections: [
        {
          eyebrow: '01 · Anfrage',
          title: 'Beginnen Sie bei der Konferenz selbst.',
          body: 'Mitarbeitende starten mit Datum, Zeit und Raumkontext und gehen anschließend durch die für die Konferenz relevanten Entscheidungen – nicht durch getrennte interne Prozesse.',
        },
        {
          eyebrow: '02 · Anforderungen',
          title: 'Halten Sie Services und Catering im selben Ablauf.',
          body: 'Service-Anforderungen, Catering, Teilnehmerkontext und Ernährungsanforderungen bleiben an der Konferenz, damit die Vorbereitung nicht auf voneinander getrennte Kanäle verteilt wird.',
        },
        {
          eyebrow: '03 · Prüfung',
          title: 'Prüfen Sie die Anfrage, bevor sie in die Bearbeitung geht.',
          body: 'Kostenverteilung und ein eigener Prüfschritt halten wichtige Entscheidungen sichtbar, bevor die Konferenzanfrage weiterläuft.',
        },
        {
          eyebrow: '04 · Verbinden',
          title: 'Binden Sie die Raumbuchung ein, statt sie zu duplizieren.',
          body: 'Die bestehende Raumbuchung bleibt für die Reservierung verantwortlich. Conference Manager ergänzt den Konferenzkontext darum herum, statt spezialisierte Buchungsinfrastruktur nachzubauen.',
          statement: 'Wir ersetzen Ihre Raumbuchung nicht. Wir verbinden sie.',
        },
        {
          eyebrow: '05 · Steuern und ändern',
          title: 'Begleiten Sie die Konferenz über das Absenden hinaus.',
          body: 'Workplace-Sichten unterstützen Buchungen, Raumplanung, Reporting und Administration. Gleichzeitig hält der Anfrage-Lebenszyklus unterstützte Änderungen, Ablehnung und Stornierung nachvollziehbar.',
        },
      ],
      closing: {
        eyebrow: 'Ihr heutiger Prozess',
        title: 'Sehen Sie, wo Conference Manager in Ihre Arbeitsweise passt.',
        body: 'Eine sinnvolle Demo beginnt damit, was heute nach der Raumentscheidung passiert: Welche Informationen werden benötigt, wo wechseln sie zwischen Menschen und Tools und welche Systeme sollen führend bleiben?',
        primaryCta: 'Demo anfragen',
        secondaryCta: 'Produkt ansehen',
      },
    },
  },
};

export function isProductStorySlug(slug: PublicPageSlug): slug is ProductStorySlug {
  return slug === 'product' || slug === 'how-it-works';
}

export function getProductStoryCopy(locale: Locale, slug: ProductStorySlug): ProductStoryCopy {
  return stories[locale][slug];
}
