import type { Locale } from '@config/locales';

type Card = { title: string; body: string };
type Section = { eyebrow: string; title: string; body: string };
type HomepageCopy = {
  meta: { title: string; description: string };
  hero: Section & { outcome: string; action: string };
  heroPreview: {
    label: string;
    title: string;
    status: string;
    items: { label: string; value: string }[];
  };
  overview: { label: string; items: string[]; detailLink: string };
  problem: Section & { cards: Card[] };
  howItWorks: Section & { detailLink: string };
  roomBooking: Section & {
    supporting: string;
    nodes: (Card & { label: string })[];
    replacement: Card;
    detailLink: string;
  };
  audiences: Section & { cards: Card[]; detailLink: string };
  pilot: Section & { detailLink: string };
  readiness: { body: string; link: string };
  closing: Section & { primaryCta: string };
};

const copy: Record<Locale, HomepageCopy> = {
  en: {
    meta: {
      title: 'Organise meetings. Reduce the follow-up. — Conference Manager',
      description:
        'Bring guests, catering and equipment together in one meeting request. Keep existing room booking and company sign-in. One-time paid setup, then 30 days of free software use.',
    },
    hero: {
      eyebrow: 'For office and conference teams in mid-sized companies',
      title: 'Organise meetings.',
      outcome: 'Reduce the follow-up.',
      body: 'Software for meeting preparation: bring guests, catering and equipment together in one request. Your existing room-booking system continues to handle reservations.',
      action: 'See how it works',
    },
    heroPreview: {
      label: 'Illustrative preparation overview',
      title: 'Customer workshop',
      status: 'Preparation in progress',
      items: [
        { label: 'Guests', value: '18 attendees' },
        { label: 'Catering', value: 'Coffee-break package' },
        { label: 'Equipment', value: 'Display & video conference' },
      ],
    },
    overview: {
      label: 'One request. A clear overview.',
      items: ['Request', 'Guests', 'Room & equipment', 'Catering', 'Changes', 'Coordination'],
      detailLink: 'Explore the features',
    },
    problem: {
      eyebrow: 'Your working day',
      title: 'Less searching. More clarity for preparation.',
      body: 'When information is spread across emails, forms and spreadsheets, even one meeting creates a lot of coordination.',
      cards: [
        {
          title: 'Too many emails and follow-ups',
          body: 'Keep meeting details and the current processing stage together in one request.',
        },
        {
          title: 'Missing guests, catering or equipment',
          body: 'Capture guests, catering and equipment together before preparation starts.',
        },
        {
          title: 'What changed?',
          body: 'Keep the agreed request and proposed changes together for review.',
        },
        {
          title: 'Who is taking care of it?',
          body: 'Your office or conference team coordinates the next steps around a shared request.',
        },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'One meeting. A clear workflow.',
      body: 'Follow a customer workshop from the initial request to a change in attendance. Choose a step to see what matters.',
      detailLink: 'Explore the hand-offs and decisions',
    },
    roomBooking: {
      eyebrow: 'Connected to your working environment',
      title: 'Your systems. One meeting workflow.',
      body: 'Conference Manager brings meeting preparation together around the systems you already use.',
      supporting: 'We confirm the available connections and scope for your environment.',
      nodes: [
        {
          label: 'Keep using',
          title: 'Your room booking',
          body: 'Your existing room-booking system remains responsible for reservations.',
        },
        {
          label: 'Keep using',
          title: 'Your company sign-in',
          body: 'Keep your company sign-in. The current focus is Microsoft.',
        },
        {
          label: 'Coordinate',
          title: 'Your caterer',
          body: 'Your office team records replies; additional supplier connections are assessed separately.',
        },
        {
          label: 'Optional · subject to assessment',
          title: 'Your visitor management',
          body: 'Discuss a connection to your existing visitor system where needed.',
        },
      ],
      replacement: {
        title: 'Bring catering out of separate spreadsheets and forms.',
        body: 'Select and coordinate catering within the meeting request.',
      },
      detailLink: 'Explore integrations',
    },
    audiences: {
      eyebrow: 'For your team',
      title: 'Everyone knows their part.',
      body: 'Agree the responsibilities around the meeting during setup.',
      cards: [
        { title: 'Employees', body: 'Provide the requirements and follow the request.' },
        {
          title: 'Office and conference teams',
          body: 'Coordinate preparation and clarify open decisions.',
        },
        {
          title: 'Service teams',
          body: 'Contribute according to the agreed customer setup.',
        },
      ],
      detailLink: 'See each team’s responsibilities',
    },
    pilot: {
      eyebrow: 'Setup & pilot',
      title: 'Try it with your own meetings.',
      body: 'After a one-time paid setup is complete, use Conference Manager free for 30 days with your own real meetings in your configured customer environment.',
      detailLink: 'See setup and pilot details',
    },
    readiness: {
      body: 'Clarify access, data and approval requirements with your IT team.',
      link: 'Review security and trust',
    },
    closing: {
      eyebrow: 'Conference Manager by Pavurel',
      title: 'Let’s look at your meeting workflow.',
      body: 'Bring a typical meeting from your working day. We will explore how your team could organise it in Conference Manager.',
      primaryCta: 'Book a demo',
    },
  },
  de: {
    meta: {
      title: 'Besprechungen organisieren. Rückfragen reduzieren. — Conference Manager',
      description:
        'Gäste, Catering und Technik in einer Besprechungsanfrage zusammenführen. Bestehende Systeme weiter nutzen. Einmalig kostenpflichtige Einrichtung, danach 30 Tage kostenlose Softwarenutzung.',
    },
    hero: {
      eyebrow: 'Für Office- und Konferenzteams im Mittelstand',
      title: 'Besprechungen organisieren.',
      outcome: 'Rückfragen reduzieren.',
      body: 'Die Software für Ihre Besprechungsvorbereitung: Gäste, Catering und Technik in einer Anfrage. Ihre bestehende Raumbuchung bleibt für Reservierungen zuständig.',
      action: 'So funktioniert es',
    },
    heroPreview: {
      label: 'Illustrative Übersicht der Vorbereitung',
      title: 'Kundenworkshop',
      status: 'Vorbereitung läuft',
      items: [
        { label: 'Gäste', value: '18 Teilnehmende' },
        { label: 'Catering', value: 'Paket Kaffeepause' },
        { label: 'Technik', value: 'Bildschirm & Videokonferenz' },
      ],
    },
    overview: {
      label: 'Eine Anfrage. Ein klarer Überblick.',
      items: ['Anfrage', 'Gäste', 'Raum & Technik', 'Catering', 'Änderungen', 'Bearbeitung'],
      detailLink: 'Die Funktionen kennenlernen',
    },
    problem: {
      eyebrow: 'Ihr Arbeitsalltag',
      title: 'Weniger suchen. Klarer vorbereiten.',
      body: 'Wenn Angaben in E-Mails, Formularen und Listen verteilt sind, wird aus einer Besprechung schnell viel Abstimmung.',
      cards: [
        {
          title: 'Viele E-Mails und Rückfragen',
          body: 'Angaben und Bearbeitungsstand bleiben bei einer gemeinsamen Besprechungsanfrage.',
        },
        {
          title: 'Gäste, Catering oder Technik fehlen',
          body: 'Gäste, Catering und Technik werden gemeinsam für die Vorbereitung erfasst.',
        },
        {
          title: 'Was hat sich geändert?',
          body: 'Vereinbarte Angaben und vorgeschlagene Änderungen bleiben zusammen nachvollziehbar.',
        },
        {
          title: 'Wer kümmert sich darum?',
          body: 'Ihr Office- oder Konferenzteam koordiniert die nächsten Schritte an einer gemeinsamen Anfrage.',
        },
      ],
    },
    howItWorks: {
      eyebrow: 'So funktioniert es',
      title: 'Eine Besprechung. Ein verständlicher Ablauf.',
      body: 'Begleiten Sie einen Kundenworkshop von der ersten Anfrage bis zur geänderten Personenzahl. Wählen Sie einen Schritt und sehen Sie, worauf es dabei ankommt.',
      detailLink: 'Übergaben und Entscheidungen kennenlernen',
    },
    roomBooking: {
      eyebrow: 'Verbunden mit Ihrer Arbeitsumgebung',
      title: 'Ihre Systeme. Ein gemeinsamer Ablauf.',
      body: 'Conference Manager führt die Vorbereitung rund um Ihre bestehenden Systeme zusammen.',
      supporting: 'Die verfügbaren Anbindungen und den Umfang klären wir für Ihre Umgebung.',
      nodes: [
        {
          label: 'Weiter nutzen',
          title: 'Ihre Raumbuchung',
          body: 'Ihre bestehende Raumbuchung bleibt für die Reservierung zuständig.',
        },
        {
          label: 'Weiter nutzen',
          title: 'Ihre Unternehmensanmeldung',
          body: 'Die Unternehmensanmeldung bleibt erhalten. Der aktuelle Schwerpunkt liegt auf Microsoft.',
        },
        {
          label: 'Einbinden',
          title: 'Ihre Caterer',
          body: 'Ihr Office-Team erfasst Rückmeldungen; zusätzliche Anbindungen prüfen wir gesondert.',
        },
        {
          label: 'Optional · nach Prüfung',
          title: 'Ihr Gästemanagement',
          body: 'Bei Bedarf besprechen wir eine Verbindung zu Ihrem vorhandenen Besuchersystem.',
        },
      ],
      replacement: {
        title: 'Excel und Forms für Catering ablösen.',
        body: 'Catering wird direkt in der Besprechungsanfrage zusammengestellt und abgestimmt.',
      },
      detailLink: 'Anbindungen und Voraussetzungen ansehen',
    },
    audiences: {
      eyebrow: 'Für Ihr Team',
      title: 'Jeder kennt seine Aufgabe.',
      body: 'Die Zuständigkeiten rund um die Besprechung stimmen wir bei der Einrichtung ab.',
      cards: [
        { title: 'Mitarbeitende', body: 'Anforderungen angeben und die Anfrage verfolgen.' },
        {
          title: 'Office- und Konferenzteams',
          body: 'Die Vorbereitung koordinieren und offene Entscheidungen klären.',
        },
        {
          title: 'Service-Teams',
          body: 'Im Rahmen der vereinbarten Kundenumgebung mitarbeiten.',
        },
      ],
      detailLink: 'Aufgaben der beteiligten Teams ansehen',
    },
    pilot: {
      eyebrow: 'Einrichtung & Pilot',
      title: 'Mit eigenen Besprechungen erleben.',
      body: 'Nach abgeschlossener, einmalig kostenpflichtiger Einrichtung nutzen Sie Conference Manager 30 Tage kostenlos mit Ihren eigenen realen Besprechungen in der eingerichteten Kundenumgebung.',
      detailLink: 'Einrichtung und Pilot im Detail',
    },
    readiness: {
      body: 'Klären Sie Zugriff, Daten und Freigabeanforderungen gemeinsam mit Ihrer IT.',
      link: 'Sicherheit und Vertrauen prüfen',
    },
    closing: {
      eyebrow: 'Conference Manager by Pavurel',
      title: 'Passt Conference Manager zu Ihrem Konferenzbetrieb?',
      body: 'Bringen Sie eine typische Besprechung aus Ihrem Arbeitsalltag mit. Wir zeigen Ihnen, wie Ihr Team sie im Conference Manager organisieren könnte.',
      primaryCta: 'Demo anfragen',
    },
  },
};

export function getHomepageCopy(locale: Locale): HomepageCopy {
  return copy[locale];
}
