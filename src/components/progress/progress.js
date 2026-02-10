import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-progress>` — Progress indicator (bar or ring).
 *
 * Displays a visual indicator of completion. Two types:
 * - **bar** (default) — a horizontal progress bar
 * - **ring** — a circular SVG progress ring
 *
 * When `value` is omitted the component enters an **indeterminate**
 * state and plays a looping animation.
 *
 * @element ui-progress
 *
 * @attr {Number}  value      - Current progress value (0–100). Omit for indeterminate.
 * @attr {Number}  max        - Maximum value (default 100)
 * @attr {String}  type       - "bar" (default) or "ring"
 * @attr {String}  color      - Fill / stroke colour: palette token or CSS colour
 * @attr {String}  background - Track colour: palette token or CSS colour
 * @attr {String}  size       - Component size: keyword or CSS length
 * @attr {String}  thickness  - Bar height or ring stroke width (keyword or CSS length)
 * @attr {Boolean} label      - Show percentage label
 *
 * @example
 *   <ui-progress value="60"></ui-progress>
 *
 * @example
 *   <ui-progress type="ring" value="75" label></ui-progress>
 */
export class UIProgress extends UIComponent {
  static properties = {
    value:      { type: Number,  default: -1,     reflect: true },
    max:        { type: Number,  default: 100,    reflect: true },
    type:       { type: String,  default: 'bar',  reflect: true },
    color:      { type: String,  default: '',     reflect: true },
    background: { type: String,  default: '',     reflect: true },
    size:       { type: String,  default: '',     reflect: true },
    thickness:  { type: String,  default: '',     reflect: true },
    label:      { type: Boolean, default: false,  reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        box-sizing: border-box;
        line-height: 1;
      }

      /* ── BAR ────────────────────────────────────────────── */
      .bar-track {
        width: 100%;
        height: var(--_thickness, 0.5em);
        background: var(--_track, var(--ui-bg-subtle, #f3f4f6));
        border-radius: 9999px;
        overflow: hidden;
        position: relative;
      }

      .bar-fill {
        height: 100%;
        background: var(--_fill, var(--ui-indigo-500, #6366f1));
        border-radius: 9999px;
        transition: width 0.35s ease;
        width: var(--_pct, 0%);
      }

      /* Indeterminate bar */
      :host([value="-1"]) .bar-fill,
      :host(:not([value])) .bar-fill {
        width: 40%;
        animation: bar-indeterminate 1.4s ease-in-out infinite;
      }

      @keyframes bar-indeterminate {
        0%   { transform: translateX(-100%); }
        100% { transform: translateX(350%); }
      }

      .bar-wrapper {
        display: flex;
        align-items: center;
        gap: 0.75em;
      }

      .bar-label {
        font-size: 0.8em;
        font-weight: 600;
        color: var(--ui-text-muted, #6b7280);
        white-space: nowrap;
        min-width: 3em;
        text-align: right;
      }

      /* ── RING ───────────────────────────────────────────── */
      :host([type="ring"]) {
        display: inline-block;
      }

      .ring-wrapper {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 6em;
        height: 6em;
      }

      .ring-svg {
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
        display: block;
      }

      .ring-track {
        fill: none;
        stroke: var(--_track, var(--ui-bg-subtle, #f3f4f6));
        stroke-width: var(--_thickness, 10);
      }

      .ring-fill {
        fill: none;
        stroke: var(--_fill, var(--ui-indigo-500, #6366f1));
        stroke-width: var(--_thickness, 10);
        stroke-linecap: round;
        transition: stroke-dashoffset 0.35s ease;
      }

      /* Indeterminate ring */
      :host([value="-1"]) .ring-svg,
      :host(:not([value])) .ring-svg {
        animation: ring-spin 1.4s linear infinite;
      }

      :host([value="-1"]) .ring-fill,
      :host(:not([value])) .ring-fill {
        stroke-dashoffset: calc(var(--_circ) * 0.75) !important;
      }

      @keyframes ring-spin {
        100% { transform: rotate(270deg); }
      }

      .ring-label {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        color: var(--ui-text-color, #111827);
        font-size: 1.4em;
        pointer-events: none;
      }
    `;
  }

  /** @returns {boolean} */
  get _indeterminate() {
    return this.value < 0 || !this.hasAttribute('value');
  }

  connectedCallback() {
    super.connectedCallback();
  }

  _update() {
    super._update();
    this._applyA11y();
    this._applyStyles();
  }

  _applyA11y() {
    this.setAttribute('role', 'progressbar');
    this.setAttribute('aria-valuemin', '0');
    this.setAttribute('aria-valuemax', String(this.max));
    if (this._indeterminate) {
      this.removeAttribute('aria-valuenow');
    } else {
      const clamped = Math.min(Math.max(0, this.value), this.max);
      this.setAttribute('aria-valuenow', String(clamped));
    }
  }

  _applyStyles() {
    const vars = {};

    if (this.color)      vars['--_fill']  = resolveColor(this.color);
    if (this.background) vars['--_track'] = resolveColor(this.background);

    if (this.thickness) {
      vars['--_thickness'] = resolveSize(this.thickness) || this.thickness;
    }

    const fontSize = resolveSize(this.size);
    if (fontSize) vars['font-size'] = fontSize;

    // Percentage for bar width
    if (!this._indeterminate) {
      const pct = Math.min(100, Math.max(0, (this.value / this.max) * 100));
      vars['--_pct'] = `${pct}%`;
    }

    this._setDynamicVars(vars);
  }

  render() {
    if (this.type === 'ring') return this._renderRing();
    return this._renderBar();
  }

  _renderBar() {
    const pct = this._indeterminate
      ? 0
      : Math.round(Math.min(100, Math.max(0, (this.value / this.max) * 100)));

    return `
      <div class="bar-wrapper">
        <div class="bar-track">
          <div class="bar-fill"></div>
        </div>
        ${this.label && !this._indeterminate ? `<span class="bar-label">${pct}%</span>` : ''}
      </div>`;
  }

  _renderRing() {
    const vb = 120;
    const sw = 10;
    const r = (vb - sw) / 2;
    const circ = 2 * Math.PI * r;
    const pct = this._indeterminate
      ? 0
      : Math.min(100, Math.max(0, (this.value / this.max) * 100));
    const offset = circ - (pct / 100) * circ;

    return `
      <div class="ring-wrapper" style="--_circ:${circ};">
        <svg class="ring-svg" viewBox="0 0 ${vb} ${vb}">
          <circle class="ring-track"
            cx="${vb / 2}" cy="${vb / 2}" r="${r}"></circle>
          <circle class="ring-fill"
            cx="${vb / 2}" cy="${vb / 2}" r="${r}"
            stroke-dasharray="${circ}"
            stroke-dashoffset="${this._indeterminate ? circ * 0.75 : offset}"></circle>
        </svg>
        ${this.label && !this._indeterminate ? `<span class="ring-label">${Math.round(pct)}%</span>` : ''}
      </div>`;
  }
}

customElements.define('ui-progress', UIProgress);
