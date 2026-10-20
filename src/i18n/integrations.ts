import type { Locale } from '@config/locales';

type IntegrationPoint = { title: string; body: string };
type IntegrationSection = {
  id: 'rooms' | 'identity' | 'catering' | 'visitors';
  eyebrow: string;
  title: string;
  body: string;
  points: readonly IntegrationPoint[];
  qualification: string;
};
type IntegrationsCopy = {
  overviewTitle: string;
  overviewCta: string;
  visualCaption: string;
  sections: readonly IntegrationSection[];
  preparation: {
    eyebrow: string;
    title: string;
    questions: readonly string[];
  };
  closing: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

const integrationsCopy: Record<Locale, IntegrationsCopy> = {
  en: {
    overviewTitle: 'Connections that fit your working day.',
    overviewCta: 'Explore the connections',
    visualCaption: 'Your rooms. Your team. A shared meeting workflow.',
    sections: [
      {
        id: 'rooms',
        eyebrow: 'Room reservations',
        title: 'Start here. Keep your room booking.',
        body: 'Employees start their request in Conference Manager. Your existing room reservation system remains part of the process where a supported connection is available.',
        points: [
          {
            title: 'Existing Microsoft 365 rooms',
            body: 'Use the room resources your company already manages. We confirm the connection and the calendar functions needed before your pilot begins.',
          },
        ],
        qualification:
          'Room availability and calendar changes require a supported connection and the Microsoft and Exchange permissions your organisation approves.',
      },
      {
        id: 'identity',
        eyebrow: 'Microsoft sign-in',
        title: 'Use your company account.',
        body: 'Employees sign in with their Microsoft work account. We agree on who submits requests, who handles them and who administers your customer environment.',
        points: [
          {
            title: 'Permissions for your team',
            body: 'Your company decides which people need access and which responsibilities they take on. We set up the required roles with you.',
          },
        ],
        qualification:
          'Microsoft sign-in requires setup and your organisation’s approval. Roles are configured for your customer environment before use.',
      },
      {
        id: 'catering',
        eyebrow: 'Catering coordination',
        title: 'Include your catering supplier.',
        body: 'Agree on an order and a clear way to follow up. During setup, we confirm how your office team works with its catering supplier.',
        points: [
          {
            title: 'Email and office-team follow-up',
            body: 'Your office team sends the order by email and records the supplier’s response in Conference Manager. We agree on this working process for your pilot.',
          },
          {
            title: 'Other connections to assess',
            body: 'Catering supplier accounts or confirmation links and direct connections to supplier software are assessed separately. We confirm how orders, confirmations, changes and status updates can be exchanged before agreeing the scope.',
          },
        ],
        qualification:
          'Automatic sending and supplier status updates are agreed only when a suitable connection has been assessed and confirmed as available.',
      },
      {
        id: 'visitors',
        eyebrow: 'Optional visitor connection',
        title: 'Discuss your guest workflow.',
        body: 'Discuss whether your existing visitor system can exchange guest details and return arrival information.',
        points: [
          {
            title: 'Define the desired information',
            body: 'Guest name, company and visit time for reception; arrival or check-in status for the conference team.',
          },
        ],
        qualification:
          'Visitor registration and check-in require a separate feasibility check; they are not automatically included in the pilot.',
      },
    ],
    preparation: {
      eyebrow: 'Before setup',
      title: 'Clarify the requirements with your IT team.',
      questions: [
        'Which room-booking system and Microsoft environment does your company use?',
        'Who approves access and the exchange of meeting information?',
        'Which catering or visitor systems would you like us to assess?',
      ],
    },
    closing: {
      eyebrow: 'Explore further',
      title: 'Access requirements and your next steps.',
      body: 'Review the questions about sign-in and data, or find out how the agreed customer setup and pilot work.',
      primaryCta: 'Review security and trust',
      secondaryCta: 'Explore setup & pilot',
    },
  },
  de: {
    overviewTitle: 'Passende Anbindungen für Ihren Alltag.',
    overviewCta: 'Anbindungen ansehen',
    visualCaption: 'Ihre Räume. Ihr Team. Ein gemeinsamer Ablauf.',
    sections: [
      {
        id: 'rooms',
        eyebrow: 'Raumreservierung',
        title: 'Hier anfragen. Ihre Raumbuchung behalten.',
        body: 'Mitarbeitende starten ihre Anfrage im Conference Manager. Ihre bestehende Raumreservierung bleibt Teil des Ablaufs, wenn eine unterstützte Anbindung verfügbar ist.',
        points: [
          {
            title: 'Vorhandene Microsoft-365-Räume',
            body: 'Nutzen Sie die Räume, die Ihr Unternehmen bereits verwaltet. Die passende Anbindung und benötigten Kalenderfunktionen klären wir vor dem Pilotstart.',
          },
        ],
        qualification:
          'Raumverfügbarkeit und Kalenderänderungen benötigen eine unterstützte Anbindung und die Microsoft- und Exchange-Freigaben Ihres Unternehmens.',
      },
      {
        id: 'identity',
        eyebrow: 'Microsoft-Anmeldung',
        title: 'Mit Ihrem Unternehmenskonto anmelden.',
        body: 'Mitarbeitende melden sich mit ihrem Microsoft-Unternehmenskonto an. Wir stimmen ab, wer Anfragen stellt, wer sie bearbeitet und wer Ihre Kundenumgebung verwaltet.',
        points: [
          {
            title: 'Berechtigungen für Ihr Team',
            body: 'Ihr Unternehmen legt fest, welche Personen Zugang benötigen und welche Aufgaben sie übernehmen. Die erforderlichen Rollen richten wir mit Ihnen ein.',
          },
        ],
        qualification:
          'Die Microsoft-Anmeldung benötigt die Einrichtung und Freigabe Ihres Unternehmens. Rollen werden vor der Nutzung für Ihre Kundenumgebung konfiguriert.',
      },
      {
        id: 'catering',
        eyebrow: 'Cateringkoordination',
        title: 'Ihren Caterer einbeziehen.',
        body: 'Eine abgestimmte Bestellung und ein klarer Weg für Rückmeldungen. Bei der Einrichtung klären wir, wie Ihr Office-Team mit seinem Caterer zusammenarbeitet.',
        points: [
          {
            title: 'E-Mail und Rückpflege durch Ihr Office-Team',
            body: 'Ihr Office-Team versendet die Bestellung per E-Mail und hält die Rückmeldung des Caterers im Conference Manager fest. Diesen Arbeitsablauf vereinbaren wir für Ihren Pilot.',
          },
          {
            title: 'Weitere Anbindungen prüfen',
            body: 'Einen eigenen Caterer-Zugang oder Bestätigungslink sowie eine direkte Anbindung an seine Software prüfen wir gesondert. Dabei klären wir den Austausch von Aufträgen, Bestätigungen, Änderungen und Bearbeitungsständen.',
          },
        ],
        qualification:
          'Automatischer Versand und Statusrückmeldungen werden nur vereinbart, wenn eine passende Anbindung geprüft und verfügbar ist.',
      },
      {
        id: 'visitors',
        eyebrow: 'Optionale Besucheranbindung',
        title: 'Ihre Gästeabläufe besprechen.',
        body: 'Besprechen Sie mit uns, ob Ihr vorhandenes Besuchersystem Gästeangaben austauschen und den Ankunftsstatus zurückmelden kann.',
        points: [
          {
            title: 'Gewünschte Angaben festlegen',
            body: 'Name, Firma und Besuchszeit für den Empfang; Ankunfts- oder Check-in-Status für das Konferenzteam.',
          },
        ],
        qualification:
          'Gästeanmeldung und Check-in erfordern eine gesonderte Machbarkeitsprüfung und sind nicht automatisch im Pilot enthalten.',
      },
    ],
    preparation: {
      eyebrow: 'Vor der Einrichtung',
      title: 'Die Voraussetzungen mit Ihrer IT klären.',
      questions: [
        'Welches Raumbuchungssystem und welche Microsoft-Umgebung nutzt Ihr Unternehmen?',
        'Wer gibt Zugriffe und den Austausch von Besprechungsdaten frei?',
        'Welche Catering- oder Besuchersysteme sollen wir für Sie prüfen?',
      ],
    },
    closing: {
      eyebrow: 'Mehr erfahren',
      title: 'Zugriffe und die nächsten Schritte klären.',
      body: 'Lesen Sie die Fragen zu Anmeldung und Daten oder erfahren Sie, wie die vereinbarte Einrichtung und der Pilot ablaufen.',
      primaryCta: 'Sicherheit & Vertrauen ansehen',
      secondaryCta: 'Einrichtung & Pilot ansehen',
    },
  },
};

export function getIntegrationsCopy(locale: Locale): IntegrationsCopy {
  return integrationsCopy[locale];
}
