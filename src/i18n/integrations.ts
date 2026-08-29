import type { Locale } from '@config/locales';

type IntegrationPoint = { title: string; body: string };
type IntegrationSection = {
  eyebrow: string;
  title: string;
  body: string;
  points?: readonly IntegrationPoint[];
  statement?: string;
};
type IntegrationsCopy = {
  sections: readonly IntegrationSection[];
  closing: { eyebrow: string; title: string; body: string; primaryCta: string; secondaryCta: string };
};

const integrationsCopy: Record<Locale, IntegrationsCopy> = {
  en: {
    sections: [
      {
        eyebrow: 'Integration principle',
        title: 'Keep the systems that already own a responsibility.',
        body: 'Conference Manager is designed to connect the wider conference journey to specialist systems rather than copy their job. Room booking remains responsible for reservations, identity remains part of the enterprise environment and connected workplace services keep their own operating role.',
        statement: 'Connect the conference journey. Do not replace specialist systems by default.',
      },
      {
        eyebrow: 'Microsoft 365 · Initial enterprise focus',
        title: 'Fit Conference Manager into an existing Microsoft environment.',
        body: 'The current Microsoft integration scope covers Entra-based tenant connection and Microsoft 365 room/calendar capabilities needed for the pilot model. That allows Conference Manager to work with existing enterprise identity and room context instead of asking customers to create an isolated calendar process. Real tenant use still requires the relevant Microsoft setup and operational acceptance.',
        points: [
          { title: 'Room resources', body: 'Microsoft 365 room resources can be discovered and mapped through the controlled tenant integration.' },
          { title: 'Availability and calendar context', body: 'Free/Busy and calendar synchronization are supported within the accepted integration configuration.' },
        ],
      },
      {
        eyebrow: 'Controlled permissions',
        title: 'Integration access is enabled deliberately, not assumed.',
        body: 'Calendar write capabilities remain conditional on the required Microsoft and Exchange controls. Conference Manager does not present broad provider access as a default entitlement for every tenant.',
        statement: 'Enterprise integration should fit the customer control model, not bypass it.',
      },
      {
        eyebrow: 'Designed to extend',
        title: 'The integration model can grow without turning future plans into current claims.',
        body: 'Conference Manager separates conference workflow responsibilities from provider-specific calendar behavior. That supports future adapters without coupling the product story to one provider. Microsoft 365 and Entra are the current focus; other providers are not presented as available until they are actually delivered and accepted.',
        points: [
          { title: 'Provider-independent conference logic', body: 'The conference journey remains distinct from provider-specific room and calendar references.' },
          { title: 'Trusted server-side integration', body: 'Provider credentials and integration authority remain outside the public website and employee browser experience.' },
        ],
      },
    ],
    closing: {
      eyebrow: 'Map your environment',
      title: 'Start with the systems your organisation already depends on.',
      body: 'A useful integration discussion identifies room-booking authority, identity requirements, Microsoft 365 constraints and the controls needed before real provider access is enabled.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore the product',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Integrationsprinzip',
        title: 'Behalten Sie die Systeme, die bereits eine klare Verantwortung tragen.',
        body: 'Conference Manager verbindet den weitergehenden Konferenzablauf mit spezialisierten Systemen, statt deren Aufgabe zu kopieren. Die Raumbuchung bleibt für Reservierungen verantwortlich, Identity bleibt Teil der Enterprise-Umgebung und angebundene Workplace Services behalten ihre operative Rolle.',
        statement: 'Den Konferenzablauf verbinden. Spezialisierte Systeme nicht standardmäßig ersetzen.',
      },
      {
        eyebrow: 'Microsoft 365 · Erster Enterprise-Fokus',
        title: 'Binden Sie Conference Manager in Ihre bestehende Microsoft-Umgebung ein.',
        body: 'Der aktuelle Microsoft-Integrationsumfang umfasst die Entra-basierte Tenant-Anbindung sowie Microsoft-365-Raum- und Kalenderfunktionen für das Pilotmodell. So kann Conference Manager vorhandene Enterprise-Identity und Raumkontext nutzen, statt einen isolierten Kalenderprozess einzuführen. Der reale Tenant-Betrieb setzt weiterhin die passende Microsoft-Konfiguration und operative Abnahme voraus.',
        points: [
          { title: 'Raumressourcen', body: 'Microsoft-365-Raumressourcen können über die kontrollierte Tenant-Integration ermittelt und zugeordnet werden.' },
          { title: 'Verfügbarkeit und Kalenderkontext', body: 'Free/Busy und Kalendersynchronisierung werden innerhalb der abgenommenen Integrationskonfiguration unterstützt.' },
        ],
      },
      {
        eyebrow: 'Kontrollierte Berechtigungen',
        title: 'Integrationszugriff wird bewusst freigegeben – nicht vorausgesetzt.',
        body: 'Kalender-Schreibzugriffe bleiben an die erforderlichen Microsoft- und Exchange-Kontrollen gebunden. Conference Manager stellt weitreichenden Provider-Zugriff nicht als pauschalen Standard für jeden Tenant dar.',
        statement: 'Enterprise-Integration soll in das Kontrollmodell des Kunden passen – nicht daran vorbeigehen.',
      },
      {
        eyebrow: 'Erweiterbar gedacht',
        title: 'Das Integrationsmodell kann wachsen, ohne Zukunftspläne als heutige Funktionen darzustellen.',
        body: 'Conference Manager trennt die Verantwortung des Konferenzablaufs von providerspezifischem Kalenderverhalten. Das schafft Raum für spätere Adapter, ohne die Produktstory an einen einzelnen Provider zu koppeln. Microsoft 365 und Entra sind der aktuelle Fokus; andere Provider werden erst dann als verfügbar dargestellt, wenn sie tatsächlich geliefert und abgenommen sind.',
        points: [
          { title: 'Providerunabhängige Konferenzlogik', body: 'Der Konferenzablauf bleibt von providerspezifischen Raum- und Kalenderreferenzen getrennt.' },
          { title: 'Vertrauenswürdige serverseitige Integration', body: 'Provider-Zugangsdaten und Integrationsautorität bleiben außerhalb der öffentlichen Website und der Employee Experience im Browser.' },
        ],
      },
    ],
    closing: {
      eyebrow: 'Ihre Umgebung als Ausgangspunkt',
      title: 'Beginnen Sie mit den Systemen, auf die Ihre Organisation bereits angewiesen ist.',
      body: 'Eine sinnvolle Integrationsdiskussion klärt führende Raumbuchung, Identity-Anforderungen, Microsoft-365-Rahmenbedingungen und die Kontrollen, die vor realem Provider-Zugriff erfüllt sein müssen.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'Produkt ansehen',
    },
  },
};

export function getIntegrationsCopy(locale: Locale): IntegrationsCopy {
  return integrationsCopy[locale];
}
