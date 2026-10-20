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
type ProductStoryCopy = {
  sections: readonly ProductStorySection[];
  closing: ProductStoryClosing;
  example?: { eyebrow: string; title: string; body: string };
};

const stories: Record<Locale, Record<ProductStorySlug, ProductStoryCopy>> = {
  en: {
    product: {
      sections: [
        {
          eyebrow: 'The meeting request',
          title: 'Bring the details together before preparation starts.',
          body: 'Employees start in Conference Manager and describe the meeting they need. Your office or conference team receives the details in one request and can see what still needs to be clarified.',
          points: [
            {
              title: 'Guests and attendees',
              body: 'Capture attendee numbers, guest details and requirements for the visit.',
            },
            {
              title: 'Room and equipment',
              body: 'Include the room, display, video conferencing and other preparation requirements. Your existing room-booking system handles the reservation.',
            },
            {
              title: 'Catering',
              body: 'Choose refreshments as part of the same meeting request, with quantities and dietary requirements.',
            },
            {
              title: 'Progress',
              body: 'Keep the request and its current processing stage together, from submission through preparation.',
            },
          ],
        },
        {
          eyebrow: 'Catering',
          title: 'Specify what is needed, and how much.',
          body: 'Replace separate catering spreadsheets and forms with a catalogue in the meeting request. Employees select individual items with quantities and prices, or a predefined package such as a coffee break per person.',
          points: [
            {
              title: 'A catalogue your team maintains',
              body: 'Your office or conference team maintains the available items, packages and prices. Importing a supplier catalogue requires a confirmed connection.',
            },
            {
              title: 'Supplier replies stay with the meeting',
              body: 'Your office team sends the order by email and records the supplier’s response in Conference Manager. Additional supplier access or automatic exchanges are assessed separately.',
            },
          ],
        },
        {
          eyebrow: 'Changes',
          title: 'Keep the agreed request and the proposed change clear.',
          body: 'A meeting can change after it has been confirmed. Supported changes remain connected to the request, so your team can see what is being proposed and which decision is outstanding.',
          points: [
            {
              title: 'More attendees and more catering',
              body: 'For example, a workshop grows from 12 to 18 people and the employee also requests six additional catering portions. The revised quantity is submitted for review.',
            },
            {
              title: 'Rules agreed during setup',
              body: 'We agree on the supported approval steps and deadlines for your customer environment. Pavurel handles possible adjustments on request.',
            },
          ],
          statement: 'The change, its impact and the next decision belong to the same meeting.',
        },
        {
          eyebrow: 'Your existing systems',
          title: 'Connect the work around your room booking.',
          body: 'Your room-booking system stays responsible for reservations. Conference Manager brings the request, catering and preparation together around it. We confirm the supported connections before setup.',
          points: [
            {
              title: 'Company sign-in',
              body: 'Use your Microsoft work account after the required setup and your organisation’s approval. Access and roles are agreed for your environment.',
            },
            {
              title: 'Optional visitor connection',
              body: 'If you want visitor registration or arrival status from an existing visitor system, we assess feasibility and scope separately.',
            },
          ],
        },
      ],
      closing: {
        eyebrow: 'See your own process',
        title: 'What would your next meeting look like?',
        body: 'Bring a typical meeting to the demo. We look at the information your team needs, your existing systems and the setup that fits your process.',
        primaryCta: 'Book a demo',
        secondaryCta: 'See how it works',
      },
    },
    'how-it-works': {
      example: {
        eyebrow: 'Explore a meeting',
        title: 'One customer workshop. Three stages.',
        body: 'Follow the same meeting from the first request through coordination to a change in attendee and catering numbers.',
      },
      sections: [
        {
          eyebrow: '01 · Request',
          title: 'The employee describes the meeting.',
          body: 'Start in Conference Manager with the date, time and attendees. Add guest information, catering and equipment in the same request. The existing room-booking system remains responsible for the reservation through an agreed, supported connection.',
          points: [
            {
              title: 'The details are ready for review',
              body: 'The office or conference team can review one request and identify missing information.',
            },
          ],
        },
        {
          eyebrow: '02 · Coordination',
          title: 'The conference team prepares the meeting.',
          body: 'The team reviews the requirements, coordinates catering and keeps track of outstanding replies. When the caterer responds by email, the office team records the response in Conference Manager.',
          points: [
            {
              title: 'Responsibilities are agreed together',
              body: 'During setup, we clarify how reception, equipment and room-preparation teams take part. Their involvement depends on the agreed setup.',
            },
          ],
        },
        {
          eyebrow: '03 · Change',
          title: 'A change stays with the meeting.',
          body: 'In the example, the workshop grows from 12 to 18 people and the requested catering quantity increases as well. The conference team can review the revised quantity and its effect on services and costs.',
          points: [
            {
              title: 'The decision remains visible',
              body: 'Supported changes and their processing stage remain connected to the meeting. Applicable approval steps and deadlines are agreed during setup.',
            },
          ],
        },
      ],
      closing: {
        eyebrow: 'From example to your working day',
        title: 'Let’s walk through one of your meetings.',
        body: 'Show us where information is missing, who needs to be involved and how changes arrive today. We discuss how Conference Manager can fit that process.',
        primaryCta: 'Book a demo',
        secondaryCta: 'Explore the product',
      },
    },
  },
  de: {
    product: {
      sections: [
        {
          eyebrow: 'Die Besprechungsanfrage',
          title: 'Die Angaben zusammenführen, bevor die Vorbereitung beginnt.',
          body: 'Mitarbeitende starten im Conference Manager und beschreiben ihre Besprechung. Ihr Office- oder Konferenzteam erhält die Angaben in einer Anfrage und sieht, was noch geklärt werden muss.',
          points: [
            {
              title: 'Gäste und Teilnehmende',
              body: 'Teilnehmerzahl, Angaben zu Gästen und Anforderungen für den Besuch erfassen.',
            },
            {
              title: 'Raum und Technik',
              body: 'Raum, Bildschirm, Videokonferenz und weitere Anforderungen an die Vorbereitung ergänzen. Ihr vorhandenes Raumbuchungssystem übernimmt die Reservierung.',
            },
            {
              title: 'Catering',
              body: 'Verpflegung mit Mengen und Ernährungsanforderungen direkt zur Besprechung auswählen.',
            },
            {
              title: 'Bearbeitungsstand',
              body: 'Die Anfrage und ihren aktuellen Stand zusammenhalten – vom Einreichen bis zur Vorbereitung.',
            },
          ],
        },
        {
          eyebrow: 'Catering',
          title: 'Auswählen, was gebraucht wird. Mit der passenden Menge.',
          body: 'Lösen Sie separate Excel-Listen und Cateringformulare durch einen Katalog in der Besprechungsanfrage ab. Mitarbeitende wählen einzelne Artikel mit Mengen und Preisen oder ein vordefiniertes Paket, beispielsweise eine Kaffeepause pro Person.',
          points: [
            {
              title: 'Ihr Team pflegt das Angebot',
              body: 'Ihr Office- oder Konferenzteam pflegt Artikel, Pakete und Preise. Ein Import aus dem Katalog des Caterers setzt eine bestätigte Anbindung voraus.',
            },
            {
              title: 'Rückmeldungen bleiben bei der Besprechung',
              body: 'Ihr Office-Team versendet die Bestellung per E-Mail und erfasst die Antwort des Caterers im Conference Manager. Zusätzliche Zugänge oder einen automatischen Austausch prüfen wir gesondert.',
            },
          ],
        },
        {
          eyebrow: 'Änderungen',
          title: 'Erkennen, was vereinbart ist und was sich ändern soll.',
          body: 'Auch eine bestätigte Besprechung kann sich ändern. Unterstützte Änderungen bleiben mit der Anfrage verbunden. Ihr Team sieht, was vorgeschlagen wird und welche Entscheidung noch aussteht.',
          points: [
            {
              title: 'Mehr Teilnehmende und mehr Catering',
              body: 'Ein Workshop wächst beispielsweise von 12 auf 18 Personen. Zusätzlich werden sechs weitere Cateringportionen angefragt. Die geänderte Menge wird zur Prüfung vorgelegt.',
            },
            {
              title: 'Regeln bei der Einrichtung abstimmen',
              body: 'Die unterstützten Freigabeschritte und Fristen stimmen wir für Ihre Kundenumgebung ab. Pavurel übernimmt mögliche Anpassungen auf Ihren Wunsch.',
            },
          ],
          statement:
            'Änderung, Auswirkungen und nächste Entscheidung gehören zur selben Besprechung.',
        },
        {
          eyebrow: 'Ihre vorhandenen Systeme',
          title: 'Die Organisation rund um Ihre Raumbuchung verbinden.',
          body: 'Ihr Raumbuchungssystem bleibt für Reservierungen zuständig. Conference Manager führt Anfrage, Catering und Vorbereitung darum herum zusammen. Die unterstützten Anbindungen klären wir vor der Einrichtung.',
          points: [
            {
              title: 'Unternehmensanmeldung nutzen',
              body: 'Nutzen Sie nach Einrichtung und Freigabe Ihres Unternehmens Ihr Microsoft-Konto. Zugriffe und Rollen stimmen wir für Ihre Umgebung ab.',
            },
            {
              title: 'Gästemanagement optional anbinden',
              body: 'Wenn Sie Gästeanmeldung oder Ankunftsstatus aus einem vorhandenen Besuchersystem einbeziehen möchten, prüfen wir Machbarkeit und Umfang gesondert.',
            },
          ],
        },
      ],
      closing: {
        eyebrow: 'Ihren Ablauf kennenlernen',
        title: 'Wie würde Ihre nächste Besprechung aussehen?',
        body: 'Bringen Sie einen typischen Termin mit in die Demo. Wir besprechen die benötigten Angaben, Ihre bestehenden Systeme und eine passende Einrichtung.',
        primaryCta: 'Demo anfragen',
        secondaryCta: 'So funktioniert es',
      },
    },
    'how-it-works': {
      example: {
        eyebrow: 'Eine Besprechung erkunden',
        title: 'Ein Kundenworkshop. Drei Schritte.',
        body: 'Begleiten Sie dieselbe Besprechung von der ersten Anfrage über die Abstimmung bis zu einer geänderten Teilnehmerzahl und Cateringmenge.',
      },
      sections: [
        {
          eyebrow: '01 · Anfrage',
          title: 'Mitarbeitende beschreiben die Besprechung.',
          body: 'Starten Sie im Conference Manager mit Datum, Uhrzeit und Teilnehmenden. Ergänzen Sie Gästeangaben, Catering und Technik in derselben Anfrage. Das bestehende Raumbuchungssystem bleibt über eine vereinbarte, unterstützte Anbindung für die Reservierung zuständig.',
          points: [
            {
              title: 'Die Angaben liegen zur Prüfung vor',
              body: 'Das Office- oder Konferenzteam kann eine gemeinsame Anfrage prüfen und fehlende Informationen erkennen.',
            },
          ],
        },
        {
          eyebrow: '02 · Abstimmung',
          title: 'Das Konferenzteam bereitet die Besprechung vor.',
          body: 'Das Team prüft die Anforderungen, stimmt das Catering ab und behält offene Rückmeldungen im Blick. Antwortet der Caterer per E-Mail, hält das Office-Team die Rückmeldung im Conference Manager fest.',
          points: [
            {
              title: 'Zuständigkeiten gemeinsam klären',
              body: 'Wie Empfang, Technik und Raumvorbereitung mitwirken, besprechen wir bei der Einrichtung. Ihre Beteiligung richtet sich nach dem vereinbarten Umfang.',
            },
          ],
        },
        {
          eyebrow: '03 · Änderung',
          title: 'Eine Änderung bleibt bei der Besprechung.',
          body: 'Im Beispiel wächst der Workshop von 12 auf 18 Personen. Zugleich wird mehr Catering angefragt. Das Konferenzteam kann die neue Menge und ihre Auswirkungen auf Leistungen und Kosten prüfen.',
          points: [
            {
              title: 'Die Entscheidung bleibt nachvollziehbar',
              body: 'Unterstützte Änderungen und ihr Bearbeitungsstand bleiben mit der Besprechung verbunden. Die geltenden Freigabeschritte und Fristen stimmen wir bei der Einrichtung ab.',
            },
          ],
        },
      ],
      closing: {
        eyebrow: 'Vom Beispiel in Ihren Alltag',
        title: 'Gehen wir eine Ihrer Besprechungen gemeinsam durch.',
        body: 'Zeigen Sie uns, welche Angaben heute fehlen, wer mitarbeitet und wie Änderungen ankommen. Wir besprechen, wie Conference Manager in diesen Ablauf passt.',
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
