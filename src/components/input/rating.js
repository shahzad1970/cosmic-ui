import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-input-rating>` — Star rating component.
 *
 * @element ui-input-rating
 *
 * @attr {Number}  value      - Current rating value (0–max)
 * @attr {Number}  max        - Maximum stars (default 5)
 * @attr {String}  name       - Form field name
 * @attr {String}  label      - Label text
 * @attr {String}  help       - Help text
 * @attr {String}  error      - Error message
 * @attr {String}  size       - Size keyword or CSS length
 * @attr {String}  color      - Star active colour (palette token or CSS)
 * @attr {Boolean} disabled   - Disables the rating
 * @attr {Boolean} readonly   - Prevents changes
 * @attr {Boolean} required   - Marks as required
 *
 * @fires ui-change - When rating changes (detail: { value })
 */
export class UIInputRating extends UIComponent {

  static properties = {
    value:    { type: Number,  default: 0,       reflect: true },
    max:      { type: Number,  default: 5,       reflect: true },
    name:     { type: String,  default: '',      reflect: true },
    label:    { type: String,  default: '',      reflect: true },
    help:     { type: String,  default: '',      reflect: true },
    error:    { type: String,  default: '',      reflect: true },
    size:     { type: String,  default: '',      reflect: true },
    color:    { type: String,  default: 'amber-400', reflect: true },
    disabled: { type: Boolean, default: false,   reflect: true },
    readonly: { type: Boolean, default: false,   reflect: true },
    required: { type: Boolean, default: false,   reflect: true },
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

      .stars {
        display: inline-flex;
        gap: 0.15em;
      }
      :host(:not([readonly]):not([disabled])) .stars { cursor: pointer; }

      .star {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        padding: 0.1em;
        cursor: inherit;
        color: var(--ui-border-color, #d1d5db);
        transition: color 0.15s ease, transform 0.1s ease;
      }
      .star svg {
        width: 1.4em; height: 1.4em;
        stroke-width: 1.5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .star[data-active] { color: var(--_star-color, var(--ui-amber-400, #fbbf24)); }
      .star[data-active] svg { fill: currentColor; stroke: currentColor; }
      .star:not([data-active]) svg { fill: none; stroke: currentColor; }
      :host(:not([readonly]):not([disabled])) .star:hover { transform: scale(1.2); }
      :host(:not([readonly]):not([disabled])) .star[data-hover] { color: var(--_star-color, var(--ui-amber-400, #fbbf24)); }
      :host(:not([readonly]):not([disabled])) .star[data-hover] svg { fill: currentColor; stroke: currentColor; }

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
    this._hoverValue = 0;
  }

  render() {
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const starSVG = `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    let stars = '';
    for (let i = 1; i <= this.max; i++) {
      const active = i <= this.value ? 'data-active' : '';
      stars += `<button type="button" class="star" data-value="${i}" ${active} aria-label="Rate ${i} of ${this.max}" role="radio" aria-checked="${i <= this.value}">${starSVG}</button>`;
    }
    return `
      <div class="label" part="label">
        ${esc(this.label)}<span class="req">${this.required ? ' *' : ''}</span>
      </div>
      <div class="stars" part="stars" role="radiogroup" aria-label="${esc(this.label || 'Rating')}">${stars}</div>
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
    if (this.color) {
      const c = resolveColor(this.color);
      if (c) vars['--_star-color'] = c;
    }
    this._setDynamicVars(vars);
  }

  _attachListeners() {
    if (this.readonly || this.disabled) return;

    this.shadowRoot.querySelectorAll('.star').forEach(star => {
      star.addEventListener('click', (e) => {
        const v = Number(star.getAttribute('data-value'));
        // Toggle off if clicking the same value
        this.value = (v === this.value) ? 0 : v;
        this.emit('ui-change', { value: this.value });
      });

      star.addEventListener('mouseenter', () => {
        const v = Number(star.getAttribute('data-value'));
        this._hoverValue = v;
        this._updateHover();
      });

      star.addEventListener('mouseleave', () => {
        this._hoverValue = 0;
        this._updateHover();
      });
    });
  }

  _updateHover() {
    this.shadowRoot.querySelectorAll('.star').forEach(star => {
      const v = Number(star.getAttribute('data-value'));
      if (this._hoverValue > 0 && v <= this._hoverValue) {
        star.setAttribute('data-hover', '');
      } else {
        star.removeAttribute('data-hover');
      }
    });
  }
}

customElements.define('ui-input-rating', UIInputRating);
