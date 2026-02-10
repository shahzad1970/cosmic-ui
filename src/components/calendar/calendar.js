import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, contrastColorFor } from '../../core/ui-utils.js';

/**
 * `<ui-calendar>` — Inline month calendar.
 *
 * Displays a month grid with selectable dates. Supports min/max bounds,
 * disabled dates, and highlighted dates (e.g. events).
 *
 * Unlike `<ui-input-date>` (which is a date-picker input), this component
 * renders an always-visible calendar for scheduling UIs and dashboards.
 *
 * @element ui-calendar
 *
 * @attr {String}  value      - Selected date (ISO string: YYYY-MM-DD)
 * @attr {String}  min        - Earliest selectable date (ISO)
 * @attr {String}  max        - Latest selectable date (ISO)
 * @attr {String}  background - Accent colour for selected date
 * @attr {String}  color      - Text colour for selected date
 * @attr {String}  size       - Component size
 * @attr {Boolean} disabled   - Disable interaction
 * @attr {String}  locale     - Locale for day/month names (default: browser locale)
 *
 * @fires ui-change - Emitted when a date is selected; detail: { value, date }
 *
 * @example
 *   <ui-calendar value="2024-03-15" background="indigo-500"></ui-calendar>
 */
export class UICalendar extends UIComponent {
  static properties = {
    value:      { type: String,  default: '',          reflect: true },
    min:        { type: String,  default: '',          reflect: true },
    max:        { type: String,  default: '',          reflect: true },
    background: { type: String,  default: 'indigo-500', reflect: true },
    color:      { type: String,  default: '',          reflect: true },
    size:       { type: String,  default: '',          reflect: true },
    disabled:   { type: Boolean, default: false,       reflect: true },
    locale:     { type: String,  default: '',          reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: inline-block;
        font-family: inherit;
        min-width: 16em;
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }

      .calendar {
        border: 1px solid var(--ui-border-color, #e5e7eb);
        border-radius: var(--ui-radius, 0.5em);
        background: var(--ui-bg, #fff);
        padding: 0.75em;
        box-sizing: border-box;
      }

      /* ── Header ─────────────────────────────── */
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.75em;
      }

      .month-label {
        font-weight: 600;
        font-size: 0.95em;
        user-select: none;
      }

      .nav-btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75em;
        height: 1.75em;
        border-radius: var(--ui-button-radius, 0.375em);
        cursor: pointer;
        color: var(--ui-text-color, #374151);
        transition: background 0.12s ease;
      }

      .nav-btn:hover {
        background: var(--ui-bg-subtle, rgba(0,0,0,0.06));
      }

      .nav-btn:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: 0.125em;
      }

      .nav-btn svg {
        width: 1em;
        height: 1em;
        fill: none;
        stroke: currentColor;
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      /* ── Grid ───────────────────────────────── */
      .grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1px;
        text-align: center;
      }

      .day-header {
        font-size: 0.7em;
        font-weight: 600;
        color: var(--ui-text-muted, #9ca3af);
        text-transform: uppercase;
        padding: 0.3em 0;
        user-select: none;
      }

      .day {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2em;
        height: 2em;
        margin: 0 auto;
        border-radius: 50%;
        cursor: pointer;
        font-size: 0.85em;
        transition: background 0.12s ease, color 0.12s ease;
        user-select: none;
        box-sizing: border-box;
      }

      .day:hover:not(.selected):not(.disabled):not(.outside) {
        background: var(--ui-bg-subtle, rgba(0,0,0,0.06));
      }

      .day.today:not(.selected) {
        font-weight: 700;
        border: 1.5px solid var(--_accent, var(--ui-indigo-500, #6366f1));
        color: var(--_accent, var(--ui-indigo-500, #6366f1));
      }

      .day.selected {
        background: var(--_accent, var(--ui-indigo-500, #6366f1));
        color: var(--_accent-text, #fff);
        font-weight: 600;
      }

      .day.disabled {
        opacity: 0.3;
        cursor: default;
      }

      .day.outside {
        color: var(--ui-text-muted, #d1d5db);
        cursor: default;
      }
    `;
  }

  constructor() {
    super();
    const now = new Date();
    this._viewYear = now.getFullYear();
    this._viewMonth = now.getMonth();
  }

  _update() {
    this._syncViewFromValue();
    this._applyStyles();
    super._update();
    this._attachListeners();
  }

  _syncViewFromValue() {
    if (this.value) {
      const d = new Date(this.value + 'T00:00:00');
      if (!isNaN(d.getTime())) {
        this._viewYear = d.getFullYear();
        this._viewMonth = d.getMonth();
      }
    }
  }

  _applyStyles() {
    const vars = {};
    if (this.background) {
      vars['--_accent'] = resolveColor(this.background);
      vars['--_accent-text'] = this.color
        ? resolveColor(this.color)
        : contrastColorFor(this.background);
    }
    const fontSize = resolveSize(this.size);
    if (fontSize) vars['font-size'] = fontSize;
    this._setDynamicVars(vars);
  }

  _attachListeners() {
    // Wire navigation
    this.shadowRoot?.querySelector('.prev')?.addEventListener('click', () => {
      this._viewMonth--;
      if (this._viewMonth < 0) { this._viewMonth = 11; this._viewYear--; }
      this._update();
    });

    this.shadowRoot?.querySelector('.next')?.addEventListener('click', () => {
      this._viewMonth++;
      if (this._viewMonth > 11) { this._viewMonth = 0; this._viewYear++; }
      this._update();
    });

    // Wire day clicks
    this.shadowRoot?.querySelectorAll('.day:not(.disabled):not(.outside)').forEach(el => {
      el.addEventListener('click', () => {
        const iso = el.dataset.date;
        if (!iso) return;
        this.value = iso;
        this.emit('ui-change', { value: iso, date: new Date(iso + 'T00:00:00') });
      });
    });
  }

  render() {
    const loc = this.locale || undefined;
    const year = this._viewYear;
    const month = this._viewMonth;
    const today = new Date();
    const todayISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const selectedISO = this.value || '';
    const minDate = this.min ? new Date(this.min + 'T00:00:00') : null;
    const maxDate = this.max ? new Date(this.max + 'T00:00:00') : null;

    // Month/year label
    const monthName = new Date(year, month).toLocaleDateString(loc, { month: 'long', year: 'numeric' });

    // Day-of-week headers (Mon–Sun starting from Monday for intl consistency, but using locale start)
    const dayHeaders = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(2024, 0, i + 1); // Jan 1, 2024 is Monday
      dayHeaders.push(d.toLocaleDateString(loc, { weekday: 'narrow' }));
    }

    // Build day grid
    const firstOfMonth = new Date(year, month, 1);
    const startDay = (firstOfMonth.getDay() + 6) % 7; // Monday = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells = [];

    // Previous month trailing days
    for (let i = startDay - 1; i >= 0; i--) {
      cells.push({ day: daysInPrevMonth - i, outside: true });
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dateObj = new Date(iso + 'T00:00:00');
      const disabled = (minDate && dateObj < minDate) || (maxDate && dateObj > maxDate);
      cells.push({
        day: d,
        iso,
        today: iso === todayISO,
        selected: iso === selectedISO,
        disabled,
      });
    }

    // Next month leading days
    const remaining = 7 - (cells.length % 7);
    if (remaining < 7) {
      for (let d = 1; d <= remaining; d++) {
        cells.push({ day: d, outside: true });
      }
    }

    const prevSvg = '<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>';
    const nextSvg = '<svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>';

    const dayHeadersHtml = dayHeaders.map(h => `<span class="day-header">${h}</span>`).join('');
    const daysHtml = cells.map(c => {
      if (c.outside) return `<span class="day outside">${c.day}</span>`;
      const cls = ['day'];
      if (c.today) cls.push('today');
      if (c.selected) cls.push('selected');
      if (c.disabled) cls.push('disabled');
      return `<span class="${cls.join(' ')}" data-date="${c.iso}">${c.day}</span>`;
    }).join('');

    return `
      <div class="calendar">
        <div class="header">
          <button class="nav-btn prev" aria-label="Previous month">${prevSvg}</button>
          <span class="month-label">${monthName}</span>
          <button class="nav-btn next" aria-label="Next month">${nextSvg}</button>
        </div>
        <div class="grid">
          ${dayHeadersHtml}
          ${daysHtml}
        </div>
      </div>
    `;
  }
}

customElements.define('ui-calendar', UICalendar);
