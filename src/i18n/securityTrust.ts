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
        eyebrow: 'Secure product access',
        title: 'The public website does not become a second place to sign in.',
        body: 'The marketing website explains Conference Manager and sends existing users to the protected application for sign-in. Product access, permissions and authenticated work stay with the Conference Manager application rather than being duplicated on a public marketing surface.',
        points: [
          {
            title: 'One application-owned sign-in journey',
            body: 'Existing users follow the secure authentication flow owned by the Conference Manager product.',
          },
          {
            title: 'Public marketing stays public',
            body: 'The website does not need access to a customer’s authenticated Conference Manager session in order to explain the product or provide a login link.',
          },
        ],
      },
      {
        eyebrow: 'Data minimisation',
        title: 'Keep the public experience deliberately lightweight.',
        body: 'The current website is static-first and does not load analytics or marketing tracking. Product access and sensitive integration permissions remain outside the public site, reducing the amount of authority and customer context exposed in the first interaction.',
        statement:
          'A marketing website should explain the product without becoming part of the product trust boundary.',
      },
      {
        eyebrow: 'Demo enquiries',
        title: 'Sales enquiries stay separate from customer application data.',
        body: 'Demo requests use a dedicated processing path with input checks, request limits and anti-automation controls. They are enabled for public use only after the real endpoint, mailbox, rate limiting and privacy handling have been accepted.',
        points: [
          {
            title: 'No application access is required',
            body: 'Requesting a demo does not require a Conference Manager account or access to customer product data.',
          },
          {
            title: 'Operational evidence before activation',
            body: 'The public form remains unavailable where the required processing and privacy controls have not yet been accepted.',
          },
        ],
      },
      {
        eyebrow: 'Evidence-led trust',
        title: 'Say only what the implemented controls can support.',
        body: 'Conference Manager separates implemented safeguards from future or environment-dependent acceptance. The website does not turn planned controls into certifications, blanket compliance claims or unsupported security guarantees. Production-specific statements stay qualified until the real environment has been verified.',
        statement: 'Enterprise trust is stronger when boundaries and evidence are explicit.',
      },
    ],
    closing: {
      eyebrow: 'Evaluate with your requirements',
      title: 'Bring security and integration questions into the product conversation.',
      body: 'A useful evaluation connects the Conference Manager experience with the access, privacy and integration expectations your organisation already applies to enterprise software.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore the product',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Sicherer Produktzugang',
        title: 'Die öffentliche Website wird nicht zu einem zweiten Anmeldeort.',
        body: 'Die Marketingwebsite erklärt Conference Manager und führt bestehende Nutzer zur geschützten Anwendung für die Anmeldung. Produktzugang, Berechtigungen und authentifizierte Arbeit bleiben in der Conference-Manager-Anwendung und werden nicht auf einer öffentlichen Marketingfläche dupliziert.',
        points: [
          {
            title: 'Ein von der Anwendung verantworteter Login',
            body: 'Bestehende Nutzer verwenden den sicheren Authentifizierungsablauf, den das Conference-Manager-Produkt verantwortet.',
          },
          {
            title: 'Öffentliches Marketing bleibt öffentlich',
            body: 'Die Website benötigt keinen Zugriff auf eine authentifizierte Conference-Manager-Sitzung, um das Produkt zu erklären oder einen Login anzubieten.',
          },
        ],
      },
      {
        eyebrow: 'Datenminimierung',
        title: 'Halten Sie die öffentliche Erfahrung bewusst schlank.',
        body: 'Die aktuelle Website ist Static-first und lädt weder Analytics noch Marketing-Tracking. Produktzugang und sensible Integrationsberechtigungen bleiben außerhalb der öffentlichen Website. Dadurch wird in der ersten Interaktion nur so viel Kundenkontext verarbeitet, wie für die Marketingseite tatsächlich nötig ist.',
        statement:
          'Eine Marketingwebsite soll das Produkt erklären, ohne selbst Teil der Produktberechtigungen zu werden.',
      },
      {
        eyebrow: 'Demo-Anfragen',
        title: 'Vertriebsanfragen bleiben von Kundendaten in der Anwendung getrennt.',
        body: 'Demo-Anfragen nutzen eine getrennte Verarbeitung mit Eingabeprüfungen, Größenlimits und Schutz vor automatisiertem Missbrauch. Für die öffentliche Nutzung werden sie erst aktiviert, wenn realer Endpunkt, Postfach, Rate Limiting und Datenschutzverarbeitung abgenommen sind.',
        points: [
          {
            title: 'Kein Produktzugang erforderlich',
            body: 'Für eine Demo-Anfrage sind weder ein Conference-Manager-Konto noch Zugriff auf Kundendaten in der Anwendung erforderlich.',
          },
          {
            title: 'Operative Evidenz vor Aktivierung',
            body: 'Das öffentliche Formular bleibt dort deaktiviert, wo die erforderliche Verarbeitung und Datenschutzkontrollen noch nicht abgenommen sind.',
          },
        ],
      },
      {
        eyebrow: 'Evidenzbasierter Trust',
        title: 'Kommunizieren Sie nur, was die umgesetzten Kontrollen tatsächlich tragen.',
        body: 'Conference Manager trennt umgesetzte Schutzmaßnahmen von zukünftigen oder umgebungsabhängigen Abnahmen. Die Website macht aus geplanten Kontrollen keine Zertifizierungen, pauschalen Compliance-Aussagen oder unbelegten Sicherheitsgarantien. Produktionsspezifische Aussagen bleiben qualifiziert, bis die reale Umgebung verifiziert ist.',
        statement: 'Enterprise Trust wird belastbarer, wenn Grenzen und Evidenz klar benannt sind.',
      },
    ],
    closing: {
      eyebrow: 'Mit Ihren Anforderungen bewerten',
      title: 'Bringen Sie Security- und Integrationsfragen in das Produktgespräch ein.',
      body: 'Eine sinnvolle Evaluierung verbindet das Conference-Manager-Erlebnis mit den Anforderungen an Zugriff, Datenschutz und Integrationen, die Ihr Unternehmen bereits an Enterprise-Software stellt.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'Produkt ansehen',
    },
  },
};

export function getSecurityTrustCopy(locale: Locale): SecurityTrustCopy {
  return securityTrustCopy[locale];
}
