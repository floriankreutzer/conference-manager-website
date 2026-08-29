import type { Locale } from '@config/locales';

type CompanyPoint = { title: string; body: string };
type CompanySection = {
  eyebrow: string;
  title: string;
  body: string;
  points?: readonly CompanyPoint[];
  statement?: string;
};
type CompanyCopy = {
  sections: readonly CompanySection[];
  closing: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

const companyCopy: Record<Locale, CompanyCopy> = {
  en: {
    sections: [
      {
        eyebrow: 'The problem we focus on',
        title: 'A booked room does not mean a prepared conference.',
        body: 'Professional workplace conferences often need more than a reservation. Guests, catering, services, equipment, requirements and changes still have to be coordinated. Conference Manager is built to keep that preparation in one understandable conference context instead of spreading it across messages, forms and hand-offs.',
        statement: 'One request. Everything your conference needs.',
      },
      {
        eyebrow: 'Who it is for',
        title:
          'For organisations that want an easier request and a clearer preparation process.',
        body: 'Conference Manager is aimed at workplaces where employees organise professional conferences and Workplace Teams prepare the experience behind them. It is especially relevant when the room can already be booked, but the surrounding coordination still creates manual work and missing context.',
        points: [
          {
            title: 'Employees get one guided request',
            body: 'They can describe the conference and what it needs without having to know which internal team, form or channel owns each detail.',
          },
          {
            title: 'Workplace Teams get the preparation context',
            body: 'Guests, catering, services, requirements and room context stay connected so the team can see what needs attention.',
          },
        ],
      },
      {
        eyebrow: 'How it fits your environment',
        title: 'Improve the coordination around systems that already work.',
        body: 'Conference Manager is not intended to replace a functioning room-booking, identity or specialist workplace system. The product connects the conference journey around those capabilities so adoption can focus on the coordination gap rather than a broad replacement programme.',
        statement: 'Keep your room booking. Replace the coordination around it.',
      },
      {
        eyebrow: 'What to expect from us',
        title:
          'Start with a real conference journey and prove the fit before expanding.',
        body: 'We favour a practical evaluation: take a conference your organisation actually runs, map what happens after the room is selected and assess where Conference Manager removes unnecessary hand-offs while preserving the systems and controls you still need. Product, integration and security claims remain tied to what is actually implemented and available in the evaluated environment.',
      },
      {
        eyebrow: 'Conference Manager by Pavurel',
        title: 'A precise product with a hospitality-minded experience.',
        body: 'Pavurel is the current subordinate brand endorsement for Conference Manager. It shapes the visual and experience direction around clarity, operational precision and workplace hospitality; Conference Manager remains the product customers evaluate and use.',
      },
    ],
    closing: {
      eyebrow: 'Evaluate the product',
      title:
        'The next useful question is whether Conference Manager fits your conference journey.',
      body: 'Explore the product itself or follow the request from the employee perspective through to Workplace Team preparation.',
      primaryCta: 'Explore the product',
      secondaryCta: 'See how it works',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Das Problem, auf das wir uns konzentrieren',
        title: 'Ein gebuchter Raum bedeutet noch keine vorbereitete Konferenz.',
        body: 'Professionelle Workplace-Konferenzen benötigen häufig mehr als eine Reservierung. Gäste, Catering, Services, Ausstattung, Anforderungen und Änderungen müssen weiterhin koordiniert werden. Conference Manager hält diese Vorbereitung in einem verständlichen Konferenzkontext zusammen, statt sie über Nachrichten, Formulare und Übergaben zu verteilen.',
        statement: 'Eine Anfrage. Alles, was Ihre Konferenz braucht.',
      },
      {
        eyebrow: 'Für wen Conference Manager gedacht ist',
        title:
          'Für Organisationen, die Anfragen vereinfachen und die Vorbereitung klarer machen wollen.',
        body: 'Conference Manager richtet sich an Arbeitswelten, in denen Mitarbeitende professionelle Konferenzen organisieren und Workplace Teams die Erfahrung dahinter vorbereiten. Besonders relevant ist das Produkt dort, wo Räume bereits gebucht werden können, die Koordination rundherum aber weiterhin manuelle Arbeit und fehlenden Kontext erzeugt.',
        points: [
          {
            title: 'Mitarbeitende erhalten eine geführte Anfrage',
            body: 'Sie beschreiben die Konferenz und ihre Anforderungen, ohne wissen zu müssen, welches interne Team, Formular oder welcher Kanal für jedes Detail zuständig ist.',
          },
          {
            title: 'Workplace Teams erhalten den Vorbereitungskontext',
            body: 'Gäste, Catering, Services, Anforderungen und Raumkontext bleiben verbunden, damit das Team erkennt, was noch Aufmerksamkeit benötigt.',
          },
        ],
      },
      {
        eyebrow: 'Wie es in Ihre Umgebung passt',
        title:
          'Die Koordination verbessern, ohne funktionierende Systeme auszutauschen.',
        body: 'Conference Manager soll eine funktionierende Raumbuchung, Identity oder spezialisierte Workplace-Systeme nicht ersetzen. Das Produkt verbindet den Konferenzablauf um diese Fähigkeiten herum, damit sich die Einführung auf die Koordinationslücke statt auf ein umfassendes Austauschprogramm konzentrieren kann.',
        statement:
          'Behalten Sie Ihre Raumbuchung. Ersetzen Sie die Koordination rundherum.',
      },
      {
        eyebrow: 'Was Sie von uns erwarten können',
        title:
          'Mit einem realen Konferenzablauf starten und den Fit belegen, bevor Sie erweitern.',
        body: 'Wir setzen auf eine praktische Bewertung: Nehmen Sie eine Konferenz, die Ihre Organisation tatsächlich durchführt, betrachten Sie den Ablauf nach der Raumentscheidung und prüfen Sie, wo Conference Manager unnötige Übergaben reduziert, ohne weiterhin benötigte Systeme und Kontrollen zu verdrängen. Aussagen zu Produkt, Integrationen und Security bleiben an den tatsächlich umgesetzten und in der bewerteten Umgebung verfügbaren Stand gebunden.',
      },
      {
        eyebrow: 'Conference Manager by Pavurel',
        title: 'Ein präzises Produkt mit Hospitality-orientierter Erfahrung.',
        body: 'Pavurel ist das aktuelle untergeordnete Marken-Endorsement für Conference Manager. Es prägt die visuelle und erlebbare Richtung durch Klarheit, operative Präzision und Workplace Hospitality; Conference Manager bleibt das Produkt, das Kunden bewerten und nutzen.',
      },
    ],
    closing: {
      eyebrow: 'Das Produkt bewerten',
      title:
        'Die nächste sinnvolle Frage ist, ob Conference Manager zu Ihrem Konferenzablauf passt.',
      body: 'Sehen Sie sich das Produkt selbst an oder verfolgen Sie den Ablauf von der anfragenden Person bis zur Vorbereitung durch das Workplace Team.',
      primaryCta: 'Produkt ansehen',
      secondaryCta: 'So funktioniert es',
    },
  },
};

export function getCompanyCopy(locale: Locale): CompanyCopy {
  return companyCopy[locale];
}
