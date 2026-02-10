import { UIComponent } from '../../core/ui-component.js';
import { resolveColor, contrastColorFor, resolveElevation, resolveSize } from '../../core/ui-utils.js';

/**
 * `<ui-app-drawer>` — Right-side collapsible panel.
 *
 * Must be a direct child of `<ui-app>`. Sits on the right beside the
 * nav panel. Typically used for primary navigation or a sidebar menu.
 *
 * @element ui-app-drawer
 *
 * @attr {String}  background - Background colour (default: subtle bg)
 * @attr {String}  color      - Text colour (auto-detected if omitted)
 * @attr {String}  width      - Drawer width (default: 16rem)
 * @attr {Boolean} open       - Whether the drawer is visible (default: true)
 *
 * @slot (default) - Drawer content (nav links, menu items, etc.)
 */
export class UIAppDrawer extends UIComponent {
  static properties = {
    background: { type: String,  default: '',     reflect: true },
    color:      { type: String,  default: '',     reflect: true },
    width:      { type: String,  default: '16rem', reflect: true },
    elevation:  { type: String,  default: '',     reflect: true },
    size:       { type: String,  default: '',     reflect: true },
    open:       { type: Boolean, default: true,   reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: flex;
        flex-direction: column;
        width: var(--_width, 16rem);
        min-height: 100%;
        padding: 1em;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        overflow-y: auto;
        border-left: 1px solid var(--ui-border-color, #e5e7eb);
        box-shadow: var(--_elevation, none);
        box-sizing: border-box;
      }

      :host(:not([open])) {
        display: none;
      }

      @media (max-width: 768px) {
        :host { border-left: none; width: 100%; }
      }
    `;
  }

  _applyStyles() {
    const vars = {};
    if (this.width) vars['--_width'] = this.width;
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
    this._applyStyles();
    super._update();
  }

  render() {
    return '<slot></slot>';
  }
}

customElements.define('ui-app-drawer', UIAppDrawer);
