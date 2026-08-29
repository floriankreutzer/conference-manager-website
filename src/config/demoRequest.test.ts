import { describe, expect, it } from 'vitest';
import { parseDemoRequestConfig, parsePublicHttpsUrl } from './demoRequest';

describe('demo request configuration', () => {
  it('stays disabled until both endpoint and privacy URL exist', () => {
    expect(parseDemoRequestConfig()).toEqual({ enabled: false });
    expect(parseDemoRequestConfig('https://demo.example.com/submit')).toEqual({ enabled: false });
    expect(parseDemoRequestConfig(undefined, 'https://www.example.com/privacy/')).toEqual({
      enabled: false,
    });
  });

  it('enables only clean HTTPS configuration', () => {
    expect(
      parseDemoRequestConfig(
        'https://forms.example.com/demo-request',
        'https://www.example.com/en/privacy/',
      ),
    ).toEqual({
      enabled: true,
      endpoint: 'https://forms.example.com/demo-request',
      privacyUrl: 'https://www.example.com/en/privacy/',
    });
  });

  it.each([
    'http://forms.example.com/demo-request',
    'javascript:alert(1)',
    'https://user:password@forms.example.com/demo-request',
    'https://forms.example.com/demo-request?next=https://evil.example',
    'https://forms.example.com/demo-request#fragment',
  ])('rejects unsafe public URL %s', (value) => {
    expect(() => parsePublicHttpsUrl(value, 'Test URL')).toThrow();
  });
});
