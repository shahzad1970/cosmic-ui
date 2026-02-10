import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-input-number>` — Number stepper with +/− buttons.
 *
 * @element ui-input-number
 *
 * @attr {Number}  value       - Current value
 * @attr {Number}  min         - Minimum value
 * @attr {Number}  max         - Maximum value
 * @attr {Number}  step        - Step increment (default 1)
 * @attr {String}  placeholder - Placeholder text
 * @attr {String}  name        - Form field name
 * @attr {String}  label       - Label text
 * @attr {String}  help        - Help text
 * @attr {String}  error       - Error message
 * @attr {String}  size        - Size keyword or CSS length
 * @attr {String}  background  - Background colour
 * @attr {String}  color       - Text colour
 * @attr {Boolean} disabled    - Disables the input
 * @attr {Boolean} readonly    - Read-only
 * @attr {Boolean} required    - Marks as required
 *
 * @fires ui-input  - On every value change (detail: { value })
 * @fires ui-change - On blur / commit (detail: { value })
 */
export class UIInputNumber extends UIComponent {

  static properties = {
    value:       { type: Number,  default: 0,     reflect: true },
    min:         { type: Number,  default: -Infinity, reflect: true },
    max:         { type: Number,  default: Infinity,  reflect: true },
    step:        { type: Number,  default: 1,     reflect: true },
    placeholder: { type: String,  default: '',    reflect: true },
    name:        { type: String,  default: '',    reflect: true },
    label:       { type: String,  default: '',    reflect: true },
    help:        { type: String,  default: '',    reflect: true },
    error:       { type: String,  default: '',    reflect: true },
    size:        { type: String,  default: '',    reflect: true },
    background:  { type: String,  default: '',    reflect: true },
    color:       { type: String,  default: '',    reflect: true },
    disabled:    { type: Boolean, default: false, reflect: true },
    readonly:    { type: Boolean, default: false, reflect: true },
    required:    { type: Boolean, default: false, reflect: true },
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
      :host([label]) .label { display: block; }
      .req { color: var(--ui-red-500, #ef4444); margin-left: 0.15em; }

      .wrapper {
        display: flex;
        align-items: stretch;
        border: 1px solid var(--_border, var(--ui-border-color, #d1d5db));
        border-radius: var(--ui-radius, 0.375em);
        overflow: hidden;
        background: var(--_bg, var(--ui-bg, #fff));
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      .wrapper:hover { border-color: #9ca3af; }
      .wrapper:focus-within {
        border-color: var(--ui-focus-ring, #6366f1);
        box-shadow: 0 0 0 0.15em rgba(99, 102, 241, 0.25);
      }
      :host([error]) .wrapper { border-color: var(--ui-red-500, #ef4444); }
      :host([error]) .wrapper:focus-within { box-shadow: 0 0 0 0.15em rgba(239, 68, 68, 0.25); }

      .step-btn {
        display: flex; align-items: center; justify-content: center;
        width: 2.2em;
        background: var(--ui-bg-subtle, #f3f4f6);
        border: none;
        cursor: pointer;
        color: var(--ui-text-color, #374151);
        font-size: 1em;
        padding: 0;
        transition: background-color 0.1s ease;
        flex-shrink: 0;
        user-select: none;
      }
      .step-btn:hover { background: var(--ui-border-color, #e5e7eb); }
      .step-btn:active { background: var(--ui-border-color, #d1d5db); }
      .step-btn[data-disabled] { opacity: 0.3; pointer-events: none; }
      .step-btn svg {
        width: 0.85em; height: 0.85em;
        fill: none; stroke: currentColor;
        stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round;
      }

      .input {
        flex: 1;
        min-width: 0;
        text-align: center;
        border: none;
        outline: none;
        background: transparent;
        font-family: inherit;
        font-size: inherit;
        color: var(--_color, var(--ui-text-color, #111827));
        padding: 0.45em 0.35em;
        -moz-appearance: textfield;
      }
      .input::-webkit-inner-spin-button,
      .input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
      .input::placeholder { color: var(--ui-text-muted, #9ca3af); }

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
    this._onInputChange  = this._onInputChange.bind(this);
    this._onInputBlur    = this._onInputBlur.bind(this);
    this._onKeyDown      = this._onKeyDown.bind(this);
  }

  render() {
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const atMin = this.value <= this.min;
    const atMax = this.value >= this.max;
    return `
      <div class="label" part="label">
        ${esc(this.label)}<span class="req">${this.required ? ' *' : ''}</span>
      </div>
      <div class="wrapper" part="wrapper">
        <button type="button" class="step-btn decrement" part="decrement" aria-label="Decrease" ${atMin ? 'data-disabled' : ''}>
          <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <input class="input" part="input" type="number"
               value="${this.value}"
               ${this.placeholder ? `placeholder="${esc(this.placeholder)}"` : ''}
               ${this.name ? `name="${esc(this.name)}"` : ''}
               ${isFinite(this.min) ? `min="${this.min}"` : ''}
               ${isFinite(this.max) ? `max="${this.max}"` : ''}
               step="${this.step}"
               ${this.disabled ? 'disabled' : ''}
               ${this.readonly ? 'readonly' : ''}
               ${this.required ? 'required' : ''}
               ${this.error ? 'aria-invalid="true"' : ''}
               ${this.label ? `aria-label="${esc(this.label)}"` : ''} />
        <button type="button" class="step-btn increment" part="increment" aria-label="Increase" ${atMax ? 'data-disabled' : ''}>
          <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
      <div class="help" part="help">${esc(this.help)}</div>
      <div class="error-msg" part="error">${esc(this.error)}</div>
    `;
  }

  _update() {
    this._applyStyles();
    super._update();
    this._attachListeners();
  }

  _applyStyles() {
    const vars = {};
    const sz = resolveSize(this.size);
    if (sz) vars['font-size'] = sz;
    if (this.background) { const bg = resolveColor(this.background); if (bg) vars['--_bg'] = bg; }
    if (this.color)      { const c = resolveColor(this.color);       if (c)  vars['--_color'] = c; }
    this._setDynamicVars(vars);
  }

  _attachListeners() {
    const input = this.shadowRoot.querySelector('.input');
    const dec   = this.shadowRoot.querySelector('.decrement');
    const inc   = this.shadowRoot.querySelector('.increment');

    if (input) {
      input.addEventListener('input',   this._onInputChange);
      input.addEventListener('blur',    this._onInputBlur);
      input.addEventListener('keydown', this._onKeyDown);
    }
    if (dec) dec.addEventListener('click', (e) => { e.preventDefault(); this._step(-1); });
    if (inc) inc.addEventListener('click', (e) => { e.preventDefault(); this._step(1); });
  }

  _step(dir) {
    if (this.readonly) return;
    let v = this.value + (this.step * dir);
    v = this._clamp(v);
    // Round to step precision to avoid floating-point artifacts
    const decimals = (String(this.step).split('.')[1] || '').length;
    v = Number(v.toFixed(decimals));
    this.value = v;
    this._syncInput();
    this.emit('ui-input',  { value: v });
    this.emit('ui-change', { value: v });
  }

  _clamp(v) {
    if (isFinite(this.min) && v < this.min) v = this.min;
    if (isFinite(this.max) && v > this.max) v = this.max;
    return v;
  }

  _syncInput() {
    const input = this.shadowRoot.querySelector('.input');
    if (input && Number(input.value) !== this.value) input.value = this.value;
    // Update disabled states on buttons
    const dec = this.shadowRoot.querySelector('.decrement');
    const inc = this.shadowRoot.querySelector('.increment');
    if (dec) { if (this.value <= this.min) dec.setAttribute('data-disabled', ''); else dec.removeAttribute('data-disabled'); }
    if (inc) { if (this.value >= this.max) inc.setAttribute('data-disabled', ''); else inc.removeAttribute('data-disabled'); }
  }

  _onInputChange(e) {
    const raw = e.target.value;
    if (raw === '' || raw === '-') return;
    const v = this._clamp(Number(raw));
    this.emit('ui-input', { value: v });
  }

  _onInputBlur(e) {
    let v = Number(e.target.value);
    if (isNaN(v)) v = isFinite(this.min) ? this.min : 0;
    v = this._clamp(v);
    this.value = v;
    this._syncInput();
    this.emit('ui-change', { value: v });
  }

  _onKeyDown(e) {
    if (e.key === 'ArrowUp') { e.preventDefault(); this._step(1); }
    if (e.key === 'ArrowDown') { e.preventDefault(); this._step(-1); }
  }

  focus() { this.shadowRoot?.querySelector('.input')?.focus(); }
  blur()  { this.shadowRoot?.querySelector('.input')?.blur(); }
}

customElements.define('ui-input-number', UIInputNumber);
