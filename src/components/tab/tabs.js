import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, contrastColorFor } from '../../core/ui-utils.js';

/**
 * `<ui-tabs>` — Tab container that manages tab selection and panels.
 *
 * Each `<ui-tab>` child carries both the tab button label (via its `label`
 * attribute) and the panel content (via its default slot). The parent
 * `<ui-tabs>` builds the tab bar in shadow DOM and controls which child
 * is visible.
 *
 * Keyboard navigation follows the WAI-ARIA Tabs pattern
 * (Arrow Left/Right, Home, End).
 *
 * @element ui-tabs
 *
 * @attr {String}  background - Background colour for the component
 * @attr {String}  color      - Text colour
 * @attr {String}  size       - Component size: keyword or CSS length
 * @attr {String}  placement  - Tab bar position: top (default), bottom, start, end
 * @attr {Number}  selected   - Index of the active tab (0-based)
 *
 * @slot (default) - ui-tab children
 *
 * @fires ui-tab-change - Emitted when the active tab changes (detail: { index })
 *
 * @example
 *   <ui-tabs>
 *     <ui-tab label="First">Panel 1 content</ui-tab>
 *     <ui-tab label="Second">Panel 2 content</ui-tab>
 *   </ui-tabs>
 */
export class UITabs extends UIComponent {
  static properties = {
    background: { type: String,  default: '',    reflect: true },
    color:      { type: String,  default: '',    reflect: true },
    size:       { type: String,  default: '',    reflect: true },
    placement:  { type: String,  default: 'top', reflect: true },
    selected:   { type: Number,  default: 0,     reflect: true },
  };

  constructor() {
    super();
    this._handleClick   = this._handleClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  static styles() {
    return /* css */ `
      :host {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--ui-border-color, #e5e7eb);
        border-radius: var(--ui-radius, 0.5em);
        overflow: hidden;
        box-sizing: border-box;
        line-height: 1.5;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
      }

      /* Bottom placement flips the order */
      :host([placement="bottom"]) {
        flex-direction: column-reverse;
      }

      /* Start (left) placement — horizontal layout */
      :host([placement="start"]) {
        flex-direction: row;
      }

      /* End (right) placement — horizontal layout, reversed */
      :host([placement="end"]) {
        flex-direction: row-reverse;
      }

      /* ── Tab bar ────────────────────────────────────────── */
      .tablist {
        display: flex;
        gap: 0;
        background: var(--_bar-bg, var(--ui-bg-subtle, #f9fafb));
        overflow-x: auto;
        scrollbar-width: none;
      }

      .tablist::-webkit-scrollbar { display: none; }

      /* Vertical tablist for start/end placement */
      :host([placement="start"]) .tablist,
      :host([placement="end"]) .tablist {
        flex-direction: column;
        overflow-x: visible;
        overflow-y: auto;
        min-width: max-content;
        border-right: 1px solid var(--ui-border-color, #e5e7eb);
      }

      :host([placement="end"]) .tablist {
        border-right: none;
        border-left: 1px solid var(--ui-border-color, #e5e7eb);
      }

      /* ── Individual tab button ──────────────────────────── */
      .tab {
        flex: 0 0 auto;
        display: inline-flex;
        align-items: center;
        gap: 0.4em;
        padding: 0.75em 1.25em;
        border: none;
        background: transparent;
        color: var(--_tab-color, var(--ui-text-muted, #6b7280));
        font: inherit;
        font-size: inherit;
        font-weight: 500;
        cursor: pointer;
        white-space: nowrap;
        position: relative;
        user-select: none;
        transition: color 0.15s ease, background 0.15s ease;
      }

      .tab:hover {
        color: var(--_color, var(--ui-text-color, #111827));
        background: rgba(0, 0, 0, 0.04);
      }

      .tab:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: -0.125em;
        z-index: 1;
      }

      .tab[aria-selected="true"] {
        color: var(--_active-color, var(--ui-focus-ring, #6366f1));
        font-weight: 600;
      }

      /* Active indicator line */
      .tab[aria-selected="true"]::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 0.15em;
        background: var(--_active-color, var(--ui-focus-ring, #6366f1));
        border-radius: 0.15em 0.15em 0 0;
      }

      :host([placement="bottom"]) .tab[aria-selected="true"]::after {
        bottom: auto;
        top: 0;
        border-radius: 0 0 0.15em 0.15em;
      }

      /* Vertical indicator for start placement (right edge) */
      :host([placement="start"]) .tab[aria-selected="true"]::after {
        top: 0;
        bottom: 0;
        left: auto;
        right: 0;
        width: 0.15em;
        height: auto;
        border-radius: 0.15em 0 0 0.15em;
      }

      /* Vertical indicator for end placement (left edge) */
      :host([placement="end"]) .tab[aria-selected="true"]::after {
        top: 0;
        bottom: 0;
        left: 0;
        right: auto;
        width: 0.15em;
        height: auto;
        border-radius: 0 0.15em 0.15em 0;
      }

      /* Vertical tabs: left-align text */
      :host([placement="start"]) .tab,
      :host([placement="end"]) .tab {
        justify-content: flex-start;
        text-align: left;
        white-space: normal;
      }

      .tab[aria-disabled="true"] {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .tab[aria-disabled="true"]:hover {
        background: transparent;
        color: var(--_tab-color, var(--ui-text-muted, #6b7280));
      }

      /* ── Panel area ─────────────────────────────────────── */
      .panels {
        flex: 1;
      }

      ::slotted(ui-tab) {
        display: none !important;
      }

      ::slotted(ui-tab[active]) {
        display: block !important;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    // Watch for child changes (tabs added/removed, label/disabled changes)
    this._observer = new MutationObserver(() => this._syncTabs());
    this._observer.observe(this, {
      childList: true,
      subtree: false,
      attributes: true,
      attributeFilter: ['label', 'disabled'],
    });

    // Listen for clicks on tab buttons
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeyDown);

    // Initial sync after a tick to let children connect
    queueMicrotask(() => this._syncTabs());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer?.disconnect();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  /** Re-render then rebuild tab buttons so they survive every DOM refresh. */
  _update() {
    this._applyStyles();
    super._update();
    this._syncTabs();
  }

  /* ------------------------------------------------------------------ */
  /*  Public API                                                         */
  /* ------------------------------------------------------------------ */

  /** Get all <ui-tab> children. */
  get tabs() {
    return [...this.querySelectorAll(':scope > ui-tab')];
  }

  /** Select a tab by index. */
  select(index) {
    const tabs = this.tabs;
    if (index < 0 || index >= tabs.length) return;
    if (tabs[index]?.disabled) return;
    this.selected = index;
  }

  /* ------------------------------------------------------------------ */
  /*  Internal                                                           */
  /* ------------------------------------------------------------------ */

  _applyStyles() {
    const vars = {};
    if (this.background) {
      vars['--_bg'] = resolveColor(this.background);
      vars['--_color'] = this.color
        ? resolveColor(this.color)
        : contrastColorFor(this.background);
    } else if (this.color) {
      vars['--_color'] = resolveColor(this.color);
    }
    const fontSize = resolveSize(this.size);
    if (fontSize) vars['font-size'] = fontSize;
    this._setDynamicVars(vars);
  }

  /** Sync tab buttons in shadow DOM and panel visibility in light DOM. */
  _syncTabs() {
    const tabs = this.tabs;
    const tablist = this.shadowRoot?.querySelector('.tablist');
    if (!tablist) return;

    // Set orientation for screen readers
    const vertical = this.placement === 'start' || this.placement === 'end';
    tablist.setAttribute('aria-orientation', vertical ? 'vertical' : 'horizontal');

    // Clamp selected index
    const idx = Math.max(0, Math.min(this.selected, tabs.length - 1));

    // Build shadow tab buttons from light DOM <ui-tab> label attributes
    tablist.innerHTML = '';
    tabs.forEach((tab, i) => {
      const btn = document.createElement('button');
      btn.className = 'tab';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', i === idx ? 'true' : 'false');
      btn.setAttribute('tabindex', i === idx ? '0' : '-1');
      btn.dataset.index = i;
      btn.textContent = tab.label || `Tab ${i + 1}`;

      if (tab.disabled) {
        btn.setAttribute('aria-disabled', 'true');
        btn.setAttribute('tabindex', '-1');
      }

      tablist.appendChild(btn);
    });

    // Show/hide tabs — each <ui-tab> IS the panel
    tabs.forEach((tab, i) => {
      if (i === idx) {
        tab.setAttribute('active', '');
        tab.setAttribute('role', 'tabpanel');
      } else {
        tab.removeAttribute('active');
        tab.setAttribute('role', 'tabpanel');
      }
    });
  }

  /** @param {Event} e */
  _handleClick(e) {
    const btn = e.composedPath().find(
      (el) => el instanceof HTMLElement && el.classList?.contains('tab')
    );
    if (!btn || btn.getAttribute('aria-disabled') === 'true') return;
    const index = Number(btn.dataset.index);
    if (index === this.selected) return;
    this.selected = index;
    this.emit('ui-tab-change', { index });
  }

  /** @param {KeyboardEvent} e */
  _handleKeyDown(e) {
    const tablist = this.shadowRoot?.querySelector('.tablist');
    if (!tablist) return;

    const btns = [...tablist.querySelectorAll('.tab:not([aria-disabled="true"])')];
    if (!btns.length) return;

    const currentBtn = e.composedPath().find(
      (el) => el instanceof HTMLElement && el.classList?.contains('tab')
    );
    if (!currentBtn) return;

    let target = null;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown': {
        e.preventDefault();
        const ci = btns.indexOf(currentBtn);
        target = btns[(ci + 1) % btns.length];
        break;
      }
      case 'ArrowLeft':
      case 'ArrowUp': {
        e.preventDefault();
        const ci = btns.indexOf(currentBtn);
        target = btns[(ci - 1 + btns.length) % btns.length];
        break;
      }
      case 'Home':
        e.preventDefault();
        target = btns[0];
        break;
      case 'End':
        e.preventDefault();
        target = btns[btns.length - 1];
        break;
      default:
        return;
    }

    if (target) {
      target.focus();
      const index = Number(target.dataset.index);
      if (index !== this.selected) {
        this.selected = index;
        this.emit('ui-tab-change', { index });
      }
    }
  }

  render() {
    return `
      <div class="tablist" role="tablist"></div>
      <div class="panels">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('ui-tabs', UITabs);
