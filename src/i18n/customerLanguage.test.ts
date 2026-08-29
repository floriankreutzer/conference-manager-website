import { describe, expect, it } from 'vitest';
import { getCompanyCopy } from './company';
import { getHomepageCopy } from './homepage';
import { getInsightsJourneyCopy } from './insightsJourney';
import { getIntegrationsCopy } from './integrations';
import { getNavigationCopy } from './navigation';
import { getPricingCopy } from './pricing';
import { getProductStoryCopy, productStorySlugs } from './productStory';
import { getPublicPageCopy, publicPageSlugs } from './publicPages';
import { getSecurityTrustCopy } from './securityTrust';
import { getWorkplaceTeamsCopy } from './workplaceTeams';

const forbiddenImplementationLanguage = [
  /trusted backend/i,
  /trusted api/i,
  /access[- ]?tokens?/i,
  /refresh[- ]?tokens?/i,
  /integration authority/i,
  /integrationsautorität/i,
  /resource synchronization/i,
  /ressourcensynchronisierung/i,
  /feature flags?/i,
  /feature toggles?/i,
  /control plane/i,
  /tenant administration/i,
  /tenant-administration/i,
  /server-side integration/i,
  /serverseitige integration/i,
  /browser authority/i,
  /browser-autorität/i,
];

function serializePublicMarketingCopy(locale: 'en' | 'de'): string {
  return JSON.stringify({
    homepage: getHomepageCopy(locale),
    navigation: getNavigationCopy(locale),
    publicPages: publicPageSlugs.map((slug) => getPublicPageCopy(locale, slug)),
    productStories: productStorySlugs.map((slug) => getProductStoryCopy(locale, slug)),
    workplaceTeams: getWorkplaceTeamsCopy(locale),
    integrations: getIntegrationsCopy(locale),
    securityTrust: getSecurityTrustCopy(locale),
    pricing: getPricingCopy(locale),
    company: getCompanyCopy(locale),
    insightsJourney: getInsightsJourneyCopy(locale),
  });
}

describe('customer-language publication gate', () => {
  it.each(['en', 'de'] as const)(
    'keeps implementation vocabulary out of public %s marketing copy',
    (locale) => {
      const serialized = serializePublicMarketingCopy(locale);

      for (const forbidden of forbiddenImplementationLanguage) {
        expect(serialized).not.toMatch(forbidden);
      }
    },
  );
});
