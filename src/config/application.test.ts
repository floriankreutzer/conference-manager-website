import { describe, expect, it } from 'vitest';
import { parseApplicationOrigin } from './application';

describe('parseApplicationOrigin', () => {
  it('accepts a clean HTTPS origin', () => {
    expect(parseApplicationOrigin('https://app.example.com').toString()).toBe('https://app.example.com/');
  });

  it.each([
    'http://app.example.com',
    'javascript:alert(1)',
    'https://user:password@app.example.com',
    'https://app.example.com?redirect=https://evil.example',
    'https://app.example.com#token',
  ])('rejects unsafe application origin %s', (origin) => {
    expect(() => parseApplicationOrigin(origin)).toThrow();
  });
});
