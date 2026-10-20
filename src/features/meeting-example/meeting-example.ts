class MeetingExample extends HTMLElement {
  private listenerController: AbortController | undefined;

  connectedCallback() {
    const controls = this.querySelector<HTMLElement>('[data-example-controls]');
    const tabs = Array.from(this.querySelectorAll<HTMLButtonElement>('[data-example-tab]'));
    const panels = Array.from(this.querySelectorAll<HTMLElement>('[data-example-panel]'));

    if (!controls || tabs.length !== 3 || panels.length !== tabs.length) return;

    this.listenerController?.abort();
    this.listenerController = new AbortController();
    const { signal } = this.listenerController;

    const select = (selectedIndex: number, moveFocus = false) => {
      const selectedTab = tabs[selectedIndex];
      if (!selectedTab) return;

      tabs.forEach((tab, index) => {
        const selected = index === selectedIndex;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        const panel = panels[index];
        if (panel) panel.hidden = !selected;
      });

      if (moveFocus) selectedTab.focus();
    };

    tabs.forEach((tab, index) => {
      const panel = panels[index];
      if (!panel) return;

      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', panel.id);
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.tabIndex = 0;

      tab.addEventListener('click', () => select(index), { signal });
      tab.addEventListener(
        'keydown',
        (event) => {
          let nextIndex: number;

          switch (event.key) {
            case 'ArrowRight':
              nextIndex = (index + 1) % tabs.length;
              break;
            case 'ArrowLeft':
              nextIndex = (index - 1 + tabs.length) % tabs.length;
              break;
            case 'Home':
              nextIndex = 0;
              break;
            case 'End':
              nextIndex = tabs.length - 1;
              break;
            default:
              return;
          }

          event.preventDefault();
          select(nextIndex, true);
        },
        { signal },
      );
    });

    controls.setAttribute('role', 'tablist');
    controls.setAttribute('aria-orientation', 'horizontal');
    select(0);
    controls.hidden = false;
  }

  disconnectedCallback() {
    this.listenerController?.abort();
  }
}

if (!customElements.get('meeting-example')) {
  customElements.define('meeting-example', MeetingExample);
}

export {};
