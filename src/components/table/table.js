import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-table>` — Data table with sortable columns and row selection.
 *
 * Accepts data via the `data` JS property (array of objects) and `columns`
 * property (array of column definitions). Also supports purely slotted
 * HTML content for simple static tables.
 *
 * @element ui-table
 *
 * @attr {Boolean} striped    - Alternate row shading
 * @attr {Boolean} bordered   - Cell borders
 * @attr {Boolean} hoverable  - Highlight rows on hover
 * @attr {Boolean} compact    - Reduced padding
 * @attr {Boolean} selectable - Enable row selection via checkboxes
 * @attr {Boolean} sortable   - Enable column sorting (click headers)
 * @attr {String}  size       - Font size: named keyword or CSS length
 * @attr {String}  background - Background colour
 * @attr {String}  stickyHeader - Make header sticky (attribute: sticky-header)
 *
 * @slot (default) - Fallback HTML content (thead/tbody/tr/td) when no JS data is provided
 *
 * @fires ui-sort   - Emitted on column sort; detail: { column, direction }
 * @fires ui-select - Emitted on row selection change; detail: { selected, row, index }
 *
 * @example JS-driven:
 *   const table = document.querySelector('ui-table');
 *   table.columns = [
 *     { key: 'name', label: 'Name', sortable: true },
 *     { key: 'email', label: 'Email' },
 *     { key: 'role', label: 'Role', sortable: true },
 *   ];
 *   table.data = [
 *     { name: 'Alice', email: 'alice@ex.com', role: 'Admin' },
 *     { name: 'Bob',   email: 'bob@ex.com',   role: 'User'  },
 *   ];
 *
 * @example HTML-only:
 *   <ui-table striped hoverable>
 *     <table>
 *       <thead><tr><th>Name</th><th>Role</th></tr></thead>
 *       <tbody>
 *         <tr><td>Alice</td><td>Admin</td></tr>
 *         <tr><td>Bob</td><td>User</td></tr>
 *       </tbody>
 *     </table>
 *   </ui-table>
 */
export class UITable extends UIComponent {
  static properties = {
    striped:      { type: Boolean, default: false, reflect: true },
    bordered:     { type: Boolean, default: false, reflect: true },
    hoverable:    { type: Boolean, default: false, reflect: true },
    compact:      { type: Boolean, default: false, reflect: true },
    selectable:   { type: Boolean, default: false, reflect: true },
    sortable:     { type: Boolean, default: false, reflect: true },
    size:         { type: String,  default: '',    reflect: true },
    background:   { type: String,  default: '',    reflect: true },
    stickyHeader: { type: Boolean, default: false, reflect: true, attribute: 'sticky-header' },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        box-sizing: border-box;
        overflow: auto;
        border: 1px solid var(--ui-border-color, #e5e7eb);
        border-radius: var(--ui-radius, 0.5em);
      }

      :host([sticky-header]) {
        overflow: hidden;
      }

      .wrapper {
        overflow: auto;
        height: 100%;
        max-height: 100%;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
      }

      th, td {
        padding: 0.75em 1em;
        vertical-align: middle;
      }

      :host([compact]) th,
      :host([compact]) td {
        padding: 0.4em 0.65em;
      }

      thead th {
        font-weight: 600;
        color: var(--ui-text-muted, #6b7280);
        font-size: 0.85em;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        background: var(--ui-bg-subtle, #f9fafb);
        border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
        user-select: none;
        white-space: nowrap;
      }

      :host([sticky-header]) thead th {
        position: sticky;
        top: 0;
        z-index: 2;
      }

      tbody td {
        border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
      }

      /* Remove bottom border on last row */
      tbody tr:last-child td {
        border-bottom: none;
      }

      /* Striped */
      :host([striped]) tbody tr:nth-child(even) {
        background: var(--ui-bg-subtle, #f9fafb);
      }

      /* Bordered */
      :host([bordered]) th,
      :host([bordered]) td {
        border: 1px solid var(--ui-border-color, #e5e7eb);
      }

      /* Hoverable */
      :host([hoverable]) tbody tr:hover {
        background: var(--ui-gray-100, #f3f4f6);
      }

      /* Sortable header */
      th.sortable {
        cursor: pointer;
        transition: color 0.15s ease;
      }
      th.sortable:hover {
        color: var(--ui-text-color, #111827);
      }
      .sort-icon {
        display: inline-block;
        margin-left: 0.3em;
        opacity: 0.4;
        font-size: 0.85em;
      }
      th.sorted .sort-icon {
        opacity: 1;
      }

      /* Selection checkbox */
      .sel-cell {
        width: 2em;
        text-align: center;
      }
      .sel-cell input[type="checkbox"] {
        cursor: pointer;
        width: 1em;
        height: 1em;
        accent-color: var(--ui-indigo-500, #6366f1);
      }

      /* Selected row */
      tr.selected {
        background: color-mix(in srgb, var(--ui-indigo-500, #6366f1) 8%, transparent) !important;
      }

      /* Code inside cells */
      td code, th code {
        font-family: var(--ui-font-mono, ui-monospace, monospace);
        font-size: 0.9em;
        background: var(--ui-bg-subtle, #f3f4f6);
        padding: 0.15em 0.4em;
        border-radius: 0.25em;
        color: var(--ui-indigo-600, #4f46e5);
      }

      /* Hidden slot — slotted content is adopted into shadow DOM */
      .slot-host {
        display: none !important;
      }
    `;
  }

  constructor() {
    super();
    /** @type {Array<{key:string, label?:string, sortable?:boolean, align?:string, render?:function}>} */
    this._columns = [];
    /** @type {Array<Object>} */
    this._data = [];
    /** @type {Set<number>} */
    this._selected = new Set();
    this._sortCol = '';
    this._sortDir = 'asc';
    this._rendered = false;

    this._onHeaderClick = this._onHeaderClick.bind(this);
    this._onRowSelect   = this._onRowSelect.bind(this);
    this._onSelectAll   = this._onSelectAll.bind(this);
  }

  /** @param {Array<Object>} v */
  set columns(v) { this._columns = v || []; this._updateTable(); }
  get columns()  { return this._columns; }

  /** @param {Array<Object>} v */
  set data(v) { this._data = v || []; this._selected.clear(); this._updateTable(); }
  get data()  { return this._data; }

  /** @returns {Array<Object>} currently selected rows */
  get selectedRows() {
    return [...this._selected].map(i => this._data[i]).filter(Boolean);
  }

  render() {
    // If JS data is provided, render programmatically
    if (this._columns.length) {
      return this._renderTable();
    }
    // Otherwise, render a hidden slot — we'll adopt its <table> in connectedCallback
    return '<div class="slot-host"><slot></slot></div><div class="wrapper"></div>';
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();

    // Adopt slotted <table> into shadow DOM so it gets full internal styling.
    // We defer briefly to let the browser populate the slot.
    requestAnimationFrame(() => this._adoptSlottedTable());
  }

  /** Move a slotted <table> into shadow DOM so all th/td styles apply. */
  _adoptSlottedTable() {
    if (this._columns.length) return;        // JS-driven mode — nothing to adopt
    const wrapper = this.shadowRoot?.querySelector('.wrapper');
    if (!wrapper) return;
    const table = this.querySelector('table');
    if (!table) return;
    // Clone into shadow so light-DOM content is preserved for SSR / inspection
    wrapper.innerHTML = '';
    wrapper.appendChild(table.cloneNode(true));
  }

  _renderTable() {
    const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    const cols = this._columns;
    const data = this._getSortedData();

    // Header
    let headCells = '';
    if (this.selectable) {
      const allSelected = data.length > 0 && this._selected.size === data.length;
      headCells += `<th class="sel-cell"><input type="checkbox" class="select-all" ${allSelected ? 'checked' : ''} aria-label="Select all"></th>`;
    }
    for (const col of cols) {
      const isSortable = col.sortable || this.sortable;
      const isSorted = this._sortCol === col.key;
      const arrow = isSorted ? (this._sortDir === 'asc' ? '▲' : '▼') : '⇅';
      const cls = [isSortable ? 'sortable' : '', isSorted ? 'sorted' : ''].filter(Boolean).join(' ');
      const align = col.align ? ` style="text-align:${col.align}"` : '';
      headCells += `<th class="${cls}" data-key="${esc(col.key)}"${align}>${esc(col.label || col.key)}${isSortable ? `<span class="sort-icon">${arrow}</span>` : ''}</th>`;
    }

    // Body
    let rows = '';
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowIdx = this._data.indexOf(row);
      const sel = this._selected.has(rowIdx);
      let cells = '';
      if (this.selectable) {
        cells += `<td class="sel-cell"><input type="checkbox" class="row-sel" data-idx="${rowIdx}" ${sel ? 'checked' : ''} aria-label="Select row"></td>`;
      }
      for (const col of cols) {
        const val = col.render ? col.render(row[col.key], row, i) : esc(row[col.key]);
        const align = col.align ? ` style="text-align:${col.align}"` : '';
        cells += `<td${align}>${val}</td>`;
      }
      rows += `<tr class="${sel ? 'selected' : ''}" data-row="${rowIdx}">${cells}</tr>`;
    }

    return `<table part="table"><thead><tr>${headCells}</tr></thead><tbody>${rows}</tbody></table>`;
  }

  _getSortedData() {
    if (!this._sortCol) return [...this._data];
    const key = this._sortCol;
    const dir = this._sortDir === 'asc' ? 1 : -1;
    return [...this._data].sort((a, b) => {
      const va = a[key] ?? '';
      const vb = b[key] ?? '';
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
      return String(va).localeCompare(String(vb)) * dir;
    });
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyStyles();
  }

  _updateTable() {
    if (!this._initialised) return;
    this._update();
    this._attachTableListeners();
    this._applyStyles();
  }

  _update() {
    // In slotted mode, avoid re-rendering so the adopted table is not lost.
    if (!this._columns.length) {
      if (!this._rendered) {
        super._update();
        this._rendered = true;
        requestAnimationFrame(() => this._adoptSlottedTable());
      }
      return;
    }

    super._update();
    this._attachTableListeners();
  }

  _attachTableListeners() {
    const root = this.shadowRoot;
    if (!root) return;

    // Header sort clicks
    root.querySelectorAll('th.sortable').forEach(th => {
      th.removeEventListener('click', this._onHeaderClick);
      th.addEventListener('click', this._onHeaderClick);
    });

    // Row selection
    root.querySelectorAll('.row-sel').forEach(cb => {
      cb.removeEventListener('change', this._onRowSelect);
      cb.addEventListener('change', this._onRowSelect);
    });

    // Select all
    const sa = root.querySelector('.select-all');
    if (sa) {
      sa.removeEventListener('change', this._onSelectAll);
      sa.addEventListener('change', this._onSelectAll);
    }
  }

  _onHeaderClick(e) {
    const th = e.currentTarget;
    const key = th.dataset.key;
    if (!key) return;
    if (this._sortCol === key) {
      this._sortDir = this._sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this._sortCol = key;
      this._sortDir = 'asc';
    }
    this._updateTable();
    this.emit('ui-sort', { column: key, direction: this._sortDir });
  }

  _onRowSelect(e) {
    const idx = parseInt(e.target.dataset.idx, 10);
    if (e.target.checked) {
      this._selected.add(idx);
    } else {
      this._selected.delete(idx);
    }
    this._updateTable();
    this.emit('ui-select', { selected: this._selected.has(idx), row: this._data[idx], index: idx });
  }

  _onSelectAll(e) {
    if (e.target.checked) {
      this._data.forEach((_, i) => this._selected.add(i));
    } else {
      this._selected.clear();
    }
    this._updateTable();
    this.emit('ui-select', { selected: e.target.checked, row: null, index: -1 });
  }

  _applyStyles() {
    const vars = {};
    if (this.size) {
      const sz = resolveSize(this.size);
      if (sz) vars['font-size'] = sz;
    }
    if (this.background) {
      vars['--_bg'] = resolveColor(this.background) || this.background;
      vars['background'] = vars['--_bg'];
    }
    this._setDynamicVars(vars);
  }
}

customElements.define('ui-table', UITable);
