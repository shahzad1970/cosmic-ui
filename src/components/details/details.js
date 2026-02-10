import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, contrastColorFor, resolveElevation } from '../../core/ui-utils.js';

/**
 * `<ui-details>` — Expandable disclosure widget.
 *
 * Shows a brief summary that the user can click to reveal or hide
 * additional content. Built on the native `<details>` / `<summary>`
 * elements for accessibility and keyboard support, with a smooth
 * animated open/close transition.
 *
 * @element ui-details
 *
 * @attr {String}  summary    - Summary text shown in the clickable header
 * @attr {Boolean} open       - Whether the details are expanded
 * @attr {String}  background - Background colour: palette token or CSS colour
 * @attr {String}  color      - Text colour: palette token or CSS colour
 * @attr {String}  size       - Component size: keyword or CSS length
 * @attr {String}  elevation  - Shadow depth: 1–5 (adds border + shadow), or raw CSS box-shadow
 * @attr {Boolean} outline    - Border style (no shadow)
 * @attr {Boolean} flat       - No border, no shadow
 *
 * @slot (default) - The expandable content
 *
 * @fires ui-toggle - Emitted when open state changes (detail: { open })
 *
 * @example
 *   <ui-details summary="Click to expand">
 *     Hidden content revealed on click.
 *   </ui-details>
 */
export class UIDetails extends UIComponent {
  static properties = {
    summary:    { type: String,  default: 'Details', reflect: true },
    open:       { type: Boolean, default: false,     reflect: true },
    background: { type: String,  default: '',        reflect: true },
    color:      { type: String,  default: '',        reflect: true },
    size:       { type: String,  default: '',        reflect: true },
    elevation:  { type: String,  default: '',        reflect: true },
    outline:    { type: Boolean, default: false,      reflect: true },
    flat:       { type: Boolean, default: false,      reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        border-radius: var(--ui-radius, 0.5em);
        border: 1px solid var(--ui-border-color, #e5e7eb);
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        box-shadow: var(--_elevation, none);
        overflow: hidden;
        box-sizing: border-box;
        line-height: 1.5;
      }

      :host([flat]) {
        border: none;
        box-shadow: none;
      }

      /* ── Native details reset ───────────────────────────── */
      details {
        margin: 0;
      }

      /* ── Summary (clickable header) ─────────────────────── */
      summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5em;
        padding: 0.75em 1em;
        cursor: pointer;
        font-weight: 600;
        user-select: none;
        list-style: none;             /* remove default marker */
        transition: background 0.15s ease;
      }

      /* Remove default marker across browsers */
      summary::-webkit-details-marker { display: none; }
      summary::marker { display: none; content: ''; }

      summary:hover {
        background: rgba(0, 0, 0, 0.04);
      }

      summary:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: -0.125em;
      }

      /* ── Chevron icon ───────────────────────────────────── */
      .chevron {
        flex-shrink: 0;
        width: 1em;
        height: 1em;
        transition: transform 0.25s ease;
      }

      .chevron svg {
        display: block;
        width: 100%;
        height: 100%;
        fill: none;
        stroke: currentColor;
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-linejoin: round;
        opacity: 0.55;
      }

      details[open] .chevron {
        transform: rotate(180deg);
      }

      /* ── Content area ───────────────────────────────────── */
      .content {
        padding: 0 1em 1em;
        overflow: hidden;
      }

      /* ── Animation ──────────────────────────────────────── */
      .content-inner {
        /* Used as animation wrapper */
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (!this._initialised) return;
    this._applyStyles();

    // Sync the native <details> open state
    if (name === 'open') {
      const el = this.shadowRoot?.querySelector('details');
      if (el) el.open = this.open;
    }
  }

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

    const shadow = resolveElevation(this.elevation);
    if (shadow) vars['--_elevation'] = shadow;

    this._setDynamicVars(vars);
  }

  /** Wire up the toggle listener after each render. */
  _update() {
    super._update();
    const details = this.shadowRoot?.querySelector('details');
    if (!details) return;

    // Remove old listener to avoid duplicates
    if (this._toggleHandler) details.removeEventListener('toggle', this._toggleHandler);

    this._toggleHandler = () => {
      const isOpen = details.open;
      // Sync our boolean attribute
      if (isOpen && !this.hasAttribute('open')) this.setAttribute('open', '');
      else if (!isOpen && this.hasAttribute('open')) this.removeAttribute('open');
      this.emit('ui-toggle', { open: isOpen });
    };

    details.addEventListener('toggle', this._toggleHandler);
  }

  render() {
    const chevron = '<svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>';
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    return `
      <details${this.open ? ' open' : ''}>
        <summary>
          <span>${esc(this.summary)}</span>
          <span class="chevron">${chevron}</span>
        </summary>
        <div class="content">
          <div class="content-inner">
            <slot></slot>
          </div>
        </div>
      </details>
    `;
  }
}

customElements.define('ui-details', UIDetails);
