import { describe, expect, it } from 'vitest';
import { getIntegrationsCopy } from './integrations';

describe('Integrations copy', () => {
  it('keeps English and German connections and preparation questions aligned', () => {
    const english = getIntegrationsCopy('en');
    const german = getIntegrationsCopy('de');

    expect(english.sections.map((section) => section.id)).toEqual([
      'rooms',
      'identity',
      'catering',
      'visitors',
    ]);
    expect(german.sections.map((section) => section.id)).toEqual(
      english.sections.map((section) => section.id),
    );
    english.sections.forEach((section, index) => {
      expect(german.sections[index]?.points).toHaveLength(section.points.length);
      expect(section.qualification).not.toBe('');
      expect(german.sections[index]?.qualification).not.toBe('');
    });
    expect(english.preparation.questions).toHaveLength(3);
    expect(german.preparation.questions).toHaveLength(english.preparation.questions.length);
  });

  it.each([
    {
      locale: 'en' as const,
      calendarApproval: /Microsoft and Exchange permissions your organisation approves/,
      signInApproval: /requires setup and your organisation’s approval/,
      supplierAvailability: /assessed and confirmed as available/,
      manualFollowUp: /office team sends the order by email and records/,
      supplierAccessAssessment: /supplier accounts or confirmation links.*assessed separately/,
      visitorAssessment: /separate feasibility check; they are not automatically included/,
    },
    {
      locale: 'de' as const,
      calendarApproval: /Microsoft- und Exchange-Freigaben Ihres Unternehmens/,
      signInApproval: /benötigt die Einrichtung und Freigabe Ihres Unternehmens/,
      supplierAvailability: /Anbindung geprüft und verfügbar/,
      manualFollowUp: /Office-Team versendet die Bestellung per E-Mail und hält/,
      supplierAccessAssessment:
        /eigenen Caterer-Zugang oder Bestätigungslink.*prüfen wir gesondert/,
      visitorAssessment: /gesonderte Machbarkeitsprüfung und sind nicht automatisch im Pilot/,
    },
  ])(
    'keeps customer-controlled access and unconfirmed connections explicit in $locale',
    ({
      locale,
      calendarApproval,
      signInApproval,
      supplierAvailability,
      manualFollowUp,
      supplierAccessAssessment,
      visitorAssessment,
    }) => {
      const { sections } = getIntegrationsCopy(locale);
      const rooms = sections.find((section) => section.id === 'rooms');
      const identity = sections.find((section) => section.id === 'identity');
      const catering = sections.find((section) => section.id === 'catering');
      const visitors = sections.find((section) => section.id === 'visitors');

      expect(rooms?.qualification).toMatch(calendarApproval);
      expect(identity?.qualification).toMatch(signInApproval);
      expect(catering?.qualification).toMatch(supplierAvailability);
      expect(catering?.points.some((point) => manualFollowUp.test(point.body))).toBe(true);
      expect(catering?.points.some((point) => supplierAccessAssessment.test(point.body))).toBe(
        true,
      );
      expect(visitors?.qualification).toMatch(visitorAssessment);
    },
  );

  it.each([
    {
      locale: 'en' as const,
      existingSystems: /room-booking system and Microsoft environment/,
      approval: /Who approves access and the exchange/,
      optionalSystems: /catering or visitor systems/,
    },
    {
      locale: 'de' as const,
      existingSystems: /Raumbuchungssystem und welche Microsoft-Umgebung/,
      approval: /Wer gibt Zugriffe und den Austausch/,
      optionalSystems: /Catering- oder Besuchersysteme/,
    },
  ])(
    'guides the customer through connection requirements in $locale',
    ({ locale, existingSystems, approval, optionalSystems }) => {
      const { preparation } = getIntegrationsCopy(locale);

      expect(preparation.questions.some((question) => existingSystems.test(question))).toBe(true);
      expect(preparation.questions.some((question) => approval.test(question))).toBe(true);
      expect(preparation.questions.some((question) => optionalSystems.test(question))).toBe(true);
    },
  );
});
