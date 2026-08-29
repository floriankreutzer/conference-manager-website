import type { Locale } from '@config/locales';

type PricingPoint = {
  title: string;
  body: string;
};

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
        body: 'Conference Manager does not yet have a final approved public pricing model. This page therefore does not publish an amount, package or commercial offer that has not completed the required validation.',
        statement: 'Pricing will become specific when the commercial decision becomes specific.',
      },
      {
        eyebrow: 'Pricing principle',
        title: 'Keep packaging understandable.',
        body: 'The current commercial direction is to keep early packaging simple enough to understand and procure without creating billing complexity before demand justifies it. That is a pricing principle, not a final package design.',
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
        title: 'Price the operational value, not the integration count.',
        body: 'The approved pricing principles focus on the operational value Conference Manager is intended to create for Workplace Teams. Technical integrations are part of product fit, but the number of connected systems is not intended to become the sole measure of value.',
        statement: 'Commercial logic should follow the workplace problem the product solves.',
      },
      {
        eyebrow: 'Validation gate',
        title: 'Validate the commercial model before publishing it.',
        body: 'The final pricing decision still requires market and operating evidence, including willingness to pay, procurement preference, expected use and the cost of supporting the service. Until that evidence is sufficient and the model is approved, a demo conversation is the appropriate way to assess fit.',
      },
    ],
    closing: {
      eyebrow: 'Before public pricing',
      title: 'Discuss the fit without inventing the offer.',
      body: 'Use a demo to review your conference-management context and the scope that matters to your Workplace Team. A concrete public commercial model will be added only after its formal validation and approval.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore the product',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Kommerzieller Status',
        title: 'Kein öffentlicher Preis vor der Freigabe des Modells.',
        body: 'Für Conference Manager gibt es noch kein final freigegebenes öffentliches Preismodell. Diese Seite veröffentlicht deshalb weder einen Betrag noch ein Paket oder kommerzielles Angebot, das die erforderliche Validierung noch nicht durchlaufen hat.',
        statement: 'Konkretes Pricing folgt erst auf eine konkrete kommerzielle Entscheidung.',
      },
      {
        eyebrow: 'Pricing-Prinzip',
        title: 'Halte das Packaging verständlich.',
        body: 'Die aktuelle kommerzielle Richtung ist, frühes Packaging so einfach zu halten, dass es verständlich und beschaffbar bleibt, ohne Abrechnungskomplexität aufzubauen, bevor die Nachfrage sie rechtfertigt. Das ist ein Pricing-Prinzip und noch kein finales Paketdesign.',
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
        title: 'Bepreise den operativen Wert, nicht die Anzahl der Integrationen.',
        body: 'Die freigegebenen Pricing-Prinzipien richten sich am operativen Wert aus, den Conference Manager für Workplace Teams schaffen soll. Technische Integrationen gehören zum Product Fit, ihre Anzahl soll aber nicht zum alleinigen Maßstab des Werts werden.',
        statement:
          'Die kommerzielle Logik soll dem Workplace-Problem folgen, das das Produkt löst.',
      },
      {
        eyebrow: 'Validierungs-Gate',
        title: 'Validiere das kommerzielle Modell, bevor du es veröffentlichst.',
        body: 'Für die finale Pricing-Entscheidung fehlen noch Markt- und Betriebsevidenz, darunter Zahlungsbereitschaft, Beschaffungspräferenzen, erwartete Nutzung und die Kosten für den Betrieb des Services. Bis diese Evidenz ausreicht und das Modell freigegeben ist, ist ein Demo-Gespräch der passende Weg, den Fit zu bewerten.',
      },
    ],
    closing: {
      eyebrow: 'Vor öffentlichem Pricing',
      title: 'Besprich den Fit, ohne ein Angebot zu erfinden.',
      body: 'Nutze eine Demo, um euren Konferenzmanagement-Kontext und den für euer Workplace Team relevanten Umfang zu betrachten. Ein konkretes öffentliches kommerzielles Modell wird erst nach formaler Validierung und Freigabe ergänzt.',
      primaryCta: 'Demo buchen',
      secondaryCta: 'Produkt ansehen',
    },
  },
};

export function getPricingCopy(locale: Locale): PricingCopy {
  return pricingCopy[locale];
}
