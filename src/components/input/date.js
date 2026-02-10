import { UIComponent } from '../../core/ui-component.js';
import { resolveSize } from '../../core/ui-utils.js';

/**
 * `<ui-input-date>` — Date picker with calendar dropdown.
 *
 * @element ui-input-date
 *
 * @attr {String}  value       - Selected date (YYYY-MM-DD) or range (YYYY-MM-DD / YYYY-MM-DD)
 * @attr {String}  placeholder - Placeholder text
 * @attr {String}  name        - Form field name
 * @attr {String}  label       - Label text
 * @attr {String}  help        - Help text
 * @attr {String}  error       - Error message
 * @attr {String}  size        - Size keyword or CSS length
 * @attr {String}  min         - Minimum selectable date (YYYY-MM-DD)
 * @attr {String}  max         - Maximum selectable date (YYYY-MM-DD)
 * @attr {Boolean} range       - Enable range picking (start → end)
 * @attr {Boolean} disabled    - Disables the picker
 * @attr {Boolean} required    - Marks as required
 *
 * @fires ui-change - When date changes (detail: { value } or { value, start, end })
 */
export class UIInputDate extends UIComponent {

  static properties = {
    value:       { type: String,  default: '',          reflect: true },
    placeholder: { type: String,  default: 'YYYY-MM-DD', reflect: true },
    name:        { type: String,  default: '',          reflect: true },
    label:       { type: String,  default: '',          reflect: true },
    help:        { type: String,  default: '',          reflect: true },
    error:       { type: String,  default: '',          reflect: true },
    size:        { type: String,  default: '',          reflect: true },
    min:         { type: String,  default: '',          reflect: true },
    max:         { type: String,  default: '',          reflect: true },
    range:       { type: Boolean, default: false,       reflect: true },
    disabled:    { type: Boolean, default: false,       reflect: true },
    required:    { type: Boolean, default: false,       reflect: true },
  };

  static _DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  static _MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

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
        gap: 0.5em;
        width: 100%;
        box-sizing: border-box;
        padding: 0.45em 0.65em;
        border: 1px solid var(--ui-border-color, #d1d5db);
        border-radius: var(--ui-radius, 0.375em);
        background: var(--ui-bg, #fff);
        color: var(--ui-text-color, #111827);
        font-family: inherit;
        font-size: inherit;
        cursor: pointer;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      .trigger:hover { border-color: #9ca3af; }
      .trigger:focus-within {
        outline: none;
        border-color: var(--ui-focus-ring, #6366f1);
        box-shadow: 0 0 0 0.15em rgba(99, 102, 241, 0.25);
      }
      :host([error]) .trigger { border-color: var(--ui-red-500, #ef4444); }
      :host([error]) .trigger:focus-within { box-shadow: 0 0 0 0.15em rgba(239, 68, 68, 0.25); }

      .cal-icon {
        width: 1em; height: 1em;
        fill: none; stroke: currentColor;
        stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
        flex-shrink: 0; opacity: 0.5;
        cursor: pointer;
      }
      .cal-icon:hover { opacity: 0.8; }
      .date-input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        padding: 0;
        min-width: 0;
      }
      .date-input::placeholder { color: var(--ui-text-muted, #9ca3af); }
      .clear-btn {
        display: none;
        align-items: center; justify-content: center;
        background: none; border: none; cursor: pointer;
        padding: 0; color: var(--ui-text-muted, #9ca3af);
        flex-shrink: 0;
        transition: color 0.1s ease;
      }
      .clear-btn:hover { color: var(--ui-text-color, #374151); }
      .clear-btn svg {
        width: 0.85em; height: 0.85em;
        fill: none; stroke: currentColor;
        stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round;
      }
      :host([value]) .clear-btn { display: flex; }

      .panel {
        display: none;
        position: absolute;
        top: 100%; left: 0;
        z-index: 999;
        margin-top: 0.25em;
        padding: 0.75em;
        border: 1px solid var(--ui-border-color, #d1d5db);
        border-radius: var(--ui-radius, 0.375em);
        background: var(--ui-bg, #fff);
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        width: 18em;
      }
      :host([data-open]) .panel { display: block; }

      .nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5em;
      }
      .nav-btn {
        background: none; border: none; cursor: pointer;
        padding: 0.25em; border-radius: 0.25em;
        color: var(--ui-text-color, #374151);
        display: flex; align-items: center; justify-content: center;
      }
      .nav-btn:hover { background: var(--ui-bg-subtle, #f3f4f6); }
      .nav-btn svg { width: 1em; height: 1em; fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
      .nav-title { font-weight: 600; font-size: 0.9em; }

      .weekdays {
        display: grid; grid-template-columns: repeat(7, 1fr);
        text-align: center; font-size: 0.75em; font-weight: 600;
        color: var(--ui-text-muted, #9ca3af);
        margin-bottom: 0.25em;
      }
      .days {
        display: grid; grid-template-columns: repeat(7, 1fr);
        gap: 0.15em;
      }
      .day {
        display: flex; align-items: center; justify-content: center;
        aspect-ratio: 1; border-radius: 50%;
        font-size: 0.85em; cursor: pointer;
        border: none; background: none; padding: 0;
        color: var(--ui-text-color, #374151);
        transition: background-color 0.1s ease;
      }
      .day:hover { background: var(--ui-bg-subtle, #f3f4f6); }
      .day[data-selected] {
        background: var(--ui-indigo-500, #6366f1);
        color: #fff;
        font-weight: 600;
      }
      .day[data-today]:not([data-selected]) {
        font-weight: 700;
        color: var(--ui-indigo-500, #6366f1);
      }
      .day[data-outside] { color: var(--ui-text-muted, #d1d5db); }
      .day[data-disabled] { opacity: 0.3; pointer-events: none; }

      /* Range mode styles */
      .day[data-range-start],
      .day[data-range-end] {
        background: var(--ui-indigo-500, #6366f1);
        color: #fff;
        font-weight: 600;
      }
      .day[data-in-range]:not([data-range-start]):not([data-range-end]) {
        background: var(--ui-indigo-100, #e0e7ff);
        color: var(--ui-indigo-700, #4338ca);
        border-radius: 0.25em;
      }
      .day[data-range-preview]:not([data-range-start]):not([data-in-range]) {
        background: var(--ui-indigo-50, #eef2ff);
        color: var(--ui-indigo-600, #4f46e5);
        border-radius: 0.25em;
      }
      .range-hint {
        display: none;
        text-align: center;
        font-size: 0.75em;
        color: var(--ui-text-muted, #9ca3af);
        margin-top: 0.5em;
        font-style: italic;
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
    this._open = false;
    const d = new Date();
    this._viewYear  = d.getFullYear();
    this._viewMonth = d.getMonth();
    // Range state
    this._rangeStart  = '';
    this._rangeEnd    = '';
    this._pickingEnd  = false;
    this._hoverDate   = '';
    this._onTriggerClick = this._onTriggerClick.bind(this);
    this._onOutsideClick = this._onOutsideClick.bind(this);
    this._onInputChange  = this._onInputChange.bind(this);
    this._onInputKeyDown = this._onInputKeyDown.bind(this);
    this._onClear        = this._onClear.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.value) {
      if (this.range && this.value.includes(' / ')) {
        const [start] = this.value.split(' / ');
        const [y, m] = start.split('-').map(Number);
        if (y && m) { this._viewYear = y; this._viewMonth = m - 1; }
        this._rangeStart = start;
        this._rangeEnd = this.value.split(' / ')[1] || '';
      } else {
        const [y, m] = this.value.split('-').map(Number);
        if (y && m) { this._viewYear = y; this._viewMonth = m - 1; }
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onOutsideClick);
  }

  render() {
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const ph = this.range && this.placeholder === 'YYYY-MM-DD' ? 'Start / End' : esc(this.placeholder);
    return `
      <div class="label" part="label">
        ${esc(this.label)}<span class="req">${this.required ? ' *' : ''}</span>
      </div>
      <div class="trigger" part="trigger" role="combobox" aria-expanded="false">
        <input class="date-input" part="input" type="text"
               value="${this.value ? esc(this.value) : ''}"
               placeholder="${ph}"
               ${this.disabled ? 'disabled' : ''}
               ${this.name ? `name="${esc(this.name)}"` : ''}
               ${this.required ? 'required' : ''}
               ${this.error ? 'aria-invalid="true"' : ''}
               aria-label="${esc(this.label || 'Date')}" />
        <button type="button" class="clear-btn" aria-label="Clear date" tabindex="-1">
          <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <svg class="cal-icon cal-toggle" viewBox="0 0 24 24" tabindex="0" role="button" aria-label="Toggle calendar">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </div>
      <div class="panel" part="panel">
        ${this._renderCalendar()}
      </div>
      <div class="help" part="help">${esc(this.help)}</div>
      <div class="error-msg" part="error">${esc(this.error)}</div>
    `;
  }

  _renderCalendar() {
    const y = this._viewYear;
    const m = this._viewMonth;
    const title = `${UIInputDate._MONTHS[m]} ${y}`;
    const today = new Date(); today.setHours(0,0,0,0);
    const todayStr = this._toISO(today);

    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const daysInPrev = new Date(y, m, 0).getDate();

    let cells = '';

    const dayAttrs = (iso, outside) => {
      const attrs = [];
      if (outside) attrs.push('data-outside');
      if (this._isDisabledDate(iso)) { attrs.push('data-disabled'); return attrs.join(' '); }
      if (this.range) {
        if (iso === this._rangeStart) attrs.push('data-range-start');
        if (iso === this._rangeEnd) attrs.push('data-range-end');
        if (this._rangeStart && this._rangeEnd && iso > this._rangeStart && iso < this._rangeEnd) attrs.push('data-in-range');
        // Hover preview: show preview band when picking end date
        if (this._pickingEnd && this._rangeStart && this._hoverDate && !this._rangeEnd) {
          const previewStart = this._rangeStart < this._hoverDate ? this._rangeStart : this._hoverDate;
          const previewEnd = this._rangeStart < this._hoverDate ? this._hoverDate : this._rangeStart;
          if (iso >= previewStart && iso <= previewEnd) attrs.push('data-range-preview');
        }
      } else {
        if (iso === this.value) attrs.push('data-selected');
      }
      if (iso === todayStr && !attrs.includes('data-selected') && !attrs.includes('data-range-start') && !attrs.includes('data-range-end')) attrs.push('data-today');
      return attrs.join(' ');
    };

    // Previous month fill
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = daysInPrev - i;
      const iso = this._toISO(new Date(y, m - 1, d));
      cells += `<button type="button" class="day" data-date="${iso}" ${dayAttrs(iso, true)}>${d}</button>`;
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = this._toISO(new Date(y, m, d));
      cells += `<button type="button" class="day" data-date="${iso}" ${dayAttrs(iso, false)}>${d}</button>`;
    }

    // Next month fill
    const totalCells = firstDay + daysInMonth;
    const remaining = (7 - (totalCells % 7)) % 7;
    for (let d = 1; d <= remaining; d++) {
      const iso = this._toISO(new Date(y, m + 1, d));
      cells += `<button type="button" class="day" data-date="${iso}" ${dayAttrs(iso, true)}>${d}</button>`;
    }

    // Range hint
    let hint = '';
    if (this.range) {
      if (!this._rangeStart && !this._pickingEnd) hint = 'Pick a start date';
      else if (this._pickingEnd && !this._rangeEnd) hint = 'Pick an end date';
    }

    return `
      <div class="nav">
        <button type="button" class="nav-btn" data-action="prev-month" aria-label="Previous month">
          <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span class="nav-title">${title}</span>
        <button type="button" class="nav-btn" data-action="next-month" aria-label="Next month">
          <svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>
        </button>
      </div>
      <div class="weekdays">${UIInputDate._DAYS.map(d => `<span>${d}</span>`).join('')}</div>
      <div class="days">${cells}</div>
      <div class="range-hint" style="${hint ? 'display:block' : ''}">${hint}</div>
    `;
  }

  _toISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  _isDisabledDate(iso) {
    if (this.min && iso < this.min) return true;
    if (this.max && iso > this.max) return true;
    return false;
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
    this._setDynamicVars(vars);
  }

  _attachListeners() {
    // Calendar icon toggles the dropdown
    const calToggle = this.shadowRoot.querySelector('.cal-toggle');
    if (calToggle) {
      calToggle.addEventListener('click', this._onTriggerClick);
      calToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._onTriggerClick(e); }
      });
    }

    // Text input for manual typing
    const input = this.shadowRoot.querySelector('.date-input');
    if (input) {
      input.addEventListener('change', this._onInputChange);
      input.addEventListener('keydown', this._onInputKeyDown);
    }

    // Clear button
    const clearBtn = this.shadowRoot.querySelector('.clear-btn');
    if (clearBtn) clearBtn.addEventListener('click', this._onClear);

    // Calendar nav & day buttons
    this._attachPanelListeners();
  }

  _attachPanelListeners() {
    this.shadowRoot.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.getAttribute('data-action');
        if (action === 'prev-month') this._prevMonth();
        else if (action === 'next-month') this._nextMonth();
      });
    });

    this.shadowRoot.querySelectorAll('.day:not([data-disabled])').forEach(d => {
      d.addEventListener('click', (e) => {
        e.stopPropagation();
        const iso = d.getAttribute('data-date');
        this._selectDate(iso);
      });
      // Range hover preview — update attributes in-place (no DOM rebuild)
      if (this.range && this._pickingEnd) {
        d.addEventListener('mouseenter', () => {
          this._hoverDate = d.getAttribute('data-date');
          this._updateHoverPreview();
        });
        d.addEventListener('mouseleave', () => {
          this._hoverDate = '';
          this._updateHoverPreview();
        });
      }
    });
  }

  /**
   * Attempt to parse user-typed text into a YYYY-MM-DD string.
   * Accepts YYYY-MM-DD, YYYY/MM/DD, MM/DD/YYYY, MM-DD-YYYY, and natural Date.parse input.
   */
  _parseInput(text) {
    const t = text.trim();
    if (!t) return '';
    // YYYY-MM-DD or YYYY/MM/DD
    const isoMatch = t.match(/^(\d{4})[\-\/](\d{1,2})[\-\/](\d{1,2})$/);
    if (isoMatch) {
      const [, y, m, d] = isoMatch;
      return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
    // MM/DD/YYYY or MM-DD-YYYY
    const usMatch = t.match(/^(\d{1,2})[\-\/](\d{1,2})[\-\/](\d{4})$/);
    if (usMatch) {
      const [, m, d, y] = usMatch;
      return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
    // Fallback to Date.parse
    const ts = Date.parse(t);
    if (!isNaN(ts)) return this._toISO(new Date(ts));
    return null; // unparseable
  }

  _onInputChange(e) {
    const raw = e.target.value;
    if (this.range) {
      // Accept "YYYY-MM-DD / YYYY-MM-DD" format
      if (raw.includes('/')) {
        const parts = raw.split('/').map(s => s.trim());
        if (parts.length === 2) {
          const start = this._parseInput(parts[0]);
          const end = this._parseInput(parts[1]);
          if (start && end && start !== null && end !== null && !this._isDisabledDate(start) && !this._isDisabledDate(end)) {
            const [s, en] = start <= end ? [start, end] : [end, start];
            this._rangeStart = s;
            this._rangeEnd = en;
            this._pickingEnd = false;
            this._hoverDate = '';
            const val = `${s} / ${en}`;
            this.value = val;
            e.target.value = val;
            this._closePanel();
            this.emit('ui-change', { value: val, start: s, end: en });
            return;
          }
        }
      }
      // Invalid — revert
      e.target.value = this.value;
      return;
    }
    const iso = this._parseInput(raw);
    if (iso === null) {
      e.target.value = this.value;
      return;
    }
    if (iso === '') {
      this._onClear(e);
      return;
    }
    if (this._isDisabledDate(iso)) {
      e.target.value = this.value;
      return;
    }
    this._selectDate(iso);
  }

  _onInputKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.dispatchEvent(new Event('change', { bubbles: true }));
    } else if (e.key === 'Escape') {
      this._closePanel();
    } else if (e.key === 'ArrowDown' && !this._open) {
      e.preventDefault();
      this._openPanel();
    }
  }

  _onClear(e) {
    e.stopPropagation();
    this.value = '';
    this._rangeStart = '';
    this._rangeEnd = '';
    this._pickingEnd = false;
    this._hoverDate = '';
    const input = this.shadowRoot.querySelector('.date-input');
    if (input) input.value = '';
    this._closePanel();
    if (this.range) {
      this.emit('ui-change', { value: '', start: '', end: '' });
    } else {
      this.emit('ui-change', { value: '' });
    }
  }

  _selectDate(iso) {
    if (this._isDisabledDate(iso)) return;

    if (this.range) {
      this._selectRangeDate(iso);
      return;
    }

    this.value = iso;
    const [y, m] = iso.split('-').map(Number);
    this._viewYear = y;
    this._viewMonth = m - 1;
    const input = this.shadowRoot.querySelector('.date-input');
    if (input) input.value = iso;
    this._closePanel();
    this.emit('ui-change', { value: iso });
  }

  _selectRangeDate(iso) {
    if (!this._pickingEnd) {
      // First click — set start, reset end
      this._rangeStart = iso;
      this._rangeEnd = '';
      this._pickingEnd = true;
      this._hoverDate = '';
      this.value = '';
      const input = this.shadowRoot.querySelector('.date-input');
      if (input) input.value = '';
      this._refreshPanel();
      return;
    }

    // Second click — set end, sort if needed
    let start = this._rangeStart;
    let end = iso;
    if (start > end) { [start, end] = [end, start]; }
    this._rangeStart = start;
    this._rangeEnd = end;
    this._pickingEnd = false;
    this._hoverDate = '';

    const val = `${start} / ${end}`;
    this.value = val;
    const [ey, em] = end.split('-').map(Number);
    this._viewYear = ey;
    this._viewMonth = em - 1;
    const input = this.shadowRoot.querySelector('.date-input');
    if (input) input.value = val;
    this._closePanel();
    this.emit('ui-change', { value: val, start, end });
  }

  _prevMonth() {
    this._viewMonth--;
    if (this._viewMonth < 0) { this._viewMonth = 11; this._viewYear--; }
    this._refreshPanel();
  }

  _nextMonth() {
    this._viewMonth++;
    if (this._viewMonth > 11) { this._viewMonth = 0; this._viewYear++; }
    this._refreshPanel();
  }

  _refreshPanel() {
    const panel = this.shadowRoot.querySelector('.panel');
    if (panel) {
      panel.innerHTML = this._renderCalendar();
      this._attachPanelListeners();
    }
  }

  /** Toggle data-range-preview on existing day elements without replacing DOM. */
  _updateHoverPreview() {
    this.shadowRoot.querySelectorAll('.day[data-date]').forEach(d => {
      const iso = d.getAttribute('data-date');
      d.removeAttribute('data-range-preview');
      if (this._pickingEnd && this._rangeStart && this._hoverDate && !this._rangeEnd) {
        const pStart = this._rangeStart < this._hoverDate ? this._rangeStart : this._hoverDate;
        const pEnd   = this._rangeStart < this._hoverDate ? this._hoverDate : this._rangeStart;
        if (iso >= pStart && iso <= pEnd) d.setAttribute('data-range-preview', '');
      }
    });
  }

  _openPanel() {
    if (this._open) return;
    this._open = true;
    this.setAttribute('data-open', '');
    const trigger = this.shadowRoot.querySelector('.trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    // In range mode, if a full range is already selected, start fresh on re-open
    if (this.range && this._rangeStart && this._rangeEnd) {
      this._pickingEnd = false;
      this._hoverDate = '';
    }
    this._refreshPanel();
    document.addEventListener('click', this._onOutsideClick);
  }

  _closePanel() {
    if (!this._open) return;
    this._open = false;
    this.removeAttribute('data-open');
    const trigger = this.shadowRoot.querySelector('.trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    // If range picking was in progress (only start picked), cancel it
    if (this.range && this._pickingEnd && !this._rangeEnd) {
      this._rangeStart = '';
      this._pickingEnd = false;
      this._hoverDate = '';
    }
    document.removeEventListener('click', this._onOutsideClick);
  }

  _onTriggerClick(e) {
    e.stopPropagation();
    if (this._open) this._closePanel();
    else this._openPanel();
  }

  _onOutsideClick(e) {
    if (!this.contains(e.target) && !this.shadowRoot.contains(e.target)) {
      this._closePanel();
    }
  }

  focus() { this.shadowRoot?.querySelector('.date-input')?.focus(); }
  blur()  { this.shadowRoot?.querySelector('.date-input')?.blur(); }
}

customElements.define('ui-input-date', UIInputDate);
