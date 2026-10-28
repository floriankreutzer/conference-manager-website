export const PAVUREL_ICON_NAMES = [
  'add',
  'arrow-left',
  'arrow-right',
  'audit',
  'calendar',
  'catering',
  'changes',
  'check',
  'chevron-down',
  'chevron-right',
  'close',
  'coordination',
  'customers',
  'dashboard',
  'delivery',
  'diagnostics',
  'external-link',
  'filter',
  'info',
  'integrations',
  'lock',
  'menu',
  'participants',
  'recovery',
  'request',
  'room-equipment',
  'search',
  'settings',
  'sign-out',
  'system',
  'usage',
  'warning',
] as const;
export const PAVUREL_ICON_VARIANTS = ['light', 'mono', 'inverse'] as const;

export type PavurelIconName = (typeof PAVUREL_ICON_NAMES)[number];
export type PavurelIconVariant = (typeof PAVUREL_ICON_VARIANTS)[number];

export function pavurelIconAsset(name: unknown, variant: unknown = 'light'): string {
  if (
    typeof name !== 'string' ||
    !PAVUREL_ICON_NAMES.includes(name as PavurelIconName) ||
    typeof variant !== 'string' ||
    !PAVUREL_ICON_VARIANTS.includes(variant as PavurelIconVariant)
  ) {
    throw new TypeError('PAVUREL_ICON_INVALID');
  }
  return `/assets/pavurel-icons/v0.1/${variant}/${name}.svg`;
}
