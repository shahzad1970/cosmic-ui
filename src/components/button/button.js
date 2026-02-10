import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, resolveColorHover, contrastColorFor } from '../../core/ui-utils.js';

/**
 * `<ui-button>` — A customisable button component.
 *
 * @element ui-button
 *
 * @attr {String}  background - Background colour: a palette token (e.g. "red-600", "indigo-500") or any CSS colour
 * @attr {String}  color      - Text colour: a palette token or any CSS colour (auto-detected if omitted)
 * @attr {String}  size       - Button size: xx-small … xxx-large, or any CSS length (e.g. 10px, 2rem)
 * @attr {Boolean} disabled   - Disables the button
 * @attr {Boolean} pill       - Fully rounded ends (capsule shape)
 * @attr {Boolean} circle     - Square aspect with 50% radius (for icon-only buttons)
 * @attr {Boolean} outline    - Transparent background with a coloured border; text matches border colour
 * @attr {Boolean} flat       - No background or border; just coloured text with a subtle hover tint
 * @attr {Boolean} link       - Styled as a hyperlink (underline on hover, no background)
 * @attr {Boolean} plain      - No background, border, or hover/active effects — bare clickable element
 * @attr {String}  href       - When set, navigates to this URL on click
 * @attr {String}  target     - Link target (_blank, _self, etc.) — only used with href
 * @attr {String}  channel    - Event channel name; dispatches a document-level event with this name on click
 * @attr {String}  type       - HTML button type: button | submit | reset
 *
 * @slot (default) - Button content (text, icons, or any inline markup).
 *
 * @fires ui-click  - Emitted when the button is clicked (not when disabled)
 *
 * @example
 *   <ui-button background="indigo-500">Save</ui-button>
 *   <ui-button background="red-600" pill>Delete</ui-button>
 *   <ui-button background="indigo-500" circle>✕</ui-button>
 *   <ui-button background="indigo-500" outline>Outline</ui-button>
 *   <ui-button background="indigo-500" flat>Flat</ui-button>
 *   <ui-button background="indigo-500" link href="/about">About</ui-button>
 */
export class UIButton extends UIComponent {
  static properties = {
    background: { type: String,  default: '',    reflect: true },
    color:      { type: String,  default: '',    reflect: true },
    size:       { type: String,  default: '',    reflect: true },
    disabled:   { type: Boolean, default: false,        reflect: true },
    pill:       { type: Boolean, default: false,        reflect: true },
    circle:     { type: Boolean, default: false,        reflect: true },
    outline:    { type: Boolean, default: false,        reflect: true },
    flat:       { type: Boolean, default: false,        reflect: true },
    link:       { type: Boolean, default: false,        reflect: true },
    plain:      { type: Boolean, default: false,        reflect: true },
    href:       { type: String,  default: '',           reflect: true },
    target:     { type: String,  default: '',           reflect: true },
    channel:    { type: String,  default: '',           reflect: true },
    type:       { type: String,  default: 'button',    reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
        cursor: pointer;
        font-family: inherit;
        font-weight: 500;
        border-radius: var(--ui-button-radius, 0.375em);
        transition: background-color 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease, filter 0.15s ease;
        box-sizing: border-box;
        white-space: nowrap;
        user-select: none;
        line-height: 1;
        padding: 0.5em 1em;
        text-decoration: none;
        background: var(--_bg, transparent);
        color: var(--_color, inherit);
        -webkit-tap-highlight-color: transparent;
      }

      :host(:hover) {
        background: var(--_bg-hover, var(--_bg, transparent));
        filter: var(--_hover-filter, brightness(0.9));
      }

      :host(:focus-visible) {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: 0.125em;
      }

      :host(:active:not([disabled])) {
        transform: scale(0.97);
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }

      /* ---- Size ---- */
      /* font-size is set dynamically on :host via resolveSize(). */

      /* ---- Pill ---- */
      :host([pill]) {
        border-radius: 9999px;
      }

      /* ---- Circle ---- */
      :host([circle]) {
        padding: 0.5em;
        border-radius: 50%;
        aspect-ratio: 1;
        justify-content: center;
      }

      /* ---- Outline ---- */
      :host([outline]) {
        background: transparent;
        border: 0.1em solid var(--_outline-color, currentColor);
        color: var(--_outline-color, currentColor);
      }
      :host([outline]:hover) {
        background: var(--_bg, transparent);
        color: var(--_color, inherit);
        filter: none;
      }

      /* ---- Flat (ghost) ---- */
      :host([flat]) {
        position: relative;
        background: transparent;
        color: var(--_text-btn-color, inherit);
      }
      :host([flat])::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: var(--_bg, currentColor);
        opacity: 0;
        transition: opacity 0.15s ease;
        z-index: 0;
      }
      :host([flat]:hover) {
        background: transparent;
        filter: none;
      }
      :host([flat]:hover)::before {
        opacity: 0.1;
      }
      ::slotted(*) {
        position: relative;
        z-index: 1;
      }

      /* ---- Link ---- */
      :host([link]) {
        background: transparent;
        color: var(--_link-color, inherit);
        padding: 0;
        text-decoration: none;
        border-radius: 0;
      }
      :host([link]:hover) {
        background: transparent;
        text-decoration: underline;
        filter: none;
      }

      /* ---- Plain (no effects) ---- */
      :host([plain]) {
        background: transparent;
        color: inherit;
        padding: 0;
        border: none;
        border-radius: 0;
        filter: none;
        transform: none;
        transition: none;
      }
      :host([plain]:hover),
      :host([plain]:active) {
        background: transparent;
        filter: none;
        transform: none;
      }
    `;
  }

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._onClick);
    this.addEventListener('keydown', this._onKeyDown);

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
    this._updateDisabledState();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._onClick);
    this.removeEventListener('keydown', this._onKeyDown);
  }

  /** Resolve size, background, and color props → single `_setDynamicVars()` call. */
  _applyStyles() {
    const vars = {
      '--_bg': '', '--_bg-hover': '', '--_hover-filter': '', '--_color': '',
      '--_outline-color': '', '--_text-btn-color': '', '--_link-color': '',
    };

    // Font-size
    const fontSize = resolveSize(this.size);
    if (fontSize) vars['font-size'] = fontSize;

    const bg = resolveColor(this.background);
    if (bg) {
      vars['--_bg'] = bg;
      const hoverBg = resolveColorHover(this.background);
      if (hoverBg) {
        vars['--_bg-hover'] = hoverBg;
      } else {
        vars['--_hover-filter'] = 'brightness(0.9)';
      }
    } else {
      // No explicit background — pick up inherited --ui-background from parent.
      // Read the inherited custom property from computed style.
      const inherited = getComputedStyle(this).getPropertyValue('--ui-background').trim();
      if (inherited) {
        vars['--_bg'] = 'var(--ui-background)';
        vars['--_bg-hover'] = 'var(--ui-background-hover, var(--ui-background))';
        vars['--_hover-filter'] = 'none';
      }
    }

    // For outline/flat/link the foreground derives from background, not contrast.
    const isAlt = this.outline || this.flat || this.link;

    if (isAlt) {
      // Outline/flat/link: foreground derives from background token.
      // If no background is explicitly set (still using default), inherit text color.
      const hasExplicitBg = this.hasAttribute('background');
      if (hasExplicitBg) {
        const fgColor = resolveColor(this.color || this.background);
        vars['--_outline-color'] = fgColor;
        vars['--_text-btn-color'] = fgColor;
        vars['--_link-color'] = fgColor;
      } else if (this.color) {
        const fgColor = resolveColor(this.color);
        vars['--_outline-color'] = fgColor;
        vars['--_text-btn-color'] = fgColor;
        vars['--_link-color'] = fgColor;
      } else {
        // No explicit background or color — inherit from parent
        vars['--_text-btn-color'] = 'inherit';
        vars['--_link-color'] = 'inherit';
        vars['--_outline-color'] = 'currentColor';
      }
      // For outline hover (filled state), we still need a contrast text colour.
      if (this.color) {
        vars['--_color'] = resolveColor(this.color);
      } else if (hasExplicitBg && this.background) {
        vars['--_color'] = contrastColorFor(this.background);
      }
    } else {
      // Standard filled button.
      if (this.color) {
        vars['--_color'] = resolveColor(this.color);
      } else if (this.background) {
        vars['--_color'] = contrastColorFor(this.background);
      }
    }

    this._setDynamicVars(vars);
  }

  /** Sync host tabindex with disabled state. */
  _updateDisabledState() {
    if (this.disabled) {
      this.removeAttribute('tabindex');
      this.setAttribute('aria-disabled', 'true');
    } else {
      if (!this.hasAttribute('tabindex')) {
        this.setAttribute('tabindex', '0');
      }
      this.removeAttribute('aria-disabled');
    }
  }

  _update() {
    this._applyStyles();
    this._updateDisabledState();
    super._update();
  }

  render() {
    return '<slot></slot>';
  }

  _onClick(e) {
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }

    // Navigate if href is set
    if (this.href) {
      if (this.channel) {
        // Dispatch named channel event on document (e.g. for <ui-include>)
        document.dispatchEvent(new CustomEvent(this.channel, {
          bubbles: false,
          detail: { src: this.href, button: this },
        }));
      } else {
        const target = this.target || '_self';
        if (target === '_blank') {
          window.open(this.href, '_blank', 'noopener');
        } else {
          window.location.href = this.href;
        }
      }
    } else if (this.channel) {
      // Channel without href — dispatch the channel event with the button as context
      document.dispatchEvent(new CustomEvent(this.channel, {
        bubbles: false,
        detail: { button: this },
      }));
    }

    this.emit('ui-click');
  }

  /** Activate on Enter or Space like a native button. */
  _onKeyDown(e) {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  }
}

customElements.define('ui-button', UIButton);
