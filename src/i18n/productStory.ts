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
          ],
        },
        {
          eyebrow: 'Changes',
          title: 'Keep the agreed request and the proposed change clear.',
          body: 'A meeting can change after it has been confirmed. Supported changes remain connected to the request, so your team can see what is being proposed and which decision is outstanding.',
          points: [
            {
              title: 'Rules agreed during setup',
              body: 'We agree on the supported approval steps and deadlines for your customer environment. Pavurel handles possible adjustments on request.',
            },
          ],
        },
      ],
      closing: {
        eyebrow: 'Explore further',
        title: 'Follow the process or review your connections.',
        body: 'See who takes the next step, or explore how existing room booking, sign-in and suppliers fit the agreed setup.',
        primaryCta: 'See how it works',
        secondaryCta: 'Explore integrations',
      },
    },
    'how-it-works': {
      sections: [
        {
          eyebrow: '01 · Request',
          title: 'The employee describes the meeting.',
          body: 'The person organising the meeting provides its date, time, attendees and service requirements in Conference Manager. The existing room-booking system remains responsible for the reservation through an agreed, supported connection.',
          points: [
            {
              title: 'Hand over to the conference team',
              body: 'The submitted request gives the office or conference team a shared starting point for checking requirements and identifying missing information.',
            },
          ],
        },
        {
          eyebrow: '02 · Coordination',
          title: 'The conference team prepares the meeting.',
          body: 'The team checks the requirements and follows up on catering and equipment replies. Outstanding points remain linked to the meeting.',
          points: [
            {
              title: 'Responsibilities are agreed together',
              body: 'Central coordination or direct involvement of reception, equipment and room-preparation teams is agreed during setup. The available collaboration follows that scope.',
            },
          ],
        },
        {
          eyebrow: '03 · Change',
          title: 'A change stays with the meeting.',
          body: 'When a supported change is requested after confirmation, the conference team can review what has changed and its effect on services and costs. Specify revised catering quantities as part of the change.',
          points: [
            {
              title: 'The decision remains visible',
              body: 'Supported changes and their processing stage remain connected to the meeting. Applicable approval steps and deadlines are agreed during setup.',
            },
          ],
        },
      ],
      closing: {
        eyebrow: 'See the process in context',
        title: 'Explore an example and the roles involved.',
        body: 'Follow one workshop through its changing requirements, or see the responsibilities of each participating team.',
        primaryCta: 'Explore the meeting example',
        secondaryCta: 'See team responsibilities',
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
          ],
        },
        {
          eyebrow: 'Änderungen',
          title: 'Erkennen, was vereinbart ist und was sich ändern soll.',
          body: 'Auch eine bestätigte Besprechung kann sich ändern. Unterstützte Änderungen bleiben mit der Anfrage verbunden. Ihr Team sieht, was vorgeschlagen wird und welche Entscheidung noch aussteht.',
          points: [
            {
              title: 'Regeln bei der Einrichtung abstimmen',
              body: 'Die unterstützten Freigabeschritte und Fristen stimmen wir für Ihre Kundenumgebung ab. Pavurel übernimmt mögliche Anpassungen auf Ihren Wunsch.',
            },
          ],
        },
      ],
      closing: {
        eyebrow: 'Mehr erfahren',
        title: 'Den Ablauf oder Ihre Anbindungen kennenlernen.',
        body: 'Erfahren Sie, wer den nächsten Schritt übernimmt und wie vorhandene Raumbuchung, Anmeldung und Caterer in die vereinbarte Einrichtung passen.',
        primaryCta: 'So funktioniert es',
        secondaryCta: 'Integrationen ansehen',
      },
    },
    'how-it-works': {
      sections: [
        {
          eyebrow: '01 · Anfrage',
          title: 'Mitarbeitende beschreiben die Besprechung.',
          body: 'Die organisierende Person erfasst Datum, Uhrzeit, Teilnehmende und benötigte Leistungen im Conference Manager. Das bestehende Raumbuchungssystem bleibt über eine vereinbarte, unterstützte Anbindung für die Reservierung zuständig.',
          points: [
            {
              title: 'Übergabe an das Konferenzteam',
              body: 'Die eingereichte Anfrage gibt dem Office- oder Konferenzteam eine gemeinsame Grundlage, um Anforderungen zu prüfen und fehlende Angaben zu erkennen.',
            },
          ],
        },
        {
          eyebrow: '02 · Abstimmung',
          title: 'Das Konferenzteam bereitet die Besprechung vor.',
          body: 'Das Team prüft die Anforderungen und klärt ausstehende Rückmeldungen zu Catering und Technik. Offene Punkte bleiben der jeweiligen Besprechung zugeordnet.',
          points: [
            {
              title: 'Zuständigkeiten gemeinsam klären',
              body: 'Zentrale Koordination oder direkte Beteiligung von Empfang, Technik und Raumvorbereitung werden bei der Einrichtung vereinbart. Der Umfang bestimmt die verfügbare Zusammenarbeit.',
            },
          ],
        },
        {
          eyebrow: '03 · Änderung',
          title: 'Eine Änderung bleibt bei der Besprechung.',
          body: 'Wird nach der Bestätigung eine unterstützte Änderung angefragt, kann das Konferenzteam den neuen Bedarf und seine Auswirkungen auf Leistungen und Kosten prüfen. Geänderte Cateringmengen geben Sie dabei gesondert an.',
          points: [
            {
              title: 'Die Entscheidung bleibt nachvollziehbar',
              body: 'Unterstützte Änderungen und ihr Bearbeitungsstand bleiben mit der Besprechung verbunden. Die geltenden Freigabeschritte und Fristen stimmen wir bei der Einrichtung ab.',
            },
          ],
        },
      ],
      closing: {
        eyebrow: 'Den Ablauf einordnen',
        title: 'Ein Beispiel und die beteiligten Rollen kennenlernen.',
        body: 'Begleiten Sie einen Workshop mit geänderten Anforderungen oder sehen Sie sich die Aufgaben der beteiligten Teams an.',
        primaryCta: 'Besprechungsbeispiel erkunden',
        secondaryCta: 'Aufgaben der Teams ansehen',
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
