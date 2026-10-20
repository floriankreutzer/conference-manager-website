import type { Locale } from '@config/locales';

type WorkplaceTeamPoint = { title: string; body: string };
type WorkplaceTeamSection = {
  eyebrow: string;
  title: string;
  body: string;
  points?: readonly WorkplaceTeamPoint[];
  statement?: string;
};
type WorkplaceTeamsCopy = {
  sections: readonly WorkplaceTeamSection[];
  closing: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

const workplaceTeamsCopy: Record<Locale, WorkplaceTeamsCopy> = {
  en: {
    sections: [
      {
        eyebrow: 'Office and conference teams',
        title: 'Coordinate the preparation and open decisions.',
        body: 'Review incoming requests, clarify missing details and coordinate the required services. Your team keeps the processing stage and outstanding decisions in view.',
        points: [
          {
            title: 'Coordinate catering',
            body: 'Maintain the catering catalogue, send orders by email and record the supplier’s response with the meeting.',
          },
          {
            title: 'Review changes',
            body: 'Review supported change requests within the agreed approval process and clarify the effect on the services involved.',
          },
        ],
      },
      {
        eyebrow: 'Employees',
        title: 'Provide the information needed for preparation.',
        body: 'Start the request in Conference Manager, provide the meeting details and select the required services. Follow its progress and submit supported changes with the request so the responsible team has the current information.',
      },
      {
        eyebrow: 'Reception, equipment and room preparation',
        title: 'Agree on who handles each part.',
        body: 'Decide during setup which work the conference team coordinates centrally and how service teams participate directly. The agreed supported scope determines the collaboration.',
        points: [
          {
            title: 'Reception',
            body: 'Clarify which information reception needs for the guests’ visit and who passes it on.',
          },
          {
            title: 'Equipment and room preparation',
            body: 'Agree who receives the equipment and room-layout requirements and who coordinates their preparation.',
          },
        ],
      },
      {
        eyebrow: 'IT and customer administration',
        title: 'Clarify access and responsibilities.',
        body: 'Your administrator identifies who submits requests, who handles them and who administers the customer environment. IT helps confirm the required permissions and approvals for supported connections.',
        points: [
          {
            title: 'Role assignment',
            body: 'Agree the supported assignment of application roles. Requirements for automatic mapping of company groups are assessed separately.',
          },
          {
            title: 'Customer prerequisites',
            body: 'Identify the people who can approve the required access and configuration in your existing systems.',
          },
        ],
      },
    ],
    closing: {
      eyebrow: 'Follow the collaboration',
      title: 'See how the work moves between the people involved.',
      body: 'Explore the workflow or review the access questions for your IT team.',
      primaryCta: 'Explore the workflow',
      secondaryCta: 'Review IT requirements',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Office- und Konferenzteams',
        title: 'Vorbereitung und offene Entscheidungen koordinieren.',
        body: 'Eingehende Anfragen prüfen, fehlende Angaben klären und benötigte Leistungen abstimmen. Ihr Team behält den Bearbeitungsstand und offene Entscheidungen im Blick.',
        points: [
          {
            title: 'Catering koordinieren',
            body: 'Den Cateringkatalog pflegen, Bestellungen per E-Mail versenden und die Rückmeldung des Caterers bei der Besprechung festhalten.',
          },
          {
            title: 'Änderungen prüfen',
            body: 'Unterstützte Änderungsanfragen im vereinbarten Freigabeprozess prüfen und die Auswirkungen auf beteiligte Leistungen klären.',
          },
        ],
      },
      {
        eyebrow: 'Mitarbeitende',
        title: 'Die Angaben für die Vorbereitung bereitstellen.',
        body: 'Die Anfrage im Conference Manager starten, Besprechungsdetails ergänzen und benötigte Leistungen auswählen. Den Bearbeitungsstand verfolgen und unterstützte Änderungen bei der Anfrage einreichen, damit das verantwortliche Team mit den aktuellen Angaben arbeitet.',
      },
      {
        eyebrow: 'Empfang, Technik und Raumvorbereitung',
        title: 'Gemeinsam festlegen, wer sich worum kümmert.',
        body: 'Bei der Einrichtung festlegen, welche Aufgaben das Konferenzteam zentral koordiniert und wie Service-Teams direkt mitwirken. Der vereinbarte unterstützte Umfang bestimmt die Zusammenarbeit.',
        points: [
          {
            title: 'Empfang',
            body: 'Klären, welche Angaben der Empfang für den Besuch der Gäste braucht und wer diese weitergibt.',
          },
          {
            title: 'Technik und Raumvorbereitung',
            body: 'Abstimmen, wer die Anforderungen an Ausstattung und Raumaufbau erhält und die Vorbereitung koordiniert.',
          },
        ],
      },
      {
        eyebrow: 'IT und Kundenadministration',
        title: 'Zugriffe und Verantwortung klären.',
        body: 'Ihr Administrator legt fest, wer Anfragen stellt, wer sie bearbeitet und wer die Kundenumgebung verwaltet. Die IT unterstützt bei den erforderlichen Berechtigungen und Freigaben für unterstützte Anbindungen.',
        points: [
          {
            title: 'Rollenvergabe',
            body: 'Die unterstützte Vergabe von Anwendungsrollen abstimmen. Anforderungen an eine automatische Zuordnung von Unternehmensgruppen werden gesondert geprüft.',
          },
          {
            title: 'Voraussetzungen beim Kunden',
            body: 'Benennen, wer die benötigten Zugriffe und Einstellungen in den vorhandenen Systemen freigeben kann.',
          },
        ],
      },
    ],
    closing: {
      eyebrow: 'Die Zusammenarbeit nachvollziehen',
      title: 'Sehen, wie die Aufgaben zwischen den Beteiligten weitergehen.',
      body: 'Lernen Sie den Ablauf kennen oder prüfen Sie die Zugriffsfragen für Ihre IT.',
      primaryCta: 'Den Ablauf kennenlernen',
      secondaryCta: 'IT-Anforderungen prüfen',
    },
  },
};

export function getWorkplaceTeamsCopy(locale: Locale): WorkplaceTeamsCopy {
  return workplaceTeamsCopy[locale];
}
