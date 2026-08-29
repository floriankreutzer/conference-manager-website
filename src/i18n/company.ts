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
        eyebrow: 'Conference Manager by Pavurel',
        title: 'A focused product, carried by a broader brand idea.',
        body: 'Conference Manager is the product customers use to structure professional workplace conferences. Pavurel is the corporate endorsement around that product — adding a consistent brand language without replacing the Conference Manager name.',
        statement: 'Conference Manager is the product. by Pavurel is the endorsement.',
      },
      {
        eyebrow: 'What Pavurel brings',
        title: 'Operational precision with a warmer workplace experience.',
        body: 'The documented Pavurel direction combines operational precision with warm workplace hospitality. For Conference Manager, that means keeping the product clear and dependable while treating conference preparation as an experience that should feel considered for employees and manageable for Workplace Teams.',
        points: [
          {
            title: 'Precision in the work',
            body: 'Important conference context, responsibilities and changes should stay understandable instead of being scattered across informal hand-offs.',
          },
          {
            title: 'Hospitality in the experience',
            body: 'The requester should experience a calm, guided journey while the teams preparing the conference retain the structure they need behind the scenes.',
          },
        ],
      },
      {
        eyebrow: 'Product-family design',
        title: 'One visual family, two different jobs.',
        body: 'The public website is more editorial and expressive than the authenticated Conference Manager application. Both use the same Pavurel colour and typography discipline and the same preference for precise, restrained controls rather than generic SaaS styling.',
        statement: 'Marketing can feel warmer without making the product interface less operational.',
      },
      {
        eyebrow: 'Brand status',
        title: 'Clear about what is implemented — and what is still being cleared.',
        body: 'Pavurel is the preferred corporate-brand candidate used for the current Conference Manager brand direction. Formal company-name, domain and trademark clearance remain separate governance steps. The website therefore uses Pavurel as an endorsement without presenting legal adoption or registration as completed.',
      },
    ],
    closing: {
      eyebrow: 'Meet the product',
      title: 'See how the Pavurel approach shows up in Conference Manager.',
      body: 'The best way to understand the relationship is to look at the product experience itself: simple for the requester, structured for the Workplace Team and designed to fit the systems already in place.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore the product',
    },
  },
  de: {
    sections: [
      {
        eyebrow: 'Conference Manager by Pavurel',
        title: 'Ein fokussiertes Produkt, getragen von einer übergeordneten Markenidee.',
        body: 'Conference Manager ist das Produkt, mit dem Kunden professionelle Workplace-Konferenzen strukturiert organisieren. Pavurel ist das Corporate Endorsement rund um dieses Produkt – mit einer konsistenten Markensprache, ohne den Namen Conference Manager zu ersetzen.',
        statement: 'Conference Manager ist das Produkt. by Pavurel ist das Endorsement.',
      },
      {
        eyebrow: 'Wofür Pavurel steht',
        title: 'Operative Präzision mit einer wärmeren Workplace Experience.',
        body: 'Die dokumentierte Pavurel-Ausrichtung verbindet operative Präzision mit warmer Workplace Hospitality. Für Conference Manager bedeutet das: Das Produkt bleibt klar und verlässlich, während die Vorbereitung einer Konferenz für Mitarbeitende durchdacht und für Workplace Teams beherrschbar wirken soll.',
        points: [
          {
            title: 'Präzision in der Organisation',
            body: 'Wichtiger Konferenzkontext, Zuständigkeiten und Änderungen sollen nachvollziehbar bleiben, statt über informelle Übergaben verteilt zu sein.',
          },
          {
            title: 'Hospitality in der Erfahrung',
            body: 'Die anfragende Person soll einen ruhigen, geführten Ablauf erleben, während die Teams hinter der Konferenz die nötige Struktur für ihre Arbeit behalten.',
          },
        ],
      },
      {
        eyebrow: 'Gemeinsame Produktfamilie',
        title: 'Eine visuelle Familie für zwei unterschiedliche Aufgaben.',
        body: 'Die öffentliche Website ist redaktioneller und ausdrucksstärker als die authentifizierte Conference-Manager-Anwendung. Beide folgen derselben Pavurel-Farb- und Typografiedisziplin sowie einer präzisen, zurückhaltenden Formensprache statt generischer SaaS-Optik.',
        statement: 'Marketing darf wärmer wirken, ohne die operative Klarheit des Produkts aufzugeben.',
      },
      {
        eyebrow: 'Markenstatus',
        title: 'Klar darin, was umgesetzt ist – und was noch formal geklärt wird.',
        body: 'Pavurel ist der bevorzugte Corporate-Brand-Kandidat für die aktuelle Conference-Manager-Markenrichtung. Formale Firmenname-, Domain- und Markenfreigaben bleiben eigenständige Governance-Schritte. Die Website nutzt Pavurel deshalb als Endorsement, ohne eine abgeschlossene rechtliche Adoption oder Registrierung zu behaupten.',
      },
    ],
    closing: {
      eyebrow: 'Das Produkt kennenlernen',
      title: 'Sehen Sie, wie der Pavurel-Ansatz in Conference Manager sichtbar wird.',
      body: 'Am klarsten wird die Beziehung im Produkterlebnis selbst: einfach für die anfragende Person, strukturiert für Workplace Teams und darauf ausgelegt, sich in bestehende Systeme einzufügen.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'Produkt ansehen',
    },
  },
};

export function getCompanyCopy(locale: Locale): CompanyCopy {
  return companyCopy[locale];
}
