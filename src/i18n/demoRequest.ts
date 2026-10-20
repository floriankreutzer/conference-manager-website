import type { Locale } from '@config/locales';

const copy = {
  en: {
    eyebrow: 'Book a demo',
    title: 'See Conference Manager in action.',
    intro:
      'Show us how you organize meetings today. In the demo, we discuss your process and how your existing systems could be connected.',
    formIntro: 'Your details help us prepare the demo and arrange a time with you.',
    pilotEyebrow: 'After the demo',
    setupDetails: 'Explore setup & pilot',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Business email',
    company: 'Company',
    companySize: 'Company size',
    message: 'What would you like to discuss?',
    messageHint:
      'For example, your current room-booking system or the steps you would like to explore.',
    messageOptional: 'Optional',
    privacy: 'I have read the privacy information for this demo request.',
    privacyLink: 'Privacy',
    submit: 'Request a demo',
    unavailable: 'Demo requests are not active in this environment yet.',
    required: 'Required',
    selectPlaceholder: 'Please select',
    honeypot: 'Leave this field empty',
  },
  de: {
    eyebrow: 'Demo anfragen',
    title: 'Lernen Sie Conference Manager kennen.',
    intro:
      'Zeigen Sie uns, wie Sie Ihre Besprechungen heute organisieren. In der Demo besprechen wir Ihren Ablauf und die mögliche Anbindung Ihrer vorhandenen Systeme.',
    formIntro:
      'Ihre Angaben helfen uns, die Demo vorzubereiten und einen Termin mit Ihnen abzustimmen.',
    pilotEyebrow: 'Nach der Demo',
    setupDetails: 'Einrichtung & Pilot ansehen',
    firstName: 'Vorname',
    lastName: 'Nachname',
    email: 'Geschäftliche E-Mail-Adresse',
    company: 'Unternehmen',
    companySize: 'Unternehmensgröße',
    message: 'Was möchten Sie besprechen?',
    messageHint:
      'Zum Beispiel Ihre heutige Raumbuchung oder die Abläufe, die Sie kennenlernen möchten.',
    messageOptional: 'Optional',
    privacy: 'Ich habe die Datenschutzhinweise für diese Demo-Anfrage gelesen.',
    privacyLink: 'Datenschutz',
    submit: 'Demo anfragen',
    unavailable: 'Demo-Anfragen sind in dieser Umgebung noch nicht aktiv.',
    required: 'Pflichtfeld',
    selectPlaceholder: 'Bitte auswählen',
    honeypot: 'Dieses Feld leer lassen',
  },
} satisfies Record<Locale, Record<string, string>>;

export function getDemoRequestCopy(locale: Locale) {
  return copy[locale];
}
