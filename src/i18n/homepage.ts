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
  why: { eyebrow: string; title: string; cards: Card[] };
  closing: { eyebrow: string; title: string; body: string; primaryCta: string; secondaryCta: string };
  journey: { request: string; booking: string; details: string; team: string; label: string };
};

const copy: Record<Locale, HomepageCopy> = {
  en: {
    meta: {
      title: 'Conference Manager — Conference management for modern workplaces',
      description: 'Coordinate guests, catering, services and conference requirements in one workplace conference experience while keeping the room-booking systems you already use.',
    },
    hero: {
      eyebrow: 'Conference management for modern workplaces.',
      title: 'Make every workplace conference feel effortless.',
      body: 'Manage guests, catering, services and conference requirements in one simple experience — while keeping the room-booking systems your workplace already uses.',
      primaryCta: 'Book a demo',
      secondaryCta: 'See how it works',
    },
    problem: {
      eyebrow: 'The coordination gap',
      title: 'Your room is booked. The coordination has only just started.',
      body: 'A professional conference usually involves more than a reservation. When guest details, catering, services and requirements live across email, chat and separate forms, employees carry unnecessary coordination effort and Workplace Teams have to reconstruct the full picture.',
      fragments: ['Room booking', 'Email', 'Catering request', 'Guest information', 'Service coordination'],
    },
    value: {
      eyebrow: 'One guided request',
      title: 'One request. Everything your conference needs.',
      body: 'Conference Manager brings the information around a professional conference into one structured journey. Employees get one clear place to request what they need. Workplace Teams get the context required to operate it professionally.',
      cards: [
        { title: 'Guests', body: 'Keep guest and participant context with the conference request.' },
        { title: 'Catering', body: 'Capture catering needs without sending employees into a separate coordination process.' },
        { title: 'Services', body: 'Bring relevant conference-service requirements into the same journey.' },
        { title: 'Requirements', body: 'Keep special needs and operational details visible with the request.' },
        { title: 'Room context', body: 'Connect the room requirement without turning Conference Manager into another room-booking product.' },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'A simpler way from request to ready.',
      intro: 'The experience starts with the conference itself and guides the requester through the information Workplace Teams need to prepare it.',
      steps: [
        { number: '01', title: 'Request the conference', body: 'Start with the conference itself, not the internal operational process behind it.' },
        { number: '02', title: 'Connect the room', body: 'Use the organisation’s existing room-booking capability as part of the journey.' },
        { number: '03', title: 'Add what the conference needs', body: 'Capture guests, catering, services and relevant requirements in one structured experience.' },
        { number: '04', title: 'Give Workplace Teams the full context', body: 'Make requirements and operational work visible from a coherent request.' },
        { number: '05', title: 'Deliver a prepared experience', body: 'Create the conditions for a conference that feels considered to employees and controlled to Workplace Teams.' },
      ],
    },
    roomBooking: {
      eyebrow: 'Designed to connect',
      title: 'Keep your room booking. Replace the coordination around it.',
      body: 'Conference Manager is not another room-booking system. Your existing booking provider remains responsible for the reservation. Conference Manager connects that capability into the wider conference journey.',
      supporting: 'We don’t replace your room booking system. We connect it.',
    },
    audiences: {
      eyebrow: 'Two sides of one experience',
      title: 'Simple for employees. Full visibility for Workplace Teams.',
      employee: { title: 'For employees', body: 'Ask for the conference, not the process. A guided experience keeps internal ownership and operational complexity out of the requester’s way.' },
      workplace: { title: 'For Workplace Teams', body: 'See the complete request behind the experience. Structured context makes requirements easier to understand and coordinate.' },
    },
    hospitality: {
      eyebrow: 'Considered hospitality',
      title: 'Every detail considered before your guests arrive.',
      body: 'Professional hospitality is the confidence that the right people have the right information, required services are understood and the experience has been prepared with care — without turning the employee journey into an operational checklist.',
    },
    ecosystem: {
      eyebrow: 'Connected workplace ecosystem',
      title: 'Keep the tools that already work.',
      body: 'Conference Manager is designed to fit into the workplace, identity and collaboration environment an organisation already uses rather than creating another isolated ecosystem.',
      items: ['Existing room-booking systems', 'Workplace services', 'Identity and collaboration environment'],
      microsoft: 'Microsoft 365 and Entra are the initial enterprise ecosystem focus where the implemented integration scope is verified.',
    },
    readiness: {
      eyebrow: 'Built for professional workplaces',
      title: 'Lightweight for users. Ready for business.',
      body: 'A simple experience should not require a lightweight approach to governance. Conference Manager is being built around controlled access, administration, security and integration boundaries alongside a clear user experience.',
      themes: ['Identity & sign-in', 'Roles & permissions', 'Tenant administration', 'Auditability', 'Security & privacy', 'Controlled integrations', 'Language support'],
    },
    why: {
      eyebrow: 'Why Conference Manager',
      title: 'Built around the conference, not around another system.',
      cards: [
        { title: 'Conference-first', body: 'Start with the complete professional conference request, not with room inventory.' },
        { title: 'Connected by design', body: 'Keep existing workplace infrastructure where it already solves a problem well.' },
        { title: 'Hospitality-minded', body: 'Make preparation feel considered for employees while preserving operational control for Workplace Teams.' },
      ],
    },
    closing: {
      eyebrow: 'Conference Manager by Pavurel',
      title: 'Make conference management effortless.',
      body: 'Bring guests, catering, services and conference requirements into one simple experience — without replacing the room-booking systems your workplace already uses.',
      primaryCta: 'Book a demo',
      secondaryCta: 'See how it works',
    },
    journey: { request: 'Conference request', booking: 'Connected room booking', details: 'Guests · Catering · Services · Requirements', team: 'Workplace Team', label: 'Conference Manager journey' },
  },
  de: {
    meta: {
      title: 'Conference Manager — Konferenzmanagement für moderne Arbeitswelten',
      description: 'Koordiniere Gäste, Catering, Services und Konferenzanforderungen in einem durchgängigen Erlebnis und behalte bestehende Raumbuchungssysteme bei.',
    },
    hero: {
      eyebrow: 'Konferenzmanagement für moderne Arbeitswelten.',
      title: 'Damit sich jede Workplace-Konferenz mühelos anfühlt.',
      body: 'Koordiniere Gäste, Catering, Services und Konferenzanforderungen in einem einfachen Erlebnis — und nutze weiterhin die Raumbuchungssysteme, die dein Unternehmen bereits einsetzt.',
      primaryCta: 'Demo buchen',
      secondaryCta: 'So funktioniert es',
    },
    problem: {
      eyebrow: 'Die Koordinationslücke',
      title: 'Der Raum ist gebucht. Die Koordination beginnt erst jetzt.',
      body: 'Zu einer professionellen Konferenz gehört meist mehr als eine Reservierung. Wenn Gästedaten, Catering, Services und Anforderungen über E-Mail, Chat und einzelne Formulare verteilt sind, entsteht unnötiger Abstimmungsaufwand und Workplace Teams müssen das Gesamtbild rekonstruieren.',
      fragments: ['Raumbuchung', 'E-Mail', 'Catering-Anfrage', 'Gästeinformationen', 'Service-Koordination'],
    },
    value: {
      eyebrow: 'Eine geführte Anfrage',
      title: 'Eine Anfrage. Alles, was die Konferenz braucht.',
      body: 'Conference Manager bringt die Informationen rund um eine professionelle Konferenz in einen strukturierten Ablauf. Mitarbeitende erhalten einen klaren Ort für ihre Anforderungen. Workplace Teams bekommen den Kontext, den sie für die professionelle Umsetzung benötigen.',
      cards: [
        { title: 'Gäste', body: 'Halte Gäste- und Teilnehmerkontext direkt bei der Konferenzanfrage.' },
        { title: 'Catering', body: 'Erfasse Catering-Bedarf, ohne Mitarbeitende in einen separaten Abstimmungsprozess zu schicken.' },
        { title: 'Services', body: 'Bringe relevante Conference-Services in denselben Ablauf.' },
        { title: 'Anforderungen', body: 'Halte besondere Bedürfnisse und operative Details sichtbar bei der Anfrage.' },
        { title: 'Raumkontext', body: 'Verbinde den Raumbedarf, ohne Conference Manager zu einem weiteren Raumbuchungsprodukt zu machen.' },
      ],
    },
    howItWorks: {
      eyebrow: 'So funktioniert es',
      title: 'Einfacher von der Anfrage zur vorbereiteten Konferenz.',
      intro: 'Der Ablauf beginnt bei der Konferenz selbst und führt die anfragende Person durch die Informationen, die Workplace Teams für die Vorbereitung benötigen.',
      steps: [
        { number: '01', title: 'Konferenz anfragen', body: 'Starte mit der Konferenz selbst – nicht mit dem internen Prozess dahinter.' },
        { number: '02', title: 'Raum verbinden', body: 'Nutze die bestehende Raumbuchung des Unternehmens als Teil des Ablaufs.' },
        { number: '03', title: 'Bedarf ergänzen', body: 'Erfasse Gäste, Catering, Services und relevante Anforderungen in einem strukturierten Erlebnis.' },
        { number: '04', title: 'Workplace Teams den vollständigen Kontext geben', body: 'Mache Anforderungen und operative Arbeit aus einer zusammenhängenden Anfrage sichtbar.' },
        { number: '05', title: 'Vorbereitet umsetzen', body: 'Schaffe die Grundlage für eine Konferenz, die für Mitarbeitende durchdacht und für Workplace Teams kontrollierbar ist.' },
      ],
    },
    roomBooking: {
      eyebrow: 'Auf Verbindung ausgelegt',
      title: 'Behalte deine Raumbuchung. Ersetze die Koordination darum herum.',
      body: 'Conference Manager ist kein weiteres Raumbuchungssystem. Der vorhandene Buchungsanbieter bleibt für die Reservierung verantwortlich. Conference Manager bindet diese Fähigkeit in den umfassenderen Konferenzablauf ein.',
      supporting: 'Wir ersetzen dein Raumbuchungssystem nicht. Wir verbinden es.',
    },
    audiences: {
      eyebrow: 'Zwei Seiten eines Erlebnisses',
      title: 'Einfach für Mitarbeitende. Volle Transparenz für Workplace Teams.',
      employee: { title: 'Für Mitarbeitende', body: 'Frage die Konferenz an, nicht den Prozess. Ein geführtes Erlebnis hält interne Zuständigkeiten und operative Komplexität aus dem Weg der anfragenden Person.' },
      workplace: { title: 'Für Workplace Teams', body: 'Sieh die vollständige Anfrage hinter dem Erlebnis. Strukturierter Kontext macht Anforderungen leichter verständlich und koordinierbar.' },
    },
    hospitality: {
      eyebrow: 'Durchdachte Hospitality',
      title: 'Jedes Detail bedacht, bevor die Gäste ankommen.',
      body: 'Professionelle Hospitality bedeutet die Sicherheit, dass die richtigen Personen die richtigen Informationen haben, Services verstanden sind und die Erfahrung sorgfältig vorbereitet wurde – ohne den Employee Journey in eine operative Checkliste zu verwandeln.',
    },
    ecosystem: {
      eyebrow: 'Vernetztes Workplace-Ökosystem',
      title: 'Behalte die Tools, die bereits funktionieren.',
      body: 'Conference Manager ist dafür ausgelegt, sich in die bestehende Workplace-, Identity- und Collaboration-Umgebung eines Unternehmens einzufügen, statt ein weiteres isoliertes Ökosystem zu schaffen.',
      items: ['Bestehende Raumbuchungssysteme', 'Workplace Services', 'Identity- und Collaboration-Umgebung'],
      microsoft: 'Microsoft 365 und Entra sind der erste Enterprise-Ökosystem-Fokus, soweit der jeweils implementierte Integrationsumfang verifiziert ist.',
    },
    readiness: {
      eyebrow: 'Für professionelle Arbeitswelten gebaut',
      title: 'Leicht für Nutzer. Bereit fürs Unternehmen.',
      body: 'Ein einfaches Erlebnis darf Governance nicht vereinfachen. Conference Manager wird mit kontrollierten Zugriffs-, Administrations-, Security- und Integrationsgrenzen entwickelt – zusammen mit einer klaren User Experience.',
      themes: ['Identity & Login', 'Rollen & Berechtigungen', 'Tenant Administration', 'Auditierbarkeit', 'Security & Datenschutz', 'Kontrollierte Integrationen', 'Sprachunterstützung'],
    },
    why: {
      eyebrow: 'Warum Conference Manager',
      title: 'Rund um die Konferenz gebaut – nicht um ein weiteres System.',
      cards: [
        { title: 'Conference-first', body: 'Beginne mit der vollständigen professionellen Konferenzanfrage statt mit Raum-Inventar.' },
        { title: 'Connected by design', body: 'Behalte bestehende Workplace-Infrastruktur dort, wo sie ein Problem bereits gut löst.' },
        { title: 'Hospitality-minded', body: 'Gestalte Vorbereitung durchdacht für Mitarbeitende und bewahre gleichzeitig operative Kontrolle für Workplace Teams.' },
      ],
    },
    closing: {
      eyebrow: 'Conference Manager by Pavurel',
      title: 'Mach Konferenzmanagement mühelos.',
      body: 'Bringe Gäste, Catering, Services und Konferenzanforderungen in ein einfaches Erlebnis – ohne die Raumbuchungssysteme zu ersetzen, die dein Unternehmen bereits nutzt.',
      primaryCta: 'Demo buchen',
      secondaryCta: 'So funktioniert es',
    },
    journey: { request: 'Konferenzanfrage', booking: 'Verbundene Raumbuchung', details: 'Gäste · Catering · Services · Anforderungen', team: 'Workplace Team', label: 'Conference Manager Ablauf' },
  },
};

export function getHomepageCopy(locale: Locale): HomepageCopy {
  return copy[locale];
}
