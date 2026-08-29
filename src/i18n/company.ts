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
        eyebrow: 'Why Conference Manager',
        title: 'Professional conferences need more than a room reservation.',
        body: 'Conference Manager was created around a simple observation: the room can be booked while the real preparation still continues across messages, catering requests, guest information and service hand-offs. The product brings that conference context together without asking customers to replace systems that already work.',
        statement: 'One request. Everything your conference needs.',
      },
      {
        eyebrow: 'Designed for both sides',
        title: 'Simple for employees. Useful for the teams preparing the conference.',
        body: 'A requester should not need to understand internal responsibilities to organise a conference. Workplace Teams, on the other hand, need enough structure to see what is required and what has changed. Conference Manager is designed to serve both needs in the same experience.',
        points: [
          {
            title: 'Less process for requesters',
            body: 'Guide employees through the information the conference needs without exposing the operational complexity behind it.',
          },
          {
            title: 'More context for Workplace Teams',
            body: 'Keep guests, catering, services, requirements and room context connected so preparation starts with a clearer picture.',
          },
        ],
      },
      {
        eyebrow: 'Built to fit',
        title: 'Keep the systems that already do their job well.',
        body: 'Conference Manager is not positioned as a replacement for room booking, identity or specialist workplace services. It connects the conference journey around them, so adoption can focus on better coordination rather than another replacement programme.',
        statement: "We don't replace your room booking system. We connect it.",
      },
      {
        eyebrow: 'Conference Manager by Pavurel',
        title: 'Operational precision with a warmer workplace character.',
        body: 'Pavurel is the subordinate brand endorsement used for the current Conference Manager experience. Its direction combines operational precision with warm workplace hospitality: clear, calm and dependable software that supports professional preparation without feeling bureaucratic.',
      },
    ],
    closing: {
      eyebrow: 'Explore the experience',
      title: 'See how Conference Manager turns that idea into a working product journey.',
      body: 'Start with the product flow or follow the request from the employee perspective through to the Workplace Team.',
      primaryCta: 'Explore the product',
      secondaryCta: 'See how it works',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Warum Conference Manager',
        title: 'Professionelle Konferenzen brauchen mehr als eine Raumreservierung.',
        body: 'Conference Manager entstand aus einer einfachen Beobachtung: Der Raum kann gebucht sein, während die eigentliche Vorbereitung noch über Nachrichten, Catering-Anfragen, Gästeinformationen und Service-Übergaben weiterläuft. Das Produkt führt diesen Konferenzkontext zusammen, ohne Systeme ersetzen zu wollen, die beim Kunden bereits funktionieren.',
        statement: 'Eine Anfrage. Alles, was Ihre Konferenz braucht.',
      },
      {
        eyebrow: 'Für beide Seiten gestaltet',
        title: 'Einfach für Mitarbeitende. Nützlich für die Teams hinter der Konferenz.',
        body: 'Wer eine Konferenz anfragt, sollte keine internen Zuständigkeiten verstehen müssen. Workplace Teams benötigen dagegen genug Struktur, um Anforderungen und Änderungen zu erkennen. Conference Manager verbindet beide Bedürfnisse in einem gemeinsamen Erlebnis.',
        points: [
          {
            title: 'Weniger Prozess für Anfragende',
            body: 'Mitarbeitende werden durch die Informationen geführt, die eine Konferenz benötigt, ohne die operative Komplexität dahinter offenzulegen.',
          },
          {
            title: 'Mehr Kontext für Workplace Teams',
            body: 'Gäste, Catering, Services, Anforderungen und Raumkontext bleiben verbunden, damit die Vorbereitung mit einem klareren Gesamtbild beginnt.',
          },
        ],
      },
      {
        eyebrow: 'Auf Integration ausgelegt',
        title: 'Behalten Sie die Systeme, die ihre Aufgabe bereits gut erfüllen.',
        body: 'Conference Manager ist nicht als Ersatz für Raumbuchung, Identity oder spezialisierte Workplace Services positioniert. Es verbindet den Konferenzablauf darum herum, damit sich die Einführung auf bessere Koordination statt auf ein weiteres Austauschprogramm konzentrieren kann.',
        statement: 'Wir ersetzen Ihre Raumbuchung nicht. Wir verbinden sie.',
      },
      {
        eyebrow: 'Conference Manager by Pavurel',
        title: 'Operative Präzision mit einem wärmeren Workplace-Charakter.',
        body: 'Pavurel ist das untergeordnete Marken-Endorsement der aktuellen Conference-Manager-Erfahrung. Die Richtung verbindet operative Präzision mit warmer Workplace Hospitality: klare, ruhige und verlässliche Software, die professionelle Vorbereitung unterstützt, ohne bürokratisch zu wirken.',
      },
    ],
    closing: {
      eyebrow: 'Das Erlebnis kennenlernen',
      title:
        'Sehen Sie, wie Conference Manager diese Idee in einen konkreten Produktablauf übersetzt.',
      body: 'Starten Sie mit dem Produkt oder verfolgen Sie den Ablauf von der anfragenden Person bis zum Workplace Team.',
      primaryCta: 'Produkt ansehen',
      secondaryCta: 'So funktioniert es',
    },
  },
};

export function getCompanyCopy(locale: Locale): CompanyCopy {
  return companyCopy[locale];
}
