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
  setup: {
    eyebrow: string;
    title: string;
    steps: readonly IntegrationPoint[];
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
            title: 'One guided request',
            body: 'Collect the details for participants, catering and equipment in one place, replacing the separate spreadsheets and request forms used for this process.',
          },
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
            body: 'We can assess links to your supplier’s existing portal or an API connection with that supplier. These options are agreed only after the assessment.',
          },
        ],
        qualification:
          'Automatic sending and supplier status updates are agreed only when a suitable connection has been assessed and confirmed as available.',
      },
      {
        id: 'visitors',
        eyebrow: 'Optional visitor connection',
        title: 'Discuss your guest workflow.',
        body: 'If you also want to connect visitor registration or check-in, we assess the options for your existing visitor management system separately.',
        points: [
          {
            title: 'Confirm what is possible',
            body: 'We discuss which information your reception team needs and whether a suitable connection is available. Only confirmed options become part of the agreed scope.',
          },
        ],
        qualification:
          'Visitor registration and check-in require a separate feasibility check; they are not automatically included in the pilot.',
      },
    ],
    setup: {
      eyebrow: 'A clear start',
      title: 'Agree on the setup. Then try your own meetings.',
      steps: [
        {
          title: 'Review your process',
          body: 'Bring a typical meeting to the demo. We discuss your rooms, teams and the connections you need.',
        },
        {
          title: 'Set up your environment',
          body: 'Pavurel provides a one-time paid setup. We agree on the scope, supported connections and setup price with you in advance.',
        },
        {
          title: 'Try it for 30 days',
          body: 'Your free 30-day pilot begins after setup is complete. Use your own meetings in your customer environment.',
        },
      ],
    },
    closing: {
      eyebrow: 'Start with your company',
      title: 'Let’s look at your meeting process.',
      body: 'A personal demo shows how requests, room reservations and office-team coordination can fit together. We confirm the scope and costs before setting up your pilot.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Pilot & setup',
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
            title: 'Eine geführte Anfrage',
            body: 'Erfassen Sie Angaben zu Teilnehmern, Catering und Technik an einem Ort. So können Sie die separaten Excel-Listen und Anfrageformulare für diesen Ablauf ablösen.',
          },
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
            body: 'Verweise auf das vorhandene Portal Ihres Caterers oder eine Schnittstelle zu diesem Anbieter prüfen wir gesondert. Diese Möglichkeiten werden erst nach der Prüfung vereinbart.',
          },
        ],
        qualification:
          'Automatischer Versand und Statusrückmeldungen werden nur vereinbart, wenn eine passende Anbindung geprüft und verfügbar ist.',
      },
      {
        id: 'visitors',
        eyebrow: 'Optionale Besucheranbindung',
        title: 'Ihre Gästeabläufe besprechen.',
        body: 'Wenn Sie auch Gästeanmeldung oder Check-in einbinden möchten, prüfen wir die Möglichkeiten für Ihr vorhandenes Besuchersystem gesondert.',
        points: [
          {
            title: 'Möglichkeiten gemeinsam klären',
            body: 'Wir besprechen, welche Informationen Ihr Empfang benötigt und ob eine passende Anbindung verfügbar ist. Nur bestätigte Möglichkeiten gehören zum vereinbarten Umfang.',
          },
        ],
        qualification:
          'Gästeanmeldung und Check-in erfordern eine gesonderte Machbarkeitsprüfung und sind nicht automatisch im Pilot enthalten.',
      },
    ],
    setup: {
      eyebrow: 'Ein klarer Einstieg',
      title: 'Einrichtung abstimmen. Eigene Besprechungen erproben.',
      steps: [
        {
          title: 'Ihren Ablauf ansehen',
          body: 'Bringen Sie einen typischen Termin mit in die Demo. Wir besprechen Ihre Räume, Teams und die benötigten Anbindungen.',
        },
        {
          title: 'Ihre Kundenumgebung einrichten',
          body: 'Pavurel übernimmt die einmalige kostenpflichtige Einrichtung. Umfang, unterstützte Anbindungen und Einrichtungspreis stimmen wir vorher mit Ihnen ab.',
        },
        {
          title: '30 Tage im Alltag erproben',
          body: 'Ihr kostenloser 30-Tage-Pilot beginnt nach abgeschlossener Einrichtung. Nutzen Sie Ihre eigenen Besprechungen in Ihrer Kundenumgebung.',
        },
      ],
    },
    closing: {
      eyebrow: 'Ihr Unternehmen als Ausgangspunkt',
      title: 'Lassen Sie uns Ihren Besprechungsablauf ansehen.',
      body: 'Eine persönliche Demo zeigt, wie Anfrage, Raumreservierung und die Arbeit Ihres Office-Teams zusammenspielen können. Umfang und Kosten klären wir vor der Einrichtung Ihres Pilots.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'Pilot & Einrichtung',
    },
  },
};

export function getIntegrationsCopy(locale: Locale): IntegrationsCopy {
  return integrationsCopy[locale];
}
