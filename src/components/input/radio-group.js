import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-input-radio-group>` — Groups `<ui-input-radio>` elements for single-selection.
 *
 * @element ui-input-radio-group
 *
 * @attr {String}  value      - Currently selected value
 * @attr {String}  name       - Form field name
 * @attr {String}  label      - Group label
 * @attr {String}  help       - Help text
 * @attr {String}  error      - Error message
 * @attr {String}  size       - Size keyword or CSS length
 * @attr {String}  background - Accent colour for radio dots
 * @attr {Boolean} disabled   - Disables all radios
 * @attr {Boolean} required   - Marks as required
 *
 * @fires ui-change - When selection changes (detail: { value })
 */
export class UIInputRadioGroup extends UIComponent {

  static properties = {
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

      .radios {
        display: flex;
        flex-direction: column;
        gap: 0.2em;
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
    this._onRadioSelect = this._onRadioSelect.bind(this);
    this._onRadioNav    = this._onRadioNav.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'radiogroup');
    this.addEventListener('ui-radio-select', this._onRadioSelect);
    this.addEventListener('ui-radio-nav',    this._onRadioNav);
    // Sync initial value once children are parsed
    requestAnimationFrame(() => this._syncChildren());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('ui-radio-select', this._onRadioSelect);
    this.removeEventListener('ui-radio-nav',    this._onRadioNav);
  }

  render() {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    return `
      <div class="label" part="label">
        ${esc(this.label)}<span class="req">${this.required ? ' *' : ''}</span>
      </div>
      <div class="radios" part="radios">
        <slot></slot>
      </div>
      <div class="help" part="help">${esc(this.help)}</div>
      <div class="error-msg" part="error">${esc(this.error)}</div>
    `;
  }

  _update() {
    this._applySize();
    super._update();
    this._syncChildren();
  }

  _applySize() {
    const vars = {};
    const sz = resolveSize(this.size);
    if (sz) vars['font-size'] = sz;
    this._setDynamicVars(vars);
  }

  get _radios() {
    return [...this.querySelectorAll('ui-input-radio')];
  }

  _syncChildren() {
    const radios = this._radios;
    const accentColor = this.background ? resolveColor(this.background) : '';
    radios.forEach(r => {
      r.checked = r.value === this.value;
      if (this.disabled) r.disabled = true;
      if (accentColor) r._setDynamicVars({ '--_accent': accentColor });
    });
  }

  _onRadioSelect(e) {
    e.stopPropagation();
    const newVal = e.detail.value;
    if (newVal === this.value) return;
    this.value = newVal;
    this._syncChildren();
    this.emit('ui-change', { value: this.value });
  }

  _onRadioNav(e) {
    e.stopPropagation();
    const radios = this._radios.filter(r => !r.disabled);
    if (!radios.length) return;
    const idx = radios.findIndex(r => r.checked);
    let next;
    if (e.detail.key === 'ArrowDown' || e.detail.key === 'ArrowRight') {
      next = idx < radios.length - 1 ? idx + 1 : 0;
    } else {
      next = idx > 0 ? idx - 1 : radios.length - 1;
    }
    this.value = radios[next].value;
    this._syncChildren();
    radios[next].focus();
    this.emit('ui-change', { value: this.value });
  }
}

customElements.define('ui-input-radio-group', UIInputRadioGroup);
