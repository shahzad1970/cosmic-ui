import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-input-slider>` — Range slider with optional value display.
 *
 * @element ui-input-slider
 *
 * @attr {Number}  value      - Current value
 * @attr {Number}  min        - Minimum value (default 0)
 * @attr {Number}  max        - Maximum value (default 100)
 * @attr {Number}  step       - Step increment (default 1)
 * @attr {String}  name       - Form field name
 * @attr {String}  label      - Label text
 * @attr {String}  help       - Help text
 * @attr {String}  error      - Error message
 * @attr {String}  size       - Size keyword or CSS length
 * @attr {String}  background - Accent/track colour
 * @attr {Boolean} disabled   - Disables the slider
 * @attr {Boolean} required   - Marks as required
 * @attr {Boolean} showvalue  - Show the current numeric value next to the slider
 *
 * @fires ui-input  - On every change (detail: { value })
 * @fires ui-change - On mouseup/commit (detail: { value })
 */
export class UIInputSlider extends UIComponent {

  static properties = {
    value:      { type: Number,  default: 50,    reflect: true },
    min:        { type: Number,  default: 0,     reflect: true },
    max:        { type: Number,  default: 100,   reflect: true },
    step:       { type: Number,  default: 1,     reflect: true },
    name:       { type: String,  default: '',    reflect: true },
    label:      { type: String,  default: '',    reflect: true },
    help:       { type: String,  default: '',    reflect: true },
    error:      { type: String,  default: '',    reflect: true },
    size:       { type: String,  default: '',    reflect: true },
    background: { type: String,  default: '',    reflect: true },
    disabled:   { type: Boolean, default: false, reflect: true },
    required:   { type: Boolean, default: false, reflect: true },
    showvalue:  { type: Boolean, default: false, reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        line-height: 1.5;
      }
      :host([disabled]) { opacity: 0.5; pointer-events: none; }

      .label {
        display: none;
        font-size: 0.875em;
        font-weight: 600;
        color: var(--ui-text-color, #374151);
        margin-bottom: 0.3em;
      }
      :host([label]) .label { display: flex; justify-content: space-between; align-items: center; }
      .req { color: var(--ui-red-500, #ef4444); margin-left: 0.15em; }



      .slider-wrap {
        display: flex;
        align-items: center;
        gap: 0.75em;
      }

      .slider {
        -webkit-appearance: none;
        appearance: none;
        flex: 1;
        height: 0.35em;
        border-radius: 9999px;
        background: var(--ui-border-color, #d1d5db);
        outline: none;
        cursor: pointer;
      }

      .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 1.15em;
        height: 1.15em;
        border-radius: 50%;
        background: var(--_accent, var(--ui-indigo-500, #6366f1));
        cursor: pointer;
        border: 2px solid #fff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        transition: box-shadow 0.15s ease;
      }
      .slider::-moz-range-thumb {
        width: 1.15em;
        height: 1.15em;
        border-radius: 50%;
        background: var(--_accent, var(--ui-indigo-500, #6366f1));
        cursor: pointer;
        border: 2px solid #fff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      }

      .slider:focus::-webkit-slider-thumb {
        box-shadow: 0 0 0 0.2em var(--_focus-ring, rgba(99, 102, 241, 0.25));
      }
      .slider:focus::-moz-range-thumb {
        box-shadow: 0 0 0 0.2em var(--_focus-ring, rgba(99, 102, 241, 0.25));
      }

      .val-display {
        display: none;
        min-width: 2.5em;
        text-align: center;
        font-variant-numeric: tabular-nums;
        font-size: 0.9em;
        color: var(--ui-text-color, #374151);
      }
      :host([showvalue]) .val-display { display: block; }

      .help, .error-msg { display: none; font-size: 0.8em; margin-top: 0.3em; }
      .help { color: var(--ui-text-muted, #6b7280); }
      .error-msg { color: var(--ui-red-500, #ef4444); }
      :host([help]) .help       { display: block; }
      :host([error]) .error-msg { display: block; }
      :host([error]) .help      { display: none; }
    `;
  }

  constructor() {
    super();
    this._onInput  = this._onInput.bind(this);
    this._onChange  = this._onChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._attachListeners();
  }

  render() {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    return `
      <div class="label" part="label">
        <span>${esc(this.label)}<span class="req">${this.required ? ' *' : ''}</span></span>
      </div>
      <div class="slider-wrap">
        <input class="slider" part="slider" type="range"
               min="${this.min}" max="${this.max}" step="${this.step}" value="${this.value}"
               ${this.disabled ? 'disabled' : ''}
               ${this.name ? `name="${esc(this.name)}"` : ''}
               aria-valuemin="${this.min}" aria-valuemax="${this.max}" aria-valuenow="${this.value}"
               ${this.label ? `aria-label="${esc(this.label)}"` : ''} />
        <span class="val-display" part="value">${this.value}</span>
      </div>
      <div class="help" part="help">${esc(this.help)}</div>
      <div class="error-msg" part="error">${esc(this.error)}</div>
    `;
  }

  _attachListeners() {
    const slider = this.shadowRoot.querySelector('.slider');
    if (!slider) return;
    slider.addEventListener('input',  this._onInput);
    slider.addEventListener('change', this._onChange);
  }

  _update() {
    this._applyStyles();
    super._update();
    this._attachListeners();
    this._syncSlider();
  }

  _syncSlider() {
    const slider = this.shadowRoot.querySelector('.slider');
    if (slider && Number(slider.value) !== this.value) slider.value = this.value;
  }

  _applyStyles() {
    const vars = {};
    const sz = resolveSize(this.size);
    if (sz) vars['font-size'] = sz;
    if (this.background) {
      const c = resolveColor(this.background);
      if (c) vars['--_accent'] = c;
    }
    this._setDynamicVars(vars);
  }

  _onInput(e) {
    const v = Number(e.target.value);
    this._value = v;
    // Update display without full re-render
    const valDisplay = this.shadowRoot.querySelector('.val-display');
    if (valDisplay) valDisplay.textContent = v;
    this.emit('ui-input', { value: v });
  }

  _onChange(e) {
    this.value = Number(e.target.value);
    this.emit('ui-change', { value: this.value });
  }
}

customElements.define('ui-input-slider', UIInputSlider);
