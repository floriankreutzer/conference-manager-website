const allowedProtocols = new Set(['https:']);

export function parseApplicationOrigin(value: string): URL {
  const url = new URL(value);

  if (!allowedProtocols.has(url.protocol)) {
    throw new Error('Conference Manager application origin must use HTTPS.');
  }

  if (url.username || url.password || url.search || url.hash) {
    throw new Error(
      'Conference Manager application origin must not contain credentials, query parameters, or fragments.',
    );
  }

  return new URL(url.origin);
}

export function getApplicationOrigin(): URL {
  const configuredOrigin = import.meta.env.PUBLIC_CM_APP_ORIGIN;

  if (!configuredOrigin) {
    throw new Error('PUBLIC_CM_APP_ORIGIN must be configured at build time.');
  }

  return parseApplicationOrigin(configuredOrigin);
}

export function getLoginUrl(): string {
  return new URL('/login', getApplicationOrigin()).toString();
}
