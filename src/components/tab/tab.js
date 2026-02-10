import { UIComponent } from '../../core/ui-component.js';
import { resolveColor, contrastColorFor } from '../../core/ui-utils.js';

/**
 * `<ui-tab>` — A single tab inside `<ui-tabs>`.
 *
 * Combines the tab button label (via the `label` attribute) and the panel
 * content (via the default slot) into one element. The parent `<ui-tabs>`
 * reads `label` to build shadow DOM tab buttons and toggles the `active`
 * attribute to show/hide this element as a panel.
 *
 * @element ui-tab
 *
 * @attr {String}  label      - Text shown on the tab button
 * @attr {Boolean} disabled   - Whether this tab is disabled
 * @attr {Boolean} active     - Whether this panel is visible (managed by ui-tabs)
 * @attr {String}  background - Panel background colour: palette token or CSS colour
 * @attr {String}  color      - Panel text colour: palette token or CSS colour
 *
 * @slot (default) - Panel content
 *
 * @example
 *   <ui-tabs>
 *     <ui-tab label="First">Panel 1 content</ui-tab>
 *     <ui-tab label="Second" disabled>Panel 2 content</ui-tab>
 *   </ui-tabs>
 */
export class UITab extends UIComponent {
  static properties = {
    label:      { type: String,  default: '',    reflect: true },
    disabled:   { type: Boolean, default: false, reflect: true },
    active:     { type: Boolean, default: false, reflect: true },
    background: { type: String,  default: '',    reflect: true },
    color:      { type: String,  default: '',    reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        padding: 1em;
        background: var(--_bg, transparent);
        color: var(--_color, inherit);
        line-height: 1.5;
        box-sizing: border-box;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tabpanel');
  }

  _update() {
    this._applyStyles();
    super._update();
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
    this._setDynamicVars(vars);
  }

  render() {
    return '<slot></slot>';
  }
}

customElements.define('ui-tab', UITab);
