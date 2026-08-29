import type { Locale } from '@config/locales';

type PricingPoint = { title: string; body: string };
type PricingSection = {
  eyebrow: string;
  title: string;
  body: string;
  points?: readonly PricingPoint[];
  statement?: string;
};
type PricingCopy = {
  sections: readonly PricingSection[];
  closing: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

const pricingCopy: Record<Locale, PricingCopy> = {
  en: {
    sections: [
      {
        eyebrow: 'Commercial status',
        title: 'No public price before the model is approved.',
        body: 'Conference Manager does not yet have a final approved public pricing model. This page therefore does not publish an amount, package or commercial offer before the required validation is complete.',
        statement: 'Pricing becomes specific when the commercial decision becomes specific.',
      },
      {
        eyebrow: 'Pricing principle',
        title: 'Keep the commercial model understandable.',
        body: 'The current direction is to keep early packaging simple enough to understand and procure without adding billing complexity before customer evidence justifies it. That is a pricing principle, not a final package design.',
        points: [
          {
            title: 'Clarity first',
            body: 'A future public model should make the commercial basis understandable without requiring customers to decode unnecessary billing mechanics.',
          },
          {
            title: 'No premature complexity',
            body: 'Packaging should not become more complicated than the product and customer evidence require.',
          },
        ],
      },
      {
        eyebrow: 'Value basis',
        title: 'Anchor pricing in the workplace problem, not the integration count.',
        body: 'The approved principles focus on the operational value Conference Manager is intended to create for Workplace Teams. Integrations matter for product fit, but the number of connected systems is not intended to become the sole measure of value.',
        statement: 'Commercial logic should follow the workplace problem the product solves.',
      },
      {
        eyebrow: 'Validation before publication',
        title: 'Publish a model only when the evidence supports it.',
        body: 'The final decision still requires market and operating evidence such as willingness to pay, procurement preference, expected use and service cost. Until that evidence is sufficient and the model is approved, a demo is the appropriate way to discuss product fit rather than imply an unapproved offer.',
      },
    ],
    closing: {
      eyebrow: 'Before public pricing',
      title: 'Discuss product fit without inventing the offer.',
      body: 'Use a demo to review your conference-management context and the scope that matters to your Workplace Team. A concrete public commercial model will be added only after formal validation and approval.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore the product',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Kommerzieller Status',
        title: 'Kein öffentlicher Preis vor der Freigabe des Modells.',
        body: 'Für Conference Manager gibt es noch kein final freigegebenes öffentliches Preismodell. Diese Seite veröffentlicht deshalb weder einen Betrag noch ein Paket oder kommerzielles Angebot, bevor die erforderliche Validierung abgeschlossen ist.',
        statement: 'Konkretes Pricing folgt erst auf eine konkrete kommerzielle Entscheidung.',
      },
      {
        eyebrow: 'Pricing-Prinzip',
        title: 'Halten Sie das kommerzielle Modell verständlich.',
        body: 'Die aktuelle Richtung ist, frühes Packaging so einfach zu halten, dass es verständlich und beschaffbar bleibt, ohne Abrechnungskomplexität aufzubauen, bevor Kundenevidenz sie rechtfertigt. Das ist ein Pricing-Prinzip und noch kein finales Paketdesign.',
        points: [
          {
            title: 'Klarheit zuerst',
            body: 'Ein künftiges öffentliches Modell soll die kommerzielle Grundlage verständlich machen, ohne Kunden durch unnötige Abrechnungsmechaniken zu führen.',
          },
          {
            title: 'Keine vorschnelle Komplexität',
            body: 'Packaging soll nicht komplizierter werden, als Produkt- und Kundenevidenz es erfordern.',
          },
        ],
      },
      {
        eyebrow: 'Wertbasis',
        title: 'Verankern Sie Pricing im Workplace-Problem – nicht in der Zahl der Integrationen.',
        body: 'Die freigegebenen Pricing-Prinzipien richten sich am operativen Wert aus, den Conference Manager für Workplace Teams schaffen soll. Integrationen gehören zum Product Fit, ihre Anzahl soll aber nicht zum alleinigen Maßstab des Werts werden.',
        statement:
          'Die kommerzielle Logik soll dem Workplace-Problem folgen, das das Produkt löst.',
      },
      {
        eyebrow: 'Validierung vor Veröffentlichung',
        title: 'Veröffentlichen Sie ein Modell erst, wenn die Evidenz es trägt.',
        body: 'Für die finale Pricing-Entscheidung fehlen noch Markt- und Betriebsevidenz wie Zahlungsbereitschaft, Beschaffungspräferenzen, erwartete Nutzung und Servicekosten. Bis diese Evidenz ausreicht und das Modell freigegeben ist, ist eine Demo der passende Weg, den Produktfit zu besprechen, ohne ein nicht freigegebenes Angebot anzudeuten.',
      },
    ],
    closing: {
      eyebrow: 'Vor öffentlichem Pricing',
      title: 'Besprechen Sie den Produktfit, ohne ein Angebot zu erfinden.',
      body: 'Nutzen Sie eine Demo, um Ihren Konferenzmanagement-Kontext und den für Ihr Workplace Team relevanten Umfang zu betrachten. Ein konkretes öffentliches kommerzielles Modell wird erst nach formaler Validierung und Freigabe ergänzt.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'Produkt ansehen',
    },
  },
};

export function getPricingCopy(locale: Locale): PricingCopy {
  return pricingCopy[locale];
}
