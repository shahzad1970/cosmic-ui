import { UIComponent } from '../../core/ui-component.js';
import { resolveColor, contrastColorFor, resolveElevation, resolveSize } from '../../core/ui-utils.js';

/**
 * `<ui-app-main-footer>` — Footer bar for the main content area.
 *
 * Must be a direct child of `<ui-app>`. Sits below `<ui-app-main>`,
 * between the drawer and nav panel. Use for status bars, pagination,
 * or contextual actions tied to the main content.
 *
 * @element ui-app-main-footer
 *
 * @attr {String} background - Background colour (default: subtle bg)
 * @attr {String} color      - Text colour (auto-detected if omitted)
 *
 * @slot (default) - Footer content
 */
export class UIAppMainFooter extends UIComponent {
  static properties = {
    background: { type: String, default: '', reflect: true },
    color:      { type: String, default: '', reflect: true },
    elevation:  { type: String, default: '', reflect: true },
    size:       { type: String, default: '', reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: flex;
        align-items: center;
        gap: 1em;
        padding: 0.5em 1.5em;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        font-size: var(--_size, 0.875em);
        min-height: 2.25em;
        box-sizing: border-box;
        border-top: 1px solid var(--ui-border-color, #e5e7eb);
        box-shadow: var(--_elevation, none);
      }

      @media (max-width: 768px) {
        :host { padding: 0.5em 1em; }
      }
    `;
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

customElements.define('ui-app-main-footer', UIAppMainFooter);
