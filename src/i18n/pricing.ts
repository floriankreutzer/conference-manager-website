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
        eyebrow: 'Current status',
        title: 'Understand the product before choosing a commercial model.',
        body: 'Conference Manager does not yet publish an approved public price list. Rather than present a number that has not been formally validated, the current website focuses on whether the product fits the conference-management problem your Workplace Team is trying to solve.',
        statement: 'Product fit first. Public pricing after approval.',
      },
      {
        eyebrow: 'What a future model should do',
        title: 'Make the commercial basis easy to understand.',
        body: 'The approved direction is to keep future packaging clear enough for buyers and procurement teams to understand without unnecessary billing complexity. The final packages are not defined here; the principle is clarity.',
        points: [
          {
            title: 'Clear scope',
            body: 'Buyers should be able to understand what Conference Manager covers without decoding a long list of artificial tiers.',
          },
          {
            title: 'Proportionate complexity',
            body: 'Commercial structure should stay no more complicated than the product and customer use case require.',
          },
        ],
      },
      {
        eyebrow: 'Value basis',
        title: 'Price the conference-management problem, not a checklist of integrations.',
        body: 'Conference Manager is intended to create operational value by giving employees a clearer request journey and Workplace Teams a more coherent basis for preparation and change. Integrations affect fit and implementation, but their count should not become the product story.',
        statement: 'Commercial logic should reflect the workplace problem the product addresses.',
      },
      {
        eyebrow: 'What you can do now',
        title: 'Use a demo to decide whether the product is relevant to your organisation.',
        body: 'A useful discussion can already map your current conference journey, existing room-booking environment and the areas where Workplace Teams spend coordination effort. Public pricing will be added only after the commercial model is formally validated and approved.',
      },
    ],
    closing: {
      eyebrow: 'Evaluate the fit',
      title: 'Start with the conference journey, not a speculative price.',
      body: 'Bring a real workplace-conference scenario to the demo and see whether Conference Manager addresses the coordination problem your team actually has. No public amount or package is presented as an offer before approval.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore the product',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Aktueller Stand',
        title: 'Verstehen Sie zuerst das Produkt – danach das kommerzielle Modell.',
        body: 'Conference Manager veröffentlicht derzeit noch keine freigegebene öffentliche Preisliste. Statt einen formal nicht validierten Betrag zu nennen, konzentriert sich die Website darauf, ob das Produkt zu dem Konferenzmanagement-Problem passt, das Ihr Workplace Team lösen möchte.',
        statement: 'Zuerst der Produktfit. Öffentliche Preise nach der Freigabe.',
      },
      {
        eyebrow: 'Was ein künftiges Modell leisten soll',
        title: 'Machen Sie die kommerzielle Grundlage leicht verständlich.',
        body: 'Die freigegebene Richtung ist, künftiges Packaging so klar zu halten, dass Käufer und Einkauf es ohne unnötige Abrechnungskomplexität verstehen können. Finale Pakete werden hier noch nicht definiert; verbindlich ist das Prinzip der Klarheit.',
        points: [
          {
            title: 'Verständlicher Umfang',
            body: 'Kunden sollen erkennen können, was Conference Manager abdeckt, ohne eine lange Liste künstlicher Tarifstufen entschlüsseln zu müssen.',
          },
          {
            title: 'Angemessene Komplexität',
            body: 'Die kommerzielle Struktur soll nicht komplizierter sein, als Produkt und Kundenanwendung es tatsächlich erfordern.',
          },
        ],
      },
      {
        eyebrow: 'Wertbasis',
        title: 'Bewerten Sie das Konferenzmanagement-Problem – nicht eine Integrations-Checkliste.',
        body: 'Conference Manager soll operativen Nutzen schaffen: eine klarere Anfrage für Mitarbeitende und einen zusammenhängenden Kontext für Workplace Teams bei Vorbereitung und Änderungen. Integrationen beeinflussen den Product Fit und die Einführung, ihre Anzahl soll aber nicht die Produktstory bestimmen.',
        statement: 'Die kommerzielle Logik soll dem Workplace-Problem folgen, das das Produkt adressiert.',
      },
      {
        eyebrow: 'Was Sie heute bereits tun können',
        title: 'Nutzen Sie eine Demo, um die Relevanz für Ihr Unternehmen zu bewerten.',
        body: 'Eine sinnvolle Diskussion kann bereits Ihren heutigen Konferenzablauf, die vorhandene Raumbuchung und die Bereiche betrachten, in denen Workplace Teams Koordinationsaufwand haben. Öffentliche Preise werden erst ergänzt, wenn das kommerzielle Modell formal validiert und freigegeben ist.',
      },
    ],
    closing: {
      eyebrow: 'Produktfit bewerten',
      title: 'Beginnen Sie mit dem Konferenzablauf – nicht mit einem spekulativen Preis.',
      body: 'Bringen Sie ein reales Workplace-Konferenzszenario mit in die Demo und prüfen Sie, ob Conference Manager das tatsächliche Koordinationsproblem Ihres Teams adressiert. Vor der Freigabe wird kein öffentlicher Betrag und kein Paket als Angebot dargestellt.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'Produkt ansehen',
    },
  },
};

export function getPricingCopy(locale: Locale): PricingCopy {
  return pricingCopy[locale];
}
