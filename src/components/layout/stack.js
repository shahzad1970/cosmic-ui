import { UIComponent } from '../../core/ui-component.js';
import { resolveSize } from '../../core/ui-utils.js';

/**
 * `<ui-layout-stack>` — Flexbox stack layout (vertical or horizontal).
 *
 * Lays out children in a column (default) or row. The primary building
 * block for composing vertical and horizontal layouts with consistent spacing.
 *
 * @element ui-layout-stack
 *
 * @attr {String}  direction  - Flex direction: "column" (default), "row", "column-reverse", "row-reverse"
 * @attr {Boolean} horizontal - Shorthand for direction="row"
 * @attr {String}  gap        - Gap between items: named size or any CSS length
 * @attr {String}  align      - Cross-axis alignment: "start", "center", "end", "stretch", "baseline"
 * @attr {String}  justify    - Main-axis justification: "start", "center", "end", "between", "around", "evenly"
 * @attr {Boolean} wrap       - Allow items to wrap to the next line
 * @attr {Boolean} inline     - Render as inline-flex instead of flex
 * @attr {Boolean} reverse    - Reverse the stacking direction
 * @attr {String}  padding    - Padding inside the stack: named size or CSS padding shorthand
 * @attr {String}  width      - CSS width
 * @attr {String}  height     - CSS height
 * @attr {Boolean} grow       - flex: 1 1 auto (fill available space in a parent flex)
 * @attr {Boolean} center     - Shorthand for align="center" + justify="center"
 * @attr {Boolean} full       - width: 100% + height: 100%
 *
 * @slot (default) - Child elements to lay out
 *
 * @example
 *   <ui-layout-stack gap="medium">
 *     <ui-text>First</ui-text>
 *     <ui-text>Second</ui-text>
 *   </ui-layout-stack>
 *
 *   <ui-layout-stack horizontal gap="small" align="center">
 *     <ui-button>Save</ui-button>
 *     <ui-button>Cancel</ui-button>
 *   </ui-layout-stack>
 */
export class UILayoutStack extends UIComponent {
  static properties = {
    direction:  { type: String,  default: '',    reflect: true },
    horizontal: { type: Boolean, default: false, reflect: true },
    gap:        { type: String,  default: '',    reflect: true },
    align:      { type: String,  default: '',    reflect: true },
    justify:    { type: String,  default: '',    reflect: true },
    wrap:       { type: Boolean, default: false, reflect: true },
    inline:     { type: Boolean, default: false, reflect: true },
    reverse:    { type: Boolean, default: false, reflect: true },
    padding:    { type: String,  default: '',    reflect: true },
    width:      { type: String,  default: '',    reflect: true },
    height:     { type: String,  default: '',    reflect: true },
    grow:       { type: Boolean, default: false, reflect: true },
    center:     { type: Boolean, default: false, reflect: true },
    full:       { type: Boolean, default: false, reflect: true },
  };

  /** Map shorthand justify values → CSS values. */
  static _justifyMap = {
    start:   'flex-start',
    center:  'center',
    end:     'flex-end',
    between: 'space-between',
    around:  'space-around',
    evenly:  'space-evenly',
  };

  /** Map shorthand align values → CSS values. */
  static _alignMap = {
    start:    'flex-start',
    center:   'center',
    end:      'flex-end',
    stretch:  'stretch',
    baseline: 'baseline',
  };

  static styles() {
    return /* css */ `
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }
      :host([inline]) { display: inline-flex; }
      :host([horizontal]) { flex-direction: row; }
      :host([wrap]) { flex-wrap: wrap; }
      :host([grow]) { flex: 1 1 auto; }
      :host([full]) { width: 100%; height: 100%; }
      :host([reverse]:not([horizontal])) { flex-direction: column-reverse; }
      :host([reverse][horizontal]) { flex-direction: row-reverse; }
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

    if (this.direction) vars['flex-direction'] = this.direction;

    if (this.gap) {
      const g = resolveSize(this.gap);
      vars['gap'] = g || this.gap;
    }

    const alignVal = this.center ? 'center' : this.align;
    if (alignVal) vars['align-items'] = UILayoutStack._alignMap[alignVal] || alignVal;

    const justifyVal = this.center ? 'center' : this.justify;
    if (justifyVal) vars['justify-content'] = UILayoutStack._justifyMap[justifyVal] || justifyVal;

    if (this.padding) {
      const p = resolveSize(this.padding);
      vars['padding'] = p || this.padding;
    }
    if (this.width)      vars['width']      = this.width;
    if (this.height)     vars['height']     = this.height;

    this._setDynamicVars(vars);
  }
}

customElements.define('ui-layout-stack', UILayoutStack);
