import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, contrastColorFor } from '../../core/ui-utils.js';

/**
 * `<ui-card-footer>` — Footer area inside a `<ui-card>`.
 *
 * Displays as a flex row with padding. Ideal for action buttons and
 * supplementary links.
 *
 * @element ui-card-footer
 * @attr {String} background - Background colour: palette token or CSS colour
 * @attr {String} color      - Text colour: palette token or CSS colour
 * @slot (default)
 */
export class UICardFooter extends UIComponent {
  static properties = {
    background: { type: String, default: '', reflect: true },
    color:      { type: String, default: '', reflect: true },
    size:       { type: String, default: '', reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: flex;
        align-items: center;
        gap: 0.5em;
        padding: 0.75em 1.25em;
        border-top: 1px solid var(--ui-border-color, #e5e7eb);
        background: var(--_bg, transparent);
        color: var(--_color, inherit);
        box-sizing: border-box;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyColors();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyColors();
  }

  _applyColors() {
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

  render() {
    return '<slot></slot>';
  }
}

customElements.define('ui-card-footer', UICardFooter);
