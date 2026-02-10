import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-input-switch>` — Toggle on/off switch.
 *
 * @element ui-input-switch
 *
 * @attr {Boolean} checked    - Whether the switch is on
 * @attr {String}  value      - Form value when on
 * @attr {String}  name       - Form field name
 * @attr {String}  label      - Label text next to the switch
 * @attr {String}  help       - Help text
 * @attr {String}  error      - Error message
 * @attr {String}  size       - Size keyword or CSS length
 * @attr {String}  background - Accent colour when on
 * @attr {Boolean} disabled   - Disables the switch
 * @attr {Boolean} required   - Marks as required
 *
 * @fires ui-change - When toggled (detail: { checked, value })
 */
export class UIInputSwitch extends UIComponent {

  static properties = {
    checked:    { type: Boolean, default: false, reflect: true },
    value:      { type: String,  default: '',    reflect: true },
    name:       { type: String,  default: '',    reflect: true },
    label:      { type: String,  default: '',    reflect: true },
    help:       { type: String,  default: '',    reflect: true },
    error:      { type: String,  default: '',    reflect: true },
    size:       { type: String,  default: '',    reflect: true },
    background: { type: String,  default: '',    reflect: true },
    disabled:   { type: Boolean, default: false, reflect: true },
    required:   { type: Boolean, default: false, reflect: true },
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
        gap: 0.6em;
        cursor: pointer;
      }

      .track {
        position: relative;
        flex-shrink: 0;
        width: 2.5em;
        height: 1.4em;
        border-radius: 9999px;
        background: var(--ui-border-color, #d1d5db);
        transition: background-color 0.2s ease;
      }
      :host([checked]) .track {
        background: var(--_accent, var(--ui-indigo-500, #6366f1));
      }

      .thumb {
        position: absolute;
        top: 0.15em;
        left: 0.15em;
        width: 1.1em;
        height: 1.1em;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        transition: transform 0.2s ease;
      }
      :host([checked]) .thumb {
        transform: translateX(1.1em);
      }

      .container:focus-within .track {
        box-shadow: 0 0 0 0.15em var(--_focus-ring, rgba(99, 102, 241, 0.25));
      }

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
    `;
  }

  constructor() {
    super();
    this._onClick   = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'switch');
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
        <span class="track" part="track">
          <span class="thumb" part="thumb"></span>
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
    this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
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

customElements.define('ui-input-switch', UIInputSwitch);
