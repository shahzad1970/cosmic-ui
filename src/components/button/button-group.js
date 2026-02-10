import { UIComponent } from '../../core/ui-component.js';
import { resolveSize } from '../../core/ui-utils.js';

/**
 * `<ui-button-group>` — Groups buttons into a connected strip.
 *
 * Adjacent buttons merge their borders and only the first/last
 * children keep their outer border-radius, creating a seamless
 * segmented control or toolbar.
 *
 * @element ui-button-group
 *
 * @attr {String}  size      - Applies a uniform size to the group (keyword or CSS length)
 * @attr {Boolean} vertical  - Stack buttons vertically instead of horizontally
 * @attr {Boolean} connected - Merge button borders so they appear as one unit (default true via CSS)
 *
 * @slot (default) - `<ui-button>` elements
 *
 * @example
 *   <ui-button-group>
 *     <ui-button background="indigo-500">Left</ui-button>
 *     <ui-button background="indigo-500">Centre</ui-button>
 *     <ui-button background="indigo-500">Right</ui-button>
 *   </ui-button-group>
 */
export class UIButtonGroup extends UIComponent {
  static properties = {
    size:     { type: String,  default: '',    reflect: true },
    vertical: { type: Boolean, default: false, reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: inline-flex;
        flex-direction: row;
        box-sizing: border-box;
      }

      :host([vertical]) {
        flex-direction: column;
      }

      /* ── Horizontal: merge radii ────────────────────────── */
      ::slotted(ui-button) {
        --ui-button-radius: 0;
        margin: 0;
      }

      /* First child keeps left radii */
      ::slotted(ui-button:first-child) {
        --ui-button-radius: 0.375em 0 0 0.375em;
      }

      /* Last child keeps right radii */
      ::slotted(ui-button:last-child) {
        --ui-button-radius: 0 0.375em 0.375em 0;
      }

      /* Solo child — full radii */
      ::slotted(ui-button:only-child) {
        --ui-button-radius: 0.375em;
      }

      /* Negative margin to overlap outline borders */
      ::slotted(ui-button:not(:first-child)) {
        margin-left: -1px;
      }

      /* Hovered / focused item on top so border isn't clipped */
      ::slotted(ui-button:hover),
      ::slotted(ui-button:focus-within) {
        z-index: 1;
      }

      /* ── Vertical: override directions ──────────────────── */
      :host([vertical]) ::slotted(ui-button) {
        --ui-button-radius: 0;
        margin: 0;
      }

      :host([vertical]) ::slotted(ui-button:first-child) {
        --ui-button-radius: 0.375em 0.375em 0 0;
      }

      :host([vertical]) ::slotted(ui-button:last-child) {
        --ui-button-radius: 0 0 0.375em 0.375em;
      }

      :host([vertical]) ::slotted(ui-button:only-child) {
        --ui-button-radius: 0.375em;
      }

      :host([vertical]) ::slotted(ui-button:not(:first-child)) {
        margin-left: 0;
        margin-top: -1px;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'group');
  }

  _update() {
    this._applyStyles();
    super._update();
  }

  _applyStyles() {
    const vars = {};
    const fontSize = resolveSize(this.size);
    if (fontSize) vars['font-size'] = fontSize;
    this._setDynamicVars(vars);
  }

  render() {
    return '<slot></slot>';
  }
}

customElements.define('ui-button-group', UIButtonGroup);
