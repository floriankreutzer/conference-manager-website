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
  closing: { eyebrow: string; title: string; body: string; primaryCta: string; secondaryCta: string };
};

const securityTrustCopy: Record<Locale, SecurityTrustCopy> = {
  en: {
    sections: [
      {
        eyebrow: 'Clear application boundary',
        title: 'Marketing and application access remain separate by design.',
        body: 'The public website explains Conference Manager and provides a secure handoff to the application. Authentication, tenant authorization and application sessions stay with the Conference Manager application rather than being duplicated in the marketing layer.',
        points: [
          { title: 'Application sessions stay with the product', body: 'The public website does not own Conference Manager access tokens, refresh tokens or authenticated session state.' },
          { title: 'Login is a handoff, not a second sign-in flow', body: 'Existing users move to the application-owned authentication flow through an ordinary HTTPS link.' },
        ],
      },
      {
        eyebrow: 'Minimal public surface',
        title: 'Keep the public website intentionally lightweight.',
        body: 'The website is static-first, keeps browser-side authority small and currently loads no analytics or marketing tracking. Governed same-origin fonts and a limited dependency surface reduce unnecessary third-party exposure in the first public experience.',
        statement: 'The marketing experience stays public. Trusted product authority stays with the application and API.',
      },
      {
        eyebrow: 'Demo request boundary',
        title: 'Public enquiries are handled separately from application data.',
        body: 'The demo-request path uses a dedicated server-side processing boundary with input validation, request limits, anti-automation measures and plain-text email generation. It remains disabled for production use until the real endpoint, durable rate limiting, mailbox and privacy controls are accepted.',
        points: [
          { title: 'No privileged secrets in the website', body: 'Provider credentials and privileged configuration remain server-side and are not shipped in the public browser bundle.' },
          { title: 'Operational acceptance still matters', body: 'Automated repository tests support confidence but do not replace real endpoint, mailbox, privacy, logging and anti-abuse evidence.' },
        ],
      },
      {
        eyebrow: 'Evidence before assurance',
        title: 'Trust claims follow verified controls, not marketing language.',
        body: 'The production design requires HTTPS and restrictive browser/security controls. Those requirements remain subject to real Scaleway production-origin verification. Conference Manager does not turn planned controls into certifications, blanket compliance statements or unsupported security guarantees.',
        statement: 'Enterprise trust starts with clear boundaries and evidence.',
      },
    ],
    closing: {
      eyebrow: 'Evaluate what matters',
      title: 'Review the trust model against your enterprise requirements.',
      body: 'A useful security discussion separates the public website, authenticated product, trusted API and the environment-specific controls that still require production evidence.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore the product',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Klare Anwendungsgrenze',
        title: 'Marketing und Anwendungszugriff bleiben bewusst getrennt.',
        body: 'Die öffentliche Website erklärt Conference Manager und führt bestehende Nutzer sicher zur Anwendung. Authentifizierung, Tenant-Berechtigung und Anwendungssessions verbleiben in der Conference-Manager-Anwendung und werden nicht in der Marketing-Ebene dupliziert.',
        points: [
          { title: 'Anwendungssessions bleiben im Produkt', body: 'Die öffentliche Website besitzt keine Conference-Manager-Access-Tokens, Refresh-Tokens oder authentifizierten Anwendungssessions.' },
          { title: 'Login ist eine Übergabe, kein zweiter Anmeldeprozess', body: 'Bestehende Nutzer wechseln über einen normalen HTTPS-Link in den von der Anwendung verantworteten Authentifizierungsprozess.' },
        ],
      },
      {
        eyebrow: 'Kleine öffentliche Angriffsfläche',
        title: 'Halten Sie die öffentliche Website bewusst leichtgewichtig.',
        body: 'Die Website ist Static-first, hält Browser-Autorität klein und lädt aktuell weder Analytics noch Marketing-Tracking. Kontrollierte Same-Origin-Webfonts und eine begrenzte Dependency-Fläche reduzieren unnötige Drittanbieterabhängigkeiten in der ersten öffentlichen Erfahrung.',
        statement: 'Die Marketing-Erfahrung bleibt öffentlich. Vertrauenswürdige Produkt-Autorität bleibt bei Anwendung und API.',
      },
      {
        eyebrow: 'Getrennte Demo-Anfrage',
        title: 'Öffentliche Anfragen werden getrennt von Anwendungsdaten verarbeitet.',
        body: 'Der Demo-Anfragepfad nutzt eine dedizierte serverseitige Verarbeitung mit Eingabevalidierung, Request-Limits, Anti-Automation-Maßnahmen und Plain-Text-E-Mail-Erzeugung. Für produktiven Einsatz bleibt er deaktiviert, bis realer Endpoint, dauerhaftes Rate Limiting, Postfach und Datenschutzkontrollen abgenommen sind.',
        points: [
          { title: 'Keine privilegierten Secrets in der Website', body: 'Provider-Zugangsdaten und privilegierte Konfiguration bleiben serverseitig und werden nicht im öffentlichen Browser-Bundle ausgeliefert.' },
          { title: 'Operative Abnahme bleibt erforderlich', body: 'Automatisierte Repository-Tests unterstützen die Qualität, ersetzen aber keine reale Endpoint-, Mailbox-, Datenschutz-, Logging- und Anti-Abuse-Evidenz.' },
        ],
      },
      {
        eyebrow: 'Evidenz vor Zusicherung',
        title: 'Trust-Aussagen folgen verifizierten Kontrollen – nicht Marketingformulierungen.',
        body: 'Das Produktionsdesign verlangt HTTPS und restriktive Browser- und Security-Kontrollen. Diese Anforderungen bleiben von der Verifikation des realen Scaleway-Production-Origins abhängig. Conference Manager macht aus geplanten Kontrollen keine Zertifizierungen, pauschalen Compliance-Aussagen oder unbelegten Sicherheitsgarantien.',
        statement: 'Enterprise Trust beginnt mit klaren Grenzen und belastbarer Evidenz.',
      },
    ],
    closing: {
      eyebrow: 'Relevante Anforderungen prüfen',
      title: 'Bewerten Sie das Trust-Modell gegen Ihre Enterprise-Anforderungen.',
      body: 'Eine sinnvolle Security-Diskussion trennt öffentliche Website, authentifiziertes Produkt, Trusted API und die umgebungsspezifischen Kontrollen, die weiterhin reale Produktionsevidenz benötigen.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'Produkt ansehen',
    },
  },
};

export function getSecurityTrustCopy(locale: Locale): SecurityTrustCopy {
  return securityTrustCopy[locale];
}
