import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, contrastColorFor } from '../../core/ui-utils.js';

/**
 * `<ui-clipboard>` — Copy-to-clipboard button.
 *
 * Copies the specified text to the clipboard when clicked. Shows a
 * brief "Copied!" confirmation with a check-mark icon, then reverts
 * to the default copy icon.
 *
 * @element ui-clipboard
 *
 * @attr {String}  value      - Text to copy (required). Also accepts `text` as alias.
 * @attr {String}  background - Button background colour
 * @attr {String}  color      - Button text colour
 * @attr {String}  size       - Button size
 * @attr {Boolean} disabled   - Disable the button
 * @attr {String}  feedback   - Text shown on success (default: "Copied!")
 * @attr {Number}  duration   - Feedback display duration in ms (default: 2000)
 * @attr {Boolean} flat       - Flat style (no background)
 * @attr {Boolean} outline    - Outline style
 *
 * @fires ui-copy   - Emitted after successfully copying; detail: { value }
 *
 * @example
 *   <ui-clipboard value="npm install ui-components"></ui-clipboard>
 *   <ui-clipboard value="secret-token" feedback="Token copied!"></ui-clipboard>
 */
export class UIClipboard extends UIComponent {
  static properties = {
    value:      { type: String,  default: '',       reflect: true },
    background: { type: String,  default: '',       reflect: true },
    color:      { type: String,  default: '',       reflect: true },
    size:       { type: String,  default: '',       reflect: true },
    disabled:   { type: Boolean, default: false,    reflect: true },
    feedback:   { type: String,  default: 'Copied!', reflect: true },
    duration:   { type: Number,  default: 2000,     reflect: true },
    flat:       { type: Boolean, default: false,    reflect: true },
    outline:    { type: Boolean, default: false,    reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: inline-block;
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }

      .btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.4em;
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
        font-weight: 500;
        line-height: 1;
        padding: 0.45em 0.75em;
        border-radius: var(--ui-button-radius, 0.375em);
        background: var(--_bg, var(--ui-bg-subtle, rgba(0,0,0,0.06)));
        color: var(--_color, var(--ui-text-color, #374151));
        border: 1px solid transparent;
        transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;
        user-select: none;
        white-space: nowrap;
        box-sizing: border-box;
      }

      :host([flat]) .btn {
        background: transparent;
        border-color: transparent;
      }

      :host([outline]) .btn {
        background: transparent;
        border-color: var(--_outline, var(--ui-border-color, #d1d5db));
      }

      .btn:hover {
        filter: brightness(0.95);
      }

      .btn:active {
        transform: scale(0.96);
      }

      .btn:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: 0.125em;
      }

      .icon {
        width: 1.1em;
        height: 1.1em;
        flex-shrink: 0;
      }

      .icon svg {
        display: block;
        width: 100%;
        height: 100%;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .label {
        display: inline-block;
      }

      /* Success state */
      :host([data-copied]) .icon-copy { display: none; }
      :host(:not([data-copied])) .icon-check { display: none; }
      :host([data-copied]) .btn {
        color: var(--ui-green-600, #16a34a);
      }
    `;
  }

  constructor() {
    super();
    this._timer = null;
    this._onBtnClick = this._onBtnClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._attachListeners();
  }

  disconnectedCallback() {
    clearTimeout(this._timer);
    this._detachListeners();
    super.disconnectedCallback();
  }

  _attachListeners() {
    this._detachListeners();
    const btn = this.shadowRoot?.querySelector('.btn');
    if (btn) btn.addEventListener('click', this._onBtnClick);
  }

  _detachListeners() {
    const btn = this.shadowRoot?.querySelector('.btn');
    if (btn) btn.removeEventListener('click', this._onBtnClick);
  }

  _onBtnClick() {
    this._copy();
  }

  _applyStyles() {
    const vars = {};
    if (this.background) {
      vars['--_bg'] = resolveColor(this.background);
      vars['--_color'] = this.color
        ? resolveColor(this.color)
        : contrastColorFor(this.background);
    } else if (this.color) {
      vars['--_color'] = resolveColor(this.color);
    }
    const fontSize = resolveSize(this.size);
    if (fontSize) vars['font-size'] = fontSize;
    this._setDynamicVars(vars);
  }

  _update() {
    this._applyStyles();
    super._update();
    this._attachListeners();
  }

  async _copy() {
    if (this.disabled || !this.value) return;
    try {
      await navigator.clipboard.writeText(this.value);
      this.setAttribute('data-copied', '');
      this.emit('ui-copy', { value: this.value });

      clearTimeout(this._timer);
      this._timer = setTimeout(() => {
        this.removeAttribute('data-copied');
      }, this.duration);
    } catch (err) {
      console.warn('[ui-clipboard] Copy failed:', err);
    }
  }

  render() {
    const copySvg = '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
    const checkSvg = '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>';
    const fb = this.feedback || 'Copied!';

    return `
      <button class="btn" aria-label="Copy to clipboard">
        <span class="icon icon-copy">${copySvg}</span>
        <span class="icon icon-check">${checkSvg}</span>
        <span class="label"><slot>${this.hasAttribute('data-copied') ? fb : ''}</slot></span>
      </button>
    `;
  }
}

customElements.define('ui-clipboard', UIClipboard);
