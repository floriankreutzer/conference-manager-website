function normalizeBase(baseUrl: string): string {
  if (!baseUrl || baseUrl === '/') return '';
  return `/${baseUrl.replace(/^\/+|\/+$/g, '')}`;
}

export function withBasePath(pathname: string, baseUrl = import.meta.env.BASE_URL): string {
  const normalizedBase = normalizeBase(baseUrl);
  const normalizedPath = `/${pathname.replace(/^\/+/, '')}`;
  return `${normalizedBase}${normalizedPath}` || '/';
}

export function withoutBasePath(pathname: string, baseUrl = import.meta.env.BASE_URL): string {
  const normalizedBase = normalizeBase(baseUrl);
  if (!normalizedBase) return pathname;
  if (pathname === normalizedBase) return '/';
  if (!pathname.startsWith(`${normalizedBase}/`)) return pathname;
  return pathname.slice(normalizedBase.length) || '/';
}
