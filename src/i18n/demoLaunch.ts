import type { Locale } from '@config/locales';

export type DemoLaunchCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  cold: string;
  customer: string;
  customerText: string;
  customerAction: string;
  platform: string;
  platformText: string;
  platformAction: string;
  boundary: string;
  boundaryText: string;
};

const demoLaunchCopy: Record<Locale, DemoLaunchCopy> = {
  en: {
    eyebrow: 'Conference Manager Demo',
    title: 'Choose the Demo experience',
    lead: 'This static launch surface stores no login, session, Tenant ID, role or permission.',
    cold: 'The free Demo services can require additional startup time on the first request after inactivity.',
    customer: 'Customer Demo',
    customerText:
      'Employee, Conference Manager, Tenant Admin and the approved dual-role combination with synthetic Demo data.',
    customerAction: 'Launch Customer Demo',
    platform: 'Platform Demo',
    platformText:
      'Separate Platform Operator experience. Customer roles and Platform authority remain isolated.',
    platformAction: 'Launch Platform Demo',
    boundary: 'Security boundary',
    boundaryText:
      'This page is not an authentication, API, persistence or authorization layer. Both actions navigate directly to the separate HTTPS Demo services.',
  },
  de: {
    eyebrow: 'Conference Manager Demo',
    title: 'Demo-Umgebung auswählen',
    lead: 'Dieser statische Absprungpunkt speichert keine Anmeldung, Session, Tenant-ID, Rolle oder Berechtigung.',
    cold: 'Die kostenlosen Demo-Services können nach Inaktivität beim ersten Aufruf zusätzliche Startzeit benötigen.',
    customer: 'Customer Demo',
    customerText:
      'Mitarbeiter, Conference Manager, Tenant Admin und die freigegebene Dual-Role-Kombination mit synthetischen Demo-Daten.',
    customerAction: 'Customer Demo starten',
    platform: 'Platform Demo',
    platformText:
      'Getrennte Platform-Operator-Erfahrung. Customer-Rollen und Platform-Berechtigungen bleiben isoliert.',
    platformAction: 'Platform Demo starten',
    boundary: 'Sicherheitsgrenze',
    boundaryText:
      'Diese Seite ist kein Authentifizierungs-, API-, Persistenz- oder Autorisierungs-Layer. Beide Aktionen navigieren direkt zu den getrennten HTTPS-Demo-Services.',
  },
};

export function getDemoLaunchCopy(locale: Locale): DemoLaunchCopy {
  return demoLaunchCopy[locale];
}
