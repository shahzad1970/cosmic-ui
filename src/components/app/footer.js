import { UIComponent } from '../../core/ui-component.js';
import { resolveColor, contrastColorFor, resolveElevation, resolveSize } from '../../core/ui-utils.js';

/**
 * `<ui-app-footer>` — Application-wide footer bar.
 *
 * Must be a direct child of `<ui-app>`. Spans the full width at the
 * bottom of the application. Use for copyright notices, global links,
 * or status information.
 *
 * @element ui-app-footer
 *
 * @attr {String} background - Background colour (default: dark)
 * @attr {String} color      - Text colour (auto-detected if omitted)
 *
 * @slot (default) - Footer content
 */
export class UIAppFooter extends UIComponent {
  static properties = {
    background: { type: String, default: '',         reflect: true },
    color:      { type: String, default: '',          reflect: true },
    elevation:  { type: String, default: '',          reflect: true },
    size:       { type: String, default: '',          reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: flex;
        align-items: center;
        gap: 1em;
        padding: 0.75em 1.5em;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        font-size: var(--_size, 0.875em);
        min-height: 2.5em;
        box-sizing: border-box;
        box-shadow: var(--_elevation, none);
      }

      @media (max-width: 768px) {
        :host { padding: 0.625em 1em; }
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'contentinfo');
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

customElements.define('ui-app-footer', UIAppFooter);
