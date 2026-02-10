import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-list>` — Styled list with optional icons, actions, and avatars.
 *
 * Renders a clean vertical list of items with consistent spacing and
 * optional dividers. Place `<ui-list-item>` children inside.
 *
 * @element ui-list
 *
 * @attr {String}  size       - Component size
 * @attr {Boolean} dividers   - Show dividers between items
 * @attr {Boolean} hoverable  - Highlight items on hover
 * @attr {Boolean} striped    - Alternate row backgrounds
 * @attr {String}  background - List background colour
 * @attr {String}  color      - List text colour
 * @attr {Boolean} bordered   - Show outer border
 *
 * @slot (default) - `<ui-list-item>` elements
 *
 * @example
 *   <ui-list dividers hoverable>
 *     <ui-list-item>Item one</ui-list-item>
 *     <ui-list-item>Item two</ui-list-item>
 *     <ui-list-item>Item three</ui-list-item>
 *   </ui-list>
 */
export class UIList extends UIComponent {
  static properties = {
    size:       { type: String,  default: '',    reflect: true },
    dividers:   { type: Boolean, default: false, reflect: true },
    hoverable:  { type: Boolean, default: false, reflect: true },
    striped:    { type: Boolean, default: false, reflect: true },
    background: { type: String,  default: '',    reflect: true },
    color:      { type: String,  default: '',    reflect: true },
    bordered:   { type: Boolean, default: false, reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        font-family: inherit;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
      }

      :host([bordered]) {
        border: 1px solid var(--ui-border-color, #e5e7eb);
        border-radius: var(--ui-radius, 0.5em);
        overflow: hidden;
      }

      :host([dividers]) ::slotted(ui-list-item:not(:last-child)) {
        border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
      }

      /* hoverable — set an inherited CSS var that ui-list-item reads */
      :host([hoverable]) {
        --_list-hover-bg: var(--ui-gray-100, rgba(0,0,0,0.04));
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
    // Defer striped — children may not be parsed yet during connectedCallback
    requestAnimationFrame(() => this._applyStriped());
    this._childObserver = new MutationObserver(() => this._applyStriped());
    this._childObserver.observe(this, { childList: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    this._childObserver?.disconnect();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) {
      this._applyStyles();
      if (name === 'striped') this._applyStriped();
    }
  }

  _applyStyles() {
    const vars = {};
    if (this._background) vars['--_bg'] = resolveColor(this._background);
    if (this._color) vars['--_color'] = resolveColor(this._color);
    const fontSize = resolveSize(this._size);
    if (fontSize) vars['font-size'] = fontSize;
    this._setDynamicVars(vars);
  }

  /** Mark even children so ui-list-item can style striped rows */
  _applyStriped() {
    const items = [...this.querySelectorAll(':scope > ui-list-item')];
    items.forEach((item, i) => {
      if (this._striped && i % 2 === 1) item.setAttribute('_striped', '');
      else item.removeAttribute('_striped');
    });
  }

  render() {
    return `<div role="list"><slot></slot></div>`;
  }
}

/**
 * `<ui-list-item>` — Individual list item.
 *
 * Supports leading/trailing slots for icons, avatars, badges, or action
 * buttons. Use slotted content for the main label.
 *
 * @element ui-list-item
 *
 * @attr {String}  value       - Item value (optional, for selections)
 * @attr {String}  description - Secondary text below the label
 * @attr {Boolean} disabled    - Disable this item
 * @attr {String}  href        - Navigate on click
 * @attr {String}  target      - Link target
 *
 * @slot (default)  - Main label content
 * @slot leading    - Content before the label (icon, avatar)
 * @slot trailing   - Content after the label (badge, button, icon)
 *
 * @fires ui-click - Emitted when the item is clicked
 */
export class UIListItem extends UIComponent {
  static properties = {
    value:       { type: String,  default: '',    reflect: true },
    description: { type: String,  default: '',    reflect: true },
    disabled:    { type: Boolean, default: false, reflect: true },
    href:        { type: String,  default: '',    reflect: true },
    target:      { type: String,  default: '',    reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        font-family: inherit;
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }

      /* hoverable — read inherited var from ui-list */
      :host(:hover) .item {
        background: var(--_list-hover-bg);
      }

      /* striped — attribute set by parent ui-list */
      :host([_striped]) .item {
        background: var(--ui-gray-100, rgba(0,0,0,0.04));
      }

      .item {
        display: flex;
        align-items: center;
        gap: 0.75em;
        padding: 0.65em 0.85em;
        cursor: default;
        transition: background 0.1s ease;
        text-decoration: none;
        color: inherit;
      }

      a.item {
        cursor: pointer;
      }

      a.item:hover {
        text-decoration: none;
      }

      .leading {
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }

      .content {
        flex: 1;
        min-width: 0;
      }

      .label {
        font-weight: 500;
        line-height: 1.4;
      }

      .desc {
        font-size: 0.8em;
        color: var(--ui-text-muted, #6b7280);
        line-height: 1.3;
        margin-top: 0.1em;
      }

      .trailing {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        margin-left: auto;
      }

      /* Hide empty slots */
      .leading:empty, .trailing:empty { display: none; }
    `;
  }

  _update() {
    super._update();
    const el = this.shadowRoot?.querySelector('.item');
    if (el && !this._href) {
      el.addEventListener('click', () => {
        if (!this._disabled) this.emit('ui-click', { value: this._value });
      });
    }
  }

  render() {
    const esc = (s) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const desc = this._description ? `<div class="desc">${esc(this._description)}</div>` : '';
    const tag = this._href ? 'a' : 'div';
    const hrefAttr = this._href ? ` href="${esc(this._href)}"` : '';
    const targetAttr = this._target ? ` target="${esc(this._target)}"` : '';

    return `
      <${tag} class="item" role="listitem"${hrefAttr}${targetAttr}>
        <span class="leading"><slot name="leading"></slot></span>
        <span class="content">
          <span class="label"><slot></slot></span>
          ${desc}
        </span>
        <span class="trailing"><slot name="trailing"></slot></span>
      </${tag}>
    `;
  }
}

customElements.define('ui-list', UIList);
customElements.define('ui-list-item', UIListItem);
