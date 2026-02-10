import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-spinner>` — Loading spinner indicator.
 *
 * Displays an animated spinning circle. Use for inline loading states
 * or as a full-page loading overlay.
 *
 * @element ui-spinner
 *
 * @attr {String}  size       - Spinner size: named keyword or CSS length (default "medium")
 * @attr {String}  color      - Spinner colour: palette token or CSS colour
 * @attr {String}  thickness  - Stroke thickness: CSS length (default "0.2em")
 * @attr {String}  speed      - Animation duration (default "0.75s")
 * @attr {String}  label      - Accessible label (default "Loading")
 * @attr {Boolean} overlay    - Show as centred overlay filling the parent
 *
 * @example
 *   <ui-spinner></ui-spinner>
 *   <ui-spinner size="x-large" color="indigo-500"></ui-spinner>
 *   <ui-spinner color="red-500" thickness="0.3em" speed="1s"></ui-spinner>
 */
export class UISpinner extends UIComponent {
  static properties = {
    size:      { type: String,  default: '',       reflect: true },
    color:     { type: String,  default: '',       reflect: true },
    thickness: { type: String,  default: '',       reflect: true },
    speed:     { type: String,  default: '',       reflect: true },
    label:     { type: String,  default: 'Loading', reflect: true },
    overlay:   { type: Boolean, default: false,    reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
      }

      :host([overlay]) {
        position: absolute;
        inset: 0;
        display: flex;
        background: rgba(255,255,255,0.6);
        z-index: 100;
      }

      .spinner {
        display: block;
        width: 1.5em;
        height: 1.5em;
        border-radius: 50%;
        border: var(--_thickness, 0.2em) solid var(--_track, rgba(0,0,0,0.1));
        border-top-color: var(--_color, var(--ui-indigo-500, #6366f1));
        animation: spin var(--_speed, 0.75s) linear infinite;
        box-sizing: border-box;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
  }

  render() {
    return `<div class="spinner" role="status" aria-label="${this._esc(this.label)}" part="spinner"></div>`;
  }

  _esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  }

  connectedCallback() {
    super.connectedCallback();
  }

  _update() {
    super._update();
    this.setAttribute('role', 'status');
    this.setAttribute('aria-label', this.label || 'Loading');
    this._applyStyles();
  }

  _applyStyles() {
    const vars = {};
    const sz = resolveSize(this.size);
    if (sz) vars['font-size'] = sz;
    if (this.color)     vars['--_color']     = resolveColor(this.color) || this.color;
    if (this.thickness) vars['--_thickness'] = this.thickness;
    if (this.speed)     vars['--_speed']     = this.speed;
    this._setDynamicVars(vars);
  }
}

customElements.define('ui-spinner', UISpinner);
