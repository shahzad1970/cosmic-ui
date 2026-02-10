import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, contrastColorFor } from '../../core/ui-utils.js';

/**
 * `<ui-stat>` — Statistic display widget.
 *
 * Shows a prominent number or value with a label and optional
 * trend indicator. Perfect for dashboards and summary cards.
 *
 * @element ui-stat
 *
 * @attr {String}  label      - Stat label (e.g. "Total Users")
 * @attr {String}  value      - Main stat value (e.g. "12,345")
 * @attr {String}  trend      - Trend indicator: "up" | "down" | a percentage string ("+12%")
 * @attr {String}  icon       - Icon name to show beside the stat
 * @attr {String}  background - Background colour (palette token or CSS colour)
 * @attr {String}  color      - Text colour (palette token or CSS colour)
 * @attr {String}  size       - Component size (named keyword or CSS length)
 * @attr {Boolean} compact    - Compact horizontal layout
 *
 * @slot (default) - Additional content below the stat
 *
 * @example
 *   <ui-stat label="Total Users" value="12,345" trend="+12%"></ui-stat>
 *   <ui-stat label="Revenue" value="$48.2K" trend="up" icon="trending-up" background="green-50"></ui-stat>
 */
export class UIStat extends UIComponent {
  static properties = {
    label:      { type: String,  default: '',    reflect: true },
    value:      { type: String,  default: '',    reflect: true },
    trend:      { type: String,  default: '',    reflect: true },
    icon:       { type: String,  default: '',    reflect: true },
    background: { type: String,  default: '',    reflect: true },
    color:      { type: String,  default: '',    reflect: true },
    size:       { type: String,  default: '',    reflect: true },
    compact:    { type: Boolean, default: false, reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        padding: 1em 1.25em;
        border-radius: var(--ui-radius, 0.5em);
        border: 1px solid var(--_border-color, var(--ui-border-color, #e5e7eb));
        background: var(--_bg, var(--ui-bg, #fff));
        color: var(--_color, var(--ui-text-color, #1f2937));
        font-family: inherit;
        box-sizing: border-box;
      }

      .stat {
        display: flex;
        flex-direction: column;
        gap: 0.25em;
      }

      :host([compact]) .stat {
        flex-direction: row;
        align-items: center;
        gap: 1em;
      }

      .stat-icon {
        font-size: 1.5em;
        opacity: 0.7;
        margin-bottom: 0.25em;
      }

      :host([compact]) .stat-icon {
        margin-bottom: 0;
      }

      .label {
        font-size: 0.8em;
        font-weight: 500;
        color: var(--_label-color, var(--ui-text-muted, #6b7280));
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      .value-row {
        display: flex;
        align-items: baseline;
        gap: 0.5em;
        flex-wrap: wrap;
      }

      .value {
        font-size: 1.75em;
        font-weight: 700;
        line-height: 1.2;
        letter-spacing: -0.02em;
      }

      .trend {
        display: inline-flex;
        align-items: center;
        gap: 0.2em;
        font-size: 0.8em;
        font-weight: 600;
        padding: 0.15em 0.45em;
        border-radius: 9999px;
        line-height: 1.3;
      }

      .trend.up {
        color: var(--ui-green-700, #15803d);
        background: var(--ui-green-50, #f0fdf4);
      }

      .trend.down {
        color: var(--ui-red-700, #b91c1c);
        background: var(--ui-red-50, #fef2f2);
      }

      .trend.neutral {
        color: var(--ui-gray-600, #4b5563);
        background: var(--ui-gray-100, #f3f4f6);
      }

      .trend svg {
        width: 0.9em;
        height: 0.9em;
        fill: none;
        stroke: currentColor;
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .extra {
        margin-top: 0.5em;
        font-size: 0.85em;
        color: var(--_label-color, var(--ui-text-muted, #6b7280));
      }

      .extra.empty { display: none; }

      :host([compact]) .main {
        flex: 1;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
    /* Hide .extra when slot is empty */
    const slot = this.shadowRoot?.querySelector('.extra slot');
    if (slot) {
      const toggle = () => {
        const el = this.shadowRoot.querySelector('.extra');
        if (el) el.classList.toggle('empty', slot.assignedNodes({ flatten: true }).length === 0);
      };
      slot.addEventListener('slotchange', toggle);
      toggle();
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyStyles();
  }

  _applyStyles() {
    const vars = {};
    if (this._background) {
      const bg = resolveColor(this._background);
      vars['--_bg'] = bg;
      /* Auto-contrast: adapt label, text, and border for coloured backgrounds */
      const contrast = contrastColorFor(this._background);
      if (contrast) {
        if (!this._color) vars['--_color'] = contrast;
        vars['--_label-color'] = contrast === '#ffffff' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)';
        vars['--_border-color'] = 'transparent';
      }
    }
    if (this._color) vars['--_color'] = resolveColor(this._color);
    const fontSize = resolveSize(this._size);
    if (fontSize) vars['font-size'] = fontSize;
    this._setDynamicVars(vars);
  }

  render() {
    const esc = (s) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const upSvg = '<svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>';
    const downSvg = '<svg viewBox="0 0 24 24"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>';
    const neutralSvg = '<svg viewBox="0 0 24 24"><line x1="2" y1="12" x2="22" y2="12"/><polyline points="16 6 22 12 16 18"/></svg>';

    // Determine trend direction
    let trendHtml = '';
    if (this._trend) {
      const t = this._trend.trim().toLowerCase();
      const isUp = t === 'up' || t.startsWith('+');
      const isDown = t === 'down' || t.startsWith('-');
      const dir = isUp ? 'up' : isDown ? 'down' : 'neutral';
      const svg = dir === 'up' ? upSvg : dir === 'down' ? downSvg : neutralSvg;
      const label = (t === 'up' || t === 'down') ? '' : esc(this._trend);
      trendHtml = `<span class="trend ${dir}">${svg}${label}</span>`;
    }

    const iconHtml = this._icon ? `<div class="stat-icon"><ui-icon>${esc(this._icon)}</ui-icon></div>` : '';
    const labelHtml = this._label ? `<div class="label">${esc(this._label)}</div>` : '';

    return `
      <div class="stat">
        ${iconHtml}
        <div class="main">
          ${labelHtml}
          <div class="value-row">
            <span class="value">${esc(this._value)}</span>
            ${trendHtml}
          </div>
          <div class="extra"><slot></slot></div>
        </div>
      </div>
    `;
  }
}

customElements.define('ui-stat', UIStat);
