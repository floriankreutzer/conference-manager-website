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
        body: [
          'Professional workplace conferences often need more than a reservation.',
          'Guests, catering, services, equipment, requirements and changes still need coordination.',
          'Conference Manager keeps that preparation in one understandable conference context.',
        ].join(' '),
        statement: 'One request. Everything your conference needs.',
      },
      {
        eyebrow: 'Who it is for',
        title: 'For organisations that want a clearer preparation process.',
        body: [
          'Conference Manager is for workplaces where employees organise professional conferences',
          'and Workplace Teams prepare the experience behind them.',
          'It is especially relevant when room booking already works but the surrounding coordination does not.',
        ].join(' '),
        points: [
          {
            title: 'Employees get one guided request',
            body: [
              'Describe the conference and what it needs without knowing which internal team,',
              'form or channel owns every detail.',
            ].join(' '),
          },
          {
            title: 'Workplace Teams get the preparation context',
            body: [
              'Guests, catering, services, requirements and room context stay connected',
              'so the team can see what needs attention.',
            ].join(' '),
          },
        ],
      },
      {
        eyebrow: 'How it fits your environment',
        title: 'Improve coordination around systems that already work.',
        body: [
          'Conference Manager is not intended to replace a functioning room-booking, identity',
          'or specialist workplace system.',
          'It connects the conference journey around those capabilities instead.',
        ].join(' '),
        statement: 'Keep your room booking. Replace the coordination around it.',
      },
      {
        eyebrow: 'What to expect from us',
        title: 'Start with a real conference journey and prove the fit.',
        body: [
          'Take a conference your organisation actually runs and map what happens after the room is selected.',
          'Then assess where Conference Manager removes unnecessary hand-offs while preserving systems',
          'and controls you still need.',
          'Product, integration and security claims stay tied to what is actually implemented.',
        ].join(' '),
      },
      {
        eyebrow: 'Conference Manager by Pavurel',
        title: 'A precise product with a hospitality-minded experience.',
        body: [
          'Pavurel is the current subordinate brand endorsement for Conference Manager.',
          'It shapes the visual and experience direction around clarity, operational precision',
          'and workplace hospitality. Conference Manager remains the product customers use.',
        ].join(' '),
      },
    ],
    closing: {
      eyebrow: 'Evaluate the product',
      title: 'Does Conference Manager fit your conference journey?',
      body: [
        'Explore the product itself or follow the request from the employee perspective',
        'through to Workplace Team preparation.',
      ].join(' '),
      primaryCta: 'Explore the product',
      secondaryCta: 'See how it works',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Das Problem, auf das wir uns konzentrieren',
        title: 'Ein gebuchter Raum bedeutet noch keine vorbereitete Konferenz.',
        body: [
          'Professionelle Workplace-Konferenzen benötigen häufig mehr als eine Reservierung.',
          'Gäste, Catering, Services, Ausstattung, Anforderungen und Änderungen müssen koordiniert werden.',
          'Conference Manager hält diese Vorbereitung in einem verständlichen Konferenzkontext zusammen.',
        ].join(' '),
        statement: 'Eine Anfrage. Alles, was Ihre Konferenz braucht.',
      },
      {
        eyebrow: 'Für wen Conference Manager gedacht ist',
        title: 'Für Organisationen, die ihre Konferenzvorbereitung klarer machen wollen.',
        body: [
          'Conference Manager richtet sich an Arbeitswelten, in denen Mitarbeitende professionelle',
          'Konferenzen organisieren und Workplace Teams die Erfahrung dahinter vorbereiten.',
          'Besonders relevant ist das Produkt, wenn die Raumbuchung bereits funktioniert, die Koordination aber nicht.',
        ].join(' '),
        points: [
          {
            title: 'Mitarbeitende erhalten eine geführte Anfrage',
            body: [
              'Beschreiben Sie Konferenz und Anforderungen, ohne wissen zu müssen, welches interne Team,',
              'Formular oder welcher Kanal für jedes Detail zuständig ist.',
            ].join(' '),
          },
          {
            title: 'Workplace Teams erhalten den Vorbereitungskontext',
            body: [
              'Gäste, Catering, Services, Anforderungen und Raumkontext bleiben verbunden,',
              'damit das Team erkennt, was noch Aufmerksamkeit benötigt.',
            ].join(' '),
          },
        ],
      },
      {
        eyebrow: 'Wie es in Ihre Umgebung passt',
        title: 'Koordination verbessern, ohne funktionierende Systeme auszutauschen.',
        body: [
          'Conference Manager soll eine funktionierende Raumbuchung, Identity oder spezialisierte',
          'Workplace-Systeme nicht ersetzen.',
          'Das Produkt verbindet den Konferenzablauf stattdessen um diese Fähigkeiten herum.',
        ].join(' '),
        statement: 'Behalten Sie Ihre Raumbuchung. Ersetzen Sie die Koordination rundherum.',
      },
      {
        eyebrow: 'Was Sie von uns erwarten können',
        title: 'Mit einem realen Konferenzablauf starten und den Fit belegen.',
        body: [
          'Nehmen Sie eine Konferenz, die Ihre Organisation tatsächlich durchführt, und betrachten Sie',
          'den Ablauf nach der Raumentscheidung.',
          'Prüfen Sie dann, wo Conference Manager unnötige Übergaben reduziert, ohne benötigte Systeme',
          'und Kontrollen zu verdrängen.',
          'Aussagen zu Produkt, Integrationen und Security bleiben an den umgesetzten Stand gebunden.',
        ].join(' '),
      },
      {
        eyebrow: 'Conference Manager by Pavurel',
        title: 'Ein präzises Produkt mit Hospitality-orientierter Erfahrung.',
        body: [
          'Pavurel ist das aktuelle untergeordnete Marken-Endorsement für Conference Manager.',
          'Es prägt die visuelle und erlebbare Richtung durch Klarheit, operative Präzision',
          'und Workplace Hospitality. Conference Manager bleibt das Produkt, das Kunden nutzen.',
        ].join(' '),
      },
    ],
    closing: {
      eyebrow: 'Das Produkt bewerten',
      title: 'Passt Conference Manager zu Ihrem Konferenzablauf?',
      body: [
        'Sehen Sie sich das Produkt an oder verfolgen Sie den Ablauf von der anfragenden Person',
        'bis zur Vorbereitung durch das Workplace Team.',
      ].join(' '),
      primaryCta: 'Produkt ansehen',
      secondaryCta: 'So funktioniert es',
    },
  },
};

export function getCompanyCopy(locale: Locale): CompanyCopy {
  return companyCopy[locale];
}
