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
        eyebrow: 'Enterprise access',
        title: 'A simple employee journey without giving up organisational control.',
        body: 'Conference Manager keeps the employee experience straightforward while access to the product remains governed through the application. The current enterprise direction is built around Microsoft Entra, role-aware access and administration that stays with the customer environment rather than the public website.',
        points: [
          {
            title: 'Enterprise identity',
            body: 'Existing users enter the protected Conference Manager application through the configured enterprise sign-in journey instead of creating a separate public-site account.',
          },
          {
            title: 'Role-aware access',
            body: 'Product capabilities are exposed according to the roles and permissions defined for the Conference Manager environment.',
          },
        ],
      },
      {
        eyebrow: 'Data and privacy',
        title: 'Keep customer operations separate from public marketing.',
        body: 'The public website can explain Conference Manager without access to a customer session or operational conference data. Product work stays inside the authenticated application, while demo enquiries use a separate public processing path.',
        statement:
          'Your conference operations should not need to pass through the marketing website to use the product.',
      },
      {
        eyebrow: 'Controlled integrations',
        title: 'Connect to your environment without handing control away.',
        body: 'Conference Manager is designed to work alongside existing room-booking, identity and Microsoft 365 capabilities. Real integration use depends on the configuration and approvals selected for the customer environment, so connections are introduced deliberately rather than assumed by default.',
        points: [
          {
            title: 'Existing systems keep their responsibilities',
            body: 'Room booking and other specialist workplace systems remain responsible for the functions they already own.',
          },
          {
            title: 'Customer-specific enablement',
            body: 'Microsoft 365 and Entra integration is enabled only where the required customer configuration and approvals are in place.',
          },
        ],
      },
      {
        eyebrow: 'Evidence before claims',
        title: 'Trust should come from verifiable answers, not badges we cannot prove.',
        body: 'Conference Manager does not turn planned controls into certifications or broad compliance guarantees. Security, privacy and production-specific statements stay tied to implemented controls and the environment being evaluated, so your IT and security teams can assess the product against real requirements.',
        statement: 'We would rather give you a precise answer than an oversized security claim.',
      },
    ],
    closing: {
      eyebrow: 'Evaluate the fit',
      title: 'Review the product in the context of your identity and integration landscape.',
      body: 'Start with how Conference Manager connects to the systems you already use, then bring the relevant access, privacy and security questions into the evaluation.',
      primaryCta: 'Explore integrations',
      secondaryCta: 'Explore the product',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Enterprise-Zugriff',
        title: 'Ein einfacher Anfrageprozess, ohne die Kontrolle des Unternehmens aufzugeben.',
        body: 'Conference Manager hält die Nutzung für Mitarbeitende bewusst einfach, während der Produktzugang in der Anwendung gesteuert bleibt. Die aktuelle Enterprise-Ausrichtung basiert auf Microsoft Entra, rollenbezogenem Zugriff und einer Administration, die in der Kundenumgebung bleibt statt auf der öffentlichen Website.',
        points: [
          {
            title: 'Enterprise Identity',
            body: 'Bestehende Nutzer gelangen über den konfigurierten Enterprise-Login in die geschützte Conference-Manager-Anwendung statt ein separates Konto auf der Marketingwebsite anzulegen.',
          },
          {
            title: 'Rollenbezogener Zugriff',
            body: 'Produktfunktionen werden entsprechend den Rollen und Berechtigungen der jeweiligen Conference-Manager-Umgebung bereitgestellt.',
          },
        ],
      },
      {
        eyebrow: 'Daten und Datenschutz',
        title: 'Kundenbetrieb und öffentliches Marketing bleiben getrennt.',
        body: 'Die öffentliche Website kann Conference Manager erklären, ohne Zugriff auf eine Kundensitzung oder operative Konferenzdaten zu benötigen. Die eigentliche Produktarbeit bleibt in der authentifizierten Anwendung; Demo-Anfragen laufen über einen getrennten öffentlichen Verarbeitungsweg.',
        statement:
          'Ihre Konferenzprozesse müssen nicht über die Marketingwebsite laufen, um Conference Manager zu nutzen.',
      },
      {
        eyebrow: 'Kontrollierte Integrationen',
        title: 'An Ihre Umgebung anbinden, ohne die Kontrolle abzugeben.',
        body: 'Conference Manager ist darauf ausgelegt, mit bestehender Raumbuchung, Identity und Microsoft 365 zusammenzuarbeiten. Die reale Integrationsnutzung hängt von der Konfiguration und den Freigaben der jeweiligen Kundenumgebung ab. Verbindungen werden deshalb bewusst aktiviert und nicht einfach vorausgesetzt.',
        points: [
          {
            title: 'Bestehende Systeme behalten ihre Aufgaben',
            body: 'Raumbuchung und andere spezialisierte Workplace-Systeme bleiben für die Funktionen verantwortlich, die sie bereits übernehmen.',
          },
          {
            title: 'Kundenspezifische Aktivierung',
            body: 'Microsoft 365 und Entra werden nur dort angebunden, wo die erforderliche Kundenkonfiguration und die notwendigen Freigaben vorhanden sind.',
          },
        ],
      },
      {
        eyebrow: 'Evidenz vor Behauptungen',
        title: 'Vertrauen entsteht durch überprüfbare Antworten, nicht durch unbelegte Badges.',
        body: 'Conference Manager macht aus geplanten Kontrollen keine Zertifizierungen oder pauschalen Compliance-Garantien. Aussagen zu Security, Datenschutz und Produktion bleiben an umgesetzte Kontrollen und die konkret bewertete Umgebung gebunden, damit Ihre IT- und Security-Teams das Produkt gegen reale Anforderungen prüfen können.',
        statement: 'Eine präzise Antwort ist wertvoller als ein zu großes Sicherheitsversprechen.',
      },
    ],
    closing: {
      eyebrow: 'Den Fit bewerten',
      title:
        'Bewerten Sie Conference Manager im Kontext Ihrer Identity- und Integrationslandschaft.',
      body: 'Starten Sie damit, wie sich Conference Manager an bestehende Systeme anbinden lässt, und bringen Sie anschließend die relevanten Fragen zu Zugriff, Datenschutz und Security in die Bewertung ein.',
      primaryCta: 'Integrationen ansehen',
      secondaryCta: 'Produkt ansehen',
    },
  },
};

export function getSecurityTrustCopy(locale: Locale): SecurityTrustCopy {
  return securityTrustCopy[locale];
}
