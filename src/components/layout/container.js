import { UIComponent } from '../../core/ui-component.js';
import { resolveSize } from '../../core/ui-utils.js';

/**
 * `<ui-layout-container>` — Centered, max-width content wrapper.
 *
 * Constrains content to a maximum width and centres it horizontally.
 * Provides consistent horizontal padding so content doesn't touch edges.
 *
 * @element ui-layout-container
 *
 * @attr {String}  maxWidth  - Maximum width of the container (attribute: max-width, default: "1200px")
 * @attr {String}  padding   - Horizontal (and optional vertical) padding (default: "0 1.5em")
 * @attr {String}  align     - Horizontal alignment of the container: "left", "center" (default), "right"
 * @attr {String}  width     - CSS width (default: 100%)
 * @attr {String}  size      - Named size presets: "small" (640px), "medium" (960px), "large" (1200px), "x-large" (1400px), "full" (100%)
 *
 * @slot (default) - Content to contain
 *
 * @example
 *   <ui-layout-container>
 *     <ui-text type="heading">Page content</ui-text>
 *     <ui-text type="paragraph">Centred within 1200px.</ui-text>
 *   </ui-layout-container>
 *
 *   <ui-layout-container max-width="800px" padding="2em">
 *     <p>Narrow container with more padding.</p>
 *   </ui-layout-container>
 *
 *   <ui-layout-container size="small">
 *     <p>640px max-width container.</p>
 *   </ui-layout-container>
 */
export class UILayoutContainer extends UIComponent {
  static properties = {
    maxWidth:   { type: String,  default: '',    reflect: true, attribute: 'max-width' },
    padding:    { type: String,  default: '',    reflect: true },
    align:      { type: String,  default: '',    reflect: true },
    width:      { type: String,  default: '',    reflect: true },
    size:       { type: String,  default: '',    reflect: true },
  };

  /** Named container size presets. */
  static _sizeMap = {
    small:    '640px',
    medium:   '960px',
    large:    '1200px',
    'x-large': '1400px',
    full:     '100%',
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        box-sizing: border-box;
        width: 100%;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
        padding: 0 1.5em;
      }
    `;
  }

  render() {
    return '<slot></slot>';
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyLayout();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyLayout();
  }

  _applyLayout() {
    const vars = {};

    // Max-width — explicit wins, then size preset
    if (this.maxWidth) {
      vars['max-width'] = this.maxWidth;
    } else if (this.size) {
      const preset = UILayoutContainer._sizeMap[this.size.toLowerCase()];
      if (preset) vars['max-width'] = preset;
    }

    // Padding
    if (this.padding) {
      const p = resolveSize(this.padding);
      vars['padding'] = p || this.padding;
    }

    // Width
    if (this.width) vars['width'] = this.width;

    // Alignment (defaults to center via auto margins)
    if (this.align === 'left') {
      vars['margin-left']  = '0';
      vars['margin-right'] = 'auto';
    } else if (this.align === 'right') {
      vars['margin-left']  = 'auto';
      vars['margin-right'] = '0';
    }
    // 'center' is the default (both auto), no override needed

    this._setDynamicVars(vars);
  }
}

customElements.define('ui-layout-container', UILayoutContainer);
