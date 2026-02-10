import { UIComponent } from '../../core/ui-component.js';
import { resolveColor, contrastColorFor, resolveElevation, resolveSize } from '../../core/ui-utils.js';

/**
 * `<ui-app-banner>` — Top-level application banner / header bar.
 *
 * Must be used as a direct child of `<ui-app>`. Provides a horizontal bar
 * at the top of the application for branding, navigation, and actions.
 *
 * Content is laid out with flexbox — items are vertically centred with a gap.
 *
 * @element ui-app-banner
 *
 * @attr {String} background - Background colour: palette token or CSS colour (default: gray-900)
 * @attr {String} color      - Text colour: palette token or CSS colour (auto-detected if omitted)
 *
 * @slot (default) - Banner content (logo, nav items, actions, etc.)
 *
 * @example
 *   <ui-app>
 *     <ui-app-banner background="indigo-600">
 *       My App
 *     </ui-app-banner>
 *     <!-- page content -->
 *   </ui-app>
 */
export class UIAppBanner extends UIComponent {
  static properties = {
    background: { type: String,  default: '',         reflect: true },
    color:      { type: String,  default: '',          reflect: true },
    elevation:  { type: String,  default: '',          reflect: true },
    size:       { type: String,  default: '',          reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: .5em;
        padding: 0.75em 1.5em;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        font-size: var(--_size, inherit);
        font-weight: 500;
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
    this.setAttribute('role', 'banner');
  }

  /** Resolve background/color and apply as CSS custom properties. */
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
      const fontSize = resolveSize(this.size);
      if (fontSize) vars['--_size'] = fontSize;
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

customElements.define('ui-app-banner', UIAppBanner);
