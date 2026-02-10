import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-input>` — A rich, accessible text input component.
 *
 * Wraps a native `<input>` inside Shadow DOM with built-in label, help text,
 * error messages, prefix/suffix content, clearable, and password-toggle.
 *
 * @element ui-input
 *
 * @attr {String}  type        - Input type: text, password, email, number, tel, url, search, date, time, datetime-local, month, week, color
 * @attr {String}  value       - Current value
 * @attr {String}  placeholder - Placeholder text
 * @attr {String}  name        - Form field name
 * @attr {String}  label       - Label text shown above the input
 * @attr {String}  help        - Help text shown below the input
 * @attr {String}  error       - Error message (also triggers error visual state)
 * @attr {String}  prefix      - Text or symbol displayed before the input
 * @attr {String}  suffix      - Text or symbol displayed after the input
 * @attr {String}  size        - Size keyword or CSS length
 * @attr {String}  background  - Background colour (palette token or CSS)
 * @attr {String}  color       - Text colour (palette token or CSS)
 * @attr {Boolean} disabled    - Disables the input
 * @attr {Boolean} readonly    - Makes the input read-only
 * @attr {Boolean} required    - Marks as required (adds indicator to label)
 * @attr {Boolean} clearable   - Shows a clear ✕ button when the input has a value
 * @attr {Boolean} toggleable  - Shows a show/hide toggle for password inputs
 * @attr {String}  pattern     - Validation regex pattern
 * @attr {Number}  minlength   - Minimum character length
 * @attr {Number}  maxlength   - Maximum character length
 * @attr {Number}  min         - Minimum value (for number/date types)
 * @attr {Number}  max         - Maximum value (for number/date types)
 * @attr {Number}  step        - Step increment (for number/date types)
 * @attr {String}  autocomplete - Browser autocomplete hint
 *
 * @slot (default) - Optional content placed inside the input wrapper (e.g. icons, buttons).
 *
 * @fires ui-input  - Emitted on every keystroke (detail: { value })
 * @fires ui-change - Emitted on blur/commit     (detail: { value })
 * @fires ui-clear  - Emitted when cleared via the clear button
 * @fires ui-focus  - Emitted when the input gains focus
 * @fires ui-blur   - Emitted when the input loses focus
 *
 * @example
 *   <ui-input label="Email" type="email" placeholder="you@example.com" required></ui-input>
 *   <ui-input label="Password" type="password" toggleable></ui-input>
 *   <ui-input label="Amount" prefix="$" suffix=".00" type="number"></ui-input>
 *   <ui-input label="Search" type="search" clearable placeholder="Search…"></ui-input>
 *   <ui-input label="Username" error="Already taken" value="john"></ui-input>
 */
export class UIInput extends UIComponent {

  static properties = {
    type:         { type: String,  default: 'text',  reflect: true },
    value:        { type: String,  default: '',      reflect: true },
    placeholder:  { type: String,  default: '',      reflect: true },
    name:         { type: String,  default: '',      reflect: true },
    label:        { type: String,  default: '',      reflect: true },
    help:         { type: String,  default: '',      reflect: true },
    error:        { type: String,  default: '',      reflect: true },
    prefix:       { type: String,  default: '',      reflect: true },
    suffix:       { type: String,  default: '',      reflect: true },
    size:         { type: String,  default: '',      reflect: true },
    background:   { type: String,  default: '',      reflect: true },
    color:        { type: String,  default: '',      reflect: true },
    disabled:     { type: Boolean, default: false,   reflect: true },
    readonly:     { type: Boolean, default: false,   reflect: true },
    required:     { type: Boolean, default: false,   reflect: true },
    clearable:    { type: Boolean, default: false,   reflect: true },
    toggleable:   { type: Boolean, default: false,   reflect: true },
    pattern:      { type: String,  default: '',      reflect: true },
    minlength:    { type: Number,  default: 0,       reflect: true },
    maxlength:    { type: Number,  default: 0,       reflect: true },
    min:          { type: Number,  default: 0,       reflect: true },
    max:          { type: Number,  default: 0,       reflect: true },
    step:         { type: Number,  default: 0,       reflect: true },
    autocomplete: { type: String,  default: '',      reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        line-height: 1.5;
      }

      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }

      /* ── Label ─────────────────────────────────────────── */
      .label {
        display: none;
        font-size: 0.875em;
        font-weight: 600;
        color: var(--ui-text-color, #374151);
        margin-bottom: 0.3em;
      }
      :host([label]) .label { display: block; }

      .label .required-mark {
        color: var(--ui-red-500, #ef4444);
        margin-left: 0.15em;
      }

      /* ── Input wrapper ─────────────────────────────────── */
      .wrapper {
        display: flex;
        align-items: center;
        gap: 0.4em;
        width: 100%;
        box-sizing: border-box;
        padding: 0.5em 0.65em;
        border: 1px solid var(--_border, var(--ui-border-color, #d1d5db));
        border-radius: var(--ui-radius, 0.375em);
        background: var(--_bg, var(--ui-bg, #fff));
        color: var(--_color, var(--ui-text-color, #111827));
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
        cursor: text;
      }

      .wrapper:hover {
        border-color: var(--_border-hover, #9ca3af);
      }

      .wrapper.focused {
        border-color: var(--_focus-border, var(--ui-focus-ring, #6366f1));
        box-shadow: 0 0 0 0.15em var(--_focus-ring, rgba(99, 102, 241, 0.25));
      }

      /* Error state */
      :host([error]) .wrapper {
        border-color: var(--ui-red-500, #ef4444);
      }
      :host([error]) .wrapper.focused {
        border-color: var(--ui-red-500, #ef4444);
        box-shadow: 0 0 0 0.15em rgba(239, 68, 68, 0.25);
      }

      /* ── Native input ──────────────────────────────────── */
      .input {
        all: unset;
        flex: 1;
        min-width: 0;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        line-height: 1.5;
      }

      .input::placeholder {
        color: var(--ui-text-muted, #9ca3af);
      }

      /* Hide native spin buttons on number inputs */
      .input[type="number"]::-webkit-inner-spin-button,
      .input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      .input[type="number"] { -moz-appearance: textfield; }

      /* Hide native search cancel */
      .input[type="search"]::-webkit-search-cancel-button {
        -webkit-appearance: none;
      }

      /* ── Prefix / Suffix ───────────────────────────────── */
      .prefix, .suffix {
        flex-shrink: 0;
        color: var(--ui-text-muted, #9ca3af);
        font-size: 0.9em;
        line-height: 1;
        display: none;
        user-select: none;
      }
      :host([prefix]) .prefix { display: flex; align-items: center; }
      :host([suffix]) .suffix { display: flex; align-items: center; }

      /* ── Action buttons (clear, toggle) ────────────────── */
      .action-btn {
        all: unset;
        display: none;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 1.25em;
        height: 1.25em;
        cursor: pointer;
        color: var(--ui-text-muted, #9ca3af);
        border-radius: 50%;
        transition: color 0.15s ease, background-color 0.15s ease;
      }
      .action-btn:hover {
        color: var(--ui-text-color, #374151);
        background: var(--ui-bg-subtle, rgba(0, 0, 0, 0.06));
      }
      .action-btn svg {
        width: 0.85em;
        height: 0.85em;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      :host([clearable]) .clear-btn.has-value { display: inline-flex; }
      :host([toggleable]) .toggle-btn         { display: inline-flex; }

      /* ── Help / Error text ─────────────────────────────── */
      .help, .error-msg {
        display: none;
        font-size: 0.8em;
        margin-top: 0.3em;
      }
      .help {
        color: var(--ui-text-muted, #6b7280);
      }
      .error-msg {
        color: var(--ui-red-500, #ef4444);
      }
      :host([help]) .help       { display: block; }
      :host([error]) .error-msg { display: block; }
      :host([error]) .help      { display: none;  }

      /* ── Slotted content ───────────────────────────────── */
      ::slotted(*) {
        flex-shrink: 0;
      }
    `;
  }

  /* ------------------------------------------------------------------ */
  /*  Lifecycle                                                          */
  /* ------------------------------------------------------------------ */

  constructor() {
    super();
    this._passwordVisible = false;
    this._onInput      = this._onInput.bind(this);
    this._onChange      = this._onChange.bind(this);
    this._onFocus      = this._onFocus.bind(this);
    this._onBlur       = this._onBlur.bind(this);
    this._onClear      = this._onClear.bind(this);
    this._onToggle     = this._onToggle.bind(this);
    this._onWrapperClick = this._onWrapperClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._attachListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */

  render() {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

    // Determine input type (toggle password visibility)
    const inputType = (this.type === 'password' && this._passwordVisible) ? 'text' : this.type;

    // Build native input attributes
    const attrs = [];
    attrs.push(`type="${esc(inputType)}"`);
    attrs.push('class="input"');
    attrs.push('part="input"');
    if (this.value)       attrs.push(`value="${esc(this.value)}"`);
    if (this.placeholder) attrs.push(`placeholder="${esc(this.placeholder)}"`);
    if (this.name)        attrs.push(`name="${esc(this.name)}"`);
    if (this.disabled)    attrs.push('disabled');
    if (this.readonly)    attrs.push('readonly');
    if (this.required)    attrs.push('required');
    if (this.pattern)     attrs.push(`pattern="${esc(this.pattern)}"`);
    if (this.minlength)   attrs.push(`minlength="${this.minlength}"`);
    if (this.maxlength)   attrs.push(`maxlength="${this.maxlength}"`);
    if (this.min)         attrs.push(`min="${this.min}"`);
    if (this.max)         attrs.push(`max="${this.max}"`);
    if (this.step)        attrs.push(`step="${this.step}"`);
    if (this.autocomplete) attrs.push(`autocomplete="${esc(this.autocomplete)}"`);
    if (this.error)       attrs.push('aria-invalid="true"');
    if (this.label)       attrs.push(`aria-label="${esc(this.label)}"`);

    const hasValue = this.value.length > 0;

    // SVG icons
    const clearIcon  = '<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    const eyeIcon    = '<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
    const eyeOffIcon = '<svg viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';

    return `
      <label class="label" part="label">
        ${esc(this.label)}<span class="required-mark" aria-hidden="true">${this.required ? ' *' : ''}</span>
      </label>
      <div class="wrapper" part="wrapper">
        <span class="prefix" part="prefix">${esc(this.prefix)}</span>
        <slot></slot>
        <input ${attrs.join(' ')} />
        <button type="button" class="clear-btn action-btn${hasValue ? ' has-value' : ''}" aria-label="Clear" tabindex="-1">
          ${clearIcon}
        </button>
        <button type="button" class="toggle-btn action-btn" aria-label="${this._passwordVisible ? 'Hide password' : 'Show password'}" tabindex="-1">
          ${this._passwordVisible ? eyeOffIcon : eyeIcon}
        </button>
        <span class="suffix" part="suffix">${esc(this.suffix)}</span>
      </div>
      <div class="help" part="help">${esc(this.help)}</div>
      <div class="error-msg" part="error">${esc(this.error)}</div>
    `;
  }

  /* ------------------------------------------------------------------ */
  /*  Internal wiring                                                    */
  /* ------------------------------------------------------------------ */

  _attachListeners() {
    const input   = this.shadowRoot.querySelector('.input');
    const wrapper = this.shadowRoot.querySelector('.wrapper');
    const clearBtn  = this.shadowRoot.querySelector('.clear-btn');
    const toggleBtn = this.shadowRoot.querySelector('.toggle-btn');

    if (input) {
      input.addEventListener('input',  this._onInput);
      input.addEventListener('change', this._onChange);
      input.addEventListener('focus',  this._onFocus);
      input.addEventListener('blur',   this._onBlur);
    }
    if (wrapper) {
      wrapper.addEventListener('click', this._onWrapperClick);
    }
    if (clearBtn) {
      clearBtn.addEventListener('click', this._onClear);
    }
    if (toggleBtn) {
      toggleBtn.addEventListener('click', this._onToggle);
    }
  }

  _update() {
    this._applyStyles();
    super._update();
    this._attachListeners();
    this._syncInputValue();
  }

  /** Keep the native input's value in sync (after re-render). */
  _syncInputValue() {
    const input = this.shadowRoot.querySelector('.input');
    if (input && input.value !== this.value) {
      input.value = this.value;
    }
  }

  /** Resolve size + colour props and push dynamic CSS vars in one call. */
  _applyStyles() {
    const vars = {};
    const sz = resolveSize(this.size);
    if (sz) vars['font-size'] = sz;
    if (this.background) {
      const bg = resolveColor(this.background);
      if (bg) vars['--_bg'] = bg;
    }
    if (this.color) {
      const c = resolveColor(this.color);
      if (c) vars['--_color'] = c;
    }
    this._setDynamicVars(vars);
  }

  /* ------------------------------------------------------------------ */
  /*  Event handlers                                                     */
  /* ------------------------------------------------------------------ */

  _onInput(e) {
    // Write to backing field directly to avoid a full re-render on every key.
    this._value = e.target.value;
    // Update clear button visibility
    const clearBtn = this.shadowRoot.querySelector('.clear-btn');
    if (clearBtn) {
      clearBtn.classList.toggle('has-value', this._value.length > 0);
    }
    this.emit('ui-input', { value: this._value });
  }

  _onChange(e) {
    // Commit via the public setter so the attribute reflects the final value.
    this.value = e.target.value;
    this.emit('ui-change', { value: this.value });
  }

  _onFocus() {
    const wrapper = this.shadowRoot.querySelector('.wrapper');
    if (wrapper) wrapper.classList.add('focused');
    this.emit('ui-focus');
  }

  _onBlur() {
    const wrapper = this.shadowRoot.querySelector('.wrapper');
    if (wrapper) wrapper.classList.remove('focused');
    this.emit('ui-blur');
  }

  _onClear(e) {
    e.stopPropagation();
    this.value = '';
    const input = this.shadowRoot.querySelector('.input');
    if (input) {
      input.value = '';
      input.focus();
    }
    const clearBtn = this.shadowRoot.querySelector('.clear-btn');
    if (clearBtn) clearBtn.classList.remove('has-value');
    this.emit('ui-clear');
    this.emit('ui-input', { value: '' });
  }

  _onToggle(e) {
    e.stopPropagation();
    this._passwordVisible = !this._passwordVisible;
    // Re-render to switch input type and icon, but preserve value
    const input = this.shadowRoot.querySelector('.input');
    const curVal = input ? input.value : this.value;
    this._update();
    const newInput = this.shadowRoot.querySelector('.input');
    if (newInput) {
      newInput.value = curVal;
      newInput.focus();
    }
  }

  _onWrapperClick() {
    const input = this.shadowRoot.querySelector('.input');
    if (input && !this.disabled && !this.readonly) {
      input.focus();
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Public API                                                         */
  /* ------------------------------------------------------------------ */

  /** Focus the native input. */
  focus() {
    const input = this.shadowRoot?.querySelector('.input');
    if (input) input.focus();
  }

  /** Blur the native input. */
  blur() {
    const input = this.shadowRoot?.querySelector('.input');
    if (input) input.blur();
  }

  /** Select all text in the input. */
  selectAll() {
    const input = this.shadowRoot?.querySelector('.input');
    if (input) input.select();
  }

  /** Clear the input value. */
  clear() {
    this.value = '';
    const input = this.shadowRoot?.querySelector('.input');
    if (input) input.value = '';
    const clearBtn = this.shadowRoot?.querySelector('.clear-btn');
    if (clearBtn) clearBtn.classList.remove('has-value');
    this.emit('ui-clear');
  }

  /** Check native validity. */
  checkValidity() {
    const input = this.shadowRoot?.querySelector('.input');
    return input ? input.checkValidity() : true;
  }

  /** Get the native input's validationMessage. */
  get validationMessage() {
    const input = this.shadowRoot?.querySelector('.input');
    return input ? input.validationMessage : '';
  }
}

customElements.define('ui-input', UIInput);
