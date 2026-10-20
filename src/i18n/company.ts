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
        eyebrow: 'Pavurel’s role',
        title: 'What Pavurel handles.',
        body: 'We agree the setup scope with you and prepare the customer environment for your meeting process. Available connections, prerequisites and supported adjustments are clarified before setup.',
      },
      {
        eyebrow: 'Your contribution',
        title: 'What your team contributes.',
        body: 'Your office or conference team describes the preparation work and identifies who needs to be involved. Your IT team brings the requirements for existing systems, access and operation.',
        points: [
          {
            title: 'An operational contact',
            body: 'Identify who can explain your current process and coordinate decisions within your company.',
          },
          {
            title: 'The requirements to agree',
            body: 'Bring your ordering deadlines, approval needs and team responsibilities so the supported setup can be agreed.',
          },
        ],
      },
      {
        eyebrow: 'Later adjustments',
        title: 'Discuss adjustments with Pavurel.',
        body: 'When deadlines, approvals or responsibilities need to change, contact Pavurel. We confirm which adjustments are possible within the supported scope and make the agreed changes on your request.',
      },
    ],
    closing: {
      eyebrow: 'Plan the introduction',
      title: 'Prepare the next steps with your team.',
      body: 'Review the introduction offer and the questions your IT team needs to clarify.',
      primaryCta: 'Explore setup & pilot',
      secondaryCta: 'Review IT requirements',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Die Rolle von Pavurel',
        title: 'Was Pavurel übernimmt.',
        body: 'Wir stimmen den Einrichtungsumfang mit Ihnen ab und bereiten die Kundenumgebung für Ihren Besprechungsablauf vor. Verfügbare Anbindungen, Voraussetzungen und unterstützte Anpassungen klären wir vor der Einrichtung.',
      },
      {
        eyebrow: 'Ihr Beitrag',
        title: 'Was Ihr Team einbringt.',
        body: 'Ihr Office- oder Konferenzteam beschreibt die Vorbereitung und benennt die beteiligten Personen. Ihre IT bringt die Anforderungen an vorhandene Systeme, Zugriffe und Betrieb ein.',
        points: [
          {
            title: 'Ein fachlicher Ansprechpartner',
            body: 'Benennen Sie eine Person, die Ihren heutigen Ablauf erklären und Entscheidungen in Ihrem Unternehmen abstimmen kann.',
          },
          {
            title: 'Die abzustimmenden Anforderungen',
            body: 'Bringen Sie Bestellfristen, Freigabebedarf und Zuständigkeiten mit, damit wir die unterstützte Einrichtung vereinbaren können.',
          },
        ],
      },
      {
        eyebrow: 'Spätere Anpassungen',
        title: 'Anpassungen mit Pavurel besprechen.',
        body: 'Wenn sich Fristen, Freigaben oder Zuständigkeiten ändern sollen, wenden Sie sich an Pavurel. Wir bestätigen die Möglichkeiten im unterstützten Umfang und setzen die vereinbarten Änderungen auf Ihren Wunsch um.',
      },
    ],
    closing: {
      eyebrow: 'Die Einführung planen',
      title: 'Die nächsten Schritte mit Ihrem Team vorbereiten.',
      body: 'Informieren Sie sich über das Einstiegsangebot und die Fragen, die Ihre IT vorab klären sollte.',
      primaryCta: 'Einrichtung & Pilot ansehen',
      secondaryCta: 'IT-Anforderungen prüfen',
    },
  },
};

export function getCompanyCopy(locale: Locale): CompanyCopy {
  return companyCopy[locale];
}
