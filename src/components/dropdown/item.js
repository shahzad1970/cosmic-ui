import { UIComponent } from '../../core/ui-component.js';

/**
 * `<ui-dropdown-item>` — A menu item inside `<ui-dropdown>`.
 *
 * Supports **rich content** — put icons, badges, descriptions, or any HTML
 * you like inside the default slot.
 *
 * Supports **multi-level submenus** — nest `<ui-dropdown-item>` children
 * directly inside another item.  The children auto-move to a submenu
 * flyout panel; a caret indicator appears automatically.
 *
 * @element ui-dropdown-item
 *
 * @attr {String}  value    - Machine-readable value emitted with `ui-select`
 * @attr {Boolean} disabled - Dims the item and blocks interaction
 * @attr {String}  href     - Renders the item as a link (`<a>`)
 * @attr {String}  target   - Link target (used with `href`)
 *
 * @slot (default) - Visible label content (text, icons, HTML — anything).
 *                   Nested `<ui-dropdown-item>` children are automatically
 *                   redirected to the submenu panel.
 *
 * @fires ui-click - Emitted when a **leaf** item (no submenu) is clicked
 *
 * @example
 *   <!-- Simple item -->
 *   <ui-dropdown-item value="edit">Edit</ui-dropdown-item>
 *
 *   <!-- Rich item -->
 *   <ui-dropdown-item>
 *     <ui-icon name="settings"></ui-icon> Settings
 *   </ui-dropdown-item>
 *
 *   <!-- Item with submenu -->
 *   <ui-dropdown-item>
 *     Share
 *     <ui-dropdown-item value="email">Email</ui-dropdown-item>
 *     <ui-dropdown-item value="link">Copy link</ui-dropdown-item>
 *   </ui-dropdown-item>
 */
export class UIDropdownItem extends UIComponent {

  static properties = {
    value:    { type: String,  default: '',    reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    href:     { type: String,  default: '',    reflect: true },
    target:   { type: String,  default: '',    reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        position: relative;
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.45;
      }

      /* ---- Clickable row ---- */
      .item {
        all: unset;
        display: flex;
        align-items: center;
        gap: 0.5em;
        width: 100%;
        box-sizing: border-box;
        padding: 0.45em 0.75em;
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
        line-height: 1.4;
        color: var(--_menu-color, var(--ui-text-color, inherit));
        text-decoration: none;
        transition: background-color 0.12s ease;
      }

      .item:hover,
      :host([data-submenu-open]) .item {
        background: var(--_menu-hover, var(--ui-bg-subtle, rgba(0, 0, 0, 0.06)));
      }

      .item:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: -0.125em;
      }

      /* ---- Submenu caret (hidden unless host has sub-items) ---- */
      .caret {
        margin-left: auto;
        font-size: 0.7em;
        opacity: 0.5;
        display: none;
        flex-shrink: 0;
      }

      :host([data-has-submenu]) .caret {
        display: inline;
      }

      /* ---- Submenu flyout panel ---- */
      .submenu {
        display: none;
        position: absolute;
        left: 100%;
        top: 0;
        z-index: 1000;
        min-width: 10em;
        background: var(--_menu-bg, var(--ui-bg, #fff));
        border: 1px solid var(--ui-border-color, rgba(0, 0, 0, 0.1));
        border-radius: var(--ui-radius, 0.375em);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        padding: 0.25em 0;
        flex-direction: column;
        box-sizing: border-box;
      }

      :host([data-submenu-open]) .submenu {
        display: flex;
      }
    `;
  }

  /* ------------------------------------------------------------------ */
  /*  Lifecycle                                                          */
  /* ------------------------------------------------------------------ */

  constructor() {
    super();
    this._onClick       = this._onClick.bind(this);
    this._onMouseEnter  = this._onMouseEnter.bind(this);
    this._onMouseLeave  = this._onMouseLeave.bind(this);
    this._onKeyDown     = this._onKeyDown.bind(this);
    this._closeTimer    = null;
    this._childObserver = null;
  }

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute('role', 'menuitem');
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '-1');

    this.addEventListener('click',      this._onClick);
    this.addEventListener('mouseenter', this._onMouseEnter);
    this.addEventListener('mouseleave', this._onMouseLeave);
    this.addEventListener('keydown',    this._onKeyDown);

    // Distribute children into the correct slots and start watching.
    this._assignSlots();
    this._observeChildren();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click',      this._onClick);
    this.removeEventListener('mouseenter', this._onMouseEnter);
    this.removeEventListener('mouseleave', this._onMouseLeave);
    this.removeEventListener('keydown',    this._onKeyDown);
    clearTimeout(this._closeTimer);
    if (this._childObserver) {
      this._childObserver.disconnect();
      this._childObserver = null;
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Render — completely static, no dependency on child state           */
  /* ------------------------------------------------------------------ */

  render() {
    const isLink = this.href;
    const tag    = isLink ? 'a' : 'div';
    const esc    = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    const linkAttrs = isLink
      ? ` href="${esc(this.href)}"${this.target ? ` target="${esc(this.target)}"` : ''}`
      : '';

    return `
      <${tag} class="item"${linkAttrs}${this.disabled ? ' aria-disabled="true"' : ''} part="item">
        <slot></slot>
        <span class="caret" aria-hidden="true">▸</span>
      </${tag}>
      <div class="submenu" role="menu" part="submenu">
        <slot name="submenu"></slot>
      </div>
    `;
  }

  /* ------------------------------------------------------------------ */
  /*  Slot distribution                                                  */
  /*                                                                     */
  /*  Child <ui-dropdown-item> elements  →  slot="submenu"               */
  /*  Everything else (text, icons, …)   →  default slot (label)         */
  /*                                                                     */
  /*  This mirrors how <ui-dropdown> separates trigger content from       */
  /*  menu items.  Neither _assignSlots nor the MutationObserver ever     */
  /*  calls _update(), so there are no render loops.                      */
  /* ------------------------------------------------------------------ */

  _assignSlots() {
    let hasSub = false;
    for (const child of this.children) {
      if (child.tagName === 'UI-DROPDOWN-ITEM') {
        if (child.getAttribute('slot') !== 'submenu') {
          child.setAttribute('slot', 'submenu');
        }
        if (!child.hasAttribute('role'))     child.setAttribute('role', 'menuitem');
        if (!child.hasAttribute('tabindex')) child.setAttribute('tabindex', '-1');
        hasSub = true;
      }
    }
    // Toggle data attribute — CSS controls caret & submenu visibility.
    // data-has-submenu is NOT in static properties, so this will NOT
    // trigger _update() — no render loop.
    if (hasSub) {
      if (!this.hasAttribute('data-has-submenu')) {
        this.setAttribute('data-has-submenu', '');
        this.setAttribute('aria-haspopup', 'true');
      }
    } else {
      this.removeAttribute('data-has-submenu');
      this.removeAttribute('aria-haspopup');
    }
  }

  /** React to children being added/removed (handles parser timing). */
  _observeChildren() {
    this._childObserver = new MutationObserver(() => this._assignSlots());
    this._childObserver.observe(this, { childList: true });
  }

  /* ------------------------------------------------------------------ */
  /*  Submenu open / close                                               */
  /* ------------------------------------------------------------------ */

  get _hasSubmenu() {
    return this.hasAttribute('data-has-submenu');
  }

  openSubmenu() {
    clearTimeout(this._closeTimer);
    this.setAttribute('data-submenu-open', '');
    this.setAttribute('aria-expanded', 'true');
  }

  closeSubmenu() {
    clearTimeout(this._closeTimer);
    this.removeAttribute('data-submenu-open');
    this.removeAttribute('aria-expanded');
    // Recursively close nested submenus
    for (const sub of this.querySelectorAll('ui-dropdown-item[data-submenu-open]')) {
      sub.closeSubmenu();
    }
  }

  toggleSubmenu() {
    this.hasAttribute('data-submenu-open') ? this.closeSubmenu() : this.openSubmenu();
  }

  /* ------------------------------------------------------------------ */
  /*  Event handlers                                                     */
  /* ------------------------------------------------------------------ */

  _onClick(e) {
    if (this.disabled) { e.preventDefault(); return; }

    // Ignore clicks that bubbled up from a nested item
    const origin = e.target.closest('ui-dropdown-item');
    if (origin && origin !== this) return;

    if (this._hasSubmenu) {
      this.toggleSubmenu();
    } else {
      this.emit('ui-click');
    }
  }

  _onMouseEnter() {
    if (!this._hasSubmenu || this.disabled) return;
    clearTimeout(this._closeTimer);
    this.openSubmenu();
  }

  _onMouseLeave() {
    if (!this._hasSubmenu) return;
    this._closeTimer = setTimeout(() => this.closeSubmenu(), 150);
  }

  _onKeyDown(e) {
    if (!this._hasSubmenu) return;

    const subs = [...this.querySelectorAll(':scope > ui-dropdown-item:not([disabled])')];
    if (!subs.length) return;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        e.stopPropagation();
        this.openSubmenu();
        subs[0]?.focus();
        break;

      case 'ArrowLeft':
        if (subs.includes(e.target)) {
          e.preventDefault();
          e.stopPropagation();
          this.closeSubmenu();
          this.focus();
        }
        break;

      case 'ArrowDown':
        if (subs.includes(e.target)) {
          e.preventDefault();
          e.stopPropagation();
          const idx  = subs.indexOf(e.target);
          const next = subs[(idx + 1) % subs.length];
          next.focus();
        }
        break;

      case 'ArrowUp':
        if (subs.includes(e.target)) {
          e.preventDefault();
          e.stopPropagation();
          const idx  = subs.indexOf(e.target);
          const prev = subs[(idx - 1 + subs.length) % subs.length];
          prev.focus();
        }
        break;

      case 'Escape':
        if (this.hasAttribute('data-submenu-open')) {
          e.preventDefault();
          e.stopPropagation();
          this.closeSubmenu();
          this.focus();
        }
        break;
    }
  }
}

customElements.define('ui-dropdown-item', UIDropdownItem);
