import { parsePublicHttpsUrl } from './publicUrl';

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
