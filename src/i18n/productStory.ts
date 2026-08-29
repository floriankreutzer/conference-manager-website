import type { Locale } from '@config/locales';
import type { PublicPageSlug } from './publicPages';

export const productStorySlugs = ['product', 'how-it-works'] as const;
export type ProductStorySlug = (typeof productStorySlugs)[number];

type ProductStoryPoint = {
  title: string;
  body: string;
};

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

type ProductStoryCopy = {
  sections: readonly ProductStorySection[];
  closing: ProductStoryClosing;
};

const stories: Record<Locale, Record<ProductStorySlug, ProductStoryCopy>> = {
  en: {
    product: {
      sections: [
        {
          eyebrow: 'Employee request',
          title: 'One conference context, from date and time to review.',
          body: 'The current Conference Manager experience guides the requester through date and time, room context, services, catering, cost allocation and review. Those decisions stay connected to the same conference request instead of becoming separate service journeys.',
          points: [
            {
              title: 'Room context',
              body: 'Keep the room decision attached to the conference without turning Conference Manager into the system of record for room inventory.',
            },
            {
              title: 'Services',
              body: 'Capture service requirements alongside the conference rather than sending the requester into a disconnected process.',
            },
            {
              title: 'Catering',
              body: 'Keep catering needs, participant counts and dietary requirements with the request.',
            },
            {
              title: 'Cost allocation and review',
              body: 'Make allocation and the final review explicit before the request moves forward.',
            },
          ],
        },
        {
          eyebrow: 'Room booking',
          title: 'Keep the reservation authority where it belongs.',
          body: 'Conference Manager is not positioned as another room-booking system. The existing booking capability remains responsible for the reservation; Conference Manager carries the wider conference context around it. That boundary reduces duplication and keeps the product focused on the coordination gap.',
          statement: 'Keep your room booking. Replace the coordination around it.',
        },
        {
          eyebrow: 'Workplace Team',
          title: 'A simple requester journey can still create operational context.',
          body: 'The current frontend separates the employee request from manager-side operational views. Bookings, room planning, reporting and master-data administration are available as distinct management capabilities while the requester sees the guided conference flow.',
          points: [
            {
              title: 'For employees',
              body: 'Ask for the conference through a guided journey rather than navigating the internal ownership model.',
            },
            {
              title: 'For the managing team',
              body: 'Work with a separate operational view of bookings and supporting management context.',
            },
          ],
        },
        {
          eyebrow: 'Lifecycle',
          title: 'The request does not stop at submit.',
          body: 'The implemented request lifecycle includes confirmation, change requests, resubmission, rejection and cancellation. Confirmed changes are handled through controlled flows rather than silently replacing the original conference context.',
          statement: 'Simple outside. Controlled where decisions change.',
        },
      ],
      closing: {
        eyebrow: 'Next step',
        title: 'See the conference journey in context.',
        body: 'The useful test is not how many features fit on a page. It is whether one real conference request becomes easier to understand for the requester and the Workplace Team.',
        primaryCta: 'Book a demo',
        secondaryCta: 'See how it works',
      },
    },
    'how-it-works': {
      sections: [
        {
          eyebrow: '01 · Request',
          title: 'Start with the conference itself.',
          body: 'The employee begins with date and time and the room context, then moves through the decisions needed for the conference instead of navigating separate internal processes.',
        },
        {
          eyebrow: '02 · Requirements',
          title: 'Add services and catering in the same flow.',
          body: 'Service requirements, catering choices, participant context and dietary requirements stay attached to the conference request so the preparation is not split across unrelated channels.',
        },
        {
          eyebrow: '03 · Review',
          title: 'Make cost allocation and review explicit.',
          body: 'The current employee workflow validates cost allocation and provides a dedicated review step before submission, keeping important request decisions visible before the conference moves into processing.',
        },
        {
          eyebrow: '04 · Room boundary',
          title: 'Keep room booking connected, not duplicated.',
          body: 'The room-booking capability remains responsible for the reservation. Conference Manager adds the wider conference context and is designed to connect that responsibility into the journey rather than recreate room-booking infrastructure.',
          statement: "We don't replace your room booking system. We connect it.",
        },
        {
          eyebrow: '05 · Operate and change',
          title: 'Give the managing team a controlled lifecycle.',
          body: 'Manager-side views cover bookings, room planning, reporting and administration. The implemented request lifecycle also supports controlled change, rejection and cancellation, including managed changes after confirmation instead of silent edits.',
        },
      ],
      closing: {
        eyebrow: 'Bring a real journey',
        title: 'See how the flow fits your workplace.',
        body: 'A useful demo starts with one real conference journey: what happens after the room is chosen, which information is needed, and where coordination currently moves between people and tools.',
        primaryCta: 'Book a demo',
        secondaryCta: 'Explore the product',
      },
    },
  },
  de: {
    product: {
      sections: [
        {
          eyebrow: 'Employee Request',
          title: 'Ein Konferenzkontext – von Datum und Zeit bis zur Prüfung.',
          body: 'Die aktuelle Conference-Manager-Erfahrung führt die anfragende Person durch Datum und Zeit, Raumkontext, Services, Catering, Kostenverteilung und Prüfung. Diese Entscheidungen bleiben mit derselben Konferenzanfrage verbunden, statt zu getrennten Service-Abläufen zu werden.',
          points: [
            {
              title: 'Raumkontext',
              body: 'Halte die Raumentscheidung an der Konferenz, ohne Conference Manager zum führenden System für Rauminventar zu machen.',
            },
            {
              title: 'Services',
              body: 'Erfasse Service-Anforderungen zusammen mit der Konferenz, statt die anfragende Person in einen getrennten Prozess zu schicken.',
            },
            {
              title: 'Catering',
              body: 'Halte Catering-Bedarfe, Teilnehmerzahlen und Ernährungsanforderungen bei der Anfrage.',
            },
            {
              title: 'Kostenverteilung und Prüfung',
              body: 'Mache Kostenverteilung und die abschließende Prüfung explizit, bevor die Anfrage weitergeht.',
            },
          ],
        },
        {
          eyebrow: 'Raumbuchung',
          title: 'Die Verantwortung für die Reservierung bleibt dort, wo sie hingehört.',
          body: 'Conference Manager ist nicht als weiteres Raumbuchungssystem positioniert. Die bestehende Buchungslösung bleibt für die Reservierung verantwortlich; Conference Manager trägt den weitergehenden Konferenzkontext darum herum. Diese Grenze reduziert Doppelungen und hält den Fokus auf der Koordinationslücke.',
          statement: 'Behalte deine Raumbuchung. Ersetze die Koordination darum herum.',
        },
        {
          eyebrow: 'Workplace Team',
          title: 'Eine einfache Anfrage kann trotzdem operativen Kontext schaffen.',
          body: 'Das aktuelle Frontend trennt die Employee-Anfrage von operativen Manager-Ansichten. Buchungen, Raumplanung, Reporting und Stammdatenadministration stehen als eigene Management-Fähigkeiten bereit, während die anfragende Person den geführten Konferenzablauf sieht.',
          points: [
            {
              title: 'Für Mitarbeitende',
              body: 'Frage die Konferenz über einen geführten Ablauf an, statt das interne Zuständigkeitsmodell navigieren zu müssen.',
            },
            {
              title: 'Für das verantwortliche Team',
              body: 'Arbeite mit einer getrennten operativen Sicht auf Buchungen und den unterstützenden Management-Kontext.',
            },
          ],
        },
        {
          eyebrow: 'Lifecycle',
          title: 'Die Anfrage endet nicht beim Absenden.',
          body: 'Der implementierte Request-Lifecycle umfasst Bestätigung, Änderungsanträge, erneutes Einreichen, Ablehnung und Stornierung. Bestätigte Änderungen laufen über kontrollierte Abläufe, statt den ursprünglichen Konferenzkontext still zu überschreiben.',
          statement: 'Einfach nach außen. Kontrolliert, wenn sich Entscheidungen ändern.',
        },
      ],
      closing: {
        eyebrow: 'Nächster Schritt',
        title: 'Sieh den Konferenzablauf im Zusammenhang.',
        body: 'Entscheidend ist nicht, wie viele Features auf eine Seite passen. Entscheidend ist, ob eine reale Konferenzanfrage für die anfragende Person und das Workplace Team verständlicher wird.',
        primaryCta: 'Demo buchen',
        secondaryCta: 'So funktioniert es',
      },
    },
    'how-it-works': {
      sections: [
        {
          eyebrow: '01 · Anfrage',
          title: 'Beginne bei der Konferenz selbst.',
          body: 'Mitarbeitende starten mit Datum und Zeit sowie dem Raumkontext und gehen anschließend durch die für die Konferenz relevanten Entscheidungen, statt getrennte interne Prozesse navigieren zu müssen.',
        },
        {
          eyebrow: '02 · Anforderungen',
          title: 'Ergänze Services und Catering im selben Ablauf.',
          body: 'Service-Anforderungen, Catering-Auswahl, Teilnehmerkontext und Ernährungsanforderungen bleiben mit der Konferenzanfrage verbunden, damit die Vorbereitung nicht auf voneinander getrennte Kanäle verteilt wird.',
        },
        {
          eyebrow: '03 · Prüfung',
          title: 'Mache Kostenverteilung und Prüfung explizit.',
          body: 'Der aktuelle Employee-Workflow validiert die Kostenverteilung und bietet vor dem Absenden einen eigenen Prüfschritt. Wichtige Entscheidungen bleiben damit sichtbar, bevor die Konferenz in die weitere Bearbeitung geht.',
        },
        {
          eyebrow: '04 · Raumgrenze',
          title: 'Binde die Raumbuchung ein, statt sie zu duplizieren.',
          body: 'Die Raumbuchung bleibt für die Reservierung verantwortlich. Conference Manager ergänzt den weitergehenden Konferenzkontext und ist darauf ausgelegt, diese Verantwortung in den Ablauf einzubinden, statt Raumbuchungsinfrastruktur nachzubauen.',
          statement: 'Wir ersetzen dein Raumbuchungssystem nicht. Wir verbinden es.',
        },
        {
          eyebrow: '05 · Betrieb und Änderung',
          title: 'Gib dem verantwortlichen Team einen kontrollierten Lifecycle.',
          body: 'Manager-Ansichten decken Buchungen, Raumplanung, Reporting und Administration ab. Der implementierte Request-Lifecycle unterstützt außerdem kontrollierte Änderungen, Ablehnung und Stornierung – einschließlich verwalteter Änderungen nach der Bestätigung statt stiller Bearbeitungen.',
        },
      ],
      closing: {
        eyebrow: 'Nimm einen realen Ablauf',
        title: 'Sieh, wie der Flow in deine Arbeitswelt passt.',
        body: 'Eine sinnvolle Demo beginnt mit einer realen Konferenz: Was passiert nach der Raumentscheidung, welche Informationen werden benötigt und wo wechselt die Koordination heute zwischen Menschen und Werkzeugen?',
        primaryCta: 'Demo buchen',
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
