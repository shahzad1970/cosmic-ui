import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, contrastColorFor, resolveElevation } from '../../core/ui-utils.js';

/**
 * `<ui-card>` — Content card container.
 *
 * A structured surface for grouping related content. Uses CSS Grid
 * to lay out optional child components in a vertical stack:
 *
 * ┌──────────────────────┐
 * │  ui-card-header      │
 * │  ui-card-media       │
 * │  ui-card-body        │
 * │  ui-card-footer      │
 * └──────────────────────┘
 *
 * All children are optional — omitted sections collapse naturally.
 *
 * @element ui-card
 *
 * @attr {String}  background - Background colour: palette token or CSS colour
 * @attr {String}  color      - Text colour: palette token or CSS colour (auto-detected if omitted)
 * @attr {String}  size       - Component size: xx-small … xxx-large, or any CSS length
 * @attr {String}  elevation  - Shadow depth: 1–5 (adds border + shadow), or raw CSS box-shadow
 * @attr {Boolean} outline    - Border only, no shadow
 * @attr {Boolean} flat       - No shadow and no border
 * @attr {Boolean} clickable  - Shows hover lift effect and pointer cursor
 *
 * @slot (default) - Card children (ui-card-header, ui-card-media, ui-card-body, ui-card-footer)
 *
 * @fires ui-click - Emitted when a clickable card is clicked
 *
 * @example
 *   <ui-card>
 *     <ui-card-header>Title</ui-card-header>
 *     <ui-card-body>Card content goes here.</ui-card-body>
 *     <ui-card-footer>
 *       <ui-button size="small">Action</ui-button>
 *     </ui-card-footer>
 *   </ui-card>
 */
export class UICard extends UIComponent {
  static properties = {
    background: { type: String,  default: '',    reflect: true },
    color:      { type: String,  default: '',    reflect: true },
    size:       { type: String,  default: '',    reflect: true },
    elevation:  { type: String,  default: '',    reflect: true },
    outline:    { type: Boolean, default: false, reflect: true },
    flat:       { type: Boolean, default: false, reflect: true },
    clickable:  { type: Boolean, default: false, reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: grid;
        grid-template-rows: auto auto 1fr auto;
        grid-template-areas:
          "header"
          "media"
          "body"
          "footer";
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        border-radius: var(--ui-radius, 0.5em);
        box-shadow: var(--_elevation, 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06));
        overflow: hidden;
        box-sizing: border-box;
        line-height: 1.5;
      }

      /* Elevation — adds border alongside shadow */
      :host([elevation]) {
        border: 1px solid var(--ui-border-color, #e5e7eb);
      }

      /* Outline style — border, no shadow */
      :host([outline]) {
        box-shadow: none;
        border: 1px solid var(--ui-border-color, #e5e7eb);
      }

      /* Flat style — no shadow, no border */
      :host([flat]) {
        box-shadow: none;
        border: none;
      }

      /* Clickable — interactive lift */
      :host([clickable]) {
        cursor: pointer;
        transition: box-shadow 0.2s ease, transform 0.2s ease;
      }

      :host([clickable]:hover) {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
      }

      :host([clickable]:active) {
        transform: translateY(0);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      :host([clickable][outline]:hover) {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      /* Grid area assignments */
      ::slotted(ui-card-header) { grid-area: header; }
      ::slotted(ui-card-media)  { grid-area: media; }
      ::slotted(ui-card-body)   { grid-area: body; }
      ::slotted(ui-card-footer) { grid-area: footer; }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'article');
    this._applyStyles();

    if (this.clickable) {
      this.setAttribute('tabindex', '0');
      this._onClick = () => this.emit('ui-click');
      this._onKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.emit('ui-click');
        }
      };
      this.addEventListener('click', this._onClick);
      this.addEventListener('keydown', this._onKeyDown);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._onClick) this.removeEventListener('click', this._onClick);
    if (this._onKeyDown) this.removeEventListener('keydown', this._onKeyDown);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyStyles();
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

    const fontSize = resolveSize(this.size);
    if (fontSize) vars['font-size'] = fontSize;

    const shadow = resolveElevation(this.elevation);
    if (shadow) vars['--_elevation'] = shadow;

    this._setDynamicVars(vars);
  }

  render() {
    return '<slot></slot>';
  }
}

customElements.define('ui-card', UICard);
