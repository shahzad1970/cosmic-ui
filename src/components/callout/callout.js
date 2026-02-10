import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, contrastColorFor, resolveElevation } from '../../core/ui-utils.js';

/**
 * `<ui-callout>` — A highlighted block for tips, warnings, notes, and alerts.
 *
 * Renders as a solid-colour block with auto-contrast text.
 *
 * @element ui-callout
 *
 * @attr {String}  background - Background colour: a palette token (e.g. "blue-500") or any CSS colour
 * @attr {String}  color      - Text colour: a palette token or any CSS colour (auto-detected if omitted)
 * @attr {String}  size       - Component size: xx-small … xxx-large, or any CSS length
 * @attr {String}  elevation  - Shadow depth: 1–5 (adds border + shadow), or raw CSS box-shadow
 * @attr {Boolean} dismissible - Shows a close button; fires ui-dismiss when clicked
 *
 * @slot (default) - Callout content (text, headings, inline markup)
 *
 * @fires ui-dismiss - Emitted when the dismiss button is clicked
 *
 * @example
 *   <ui-callout background="blue-100">This is an informational message.</ui-callout>
 *   <ui-callout background="amber-100">Careful — this action cannot be undone.</ui-callout>
 *   <ui-callout background="red-100" dismissible>Something went wrong!</ui-callout>
 *   <ui-callout background="purple-500">Custom colours.</ui-callout>
 */
export class UICallout extends UIComponent {
  static properties = {
    background:  { type: String,  default: '',    reflect: true },
    color:       { type: String,  default: '',    reflect: true },
    size:        { type: String,  default: '',    reflect: true },
    elevation:   { type: String,  default: '',    reflect: true },
    dismissible: { type: Boolean, default: false, reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        line-height: 1.6;
        box-sizing: border-box;

        padding: 1em 1.25em;
        border-radius: var(--ui-radius, 0.25em);

        background: var(--_bg, inherit);
        color: var(--_fg, inherit);
        box-shadow: var(--_elevation, none);

        position: relative;
      }

      :host([elevation]) {
        border: 1px solid var(--ui-border-color, #e5e7eb);
      }

      /* Dismiss button */
      button {
        display: none;
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1em;
        line-height: 1;
        width: 1.6em;
        height: 1.6em;
        padding: 0;
        border-radius: 50%;
        color: var(--_fg, inherit);
        opacity: 0.5;
        transition: opacity 0.15s ease, background 0.15s ease;
      }

      button:hover {
        opacity: 1;
        background: rgba(0, 0, 0, 0.08);
      }

      button:active {
        background: rgba(0, 0, 0, 0.15);
      }

      button:focus-visible {
        opacity: 1;
        background: rgba(0, 0, 0, 0.08);
        outline: 2px solid var(--ui-focus-ring, #3b82f6);
        outline-offset: 1px;
      }

      :host([dismissible]) button {
        display: block;
      }

      :host([dismissible]) {
        padding-right: 2.5em;
      }

      slot {
        display: block;
      }
    `;
  }

  render() {
    return '<button part="dismiss" aria-label="Dismiss">\u2715</button><slot></slot>';
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'status');
  }

  _update() {
    super._update();
    this._attachListeners();
    this._applyStyles();
  }

  _attachListeners() {
    const btn = this.shadowRoot.querySelector('button');
    if (btn) {
      btn.addEventListener('click', () => {
        this.emit('ui-dismiss');
        this.remove();
      });
    }
  }

  /** Compute CSS custom properties from explicit attributes. */
  _applyStyles() {
    const vars = {};

    if (this.background) vars['--_bg'] = resolveColor(this.background);
    if (this.color)      vars['--_fg'] = resolveColor(this.color);
    else if (this.background) vars['--_fg'] = contrastColorFor(this.background);

    const fontSize = resolveSize(this.size);
    if (fontSize) vars['font-size'] = fontSize;

    const shadow = resolveElevation(this.elevation);
    if (shadow) vars['--_elevation'] = shadow;

    this._setDynamicVars(vars);
  }
}

customElements.define('ui-callout', UICallout);
