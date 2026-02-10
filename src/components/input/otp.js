import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';


/**
 * `<ui-input-otp>` — OTP / verification code input with separate digit boxes.
 *
 * @element ui-input-otp
 *
 * @attr {Number}  length     - Number of digit boxes (default 6)
 * @attr {String}  value      - Current OTP value string
 * @attr {String}  name       - Form field name
 * @attr {String}  label      - Label text
 * @attr {String}  help       - Help text
 * @attr {String}  error      - Error message
 * @attr {String}  size       - Size keyword or CSS length
 * @attr {String}  background - Background colour
 * @attr {Boolean} disabled   - Disables input
 * @attr {Boolean} required   - Marks as required
 * @attr {Boolean} masked     - Masks input as dots (password style)
 *
 * @fires ui-input    - On every character change (detail: { value })
 * @fires ui-complete - When all digits filled (detail: { value })
 */
export class UIInputOTP extends UIComponent {

  static properties = {
    length:     { type: Number,  default: 6,     reflect: true },
    value:      { type: String,  default: '',    reflect: true },
    name:       { type: String,  default: '',    reflect: true },
    label:      { type: String,  default: '',    reflect: true },
    help:       { type: String,  default: '',    reflect: true },
    error:      { type: String,  default: '',    reflect: true },
    size:       { type: String,  default: '',    reflect: true },
    background: { type: String,  default: '',    reflect: true },
    disabled:   { type: Boolean, default: false, reflect: true },
    required:   { type: Boolean, default: false, reflect: true },
    masked:     { type: Boolean, default: false, reflect: true },
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

      .boxes {
        display: inline-flex;
        gap: 0.4em;
      }

      .box {
        width: 2.4em; height: 2.8em;
        text-align: center;
        border: 1.5px solid var(--_border, var(--ui-border-color, #d1d5db));
        border-radius: var(--ui-radius, 0.375em);
        background: var(--_bg, var(--ui-bg, #fff));
        color: var(--ui-text-color, #111827);
        font-family: var(--ui-font-mono, monospace);
        font-size: 1.2em;
        font-weight: 600;
        outline: none;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
        caret-color: var(--ui-focus-ring, #6366f1);
      }
      .box:focus {
        border-color: var(--ui-focus-ring, #6366f1);
        box-shadow: 0 0 0 0.15em rgba(99, 102, 241, 0.25);
      }
      :host([error]) .box { border-color: var(--ui-red-500, #ef4444); }
      :host([error]) .box:focus { box-shadow: 0 0 0 0.15em rgba(239, 68, 68, 0.25); }

      .box[data-filled] {
        border-color: var(--ui-focus-ring, #6366f1);
      }

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
    this._onInput   = this._onInput.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onPaste   = this._onPaste.bind(this);
    this._onFocus   = this._onFocus.bind(this);
  }

  render() {
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const chars = this.value.split('');
    let boxes = '';
    for (let i = 0; i < this.length; i++) {
      const char = chars[i] || '';
      const filled = char ? 'data-filled' : '';
      const inputType = this.masked ? 'password' : 'text';
      boxes += `<input class="box" type="${inputType}" maxlength="1" value="${char}"
                  data-index="${i}" ${filled}
                  inputmode="numeric" pattern="[0-9]*" autocomplete="one-time-code"
                  ${this.disabled ? 'disabled' : ''}
                  aria-label="Digit ${i + 1} of ${this.length}" />`;
    }
    return `
      <div class="label" part="label">
        ${esc(this.label)}<span class="req">${this.required ? ' *' : ''}</span>
      </div>
      <div class="boxes" part="boxes" role="group" aria-label="${esc(this.label || 'OTP input')}">${boxes}</div>
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
    this._setDynamicVars(vars);
  }

  _attachListeners() {
    this.shadowRoot.querySelectorAll('.box').forEach(box => {
      box.addEventListener('input',   this._onInput);
      box.addEventListener('keydown', this._onKeyDown);
      box.addEventListener('paste',   this._onPaste);
      box.addEventListener('focus',   this._onFocus);
    });
  }

  _getBoxes() {
    return Array.from(this.shadowRoot.querySelectorAll('.box'));
  }

  _collectValue() {
    return this._getBoxes().map(b => b.value).join('');
  }

  _onInput(e) {
    const box = e.target;
    const idx = Number(box.getAttribute('data-index'));
    // Allow only single digit/char
    if (box.value.length > 1) box.value = box.value.slice(-1);
    // Mark filled
    if (box.value) box.setAttribute('data-filled', '');
    else box.removeAttribute('data-filled');

    this.value = this._collectValue();
    this.emit('ui-input', { value: this.value });

    // Auto-advance
    if (box.value && idx < this.length - 1) {
      this._getBoxes()[idx + 1]?.focus();
    }

    // Check complete
    if (this.value.length === this.length) {
      this.emit('ui-complete', { value: this.value });
    }
  }

  _onKeyDown(e) {
    const box = e.target;
    const idx = Number(box.getAttribute('data-index'));
    const boxes = this._getBoxes();

    if (e.key === 'Backspace') {
      if (!box.value && idx > 0) {
        boxes[idx - 1].value = '';
        boxes[idx - 1].removeAttribute('data-filled');
        boxes[idx - 1].focus();
        this.value = this._collectValue();
        this.emit('ui-input', { value: this.value });
        e.preventDefault();
      }
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      boxes[idx - 1].focus();
      e.preventDefault();
    } else if (e.key === 'ArrowRight' && idx < this.length - 1) {
      boxes[idx + 1].focus();
      e.preventDefault();
    }
  }

  _onPaste(e) {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text').trim();
    const chars = text.replace(/\D/g, '').slice(0, this.length).split('');
    const boxes = this._getBoxes();
    chars.forEach((ch, i) => {
      if (boxes[i]) {
        boxes[i].value = ch;
        if (ch) boxes[i].setAttribute('data-filled', '');
      }
    });
    this.value = this._collectValue();
    this.emit('ui-input', { value: this.value });

    // Focus appropriate box
    const nextIdx = Math.min(chars.length, this.length - 1);
    boxes[nextIdx]?.focus();

    if (this.value.length === this.length) {
      this.emit('ui-complete', { value: this.value });
    }
  }

  _onFocus(e) {
    e.target.select();
  }

  focus() { this._getBoxes()[0]?.focus(); }
  blur()  { this.shadowRoot?.activeElement?.blur(); }
}

customElements.define('ui-input-otp', UIInputOTP);
