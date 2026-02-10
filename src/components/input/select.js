import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, contrastColorFor } from '../../core/ui-utils.js';

/**
 * `<ui-input-select>` — Dropdown select picker (single or multi).
 *
 * Options are defined as `<option>` children (light DOM).
 * Supports search/filter with `searchable` attribute.
 *
 * @element ui-input-select
 *
 * @attr {String}  value       - Selected value(s); comma-separated for multi
 * @attr {String}  placeholder - Placeholder when nothing is selected
 * @attr {String}  name        - Form field name
 * @attr {String}  label       - Label text
 * @attr {String}  help        - Help text
 * @attr {String}  error       - Error message
 * @attr {String}  size        - Size keyword or CSS length
 * @attr {String}  background  - Background colour
 * @attr {String}  color       - Text colour
 * @attr {Boolean} disabled    - Disables the select
 * @attr {Boolean} required    - Marks as required
 * @attr {Boolean} multiple    - Allow multiple selection
 * @attr {Boolean} searchable  - Add a search/filter input
 *
 * @fires ui-change - When selection changes (detail: { value })
 * @fires ui-focus  - On open
 * @fires ui-blur   - On close
 */
export class UIInputSelect extends UIComponent {

  static properties = {
    value:       { type: String,  default: '',    reflect: true },
    placeholder: { type: String,  default: 'Select…', reflect: true },
    name:        { type: String,  default: '',    reflect: true },
    label:       { type: String,  default: '',    reflect: true },
    help:        { type: String,  default: '',    reflect: true },
    error:       { type: String,  default: '',    reflect: true },
    size:        { type: String,  default: '',    reflect: true },
    background:  { type: String,  default: '',    reflect: true },
    color:       { type: String,  default: '',    reflect: true },
    disabled:    { type: Boolean, default: false, reflect: true },
    required:    { type: Boolean, default: false, reflect: true },
    multiple:    { type: Boolean, default: false, reflect: true },
    searchable:  { type: Boolean, default: false, reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        line-height: 1.5;
        position: relative;
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

      .trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        box-sizing: border-box;
        padding: 0.45em 0.65em;
        border: 1px solid var(--_border, var(--ui-border-color, #d1d5db));
        border-radius: var(--ui-radius, 0.375em);
        background: var(--_bg, var(--ui-bg, #fff));
        color: var(--_color, var(--ui-text-color, #111827));
        font-family: inherit;
        font-size: inherit;
        cursor: pointer;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
        gap: 0.5em;
      }
      .trigger:hover { border-color: #9ca3af; }
      .trigger:focus {
        outline: none;
        border-color: var(--_focus-border, var(--ui-focus-ring, #6366f1));
        box-shadow: 0 0 0 0.15em var(--_focus-ring, rgba(99, 102, 241, 0.25));
      }

      :host([error]) .trigger { border-color: var(--ui-red-500, #ef4444); }

      .display-value { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .placeholder   { color: var(--ui-text-muted, #9ca3af); }

      .caret {
        flex-shrink: 0;
        width: 0.8em;
        height: 0.8em;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        transition: transform 0.2s ease;
      }
      :host([data-open]) .caret { transform: rotate(180deg); }

      .dropdown {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 999;
        margin-top: 0.25em;
        border: 1px solid var(--ui-border-color, #d1d5db);
        border-radius: var(--ui-radius, 0.375em);
        background: var(--ui-bg, #fff);
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        max-height: 15em;
        overflow-y: auto;
      }
      :host([data-open]) .dropdown { display: block; }

      .search-box {
        display: none;
        padding: 0.35em;
        border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
      }
      :host([searchable][data-open]) .search-box { display: block; }

      .search-input {
        width: 100%;
        box-sizing: border-box;
        padding: 0.3em 0.5em;
        border: 1px solid var(--ui-border-color, #d1d5db);
        border-radius: var(--ui-radius, 0.25em);
        font-family: inherit;
        font-size: 0.9em;
        outline: none;
      }
      .search-input:focus { border-color: var(--ui-focus-ring, #6366f1); }

      .option {
        padding: 0.45em 0.65em;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.4em;
        transition: background-color 0.1s ease;
      }
      .option:hover { background: var(--ui-bg-subtle, #f3f4f6); }
      .option[data-selected] {
        background: var(--_accent-bg, rgba(99, 102, 241, 0.08));
        font-weight: 600;
      }
      .option[data-hidden] { display: none; }

      .option .check-icon {
        width: 0.85em; height: 0.85em;
        fill: none; stroke: var(--_accent, var(--ui-indigo-500, #6366f1));
        stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round;
        visibility: hidden;
      }
      .option[data-selected] .check-icon { visibility: visible; }

      .no-results {
        display: none;
        padding: 0.65em;
        text-align: center;
        color: var(--ui-text-muted, #9ca3af);
        font-size: 0.9em;
      }

      .help, .error-msg { display: none; font-size: 0.8em; margin-top: 0.3em; }
      .help { color: var(--ui-text-muted, #6b7280); }
      .error-msg { color: var(--ui-red-500, #ef4444); }
      :host([help]) .help       { display: block; }
      :host([error]) .error-msg { display: block; }
      :host([error]) .help      { display: none; }

      .tag {
        display: inline-flex;
        align-items: center;
        gap: 0.25em;
        padding: 0.1em 0.4em;
        border-radius: 0.25em;
        background: var(--ui-bg-subtle, #e5e7eb);
        font-size: 0.85em;
        margin: 0.1em 0.15em;
      }
      .tag-remove {
        cursor: pointer;
        font-size: 1em;
        line-height: 1;
        opacity: 0.6;
        background: none;
        border: none;
        padding: 0;
        font-family: inherit;
      }
      .tag-remove:hover { opacity: 1; }
      .tags { display: flex; flex-wrap: wrap; gap: 0.15em; flex: 1; }
    `;
  }

  constructor() {
    super();
    this._open = false;
    this._options = [];
    this._filter = '';
    this._onClick          = this._onClick.bind(this);
    this._onOutsideClick   = this._onOutsideClick.bind(this);
    this._onKeyDown        = this._onKeyDown.bind(this);
    this._onSearchInput    = this._onSearchInput.bind(this);
    this._onOptionClick    = this._onOptionClick.bind(this);
    this._focusedOptionIdx = -1;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0');
    this._readOptions();
    this._observer = new MutationObserver(() => { this._readOptions(); this._renderOptions(); });
    this._observer.observe(this, { childList: true, subtree: true, characterData: true, attributes: true });
    requestAnimationFrame(() => this._renderOptions());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer?.disconnect();
    document.removeEventListener('click', this._onOutsideClick);
  }

  _readOptions() {
    this._options = [...this.querySelectorAll('option')].map(o => ({
      value: o.value,
      text: o.textContent.trim(),
      disabled: o.disabled,
    }));
  }

  render() {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    return `
      <div class="label" part="label">
        ${esc(this.label)}<span class="req">${this.required ? ' *' : ''}</span>
      </div>
      <div class="trigger" part="trigger" tabindex="0" role="combobox" aria-expanded="false" aria-haspopup="listbox">
        <span class="display-value"></span>
        <svg class="caret" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="dropdown" part="dropdown" role="listbox">
        <div class="search-box">
          <input class="search-input" type="text" placeholder="Search…" />
        </div>
        <div class="options-list"></div>
        <div class="no-results">No results found</div>
      </div>
      <div class="help" part="help">${esc(this.help)}</div>
      <div class="error-msg" part="error">${esc(this.error)}</div>
      <slot style="display:none"></slot>
    `;
  }

  _update() {
    this._applyStyles();
    super._update();
    this._attachInternalListeners();
    this._renderOptions();
    this._updateDisplay();
  }

  /** Resolve size + colours and push dynamic CSS vars in one call. */
  _applyStyles() {
    const vars = {};
    const sz = resolveSize(this.size);
    if (sz) vars['font-size'] = sz;
    if (this.background) { const bg = resolveColor(this.background); if (bg) vars['--_bg'] = bg; }
    if (this.color)      { const c = resolveColor(this.color);       if (c)  vars['--_color'] = c; }
    this._setDynamicVars(vars);
  }

  _attachInternalListeners() {
    const trigger = this.shadowRoot.querySelector('.trigger');
    const search  = this.shadowRoot.querySelector('.search-input');
    if (trigger) {
      trigger.addEventListener('click',   this._onClick);
      trigger.addEventListener('keydown', this._onKeyDown);
    }
    if (search) {
      search.addEventListener('input', this._onSearchInput);
    }
  }

  _renderOptions() {
    const list = this.shadowRoot.querySelector('.options-list');
    if (!list) return;
    const selected = this._selectedValues();
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    list.innerHTML = this._options.map((o, i) => `
      <div class="option" role="option"
           data-index="${i}" data-value="${esc(o.value)}"
           ${selected.includes(o.value) ? 'data-selected' : ''}
           ${o.disabled ? 'data-disabled style="opacity:0.5;pointer-events:none"' : ''}
           ${this._filter && !o.text.toLowerCase().includes(this._filter.toLowerCase()) ? 'data-hidden' : ''}>
        ${this.multiple ? `<svg class="check-icon" viewBox="0 0 24 24"><polyline points="4 12 10 18 20 6"/></svg>` : ''}
        <span>${esc(o.text)}</span>
      </div>
    `).join('');

    // show/hide no-results
    const noResults = this.shadowRoot.querySelector('.no-results');
    const visible = list.querySelectorAll('.option:not([data-hidden])');
    if (noResults) noResults.style.display = visible.length === 0 ? 'block' : 'none';

    // attach option click handlers
    list.querySelectorAll('.option:not([data-disabled])').forEach(el => {
      el.addEventListener('click', this._onOptionClick);
    });

    this._updateDisplay();
  }

  _selectedValues() {
    if (!this.value) return [];
    return this.value.split(',').map(v => v.trim()).filter(Boolean);
  }

  _updateDisplay() {
    const display = this.shadowRoot.querySelector('.display-value');
    if (!display) return;
    const selected = this._selectedValues();
    if (!selected.length) {
      display.innerHTML = `<span class="placeholder">${this.placeholder}</span>`;
      return;
    }
    if (this.multiple) {
      const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
      display.innerHTML = `<span class="tags">${selected.map(v => {
        const opt = this._options.find(o => o.value === v);
        const text = opt ? opt.text : v;
        return `<span class="tag">${esc(text)}<button class="tag-remove" data-value="${esc(v)}" aria-label="Remove">×</button></span>`;
      }).join('')}</span>`;
      display.querySelectorAll('.tag-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const val = btn.getAttribute('data-value');
          const vals = this._selectedValues().filter(v => v !== val);
          this.value = vals.join(',');
          this._renderOptions();
          this.emit('ui-change', { value: this.value });
        });
      });
    } else {
      const opt = this._options.find(o => o.value === selected[0]);
      display.textContent = opt ? opt.text : selected[0];
    }
  }

  _openDropdown() {
    if (this._open) return;
    this._open = true;
    this.setAttribute('data-open', '');
    const trigger = this.shadowRoot.querySelector('.trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    this._filter = '';
    const search = this.shadowRoot.querySelector('.search-input');
    if (search) { search.value = ''; }
    this._renderOptions();
    if (this.searchable) {
      requestAnimationFrame(() => search?.focus());
    }
    document.addEventListener('click', this._onOutsideClick);
    this.emit('ui-focus');
  }

  _closeDropdown() {
    if (!this._open) return;
    this._open = false;
    this.removeAttribute('data-open');
    const trigger = this.shadowRoot.querySelector('.trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    this._focusedOptionIdx = -1;
    document.removeEventListener('click', this._onOutsideClick);
    this.emit('ui-blur');
  }

  _onClick(e) {
    e.stopPropagation();
    if (this._open) this._closeDropdown();
    else this._openDropdown();
  }

  _onOutsideClick(e) {
    if (!this.contains(e.target) && !this.shadowRoot.contains(e.target)) {
      this._closeDropdown();
    }
  }

  _onKeyDown(e) {
    if (e.key === 'Escape') { this._closeDropdown(); return; }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!this._open) { this._openDropdown(); return; }
      // Select focused option
      const options = this.shadowRoot.querySelectorAll('.option:not([data-hidden]):not([data-disabled])');
      if (this._focusedOptionIdx >= 0 && options[this._focusedOptionIdx]) {
        this._selectOption(options[this._focusedOptionIdx].getAttribute('data-value'));
      }
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!this._open) { this._openDropdown(); return; }
      const options = this.shadowRoot.querySelectorAll('.option:not([data-hidden]):not([data-disabled])');
      if (!options.length) return;
      if (e.key === 'ArrowDown') {
        this._focusedOptionIdx = Math.min(this._focusedOptionIdx + 1, options.length - 1);
      } else {
        this._focusedOptionIdx = Math.max(this._focusedOptionIdx - 1, 0);
      }
      options.forEach((o, i) => o.style.background = i === this._focusedOptionIdx ? 'var(--ui-bg-subtle, #f3f4f6)' : '');
      options[this._focusedOptionIdx]?.scrollIntoView({ block: 'nearest' });
    }
  }

  _onSearchInput(e) {
    this._filter = e.target.value;
    this._focusedOptionIdx = -1;
    this._renderOptions();
  }

  _onOptionClick(e) {
    e.stopPropagation();
    const opt = e.currentTarget;
    const val = opt.getAttribute('data-value');
    this._selectOption(val);
  }

  _selectOption(val) {
    if (this.multiple) {
      const vals = this._selectedValues();
      if (vals.includes(val)) {
        this.value = vals.filter(v => v !== val).join(',');
      } else {
        this.value = [...vals, val].join(',');
      }
      this._renderOptions();
    } else {
      this.value = val;
      this._renderOptions();
      this._closeDropdown();
    }
    this.emit('ui-change', { value: this.value });
  }
}

customElements.define('ui-input-select', UIInputSelect);
