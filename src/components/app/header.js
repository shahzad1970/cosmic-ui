import { UIComponent } from '../../core/ui-component.js';
import { resolveColor, contrastColorFor, resolveElevation, resolveSize } from '../../core/ui-utils.js';

/**
 * `<ui-app-header>` — Primary page header bar.
 *
 * Sits below `<ui-app-banner>` inside `<ui-app>`. Use it for page titles,
 * breadcrumbs, and primary actions for the current view.
 *
 * Content is laid out with flexbox — items are vertically centred with a gap.
 *
 * @element ui-app-header
 *
 * @attr {String} background - Background colour: palette token or CSS colour (default: white via --ui-bg)
 * @attr {String} color      - Text colour: palette token or CSS colour (auto-detected if omitted)
 *
 * @slot (default) - Header content (page title, breadcrumbs, action buttons, etc.)
 *
 * @example
 *   <ui-app>
 *     <ui-app-banner background="indigo-600">My App</ui-app-banner>
 *     <ui-app-header>
 *       Dashboard
 *     </ui-app-header>
 *   </ui-app>
 */
export class UIAppHeader extends UIComponent {
  static properties = {
    background: { type: String,  default: '',    reflect: true },
    color:      { type: String,  default: '',    reflect: true },
    elevation:  { type: String,  default: '',    reflect: true },
    size:       { type: String,  default: '',    reflect: true },
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
        font-size: var(--_size, 1.25em);
        font-weight: 600;
        min-height: 3em;
        box-sizing: border-box;
        border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
        box-shadow: var(--_elevation, none);
      }

      @media (max-width: 768px) {
        :host { padding: 0.625em 1em; font-size: var(--_size, 1.125em); }
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'heading');
    this.setAttribute('aria-level', '1');
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

customElements.define('ui-app-header', UIAppHeader);
