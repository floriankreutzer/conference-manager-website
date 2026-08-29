const httpsOnly = new Set(['https:']);

function parsePublicHttpsUrl(value: string, label: string): URL {
  const url = new URL(value);
  if (!httpsOnly.has(url.protocol) || url.username || url.password || url.hash) {
    throw new Error(`${label} must be a clean HTTPS URL.`);
  }
  return url;
}

export type DemoRequestConfig = {
  enabled: boolean;
  endpoint?: string;
  privacyUrl?: string;
};

export function getDemoRequestConfig(): DemoRequestConfig {
  const endpoint = import.meta.env.PUBLIC_DEMO_REQUEST_ENDPOINT;
  const privacyUrl = import.meta.env.PUBLIC_DEMO_PRIVACY_URL;

  if (!endpoint || !privacyUrl) {
    return { enabled: false };
  }

  return {
    enabled: true,
    endpoint: parsePublicHttpsUrl(endpoint, 'Demo request endpoint').toString(),
    privacyUrl: parsePublicHttpsUrl(privacyUrl, 'Demo privacy URL').toString(),
  };
}
