import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, resolveColorHover, contrastColorFor, resolveElevation } from '../../core/ui-utils.js';

/**
 * `<ui-dropdown>` — A dropdown menu button.
 *
 * Renders a trigger button that opens a dropdown panel of menu items.
 * Place `<ui-dropdown-item>` children inside to populate the menu.
 * Any other content (text, icons, elements) becomes the trigger label.
 *
 * Items support **rich content** — icons, badges, secondary text, or any
 * HTML you like.  Nest `<ui-dropdown-item>` elements inside another item
 * to create **multi-level submenus** automatically.
 *
 * @element ui-dropdown
 *
 * @attr {String}  background - Trigger background colour (palette token or CSS colour)
 * @attr {String}  color      - Trigger text colour (auto-detected if omitted)
 * @attr {String}  size       - Trigger size: named keyword or any CSS length
 * @attr {Boolean} disabled   - Disables the trigger button
 * @attr {Boolean} pill       - Fully rounded trigger ends
 * @attr {Boolean} outline    - Outline-style trigger
 * @attr {Boolean} flat       - Flat/ghost-style trigger
 * @attr {String}  elevation  - Menu shadow depth: 1–5 or raw CSS box-shadow (default: 2)
 * @attr {String}  placement  - Menu placement: bottom-start | bottom-end | top-start | top-end
 *
 * @slot (default) - Trigger label content **and** `<ui-dropdown-item>` menu items.
 *
 * @fires ui-select - Emitted when a leaf menu item is clicked.
 *                    `event.detail.item` = the `<ui-dropdown-item>`,
 *                    `event.detail.value` = its `value` attribute.
 * @fires ui-open   - Emitted when the menu opens.
 * @fires ui-close  - Emitted when the menu closes.
 *
 * @example
 *   <ui-dropdown background="indigo-500">
 *     Actions
 *     <ui-dropdown-item value="edit">Edit</ui-dropdown-item>
 *     <ui-dropdown-item value="dup">Duplicate</ui-dropdown-item>
 *     <ui-dropdown-item value="del">Delete</ui-dropdown-item>
 *   </ui-dropdown>
 */
export class UIDropdown extends UIComponent {

  static properties = {
    background: { type: String,  default: 'gray-200',      reflect: true },
    color:      { type: String,  default: '',               reflect: true },
    size:       { type: String,  default: 'medium',         reflect: true },
    disabled:   { type: Boolean, default: false,            reflect: true },
    pill:       { type: Boolean, default: false,            reflect: true },
    outline:    { type: Boolean, default: false,            reflect: true },
    flat:       { type: Boolean, default: false,            reflect: true },
    elevation:  { type: String,  default: '',               reflect: true },
    placement:  { type: String,  default: 'bottom-start',  reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: inline-block;
        position: relative;
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }

      /* ---- Trigger button ---- */
      .trigger {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
        cursor: pointer;
        font-family: inherit;
        font-weight: 500;
        border-radius: var(--ui-button-radius, 0.375em);
        transition: background-color 0.15s ease, box-shadow 0.15s ease,
                    transform 0.1s ease, filter 0.15s ease;
        box-sizing: border-box;
        white-space: nowrap;
        user-select: none;
        line-height: 1;
        padding: 0.5em 1em;
        background: var(--_bg);
        color: var(--_color, inherit);
      }

      .trigger:hover {
        background: var(--_bg-hover, var(--_bg));
        filter: var(--_hover-filter, none);
      }

      .trigger:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: 0.125em;
      }

      .trigger:active:not([disabled]) {
        transform: scale(0.97);
      }

      /* ---- Pill ---- */
      :host([pill]) .trigger { border-radius: 9999px; }

      /* ---- Outline ---- */
      :host([outline]) .trigger {
        background: transparent;
        border: 0.1em solid var(--_outline-color, var(--_bg));
        color: var(--_outline-color, var(--_bg));
      }
      :host([outline]) .trigger:hover {
        background: var(--_bg);
        color: var(--_color, inherit);
        filter: none;
      }

      /* ---- Flat (ghost) ---- */
      :host([flat]) .trigger {
        position: relative;
        background: transparent;
        color: var(--_text-btn-color, var(--_bg));
      }
      :host([flat]) .trigger::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: var(--_bg);
        opacity: 0;
        transition: opacity 0.15s ease;
        z-index: 0;
      }
      :host([flat]) .trigger:hover {
        background: transparent;
        filter: none;
      }
      :host([flat]) .trigger:hover::before { opacity: 0.1; }
      :host([flat]) .trigger > * {
        position: relative;
        z-index: 1;
      }

      /* ---- Caret ---- */
      .caret {
        display: inline-block;
        width: 0; height: 0;
        border-left: 0.3em solid transparent;
        border-right: 0.3em solid transparent;
        border-top: 0.35em solid currentColor;
        margin-left: 0.25em;
        transition: transform 0.2s ease;
      }
      :host([aria-expanded="true"]) .caret {
        transform: rotate(180deg);
      }

      /* ---- Menu panel ---- */
      .menu {
        display: none;
        position: absolute;
        z-index: 1000;
        min-width: 100%;
        background: var(--_menu-bg, var(--ui-bg, #fff));
        border: 1px solid var(--ui-border-color, rgba(0, 0, 0, 0.1));
        border-radius: var(--ui-radius, 0.375em);
        box-shadow: var(--_elevation, 0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06));
        padding: 0.25em 0;
        flex-direction: column;
        box-sizing: border-box;
      }
      .menu.open { display: flex; }

      /* Placement */
      .menu.bottom-start { top: calc(100% + 0.25em); left: 0; }
      .menu.bottom-end   { top: calc(100% + 0.25em); right: 0; }
      .menu.top-start    { bottom: calc(100% + 0.25em); left: 0; }
      .menu.top-end      { bottom: calc(100% + 0.25em); right: 0; }

      /* Slotted menu items */
      ::slotted(ui-dropdown-item) { display: block; }
    `;
  }

  /* ------------------------------------------------------------------ */
  /*  Lifecycle                                                          */
  /* ------------------------------------------------------------------ */

  constructor() {
    super();
    this._open             = false;
    this._onTriggerClick   = this._onTriggerClick.bind(this);
    this._onDocumentClick  = this._onDocumentClick.bind(this);
    this._onKeyDown        = this._onKeyDown.bind(this);
    this._onItemSelect     = this._onItemSelect.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute('role', 'button');
    this.setAttribute('aria-haspopup', 'true');
    this.setAttribute('aria-expanded', 'false');
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0');

    this.addEventListener('keydown',  this._onKeyDown);
    this.addEventListener('ui-click', this._onItemSelect);

    this._assignSlots();
    this._observeSlot();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown',  this._onKeyDown);
    this.removeEventListener('ui-click', this._onItemSelect);
    document.removeEventListener('click', this._onDocumentClick);
    if (this._slotObserver) {
      this._slotObserver.disconnect();
      this._slotObserver = null;
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */

  render() {
    const placement = this.placement || 'bottom-start';
    return `
      <button
        class="trigger"
        ${this.disabled ? 'disabled aria-disabled="true"' : ''}
        part="trigger"
      >
        <slot name="trigger"></slot>
        <span class="caret"></span>
      </button>
      <div class="menu ${placement}" part="menu" role="menu">
        <slot></slot>
      </div>
    `;
  }

  /* ------------------------------------------------------------------ */
  /*  Slot distribution                                                  */
  /*                                                                     */
  /*  Non-item children (text, icons) → slot="trigger"                   */
  /*  <ui-dropdown-item> children     → default slot (menu panel)        */
  /* ------------------------------------------------------------------ */

  _assignSlots() {
    for (const child of [...this.childNodes]) {
      if (child.nodeType === 1 /* ELEMENT */) {
        if (child.tagName !== 'UI-DROPDOWN-ITEM') {
          child.setAttribute('slot', 'trigger');
        }
        // Items: leave with no slot attr (or remove if wrongly set)
      } else if (child.nodeType === 3 /* TEXT */ && child.textContent.trim()) {
        const span = document.createElement('span');
        span.setAttribute('slot', 'trigger');
        span.textContent = child.textContent;
        this.replaceChild(span, child);
      }
    }
    this._styleMenuItems();
  }

  _observeSlot() {
    this._slotObserver = new MutationObserver(() => this._assignSlots());
    this._slotObserver.observe(this, { childList: true });
  }

  /** Ensure direct menu items have correct ARIA. */
  _styleMenuItems() {
    for (const item of this.querySelectorAll(':scope > ui-dropdown-item')) {
      if (!item.hasAttribute('role'))     item.setAttribute('role', 'menuitem');
      if (!item.hasAttribute('tabindex')) item.setAttribute('tabindex', '-1');
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Open / close                                                       */
  /* ------------------------------------------------------------------ */

  open() {
    if (this._open || this.disabled) return;
    this._open = true;
    this.setAttribute('aria-expanded', 'true');
    const menu = this.shadowRoot.querySelector('.menu');
    if (menu) menu.classList.add('open');
    requestAnimationFrame(() => {
      document.addEventListener('click', this._onDocumentClick);
    });
    this.emit('ui-open');
  }

  close() {
    if (!this._open) return;
    this._open = false;
    this.setAttribute('aria-expanded', 'false');
    const menu = this.shadowRoot.querySelector('.menu');
    if (menu) menu.classList.remove('open');
    // Close any open submenus
    for (const sub of this.querySelectorAll('ui-dropdown-item[data-submenu-open]')) {
      sub.closeSubmenu();
    }
    document.removeEventListener('click', this._onDocumentClick);
    this.emit('ui-close');
  }

  toggle() {
    this._open ? this.close() : this.open();
  }

  /* ------------------------------------------------------------------ */
  /*  Styling helpers                                                    */
  /* ------------------------------------------------------------------ */

  _applyStyles() {
    const vars = {
      '--_bg': '', '--_bg-hover': '', '--_hover-filter': '', '--_color': '',
      '--_outline-color': '', '--_text-btn-color': '',
      '--_menu-bg': '', '--_menu-color': '', '--_menu-hover': '',
    };

    const sizeVar = resolveSize(this.size) || '';
    if (sizeVar) vars['font-size'] = sizeVar;

    const bg = resolveColor(this.background);
    if (bg) {
      vars['--_bg'] = bg;
      const hoverBg = resolveColorHover(this.background);
      if (hoverBg) {
        vars['--_bg-hover'] = hoverBg;
      } else {
        vars['--_hover-filter'] = 'brightness(0.9)';
      }
    }

    const isAlt = this.outline || this.flat;
    if (isAlt) {
      const fgColor = resolveColor(this.color || this.background);
      vars['--_outline-color'] = fgColor;
      vars['--_text-btn-color'] = fgColor;
      if (this.color) {
        vars['--_color'] = resolveColor(this.color);
      } else if (this.background) {
        vars['--_color'] = contrastColorFor(this.background);
      }
      // Outline/flat: menu keeps default bg, items use accent color
      vars['--_menu-color'] = fgColor;
    } else {
      if (this.color) {
        vars['--_color'] = resolveColor(this.color);
      } else if (this.background) {
        vars['--_color'] = contrastColorFor(this.background);
      }
      // Solid: menu matches the button background
      if (bg) {
        vars['--_menu-bg'] = bg;
        vars['--_menu-color'] = contrastColorFor(this.background);
        vars['--_menu-hover'] = 'rgba(255, 255, 255, 0.15)';
      }
    }

    const shadow = resolveElevation(this.elevation);
    if (shadow) vars['--_elevation'] = shadow;

    this._setDynamicVars(vars);
  }

  _update() {
    this._applyStyles();
    super._update();
    this._attachTriggerListener();
    // Restore open state after re-render
    if (this._open) {
      const menu = this.shadowRoot.querySelector('.menu');
      if (menu) menu.classList.add('open');
    }
  }

  _attachTriggerListener() {
    const trigger = this.shadowRoot.querySelector('.trigger');
    if (trigger) {
      trigger.removeEventListener('click', this._onTriggerClick);
      trigger.addEventListener('click', this._onTriggerClick);
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Event handlers                                                     */
  /* ------------------------------------------------------------------ */

  _onTriggerClick(e) {
    if (this.disabled) { e.preventDefault(); return; }
    this.toggle();
  }

  /**
   * Catch the `ui-click` custom event that bubbles up from any leaf
   * `<ui-dropdown-item>` — at any nesting depth.
   */
  _onItemSelect(e) {
    const item = e.target;
    if (!(item instanceof HTMLElement) || item.tagName !== 'UI-DROPDOWN-ITEM') return;
    e.stopPropagation();
    this.emit('ui-select', { item, value: item.value || '' });
    this.close();
  }

  _onDocumentClick(e) {
    if (!this.contains(e.target)) this.close();
  }

  _onKeyDown(e) {
    const items = [...this.querySelectorAll(':scope > ui-dropdown-item:not([disabled])')];
    if (!items.length) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        if (e.target === this) { e.preventDefault(); this.toggle(); }
        break;

      case 'Escape':
        if (this._open) { e.preventDefault(); this.close(); this.focus(); }
        break;

      case 'ArrowDown': {
        e.preventDefault();
        if (!this._open) this.open();
        const idx  = items.indexOf(e.target);
        const next = items[(idx + 1) % items.length];
        next.focus();
        break;
      }

      case 'ArrowUp': {
        e.preventDefault();
        if (!this._open) this.open();
        const idx  = items.indexOf(e.target);
        const prev = items[(idx - 1 + items.length) % items.length];
        prev.focus();
        break;
      }

      case 'Home':
        if (this._open) { e.preventDefault(); items[0].focus(); }
        break;

      case 'End':
        if (this._open) { e.preventDefault(); items[items.length - 1].focus(); }
        break;
    }
  }
}

customElements.define('ui-dropdown', UIDropdown);
