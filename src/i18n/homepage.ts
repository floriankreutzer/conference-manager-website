import type { Locale } from '@config/locales';

type Card = { title: string; body: string };
type Step = { number: string; title: string; body: string };

type HomepageCopy = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
  problem: { eyebrow: string; title: string; body: string; fragments: string[] };
  value: { eyebrow: string; title: string; body: string; cards: Card[] };
  howItWorks: { eyebrow: string; title: string; intro: string; steps: Step[] };
  roomBooking: { eyebrow: string; title: string; body: string; supporting: string };
  audiences: {
    eyebrow: string;
    title: string;
    employee: Card;
    workplace: Card;
  };
  hospitality: { eyebrow: string; title: string; body: string };
  ecosystem: { eyebrow: string; title: string; body: string; items: string[]; microsoft: string };
  readiness: { eyebrow: string; title: string; body: string; themes: string[] };
  brand: { eyebrow: string; title: string; body: string; principle: string };
  why: { eyebrow: string; title: string; cards: Card[] };
  closing: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
  journey: {
    request: string;
    booking: string;
    details: string;
    team: string;
    label: string;
    caption: string;
  };
};

const copy: Record<Locale, HomepageCopy> = {
  en: {
    meta: {
      title: 'Conference Manager — Conference management for Workplace Teams',
      description:
        'Coordinate the work around workplace conferences in one guided request — guests, catering, services, requirements and room context — without replacing the room-booking systems you already use.',
    },
    hero: {
      eyebrow: 'Conference management for modern workplaces',
      title: 'Make every workplace conference feel effortless.',
      body: 'Bring the coordination around guests, catering, services and conference requirements into one clear experience — while keeping the room-booking systems your workplace already uses.',
      primaryCta: 'Book a demo',
      secondaryCta: 'See how it works',
    },
    problem: {
      eyebrow: 'The coordination gap',
      title: 'The room may be booked. The conference is not prepared.',
      body: 'A professional workplace conference usually continues across email, chat, catering requests, guest information and service coordination after the reservation is made. The result is not necessarily chaos — it is simply too much context spread across too many places.',
      fragments: [
        'Room booking',
        'Email',
        'Catering request',
        'Guest information',
        'Service coordination',
      ],
    },
    value: {
      eyebrow: 'One guided request',
      title: 'One request. Everything your conference needs.',
      body: 'Conference Manager keeps the information needed to prepare a conference together. Employees get a clear request journey. Workplace Teams get a structured operational context instead of reconstructing it from separate channels.',
      cards: [
        { title: 'Guests', body: 'Keep participant and guest context with the conference request.' },
        {
          title: 'Catering',
          body: 'Capture catering needs where the rest of the conference is being prepared.',
        },
        {
          title: 'Services',
          body: 'Make relevant service requirements visible in the same journey.',
        },
        {
          title: 'Requirements',
          body: 'Keep operational details and special needs attached to the request.',
        },
        {
          title: 'Room context',
          body: 'Connect the room decision without creating a second room-booking system.',
        },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'A simpler way from request to ready.',
      intro:
        'The experience starts with what the employee is trying to organise and turns the required information into one understandable path for requester and Workplace Team.',
      steps: [
        {
          number: '01',
          title: 'Request the conference',
          body: 'Start with date, time and the conference itself — not the internal process behind it.',
        },
        {
          number: '02',
          title: 'Connect the room context',
          body: 'Use the organisation’s existing room-booking capability as part of the journey.',
        },
        {
          number: '03',
          title: 'Add what the conference needs',
          body: 'Keep guests, catering, services and relevant requirements with the same request.',
        },
        {
          number: '04',
          title: 'Give Workplace Teams the context',
          body: 'Make the information needed for preparation visible in a structured operational view.',
        },
        {
          number: '05',
          title: 'Keep changes visible',
          body: 'Keep submission, review and supported changes understandable instead of scattering decisions across channels.',
        },
      ],
    },
    roomBooking: {
      eyebrow: 'Designed to connect',
      title: 'Keep your room booking. Replace the coordination around it.',
      body: 'Conference Manager is not another room-booking product. Existing booking capability remains responsible for the reservation. Conference Manager connects that room context to the wider conference request so adoption does not have to become a replacement programme.',
      supporting: "We don't replace your room booking system. We connect it.",
    },
    audiences: {
      eyebrow: 'Two sides of one experience',
      title: 'Simple for employees. Structured for Workplace Teams.',
      employee: {
        title: 'For employees',
        body: 'Ask for the conference, not the internal process. A guided request keeps ownership and operational hand-offs out of the employee’s way.',
      },
      workplace: {
        title: 'For Workplace Teams',
        body: 'See the conference behind the request. Connected context makes requirements easier to understand, prepare and manage through change.',
      },
    },
    hospitality: {
      eyebrow: 'Considered hospitality',
      title: 'Professional service starts before guests arrive.',
      body: 'Workplace hospitality is not decoration. It is the confidence that requirements are understood, responsibilities are visible and the conference has been prepared with care. Conference Manager supports that consistency without turning the employee journey into an operational checklist.',
    },
    ecosystem: {
      eyebrow: 'Connected workplace ecosystem',
      title: 'Keep the tools that already work.',
      body: 'Conference Manager is designed to fit alongside the workplace, identity and collaboration environment an organisation already uses instead of creating another isolated process.',
      items: [
        'Existing room-booking systems keep responsibility for reservations',
        'Workplace services keep the responsibilities they already own',
        'Identity and collaboration stay in the enterprise environment',
      ],
      microsoft:
        'Microsoft 365 and Entra are the initial enterprise ecosystem focus. Real use depends on the Microsoft configuration and approvals selected for the customer environment.',
    },
    readiness: {
      eyebrow: 'Built for professional workplaces',
      title: 'Easy to use should not mean casual about control.',
      body: 'Conference Manager separates a clear employee experience from the controls professional organisations need around access, roles, administration and integrations. Detailed technical information remains available for IT evaluation without becoming the product story itself.',
      themes: [
        'Identity & sign-in',
        'Roles & permissions',
        'Controlled administration',
        'Controlled changes',
        'Security & privacy boundaries',
        'Managed integrations',
        'English & German experience',
      ],
    },
    brand: {
      eyebrow: 'By Pavurel',
      title: 'Operational precision, with a more considered workplace experience.',
      body: 'Pavurel is the corporate endorsement behind the Conference Manager visual experience. Its documented brand idea combines operational precision with warm workplace hospitality: professional and dependable without becoming bureaucratic, premium through care rather than decoration.',
      principle: 'Workplace hospitality, thoughtfully managed.',
    },
    why: {
      eyebrow: 'Why Conference Manager',
      title: 'Built around the conference, not around another system.',
      cards: [
        {
          title: 'Conference-first',
          body: 'Start with the complete conference request instead of forcing the problem into room inventory.',
        },
        {
          title: 'Connected by design',
          body: 'Keep specialist systems responsible where they already solve a problem well.',
        },
        {
          title: 'Workplace-minded',
          body: 'Balance a simple employee journey with the operational context Workplace Teams need.',
        },
      ],
    },
    closing: {
      eyebrow: 'Conference Manager by Pavurel',
      title: 'See what one real conference journey could look like.',
      body: 'Bring the way your organisation handles guests, catering, services, room context and changes today. A useful demo starts with that reality — not with a generic feature tour.',
      primaryCta: 'Book a demo',
      secondaryCta: 'See how it works',
    },
    journey: {
      request: 'Conference request',
      booking: 'Room context',
      details: 'Guests · Catering · Services · Requirements',
      team: 'Workplace Team',
      label: 'Illustrative Conference Manager request journey',
      caption: 'One conference context from request to Workplace Team',
    },
  },
  de: {
    meta: {
      title: 'Conference Manager — Konferenzmanagement für Workplace Teams',
      description:
        'Koordinieren Sie Gäste, Catering, Services, Anforderungen und Raumkontext in einer geführten Konferenzanfrage – ohne bestehende Raumbuchungssysteme zu ersetzen.',
    },
    hero: {
      eyebrow: 'Konferenzmanagement für moderne Arbeitswelten',
      title: 'Damit sich professionelle Konferenzen einfach anfühlen.',
      body: 'Bündeln Sie die Koordination von Gästen, Catering, Services und Konferenzanforderungen in einem klaren Ablauf – und nutzen Sie die Raumbuchungssysteme weiter, die Ihr Unternehmen bereits einsetzt.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'So funktioniert es',
    },
    problem: {
      eyebrow: 'Die Koordinationslücke',
      title: 'Der Raum kann gebucht sein. Vorbereitet ist die Konferenz damit noch nicht.',
      body: 'Nach der Reservierung geht die Vorbereitung häufig über E-Mail, Chat, Catering-Anfragen, Gästeinformationen und Service-Abstimmungen weiter. Das ist nicht zwangsläufig chaotisch – aber zu viel wichtiger Kontext verteilt sich auf zu viele Stellen.',
      fragments: [
        'Raumbuchung',
        'E-Mail',
        'Catering-Anfrage',
        'Gästeinformationen',
        'Service-Koordination',
      ],
    },
    value: {
      eyebrow: 'Eine geführte Anfrage',
      title: 'Eine Anfrage. Alles, was Ihre Konferenz braucht.',
      body: 'Conference Manager hält die Informationen für die Vorbereitung einer Konferenz zusammen. Mitarbeitende erhalten einen klaren Anfrageprozess. Workplace Teams arbeiten mit einem strukturierten operativen Kontext, statt ihn aus einzelnen Kanälen zusammensetzen zu müssen.',
      cards: [
        {
          title: 'Gäste',
          body: 'Halten Sie Teilnehmer- und Gästekontext direkt bei der Konferenzanfrage.',
        },
        {
          title: 'Catering',
          body: 'Erfassen Sie Catering-Bedarf dort, wo auch der restliche Konferenzkontext entsteht.',
        },
        {
          title: 'Services',
          body: 'Machen Sie relevante Service-Anforderungen im selben Ablauf sichtbar.',
        },
        {
          title: 'Anforderungen',
          body: 'Halten Sie operative Details und besondere Anforderungen direkt an der Anfrage.',
        },
        {
          title: 'Raumkontext',
          body: 'Binden Sie die Raumentscheidung ein, ohne ein zweites Raumbuchungssystem zu schaffen.',
        },
      ],
    },
    howItWorks: {
      eyebrow: 'So funktioniert es',
      title: 'Ein klarer Weg von der Anfrage zur Vorbereitung.',
      intro:
        'Der Ablauf beginnt mit dem, was Mitarbeitende organisieren möchten, und führt die benötigten Informationen in einen verständlichen Prozess für anfragende Person und Workplace Team.',
      steps: [
        {
          number: '01',
          title: 'Konferenz anfragen',
          body: 'Beginnen Sie mit Datum, Zeit und der Konferenz selbst – nicht mit dem internen Prozess dahinter.',
        },
        {
          number: '02',
          title: 'Raumkontext einbinden',
          body: 'Nutzen Sie die bestehende Raumbuchung Ihres Unternehmens als Teil des Ablaufs.',
        },
        {
          number: '03',
          title: 'Bedarf ergänzen',
          body: 'Halten Sie Gäste, Catering, Services und relevante Anforderungen in derselben Anfrage zusammen.',
        },
        {
          number: '04',
          title: 'Workplace Teams den Kontext geben',
          body: 'Machen Sie die Informationen für Vorbereitung und Koordination in einer strukturierten operativen Sicht verfügbar.',
        },
        {
          number: '05',
          title: 'Änderungen nachvollziehbar halten',
          body: 'Halten Sie Einreichung, Prüfung und unterstützte Änderungen nachvollziehbar, statt Entscheidungen auf mehrere Kanäle zu verteilen.',
        },
      ],
    },
    roomBooking: {
      eyebrow: 'Auf Verbindung ausgelegt',
      title: 'Behalten Sie Ihre Raumbuchung. Strukturieren Sie die Koordination darum herum.',
      body: 'Conference Manager ist kein weiteres Raumbuchungsprodukt. Die bestehende Buchungslösung bleibt für die Reservierung verantwortlich. Conference Manager verbindet den Raumkontext mit der gesamten Konferenzanfrage – damit die Einführung nicht zum Austauschprojekt für Ihre Raumbuchung wird.',
      supporting: 'Wir ersetzen Ihre Raumbuchung nicht. Wir verbinden sie.',
    },
    audiences: {
      eyebrow: 'Zwei Seiten eines Erlebnisses',
      title: 'Einfach für Mitarbeitende. Strukturiert für Workplace Teams.',
      employee: {
        title: 'Für Mitarbeitende',
        body: 'Die Konferenz anfragen, nicht den internen Prozess. Ein geführter Ablauf hält Zuständigkeiten und operative Übergaben aus dem Weg der anfragenden Person.',
      },
      workplace: {
        title: 'Für Workplace Teams',
        body: 'Sehen Sie die Konferenz hinter der Anfrage. Zusammenhängender Kontext macht Anforderungen leichter verständlich, vorbereitbar und über Änderungen hinweg steuerbar.',
      },
    },
    hospitality: {
      eyebrow: 'Durchdachte Workplace Hospitality',
      title: 'Professioneller Service beginnt vor der Ankunft der Gäste.',
      body: 'Workplace Hospitality ist keine Dekoration. Sie bedeutet, dass Anforderungen verstanden, Zuständigkeiten sichtbar und Konferenzen mit Sorgfalt vorbereitet werden. Conference Manager unterstützt diese Verlässlichkeit, ohne aus der Anfrage eine operative Checkliste zu machen.',
    },
    ecosystem: {
      eyebrow: 'Vernetztes Workplace-Ökosystem',
      title: 'Behalten Sie die Systeme, die bereits funktionieren.',
      body: 'Conference Manager ist darauf ausgelegt, sich in die bestehende Workplace-, Identity- und Collaboration-Umgebung einzufügen, statt einen weiteren isolierten Prozess zu schaffen.',
      items: [
        'Bestehende Raumbuchungssysteme bleiben für Reservierungen verantwortlich',
        'Workplace Services behalten ihre bestehenden Aufgaben',
        'Identity und Collaboration bleiben Teil der Enterprise-Umgebung',
      ],
      microsoft:
        'Microsoft 365 und Entra bilden den ersten Enterprise-Fokus. Die reale Nutzung hängt von der Microsoft-Konfiguration und den Freigaben ab, die für die jeweilige Kundenumgebung festgelegt werden.',
    },
    readiness: {
      eyebrow: 'Für professionelle Arbeitswelten',
      title: 'Einfach zu nutzen darf nicht bedeuten, auf Kontrolle zu verzichten.',
      body: 'Conference Manager verbindet eine klare Employee Experience mit den Kontrollen, die professionelle Organisationen für Zugriff, Rollen, Administration und Integrationen benötigen. Technische Details bleiben für die IT-Evaluierung verfügbar, ohne die Produktstory zu dominieren.',
      themes: [
        'Identity & Login',
        'Rollen & Berechtigungen',
        'Kontrollierte Administration',
        'Kontrollierte Änderungen',
        'Security- & Datenschutzgrenzen',
        'Gesteuerte Integrationen',
        'Deutsch & Englisch',
      ],
    },
    brand: {
      eyebrow: 'By Pavurel',
      title: 'Operative Präzision mit einem bewussteren Workplace-Erlebnis.',
      body: 'Pavurel ist das Corporate Endorsement hinter dem visuellen Auftritt von Conference Manager. Die dokumentierte Markenidee verbindet operative Präzision mit warmer Workplace Hospitality: professionell und verlässlich, ohne bürokratisch zu wirken; hochwertig durch Sorgfalt statt durch Dekoration.',
      principle: 'Workplace hospitality, thoughtfully managed.',
    },
    why: {
      eyebrow: 'Warum Conference Manager',
      title: 'Rund um die Konferenz gebaut – nicht rund um ein weiteres System.',
      cards: [
        {
          title: 'Konferenz zuerst',
          body: 'Beginnen Sie mit der vollständigen Konferenzanfrage statt das Problem auf Rauminventar zu reduzieren.',
        },
        {
          title: 'Vernetzt gedacht',
          body: 'Lassen Sie spezialisierte Systeme dort verantwortlich, wo sie eine Aufgabe bereits gut lösen.',
        },
        {
          title: 'Für Workplace Teams',
          body: 'Verbinden Sie einen einfachen Anfrageprozess mit dem operativen Kontext, den Workplace Teams benötigen.',
        },
      ],
    },
    closing: {
      eyebrow: 'Conference Manager by Pavurel',
      title: 'Betrachten wir gemeinsam einen realen Konferenzablauf.',
      body: 'Bringen Sie mit, wie Ihr Unternehmen heute Gäste, Catering, Services, Raumkontext und Änderungen koordiniert. Eine gute Demo beginnt mit dieser Realität – nicht mit einer generischen Feature-Tour.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'So funktioniert es',
    },
    journey: {
      request: 'Konferenzanfrage',
      booking: 'Raumkontext',
      details: 'Gäste · Catering · Services · Anforderungen',
      team: 'Workplace Team',
      label: 'Illustrativer Conference-Manager-Anfrageablauf',
      caption: 'Ein Konferenzkontext von der Anfrage bis zum Workplace Team',
    },
  },
};

export function getHomepageCopy(locale: Locale): HomepageCopy {
  return copy[locale];
}
