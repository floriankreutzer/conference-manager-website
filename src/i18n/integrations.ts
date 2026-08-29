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
        title: 'Keep the systems your workplace already relies on.',
        body: 'Conference Manager is designed to add conference coordination around specialist systems rather than replace them by default. Room booking can continue to own the reservation, while identity and collaboration remain part of the enterprise environment your organisation already manages.',
        statement: 'Improve the conference journey without creating a replacement programme.',
      },
      {
        eyebrow: 'Microsoft 365 · Initial enterprise focus',
        title: 'Use Conference Manager with your existing Microsoft environment.',
        body: 'The current Microsoft focus lets Conference Manager work with Entra-based access and Microsoft 365 room and calendar context used by the pilot model. That means organisations can build on familiar enterprise capabilities instead of introducing an isolated calendar process. Real use still depends on the Microsoft configuration and approvals chosen by the customer.',
        points: [
          {
            title: 'Existing room resources',
            body: 'Use room resources already managed in Microsoft 365 as part of the conference journey.',
          },
          {
            title: 'Availability and calendar context',
            body: 'Bring the room availability and calendar context needed for the supported conference flow into the experience.',
          },
        ],
      },
      {
        eyebrow: 'Controlled enterprise access',
        title: 'Enable only the access your organisation is ready to allow.',
        body: 'Conference Manager does not assume broad calendar access. Capabilities that can change calendar information remain dependent on the Microsoft and Exchange controls selected for the customer environment.',
        statement: 'Integration should fit your control model, not work around it.',
      },
      {
        eyebrow: 'Designed to extend',
        title: 'Add connected systems over time without changing the conference story.',
        body: 'Conference Manager keeps the conference journey separate from the details of any one room or calendar provider. Microsoft 365 and Entra are the current focus. Other providers are described as available only after the relevant integration has actually been delivered and accepted.',
        points: [
          {
            title: 'A stable conference experience',
            body: 'Employees and Workplace Teams can keep a consistent conference journey even when specialist systems differ between organisations.',
          },
          {
            title: 'Sensitive access stays out of the public site',
            body: 'Credentials and privileged integration access are handled outside the public marketing website and employee browser experience.',
          },
        ],
      },
    ],
    closing: {
      eyebrow: 'Start with your environment',
      title: 'See how Conference Manager can fit the systems you already use.',
      body: 'Bring your current room-booking and Microsoft 365 setup to a demo. We can map what should remain in place, what Conference Manager adds and which customer controls matter before an integration is enabled.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore the product',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Integrationsprinzip',
        title: 'Behalten Sie die Systeme, auf die Ihre Arbeitswelt bereits angewiesen ist.',
        body: 'Conference Manager ergänzt die Konferenzkoordination rund um spezialisierte Systeme, statt sie standardmäßig zu ersetzen. Ihre Raumbuchung kann weiterhin die Reservierung verantworten; Identität und Zusammenarbeit bleiben Teil der Enterprise-Umgebung, die Ihr Unternehmen bereits betreibt.',
        statement: 'Verbessern Sie den Konferenzablauf, ohne daraus ein Austauschprojekt zu machen.',
      },
      {
        eyebrow: 'Microsoft 365 · Erster Enterprise-Fokus',
        title: 'Nutzen Sie Conference Manager mit Ihrer bestehenden Microsoft-Umgebung.',
        body: 'Der aktuelle Microsoft-Fokus verbindet Conference Manager mit Entra-basiertem Zugang sowie dem Microsoft-365-Raum- und Kalenderkontext des Pilotmodells. Unternehmen können damit auf vertrauten Enterprise-Fähigkeiten aufbauen, statt einen isolierten Kalenderprozess einzuführen. Die reale Nutzung hängt weiterhin von der Microsoft-Konfiguration und den Freigaben ab, die der Kunde für seine Umgebung festlegt.',
        points: [
          {
            title: 'Vorhandene Raumressourcen',
            body: 'Nutzen Sie bereits in Microsoft 365 verwaltete Räume als Teil des Konferenzablaufs.',
          },
          {
            title: 'Verfügbarkeit und Kalenderkontext',
            body: 'Binden Sie die für den unterstützten Konferenzablauf benötigte Raumverfügbarkeit und den Kalenderkontext ein.',
          },
        ],
      },
      {
        eyebrow: 'Kontrollierter Enterprise-Zugriff',
        title: 'Aktivieren Sie nur den Zugriff, den Ihre Organisation freigeben möchte.',
        body: 'Conference Manager setzt keinen weitreichenden Kalenderzugriff voraus. Funktionen, die Kalenderinformationen verändern können, bleiben von den Microsoft- und Exchange-Kontrollen abhängig, die für die jeweilige Kundenumgebung festgelegt werden.',
        statement: 'Integration soll zu Ihrem Kontrollmodell passen – nicht daran vorbeiarbeiten.',
      },
      {
        eyebrow: 'Erweiterbar gedacht',
        title: 'Ergänzen Sie weitere angebundene Systeme, ohne die Konferenzstory neu zu bauen.',
        body: 'Conference Manager hält den Konferenzablauf von den Details eines einzelnen Raum- oder Kalenderanbieters getrennt. Microsoft 365 und Entra sind der aktuelle Fokus. Weitere Anbieter werden erst dann als verfügbar beschrieben, wenn die jeweilige Integration tatsächlich geliefert und abgenommen ist.',
        points: [
          {
            title: 'Ein konsistentes Konferenzerlebnis',
            body: 'Mitarbeitende und Workplace Teams können einen stabilen Ablauf behalten, auch wenn spezialisierte Systeme zwischen Unternehmen unterschiedlich sind.',
          },
          {
            title: 'Sensibler Zugriff bleibt außerhalb der öffentlichen Website',
            body: 'Zugangsdaten und privilegierter Integrationszugriff werden nicht in der öffentlichen Marketingwebsite oder im Browser der Mitarbeitenden verarbeitet.',
          },
        ],
      },
    ],
    closing: {
      eyebrow: 'Ihre Umgebung als Ausgangspunkt',
      title: 'Sehen Sie, wie Conference Manager zu Ihren bestehenden Systemen passt.',
      body: 'Bringen Sie Ihre heutige Raumbuchung und Microsoft-365-Umgebung mit in die Demo. Gemeinsam lässt sich klären, was bestehen bleibt, was Conference Manager ergänzt und welche Kundenvorgaben vor der Aktivierung einer Integration relevant sind.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'Produkt ansehen',
    },
  },
};

export function getIntegrationsCopy(locale: Locale): IntegrationsCopy {
  return integrationsCopy[locale];
}
