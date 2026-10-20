import type { Locale } from '@config/locales';

export type DemoLaunchCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  cold: string;
  customer: string;
  customerText: string;
  customerAction: string;
  sampleData: string;
  pilotTitle: string;
  pilotText: string;
  pilotAction: string;
  platform: string;
  platformText: string;
  platformAction: string;
  boundary: string;
  boundaryText: string;
};

const demoLaunchCopy: Record<Locale, DemoLaunchCopy> = {
  en: {
    eyebrow: 'Conference Manager demo access',
    title: 'Your product demo starts here.',
    lead: 'Open the example environment for your agreed product demo. Explore the meeting workflow using the prepared sample data.',
    cold: 'The demo environment may take a little longer to start after a period of inactivity.',
    customer: 'Explore meeting preparation',
    customerText:
      'Follow a meeting from the employee request to coordination by the conference team. The demo also includes customer administration and the supported combination of employee and conference-team roles.',
    customerAction: 'Open product demo',
    sampleData: 'Example environment · Synthetic data',
    pilotTitle: 'A separate environment for your own meetings',
    pilotText:
      'This example environment uses synthetic data. A pilot with your own real meetings uses a separately configured customer environment.',
    pilotAction: 'Explore setup & pilot',
    platform: 'Separate access for platform operations',
    platformText:
      'This demo is for evaluating platform administration. It is separate from the customer demo and uses its own operator permissions.',
    platformAction: 'Open platform demo',
    boundary: 'About these demo links',
    boundaryText:
      'Each link opens its own demo application. Sign-in, access permissions and data processing are handled there. This launch page does not sign you in or store your application session.',
  },
  de: {
    eyebrow: 'Conference Manager Demo-Zugang',
    title: 'Ihre Produktdemo beginnt hier.',
    lead: 'Öffnen Sie die Beispielumgebung für Ihre vereinbarte Produktdemo. Lernen Sie den Besprechungsablauf mit den vorbereiteten Beispieldaten kennen.',
    cold: 'Nach einer längeren Pause kann die Demo-Umgebung beim ersten Aufruf etwas mehr Zeit zum Starten benötigen.',
    customer: 'Besprechungsvorbereitung kennenlernen',
    customerText:
      'Verfolgen Sie eine Besprechung von der Mitarbeiteranfrage bis zur Koordination durch das Konferenzteam. Die Demo umfasst auch die Kundenadministration und die unterstützte Kombination aus Mitarbeiter- und Konferenzteamrolle.',
    customerAction: 'Produktdemo öffnen',
    sampleData: 'Beispielumgebung · Synthetische Daten',
    pilotTitle: 'Eine eigene Umgebung für Ihre Besprechungen',
    pilotText:
      'Diese Beispielumgebung verwendet synthetische Daten. Ein Pilot mit Ihren eigenen realen Besprechungen findet in einer separat eingerichteten Kundenumgebung statt.',
    pilotAction: 'Einführung & Pilot ansehen',
    platform: 'Separater Zugang für den Plattformbetrieb',
    platformText:
      'Diese Demo dient der Betrachtung der Plattformadministration. Sie ist von der Kundendemo getrennt und verwendet eigene Betreiberberechtigungen.',
    platformAction: 'Plattformdemo öffnen',
    boundary: 'Zu den Demo-Links',
    boundaryText:
      'Jeder Link öffnet eine eigene Demo-Anwendung. Anmeldung, Zugriffsrechte und Datenverarbeitung erfolgen dort. Diese Einstiegsseite meldet Sie nicht an und speichert keine Anwendungssitzung.',
  },
};

export function getDemoLaunchCopy(locale: Locale): DemoLaunchCopy {
  return demoLaunchCopy[locale];
}
