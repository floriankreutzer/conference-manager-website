import type { Locale } from '@config/locales';

const copy = {
  en: {
    firstName: 'First name', lastName: 'Last name', email: 'Business email', company: 'Company', companySize: 'Company size', message: 'What would you like to discuss?', messageOptional: 'Optional', privacy: 'I have read the privacy information for this demo request.', submit: 'Request a demo', unavailable: 'Demo requests are not active in this environment yet.', required: 'Required', selectPlaceholder: 'Select company size', honeypot: 'Leave this field empty',
  },
  de: {
    firstName: 'Vorname', lastName: 'Nachname', email: 'Business-E-Mail', company: 'Unternehmen', companySize: 'Unternehmensgröße', message: 'Was möchtest du besprechen?', messageOptional: 'Optional', privacy: 'Ich habe die Datenschutzhinweise für diese Demo-Anfrage gelesen.', submit: 'Demo anfragen', unavailable: 'Demo-Anfragen sind in dieser Umgebung noch nicht aktiv.', required: 'Pflichtfeld', selectPlaceholder: 'Unternehmensgröße auswählen', honeypot: 'Dieses Feld leer lassen',
  },
} satisfies Record<Locale, Record<string, string>>;

export function getDemoRequestCopy(locale: Locale) {
  return copy[locale];
}
