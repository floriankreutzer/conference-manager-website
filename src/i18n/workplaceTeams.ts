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
        title: 'Receive the information your team needs to prepare the conference.',
        body: 'Conference Manager keeps date and time, room context, services, catering, cost allocation and review decisions with the same conference. Workplace Teams can prepare from one coherent request instead of reconstructing the picture from separate hand-offs.',
        points: [
          {
            title: 'Services and catering',
            body: 'Keep service requirements, catering choices, participant counts and dietary needs connected to the conference.',
          },
          {
            title: 'Review before work starts',
            body: 'Make cost allocation and the final request review visible before operational preparation moves forward.',
          },
        ],
      },
      {
        eyebrow: 'Operational visibility',
        title: 'Keep the employee journey simple without losing the detail behind it.',
        body: 'The requester follows a guided conference journey. Workplace Teams get the booking, room-planning, reporting and administration views needed for their work, so operational detail stays available without becoming part of the employee interface.',
        statement: 'Simple for the requester. Structured for the team preparing the conference.',
      },
      {
        eyebrow: 'Controlled change',
        title: 'Know what changed after a conference was confirmed.',
        body: 'When supported room, schedule or participant details change after confirmation, Conference Manager keeps the proposed change and the decision visible. Workplace Teams do not have to rely on an informal message thread to understand what is still agreed and what is waiting for approval.',
        points: [
          {
            title: 'Keep the confirmed context understandable',
            body: 'See the change as a deliberate update to the conference rather than an invisible edit to the original request.',
          },
          {
            title: 'See what still needs a decision',
            body: 'Pending changes remain visible until the responsible Conference Manager accepts or rejects them.',
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
        title: 'Erhalten Sie die Informationen, die Ihr Team für die Vorbereitung benötigt.',
        body: 'Conference Manager hält Datum und Zeit, Raumkontext, Services, Catering, Kostenverteilung und Prüfentscheidungen bei derselben Konferenz. Workplace Teams können aus einer zusammenhängenden Anfrage vorbereiten, statt das Gesamtbild aus einzelnen Übergaben rekonstruieren zu müssen.',
        points: [
          {
            title: 'Services und Catering',
            body: 'Halten Sie Service-Anforderungen, Catering-Auswahl, Teilnehmerzahlen und Ernährungsanforderungen direkt an der Konferenz.',
          },
          {
            title: 'Prüfung vor der Vorbereitung',
            body: 'Machen Sie Kostenverteilung und abschließende Prüfung sichtbar, bevor die operative Vorbereitung weitergeht.',
          },
        ],
      },
      {
        eyebrow: 'Operative Transparenz',
        title: 'Halten Sie die Anfrage einfach, ohne die Details dahinter zu verlieren.',
        body: 'Die anfragende Person folgt einem geführten Konferenzablauf. Workplace Teams erhalten die für ihre Arbeit benötigten Sichten auf Buchungen, Raumplanung, Reporting und Administration. Operative Details bleiben verfügbar, ohne die Employee Experience zu überladen.',
        statement:
          'Einfach für die anfragende Person. Strukturiert für das Team, das die Konferenz vorbereitet.',
      },
      {
        eyebrow: 'Kontrollierte Änderungen',
        title: 'Erkennen Sie, was sich nach einer Bestätigung geändert hat.',
        body: 'Wenn sich unterstützte Raum-, Termin- oder Teilnehmerdetails nach der Bestätigung ändern, hält Conference Manager die vorgeschlagene Änderung und die Entscheidung sichtbar. Workplace Teams müssen nicht aus informellen Nachrichten rekonstruieren, was weiterhin gilt und worüber noch entschieden werden muss.',
        points: [
          {
            title: 'Bestätigten Kontext verständlich halten',
            body: 'Behandeln Sie eine Änderung als bewusste Aktualisierung der Konferenz statt als unsichtbare Bearbeitung der ursprünglichen Anfrage.',
          },
          {
            title: 'Offene Entscheidungen erkennen',
            body: 'Ausstehende Änderungen bleiben sichtbar, bis die verantwortliche Conference-Manager-Rolle sie freigibt oder ablehnt.',
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
