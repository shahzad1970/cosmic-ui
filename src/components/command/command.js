import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveElevation } from '../../core/ui-utils.js';

/**
 * `<ui-command>` — Command palette (⌘K / Ctrl+K search).
 *
 * Full-screen search overlay for navigating commands, pages, or actions.
 * Populate items via the `items` JS property (an array of objects) or
 * by placing `<ui-command-item>` children.
 *
 * @element ui-command
 *
 * @attr {Boolean} open       - Whether the palette is visible
 * @attr {String}  placeholder - Search input placeholder (default: "Type a command…")
 * @attr {String}  shortcut   - Keyboard shortcut to toggle (default: "k")
 * @attr {Boolean} noShortcut - Disable automatic keyboard shortcut (attribute: no-shortcut)
 * @attr {String}  elevation  - Shadow depth (default: 5)
 * @attr {String}  size       - Component size
 * @attr {String}  width      - Panel width (default: min(90vw, 560px))
 *
 * @prop {Array}   items      - Array of { label, value, description?, icon?, group? }
 *
 * @slot (default) - `<ui-command-item>` elements (alternative to `items` prop)
 *
 * @fires ui-select - Emitted when an item is picked; detail: { value, label, item }
 * @fires ui-open   - Emitted when the palette opens
 * @fires ui-close  - Emitted when the palette closes
 *
 * @example
 *   <ui-command placeholder="Search components…">
 *     <ui-command-item value="button" label="Button" description="Click actions"></ui-command-item>
 *     <ui-command-item value="input"  label="Input"  description="Text entry"></ui-command-item>
 *   </ui-command>
 */
export class UICommand extends UIComponent {
  static properties = {
    open:        { type: Boolean, default: false,               reflect: true },
    placeholder: { type: String,  default: 'Type a command…',   reflect: true },
    shortcut:    { type: String,  default: 'k',                 reflect: true },
    noShortcut:  { type: Boolean, default: false,               reflect: true, attribute: 'no-shortcut' },
    elevation:   { type: String,  default: '5',                 reflect: true },
    size:        { type: String,  default: '',                  reflect: true },
    width:       { type: String,  default: '',                  reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: contents;
      }

      .backdrop {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 10000;
        background: rgba(0,0,0,0.45);
        align-items: flex-start;
        justify-content: center;
        padding-top: min(20vh, 140px);
        opacity: 0;
        transition: opacity 0.15s ease;
      }

      .backdrop.visible {
        display: flex;
        opacity: 1;
      }

      .panel {
        width: var(--_width, min(90vw, 560px));
        max-height: 60vh;
        background: var(--ui-bg, #fff);
        border-radius: var(--ui-radius, 0.75em);
        box-shadow: var(--_elevation, 0 25px 50px rgba(0,0,0,0.15));
        display: flex;
        flex-direction: column;
        overflow: hidden;
        font-family: inherit;
        transform: scale(0.98) translateY(-8px);
        transition: transform 0.15s ease;
      }

      .backdrop.visible .panel {
        transform: scale(1) translateY(0);
      }

      /* ── Search input ──────────────────────── */
      .search-wrap {
        display: flex;
        align-items: center;
        gap: 0.6em;
        padding: 0.75em 1em;
        border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
      }

      .search-icon svg {
        width: 1.2em;
        height: 1.2em;
        fill: none;
        stroke: var(--ui-text-muted, #9ca3af);
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .search-input {
        all: unset;
        flex: 1;
        font-family: inherit;
        font-size: 1em;
        color: var(--ui-text-color, #1f2937);
      }

      .search-input::placeholder {
        color: var(--ui-text-muted, #9ca3af);
      }

      /* ── Results list ──────────────────────── */
      .results {
        overflow-y: auto;
        padding: 0.4em 0;
        scrollbar-width: thin;
      }

      .empty {
        padding: 2em 1em;
        text-align: center;
        color: var(--ui-text-muted, #9ca3af);
        font-size: 0.9em;
      }

      .group-label {
        font-size: 0.7em;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--ui-text-muted, #9ca3af);
        padding: 0.6em 1em 0.3em;
        user-select: none;
      }

      .item {
        display: flex;
        align-items: center;
        gap: 0.65em;
        padding: 0.5em 1em;
        cursor: pointer;
        transition: background 0.08s ease;
      }

      .item:hover, .item.active {
        background: var(--ui-bg-subtle, rgba(0,0,0,0.05));
      }

      .item-icon {
        flex-shrink: 0;
        width: 1.2em;
        height: 1.2em;
        color: var(--ui-text-muted, #6b7280);
      }

      .item-label {
        font-weight: 500;
        color: var(--ui-text-color, #1f2937);
      }

      .item-desc {
        font-size: 0.8em;
        color: var(--ui-text-muted, #9ca3af);
        margin-left: auto;
      }

      /* ── Footer hint ───────────────────────── */
      .footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.75em;
        padding: 0.4em 1em;
        border-top: 1px solid var(--ui-border-color, #e5e7eb);
        font-size: 0.7em;
        color: var(--ui-text-muted, #9ca3af);
      }

      .footer kbd {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 1.4em;
        height: 1.4em;
        padding: 0 0.3em;
        border-radius: 0.2em;
        border: 1px solid var(--ui-border-color, #d1d5db);
        font-family: inherit;
        font-size: 0.95em;
        background: var(--ui-bg-subtle, #f9fafb);
      }
    `;
  }

  constructor() {
    super();
    this.__items = [];          // JS-only items array (no attribute)
    this._query = '';
    this._activeIndex = 0;

    // Bound handlers
    this._keyHandler      = this._onGlobalKey.bind(this);
    this._onInput         = this._onInput.bind(this);
    this._onInputKeydown  = this._onInputKeydown.bind(this);
    this._onBackdropClick = this._onBackdropClick.bind(this);
  }

  /* items property (JS only — not reflected) */
  set items(val) { this.__items = Array.isArray(val) ? val : []; if (this._initialised) this._renderResults(); }
  get items() { return this.__items; }

  connectedCallback() {
    super.connectedCallback();
    if (!this.noShortcut) document.addEventListener('keydown', this._keyHandler);
    this._attachPanelListeners();
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this._keyHandler);
    this._detachPanelListeners();
    super.disconnectedCallback();
  }

  _attachPanelListeners() {
    this._detachPanelListeners();
    const input    = this.shadowRoot?.querySelector('.search-input');
    const backdrop = this.shadowRoot?.querySelector('.backdrop');
    if (input) {
      input.addEventListener('input', this._onInput);
      input.addEventListener('keydown', this._onInputKeydown);
    }
    if (backdrop) backdrop.addEventListener('click', this._onBackdropClick);
  }

  _detachPanelListeners() {
    const input    = this.shadowRoot?.querySelector('.search-input');
    const backdrop = this.shadowRoot?.querySelector('.backdrop');
    if (input) {
      input.removeEventListener('input', this._onInput);
      input.removeEventListener('keydown', this._onInputKeydown);
    }
    if (backdrop) backdrop.removeEventListener('click', this._onBackdropClick);
  }

  _onInput() {
    const input = this.shadowRoot?.querySelector('.search-input');
    this._query = input?.value || '';
    this._activeIndex = 0;
    this._renderResults();
  }

  _onInputKeydown(e) {
    const filtered = this._filterItems();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._activeIndex = Math.min(this._activeIndex + 1, filtered.length - 1);
      this._renderResults();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._activeIndex = Math.max(this._activeIndex - 1, 0);
      this._renderResults();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = filtered[this._activeIndex];
      if (item) this._selectItem(item.value, item.label);
    } else if (e.key === 'Escape') {
      this.hide();
    }
  }

  _onBackdropClick(e) {
    if (e.target === e.currentTarget) this.hide();
  }

  _applyStyles() {
    const vars = {};
    const elev = resolveElevation(this.elevation);
    if (elev) vars['--_elevation'] = elev;
    if (this.width) vars['--_width'] = this.width;
    const fontSize = resolveSize(this.size);
    if (fontSize) vars['font-size'] = fontSize;
    this._setDynamicVars(vars);
  }

  _onGlobalKey(e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === this.shortcut) {
      e.preventDefault();
      this.open ? this.hide() : this.show();
    }
  }

  show() {
    this.open = true;
    this._doOpen();
  }

  hide() {
    this._doClose();
  }

  _doOpen() {
    const backdrop = this.shadowRoot?.querySelector('.backdrop');
    if (backdrop) backdrop.classList.add('visible');
    this._query = '';
    this._activeIndex = 0;
    const input = this.shadowRoot?.querySelector('.search-input');
    if (input) { input.value = ''; requestAnimationFrame(() => input.focus()); }
    this._renderResults();
    this.emit('ui-open');
  }

  _doClose() {
    const backdrop = this.shadowRoot?.querySelector('.backdrop');
    if (backdrop) backdrop.classList.remove('visible');
    if (this.hasAttribute('open')) this.removeAttribute('open');
    this.emit('ui-close');
  }

  _getItems() {
    // Merge JS items with DOM items
    const jsItems = this.__items || [];
    const domItems = [...this.querySelectorAll('ui-command-item')].map(el => ({
      label: el.getAttribute('label') || el.textContent?.trim() || '',
      value: el.getAttribute('value') || '',
      description: el.getAttribute('description') || '',
      icon: el.getAttribute('icon') || '',
      group: el.getAttribute('group') || '',
    }));
    return [...jsItems, ...domItems];
  }

  _filterItems() {
    const all = this._getItems();
    if (!this._query) return all;
    const q = this._query.toLowerCase();
    return all.filter(item =>
      (item.label || '').toLowerCase().includes(q) ||
      (item.description || '').toLowerCase().includes(q) ||
      (item.value || '').toLowerCase().includes(q)
    );
  }

  _renderResults() {
    const container = this.shadowRoot?.querySelector('.results');
    if (!container) return;

    const filtered = this._filterItems();
    if (filtered.length === 0) {
      container.innerHTML = '<div class="empty">No results found.</div>';
      return;
    }

    // Group items
    const groups = {};
    filtered.forEach(item => {
      const g = item.group || '';
      if (!groups[g]) groups[g] = [];
      groups[g].push(item);
    });

    const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
    let html = '';
    let idx = 0;

    for (const [group, items] of Object.entries(groups)) {
      if (group) html += `<div class="group-label">${esc(group)}</div>`;
      for (const item of items) {
        const iconHtml = item.icon ? `<span class="item-icon"><ui-icon>${esc(item.icon)}</ui-icon></span>` : '';
        const descHtml = item.description ? `<span class="item-desc">${esc(item.description)}</span>` : '';
        const activeClass = idx === this._activeIndex ? ' active' : '';
        html += `<div class="item${activeClass}" data-index="${idx}" data-value="${esc(item.value)}" data-label="${esc(item.label)}">
          ${iconHtml}
          <span class="item-label">${esc(item.label)}</span>
          ${descHtml}
        </div>`;
        idx++;
      }
    }

    container.innerHTML = html;

    // Wire click on result items (imperative — these are dynamically created)
    container.querySelectorAll('.item').forEach(el => {
      el.addEventListener('click', () => {
        this._selectItem(el.dataset.value, el.dataset.label);
      });
    });
  }

  _selectItem(value, label) {
    this.emit('ui-select', { value, label, item: this._filterItems().find(i => i.value === value) });
    this.hide();
  }

  _update() {
    this._applyStyles();
    super._update();
    this._attachPanelListeners();
    if (this.open) this._doOpen();
  }

  render() {
    const esc = (s) => (s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const searchSvg = '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';

    return `
      <div class="backdrop">
        <div class="panel">
          <div class="search-wrap">
            <span class="search-icon">${searchSvg}</span>
            <input class="search-input" type="text" placeholder="${esc(this.placeholder)}" autocomplete="off" spellcheck="false">
          </div>
          <div class="results"></div>
          <div class="footer">
            <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
            <span><kbd>↵</kbd> select</span>
            <span><kbd>esc</kbd> close</span>
          </div>
        </div>
      </div>
      <slot style="display:none"></slot>
    `;
  }
}

/**
 * `<ui-command-item>` — Individual command palette item.
 *
 * @element ui-command-item
 * @attr {String} value       - Item value
 * @attr {String} label       - Display label
 * @attr {String} description - Description text
 * @attr {String} icon        - Icon name
 * @attr {String} group       - Group heading
 */
export class UICommandItem extends HTMLElement {
  static get observedAttributes() { return ['value', 'label', 'description', 'icon', 'group']; }
  constructor() { super(); this.style.display = 'none'; }
}

customElements.define('ui-command', UICommand);
customElements.define('ui-command-item', UICommandItem);
