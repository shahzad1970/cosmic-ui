import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-divider>` — Visual separator / horizontal rule.
 *
 * A thin line used to divide sections of content. Supports horizontal
 * (default) and vertical orientations, optional label text, and
 * customisable colour, thickness, and spacing.
 *
 * @element ui-divider
 *
 * @attr {String}  label      - Optional text label displayed in the middle of the divider
 * @attr {Boolean} vertical   - Render as a vertical divider (for use inside flex rows)
 * @attr {String}  color      - Line colour: palette token or CSS colour
 * @attr {String}  thickness  - Line thickness: size keyword (small, large, …) or CSS length
 * @attr {String}  spacing    - Margin above/below (horizontal) or left/right (vertical)
 * @attr {String}  size       - Font size for the label text
 * @attr {String}  variant    - Line style: "solid" (default), "dashed", "dotted"
 *
 * @example
 *   <ui-divider></ui-divider>
 *
 * @example
 *   <ui-divider label="OR"></ui-divider>
 *
 * @example
 *   <div style="display:flex; align-items:stretch; gap:1em; height:40px;">
 *     Left <ui-divider vertical></ui-divider> Right
 *   </div>
 */
export class UIDivider extends UIComponent {
  static properties = {
    label:     { type: String,  default: '',      reflect: true },
    vertical:  { type: Boolean, default: false,   reflect: true },
    color:     { type: String,  default: '',      reflect: true },
    thickness: { type: String,  default: '',      reflect: true },
    spacing:   { type: String,  default: '',      reflect: true },
    size:      { type: String,  default: '',      reflect: true },
    variant:   { type: String,  default: 'solid', reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        box-sizing: border-box;
      }

      /* ── Horizontal (default) ───────────────────────────── */
      :host(:not([vertical])) {
        width: 100%;
        margin: var(--_spacing, 1em) 0;
      }

      :host(:not([vertical])) .line {
        display: flex;
        align-items: center;
        gap: 0.75em;
      }

      :host(:not([vertical])) .line::before,
      :host(:not([vertical])) .line::after {
        content: '';
        flex: 1;
        border-top: var(--_thickness, 1px) var(--_variant, solid) var(--_color, var(--ui-border-color, #e5e7eb));
      }

      /* Hide ::after when there is no label (single line via ::before) */
      :host(:not([vertical]):not([label])) .line::after,
      :host(:not([vertical])[label=""]) .line::after {
        display: none;
      }

      /* ── Vertical ───────────────────────────────────────── */
      :host([vertical]) {
        display: inline-block;
        width: auto;
        align-self: stretch;
        margin: 0 var(--_spacing, 1em);
      }

      :host([vertical]) .line {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        gap: 0.5em;
      }

      :host([vertical]) .line::before,
      :host([vertical]) .line::after {
        content: '';
        flex: 1;
        border-left: var(--_thickness, 1px) var(--_variant, solid) var(--_color, var(--ui-border-color, #e5e7eb));
      }

      :host([vertical]:not([label])) .line::after,
      :host([vertical][label=""]) .line::after {
        display: none;
      }

      /* ── Label ──────────────────────────────────────────── */
      .label {
        color: var(--ui-text-muted, #6b7280);
        font-size: 0.8em;
        font-weight: 500;
        white-space: nowrap;
        user-select: none;
        line-height: 1;
      }

      :host([vertical]) .label {
        writing-mode: vertical-lr;
        transform: rotate(180deg);
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'separator');
    this._applyStyles();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (!this._initialised) return;
    this._applyStyles();

    if (name === 'vertical') {
      this.setAttribute('aria-orientation', this.vertical ? 'vertical' : 'horizontal');
    }
  }

  _applyStyles() {
    const vars = {};

    if (this.color)     vars['--_color']     = resolveColor(this.color);
    if (this.thickness) vars['--_thickness']  = resolveSize(this.thickness) || this.thickness;
    if (this.spacing)   vars['--_spacing']    = resolveSize(this.spacing) || this.spacing;
    if (this.variant && this.variant !== 'solid') vars['--_variant'] = this.variant;

    const fontSize = resolveSize(this.size);
    if (fontSize) vars['font-size'] = fontSize;

    this._setDynamicVars(vars);

    // aria-orientation
    this.setAttribute('aria-orientation', this.vertical ? 'vertical' : 'horizontal');
  }

  render() {
    const hasLabel = this.label && this.label.length > 0;
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<div class="line">${hasLabel ? `<span class="label">${esc(this.label)}</span>` : ''}</div>`;
  }
}

customElements.define('ui-divider', UIDivider);
