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
            title: 'Use your company account',
            body: 'Sign-in takes place in the Conference Manager application. Employees do not create a separate account on this website.',
          },
          {
            title: 'Give each role the appropriate access',
            body: 'Application roles determine which functions a person can use. We agree the supported role assignment with your administrator during setup; automatic mapping of company groups is assessed separately.',
          },
        ],
      },
      {
        eyebrow: 'Meeting information',
        title: 'Where does your team work with its meeting data?',
        body: 'Your team prepares meetings in the signed-in Conference Manager application. This public website explains the product and does not access your application session or the meeting records in your customer environment.',
        statement:
          'The product website and your customer environment have separate responsibilities.',
      },
      {
        eyebrow: 'Connections',
        title: 'Which systems need to be connected?',
        body: 'Start with your existing room-booking system and company sign-in. We review the supported connections, required permissions and customer configuration before agreeing the setup.',
        points: [
          {
            title: 'Your room-booking system keeps the reservation',
            body: 'Conference Manager brings the meeting request and preparation together. The existing booking system remains responsible for the room reservation.',
          },
          {
            title: 'Additional connections need their own assessment',
            body: 'A direct caterer connection or visitor-management integration is only included once availability, data exchange and the agreed scope have been confirmed.',
          },
        ],
      },
      {
        eyebrow: 'Before setup',
        title: 'What does your IT team need to assess?',
        body: 'Bring your requirements for access, data protection and operation to the discussion. We review the specific customer environment with you and clarify which evidence is available before setup.',
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
      eyebrow: 'Include your IT team',
      title: 'Discuss your meeting process and your requirements together.',
      body: 'Use the demo to explore the workflow and bring the relevant sign-in, permission and integration questions into the same conversation.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore integrations',
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
            title: 'Das Unternehmenskonto nutzen',
            body: 'Die Anmeldung erfolgt in der Conference-Manager-Anwendung. Mitarbeitende legen auf dieser Website kein separates Konto an.',
          },
          {
            title: 'Passende Zugriffe je Rolle vergeben',
            body: 'Anwendungsrollen bestimmen, welche Funktionen eine Person nutzen kann. Die unterstützte Rollenvergabe stimmen wir bei der Einrichtung mit Ihrem Administrator ab. Eine automatische Zuordnung von Unternehmensgruppen wird gesondert geprüft.',
          },
        ],
      },
      {
        eyebrow: 'Besprechungsdaten',
        title: 'Wo arbeitet Ihr Team mit den Besprechungsdaten?',
        body: 'Ihr Team bereitet Besprechungen in der angemeldeten Conference-Manager-Anwendung vor. Diese öffentliche Website erklärt das Produkt und greift weder auf Ihre Anwendungssitzung noch auf die Besprechungsdaten Ihrer Kundenumgebung zu.',
        statement: 'Die Produktwebsite und Ihre Kundenumgebung haben getrennte Aufgaben.',
      },
      {
        eyebrow: 'Anbindungen',
        title: 'Welche Systeme sollen zusammenarbeiten?',
        body: 'Ausgangspunkt sind Ihre vorhandene Raumbuchung und Unternehmensanmeldung. Vor der vereinbarten Einrichtung prüfen wir die unterstützten Anbindungen, die benötigten Berechtigungen und die Konfiguration Ihrer Umgebung.',
        points: [
          {
            title: 'Die Reservierung bleibt in Ihrer Raumbuchung',
            body: 'Conference Manager führt Anfrage und Vorbereitung zusammen. Ihr vorhandenes Buchungssystem bleibt für die Raumreservierung zuständig.',
          },
          {
            title: 'Weitere Anbindungen werden einzeln geprüft',
            body: 'Eine direkte Catereranbindung oder die Integration eines Gästemanagements gehört erst zum Einrichtungsumfang, wenn Verfügbarkeit, Datenaustausch und Umfang bestätigt sind.',
          },
        ],
      },
      {
        eyebrow: 'Vor der Einrichtung',
        title: 'Was muss Ihre IT für den Einsatz prüfen?',
        body: 'Bringen Sie Ihre Anforderungen an Zugriff, Datenschutz und Betrieb mit. Gemeinsam betrachten wir Ihre konkrete Kundenumgebung und klären vor der Einrichtung, welche Nachweise vorliegen.',
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
      eyebrow: 'Ihre IT einbeziehen',
      title: 'Besprechungsablauf und Anforderungen gemeinsam klären.',
      body: 'Lernen Sie den Ablauf in der Demo kennen und bringen Sie die Fragen zu Anmeldung, Berechtigungen und Anbindungen in dasselbe Gespräch ein.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'Integrationen ansehen',
    },
  },
};

export function getSecurityTrustCopy(locale: Locale): SecurityTrustCopy {
  return securityTrustCopy[locale];
}
