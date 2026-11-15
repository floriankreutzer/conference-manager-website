export function parsePublicHttpsUrl(value: string, label: string): URL {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
    throw new Error(
      `${label} must be a clean HTTPS URL without credentials, query parameters, or fragments.`,
    );
  }
  return url;
}
