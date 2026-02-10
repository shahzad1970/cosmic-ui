import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-input-checkbox>` — Checkbox with built-in label.
 *
 * @element ui-input-checkbox
 *
 * @attr {Boolean} checked       - Whether the checkbox is checked
 * @attr {Boolean} indeterminate - Indeterminate / partial state
 * @attr {String}  value         - Form value when checked
 * @attr {String}  name          - Form field name
 * @attr {String}  label         - Label text next to the checkbox
 * @attr {String}  help          - Help text shown below
 * @attr {String}  error         - Error message
 * @attr {String}  size          - Size keyword or CSS length
 * @attr {String}  background    - Check colour (palette token or CSS)
 * @attr {Boolean} disabled      - Disables the checkbox
 * @attr {Boolean} required      - Marks as required
 *
 * @fires ui-change - When checked state changes (detail: { checked, value })
 */
export class UIInputCheckbox extends UIComponent {

  static properties = {
    checked:       { type: Boolean, default: false, reflect: true },
    indeterminate: { type: Boolean, default: false, reflect: true },
    value:         { type: String,  default: '',    reflect: true },
    name:          { type: String,  default: '',    reflect: true },
    label:         { type: String,  default: '',    reflect: true },
    help:          { type: String,  default: '',    reflect: true },
    error:         { type: String,  default: '',    reflect: true },
    size:          { type: String,  default: '',    reflect: true },
    background:    { type: String,  default: '',    reflect: true },
    disabled:      { type: Boolean, default: false, reflect: true },
    required:      { type: Boolean, default: false, reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: inline-block;
        line-height: 1.5;
        cursor: pointer;
      }
      :host([disabled]) { opacity: 0.5; pointer-events: none; }

      .container {
        display: flex;
        align-items: center;
        gap: 0.5em;
        cursor: pointer;
      }

      .box {
        flex-shrink: 0;
        width: 0.95em;
        height: 0.95em;
        border: 0.12em solid var(--ui-border-color, #9ca3af);
        border-radius: 0.2em;
        background: var(--ui-bg, #fff);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.15s ease, border-color 0.15s ease;
        position: relative;
        overflow: hidden;
        line-height: 0;
      }

      :host([checked]) .box,
      :host([indeterminate]) .box {
        background: var(--_accent, var(--ui-indigo-500, #6366f1));
        border-color: var(--_accent, var(--ui-indigo-500, #6366f1));
      }

      .box svg {
        width: 0.62em;
        height: 0.62em;
        fill: none;
        stroke: #fff;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
        opacity: 0;
        display: block;
        position: absolute;
        inset: 0;
        margin: auto;
        pointer-events: none;
      }
      :host([checked]) .box .check       { opacity: 1; }
      :host([indeterminate]) .box .dash   { opacity: 1; }
      :host([indeterminate]) .box .check  { opacity: 0; }

      .container:hover .box {
        border-color: var(--_accent, var(--ui-indigo-500, #6366f1));
      }

      .container:focus-within .box {
        box-shadow: 0 0 0 0.15em var(--_focus-ring, rgba(99, 102, 241, 0.25));
      }

      .hidden-input {
        position: absolute;
        width: 1px; height: 1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;
        padding: 0;
        margin: -1px;
      }

      .text { flex: 1; }
      .label-text {
        color: var(--ui-text-color, #374151);
        font-size: 1em;
      }
      .req { color: var(--ui-red-500, #ef4444); margin-left: 0.15em; }

      .help, .error-msg { display: none; font-size: 0.8em; margin-top: 0.1em; }
      .help { color: var(--ui-text-muted, #6b7280); }
      .error-msg { color: var(--ui-red-500, #ef4444); }
      :host([help]) .help       { display: block; }
      :host([error]) .error-msg { display: block; }
      :host([error]) .help      { display: none; }
      :host([error]) .box { border-color: var(--ui-red-500, #ef4444); }
    `;
  }

  constructor() {
    super();
    this._onClick   = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'checkbox');
    this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0');
    this.addEventListener('click',   this._onClick);
    this.addEventListener('keydown', this._onKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click',   this._onClick);
    this.removeEventListener('keydown', this._onKeyDown);
  }

  render() {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    return `
      <label class="container" part="container">
        <span class="box" part="box">
          <svg class="check" viewBox="0 0 24 24"><polyline points="4 12 10 18 20 6"/></svg>
          <svg class="dash" viewBox="0 0 24 24"><line x1="6" y1="12" x2="18" y2="12"/></svg>
        </span>
        <span class="text">
          <span class="label-text">${esc(this.label)}<span class="req">${this.required ? ' *' : ''}</span></span>
          <div class="help" part="help">${esc(this.help)}</div>
          <div class="error-msg" part="error">${esc(this.error)}</div>
        </span>
      </label>
    `;
  }

  _update() {
    this._applyStyles();
    super._update();
    this.setAttribute('aria-checked', this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false');
  }

  /** Resolve size + accent colour and push dynamic CSS vars in one call. */
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

  _toggle() {
    if (this.disabled) return;
    this.indeterminate = false;
    this.checked = !this.checked;
    this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
    this.emit('ui-change', { checked: this.checked, value: this.value });
  }

  _onClick(e) {
    e.preventDefault();
    this._toggle();
  }

  _onKeyDown(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._toggle();
    }
  }
}

customElements.define('ui-input-checkbox', UIInputCheckbox);
