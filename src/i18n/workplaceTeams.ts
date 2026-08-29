import type { Locale } from '@config/locales';

type WorkplaceTeamPoint = {
  title: string;
  body: string;
};

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
        eyebrow: 'One conference context',
        title: 'Receive more than a room request.',
        body: 'The current Conference Manager experience keeps date and time, room context, services, catering, cost allocation and review decisions connected to the same conference request. Workplace Teams can work from that context instead of treating each requirement as an unrelated request.',
        points: [
          {
            title: 'Services and catering',
            body: 'Service requirements, catering choices, participant counts and dietary requirements remain attached to the conference context.',
          },
          {
            title: 'Review before processing',
            body: 'Cost allocation and the final review are explicit steps before the employee request moves forward.',
          },
        ],
      },
      {
        eyebrow: 'Operational view',
        title: 'Keep employee simplicity separate from management work.',
        body: 'The requester sees a guided conference journey. Conference Manager provides separate management views for bookings, room planning, reporting and master-data administration, so operational detail does not have to become part of the employee interface.',
        statement: 'Simple for the requester. Structured for the team preparing the conference.',
      },
      {
        eyebrow: 'Controlled change',
        title: 'Keep changes visible instead of silently rewriting the request.',
        body: 'The implemented request lifecycle includes confirmation, change requests, resubmission, rejection and cancellation. Confirmed room, schedule and participant changes follow a managed proposal and approval flow in the current product implementation.',
        points: [
          {
            title: 'Original context stays understandable',
            body: 'A change is handled as a deliberate lifecycle event rather than an invisible edit to a confirmed request.',
          },
          {
            title: 'Decision remains explicit',
            body: 'Pending post-confirmation changes are exposed for Conference Manager decision instead of being applied as uncontrolled client-side changes.',
          },
        ],
      },
      {
        eyebrow: 'System boundary',
        title: 'Do not turn conference management into a room-booking replacement project.',
        body: 'Conference Manager is positioned around the conference context. The organisation’s room-booking capability remains responsible for the reservation itself. This keeps the product focused on the coordination around the conference rather than duplicating specialist booking infrastructure.',
        statement: 'Keep your room booking. Replace the coordination around it.',
      },
    ],
    closing: {
      eyebrow: 'Bring a real conference',
      title: 'Map the work your team handles after the room is chosen.',
      body: 'A useful evaluation starts with one real conference journey: which information your team needs, where it arrives today, what changes during preparation and which systems should remain authoritative.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore the product',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Ein Konferenzkontext',
        title: 'Erhalte mehr als nur eine Raumanfrage.',
        body: 'Die aktuelle Conference-Manager-Erfahrung hält Datum und Zeit, Raumkontext, Services, Catering, Kostenverteilung und Prüfentscheidungen in derselben Konferenzanfrage zusammen. Workplace Teams können mit diesem Kontext arbeiten, statt jede Anforderung als getrennten Request zu behandeln.',
        points: [
          {
            title: 'Services und Catering',
            body: 'Service-Anforderungen, Catering-Auswahl, Teilnehmerzahlen und Ernährungsanforderungen bleiben mit dem Konferenzkontext verbunden.',
          },
          {
            title: 'Prüfung vor der Bearbeitung',
            body: 'Kostenverteilung und abschließende Prüfung sind explizite Schritte, bevor die Employee-Anfrage weitergeht.',
          },
        ],
      },
      {
        eyebrow: 'Operative Sicht',
        title: 'Trenne eine einfache Employee Journey von der Managementarbeit.',
        body: 'Die anfragende Person sieht einen geführten Konferenzablauf. Conference Manager stellt getrennte Management-Ansichten für Buchungen, Raumplanung, Reporting und Stammdatenadministration bereit, damit operative Details nicht Teil der Employee-Oberfläche werden müssen.',
        statement: 'Einfach für die anfragende Person. Strukturiert für das Team, das die Konferenz vorbereitet.',
      },
      {
        eyebrow: 'Kontrollierte Änderung',
        title: 'Halte Änderungen sichtbar, statt die Anfrage still zu überschreiben.',
        body: 'Der implementierte Request-Lifecycle umfasst Bestätigung, Änderungsanträge, erneutes Einreichen, Ablehnung und Stornierung. Bestätigte Raum-, Termin- und Teilnehmeränderungen laufen im aktuellen Produktstand über einen verwalteten Vorschlags- und Freigabeprozess.',
        points: [
          {
            title: 'Der ursprüngliche Kontext bleibt verständlich',
            body: 'Eine Änderung wird als bewusster Lifecycle-Schritt behandelt und nicht als unsichtbare Bearbeitung einer bestätigten Anfrage.',
          },
          {
            title: 'Die Entscheidung bleibt explizit',
            body: 'Offene Änderungen nach der Bestätigung werden zur Conference-Manager-Entscheidung vorgelegt, statt unkontrolliert im Browser angewendet zu werden.',
          },
        ],
      },
      {
        eyebrow: 'Systemgrenze',
        title: 'Mache aus Konferenzmanagement kein Raumbuchungs-Austauschprojekt.',
        body: 'Conference Manager ist rund um den Konferenzkontext positioniert. Die Raumbuchung des Unternehmens bleibt für die eigentliche Reservierung verantwortlich. Damit bleibt der Fokus auf der Koordination rund um die Konferenz, statt spezialisierte Buchungsinfrastruktur zu duplizieren.',
        statement: 'Behalte deine Raumbuchung. Ersetze die Koordination darum herum.',
      },
    ],
    closing: {
      eyebrow: 'Nimm eine reale Konferenz',
      title: 'Ordne die Arbeit, die nach der Raumentscheidung bei deinem Team landet.',
      body: 'Eine sinnvolle Bewertung beginnt mit einem realen Konferenzablauf: Welche Informationen braucht dein Team, wo kommen sie heute an, was ändert sich während der Vorbereitung und welche Systeme sollen maßgeblich bleiben?',
      primaryCta: 'Demo buchen',
      secondaryCta: 'Produkt ansehen',
    },
  },
};

export function getWorkplaceTeamsCopy(locale: Locale): WorkplaceTeamsCopy {
  return workplaceTeamsCopy[locale];
}
