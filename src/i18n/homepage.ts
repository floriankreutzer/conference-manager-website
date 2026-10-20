import type { Locale } from '@config/locales';

type Card = { title: string; body: string };
type Section = { eyebrow: string; title: string; body: string };
type HomepageCopy = {
  meta: { title: string; description: string };
  hero: Section & {
    outcome: string;
    connection: string;
    primaryCta: string;
    secondaryCta: string;
    pilot: string;
    setup: string;
  };
  overview: { label: string; items: string[] };
  problem: Section & { cards: Card[] };
  howItWorks: Section & { detailLink: string };
  roomBooking: Section & {
    supporting: string;
    nodes: (Card & { label: string })[];
    replacement: Card;
    detailLink: string;
  };
  value: Section & { cards: Card[]; detailLink: string };
  audiences: Section & { cards: Card[]; detailLink: string };
  pilot: Section & { steps: (Card & { number: string })[]; terms: string; detailLink: string };
  faq: { eyebrow: string; title: string; items: { question: string; answer: string }[] };
  readiness: { body: string; link: string };
  closing: Section & { primaryCta: string; supporting: string };
};

const copy: Record<Locale, HomepageCopy> = {
  en: {
    meta: {
      title: 'Organise meetings. Reduce the follow-up. — Conference Manager',
      description:
        'Bring guests, catering and equipment together in one meeting request. Keep existing room booking and company sign-in. One-time paid setup, then 30 days of free software use.',
    },
    hero: {
      eyebrow: 'For office and conference teams in mid-sized companies',
      title: 'Organise meetings.',
      outcome: 'Reduce the follow-up.',
      body: 'Start your meeting request in Conference Manager. Room details, guests, catering and equipment come together in one shared request. Your team keeps track of requirements, progress and changes.',
      connection:
        'Keep your existing room booking and company sign-in. We agree the appropriate connections with you.',
      primaryCta: 'Book a demo',
      secondaryCta: 'See how it works',
      pilot: '30 days of free software use after setup is complete.',
      setup: 'A one-time setup fee applies.',
    },
    overview: {
      label: 'One request. A clear overview.',
      items: ['Request', 'Guests', 'Room & equipment', 'Catering', 'Changes', 'Coordination'],
    },
    problem: {
      eyebrow: 'Your working day',
      title: 'Everything needed for preparation. In one request.',
      body: 'How many guests are coming? What catering and equipment are needed? Who handles the preparation? When information is spread across emails, forms and spreadsheets, even one meeting creates a lot of coordination.',
      cards: [
        {
          title: 'Too many emails and follow-ups',
          body: 'Capture the details in one shared meeting request.',
        },
        {
          title: 'Missing guests, catering or equipment',
          body: 'Record the requirements where your team prepares the meeting.',
        },
        { title: 'What changed?', body: 'Keep the current request and changes together.' },
        {
          title: 'Who is taking care of it?',
          body: 'Agree how your conference team and the teams involved work together.',
        },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'One meeting. A clear workflow.',
      body: 'Follow a customer workshop from the initial request to a change in attendance. Choose a step to see what matters.',
      detailLink: 'Explore the complete workflow',
    },
    roomBooking: {
      eyebrow: 'Connected to your working environment',
      title: 'Your systems. One meeting workflow.',
      body: 'Conference Manager brings the organisation around meetings together and complements the systems you already use.',
      supporting:
        'Your existing room-booking system remains responsible for reservations. We confirm the appropriate connections and scope before setup.',
      nodes: [
        {
          label: 'Keep using',
          title: 'Your room booking',
          body: 'Employees start their request in Conference Manager. Reservations stay with the existing room-booking system.',
        },
        {
          label: 'Keep using',
          title: 'Your company sign-in',
          body: 'Use your existing Microsoft account. We agree access and roles for your customer environment.',
        },
        {
          label: 'Coordinate',
          title: 'Your caterer',
          body: 'Your office team records supplier replies. We assess the feasibility of additional supplier access or software connections for your process.',
        },
        {
          label: 'Optional · subject to assessment',
          title: 'Your visitor management',
          body: 'We assess whether guest registration and arrival status can connect to the visitor system you use.',
        },
      ],
      replacement: {
        title: 'Bring catering out of separate spreadsheets and forms.',
        body: 'Items, packages, quantities and prices belong to the meeting request. Your office or conference team maintains the catalogue; supplier imports require an available connection.',
      },
      detailLink: 'Discuss your existing systems',
    },
    value: {
      eyebrow: 'Practical details',
      title: 'What your team needs to prepare.',
      body: 'Keep the information that belongs together in one meeting request.',
      cards: [
        {
          title: 'A shared request',
          body: 'Bring the meeting, its requirements and the current processing status together.',
        },
        {
          title: 'Guest information',
          body: 'Record the guest details your team needs to prepare the visit.',
        },
        {
          title: 'Room and equipment',
          body: 'Add room context and technical requirements to the request.',
        },
        {
          title: 'Catering you can specify',
          body: 'Choose catalogue items with quantities and prices, or predefined packages such as a coffee break per person.',
        },
        {
          title: 'Changes with context',
          body: 'Keep changes with the meeting. Agree the applicable approval rules and deadlines during setup.',
        },
        {
          title: 'A process for your team',
          body: 'Discuss central coordination and the involvement of reception, equipment and room preparation teams.',
        },
      ],
      detailLink: 'Explore the product',
    },
    audiences: {
      eyebrow: 'For your team',
      title: 'A shared picture of the meeting.',
      body: 'Employees, the conference team and other service teams need different details. The meeting request brings them together.',
      cards: [
        {
          title: 'For employees',
          body: 'Put guests, catering and equipment into one request and follow its progress.',
        },
        {
          title: 'For office and conference teams',
          body: 'Prepare requests, coordinate catering and keep changes in view.',
        },
        {
          title: 'For the teams involved',
          body: 'We agree how reception, equipment and room preparation contribute to your process during setup.',
        },
      ],
      detailLink: 'See how your team benefits',
    },
    pilot: {
      eyebrow: 'Setup & pilot',
      title: 'Try it with your own meetings.',
      body: 'Pavurel sets up your customer environment and the agreed workflow. After setup is complete, use Conference Manager free for 30 days with your own real meetings.',
      steps: [
        {
          number: '01',
          title: 'Get to know the workflow',
          body: 'Bring your current process and existing systems to a demo.',
        },
        {
          number: '02',
          title: 'Set up your environment',
          body: 'Agree the scope, available connections and applicable rules with Pavurel.',
        },
        {
          number: '03',
          title: 'Try it for 30 days',
          body: 'Use your own real meetings in the configured customer environment.',
        },
      ],
      terms:
        'A one-time setup fee applies. Setup amounts, continued-use prices and the ongoing pricing model are still open.',
      detailLink: 'See setup and pilot details',
    },
    faq: {
      eyebrow: 'Frequently asked questions',
      title: 'What you may want to know first.',
      items: [
        {
          question: 'Do we need to replace our room booking?',
          answer:
            'Your existing room-booking system remains responsible for reservations. Employees begin their organisational request in Conference Manager. We assess the appropriate connection with you.',
        },
        {
          question: 'Can we keep our company sign-in?',
          answer:
            'The current focus is Microsoft sign-in. We agree access and roles for your customer environment. Any requirements for company-group mapping are assessed separately.',
        },
        {
          question: 'What happens to our catering spreadsheets and forms?',
          answer:
            'Catering is selected within the meeting request using items, packages, quantities and prices. Your office or conference team maintains the catalogue. A supplier import is included only where the corresponding connection is available.',
        },
        {
          question: 'How do our caterers take part?',
          answer:
            'Your office team can send the order by email and record the response in Conference Manager. We assess the feasibility of a requested dedicated access link or software connection separately; it is included only after availability is confirmed.',
        },
        {
          question: 'Can other service teams work with us?',
          answer:
            'During setup we discuss whether your conference team coordinates centrally and how equipment, room preparation and reception teams contribute. The agreed scope determines the available collaboration.',
        },
        {
          question: 'Can we connect our visitor management?',
          answer:
            'We can assess guest registration with name, company and visit time, as well as the return of arrival or check-in status. This requires a separate feasibility assessment and is not automatically included in the pilot.',
        },
        {
          question: 'Who adjusts deadlines and approvals?',
          answer:
            'Pavurel handles requested adjustments to the agreed setup. We confirm with you which changes are possible.',
        },
        {
          question: 'What is free, and when do the 30 days start?',
          answer:
            'Software use is free for 30 days after setup is complete. Setup is a one-time paid service. Prices for setup and continued use, and the ongoing pricing model, are still open.',
        },
      ],
    },
    readiness: {
      body: 'Your IT team needs clarity about access, roles and the agreed connections.',
      link: 'Explore security and trust',
    },
    closing: {
      eyebrow: 'Conference Manager by Pavurel',
      title: 'Let’s look at your meeting workflow.',
      body: 'Show us how your company organises meetings today. We will explore the workflow in Conference Manager and discuss how your existing systems fit.',
      primaryCta: 'Book a demo',
      supporting: '30 days of free software use after setup. A one-time setup fee applies.',
    },
  },
  de: {
    meta: {
      title: 'Besprechungen organisieren. Rückfragen reduzieren. — Conference Manager',
      description:
        'Gäste, Catering und Technik in einer Besprechungsanfrage zusammenführen. Bestehende Systeme weiter nutzen. Einmalig kostenpflichtige Einrichtung, danach 30 Tage kostenlose Softwarenutzung.',
    },
    hero: {
      eyebrow: 'Für Office- und Konferenzteams im Mittelstand',
      title: 'Besprechungen organisieren.',
      outcome: 'Rückfragen reduzieren.',
      body: 'Starten Sie Ihre Besprechungsanfrage im Conference Manager. Raum, Gäste, Catering und Technik kommen in einem gemeinsamen Vorgang zusammen. Ihr Team behält Anforderungen, Bearbeitungsstände und Änderungen im Blick.',
      connection:
        'Ihre bestehende Raumbuchung und Unternehmensanmeldung bleiben erhalten. Die passenden Anbindungen stimmen wir gemeinsam ab.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'So funktioniert es',
      pilot: '30 Tage kostenlose Softwarenutzung ab abgeschlossener Einrichtung.',
      setup: 'Die Einrichtung ist einmalig kostenpflichtig.',
    },
    overview: {
      label: 'Eine Anfrage. Ein klarer Überblick.',
      items: ['Anfrage', 'Gäste', 'Raum & Technik', 'Catering', 'Änderungen', 'Bearbeitung'],
    },
    problem: {
      eyebrow: 'Ihr Arbeitsalltag',
      title: 'Alle Angaben für die Vorbereitung. In einer Anfrage.',
      body: 'Wie viele Gäste kommen? Was wird für Catering und Technik benötigt? Wer kümmert sich um die Vorbereitung? Wenn Angaben in E-Mails, Formularen und Listen verteilt sind, wird aus einer Besprechung schnell viel Abstimmung.',
      cards: [
        {
          title: 'Viele E-Mails und Rückfragen',
          body: 'Angaben in einer gemeinsamen Besprechungsanfrage erfassen.',
        },
        {
          title: 'Gäste, Catering oder Technik fehlen',
          body: 'Anforderungen dort festhalten, wo Ihr Team die Besprechung vorbereitet.',
        },
        {
          title: 'Was hat sich geändert?',
          body: 'Den aktuellen Vorgang und seine Änderungen zusammenhalten.',
        },
        {
          title: 'Wer kümmert sich darum?',
          body: 'Die Zusammenarbeit von Konferenzteam und beteiligten Teams gemeinsam festlegen.',
        },
      ],
    },
    howItWorks: {
      eyebrow: 'So funktioniert es',
      title: 'Eine Besprechung. Ein verständlicher Ablauf.',
      body: 'Begleiten Sie einen Kundenworkshop von der ersten Anfrage bis zur geänderten Personenzahl. Wählen Sie einen Schritt und sehen Sie, worauf es dabei ankommt.',
      detailLink: 'Den gesamten Ablauf kennenlernen',
    },
    roomBooking: {
      eyebrow: 'Verbunden mit Ihrer Arbeitsumgebung',
      title: 'Ihre Systeme. Ein gemeinsamer Ablauf.',
      body: 'Conference Manager ergänzt Ihre Arbeitsumgebung und führt die Organisation rund um Besprechungen zusammen.',
      supporting:
        'Ihre bestehende Raumbuchung bleibt für die Reservierung zuständig. Die passenden Anbindungen und den Umfang klären wir vor der Einrichtung.',
      nodes: [
        {
          label: 'Weiter nutzen',
          title: 'Ihre Raumbuchung',
          body: 'Mitarbeitende starten ihre Anfrage im Conference Manager. Das vorhandene Raumbuchungssystem übernimmt die Reservierung.',
        },
        {
          label: 'Weiter nutzen',
          title: 'Ihre Unternehmensanmeldung',
          body: 'Nutzen Sie Ihr bestehendes Microsoft-Konto. Zugriffe und Rollen stimmen wir für Ihre Kundenumgebung ab.',
        },
        {
          label: 'Einbinden',
          title: 'Ihre Caterer',
          body: 'Ihr Office-Team erfasst Rückmeldungen. Die Machbarkeit zusätzlicher Zugänge oder Softwareanbindungen prüfen wir für Ihren Ablauf.',
        },
        {
          label: 'Optional · nach Prüfung',
          title: 'Ihr Gästemanagement',
          body: 'Wir prüfen, ob sich Gästeanmeldung und Ankunftsstatus mit Ihrem vorhandenen Besuchersystem verbinden lassen.',
        },
      ],
      replacement: {
        title: 'Excel und Forms für Catering ablösen.',
        body: 'Artikel, Pakete, Mengen und Preise gehören zur Besprechungsanfrage. Ihr Office- oder Konferenzteam pflegt den Katalog; ein Import vom Caterer setzt eine verfügbare Anbindung voraus.',
      },
      detailLink: 'Ihre vorhandenen Systeme besprechen',
    },
    value: {
      eyebrow: 'Die Details im Blick',
      title: 'Was Ihr Team für die Vorbereitung braucht.',
      body: 'Halten Sie zusammen, was zur Besprechung gehört.',
      cards: [
        {
          title: 'Eine gemeinsame Anfrage',
          body: 'Besprechung, Anforderungen und aktuellen Bearbeitungsstand zusammenführen.',
        },
        {
          title: 'Angaben zu Gästen',
          body: 'Die Informationen erfassen, die Ihr Team für die Vorbereitung des Besuchs benötigt.',
        },
        {
          title: 'Raum und Technik',
          body: 'Raumkontext und technische Anforderungen bei der Anfrage ergänzen.',
        },
        {
          title: 'Catering konkret zusammenstellen',
          body: 'Artikel mit Mengen und Preisen auswählen oder vordefinierte Pakete nutzen, beispielsweise eine Kaffeepause pro Person.',
        },
        {
          title: 'Änderungen nachvollziehen',
          body: 'Änderungen bleiben bei der Besprechung. Die geltenden Freigaberegeln und Fristen stimmen wir bei der Einrichtung ab.',
        },
        {
          title: 'Ein Ablauf für Ihr Team',
          body: 'Zentrale Koordination und die Beteiligung von Empfang, Technik und Raumvorbereitung gemeinsam klären.',
        },
      ],
      detailLink: 'Das Produkt kennenlernen',
    },
    audiences: {
      eyebrow: 'Für Ihr Team',
      title: 'Ein gemeinsamer Blick auf die Besprechung.',
      body: 'Mitarbeitende, Konferenzteam und weitere Service-Teams benötigen unterschiedliche Angaben. Die Besprechungsanfrage führt sie zusammen.',
      cards: [
        {
          title: 'Für Mitarbeitende',
          body: 'Gäste, Catering und Technik in einer Anfrage zusammenstellen und den Bearbeitungsstand verfolgen.',
        },
        {
          title: 'Für Office- und Konferenzteams',
          body: 'Anfragen vorbereiten, Catering koordinieren und Änderungen im Blick behalten.',
        },
        {
          title: 'Für beteiligte Teams',
          body: 'Wie Empfang, Technik und Raumvorbereitung mitwirken, klären wir bei der Einrichtung Ihres Ablaufs.',
        },
      ],
      detailLink: 'Den Nutzen für Ihr Team kennenlernen',
    },
    pilot: {
      eyebrow: 'Einrichtung & Pilot',
      title: 'Mit eigenen Besprechungen erleben.',
      body: 'Pavurel richtet Ihre Kundenumgebung und den vereinbarten Ablauf ein. Nach abgeschlossener Einrichtung nutzen Sie Conference Manager 30 Tage kostenlos mit Ihren eigenen realen Besprechungen.',
      steps: [
        {
          number: '01',
          title: 'Den Ablauf kennenlernen',
          body: 'Bringen Sie Ihren heutigen Prozess und Ihre vorhandenen Systeme in eine Demo mit.',
        },
        {
          number: '02',
          title: 'Ihre Umgebung einrichten',
          body: 'Umfang, verfügbare Anbindungen und geltende Regeln stimmen Sie mit Pavurel ab.',
        },
        {
          number: '03',
          title: '30 Tage erproben',
          body: 'Nutzen Sie Ihre eigenen realen Besprechungen in der eingerichteten Kundenumgebung.',
        },
      ],
      terms:
        'Die Einrichtung ist einmalig kostenpflichtig. Beträge für Einrichtung und anschließende Nutzung sowie das laufende Preismodell sind noch offen.',
      detailLink: 'Einrichtung und Pilot im Detail',
    },
    faq: {
      eyebrow: 'Häufige Fragen',
      title: 'Was Sie vor dem Einstieg wissen möchten.',
      items: [
        {
          question: 'Müssen wir unsere Raumbuchung ersetzen?',
          answer:
            'Ihre vorhandene Raumbuchung bleibt für Reservierungen zuständig. Mitarbeitende beginnen die organisatorische Anfrage im Conference Manager. Die passende Anbindung klären wir gemeinsam.',
        },
        {
          question: 'Können wir unsere Unternehmensanmeldung nutzen?',
          answer:
            'Der aktuelle Schwerpunkt liegt auf der Microsoft-Anmeldung. Zugriffe und Rollen stimmen wir für Ihre Kundenumgebung ab. Anforderungen an die Zuordnung von Unternehmensgruppen prüfen wir gesondert.',
        },
        {
          question: 'Was wird aus unseren Excel-Listen und Forms für Catering?',
          answer:
            'Catering wird innerhalb der Besprechungsanfrage aus Artikeln und Paketen mit Mengen und Preisen zusammengestellt. Ihr Office- oder Konferenzteam pflegt den Katalog. Ein Import vom Caterer wird nur bei verfügbarer Anbindung einbezogen.',
        },
        {
          question: 'Wie arbeiten unsere Caterer mit?',
          answer:
            'Ihr Office-Team kann die Bestellung per E-Mail versenden und die Rückmeldung im Conference Manager erfassen. Einen gewünschten eigenen Zugang beziehungsweise Link oder eine Softwareanbindung prüfen wir gesondert auf Machbarkeit und beziehen sie erst bei bestätigter Verfügbarkeit ein.',
        },
        {
          question: 'Können weitere Service-Teams mitarbeiten?',
          answer:
            'Bei der Einrichtung besprechen wir die zentrale Koordination durch Ihr Konferenzteam und die Beteiligung von Technik, Raumvorbereitung und Empfang. Der vereinbarte Umfang bestimmt die verfügbare Zusammenarbeit.',
        },
        {
          question: 'Können wir unser Gästemanagement anbinden?',
          answer:
            'Wir können die Anmeldung mit Name, Firma und Besuchszeit sowie die Rückmeldung des Ankunfts- oder Check-in-Status prüfen. Das erfordert eine gesonderte Machbarkeitsprüfung und ist nicht automatisch im Pilot enthalten.',
        },
        {
          question: 'Wer passt Fristen und Freigaben an?',
          answer:
            'Pavurel übernimmt Anpassungen der vereinbarten Einrichtung auf Ihren Wunsch. Welche Anpassungen möglich sind, stimmen wir mit Ihnen ab.',
        },
        {
          question: 'Was ist kostenlos und wann beginnen die 30 Tage?',
          answer:
            'Die Softwarenutzung ist nach abgeschlossener Einrichtung 30 Tage kostenlos. Die Einrichtung ist eine einmalig kostenpflichtige Leistung. Beträge für Einrichtung und anschließende Nutzung sowie das laufende Preismodell sind noch offen.',
        },
      ],
    },
    readiness: {
      body: 'Ihre IT benötigt Klarheit über Zugriffe, Rollen und die vereinbarten Anbindungen.',
      link: 'Sicherheit und Vertrauen kennenlernen',
    },
    closing: {
      eyebrow: 'Conference Manager by Pavurel',
      title: 'Passt Conference Manager zu Ihrem Konferenzbetrieb?',
      body: 'Zeigen Sie uns, wie Sie Besprechungen heute organisieren. Wir zeigen Ihnen den Ablauf im Conference Manager und besprechen die Einbindung Ihrer bestehenden Systeme.',
      primaryCta: 'Demo anfragen',
      supporting:
        '30 Tage kostenlose Softwarenutzung nach Einrichtung. Die Einrichtung ist einmalig kostenpflichtig.',
    },
  },
};

export function getHomepageCopy(locale: Locale): HomepageCopy {
  return copy[locale];
}
