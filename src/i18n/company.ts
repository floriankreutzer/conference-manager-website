import type { Locale } from '@config/locales';

type CompanyPoint = { title: string; body: string };
type CompanySection = {
  eyebrow: string;
  title: string;
  body: string;
  points?: readonly CompanyPoint[];
  statement?: string;
};
type CompanyCopy = {
  sections: readonly CompanySection[];
  closing: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

const companyCopy: Record<Locale, CompanyCopy> = {
  en: {
    sections: [
      {
        eyebrow: 'Our focus',
        title: 'Make meeting preparation easier to coordinate.',
        body: 'Conference Manager is for office and conference teams in mid-sized companies. It brings meeting requests, guests, catering and equipment together so your team can work from the same information.',
        points: [
          {
            title: 'A clear starting point for employees',
            body: 'Employees describe their meeting and what it needs in one request. They do not have to assemble separate emails and catering forms first.',
          },
          {
            title: 'A shared basis for the team',
            body: 'Your office or conference team can review requirements and change requests alongside the meeting, instead of piecing them together from separate messages.',
          },
        ],
      },
      {
        eyebrow: 'Your existing environment',
        title: 'Build on the systems your company already uses.',
        body: 'Your room-booking system remains responsible for reservations. We discuss the available connection, Microsoft sign-in and any additional service needs with you. The supported scope is agreed before setup.',
        statement:
          'Start in Conference Manager. Reserve through your existing room-booking system.',
      },
      {
        eyebrow: 'Your introduction',
        title: 'Agree the process. Set it up. Try it with your team.',
        body: 'Pavurel prepares the customer environment for the agreed process. The introduction starts with a demo and a shared understanding of your current meeting organisation.',
        points: [
          {
            title: 'Bring a real meeting to the demo',
            body: 'We look at the information your team needs, the people involved and where questions or changes arise today.',
          },
          {
            title: 'Agree the setup',
            body: 'We confirm the scope, prerequisites and supported connections with you. A one-time setup fee applies.',
          },
          {
            title: 'Use the software free for 30 days',
            body: 'The 30 days begin after the paid setup is complete. Your team uses its own real meetings in the configured customer environment. Prices for setup and ongoing use are still open.',
          },
        ],
      },
      {
        eyebrow: 'When your needs change',
        title: 'Discuss adjustments with Pavurel.',
        body: 'Bring changes to your ordering deadlines, approval needs or team responsibilities to Pavurel. We agree which adjustments are possible within the supported setup and make the agreed changes on your request.',
      },
    ],
    closing: {
      eyebrow: 'Let us look at your process',
      title: 'What does your team need to prepare a meeting?',
      body: 'Bring your current workflow to the demo. We will look at where Conference Manager fits and what a suitable introduction would involve.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore setup & pilot',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Unser Fokus',
        title: 'Besprechungen einfacher gemeinsam vorbereiten.',
        body: 'Conference Manager richtet sich an Office- und Konferenzteams mittelständischer Unternehmen. Das Produkt führt Besprechungsanfragen, Gäste, Catering und Technik zusammen, damit Ihr Team mit denselben Informationen arbeiten kann.',
        points: [
          {
            title: 'Ein klarer Einstieg für Mitarbeitende',
            body: 'Mitarbeitende beschreiben ihre Besprechung und die benötigten Leistungen in einer Anfrage. Separate E-Mails und Cateringformulare müssen dafür nicht erst zusammengestellt werden.',
          },
          {
            title: 'Eine gemeinsame Grundlage für das Team',
            body: 'Ihr Office- oder Konferenzteam kann Anforderungen und Änderungsanfragen direkt bei der Besprechung prüfen, statt sie aus einzelnen Nachrichten zusammenzusuchen.',
          },
        ],
      },
      {
        eyebrow: 'Ihre vorhandene Umgebung',
        title: 'Auf den Systemen aufbauen, die Ihr Unternehmen bereits nutzt.',
        body: 'Ihr Raumbuchungssystem bleibt für die Reservierung zuständig. Gemeinsam besprechen wir die verfügbare Anbindung, die Microsoft-Anmeldung und weitere benötigte Leistungen. Den unterstützten Umfang stimmen wir vor der Einrichtung ab.',
        statement: 'Im Conference Manager starten. Über die vorhandene Raumbuchung reservieren.',
      },
      {
        eyebrow: 'Ihre Einführung',
        title: 'Ablauf abstimmen. Einrichten. Mit Ihrem Team erproben.',
        body: 'Pavurel bereitet die Kundenumgebung für den vereinbarten Ablauf vor. Am Anfang stehen eine Demo und ein gemeinsamer Blick auf Ihre heutige Besprechungsorganisation.',
        points: [
          {
            title: 'Eine reale Besprechung in die Demo mitbringen',
            body: 'Wir betrachten die benötigten Angaben, die beteiligten Personen und die Stellen, an denen heute Rückfragen oder Änderungen entstehen.',
          },
          {
            title: 'Die Einrichtung abstimmen',
            body: 'Wir klären mit Ihnen den Umfang, die Voraussetzungen und die unterstützten Anbindungen. Die Einrichtung ist einmalig kostenpflichtig.',
          },
          {
            title: 'Die Software 30 Tage kostenlos nutzen',
            body: 'Die 30 Tage beginnen nach abgeschlossener, kostenpflichtiger Einrichtung. Ihr Team arbeitet mit eigenen realen Besprechungen in der eingerichteten Kundenumgebung. Die Preise für Einrichtung und anschließende Nutzung sind noch offen.',
          },
        ],
      },
      {
        eyebrow: 'Wenn sich Ihr Bedarf ändert',
        title: 'Anpassungen mit Pavurel besprechen.',
        body: 'Wenden Sie sich mit Änderungen an Bestellfristen, Freigaben oder Zuständigkeiten an Pavurel. Gemeinsam stimmen wir ab, welche Anpassungen im unterstützten Einrichtungsumfang möglich sind. Pavurel setzt die vereinbarten Änderungen auf Ihren Wunsch um.',
      },
    ],
    closing: {
      eyebrow: 'Gemeinsam auf Ihren Ablauf schauen',
      title: 'Was braucht Ihr Team, um eine Besprechung vorzubereiten?',
      body: 'Bringen Sie Ihren heutigen Ablauf mit in die Demo. Gemeinsam betrachten wir, wo Conference Manager passt und wie eine geeignete Einführung aussehen kann.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'Einführung & Pilot ansehen',
    },
  },
};

export function getCompanyCopy(locale: Locale): CompanyCopy {
  return companyCopy[locale];
}
