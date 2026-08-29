const httpsOnly = new Set(['https:']);

export function parsePublicHttpsUrl(value: string, label: string): URL {
  const url = new URL(value);
  if (!httpsOnly.has(url.protocol) || url.username || url.password || url.search || url.hash) {
    throw new Error(`${label} must be a clean HTTPS URL without credentials, query parameters, or fragments.`);
  }
  return url;
}

export type DemoRequestConfig = {
  enabled: boolean;
  endpoint?: string;
  privacyUrl?: string;
};

export function parseDemoRequestConfig(endpoint?: string, privacyUrl?: string): DemoRequestConfig {
  if (!endpoint || !privacyUrl) {
    return { enabled: false };
  }

  return {
    enabled: true,
    endpoint: parsePublicHttpsUrl(endpoint, 'Demo request endpoint').toString(),
    privacyUrl: parsePublicHttpsUrl(privacyUrl, 'Demo privacy URL').toString(),
  };
}

export function getDemoRequestConfig(): DemoRequestConfig {
  return parseDemoRequestConfig(
    import.meta.env.PUBLIC_DEMO_REQUEST_ENDPOINT,
    import.meta.env.PUBLIC_DEMO_PRIVACY_URL,
  );
}
