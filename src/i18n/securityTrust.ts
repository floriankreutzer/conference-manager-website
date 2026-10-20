import type { Locale } from '@config/locales';

type SecurityTrustPoint = { title: string; body: string };
type SecurityTrustSection = {
  eyebrow: string;
  title: string;
  body: string;
  points?: readonly SecurityTrustPoint[];
  statement?: string;
};
type SecurityTrustCopy = {
  sections: readonly SecurityTrustSection[];
  closing: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

const securityTrustCopy: Record<Locale, SecurityTrustCopy> = {
  en: {
    sections: [
      {
        eyebrow: 'Sign-in and permissions',
        title: 'How do employees access Conference Manager?',
        body: 'In a customer environment configured for Microsoft Entra, employees use their work account to sign in to the application. The required connection and customer approvals are part of the setup discussion.',
        points: [
          {
            title: 'Access for each role',
            body: 'Application roles determine which functions a person can use. We agree supported role assignments with your administrator. Using company groups as a basis, supplemented by assignments from your customer administrator, is assessed separately.',
          },
        ],
      },
      {
        eyebrow: 'Meeting information',
        title: 'Where does your team work with its meeting data?',
        body: 'Meeting records belong in the signed-in Conference Manager application. This public website does not access your application session or the meeting records in your customer environment.',
      },
      {
        eyebrow: 'Data exchange',
        title: 'What information will be exchanged?',
        body: 'For each proposed connection, clarify which information passes between systems, which permissions are required and who approves them. A connection is included only once availability, data exchange and scope are confirmed.',
      },
      {
        eyebrow: 'Before setup',
        title: 'What does your IT team need to assess?',
        body: 'Review your requirements for data protection and operation against the specific customer environment and the evidence available before setup.',
        points: [
          {
            title: 'Data and operation',
            body: 'Discuss the intended use, information involved, hosting requirements and responsibilities for your environment.',
          },
          {
            title: 'Required evidence',
            body: 'If your organisation requires particular certifications or contractual commitments, raise them before setup so the requirements and available evidence can be checked.',
          },
        ],
      },
    ],
    closing: {
      eyebrow: 'Continue your assessment',
      title: 'Connect the IT questions with your introduction.',
      body: 'Review the supported connections and the steps involved in setting up your environment.',
      primaryCta: 'Explore integrations',
      secondaryCta: 'Explore setup & pilot',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Anmeldung und Berechtigungen',
        title: 'Wie greifen Mitarbeitende auf Conference Manager zu?',
        body: 'In einer für Microsoft Entra eingerichteten Kundenumgebung melden sich Mitarbeitende mit ihrem Geschäftskonto in der Anwendung an. Die benötigte Anbindung und die Freigaben Ihres Unternehmens besprechen wir bei der Einrichtung.',
        points: [
          {
            title: 'Zugriffe je Rolle',
            body: 'Anwendungsrollen bestimmen, welche Funktionen eine Person nutzen kann. Die unterstützte Rollenvergabe stimmen wir mit Ihrem Administrator ab. Unternehmensgruppen als Grundlage und ergänzende Vergaben durch Ihren Kundenadministrator werden gesondert geprüft.',
          },
        ],
      },
      {
        eyebrow: 'Besprechungsdaten',
        title: 'Wo arbeitet Ihr Team mit den Besprechungsdaten?',
        body: 'Besprechungsdaten gehören in die angemeldete Conference-Manager-Anwendung. Diese öffentliche Website greift weder auf Ihre Anwendungssitzung noch auf die Besprechungsdaten Ihrer Kundenumgebung zu.',
      },
      {
        eyebrow: 'Datenaustausch',
        title: 'Welche Angaben werden ausgetauscht?',
        body: 'Für jede gewünschte Anbindung klären wir, welche Angaben zwischen den Systemen weitergegeben werden, welche Berechtigungen nötig sind und wer sie freigibt. Eine Anbindung wird erst aufgenommen, wenn Verfügbarkeit, Datenaustausch und der vereinbarte Umfang bestätigt sind.',
      },
      {
        eyebrow: 'Vor der Einrichtung',
        title: 'Was muss Ihre IT für den Einsatz prüfen?',
        body: 'Gleichen Sie Ihre Anforderungen an Datenschutz und Betrieb vor der Einrichtung mit der konkreten Kundenumgebung und den verfügbaren Nachweisen ab.',
        points: [
          {
            title: 'Daten und Betrieb',
            body: 'Besprechen Sie den vorgesehenen Einsatz, die benötigten Informationen, die Anforderungen an das Hosting und die Zuständigkeiten für Ihre Umgebung.',
          },
          {
            title: 'Benötigte Nachweise',
            body: 'Wenn Ihr Unternehmen bestimmte Zertifizierungen oder vertragliche Zusagen voraussetzt, sprechen Sie diese vor der Einrichtung an. So lassen sich Ihre Anforderungen mit den verfügbaren Nachweisen abgleichen.',
          },
        ],
      },
    ],
    closing: {
      eyebrow: 'Die Prüfung fortsetzen',
      title: 'IT-Fragen mit der Einführung verbinden.',
      body: 'Prüfen Sie die unterstützten Anbindungen und die Schritte zur Einrichtung Ihrer Umgebung.',
      primaryCta: 'Integrationen ansehen',
      secondaryCta: 'Einrichtung & Pilot ansehen',
    },
  },
};

export function getSecurityTrustCopy(locale: Locale): SecurityTrustCopy {
  return securityTrustCopy[locale];
}
