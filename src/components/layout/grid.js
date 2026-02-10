import { UIComponent } from '../../core/ui-component.js';
import { resolveSize } from '../../core/ui-utils.js';

/**
 * `<ui-layout-grid>` — CSS Grid layout container.
 *
 * Provides a declarative CSS Grid with configurable columns, rows, and gap.
 * Supports responsive column counts, auto-fill/auto-fit, and named templates.
 *
 * @element ui-layout-grid
 *
 * @attr {String}  columns    - Grid columns: a number (e.g. "3"), or full CSS value (e.g. "1fr 2fr 1fr", "repeat(auto-fill, minmax(200px, 1fr))")
 * @attr {String}  rows       - Grid rows: same format as columns
 * @attr {String}  gap        - Gap between cells: named size or any CSS length
 * @attr {String}  columnGap  - Column gap override (attribute: column-gap)
 * @attr {String}  rowGap     - Row gap override (attribute: row-gap)
 * @attr {String}  align      - Align items (cross-axis within cells): "start", "center", "end", "stretch"
 * @attr {String}  justify    - Justify items (main-axis within cells): "start", "center", "end", "stretch"
 * @attr {String}  alignContent  - Align content (rows within container): "start", "center", "end", "stretch", "between", "around", "evenly" (attribute: align-content)
 * @attr {String}  justifyContent - Justify content (columns within container): same values (attribute: justify-content)
 * @attr {String}  flow       - Grid auto flow: "row", "column", "dense", "row dense", "column dense"
 * @attr {String}  autoRows   - grid-auto-rows value (attribute: auto-rows)
 * @attr {String}  autoCols   - grid-auto-columns value (attribute: auto-cols)
 * @attr {String}  areas      - grid-template-areas (pipe-separated rows, e.g. "header header | nav main | footer footer")
 * @attr {Boolean} inline     - Render as inline-grid instead of grid
 * @attr {String}  padding    - Padding inside the grid: named size or CSS padding shorthand
 * @attr {String}  width      - CSS width
 * @attr {String}  height     - CSS height
 * @attr {Boolean} full       - width: 100% + height: 100%
 * @attr {String}  minColWidth - Shorthand: creates responsive auto-fill columns with this minimum width (attribute: min-col-width, e.g. "200px", "15em")
 *
 * @slot (default) - Grid items
 *
 * @example
 *   <!-- Simple 3-column grid -->
 *   <ui-layout-grid columns="3" gap="medium">
 *     <div>A</div><div>B</div><div>C</div>
 *     <div>D</div><div>E</div><div>F</div>
 *   </ui-layout-grid>
 *
 *   <!-- Responsive auto-fill grid -->
 *   <ui-layout-grid min-col-width="250px" gap="large">
 *     <ui-card>…</ui-card>
 *     <ui-card>…</ui-card>
 *     <ui-card>…</ui-card>
 *   </ui-layout-grid>
 *
 *   <!-- Custom column template -->
 *   <ui-layout-grid columns="200px 1fr 200px" gap="1rem">
 *     <aside>Sidebar</aside>
 *     <main>Content</main>
 *     <aside>Right</aside>
 *   </ui-layout-grid>
 */
export class UILayoutGrid extends UIComponent {
  static properties = {
    columns:        { type: String,  default: '', reflect: true },
    rows:           { type: String,  default: '', reflect: true },
    gap:            { type: String,  default: '', reflect: true },
    columnGap:      { type: String,  default: '', reflect: true, attribute: 'column-gap' },
    rowGap:         { type: String,  default: '', reflect: true, attribute: 'row-gap' },
    align:          { type: String,  default: '', reflect: true },
    justify:        { type: String,  default: '', reflect: true },
    alignContent:   { type: String,  default: '', reflect: true, attribute: 'align-content' },
    justifyContent: { type: String,  default: '', reflect: true, attribute: 'justify-content' },
    flow:           { type: String,  default: '', reflect: true },
    autoRows:       { type: String,  default: '', reflect: true, attribute: 'auto-rows' },
    autoCols:       { type: String,  default: '', reflect: true, attribute: 'auto-cols' },
    areas:          { type: String,  default: '', reflect: true },
    inline:         { type: Boolean, default: false, reflect: true },
    padding:        { type: String,  default: '', reflect: true },
    width:          { type: String,  default: '', reflect: true },
    height:         { type: String,  default: '', reflect: true },
    full:           { type: Boolean, default: false, reflect: true },
    minColWidth:    { type: String,  default: '', reflect: true, attribute: 'min-col-width' },
  };

  /** Map shorthand content-distribution values → CSS. */
  static _contentMap = {
    start:   'start',
    center:  'center',
    end:     'end',
    stretch: 'stretch',
    between: 'space-between',
    around:  'space-around',
    evenly:  'space-evenly',
  };

  static styles() {
    return /* css */ `
      :host {
        display: grid;
        box-sizing: border-box;
      }
      :host([inline]) { display: inline-grid; }
      :host([full]) { width: 100%; height: 100%; }
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

  /**
   * Resolve a columns/rows value.
   * - Pure integer → `repeat(N, 1fr)`
   * - Otherwise pass through as raw CSS grid-template value.
   */
  _resolveTemplate(val) {
    if (!val) return undefined;
    const n = Number(val);
    if (Number.isInteger(n) && n > 0) return `repeat(${n}, 1fr)`;
    return val;
  }

  _applyLayout() {
    const vars = {};

    // Columns — minColWidth shorthand wins if set
    if (this.minColWidth) {
      vars['grid-template-columns'] = `repeat(auto-fill, minmax(${this.minColWidth}, 1fr))`;
    } else if (this.columns) {
      vars['grid-template-columns'] = this._resolveTemplate(this.columns);
    }

    // Rows
    if (this.rows) vars['grid-template-rows'] = this._resolveTemplate(this.rows);

    // Gap
    if (this.gap) {
      const g = resolveSize(this.gap);
      vars['gap'] = g || this.gap;
    }
    if (this.columnGap) {
      const g = resolveSize(this.columnGap);
      vars['column-gap'] = g || this.columnGap;
    }
    if (this.rowGap) {
      const g = resolveSize(this.rowGap);
      vars['row-gap'] = g || this.rowGap;
    }

    // Alignment
    if (this.align)   vars['align-items']   = this.align;
    if (this.justify) vars['justify-items']  = this.justify;
    if (this.alignContent) {
      vars['align-content'] = UILayoutGrid._contentMap[this.alignContent] || this.alignContent;
    }
    if (this.justifyContent) {
      vars['justify-content'] = UILayoutGrid._contentMap[this.justifyContent] || this.justifyContent;
    }

    // Flow
    if (this.flow)     vars['grid-auto-flow']    = this.flow;
    if (this.autoRows) vars['grid-auto-rows']    = this.autoRows;
    if (this.autoCols) vars['grid-auto-columns'] = this.autoCols;

    // Areas — pipe `|` separates rows: "header header | nav main | footer footer"
    if (this.areas) {
      const rows = this.areas.split('|').map(r => `"${r.trim()}"`).join(' ');
      vars['grid-template-areas'] = rows;
    }

    // Box
    if (this.padding) {
      const p = resolveSize(this.padding);
      vars['padding'] = p || this.padding;
    }
    if (this.width)      vars['width']      = this.width;
    if (this.height)     vars['height']     = this.height;

    this._setDynamicVars(vars);
  }
}

customElements.define('ui-layout-grid', UILayoutGrid);
