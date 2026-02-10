import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, resolveElevation } from '../../core/ui-utils.js';

/**
 * `<ui-menu>` — Context menu / right-click menu.
 *
 * Renders a floating menu panel that can be triggered programmatically
 * or attached as a context menu to a target element via `target`.
 *
 * @element ui-menu
 *
 * @attr {String}  target    - CSS selector for the element to attach right-click to
 * @attr {String}  elevation - Shadow depth: 1–5 (default 3)
 * @attr {String}  size      - Menu size: keyword or CSS length
 * @attr {String}  background - Menu background colour
 * @attr {String}  color     - Menu text colour
 * @attr {Boolean} open      - Whether the menu is currently visible
 *
 * @slot (default) - Menu content (`<ui-menu-item>` elements)
 *
 * @fires ui-select - Emitted when a menu item is clicked; detail: { value, item }
 * @fires ui-open   - Emitted when the menu opens
 * @fires ui-close  - Emitted when the menu closes
 *
 * @example
 *   <ui-menu target="#my-element">
 *     <ui-menu-item value="cut">Cut</ui-menu-item>
 *     <ui-menu-item value="copy">Copy</ui-menu-item>
 *     <ui-menu-item value="paste">Paste</ui-menu-item>
 *   </ui-menu>
 */
export class UIMenu extends UIComponent {
  static properties = {
    target:     { type: String,  default: '',    reflect: true },
    elevation:  { type: String,  default: '3',   reflect: true },
    size:       { type: String,  default: '',    reflect: true },
    background: { type: String,  default: '',    reflect: true },
    color:      { type: String,  default: '',    reflect: true },
    open:       { type: Boolean, default: false, reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: contents;
      }

      .menu {
        position: fixed;
        z-index: 10000;
        min-width: 10em;
        padding: 0.35em 0;
        border-radius: var(--ui-radius, 0.5em);
        border: 1px solid var(--ui-border-color, #e5e7eb);
        background: var(--_bg, var(--ui-bg, #fff));
        color: var(--_color, var(--ui-text-color, #1f2937));
        box-shadow: var(--_elevation, 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05));
        opacity: 0;
        transform: scale(0.95);
        transition: opacity 0.12s ease, transform 0.12s ease;
        pointer-events: none;
        font-family: inherit;
      }

      .menu.visible {
        opacity: 1;
        transform: scale(1);
        pointer-events: auto;
      }
    `;
  }

  constructor() {
    super();
    this._x = 0;
    this._y = 0;
    this._onContextMenu = this._onContextMenu.bind(this);
    this._onDocClick = this._onDocClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onItemClick = this._onItemClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._attachTarget();
    this.addEventListener('click', this._onItemClick);
  }

  disconnectedCallback() {
    this._detachTarget();
    this.removeEventListener('click', this._onItemClick);
    document.removeEventListener('click', this._onDocClick, true);
    document.removeEventListener('keydown', this._onKeyDown);
    super.disconnectedCallback();
  }

  _applyStyles() {
    const vars = {};
    if (this.background) vars['--_bg'] = resolveColor(this.background);
    if (this.color) vars['--_color'] = resolveColor(this.color);
    const elev = resolveElevation(this.elevation);
    if (elev) vars['--_elevation'] = elev;
    const fontSize = resolveSize(this.size);
    if (fontSize) vars['font-size'] = fontSize;
    this._setDynamicVars(vars);
  }

  _update() {
    this._applyStyles();
    this._detachTarget();
    this._attachTarget();
    super._update();
  }

  _attachTarget() {
    if (!this.target) return;
    const el = document.querySelector(this.target);
    if (el) {
      this._targetEl = el;
      el.addEventListener('contextmenu', this._onContextMenu);
    }
  }

  _detachTarget() {
    if (this._targetEl) {
      this._targetEl.removeEventListener('contextmenu', this._onContextMenu);
      this._targetEl = null;
    }
  }

  _onContextMenu(e) {
    e.preventDefault();
    this.show(e.clientX, e.clientY);
  }

  _onDocClick(e) {
    const menu = this.shadowRoot?.querySelector('.menu');
    if (menu && !menu.contains(e.target) && !this.contains(e.target)) {
      this.hide();
    }
  }

  _onKeyDown(e) {
    if (e.key === 'Escape') this.hide();
  }

  _onItemClick(e) {
    const item = e.target.closest('ui-menu-item');
    if (item && !item.hasAttribute('disabled')) {
      this.emit('ui-select', { value: item.getAttribute('value') || '', item });
      this.hide();
    }
  }

  /** Open the menu at the given viewport coordinates. */
  show(x = 0, y = 0) {
    this._x = x;
    this._y = y;
    const menu = this.shadowRoot?.querySelector('.menu');
    if (!menu) return;

    // Position and clamp to viewport
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
    menu.classList.add('visible');

    // Clamp if overflowing
    requestAnimationFrame(() => {
      const rect = menu.getBoundingClientRect();
      if (rect.right > window.innerWidth) menu.style.left = `${window.innerWidth - rect.width - 4}px`;
      if (rect.bottom > window.innerHeight) menu.style.top = `${window.innerHeight - rect.height - 4}px`;
    });

    if (!this.open) this.open = true;
    document.addEventListener('click', this._onDocClick, true);
    document.addEventListener('keydown', this._onKeyDown);
    this.emit('ui-open');
  }

  /** Close the menu. */
  hide() {
    const menu = this.shadowRoot?.querySelector('.menu');
    if (menu) menu.classList.remove('visible');
    if (this.hasAttribute('open')) this.removeAttribute('open');
    document.removeEventListener('click', this._onDocClick, true);
    document.removeEventListener('keydown', this._onKeyDown);
    this.emit('ui-close');
  }

  render() {
    return `
      <div class="menu" role="menu">
        <slot></slot>
      </div>
    `;
  }
}

/**
 * `<ui-menu-item>` — Individual menu item.
 *
 * @element ui-menu-item
 *
 * @attr {String}  value    - Item value emitted in ui-select
 * @attr {Boolean} disabled - Disable this item
 * @attr {Boolean} divider  - Render as a horizontal divider instead of an item
 *
 * @slot (default) - Item label (text, icons, etc.)
 */
export class UIMenuItem extends UIComponent {
  static properties = {
    value:    { type: String,  default: '', reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    divider:  { type: Boolean, default: false, reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.45;
      }

      .item {
        display: flex;
        align-items: center;
        gap: 0.6em;
        padding: 0.45em 1em;
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
        line-height: 1.4;
        white-space: nowrap;
        transition: background 0.1s ease;
        user-select: none;
      }

      .item:hover {
        background: var(--ui-bg-subtle, rgba(0,0,0,0.06));
      }

      :host([divider]) .item {
        padding: 0;
        margin: 0.25em 0;
        height: 1px;
        background: var(--ui-border-color, #e5e7eb);
        cursor: default;
      }

      :host([divider]) .item:hover {
        background: var(--ui-border-color, #e5e7eb);
      }
    `;
  }

  render() {
    return `<div class="item" role="menuitem"><slot></slot></div>`;
  }
}

customElements.define('ui-menu', UIMenu);
customElements.define('ui-menu-item', UIMenuItem);
