import { UIComponent } from '../../core/ui-component.js';
import { resolveColor, contrastColorFor, resolveElevation, resolveSize } from '../../core/ui-utils.js';

/**
 * `<ui-app-main>` — Primary content area.
 *
 * Must be a direct child of `<ui-app>`. Occupies the central column
 * between the drawer and nav panel. Grows to fill available vertical space.
 *
 * @element ui-app-main
 *
 * @attr {String} background - Background colour (default: white)
 * @attr {String} color      - Text colour (auto-detected if omitted)
 *
 * @slot (default) - Page content
 */
export class UIAppMain extends UIComponent {
  static properties = {
    background: { type: String, default: '', reflect: true },
    color:      { type: String, default: '', reflect: true },
    elevation:  { type: String, default: '', reflect: true },
    size:       { type: String, default: '', reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        padding: 1.5em;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        font-size: var(--_size, inherit);
        overflow-y: auto;
        min-height: 100%;
        box-sizing: border-box;
        box-shadow: var(--_elevation, none);
      }

      @media (max-width: 768px) {
        :host { padding: 1em; }
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'main');
  }

  _applyColors() {
    const vars = {};
    if (this.background) {
      vars['--_bg'] = resolveColor(this.background);
      vars['--_color'] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars['--_color'] = resolveColor(this.color);
    }
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars['--_elevation'] = shadow;
    if (this.size) {
      const fs = resolveSize(this.size);
      if (fs) vars['--_size'] = fs;
    }
    this._setDynamicVars(vars);
  }

  _update() {
    this._applyColors();
    super._update();
  }

  render() {
    return '<slot></slot>';
  }
}

customElements.define('ui-app-main', UIAppMain);
