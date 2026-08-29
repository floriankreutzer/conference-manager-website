type SeoEnvironment = {
  preview: boolean;
  development: boolean;
  siteOrigin?: string;
};

export type SeoConfig =
  | {
      indexable: false;
      siteOrigin?: URL;
    }
  | {
      indexable: true;
      siteOrigin: URL;
    };

function parseSiteOrigin(value: string): URL {
  const url = new URL(value);

  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== '/'
  ) {
    throw new Error('PUBLIC_SITE_ORIGIN must be a clean HTTPS origin.');
  }

  return url;
}

export function getSeoConfig(environment: SeoEnvironment): SeoConfig {
  const indexable = !environment.preview && !environment.development;
  const siteOrigin = environment.siteOrigin ? parseSiteOrigin(environment.siteOrigin) : undefined;

  if (indexable) {
    if (!siteOrigin) {
      throw new Error('PUBLIC_SITE_ORIGIN is required for an indexable build.');
    }

    return { indexable: true, siteOrigin };
  }

  return siteOrigin ? { indexable: false, siteOrigin } : { indexable: false };
}
