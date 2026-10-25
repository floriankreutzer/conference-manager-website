import type { Locale } from '@config/locales';

type MeetingExampleStep = {
  id: 'request' | 'coordination' | 'change';
  tab: string;
  title: string;
  introduction: string;
  outcome: string;
  status: string;
  participants: number;
  previousParticipants?: number;
  participantsNote: string;
  roomNote: string;
  catering: string;
  previousCatering?: string;
  cateringNote: string;
  equipmentNote: string;
  responsibility: string;
};

type MeetingExampleCopy = {
  disclosure: string;
  exampleLabel: string;
  controlsLabel: string;
  meetingName: string;
  dateLabel: string;
  timeLabel: string;
  statusLabel: string;
  participantsLabel: string;
  previousLabel: string;
  updatedLabel: string;
  roomLabel: string;
  room: string;
  cateringLabel: string;
  equipmentLabel: string;
  equipment: string;
  responsibilityLabel: string;
  steps: readonly MeetingExampleStep[];
};

const copy: Record<Locale, MeetingExampleCopy> = {
  en: {
    disclosure: 'Illustrative workflow example. Not a live product view.',
    exampleLabel: 'One meeting, from request to change',
    controlsLabel: 'Explore the three stages of the example meeting',
    meetingName: 'Customer workshop',
    dateLabel: 'Date',
    timeLabel: 'Time',
    statusLabel: 'Stage',
    participantsLabel: 'Attendees',
    previousLabel: 'Previously',
    updatedLabel: 'Requested',
    roomLabel: 'Room',
    room: 'Forum meeting room',
    cateringLabel: 'Catering',
    equipmentLabel: 'Equipment',
    equipment: 'Display and video conferencing',
    responsibilityLabel: 'Conference team',
    steps: [
      {
        id: 'request',
        tab: 'Request',
        title: 'Start with the information your team needs.',
        introduction:
          'A customer workshop is coming up. The employee brings guests, catering and equipment requirements together in one request.',
        outcome: 'The conference team has a shared starting point for preparation.',
        status: 'Request submitted',
        participants: 12,
        participantsNote: 'Including 4 external guests.',
        roomNote: 'The existing room-booking system handles the reservation.',
        catering: 'Coffee-break package for 12',
        cateringNote: 'Coffee, tea and pastries; vegetarian options requested.',
        equipmentNote: 'Connection and audio requirements are included.',
        responsibility: 'Reviews the request and clarifies any open requirements.',
      },
      {
        id: 'coordination',
        tab: 'Coordination',
        title: 'See what is agreed and what is still open.',
        introduction:
          'The conference team reviews the same workshop. Catering replies and equipment requirements stay with the meeting.',
        outcome: 'Open points remain visible in the context of the request.',
        status: 'In coordination',
        participants: 12,
        participantsNote: 'Guest details are available for preparation.',
        roomNote: 'Room context checked by the conference team.',
        catering: 'Coffee-break package for 12',
        cateringNote: 'Caterer reply pending; the conference team records the response.',
        equipmentNote: 'Audio check still to be clarified.',
        responsibility: 'Keeps track of replies and the next preparation steps.',
      },
      {
        id: 'change',
        tab: 'Change',
        title: 'Review the impact of a change together.',
        introduction:
          'The workshop grows from twelve to eighteen attendees. The employee also requests more catering. Both changes stay with the meeting.',
        outcome: 'The updated catering quantity is submitted for conference-team review.',
        status: 'Change awaiting review',
        participants: 18,
        previousParticipants: 12,
        participantsNote: 'The requested attendee count has increased.',
        roomNote: 'Check capacity for 18 and the existing reservation.',
        catering: 'Coffee-break package for 18',
        previousCatering: 'Coffee-break package for 12',
        cateringNote: 'Six additional portions requested; review the resulting cost.',
        equipmentNote: 'Equipment requirements are unchanged.',
        responsibility: 'Reviews the revised catering quantity and its service and cost impact.',
      },
    ],
  },
  de: {
    disclosure: 'Illustratives Ablaufbeispiel. Keine Live-Ansicht.',
    exampleLabel: 'Eine Besprechung, von der Anfrage bis zur Änderung',
    controlsLabel: 'Die drei Schritte der Beispielbesprechung erkunden',
    meetingName: 'Kundenworkshop',
    dateLabel: 'Datum',
    timeLabel: 'Uhrzeit',
    statusLabel: 'Stand',
    participantsLabel: 'Teilnehmende',
    previousLabel: 'Bisher',
    updatedLabel: 'Angefragt',
    roomLabel: 'Raum',
    room: 'Konferenzraum Forum',
    cateringLabel: 'Catering',
    equipmentLabel: 'Technik',
    equipment: 'Bildschirm und Videokonferenz',
    responsibilityLabel: 'Konferenzteam',
    steps: [
      {
        id: 'request',
        tab: 'Anfrage',
        title: 'Mit den Angaben starten, die Ihr Team braucht.',
        introduction:
          'Ein Kundenworkshop steht an. Die anfragende Person erfasst Gäste, Catering und Technikbedarf in einer gemeinsamen Anfrage.',
        outcome: 'Das Konferenzteam hat eine gemeinsame Grundlage für die Vorbereitung.',
        status: 'Anfrage eingereicht',
        participants: 12,
        participantsNote: 'Darunter 4 externe Gäste.',
        roomNote: 'Die Reservierung erfolgt im vorhandenen Raumbuchungssystem.',
        catering: 'Paket Kaffeepause für 12',
        cateringNote: 'Kaffee, Tee und Gebäck; vegetarische Optionen angefragt.',
        equipmentNote: 'Anforderungen an Anschluss und Ton sind erfasst.',
        responsibility: 'Prüft die Anfrage und klärt offene Anforderungen.',
      },
      {
        id: 'coordination',
        tab: 'Abstimmung',
        title: 'Sehen, was geklärt ist und was noch offen bleibt.',
        introduction:
          'Das Konferenzteam prüft denselben Workshop. Catering-Rückmeldungen und Technikbedarf bleiben bei der Besprechung.',
        outcome: 'Offene Punkte bleiben im Zusammenhang mit der Anfrage sichtbar.',
        status: 'In Abstimmung',
        participants: 12,
        participantsNote: 'Gästeangaben liegen für die Vorbereitung vor.',
        roomNote: 'Raumkontext vom Konferenzteam geprüft.',
        catering: 'Paket Kaffeepause für 12',
        cateringNote: 'Caterer-Rückmeldung offen; das Konferenzteam hält die Antwort fest.',
        equipmentNote: 'Tonprüfung noch zu klären.',
        responsibility: 'Behält Rückmeldungen und die nächsten Vorbereitungsschritte im Blick.',
      },
      {
        id: 'change',
        tab: 'Änderung',
        title: 'Die Folgen einer Änderung zusammen prüfen.',
        introduction:
          'Aus zwölf werden achtzehn Teilnehmende. Die anfragende Person erhöht auch die Cateringmenge. Beide Änderungen bleiben bei der Besprechung.',
        outcome: 'Die neue Cateringmenge wird dem Konferenzteam zur Prüfung vorgelegt.',
        status: 'Änderung zur Prüfung',
        participants: 18,
        previousParticipants: 12,
        participantsNote: 'Die angefragte Teilnehmerzahl wurde erhöht.',
        roomNote: 'Kapazität für 18 und die vorhandene Reservierung prüfen.',
        catering: 'Paket Kaffeepause für 18',
        previousCatering: 'Paket Kaffeepause für 12',
        cateringNote: 'Sechs zusätzliche Portionen angefragt; entstehende Kosten prüfen.',
        equipmentNote: 'Der Technikbedarf bleibt unverändert.',
        responsibility: 'Prüft die neue Cateringmenge sowie die Folgen für Leistungen und Kosten.',
      },
    ],
  },
};

const start = new Date('2026-11-12T09:00:00+01:00');
const end = new Date('2026-11-12T12:00:00+01:00');

export function getMeetingExampleCopy(locale: Locale) {
  const formatLocale = locale === 'de' ? 'de-DE' : 'en-GB';
  const numberFormat = new Intl.NumberFormat(formatLocale);
  const timeFormat = new Intl.DateTimeFormat(formatLocale, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Berlin',
  });

  return {
    ...copy[locale],
    dateTime: start.toISOString(),
    date: new Intl.DateTimeFormat(formatLocale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Europe/Berlin',
    }).format(start),
    time: timeFormat.formatRange(start, end),
    steps: copy[locale].steps.map((step) => ({
      ...step,
      participantCount: numberFormat.format(step.participants),
      previousParticipantCount:
        step.previousParticipants === undefined
          ? undefined
          : numberFormat.format(step.previousParticipants),
    })),
  };
}
