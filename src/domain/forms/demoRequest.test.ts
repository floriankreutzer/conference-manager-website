import { describe, expect, it } from 'vitest';
import {
  businessEmailPattern,
  demoRequestServerLimits,
} from '../../../functions/demo-request/validation.js';
import { demoRequestEmailPattern, demoRequestLimits } from './demoRequest';

describe('independently packaged demo form contracts', () => {
  it('keeps browser field lengths aligned with authoritative server limits', () => {
    for (const [field, limit] of Object.entries(demoRequestLimits)) {
      expect(demoRequestServerLimits[field as keyof typeof demoRequestLimits]).toBe(limit);
    }
  });

  it.each([
    'name@example.org',
    'name+demo@sub.example.org',
    'name@example',
    'missing-at.example.org',
    'name @example.org',
  ])('keeps the native email pattern aligned with the server rule: %s', (email) => {
    const nativePattern = new RegExp(`^(?:${demoRequestEmailPattern})$`, 'v');
    expect(nativePattern.test(email)).toBe(businessEmailPattern.test(email));
  });
});
