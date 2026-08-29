import type { Locale } from '@config/locales';

type SecurityTrustPoint = {
  title: string;
  body: string;
};

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
        eyebrow: 'Clear trust boundary',
        title: 'The marketing website is not an authentication system.',
        body: 'The public Conference Manager website is an unauthenticated surface. Login is a normal HTTPS handoff to the Conference Manager application. The website does not authenticate users, resolve tenant authority or become part of the trusted application path.',
        points: [
          {
            title: 'No application tokens or sessions',
            body: 'The marketing website does not own Conference Manager access tokens, refresh tokens or application session state.',
          },
          {
            title: 'No authentication proxy',
            body: 'Authenticated application and API traffic is not proxied through the public marketing site and the authenticated app is not embedded in an iframe.',
          },
        ],
      },
      {
        eyebrow: 'Minimal browser surface',
        title: 'Keep public browser authority deliberately small.',
        body: 'The website is static-first and keeps client-side authority to a minimum. It currently loads no analytics or marketing tracking, uses governed same-origin web fonts and does not ship privileged application credentials in browser code.',
        statement: 'Public presentation stays public. Trusted application authority stays elsewhere.',
      },
      {
        eyebrow: 'Public form boundary',
        title: 'A demo request is treated as hostile input, not trusted application data.',
        body: 'The repository contains a separate server-side demo-request processing boundary with server-side validation, size limits, allowlisting, honeypot handling and plain-text email generation. The public form remains fail-closed until the real endpoint, rate limiting, mailbox, privacy text and operational evidence are accepted.',
        points: [
          {
            title: 'No secrets in the browser',
            body: 'Provider credentials and privileged configuration belong at the server-side processing boundary, not in the public website bundle.',
          },
          {
            title: 'No production-readiness shortcut',
            body: 'Repository implementation and automated tests do not substitute for real endpoint, anti-abuse, mailbox, privacy and logging acceptance.',
          },
        ],
      },
      {
        eyebrow: 'Evidence before assurance',
        title: 'Production security claims start with the real production origin.',
        body: 'The production delivery design requires HTTPS and restrictive controls such as Content Security Policy, HSTS, Referrer Policy, Permissions Policy and nosniff. Those controls are acceptance requirements until the Scaleway origin is provisioned and verified; this page does not turn planned controls into achieved certifications or blanket compliance claims.',
        statement: 'Security & Trust should show evidence and boundaries, not decorative assurance language.',
      },
    ],
    closing: {
      eyebrow: 'Review the boundary',
      title: 'Evaluate trust requirements against the current architecture.',
      body: 'A useful security discussion separates what the public website owns, what belongs to the authenticated application and trusted API, and which production controls still require environment-specific evidence.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore the product',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Klare Vertrauensgrenze',
        title: 'Die Marketing-Website ist kein Authentifizierungssystem.',
        body: 'Die öffentliche Conference-Manager-Website ist eine nicht authentifizierte Oberfläche. Login ist eine normale HTTPS-Weiterleitung zur Conference-Manager-Anwendung. Die Website authentifiziert keine Nutzer, entscheidet keine Tenant-Berechtigung und wird nicht Teil des vertrauenswürdigen Anwendungspfads.',
        points: [
          {
            title: 'Keine Anwendungstokens oder Sessions',
            body: 'Die Marketing-Website besitzt keine Conference-Manager-Access-Tokens, Refresh-Tokens oder Anwendungssessions.',
          },
          {
            title: 'Kein Authentifizierungs-Proxy',
            body: 'Authentifizierter Anwendungs- und API-Verkehr wird nicht über die öffentliche Marketing-Website geleitet und die authentifizierte Anwendung wird nicht per iframe eingebettet.',
          },
        ],
      },
      {
        eyebrow: 'Kleine Browser-Angriffsfläche',
        title: 'Halte die Autorität des öffentlichen Browsers bewusst klein.',
        body: 'Die Website ist static-first und minimiert die Autorität im Browser. Aktuell lädt sie kein Analytics- oder Marketing-Tracking, nutzt kontrollierte Same-Origin-Webfonts und liefert keine privilegierten Anwendungszugangsdaten im Browsercode aus.',
        statement: 'Öffentliche Darstellung bleibt öffentlich. Vertrauenswürdige Anwendungsautorität bleibt an anderer Stelle.',
      },
      {
        eyebrow: 'Öffentliche Formulargrenze',
        title: 'Eine Demo-Anfrage gilt als nicht vertrauenswürdige Eingabe, nicht als Anwendungsdaten.',
        body: 'Das Repository enthält eine getrennte serverseitige Verarbeitung für Demo-Anfragen mit serverseitiger Validierung, Größenlimits, Allowlisting, Honeypot-Behandlung und Plain-Text-E-Mail-Erzeugung. Das öffentliche Formular bleibt fail-closed, bis realer Endpoint, Rate Limiting, Postfach, Datenschutzhinweis und operative Evidenz abgenommen sind.',
        points: [
          {
            title: 'Keine Secrets im Browser',
            body: 'Provider-Zugangsdaten und privilegierte Konfiguration gehören an die serverseitige Verarbeitungsgrenze und nicht in das öffentliche Website-Bundle.',
          },
          {
            title: 'Kein Shortcut zur Produktionsreife',
            body: 'Repository-Implementierung und automatisierte Tests ersetzen keine reale Endpoint-, Anti-Abuse-, Mailbox-, Datenschutz- und Logging-Abnahme.',
          },
        ],
      },
      {
        eyebrow: 'Evidenz vor Zusicherung',
        title: 'Produktive Security-Aussagen beginnen am realen Production-Origin.',
        body: 'Das Produktions-Delivery-Design verlangt HTTPS und restriktive Kontrollen wie Content Security Policy, HSTS, Referrer Policy, Permissions Policy und nosniff. Diese Kontrollen bleiben Abnahmeanforderungen, bis der Scaleway-Origin bereitgestellt und verifiziert ist; diese Seite macht aus geplanten Kontrollen weder erreichte Zertifizierungen noch pauschale Compliance-Aussagen.',
        statement: 'Security & Trust soll Evidenz und Grenzen zeigen – keine dekorative Sicherheitsrhetorik.',
      },
    ],
    closing: {
      eyebrow: 'Grenzen gemeinsam prüfen',
      title: 'Bewerte Trust-Anforderungen gegen die aktuelle Architektur.',
      body: 'Eine sinnvolle Security-Diskussion trennt, was die öffentliche Website besitzt, was zur authentifizierten Anwendung und Trusted API gehört und welche Produktionskontrollen noch umgebungsspezifische Evidenz benötigen.',
      primaryCta: 'Demo buchen',
      secondaryCta: 'Produkt ansehen',
    },
  },
};

export function getSecurityTrustCopy(locale: Locale): SecurityTrustCopy {
  return securityTrustCopy[locale];
}
