export {};

const header = document.querySelector<HTMLElement>('.site-header');
const toggle = header?.querySelector<HTMLButtonElement>('.nav-toggle');
const navigation = header?.querySelector<HTMLElement>('.primary-nav');

if (header && toggle && navigation) {
  const compact = window.matchMedia('(max-width: 72rem)');
  let open = false;

  const syncNavigation = () => {
    const willHide = compact.matches && !open;
    const restoreToggleFocus = willHide && navigation.contains(document.activeElement);
    const restoreLinkFocus = !compact.matches && document.activeElement === toggle;
    toggle.hidden = !compact.matches;
    navigation.hidden = willHide;
    toggle.setAttribute('aria-expanded', String(!willHide));
    if (restoreToggleFocus) toggle.focus();
    if (restoreLinkFocus) navigation.querySelector<HTMLAnchorElement>('a[href]')?.focus();
  };

  toggle.addEventListener('click', () => {
    open = !open;
    syncNavigation();
  });

  header.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !compact.matches || !open) return;
    open = false;
    syncNavigation();
    toggle.focus();
  });

  compact.addEventListener('change', syncNavigation);
  syncNavigation();
}
