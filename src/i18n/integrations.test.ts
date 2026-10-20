import { describe, expect, it } from 'vitest';
import { getIntegrationsCopy } from './integrations';

describe('Integrations copy', () => {
  it('keeps English and German connections and setup steps aligned', () => {
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
    expect(english.setup.steps).toHaveLength(3);
    expect(german.setup.steps).toHaveLength(english.setup.steps.length);
  });

  it.each([
    {
      locale: 'en' as const,
      calendarApproval: /Microsoft and Exchange permissions your organisation approves/,
      signInApproval: /requires setup and your organisation’s approval/,
      supplierAvailability: /assessed and confirmed as available/,
      manualFollowUp: /office team sends the order by email and records/,
      portalAssessment: /assess links to your supplier’s existing portal/,
      visitorAssessment: /separate feasibility check; they are not automatically included/,
    },
    {
      locale: 'de' as const,
      calendarApproval: /Microsoft- und Exchange-Freigaben Ihres Unternehmens/,
      signInApproval: /benötigt die Einrichtung und Freigabe Ihres Unternehmens/,
      supplierAvailability: /Anbindung geprüft und verfügbar/,
      manualFollowUp: /Office-Team versendet die Bestellung per E-Mail und hält/,
      portalAssessment: /vorhandene Portal Ihres Caterers.*prüfen wir gesondert/,
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
      portalAssessment,
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
      expect(catering?.points.some((point) => portalAssessment.test(point.body))).toBe(true);
      expect(visitors?.qualification).toMatch(visitorAssessment);
    },
  );

  it.each([
    {
      locale: 'en' as const,
      paidSetup: /one-time paid setup/,
      pilotStart: /free 30-day pilot begins after setup is complete/,
      realMeetings: /your own meetings in your customer environment/,
    },
    {
      locale: 'de' as const,
      paidSetup: /einmalige kostenpflichtige Einrichtung/,
      pilotStart: /kostenloser 30-Tage-Pilot beginnt nach abgeschlossener Einrichtung/,
      realMeetings: /eigenen Besprechungen in Ihrer Kundenumgebung/,
    },
  ])(
    'states the agreed setup and pilot sequence in $locale',
    ({ locale, paidSetup, pilotStart, realMeetings }) => {
      const { setup } = getIntegrationsCopy(locale);

      expect(setup.steps.some((step) => paidSetup.test(step.body))).toBe(true);
      expect(setup.steps.some((step) => pilotStart.test(step.body))).toBe(true);
      expect(setup.steps.some((step) => realMeetings.test(step.body))).toBe(true);
    },
  );
});
