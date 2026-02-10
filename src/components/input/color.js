import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-input-color>` — Rich colour picker with swatch trigger and palette panel.
 *
 * Provides a full-featured colour picker with:
 * - Theme palette tab (18 families × 11 shades) — shown first
 * - Custom tab with saturation/brightness canvas, hue slider, alpha slider
 * - Format toggle (HEX / RGB / HSL)
 * - Recently used colours row
 * - Text input accepting any CSS colour format
 * - Native browser colour picker integration
 * - Palette tokens (`red-500`) or any CSS colour
 *
 * @element ui-input-color
 *
 * @attr {String}  value      - Current colour value (hex, rgb, hsl, or palette token)
 * @attr {String}  name       - Form field name
 * @attr {String}  label      - Label text
 * @attr {String}  help       - Help text
 * @attr {String}  error      - Error message
 * @attr {String}  size       - Size keyword or CSS length
 * @attr {Boolean} disabled   - Disables the picker
 * @attr {Boolean} required   - Marks as required
 *
 * @fires ui-change - When colour changes (detail: { value })
 */
export class UIInputColor extends UIComponent {

  static properties = {
    value:    { type: String,  default: '#6366f1', reflect: true },
    name:     { type: String,  default: '',        reflect: true },
    label:    { type: String,  default: '',        reflect: true },
    help:     { type: String,  default: '',        reflect: true },
    error:    { type: String,  default: '',        reflect: true },
    size:     { type: String,  default: '',        reflect: true },
    disabled: { type: Boolean, default: false,     reflect: true },
    required: { type: Boolean, default: false,     reflect: true },
  };

  /* ── Colour conversion helpers (static, pure) ── */

  /** Parse any CSS colour string → { h, s, l, a } (h: 0-360, s/l: 0-100, a: 0-1) */
  static parseColor(str) {
    if (!str || typeof str !== 'string') return null;
    str = str.trim().toLowerCase();

    // Theme token → hex
    const tokenEntry = UIInputColor._THEME_PALETTE.find(e => e.token === str);
    if (tokenEntry) str = tokenEntry.hex;

    // resolveColor for palette tokens
    const resolved = resolveColor(str);
    if (resolved && resolved !== str) str = resolved;

    // Named colours — use canvas to resolve
    if (/^[a-z]+$/i.test(str) && str !== 'transparent') {
      const ctx = UIInputColor._scratchCtx();
      ctx.fillStyle = '#000';
      ctx.fillStyle = str;
      const result = ctx.fillStyle;
      if (result !== '#000000' || str === 'black') str = result;
      else return null;
    }

    // #RGB / #RRGGBB / #RRGGBBAA
    const hexMatch = str.match(/^#([0-9a-f]{3,8})$/i);
    if (hexMatch) {
      let hex = hexMatch[1];
      if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
      if (hex.length === 4) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3];
      const r = parseInt(hex.slice(0,2), 16);
      const g = parseInt(hex.slice(2,4), 16);
      const b = parseInt(hex.slice(4,6), 16);
      const a = hex.length === 8 ? parseInt(hex.slice(6,8), 16) / 255 : 1;
      return UIInputColor._rgbToHsl(r, g, b, a);
    }

    // rgb(r, g, b) / rgba(r, g, b, a)
    const rgbMatch = str.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([\d.]+)\s*)?\)$/);
    if (rgbMatch) {
      return UIInputColor._rgbToHsl(+rgbMatch[1], +rgbMatch[2], +rgbMatch[3], rgbMatch[4] != null ? +rgbMatch[4] : 1);
    }

    // hsl(h, s%, l%) / hsla(h, s%, l%, a)
    const hslMatch = str.match(/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*(?:,\s*([\d.]+)\s*)?\)$/);
    if (hslMatch) {
      return { h: +hslMatch[1] % 360, s: +hslMatch[2], l: +hslMatch[3], a: hslMatch[4] != null ? +hslMatch[4] : 1 };
    }

    return null;
  }

  static _scratchCtx() {
    if (!UIInputColor.__ctx) {
      const c = document.createElement('canvas');
      c.width = c.height = 1;
      UIInputColor.__ctx = c.getContext('2d');
    }
    return UIInputColor.__ctx;
  }

  static _rgbToHsl(r, g, b, a = 1) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100), a };
  }

  static _hslToRgb(h, s, l) {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;
    if (s === 0) { r = g = b = l; }
    else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }

  /** HSL+A → hex string (#RRGGBB or #RRGGBBAA) */
  static _hslToHex(h, s, l, a = 1) {
    const { r, g, b } = UIInputColor._hslToRgb(h, s, l);
    const hex = '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
    if (a < 1) return hex + Math.round(a * 255).toString(16).padStart(2, '0');
    return hex;
  }

  /** Format HSL+A in the given mode */
  static formatColor(h, s, l, a, mode) {
    if (mode === 'rgb') {
      const { r, g, b } = UIInputColor._hslToRgb(h, s, l);
      return a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
    }
    if (mode === 'hsl') {
      return a < 1 ? `hsla(${h}, ${s}%, ${l}%, ${a})` : `hsl(${h}, ${s}%, ${l}%)`;
    }
    // default hex
    return UIInputColor._hslToHex(h, s, l, a);
  }

  /** Convert H (0-360) + S (0-100, saturation) + B (0-100, brightness) to HSL */
  static _hsbToHsl(h, s, b) {
    // s & b in 0–100
    s /= 100; b /= 100;
    const l = b * (1 - s / 2);
    const sl = l === 0 || l === 1 ? 0 : (b - l) / Math.min(l, 1 - l);
    return { h, s: Math.round(sl * 100), l: Math.round(l * 100) };
  }

  /** Convert HSL to HSB */
  static _hslToHsb(h, s, l) {
    s /= 100; l /= 100;
    const b = l + s * Math.min(l, 1 - l);
    const sb = b === 0 ? 0 : 2 * (1 - l / b);
    return { h, s: Math.round(sb * 100), b: Math.round(b * 100) };
  }

  /* ── Recently used (shared across instances, in-memory) ── */

  static _recentColors = [];
  static _MAX_RECENT = 8;

  static _addRecent(color) {
    const arr = UIInputColor._recentColors;
    const idx = arr.indexOf(color);
    if (idx !== -1) arr.splice(idx, 1);
    arr.unshift(color);
    if (arr.length > UIInputColor._MAX_RECENT) arr.length = UIInputColor._MAX_RECENT;
  }

  /* ── Theme palette ── */

  static _THEME_SHADES = [50,100,200,300,400,500,600,700,800,900,950];
  static _THEME_FAMILIES = [
    { name: 'gray',    hex: '#6b7280' }, { name: 'red',     hex: '#ef4444' },
    { name: 'orange',  hex: '#f97316' }, { name: 'amber',   hex: '#f59e0b' },
    { name: 'yellow',  hex: '#eab308' }, { name: 'lime',    hex: '#84cc16' },
    { name: 'green',   hex: '#22c55e' }, { name: 'emerald', hex: '#10b981' },
    { name: 'teal',    hex: '#14b8a6' }, { name: 'cyan',    hex: '#06b6d4' },
    { name: 'sky',     hex: '#0ea5e9' }, { name: 'blue',    hex: '#3b82f6' },
    { name: 'indigo',  hex: '#6366f1' }, { name: 'violet',  hex: '#8b5cf6' },
    { name: 'purple',  hex: '#a855f7' }, { name: 'fuchsia', hex: '#d946ef' },
    { name: 'pink',    hex: '#ec4899' }, { name: 'rose',    hex: '#f43f5e' },
  ];
  static _THEME_PALETTE = (() => {
    const shades = [50,100,200,300,400,500,600,700,800,900,950];
    const families = [
      ['gray','#f9fafb','#f3f4f6','#e5e7eb','#d1d5db','#9ca3af','#6b7280','#4b5563','#374151','#1f2937','#111827','#030712'],
      ['red','#fef2f2','#fee2e2','#fecaca','#fca5a5','#f87171','#ef4444','#dc2626','#b91c1c','#991b1b','#7f1d1d','#450a0a'],
      ['orange','#fff7ed','#ffedd5','#fed7aa','#fdba74','#fb923c','#f97316','#ea580c','#c2410c','#9a3412','#7c2d12','#431407'],
      ['amber','#fffbeb','#fef3c7','#fde68a','#fcd34d','#fbbf24','#f59e0b','#d97706','#b45309','#92400e','#78350f','#451a03'],
      ['yellow','#fefce8','#fef9c3','#fef08a','#fde047','#facc15','#eab308','#ca8a04','#a16207','#854d0e','#713f12','#422006'],
      ['lime','#f7fee7','#ecfccb','#d9f99d','#bef264','#a3e635','#84cc16','#65a30d','#4d7c0f','#3f6212','#365314','#1a2e05'],
      ['green','#f0fdf4','#dcfce7','#bbf7d0','#86efac','#4ade80','#22c55e','#16a34a','#15803d','#166534','#14532d','#052e16'],
      ['emerald','#ecfdf5','#d1fae5','#a7f3d0','#6ee7b7','#34d399','#10b981','#059669','#047857','#065f46','#064e3b','#022c22'],
      ['teal','#f0fdfa','#ccfbf1','#99f6e4','#5eead4','#2dd4bf','#14b8a6','#0d9488','#0f766e','#115e59','#134e4a','#042f2e'],
      ['cyan','#ecfeff','#cffafe','#a5f3fc','#67e8f9','#22d3ee','#06b6d4','#0891b2','#0e7490','#155e75','#164e63','#083344'],
      ['sky','#f0f9ff','#e0f2fe','#bae6fd','#7dd3fc','#38bdf8','#0ea5e9','#0284c7','#0369a1','#075985','#0c4a6e','#082f49'],
      ['blue','#eff6ff','#dbeafe','#bfdbfe','#93c5fd','#60a5fa','#3b82f6','#2563eb','#1d4ed8','#1e40af','#1e3a8a','#172554'],
      ['indigo','#eef2ff','#e0e7ff','#c7d2fe','#a5b4fc','#818cf8','#6366f1','#4f46e5','#4338ca','#3730a3','#312e81','#1e1b4b'],
      ['violet','#f5f3ff','#ede9fe','#ddd6fe','#c4b5fd','#a78bfa','#8b5cf6','#7c3aed','#6d28d9','#5b21b6','#4c1d95','#2e1065'],
      ['purple','#faf5ff','#f3e8ff','#e9d5ff','#d8b4fe','#c084fc','#a855f7','#9333ea','#7e22ce','#6b21a8','#581c87','#3b0764'],
      ['fuchsia','#fdf4ff','#fae8ff','#f5d0fe','#f0abfc','#e879f9','#d946ef','#c026d3','#a21caf','#86198f','#701a75','#4a044e'],
      ['pink','#fdf2f8','#fce7f3','#fbcfe8','#f9a8d4','#f472b6','#ec4899','#db2777','#be185d','#9d174d','#831843','#500724'],
      ['rose','#fff1f2','#ffe4e6','#fecdd3','#fda4af','#fb7185','#f43f5e','#e11d48','#be123c','#9f1239','#881337','#4c0519'],
    ];
    const result = [];
    for (const [name, ...hexes] of families) {
      for (let i = 0; i < shades.length; i++) {
        result.push({ token: `${name}-${shades[i]}`, hex: hexes[i] });
      }
    }
    return result;
  })();

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
        display: inline-flex;
        align-items: center;
        gap: 0.5em;
        padding: 0.35em 0.6em;
        border: 1px solid var(--ui-border-color, #d1d5db);
        border-radius: var(--ui-radius, 0.375em);
        background: var(--ui-bg, #fff);
        cursor: pointer;
        transition: border-color 0.15s ease;
        font-family: inherit;
        font-size: inherit;
      }
      .trigger:hover { border-color: #9ca3af; }
      .trigger:focus-within {
        outline: none;
        border-color: var(--ui-focus-ring, #6366f1);
        box-shadow: 0 0 0 0.15em rgba(99, 102, 241, 0.25);
      }
      :host([error]) .trigger { border-color: var(--ui-red-500, #ef4444); }

      .swatch {
        display: block;
        position: relative;
        width: 1.5em; height: 1.5em;
        border-radius: 0.25em;
        border: 1px solid rgba(0,0,0,0.15);
        flex-shrink: 0;
        overflow: hidden;
        /* checkerboard for alpha */
        background-image:
          linear-gradient(45deg, #ccc 25%, transparent 25%),
          linear-gradient(-45deg, #ccc 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #ccc 75%),
          linear-gradient(-45deg, transparent 75%, #ccc 75%);
        background-size: 0.5em 0.5em;
        background-position: 0 0, 0 0.25em, 0.25em -0.25em, -0.25em 0;
      }
      .swatch-color {
        position: absolute;
        inset: 0;
        display: block;
        border-radius: 0.2em;
      }
      .value-text {
        font-family: var(--ui-font-mono, monospace);
        font-size: 0.9em;
        color: var(--ui-text-color, #374151);
        min-width: 5em;
      }

      .panel {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 999;
        margin-top: 0.25em;
        padding: 0.75em;
        border: 1px solid var(--ui-border-color, #d1d5db);
        border-radius: var(--ui-radius, 0.375em);
        background: var(--ui-bg, #fff);
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        width: min-content;
        min-width: 16em;
      }
      :host([data-open]) .panel { display: block; }

      /* ── Tabs ── */
      .panel-tabs {
        display: flex;
        margin-bottom: 0.6em;
        border: 1px solid var(--ui-border-color, #d1d5db);
        border-radius: var(--ui-radius, 0.25em);
        overflow: hidden;
      }
      .panel-tab {
        flex: 1;
        padding: 0.3em 0;
        text-align: center;
        cursor: pointer;
        font-size: 0.75em;
        font-weight: 600;
        font-family: inherit;
        background: transparent;
        border: none;
        color: var(--ui-text-muted, #6b7280);
        transition: background 0.15s ease, color 0.15s ease;
      }
      .panel-tab:not(:last-child) { border-right: 1px solid var(--ui-border-color, #d1d5db); }
      .panel-tab[data-active] {
        background: var(--ui-indigo-500, #6366f1);
        color: #fff;
      }

      .panel-custom { display: none; }
      .panel-theme {}

      /* ── Custom panel: Canvas & sliders ── */
      .sat-bright-canvas {
        width: 100%;
        height: 10em;
        border-radius: 0.3em;
        cursor: crosshair;
        display: block;
        border: 1px solid var(--ui-border-color, #d1d5db);
      }
      .sb-cursor {
        width: 0.9em; height: 0.9em;
        border: 2px solid #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(0,0,0,0.2);
        position: absolute;
        pointer-events: none;
        transform: translate(-50%, -50%);
      }
      .canvas-wrap {
        position: relative;
        margin-bottom: 0.5em;
      }

      .slider-row {
        display: flex;
        align-items: center;
        gap: 0.4em;
        margin-bottom: 0.35em;
      }
      .slider-preview {
        width: 2em; height: 2em;
        border-radius: 0.3em;
        border: 1px solid rgba(0,0,0,0.15);
        flex-shrink: 0;
        /* checkerboard */
        background-image:
          linear-gradient(45deg, #ccc 25%, transparent 25%),
          linear-gradient(-45deg, #ccc 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #ccc 75%),
          linear-gradient(-45deg, transparent 75%, #ccc 75%);
        background-size: 0.5em 0.5em;
        background-position: 0 0, 0 0.25em, 0.25em -0.25em, -0.25em 0;
      }
      .slider-preview-color {
        width: 100%; height: 100%;
        border-radius: 0.25em;
      }
      .sliders-col {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.2em;
      }
      .track-wrap {
        position: relative;
        height: 0.75em;
        border-radius: 0.375em;
        cursor: pointer;
      }
      .track {
        width: 100%;
        height: 100%;
        border-radius: 0.375em;
        border: 1px solid rgba(0,0,0,0.1);
      }
      .hue-track {
        background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
      }
      .alpha-track {
        background-image:
          linear-gradient(45deg, #ccc 25%, transparent 25%),
          linear-gradient(-45deg, #ccc 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #ccc 75%),
          linear-gradient(-45deg, transparent 75%, #ccc 75%);
        background-size: 0.4em 0.4em;
        background-position: 0 0, 0 0.2em, 0.2em -0.2em, -0.2em 0;
        position: relative;
        overflow: hidden;
      }
      .alpha-gradient {
        position: absolute;
        inset: 0;
        border-radius: 0.375em;
      }
      .slider-thumb {
        width: 0.75em; height: 0.75em;
        border: 2px solid #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.3);
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
      }

      /* ── Input row ── */
      .input-row {
        display: flex;
        gap: 0.3em;
        align-items: center;
        margin-top: 0.35em;
      }
      .format-btn {
        font-size: 0.65em;
        font-weight: 700;
        font-family: inherit;
        background: var(--ui-bg-subtle, #f9fafb);
        border: 1px solid var(--ui-border-color, #d1d5db);
        border-radius: var(--ui-radius, 0.25em);
        padding: 0.3em 0.5em;
        cursor: pointer;
        color: var(--ui-text-muted, #6b7280);
        white-space: nowrap;
        transition: background 0.1s, color 0.1s;
      }
      .format-btn:hover { background: var(--ui-indigo-500, #6366f1); color: #fff; }
      .color-input {
        flex: 1;
        padding: 0.3em 0.5em;
        border: 1px solid var(--ui-border-color, #d1d5db);
        border-radius: var(--ui-radius, 0.25em);
        font-family: var(--ui-font-mono, monospace);
        font-size: 0.8em;
        outline: none;
        min-width: 0;
      }
      .color-input:focus { border-color: var(--ui-focus-ring, #6366f1); }

      .native-input {
        width: 1.8em; height: 1.8em;
        border: none; padding: 0;
        cursor: pointer; background: none;
        border-radius: 0.2em;
        overflow: hidden;
        flex-shrink: 0;
      }
      .native-input::-webkit-color-swatch-wrapper { padding: 0; }
      .native-input::-webkit-color-swatch { border: 1px solid rgba(0,0,0,0.15); border-radius: 0.2em; }
      .native-input::-moz-color-swatch { border: 1px solid rgba(0,0,0,0.15); border-radius: 0.2em; }

      /* ── Recent colours ── */
      .recent-row {
        display: flex;
        gap: 0.2em;
        margin-top: 0.5em;
        min-height: 1.1em;
      }
      .recent-swatch {
        width: 1.1em; height: 1.1em;
        border-radius: 0.15em;
        border: 1px solid rgba(0,0,0,0.15);
        cursor: pointer;
        padding: 0;
        transition: transform 0.1s;
      }
      .recent-swatch:hover { transform: scale(1.2); }

      /* ── Theme palette ── */
      .theme-palette {}
      .theme-row {
        display: grid;
        grid-template-columns: repeat(18, 1.15em) 2.2em;
        gap: 0;
      }
      .theme-header-row { margin-bottom: 0.35em; }
      .theme-col-label {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .theme-col-dot {
        width: 0.6em;
        height: 0.6em;
        border-radius: 50%;
        display: block;
      }
      .shade-num {
        font-size: 0.5em;
        color: var(--ui-text-muted, #6b7280);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-left: 0.5em;
        font-variant-numeric: tabular-nums;
        user-select: none;
      }
      .theme-swatch {
        width: 100%;
        height: 1.1em;
        border: none;
        cursor: pointer;
        padding: 0;
        box-sizing: border-box;
        position: relative;
        transition: transform 0.1s ease, box-shadow 0.1s ease;
        outline: none;
        border-radius: 0;
      }
      [data-shade="first"] .theme-swatch  { border-radius: 0.2em 0.2em 0 0; }
      [data-shade="last"]  .theme-swatch  { border-radius: 0 0 0.2em 0.2em; }
      .theme-swatch:hover {
        transform: scale(1.35);
        z-index: 2;
        border-radius: 0.15em;
        box-shadow: 0 0 0 1.5px #fff, 0 0 0 2.5px rgba(0,0,0,0.35);
      }
      .theme-swatch[data-selected] {
        z-index: 1;
        border-radius: 0.15em;
        box-shadow: 0 0 0 1.5px #fff, 0 0 0 2.5px var(--ui-text-color, #111827);
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
    this._activeTab = 'theme';      // 'theme' | 'custom'
    this._format = 'hex';           // 'hex' | 'rgb' | 'hsl'
    this._hue = 0;                  // 0-360
    this._saturation = 100;         // 0-100 (HSB saturation)
    this._brightness = 100;         // 0-100 (HSB brightness / value)
    this._alpha = 1;                // 0-1
    this._draggingCanvas = false;
    this._draggingHue = false;
    this._draggingAlpha = false;

    this._onTriggerClick     = this._onTriggerClick.bind(this);
    this._onOutsideClick     = this._onOutsideClick.bind(this);
    this._onThemeSwatchClick = this._onThemeSwatchClick.bind(this);
    this._onTabClick         = this._onTabClick.bind(this);
    this._onColorInput       = this._onColorInput.bind(this);
    this._onNativeInput      = this._onNativeInput.bind(this);
    this._onFormatToggle     = this._onFormatToggle.bind(this);

    // Pointer handlers
    this._onCanvasPointerDown = this._onCanvasPointerDown.bind(this);
    this._onHuePointerDown    = this._onHuePointerDown.bind(this);
    this._onAlphaPointerDown  = this._onAlphaPointerDown.bind(this);
    this._onPointerMove       = this._onPointerMove.bind(this);
    this._onPointerUp         = this._onPointerUp.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._syncFromValue();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onOutsideClick);
    document.removeEventListener('pointermove', this._onPointerMove);
    document.removeEventListener('pointerup', this._onPointerUp);
  }

  render() {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const themePalette = UIInputColor._THEME_PALETTE;
    const displayColor = this._displayColor(this.value);
    const recent = UIInputColor._recentColors;
    return `
      <div class="label" part="label">
        ${esc(this.label)}<span class="req">${this.required ? ' *' : ''}</span>
      </div>
      <div class="trigger" part="trigger" tabindex="0">
        <span class="swatch"><span class="swatch-color" style="background:${esc(displayColor)}"></span></span>
        <span class="value-text">${esc(this.value)}</span>
      </div>
      <div class="panel" part="panel">
        <div class="panel-tabs">
          <button type="button" class="panel-tab" data-tab="theme" ${this._activeTab === 'theme' ? 'data-active' : ''}>Theme</button>
          <button type="button" class="panel-tab" data-tab="custom" ${this._activeTab === 'custom' ? 'data-active' : ''}>Custom</button>
        </div>

        <div class="panel-custom" style="display:${this._activeTab === 'custom' ? 'block' : 'none'}">
          <div class="canvas-wrap">
            <canvas class="sat-bright-canvas"></canvas>
            <div class="sb-cursor"></div>
          </div>
          <div class="slider-row">
            <div class="slider-preview"><div class="slider-preview-color"></div></div>
            <div class="sliders-col">
              <div class="track-wrap hue-wrap">
                <div class="track hue-track"></div>
                <div class="slider-thumb hue-thumb"></div>
              </div>
              <div class="track-wrap alpha-wrap">
                <div class="track alpha-track"><div class="alpha-gradient"></div></div>
                <div class="slider-thumb alpha-thumb"></div>
              </div>
            </div>
          </div>
          <div class="input-row">
            <button type="button" class="format-btn">${this._format.toUpperCase()}</button>
            <input class="color-input" type="text" value="${esc(this.value)}" spellcheck="false" placeholder="hex, rgb, hsl, name…" />
            <input class="native-input" type="color" value="${esc(this._toHex6(this.value))}" aria-label="Pick colour" />
          </div>
          ${recent.length ? `<div class="recent-row">${recent.map(c => `<button type="button" class="recent-swatch" style="background:${c}" data-color="${esc(c)}" title="${esc(c)}" aria-label="${esc(c)}"></button>`).join('')}</div>` : ''}
        </div>

        <div class="panel-theme" style="display:${this._activeTab === 'theme' ? 'block' : 'none'}">
          <div class="theme-palette">
            <div class="theme-row theme-header-row">
              ${UIInputColor._THEME_FAMILIES.map(f => `<span class="theme-col-label" title="${f.name}"><span class="theme-col-dot" style="background:${f.hex}"></span></span>`).join('')}
              <span class="shade-num"></span>
            </div>
            ${UIInputColor._THEME_SHADES.map((shade, si) => {
              const rowAttr = si === 0 ? ' data-shade="first"' : si === UIInputColor._THEME_SHADES.length - 1 ? ' data-shade="last"' : '';
              const cells = UIInputColor._THEME_FAMILIES.map((_, fi) => {
                const e = themePalette[fi * UIInputColor._THEME_SHADES.length + si];
                return `<button type="button" class="theme-swatch" style="background:${e.hex}" data-token="${e.token}" ${e.token === this.value ? 'data-selected' : ''} aria-label="${e.token}" title="${e.token}"></button>`;
              }).join('');
              return `<div class="theme-row"${rowAttr}>${cells}<span class="shade-num">${shade}</span></div>`;
            }).join('')}
          </div>
        </div>
      </div>
      <div class="help" part="help">${esc(this.help)}</div>
      <div class="error-msg" part="error">${esc(this.error)}</div>
    `;
  }

  _update() {
    this._applySize();
    super._update();
    this._attachListeners();
    this._drawCanvas();
    this._updateUI();
  }

  _applySize() {
    const vars = {};
    const sz = resolveSize(this.size);
    if (sz) vars['font-size'] = sz;
    this._setDynamicVars(vars);
  }

  _attachListeners() {
    const trigger = this.shadowRoot.querySelector('.trigger');
    if (trigger) trigger.addEventListener('click', this._onTriggerClick);

    this.shadowRoot.querySelectorAll('.theme-swatch').forEach(s => {
      s.addEventListener('click', this._onThemeSwatchClick);
    });

    this.shadowRoot.querySelectorAll('.panel-tab').forEach(t => {
      t.addEventListener('click', this._onTabClick);
    });

    const colorInput = this.shadowRoot.querySelector('.color-input');
    if (colorInput) colorInput.addEventListener('change', this._onColorInput);

    const native = this.shadowRoot.querySelector('.native-input');
    if (native) native.addEventListener('input', this._onNativeInput);

    const formatBtn = this.shadowRoot.querySelector('.format-btn');
    if (formatBtn) formatBtn.addEventListener('click', this._onFormatToggle);

    // Canvas & slider interactions
    const canvas = this.shadowRoot.querySelector('.sat-bright-canvas');
    if (canvas) canvas.addEventListener('pointerdown', this._onCanvasPointerDown);

    const hueWrap = this.shadowRoot.querySelector('.hue-wrap');
    if (hueWrap) hueWrap.addEventListener('pointerdown', this._onHuePointerDown);

    const alphaWrap = this.shadowRoot.querySelector('.alpha-wrap');
    if (alphaWrap) alphaWrap.addEventListener('pointerdown', this._onAlphaPointerDown);

    // Recent swatches
    this.shadowRoot.querySelectorAll('.recent-swatch').forEach(s => {
      s.addEventListener('click', (e) => {
        e.stopPropagation();
        this._setValueFromInput(e.currentTarget.getAttribute('data-color'));
      });
    });
  }

  /* ── Sync internal HSB state from the value prop ── */
  _syncFromValue() {
    const parsed = UIInputColor.parseColor(this.value);
    if (parsed) {
      this._hue = parsed.h;
      this._alpha = parsed.a;
      const hsb = UIInputColor._hslToHsb(parsed.h, parsed.s, parsed.l);
      this._saturation = hsb.s;
      this._brightness = hsb.b;
    }
  }

  /* ── Canvas drawing ── */
  _drawCanvas() {
    const canvas = this.shadowRoot.querySelector('.sat-bright-canvas');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const w = Math.round(rect.width) || 200;
    const h = Math.round(rect.height) || 150;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    // Base hue fill
    ctx.fillStyle = `hsl(${this._hue}, 100%, 50%)`;
    ctx.fillRect(0, 0, w, h);

    // White gradient left → right
    const whiteGrad = ctx.createLinearGradient(0, 0, w, 0);
    whiteGrad.addColorStop(0, 'rgba(255,255,255,1)');
    whiteGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = whiteGrad;
    ctx.fillRect(0, 0, w, h);

    // Black gradient top → bottom
    const blackGrad = ctx.createLinearGradient(0, 0, 0, h);
    blackGrad.addColorStop(0, 'rgba(0,0,0,0)');
    blackGrad.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = blackGrad;
    ctx.fillRect(0, 0, w, h);
  }

  /* ── Live-update all UI elements without re-render ── */
  _updateUI() {
    const hsl = UIInputColor._hsbToHsl(this._hue, this._saturation, this._brightness);
    const hexColor = UIInputColor._hslToHex(hsl.h, hsl.s, hsl.l, this._alpha);
    const solidHex = UIInputColor._hslToHex(hsl.h, hsl.s, hsl.l, 1);

    // Canvas cursor
    const cursor = this.shadowRoot.querySelector('.sb-cursor');
    const canvas = this.shadowRoot.querySelector('.sat-bright-canvas');
    if (cursor && canvas) {
      const x = (this._saturation / 100) * canvas.width;
      const y = (1 - this._brightness / 100) * canvas.height;
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
      cursor.style.background = solidHex;
    }

    // Hue thumb
    const hueThumb = this.shadowRoot.querySelector('.hue-thumb');
    const hueWrap = this.shadowRoot.querySelector('.hue-wrap');
    if (hueThumb && hueWrap) {
      const pct = this._hue / 360 * 100;
      hueThumb.style.left = `${pct}%`;
      hueThumb.style.background = `hsl(${this._hue}, 100%, 50%)`;
    }

    // Alpha thumb + gradient
    const alphaThumb = this.shadowRoot.querySelector('.alpha-thumb');
    const alphaGrad = this.shadowRoot.querySelector('.alpha-gradient');
    if (alphaThumb) {
      alphaThumb.style.left = `${this._alpha * 100}%`;
      alphaThumb.style.background = hexColor;
    }
    if (alphaGrad) {
      alphaGrad.style.background = `linear-gradient(to right, transparent, ${solidHex})`;
    }

    // Preview swatch
    const previewColor = this.shadowRoot.querySelector('.slider-preview-color');
    if (previewColor) {
      previewColor.style.background = hexColor;
    }

    // Trigger swatch
    const swatchColor = this.shadowRoot.querySelector('.swatch-color');
    if (swatchColor) {
      swatchColor.style.background = this._displayColor(this.value);
    }

    // Input & text
    const colorInput = this.shadowRoot.querySelector('.color-input');
    const valueText = this.shadowRoot.querySelector('.value-text');
    if (colorInput && colorInput !== this.shadowRoot.activeElement) colorInput.value = this.value;
    if (valueText) valueText.textContent = this.value;

    // Native
    const native = this.shadowRoot.querySelector('.native-input');
    if (native) native.value = this._toHex6(this.value);

    // Theme palette selection
    this.shadowRoot.querySelectorAll('.theme-swatch').forEach(s => {
      if (s.getAttribute('data-token') === this.value) s.setAttribute('data-selected', '');
      else s.removeAttribute('data-selected');
    });
  }

  /* ── Event handlers ── */

  /**
   * Resolve the value to an actual CSS colour for swatch display.
   * Palette tokens are looked up in _THEME_PALETTE so we get a real
   * hex colour instead of a `var(--ui-…)` reference.
   */
  _displayColor(v) {
    if (!v) return 'transparent';
    const entry = UIInputColor._THEME_PALETTE.find(e => e.token === v);
    if (entry) return entry.hex;
    return v;
  }

  _toHex6(v) {
    const entry = UIInputColor._THEME_PALETTE.find(e => e.token === v);
    if (entry) return entry.hex;
    if (/^#[0-9a-fA-F]{6}$/.test(v)) return v;
    if (/^#[0-9a-fA-F]{3}$/.test(v)) {
      return '#' + v[1]+v[1] + v[2]+v[2] + v[3]+v[3];
    }
    // Try to parse any format and convert
    const parsed = UIInputColor.parseColor(v);
    if (parsed) return UIInputColor._hslToHex(parsed.h, parsed.s, parsed.l, 1);
    return v.startsWith('#') ? v.slice(0,7) : v;
  }

  _openPanel() {
    if (this._open) return;
    this._open = true;
    this.setAttribute('data-open', '');
    document.addEventListener('click', this._onOutsideClick);
    // Redraw canvas after panel becomes visible
    requestAnimationFrame(() => {
      this._syncFromValue();
      this._drawCanvas();
      this._updateUI();
    });
  }

  _closePanel() {
    if (!this._open) return;
    this._open = false;
    this.removeAttribute('data-open');
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

  _onThemeSwatchClick(e) {
    e.stopPropagation();
    const token = e.currentTarget.getAttribute('data-token');
    this._setValueFromInput(token);
  }

  _onTabClick(e) {
    e.stopPropagation();
    const tab = e.currentTarget.getAttribute('data-tab');
    this._activeTab = tab;
    this.shadowRoot.querySelectorAll('.panel-tab').forEach(t => {
      if (t.getAttribute('data-tab') === tab) t.setAttribute('data-active', '');
      else t.removeAttribute('data-active');
    });
    const customPanel = this.shadowRoot.querySelector('.panel-custom');
    const themePanel  = this.shadowRoot.querySelector('.panel-theme');
    if (themePanel)  themePanel.style.display  = tab === 'theme'  ? 'block' : 'none';
    if (customPanel) customPanel.style.display = tab === 'custom' ? 'block' : 'none';

    // Redraw canvas when switching to custom tab
    if (tab === 'custom') {
      requestAnimationFrame(() => { this._drawCanvas(); this._updateUI(); });
    }
  }

  _onFormatToggle(e) {
    e.stopPropagation();
    const modes = ['hex', 'rgb', 'hsl'];
    this._format = modes[(modes.indexOf(this._format) + 1) % modes.length];
    const btn = this.shadowRoot.querySelector('.format-btn');
    if (btn) btn.textContent = this._format.toUpperCase();
    // Re-format current colour in new format
    this._updateValueFromHsb();
  }

  _onColorInput(e) {
    const v = e.target.value.trim();
    if (v) this._setValueFromInput(v);
  }

  _onNativeInput(e) {
    this._setValueFromInput(e.target.value);
  }

  /* ── Canvas pointer interaction ── */

  _onCanvasPointerDown(e) {
    e.preventDefault();
    e.stopPropagation();
    this._draggingCanvas = true;
    document.addEventListener('pointermove', this._onPointerMove);
    document.addEventListener('pointerup', this._onPointerUp);
    this._handleCanvasMove(e);
  }

  _onHuePointerDown(e) {
    e.preventDefault();
    e.stopPropagation();
    this._draggingHue = true;
    document.addEventListener('pointermove', this._onPointerMove);
    document.addEventListener('pointerup', this._onPointerUp);
    this._handleHueMove(e);
  }

  _onAlphaPointerDown(e) {
    e.preventDefault();
    e.stopPropagation();
    this._draggingAlpha = true;
    document.addEventListener('pointermove', this._onPointerMove);
    document.addEventListener('pointerup', this._onPointerUp);
    this._handleAlphaMove(e);
  }

  _onPointerMove(e) {
    if (this._draggingCanvas) this._handleCanvasMove(e);
    if (this._draggingHue) this._handleHueMove(e);
    if (this._draggingAlpha) this._handleAlphaMove(e);
  }

  _onPointerUp() {
    this._draggingCanvas = false;
    this._draggingHue = false;
    this._draggingAlpha = false;
    document.removeEventListener('pointermove', this._onPointerMove);
    document.removeEventListener('pointerup', this._onPointerUp);
  }

  _handleCanvasMove(e) {
    const canvas = this.shadowRoot.querySelector('.sat-bright-canvas');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    this._saturation = Math.round((x / rect.width) * 100);
    this._brightness = Math.round((1 - y / rect.height) * 100);
    this._updateValueFromHsb();
  }

  _handleHueMove(e) {
    const wrap = this.shadowRoot.querySelector('.hue-wrap');
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    this._hue = Math.round((x / rect.width) * 360);
    this._drawCanvas();
    this._updateValueFromHsb();
  }

  _handleAlphaMove(e) {
    const wrap = this.shadowRoot.querySelector('.alpha-wrap');
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    this._alpha = Math.round((x / rect.width) * 100) / 100;
    this._updateValueFromHsb();
  }

  /* ── Value management ── */

  /** Update value from internal HSB + alpha state, formatted per current mode */
  _updateValueFromHsb() {
    const hsl = UIInputColor._hsbToHsl(this._hue, this._saturation, this._brightness);
    const formatted = UIInputColor.formatColor(hsl.h, hsl.s, hsl.l, this._alpha, this._format);
    this.value = formatted;
    this._updateUI();
    this.emit('ui-change', { value: formatted });
  }

  /** Set value from external input (text field, palette swatch, etc.) */
  _setValueFromInput(v) {
    const parsed = UIInputColor.parseColor(v);
    if (parsed) {
      this._hue = parsed.h;
      this._alpha = parsed.a;
      const hsb = UIInputColor._hslToHsb(parsed.h, parsed.s, parsed.l);
      this._saturation = hsb.s;
      this._brightness = hsb.b;
      this._drawCanvas();
    }
    this.value = v;
    UIInputColor._addRecent(v);
    this._updateUI();
    // Update recent row
    this._refreshRecent();
    this.emit('ui-change', { value: v });
  }

  /** Rebuild the recent-swatches row without full re-render */
  _refreshRecent() {
    const panel = this.shadowRoot.querySelector('.panel-custom');
    if (!panel) return;
    const existing = panel.querySelector('.recent-row');
    const recent = UIInputColor._recentColors;
    if (!recent.length) { if (existing) existing.remove(); return; }
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const html = `<div class="recent-row">${recent.map(c => `<button type="button" class="recent-swatch" style="background:${c}" data-color="${esc(c)}" title="${esc(c)}" aria-label="${esc(c)}"></button>`).join('')}</div>`;
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const newRow = temp.firstElementChild;
    if (existing) existing.replaceWith(newRow);
    else panel.appendChild(newRow);
    // Re-bind listeners
    newRow.querySelectorAll('.recent-swatch').forEach(s => {
      s.addEventListener('click', (e) => {
        e.stopPropagation();
        this._setValueFromInput(e.currentTarget.getAttribute('data-color'));
      });
    });
  }
}

customElements.define('ui-input-color', UIInputColor);
