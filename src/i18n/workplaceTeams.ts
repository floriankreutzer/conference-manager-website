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
        eyebrow: 'One conference context',
        title: 'Receive the information behind the room request.',
        body: 'Conference Manager keeps date and time, room context, services, catering, cost allocation and review decisions attached to the same conference. Workplace Teams can prepare from one context instead of reconstructing the request from separate hand-offs.',
        points: [
          {
            title: 'Services and catering',
            body: 'Keep service requirements, catering choices, participant counts and dietary needs connected to the conference.',
          },
          {
            title: 'Review before processing',
            body: 'Make cost allocation and the final request review explicit before operational work moves forward.',
          },
        ],
      },
      {
        eyebrow: 'Operational visibility',
        title: 'Keep employee simplicity separate from the work behind the experience.',
        body: 'The requester sees a guided conference journey. Workplace Teams get separate views for bookings, room planning, reporting and administration, so operational detail can stay available without becoming part of the employee interface.',
        statement: 'Simple for the requester. Structured for the team preparing the conference.',
      },
      {
        eyebrow: 'Controlled change',
        title: 'Make changes visible after confirmation.',
        body: 'The request lifecycle supports confirmation, change requests, resubmission, rejection and cancellation. Supported room, schedule and participant changes after confirmation follow a managed decision flow rather than disappearing into informal edits.',
        points: [
          {
            title: 'Keep the original context understandable',
            body: 'Treat a change as a deliberate lifecycle event instead of an invisible edit to a confirmed request.',
          },
          {
            title: 'Keep decisions explicit',
            body: 'Pending changes remain visible for the responsible Conference Manager decision before they become part of the confirmed context.',
          },
        ],
      },
      {
        eyebrow: 'Existing-system fit',
        title:
          'Improve the conference operation without creating a room-booking replacement project.',
        body: 'Conference Manager is focused on the conference context. Your room-booking capability remains responsible for the reservation itself, while Conference Manager structures the coordination around it.',
        statement: 'Keep your room booking. Replace the coordination around it.',
      },
    ],
    closing: {
      eyebrow: 'Bring a real conference',
      title: 'Map what your team handles after the room is chosen.',
      body: 'A useful evaluation starts with one real journey: what information your team needs, where it arrives today, what changes during preparation and which specialist systems should remain authoritative.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore the product',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Ein Konferenzkontext',
        title: 'Erhalten Sie die Informationen hinter der Raumanfrage.',
        body: 'Conference Manager hält Datum und Zeit, Raumkontext, Services, Catering, Kostenverteilung und Prüfentscheidungen an derselben Konferenz. Workplace Teams können aus einem zusammenhängenden Kontext vorbereiten, statt die Anfrage aus einzelnen Übergaben rekonstruieren zu müssen.',
        points: [
          {
            title: 'Services und Catering',
            body: 'Halten Sie Service-Anforderungen, Catering-Auswahl, Teilnehmerzahlen und Ernährungsanforderungen direkt an der Konferenz.',
          },
          {
            title: 'Prüfung vor der Bearbeitung',
            body: 'Machen Sie Kostenverteilung und abschließende Prüfung sichtbar, bevor die operative Bearbeitung weitergeht.',
          },
        ],
      },
      {
        eyebrow: 'Operative Transparenz',
        title: 'Trennen Sie eine einfache Anfrage von der Arbeit hinter dem Erlebnis.',
        body: 'Die anfragende Person sieht einen geführten Konferenzablauf. Workplace Teams erhalten getrennte Sichten für Buchungen, Raumplanung, Reporting und Administration. Operative Details bleiben verfügbar, ohne die Employee Experience zu überladen.',
        statement:
          'Einfach für die anfragende Person. Strukturiert für das Team, das die Konferenz vorbereitet.',
      },
      {
        eyebrow: 'Kontrollierte Änderungen',
        title: 'Machen Sie Änderungen auch nach der Bestätigung sichtbar.',
        body: 'Der Anfrage-Lebenszyklus unterstützt Bestätigung, Änderungsanträge, erneutes Einreichen, Ablehnung und Stornierung. Unterstützte Raum-, Termin- und Teilnehmeränderungen nach einer Bestätigung folgen einem gesteuerten Entscheidungsablauf statt informellen Bearbeitungen.',
        points: [
          {
            title: 'Ursprünglichen Kontext erhalten',
            body: 'Behandeln Sie eine Änderung als bewussten Lebenszyklus-Schritt und nicht als unsichtbare Bearbeitung einer bestätigten Anfrage.',
          },
          {
            title: 'Entscheidungen explizit halten',
            body: 'Offene Änderungen bleiben für die verantwortliche Entscheidung sichtbar, bevor sie Teil des bestätigten Kontexts werden.',
          },
        ],
      },
      {
        eyebrow: 'Bestehende Systeme nutzen',
        title:
          'Verbessern Sie den Konferenzbetrieb, ohne ein Austauschprojekt für die Raumbuchung zu starten.',
        body: 'Conference Manager konzentriert sich auf den Konferenzkontext. Ihre Raumbuchung bleibt für die eigentliche Reservierung verantwortlich; Conference Manager strukturiert die Koordination darum herum.',
        statement: 'Behalten Sie Ihre Raumbuchung. Strukturieren Sie die Koordination darum herum.',
      },
    ],
    closing: {
      eyebrow: 'Eine reale Konferenz als Ausgangspunkt',
      title: 'Ordnen Sie die Arbeit, die nach der Raumentscheidung bei Ihrem Team landet.',
      body: 'Eine sinnvolle Evaluierung beginnt mit einem realen Ablauf: Welche Informationen braucht Ihr Team, wo kommen sie heute an, was ändert sich während der Vorbereitung und welche spezialisierten Systeme sollen führend bleiben?',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'Produkt ansehen',
    },
  },
};

export function getWorkplaceTeamsCopy(locale: Locale): WorkplaceTeamsCopy {
  return workplaceTeamsCopy[locale];
}
