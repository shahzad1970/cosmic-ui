import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, resolveColorHover, contrastColorFor } from '../../core/ui-utils.js';

/**
 * `<ui-pagination>` — Page navigation control.
 *
 * Renders a row of page buttons with previous/next arrows and smart
 * ellipsis truncation for large page counts.
 *
 * @element ui-pagination
 *
 * @attr {Number}  total      - Total number of pages (required)
 * @attr {Number}  current    - Current active page (1-based, default 1)
 * @attr {Number}  siblings   - Pages shown on each side of current (default 1)
 * @attr {String}  background - Active-page background colour
 * @attr {String}  color      - Active-page text colour (auto-detected if omitted)
 * @attr {String}  size       - Component size: keyword or CSS length
 * @attr {Boolean} disabled   - Disable all interaction
 * @attr {Boolean} compact    - Show only prev/next + current indicator
 *
 * @fires ui-change - Emitted when the page changes; detail: { page }
 *
 * @example
 *   <ui-pagination total="20" current="5" background="indigo-500"></ui-pagination>
 */
export class UIPagination extends UIComponent {
  static properties = {
    total:      { type: Number,  default: 1,           reflect: true },
    current:    { type: Number,  default: 1,           reflect: true },
    siblings:   { type: Number,  default: 1,           reflect: true },
    background: { type: String,  default: 'indigo-500', reflect: true },
    color:      { type: String,  default: '',          reflect: true },
    size:       { type: String,  default: '',          reflect: true },
    disabled:   { type: Boolean, default: false,       reflect: true },
    compact:    { type: Boolean, default: false,       reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: inline-flex;
        align-items: center;
        gap: 0.25em;
        font-family: inherit;
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }

      button {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 2em;
        height: 2em;
        padding: 0 0.35em;
        border-radius: var(--ui-button-radius, 0.375em);
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
        font-weight: 500;
        line-height: 1;
        user-select: none;
        box-sizing: border-box;
        transition: background 0.15s ease, color 0.15s ease;
        color: var(--ui-text-color, #1f2937);
      }

      button:hover:not(.active):not(:disabled) {
        background: var(--ui-bg-subtle, rgba(0,0,0,0.06));
      }

      button:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: 0.125em;
      }

      button.active {
        background: var(--_active-bg, var(--ui-indigo-500, #6366f1));
        color: var(--_active-color, #fff);
        font-weight: 600;
      }

      button:disabled {
        opacity: 0.35;
        cursor: default;
      }

      .arrow svg {
        width: 1em;
        height: 1em;
        fill: none;
        stroke: currentColor;
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .ellipsis {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 2em;
        height: 2em;
        font-size: inherit;
        color: var(--ui-text-muted, #6b7280);
        pointer-events: none;
        user-select: none;
      }

      .compact-label {
        display: inline-flex;
        align-items: center;
        height: 2em;
        padding: 0 0.5em;
        font-size: inherit;
        color: var(--ui-text-color, #1f2937);
        user-select: none;
      }
    `;
  }

  constructor() {
    super();
    this._onPageClick = this._onPageClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot?.addEventListener('click', this._onPageClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.shadowRoot?.removeEventListener('click', this._onPageClick);
  }

  _update() {
    this._applyStyles();
    super._update();
  }

  _applyStyles() {
    const vars = {};
    if (this.background) {
      vars['--_active-bg'] = resolveColor(this.background);
      vars['--_active-color'] = this.color
        ? resolveColor(this.color)
        : contrastColorFor(this.background);
    }
    const fontSize = resolveSize(this.size);
    if (fontSize) vars['font-size'] = fontSize;
    this._setDynamicVars(vars);
  }

  _onPageClick(e) {
    const btn = e.target.closest('button');
    if (!btn || btn.disabled || btn.classList.contains('active')) return;
    const page = Number(btn.dataset.page);
    if (!page || page === this.current) return;
    this.current = page;
    this.emit('ui-change', { page });
  }

  /** Build the page-number range with ellipsis. */
  _getRange() {
    const total = Math.max(1, this.total);
    const current = Math.max(1, Math.min(this.current, total));
    const siblings = Math.max(0, this.siblings);

    const range = [];
    const left = Math.max(2, current - siblings);
    const right = Math.min(total - 1, current + siblings);

    // Always show page 1
    range.push(1);

    // Left ellipsis
    if (left > 2) range.push('…');

    // Middle pages
    for (let i = left; i <= right; i++) range.push(i);

    // Right ellipsis
    if (right < total - 1) range.push('…');

    // Always show last page (if > 1)
    if (total > 1) range.push(total);

    return range;
  }

  render() {
    const total = Math.max(1, this.total);
    const current = Math.max(1, Math.min(this.current, total));
    const prevSvg = '<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>';
    const nextSvg = '<svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>';

    if (this.compact) {
      return `
        <button class="arrow" data-page="${current - 1}" ${current <= 1 ? 'disabled' : ''} aria-label="Previous page">${prevSvg}</button>
        <span class="compact-label">${current} / ${total}</span>
        <button class="arrow" data-page="${current + 1}" ${current >= total ? 'disabled' : ''} aria-label="Next page">${nextSvg}</button>
      `;
    }

    const range = this._getRange();
    const pages = range.map(p => {
      if (p === '…') return '<span class="ellipsis">…</span>';
      const active = p === current ? ' class="active" aria-current="page"' : '';
      return `<button data-page="${p}"${active}>${p}</button>`;
    }).join('');

    return `
      <button class="arrow" data-page="${current - 1}" ${current <= 1 ? 'disabled' : ''} aria-label="Previous page">${prevSvg}</button>
      ${pages}
      <button class="arrow" data-page="${current + 1}" ${current >= total ? 'disabled' : ''} aria-label="Next page">${nextSvg}</button>
    `;
  }
}

customElements.define('ui-pagination', UIPagination);
