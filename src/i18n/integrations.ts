import type { Locale } from '@config/locales';

type IntegrationPoint = {
  title: string;
  body: string;
};

type IntegrationSection = {
  eyebrow: string;
  title: string;
  body: string;
  points?: readonly IntegrationPoint[];
  statement?: string;
};

type IntegrationsCopy = {
  sections: readonly IntegrationSection[];
  closing: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

const integrationsCopy: Record<Locale, IntegrationsCopy> = {
  en: {
    sections: [
      {
        eyebrow: 'Integration principle',
        title: 'Keep authoritative systems responsible for what they already do well.',
        body: 'Conference Manager is designed around the wider conference context, not around replacing specialist infrastructure. Room booking, identity and connected workplace services should remain authoritative for their own responsibilities while Conference Manager coordinates the conference journey around them.',
        statement: 'Connect responsibilities. Do not duplicate them by default.',
      },
      {
        eyebrow: 'Microsoft 365 · Pilot implementation',
        title: 'Microsoft integration is implemented, with real-environment acceptance still required.',
        body: 'The trusted Conference Manager API contains the SaaS 1 implementation for Microsoft Entra identity and the Microsoft 365 connection lifecycle. That implementation includes tenant consent handling, room discovery and mapping, Free/Busy, calendar synchronization and integration-health behavior. Real Microsoft tenant, deployment and operational evidence remains an external Pilot acceptance gate.',
        points: [
          {
            title: 'Room discovery and mapping',
            body: 'The backend implementation can discover and map Microsoft 365 room resources within the controlled tenant integration flow.',
          },
          {
            title: 'Free/Busy and synchronization',
            body: 'Availability and calendar synchronization are implemented behind the trusted backend boundary and remain subject to provider and tenant configuration.',
          },
        ],
      },
      {
        eyebrow: 'Calendar write',
        title: 'Implemented does not mean unrestricted write access.',
        body: 'Calendar Write is deliberately gated. The current backend documentation requires the Exchange Application RBAC release conditions to be satisfied before write behavior is enabled. The public website therefore does not describe calendar write as universally active or available for every tenant.',
        statement: 'Provider access stays conditional on the controls required for that integration.',
      },
      {
        eyebrow: 'Extensible architecture',
        title: 'Future providers can fit the model without becoming current product claims.',
        body: 'The trusted backend defines provider-neutral contracts for availability, reservation validation and calendar operations. That creates an architectural extension point for later adapters. It does not mean that Google, Okta or any other future provider is currently available, supported or production-ready.',
        points: [
          {
            title: 'Provider-neutral contracts',
            body: 'Conference workflow semantics are separated from provider-specific calendar references and adapter behavior.',
          },
          {
            title: 'Server-side authority',
            body: 'Provider credentials, Microsoft Graph access and integration authority remain in the trusted API. The marketing website does not call Graph or hold integration secrets.',
          },
        ],
      },
    ],
    closing: {
      eyebrow: 'Map your environment',
      title: 'Start with the systems that must remain authoritative.',
      body: 'A useful integration discussion starts with the customer environment: room-booking authority, identity requirements, Microsoft 365 tenant constraints and the evidence required before a Pilot can use real provider access.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore the product',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Integrationsprinzip',
        title: 'Lass führende Systeme für das verantwortlich, was sie bereits gut lösen.',
        body: 'Conference Manager ist rund um den weitergehenden Konferenzkontext gestaltet und nicht als Ersatz spezialisierter Infrastruktur. Raumbuchung, Identity und verbundene Workplace Services sollen für ihre eigenen Aufgaben führend bleiben, während Conference Manager den Konferenzablauf darum herum koordiniert.',
        statement: 'Verantwortlichkeiten verbinden. Nicht standardmäßig duplizieren.',
      },
      {
        eyebrow: 'Microsoft 365 · Pilot-Implementierung',
        title: 'Die Microsoft-Integration ist implementiert, benötigt aber reale Umgebungsabnahme.',
        body: 'Die Trusted Conference Manager API enthält die SaaS-1-Implementierung für Microsoft Entra Identity und den Microsoft-365-Connection-Lifecycle. Dazu gehören Tenant-Consent, Raumermittlung und -mapping, Free/Busy, Kalendersynchronisierung und Integration-Health-Verhalten. Reale Microsoft-Tenant-, Deployment- und Betriebsevidenz bleibt Bestandteil der externen Pilot-Abnahme.',
        points: [
          {
            title: 'Raumermittlung und Mapping',
            body: 'Die Backend-Implementierung kann Microsoft-365-Raumressourcen im kontrollierten Tenant-Integrationsablauf ermitteln und zuordnen.',
          },
          {
            title: 'Free/Busy und Synchronisierung',
            body: 'Verfügbarkeit und Kalendersynchronisierung sind hinter der Trusted-Backend-Grenze implementiert und bleiben von Provider- und Tenant-Konfiguration abhängig.',
          },
        ],
      },
      {
        eyebrow: 'Calendar Write',
        title: 'Implementiert bedeutet nicht uneingeschränkten Schreibzugriff.',
        body: 'Calendar Write ist bewusst gegated. Die aktuelle Backend-Dokumentation verlangt, dass die Exchange-Application-RBAC-Releasebedingungen erfüllt sind, bevor Schreibzugriffe aktiviert werden. Die öffentliche Website stellt Calendar Write deshalb nicht als allgemein aktiv oder für jeden Tenant verfügbar dar.',
        statement:
          'Provider-Zugriff bleibt an die für die jeweilige Integration erforderlichen Kontrollen gebunden.',
      },
      {
        eyebrow: 'Erweiterbare Architektur',
        title: 'Künftige Provider können in das Modell passen, ohne heutige Produktclaims zu werden.',
        body: 'Das Trusted Backend definiert providerneutrale Verträge für Verfügbarkeit, Reservierungsvalidierung und Kalenderoperationen. Damit existiert ein architektonischer Erweiterungspunkt für spätere Adapter. Das bedeutet nicht, dass Google, Okta oder andere künftige Provider heute verfügbar, unterstützt oder produktionsreif sind.',
        points: [
          {
            title: 'Providerneutrale Verträge',
            body: 'Konferenz-Workflow-Semantik ist von providerspezifischen Kalenderreferenzen und Adapterverhalten getrennt.',
          },
          {
            title: 'Serverseitige Autorität',
            body: 'Provider-Zugangsdaten, Microsoft-Graph-Zugriff und Integrationsautorität verbleiben in der Trusted API. Die Marketing-Website ruft Graph nicht auf und besitzt keine Integrations-Secrets.',
          },
        ],
      },
    ],
    closing: {
      eyebrow: 'Deine Umgebung abbilden',
      title: 'Beginne mit den Systemen, die führend bleiben müssen.',
      body: 'Eine sinnvolle Integrationsdiskussion beginnt mit der Kundenumgebung: führende Raumbuchung, Identity-Anforderungen, Microsoft-365-Tenant-Rahmenbedingungen und der Evidenz, die vor realem Provider-Zugriff in einem Pilot benötigt wird.',
      primaryCta: 'Demo buchen',
      secondaryCta: 'Produkt ansehen',
    },
  },
};

export function getIntegrationsCopy(locale: Locale): IntegrationsCopy {
  return integrationsCopy[locale];
}
