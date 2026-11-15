// The independently packaged function owns this single bilingual outcome catalogue.
// It deliberately contains no submitted values, operational details or navigation URLs.
export const demoResponseCopy = {
  en: {
    accepted: {
      title: 'Your demo request has been accepted.',
      message: 'Your request has been accepted for processing.',
      next: 'You can close this page or use your browser’s Back button to return to the website. Please do not submit the same request again.',
    },
    invalid_request: {
      title: 'Please check your details.',
      message: 'Some required details are missing or could not be accepted.',
      next: 'Use your browser’s Back button to return to the form. Correct the details listed above before submitting it again.',
    },
    method_not_allowed: {
      title: 'Please use the demo request form.',
      message: 'This page cannot process a request opened this way.',
      next: 'Use your browser’s Back button to return to the website and open the demo request form.',
    },
    unsupported_media_type: {
      title: 'Please use the demo request form.',
      message: 'This request could not be processed in its current format.',
      next: 'Use your browser’s Back button to return to the website and submit your details through the demo request form.',
    },
    temporarily_unavailable: {
      title: 'We cannot confirm your request right now.',
      message: 'We cannot currently confirm whether your request was accepted for processing.',
      next: 'Please do not immediately submit the same request again. You can use your browser’s Back button to return to the website.',
    },
  },
  de: {
    accepted: {
      title: 'Ihre Demo-Anfrage wurde angenommen.',
      message: 'Ihre Anfrage wurde zur Bearbeitung angenommen.',
      next: 'Sie können diese Seite schließen oder über die Zurück-Funktion Ihres Browsers zur Website zurückkehren. Bitte senden Sie dieselbe Anfrage nicht erneut.',
    },
    invalid_request: {
      title: 'Bitte prüfen Sie Ihre Angaben.',
      message: 'Einige erforderliche Angaben fehlen oder konnten nicht angenommen werden.',
      next: 'Kehren Sie über die Zurück-Funktion Ihres Browsers zum Formular zurück. Korrigieren Sie die oben genannten Angaben, bevor Sie es erneut absenden.',
    },
    method_not_allowed: {
      title: 'Bitte nutzen Sie das Demo-Anfrageformular.',
      message: 'Über diesen Aufruf kann keine Anfrage bearbeitet werden.',
      next: 'Kehren Sie über die Zurück-Funktion Ihres Browsers zur Website zurück und öffnen Sie das Demo-Anfrageformular.',
    },
    unsupported_media_type: {
      title: 'Bitte nutzen Sie das Demo-Anfrageformular.',
      message: 'Diese Anfrage konnte in ihrem aktuellen Format nicht bearbeitet werden.',
      next: 'Kehren Sie über die Zurück-Funktion Ihres Browsers zur Website zurück und übermitteln Sie Ihre Angaben über das Demo-Anfrageformular.',
    },
    temporarily_unavailable: {
      title: 'Wir können Ihre Anfrage derzeit nicht bestätigen.',
      message:
        'Wir können derzeit nicht bestätigen, ob Ihre Anfrage zur Bearbeitung angenommen wurde.',
      next: 'Bitte senden Sie dieselbe Anfrage nicht sofort erneut. Sie können über die Zurück-Funktion Ihres Browsers zur Website zurückkehren.',
    },
  },
};

// Only these constant field hints may appear in an HTML validation response.
// JSON clients keep the existing generic invalid_request contract.
export const demoValidationCopy = {
  en: {
    title: 'Details to correct',
    fields: {
      firstName: 'First name: enter a name of up to 80 characters on one line.',
      lastName: 'Last name: enter a name of up to 80 characters on one line.',
      email:
        'Business email: enter a complete address, such as name@example.org, with no more than 254 characters.',
      company: 'Company: enter a name of up to 160 characters on one line.',
      companySize: 'Company size: select one of the available ranges.',
      message:
        'Message: use no more than 2,000 characters. Remove non-printing characters other than line breaks and tabs.',
      privacyAcknowledged: 'Privacy: confirm that you have read the privacy information.',
      locale: 'Language: reopen the website form in English or German.',
      body: 'The submission is too large. Shorten your text and check the field limits.',
      form: 'Open the website form again and check the required details before submitting.',
    },
  },
  de: {
    title: 'Bitte korrigieren Sie diese Angaben',
    fields: {
      firstName: 'Vorname: Geben Sie einen Namen mit höchstens 80 Zeichen in einer Zeile ein.',
      lastName: 'Nachname: Geben Sie einen Namen mit höchstens 80 Zeichen in einer Zeile ein.',
      email:
        'Geschäftliche E-Mail-Adresse: Geben Sie eine vollständige Adresse wie name@example.org mit höchstens 254 Zeichen ein.',
      company: 'Unternehmen: Geben Sie einen Namen mit höchstens 160 Zeichen in einer Zeile ein.',
      companySize: 'Unternehmensgröße: Wählen Sie eine der angebotenen Größen aus.',
      message:
        'Nachricht: Verwenden Sie höchstens 2.000 Zeichen. Entfernen Sie nicht druckbare Zeichen außer Zeilenumbrüchen und Tabulatoren.',
      privacyAcknowledged:
        'Datenschutz: Bestätigen Sie, dass Sie die Datenschutzhinweise gelesen haben.',
      locale: 'Sprache: Öffnen Sie das Formular auf der Website erneut auf Deutsch oder Englisch.',
      body: 'Die Übermittlung ist zu groß. Kürzen Sie Ihren Text und beachten Sie die Feldgrenzen.',
      form: 'Öffnen Sie das Formular auf der Website erneut und prüfen Sie die Pflichtangaben vor dem Absenden.',
    },
  },
};
