import type { Locale } from '@config/locales';

type WorkplaceTeamPoint = { title: string; body: string };
type WorkplaceTeamSection = {
  eyebrow: string;
  title: string;
  body: string;
  points?: readonly WorkplaceTeamPoint[];
  statement?: string;
};
type WorkplaceTeamsCopy = {
  sections: readonly WorkplaceTeamSection[];
  closing: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

const workplaceTeamsCopy: Record<Locale, WorkplaceTeamsCopy> = {
  en: {
    sections: [
      {
        eyebrow: 'Office and conference teams',
        title: 'Prepare the meeting from one shared request.',
        body: 'Guest details, catering choices, equipment requirements and changes arrive in the same place. Your team can review the request, clarify missing information and keep the current processing stage in view.',
        points: [
          {
            title: 'Coordinate catering',
            body: 'Maintain the catalogue of items, packages and prices. Send orders by email and record the supplier’s response with the meeting.',
          },
          {
            title: 'Review changes',
            body: 'See supported changes and outstanding decisions together. Approval steps and deadlines are agreed for your setup.',
          },
        ],
      },
      {
        eyebrow: 'Employees',
        title: 'Describe what you need for the meeting.',
        body: 'Start in Conference Manager and add the attendees, guests, catering and equipment. The guided request brings these details together and lets you follow its processing stage.',
        points: [
          {
            title: 'Choose catering as you plan',
            body: 'Select individual items with quantities and prices, or a package such as a coffee break per person.',
          },
          {
            title: 'Keep changes with the request',
            body: 'Submit supported changes in the meeting itself so the responsible team can review them in context.',
          },
        ],
        statement: 'One starting point for the information the preparation team needs.',
      },
      {
        eyebrow: 'Reception, equipment and room preparation',
        title: 'Agree on who handles each part.',
        body: 'A prepared room often involves several teams. During setup, we clarify what the conference team coordinates centrally and how other service teams participate. The agreed scope determines the available collaboration.',
        points: [
          {
            title: 'Reception',
            body: 'Clarify which guest details are needed for the visit. A connection to an existing visitor system is assessed separately.',
          },
          {
            title: 'Equipment and room preparation',
            body: 'Include requirements such as a display, video conferencing or room preparation in the request. Agree on how these teams receive and handle the work.',
          },
          {
            title: 'Catering suppliers',
            body: 'Keep email coordination and recorded replies clear. An additional supplier login, link or software connection requires a separate availability assessment.',
          },
        ],
      },
      {
        eyebrow: 'IT and customer administration',
        title: 'Build on the systems your company already uses.',
        body: 'Your existing room-booking system remains responsible for reservations. Microsoft work accounts can be used after the required setup and company approval. We agree on access, roles and supported connections before your team starts.',
        points: [
          {
            title: 'Access for the right people',
            body: 'Your company identifies who submits requests, who handles them and who administers the customer environment. Requirements for mapping company groups are assessed separately.',
          },
          {
            title: 'Adjustments with Pavurel',
            body: 'Pavurel handles agreed setup changes on request. We confirm which deadline and approval-rule adjustments are supported for your process.',
          },
        ],
      },
    ],
    closing: {
      eyebrow: 'Start with your team',
      title: 'Where does coordination take the most effort today?',
      body: 'Bring a meeting your team knows well. Together, we look at the information, people and systems involved, then discuss a suitable setup.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore the product',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Office- und Konferenzteams',
        title: 'Die Besprechung aus einer gemeinsamen Anfrage vorbereiten.',
        body: 'Gästeangaben, Cateringwünsche, Technikbedarf und Änderungen kommen an einem Ort zusammen. Ihr Team kann die Anfrage prüfen, fehlende Informationen klären und den aktuellen Bearbeitungsstand im Blick behalten.',
        points: [
          {
            title: 'Catering koordinieren',
            body: 'Artikel, Pakete und Preise im Katalog pflegen. Bestellungen per E-Mail versenden und die Antwort des Caterers bei der Besprechung festhalten.',
          },
          {
            title: 'Änderungen prüfen',
            body: 'Unterstützte Änderungen und offene Entscheidungen zusammen sehen. Freigabeschritte und Fristen werden für Ihre Einrichtung abgestimmt.',
          },
        ],
      },
      {
        eyebrow: 'Mitarbeitende',
        title: 'Beschreiben, was für die Besprechung gebraucht wird.',
        body: 'Starten Sie im Conference Manager und ergänzen Sie Teilnehmende, Gäste, Catering und Technik. Die geführte Anfrage hält diese Angaben zusammen. Den Bearbeitungsstand können Sie bei der Anfrage verfolgen.',
        points: [
          {
            title: 'Catering direkt auswählen',
            body: 'Einzelne Artikel mit Mengen und Preisen oder ein Paket wählen, beispielsweise eine Kaffeepause pro Person.',
          },
          {
            title: 'Änderungen bei der Anfrage halten',
            body: 'Unterstützte Änderungen direkt zur Besprechung einreichen, damit das verantwortliche Team sie im Zusammenhang prüfen kann.',
          },
        ],
        statement: 'Ein Einstieg für die Angaben, die das vorbereitende Team braucht.',
      },
      {
        eyebrow: 'Empfang, Technik und Raumvorbereitung',
        title: 'Gemeinsam festlegen, wer sich worum kümmert.',
        body: 'An einer vorbereiteten Besprechung arbeiten oft mehrere Teams mit. Bei der Einrichtung klären wir, was das Konferenzteam zentral koordiniert und wie weitere Service-Teams mitwirken. Der vereinbarte Umfang bestimmt die verfügbare Zusammenarbeit.',
        points: [
          {
            title: 'Empfang',
            body: 'Klären, welche Gästeangaben für den Besuch gebraucht werden. Eine Verbindung zum vorhandenen Gästemanagement wird gesondert geprüft.',
          },
          {
            title: 'Technik und Raumvorbereitung',
            body: 'Bildschirm, Videokonferenz oder Anforderungen an den Raum in der Anfrage festhalten. Gemeinsam abstimmen, wie diese Teams die Aufgaben erhalten und bearbeiten.',
          },
          {
            title: 'Caterer',
            body: 'Abstimmung per E-Mail und erfasste Rückmeldungen zusammenhalten. Ein zusätzlicher Zugang, Link oder eine Softwareanbindung setzt eine gesonderte Prüfung der Verfügbarkeit voraus.',
          },
        ],
      },
      {
        eyebrow: 'IT und Kundenadministration',
        title: 'Auf den vorhandenen Systemen aufbauen.',
        body: 'Ihre bestehende Raumbuchung bleibt für Reservierungen zuständig. Microsoft-Unternehmenskonten können nach Einrichtung und Freigabe genutzt werden. Zugriffe, Rollen und unterstützte Anbindungen stimmen wir vor dem Start Ihres Teams ab.',
        points: [
          {
            title: 'Zugang für die richtigen Personen',
            body: 'Ihr Unternehmen legt fest, wer Anfragen stellt, wer sie bearbeitet und wer die Kundenumgebung verwaltet. Anforderungen an die Zuordnung von Unternehmensgruppen prüfen wir gesondert.',
          },
          {
            title: 'Anpassungen mit Pavurel',
            body: 'Pavurel übernimmt Änderungen der vereinbarten Einrichtung auf Wunsch. Welche Anpassungen an Fristen und Freigaben unterstützt werden, stimmen wir für Ihren Ablauf ab.',
          },
        ],
      },
    ],
    closing: {
      eyebrow: 'Mit Ihrem Team starten',
      title: 'Wo kostet die Abstimmung heute die meiste Mühe?',
      body: 'Bringen Sie eine Besprechung mit, die Ihr Team gut kennt. Gemeinsam betrachten wir die benötigten Angaben, beteiligten Personen und vorhandenen Systeme und besprechen eine passende Einrichtung.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'Produkt ansehen',
    },
  },
};

export function getWorkplaceTeamsCopy(locale: Locale): WorkplaceTeamsCopy {
  return workplaceTeamsCopy[locale];
}
