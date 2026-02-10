import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-input-radio>` — Individual radio button.
 *
 * Must be used inside a `<ui-input-radio-group>`.
 *
 * @element ui-input-radio
 *
 * @attr {Boolean} checked  - Whether this radio is selected
 * @attr {String}  value    - Value for this option
 * @attr {String}  label    - Label text next to the radio
 * @attr {Boolean} disabled - Disables this radio
 */
export class UIInputRadio extends UIComponent {

  static properties = {
    checked:  { type: Boolean, default: false, reflect: true },
    value:    { type: String,  default: '',    reflect: true },
    label:    { type: String,  default: '',    reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        line-height: 1.5;
        cursor: pointer;
      }
      :host([disabled]) { opacity: 0.5; pointer-events: none; }

      .container {
        display: flex;
        align-items: center;
        gap: 0.5em;
        cursor: pointer;
        padding: 0.15em 0;
      }

      .circle {
        flex-shrink: 0;
        width: 1.15em;
        height: 1.15em;
        border: 0.12em solid var(--ui-border-color, #9ca3af);
        border-radius: 50%;
        background: var(--ui-bg, #fff);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: border-color 0.15s ease;
      }

      .dot {
        width: 0.55em;
        height: 0.55em;
        border-radius: 50%;
        background: var(--_accent, var(--ui-indigo-500, #6366f1));
        transform: scale(0);
        transition: transform 0.15s ease;
      }

      :host([checked]) .circle {
        border-color: var(--_accent, var(--ui-indigo-500, #6366f1));
      }
      :host([checked]) .dot {
        transform: scale(1);
      }

      .container:hover .circle {
        border-color: var(--_accent, var(--ui-indigo-500, #6366f1));
      }

      .label-text {
        color: var(--ui-text-color, #374151);
        font-size: 1em;
      }
    `;
  }

  constructor() {
    super();
    this._onClick   = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'radio');
    this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', this.checked ? '0' : '-1');
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
        <span class="circle" part="circle">
          <span class="dot" part="dot"></span>
        </span>
        <span class="label-text">${esc(this.label)}</span>
      </label>
    `;
  }

  _update() {
    super._update();
    this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
    this.setAttribute('tabindex', this.checked ? '0' : '-1');
  }

  _select() {
    if (this.disabled) return;
    this.emit('ui-radio-select', { value: this.value });
  }

  _onClick(e) {
    e.preventDefault();
    this._select();
  }

  _onKeyDown(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._select();
    }
    // Arrow-key navigation is handled by the parent radio-group
    if (['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(e.key)) {
      e.preventDefault();
      this.emit('ui-radio-nav', { key: e.key });
    }
  }
}

customElements.define('ui-input-radio', UIInputRadio);
