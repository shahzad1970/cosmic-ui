import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-input-tags>` — Free-form tag / chip input.
 *
 * Type text and press Enter (or comma) to add a tag, click × to remove.
 *
 * @element ui-input-tags
 *
 * @attr {String}  value       - Comma-separated tags
 * @attr {String}  placeholder - Input placeholder
 * @attr {String}  name        - Form field name
 * @attr {String}  label       - Label text
 * @attr {String}  help        - Help text
 * @attr {String}  error       - Error message
 * @attr {String}  size        - Size keyword or CSS length
 * @attr {String}  background  - Background colour
 * @attr {String}  color       - Tag badge colour (palette token or CSS)
 * @attr {Number}  max         - Maximum number of tags (0 = unlimited)
 * @attr {Boolean} disabled    - Disables input
 * @attr {Boolean} required    - Marks as required
 *
 * @fires ui-change - When tags change (detail: { value, tags })
 */
export class UIInputTags extends UIComponent {

  static properties = {
    value:       { type: String,  default: '',      reflect: true },
    placeholder: { type: String,  default: 'Add…',  reflect: true },
    name:        { type: String,  default: '',      reflect: true },
    label:       { type: String,  default: '',      reflect: true },
    help:        { type: String,  default: '',      reflect: true },
    error:       { type: String,  default: '',      reflect: true },
    size:        { type: String,  default: '',      reflect: true },
    background:  { type: String,  default: '',      reflect: true },
    color:       { type: String,  default: 'indigo-100', reflect: true },
    max:         { type: Number,  default: 0,       reflect: true },
    disabled:    { type: Boolean, default: false,   reflect: true },
    required:    { type: Boolean, default: false,   reflect: true },
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
        flex-wrap: wrap;
        align-items: center;
        gap: 0.3em;
        padding: 0.35em 0.5em;
        min-height: 2.4em;
        border: 1px solid var(--ui-border-color, #d1d5db);
        border-radius: var(--ui-radius, 0.375em);
        background: var(--_bg, var(--ui-bg, #fff));
        cursor: text;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      .wrapper:hover { border-color: #9ca3af; }
      .wrapper:focus-within {
        border-color: var(--ui-focus-ring, #6366f1);
        box-shadow: 0 0 0 0.15em rgba(99, 102, 241, 0.25);
      }
      :host([error]) .wrapper { border-color: var(--ui-red-500, #ef4444); }
      :host([error]) .wrapper:focus-within { box-shadow: 0 0 0 0.15em rgba(239, 68, 68, 0.25); }

      .tag {
        display: inline-flex;
        align-items: center;
        gap: 0.3em;
        padding: 0.15em 0.45em;
        border-radius: 0.25em;
        background: var(--_tag-color, var(--ui-indigo-100, #e0e7ff));
        color: var(--ui-text-color, #374151);
        font-size: 0.85em;
        font-weight: 500;
        max-width: 100%;
        overflow: hidden;
        white-space: nowrap;
        animation: tag-in 0.15s ease-out;
      }
      @keyframes tag-in { from { transform: scale(0.85); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      .tag-text {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tag-remove {
        display: flex; align-items: center; justify-content: center;
        background: none; border: none;
        cursor: pointer; padding: 0;
        color: inherit; opacity: 0.5;
        font-size: 1em;
        line-height: 1;
        transition: opacity 0.1s ease;
      }
      .tag-remove:hover { opacity: 1; }
      .tag-remove svg {
        width: 0.8em; height: 0.8em;
        fill: none; stroke: currentColor;
        stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round;
      }

      .input {
        flex: 1;
        min-width: 4em;
        border: none;
        outline: none;
        background: transparent;
        font-family: inherit;
        font-size: inherit;
        color: var(--ui-text-color, #111827);
        padding: 0.15em 0;
      }
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
    this._tags = [];
    this._onKeyDown  = this._onKeyDown.bind(this);
    this._onInput    = this._onInput.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._syncTagsFromValue();
  }

  _syncTagsFromValue() {
    if (this.value) {
      this._tags = this.value.split(',').map(t => t.trim()).filter(Boolean);
    } else {
      this._tags = [];
    }
  }

  get tags() { return [...this._tags]; }

  render() {
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const removeSVG = `<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    const tagHTML = this._tags.map((t, i) => `
      <span class="tag" part="tag" data-index="${i}">
        <span class="tag-text">${esc(t)}</span>
        <button type="button" class="tag-remove" data-index="${i}" aria-label="Remove ${esc(t)}" tabindex="-1">${removeSVG}</button>
      </span>
    `).join('');

    const atMax = this.max > 0 && this._tags.length >= this.max;

    return `
      <div class="label" part="label">
        ${esc(this.label)}<span class="req">${this.required ? ' *' : ''}</span>
      </div>
      <div class="wrapper" part="wrapper">
        ${tagHTML}
        ${atMax ? '' : `<input class="input" part="input" type="text" placeholder="${esc(this.placeholder)}" ${this.disabled ? 'disabled' : ''} />`}
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
    if (this.color)      { const c = resolveColor(this.color);       if (c)  vars['--_tag-color'] = c; }
    this._setDynamicVars(vars);
  }

  _attachListeners() {
    const input = this.shadowRoot.querySelector('.input');
    if (input) {
      input.addEventListener('keydown', this._onKeyDown);
      input.addEventListener('input', this._onInput);
    }

    // Clicking wrapper focuses input
    const wrapper = this.shadowRoot.querySelector('.wrapper');
    if (wrapper) {
      wrapper.addEventListener('click', () => {
        this.shadowRoot.querySelector('.input')?.focus();
      });
    }

    // Remove buttons
    this.shadowRoot.querySelectorAll('.tag-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = Number(btn.getAttribute('data-index'));
        this._removeTag(idx);
      });
    });
  }

  _onKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const input = e.target;
      this._addTag(input.value);
      input.value = '';
    } else if (e.key === 'Backspace' && !e.target.value && this._tags.length > 0) {
      this._removeTag(this._tags.length - 1);
    }
  }

  _onInput(e) {
    // Handle comma pasting
    const val = e.target.value;
    if (val.includes(',')) {
      const parts = val.split(',').map(s => s.trim()).filter(Boolean);
      parts.forEach(p => this._addTag(p));
      e.target.value = '';
    }
  }

  _addTag(text) {
    const t = text.trim();
    if (!t) return;
    if (this._tags.includes(t)) return; // no duplicates
    if (this.max > 0 && this._tags.length >= this.max) return;
    this._tags.push(t);
    this._syncValue();
  }

  _removeTag(idx) {
    this._tags.splice(idx, 1);
    this._syncValue();
  }

  _syncValue() {
    this.value = this._tags.join(', ');
    this.emit('ui-change', { value: this.value, tags: [...this._tags] });
  }

  focus() { this.shadowRoot?.querySelector('.input')?.focus(); }
  blur()  { this.shadowRoot?.querySelector('.input')?.blur(); }
}

customElements.define('ui-input-tags', UIInputTags);
