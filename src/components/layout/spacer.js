import { UIComponent } from '../../core/ui-component.js';
import { resolveSize } from '../../core/ui-utils.js';

/**
 * `<ui-layout-spacer>` — Flexible space filler or fixed gap.
 *
 * Inside a flex container (e.g. `<ui-layout-stack>`), it pushes siblings
 * apart. Without a `size` attribute it grows to fill available space.
 * With `size`, it renders as a fixed gap.
 *
 * @element ui-layout-spacer
 *
 * @attr {String} size - Fixed size: named size keyword or any CSS length. When omitted, the spacer is flexible (flex: 1).
 *
 * @example
 *   <!-- Push items apart in a horizontal stack -->
 *   <ui-layout-stack horizontal align="center">
 *     <ui-text>Logo</ui-text>
 *     <ui-layout-spacer></ui-layout-spacer>
 *     <ui-button>Login</ui-button>
 *   </ui-layout-stack>
 *
 *   <!-- Fixed 2em vertical gap -->
 *   <ui-layout-stack>
 *     <ui-text>Above</ui-text>
 *     <ui-layout-spacer size="2em"></ui-layout-spacer>
 *     <ui-text>Below</ui-text>
 *   </ui-layout-stack>
 */
export class UILayoutSpacer extends UIComponent {
  static properties = {
    size: { type: String, default: '', reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        flex: 1 1 auto;
        box-sizing: border-box;
      }
      :host([size]) {
        flex: 0 0 auto;
      }
    `;
  }

  render() {
    return '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'presentation');
    this.setAttribute('aria-hidden', 'true');
    this._applySize();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applySize();
  }

  _applySize() {
    if (!this.size) {
      this._setDynamicVars({});
      return;
    }

    const resolved = resolveSize(this.size) || this.size;

    // Detect orientation from parent flex-direction
    // In both cases, set width + height so it works in row or column contexts.
    // The flex basis is set to the resolved size.
    this._setDynamicVars({
      'min-width':  resolved,
      'min-height': resolved,
    });
  }
}

customElements.define('ui-layout-spacer', UILayoutSpacer);
