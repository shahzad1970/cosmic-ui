import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-input-textarea>` — Multi-line text input.
 *
 * Same label/help/error API as `<ui-input>` with auto-resize support.
 *
 * @element ui-input-textarea
 *
 * @attr {String}  value       - Current value
 * @attr {String}  placeholder - Placeholder text
 * @attr {String}  name        - Form field name
 * @attr {String}  label       - Label text shown above the textarea
 * @attr {String}  help        - Help text shown below
 * @attr {String}  error       - Error message (triggers error visual state)
 * @attr {String}  size        - Size keyword or CSS length
 * @attr {String}  background  - Background colour
 * @attr {String}  color       - Text colour
 * @attr {Number}  rows        - Visible row count (default 3)
 * @attr {Number}  minlength   - Minimum character length
 * @attr {Number}  maxlength   - Maximum character length
 * @attr {Boolean} disabled    - Disables the textarea
 * @attr {Boolean} readonly    - Read-only
 * @attr {Boolean} required    - Marks as required
 * @attr {Boolean} autoresize  - Auto-grow to fit content
 *
 * @fires ui-input  - On every keystroke (detail: { value })
 * @fires ui-change - On blur/commit     (detail: { value })
 * @fires ui-focus  - On focus
 * @fires ui-blur   - On blur
 */
export class UIInputTextarea extends UIComponent {

  static properties = {
    value:       { type: String,  default: '',    reflect: true },
    placeholder: { type: String,  default: '',    reflect: true },
    name:        { type: String,  default: '',    reflect: true },
    label:       { type: String,  default: '',    reflect: true },
    help:        { type: String,  default: '',    reflect: true },
    error:       { type: String,  default: '',    reflect: true },
    size:        { type: String,  default: '',    reflect: true },
    background:  { type: String,  default: '',    reflect: true },
    color:       { type: String,  default: '',    reflect: true },
    rows:        { type: Number,  default: 3,     reflect: true },
    minlength:   { type: Number,  default: 0,     reflect: true },
    maxlength:   { type: Number,  default: 0,     reflect: true },
    disabled:    { type: Boolean, default: false, reflect: true },
    readonly:    { type: Boolean, default: false, reflect: true },
    required:    { type: Boolean, default: false, reflect: true },
    autoresize:  { type: Boolean, default: false, reflect: true },
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
      .label .req { color: var(--ui-red-500, #ef4444); margin-left: 0.15em; }

      .textarea {
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding: 0.5em 0.65em;
        border: 1px solid var(--_border, var(--ui-border-color, #d1d5db));
        border-radius: var(--ui-radius, 0.375em);
        background: var(--_bg, var(--ui-bg, #fff));
        color: var(--_color, var(--ui-text-color, #111827));
        font-family: inherit;
        font-size: inherit;
        line-height: 1.5;
        resize: vertical;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      :host([autoresize]) .textarea { resize: none; overflow: hidden; }
      .textarea:hover { border-color: var(--_border-hover, #9ca3af); }
      .textarea:focus {
        outline: none;
        border-color: var(--_focus-border, var(--ui-focus-ring, #6366f1));
        box-shadow: 0 0 0 0.15em var(--_focus-ring, rgba(99, 102, 241, 0.25));
      }
      .textarea::placeholder { color: var(--ui-text-muted, #9ca3af); }

      :host([error]) .textarea { border-color: var(--ui-red-500, #ef4444); }
      :host([error]) .textarea:focus {
        border-color: var(--ui-red-500, #ef4444);
        box-shadow: 0 0 0 0.15em rgba(239, 68, 68, 0.25);
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
    this._onInput  = this._onInput.bind(this);
    this._onChange  = this._onChange.bind(this);
    this._onFocus  = this._onFocus.bind(this);
    this._onBlur   = this._onBlur.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._attachListeners();
  }

  render() {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const attrs = [];
    attrs.push('class="textarea"');
    attrs.push('part="textarea"');
    if (this.placeholder) attrs.push(`placeholder="${esc(this.placeholder)}"`);
    if (this.name)        attrs.push(`name="${esc(this.name)}"`);
    if (this.rows)        attrs.push(`rows="${this.rows}"`);
    if (this.disabled)    attrs.push('disabled');
    if (this.readonly)    attrs.push('readonly');
    if (this.required)    attrs.push('required');
    if (this.minlength)   attrs.push(`minlength="${this.minlength}"`);
    if (this.maxlength)   attrs.push(`maxlength="${this.maxlength}"`);
    if (this.error)       attrs.push('aria-invalid="true"');
    if (this.label)       attrs.push(`aria-label="${esc(this.label)}"`);

    return `
      <label class="label" part="label">
        ${esc(this.label)}<span class="req" aria-hidden="true">${this.required ? ' *' : ''}</span>
      </label>
      <textarea ${attrs.join(' ')}>${esc(this.value)}</textarea>
      <div class="help" part="help">${esc(this.help)}</div>
      <div class="error-msg" part="error">${esc(this.error)}</div>
    `;
  }

  _attachListeners() {
    const ta = this.shadowRoot.querySelector('.textarea');
    if (!ta) return;
    ta.addEventListener('input',  this._onInput);
    ta.addEventListener('change', this._onChange);
    ta.addEventListener('focus',  this._onFocus);
    ta.addEventListener('blur',   this._onBlur);
  }

  _update() {
    this._applyStyles();
    super._update();
    this._attachListeners();
    this._syncValue();
  }

  _syncValue() {
    const ta = this.shadowRoot.querySelector('.textarea');
    if (ta && ta.value !== this.value) ta.value = this.value;
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

  _autoResize() {
    if (!this.autoresize) return;
    const ta = this.shadowRoot.querySelector('.textarea');
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  }

  _onInput(e) {
    this.value = e.target.value;
    this._autoResize();
    this.emit('ui-input', { value: this.value });
  }

  _onChange(e) {
    this.value = e.target.value;
    this.emit('ui-change', { value: this.value });
  }

  _onFocus() { this.emit('ui-focus'); }
  _onBlur()  { this.emit('ui-blur'); }

  focus() { this.shadowRoot?.querySelector('.textarea')?.focus(); }
  blur()  { this.shadowRoot?.querySelector('.textarea')?.blur(); }
  selectAll() { this.shadowRoot?.querySelector('.textarea')?.select(); }
}

customElements.define('ui-input-textarea', UIInputTextarea);
