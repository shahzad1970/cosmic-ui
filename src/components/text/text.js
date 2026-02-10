import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-text>` — Universal text container.
 *
 * By default it behaves like a `<span>` (inline). Use the `display`
 * attribute to switch to block, flex, inline-block, or any CSS display value.
 * The `block` boolean is a shorthand for `display="block"`.
 *
 * For semantic HTML, use the `type` attribute:
 *   - `heading` renders an `<h2>` inside Shadow DOM (bold, block, 1.5em, margin-bottom 0.5em)
 *   - `paragraph` renders a `<p>` inside Shadow DOM (block, margin-bottom 1em)
 *
 * Control heading size visually with the `size` attribute.
 * Override default margins with the `margin` attribute.
 *
 * @element ui-text
 *
 * @attr {String}  type      - Semantic type: "heading" or "paragraph". Renders the appropriate element inside Shadow DOM.
 * @attr {Boolean} block     - Shorthand for display="block" (most common case)
 * @attr {String}  display   - CSS display value (e.g. "flex", "inline-block"). Overrides `block`.
 * @attr {String}  size      - Font size: xx-small … xxx-large, or any CSS length
 * @attr {String}  color     - Text colour: palette token (e.g. "red-600") or CSS colour
 * @attr {String}  weight    - Font weight: "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black" or 100–900
 * @attr {Boolean} bold      - Shorthand for weight="bold"
 * @attr {String}  align     - Text alignment: "left" | "center" | "right" | "justify"
 * @attr {String}  transform - Text transform: "uppercase" | "lowercase" | "capitalize" | "none"
 * @attr {String}  leading   - Line-height: "none" | "tight" | "snug" | "normal" | "relaxed" | "loose" or any CSS value
 * @attr {String}  spacing   - Letter-spacing: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest" or any CSS value
 * @attr {String}  wrap      - Text wrapping: "balance" | "pretty" | "nowrap" | "wrap" or any CSS text-wrap value
 * @attr {String}  indent    - First-line text indentation (any CSS length, e.g. "2em", "20px")
 * @attr {String}  margin    - Margin around the element (any CSS margin shorthand, e.g. "1em 0")
 * @attr {String}  padding   - Padding inside the element (any CSS padding shorthand)
 * @attr {String}  decoration - Text decoration: "underline" | "line-through" | "overline" | "none" or full CSS shorthand
 * @attr {Boolean} muted     - Subdued text using --ui-text-muted colour
 * @attr {Boolean} mono      - Use monospace font
 * @attr {Boolean} italic    - Italic text
 * @attr {Boolean} underline - Shorthand for decoration="underline"
 * @attr {Boolean} strike    - Shorthand for decoration="line-through" (strikethrough)
 * @attr {Boolean} truncate  - Truncate overflowing text with an ellipsis
 * @attr {Boolean} nowrap    - Shorthand for wrap="nowrap"
 * @attr {Boolean} selectable - Set to false to prevent text selection (user-select: none)
 * @attr {String}  break     - Word breaking: "all" | "words" | "keep" or any CSS word-break value
 * @attr {Number}  lines     - Clamp text to N visible lines with ellipsis (multi-line truncation)
 * @attr {String}  font      - Custom font-family override (e.g. "Georgia, serif")
 *
 * @slot (default) - Text content
 *
 * @example
 *   <ui-text type="heading" size="xx-large">Page Title</ui-text>
 *   <ui-text type="heading">Section heading</ui-text>
 *   <ui-text type="paragraph">A paragraph with automatic bottom margin.</ui-text>
 *   <ui-text bold color="red-500">Important!</ui-text>
 *   <ui-text mono size="small">code sample</ui-text>
 *   <ui-text strike muted>Deprecated feature</ui-text>
 *   <ui-text block spacing="wide" transform="uppercase" size="small">Section Label</ui-text>
 */
export class UIText extends UIComponent {
  static properties = {
    type:      { type: String,  default: '',    reflect: true },
    block:     { type: Boolean, default: false, reflect: true },
    display:   { type: String,  default: '',    reflect: true },
    size:      { type: String,  default: '',    reflect: true },
    color:     { type: String,  default: '',    reflect: true },
    weight:    { type: String,  default: '',    reflect: true },
    bold:      { type: Boolean, default: false, reflect: true },
    align:     { type: String,  default: '',    reflect: true },
    transform: { type: String,  default: '',    reflect: true },
    leading:   { type: String,  default: '',    reflect: true },
    spacing:   { type: String,  default: '',    reflect: true },
    wrap:      { type: String,  default: '',    reflect: true },
    indent:    { type: String,  default: '',    reflect: true },
    margin:    { type: String,  default: '',    reflect: true },
    padding:   { type: String,  default: '',    reflect: true },
    decoration:{ type: String,  default: '',    reflect: true },
    muted:     { type: Boolean, default: false, reflect: true },
    mono:      { type: Boolean, default: false, reflect: true },
    italic:    { type: Boolean, default: false, reflect: true },
    underline: { type: Boolean, default: false, reflect: true },
    strike:    { type: Boolean, default: false, reflect: true },
    truncate:  { type: Boolean, default: false, reflect: true },
    nowrap:    { type: Boolean, default: false, reflect: true },
    selectable:{ type: Boolean, default: true,  reflect: true },
    break:     { type: String,  default: '',    reflect: true },
    lines:     { type: Number,  default: 0,     reflect: true },
    font:      { type: String,  default: '',    reflect: true },
  };

  /** Valid type values. */
  static _validTypes = new Set(['heading', 'paragraph']);

  /** Named font-weight map (Tailwind-style names → numeric values). */
  static _weights = {
    thin:      100,
    extralight: 200,
    light:     300,
    normal:    400,
    medium:    500,
    semibold:  600,
    bold:      700,
    extrabold: 800,
    black:     900,
  };

  /** Named line-height map. */
  static _leadings = {
    none:    '1',
    tight:   '1.25',
    snug:    '1.375',
    normal:  '1.6',
    relaxed: '1.75',
    loose:   '2',
  };

  /** Named letter-spacing map. */
  static _spacings = {
    tighter: '-0.05em',
    tight:   '-0.025em',
    normal:  '0em',
    wide:    '0.025em',
    wider:   '0.05em',
    widest:  '0.1em',
  };

  /** Named word-break map. */
  static _breaks = {
    all:   'break-all',
    words: 'break-word',   // overflow-wrap fallback handled in _applyStyles
    keep:  'keep-all',
  };

  static styles() {
    return /* css */ `
      :host {
        color: var(--_color, inherit);
        font-size: var(--_size, inherit);
        display: var(--_display, inline);
        box-sizing: border-box;
      }

      :host([block]) {
        display: var(--_display, block);
      }

      :host([bold]) {
        font-weight: 700;
      }

      :host([mono]) {
        font-family: var(--ui-font-mono, monospace);
      }

      :host([italic]) {
        font-style: italic;
      }

      :host([underline]) {
        text-decoration: underline;
      }

      :host([strike]) {
        text-decoration: line-through;
      }

      :host([muted]) {
        color: var(--ui-text-muted, #6b7280);
      }

      :host([truncate]) {
        display: var(--_display, block);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      :host([nowrap]) {
        white-space: nowrap;
      }

      :host([selectable="false"]) {
        -webkit-user-select: none;
        user-select: none;
      }

      :host([lines]) {
        display: var(--_display, -webkit-box);
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      :host([type]) {
        display: var(--_display, block);
      }

      h2, p {
        all: inherit;
        display: block;
        margin: 0;
        padding: 0;
      }

      slot {
        display: contents;
      }
    `;
  }

  render() {
    const t = this.type?.toLowerCase();
    if (t === 'heading')   return '<h2><slot></slot></h2>';
    if (t === 'paragraph') return '<p><slot></slot></p>';
    return '<slot></slot>';
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyStyles();
  }

  /** Compute CSS custom properties from attributes. */
  _applyStyles() {
    const vars = {};
    const t = this.type?.toLowerCase();
    const isHeading = t === 'heading';

    // Display — explicit `display` wins over the `block` boolean
    if (this.display) vars['--_display'] = this.display;

    // Font size — heading default (1.5em) applies when no explicit size is set
    if (this.size) {
      const fontSize = resolveSize(this.size);
      if (fontSize) vars['--_size'] = fontSize;
    } else if (isHeading) {
      vars['--_size'] = '1.5em';
    }

    // Colour — explicit colour wins, muted handled via CSS attribute selector
    if (this.color) {
      vars['--_color'] = resolveColor(this.color);
    }

    // Font weight — explicit `weight` overrides the `bold` boolean and heading default
    if (this.weight) {
      const w = UIText._weights[this.weight.toLowerCase()] || this.weight;
      vars['font-weight'] = String(w);
    } else if (isHeading && !this.bold) {
      vars['font-weight'] = '700';
    }

    // Text alignment
    if (this.align) vars['text-align'] = this.align;

    // Text transform
    if (this.transform) vars['text-transform'] = this.transform;

    // Line height
    if (this.leading) {
      const lh = UIText._leadings[this.leading] || this.leading;
      vars['line-height'] = lh;
    }

    // Letter spacing
    if (this.spacing) {
      const ls = UIText._spacings[this.spacing] || this.spacing;
      vars['letter-spacing'] = ls;
    }

    // Text wrap
    if (this.wrap) vars['text-wrap'] = this.wrap;

    // Text indent
    if (this.indent) vars['text-indent'] = this.indent;

    // Margin — paragraphs and headings get default bottom margin when not explicitly set
    if (this.margin) {
      vars['margin'] = this.margin;
    } else if (t === 'paragraph') {
      vars['margin'] = '0 0 1em';
    } else if (isHeading) {
      vars['margin'] = '0 0 0.5em';
    }

    // Padding
    if (this.padding) vars['padding'] = this.padding;

    // Text decoration — explicit `decoration` overrides boolean shorthands
    if (this.decoration) vars['text-decoration'] = this.decoration;

    // Word break
    if (this.break) {
      const br = UIText._breaks[this.break] || this.break;
      vars['word-break'] = br;
      if (this.break === 'words') vars['overflow-wrap'] = 'break-word';
    }

    // Multi-line clamp
    if (this.lines > 0) {
      vars['-webkit-line-clamp'] = String(Math.floor(this.lines));
    }

    // Custom font family
    if (this.font) {
      vars['font-family'] = this.font;
    }

    this._setDynamicVars(vars);
  }
}

customElements.define('ui-text', UIText);
