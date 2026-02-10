// src/core/ui-theme.js
var THEME_ID = "ui-theme-tokens";
var css = (
  /* css */
  `
:root {
  /* ================================================================ */
  /*  Primitive palette (shade 50\u2013950)                                 */
  /*  Derived from the Tailwind CSS colour palette.                    */
  /* ================================================================ */

  /* ---- Gray ---- */
  --ui-gray-50:  #f9fafb;
  --ui-gray-100: #f3f4f6;
  --ui-gray-200: #e5e7eb;
  --ui-gray-300: #d1d5db;
  --ui-gray-400: #9ca3af;
  --ui-gray-500: #6b7280;
  --ui-gray-600: #4b5563;
  --ui-gray-700: #374151;
  --ui-gray-800: #1f2937;
  --ui-gray-900: #111827;
  --ui-gray-950: #030712;

  /* ---- Red ---- */
  --ui-red-50:  #fef2f2;
  --ui-red-100: #fee2e2;
  --ui-red-200: #fecaca;
  --ui-red-300: #fca5a5;
  --ui-red-400: #f87171;
  --ui-red-500: #ef4444;
  --ui-red-600: #dc2626;
  --ui-red-700: #b91c1c;
  --ui-red-800: #991b1b;
  --ui-red-900: #7f1d1d;
  --ui-red-950: #450a0a;

  /* ---- Orange ---- */
  --ui-orange-50:  #fff7ed;
  --ui-orange-100: #ffedd5;
  --ui-orange-200: #fed7aa;
  --ui-orange-300: #fdba74;
  --ui-orange-400: #fb923c;
  --ui-orange-500: #f97316;
  --ui-orange-600: #ea580c;
  --ui-orange-700: #c2410c;
  --ui-orange-800: #9a3412;
  --ui-orange-900: #7c2d12;
  --ui-orange-950: #431407;

  /* ---- Amber ---- */
  --ui-amber-50:  #fffbeb;
  --ui-amber-100: #fef3c7;
  --ui-amber-200: #fde68a;
  --ui-amber-300: #fcd34d;
  --ui-amber-400: #fbbf24;
  --ui-amber-500: #f59e0b;
  --ui-amber-600: #d97706;
  --ui-amber-700: #b45309;
  --ui-amber-800: #92400e;
  --ui-amber-900: #78350f;
  --ui-amber-950: #451a03;

  /* ---- Yellow ---- */
  --ui-yellow-50:  #fefce8;
  --ui-yellow-100: #fef9c3;
  --ui-yellow-200: #fef08a;
  --ui-yellow-300: #fde047;
  --ui-yellow-400: #facc15;
  --ui-yellow-500: #eab308;
  --ui-yellow-600: #ca8a04;
  --ui-yellow-700: #a16207;
  --ui-yellow-800: #854d0e;
  --ui-yellow-900: #713f12;
  --ui-yellow-950: #422006;

  /* ---- Lime ---- */
  --ui-lime-50:  #f7fee7;
  --ui-lime-100: #ecfccb;
  --ui-lime-200: #d9f99d;
  --ui-lime-300: #bef264;
  --ui-lime-400: #a3e635;
  --ui-lime-500: #84cc16;
  --ui-lime-600: #65a30d;
  --ui-lime-700: #4d7c0f;
  --ui-lime-800: #3f6212;
  --ui-lime-900: #365314;
  --ui-lime-950: #1a2e05;

  /* ---- Green ---- */
  --ui-green-50:  #f0fdf4;
  --ui-green-100: #dcfce7;
  --ui-green-200: #bbf7d0;
  --ui-green-300: #86efac;
  --ui-green-400: #4ade80;
  --ui-green-500: #22c55e;
  --ui-green-600: #16a34a;
  --ui-green-700: #15803d;
  --ui-green-800: #166534;
  --ui-green-900: #14532d;
  --ui-green-950: #052e16;

  /* ---- Emerald ---- */
  --ui-emerald-50:  #ecfdf5;
  --ui-emerald-100: #d1fae5;
  --ui-emerald-200: #a7f3d0;
  --ui-emerald-300: #6ee7b7;
  --ui-emerald-400: #34d399;
  --ui-emerald-500: #10b981;
  --ui-emerald-600: #059669;
  --ui-emerald-700: #047857;
  --ui-emerald-800: #065f46;
  --ui-emerald-900: #064e3b;
  --ui-emerald-950: #022c22;

  /* ---- Teal ---- */
  --ui-teal-50:  #f0fdfa;
  --ui-teal-100: #ccfbf1;
  --ui-teal-200: #99f6e4;
  --ui-teal-300: #5eead4;
  --ui-teal-400: #2dd4bf;
  --ui-teal-500: #14b8a6;
  --ui-teal-600: #0d9488;
  --ui-teal-700: #0f766e;
  --ui-teal-800: #115e59;
  --ui-teal-900: #134e4a;
  --ui-teal-950: #042f2e;

  /* ---- Cyan ---- */
  --ui-cyan-50:  #ecfeff;
  --ui-cyan-100: #cffafe;
  --ui-cyan-200: #a5f3fc;
  --ui-cyan-300: #67e8f9;
  --ui-cyan-400: #22d3ee;
  --ui-cyan-500: #06b6d4;
  --ui-cyan-600: #0891b2;
  --ui-cyan-700: #0e7490;
  --ui-cyan-800: #155e75;
  --ui-cyan-900: #164e63;
  --ui-cyan-950: #083344;

  /* ---- Sky ---- */
  --ui-sky-50:  #f0f9ff;
  --ui-sky-100: #e0f2fe;
  --ui-sky-200: #bae6fd;
  --ui-sky-300: #7dd3fc;
  --ui-sky-400: #38bdf8;
  --ui-sky-500: #0ea5e9;
  --ui-sky-600: #0284c7;
  --ui-sky-700: #0369a1;
  --ui-sky-800: #075985;
  --ui-sky-900: #0c4a6e;
  --ui-sky-950: #082f49;

  /* ---- Blue ---- */
  --ui-blue-50:  #eff6ff;
  --ui-blue-100: #dbeafe;
  --ui-blue-200: #bfdbfe;
  --ui-blue-300: #93c5fd;
  --ui-blue-400: #60a5fa;
  --ui-blue-500: #3b82f6;
  --ui-blue-600: #2563eb;
  --ui-blue-700: #1d4ed8;
  --ui-blue-800: #1e40af;
  --ui-blue-900: #1e3a8a;
  --ui-blue-950: #172554;

  /* ---- Indigo ---- */
  --ui-indigo-50:  #eef2ff;
  --ui-indigo-100: #e0e7ff;
  --ui-indigo-200: #c7d2fe;
  --ui-indigo-300: #a5b4fc;
  --ui-indigo-400: #818cf8;
  --ui-indigo-500: #6366f1;
  --ui-indigo-600: #4f46e5;
  --ui-indigo-700: #4338ca;
  --ui-indigo-800: #3730a3;
  --ui-indigo-900: #312e81;
  --ui-indigo-950: #1e1b4b;

  /* ---- Violet ---- */
  --ui-violet-50:  #f5f3ff;
  --ui-violet-100: #ede9fe;
  --ui-violet-200: #ddd6fe;
  --ui-violet-300: #c4b5fd;
  --ui-violet-400: #a78bfa;
  --ui-violet-500: #8b5cf6;
  --ui-violet-600: #7c3aed;
  --ui-violet-700: #6d28d9;
  --ui-violet-800: #5b21b6;
  --ui-violet-900: #4c1d95;
  --ui-violet-950: #2e1065;

  /* ---- Purple ---- */
  --ui-purple-50:  #faf5ff;
  --ui-purple-100: #f3e8ff;
  --ui-purple-200: #e9d5ff;
  --ui-purple-300: #d8b4fe;
  --ui-purple-400: #c084fc;
  --ui-purple-500: #a855f7;
  --ui-purple-600: #9333ea;
  --ui-purple-700: #7e22ce;
  --ui-purple-800: #6b21a8;
  --ui-purple-900: #581c87;
  --ui-purple-950: #3b0764;

  /* ---- Fuchsia ---- */
  --ui-fuchsia-50:  #fdf4ff;
  --ui-fuchsia-100: #fae8ff;
  --ui-fuchsia-200: #f5d0fe;
  --ui-fuchsia-300: #f0abfc;
  --ui-fuchsia-400: #e879f9;
  --ui-fuchsia-500: #d946ef;
  --ui-fuchsia-600: #c026d3;
  --ui-fuchsia-700: #a21caf;
  --ui-fuchsia-800: #86198f;
  --ui-fuchsia-900: #701a75;
  --ui-fuchsia-950: #4a044e;

  /* ---- Pink ---- */
  --ui-pink-50:  #fdf2f8;
  --ui-pink-100: #fce7f3;
  --ui-pink-200: #fbcfe8;
  --ui-pink-300: #f9a8d4;
  --ui-pink-400: #f472b6;
  --ui-pink-500: #ec4899;
  --ui-pink-600: #db2777;
  --ui-pink-700: #be185d;
  --ui-pink-800: #9d174d;
  --ui-pink-900: #831843;
  --ui-pink-950: #500724;

  /* ---- Rose ---- */
  --ui-rose-50:  #fff1f2;
  --ui-rose-100: #ffe4e6;
  --ui-rose-200: #fecdd3;
  --ui-rose-300: #fda4af;
  --ui-rose-400: #fb7185;
  --ui-rose-500: #f43f5e;
  --ui-rose-600: #e11d48;
  --ui-rose-700: #be123c;
  --ui-rose-800: #9f1239;
  --ui-rose-900: #881337;
  --ui-rose-950: #4c0519;

  /* ================================================================ */
  /*  Shared UI tokens                                                 */
  /* ================================================================ */

  --ui-font:            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                        "Helvetica Neue", Helvetica, Arial, sans-serif;
  --ui-font-mono:       ui-monospace, SFMono-Regular, "SF Mono", Menlo,
                        Consolas, "Liberation Mono", monospace;
  --ui-focus-ring:      var(--ui-indigo-500);
  --ui-border-color:    var(--ui-gray-300);
  --ui-text-color:      var(--ui-gray-900);
  --ui-text-muted:      var(--ui-gray-500);
  --ui-bg:              #fff;
  --ui-bg-subtle:       var(--ui-gray-50);
  --ui-radius:          0.375em;
  --ui-button-radius:   var(--ui-radius);
}
`
);
function installTheme() {
  if (typeof document === "undefined") return;
  if (document.getElementById(THEME_ID)) return;
  const style = document.createElement("style");
  style.id = THEME_ID;
  style.textContent = css;
  document.head.prepend(style);
}
installTheme();

// src/core/ui-utils.js
var SIZE_MAP = Object.freeze({
  "xx-small": 0.5625,
  //  9px @ 16px base
  "x-small": 0.625,
  // 10px
  "small": 0.8125,
  // 13px
  "medium": 1,
  // 16px
  "large": 1.125,
  // 18px
  "x-large": 1.5,
  // 24px
  "xx-large": 2,
  // 32px
  "xxx-large": 3
  // 48px
});
function resolveSize(size) {
  if (!size) return void 0;
  const key = size.trim().toLowerCase();
  if (key in SIZE_MAP) {
    return `${SIZE_MAP[key]}em`;
  }
  return size;
}
function isNamedSize(size) {
  return size != null && size.trim().toLowerCase() in SIZE_MAP;
}
var NAMED_SIZES = Object.freeze(Object.keys(SIZE_MAP));
var PALETTE_RE = /^([a-z]+)-(\d{2,3})$/;
function resolveColor(value) {
  if (!value) return void 0;
  const trimmed = value.trim().toLowerCase();
  if (PALETTE_RE.test(trimmed)) {
    return `var(--ui-${trimmed})`;
  }
  return value;
}
function isPaletteToken(value) {
  return value != null && PALETTE_RE.test(value.trim().toLowerCase());
}
var SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
function resolveColorHover(token) {
  if (!token) return void 0;
  const trimmed = token.trim().toLowerCase();
  const match = trimmed.match(PALETTE_RE);
  if (!match) return void 0;
  const [, family, shadeStr] = match;
  const shade = Number(shadeStr);
  const idx = SHADES.indexOf(shade);
  if (idx === -1 || idx >= SHADES.length - 1) return void 0;
  return `var(--ui-${family}-${SHADES[idx + 1]})`;
}
function resolveColorLighter(token, steps = 1) {
  if (!token) return void 0;
  const trimmed = token.trim().toLowerCase();
  const match = trimmed.match(PALETTE_RE);
  if (!match) return void 0;
  const [, family, shadeStr] = match;
  const shade = Number(shadeStr);
  const idx = SHADES.indexOf(shade);
  if (idx === -1) return void 0;
  const newIdx = Math.max(0, idx - steps);
  return `var(--ui-${family}-${SHADES[newIdx]})`;
}
function resolveColorDarker(token, steps = 1) {
  if (!token) return void 0;
  const trimmed = token.trim().toLowerCase();
  const match = trimmed.match(PALETTE_RE);
  if (!match) return void 0;
  const [, family, shadeStr] = match;
  const shade = Number(shadeStr);
  const idx = SHADES.indexOf(shade);
  if (idx === -1) return void 0;
  const newIdx = Math.min(SHADES.length - 1, idx + steps);
  return `var(--ui-${family}-${SHADES[newIdx]})`;
}
var ELEVATION_MAP = Object.freeze({
  "1": "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
  "2": "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
  "3": "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)",
  "4": "0 20px 25px rgba(0,0,0,0.1), 0 8px 10px rgba(0,0,0,0.04)",
  "5": "0 25px 50px rgba(0,0,0,0.15), 0 12px 24px rgba(0,0,0,0.08)"
});
function resolveElevation(value) {
  if (!value) return void 0;
  const key = String(value).trim();
  if (key in ELEVATION_MAP) return ELEVATION_MAP[key];
  return value;
}
var _rgbCache = /* @__PURE__ */ new Map();
var _RGB_CACHE_MAX = 200;
function resolveRGB(value) {
  if (!value || typeof document === "undefined") return null;
  const cacheKey = value.trim().toLowerCase();
  if (_rgbCache.has(cacheKey)) return _rgbCache.get(cacheKey);
  let cssValue = value;
  if (PALETTE_RE.test(cacheKey)) {
    const computed = getComputedStyle(document.documentElement).getPropertyValue(`--ui-${cacheKey}`).trim();
    if (!computed) {
      _rgbCache.set(cacheKey, null);
      return null;
    }
    cssValue = computed;
  }
  const el = document.createElement("span");
  el.style.color = cssValue;
  el.style.display = "none";
  document.body.appendChild(el);
  const resolved = getComputedStyle(el).color;
  el.remove();
  const match = resolved.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/);
  const rgb = match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
  while (_rgbCache.size >= _RGB_CACHE_MAX) {
    const first = _rgbCache.keys().next().value;
    _rgbCache.delete(first);
  }
  _rgbCache.set(cacheKey, rgb);
  return rgb;
}
function luminance([r, g, b]) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}
function contrastColorFor(bgValue) {
  const rgb = resolveRGB(bgValue);
  if (!rgb) return "#000";
  return luminance(rgb) > 0.179 ? "#000" : "#fff";
}

// src/core/ui-component.js
var UIComponent = class extends HTMLElement {
  /* ------------------------------------------------------------------ */
  /*  Static API                                                         */
  /* ------------------------------------------------------------------ */
  /**
   * Define reflected properties.
   * Each key maps to { type, default, reflect, attribute }.
   *
   *   static properties = {
   *     variant: { type: String, default: 'default', reflect: true },
   *     disabled: { type: Boolean, default: false, reflect: true },
   *   };
   */
  static properties = {};
  /** Override to provide component-scoped CSS (plain string). */
  static styles() {
    return ":host { font-family: inherit; }";
  }
  /** Observed attributes derived from `properties`. */
  static get observedAttributes() {
    return Object.entries(this.properties).filter(([, v]) => v.reflect !== false).map(([k, v]) => v.attribute ?? toKebab(k));
  }
  /**
   * Lazily-built lookup:  attribute-name → { propName, meta }.
   * Cached on the constructor so it's computed once per class.
   */
  static get _attrMap() {
    if (!this.hasOwnProperty("__attrMap")) {
      const map = {};
      for (const [name, meta] of Object.entries(this.properties)) {
        const attr = meta.attribute ?? toKebab(name);
        map[attr] = { propName: name, meta };
      }
      this.__attrMap = map;
    }
    return this.__attrMap;
  }
  /* ------------------------------------------------------------------ */
  /*  Instance                                                           */
  /* ------------------------------------------------------------------ */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._initialised = false;
    const props = (
      /** @type {typeof UIComponent} */
      this.constructor.properties
    );
    for (const [name, meta] of Object.entries(props)) {
      const attr = meta.attribute ?? toKebab(name);
      Object.defineProperty(this, name, {
        get: () => this[`_${name}`],
        set: (v) => {
          const old = this[`_${name}`];
          this[`_${name}`] = coerce(v, meta.type);
          if (meta.reflect !== false) {
            reflectToAttribute(this, attr, this[`_${name}`], meta.type);
          }
          if (this._initialised && old !== this[`_${name}`]) {
            this._update();
          }
          if (name === "background") this._reflectBackgroundVars();
        },
        configurable: true
      });
      this[`_${name}`] = meta.default ?? defaultForType(meta.type);
    }
  }
  connectedCallback() {
    const ctor = (
      /** @type {typeof UIComponent} */
      this.constructor
    );
    const css2 = ctor.styles();
    if (css2) {
      if (typeof CSSStyleSheet !== "undefined" && this.shadowRoot.adoptedStyleSheets !== void 0) {
        if (!ctor.hasOwnProperty("__sheet")) {
          const sheet = new CSSStyleSheet();
          sheet.replaceSync(css2);
          ctor.__sheet = sheet;
        }
        this.shadowRoot.adoptedStyleSheets = [ctor.__sheet];
      } else if (!this.shadowRoot.querySelector("style")) {
        const style = document.createElement("style");
        style.textContent = css2;
        this.shadowRoot.prepend(style);
      }
    }
    const attrMap = ctor._attrMap;
    for (const [attr, { propName, meta }] of Object.entries(attrMap)) {
      if (this.hasAttribute(attr)) {
        this[`_${propName}`] = fromAttribute(this.getAttribute(attr), meta.type);
      }
    }
    const props = ctor.properties;
    for (const [name, meta] of Object.entries(props)) {
      if (meta.reflect === false) continue;
      const attr = meta.attribute ?? toKebab(name);
      if (!this.hasAttribute(attr) && meta.type === Boolean && this[`_${name}`]) {
        reflectToAttribute(this, attr, true, Boolean);
      }
    }
    this._initialised = true;
    if ("background" in props && this._background) {
      this._reflectBackgroundVars();
    }
    this._update();
  }
  disconnectedCallback() {
    this._initialised = false;
  }
  attributeChangedCallback(attr, oldVal, newVal) {
    if (oldVal === newVal) return;
    const entry = (
      /** @type {typeof UIComponent} */
      this.constructor._attrMap[attr]
    );
    if (entry) {
      this[`_${entry.propName}`] = fromAttribute(newVal, entry.meta.type);
    }
    if (this._initialised) {
      this._update();
    }
  }
  /** Override in subclass — return an HTML string or a DocumentFragment. */
  render() {
    return "";
  }
  /* ------------------------------------------------------------------ */
  /*  Internals                                                          */
  /* ------------------------------------------------------------------ */
  /** Reconcile shadow DOM with the latest render(). */
  _update() {
    const result = this.render();
    if (typeof result === "string") {
      const styles = [...this.shadowRoot.querySelectorAll("style")];
      this.shadowRoot.innerHTML = result;
      for (const s of styles) this.shadowRoot.prepend(s);
    } else if (result instanceof DocumentFragment || result instanceof HTMLElement) {
      const styles = [...this.shadowRoot.querySelectorAll("style")];
      this.shadowRoot.replaceChildren(result);
      for (const s of styles) this.shadowRoot.prepend(s);
    }
  }
  /**
   * Set dynamic CSS custom properties on `:host` via an internal `<style>`
   * block inside the shadow DOM.  This avoids polluting the host element's
   * inline `style` attribute.
   *
   * @param {Record<string, string | undefined>} vars
   *   Map of CSS custom property names (including `--`) to values.
   *   Pass `undefined` or `''` to omit a property.
   *
   * @example
   *   this._setDynamicVars({ '--_bg': '#fff', '--_color': '#000' });
   */
  _setDynamicVars(vars) {
    if (!this.shadowRoot) return;
    let el = this.shadowRoot.getElementById("__dv");
    const pairs = Object.entries(vars).filter(([, v]) => v !== void 0 && v !== "").map(([k, v]) => `${k}: ${v};`);
    if (pairs.length === 0) {
      if (el) el.textContent = "";
      return;
    }
    if (!el) {
      el = document.createElement("style");
      el.id = "__dv";
      this.shadowRoot.prepend(el);
    }
    el.textContent = `:host { ${pairs.join(" ")} }`;
  }
  /** Emit a custom event with sensible defaults. */
  emit(name, detail = {}) {
    const event = new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail
    });
    this.dispatchEvent(event);
    return event;
  }
  /**
   * When `background` is set on any component, expose resolved colour values
   * as inheritable CSS custom properties on the host element so children
   * (e.g. buttons inside a banner) can use them for hover effects.
   *
   * Sets:  --ui-background, --ui-background-hover
   */
  _reflectBackgroundVars() {
    const bg = this._background;
    if (bg) {
      this.style.setProperty("--ui-background", resolveColor(bg));
      this.style.setProperty("--ui-background-token", bg.trim().toLowerCase());
      const hover = resolveColorHover(bg);
      if (hover) {
        this.style.setProperty("--ui-background-hover", hover);
      } else {
        this.style.removeProperty("--ui-background-hover");
      }
    } else {
      this.style.removeProperty("--ui-background");
      this.style.removeProperty("--ui-background-token");
      this.style.removeProperty("--ui-background-hover");
    }
  }
};
function toKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function coerce(value, type) {
  if (type === Boolean) return Boolean(value);
  if (type === Number) return Number(value);
  return value == null ? "" : String(value);
}
function fromAttribute(value, type) {
  if (type === Boolean) return value !== null && value !== "false";
  if (type === Number) return value === null ? 0 : Number(value);
  return value ?? "";
}
function reflectToAttribute(el, attr, value, type) {
  if (type === Boolean) {
    value ? el.setAttribute(attr, "") : el.removeAttribute(attr);
  } else {
    value != null && value !== "" ? el.setAttribute(attr, String(value)) : el.removeAttribute(attr);
  }
}
function defaultForType(type) {
  if (type === Boolean) return false;
  if (type === Number) return 0;
  return "";
}

// src/components/app/app.js
var UIApp = class extends UIComponent {
  static properties = {
    page: { type: Boolean, default: false, reflect: true },
    navOpen: { type: Boolean, default: false, reflect: true, attribute: "nav-open" },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      /* ============================================================ */
      /*  Application shell \u2014 CSS Grid layout                         */
      /*                                                               */
      /*  \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510           */
      /*  \u2502  banner                                        \u2502           */
      /*  \u2502  header                                        \u2502           */
      /*  \u2502  subheader                                     \u2502           */
      /*  \u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524           */
      /*  \u2502 nav-header   \u2502  main-header          \u2502 drawer  \u2502           */
      /*  \u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524         \u2502           */
      /*  \u2502 nav          \u2502  main                 \u2502         \u2502           */
      /*  \u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524         \u2502           */
      /*  \u2502 nav-footer   \u2502  main-footer          \u2502         \u2502           */
      /*  \u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524           */
      /*  \u2502  footer                                        \u2502           */
      /*  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518           */
      /* ============================================================ */

      :host {
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows:
          auto            /* banner      */
          auto            /* header      */
          auto            /* subheader   */
          auto            /* nav-header / main-header */
          1fr             /* nav / main (fills remaining) */
          auto            /* nav-footer / main-footer */
          auto;           /* footer      */
        grid-template-areas:
          "banner       banner        banner"
          "header       header        header"
          "subheader    subheader     subheader"
          "nav-header   main-header   drawer"
          "nav          main          drawer"
          "nav-footer   main-footer   drawer"
          "footer       footer        footer";
        height: 100dvh;
        overflow-y: auto;

        /* Base typography & colours from theme tokens */
        font-family: var(--ui-font, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif);
        font-size: var(--_size, 1rem);
        line-height: 1.5;
        color: var(--_color, var(--ui-text-color, #111827));
        background: var(--_bg, var(--ui-bg, #fff));

        /* Smooth text rendering */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;

        /* Prevent horizontal overflow */
        overflow-x: hidden;
        box-sizing: border-box;
      }

      /* Page mode \u2014 normal scrolling document instead of fixed app shell. */
      :host([page]) {
        height: auto;
        min-height: 100dvh;
        overflow-y: visible;
      }

      /* ---- Grid area assignments ---- */
      ::slotted(ui-app-banner)      { grid-area: banner; }
      ::slotted(ui-app-header)      { grid-area: header; }
      ::slotted(ui-app-subheader)   { grid-area: subheader; }
      ::slotted(ui-app-drawer)      { grid-area: drawer; }
      ::slotted(ui-app-main-header) { grid-area: main-header; }
      ::slotted(ui-app-main)        { grid-area: main; }
      ::slotted(ui-app-main-footer) { grid-area: main-footer; }
      ::slotted(ui-app-nav-header)  { grid-area: nav-header; }
      ::slotted(ui-app-nav)         { grid-area: nav; }
      ::slotted(ui-app-nav-footer)  { grid-area: nav-footer; }
      ::slotted(ui-app-footer)      { grid-area: footer; }

      /* When drawer/nav aren't present, main area should span full width.
         This is handled naturally by CSS Grid \u2014 empty columns collapse to 0. */

      /* ---- Nav is hidden by default; toggle via nav-open attribute ---- */
      ::slotted(ui-app-nav),
      ::slotted(ui-app-nav-header),
      ::slotted(ui-app-nav-footer) {
        display: none;
      }

      :host([nav-open]) ::slotted(ui-app-nav),
      :host([nav-open]) ::slotted(ui-app-nav-header),
      :host([nav-open]) ::slotted(ui-app-nav-footer) {
        display: block;
      }

      /* ============================================================ */
      /*  Responsive \u2014 collapse to single-column on small screens     */
      /* ============================================================ */
      @media (max-width: 768px) {
        :host {
          grid-template-columns: 1fr;
          grid-template-rows:
            auto   /* banner      */
            auto   /* header      */
            auto   /* subheader   */
            auto   /* main-header */
            1fr    /* main        */
            auto   /* main-footer */
            auto;  /* footer      */
          grid-template-areas:
            "banner"
            "header"
            "subheader"
            "main-header"
            "main"
            "main-footer"
            "footer";
        }

        /* Hide side panels on mobile by default */
        ::slotted(ui-app-nav),
        ::slotted(ui-app-nav-header),
        ::slotted(ui-app-nav-footer),
        ::slotted(ui-app-drawer) {
          display: none;
        }

        /* When nav-open is toggled on mobile, show nav as full-width panel */
        :host([nav-open]) {
          grid-template-rows:
            auto   /* banner      */
            auto   /* header      */
            auto   /* subheader   */
            auto   /* nav-header  */
            1fr    /* nav         */
            auto   /* nav-footer  */
            auto;  /* footer      */
          grid-template-areas:
            "banner"
            "header"
            "subheader"
            "nav-header"
            "nav"
            "nav-footer"
            "footer";
        }

        /* Hide main content when nav is open on mobile */
        :host([nav-open]) ::slotted(ui-app-main),
        :host([nav-open]) ::slotted(ui-app-main-header),
        :host([nav-open]) ::slotted(ui-app-main-footer),
        :host([nav-open]) ::slotted(ui-app-drawer) {
          display: none;
        }
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this._injectGlobalReset();
    this._applyDynamicStyles();
  }
  _onPropertyChanged(name, oldVal, newVal) {
    if (name === "background" || name === "color" || name === "size") {
      this._applyDynamicStyles();
    }
  }
  /** Apply background, color, and size only when explicitly set. */
  _applyDynamicStyles() {
    const vars = {};
    if (this.background) vars["--_bg"] = resolveColor(this.background);
    if (this.color) vars["--_color"] = resolveColor(this.color);
    if (this.size) vars["--_size"] = resolveSize(this.size);
    this._setDynamicVars(vars);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (typeof document !== "undefined" && !document.querySelector("ui-app")) {
      const reset = document.getElementById("ui-app-reset");
      if (reset) reset.remove();
    }
  }
  render() {
    return "<slot></slot>";
  }
  /**
   * Inject a minimal global reset onto `<html>` and `<body>` so consumers
   * don't need a separate reset stylesheet. Idempotent — only runs once.
   * @private
   */
  _injectGlobalReset() {
    if (typeof document === "undefined") return;
    if (document.getElementById("ui-app-reset")) return;
    if (!document.querySelector('meta[name="viewport"]')) {
      const meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content = "width=device-width, initial-scale=1.0";
      document.head.appendChild(meta);
    }
    const style = document.createElement("style");
    style.id = "ui-app-reset";
    style.textContent = /* css */
    `
      *, *::before, *::after {
        box-sizing: border-box;
      }

      html {
        /* Prevent iOS text-size inflation */
        -webkit-text-size-adjust: 100%;
        text-size-adjust: 100%;
      }

      body {
        margin: 0;
        padding: 0;
      }

      img, picture, video, canvas, svg {
        display: block;
        max-width: 100%;
      }

      input, button, textarea, select {
        font: inherit;
      }

      p, h1, h2, h3, h4, h5, h6 {
        overflow-wrap: break-word;
      }
    `;
    document.head.appendChild(style);
  }
};
customElements.define("ui-app", UIApp);

// src/components/app/banner.js
var UIAppBanner = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    elevation: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: .5em;
        padding: 0.75em 1.5em;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        font-size: var(--_size, inherit);
        font-weight: 500;
        box-sizing: border-box;
        box-shadow: var(--_elevation, none);
      }

      @media (max-width: 768px) {
        :host { padding: 0.625em 1em; }
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "banner");
  }
  /** Resolve background/color and apply as CSS custom properties. */
  _applyColors() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars["--_elevation"] = shadow;
    if (this.size) {
      const fontSize = resolveSize(this.size);
      if (fontSize) vars["--_size"] = fontSize;
    }
    this._setDynamicVars(vars);
  }
  _update() {
    this._applyColors();
    super._update();
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-app-banner", UIAppBanner);

// src/components/app/header.js
var UIAppHeader = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    elevation: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: flex;
        align-items: center;
        gap: 1em;
        padding: 0.75em 1.5em;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        font-size: var(--_size, 1.25em);
        font-weight: 600;
        min-height: 3em;
        box-sizing: border-box;
        border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
        box-shadow: var(--_elevation, none);
      }

      @media (max-width: 768px) {
        :host { padding: 0.625em 1em; font-size: var(--_size, 1.125em); }
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "heading");
    this.setAttribute("aria-level", "1");
  }
  _applyColors() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars["--_elevation"] = shadow;
    if (this.size) {
      const fs = resolveSize(this.size);
      if (fs) vars["--_size"] = fs;
    }
    this._setDynamicVars(vars);
  }
  _update() {
    this._applyColors();
    super._update();
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-app-header", UIAppHeader);

// src/components/app/subheader.js
var UIAppSubheader = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    elevation: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: flex;
        align-items: center;
        gap: 1em;
        padding: 0.5em 1.5em;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        font-size: var(--_size, 0.875em);
        font-weight: 500;
        min-height: 2.5em;
        box-sizing: border-box;
        border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
        box-shadow: var(--_elevation, none);
      }

      @media (max-width: 768px) {
        :host {
          padding: 0.5em 1em;
          flex-wrap: wrap;
        }
      }
    `
    );
  }
  _applyColors() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars["--_elevation"] = shadow;
    if (this.size) {
      const fs = resolveSize(this.size);
      if (fs) vars["--_size"] = fs;
    }
    this._setDynamicVars(vars);
  }
  _update() {
    this._applyColors();
    super._update();
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-app-subheader", UIAppSubheader);

// src/components/app/drawer.js
var UIAppDrawer = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    width: { type: String, default: "16rem", reflect: true },
    elevation: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    open: { type: Boolean, default: true, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: flex;
        flex-direction: column;
        width: var(--_width, 16rem);
        min-height: 100%;
        padding: 1em;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        overflow-y: auto;
        border-left: 1px solid var(--ui-border-color, #e5e7eb);
        box-shadow: var(--_elevation, none);
        box-sizing: border-box;
      }

      :host(:not([open])) {
        display: none;
      }

      @media (max-width: 768px) {
        :host { border-left: none; width: 100%; }
      }
    `
    );
  }
  _applyStyles() {
    const vars = {};
    if (this.width) vars["--_width"] = this.width;
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars["--_elevation"] = shadow;
    if (this.size) {
      const fs = resolveSize(this.size);
      if (fs) vars["--_size"] = fs;
    }
    this._setDynamicVars(vars);
  }
  _update() {
    this._applyStyles();
    super._update();
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-app-drawer", UIAppDrawer);

// src/components/app/main-header.js
var UIAppMainHeader = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    elevation: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: flex;
        align-items: center;
        gap: 1em;
        padding: 0.75em 1.5em;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        font-size: var(--_size, 1.125em);
        font-weight: 600;
        min-height: 2.75em;
        box-sizing: border-box;
        border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
        box-shadow: var(--_elevation, none);
      }

      @media (max-width: 768px) {
        :host { padding: 0.625em 1em; font-size: var(--_size, 1em); }
      }
    `
    );
  }
  _applyColors() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars["--_elevation"] = shadow;
    if (this.size) {
      const fs = resolveSize(this.size);
      if (fs) vars["--_size"] = fs;
    }
    this._setDynamicVars(vars);
  }
  _update() {
    this._applyColors();
    super._update();
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-app-main-header", UIAppMainHeader);

// src/components/app/main.js
var UIAppMain = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    elevation: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        padding: 1.5em;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        font-size: var(--_size, inherit);
        overflow-y: auto;
        min-height: 100%;
        box-sizing: border-box;
        box-shadow: var(--_elevation, none);
      }

      @media (max-width: 768px) {
        :host { padding: 1em; }
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "main");
  }
  _applyColors() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars["--_elevation"] = shadow;
    if (this.size) {
      const fs = resolveSize(this.size);
      if (fs) vars["--_size"] = fs;
    }
    this._setDynamicVars(vars);
  }
  _update() {
    this._applyColors();
    super._update();
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-app-main", UIAppMain);

// src/components/app/main-footer.js
var UIAppMainFooter = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    elevation: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: flex;
        align-items: center;
        gap: 1em;
        padding: 0.5em 1.5em;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        font-size: var(--_size, 0.875em);
        min-height: 2.25em;
        box-sizing: border-box;
        border-top: 1px solid var(--ui-border-color, #e5e7eb);
        box-shadow: var(--_elevation, none);
      }

      @media (max-width: 768px) {
        :host { padding: 0.5em 1em; }
      }
    `
    );
  }
  _applyColors() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars["--_elevation"] = shadow;
    if (this.size) {
      const fs = resolveSize(this.size);
      if (fs) vars["--_size"] = fs;
    }
    this._setDynamicVars(vars);
  }
  _update() {
    this._applyColors();
    super._update();
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-app-main-footer", UIAppMainFooter);

// src/components/app/nav-header.js
var UIAppNavHeader = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    elevation: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: flex;
        align-items: center;
        gap: 1em;
        padding: 0.75em 1em;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        font-size: var(--_size, 0.875em);
        font-weight: 600;
        min-height: 2.75em;
        box-sizing: border-box;
        border-right: 1px solid var(--ui-border-color, #e5e7eb);
        border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
        box-shadow: var(--_elevation, none);
      }

      @media (max-width: 768px) {
        :host { border-right: none; }
      }
    `
    );
  }
  _applyColors() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars["--_elevation"] = shadow;
    if (this.size) {
      const fs = resolveSize(this.size);
      if (fs) vars["--_size"] = fs;
    }
    this._setDynamicVars(vars);
  }
  _update() {
    this._applyColors();
    super._update();
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-app-nav-header", UIAppNavHeader);

// src/components/app/nav.js
var UIAppNav = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    width: { type: String, default: "16rem", reflect: true },
    elevation: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    channel: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: flex;
        flex-direction: column;
        width: var(--_width, 16rem);
        min-height: 100%;
        padding: 1em;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        font-size: var(--_size, inherit);
        overflow-y: auto;
        border-right: 1px solid var(--ui-border-color, #e5e7eb);
        box-shadow: var(--_elevation, none);
        box-sizing: border-box;
      }

      @media (max-width: 768px) {
        :host { border-right: none; width: 100%; }
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "complementary");
    this._onChannelEvent = () => this._toggleNav();
    if (this.channel) {
      document.addEventListener(this.channel, this._onChannelEvent);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.channel) {
      document.removeEventListener(this.channel, this._onChannelEvent);
    }
  }
  _onPropertyChanged(name, oldVal, newVal) {
    if (name === "channel") {
      if (oldVal) document.removeEventListener(oldVal, this._onChannelEvent);
      if (newVal) document.addEventListener(newVal, this._onChannelEvent);
    }
  }
  /** Toggle the nav-open attribute on the parent <ui-app>. */
  _toggleNav() {
    const app = this.closest("ui-app");
    if (!app) return;
    if (app.hasAttribute("nav-open")) {
      app.removeAttribute("nav-open");
    } else {
      app.setAttribute("nav-open", "");
    }
  }
  _applyStyles() {
    const vars = {};
    if (this.width) vars["--_width"] = this.width;
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars["--_elevation"] = shadow;
    if (this.size) {
      const fs = resolveSize(this.size);
      if (fs) vars["--_size"] = fs;
    }
    this._setDynamicVars(vars);
  }
  _update() {
    this._applyStyles();
    super._update();
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-app-nav", UIAppNav);

// src/components/app/nav-footer.js
var UIAppNavFooter = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    elevation: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: flex;
        align-items: center;
        gap: 1em;
        padding: 0.5em 1em;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        font-size: var(--_size, 0.8125em);
        min-height: 2.25em;
        box-sizing: border-box;
        border-right: 1px solid var(--ui-border-color, #e5e7eb);
        border-top: 1px solid var(--ui-border-color, #e5e7eb);
        box-shadow: var(--_elevation, none);
      }

      @media (max-width: 768px) {
        :host { border-right: none; }
      }
    `
    );
  }
  _applyColors() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars["--_elevation"] = shadow;
    if (this.size) {
      const fs = resolveSize(this.size);
      if (fs) vars["--_size"] = fs;
    }
    this._setDynamicVars(vars);
  }
  _update() {
    this._applyColors();
    super._update();
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-app-nav-footer", UIAppNavFooter);

// src/components/app/footer.js
var UIAppFooter = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    elevation: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: flex;
        align-items: center;
        gap: 1em;
        padding: 0.75em 1.5em;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        font-size: var(--_size, 0.875em);
        min-height: 2.5em;
        box-sizing: border-box;
        box-shadow: var(--_elevation, none);
      }

      @media (max-width: 768px) {
        :host { padding: 0.625em 1em; }
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "contentinfo");
  }
  _applyColors() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars["--_elevation"] = shadow;
    if (this.size) {
      const fs = resolveSize(this.size);
      if (fs) vars["--_size"] = fs;
    }
    this._setDynamicVars(vars);
  }
  _update() {
    this._applyColors();
    super._update();
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-app-footer", UIAppFooter);

// src/components/avatar/avatar.js
var UIAvatar = class _UIAvatar extends UIComponent {
  static properties = {
    src: { type: String, default: "", reflect: true },
    initials: { type: String, default: "", reflect: true },
    alt: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    circle: { type: Boolean, default: true, reflect: true },
    square: { type: Boolean, default: false, reflect: true },
    status: { type: String, default: "", reflect: true },
    statusColor: { type: String, default: "", reflect: true, attribute: "status-color" }
  };
  static _statusColors = {
    online: "#22c55e",
    offline: "#9ca3af",
    busy: "#ef4444",
    away: "#f59e0b"
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 2.5em;
        height: 2.5em;
        border-radius: 50%;
        overflow: visible;
        box-sizing: border-box;
        vertical-align: middle;
        background: var(--_bg, inherit);
        color: var(--_fg, inherit);
        font-weight: 600;
        font-size: var(--_size, 1em);
        user-select: none;
        flex-shrink: 0;
      }
      :host([square]) {
        border-radius: var(--ui-radius, 0.375em);
      }

      .inner {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .initials {
        font-size: 0.4em;
        line-height: 1;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .fallback {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
      .fallback svg {
        width: 60%;
        height: 60%;
        fill: currentColor;
        opacity: 0.7;
      }

      .status-dot {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0.65em;
        height: 0.65em;
        border-radius: 50%;
        border: 0.12em solid var(--ui-bg, #fff);
        box-sizing: border-box;
        background: var(--_status-color, #9ca3af);
      }
    `
    );
  }
  render() {
    let content;
    if (this.src) {
      const esc = (s) => (s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;");
      content = `<img src="${esc(this.src)}" alt="${esc(this.alt || this.initials)}" />`;
    } else if (this.initials) {
      content = `<span class="initials">${this._esc(this.initials)}</span>`;
    } else {
      content = `<span class="fallback"><slot>
        <svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2c0 .7.5 1.2 1.2 1.2h16.8c.7 0 1.2-.5 1.2-1.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
      </slot></span>`;
    }
    const statusDot = this.status ? '<span class="status-dot" part="status"></span>' : "";
    return `<div class="inner" part="inner">${content}</div>${statusDot}`;
  }
  _esc(s) {
    return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("role")) this.setAttribute("role", "img");
    if (!this.hasAttribute("aria-label")) this.setAttribute("aria-label", this.alt || this.initials || "avatar");
    this._applyStyles();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyStyles();
  }
  _applyStyles() {
    const vars = {};
    const sz = resolveSize(this.size);
    if (sz) vars["--_size"] = sz;
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background) || this.background;
    }
    if (this.color) {
      vars["--_fg"] = resolveColor(this.color) || this.color;
    } else if (this.background) {
      vars["--_fg"] = contrastColorFor(this.background);
    }
    if (this.status) {
      const sc = this.statusColor ? resolveColor(this.statusColor) || this.statusColor : _UIAvatar._statusColors[this.status] || "#9ca3af";
      vars["--_status-color"] = sc;
    }
    this._setDynamicVars(vars);
  }
};
customElements.define("ui-avatar", UIAvatar);

// src/components/badge/badge.js
var UIBadge = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    pill: { type: Boolean, default: false, reflect: true },
    outline: { type: Boolean, default: false, reflect: true },
    circle: { type: Boolean, default: false, reflect: true },
    pulse: { type: Boolean, default: false, reflect: true },
    bounce: { type: Boolean, default: false, reflect: true },
    shake: { type: Boolean, default: false, reflect: true },
    ping: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        line-height: 1;
        white-space: nowrap;
        vertical-align: middle;
        box-sizing: border-box;

        padding: 0.25em 0.55em;
        border-radius: var(--ui-radius, 0.25em);
        border: 0.1em solid transparent;

        background: var(--_bg, inherit);
        color: var(--_fg, inherit);
        border-color: var(--_border, transparent);

        transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
      }

      :host([pill]) {
        border-radius: 9999px;
      }

      :host([circle]) {
        border-radius: 50%;
        padding: 0.25em;
        min-width: 1.6em;
        min-height: 1.6em;
      }

      /* Outlined variant */
      :host([outline]) {
        background: transparent;
      }

      /* Pulse animation \u2014 glow radiates outward */
      @keyframes ui-badge-pulse {
        0%   { box-shadow: 0 0 0 0 var(--_pulse-color); }
        70%  { box-shadow: 0 0 0 0.55em transparent; }
        100% { box-shadow: 0 0 0 0 transparent; }
      }

      :host([pulse]) {
        animation: ui-badge-pulse 1.5s ease-in-out infinite;
      }

      /* Bounce animation \u2014 gentle vertical hop */
      @keyframes ui-badge-bounce {
        0%, 100% { transform: translateY(0); }
        30%      { transform: translateY(-0.35em); }
        50%      { transform: translateY(0.1em); }
        70%      { transform: translateY(-0.15em); }
      }

      :host([bounce]) {
        animation: ui-badge-bounce 1s ease-in-out infinite;
      }

      /* Shake animation \u2014 quick horizontal wiggle */
      @keyframes ui-badge-shake {
        0%, 100% { transform: translateX(0); }
        15%      { transform: translateX(-0.2em); }
        30%      { transform: translateX(0.2em); }
        45%      { transform: translateX(-0.15em); }
        60%      { transform: translateX(0.15em); }
        75%      { transform: translateX(-0.05em); }
      }

      :host([shake]) {
        animation: ui-badge-shake 0.6s ease-in-out infinite;
      }

      /* Ping animation \u2014 expanding ring beacon */
      :host([ping]) {
        position: relative;
        overflow: visible;
      }

      slot {
        display: inline;
      }

      /* Ping ring \u2014 rendered as a sibling span to avoid ::after limitations */
      .ping-ring {
        display: none;
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: var(--_bg);
        opacity: 0.75;
        animation: ui-badge-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        pointer-events: none;
      }

      :host([ping]) .ping-ring {
        display: block;
      }

      @keyframes ui-badge-ping {
        0%   { transform: scale(1); opacity: 0.75; }
        75%, 100% { transform: scale(1.8); opacity: 0; }
      }
    `
    );
  }
  render() {
    return '<span class="ping-ring"></span><slot></slot>';
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyStyles();
  }
  /** Compute CSS custom properties from current attribute values. */
  _applyStyles() {
    const vars = {};
    const isOutline = this.outline;
    if (this.background) {
      const bg = resolveColor(this.background);
      vars["--_bg"] = isOutline ? "transparent" : bg;
      vars["--_border"] = isOutline ? bg : "transparent";
      vars["--_pulse-color"] = bg;
      if (this.color) {
        vars["--_fg"] = resolveColor(this.color);
      } else if (isOutline) {
        vars["--_fg"] = bg;
      } else {
        vars["--_fg"] = contrastColorFor(this.background);
      }
    } else if (this.color) {
      vars["--_fg"] = resolveColor(this.color);
    }
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
  }
};
customElements.define("ui-badge", UIBadge);

// src/components/breadcrumb/breadcrumb.js
var UIBreadcrumb = class extends UIComponent {
  static properties = {
    separator: { type: String, default: "/", reflect: true },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.4em;
        padding: 0.5em 0;
        background: var(--_bg, transparent);
        color: var(--_color, inherit);
        line-height: 1.5;
        box-sizing: border-box;
      }

      ::slotted(ui-breadcrumb-item:not(:last-child))::after {
        /* Separator injected via item component */
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "navigation");
    this.setAttribute("aria-label", "Breadcrumb");
    this._applySeparator();
    this._slotObserver = new MutationObserver(() => this._applySeparator());
    this._slotObserver.observe(this, { childList: true });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._slotObserver) {
      this._slotObserver.disconnect();
      this._slotObserver = null;
    }
  }
  _update() {
    this._applyStyles();
    this._applySeparator();
    super._update();
  }
  _applyStyles() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
  }
  /** Push the separator value down to child items. */
  _applySeparator() {
    const items = this.querySelectorAll("ui-breadcrumb-item");
    const sep = this.separator || "/";
    items.forEach((item, i) => {
      item._separator = i < items.length - 1 ? sep : "";
      if (item._updateSeparator) item._updateSeparator();
    });
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-breadcrumb", UIBreadcrumb);

// src/components/breadcrumb/item.js
var UIBreadcrumbItem = class extends UIComponent {
  static properties = {
    href: { type: String, default: "", reflect: true },
    target: { type: String, default: "", reflect: true },
    active: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: inline-flex;
        align-items: center;
        gap: 0.4em;
        white-space: nowrap;
      }

      a {
        color: var(--_link-color, var(--ui-blue-600, #2563eb));
        text-decoration: none;
        cursor: pointer;
      }

      a:hover {
        text-decoration: underline;
      }

      .label {
        color: inherit;
      }

      :host([active]) .label {
        font-weight: 600;
        color: var(--ui-text-color, #111827);
      }

      .sep {
        color: var(--ui-text-muted, #9ca3af);
        user-select: none;
        pointer-events: none;
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.active) {
      this.setAttribute("aria-current", "page");
    }
  }
  _update() {
    if (this.active) {
      this.setAttribute("aria-current", "page");
    } else {
      this.removeAttribute("aria-current");
    }
    super._update();
  }
  /** Called by parent breadcrumb to set separator text. */
  _updateSeparator() {
    const sepEl = this.shadowRoot?.querySelector(".sep");
    if (sepEl) sepEl.textContent = this._separator || "";
  }
  render() {
    const sep = this._separator || "";
    if (this.href && !this.active) {
      const tgt = this.target ? ` target="${this.target}"` : "";
      return `<a href="${this.href}"${tgt}><slot></slot></a>${sep ? `<span class="sep">${sep}</span>` : ""}`;
    }
    return `<span class="label"><slot></slot></span>${sep ? `<span class="sep">${sep}</span>` : ""}`;
  }
};
customElements.define("ui-breadcrumb-item", UIBreadcrumbItem);

// src/components/button/button.js
var UIButton = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    pill: { type: Boolean, default: false, reflect: true },
    circle: { type: Boolean, default: false, reflect: true },
    outline: { type: Boolean, default: false, reflect: true },
    flat: { type: Boolean, default: false, reflect: true },
    link: { type: Boolean, default: false, reflect: true },
    plain: { type: Boolean, default: false, reflect: true },
    href: { type: String, default: "", reflect: true },
    target: { type: String, default: "", reflect: true },
    channel: { type: String, default: "", reflect: true },
    type: { type: String, default: "button", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
        cursor: pointer;
        font-family: inherit;
        font-weight: 500;
        border-radius: var(--ui-button-radius, 0.375em);
        transition: background-color 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease, filter 0.15s ease;
        box-sizing: border-box;
        white-space: nowrap;
        user-select: none;
        line-height: 1;
        padding: 0.5em 1em;
        text-decoration: none;
        background: var(--_bg, transparent);
        color: var(--_color, inherit);
        -webkit-tap-highlight-color: transparent;
      }

      :host(:hover) {
        background: var(--_bg-hover, var(--_bg, transparent));
        filter: var(--_hover-filter, brightness(0.9));
      }

      :host(:focus-visible) {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: 0.125em;
      }

      :host(:active:not([disabled])) {
        transform: scale(0.97);
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }

      /* ---- Size ---- */
      /* font-size is set dynamically on :host via resolveSize(). */

      /* ---- Pill ---- */
      :host([pill]) {
        border-radius: 9999px;
      }

      /* ---- Circle ---- */
      :host([circle]) {
        padding: 0.5em;
        border-radius: 50%;
        aspect-ratio: 1;
        justify-content: center;
      }

      /* ---- Outline ---- */
      :host([outline]) {
        background: transparent;
        border: 0.1em solid var(--_outline-color, currentColor);
        color: var(--_outline-color, currentColor);
      }
      :host([outline]:hover) {
        background: var(--_bg, transparent);
        color: var(--_color, inherit);
        filter: none;
      }

      /* ---- Flat (ghost) ---- */
      :host([flat]) {
        position: relative;
        background: transparent;
        color: var(--_text-btn-color, inherit);
      }
      :host([flat])::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: var(--_bg, currentColor);
        opacity: 0;
        transition: opacity 0.15s ease;
        z-index: 0;
      }
      :host([flat]:hover) {
        background: transparent;
        filter: none;
      }
      :host([flat]:hover)::before {
        opacity: 0.1;
      }
      ::slotted(*) {
        position: relative;
        z-index: 1;
      }

      /* ---- Link ---- */
      :host([link]) {
        background: transparent;
        color: var(--_link-color, inherit);
        padding: 0;
        text-decoration: none;
        border-radius: 0;
      }
      :host([link]:hover) {
        background: transparent;
        text-decoration: underline;
        filter: none;
      }

      /* ---- Plain (no effects) ---- */
      :host([plain]) {
        background: transparent;
        color: inherit;
        padding: 0;
        border: none;
        border-radius: 0;
        filter: none;
        transform: none;
        transition: none;
      }
      :host([plain]:hover),
      :host([plain]:active) {
        background: transparent;
        filter: none;
        transform: none;
      }
    `
    );
  }
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this._onClick);
    this.addEventListener("keydown", this._onKeyDown);
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "button");
    }
    this._updateDisabledState();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._onClick);
    this.removeEventListener("keydown", this._onKeyDown);
  }
  /** Resolve size, background, and color props → single `_setDynamicVars()` call. */
  _applyStyles() {
    const vars = {
      "--_bg": "",
      "--_bg-hover": "",
      "--_hover-filter": "",
      "--_color": "",
      "--_outline-color": "",
      "--_text-btn-color": "",
      "--_link-color": ""
    };
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    const bg = resolveColor(this.background);
    if (bg) {
      vars["--_bg"] = bg;
      const hoverBg = resolveColorHover(this.background);
      if (hoverBg) {
        vars["--_bg-hover"] = hoverBg;
      } else {
        vars["--_hover-filter"] = "brightness(0.9)";
      }
    } else {
      const inherited = getComputedStyle(this).getPropertyValue("--ui-background").trim();
      if (inherited) {
        vars["--_bg"] = "var(--ui-background)";
        vars["--_bg-hover"] = "var(--ui-background-hover, var(--ui-background))";
        vars["--_hover-filter"] = "none";
      }
    }
    const isAlt = this.outline || this.flat || this.link;
    if (isAlt) {
      const hasExplicitBg = this.hasAttribute("background");
      if (hasExplicitBg) {
        const fgColor = resolveColor(this.color || this.background);
        vars["--_outline-color"] = fgColor;
        vars["--_text-btn-color"] = fgColor;
        vars["--_link-color"] = fgColor;
      } else if (this.color) {
        const fgColor = resolveColor(this.color);
        vars["--_outline-color"] = fgColor;
        vars["--_text-btn-color"] = fgColor;
        vars["--_link-color"] = fgColor;
      } else {
        vars["--_text-btn-color"] = "inherit";
        vars["--_link-color"] = "inherit";
        vars["--_outline-color"] = "currentColor";
      }
      if (this.color) {
        vars["--_color"] = resolveColor(this.color);
      } else if (hasExplicitBg && this.background) {
        vars["--_color"] = contrastColorFor(this.background);
      }
    } else {
      if (this.color) {
        vars["--_color"] = resolveColor(this.color);
      } else if (this.background) {
        vars["--_color"] = contrastColorFor(this.background);
      }
    }
    this._setDynamicVars(vars);
  }
  /** Sync host tabindex with disabled state. */
  _updateDisabledState() {
    if (this.disabled) {
      this.removeAttribute("tabindex");
      this.setAttribute("aria-disabled", "true");
    } else {
      if (!this.hasAttribute("tabindex")) {
        this.setAttribute("tabindex", "0");
      }
      this.removeAttribute("aria-disabled");
    }
  }
  _update() {
    this._applyStyles();
    this._updateDisabledState();
    super._update();
  }
  render() {
    return "<slot></slot>";
  }
  _onClick(e) {
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
    if (this.href) {
      if (this.channel) {
        document.dispatchEvent(new CustomEvent(this.channel, {
          bubbles: false,
          detail: { src: this.href, button: this }
        }));
      } else {
        const target = this.target || "_self";
        if (target === "_blank") {
          window.open(this.href, "_blank", "noopener");
        } else {
          window.location.href = this.href;
        }
      }
    } else if (this.channel) {
      document.dispatchEvent(new CustomEvent(this.channel, {
        bubbles: false,
        detail: { button: this }
      }));
    }
    this.emit("ui-click");
  }
  /** Activate on Enter or Space like a native button. */
  _onKeyDown(e) {
    if (this.disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.click();
    }
  }
};
customElements.define("ui-button", UIButton);

// src/components/button/button-group.js
var UIButtonGroup = class extends UIComponent {
  static properties = {
    size: { type: String, default: "", reflect: true },
    vertical: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: inline-flex;
        flex-direction: row;
        box-sizing: border-box;
      }

      :host([vertical]) {
        flex-direction: column;
      }

      /* \u2500\u2500 Horizontal: merge radii \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      ::slotted(ui-button) {
        --ui-button-radius: 0;
        margin: 0;
      }

      /* First child keeps left radii */
      ::slotted(ui-button:first-child) {
        --ui-button-radius: 0.375em 0 0 0.375em;
      }

      /* Last child keeps right radii */
      ::slotted(ui-button:last-child) {
        --ui-button-radius: 0 0.375em 0.375em 0;
      }

      /* Solo child \u2014 full radii */
      ::slotted(ui-button:only-child) {
        --ui-button-radius: 0.375em;
      }

      /* Negative margin to overlap outline borders */
      ::slotted(ui-button:not(:first-child)) {
        margin-left: -1px;
      }

      /* Hovered / focused item on top so border isn't clipped */
      ::slotted(ui-button:hover),
      ::slotted(ui-button:focus-within) {
        z-index: 1;
      }

      /* \u2500\u2500 Vertical: override directions \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      :host([vertical]) ::slotted(ui-button) {
        --ui-button-radius: 0;
        margin: 0;
      }

      :host([vertical]) ::slotted(ui-button:first-child) {
        --ui-button-radius: 0.375em 0.375em 0 0;
      }

      :host([vertical]) ::slotted(ui-button:last-child) {
        --ui-button-radius: 0 0 0.375em 0.375em;
      }

      :host([vertical]) ::slotted(ui-button:only-child) {
        --ui-button-radius: 0.375em;
      }

      :host([vertical]) ::slotted(ui-button:not(:first-child)) {
        margin-left: 0;
        margin-top: -1px;
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "group");
  }
  _update() {
    this._applyStyles();
    super._update();
  }
  _applyStyles() {
    const vars = {};
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-button-group", UIButtonGroup);

// src/components/callout/callout.js
var UICallout = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    elevation: { type: String, default: "", reflect: true },
    dismissible: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        line-height: 1.6;
        box-sizing: border-box;

        padding: 1em 1.25em;
        border-radius: var(--ui-radius, 0.25em);

        background: var(--_bg, inherit);
        color: var(--_fg, inherit);
        box-shadow: var(--_elevation, none);

        position: relative;
      }

      :host([elevation]) {
        border: 1px solid var(--ui-border-color, #e5e7eb);
      }

      /* Dismiss button */
      button {
        display: none;
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1em;
        line-height: 1;
        width: 1.6em;
        height: 1.6em;
        padding: 0;
        border-radius: 50%;
        color: var(--_fg, inherit);
        opacity: 0.5;
        transition: opacity 0.15s ease, background 0.15s ease;
      }

      button:hover {
        opacity: 1;
        background: rgba(0, 0, 0, 0.08);
      }

      button:active {
        background: rgba(0, 0, 0, 0.15);
      }

      button:focus-visible {
        opacity: 1;
        background: rgba(0, 0, 0, 0.08);
        outline: 2px solid var(--ui-focus-ring, #3b82f6);
        outline-offset: 1px;
      }

      :host([dismissible]) button {
        display: block;
      }

      :host([dismissible]) {
        padding-right: 2.5em;
      }

      slot {
        display: block;
      }
    `
    );
  }
  render() {
    return '<button part="dismiss" aria-label="Dismiss">\u2715</button><slot></slot>';
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "status");
  }
  _update() {
    super._update();
    this._attachListeners();
    this._applyStyles();
  }
  _attachListeners() {
    const btn = this.shadowRoot.querySelector("button");
    if (btn) {
      btn.addEventListener("click", () => {
        this.emit("ui-dismiss");
        this.remove();
      });
    }
  }
  /** Compute CSS custom properties from explicit attributes. */
  _applyStyles() {
    const vars = {};
    if (this.background) vars["--_bg"] = resolveColor(this.background);
    if (this.color) vars["--_fg"] = resolveColor(this.color);
    else if (this.background) vars["--_fg"] = contrastColorFor(this.background);
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars["--_elevation"] = shadow;
    this._setDynamicVars(vars);
  }
};
customElements.define("ui-callout", UICallout);

// src/components/card/card.js
var UICard = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    elevation: { type: String, default: "", reflect: true },
    outline: { type: Boolean, default: false, reflect: true },
    flat: { type: Boolean, default: false, reflect: true },
    clickable: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: grid;
        grid-template-rows: auto auto 1fr auto;
        grid-template-areas:
          "header"
          "media"
          "body"
          "footer";
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        border-radius: var(--ui-radius, 0.5em);
        box-shadow: var(--_elevation, 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06));
        overflow: hidden;
        box-sizing: border-box;
        line-height: 1.5;
      }

      /* Elevation \u2014 adds border alongside shadow */
      :host([elevation]) {
        border: 1px solid var(--ui-border-color, #e5e7eb);
      }

      /* Outline style \u2014 border, no shadow */
      :host([outline]) {
        box-shadow: none;
        border: 1px solid var(--ui-border-color, #e5e7eb);
      }

      /* Flat style \u2014 no shadow, no border */
      :host([flat]) {
        box-shadow: none;
        border: none;
      }

      /* Clickable \u2014 interactive lift */
      :host([clickable]) {
        cursor: pointer;
        transition: box-shadow 0.2s ease, transform 0.2s ease;
      }

      :host([clickable]:hover) {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
      }

      :host([clickable]:active) {
        transform: translateY(0);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      :host([clickable][outline]:hover) {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      /* Grid area assignments */
      ::slotted(ui-card-header) { grid-area: header; }
      ::slotted(ui-card-media)  { grid-area: media; }
      ::slotted(ui-card-body)   { grid-area: body; }
      ::slotted(ui-card-footer) { grid-area: footer; }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "article");
    this._applyStyles();
    if (this.clickable) {
      this.setAttribute("tabindex", "0");
      this._onClick = () => this.emit("ui-click");
      this._onKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.emit("ui-click");
        }
      };
      this.addEventListener("click", this._onClick);
      this.addEventListener("keydown", this._onKeyDown);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._onClick) this.removeEventListener("click", this._onClick);
    if (this._onKeyDown) this.removeEventListener("keydown", this._onKeyDown);
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyStyles();
  }
  _applyStyles() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars["--_elevation"] = shadow;
    this._setDynamicVars(vars);
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-card", UICard);

// src/components/card/header.js
var UICardHeader = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    border: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: flex;
        align-items: center;
        gap: 0.75em;
        padding: 1em 1.25em;
        font-weight: 600;
        font-size: 1.1em;
        background: var(--_bg, transparent);
        color: var(--_color, inherit);
        box-sizing: border-box;
      }

      :host([border]) {
        border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyColors();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyColors();
  }
  _applyColors() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-card-header", UICardHeader);

// src/components/card/media.js
var UICardMedia = class extends UIComponent {
  static properties = {
    height: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        overflow: hidden;
        line-height: 0;
        box-sizing: border-box;
      }

      ::slotted(img),
      ::slotted(video),
      ::slotted(picture) {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyHeight();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyHeight();
  }
  _applyHeight() {
    const vars = {};
    if (this.height) vars["height"] = this.height;
    this._setDynamicVars(vars);
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-card-media", UICardMedia);

// src/components/card/body.js
var UICardBody = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        padding: 1em 1.25em;
        background: var(--_bg, transparent);
        color: var(--_color, inherit);
        box-sizing: border-box;
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyColors();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyColors();
  }
  _applyColors() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-card-body", UICardBody);

// src/components/card/footer.js
var UICardFooter = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: flex;
        align-items: center;
        gap: 0.5em;
        padding: 0.75em 1.25em;
        border-top: 1px solid var(--ui-border-color, #e5e7eb);
        background: var(--_bg, transparent);
        color: var(--_color, inherit);
        box-sizing: border-box;
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyColors();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyColors();
  }
  _applyColors() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-card-footer", UICardFooter);

// src/components/chart/chart.js
var CHART_JS_URL = "https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js";
var UIChart = class _UIChart extends UIComponent {
  static properties = {
    height: { type: String, default: "8em", reflect: true },
    src: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    noAnimate: { type: Boolean, default: false, reflect: true, attribute: "no-animate" }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        height: var(--_height, 8em);
        background: var(--_bg, transparent);
        color: var(--_fg, inherit);
        border-radius: var(--ui-radius, 0.375em);
        overflow: hidden;
      }

      .frame {
        position: relative;
        width: 100%;
        height: 100%;
      }

      canvas {
        display: block;
        width: 100% !important;
        height: 100% !important;
      }

      .overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: inherit;
        font-size: 0.85em;
        color: var(--_fg, var(--ui-text-muted, #6b7280));
        pointer-events: none;
      }
      .overlay.hidden { display: none; }

      .error-text { color: var(--ui-red-500, #ef4444); }

      /* simple spinner */
      .spinner {
        width: 1.5em;
        height: 1.5em;
        border: 2px solid var(--ui-border-color, #d1d5db);
        border-top-color: var(--ui-indigo-500, #6366f1);
        border-radius: 50%;
        animation: _spin 0.6s linear infinite;
      }
      @keyframes _spin { to { transform: rotate(360deg); } }

      .empty {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-family: inherit;
        font-size: 0.9em;
        color: var(--_fg, var(--ui-text-muted, #6b7280));
        opacity: 0.6;
      }
    `
    );
  }
  /** Shared Chart.js bootstrap promise (once per page). */
  static _chartJsPromise = null;
  constructor() {
    super();
    this._config = null;
    this._chart = null;
    this._loadedSrc = "";
    this._configFromSrc = null;
    this._srcRequestId = 0;
    this._refreshSeq = 0;
    this._refreshTimer = null;
  }
  /* ── config property (JS only, not reflected) ───────────── */
  set config(value) {
    this._config = value && typeof value === "object" ? value : null;
    if (this._initialised) this._scheduleRefresh();
  }
  get config() {
    return this._config;
  }
  /** Read-only access to the live Chart.js instance. */
  get chart() {
    return this._chart;
  }
  /* ── Lifecycle ──────────────────────────────────────────── */
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    clearTimeout(this._refreshTimer);
    this._destroyChart();
    super.disconnectedCallback();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === "src" && oldVal !== newVal) {
      this._loadedSrc = "";
      this._configFromSrc = null;
    }
  }
  /* ── Reactive updates ───────────────────────────────────── */
  _update() {
    if (this._chart && this.shadowRoot?.querySelector("canvas")) {
      this._applyStyles();
      this._scheduleRefresh();
      return;
    }
    super._update();
    this._applyStyles();
    this._scheduleRefresh();
  }
  /** Pattern A — only set CSS vars when attribute has a value. */
  _applyStyles() {
    const vars = {};
    vars["--_height"] = this._height || "8em";
    if (this.background) vars["--_bg"] = resolveColor(this.background);
    if (this.color) vars["--_fg"] = resolveColor(this.color);
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
  }
  /* ── Chart refresh ──────────────────────────────────────── */
  /**
   * Debounced entry point.  Coalesces rapid config changes (e.g. during
   * live-typing in a JSON editor) so Chart.js only re-renders once the
   * input settles.
   */
  _scheduleRefresh() {
    clearTimeout(this._refreshTimer);
    const delay = this._chart ? 200 : 0;
    this._refreshTimer = setTimeout(() => this._doRefresh(), delay);
  }
  async _doRefresh() {
    const seq = ++this._refreshSeq;
    let canvas = this.shadowRoot?.querySelector("canvas");
    if (!canvas) {
      if (this._src || this._config) {
        super._update();
        this._applyStyles();
        return this._doRefresh();
      }
      return;
    }
    this._setOverlay("loading");
    try {
      const config = await this._resolveConfig();
      if (seq !== this._refreshSeq) return;
      if (!config) {
        this._destroyChart();
        this._setOverlay("empty");
        return;
      }
      await _UIChart._loadChartJs();
      if (seq !== this._refreshSeq) return;
      if (this._noAnimate) {
        config.options = config.options || {};
        config.options.animation = false;
      }
      if (this._chart && this._chart.config.type === config.type) {
        this._chart.data = config.data;
        this._chart.options = config.options || {};
        this._chart.update();
      } else {
        this._destroyChart();
        const fresh = document.createElement("canvas");
        fresh.setAttribute("part", "canvas");
        canvas.replaceWith(fresh);
        canvas = fresh;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        this._chart = new window.Chart(ctx, config);
      }
      this._setOverlay("ready");
      this.emit("ui-load");
    } catch (err) {
      if (seq !== this._refreshSeq) return;
      this._destroyChart();
      this._setOverlay("error");
      this.emit("ui-error", { message: err.message || "Chart render failed" });
      console.warn("[ui-chart] Chart render failed:", err);
    }
  }
  /* ── Config resolution ──────────────────────────────────── */
  async _resolveConfig() {
    const srcConfig = await this._loadConfigFromSrc();
    if (srcConfig) return this._normalizeConfig(srcConfig);
    if (this._config) return this._normalizeConfig(this._config);
    return null;
  }
  async _loadConfigFromSrc() {
    const src = (this._src || "").trim();
    if (!src) return null;
    if (this._loadedSrc === src && this._configFromSrc) {
      return this._configFromSrc;
    }
    const requestId = ++this._srcRequestId;
    const response = await fetch(src, { cache: "no-cache" });
    if (!response.ok) throw new Error(`Failed to load chart config: ${src} (${response.status})`);
    const json = await response.json();
    if (requestId !== this._srcRequestId) return null;
    this._loadedSrc = src;
    this._configFromSrc = json;
    return json;
  }
  /**
   * Deep-clone config, preserving function references (callbacks,
   * formatters, onClick handlers, etc.).  JSON.parse/stringify would
   * silently strip them — this recursive copy keeps them intact.
   */
  _deepClone(obj) {
    if (obj === null || typeof obj !== "object") return obj;
    if (Array.isArray(obj)) return obj.map((v) => this._deepClone(v));
    const result = {};
    for (const key of Object.keys(obj)) {
      result[key] = typeof obj[key] === "function" ? obj[key] : this._deepClone(obj[key]);
    }
    return result;
  }
  /** Deep-clone + inject sensible defaults. */
  _normalizeConfig(config) {
    const base = this._deepClone(config);
    const options = base.options || {};
    options.responsive = options.responsive ?? true;
    options.maintainAspectRatio = options.maintainAspectRatio ?? false;
    return {
      ...base,
      type: base.type || "line",
      data: base.data || {},
      options
    };
  }
  /* ── Chart lifecycle ────────────────────────────────────── */
  _destroyChart() {
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
  }
  /* ── Overlay management ─────────────────────────────────── */
  _setOverlay(state) {
    const loading = this.shadowRoot?.querySelector(".overlay-loading");
    const error = this.shadowRoot?.querySelector(".overlay-error");
    if (loading) loading.classList.toggle("hidden", state !== "loading");
    if (error) error.classList.toggle("hidden", state !== "error");
  }
  /* ── Chart.js CDN loader (once per page, retries on fail) ── */
  static _loadChartJs() {
    if (window.Chart) return Promise.resolve(window.Chart);
    if (_UIChart._chartJsPromise) return _UIChart._chartJsPromise;
    _UIChart._chartJsPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector("script[data-ui-chartjs]");
      if (existing) {
        if (existing.dataset.loaded === "true") return resolve(window.Chart);
        existing.addEventListener("load", () => resolve(window.Chart));
        existing.addEventListener("error", reject);
        return;
      }
      const script = document.createElement("script");
      script.src = CHART_JS_URL;
      script.async = true;
      script.dataset.uiChartjs = "true";
      script.addEventListener("load", () => {
        script.dataset.loaded = "true";
        resolve(window.Chart);
      });
      script.addEventListener("error", () => {
        _UIChart._chartJsPromise = null;
        reject(new Error("Chart.js CDN load failed"));
      });
      document.head.appendChild(script);
    });
    return _UIChart._chartJsPromise;
  }
  /* ── Render ─────────────────────────────────────────────── */
  render() {
    const hasConfig = this._src || this._config;
    if (!hasConfig) {
      return '<div class="empty">Provide src or config.</div>';
    }
    return `
      <div class="frame">
        <canvas part="canvas"></canvas>
        <div class="overlay overlay-loading" part="loading"><div class="spinner"></div></div>
        <div class="overlay overlay-error hidden" part="error"><span class="error-text">Chart failed to load.</span></div>
      </div>
    `;
  }
};
customElements.define("ui-chart", UIChart);

// src/components/map/map.js
var LEAFLET_VERSION = "1.9.4";
var LEAFLET_BASE = `https://cdn.jsdelivr.net/npm/leaflet@${LEAFLET_VERSION}/dist`;
var LEAFLET_CSS_URL = `${LEAFLET_BASE}/leaflet.css`;
var LEAFLET_JS_URL = `${LEAFLET_BASE}/leaflet.js`;
var TILE_LIGHT = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
var TILE_DARK = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png";
var TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
var NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
var UIMap = class _UIMap extends UIComponent {
  static properties = {
    height: { type: String, default: "20em", reflect: true },
    lat: { type: Number, default: 0, reflect: true },
    lng: { type: Number, default: 0, reflect: true },
    zoom: { type: Number, default: 2, reflect: true },
    src: { type: String, default: "", reflect: true },
    dark: { type: Boolean, default: false, reflect: true },
    noZoom: { type: Boolean, default: false, reflect: true, attribute: "no-zoom" }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        height: var(--_height, 20em);
      }

      .frame {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: var(--ui-radius, 0.375em);
        overflow: hidden;
        border: 1px solid var(--ui-border-color, #d1d5db);
      }

      .map-container {
        width: 100%;
        height: 100%;
      }

      .overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: inherit;
        font-size: 0.85em;
        color: var(--ui-text-muted, #6b7280);
        background: var(--ui-bg, #fff);
        pointer-events: none;
        z-index: 1000;
      }
      .overlay.hidden { display: none; }
      .error-text { color: var(--ui-red-500, #ef4444); }

      .spinner {
        width: 1.5em;
        height: 1.5em;
        border: 2px solid var(--ui-border-color, #d1d5db);
        border-top-color: var(--ui-indigo-500, #6366f1);
        border-radius: 50%;
        animation: _spin 0.6s linear infinite;
      }
      @keyframes _spin { to { transform: rotate(360deg); } }
    `
    );
  }
  /** Shared Leaflet bootstrap promise (once per page). */
  static _leafletPromise = null;
  /** Cached Leaflet CSS text (fetched once, injected into each shadow root). */
  static _leafletCssText = null;
  /** Geocode cache: address → { lat, lng }  (persists for page lifetime). */
  static _geocodeCache = /* @__PURE__ */ new Map();
  constructor() {
    super();
    this._config = null;
    this._map = null;
    this._markers = [];
    this._lines = [];
    this._tileLayer = null;
    this._loadedSrc = "";
    this._configFromSrc = null;
    this._srcRequestId = 0;
    this._initSeq = 0;
    this._refreshTimer = null;
  }
  /* ── config property (JS only) ──────────────────────────── */
  set config(value) {
    this._config = value && typeof value === "object" ? value : null;
    if (this._initialised) this._scheduleRefresh();
  }
  get config() {
    return this._config;
  }
  /* ── Lifecycle ──────────────────────────────────────────── */
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    clearTimeout(this._refreshTimer);
    this._initSeq++;
    this._destroyMap();
    super.disconnectedCallback();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === "src" && oldVal !== newVal) {
      this._loadedSrc = "";
      this._configFromSrc = null;
    }
  }
  /* ── Reactive updates ───────────────────────────────────── */
  _update() {
    if (this._map) {
      this._applyHeight();
      this._scheduleRefresh();
      return;
    }
    super._update();
    this._applyHeight();
    this._scheduleRefresh();
  }
  _applyHeight() {
    this._setDynamicVars({ "--_height": this._height || "20em" });
  }
  /* ── Map refresh (debounced) ────────────────────────────── */
  _scheduleRefresh() {
    clearTimeout(this._refreshTimer);
    const delay = this._map ? 150 : 0;
    this._refreshTimer = setTimeout(() => this._doRefresh(), delay);
  }
  async _doRefresh() {
    const seq = ++this._initSeq;
    const container = this.shadowRoot?.querySelector(".map-container");
    if (!container) return;
    this._setOverlay("loading");
    try {
      const [L] = await Promise.all([
        _UIMap._loadLeaflet(),
        this._injectLeafletCss()
      ]);
      if (seq !== this._initSeq) return;
      const resolved = await this._resolveConfig();
      if (seq !== this._initSeq) return;
      const center = resolved.center;
      const zoom = resolved.zoom;
      if (this._map) {
        this._map.setView(center, zoom);
        this._updateTiles(L);
        await this._updateMarkers(L, resolved.markers, resolved.icon);
        await this._updateLines(L, resolved.lines);
        this._map.invalidateSize();
      } else {
        const map = L.map(container, {
          center,
          zoom,
          scrollWheelZoom: !this._noZoom,
          attributionControl: true
        });
        this._map = map;
        this._addTiles(L);
        await this._updateMarkers(L, resolved.markers, resolved.icon);
        await this._updateLines(L, resolved.lines);
      }
      if (this._noZoom) this._map.scrollWheelZoom.disable();
      else this._map.scrollWheelZoom.enable();
      this._setOverlay("ready");
    } catch (err) {
      if (seq !== this._initSeq) return;
      this._setOverlay("error");
      console.warn("[ui-map] Map render failed:", err);
    }
  }
  /* ── Config resolution ──────────────────────────────────── */
  async _resolveConfig() {
    const srcCfg = await this._loadConfigFromSrc();
    const cfg = srcCfg || this._config || {};
    let center = cfg.center;
    if (typeof center === "string") {
      const coords = await _UIMap._geocode(center);
      center = coords ? [coords.lat, coords.lng] : [this._lat || 0, this._lng || 0];
    } else {
      center = center || [this._lat || 0, this._lng || 0];
    }
    return {
      center,
      zoom: cfg.zoom ?? this._zoom ?? 2,
      icon: cfg.icon || null,
      markers: cfg.markers || [],
      lines: cfg.lines || []
    };
  }
  async _loadConfigFromSrc() {
    const src = (this._src || "").trim();
    if (!src) return null;
    if (this._loadedSrc === src && this._configFromSrc) return this._configFromSrc;
    const requestId = ++this._srcRequestId;
    const response = await fetch(src, { cache: "no-cache" });
    if (!response.ok) throw new Error(`Failed to load map config: ${src} (${response.status})`);
    const json = await response.json();
    if (requestId !== this._srcRequestId) return null;
    this._loadedSrc = src;
    this._configFromSrc = json;
    return json;
  }
  /* ── Tiles ──────────────────────────────────────────────── */
  _addTiles(L) {
    const url = this._dark ? TILE_DARK : TILE_LIGHT;
    this._tileLayer = L.tileLayer(url, {
      attribution: TILE_ATTRIBUTION,
      maxZoom: 19
    }).addTo(this._map);
    this._currentTileUrl = url;
  }
  _updateTiles(L) {
    const url = this._dark ? TILE_DARK : TILE_LIGHT;
    if (this._currentTileUrl === url) return;
    if (this._tileLayer) this._map.removeLayer(this._tileLayer);
    this._addTiles(L);
  }
  /* ── Markers ────────────────────────────────────────────── */
  async _updateMarkers(L, markers, defaultIcon) {
    for (const m of this._markers) this._map.removeLayer(m);
    this._markers = [];
    if (!markers || !markers.length) return;
    for (const m of markers) {
      let lat = m.lat ?? m[0];
      let lng = m.lng ?? m[1];
      if (lat == null || lng == null) {
        const address = m.address || m[2];
        if (!address) continue;
        const coords = await _UIMap._geocode(address);
        if (!coords) continue;
        lat = coords.lat;
        lng = coords.lng;
      }
      const iconDef = m.icon || defaultIcon;
      const opts = {};
      if (iconDef) opts.icon = _UIMap._buildIcon(L, iconDef);
      const marker = L.marker([lat, lng], opts).addTo(this._map);
      if (m.popup) marker.bindPopup(String(m.popup));
      this._markers.push(marker);
    }
  }
  /* ── Lines (polylines) ──────────────────────────────────── */
  /**
   * Draw polylines on the map.
   *
   * Each line object:
   *   {
   *     points: [ [lat, lng], { lat, lng }, { address: "..." }, "address" ],
   *     color:  "#6366f1",   // stroke colour (default: indigo)
   *     weight: 3,           // stroke width  (default: 3)
   *     opacity: 1,          // stroke opacity (default: 1)
   *     dash:   "10 5",      // dashArray string (optional)
   *   }
   */
  async _updateLines(L, lines) {
    for (const ln of this._lines) this._map.removeLayer(ln);
    this._lines = [];
    if (!lines || !lines.length) return;
    for (const lineDef of lines) {
      const rawPoints = lineDef.points || lineDef;
      if (!Array.isArray(rawPoints) || !rawPoints.length) continue;
      const resolved = await Promise.all(
        rawPoints.map((p) => _UIMap._resolvePoint(p))
      );
      const coords = resolved.filter((c) => c != null);
      if (coords.length < 2) continue;
      const polyline = L.polyline(coords, {
        color: lineDef.color || "var(--ui-indigo-500, #6366f1)",
        weight: lineDef.weight ?? 3,
        opacity: lineDef.opacity ?? 1,
        dashArray: lineDef.dash || null
      }).addTo(this._map);
      this._lines.push(polyline);
    }
  }
  /* ── Icon builder ───────────────────────────────────────── */
  /**
   * Build a Leaflet Icon from a string URL or a config object.
   *  - String → treated as `iconUrl`; uses sensible defaults for size.
   *  - Object → `{ url, size?, anchor?, popupAnchor? }`
   */
  static _buildIcon(L, def) {
    if (!def) return void 0;
    const url = typeof def === "string" ? def : def.url;
    if (!url) return void 0;
    const size = typeof def === "object" && def.size || [25, 41];
    const anchor = typeof def === "object" && def.anchor || [Math.round(size[0] / 2), size[1]];
    const popupAnchor = typeof def === "object" && def.popupAnchor || [0, -size[1]];
    return L.icon({ iconUrl: url, iconSize: size, iconAnchor: anchor, popupAnchor });
  }
  /* ── Geocoding (Nominatim — free, no key, cached) ───────── */
  /**
   * Resolve a point definition → [lat, lng].
   * Accepts: [lat, lng], { lat, lng }, { address: '...' }, or a string.
   */
  static async _resolvePoint(point) {
    if (Array.isArray(point)) return point;
    if (typeof point === "string") {
      const c = await _UIMap._geocode(point);
      return c ? [c.lat, c.lng] : null;
    }
    if (point && typeof point === "object") {
      if (point.lat != null && point.lng != null) return [point.lat, point.lng];
      if (point.address) {
        const c = await _UIMap._geocode(point.address);
        return c ? [c.lat, c.lng] : null;
      }
    }
    return null;
  }
  /**
   * Geocode an address string → `{ lat, lng }` or `null`.
   * Results are cached for the page lifetime.
   */
  static async _geocode(address) {
    if (!address || typeof address !== "string") return null;
    const key = address.trim().toLowerCase();
    if (_UIMap._geocodeCache.has(key)) return _UIMap._geocodeCache.get(key);
    try {
      const url = `${NOMINATIM_URL}?format=json&limit=1&q=${encodeURIComponent(address)}`;
      const res = await fetch(url);
      if (!res.ok) return null;
      const data = await res.json();
      if (!data.length) {
        _UIMap._geocodeCache.set(key, null);
        return null;
      }
      const result = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      _UIMap._geocodeCache.set(key, result);
      return result;
    } catch (err) {
      console.warn("[ui-map] Geocode failed for:", address, err);
      return null;
    }
  }
  /* ── Map lifecycle ──────────────────────────────────────── */
  _destroyMap() {
    if (this._map) {
      this._map.remove();
      this._map = null;
      this._tileLayer = null;
      this._markers = [];
      this._lines = [];
      this._currentTileUrl = "";
    }
  }
  /* ── Overlay ────────────────────────────────────────────── */
  _setOverlay(state) {
    const loading = this.shadowRoot?.querySelector(".overlay-loading");
    const error = this.shadowRoot?.querySelector(".overlay-error");
    if (loading) loading.classList.toggle("hidden", state !== "loading");
    if (error) error.classList.toggle("hidden", state !== "error");
  }
  /* ── Leaflet CSS → shadow DOM ───────────────────────────── */
  async _injectLeafletCss() {
    if (this.shadowRoot.getElementById("__leaflet-css")) return;
    if (!_UIMap._leafletCssText) {
      const res = await fetch(LEAFLET_CSS_URL);
      if (!res.ok) throw new Error(`Leaflet CSS fetch failed: ${res.status}`);
      _UIMap._leafletCssText = await res.text();
    }
    const style = document.createElement("style");
    style.id = "__leaflet-css";
    style.textContent = _UIMap._leafletCssText;
    this.shadowRoot.prepend(style);
  }
  /* ── Leaflet CDN loader (once per page, retries on fail) ── */
  static _loadLeaflet() {
    if (window.L) return Promise.resolve(window.L);
    if (_UIMap._leafletPromise) return _UIMap._leafletPromise;
    _UIMap._leafletPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector("script[data-ui-leaflet]");
      if (existing) {
        if (existing.dataset.loaded === "true") return resolve(window.L);
        existing.addEventListener("load", () => resolve(window.L));
        existing.addEventListener("error", reject);
        return;
      }
      const script = document.createElement("script");
      script.src = LEAFLET_JS_URL;
      script.async = true;
      script.dataset.uiLeaflet = "true";
      script.addEventListener("load", () => {
        script.dataset.loaded = "true";
        resolve(window.L);
      });
      script.addEventListener("error", () => {
        _UIMap._leafletPromise = null;
        reject(new Error("Leaflet CDN load failed"));
      });
      document.head.appendChild(script);
    });
    return _UIMap._leafletPromise;
  }
  /* ── Render ─────────────────────────────────────────────── */
  render() {
    return `
      <div class="frame" part="frame">
        <div class="map-container" part="map"></div>
        <div class="overlay overlay-loading" part="loading"><div class="spinner"></div></div>
        <div class="overlay overlay-error hidden" part="error"><span class="error-text">Map failed to load.</span></div>
      </div>
    `;
  }
};
customElements.define("ui-map", UIMap);

// src/components/carousel/carousel.js
var UICarousel = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    elevation: { type: String, default: "", reflect: true },
    autoplay: { type: Number, default: 0, reflect: true },
    loop: { type: Boolean, default: false, reflect: true },
    navigation: { type: Boolean, default: true, reflect: true },
    indicators: { type: Boolean, default: true, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        position: relative;
        background: var(--_bg, transparent);
        color: var(--_color, inherit);
        border-radius: var(--ui-radius, 0.5em);
        box-shadow: var(--_elevation, none);
        box-sizing: border-box;
        user-select: none;
        --_arrow-size: 2.2em;
      }

      /* \u2500\u2500 Viewport \u2014 clips off-screen slides without hiding shadow/controls */
      .viewport {
        overflow: hidden;
        border-radius: inherit;
        position: relative;
      }

      /* \u2500\u2500 Track \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .track {
        display: flex;
        transition: transform 0.4s ease;
        will-change: transform;
        height: 100%;
      }

      ::slotted(ui-carousel-slide) {
        flex: 0 0 100%;
        min-width: 0;
        box-sizing: border-box;
      }

      /* \u2500\u2500 Arrows \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--_arrow-size);
        height: var(--_arrow-size);
        border: none;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.45);
        color: #fff;
        font-size: 1em;
        cursor: pointer;
        transition: background 0.15s ease, opacity 0.15s ease;
        padding: 0;
        line-height: 1;
        opacity: 0.85;
      }

      .arrow:hover { background: rgba(0, 0, 0, 0.65); opacity: 1; }
      .arrow:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: 0.125em;
      }
      .arrow[disabled] {
        opacity: 0.25;
        pointer-events: none;
      }

      .arrow--prev { left: 0.5em; }
      .arrow--next { right: 0.5em; }

      .arrow svg {
        width: 1em;
        height: 1em;
        fill: none;
        stroke: currentColor;
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      /* \u2500\u2500 Indicators \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .dots {
        position: absolute;
        bottom: 0.6em;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 0.4em;
        z-index: 2;
      }

      .dot {
        width: 0.55em;
        height: 0.55em;
        border-radius: 50%;
        border: none;
        padding: 0;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.5);
        transition: background 0.2s ease, transform 0.2s ease;
      }

      .dot:hover { background: rgba(255, 255, 255, 0.8); }
      .dot:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: 0.1em;
      }
      .dot[aria-current="true"] {
        background: #fff;
        transform: scale(1.25);
      }

      /* Hide controls via attribute */
      :host(:not([navigation])) .arrow { display: none; }
      :host(:not([indicators])) .dots  { display: none; }
    `
    );
  }
  constructor() {
    super();
    this._index = 0;
    this._onKey = this._onKey.bind(this);
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "region");
    this.setAttribute("aria-roledescription", "carousel");
    this.setAttribute("tabindex", "0");
    this._applyStyles();
    this.addEventListener("keydown", this._onKey);
    this.addEventListener("pointerdown", this._onPointerDown);
    this._onEnter = () => this._pauseAutoplay();
    this._onLeave = () => this._startAutoplay();
    this.addEventListener("mouseenter", this._onEnter);
    this.addEventListener("mouseleave", this._onLeave);
    this._observer = new MutationObserver(() => this._onSlidesChange());
    this._observer.observe(this, { childList: true });
    requestAnimationFrame(() => {
      this._onSlidesChange();
      this._startAutoplay();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this._onKey);
    this.removeEventListener("pointerdown", this._onPointerDown);
    this.removeEventListener("mouseenter", this._onEnter);
    this.removeEventListener("mouseleave", this._onLeave);
    this._stopAutoplay();
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (!this._initialised) return;
    this._applyStyles();
    if (name === "autoplay") {
      this._stopAutoplay();
      this._startAutoplay();
    }
  }
  /* ── Public API ────────────────────────────────────────── */
  /** Number of slides. */
  get count() {
    return this._slides().length;
  }
  /** Current slide index (0-based). */
  get index() {
    return this._index;
  }
  /** Go to a specific slide by index. */
  goTo(i) {
    const slides = this._slides();
    if (!slides.length) return;
    let idx = i;
    if (this.loop) {
      idx = (idx % slides.length + slides.length) % slides.length;
    } else {
      idx = Math.max(0, Math.min(idx, slides.length - 1));
    }
    if (idx === this._index) return;
    this._index = idx;
    this._move();
    this.emit("ui-slide-change", { index: this._index });
  }
  /** Advance to the next slide. */
  next() {
    this.goTo(this._index + 1);
  }
  /** Go back to the previous slide. */
  prev() {
    this.goTo(this._index - 1);
  }
  /* ── Internal ──────────────────────────────────────────── */
  _slides() {
    return [...this.querySelectorAll("ui-carousel-slide")];
  }
  _applyStyles() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars["--_elevation"] = shadow;
    this._setDynamicVars(vars);
  }
  /** Translate the track to show the current slide. */
  _move() {
    const track = this.shadowRoot?.querySelector(".track");
    if (track) track.style.transform = `translateX(-${this._index * 100}%)`;
    this._updateControls();
  }
  /** Sync arrow disabled states and dot indicators. */
  _updateControls() {
    const root = this.shadowRoot;
    if (!root) return;
    const slides = this._slides();
    const prevBtn = root.querySelector(".arrow--prev");
    const nextBtn = root.querySelector(".arrow--next");
    if (prevBtn) {
      prevBtn.disabled = !this.loop && this._index === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = !this.loop && this._index >= slides.length - 1;
    }
    root.querySelectorAll(".dot").forEach((dot, i) => {
      dot.setAttribute("aria-current", i === this._index ? "true" : "false");
    });
  }
  /** Re-render dots when slides are added / removed. */
  _onSlidesChange() {
    const slides = this._slides();
    slides.forEach((s, i) => {
      s.setAttribute("role", "tabpanel");
      s.setAttribute("aria-roledescription", "slide");
      s.setAttribute("aria-label", `Slide ${i + 1} of ${slides.length}`);
    });
    const dotsEl = this.shadowRoot?.querySelector(".dots");
    if (dotsEl) {
      dotsEl.innerHTML = slides.map(
        (_, i) => `<button class="dot" aria-label="Go to slide ${i + 1}" aria-current="${i === this._index ? "true" : "false"}"></button>`
      ).join("");
      dotsEl.querySelectorAll(".dot").forEach((dot, i) => {
        dot.addEventListener("click", () => this.goTo(i));
      });
    }
    if (this._index >= slides.length) {
      this._index = Math.max(0, slides.length - 1);
    }
    this._move();
  }
  /* ── Autoplay ──────────────────────────────────────────── */
  _startAutoplay() {
    this._stopAutoplay();
    if (this.autoplay > 0) {
      this._autoTimer = setInterval(() => this.next(), this.autoplay);
    }
  }
  _stopAutoplay() {
    if (this._autoTimer) {
      clearInterval(this._autoTimer);
      this._autoTimer = null;
    }
  }
  _pauseAutoplay() {
    this._stopAutoplay();
  }
  /* ── Keyboard ──────────────────────────────────────────── */
  _onKey(e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      this.next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      this.prev();
    }
  }
  /* ── Pointer / touch swipe ─────────────────────────────── */
  _onPointerDown(e) {
    if (e.button !== 0) return;
    const path = e.composedPath();
    if (path.some((el) => el.classList && (el.classList.contains("arrow") || el.classList.contains("dot")))) return;
    this._swipeX = e.clientX;
    this._swiping = true;
    this.addEventListener("pointermove", this._onPointerMove);
    this.addEventListener("pointerup", this._onPointerUp);
    this.addEventListener("pointercancel", this._onPointerUp);
    this.setPointerCapture(e.pointerId);
  }
  _onPointerMove(e) {
    if (!this._swiping) return;
    this._swipeDelta = e.clientX - this._swipeX;
  }
  _onPointerUp(e) {
    if (!this._swiping) return;
    this._swiping = false;
    this.removeEventListener("pointermove", this._onPointerMove);
    this.removeEventListener("pointerup", this._onPointerUp);
    this.removeEventListener("pointercancel", this._onPointerUp);
    this.releasePointerCapture(e.pointerId);
    const threshold = 50;
    if (this._swipeDelta > threshold) this.prev();
    else if (this._swipeDelta < -threshold) this.next();
    this._swipeDelta = 0;
  }
  /* ── Render ────────────────────────────────────────────── */
  render() {
    const chevronLeft = '<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>';
    const chevronRight = '<svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>';
    return `
      <div class="viewport">
        <div class="track"><slot></slot></div>
        <button class="arrow arrow--prev" aria-label="Previous slide">${chevronLeft}</button>
        <button class="arrow arrow--next" aria-label="Next slide">${chevronRight}</button>
        <div class="dots" role="tablist" aria-label="Slides"></div>
      </div>
    `;
  }
  /** Wire up arrow click handlers and rebuild dots after render. */
  _update() {
    super._update();
    const root = this.shadowRoot;
    if (!root) return;
    const prevBtn = root.querySelector(".arrow--prev");
    const nextBtn = root.querySelector(".arrow--next");
    if (prevBtn) prevBtn.addEventListener("click", () => this.prev());
    if (nextBtn) nextBtn.addEventListener("click", () => this.next());
    this._onSlidesChange();
  }
};
customElements.define("ui-carousel", UICarousel);

// src/components/carousel/slide.js
var UICarouselSlide = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    image: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2em;
        background-color: var(--_bg, transparent);
        background-image: var(--_bg-image, none);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        color: var(--_color, inherit);
        box-sizing: border-box;
        min-height: 12em;
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyColors();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyColors();
  }
  _applyColors() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    if (this.image) {
      vars["--_bg-image"] = `url(${this.image})`;
      if (!this.color && !this.background) {
        vars["--_color"] = "#fff";
      }
    }
    this._setDynamicVars(vars);
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-carousel-slide", UICarouselSlide);

// src/components/details/details.js
var UIDetails = class extends UIComponent {
  static properties = {
    summary: { type: String, default: "Details", reflect: true },
    open: { type: Boolean, default: false, reflect: true },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    elevation: { type: String, default: "", reflect: true },
    outline: { type: Boolean, default: false, reflect: true },
    flat: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        border-radius: var(--ui-radius, 0.5em);
        border: 1px solid var(--ui-border-color, #e5e7eb);
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        box-shadow: var(--_elevation, none);
        overflow: hidden;
        box-sizing: border-box;
        line-height: 1.5;
      }

      :host([flat]) {
        border: none;
        box-shadow: none;
      }

      /* \u2500\u2500 Native details reset \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      details {
        margin: 0;
      }

      /* \u2500\u2500 Summary (clickable header) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5em;
        padding: 0.75em 1em;
        cursor: pointer;
        font-weight: 600;
        user-select: none;
        list-style: none;             /* remove default marker */
        transition: background 0.15s ease;
      }

      /* Remove default marker across browsers */
      summary::-webkit-details-marker { display: none; }
      summary::marker { display: none; content: ''; }

      summary:hover {
        background: rgba(0, 0, 0, 0.04);
      }

      summary:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: -0.125em;
      }

      /* \u2500\u2500 Chevron icon \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .chevron {
        flex-shrink: 0;
        width: 1em;
        height: 1em;
        transition: transform 0.25s ease;
      }

      .chevron svg {
        display: block;
        width: 100%;
        height: 100%;
        fill: none;
        stroke: currentColor;
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-linejoin: round;
        opacity: 0.55;
      }

      details[open] .chevron {
        transform: rotate(180deg);
      }

      /* \u2500\u2500 Content area \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .content {
        padding: 0 1em 1em;
        overflow: hidden;
      }

      /* \u2500\u2500 Animation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .content-inner {
        /* Used as animation wrapper */
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (!this._initialised) return;
    this._applyStyles();
    if (name === "open") {
      const el = this.shadowRoot?.querySelector("details");
      if (el) el.open = this.open;
    }
  }
  _applyStyles() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars["--_elevation"] = shadow;
    this._setDynamicVars(vars);
  }
  /** Wire up the toggle listener after each render. */
  _update() {
    super._update();
    const details = this.shadowRoot?.querySelector("details");
    if (!details) return;
    if (this._toggleHandler) details.removeEventListener("toggle", this._toggleHandler);
    this._toggleHandler = () => {
      const isOpen = details.open;
      if (isOpen && !this.hasAttribute("open")) this.setAttribute("open", "");
      else if (!isOpen && this.hasAttribute("open")) this.removeAttribute("open");
      this.emit("ui-toggle", { open: isOpen });
    };
    details.addEventListener("toggle", this._toggleHandler);
  }
  render() {
    const chevron = '<svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>';
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `
      <details${this.open ? " open" : ""}>
        <summary>
          <span>${esc(this.summary)}</span>
          <span class="chevron">${chevron}</span>
        </summary>
        <div class="content">
          <div class="content-inner">
            <slot></slot>
          </div>
        </div>
      </details>
    `;
  }
};
customElements.define("ui-details", UIDetails);

// src/components/dialog/dialog.js
var UIDialog = class _UIDialog extends UIComponent {
  static properties = {
    open: { type: Boolean, default: false, reflect: true },
    modal: { type: Boolean, default: true, reflect: true },
    width: { type: String, default: "", reflect: true },
    maxHeight: { type: String, default: "", reflect: true, attribute: "max-height" },
    size: { type: String, default: "", reflect: true },
    padding: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    elevation: { type: String, default: "", reflect: true },
    persistent: { type: Boolean, default: false, reflect: true },
    noHeader: { type: Boolean, default: false, reflect: true, attribute: "no-header" },
    label: { type: String, default: "", reflect: true }
  };
  static _sizeMap = {
    small: "360px",
    medium: "500px",
    large: "700px",
    "x-large": "900px"
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: contents;
      }

      .backdrop {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 9998;
        background: rgba(0,0,0,0.45);
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      .backdrop.visible {
        display: block;
        opacity: 1;
      }

      .panel {
        display: none;
        position: fixed;
        z-index: 9999;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.95);
        background: var(--_bg, var(--ui-bg, #fff));
        border-radius: var(--ui-radius, 0.5em);
        box-shadow: var(--_elevation, 0 25px 50px rgba(0,0,0,0.15), 0 12px 24px rgba(0,0,0,0.08));
        box-sizing: border-box;
        max-width: 95vw;
        max-height: var(--_max-h, 85vh);
        width: var(--_width, min(90vw, 500px));
        opacity: 0;
        transition: opacity 0.2s ease, transform 0.2s ease;
        outline: none;
        overflow: hidden;
        flex-direction: column;
      }
      .panel.visible {
        display: flex;
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }

      :host([size="full"]) .panel.visible {
        width: 100vw;
        height: 100vh;
        max-width: 100vw;
        max-height: 100vh;
        border-radius: 0;
      }

      .header {
        display: flex;
        align-items: center;
        padding: 1em 1.25em;
        border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
        gap: 0.5em;
        flex-shrink: 0;
      }
      .header-title {
        flex: 1;
        font-weight: 600;
        font-size: 1.1em;
        margin: 0;
        line-height: 1.3;
      }
      .close-btn {
        all: unset;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2em;
        height: 2em;
        border-radius: var(--ui-radius, 0.375em);
        color: var(--ui-text-muted, #6b7280);
        transition: background 0.15s ease, color 0.15s ease;
        font-size: 1em;
        flex-shrink: 0;
      }
      .close-btn:hover {
        background: var(--ui-bg-subtle, #f3f4f6);
        color: var(--ui-text-color, #111827);
      }
      .close-btn:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: 0.125em;
      }
      .close-btn svg { width: 1em; height: 1em; }

      .body {
        padding: var(--_padding, 1.25em);
        overflow-y: auto;
        flex: 1 1 auto;
      }
    `
    );
  }
  constructor() {
    super();
    this._onBackdropClick = this._onBackdropClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onCloseClick = this._onCloseClick.bind(this);
  }
  render() {
    const headerHTML = this.noHeader ? "" : `
      <div class="header" part="header">
        <span class="header-title">${this._esc(this.label)}</span>
        <button class="close-btn" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>`;
    return `
      <div class="backdrop${this.open ? " visible" : ""}" part="backdrop"></div>
      <div class="panel${this.open ? " visible" : ""}" role="dialog" aria-modal="${this.modal}" aria-label="${this._esc(this.label)}" tabindex="-1" part="panel">
        ${headerHTML}
        <div class="body" part="body"><slot></slot></div>
      </div>
    `;
  }
  _esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.open) this._onOpen();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this._onKeyDown);
  }
  _attachListeners() {
    const backdrop = this.shadowRoot.querySelector(".backdrop");
    const closeBtn = this.shadowRoot.querySelector(".close-btn");
    if (backdrop) backdrop.addEventListener("click", this._onBackdropClick);
    if (closeBtn) closeBtn.addEventListener("click", this._onCloseClick);
  }
  _applyStyles() {
    const vars = {};
    if (this.size && this.size !== "full") {
      const preset = _UIDialog._sizeMap[this.size];
      if (preset) vars["--_width"] = preset;
    } else if (this.width) {
      vars["--_width"] = this.width;
    }
    if (this.maxHeight) vars["--_max-h"] = this.maxHeight;
    if (this.padding) vars["--_padding"] = this.padding;
    if (this.background) vars["--_bg"] = resolveColor(this.background) || this.background;
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars["--_elevation"] = shadow;
    this._setDynamicVars(vars);
  }
  /** Open the dialog programmatically. */
  show() {
    this.open = true;
  }
  /** Show as modal (same as show — modal is default). */
  showModal() {
    this.modal = true;
    this.open = true;
  }
  /** Close the dialog. */
  hide(reason = "api") {
    this._requestClose(reason);
  }
  _update() {
    const wasOpen = this.shadowRoot?.querySelector(".panel.visible");
    super._update();
    this._attachListeners();
    this._applyStyles();
    const isOpen = this.open;
    if (isOpen && !wasOpen) this._onOpen();
    if (!isOpen && wasOpen) this._onClose("property");
  }
  _onOpen() {
    document.addEventListener("keydown", this._onKeyDown);
    requestAnimationFrame(() => {
      const panel = this.shadowRoot.querySelector(".panel");
      if (panel) panel.focus();
    });
    this.emit("ui-open");
  }
  _onClose(reason) {
    document.removeEventListener("keydown", this._onKeyDown);
    this.emit("ui-close", { reason });
  }
  _requestClose(reason) {
    if (this.persistent) {
      this.emit("ui-request-close", { reason });
      const panel = this.shadowRoot.querySelector(".panel");
      if (panel) {
        panel.style.animation = "none";
        panel.offsetHeight;
        panel.style.animation = "shake 0.3s ease";
        setTimeout(() => panel.style.animation = "", 350);
      }
      return;
    }
    this.open = false;
  }
  _onBackdropClick() {
    this._requestClose("backdrop");
  }
  _onCloseClick() {
    this._requestClose("close-button");
  }
  _onKeyDown(e) {
    if (e.key === "Escape") {
      e.stopPropagation();
      this._requestClose("escape");
    }
  }
};
customElements.define("ui-dialog", UIDialog);

// src/components/divider/divider.js
var UIDivider = class extends UIComponent {
  static properties = {
    label: { type: String, default: "", reflect: true },
    vertical: { type: Boolean, default: false, reflect: true },
    color: { type: String, default: "", reflect: true },
    thickness: { type: String, default: "", reflect: true },
    spacing: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    variant: { type: String, default: "solid", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        box-sizing: border-box;
      }

      /* \u2500\u2500 Horizontal (default) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      :host(:not([vertical])) {
        width: 100%;
        margin: var(--_spacing, 1em) 0;
      }

      :host(:not([vertical])) .line {
        display: flex;
        align-items: center;
        gap: 0.75em;
      }

      :host(:not([vertical])) .line::before,
      :host(:not([vertical])) .line::after {
        content: '';
        flex: 1;
        border-top: var(--_thickness, 1px) var(--_variant, solid) var(--_color, var(--ui-border-color, #e5e7eb));
      }

      /* Hide ::after when there is no label (single line via ::before) */
      :host(:not([vertical]):not([label])) .line::after,
      :host(:not([vertical])[label=""]) .line::after {
        display: none;
      }

      /* \u2500\u2500 Vertical \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      :host([vertical]) {
        display: inline-block;
        width: auto;
        align-self: stretch;
        margin: 0 var(--_spacing, 1em);
      }

      :host([vertical]) .line {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        gap: 0.5em;
      }

      :host([vertical]) .line::before,
      :host([vertical]) .line::after {
        content: '';
        flex: 1;
        border-left: var(--_thickness, 1px) var(--_variant, solid) var(--_color, var(--ui-border-color, #e5e7eb));
      }

      :host([vertical]:not([label])) .line::after,
      :host([vertical][label=""]) .line::after {
        display: none;
      }

      /* \u2500\u2500 Label \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .label {
        color: var(--ui-text-muted, #6b7280);
        font-size: 0.8em;
        font-weight: 500;
        white-space: nowrap;
        user-select: none;
        line-height: 1;
      }

      :host([vertical]) .label {
        writing-mode: vertical-lr;
        transform: rotate(180deg);
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "separator");
    this._applyStyles();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (!this._initialised) return;
    this._applyStyles();
    if (name === "vertical") {
      this.setAttribute("aria-orientation", this.vertical ? "vertical" : "horizontal");
    }
  }
  _applyStyles() {
    const vars = {};
    if (this.color) vars["--_color"] = resolveColor(this.color);
    if (this.thickness) vars["--_thickness"] = resolveSize(this.thickness) || this.thickness;
    if (this.spacing) vars["--_spacing"] = resolveSize(this.spacing) || this.spacing;
    if (this.variant && this.variant !== "solid") vars["--_variant"] = this.variant;
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
    this.setAttribute("aria-orientation", this.vertical ? "vertical" : "horizontal");
  }
  render() {
    const hasLabel = this.label && this.label.length > 0;
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<div class="line">${hasLabel ? `<span class="label">${esc(this.label)}</span>` : ""}</div>`;
  }
};
customElements.define("ui-divider", UIDivider);

// src/components/dropdown/dropdown.js
var UIDropdown = class extends UIComponent {
  static properties = {
    background: { type: String, default: "gray-200", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "medium", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    pill: { type: Boolean, default: false, reflect: true },
    outline: { type: Boolean, default: false, reflect: true },
    flat: { type: Boolean, default: false, reflect: true },
    elevation: { type: String, default: "", reflect: true },
    placement: { type: String, default: "bottom-start", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: inline-block;
        position: relative;
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }

      /* ---- Trigger button ---- */
      .trigger {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
        cursor: pointer;
        font-family: inherit;
        font-weight: 500;
        border-radius: var(--ui-button-radius, 0.375em);
        transition: background-color 0.15s ease, box-shadow 0.15s ease,
                    transform 0.1s ease, filter 0.15s ease;
        box-sizing: border-box;
        white-space: nowrap;
        user-select: none;
        line-height: 1;
        padding: 0.5em 1em;
        background: var(--_bg);
        color: var(--_color, inherit);
      }

      .trigger:hover {
        background: var(--_bg-hover, var(--_bg));
        filter: var(--_hover-filter, none);
      }

      .trigger:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: 0.125em;
      }

      .trigger:active:not([disabled]) {
        transform: scale(0.97);
      }

      /* ---- Pill ---- */
      :host([pill]) .trigger { border-radius: 9999px; }

      /* ---- Outline ---- */
      :host([outline]) .trigger {
        background: transparent;
        border: 0.1em solid var(--_outline-color, var(--_bg));
        color: var(--_outline-color, var(--_bg));
      }
      :host([outline]) .trigger:hover {
        background: var(--_bg);
        color: var(--_color, inherit);
        filter: none;
      }

      /* ---- Flat (ghost) ---- */
      :host([flat]) .trigger {
        position: relative;
        background: transparent;
        color: var(--_text-btn-color, var(--_bg));
      }
      :host([flat]) .trigger::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: var(--_bg);
        opacity: 0;
        transition: opacity 0.15s ease;
        z-index: 0;
      }
      :host([flat]) .trigger:hover {
        background: transparent;
        filter: none;
      }
      :host([flat]) .trigger:hover::before { opacity: 0.1; }
      :host([flat]) .trigger > * {
        position: relative;
        z-index: 1;
      }

      /* ---- Caret ---- */
      .caret {
        display: inline-block;
        width: 0; height: 0;
        border-left: 0.3em solid transparent;
        border-right: 0.3em solid transparent;
        border-top: 0.35em solid currentColor;
        margin-left: 0.25em;
        transition: transform 0.2s ease;
      }
      :host([aria-expanded="true"]) .caret {
        transform: rotate(180deg);
      }

      /* ---- Menu panel ---- */
      .menu {
        display: none;
        position: absolute;
        z-index: 1000;
        min-width: 100%;
        background: var(--_menu-bg, var(--ui-bg, #fff));
        border: 1px solid var(--ui-border-color, rgba(0, 0, 0, 0.1));
        border-radius: var(--ui-radius, 0.375em);
        box-shadow: var(--_elevation, 0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06));
        padding: 0.25em 0;
        flex-direction: column;
        box-sizing: border-box;
      }
      .menu.open { display: flex; }

      /* Placement */
      .menu.bottom-start { top: calc(100% + 0.25em); left: 0; }
      .menu.bottom-end   { top: calc(100% + 0.25em); right: 0; }
      .menu.top-start    { bottom: calc(100% + 0.25em); left: 0; }
      .menu.top-end      { bottom: calc(100% + 0.25em); right: 0; }

      /* Slotted menu items */
      ::slotted(ui-dropdown-item) { display: block; }
    `
    );
  }
  /* ------------------------------------------------------------------ */
  /*  Lifecycle                                                          */
  /* ------------------------------------------------------------------ */
  constructor() {
    super();
    this._open = false;
    this._onTriggerClick = this._onTriggerClick.bind(this);
    this._onDocumentClick = this._onDocumentClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onItemSelect = this._onItemSelect.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "button");
    this.setAttribute("aria-haspopup", "true");
    this.setAttribute("aria-expanded", "false");
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");
    this.addEventListener("keydown", this._onKeyDown);
    this.addEventListener("ui-click", this._onItemSelect);
    this._assignSlots();
    this._observeSlot();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this._onKeyDown);
    this.removeEventListener("ui-click", this._onItemSelect);
    document.removeEventListener("click", this._onDocumentClick);
    if (this._slotObserver) {
      this._slotObserver.disconnect();
      this._slotObserver = null;
    }
  }
  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */
  render() {
    const placement = this.placement || "bottom-start";
    return `
      <button
        class="trigger"
        ${this.disabled ? 'disabled aria-disabled="true"' : ""}
        part="trigger"
      >
        <slot name="trigger"></slot>
        <span class="caret"></span>
      </button>
      <div class="menu ${placement}" part="menu" role="menu">
        <slot></slot>
      </div>
    `;
  }
  /* ------------------------------------------------------------------ */
  /*  Slot distribution                                                  */
  /*                                                                     */
  /*  Non-item children (text, icons) → slot="trigger"                   */
  /*  <ui-dropdown-item> children     → default slot (menu panel)        */
  /* ------------------------------------------------------------------ */
  _assignSlots() {
    for (const child of [...this.childNodes]) {
      if (child.nodeType === 1) {
        if (child.tagName !== "UI-DROPDOWN-ITEM") {
          child.setAttribute("slot", "trigger");
        }
      } else if (child.nodeType === 3 && child.textContent.trim()) {
        const span = document.createElement("span");
        span.setAttribute("slot", "trigger");
        span.textContent = child.textContent;
        this.replaceChild(span, child);
      }
    }
    this._styleMenuItems();
  }
  _observeSlot() {
    this._slotObserver = new MutationObserver(() => this._assignSlots());
    this._slotObserver.observe(this, { childList: true });
  }
  /** Ensure direct menu items have correct ARIA. */
  _styleMenuItems() {
    for (const item of this.querySelectorAll(":scope > ui-dropdown-item")) {
      if (!item.hasAttribute("role")) item.setAttribute("role", "menuitem");
      if (!item.hasAttribute("tabindex")) item.setAttribute("tabindex", "-1");
    }
  }
  /* ------------------------------------------------------------------ */
  /*  Open / close                                                       */
  /* ------------------------------------------------------------------ */
  open() {
    if (this._open || this.disabled) return;
    this._open = true;
    this.setAttribute("aria-expanded", "true");
    const menu = this.shadowRoot.querySelector(".menu");
    if (menu) menu.classList.add("open");
    requestAnimationFrame(() => {
      document.addEventListener("click", this._onDocumentClick);
    });
    this.emit("ui-open");
  }
  close() {
    if (!this._open) return;
    this._open = false;
    this.setAttribute("aria-expanded", "false");
    const menu = this.shadowRoot.querySelector(".menu");
    if (menu) menu.classList.remove("open");
    for (const sub of this.querySelectorAll("ui-dropdown-item[data-submenu-open]")) {
      sub.closeSubmenu();
    }
    document.removeEventListener("click", this._onDocumentClick);
    this.emit("ui-close");
  }
  toggle() {
    this._open ? this.close() : this.open();
  }
  /* ------------------------------------------------------------------ */
  /*  Styling helpers                                                    */
  /* ------------------------------------------------------------------ */
  _applyStyles() {
    const vars = {
      "--_bg": "",
      "--_bg-hover": "",
      "--_hover-filter": "",
      "--_color": "",
      "--_outline-color": "",
      "--_text-btn-color": "",
      "--_menu-bg": "",
      "--_menu-color": "",
      "--_menu-hover": ""
    };
    const sizeVar = resolveSize(this.size) || "";
    if (sizeVar) vars["font-size"] = sizeVar;
    const bg = resolveColor(this.background);
    if (bg) {
      vars["--_bg"] = bg;
      const hoverBg = resolveColorHover(this.background);
      if (hoverBg) {
        vars["--_bg-hover"] = hoverBg;
      } else {
        vars["--_hover-filter"] = "brightness(0.9)";
      }
    }
    const isAlt = this.outline || this.flat;
    if (isAlt) {
      const fgColor = resolveColor(this.color || this.background);
      vars["--_outline-color"] = fgColor;
      vars["--_text-btn-color"] = fgColor;
      if (this.color) {
        vars["--_color"] = resolveColor(this.color);
      } else if (this.background) {
        vars["--_color"] = contrastColorFor(this.background);
      }
      vars["--_menu-color"] = fgColor;
    } else {
      if (this.color) {
        vars["--_color"] = resolveColor(this.color);
      } else if (this.background) {
        vars["--_color"] = contrastColorFor(this.background);
      }
      if (bg) {
        vars["--_menu-bg"] = bg;
        vars["--_menu-color"] = contrastColorFor(this.background);
        vars["--_menu-hover"] = "rgba(255, 255, 255, 0.15)";
      }
    }
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars["--_elevation"] = shadow;
    this._setDynamicVars(vars);
  }
  _update() {
    this._applyStyles();
    super._update();
    this._attachTriggerListener();
    if (this._open) {
      const menu = this.shadowRoot.querySelector(".menu");
      if (menu) menu.classList.add("open");
    }
  }
  _attachTriggerListener() {
    const trigger = this.shadowRoot.querySelector(".trigger");
    if (trigger) {
      trigger.removeEventListener("click", this._onTriggerClick);
      trigger.addEventListener("click", this._onTriggerClick);
    }
  }
  /* ------------------------------------------------------------------ */
  /*  Event handlers                                                     */
  /* ------------------------------------------------------------------ */
  _onTriggerClick(e) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    this.toggle();
  }
  /**
   * Catch the `ui-click` custom event that bubbles up from any leaf
   * `<ui-dropdown-item>` — at any nesting depth.
   */
  _onItemSelect(e) {
    const item = e.target;
    if (!(item instanceof HTMLElement) || item.tagName !== "UI-DROPDOWN-ITEM") return;
    e.stopPropagation();
    this.emit("ui-select", { item, value: item.value || "" });
    this.close();
  }
  _onDocumentClick(e) {
    if (!this.contains(e.target)) this.close();
  }
  _onKeyDown(e) {
    const items = [...this.querySelectorAll(":scope > ui-dropdown-item:not([disabled])")];
    if (!items.length) return;
    switch (e.key) {
      case "Enter":
      case " ":
        if (e.target === this) {
          e.preventDefault();
          this.toggle();
        }
        break;
      case "Escape":
        if (this._open) {
          e.preventDefault();
          this.close();
          this.focus();
        }
        break;
      case "ArrowDown": {
        e.preventDefault();
        if (!this._open) this.open();
        const idx = items.indexOf(e.target);
        const next = items[(idx + 1) % items.length];
        next.focus();
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (!this._open) this.open();
        const idx = items.indexOf(e.target);
        const prev = items[(idx - 1 + items.length) % items.length];
        prev.focus();
        break;
      }
      case "Home":
        if (this._open) {
          e.preventDefault();
          items[0].focus();
        }
        break;
      case "End":
        if (this._open) {
          e.preventDefault();
          items[items.length - 1].focus();
        }
        break;
    }
  }
};
customElements.define("ui-dropdown", UIDropdown);

// src/components/dropdown/item.js
var UIDropdownItem = class extends UIComponent {
  static properties = {
    value: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    href: { type: String, default: "", reflect: true },
    target: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        position: relative;
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.45;
      }

      /* ---- Clickable row ---- */
      .item {
        all: unset;
        display: flex;
        align-items: center;
        gap: 0.5em;
        width: 100%;
        box-sizing: border-box;
        padding: 0.45em 0.75em;
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
        line-height: 1.4;
        color: var(--_menu-color, var(--ui-text-color, inherit));
        text-decoration: none;
        transition: background-color 0.12s ease;
      }

      .item:hover,
      :host([data-submenu-open]) .item {
        background: var(--_menu-hover, var(--ui-bg-subtle, rgba(0, 0, 0, 0.06)));
      }

      .item:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: -0.125em;
      }

      /* ---- Submenu caret (hidden unless host has sub-items) ---- */
      .caret {
        margin-left: auto;
        font-size: 0.7em;
        opacity: 0.5;
        display: none;
        flex-shrink: 0;
      }

      :host([data-has-submenu]) .caret {
        display: inline;
      }

      /* ---- Submenu flyout panel ---- */
      .submenu {
        display: none;
        position: absolute;
        left: 100%;
        top: 0;
        z-index: 1000;
        min-width: 10em;
        background: var(--_menu-bg, var(--ui-bg, #fff));
        border: 1px solid var(--ui-border-color, rgba(0, 0, 0, 0.1));
        border-radius: var(--ui-radius, 0.375em);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        padding: 0.25em 0;
        flex-direction: column;
        box-sizing: border-box;
      }

      :host([data-submenu-open]) .submenu {
        display: flex;
      }
    `
    );
  }
  /* ------------------------------------------------------------------ */
  /*  Lifecycle                                                          */
  /* ------------------------------------------------------------------ */
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._closeTimer = null;
    this._childObserver = null;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "menuitem");
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "-1");
    this.addEventListener("click", this._onClick);
    this.addEventListener("mouseenter", this._onMouseEnter);
    this.addEventListener("mouseleave", this._onMouseLeave);
    this.addEventListener("keydown", this._onKeyDown);
    this._assignSlots();
    this._observeChildren();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._onClick);
    this.removeEventListener("mouseenter", this._onMouseEnter);
    this.removeEventListener("mouseleave", this._onMouseLeave);
    this.removeEventListener("keydown", this._onKeyDown);
    clearTimeout(this._closeTimer);
    if (this._childObserver) {
      this._childObserver.disconnect();
      this._childObserver = null;
    }
  }
  /* ------------------------------------------------------------------ */
  /*  Render — completely static, no dependency on child state           */
  /* ------------------------------------------------------------------ */
  render() {
    const isLink = this.href;
    const tag = isLink ? "a" : "div";
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
    const linkAttrs = isLink ? ` href="${esc(this.href)}"${this.target ? ` target="${esc(this.target)}"` : ""}` : "";
    return `
      <${tag} class="item"${linkAttrs}${this.disabled ? ' aria-disabled="true"' : ""} part="item">
        <slot></slot>
        <span class="caret" aria-hidden="true">\u25B8</span>
      </${tag}>
      <div class="submenu" role="menu" part="submenu">
        <slot name="submenu"></slot>
      </div>
    `;
  }
  /* ------------------------------------------------------------------ */
  /*  Slot distribution                                                  */
  /*                                                                     */
  /*  Child <ui-dropdown-item> elements  →  slot="submenu"               */
  /*  Everything else (text, icons, …)   →  default slot (label)         */
  /*                                                                     */
  /*  This mirrors how <ui-dropdown> separates trigger content from       */
  /*  menu items.  Neither _assignSlots nor the MutationObserver ever     */
  /*  calls _update(), so there are no render loops.                      */
  /* ------------------------------------------------------------------ */
  _assignSlots() {
    let hasSub = false;
    for (const child of this.children) {
      if (child.tagName === "UI-DROPDOWN-ITEM") {
        if (child.getAttribute("slot") !== "submenu") {
          child.setAttribute("slot", "submenu");
        }
        if (!child.hasAttribute("role")) child.setAttribute("role", "menuitem");
        if (!child.hasAttribute("tabindex")) child.setAttribute("tabindex", "-1");
        hasSub = true;
      }
    }
    if (hasSub) {
      if (!this.hasAttribute("data-has-submenu")) {
        this.setAttribute("data-has-submenu", "");
        this.setAttribute("aria-haspopup", "true");
      }
    } else {
      this.removeAttribute("data-has-submenu");
      this.removeAttribute("aria-haspopup");
    }
  }
  /** React to children being added/removed (handles parser timing). */
  _observeChildren() {
    this._childObserver = new MutationObserver(() => this._assignSlots());
    this._childObserver.observe(this, { childList: true });
  }
  /* ------------------------------------------------------------------ */
  /*  Submenu open / close                                               */
  /* ------------------------------------------------------------------ */
  get _hasSubmenu() {
    return this.hasAttribute("data-has-submenu");
  }
  openSubmenu() {
    clearTimeout(this._closeTimer);
    this.setAttribute("data-submenu-open", "");
    this.setAttribute("aria-expanded", "true");
  }
  closeSubmenu() {
    clearTimeout(this._closeTimer);
    this.removeAttribute("data-submenu-open");
    this.removeAttribute("aria-expanded");
    for (const sub of this.querySelectorAll("ui-dropdown-item[data-submenu-open]")) {
      sub.closeSubmenu();
    }
  }
  toggleSubmenu() {
    this.hasAttribute("data-submenu-open") ? this.closeSubmenu() : this.openSubmenu();
  }
  /* ------------------------------------------------------------------ */
  /*  Event handlers                                                     */
  /* ------------------------------------------------------------------ */
  _onClick(e) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    const origin = e.target.closest("ui-dropdown-item");
    if (origin && origin !== this) return;
    if (this._hasSubmenu) {
      this.toggleSubmenu();
    } else {
      this.emit("ui-click");
    }
  }
  _onMouseEnter() {
    if (!this._hasSubmenu || this.disabled) return;
    clearTimeout(this._closeTimer);
    this.openSubmenu();
  }
  _onMouseLeave() {
    if (!this._hasSubmenu) return;
    this._closeTimer = setTimeout(() => this.closeSubmenu(), 150);
  }
  _onKeyDown(e) {
    if (!this._hasSubmenu) return;
    const subs = [...this.querySelectorAll(":scope > ui-dropdown-item:not([disabled])")];
    if (!subs.length) return;
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        e.stopPropagation();
        this.openSubmenu();
        subs[0]?.focus();
        break;
      case "ArrowLeft":
        if (subs.includes(e.target)) {
          e.preventDefault();
          e.stopPropagation();
          this.closeSubmenu();
          this.focus();
        }
        break;
      case "ArrowDown":
        if (subs.includes(e.target)) {
          e.preventDefault();
          e.stopPropagation();
          const idx = subs.indexOf(e.target);
          const next = subs[(idx + 1) % subs.length];
          next.focus();
        }
        break;
      case "ArrowUp":
        if (subs.includes(e.target)) {
          e.preventDefault();
          e.stopPropagation();
          const idx = subs.indexOf(e.target);
          const prev = subs[(idx - 1 + subs.length) % subs.length];
          prev.focus();
        }
        break;
      case "Escape":
        if (this.hasAttribute("data-submenu-open")) {
          e.preventDefault();
          e.stopPropagation();
          this.closeSubmenu();
          this.focus();
        }
        break;
    }
  }
};
customElements.define("ui-dropdown-item", UIDropdownItem);

// src/components/icon/icon.js
var UIIcon = class _UIIcon extends UIComponent {
  /* ================================================================== */
  /*  Static — icon-set registry & SVG cache                            */
  /* ================================================================== */
  /**
   * In-memory cache of fetched SVG markup.
   * Key = "setName/iconName", value = SVG string.
   * @type {Map<string, string>}
   */
  static _cache = /* @__PURE__ */ new Map();
  /**
   * In-flight fetch promises — deduplicates concurrent requests.
   * @type {Map<string, Promise<string>>}
   */
  static _pending = /* @__PURE__ */ new Map();
  /**
   * Registered icon sets.
   * Key = set name, value = { basePath, config }.
   * @type {Map<string, { basePath: string, config: Object }>}
   */
  static _sets = /* @__PURE__ */ new Map();
  /** Name of the global default icon set. */
  static _defaultSet = "lucide";
  /**
   * Auto-detected base URL for this module (directory containing icon.js).
   * Used to resolve the built-in set paths relative to the component.
   * @type {string}
   */
  static _moduleBase = (() => {
    try {
      return new URL(".", import.meta.url).href;
    } catch {
      return "";
    }
  })();
  /**
   * Register (or overwrite) an icon set.
   *
   * @param {string}  name               — Unique identifier (e.g. "lucide").
   * @param {Object}  [options={}]
   * @param {string}  [options.basePath]  — Base URL where `<name>.svg` files live.
   *                                        Trailing slash added automatically.
   */
  static registerSet(name, { basePath } = {}) {
    if (basePath && !basePath.endsWith("/")) basePath += "/";
    this._sets.set(name, { basePath: basePath ?? "" });
  }
  /**
   * Change the global default icon set.
   * @param {string} name
   */
  static useSet(name) {
    if (!this._sets.has(name)) {
      console.warn(`[ui-icon] Unknown set "${name}". Register it first via UIIcon.registerSet().`);
      return;
    }
    this._defaultSet = name;
  }
  /**
   * Manually pre-cache an icon (useful for inline / custom icons).
   *
   * @param {string} name       — Icon name.
   * @param {string} svgContent — Full `<svg …>…</svg>` string or inner content.
   * @param {string} [setName]  — Target set (defaults to the current default).
   */
  static register(name, svgContent, setName) {
    const sn = setName ?? this._defaultSet;
    this._cache.set(`${sn}/${name}`, svgContent);
  }
  /**
   * Fetch an SVG file, cache it, and return the markup.
   * Deduplicates concurrent requests for the same key.
   *
   * @param {string} setName
   * @param {string} iconName
   * @returns {Promise<string>}  SVG markup string.
   */
  static async _fetchIcon(setName, iconName) {
    const key = `${setName}/${iconName}`;
    if (this._cache.has(key)) return this._cache.get(key);
    if (this._pending.has(key)) return this._pending.get(key);
    const entry = this._sets.get(setName);
    if (!entry || !entry.basePath) {
      console.warn(`[ui-icon] No basePath for set "${setName}".`);
      return "";
    }
    const url = `${entry.basePath}${iconName}.svg`;
    const promise = fetch(url).then((r) => {
      if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
      return r.text();
    }).then((svgText) => {
      this._cache.set(key, svgText);
      this._pending.delete(key);
      return svgText;
    }).catch((err) => {
      console.warn(`[ui-icon] Failed to load "${setName}/${iconName}": ${err.message}`);
      this._pending.delete(key);
      return "";
    });
    this._pending.set(key, promise);
    return promise;
  }
  /**
   * Clear the in-memory SVG cache.
   * @param {string} [setName] — Clear only one set; omit to clear all.
   */
  static clearCache(setName) {
    if (setName) {
      for (const key of this._cache.keys()) {
        if (key.startsWith(setName + "/")) this._cache.delete(key);
      }
    } else {
      this._cache.clear();
    }
  }
  /* ================================================================== */
  /*  Instance                                                          */
  /* ================================================================== */
  static properties = {
    src: { type: String, default: "", reflect: true },
    set: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    label: { type: String, default: "", reflect: true },
    spin: { type: Boolean, default: false, reflect: true },
    stroke: { type: Number, default: 0, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        line-height: 0;
        color: var(--_color, currentColor);
        font-size: var(--_size, 1em);
      }

      svg {
        width: 1em;
        height: 1em;
        display: block;
      }

      :host([spin]) svg {
        animation: ui-icon-spin 1s linear infinite;
      }

      @keyframes ui-icon-spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }

      slot {
        display: none !important;
      }
    `
    );
  }
  render() {
    return "<slot></slot>";
  }
  /** The icon name, read from text content. */
  get name() {
    return this.textContent.trim();
  }
  connectedCallback() {
    super.connectedCallback();
    this._onSlotChange = () => this._updateIcon();
    this.shadowRoot.querySelector("slot")?.addEventListener("slotchange", this._onSlotChange);
    this._updateIcon();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.shadowRoot.querySelector("slot")?.removeEventListener("slotchange", this._onSlotChange);
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._updateIcon();
  }
  /** Fetch (if needed) and display the icon. */
  async _updateIcon() {
    const sr = this.shadowRoot;
    if (!sr) return;
    if (this.src) {
      const url = this.src;
      const cacheKey = `__src__/${url}`;
      if (_UIIcon._cache.has(cacheKey)) {
        this._renderSVG(_UIIcon._cache.get(cacheKey));
        return;
      }
      const svgText2 = await this._fetchSrc(url, cacheKey);
      if (this.src !== url) return;
      this._renderSVG(svgText2);
      return;
    }
    const iconName = this.name;
    if (!iconName) {
      this._clearSVG();
      return;
    }
    const setName = this.set || _UIIcon._defaultSet;
    const key = `${setName}/${iconName}`;
    if (_UIIcon._cache.has(key)) {
      this._renderSVG(_UIIcon._cache.get(key));
      return;
    }
    const svgText = await _UIIcon._fetchIcon(setName, iconName);
    const currentSet = this.set || _UIIcon._defaultSet;
    if (this.name !== iconName || currentSet !== setName) return;
    this._renderSVG(svgText);
  }
  /**
   * Fetch an SVG from an arbitrary URL and cache it.
   * @param {string} url
   * @param {string} cacheKey
   * @returns {Promise<string>}
   */
  async _fetchSrc(url, cacheKey) {
    if (_UIIcon._pending.has(cacheKey)) return _UIIcon._pending.get(cacheKey);
    const promise = fetch(url).then((r) => {
      if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
      return r.text();
    }).then((svgText) => {
      _UIIcon._cache.set(cacheKey, svgText);
      _UIIcon._pending.delete(cacheKey);
      return svgText;
    }).catch((err) => {
      console.warn(`[ui-icon] Failed to load src "${url}": ${err.message}`);
      _UIIcon._pending.delete(cacheKey);
      return "";
    });
    _UIIcon._pending.set(cacheKey, promise);
    return promise;
  }
  /** Remove any existing SVG from the shadow root. */
  _clearSVG() {
    const svg = this.shadowRoot?.querySelector("svg");
    if (svg) svg.remove();
  }
  /**
   * Inject fetched SVG directly into the shadow root and apply overrides.
   */
  _renderSVG(svgText) {
    this._clearSVG();
    if (!svgText) return;
    const sr = this.shadowRoot;
    const temp = document.createElement("template");
    temp.innerHTML = svgText;
    const svg = temp.content.querySelector("svg");
    if (!svg) return;
    if (this.stroke) {
      svg.setAttribute("stroke-width", String(this.stroke));
    }
    if (this.label) {
      svg.setAttribute("role", "img");
      svg.setAttribute("aria-label", this.label);
      svg.removeAttribute("aria-hidden");
    } else {
      svg.setAttribute("aria-hidden", "true");
    }
    sr.appendChild(svg);
    const vars = {};
    if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    } else {
      vars["--_color"] = "currentColor";
    }
    if (this.size) {
      const fontSize = resolveSize(this.size);
      if (fontSize) vars["--_size"] = fontSize;
    }
    this._setDynamicVars(vars);
  }
};
UIIcon.registerSet("lucide", {
  basePath: UIIcon._moduleBase + "sets/lucide/"
});
UIIcon.registerSet("heroicons", {
  basePath: UIIcon._moduleBase + "sets/heroicons/"
});
customElements.define("ui-icon", UIIcon);

// src/components/include/include.js
var _cache = /* @__PURE__ */ new Map();
var UIInclude = class extends UIComponent {
  static properties = {
    src: { type: String, default: "", reflect: true },
    mode: { type: String, default: "replace", reflect: true },
    channel: { type: String, default: "", reflect: true },
    base: { type: String, default: "", reflect: true },
    lazy: { type: Boolean, default: false, reflect: true },
    nocache: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
      }
    `
    );
  }
  render() {
    return `<slot></slot>`;
  }
  connectedCallback() {
    super.connectedCallback();
    this._observer = null;
    this._loaded = false;
    this._channelHandler = null;
    this._setupChannel();
    this._startLoad();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._teardownObserver();
    this._teardownChannel();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === "src" && this._initialised && oldVal !== newVal) {
      this._loaded = false;
      this._startLoad();
    }
    if (name === "channel" && this._initialised) {
      this._teardownChannel();
      this._setupChannel();
    }
  }
  /* ------------------------------------------------------------------ */
  /*  Channel listener                                                   */
  /* ------------------------------------------------------------------ */
  /** Listen on `document` for the named channel event. */
  _setupChannel() {
    if (!this.channel) return;
    this._activeChannel = this.channel;
    this._channelHandler = (e) => {
      const src = e.detail?.src;
      if (!src) return;
      this.setAttribute("src", this.base ? this.base + src : src);
    };
    document.addEventListener(this._activeChannel, this._channelHandler);
  }
  _teardownChannel() {
    if (this._channelHandler && this._activeChannel) {
      document.removeEventListener(this._activeChannel, this._channelHandler);
      this._channelHandler = null;
      this._activeChannel = null;
    }
  }
  /* ------------------------------------------------------------------ */
  /*  Loading logic                                                      */
  /* ------------------------------------------------------------------ */
  /** Decide whether to load immediately or defer via IntersectionObserver. */
  _startLoad() {
    if (!this.src) return;
    if (this.lazy && typeof IntersectionObserver !== "undefined") {
      this._setupObserver();
    } else {
      this._fetchContent();
    }
  }
  /** Observe visibility — fetch when the element enters the viewport. */
  _setupObserver() {
    this._teardownObserver();
    this._observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this._teardownObserver();
            this._fetchContent();
            break;
          }
        }
      },
      { rootMargin: "200px" }
      // start loading slightly before visible
    );
    this._observer.observe(this);
  }
  _teardownObserver() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }
  /** Fetch the remote HTML and inject it. */
  async _fetchContent() {
    const src = this.src;
    if (!src) return;
    this._setContainerClass("loading");
    try {
      let promise;
      if (!this.nocache && _cache.has(src)) {
        promise = _cache.get(src);
      } else {
        promise = fetch(src).then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
          return res.text();
        });
        if (!this.nocache) _cache.set(src, promise);
      }
      const html = await promise;
      if (this.src !== src) return;
      this._inject(html);
      this._loaded = true;
      this._setContainerClass("loaded");
      this.emit("ui-load", { src, html });
    } catch (err) {
      _cache.delete(src);
      this._setContainerClass("error");
      this.emit("ui-error", { src, error: err });
    }
  }
  /** Inject fetched HTML into the light DOM. */
  _inject(html) {
    const frag = document.createRange().createContextualFragment(html);
    switch (this.mode) {
      case "append":
        this.appendChild(frag);
        break;
      case "prepend":
        this.prepend(frag);
        break;
      case "replace":
      default:
        this.innerHTML = "";
        this.appendChild(frag);
        break;
    }
  }
  /** Update host CSS classes to reflect loading state (`loading`, `loaded`, `error`). */
  _setContainerClass(state) {
    this.classList.remove("loading", "loaded", "error");
    if (state) this.classList.add(state);
  }
  /* ------------------------------------------------------------------ */
  /*  Public API                                                         */
  /* ------------------------------------------------------------------ */
  /** Programmatically reload the content (bypasses cache). */
  reload() {
    _cache.delete(this.src);
    this._loaded = false;
    this._fetchContent();
  }
  /** Clear the internal fetch cache (all entries). */
  static clearCache() {
    _cache.clear();
  }
};
customElements.define("ui-include", UIInclude);

// src/components/input/input.js
var UIInput = class extends UIComponent {
  static properties = {
    type: { type: String, default: "text", reflect: true },
    value: { type: String, default: "", reflect: true },
    placeholder: { type: String, default: "", reflect: true },
    name: { type: String, default: "", reflect: true },
    label: { type: String, default: "", reflect: true },
    help: { type: String, default: "", reflect: true },
    error: { type: String, default: "", reflect: true },
    prefix: { type: String, default: "", reflect: true },
    suffix: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    readonly: { type: Boolean, default: false, reflect: true },
    required: { type: Boolean, default: false, reflect: true },
    clearable: { type: Boolean, default: false, reflect: true },
    toggleable: { type: Boolean, default: false, reflect: true },
    pattern: { type: String, default: "", reflect: true },
    minlength: { type: Number, default: 0, reflect: true },
    maxlength: { type: Number, default: 0, reflect: true },
    min: { type: Number, default: 0, reflect: true },
    max: { type: Number, default: 0, reflect: true },
    step: { type: Number, default: 0, reflect: true },
    autocomplete: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        line-height: 1.5;
      }

      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }

      /* \u2500\u2500 Label \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .label {
        display: none;
        font-size: 0.875em;
        font-weight: 600;
        color: var(--ui-text-color, #374151);
        margin-bottom: 0.3em;
      }
      :host([label]) .label { display: block; }

      .label .required-mark {
        color: var(--ui-red-500, #ef4444);
        margin-left: 0.15em;
      }

      /* \u2500\u2500 Input wrapper \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .wrapper {
        display: flex;
        align-items: center;
        gap: 0.4em;
        width: 100%;
        box-sizing: border-box;
        padding: 0.5em 0.65em;
        border: 1px solid var(--_border, var(--ui-border-color, #d1d5db));
        border-radius: var(--ui-radius, 0.375em);
        background: var(--_bg, var(--ui-bg, #fff));
        color: var(--_color, var(--ui-text-color, #111827));
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
        cursor: text;
      }

      .wrapper:hover {
        border-color: var(--_border-hover, #9ca3af);
      }

      .wrapper.focused {
        border-color: var(--_focus-border, var(--ui-focus-ring, #6366f1));
        box-shadow: 0 0 0 0.15em var(--_focus-ring, rgba(99, 102, 241, 0.25));
      }

      /* Error state */
      :host([error]) .wrapper {
        border-color: var(--ui-red-500, #ef4444);
      }
      :host([error]) .wrapper.focused {
        border-color: var(--ui-red-500, #ef4444);
        box-shadow: 0 0 0 0.15em rgba(239, 68, 68, 0.25);
      }

      /* \u2500\u2500 Native input \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .input {
        all: unset;
        flex: 1;
        min-width: 0;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        line-height: 1.5;
      }

      .input::placeholder {
        color: var(--ui-text-muted, #9ca3af);
      }

      /* Hide native spin buttons on number inputs */
      .input[type="number"]::-webkit-inner-spin-button,
      .input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      .input[type="number"] { -moz-appearance: textfield; }

      /* Hide native search cancel */
      .input[type="search"]::-webkit-search-cancel-button {
        -webkit-appearance: none;
      }

      /* \u2500\u2500 Prefix / Suffix \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .prefix, .suffix {
        flex-shrink: 0;
        color: var(--ui-text-muted, #9ca3af);
        font-size: 0.9em;
        line-height: 1;
        display: none;
        user-select: none;
      }
      :host([prefix]) .prefix { display: flex; align-items: center; }
      :host([suffix]) .suffix { display: flex; align-items: center; }

      /* \u2500\u2500 Action buttons (clear, toggle) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .action-btn {
        all: unset;
        display: none;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 1.25em;
        height: 1.25em;
        cursor: pointer;
        color: var(--ui-text-muted, #9ca3af);
        border-radius: 50%;
        transition: color 0.15s ease, background-color 0.15s ease;
      }
      .action-btn:hover {
        color: var(--ui-text-color, #374151);
        background: var(--ui-bg-subtle, rgba(0, 0, 0, 0.06));
      }
      .action-btn svg {
        width: 0.85em;
        height: 0.85em;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      :host([clearable]) .clear-btn.has-value { display: inline-flex; }
      :host([toggleable]) .toggle-btn         { display: inline-flex; }

      /* \u2500\u2500 Help / Error text \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .help, .error-msg {
        display: none;
        font-size: 0.8em;
        margin-top: 0.3em;
      }
      .help {
        color: var(--ui-text-muted, #6b7280);
      }
      .error-msg {
        color: var(--ui-red-500, #ef4444);
      }
      :host([help]) .help       { display: block; }
      :host([error]) .error-msg { display: block; }
      :host([error]) .help      { display: none;  }

      /* \u2500\u2500 Slotted content \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      ::slotted(*) {
        flex-shrink: 0;
      }
    `
    );
  }
  /* ------------------------------------------------------------------ */
  /*  Lifecycle                                                          */
  /* ------------------------------------------------------------------ */
  constructor() {
    super();
    this._passwordVisible = false;
    this._onInput = this._onInput.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onClear = this._onClear.bind(this);
    this._onToggle = this._onToggle.bind(this);
    this._onWrapperClick = this._onWrapperClick.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this._attachListeners();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */
  render() {
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    const inputType = this.type === "password" && this._passwordVisible ? "text" : this.type;
    const attrs = [];
    attrs.push(`type="${esc(inputType)}"`);
    attrs.push('class="input"');
    attrs.push('part="input"');
    if (this.value) attrs.push(`value="${esc(this.value)}"`);
    if (this.placeholder) attrs.push(`placeholder="${esc(this.placeholder)}"`);
    if (this.name) attrs.push(`name="${esc(this.name)}"`);
    if (this.disabled) attrs.push("disabled");
    if (this.readonly) attrs.push("readonly");
    if (this.required) attrs.push("required");
    if (this.pattern) attrs.push(`pattern="${esc(this.pattern)}"`);
    if (this.minlength) attrs.push(`minlength="${this.minlength}"`);
    if (this.maxlength) attrs.push(`maxlength="${this.maxlength}"`);
    if (this.min) attrs.push(`min="${this.min}"`);
    if (this.max) attrs.push(`max="${this.max}"`);
    if (this.step) attrs.push(`step="${this.step}"`);
    if (this.autocomplete) attrs.push(`autocomplete="${esc(this.autocomplete)}"`);
    if (this.error) attrs.push('aria-invalid="true"');
    if (this.label) attrs.push(`aria-label="${esc(this.label)}"`);
    const hasValue = this.value.length > 0;
    const clearIcon = '<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    const eyeIcon = '<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
    const eyeOffIcon = '<svg viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
    return `
      <label class="label" part="label">
        ${esc(this.label)}<span class="required-mark" aria-hidden="true">${this.required ? " *" : ""}</span>
      </label>
      <div class="wrapper" part="wrapper">
        <span class="prefix" part="prefix">${esc(this.prefix)}</span>
        <slot></slot>
        <input ${attrs.join(" ")} />
        <button type="button" class="clear-btn action-btn${hasValue ? " has-value" : ""}" aria-label="Clear" tabindex="-1">
          ${clearIcon}
        </button>
        <button type="button" class="toggle-btn action-btn" aria-label="${this._passwordVisible ? "Hide password" : "Show password"}" tabindex="-1">
          ${this._passwordVisible ? eyeOffIcon : eyeIcon}
        </button>
        <span class="suffix" part="suffix">${esc(this.suffix)}</span>
      </div>
      <div class="help" part="help">${esc(this.help)}</div>
      <div class="error-msg" part="error">${esc(this.error)}</div>
    `;
  }
  /* ------------------------------------------------------------------ */
  /*  Internal wiring                                                    */
  /* ------------------------------------------------------------------ */
  _attachListeners() {
    const input = this.shadowRoot.querySelector(".input");
    const wrapper = this.shadowRoot.querySelector(".wrapper");
    const clearBtn = this.shadowRoot.querySelector(".clear-btn");
    const toggleBtn = this.shadowRoot.querySelector(".toggle-btn");
    if (input) {
      input.addEventListener("input", this._onInput);
      input.addEventListener("change", this._onChange);
      input.addEventListener("focus", this._onFocus);
      input.addEventListener("blur", this._onBlur);
    }
    if (wrapper) {
      wrapper.addEventListener("click", this._onWrapperClick);
    }
    if (clearBtn) {
      clearBtn.addEventListener("click", this._onClear);
    }
    if (toggleBtn) {
      toggleBtn.addEventListener("click", this._onToggle);
    }
  }
  _update() {
    this._applyStyles();
    super._update();
    this._attachListeners();
    this._syncInputValue();
  }
  /** Keep the native input's value in sync (after re-render). */
  _syncInputValue() {
    const input = this.shadowRoot.querySelector(".input");
    if (input && input.value !== this.value) {
      input.value = this.value;
    }
  }
  /** Resolve size + colour props and push dynamic CSS vars in one call. */
  _applyStyles() {
    const vars = {};
    const sz = resolveSize(this.size);
    if (sz) vars["font-size"] = sz;
    if (this.background) {
      const bg = resolveColor(this.background);
      if (bg) vars["--_bg"] = bg;
    }
    if (this.color) {
      const c = resolveColor(this.color);
      if (c) vars["--_color"] = c;
    }
    this._setDynamicVars(vars);
  }
  /* ------------------------------------------------------------------ */
  /*  Event handlers                                                     */
  /* ------------------------------------------------------------------ */
  _onInput(e) {
    this._value = e.target.value;
    const clearBtn = this.shadowRoot.querySelector(".clear-btn");
    if (clearBtn) {
      clearBtn.classList.toggle("has-value", this._value.length > 0);
    }
    this.emit("ui-input", { value: this._value });
  }
  _onChange(e) {
    this.value = e.target.value;
    this.emit("ui-change", { value: this.value });
  }
  _onFocus() {
    const wrapper = this.shadowRoot.querySelector(".wrapper");
    if (wrapper) wrapper.classList.add("focused");
    this.emit("ui-focus");
  }
  _onBlur() {
    const wrapper = this.shadowRoot.querySelector(".wrapper");
    if (wrapper) wrapper.classList.remove("focused");
    this.emit("ui-blur");
  }
  _onClear(e) {
    e.stopPropagation();
    this.value = "";
    const input = this.shadowRoot.querySelector(".input");
    if (input) {
      input.value = "";
      input.focus();
    }
    const clearBtn = this.shadowRoot.querySelector(".clear-btn");
    if (clearBtn) clearBtn.classList.remove("has-value");
    this.emit("ui-clear");
    this.emit("ui-input", { value: "" });
  }
  _onToggle(e) {
    e.stopPropagation();
    this._passwordVisible = !this._passwordVisible;
    const input = this.shadowRoot.querySelector(".input");
    const curVal = input ? input.value : this.value;
    this._update();
    const newInput = this.shadowRoot.querySelector(".input");
    if (newInput) {
      newInput.value = curVal;
      newInput.focus();
    }
  }
  _onWrapperClick() {
    const input = this.shadowRoot.querySelector(".input");
    if (input && !this.disabled && !this.readonly) {
      input.focus();
    }
  }
  /* ------------------------------------------------------------------ */
  /*  Public API                                                         */
  /* ------------------------------------------------------------------ */
  /** Focus the native input. */
  focus() {
    const input = this.shadowRoot?.querySelector(".input");
    if (input) input.focus();
  }
  /** Blur the native input. */
  blur() {
    const input = this.shadowRoot?.querySelector(".input");
    if (input) input.blur();
  }
  /** Select all text in the input. */
  selectAll() {
    const input = this.shadowRoot?.querySelector(".input");
    if (input) input.select();
  }
  /** Clear the input value. */
  clear() {
    this.value = "";
    const input = this.shadowRoot?.querySelector(".input");
    if (input) input.value = "";
    const clearBtn = this.shadowRoot?.querySelector(".clear-btn");
    if (clearBtn) clearBtn.classList.remove("has-value");
    this.emit("ui-clear");
  }
  /** Check native validity. */
  checkValidity() {
    const input = this.shadowRoot?.querySelector(".input");
    return input ? input.checkValidity() : true;
  }
  /** Get the native input's validationMessage. */
  get validationMessage() {
    const input = this.shadowRoot?.querySelector(".input");
    return input ? input.validationMessage : "";
  }
};
customElements.define("ui-input", UIInput);

// src/components/input/code.js
var CM_BASE = "https://cdn.jsdelivr.net/npm/codemirror@5.65.15";
var CM_CSS_URL = `${CM_BASE}/lib/codemirror.css`;
var CM_JS_URL = `${CM_BASE}/lib/codemirror.js`;
var CM_MODE_JS = `${CM_BASE}/mode/javascript/javascript.js`;
var CM_MODE_CSS = `${CM_BASE}/mode/css/css.js`;
var CM_MODE_XML = `${CM_BASE}/mode/xml/xml.js`;
var CM_MODE_HTML = `${CM_BASE}/mode/htmlmixed/htmlmixed.js`;
var CM_ADDON_PLACEHOLDER = `${CM_BASE}/addon/display/placeholder.js`;
var UIInputCode = class _UIInputCode extends UIComponent {
  static properties = {
    value: { type: String, default: "", reflect: false },
    language: { type: String, default: "json", reflect: true },
    height: { type: String, default: "12em", reflect: true },
    size: { type: String, default: "", reflect: true },
    dark: { type: Boolean, default: true, reflect: true },
    label: { type: String, default: "", reflect: true },
    placeholder: { type: String, default: "", reflect: true },
    lineNumbers: { type: Boolean, default: true, reflect: true, attribute: "line-numbers" },
    wrap: { type: Boolean, default: false, reflect: true },
    readonly: { type: Boolean, default: false, reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    tabSize: { type: Number, default: 2, reflect: true, attribute: "tab-size" }
  };
  /** Shared CodeMirror JS bootstrap promise (once per page). */
  static _cmPromise = null;
  /** Cached CodeMirror CSS text (fetched once, reused across instances). */
  static _cmCssText = null;
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        line-height: 1.5;
      }
      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }

      /* \u2500\u2500 Label \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .label {
        display: none;
        font-size: 0.875em;
        font-weight: 600;
        color: var(--ui-text-color, #374151);
        margin-bottom: 0.3em;
      }
      :host([label]) .label { display: block; }

      .frame {
        position: relative;
        height: var(--_height, 12em);
        width: 100%;
        box-sizing: border-box;
        border: 1px solid var(--_border, var(--ui-border-color, #d1d5db));
        border-radius: var(--ui-radius, 0.375em);
        overflow: hidden;
        background: var(--_bg, var(--ui-bg, #fff));
        color: var(--_color, var(--ui-text-color, #111827));
      }
      :host([height="auto"]) .frame {
        height: auto;
      }
      :host(:focus-within) .frame {
        border-color: var(--ui-indigo-500, #6366f1);
        box-shadow: var(--ui-focus-ring, 0 0 0 3px rgba(99,102,241,.25));
      }

      /* \u2500\u2500 Dark theme \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      :host([dark]) .frame {
        --_bg: #1e1e2e;
        --_color: #cdd6f4;
        --_border: #45475a;
      }
      :host([dark]) .label {
        color: #cdd6f4;
      }
      :host([dark]) .loading {
        background: #1e1e2e;
        color: #6c7086;
      }
      :host([dark]) .error {
        background: #1e1e2e;
      }
      :host([dark]) .CodeMirror-gutters {
        border-right-color: #45475a;
      }
      :host([dark]) .CodeMirror pre.CodeMirror-placeholder {
        color: #6c7086;
      }
      /* Syntax tokens \u2014 dark */
      :host([dark]) .cm-s-default .cm-keyword   { color: #cba6f7; }
      :host([dark]) .cm-s-default .cm-atom      { color: #fab387; }
      :host([dark]) .cm-s-default .cm-number    { color: #fab387; }
      :host([dark]) .cm-s-default .cm-def       { color: #89b4fa; }
      :host([dark]) .cm-s-default .cm-variable  { color: #cdd6f4; }
      :host([dark]) .cm-s-default .cm-variable-2 { color: #89dceb; }
      :host([dark]) .cm-s-default .cm-variable-3 { color: #a6e3a1; }
      :host([dark]) .cm-s-default .cm-type      { color: #a6e3a1; }
      :host([dark]) .cm-s-default .cm-property  { color: #89b4fa; }
      :host([dark]) .cm-s-default .cm-operator  { color: #89dceb; }
      :host([dark]) .cm-s-default .cm-string    { color: #a6e3a1; }
      :host([dark]) .cm-s-default .cm-string-2  { color: #f9e2af; }
      :host([dark]) .cm-s-default .cm-comment   { color: #6c7086; font-style: italic; }
      :host([dark]) .cm-s-default .cm-tag       { color: #f38ba8; }
      :host([dark]) .cm-s-default .cm-attribute { color: #f9e2af; }
      :host([dark]) .cm-s-default .cm-bracket   { color: #9399b2; }
      :host([dark]) .cm-s-default .cm-meta      { color: #f9e2af; }
      :host([dark]) .cm-s-default .cm-qualifier { color: #89dceb; }
      :host([dark]) .cm-s-default .cm-builtin   { color: #f38ba8; }
      :host([dark]) .cm-s-default .cm-link      { color: #89b4fa; text-decoration: underline; }
      :host([dark]) .CodeMirror-cursor {
        border-left-color: #cdd6f4;
      }
      :host([dark]) .CodeMirror-selected,
      :host([dark]) .CodeMirror-focused .CodeMirror-selected {
        background: rgba(137,180,250,0.2);
      }
      :host([dark]) .CodeMirror-activeline-background {
        background: rgba(205,214,244,0.06);
      }
      :host([dark]) .CodeMirror-linenumber {
        color: #585b70;
      }
      :host([dark]) .CodeMirror-matchingbracket {
        color: #a6e3a1 !important;
        outline: 1px solid rgba(166,227,161,0.3);
      }

      .textarea {
        width: 100%;
        height: 100%;
        border: 0;
        margin: 0;
        padding: 0.75em;
        font-family: var(--ui-font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
        font-size: 0.9em;
        line-height: 1.5;
        color: inherit;
        background: transparent;
        resize: none;
        box-sizing: border-box;
        outline: none;
        white-space: pre;
        overflow: auto;
      }

      /* CodeMirror overrides (supplement the injected codemirror.css) */
      .CodeMirror {
        height: 100%;
        font-family: var(--ui-font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
        font-size: inherit;
        color: inherit;
        background: transparent;
        border-radius: inherit;
      }
      :host([height="auto"]) .CodeMirror {
        height: auto;
      }
      .CodeMirror-gutters {
        background: inherit;
        border-right-color: var(--ui-border-color, #d1d5db);
      }
      .CodeMirror pre.CodeMirror-placeholder {
        color: var(--ui-text-muted, #9ca3af);
      }

      .loading,
      .error {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: inherit;
        font-size: 0.85em;
        color: var(--ui-text-muted, #6b7280);
        background: var(--ui-bg, #fff);
        pointer-events: none;
      }
      .error { color: var(--ui-red-500, #ef4444); }
      .hidden { display: none; }
    `
    );
  }
  constructor() {
    super();
    this._editor = null;
    this._initSeq = 0;
    this._textContentValue = null;
  }
  connectedCallback() {
    if (!this._value && this.textContent.trim()) {
      this._textContentValue = this.textContent;
      const lines = this._textContentValue.split("\n");
      while (lines.length && !lines[0].trim()) lines.shift();
      while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
      const minIndent = lines.reduce((min, l) => {
        if (!l.trim()) return min;
        const m = l.match(/^(\s*)/);
        return Math.min(min, m ? m[1].length : 0);
      }, Infinity);
      if (minIndent > 0 && minIndent < Infinity) {
        this._textContentValue = lines.map((l) => l.slice(minIndent)).join("\n");
      } else {
        this._textContentValue = lines.join("\n");
      }
      this._value = this._textContentValue;
      this.textContent = "";
    }
    super.connectedCallback();
  }
  disconnectedCallback() {
    this._initSeq++;
    this._destroyEditor();
    super.disconnectedCallback();
  }
  /* -------------------------------------------------------------- */
  /*  Reactive updates                                               */
  /* -------------------------------------------------------------- */
  /**
   * When the CodeMirror editor is alive, push property changes into it
   * incrementally — no full re-render needed.  Otherwise fall through to
   * the standard render → bootstrap path.
   */
  _update() {
    if (this._editor) {
      this._sync();
      return;
    }
    super._update();
    this._applyDynamicVars();
    this._bootstrap();
  }
  /** Push current property values into the live CodeMirror instance. */
  _sync() {
    const ed = this._editor;
    if (ed.getValue() !== (this._value || "")) {
      ed.setValue(this._value || "");
    }
    ed.setOption("mode", this._resolveMode());
    ed.setOption("lineNumbers", Boolean(this._lineNumbers));
    ed.setOption("lineWrapping", Boolean(this._wrap));
    ed.setOption("readOnly", Boolean(this._readonly));
    const ts = this._tabSize || 2;
    ed.setOption("tabSize", ts);
    ed.setOption("indentUnit", ts);
    ed.setOption("placeholder", this._placeholder || "");
    this._applyDynamicVars();
    const isAutoHeight = this._height === "auto";
    if (!isAutoHeight) {
      ed.setSize("100%", this._height || "12em");
    }
    ed.refresh();
  }
  /** Build all dynamic CSS vars from current property values. */
  _applyDynamicVars() {
    const vars = {};
    if (this._height) vars["--_height"] = this._height;
    const sz = resolveSize(this._size);
    if (sz) vars["font-size"] = sz;
    this._setDynamicVars(vars);
  }
  /* -------------------------------------------------------------- */
  /*  Editor lifecycle                                               */
  /* -------------------------------------------------------------- */
  async _bootstrap() {
    const seq = ++this._initSeq;
    const textarea = this.shadowRoot?.querySelector(".textarea");
    if (!textarea) return;
    this._setStatus("loading");
    try {
      const [CM] = await Promise.all([
        _UIInputCode._loadCodeMirror(),
        this._injectCmCss()
      ]);
      if (seq !== this._initSeq) return;
      const ts = this._tabSize || 2;
      this._editor = CM.fromTextArea(textarea, {
        lineNumbers: Boolean(this._lineNumbers),
        mode: this._resolveMode(),
        tabSize: ts,
        indentUnit: ts,
        indentWithTabs: false,
        lineWrapping: Boolean(this._wrap),
        readOnly: Boolean(this._readonly),
        placeholder: this._placeholder || "",
        viewportMargin: Infinity
      });
      this._editor.setValue(this._value || "");
      const isAutoHeight = this._height === "auto";
      if (!isAutoHeight) {
        this._editor.setSize("100%", this._height || "12em");
      }
      this._editor.on("change", () => {
        const val = this._editor.getValue();
        if (val === this._value) return;
        this._value = val;
        this.emit("ui-input", { value: val });
      });
      this._editor.on("blur", () => {
        this._value = this._editor.getValue();
        this.emit("ui-change", { value: this._value });
        this.emit("ui-blur");
      });
      this._editor.on("focus", () => this.emit("ui-focus"));
      this._setStatus("ready");
    } catch (err) {
      if (seq !== this._initSeq) return;
      this._setStatus("error");
      console.warn("[ui-input-code] CodeMirror failed to load", err);
    }
  }
  _destroyEditor() {
    if (this._editor) {
      this._editor.toTextArea();
      this._editor = null;
    }
  }
  /* -------------------------------------------------------------- */
  /*  CodeMirror CSS → shadow DOM                                    */
  /* -------------------------------------------------------------- */
  /**
   * Fetch the CodeMirror CSS once (cached globally) and inject it as a
   * `<style>` inside this shadow root.  This is required because the
   * CodeMirror DOM lives inside the shadow DOM and cannot see styles
   * in `document.head`.
   */
  async _injectCmCss() {
    if (this.shadowRoot.getElementById("__cm-css")) return;
    if (!_UIInputCode._cmCssText) {
      const res = await fetch(CM_CSS_URL);
      if (!res.ok) throw new Error(`CodeMirror CSS fetch failed: ${res.status}`);
      _UIInputCode._cmCssText = await res.text();
    }
    const style = document.createElement("style");
    style.id = "__cm-css";
    style.textContent = _UIInputCode._cmCssText;
    this.shadowRoot.prepend(style);
  }
  /* -------------------------------------------------------------- */
  /*  Status overlay                                                 */
  /* -------------------------------------------------------------- */
  _setStatus(state) {
    const loading = this.shadowRoot?.querySelector(".loading");
    const error = this.shadowRoot?.querySelector(".error");
    if (!loading || !error) return;
    loading.classList.toggle("hidden", state !== "loading");
    error.classList.toggle("hidden", state !== "error");
  }
  /* -------------------------------------------------------------- */
  /*  Language → CodeMirror mode                                     */
  /* -------------------------------------------------------------- */
  _resolveMode() {
    const lang = (this._language || "json").trim().toLowerCase();
    if (lang === "json") return { name: "javascript", json: true };
    if (lang === "js" || lang === "javascript") return "javascript";
    if (lang === "css") return "css";
    if (lang === "html" || lang === "htmlmixed") return "htmlmixed";
    if (lang === "xml") return "xml";
    return lang;
  }
  /* -------------------------------------------------------------- */
  /*  Static loader — loads CodeMirror JS once per page              */
  /* -------------------------------------------------------------- */
  static _loadCodeMirror() {
    if (window.CodeMirror) return Promise.resolve(window.CodeMirror);
    if (_UIInputCode._cmPromise) return _UIInputCode._cmPromise;
    _UIInputCode._cmPromise = (async () => {
      const loadScript = (src) => new Promise((res, rej) => {
        const existing = document.querySelector(`script[data-ui-cm="${src}"]`);
        if (existing) {
          if (existing.dataset.loaded === "true") return res();
          existing.addEventListener("load", res);
          existing.addEventListener("error", rej);
          return;
        }
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.dataset.uiCm = src;
        s.addEventListener("load", () => {
          s.dataset.loaded = "true";
          res();
        });
        s.addEventListener("error", rej);
        document.head.appendChild(s);
      });
      try {
        await loadScript(CM_JS_URL);
        await Promise.all([
          loadScript(CM_MODE_JS),
          loadScript(CM_MODE_CSS),
          loadScript(CM_MODE_XML),
          loadScript(CM_ADDON_PLACEHOLDER)
        ]);
        await loadScript(CM_MODE_HTML);
        return window.CodeMirror;
      } catch (err) {
        _UIInputCode._cmPromise = null;
        throw err;
      }
    })();
    return _UIInputCode._cmPromise;
  }
  /* -------------------------------------------------------------- */
  /*  Render                                                         */
  /* -------------------------------------------------------------- */
  render() {
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    const labelHtml = this._label ? `<div class="label" part="label">${esc(this._label)}</div>` : '<div class="label" part="label"></div>';
    const ph = this._placeholder ? ` placeholder="${esc(this._placeholder)}"` : "";
    const ro = this._readonly ? " readonly" : "";
    return `
      ${labelHtml}
      <div class="frame" part="frame">
        <textarea class="textarea" part="textarea"${ph}${ro}>${esc(this._value || "")}</textarea>
        <div class="loading" part="loading">Loading editor\u2026</div>
        <div class="error hidden" part="error">Editor failed to load.</div>
      </div>
    `;
  }
};
customElements.define("ui-input-code", UIInputCode);

// src/components/input/textarea.js
var UIInputTextarea = class extends UIComponent {
  static properties = {
    value: { type: String, default: "", reflect: true },
    placeholder: { type: String, default: "", reflect: true },
    name: { type: String, default: "", reflect: true },
    label: { type: String, default: "", reflect: true },
    help: { type: String, default: "", reflect: true },
    error: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    rows: { type: Number, default: 3, reflect: true },
    minlength: { type: Number, default: 0, reflect: true },
    maxlength: { type: Number, default: 0, reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    readonly: { type: Boolean, default: false, reflect: true },
    required: { type: Boolean, default: false, reflect: true },
    autoresize: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
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
      .label .req { color: var(--ui-red-500, #ef4444); margin-left: 0.15em; }

      .textarea {
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding: 0.5em 0.65em;
        border: 1px solid var(--_border, var(--ui-border-color, #d1d5db));
        border-radius: var(--ui-radius, 0.375em);
        background: var(--_bg, var(--ui-bg, #fff));
        color: var(--_color, var(--ui-text-color, #111827));
        font-family: inherit;
        font-size: inherit;
        line-height: 1.5;
        resize: vertical;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      :host([autoresize]) .textarea { resize: none; overflow: hidden; }
      .textarea:hover { border-color: var(--_border-hover, #9ca3af); }
      .textarea:focus {
        outline: none;
        border-color: var(--_focus-border, var(--ui-focus-ring, #6366f1));
        box-shadow: 0 0 0 0.15em var(--_focus-ring, rgba(99, 102, 241, 0.25));
      }
      .textarea::placeholder { color: var(--ui-text-muted, #9ca3af); }

      :host([error]) .textarea { border-color: var(--ui-red-500, #ef4444); }
      :host([error]) .textarea:focus {
        border-color: var(--ui-red-500, #ef4444);
        box-shadow: 0 0 0 0.15em rgba(239, 68, 68, 0.25);
      }

      .help, .error-msg { display: none; font-size: 0.8em; margin-top: 0.3em; }
      .help { color: var(--ui-text-muted, #6b7280); }
      .error-msg { color: var(--ui-red-500, #ef4444); }
      :host([help]) .help       { display: block; }
      :host([error]) .error-msg { display: block; }
      :host([error]) .help      { display: none; }
    `
    );
  }
  constructor() {
    super();
    this._onInput = this._onInput.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this._attachListeners();
  }
  render() {
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    const attrs = [];
    attrs.push('class="textarea"');
    attrs.push('part="textarea"');
    if (this.placeholder) attrs.push(`placeholder="${esc(this.placeholder)}"`);
    if (this.name) attrs.push(`name="${esc(this.name)}"`);
    if (this.rows) attrs.push(`rows="${this.rows}"`);
    if (this.disabled) attrs.push("disabled");
    if (this.readonly) attrs.push("readonly");
    if (this.required) attrs.push("required");
    if (this.minlength) attrs.push(`minlength="${this.minlength}"`);
    if (this.maxlength) attrs.push(`maxlength="${this.maxlength}"`);
    if (this.error) attrs.push('aria-invalid="true"');
    if (this.label) attrs.push(`aria-label="${esc(this.label)}"`);
    return `
      <label class="label" part="label">
        ${esc(this.label)}<span class="req" aria-hidden="true">${this.required ? " *" : ""}</span>
      </label>
      <textarea ${attrs.join(" ")}>${esc(this.value)}</textarea>
      <div class="help" part="help">${esc(this.help)}</div>
      <div class="error-msg" part="error">${esc(this.error)}</div>
    `;
  }
  _attachListeners() {
    const ta = this.shadowRoot.querySelector(".textarea");
    if (!ta) return;
    ta.addEventListener("input", this._onInput);
    ta.addEventListener("change", this._onChange);
    ta.addEventListener("focus", this._onFocus);
    ta.addEventListener("blur", this._onBlur);
  }
  _update() {
    this._applyStyles();
    super._update();
    this._attachListeners();
    this._syncValue();
  }
  _syncValue() {
    const ta = this.shadowRoot.querySelector(".textarea");
    if (ta && ta.value !== this.value) ta.value = this.value;
  }
  /** Resolve size + colour props and push dynamic CSS vars in one call. */
  _applyStyles() {
    const vars = {};
    const sz = resolveSize(this.size);
    if (sz) vars["font-size"] = sz;
    if (this.background) {
      const bg = resolveColor(this.background);
      if (bg) vars["--_bg"] = bg;
    }
    if (this.color) {
      const c = resolveColor(this.color);
      if (c) vars["--_color"] = c;
    }
    this._setDynamicVars(vars);
  }
  _autoResize() {
    if (!this.autoresize) return;
    const ta = this.shadowRoot.querySelector(".textarea");
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";
  }
  _onInput(e) {
    this.value = e.target.value;
    this._autoResize();
    this.emit("ui-input", { value: this.value });
  }
  _onChange(e) {
    this.value = e.target.value;
    this.emit("ui-change", { value: this.value });
  }
  _onFocus() {
    this.emit("ui-focus");
  }
  _onBlur() {
    this.emit("ui-blur");
  }
  focus() {
    this.shadowRoot?.querySelector(".textarea")?.focus();
  }
  blur() {
    this.shadowRoot?.querySelector(".textarea")?.blur();
  }
  selectAll() {
    this.shadowRoot?.querySelector(".textarea")?.select();
  }
};
customElements.define("ui-input-textarea", UIInputTextarea);

// src/components/input/checkbox.js
var UIInputCheckbox = class extends UIComponent {
  static properties = {
    checked: { type: Boolean, default: false, reflect: true },
    indeterminate: { type: Boolean, default: false, reflect: true },
    value: { type: String, default: "", reflect: true },
    name: { type: String, default: "", reflect: true },
    label: { type: String, default: "", reflect: true },
    help: { type: String, default: "", reflect: true },
    error: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    required: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: inline-block;
        line-height: 1.5;
        cursor: pointer;
      }
      :host([disabled]) { opacity: 0.5; pointer-events: none; }

      .container {
        display: flex;
        align-items: center;
        gap: 0.5em;
        cursor: pointer;
      }

      .box {
        flex-shrink: 0;
        width: 0.95em;
        height: 0.95em;
        border: 0.12em solid var(--ui-border-color, #9ca3af);
        border-radius: 0.2em;
        background: var(--ui-bg, #fff);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.15s ease, border-color 0.15s ease;
        position: relative;
        overflow: hidden;
        line-height: 0;
      }

      :host([checked]) .box,
      :host([indeterminate]) .box {
        background: var(--_accent, var(--ui-indigo-500, #6366f1));
        border-color: var(--_accent, var(--ui-indigo-500, #6366f1));
      }

      .box svg {
        width: 0.62em;
        height: 0.62em;
        fill: none;
        stroke: #fff;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
        opacity: 0;
        display: block;
        position: absolute;
        inset: 0;
        margin: auto;
        pointer-events: none;
      }
      :host([checked]) .box .check       { opacity: 1; }
      :host([indeterminate]) .box .dash   { opacity: 1; }
      :host([indeterminate]) .box .check  { opacity: 0; }

      .container:hover .box {
        border-color: var(--_accent, var(--ui-indigo-500, #6366f1));
      }

      .container:focus-within .box {
        box-shadow: 0 0 0 0.15em var(--_focus-ring, rgba(99, 102, 241, 0.25));
      }

      .hidden-input {
        position: absolute;
        width: 1px; height: 1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;
        padding: 0;
        margin: -1px;
      }

      .text { flex: 1; }
      .label-text {
        color: var(--ui-text-color, #374151);
        font-size: 1em;
      }
      .req { color: var(--ui-red-500, #ef4444); margin-left: 0.15em; }

      .help, .error-msg { display: none; font-size: 0.8em; margin-top: 0.1em; }
      .help { color: var(--ui-text-muted, #6b7280); }
      .error-msg { color: var(--ui-red-500, #ef4444); }
      :host([help]) .help       { display: block; }
      :host([error]) .error-msg { display: block; }
      :host([error]) .help      { display: none; }
      :host([error]) .box { border-color: var(--ui-red-500, #ef4444); }
    `
    );
  }
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "checkbox");
    this.setAttribute("aria-checked", this.checked ? "true" : "false");
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");
    this.addEventListener("click", this._onClick);
    this.addEventListener("keydown", this._onKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._onClick);
    this.removeEventListener("keydown", this._onKeyDown);
  }
  render() {
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    return `
      <label class="container" part="container">
        <span class="box" part="box">
          <svg class="check" viewBox="0 0 24 24"><polyline points="4 12 10 18 20 6"/></svg>
          <svg class="dash" viewBox="0 0 24 24"><line x1="6" y1="12" x2="18" y2="12"/></svg>
        </span>
        <span class="text">
          <span class="label-text">${esc(this.label)}<span class="req">${this.required ? " *" : ""}</span></span>
          <div class="help" part="help">${esc(this.help)}</div>
          <div class="error-msg" part="error">${esc(this.error)}</div>
        </span>
      </label>
    `;
  }
  _update() {
    this._applyStyles();
    super._update();
    this.setAttribute("aria-checked", this.indeterminate ? "mixed" : this.checked ? "true" : "false");
  }
  /** Resolve size + accent colour and push dynamic CSS vars in one call. */
  _applyStyles() {
    const vars = {};
    const sz = resolveSize(this.size);
    if (sz) vars["font-size"] = sz;
    if (this.background) {
      const c = resolveColor(this.background);
      if (c) vars["--_accent"] = c;
    }
    this._setDynamicVars(vars);
  }
  _toggle() {
    if (this.disabled) return;
    this.indeterminate = false;
    this.checked = !this.checked;
    this.setAttribute("aria-checked", this.checked ? "true" : "false");
    this.emit("ui-change", { checked: this.checked, value: this.value });
  }
  _onClick(e) {
    e.preventDefault();
    this._toggle();
  }
  _onKeyDown(e) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      this._toggle();
    }
  }
};
customElements.define("ui-input-checkbox", UIInputCheckbox);

// src/components/input/switch.js
var UIInputSwitch = class extends UIComponent {
  static properties = {
    checked: { type: Boolean, default: false, reflect: true },
    value: { type: String, default: "", reflect: true },
    name: { type: String, default: "", reflect: true },
    label: { type: String, default: "", reflect: true },
    help: { type: String, default: "", reflect: true },
    error: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    required: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: inline-block;
        line-height: 1.5;
        cursor: pointer;
      }
      :host([disabled]) { opacity: 0.5; pointer-events: none; }

      .container {
        display: flex;
        align-items: center;
        gap: 0.6em;
        cursor: pointer;
      }

      .track {
        position: relative;
        flex-shrink: 0;
        width: 2.5em;
        height: 1.4em;
        border-radius: 9999px;
        background: var(--ui-border-color, #d1d5db);
        transition: background-color 0.2s ease;
      }
      :host([checked]) .track {
        background: var(--_accent, var(--ui-indigo-500, #6366f1));
      }

      .thumb {
        position: absolute;
        top: 0.15em;
        left: 0.15em;
        width: 1.1em;
        height: 1.1em;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        transition: transform 0.2s ease;
      }
      :host([checked]) .thumb {
        transform: translateX(1.1em);
      }

      .container:focus-within .track {
        box-shadow: 0 0 0 0.15em var(--_focus-ring, rgba(99, 102, 241, 0.25));
      }

      .label-text {
        color: var(--ui-text-color, #374151);
        font-size: 1em;
      }
      .req { color: var(--ui-red-500, #ef4444); margin-left: 0.15em; }

      .help, .error-msg { display: none; font-size: 0.8em; margin-top: 0.1em; }
      .help { color: var(--ui-text-muted, #6b7280); }
      .error-msg { color: var(--ui-red-500, #ef4444); }
      :host([help]) .help       { display: block; }
      :host([error]) .error-msg { display: block; }
      :host([error]) .help      { display: none; }
    `
    );
  }
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "switch");
    this.setAttribute("aria-checked", this.checked ? "true" : "false");
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");
    this.addEventListener("click", this._onClick);
    this.addEventListener("keydown", this._onKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._onClick);
    this.removeEventListener("keydown", this._onKeyDown);
  }
  render() {
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    return `
      <label class="container" part="container">
        <span class="track" part="track">
          <span class="thumb" part="thumb"></span>
        </span>
        <span class="text">
          <span class="label-text">${esc(this.label)}<span class="req">${this.required ? " *" : ""}</span></span>
          <div class="help" part="help">${esc(this.help)}</div>
          <div class="error-msg" part="error">${esc(this.error)}</div>
        </span>
      </label>
    `;
  }
  _update() {
    this._applyStyles();
    super._update();
    this.setAttribute("aria-checked", this.checked ? "true" : "false");
  }
  /** Resolve size + accent colour and push dynamic CSS vars in one call. */
  _applyStyles() {
    const vars = {};
    const sz = resolveSize(this.size);
    if (sz) vars["font-size"] = sz;
    if (this.background) {
      const c = resolveColor(this.background);
      if (c) vars["--_accent"] = c;
    }
    this._setDynamicVars(vars);
  }
  _toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.setAttribute("aria-checked", this.checked ? "true" : "false");
    this.emit("ui-change", { checked: this.checked, value: this.value });
  }
  _onClick(e) {
    e.preventDefault();
    this._toggle();
  }
  _onKeyDown(e) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      this._toggle();
    }
  }
};
customElements.define("ui-input-switch", UIInputSwitch);

// src/components/input/radio.js
var UIInputRadio = class extends UIComponent {
  static properties = {
    checked: { type: Boolean, default: false, reflect: true },
    value: { type: String, default: "", reflect: true },
    label: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        line-height: 1.5;
        cursor: pointer;
      }
      :host([disabled]) { opacity: 0.5; pointer-events: none; }

      .container {
        display: flex;
        align-items: center;
        gap: 0.5em;
        cursor: pointer;
        padding: 0.15em 0;
      }

      .circle {
        flex-shrink: 0;
        width: 1.15em;
        height: 1.15em;
        border: 0.12em solid var(--ui-border-color, #9ca3af);
        border-radius: 50%;
        background: var(--ui-bg, #fff);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: border-color 0.15s ease;
      }

      .dot {
        width: 0.55em;
        height: 0.55em;
        border-radius: 50%;
        background: var(--_accent, var(--ui-indigo-500, #6366f1));
        transform: scale(0);
        transition: transform 0.15s ease;
      }

      :host([checked]) .circle {
        border-color: var(--_accent, var(--ui-indigo-500, #6366f1));
      }
      :host([checked]) .dot {
        transform: scale(1);
      }

      .container:hover .circle {
        border-color: var(--_accent, var(--ui-indigo-500, #6366f1));
      }

      .label-text {
        color: var(--ui-text-color, #374151);
        font-size: 1em;
      }
    `
    );
  }
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "radio");
    this.setAttribute("aria-checked", this.checked ? "true" : "false");
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", this.checked ? "0" : "-1");
    this.addEventListener("click", this._onClick);
    this.addEventListener("keydown", this._onKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._onClick);
    this.removeEventListener("keydown", this._onKeyDown);
  }
  render() {
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    return `
      <label class="container" part="container">
        <span class="circle" part="circle">
          <span class="dot" part="dot"></span>
        </span>
        <span class="label-text">${esc(this.label)}</span>
      </label>
    `;
  }
  _update() {
    super._update();
    this.setAttribute("aria-checked", this.checked ? "true" : "false");
    this.setAttribute("tabindex", this.checked ? "0" : "-1");
  }
  _select() {
    if (this.disabled) return;
    this.emit("ui-radio-select", { value: this.value });
  }
  _onClick(e) {
    e.preventDefault();
    this._select();
  }
  _onKeyDown(e) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      this._select();
    }
    if (["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(e.key)) {
      e.preventDefault();
      this.emit("ui-radio-nav", { key: e.key });
    }
  }
};
customElements.define("ui-input-radio", UIInputRadio);

// src/components/input/radio-group.js
var UIInputRadioGroup = class extends UIComponent {
  static properties = {
    value: { type: String, default: "", reflect: true },
    name: { type: String, default: "", reflect: true },
    label: { type: String, default: "", reflect: true },
    help: { type: String, default: "", reflect: true },
    error: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    required: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
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

      .radios {
        display: flex;
        flex-direction: column;
        gap: 0.2em;
      }

      .help, .error-msg { display: none; font-size: 0.8em; margin-top: 0.3em; }
      .help { color: var(--ui-text-muted, #6b7280); }
      .error-msg { color: var(--ui-red-500, #ef4444); }
      :host([help]) .help       { display: block; }
      :host([error]) .error-msg { display: block; }
      :host([error]) .help      { display: none; }
    `
    );
  }
  constructor() {
    super();
    this._onRadioSelect = this._onRadioSelect.bind(this);
    this._onRadioNav = this._onRadioNav.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "radiogroup");
    this.addEventListener("ui-radio-select", this._onRadioSelect);
    this.addEventListener("ui-radio-nav", this._onRadioNav);
    requestAnimationFrame(() => this._syncChildren());
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("ui-radio-select", this._onRadioSelect);
    this.removeEventListener("ui-radio-nav", this._onRadioNav);
  }
  render() {
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    return `
      <div class="label" part="label">
        ${esc(this.label)}<span class="req">${this.required ? " *" : ""}</span>
      </div>
      <div class="radios" part="radios">
        <slot></slot>
      </div>
      <div class="help" part="help">${esc(this.help)}</div>
      <div class="error-msg" part="error">${esc(this.error)}</div>
    `;
  }
  _update() {
    this._applySize();
    super._update();
    this._syncChildren();
  }
  _applySize() {
    const vars = {};
    const sz = resolveSize(this.size);
    if (sz) vars["font-size"] = sz;
    this._setDynamicVars(vars);
  }
  get _radios() {
    return [...this.querySelectorAll("ui-input-radio")];
  }
  _syncChildren() {
    const radios = this._radios;
    const accentColor = this.background ? resolveColor(this.background) : "";
    radios.forEach((r) => {
      r.checked = r.value === this.value;
      if (this.disabled) r.disabled = true;
      if (accentColor) r._setDynamicVars({ "--_accent": accentColor });
    });
  }
  _onRadioSelect(e) {
    e.stopPropagation();
    const newVal = e.detail.value;
    if (newVal === this.value) return;
    this.value = newVal;
    this._syncChildren();
    this.emit("ui-change", { value: this.value });
  }
  _onRadioNav(e) {
    e.stopPropagation();
    const radios = this._radios.filter((r) => !r.disabled);
    if (!radios.length) return;
    const idx = radios.findIndex((r) => r.checked);
    let next;
    if (e.detail.key === "ArrowDown" || e.detail.key === "ArrowRight") {
      next = idx < radios.length - 1 ? idx + 1 : 0;
    } else {
      next = idx > 0 ? idx - 1 : radios.length - 1;
    }
    this.value = radios[next].value;
    this._syncChildren();
    radios[next].focus();
    this.emit("ui-change", { value: this.value });
  }
};
customElements.define("ui-input-radio-group", UIInputRadioGroup);

// src/components/input/select.js
var UIInputSelect = class extends UIComponent {
  static properties = {
    value: { type: String, default: "", reflect: true },
    placeholder: { type: String, default: "Select\u2026", reflect: true },
    name: { type: String, default: "", reflect: true },
    label: { type: String, default: "", reflect: true },
    help: { type: String, default: "", reflect: true },
    error: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    required: { type: Boolean, default: false, reflect: true },
    multiple: { type: Boolean, default: false, reflect: true },
    searchable: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
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
    `
    );
  }
  constructor() {
    super();
    this._open = false;
    this._options = [];
    this._filter = "";
    this._onClick = this._onClick.bind(this);
    this._onOutsideClick = this._onOutsideClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onSearchInput = this._onSearchInput.bind(this);
    this._onOptionClick = this._onOptionClick.bind(this);
    this._focusedOptionIdx = -1;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");
    this._readOptions();
    this._observer = new MutationObserver(() => {
      this._readOptions();
      this._renderOptions();
    });
    this._observer.observe(this, { childList: true, subtree: true, characterData: true, attributes: true });
    requestAnimationFrame(() => this._renderOptions());
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer?.disconnect();
    document.removeEventListener("click", this._onOutsideClick);
  }
  _readOptions() {
    this._options = [...this.querySelectorAll("option")].map((o) => ({
      value: o.value,
      text: o.textContent.trim(),
      disabled: o.disabled
    }));
  }
  render() {
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    return `
      <div class="label" part="label">
        ${esc(this.label)}<span class="req">${this.required ? " *" : ""}</span>
      </div>
      <div class="trigger" part="trigger" tabindex="0" role="combobox" aria-expanded="false" aria-haspopup="listbox">
        <span class="display-value"></span>
        <svg class="caret" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="dropdown" part="dropdown" role="listbox">
        <div class="search-box">
          <input class="search-input" type="text" placeholder="Search\u2026" />
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
    if (sz) vars["font-size"] = sz;
    if (this.background) {
      const bg = resolveColor(this.background);
      if (bg) vars["--_bg"] = bg;
    }
    if (this.color) {
      const c = resolveColor(this.color);
      if (c) vars["--_color"] = c;
    }
    this._setDynamicVars(vars);
  }
  _attachInternalListeners() {
    const trigger = this.shadowRoot.querySelector(".trigger");
    const search = this.shadowRoot.querySelector(".search-input");
    if (trigger) {
      trigger.addEventListener("click", this._onClick);
      trigger.addEventListener("keydown", this._onKeyDown);
    }
    if (search) {
      search.addEventListener("input", this._onSearchInput);
    }
  }
  _renderOptions() {
    const list = this.shadowRoot.querySelector(".options-list");
    if (!list) return;
    const selected = this._selectedValues();
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    list.innerHTML = this._options.map((o, i) => `
      <div class="option" role="option"
           data-index="${i}" data-value="${esc(o.value)}"
           ${selected.includes(o.value) ? "data-selected" : ""}
           ${o.disabled ? 'data-disabled style="opacity:0.5;pointer-events:none"' : ""}
           ${this._filter && !o.text.toLowerCase().includes(this._filter.toLowerCase()) ? "data-hidden" : ""}>
        ${this.multiple ? `<svg class="check-icon" viewBox="0 0 24 24"><polyline points="4 12 10 18 20 6"/></svg>` : ""}
        <span>${esc(o.text)}</span>
      </div>
    `).join("");
    const noResults = this.shadowRoot.querySelector(".no-results");
    const visible = list.querySelectorAll(".option:not([data-hidden])");
    if (noResults) noResults.style.display = visible.length === 0 ? "block" : "none";
    list.querySelectorAll(".option:not([data-disabled])").forEach((el) => {
      el.addEventListener("click", this._onOptionClick);
    });
    this._updateDisplay();
  }
  _selectedValues() {
    if (!this.value) return [];
    return this.value.split(",").map((v) => v.trim()).filter(Boolean);
  }
  _updateDisplay() {
    const display = this.shadowRoot.querySelector(".display-value");
    if (!display) return;
    const selected = this._selectedValues();
    if (!selected.length) {
      display.innerHTML = `<span class="placeholder">${this.placeholder}</span>`;
      return;
    }
    if (this.multiple) {
      const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
      display.innerHTML = `<span class="tags">${selected.map((v) => {
        const opt = this._options.find((o) => o.value === v);
        const text = opt ? opt.text : v;
        return `<span class="tag">${esc(text)}<button class="tag-remove" data-value="${esc(v)}" aria-label="Remove">\xD7</button></span>`;
      }).join("")}</span>`;
      display.querySelectorAll(".tag-remove").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const val = btn.getAttribute("data-value");
          const vals = this._selectedValues().filter((v) => v !== val);
          this.value = vals.join(",");
          this._renderOptions();
          this.emit("ui-change", { value: this.value });
        });
      });
    } else {
      const opt = this._options.find((o) => o.value === selected[0]);
      display.textContent = opt ? opt.text : selected[0];
    }
  }
  _openDropdown() {
    if (this._open) return;
    this._open = true;
    this.setAttribute("data-open", "");
    const trigger = this.shadowRoot.querySelector(".trigger");
    if (trigger) trigger.setAttribute("aria-expanded", "true");
    this._filter = "";
    const search = this.shadowRoot.querySelector(".search-input");
    if (search) {
      search.value = "";
    }
    this._renderOptions();
    if (this.searchable) {
      requestAnimationFrame(() => search?.focus());
    }
    document.addEventListener("click", this._onOutsideClick);
    this.emit("ui-focus");
  }
  _closeDropdown() {
    if (!this._open) return;
    this._open = false;
    this.removeAttribute("data-open");
    const trigger = this.shadowRoot.querySelector(".trigger");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
    this._focusedOptionIdx = -1;
    document.removeEventListener("click", this._onOutsideClick);
    this.emit("ui-blur");
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
    if (e.key === "Escape") {
      this._closeDropdown();
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!this._open) {
        this._openDropdown();
        return;
      }
      const options = this.shadowRoot.querySelectorAll(".option:not([data-hidden]):not([data-disabled])");
      if (this._focusedOptionIdx >= 0 && options[this._focusedOptionIdx]) {
        this._selectOption(options[this._focusedOptionIdx].getAttribute("data-value"));
      }
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!this._open) {
        this._openDropdown();
        return;
      }
      const options = this.shadowRoot.querySelectorAll(".option:not([data-hidden]):not([data-disabled])");
      if (!options.length) return;
      if (e.key === "ArrowDown") {
        this._focusedOptionIdx = Math.min(this._focusedOptionIdx + 1, options.length - 1);
      } else {
        this._focusedOptionIdx = Math.max(this._focusedOptionIdx - 1, 0);
      }
      options.forEach((o, i) => o.style.background = i === this._focusedOptionIdx ? "var(--ui-bg-subtle, #f3f4f6)" : "");
      options[this._focusedOptionIdx]?.scrollIntoView({ block: "nearest" });
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
    const val = opt.getAttribute("data-value");
    this._selectOption(val);
  }
  _selectOption(val) {
    if (this.multiple) {
      const vals = this._selectedValues();
      if (vals.includes(val)) {
        this.value = vals.filter((v) => v !== val).join(",");
      } else {
        this.value = [...vals, val].join(",");
      }
      this._renderOptions();
    } else {
      this.value = val;
      this._renderOptions();
      this._closeDropdown();
    }
    this.emit("ui-change", { value: this.value });
  }
};
customElements.define("ui-input-select", UIInputSelect);

// src/components/input/slider.js
var UIInputSlider = class extends UIComponent {
  static properties = {
    value: { type: Number, default: 50, reflect: true },
    min: { type: Number, default: 0, reflect: true },
    max: { type: Number, default: 100, reflect: true },
    step: { type: Number, default: 1, reflect: true },
    name: { type: String, default: "", reflect: true },
    label: { type: String, default: "", reflect: true },
    help: { type: String, default: "", reflect: true },
    error: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    required: { type: Boolean, default: false, reflect: true },
    showvalue: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
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
      :host([label]) .label { display: flex; justify-content: space-between; align-items: center; }
      .req { color: var(--ui-red-500, #ef4444); margin-left: 0.15em; }



      .slider-wrap {
        display: flex;
        align-items: center;
        gap: 0.75em;
      }

      .slider {
        -webkit-appearance: none;
        appearance: none;
        flex: 1;
        height: 0.35em;
        border-radius: 9999px;
        background: var(--ui-border-color, #d1d5db);
        outline: none;
        cursor: pointer;
      }

      .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 1.15em;
        height: 1.15em;
        border-radius: 50%;
        background: var(--_accent, var(--ui-indigo-500, #6366f1));
        cursor: pointer;
        border: 2px solid #fff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        transition: box-shadow 0.15s ease;
      }
      .slider::-moz-range-thumb {
        width: 1.15em;
        height: 1.15em;
        border-radius: 50%;
        background: var(--_accent, var(--ui-indigo-500, #6366f1));
        cursor: pointer;
        border: 2px solid #fff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      }

      .slider:focus::-webkit-slider-thumb {
        box-shadow: 0 0 0 0.2em var(--_focus-ring, rgba(99, 102, 241, 0.25));
      }
      .slider:focus::-moz-range-thumb {
        box-shadow: 0 0 0 0.2em var(--_focus-ring, rgba(99, 102, 241, 0.25));
      }

      .val-display {
        display: none;
        min-width: 2.5em;
        text-align: center;
        font-variant-numeric: tabular-nums;
        font-size: 0.9em;
        color: var(--ui-text-color, #374151);
      }
      :host([showvalue]) .val-display { display: block; }

      .help, .error-msg { display: none; font-size: 0.8em; margin-top: 0.3em; }
      .help { color: var(--ui-text-muted, #6b7280); }
      .error-msg { color: var(--ui-red-500, #ef4444); }
      :host([help]) .help       { display: block; }
      :host([error]) .error-msg { display: block; }
      :host([error]) .help      { display: none; }
    `
    );
  }
  constructor() {
    super();
    this._onInput = this._onInput.bind(this);
    this._onChange = this._onChange.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this._attachListeners();
  }
  render() {
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    return `
      <div class="label" part="label">
        <span>${esc(this.label)}<span class="req">${this.required ? " *" : ""}</span></span>
      </div>
      <div class="slider-wrap">
        <input class="slider" part="slider" type="range"
               min="${this.min}" max="${this.max}" step="${this.step}" value="${this.value}"
               ${this.disabled ? "disabled" : ""}
               ${this.name ? `name="${esc(this.name)}"` : ""}
               aria-valuemin="${this.min}" aria-valuemax="${this.max}" aria-valuenow="${this.value}"
               ${this.label ? `aria-label="${esc(this.label)}"` : ""} />
        <span class="val-display" part="value">${this.value}</span>
      </div>
      <div class="help" part="help">${esc(this.help)}</div>
      <div class="error-msg" part="error">${esc(this.error)}</div>
    `;
  }
  _attachListeners() {
    const slider = this.shadowRoot.querySelector(".slider");
    if (!slider) return;
    slider.addEventListener("input", this._onInput);
    slider.addEventListener("change", this._onChange);
  }
  _update() {
    this._applyStyles();
    super._update();
    this._attachListeners();
    this._syncSlider();
  }
  _syncSlider() {
    const slider = this.shadowRoot.querySelector(".slider");
    if (slider && Number(slider.value) !== this.value) slider.value = this.value;
  }
  _applyStyles() {
    const vars = {};
    const sz = resolveSize(this.size);
    if (sz) vars["font-size"] = sz;
    if (this.background) {
      const c = resolveColor(this.background);
      if (c) vars["--_accent"] = c;
    }
    this._setDynamicVars(vars);
  }
  _onInput(e) {
    const v = Number(e.target.value);
    this._value = v;
    const valDisplay = this.shadowRoot.querySelector(".val-display");
    if (valDisplay) valDisplay.textContent = v;
    this.emit("ui-input", { value: v });
  }
  _onChange(e) {
    this.value = Number(e.target.value);
    this.emit("ui-change", { value: this.value });
  }
};
customElements.define("ui-input-slider", UIInputSlider);

// src/components/input/file.js
var UIInputFile = class extends UIComponent {
  static properties = {
    accept: { type: String, default: "", reflect: true },
    name: { type: String, default: "", reflect: true },
    label: { type: String, default: "", reflect: true },
    help: { type: String, default: "", reflect: true },
    error: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    required: { type: Boolean, default: false, reflect: true },
    multiple: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
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

      .drop-zone {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
        padding: 1.5em;
        border: 2px dashed var(--_border, var(--ui-border-color, #d1d5db));
        border-radius: var(--ui-radius, 0.375em);
        background: var(--_bg, var(--ui-bg-subtle, #f9fafb));
        cursor: pointer;
        transition: border-color 0.15s ease, background-color 0.15s ease;
        text-align: center;
      }
      .drop-zone:hover {
        border-color: var(--_accent, var(--ui-indigo-500, #6366f1));
        background: rgba(99, 102, 241, 0.04);
      }
      :host([data-dragging]) .drop-zone {
        border-color: var(--_accent, var(--ui-indigo-500, #6366f1));
        background: rgba(99, 102, 241, 0.08);
      }
      :host([error]) .drop-zone { border-color: var(--ui-red-500, #ef4444); }

      .drop-icon {
        width: 2em;
        height: 2em;
        fill: none;
        stroke: var(--ui-text-muted, #9ca3af);
        stroke-width: 1.5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .drop-text { color: var(--ui-text-muted, #6b7280); font-size: 0.9em; }
      .drop-text strong { color: var(--_accent, var(--ui-indigo-500, #6366f1)); cursor: pointer; }

      .hidden-input {
        position: absolute;
        width: 1px; height: 1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;
        padding: 0;
        margin: -1px;
      }

      .file-list {
        margin-top: 0.5em;
        display: flex;
        flex-direction: column;
        gap: 0.3em;
      }
      .file-item {
        display: flex;
        align-items: center;
        gap: 0.5em;
        padding: 0.3em 0.5em;
        border-radius: var(--ui-radius, 0.25em);
        background: var(--ui-bg-subtle, #f3f4f6);
        font-size: 0.85em;
      }
      .file-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .file-size { color: var(--ui-text-muted, #9ca3af); font-size: 0.9em; flex-shrink: 0; }
      .file-remove {
        cursor: pointer; background: none; border: none;
        font-size: 1.1em; opacity: 0.5; padding: 0;
        font-family: inherit; line-height: 1;
      }
      .file-remove:hover { opacity: 1; }

      .file-icon {
        width: 1em; height: 1em;
        fill: none; stroke: var(--ui-text-muted, #9ca3af);
        stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round;
        flex-shrink: 0;
      }

      .help, .error-msg { display: none; font-size: 0.8em; margin-top: 0.3em; }
      .help { color: var(--ui-text-muted, #6b7280); }
      .error-msg { color: var(--ui-red-500, #ef4444); }
      :host([help]) .help       { display: block; }
      :host([error]) .error-msg { display: block; }
      :host([error]) .help      { display: none; }
    `
    );
  }
  constructor() {
    super();
    this._files = [];
    this._onZoneClick = this._onZoneClick.bind(this);
    this._onFileChange = this._onFileChange.bind(this);
    this._onDragOver = this._onDragOver.bind(this);
    this._onDragLeave = this._onDragLeave.bind(this);
    this._onDrop = this._onDrop.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this._attachListeners();
  }
  render() {
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    return `
      <div class="label" part="label">
        ${esc(this.label)}<span class="req">${this.required ? " *" : ""}</span>
      </div>
      <div class="drop-zone" part="dropzone">
        <svg class="drop-icon" viewBox="0 0 24 24">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        <div class="drop-text"><strong>Click to upload</strong> or drag and drop</div>
        ${this.accept ? `<div class="drop-text" style="font-size:0.8em">${esc(this.accept)}</div>` : ""}
        <input class="hidden-input" type="file"
               ${this.accept ? `accept="${esc(this.accept)}"` : ""}
               ${this.multiple ? "multiple" : ""}
               ${this.name ? `name="${esc(this.name)}"` : ""} />
      </div>
      <div class="file-list" part="filelist"></div>
      <div class="help" part="help">${esc(this.help)}</div>
      <div class="error-msg" part="error">${esc(this.error)}</div>
    `;
  }
  _attachListeners() {
    const zone = this.shadowRoot.querySelector(".drop-zone");
    const input = this.shadowRoot.querySelector(".hidden-input");
    if (zone) {
      zone.addEventListener("click", this._onZoneClick);
      zone.addEventListener("dragover", this._onDragOver);
      zone.addEventListener("dragleave", this._onDragLeave);
      zone.addEventListener("drop", this._onDrop);
    }
    if (input) {
      input.addEventListener("change", this._onFileChange);
    }
  }
  _update() {
    this._applyStyles();
    super._update();
    this._attachListeners();
    this._renderFileList();
  }
  _applyStyles() {
    const vars = {};
    const sz = resolveSize(this.size);
    if (sz) vars["font-size"] = sz;
    if (this.background) {
      const bg = resolveColor(this.background);
      if (bg) vars["--_bg"] = bg;
    }
    this._setDynamicVars(vars);
  }
  _onZoneClick() {
    this.shadowRoot.querySelector(".hidden-input")?.click();
  }
  _onFileChange(e) {
    const files = [...e.target.files];
    this._setFiles(files);
  }
  _onDragOver(e) {
    e.preventDefault();
    this.setAttribute("data-dragging", "");
  }
  _onDragLeave() {
    this.removeAttribute("data-dragging");
  }
  _onDrop(e) {
    e.preventDefault();
    this.removeAttribute("data-dragging");
    const files = [...e.dataTransfer.files];
    this._setFiles(files);
  }
  _setFiles(files) {
    if (this.multiple) {
      this._files = [...this._files, ...files];
    } else {
      this._files = files.slice(0, 1);
    }
    this._renderFileList();
    this.emit("ui-change", { files: this._files });
  }
  _renderFileList() {
    const list = this.shadowRoot.querySelector(".file-list");
    if (!list) return;
    if (!this._files.length) {
      list.innerHTML = "";
      return;
    }
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    list.innerHTML = this._files.map((f, i) => `
      <div class="file-item" data-index="${i}">
        <svg class="file-icon" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <span class="file-name">${esc(f.name)}</span>
        <span class="file-size">${this._formatSize(f.size)}</span>
        <button class="file-remove" data-index="${i}" aria-label="Remove">\xD7</button>
      </div>
    `).join("");
    list.querySelectorAll(".file-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-index"));
        this._files.splice(idx, 1);
        this._renderFileList();
        this.emit("ui-change", { files: this._files });
      });
    });
  }
  _formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }
  /** Get current file list */
  get files() {
    return this._files;
  }
  /** Clear all files */
  clear() {
    this._files = [];
    this._renderFileList();
    const input = this.shadowRoot.querySelector(".hidden-input");
    if (input) input.value = "";
  }
};
customElements.define("ui-input-file", UIInputFile);

// src/components/input/color.js
var UIInputColor = class _UIInputColor extends UIComponent {
  static properties = {
    value: { type: String, default: "#6366f1", reflect: true },
    name: { type: String, default: "", reflect: true },
    label: { type: String, default: "", reflect: true },
    help: { type: String, default: "", reflect: true },
    error: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    required: { type: Boolean, default: false, reflect: true }
  };
  /* ── Colour conversion helpers (static, pure) ── */
  /** Parse any CSS colour string → { h, s, l, a } (h: 0-360, s/l: 0-100, a: 0-1) */
  static parseColor(str) {
    if (!str || typeof str !== "string") return null;
    str = str.trim().toLowerCase();
    const tokenEntry = _UIInputColor._THEME_PALETTE.find((e) => e.token === str);
    if (tokenEntry) str = tokenEntry.hex;
    const resolved = resolveColor(str);
    if (resolved && resolved !== str) str = resolved;
    if (/^[a-z]+$/i.test(str) && str !== "transparent") {
      const ctx = _UIInputColor._scratchCtx();
      ctx.fillStyle = "#000";
      ctx.fillStyle = str;
      const result = ctx.fillStyle;
      if (result !== "#000000" || str === "black") str = result;
      else return null;
    }
    const hexMatch = str.match(/^#([0-9a-f]{3,8})$/i);
    if (hexMatch) {
      let hex = hexMatch[1];
      if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      if (hex.length === 4) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
      return _UIInputColor._rgbToHsl(r, g, b, a);
    }
    const rgbMatch = str.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([\d.]+)\s*)?\)$/);
    if (rgbMatch) {
      return _UIInputColor._rgbToHsl(+rgbMatch[1], +rgbMatch[2], +rgbMatch[3], rgbMatch[4] != null ? +rgbMatch[4] : 1);
    }
    const hslMatch = str.match(/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*(?:,\s*([\d.]+)\s*)?\)$/);
    if (hslMatch) {
      return { h: +hslMatch[1] % 360, s: +hslMatch[2], l: +hslMatch[3], a: hslMatch[4] != null ? +hslMatch[4] : 1 };
    }
    return null;
  }
  static _scratchCtx() {
    if (!_UIInputColor.__ctx) {
      const c = document.createElement("canvas");
      c.width = c.height = 1;
      _UIInputColor.__ctx = c.getContext("2d");
    }
    return _UIInputColor.__ctx;
  }
  static _rgbToHsl(r, g, b, a = 1) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100), a };
  }
  static _hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p2, q2, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p2 + (q2 - p2) * 6 * t;
        if (t < 1 / 2) return q2;
        if (t < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - t) * 6;
        return p2;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }
  /** HSL+A → hex string (#RRGGBB or #RRGGBBAA) */
  static _hslToHex(h, s, l, a = 1) {
    const { r, g, b } = _UIInputColor._hslToRgb(h, s, l);
    const hex = "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
    if (a < 1) return hex + Math.round(a * 255).toString(16).padStart(2, "0");
    return hex;
  }
  /** Format HSL+A in the given mode */
  static formatColor(h, s, l, a, mode) {
    if (mode === "rgb") {
      const { r, g, b } = _UIInputColor._hslToRgb(h, s, l);
      return a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
    }
    if (mode === "hsl") {
      return a < 1 ? `hsla(${h}, ${s}%, ${l}%, ${a})` : `hsl(${h}, ${s}%, ${l}%)`;
    }
    return _UIInputColor._hslToHex(h, s, l, a);
  }
  /** Convert H (0-360) + S (0-100, saturation) + B (0-100, brightness) to HSL */
  static _hsbToHsl(h, s, b) {
    s /= 100;
    b /= 100;
    const l = b * (1 - s / 2);
    const sl = l === 0 || l === 1 ? 0 : (b - l) / Math.min(l, 1 - l);
    return { h, s: Math.round(sl * 100), l: Math.round(l * 100) };
  }
  /** Convert HSL to HSB */
  static _hslToHsb(h, s, l) {
    s /= 100;
    l /= 100;
    const b = l + s * Math.min(l, 1 - l);
    const sb = b === 0 ? 0 : 2 * (1 - l / b);
    return { h, s: Math.round(sb * 100), b: Math.round(b * 100) };
  }
  /* ── Recently used (shared across instances, in-memory) ── */
  static _recentColors = [];
  static _MAX_RECENT = 8;
  static _addRecent(color) {
    const arr = _UIInputColor._recentColors;
    const idx = arr.indexOf(color);
    if (idx !== -1) arr.splice(idx, 1);
    arr.unshift(color);
    if (arr.length > _UIInputColor._MAX_RECENT) arr.length = _UIInputColor._MAX_RECENT;
  }
  /* ── Theme palette ── */
  static _THEME_SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  static _THEME_FAMILIES = [
    { name: "gray", hex: "#6b7280" },
    { name: "red", hex: "#ef4444" },
    { name: "orange", hex: "#f97316" },
    { name: "amber", hex: "#f59e0b" },
    { name: "yellow", hex: "#eab308" },
    { name: "lime", hex: "#84cc16" },
    { name: "green", hex: "#22c55e" },
    { name: "emerald", hex: "#10b981" },
    { name: "teal", hex: "#14b8a6" },
    { name: "cyan", hex: "#06b6d4" },
    { name: "sky", hex: "#0ea5e9" },
    { name: "blue", hex: "#3b82f6" },
    { name: "indigo", hex: "#6366f1" },
    { name: "violet", hex: "#8b5cf6" },
    { name: "purple", hex: "#a855f7" },
    { name: "fuchsia", hex: "#d946ef" },
    { name: "pink", hex: "#ec4899" },
    { name: "rose", hex: "#f43f5e" }
  ];
  static _THEME_PALETTE = (() => {
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    const families = [
      ["gray", "#f9fafb", "#f3f4f6", "#e5e7eb", "#d1d5db", "#9ca3af", "#6b7280", "#4b5563", "#374151", "#1f2937", "#111827", "#030712"],
      ["red", "#fef2f2", "#fee2e2", "#fecaca", "#fca5a5", "#f87171", "#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d", "#450a0a"],
      ["orange", "#fff7ed", "#ffedd5", "#fed7aa", "#fdba74", "#fb923c", "#f97316", "#ea580c", "#c2410c", "#9a3412", "#7c2d12", "#431407"],
      ["amber", "#fffbeb", "#fef3c7", "#fde68a", "#fcd34d", "#fbbf24", "#f59e0b", "#d97706", "#b45309", "#92400e", "#78350f", "#451a03"],
      ["yellow", "#fefce8", "#fef9c3", "#fef08a", "#fde047", "#facc15", "#eab308", "#ca8a04", "#a16207", "#854d0e", "#713f12", "#422006"],
      ["lime", "#f7fee7", "#ecfccb", "#d9f99d", "#bef264", "#a3e635", "#84cc16", "#65a30d", "#4d7c0f", "#3f6212", "#365314", "#1a2e05"],
      ["green", "#f0fdf4", "#dcfce7", "#bbf7d0", "#86efac", "#4ade80", "#22c55e", "#16a34a", "#15803d", "#166534", "#14532d", "#052e16"],
      ["emerald", "#ecfdf5", "#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399", "#10b981", "#059669", "#047857", "#065f46", "#064e3b", "#022c22"],
      ["teal", "#f0fdfa", "#ccfbf1", "#99f6e4", "#5eead4", "#2dd4bf", "#14b8a6", "#0d9488", "#0f766e", "#115e59", "#134e4a", "#042f2e"],
      ["cyan", "#ecfeff", "#cffafe", "#a5f3fc", "#67e8f9", "#22d3ee", "#06b6d4", "#0891b2", "#0e7490", "#155e75", "#164e63", "#083344"],
      ["sky", "#f0f9ff", "#e0f2fe", "#bae6fd", "#7dd3fc", "#38bdf8", "#0ea5e9", "#0284c7", "#0369a1", "#075985", "#0c4a6e", "#082f49"],
      ["blue", "#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a", "#172554"],
      ["indigo", "#eef2ff", "#e0e7ff", "#c7d2fe", "#a5b4fc", "#818cf8", "#6366f1", "#4f46e5", "#4338ca", "#3730a3", "#312e81", "#1e1b4b"],
      ["violet", "#f5f3ff", "#ede9fe", "#ddd6fe", "#c4b5fd", "#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95", "#2e1065"],
      ["purple", "#faf5ff", "#f3e8ff", "#e9d5ff", "#d8b4fe", "#c084fc", "#a855f7", "#9333ea", "#7e22ce", "#6b21a8", "#581c87", "#3b0764"],
      ["fuchsia", "#fdf4ff", "#fae8ff", "#f5d0fe", "#f0abfc", "#e879f9", "#d946ef", "#c026d3", "#a21caf", "#86198f", "#701a75", "#4a044e"],
      ["pink", "#fdf2f8", "#fce7f3", "#fbcfe8", "#f9a8d4", "#f472b6", "#ec4899", "#db2777", "#be185d", "#9d174d", "#831843", "#500724"],
      ["rose", "#fff1f2", "#ffe4e6", "#fecdd3", "#fda4af", "#fb7185", "#f43f5e", "#e11d48", "#be123c", "#9f1239", "#881337", "#4c0519"]
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
    return (
      /* css */
      `
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

      /* \u2500\u2500 Tabs \u2500\u2500 */
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

      /* \u2500\u2500 Custom panel: Canvas & sliders \u2500\u2500 */
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

      /* \u2500\u2500 Input row \u2500\u2500 */
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

      /* \u2500\u2500 Recent colours \u2500\u2500 */
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

      /* \u2500\u2500 Theme palette \u2500\u2500 */
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
    `
    );
  }
  constructor() {
    super();
    this._open = false;
    this._activeTab = "theme";
    this._format = "hex";
    this._hue = 0;
    this._saturation = 100;
    this._brightness = 100;
    this._alpha = 1;
    this._draggingCanvas = false;
    this._draggingHue = false;
    this._draggingAlpha = false;
    this._onTriggerClick = this._onTriggerClick.bind(this);
    this._onOutsideClick = this._onOutsideClick.bind(this);
    this._onThemeSwatchClick = this._onThemeSwatchClick.bind(this);
    this._onTabClick = this._onTabClick.bind(this);
    this._onColorInput = this._onColorInput.bind(this);
    this._onNativeInput = this._onNativeInput.bind(this);
    this._onFormatToggle = this._onFormatToggle.bind(this);
    this._onCanvasPointerDown = this._onCanvasPointerDown.bind(this);
    this._onHuePointerDown = this._onHuePointerDown.bind(this);
    this._onAlphaPointerDown = this._onAlphaPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this._syncFromValue();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this._onOutsideClick);
    document.removeEventListener("pointermove", this._onPointerMove);
    document.removeEventListener("pointerup", this._onPointerUp);
  }
  render() {
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    const themePalette = _UIInputColor._THEME_PALETTE;
    const displayColor = this._displayColor(this.value);
    const recent = _UIInputColor._recentColors;
    return `
      <div class="label" part="label">
        ${esc(this.label)}<span class="req">${this.required ? " *" : ""}</span>
      </div>
      <div class="trigger" part="trigger" tabindex="0">
        <span class="swatch"><span class="swatch-color" style="background:${esc(displayColor)}"></span></span>
        <span class="value-text">${esc(this.value)}</span>
      </div>
      <div class="panel" part="panel">
        <div class="panel-tabs">
          <button type="button" class="panel-tab" data-tab="theme" ${this._activeTab === "theme" ? "data-active" : ""}>Theme</button>
          <button type="button" class="panel-tab" data-tab="custom" ${this._activeTab === "custom" ? "data-active" : ""}>Custom</button>
        </div>

        <div class="panel-custom" style="display:${this._activeTab === "custom" ? "block" : "none"}">
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
            <input class="color-input" type="text" value="${esc(this.value)}" spellcheck="false" placeholder="hex, rgb, hsl, name\u2026" />
            <input class="native-input" type="color" value="${esc(this._toHex6(this.value))}" aria-label="Pick colour" />
          </div>
          ${recent.length ? `<div class="recent-row">${recent.map((c) => `<button type="button" class="recent-swatch" style="background:${c}" data-color="${esc(c)}" title="${esc(c)}" aria-label="${esc(c)}"></button>`).join("")}</div>` : ""}
        </div>

        <div class="panel-theme" style="display:${this._activeTab === "theme" ? "block" : "none"}">
          <div class="theme-palette">
            <div class="theme-row theme-header-row">
              ${_UIInputColor._THEME_FAMILIES.map((f) => `<span class="theme-col-label" title="${f.name}"><span class="theme-col-dot" style="background:${f.hex}"></span></span>`).join("")}
              <span class="shade-num"></span>
            </div>
            ${_UIInputColor._THEME_SHADES.map((shade, si) => {
      const rowAttr = si === 0 ? ' data-shade="first"' : si === _UIInputColor._THEME_SHADES.length - 1 ? ' data-shade="last"' : "";
      const cells = _UIInputColor._THEME_FAMILIES.map((_, fi) => {
        const e = themePalette[fi * _UIInputColor._THEME_SHADES.length + si];
        return `<button type="button" class="theme-swatch" style="background:${e.hex}" data-token="${e.token}" ${e.token === this.value ? "data-selected" : ""} aria-label="${e.token}" title="${e.token}"></button>`;
      }).join("");
      return `<div class="theme-row"${rowAttr}>${cells}<span class="shade-num">${shade}</span></div>`;
    }).join("")}
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
    if (sz) vars["font-size"] = sz;
    this._setDynamicVars(vars);
  }
  _attachListeners() {
    const trigger = this.shadowRoot.querySelector(".trigger");
    if (trigger) trigger.addEventListener("click", this._onTriggerClick);
    this.shadowRoot.querySelectorAll(".theme-swatch").forEach((s) => {
      s.addEventListener("click", this._onThemeSwatchClick);
    });
    this.shadowRoot.querySelectorAll(".panel-tab").forEach((t) => {
      t.addEventListener("click", this._onTabClick);
    });
    const colorInput = this.shadowRoot.querySelector(".color-input");
    if (colorInput) colorInput.addEventListener("change", this._onColorInput);
    const native = this.shadowRoot.querySelector(".native-input");
    if (native) native.addEventListener("input", this._onNativeInput);
    const formatBtn = this.shadowRoot.querySelector(".format-btn");
    if (formatBtn) formatBtn.addEventListener("click", this._onFormatToggle);
    const canvas = this.shadowRoot.querySelector(".sat-bright-canvas");
    if (canvas) canvas.addEventListener("pointerdown", this._onCanvasPointerDown);
    const hueWrap = this.shadowRoot.querySelector(".hue-wrap");
    if (hueWrap) hueWrap.addEventListener("pointerdown", this._onHuePointerDown);
    const alphaWrap = this.shadowRoot.querySelector(".alpha-wrap");
    if (alphaWrap) alphaWrap.addEventListener("pointerdown", this._onAlphaPointerDown);
    this.shadowRoot.querySelectorAll(".recent-swatch").forEach((s) => {
      s.addEventListener("click", (e) => {
        e.stopPropagation();
        this._setValueFromInput(e.currentTarget.getAttribute("data-color"));
      });
    });
  }
  /* ── Sync internal HSB state from the value prop ── */
  _syncFromValue() {
    const parsed = _UIInputColor.parseColor(this.value);
    if (parsed) {
      this._hue = parsed.h;
      this._alpha = parsed.a;
      const hsb = _UIInputColor._hslToHsb(parsed.h, parsed.s, parsed.l);
      this._saturation = hsb.s;
      this._brightness = hsb.b;
    }
  }
  /* ── Canvas drawing ── */
  _drawCanvas() {
    const canvas = this.shadowRoot.querySelector(".sat-bright-canvas");
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const w = Math.round(rect.width) || 200;
    const h = Math.round(rect.height) || 150;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = `hsl(${this._hue}, 100%, 50%)`;
    ctx.fillRect(0, 0, w, h);
    const whiteGrad = ctx.createLinearGradient(0, 0, w, 0);
    whiteGrad.addColorStop(0, "rgba(255,255,255,1)");
    whiteGrad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = whiteGrad;
    ctx.fillRect(0, 0, w, h);
    const blackGrad = ctx.createLinearGradient(0, 0, 0, h);
    blackGrad.addColorStop(0, "rgba(0,0,0,0)");
    blackGrad.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = blackGrad;
    ctx.fillRect(0, 0, w, h);
  }
  /* ── Live-update all UI elements without re-render ── */
  _updateUI() {
    const hsl = _UIInputColor._hsbToHsl(this._hue, this._saturation, this._brightness);
    const hexColor = _UIInputColor._hslToHex(hsl.h, hsl.s, hsl.l, this._alpha);
    const solidHex = _UIInputColor._hslToHex(hsl.h, hsl.s, hsl.l, 1);
    const cursor = this.shadowRoot.querySelector(".sb-cursor");
    const canvas = this.shadowRoot.querySelector(".sat-bright-canvas");
    if (cursor && canvas) {
      const x = this._saturation / 100 * canvas.width;
      const y = (1 - this._brightness / 100) * canvas.height;
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
      cursor.style.background = solidHex;
    }
    const hueThumb = this.shadowRoot.querySelector(".hue-thumb");
    const hueWrap = this.shadowRoot.querySelector(".hue-wrap");
    if (hueThumb && hueWrap) {
      const pct = this._hue / 360 * 100;
      hueThumb.style.left = `${pct}%`;
      hueThumb.style.background = `hsl(${this._hue}, 100%, 50%)`;
    }
    const alphaThumb = this.shadowRoot.querySelector(".alpha-thumb");
    const alphaGrad = this.shadowRoot.querySelector(".alpha-gradient");
    if (alphaThumb) {
      alphaThumb.style.left = `${this._alpha * 100}%`;
      alphaThumb.style.background = hexColor;
    }
    if (alphaGrad) {
      alphaGrad.style.background = `linear-gradient(to right, transparent, ${solidHex})`;
    }
    const previewColor = this.shadowRoot.querySelector(".slider-preview-color");
    if (previewColor) {
      previewColor.style.background = hexColor;
    }
    const swatchColor = this.shadowRoot.querySelector(".swatch-color");
    if (swatchColor) {
      swatchColor.style.background = this._displayColor(this.value);
    }
    const colorInput = this.shadowRoot.querySelector(".color-input");
    const valueText = this.shadowRoot.querySelector(".value-text");
    if (colorInput && colorInput !== this.shadowRoot.activeElement) colorInput.value = this.value;
    if (valueText) valueText.textContent = this.value;
    const native = this.shadowRoot.querySelector(".native-input");
    if (native) native.value = this._toHex6(this.value);
    this.shadowRoot.querySelectorAll(".theme-swatch").forEach((s) => {
      if (s.getAttribute("data-token") === this.value) s.setAttribute("data-selected", "");
      else s.removeAttribute("data-selected");
    });
  }
  /* ── Event handlers ── */
  /**
   * Resolve the value to an actual CSS colour for swatch display.
   * Palette tokens are looked up in _THEME_PALETTE so we get a real
   * hex colour instead of a `var(--ui-…)` reference.
   */
  _displayColor(v) {
    if (!v) return "transparent";
    const entry = _UIInputColor._THEME_PALETTE.find((e) => e.token === v);
    if (entry) return entry.hex;
    return v;
  }
  _toHex6(v) {
    const entry = _UIInputColor._THEME_PALETTE.find((e) => e.token === v);
    if (entry) return entry.hex;
    if (/^#[0-9a-fA-F]{6}$/.test(v)) return v;
    if (/^#[0-9a-fA-F]{3}$/.test(v)) {
      return "#" + v[1] + v[1] + v[2] + v[2] + v[3] + v[3];
    }
    const parsed = _UIInputColor.parseColor(v);
    if (parsed) return _UIInputColor._hslToHex(parsed.h, parsed.s, parsed.l, 1);
    return v.startsWith("#") ? v.slice(0, 7) : v;
  }
  _openPanel() {
    if (this._open) return;
    this._open = true;
    this.setAttribute("data-open", "");
    document.addEventListener("click", this._onOutsideClick);
    requestAnimationFrame(() => {
      this._syncFromValue();
      this._drawCanvas();
      this._updateUI();
    });
  }
  _closePanel() {
    if (!this._open) return;
    this._open = false;
    this.removeAttribute("data-open");
    document.removeEventListener("click", this._onOutsideClick);
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
    const token = e.currentTarget.getAttribute("data-token");
    this._setValueFromInput(token);
  }
  _onTabClick(e) {
    e.stopPropagation();
    const tab = e.currentTarget.getAttribute("data-tab");
    this._activeTab = tab;
    this.shadowRoot.querySelectorAll(".panel-tab").forEach((t) => {
      if (t.getAttribute("data-tab") === tab) t.setAttribute("data-active", "");
      else t.removeAttribute("data-active");
    });
    const customPanel = this.shadowRoot.querySelector(".panel-custom");
    const themePanel = this.shadowRoot.querySelector(".panel-theme");
    if (themePanel) themePanel.style.display = tab === "theme" ? "block" : "none";
    if (customPanel) customPanel.style.display = tab === "custom" ? "block" : "none";
    if (tab === "custom") {
      requestAnimationFrame(() => {
        this._drawCanvas();
        this._updateUI();
      });
    }
  }
  _onFormatToggle(e) {
    e.stopPropagation();
    const modes = ["hex", "rgb", "hsl"];
    this._format = modes[(modes.indexOf(this._format) + 1) % modes.length];
    const btn = this.shadowRoot.querySelector(".format-btn");
    if (btn) btn.textContent = this._format.toUpperCase();
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
    document.addEventListener("pointermove", this._onPointerMove);
    document.addEventListener("pointerup", this._onPointerUp);
    this._handleCanvasMove(e);
  }
  _onHuePointerDown(e) {
    e.preventDefault();
    e.stopPropagation();
    this._draggingHue = true;
    document.addEventListener("pointermove", this._onPointerMove);
    document.addEventListener("pointerup", this._onPointerUp);
    this._handleHueMove(e);
  }
  _onAlphaPointerDown(e) {
    e.preventDefault();
    e.stopPropagation();
    this._draggingAlpha = true;
    document.addEventListener("pointermove", this._onPointerMove);
    document.addEventListener("pointerup", this._onPointerUp);
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
    document.removeEventListener("pointermove", this._onPointerMove);
    document.removeEventListener("pointerup", this._onPointerUp);
  }
  _handleCanvasMove(e) {
    const canvas = this.shadowRoot.querySelector(".sat-bright-canvas");
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    this._saturation = Math.round(x / rect.width * 100);
    this._brightness = Math.round((1 - y / rect.height) * 100);
    this._updateValueFromHsb();
  }
  _handleHueMove(e) {
    const wrap = this.shadowRoot.querySelector(".hue-wrap");
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    this._hue = Math.round(x / rect.width * 360);
    this._drawCanvas();
    this._updateValueFromHsb();
  }
  _handleAlphaMove(e) {
    const wrap = this.shadowRoot.querySelector(".alpha-wrap");
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    this._alpha = Math.round(x / rect.width * 100) / 100;
    this._updateValueFromHsb();
  }
  /* ── Value management ── */
  /** Update value from internal HSB + alpha state, formatted per current mode */
  _updateValueFromHsb() {
    const hsl = _UIInputColor._hsbToHsl(this._hue, this._saturation, this._brightness);
    const formatted = _UIInputColor.formatColor(hsl.h, hsl.s, hsl.l, this._alpha, this._format);
    this.value = formatted;
    this._updateUI();
    this.emit("ui-change", { value: formatted });
  }
  /** Set value from external input (text field, palette swatch, etc.) */
  _setValueFromInput(v) {
    const parsed = _UIInputColor.parseColor(v);
    if (parsed) {
      this._hue = parsed.h;
      this._alpha = parsed.a;
      const hsb = _UIInputColor._hslToHsb(parsed.h, parsed.s, parsed.l);
      this._saturation = hsb.s;
      this._brightness = hsb.b;
      this._drawCanvas();
    }
    this.value = v;
    _UIInputColor._addRecent(v);
    this._updateUI();
    this._refreshRecent();
    this.emit("ui-change", { value: v });
  }
  /** Rebuild the recent-swatches row without full re-render */
  _refreshRecent() {
    const panel = this.shadowRoot.querySelector(".panel-custom");
    if (!panel) return;
    const existing = panel.querySelector(".recent-row");
    const recent = _UIInputColor._recentColors;
    if (!recent.length) {
      if (existing) existing.remove();
      return;
    }
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    const html = `<div class="recent-row">${recent.map((c) => `<button type="button" class="recent-swatch" style="background:${c}" data-color="${esc(c)}" title="${esc(c)}" aria-label="${esc(c)}"></button>`).join("")}</div>`;
    const temp = document.createElement("div");
    temp.innerHTML = html;
    const newRow = temp.firstElementChild;
    if (existing) existing.replaceWith(newRow);
    else panel.appendChild(newRow);
    newRow.querySelectorAll(".recent-swatch").forEach((s) => {
      s.addEventListener("click", (e) => {
        e.stopPropagation();
        this._setValueFromInput(e.currentTarget.getAttribute("data-color"));
      });
    });
  }
};
customElements.define("ui-input-color", UIInputColor);

// src/components/input/date.js
var UIInputDate = class _UIInputDate extends UIComponent {
  static properties = {
    value: { type: String, default: "", reflect: true },
    placeholder: { type: String, default: "YYYY-MM-DD", reflect: true },
    name: { type: String, default: "", reflect: true },
    label: { type: String, default: "", reflect: true },
    help: { type: String, default: "", reflect: true },
    error: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    min: { type: String, default: "", reflect: true },
    max: { type: String, default: "", reflect: true },
    range: { type: Boolean, default: false, reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    required: { type: Boolean, default: false, reflect: true }
  };
  static _DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  static _MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  static styles() {
    return (
      /* css */
      `
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
    `
    );
  }
  constructor() {
    super();
    this._open = false;
    const d = /* @__PURE__ */ new Date();
    this._viewYear = d.getFullYear();
    this._viewMonth = d.getMonth();
    this._rangeStart = "";
    this._rangeEnd = "";
    this._pickingEnd = false;
    this._hoverDate = "";
    this._onTriggerClick = this._onTriggerClick.bind(this);
    this._onOutsideClick = this._onOutsideClick.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._onInputKeyDown = this._onInputKeyDown.bind(this);
    this._onClear = this._onClear.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.value) {
      if (this.range && this.value.includes(" / ")) {
        const [start] = this.value.split(" / ");
        const [y, m] = start.split("-").map(Number);
        if (y && m) {
          this._viewYear = y;
          this._viewMonth = m - 1;
        }
        this._rangeStart = start;
        this._rangeEnd = this.value.split(" / ")[1] || "";
      } else {
        const [y, m] = this.value.split("-").map(Number);
        if (y && m) {
          this._viewYear = y;
          this._viewMonth = m - 1;
        }
      }
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this._onOutsideClick);
  }
  render() {
    const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    const ph = this.range && this.placeholder === "YYYY-MM-DD" ? "Start / End" : esc(this.placeholder);
    return `
      <div class="label" part="label">
        ${esc(this.label)}<span class="req">${this.required ? " *" : ""}</span>
      </div>
      <div class="trigger" part="trigger" role="combobox" aria-expanded="false">
        <input class="date-input" part="input" type="text"
               value="${this.value ? esc(this.value) : ""}"
               placeholder="${ph}"
               ${this.disabled ? "disabled" : ""}
               ${this.name ? `name="${esc(this.name)}"` : ""}
               ${this.required ? "required" : ""}
               ${this.error ? 'aria-invalid="true"' : ""}
               aria-label="${esc(this.label || "Date")}" />
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
    const title = `${_UIInputDate._MONTHS[m]} ${y}`;
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = this._toISO(today);
    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const daysInPrev = new Date(y, m, 0).getDate();
    let cells = "";
    const dayAttrs = (iso, outside) => {
      const attrs = [];
      if (outside) attrs.push("data-outside");
      if (this._isDisabledDate(iso)) {
        attrs.push("data-disabled");
        return attrs.join(" ");
      }
      if (this.range) {
        if (iso === this._rangeStart) attrs.push("data-range-start");
        if (iso === this._rangeEnd) attrs.push("data-range-end");
        if (this._rangeStart && this._rangeEnd && iso > this._rangeStart && iso < this._rangeEnd) attrs.push("data-in-range");
        if (this._pickingEnd && this._rangeStart && this._hoverDate && !this._rangeEnd) {
          const previewStart = this._rangeStart < this._hoverDate ? this._rangeStart : this._hoverDate;
          const previewEnd = this._rangeStart < this._hoverDate ? this._hoverDate : this._rangeStart;
          if (iso >= previewStart && iso <= previewEnd) attrs.push("data-range-preview");
        }
      } else {
        if (iso === this.value) attrs.push("data-selected");
      }
      if (iso === todayStr && !attrs.includes("data-selected") && !attrs.includes("data-range-start") && !attrs.includes("data-range-end")) attrs.push("data-today");
      return attrs.join(" ");
    };
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = daysInPrev - i;
      const iso = this._toISO(new Date(y, m - 1, d));
      cells += `<button type="button" class="day" data-date="${iso}" ${dayAttrs(iso, true)}>${d}</button>`;
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = this._toISO(new Date(y, m, d));
      cells += `<button type="button" class="day" data-date="${iso}" ${dayAttrs(iso, false)}>${d}</button>`;
    }
    const totalCells = firstDay + daysInMonth;
    const remaining = (7 - totalCells % 7) % 7;
    for (let d = 1; d <= remaining; d++) {
      const iso = this._toISO(new Date(y, m + 1, d));
      cells += `<button type="button" class="day" data-date="${iso}" ${dayAttrs(iso, true)}>${d}</button>`;
    }
    let hint = "";
    if (this.range) {
      if (!this._rangeStart && !this._pickingEnd) hint = "Pick a start date";
      else if (this._pickingEnd && !this._rangeEnd) hint = "Pick an end date";
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
      <div class="weekdays">${_UIInputDate._DAYS.map((d) => `<span>${d}</span>`).join("")}</div>
      <div class="days">${cells}</div>
      <div class="range-hint" style="${hint ? "display:block" : ""}">${hint}</div>
    `;
  }
  _toISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
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
    if (sz) vars["font-size"] = sz;
    this._setDynamicVars(vars);
  }
  _attachListeners() {
    const calToggle = this.shadowRoot.querySelector(".cal-toggle");
    if (calToggle) {
      calToggle.addEventListener("click", this._onTriggerClick);
      calToggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this._onTriggerClick(e);
        }
      });
    }
    const input = this.shadowRoot.querySelector(".date-input");
    if (input) {
      input.addEventListener("change", this._onInputChange);
      input.addEventListener("keydown", this._onInputKeyDown);
    }
    const clearBtn = this.shadowRoot.querySelector(".clear-btn");
    if (clearBtn) clearBtn.addEventListener("click", this._onClear);
    this._attachPanelListeners();
  }
  _attachPanelListeners() {
    this.shadowRoot.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const action = btn.getAttribute("data-action");
        if (action === "prev-month") this._prevMonth();
        else if (action === "next-month") this._nextMonth();
      });
    });
    this.shadowRoot.querySelectorAll(".day:not([data-disabled])").forEach((d) => {
      d.addEventListener("click", (e) => {
        e.stopPropagation();
        const iso = d.getAttribute("data-date");
        this._selectDate(iso);
      });
      if (this.range && this._pickingEnd) {
        d.addEventListener("mouseenter", () => {
          this._hoverDate = d.getAttribute("data-date");
          this._updateHoverPreview();
        });
        d.addEventListener("mouseleave", () => {
          this._hoverDate = "";
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
    if (!t) return "";
    const isoMatch = t.match(/^(\d{4})[\-\/](\d{1,2})[\-\/](\d{1,2})$/);
    if (isoMatch) {
      const [, y, m, d] = isoMatch;
      return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }
    const usMatch = t.match(/^(\d{1,2})[\-\/](\d{1,2})[\-\/](\d{4})$/);
    if (usMatch) {
      const [, m, d, y] = usMatch;
      return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }
    const ts = Date.parse(t);
    if (!isNaN(ts)) return this._toISO(new Date(ts));
    return null;
  }
  _onInputChange(e) {
    const raw = e.target.value;
    if (this.range) {
      if (raw.includes("/")) {
        const parts = raw.split("/").map((s) => s.trim());
        if (parts.length === 2) {
          const start = this._parseInput(parts[0]);
          const end = this._parseInput(parts[1]);
          if (start && end && start !== null && end !== null && !this._isDisabledDate(start) && !this._isDisabledDate(end)) {
            const [s, en] = start <= end ? [start, end] : [end, start];
            this._rangeStart = s;
            this._rangeEnd = en;
            this._pickingEnd = false;
            this._hoverDate = "";
            const val = `${s} / ${en}`;
            this.value = val;
            e.target.value = val;
            this._closePanel();
            this.emit("ui-change", { value: val, start: s, end: en });
            return;
          }
        }
      }
      e.target.value = this.value;
      return;
    }
    const iso = this._parseInput(raw);
    if (iso === null) {
      e.target.value = this.value;
      return;
    }
    if (iso === "") {
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
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.dispatchEvent(new Event("change", { bubbles: true }));
    } else if (e.key === "Escape") {
      this._closePanel();
    } else if (e.key === "ArrowDown" && !this._open) {
      e.preventDefault();
      this._openPanel();
    }
  }
  _onClear(e) {
    e.stopPropagation();
    this.value = "";
    this._rangeStart = "";
    this._rangeEnd = "";
    this._pickingEnd = false;
    this._hoverDate = "";
    const input = this.shadowRoot.querySelector(".date-input");
    if (input) input.value = "";
    this._closePanel();
    if (this.range) {
      this.emit("ui-change", { value: "", start: "", end: "" });
    } else {
      this.emit("ui-change", { value: "" });
    }
  }
  _selectDate(iso) {
    if (this._isDisabledDate(iso)) return;
    if (this.range) {
      this._selectRangeDate(iso);
      return;
    }
    this.value = iso;
    const [y, m] = iso.split("-").map(Number);
    this._viewYear = y;
    this._viewMonth = m - 1;
    const input = this.shadowRoot.querySelector(".date-input");
    if (input) input.value = iso;
    this._closePanel();
    this.emit("ui-change", { value: iso });
  }
  _selectRangeDate(iso) {
    if (!this._pickingEnd) {
      this._rangeStart = iso;
      this._rangeEnd = "";
      this._pickingEnd = true;
      this._hoverDate = "";
      this.value = "";
      const input2 = this.shadowRoot.querySelector(".date-input");
      if (input2) input2.value = "";
      this._refreshPanel();
      return;
    }
    let start = this._rangeStart;
    let end = iso;
    if (start > end) {
      [start, end] = [end, start];
    }
    this._rangeStart = start;
    this._rangeEnd = end;
    this._pickingEnd = false;
    this._hoverDate = "";
    const val = `${start} / ${end}`;
    this.value = val;
    const [ey, em] = end.split("-").map(Number);
    this._viewYear = ey;
    this._viewMonth = em - 1;
    const input = this.shadowRoot.querySelector(".date-input");
    if (input) input.value = val;
    this._closePanel();
    this.emit("ui-change", { value: val, start, end });
  }
  _prevMonth() {
    this._viewMonth--;
    if (this._viewMonth < 0) {
      this._viewMonth = 11;
      this._viewYear--;
    }
    this._refreshPanel();
  }
  _nextMonth() {
    this._viewMonth++;
    if (this._viewMonth > 11) {
      this._viewMonth = 0;
      this._viewYear++;
    }
    this._refreshPanel();
  }
  _refreshPanel() {
    const panel = this.shadowRoot.querySelector(".panel");
    if (panel) {
      panel.innerHTML = this._renderCalendar();
      this._attachPanelListeners();
    }
  }
  /** Toggle data-range-preview on existing day elements without replacing DOM. */
  _updateHoverPreview() {
    this.shadowRoot.querySelectorAll(".day[data-date]").forEach((d) => {
      const iso = d.getAttribute("data-date");
      d.removeAttribute("data-range-preview");
      if (this._pickingEnd && this._rangeStart && this._hoverDate && !this._rangeEnd) {
        const pStart = this._rangeStart < this._hoverDate ? this._rangeStart : this._hoverDate;
        const pEnd = this._rangeStart < this._hoverDate ? this._hoverDate : this._rangeStart;
        if (iso >= pStart && iso <= pEnd) d.setAttribute("data-range-preview", "");
      }
    });
  }
  _openPanel() {
    if (this._open) return;
    this._open = true;
    this.setAttribute("data-open", "");
    const trigger = this.shadowRoot.querySelector(".trigger");
    if (trigger) trigger.setAttribute("aria-expanded", "true");
    if (this.range && this._rangeStart && this._rangeEnd) {
      this._pickingEnd = false;
      this._hoverDate = "";
    }
    this._refreshPanel();
    document.addEventListener("click", this._onOutsideClick);
  }
  _closePanel() {
    if (!this._open) return;
    this._open = false;
    this.removeAttribute("data-open");
    const trigger = this.shadowRoot.querySelector(".trigger");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
    if (this.range && this._pickingEnd && !this._rangeEnd) {
      this._rangeStart = "";
      this._pickingEnd = false;
      this._hoverDate = "";
    }
    document.removeEventListener("click", this._onOutsideClick);
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
  focus() {
    this.shadowRoot?.querySelector(".date-input")?.focus();
  }
  blur() {
    this.shadowRoot?.querySelector(".date-input")?.blur();
  }
};
customElements.define("ui-input-date", UIInputDate);

// src/components/input/number.js
var UIInputNumber = class extends UIComponent {
  static properties = {
    value: { type: Number, default: 0, reflect: true },
    min: { type: Number, default: -Infinity, reflect: true },
    max: { type: Number, default: Infinity, reflect: true },
    step: { type: Number, default: 1, reflect: true },
    placeholder: { type: String, default: "", reflect: true },
    name: { type: String, default: "", reflect: true },
    label: { type: String, default: "", reflect: true },
    help: { type: String, default: "", reflect: true },
    error: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    readonly: { type: Boolean, default: false, reflect: true },
    required: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
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
        align-items: stretch;
        border: 1px solid var(--_border, var(--ui-border-color, #d1d5db));
        border-radius: var(--ui-radius, 0.375em);
        overflow: hidden;
        background: var(--_bg, var(--ui-bg, #fff));
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      .wrapper:hover { border-color: #9ca3af; }
      .wrapper:focus-within {
        border-color: var(--ui-focus-ring, #6366f1);
        box-shadow: 0 0 0 0.15em rgba(99, 102, 241, 0.25);
      }
      :host([error]) .wrapper { border-color: var(--ui-red-500, #ef4444); }
      :host([error]) .wrapper:focus-within { box-shadow: 0 0 0 0.15em rgba(239, 68, 68, 0.25); }

      .step-btn {
        display: flex; align-items: center; justify-content: center;
        width: 2.2em;
        background: var(--ui-bg-subtle, #f3f4f6);
        border: none;
        cursor: pointer;
        color: var(--ui-text-color, #374151);
        font-size: 1em;
        padding: 0;
        transition: background-color 0.1s ease;
        flex-shrink: 0;
        user-select: none;
      }
      .step-btn:hover { background: var(--ui-border-color, #e5e7eb); }
      .step-btn:active { background: var(--ui-border-color, #d1d5db); }
      .step-btn[data-disabled] { opacity: 0.3; pointer-events: none; }
      .step-btn svg {
        width: 0.85em; height: 0.85em;
        fill: none; stroke: currentColor;
        stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round;
      }

      .input {
        flex: 1;
        min-width: 0;
        text-align: center;
        border: none;
        outline: none;
        background: transparent;
        font-family: inherit;
        font-size: inherit;
        color: var(--_color, var(--ui-text-color, #111827));
        padding: 0.45em 0.35em;
        -moz-appearance: textfield;
      }
      .input::-webkit-inner-spin-button,
      .input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
      .input::placeholder { color: var(--ui-text-muted, #9ca3af); }

      .help, .error-msg { display: none; font-size: 0.8em; margin-top: 0.3em; }
      .help { color: var(--ui-text-muted, #6b7280); }
      .error-msg { color: var(--ui-red-500, #ef4444); }
      :host([help]) .help       { display: block; }
      :host([error]) .error-msg { display: block; }
      :host([error]) .help      { display: none; }
    `
    );
  }
  constructor() {
    super();
    this._onInputChange = this._onInputChange.bind(this);
    this._onInputBlur = this._onInputBlur.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }
  render() {
    const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    const atMin = this.value <= this.min;
    const atMax = this.value >= this.max;
    return `
      <div class="label" part="label">
        ${esc(this.label)}<span class="req">${this.required ? " *" : ""}</span>
      </div>
      <div class="wrapper" part="wrapper">
        <button type="button" class="step-btn decrement" part="decrement" aria-label="Decrease" ${atMin ? "data-disabled" : ""}>
          <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <input class="input" part="input" type="number"
               value="${this.value}"
               ${this.placeholder ? `placeholder="${esc(this.placeholder)}"` : ""}
               ${this.name ? `name="${esc(this.name)}"` : ""}
               ${isFinite(this.min) ? `min="${this.min}"` : ""}
               ${isFinite(this.max) ? `max="${this.max}"` : ""}
               step="${this.step}"
               ${this.disabled ? "disabled" : ""}
               ${this.readonly ? "readonly" : ""}
               ${this.required ? "required" : ""}
               ${this.error ? 'aria-invalid="true"' : ""}
               ${this.label ? `aria-label="${esc(this.label)}"` : ""} />
        <button type="button" class="step-btn increment" part="increment" aria-label="Increase" ${atMax ? "data-disabled" : ""}>
          <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
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
    if (sz) vars["font-size"] = sz;
    if (this.background) {
      const bg = resolveColor(this.background);
      if (bg) vars["--_bg"] = bg;
    }
    if (this.color) {
      const c = resolveColor(this.color);
      if (c) vars["--_color"] = c;
    }
    this._setDynamicVars(vars);
  }
  _attachListeners() {
    const input = this.shadowRoot.querySelector(".input");
    const dec = this.shadowRoot.querySelector(".decrement");
    const inc = this.shadowRoot.querySelector(".increment");
    if (input) {
      input.addEventListener("input", this._onInputChange);
      input.addEventListener("blur", this._onInputBlur);
      input.addEventListener("keydown", this._onKeyDown);
    }
    if (dec) dec.addEventListener("click", (e) => {
      e.preventDefault();
      this._step(-1);
    });
    if (inc) inc.addEventListener("click", (e) => {
      e.preventDefault();
      this._step(1);
    });
  }
  _step(dir) {
    if (this.readonly) return;
    let v = this.value + this.step * dir;
    v = this._clamp(v);
    const decimals = (String(this.step).split(".")[1] || "").length;
    v = Number(v.toFixed(decimals));
    this.value = v;
    this._syncInput();
    this.emit("ui-input", { value: v });
    this.emit("ui-change", { value: v });
  }
  _clamp(v) {
    if (isFinite(this.min) && v < this.min) v = this.min;
    if (isFinite(this.max) && v > this.max) v = this.max;
    return v;
  }
  _syncInput() {
    const input = this.shadowRoot.querySelector(".input");
    if (input && Number(input.value) !== this.value) input.value = this.value;
    const dec = this.shadowRoot.querySelector(".decrement");
    const inc = this.shadowRoot.querySelector(".increment");
    if (dec) {
      if (this.value <= this.min) dec.setAttribute("data-disabled", "");
      else dec.removeAttribute("data-disabled");
    }
    if (inc) {
      if (this.value >= this.max) inc.setAttribute("data-disabled", "");
      else inc.removeAttribute("data-disabled");
    }
  }
  _onInputChange(e) {
    const raw = e.target.value;
    if (raw === "" || raw === "-") return;
    const v = this._clamp(Number(raw));
    this.emit("ui-input", { value: v });
  }
  _onInputBlur(e) {
    let v = Number(e.target.value);
    if (isNaN(v)) v = isFinite(this.min) ? this.min : 0;
    v = this._clamp(v);
    this.value = v;
    this._syncInput();
    this.emit("ui-change", { value: v });
  }
  _onKeyDown(e) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      this._step(1);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      this._step(-1);
    }
  }
  focus() {
    this.shadowRoot?.querySelector(".input")?.focus();
  }
  blur() {
    this.shadowRoot?.querySelector(".input")?.blur();
  }
};
customElements.define("ui-input-number", UIInputNumber);

// src/components/input/rating.js
var UIInputRating = class extends UIComponent {
  static properties = {
    value: { type: Number, default: 0, reflect: true },
    max: { type: Number, default: 5, reflect: true },
    name: { type: String, default: "", reflect: true },
    label: { type: String, default: "", reflect: true },
    help: { type: String, default: "", reflect: true },
    error: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    color: { type: String, default: "amber-400", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    readonly: { type: Boolean, default: false, reflect: true },
    required: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
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

      .stars {
        display: inline-flex;
        gap: 0.15em;
      }
      :host(:not([readonly]):not([disabled])) .stars { cursor: pointer; }

      .star {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        padding: 0.1em;
        cursor: inherit;
        color: var(--ui-border-color, #d1d5db);
        transition: color 0.15s ease, transform 0.1s ease;
      }
      .star svg {
        width: 1.4em; height: 1.4em;
        stroke-width: 1.5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .star[data-active] { color: var(--_star-color, var(--ui-amber-400, #fbbf24)); }
      .star[data-active] svg { fill: currentColor; stroke: currentColor; }
      .star:not([data-active]) svg { fill: none; stroke: currentColor; }
      :host(:not([readonly]):not([disabled])) .star:hover { transform: scale(1.2); }
      :host(:not([readonly]):not([disabled])) .star[data-hover] { color: var(--_star-color, var(--ui-amber-400, #fbbf24)); }
      :host(:not([readonly]):not([disabled])) .star[data-hover] svg { fill: currentColor; stroke: currentColor; }

      .help, .error-msg { display: none; font-size: 0.8em; margin-top: 0.3em; }
      .help { color: var(--ui-text-muted, #6b7280); }
      .error-msg { color: var(--ui-red-500, #ef4444); }
      :host([help]) .help       { display: block; }
      :host([error]) .error-msg { display: block; }
      :host([error]) .help      { display: none; }
    `
    );
  }
  constructor() {
    super();
    this._hoverValue = 0;
  }
  render() {
    const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const starSVG = `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    let stars = "";
    for (let i = 1; i <= this.max; i++) {
      const active = i <= this.value ? "data-active" : "";
      stars += `<button type="button" class="star" data-value="${i}" ${active} aria-label="Rate ${i} of ${this.max}" role="radio" aria-checked="${i <= this.value}">${starSVG}</button>`;
    }
    return `
      <div class="label" part="label">
        ${esc(this.label)}<span class="req">${this.required ? " *" : ""}</span>
      </div>
      <div class="stars" part="stars" role="radiogroup" aria-label="${esc(this.label || "Rating")}">${stars}</div>
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
    if (sz) vars["font-size"] = sz;
    if (this.color) {
      const c = resolveColor(this.color);
      if (c) vars["--_star-color"] = c;
    }
    this._setDynamicVars(vars);
  }
  _attachListeners() {
    if (this.readonly || this.disabled) return;
    this.shadowRoot.querySelectorAll(".star").forEach((star) => {
      star.addEventListener("click", (e) => {
        const v = Number(star.getAttribute("data-value"));
        this.value = v === this.value ? 0 : v;
        this.emit("ui-change", { value: this.value });
      });
      star.addEventListener("mouseenter", () => {
        const v = Number(star.getAttribute("data-value"));
        this._hoverValue = v;
        this._updateHover();
      });
      star.addEventListener("mouseleave", () => {
        this._hoverValue = 0;
        this._updateHover();
      });
    });
  }
  _updateHover() {
    this.shadowRoot.querySelectorAll(".star").forEach((star) => {
      const v = Number(star.getAttribute("data-value"));
      if (this._hoverValue > 0 && v <= this._hoverValue) {
        star.setAttribute("data-hover", "");
      } else {
        star.removeAttribute("data-hover");
      }
    });
  }
};
customElements.define("ui-input-rating", UIInputRating);

// src/components/input/otp.js
var UIInputOTP = class extends UIComponent {
  static properties = {
    length: { type: Number, default: 6, reflect: true },
    value: { type: String, default: "", reflect: true },
    name: { type: String, default: "", reflect: true },
    label: { type: String, default: "", reflect: true },
    help: { type: String, default: "", reflect: true },
    error: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    required: { type: Boolean, default: false, reflect: true },
    masked: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
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

      .boxes {
        display: inline-flex;
        gap: 0.4em;
      }

      .box {
        width: 2.4em; height: 2.8em;
        text-align: center;
        border: 1.5px solid var(--_border, var(--ui-border-color, #d1d5db));
        border-radius: var(--ui-radius, 0.375em);
        background: var(--_bg, var(--ui-bg, #fff));
        color: var(--ui-text-color, #111827);
        font-family: var(--ui-font-mono, monospace);
        font-size: 1.2em;
        font-weight: 600;
        outline: none;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
        caret-color: var(--ui-focus-ring, #6366f1);
      }
      .box:focus {
        border-color: var(--ui-focus-ring, #6366f1);
        box-shadow: 0 0 0 0.15em rgba(99, 102, 241, 0.25);
      }
      :host([error]) .box { border-color: var(--ui-red-500, #ef4444); }
      :host([error]) .box:focus { box-shadow: 0 0 0 0.15em rgba(239, 68, 68, 0.25); }

      .box[data-filled] {
        border-color: var(--ui-focus-ring, #6366f1);
      }

      .help, .error-msg { display: none; font-size: 0.8em; margin-top: 0.3em; }
      .help { color: var(--ui-text-muted, #6b7280); }
      .error-msg { color: var(--ui-red-500, #ef4444); }
      :host([help]) .help       { display: block; }
      :host([error]) .error-msg { display: block; }
      :host([error]) .help      { display: none; }
    `
    );
  }
  constructor() {
    super();
    this._onInput = this._onInput.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onPaste = this._onPaste.bind(this);
    this._onFocus = this._onFocus.bind(this);
  }
  render() {
    const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const chars = this.value.split("");
    let boxes = "";
    for (let i = 0; i < this.length; i++) {
      const char = chars[i] || "";
      const filled = char ? "data-filled" : "";
      const inputType = this.masked ? "password" : "text";
      boxes += `<input class="box" type="${inputType}" maxlength="1" value="${char}"
                  data-index="${i}" ${filled}
                  inputmode="numeric" pattern="[0-9]*" autocomplete="one-time-code"
                  ${this.disabled ? "disabled" : ""}
                  aria-label="Digit ${i + 1} of ${this.length}" />`;
    }
    return `
      <div class="label" part="label">
        ${esc(this.label)}<span class="req">${this.required ? " *" : ""}</span>
      </div>
      <div class="boxes" part="boxes" role="group" aria-label="${esc(this.label || "OTP input")}">${boxes}</div>
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
    if (sz) vars["font-size"] = sz;
    if (this.background) {
      const bg = resolveColor(this.background);
      if (bg) vars["--_bg"] = bg;
    }
    this._setDynamicVars(vars);
  }
  _attachListeners() {
    this.shadowRoot.querySelectorAll(".box").forEach((box) => {
      box.addEventListener("input", this._onInput);
      box.addEventListener("keydown", this._onKeyDown);
      box.addEventListener("paste", this._onPaste);
      box.addEventListener("focus", this._onFocus);
    });
  }
  _getBoxes() {
    return Array.from(this.shadowRoot.querySelectorAll(".box"));
  }
  _collectValue() {
    return this._getBoxes().map((b) => b.value).join("");
  }
  _onInput(e) {
    const box = e.target;
    const idx = Number(box.getAttribute("data-index"));
    if (box.value.length > 1) box.value = box.value.slice(-1);
    if (box.value) box.setAttribute("data-filled", "");
    else box.removeAttribute("data-filled");
    this.value = this._collectValue();
    this.emit("ui-input", { value: this.value });
    if (box.value && idx < this.length - 1) {
      this._getBoxes()[idx + 1]?.focus();
    }
    if (this.value.length === this.length) {
      this.emit("ui-complete", { value: this.value });
    }
  }
  _onKeyDown(e) {
    const box = e.target;
    const idx = Number(box.getAttribute("data-index"));
    const boxes = this._getBoxes();
    if (e.key === "Backspace") {
      if (!box.value && idx > 0) {
        boxes[idx - 1].value = "";
        boxes[idx - 1].removeAttribute("data-filled");
        boxes[idx - 1].focus();
        this.value = this._collectValue();
        this.emit("ui-input", { value: this.value });
        e.preventDefault();
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      boxes[idx - 1].focus();
      e.preventDefault();
    } else if (e.key === "ArrowRight" && idx < this.length - 1) {
      boxes[idx + 1].focus();
      e.preventDefault();
    }
  }
  _onPaste(e) {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text").trim();
    const chars = text.replace(/\D/g, "").slice(0, this.length).split("");
    const boxes = this._getBoxes();
    chars.forEach((ch, i) => {
      if (boxes[i]) {
        boxes[i].value = ch;
        if (ch) boxes[i].setAttribute("data-filled", "");
      }
    });
    this.value = this._collectValue();
    this.emit("ui-input", { value: this.value });
    const nextIdx = Math.min(chars.length, this.length - 1);
    boxes[nextIdx]?.focus();
    if (this.value.length === this.length) {
      this.emit("ui-complete", { value: this.value });
    }
  }
  _onFocus(e) {
    e.target.select();
  }
  focus() {
    this._getBoxes()[0]?.focus();
  }
  blur() {
    this.shadowRoot?.activeElement?.blur();
  }
};
customElements.define("ui-input-otp", UIInputOTP);

// src/components/input/tags.js
var UIInputTags = class extends UIComponent {
  static properties = {
    value: { type: String, default: "", reflect: true },
    placeholder: { type: String, default: "Add\u2026", reflect: true },
    name: { type: String, default: "", reflect: true },
    label: { type: String, default: "", reflect: true },
    help: { type: String, default: "", reflect: true },
    error: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "indigo-100", reflect: true },
    max: { type: Number, default: 0, reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    required: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
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
    `
    );
  }
  constructor() {
    super();
    this._tags = [];
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onInput = this._onInput.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this._syncTagsFromValue();
  }
  _syncTagsFromValue() {
    if (this.value) {
      this._tags = this.value.split(",").map((t) => t.trim()).filter(Boolean);
    } else {
      this._tags = [];
    }
  }
  get tags() {
    return [...this._tags];
  }
  render() {
    const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    const removeSVG = `<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    const tagHTML = this._tags.map((t, i) => `
      <span class="tag" part="tag" data-index="${i}">
        <span class="tag-text">${esc(t)}</span>
        <button type="button" class="tag-remove" data-index="${i}" aria-label="Remove ${esc(t)}" tabindex="-1">${removeSVG}</button>
      </span>
    `).join("");
    const atMax = this.max > 0 && this._tags.length >= this.max;
    return `
      <div class="label" part="label">
        ${esc(this.label)}<span class="req">${this.required ? " *" : ""}</span>
      </div>
      <div class="wrapper" part="wrapper">
        ${tagHTML}
        ${atMax ? "" : `<input class="input" part="input" type="text" placeholder="${esc(this.placeholder)}" ${this.disabled ? "disabled" : ""} />`}
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
    if (sz) vars["font-size"] = sz;
    if (this.background) {
      const bg = resolveColor(this.background);
      if (bg) vars["--_bg"] = bg;
    }
    if (this.color) {
      const c = resolveColor(this.color);
      if (c) vars["--_tag-color"] = c;
    }
    this._setDynamicVars(vars);
  }
  _attachListeners() {
    const input = this.shadowRoot.querySelector(".input");
    if (input) {
      input.addEventListener("keydown", this._onKeyDown);
      input.addEventListener("input", this._onInput);
    }
    const wrapper = this.shadowRoot.querySelector(".wrapper");
    if (wrapper) {
      wrapper.addEventListener("click", () => {
        this.shadowRoot.querySelector(".input")?.focus();
      });
    }
    this.shadowRoot.querySelectorAll(".tag-remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = Number(btn.getAttribute("data-index"));
        this._removeTag(idx);
      });
    });
  }
  _onKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const input = e.target;
      this._addTag(input.value);
      input.value = "";
    } else if (e.key === "Backspace" && !e.target.value && this._tags.length > 0) {
      this._removeTag(this._tags.length - 1);
    }
  }
  _onInput(e) {
    const val = e.target.value;
    if (val.includes(",")) {
      const parts = val.split(",").map((s) => s.trim()).filter(Boolean);
      parts.forEach((p) => this._addTag(p));
      e.target.value = "";
    }
  }
  _addTag(text) {
    const t = text.trim();
    if (!t) return;
    if (this._tags.includes(t)) return;
    if (this.max > 0 && this._tags.length >= this.max) return;
    this._tags.push(t);
    this._syncValue();
  }
  _removeTag(idx) {
    this._tags.splice(idx, 1);
    this._syncValue();
  }
  _syncValue() {
    this.value = this._tags.join(", ");
    this.emit("ui-change", { value: this.value, tags: [...this._tags] });
  }
  focus() {
    this.shadowRoot?.querySelector(".input")?.focus();
  }
  blur() {
    this.shadowRoot?.querySelector(".input")?.blur();
  }
};
customElements.define("ui-input-tags", UIInputTags);

// src/components/form/form.js
var UIForm = class extends UIComponent {
  static properties = {
    name: { type: String, default: "", reflect: true },
    action: { type: String, default: "", reflect: true },
    method: { type: String, default: "POST", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    loading: { type: Boolean, default: false, reflect: true },
    novalidate: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
      }
      :host([disabled]) { opacity: 0.6; pointer-events: none; }
      :host([loading])  { opacity: 0.6; pointer-events: none; }
    `
    );
  }
  constructor() {
    super();
    this._onSubmitEvent = this._onSubmitEvent.bind(this);
  }
  render() {
    return `<slot></slot>`;
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this._onSubmitEvent);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._onSubmitEvent);
  }
  _onSubmitEvent(e) {
    const btn = e.target.closest('ui-button[type="submit"]');
    if (!btn) return;
    e.preventDefault();
    this.submit();
  }
  /**
   * Returns all named ui-input-* children inside this form.
   */
  _getInputs() {
    return Array.from(this.querySelectorAll("[name]")).filter(
      (el) => el.tagName && el.tagName.startsWith("UI-INPUT")
    );
  }
  /**
   * Collects all named input values as a plain object.
   * @returns {Object} key–value map
   */
  getValues() {
    const values = {};
    for (const input of this._getInputs()) {
      const name = input.getAttribute("name");
      if (!name) continue;
      if (input.tagName === "UI-INPUT-CHECKBOX" || input.tagName === "UI-INPUT-SWITCH") {
        values[name] = input.checked ?? input.hasAttribute("checked");
      } else {
        values[name] = input.value ?? input.getAttribute("value") ?? "";
      }
    }
    return values;
  }
  /**
   * Returns a FormData instance populated with input values.
   * @returns {FormData}
   */
  getFormData() {
    const fd = new FormData();
    const values = this.getValues();
    for (const [k, v] of Object.entries(values)) {
      fd.append(k, String(v));
    }
    return fd;
  }
  /**
   * Validate all required inputs. Returns array of error objects.
   * @returns {Array<{name: string, element: Element, message: string}>}
   */
  validate() {
    const errors = [];
    for (const input of this._getInputs()) {
      const name = input.getAttribute("name");
      if (!input.hasAttribute("required")) continue;
      let empty = false;
      if (input.tagName === "UI-INPUT-CHECKBOX" || input.tagName === "UI-INPUT-SWITCH") {
        empty = !(input.checked ?? input.hasAttribute("checked"));
      } else {
        const val = input.value ?? input.getAttribute("value") ?? "";
        empty = val === "" || val === null || val === void 0;
      }
      if (empty) {
        const label = input.getAttribute("label") || name;
        const msg = `${label} is required`;
        errors.push({ name, element: input, message: msg });
        input.setAttribute("error", msg);
      } else {
        if (input.hasAttribute("error")) {
          const errVal = input.getAttribute("error");
          if (errVal.endsWith("is required")) input.removeAttribute("error");
        }
      }
    }
    return errors;
  }
  /**
   * Submit the form. Validates first unless `novalidate` is set.
   * If `action` is set, automatically sends JSON to the server.
   * @returns {boolean} true if submitted successfully (validation passed)
   */
  submit() {
    if (!this.novalidate) {
      const errors = this.validate();
      if (errors.length > 0) {
        this.emit("ui-invalid", { errors });
        errors[0]?.element?.focus?.();
        return false;
      }
    }
    const values = this.getValues();
    this.emit("ui-submit", { values, formData: this.getFormData() });
    if (this.action) this._sendJson(this.action, this.method);
    return true;
  }
  /**
   * Validate and send form values as JSON to a URL.
   * @param {string} [url] - Target URL (falls back to `action` attribute)
   * @param {Object} [options] - Fetch options override (method, headers, etc.)
   * @returns {Promise<{ok: boolean, status?: number, data?: any, values?: Object, error?: Error}>}
   */
  async submitJson(url, options = {}) {
    if (!this.novalidate) {
      const errors = this.validate();
      if (errors.length > 0) {
        this.emit("ui-invalid", { errors });
        errors[0]?.element?.focus?.();
        return { ok: false, errors };
      }
    }
    return this._sendJson(
      url || this.action,
      options.method || this.method,
      options
    );
  }
  /**
   * Internal: sends collected values as JSON via fetch.
   * Sets `loading` during the request and emits `ui-response` or `ui-error`.
   * @param {string} url - Target URL
   * @param {string} [method] - HTTP method (default POST)
   * @param {Object} [options] - Extra fetch options (headers, etc.)
   * @returns {Promise<{ok: boolean, status?: number, data?: any, values: Object}>}
   */
  async _sendJson(url, method = "POST", options = {}) {
    if (!url) {
      const err = new Error("No URL provided. Set the action attribute or pass a URL.");
      this.emit("ui-error", { ok: false, error: err, message: err.message });
      return { ok: false, error: err };
    }
    const values = this.getValues();
    this.loading = true;
    try {
      const resp = await fetch(url, {
        method: (method || "POST").toUpperCase(),
        headers: {
          "Content-Type": "application/json",
          ...options.headers || {}
        },
        body: JSON.stringify(values)
      });
      let data = null;
      const ct = resp.headers.get("content-type") || "";
      if (ct.includes("json")) {
        data = await resp.json();
      } else {
        data = await resp.text();
      }
      const result = { ok: resp.ok, status: resp.status, data, values };
      if (resp.ok) {
        this.emit("ui-response", result);
      } else {
        this.emit("ui-error", result);
      }
      return result;
    } catch (err) {
      const result = { ok: false, error: err, message: err.message, values };
      this.emit("ui-error", result);
      return result;
    } finally {
      this.loading = false;
    }
  }
  /**
   * Reset all inputs to their default values and clear errors.
   */
  reset() {
    for (const input of this._getInputs()) {
      if (input.hasAttribute("error")) {
        const errVal = input.getAttribute("error");
        if (errVal.endsWith("is required")) input.removeAttribute("error");
      }
      if (input.tagName === "UI-INPUT-CHECKBOX" || input.tagName === "UI-INPUT-SWITCH") {
        input.checked = false;
        input.removeAttribute("checked");
      } else if (input.tagName === "UI-INPUT-RATING") {
        input.value = 0;
      } else if (input.tagName === "UI-INPUT-NUMBER") {
        const resetMin = Number(input.getAttribute("min"));
        input.value = isFinite(resetMin) ? resetMin : 0;
      } else {
        input.value = "";
        input.setAttribute("value", "");
      }
    }
    this.emit("ui-reset");
  }
};
customElements.define("ui-form", UIForm);

// src/components/layout/stack.js
var UILayoutStack = class _UILayoutStack extends UIComponent {
  static properties = {
    direction: { type: String, default: "", reflect: true },
    horizontal: { type: Boolean, default: false, reflect: true },
    gap: { type: String, default: "", reflect: true },
    align: { type: String, default: "", reflect: true },
    justify: { type: String, default: "", reflect: true },
    wrap: { type: Boolean, default: false, reflect: true },
    inline: { type: Boolean, default: false, reflect: true },
    reverse: { type: Boolean, default: false, reflect: true },
    padding: { type: String, default: "", reflect: true },
    width: { type: String, default: "", reflect: true },
    height: { type: String, default: "", reflect: true },
    grow: { type: Boolean, default: false, reflect: true },
    center: { type: Boolean, default: false, reflect: true },
    full: { type: Boolean, default: false, reflect: true }
  };
  /** Map shorthand justify values → CSS values. */
  static _justifyMap = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly"
  };
  /** Map shorthand align values → CSS values. */
  static _alignMap = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    stretch: "stretch",
    baseline: "baseline"
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }
      :host([inline]) { display: inline-flex; }
      :host([horizontal]) { flex-direction: row; }
      :host([wrap]) { flex-wrap: wrap; }
      :host([grow]) { flex: 1 1 auto; }
      :host([full]) { width: 100%; height: 100%; }
      :host([reverse]:not([horizontal])) { flex-direction: column-reverse; }
      :host([reverse][horizontal]) { flex-direction: row-reverse; }
    `
    );
  }
  render() {
    return "<slot></slot>";
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyLayout();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyLayout();
  }
  _applyLayout() {
    const vars = {};
    if (this.direction) vars["flex-direction"] = this.direction;
    if (this.gap) {
      const g = resolveSize(this.gap);
      vars["gap"] = g || this.gap;
    }
    const alignVal = this.center ? "center" : this.align;
    if (alignVal) vars["align-items"] = _UILayoutStack._alignMap[alignVal] || alignVal;
    const justifyVal = this.center ? "center" : this.justify;
    if (justifyVal) vars["justify-content"] = _UILayoutStack._justifyMap[justifyVal] || justifyVal;
    if (this.padding) {
      const p = resolveSize(this.padding);
      vars["padding"] = p || this.padding;
    }
    if (this.width) vars["width"] = this.width;
    if (this.height) vars["height"] = this.height;
    this._setDynamicVars(vars);
  }
};
customElements.define("ui-layout-stack", UILayoutStack);

// src/components/layout/grid.js
var UILayoutGrid = class _UILayoutGrid extends UIComponent {
  static properties = {
    columns: { type: String, default: "", reflect: true },
    rows: { type: String, default: "", reflect: true },
    gap: { type: String, default: "", reflect: true },
    columnGap: { type: String, default: "", reflect: true, attribute: "column-gap" },
    rowGap: { type: String, default: "", reflect: true, attribute: "row-gap" },
    align: { type: String, default: "", reflect: true },
    justify: { type: String, default: "", reflect: true },
    alignContent: { type: String, default: "", reflect: true, attribute: "align-content" },
    justifyContent: { type: String, default: "", reflect: true, attribute: "justify-content" },
    flow: { type: String, default: "", reflect: true },
    autoRows: { type: String, default: "", reflect: true, attribute: "auto-rows" },
    autoCols: { type: String, default: "", reflect: true, attribute: "auto-cols" },
    areas: { type: String, default: "", reflect: true },
    inline: { type: Boolean, default: false, reflect: true },
    padding: { type: String, default: "", reflect: true },
    width: { type: String, default: "", reflect: true },
    height: { type: String, default: "", reflect: true },
    full: { type: Boolean, default: false, reflect: true },
    minColWidth: { type: String, default: "", reflect: true, attribute: "min-col-width" }
  };
  /** Map shorthand content-distribution values → CSS. */
  static _contentMap = {
    start: "start",
    center: "center",
    end: "end",
    stretch: "stretch",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly"
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: grid;
        box-sizing: border-box;
      }
      :host([inline]) { display: inline-grid; }
      :host([full]) { width: 100%; height: 100%; }
    `
    );
  }
  render() {
    return "<slot></slot>";
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyLayout();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyLayout();
  }
  /**
   * Resolve a columns/rows value.
   * - Pure integer → `repeat(N, 1fr)`
   * - Otherwise pass through as raw CSS grid-template value.
   */
  _resolveTemplate(val) {
    if (!val) return void 0;
    const n = Number(val);
    if (Number.isInteger(n) && n > 0) return `repeat(${n}, 1fr)`;
    return val;
  }
  _applyLayout() {
    const vars = {};
    if (this.minColWidth) {
      vars["grid-template-columns"] = `repeat(auto-fill, minmax(${this.minColWidth}, 1fr))`;
    } else if (this.columns) {
      vars["grid-template-columns"] = this._resolveTemplate(this.columns);
    }
    if (this.rows) vars["grid-template-rows"] = this._resolveTemplate(this.rows);
    if (this.gap) {
      const g = resolveSize(this.gap);
      vars["gap"] = g || this.gap;
    }
    if (this.columnGap) {
      const g = resolveSize(this.columnGap);
      vars["column-gap"] = g || this.columnGap;
    }
    if (this.rowGap) {
      const g = resolveSize(this.rowGap);
      vars["row-gap"] = g || this.rowGap;
    }
    if (this.align) vars["align-items"] = this.align;
    if (this.justify) vars["justify-items"] = this.justify;
    if (this.alignContent) {
      vars["align-content"] = _UILayoutGrid._contentMap[this.alignContent] || this.alignContent;
    }
    if (this.justifyContent) {
      vars["justify-content"] = _UILayoutGrid._contentMap[this.justifyContent] || this.justifyContent;
    }
    if (this.flow) vars["grid-auto-flow"] = this.flow;
    if (this.autoRows) vars["grid-auto-rows"] = this.autoRows;
    if (this.autoCols) vars["grid-auto-columns"] = this.autoCols;
    if (this.areas) {
      const rows = this.areas.split("|").map((r) => `"${r.trim()}"`).join(" ");
      vars["grid-template-areas"] = rows;
    }
    if (this.padding) {
      const p = resolveSize(this.padding);
      vars["padding"] = p || this.padding;
    }
    if (this.width) vars["width"] = this.width;
    if (this.height) vars["height"] = this.height;
    this._setDynamicVars(vars);
  }
};
customElements.define("ui-layout-grid", UILayoutGrid);

// src/components/layout/container.js
var UILayoutContainer = class _UILayoutContainer extends UIComponent {
  static properties = {
    maxWidth: { type: String, default: "", reflect: true, attribute: "max-width" },
    padding: { type: String, default: "", reflect: true },
    align: { type: String, default: "", reflect: true },
    width: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true }
  };
  /** Named container size presets. */
  static _sizeMap = {
    small: "640px",
    medium: "960px",
    large: "1200px",
    "x-large": "1400px",
    full: "100%"
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        box-sizing: border-box;
        width: 100%;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
        padding: 0 1.5em;
      }
    `
    );
  }
  render() {
    return "<slot></slot>";
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyLayout();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyLayout();
  }
  _applyLayout() {
    const vars = {};
    if (this.maxWidth) {
      vars["max-width"] = this.maxWidth;
    } else if (this.size) {
      const preset = _UILayoutContainer._sizeMap[this.size.toLowerCase()];
      if (preset) vars["max-width"] = preset;
    }
    if (this.padding) {
      const p = resolveSize(this.padding);
      vars["padding"] = p || this.padding;
    }
    if (this.width) vars["width"] = this.width;
    if (this.align === "left") {
      vars["margin-left"] = "0";
      vars["margin-right"] = "auto";
    } else if (this.align === "right") {
      vars["margin-left"] = "auto";
      vars["margin-right"] = "0";
    }
    this._setDynamicVars(vars);
  }
};
customElements.define("ui-layout-container", UILayoutContainer);

// src/components/layout/split.js
var UILayoutSplit = class extends UIComponent {
  static properties = {
    vertical: { type: Boolean, default: false, reflect: true },
    position: { type: String, default: "50", reflect: true },
    min: { type: String, default: "10", reflect: true },
    max: { type: String, default: "90", reflect: true },
    gutterSize: { type: String, default: "6", reflect: true, attribute: "gutter-size" },
    disabled: { type: Boolean, default: false, reflect: true },
    width: { type: String, default: "", reflect: true },
    height: { type: String, default: "", reflect: true },
    full: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: flex;
        box-sizing: border-box;
        overflow: hidden;
      }
      :host([full]) { width: 100%; height: 100%; }
      :host([vertical]) { flex-direction: column; }

      .panel {
        overflow: auto;
        box-sizing: border-box;
      }
      .panel-a { flex: var(--_flex-a, 1 1 50%); }
      .panel-b { flex: var(--_flex-b, 1 1 50%); }

      .gutter {
        flex: 0 0 auto;
        background: var(--ui-border-color, #e5e7eb);
        position: relative;
        z-index: 1;
        transition: background 0.15s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .gutter::after {
        content: '';
        display: block;
        border-radius: 1px;
        opacity: 0.5;
        transition: opacity 0.15s ease;
      }
      .gutter:hover::after, .gutter.dragging::after {
        opacity: 0.9;
      }
      .gutter:hover, .gutter.dragging {
        background: var(--ui-focus-ring, #6366f1);
      }
      :host(:not([vertical])) .gutter {
        width: var(--_gutter, 6px);
        cursor: col-resize;
      }
      :host(:not([vertical])) .gutter::after {
        width: 2px;
        height: 24px;
        border-left: 1px solid rgba(255,255,255,0.7);
        border-right: 1px solid rgba(255,255,255,0.7);
      }
      :host([vertical]) .gutter {
        height: var(--_gutter, 6px);
        cursor: row-resize;
      }
      :host([vertical]) .gutter::after {
        width: 24px;
        height: 2px;
        border-top: 1px solid rgba(255,255,255,0.7);
        border-bottom: 1px solid rgba(255,255,255,0.7);
      }
      :host([disabled]) .gutter {
        cursor: default;
        pointer-events: none;
        opacity: 0.4;
      }

      /* Slotted children fill their panel */
      ::slotted(*) {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
    `
    );
  }
  constructor() {
    super();
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
    this._dragging = false;
    this._rendered = false;
  }
  render() {
    return `
      <div class="panel panel-a"><slot name="__a"></slot></div>
      <div class="gutter" part="gutter"></div>
      <div class="panel panel-b"><slot name="__b"></slot></div>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    this._assignSlots();
    this._mo = new MutationObserver(() => this._assignSlots());
    this._mo.observe(this, { childList: true });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._mo?.disconnect();
  }
  /** Assign the first two light-DOM children to named slots. */
  _assignSlots() {
    const children = [...this.children];
    children.forEach((c) => c.removeAttribute("slot"));
    if (children[0]) children[0].setAttribute("slot", "__a");
    if (children[1]) children[1].setAttribute("slot", "__b");
  }
  _attachListeners() {
    const gutter = this.shadowRoot.querySelector(".gutter");
    if (gutter) gutter.addEventListener("pointerdown", this._onPointerDown);
  }
  _onPointerDown(e) {
    if (this.disabled) return;
    e.preventDefault();
    this._dragging = true;
    const gutter = this.shadowRoot.querySelector(".gutter");
    gutter?.classList.add("dragging");
    gutter?.setPointerCapture(e.pointerId);
    gutter?.addEventListener("pointermove", this._onPointerMove);
    gutter?.addEventListener("pointerup", this._onPointerUp);
    gutter?.addEventListener("lostpointercapture", this._onPointerUp);
  }
  _onPointerMove(e) {
    if (!this._dragging) return;
    const rect = this.getBoundingClientRect();
    let pct;
    if (this.vertical) {
      pct = (e.clientY - rect.top) / rect.height * 100;
    } else {
      pct = (e.clientX - rect.left) / rect.width * 100;
    }
    const min = parseFloat(this.min) || 10;
    const max = parseFloat(this.max) || 90;
    pct = Math.max(min, Math.min(max, pct));
    this._position = String(Math.round(pct * 100) / 100);
    this.setAttribute("position", this._position);
    this._applyPosition(pct);
    this.emit("ui-resize", { position: pct });
  }
  _onPointerUp(e) {
    this._dragging = false;
    const gutter = this.shadowRoot.querySelector(".gutter");
    gutter?.classList.remove("dragging");
    gutter?.removeEventListener("pointermove", this._onPointerMove);
    gutter?.removeEventListener("pointerup", this._onPointerUp);
    gutter?.removeEventListener("lostpointercapture", this._onPointerUp);
  }
  _applyPosition(pct) {
    const g = `${parseFloat(this.gutterSize) || 6}px`;
    const a = `${pct}%`;
    const b = `${100 - pct}%`;
    this._setDynamicVars({
      "--_flex-a": `0 0 calc(${a} - ${g} / 2)`,
      "--_flex-b": `0 0 calc(${b} - ${g} / 2)`,
      "--_gutter": g
    });
  }
  _applyLayout() {
    const pct = parseFloat(this.position) || 50;
    const g = `${parseFloat(this.gutterSize) || 6}px`;
    const a = `${pct}%`;
    const b = `${100 - pct}%`;
    const vars = {
      "--_flex-a": `0 0 calc(${a} - ${g} / 2)`,
      "--_flex-b": `0 0 calc(${b} - ${g} / 2)`,
      "--_gutter": g
    };
    if (this.width) vars["width"] = this.width;
    if (this.height) vars["height"] = this.height;
    this._setDynamicVars(vars);
  }
  _update() {
    if (!this._rendered) {
      super._update();
      this._rendered = true;
      this._attachListeners();
    }
    this._applyLayout();
  }
};
customElements.define("ui-layout-split", UILayoutSplit);

// src/components/layout/spacer.js
var UILayoutSpacer = class extends UIComponent {
  static properties = {
    size: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        flex: 1 1 auto;
        box-sizing: border-box;
      }
      :host([size]) {
        flex: 0 0 auto;
      }
    `
    );
  }
  render() {
    return "";
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "presentation");
    this.setAttribute("aria-hidden", "true");
    this._applySize();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applySize();
  }
  _applySize() {
    if (!this.size) {
      this._setDynamicVars({});
      return;
    }
    const resolved = resolveSize(this.size) || this.size;
    this._setDynamicVars({
      "min-width": resolved,
      "min-height": resolved
    });
  }
};
customElements.define("ui-layout-spacer", UILayoutSpacer);

// src/components/progress/progress.js
var UIProgress = class extends UIComponent {
  static properties = {
    value: { type: Number, default: -1, reflect: true },
    max: { type: Number, default: 100, reflect: true },
    type: { type: String, default: "bar", reflect: true },
    color: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    thickness: { type: String, default: "", reflect: true },
    label: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        box-sizing: border-box;
        line-height: 1;
      }

      /* \u2500\u2500 BAR \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

      /* \u2500\u2500 RING \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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
    `
    );
  }
  /** @returns {boolean} */
  get _indeterminate() {
    return this.value < 0 || !this.hasAttribute("value");
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
    this.setAttribute("role", "progressbar");
    this.setAttribute("aria-valuemin", "0");
    this.setAttribute("aria-valuemax", String(this.max));
    if (this._indeterminate) {
      this.removeAttribute("aria-valuenow");
    } else {
      const clamped = Math.min(Math.max(0, this.value), this.max);
      this.setAttribute("aria-valuenow", String(clamped));
    }
  }
  _applyStyles() {
    const vars = {};
    if (this.color) vars["--_fill"] = resolveColor(this.color);
    if (this.background) vars["--_track"] = resolveColor(this.background);
    if (this.thickness) {
      vars["--_thickness"] = resolveSize(this.thickness) || this.thickness;
    }
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    if (!this._indeterminate) {
      const pct = Math.min(100, Math.max(0, this.value / this.max * 100));
      vars["--_pct"] = `${pct}%`;
    }
    this._setDynamicVars(vars);
  }
  render() {
    if (this.type === "ring") return this._renderRing();
    return this._renderBar();
  }
  _renderBar() {
    const pct = this._indeterminate ? 0 : Math.round(Math.min(100, Math.max(0, this.value / this.max * 100)));
    return `
      <div class="bar-wrapper">
        <div class="bar-track">
          <div class="bar-fill"></div>
        </div>
        ${this.label && !this._indeterminate ? `<span class="bar-label">${pct}%</span>` : ""}
      </div>`;
  }
  _renderRing() {
    const vb = 120;
    const sw = 10;
    const r = (vb - sw) / 2;
    const circ = 2 * Math.PI * r;
    const pct = this._indeterminate ? 0 : Math.min(100, Math.max(0, this.value / this.max * 100));
    const offset = circ - pct / 100 * circ;
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
        ${this.label && !this._indeterminate ? `<span class="ring-label">${Math.round(pct)}%</span>` : ""}
      </div>`;
  }
};
customElements.define("ui-progress", UIProgress);

// src/components/skeleton/skeleton.js
var UISkeleton = class extends UIComponent {
  static properties = {
    variant: { type: String, default: "text", reflect: true },
    width: { type: String, default: "", reflect: true },
    height: { type: String, default: "", reflect: true },
    lines: { type: Number, default: 1, reflect: true },
    gap: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    animated: { type: Boolean, default: true, reflect: true },
    radius: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        box-sizing: border-box;
      }
      :host([variant="circle"]) {
        display: inline-block;
      }

      .bone {
        background: var(--ui-bg-subtle, #e5e7eb);
        border-radius: var(--_radius, 0.25em);
        position: relative;
        overflow: hidden;
      }

      :host([animated]) .bone::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255,255,255,0.5) 50%,
          transparent 100%
        );
        animation: shimmer 1.5s ease-in-out infinite;
      }

      @keyframes shimmer {
        0%   { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }

      .text-bone {
        width: var(--_w, 100%);
        height: var(--_h, 1em);
      }

      .text-bone:last-child:not(:first-child) {
        width: var(--_last-w, 70%);
      }

      .lines {
        display: flex;
        flex-direction: column;
        gap: var(--_gap, 0.6em);
      }

      .circle-bone {
        width: var(--_w, 2.5em);
        height: var(--_h, 2.5em);
        border-radius: 50%;
      }

      .rect-bone {
        width: var(--_w, 100%);
        height: var(--_h, 6em);
      }
    `
    );
  }
  render() {
    const v = (this.variant || "text").toLowerCase();
    if (v === "circle") {
      return '<div class="bone circle-bone" part="bone"></div>';
    }
    if (v === "rect") {
      return '<div class="bone rect-bone" part="bone"></div>';
    }
    const n = Math.max(1, Math.floor(this.lines || 1));
    if (n === 1) {
      return '<div class="bone text-bone" part="bone"></div>';
    }
    const bones = Array.from({ length: n }, () => '<div class="bone text-bone" part="bone"></div>').join("");
    return `<div class="lines">${bones}</div>`;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "presentation");
    this.setAttribute("aria-hidden", "true");
  }
  _update() {
    super._update();
    this._applyStyles();
  }
  _applyStyles() {
    const vars = {};
    if (this.size) {
      const sz = resolveSize(this.size);
      if (sz) vars["font-size"] = sz;
    }
    if (this.width) vars["--_w"] = this.width;
    if (this.height) vars["--_h"] = this.height;
    if (this.gap) vars["--_gap"] = this.gap;
    if (this.radius) vars["--_radius"] = this.radius;
    this._setDynamicVars(vars);
  }
};
customElements.define("ui-skeleton", UISkeleton);

// src/components/spinner/spinner.js
var UISpinner = class extends UIComponent {
  static properties = {
    size: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    thickness: { type: String, default: "", reflect: true },
    speed: { type: String, default: "", reflect: true },
    label: { type: String, default: "Loading", reflect: true },
    overlay: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
      }

      :host([overlay]) {
        position: absolute;
        inset: 0;
        display: flex;
        background: rgba(255,255,255,0.6);
        z-index: 100;
      }

      .spinner {
        display: block;
        width: 1.5em;
        height: 1.5em;
        border-radius: 50%;
        border: var(--_thickness, 0.2em) solid var(--_track, rgba(0,0,0,0.1));
        border-top-color: var(--_color, var(--ui-indigo-500, #6366f1));
        animation: spin var(--_speed, 0.75s) linear infinite;
        box-sizing: border-box;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `
    );
  }
  render() {
    return `<div class="spinner" role="status" aria-label="${this._esc(this.label)}" part="spinner"></div>`;
  }
  _esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  }
  connectedCallback() {
    super.connectedCallback();
  }
  _update() {
    super._update();
    this.setAttribute("role", "status");
    this.setAttribute("aria-label", this.label || "Loading");
    this._applyStyles();
  }
  _applyStyles() {
    const vars = {};
    const sz = resolveSize(this.size);
    if (sz) vars["font-size"] = sz;
    if (this.color) vars["--_color"] = resolveColor(this.color) || this.color;
    if (this.thickness) vars["--_thickness"] = this.thickness;
    if (this.speed) vars["--_speed"] = this.speed;
    this._setDynamicVars(vars);
  }
};
customElements.define("ui-spinner", UISpinner);

// src/components/table/table.js
var UITable = class extends UIComponent {
  static properties = {
    striped: { type: Boolean, default: false, reflect: true },
    bordered: { type: Boolean, default: false, reflect: true },
    hoverable: { type: Boolean, default: false, reflect: true },
    compact: { type: Boolean, default: false, reflect: true },
    selectable: { type: Boolean, default: false, reflect: true },
    sortable: { type: Boolean, default: false, reflect: true },
    size: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    stickyHeader: { type: Boolean, default: false, reflect: true, attribute: "sticky-header" }
  };
  static styles() {
    return (
      /* css */
      `
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

      /* Hidden slot \u2014 slotted content is adopted into shadow DOM */
      .slot-host {
        display: none !important;
      }
    `
    );
  }
  constructor() {
    super();
    this._columns = [];
    this._data = [];
    this._selected = /* @__PURE__ */ new Set();
    this._sortCol = "";
    this._sortDir = "asc";
    this._rendered = false;
    this._onHeaderClick = this._onHeaderClick.bind(this);
    this._onRowSelect = this._onRowSelect.bind(this);
    this._onSelectAll = this._onSelectAll.bind(this);
  }
  /** @param {Array<Object>} v */
  set columns(v) {
    this._columns = v || [];
    this._updateTable();
  }
  get columns() {
    return this._columns;
  }
  /** @param {Array<Object>} v */
  set data(v) {
    this._data = v || [];
    this._selected.clear();
    this._updateTable();
  }
  get data() {
    return this._data;
  }
  /** @returns {Array<Object>} currently selected rows */
  get selectedRows() {
    return [...this._selected].map((i) => this._data[i]).filter(Boolean);
  }
  render() {
    if (this._columns.length) {
      return this._renderTable();
    }
    return '<div class="slot-host"><slot></slot></div><div class="wrapper"></div>';
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
    requestAnimationFrame(() => this._adoptSlottedTable());
  }
  /** Move a slotted <table> into shadow DOM so all th/td styles apply. */
  _adoptSlottedTable() {
    if (this._columns.length) return;
    const wrapper = this.shadowRoot?.querySelector(".wrapper");
    if (!wrapper) return;
    const table = this.querySelector("table");
    if (!table) return;
    wrapper.innerHTML = "";
    wrapper.appendChild(table.cloneNode(true));
  }
  _renderTable() {
    const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
    const cols = this._columns;
    const data = this._getSortedData();
    let headCells = "";
    if (this.selectable) {
      const allSelected = data.length > 0 && this._selected.size === data.length;
      headCells += `<th class="sel-cell"><input type="checkbox" class="select-all" ${allSelected ? "checked" : ""} aria-label="Select all"></th>`;
    }
    for (const col of cols) {
      const isSortable = col.sortable || this.sortable;
      const isSorted = this._sortCol === col.key;
      const arrow = isSorted ? this._sortDir === "asc" ? "\u25B2" : "\u25BC" : "\u21C5";
      const cls = [isSortable ? "sortable" : "", isSorted ? "sorted" : ""].filter(Boolean).join(" ");
      const align = col.align ? ` style="text-align:${col.align}"` : "";
      headCells += `<th class="${cls}" data-key="${esc(col.key)}"${align}>${esc(col.label || col.key)}${isSortable ? `<span class="sort-icon">${arrow}</span>` : ""}</th>`;
    }
    let rows = "";
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowIdx = this._data.indexOf(row);
      const sel = this._selected.has(rowIdx);
      let cells = "";
      if (this.selectable) {
        cells += `<td class="sel-cell"><input type="checkbox" class="row-sel" data-idx="${rowIdx}" ${sel ? "checked" : ""} aria-label="Select row"></td>`;
      }
      for (const col of cols) {
        const val = col.render ? col.render(row[col.key], row, i) : esc(row[col.key]);
        const align = col.align ? ` style="text-align:${col.align}"` : "";
        cells += `<td${align}>${val}</td>`;
      }
      rows += `<tr class="${sel ? "selected" : ""}" data-row="${rowIdx}">${cells}</tr>`;
    }
    return `<table part="table"><thead><tr>${headCells}</tr></thead><tbody>${rows}</tbody></table>`;
  }
  _getSortedData() {
    if (!this._sortCol) return [...this._data];
    const key = this._sortCol;
    const dir = this._sortDir === "asc" ? 1 : -1;
    return [...this._data].sort((a, b) => {
      const va = a[key] ?? "";
      const vb = b[key] ?? "";
      if (typeof va === "number" && typeof vb === "number") return (va - vb) * dir;
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
    root.querySelectorAll("th.sortable").forEach((th) => {
      th.removeEventListener("click", this._onHeaderClick);
      th.addEventListener("click", this._onHeaderClick);
    });
    root.querySelectorAll(".row-sel").forEach((cb) => {
      cb.removeEventListener("change", this._onRowSelect);
      cb.addEventListener("change", this._onRowSelect);
    });
    const sa = root.querySelector(".select-all");
    if (sa) {
      sa.removeEventListener("change", this._onSelectAll);
      sa.addEventListener("change", this._onSelectAll);
    }
  }
  _onHeaderClick(e) {
    const th = e.currentTarget;
    const key = th.dataset.key;
    if (!key) return;
    if (this._sortCol === key) {
      this._sortDir = this._sortDir === "asc" ? "desc" : "asc";
    } else {
      this._sortCol = key;
      this._sortDir = "asc";
    }
    this._updateTable();
    this.emit("ui-sort", { column: key, direction: this._sortDir });
  }
  _onRowSelect(e) {
    const idx = parseInt(e.target.dataset.idx, 10);
    if (e.target.checked) {
      this._selected.add(idx);
    } else {
      this._selected.delete(idx);
    }
    this._updateTable();
    this.emit("ui-select", { selected: this._selected.has(idx), row: this._data[idx], index: idx });
  }
  _onSelectAll(e) {
    if (e.target.checked) {
      this._data.forEach((_, i) => this._selected.add(i));
    } else {
      this._selected.clear();
    }
    this._updateTable();
    this.emit("ui-select", { selected: e.target.checked, row: null, index: -1 });
  }
  _applyStyles() {
    const vars = {};
    if (this.size) {
      const sz = resolveSize(this.size);
      if (sz) vars["font-size"] = sz;
    }
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background) || this.background;
      vars["background"] = vars["--_bg"];
    }
    this._setDynamicVars(vars);
  }
};
customElements.define("ui-table", UITable);

// src/components/tab/tabs.js
var UITabs = class extends UIComponent {
  static properties = {
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    placement: { type: String, default: "top", reflect: true },
    selected: { type: Number, default: 0, reflect: true }
  };
  constructor() {
    super();
    this._handleClick = this._handleClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }
  static styles() {
    return (
      /* css */
      `
      :host {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--ui-border-color, #e5e7eb);
        border-radius: var(--ui-radius, 0.5em);
        overflow: hidden;
        box-sizing: border-box;
        line-height: 1.5;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
      }

      /* Bottom placement flips the order */
      :host([placement="bottom"]) {
        flex-direction: column-reverse;
      }

      /* Start (left) placement \u2014 horizontal layout */
      :host([placement="start"]) {
        flex-direction: row;
      }

      /* End (right) placement \u2014 horizontal layout, reversed */
      :host([placement="end"]) {
        flex-direction: row-reverse;
      }

      /* \u2500\u2500 Tab bar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .tablist {
        display: flex;
        gap: 0;
        background: var(--_bar-bg, var(--ui-bg-subtle, #f9fafb));
        overflow-x: auto;
        scrollbar-width: none;
      }

      .tablist::-webkit-scrollbar { display: none; }

      /* Vertical tablist for start/end placement */
      :host([placement="start"]) .tablist,
      :host([placement="end"]) .tablist {
        flex-direction: column;
        overflow-x: visible;
        overflow-y: auto;
        min-width: max-content;
        border-right: 1px solid var(--ui-border-color, #e5e7eb);
      }

      :host([placement="end"]) .tablist {
        border-right: none;
        border-left: 1px solid var(--ui-border-color, #e5e7eb);
      }

      /* \u2500\u2500 Individual tab button \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .tab {
        flex: 0 0 auto;
        display: inline-flex;
        align-items: center;
        gap: 0.4em;
        padding: 0.75em 1.25em;
        border: none;
        background: transparent;
        color: var(--_tab-color, var(--ui-text-muted, #6b7280));
        font: inherit;
        font-size: inherit;
        font-weight: 500;
        cursor: pointer;
        white-space: nowrap;
        position: relative;
        user-select: none;
        transition: color 0.15s ease, background 0.15s ease;
      }

      .tab:hover {
        color: var(--_color, var(--ui-text-color, #111827));
        background: rgba(0, 0, 0, 0.04);
      }

      .tab:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: -0.125em;
        z-index: 1;
      }

      .tab[aria-selected="true"] {
        color: var(--_active-color, var(--ui-focus-ring, #6366f1));
        font-weight: 600;
      }

      /* Active indicator line */
      .tab[aria-selected="true"]::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 0.15em;
        background: var(--_active-color, var(--ui-focus-ring, #6366f1));
        border-radius: 0.15em 0.15em 0 0;
      }

      :host([placement="bottom"]) .tab[aria-selected="true"]::after {
        bottom: auto;
        top: 0;
        border-radius: 0 0 0.15em 0.15em;
      }

      /* Vertical indicator for start placement (right edge) */
      :host([placement="start"]) .tab[aria-selected="true"]::after {
        top: 0;
        bottom: 0;
        left: auto;
        right: 0;
        width: 0.15em;
        height: auto;
        border-radius: 0.15em 0 0 0.15em;
      }

      /* Vertical indicator for end placement (left edge) */
      :host([placement="end"]) .tab[aria-selected="true"]::after {
        top: 0;
        bottom: 0;
        left: 0;
        right: auto;
        width: 0.15em;
        height: auto;
        border-radius: 0 0.15em 0.15em 0;
      }

      /* Vertical tabs: left-align text */
      :host([placement="start"]) .tab,
      :host([placement="end"]) .tab {
        justify-content: flex-start;
        text-align: left;
        white-space: normal;
      }

      .tab[aria-disabled="true"] {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .tab[aria-disabled="true"]:hover {
        background: transparent;
        color: var(--_tab-color, var(--ui-text-muted, #6b7280));
      }

      /* \u2500\u2500 Panel area \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .panels {
        flex: 1;
      }

      ::slotted(ui-tab) {
        display: none !important;
      }

      ::slotted(ui-tab[active]) {
        display: block !important;
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this._observer = new MutationObserver(() => this._syncTabs());
    this._observer.observe(this, {
      childList: true,
      subtree: false,
      attributes: true,
      attributeFilter: ["label", "disabled"]
    });
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeyDown);
    queueMicrotask(() => this._syncTabs());
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer?.disconnect();
    this.removeEventListener("click", this._handleClick);
    this.removeEventListener("keydown", this._handleKeyDown);
  }
  /** Re-render then rebuild tab buttons so they survive every DOM refresh. */
  _update() {
    this._applyStyles();
    super._update();
    this._syncTabs();
  }
  /* ------------------------------------------------------------------ */
  /*  Public API                                                         */
  /* ------------------------------------------------------------------ */
  /** Get all <ui-tab> children. */
  get tabs() {
    return [...this.querySelectorAll(":scope > ui-tab")];
  }
  /** Select a tab by index. */
  select(index) {
    const tabs = this.tabs;
    if (index < 0 || index >= tabs.length) return;
    if (tabs[index]?.disabled) return;
    this.selected = index;
  }
  /* ------------------------------------------------------------------ */
  /*  Internal                                                           */
  /* ------------------------------------------------------------------ */
  _applyStyles() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
  }
  /** Sync tab buttons in shadow DOM and panel visibility in light DOM. */
  _syncTabs() {
    const tabs = this.tabs;
    const tablist = this.shadowRoot?.querySelector(".tablist");
    if (!tablist) return;
    const vertical = this.placement === "start" || this.placement === "end";
    tablist.setAttribute("aria-orientation", vertical ? "vertical" : "horizontal");
    const idx = Math.max(0, Math.min(this.selected, tabs.length - 1));
    tablist.innerHTML = "";
    tabs.forEach((tab, i) => {
      const btn = document.createElement("button");
      btn.className = "tab";
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", i === idx ? "true" : "false");
      btn.setAttribute("tabindex", i === idx ? "0" : "-1");
      btn.dataset.index = i;
      btn.textContent = tab.label || `Tab ${i + 1}`;
      if (tab.disabled) {
        btn.setAttribute("aria-disabled", "true");
        btn.setAttribute("tabindex", "-1");
      }
      tablist.appendChild(btn);
    });
    tabs.forEach((tab, i) => {
      if (i === idx) {
        tab.setAttribute("active", "");
        tab.setAttribute("role", "tabpanel");
      } else {
        tab.removeAttribute("active");
        tab.setAttribute("role", "tabpanel");
      }
    });
  }
  /** @param {Event} e */
  _handleClick(e) {
    const btn = e.composedPath().find(
      (el) => el instanceof HTMLElement && el.classList?.contains("tab")
    );
    if (!btn || btn.getAttribute("aria-disabled") === "true") return;
    const index = Number(btn.dataset.index);
    if (index === this.selected) return;
    this.selected = index;
    this.emit("ui-tab-change", { index });
  }
  /** @param {KeyboardEvent} e */
  _handleKeyDown(e) {
    const tablist = this.shadowRoot?.querySelector(".tablist");
    if (!tablist) return;
    const btns = [...tablist.querySelectorAll('.tab:not([aria-disabled="true"])')];
    if (!btns.length) return;
    const currentBtn = e.composedPath().find(
      (el) => el instanceof HTMLElement && el.classList?.contains("tab")
    );
    if (!currentBtn) return;
    let target = null;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown": {
        e.preventDefault();
        const ci = btns.indexOf(currentBtn);
        target = btns[(ci + 1) % btns.length];
        break;
      }
      case "ArrowLeft":
      case "ArrowUp": {
        e.preventDefault();
        const ci = btns.indexOf(currentBtn);
        target = btns[(ci - 1 + btns.length) % btns.length];
        break;
      }
      case "Home":
        e.preventDefault();
        target = btns[0];
        break;
      case "End":
        e.preventDefault();
        target = btns[btns.length - 1];
        break;
      default:
        return;
    }
    if (target) {
      target.focus();
      const index = Number(target.dataset.index);
      if (index !== this.selected) {
        this.selected = index;
        this.emit("ui-tab-change", { index });
      }
    }
  }
  render() {
    return `
      <div class="tablist" role="tablist"></div>
      <div class="panels">
        <slot></slot>
      </div>
    `;
  }
};
customElements.define("ui-tabs", UITabs);

// src/components/tab/tab.js
var UITab = class extends UIComponent {
  static properties = {
    label: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    active: { type: Boolean, default: false, reflect: true },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        padding: 1em;
        background: var(--_bg, transparent);
        color: var(--_color, inherit);
        line-height: 1.5;
        box-sizing: border-box;
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tabpanel");
  }
  _update() {
    this._applyStyles();
    super._update();
  }
  _applyStyles() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    this._setDynamicVars(vars);
  }
  render() {
    return "<slot></slot>";
  }
};
customElements.define("ui-tab", UITab);

// src/components/text/text.js
var UIText = class _UIText extends UIComponent {
  static properties = {
    type: { type: String, default: "", reflect: true },
    block: { type: Boolean, default: false, reflect: true },
    display: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    weight: { type: String, default: "", reflect: true },
    bold: { type: Boolean, default: false, reflect: true },
    align: { type: String, default: "", reflect: true },
    transform: { type: String, default: "", reflect: true },
    leading: { type: String, default: "", reflect: true },
    spacing: { type: String, default: "", reflect: true },
    wrap: { type: String, default: "", reflect: true },
    indent: { type: String, default: "", reflect: true },
    margin: { type: String, default: "", reflect: true },
    padding: { type: String, default: "", reflect: true },
    decoration: { type: String, default: "", reflect: true },
    muted: { type: Boolean, default: false, reflect: true },
    mono: { type: Boolean, default: false, reflect: true },
    italic: { type: Boolean, default: false, reflect: true },
    underline: { type: Boolean, default: false, reflect: true },
    strike: { type: Boolean, default: false, reflect: true },
    truncate: { type: Boolean, default: false, reflect: true },
    nowrap: { type: Boolean, default: false, reflect: true },
    selectable: { type: Boolean, default: true, reflect: true },
    break: { type: String, default: "", reflect: true },
    lines: { type: Number, default: 0, reflect: true },
    font: { type: String, default: "", reflect: true }
  };
  /** Valid type values. */
  static _validTypes = /* @__PURE__ */ new Set(["heading", "paragraph"]);
  /** Named font-weight map (Tailwind-style names → numeric values). */
  static _weights = {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
  };
  /** Named line-height map. */
  static _leadings = {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.6",
    relaxed: "1.75",
    loose: "2"
  };
  /** Named letter-spacing map. */
  static _spacings = {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em"
  };
  /** Named word-break map. */
  static _breaks = {
    all: "break-all",
    words: "break-word",
    // overflow-wrap fallback handled in _applyStyles
    keep: "keep-all"
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        color: var(--_color, inherit);
        font-size: var(--_size, inherit);
        display: var(--_display, inline);
        box-sizing: border-box;
      }

      :host([block]) {
        display: var(--_display, block);
      }

      :host([bold]) {
        font-weight: 700;
      }

      :host([mono]) {
        font-family: var(--ui-font-mono, monospace);
      }

      :host([italic]) {
        font-style: italic;
      }

      :host([underline]) {
        text-decoration: underline;
      }

      :host([strike]) {
        text-decoration: line-through;
      }

      :host([muted]) {
        color: var(--ui-text-muted, #6b7280);
      }

      :host([truncate]) {
        display: var(--_display, block);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      :host([nowrap]) {
        white-space: nowrap;
      }

      :host([selectable="false"]) {
        -webkit-user-select: none;
        user-select: none;
      }

      :host([lines]) {
        display: var(--_display, -webkit-box);
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      :host([type]) {
        display: var(--_display, block);
      }

      h2, p {
        all: inherit;
        display: block;
        margin: 0;
        padding: 0;
      }

      slot {
        display: contents;
      }
    `
    );
  }
  render() {
    const t = this.type?.toLowerCase();
    if (t === "heading") return "<h2><slot></slot></h2>";
    if (t === "paragraph") return "<p><slot></slot></p>";
    return "<slot></slot>";
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyStyles();
  }
  /** Compute CSS custom properties from attributes. */
  _applyStyles() {
    const vars = {};
    const t = this.type?.toLowerCase();
    const isHeading = t === "heading";
    if (this.display) vars["--_display"] = this.display;
    if (this.size) {
      const fontSize = resolveSize(this.size);
      if (fontSize) vars["--_size"] = fontSize;
    } else if (isHeading) {
      vars["--_size"] = "1.5em";
    }
    if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    if (this.weight) {
      const w = _UIText._weights[this.weight.toLowerCase()] || this.weight;
      vars["font-weight"] = String(w);
    } else if (isHeading && !this.bold) {
      vars["font-weight"] = "700";
    }
    if (this.align) vars["text-align"] = this.align;
    if (this.transform) vars["text-transform"] = this.transform;
    if (this.leading) {
      const lh = _UIText._leadings[this.leading] || this.leading;
      vars["line-height"] = lh;
    }
    if (this.spacing) {
      const ls = _UIText._spacings[this.spacing] || this.spacing;
      vars["letter-spacing"] = ls;
    }
    if (this.wrap) vars["text-wrap"] = this.wrap;
    if (this.indent) vars["text-indent"] = this.indent;
    if (this.margin) {
      vars["margin"] = this.margin;
    } else if (t === "paragraph") {
      vars["margin"] = "0 0 1em";
    } else if (isHeading) {
      vars["margin"] = "0 0 0.5em";
    }
    if (this.padding) vars["padding"] = this.padding;
    if (this.decoration) vars["text-decoration"] = this.decoration;
    if (this.break) {
      const br = _UIText._breaks[this.break] || this.break;
      vars["word-break"] = br;
      if (this.break === "words") vars["overflow-wrap"] = "break-word";
    }
    if (this.lines > 0) {
      vars["-webkit-line-clamp"] = String(Math.floor(this.lines));
    }
    if (this.font) {
      vars["font-family"] = this.font;
    }
    this._setDynamicVars(vars);
  }
};
customElements.define("ui-text", UIText);

// src/components/toast/toast.js
var UIToast = class _UIToast extends UIComponent {
  static properties = {
    background: { type: String, default: "gray-800", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    elevation: { type: String, default: "", reflect: true },
    duration: { type: Number, default: 4e3, reflect: true },
    position: { type: String, default: "bottom-right", reflect: true },
    dismissible: { type: Boolean, default: true, reflect: true }
  };
  /** Valid position values. */
  static _positions = /* @__PURE__ */ new Set([
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right"
  ]);
  /** Active containers keyed by position string. */
  static _containers = /* @__PURE__ */ new Map();
  /**
   * Programmatic API — create and show a toast.
   *
   * @param {string} message  - Toast text content.
   * @param {Object} [opts]   - Optional attribute overrides.
   * @param {string} [opts.background]  - Background colour.
   * @param {string} [opts.color]       - Text colour.
   * @param {string} [opts.size]        - Size keyword or CSS length.
   * @param {number} [opts.duration]    - Auto-dismiss ms (0 = persistent).
   * @param {string} [opts.position]    - Screen corner.
   * @param {boolean} [opts.dismissible] - Show close button.
   * @returns {UIToast} The created toast element.
   */
  static show(message, opts = {}) {
    const toast = document.createElement("ui-toast");
    if (opts.background !== void 0) toast.setAttribute("background", opts.background);
    if (opts.color !== void 0) toast.setAttribute("color", opts.color);
    if (opts.size !== void 0) toast.setAttribute("size", opts.size);
    if (opts.duration !== void 0) toast.setAttribute("duration", String(opts.duration));
    if (opts.position !== void 0) toast.setAttribute("position", opts.position);
    if (opts.dismissible === false) toast.removeAttribute("dismissible");
    toast.textContent = message;
    document.body.appendChild(toast);
    return toast;
  }
  /* ── Container management ────────────────────────────────── */
  /** Get (or create) the fixed-position container for a given corner. */
  static _getContainer(position) {
    const pos = _UIToast._positions.has(position) ? position : "bottom-right";
    if (_UIToast._containers.has(pos)) return _UIToast._containers.get(pos);
    const el = document.createElement("div");
    el.className = "ui-toast-container";
    el.dataset.position = pos;
    el.setAttribute("role", "log");
    el.setAttribute("aria-live", "polite");
    const isBottom = pos.startsWith("bottom");
    const isCenter = pos.includes("center");
    const isLeft = pos.includes("left");
    Object.assign(el.style, {
      position: "fixed",
      zIndex: "10000",
      display: "flex",
      flexDirection: isBottom ? "column-reverse" : "column",
      gap: "0.5em",
      padding: "1em",
      pointerEvents: "none",
      maxHeight: "100vh",
      overflowY: "auto",
      boxSizing: "border-box",
      /* Vertical */
      top: isBottom ? "auto" : "0",
      bottom: isBottom ? "0" : "auto",
      /* Horizontal */
      left: isCenter ? "50%" : isLeft ? "0" : "auto",
      right: isCenter ? "auto" : isLeft ? "auto" : "0",
      transform: isCenter ? "translateX(-50%)" : "none"
    });
    document.body.appendChild(el);
    _UIToast._containers.set(pos, el);
    return el;
  }
  /** Remove a container if it has no remaining toasts. */
  static _cleanupContainer(position) {
    const el = _UIToast._containers.get(position);
    if (el && el.children.length === 0) {
      el.remove();
      _UIToast._containers.delete(position);
    }
  }
  /* ── Styles ──────────────────────────────────────────────── */
  static styles() {
    return (
      /* css */
      `
      :host {
        display: flex;
        align-items: center;
        gap: 0.75em;
        min-width: 16em;
        max-width: 24em;
        padding: 0.85em 1.15em;
        border-radius: var(--ui-radius, 0.25em);
        background: var(--_bg, inherit);
        color: var(--_fg, inherit);
        line-height: 1.4;
        box-sizing: border-box;
        pointer-events: auto;
        box-shadow: var(--_elevation, 0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06));
      }

      slot {
        display: block;
        flex: 1;
      }

      /* Dismiss button */
      button {
        display: none;
        flex-shrink: 0;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1em;
        line-height: 1;
        width: 1.6em;
        height: 1.6em;
        padding: 0;
        border-radius: 50%;
        color: var(--_fg, inherit);
        opacity: 0.6;
        transition: opacity 0.15s ease, background 0.15s ease;
      }

      button:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.15);
      }

      button:active {
        background: rgba(255, 255, 255, 0.25);
      }

      button:focus-visible {
        opacity: 1;
        background: rgba(255, 255, 255, 0.15);
        outline: 2px solid var(--ui-focus-ring, #3b82f6);
        outline-offset: 1px;
      }

      :host([dismissible]) button {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `
    );
  }
  render() {
    return '<slot></slot><button part="dismiss" aria-label="Dismiss">\u2715</button>';
  }
  /* ── Lifecycle ───────────────────────────────────────────── */
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "status");
    if (!this.parentElement?.classList.contains("ui-toast-container")) {
      this._movedToContainer = false;
      const container = _UIToast._getContainer(this.position);
      container.appendChild(this);
      return;
    }
    this._movedToContainer = true;
    this._onMouseEnter = () => this._pauseTimer();
    this._onMouseLeave = () => this._resumeTimer();
    this.addEventListener("mouseenter", this._onMouseEnter);
    this.addEventListener("mouseleave", this._onMouseLeave);
    this._startTimer();
    const slideFrom = this.position.startsWith("top") ? "-0.75em" : "0.75em";
    this.animate?.(
      [
        { opacity: 0, transform: `translateY(${slideFrom})` },
        { opacity: 1, transform: "translateY(0)" }
      ],
      { duration: 200, easing: "ease-out", fill: "forwards" }
    );
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimer();
    this.removeEventListener("mouseenter", this._onMouseEnter);
    this.removeEventListener("mouseleave", this._onMouseLeave);
  }
  _update() {
    super._update();
    this._attachListeners();
    this._applyStyles();
  }
  _attachListeners() {
    const btn = this.shadowRoot.querySelector("button");
    if (btn) btn.addEventListener("click", () => this.dismiss());
  }
  /* ── Public API ──────────────────────────────────────────── */
  /** Dismiss the toast with an exit animation. */
  dismiss() {
    this._clearTimer();
    const pos = this.position;
    const slideTo = pos.startsWith("top") ? "-0.75em" : "0.75em";
    if (this.animate) {
      const anim = this.animate(
        [
          { opacity: 1, transform: "translateY(0)" },
          { opacity: 0, transform: `translateY(${slideTo})` }
        ],
        { duration: 150, easing: "ease-in", fill: "forwards" }
      );
      anim.onfinish = () => this._finishDismiss(pos);
    } else {
      this._finishDismiss(pos);
    }
  }
  /** @private */
  _finishDismiss(pos) {
    this.emit("ui-dismiss");
    this.remove();
    _UIToast._cleanupContainer(pos);
  }
  /* ── Timer ───────────────────────────────────────────────── */
  _startTimer() {
    if (this.duration <= 0) return;
    this._remaining = this.duration;
    this._timerStart = Date.now();
    this._timer = setTimeout(() => this.dismiss(), this._remaining);
  }
  _pauseTimer() {
    if (!this._timer) return;
    clearTimeout(this._timer);
    this._timer = null;
    this._remaining -= Date.now() - this._timerStart;
    if (this._remaining < 0) this._remaining = 0;
  }
  _resumeTimer() {
    if (this.duration <= 0 || !this._remaining || this._remaining <= 0) return;
    this._timerStart = Date.now();
    this._timer = setTimeout(() => this.dismiss(), this._remaining);
  }
  _clearTimer() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }
  /* ── Styling ─────────────────────────────────────────────── */
  _applyStyles() {
    const vars = {};
    const bg = resolveColor(this.background || "gray-800");
    vars["--_bg"] = bg;
    if (this.color) {
      vars["--_fg"] = resolveColor(this.color);
    } else {
      vars["--_fg"] = contrastColorFor(this.background || "gray-800");
    }
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars["--_elevation"] = shadow;
    this._setDynamicVars(vars);
  }
};
customElements.define("ui-toast", UIToast);

// src/components/tooltip/tooltip.js
var UITooltip = class _UITooltip extends UIComponent {
  static properties = {
    content: { type: String, default: "", reflect: true },
    placement: { type: String, default: "top", reflect: true },
    delay: { type: Number, default: 200, reflect: true },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    maxWidth: { type: String, default: "", reflect: true, attribute: "max-width" },
    disabled: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: inline-block;
        position: relative;
      }
    `
    );
  }
  /** Shared stylesheet injected once into <head> for all tooltip popups. */
  static _ensureGlobalStyles() {
    if (_UITooltip._stylesInjected) return;
    const style = document.createElement("style");
    style.textContent = /* css */
    `
      .ui-tooltip-popup {
        position: fixed;
        z-index: 10000;
        padding: 0.4em 0.65em;
        border-radius: var(--ui-radius, 0.375em);
        background: #1f2937;
        color: #fff;
        font-size: 0.8em;
        line-height: 1.4;
        max-width: 250px;
        width: max-content;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.15s ease;
        white-space: normal;
        word-wrap: break-word;
        box-sizing: border-box;
        text-align: center;
        top: 0;
        left: 0;
        font-family: inherit;
      }
      .ui-tooltip-popup.show {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
    _UITooltip._stylesInjected = true;
  }
  constructor() {
    super();
    this._showTip = this._showTip.bind(this);
    this._hideTip = this._hideTip.bind(this);
    this._timer = null;
  }
  render() {
    return `<slot></slot>`;
  }
  _esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  }
  connectedCallback() {
    super.connectedCallback();
    _UITooltip._ensureGlobalStyles();
    this.addEventListener("mouseenter", this._showTip);
    this.addEventListener("mouseleave", this._hideTip);
    this.addEventListener("focusin", this._showTip);
    this.addEventListener("focusout", this._hideTip);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mouseenter", this._showTip);
    this.removeEventListener("mouseleave", this._hideTip);
    this.removeEventListener("focusin", this._showTip);
    this.removeEventListener("focusout", this._hideTip);
    clearTimeout(this._timer);
    this._removePopup();
  }
  _update() {
    super._update();
    this._applyStyles();
  }
  /** Create (or return existing) popup element on document.body. */
  _getPopup() {
    if (!this._popup) {
      this._popup = document.createElement("div");
      this._popup.className = "ui-tooltip-popup";
      this._popup.setAttribute("role", "tooltip");
    }
    return this._popup;
  }
  /** Remove the popup from the DOM. */
  _removePopup() {
    if (this._popup) {
      this._popup.remove();
      this._popup = null;
    }
  }
  _showTip() {
    if (this.disabled || !this.content) return;
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      const popup = this._getPopup();
      popup.textContent = this.content;
      if (this.background) popup.style.background = resolveColor(this.background) || this.background;
      if (this.color) popup.style.color = resolveColor(this.color) || this.color;
      if (this.size) {
        const sz = resolveSize(this.size);
        if (sz) popup.style.fontSize = sz;
      }
      if (this.maxWidth) popup.style.maxWidth = this.maxWidth;
      if (!popup.parentNode) document.body.appendChild(popup);
      this._positionTip(popup);
      popup.classList.add("show");
    }, this.delay);
  }
  /** Position the tooltip relative to the trigger element using fixed coordinates. */
  _positionTip(popup) {
    const gap = 8;
    const slot = this.shadowRoot?.querySelector("slot");
    const assigned = slot?.assignedElements?.() ?? [];
    const target = assigned[0] || this;
    const host = target.getBoundingClientRect();
    const tipRect = popup.getBoundingClientRect();
    const placement = this.placement || "top";
    let top, left;
    switch (placement) {
      case "bottom":
        top = host.bottom + gap;
        left = host.left + host.width / 2 - tipRect.width / 2;
        break;
      case "left":
        top = host.top + host.height / 2 - tipRect.height / 2;
        left = host.left - tipRect.width - gap;
        break;
      case "right":
        top = host.top + host.height / 2 - tipRect.height / 2;
        left = host.right + gap;
        break;
      case "top":
      default:
        top = host.top - tipRect.height - gap;
        left = host.left + host.width / 2 - tipRect.width / 2;
        break;
    }
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (left < 4) left = 4;
    if (left + tipRect.width > vw - 4) left = vw - 4 - tipRect.width;
    if (top < 4) top = 4;
    if (top + tipRect.height > vh - 4) top = vh - 4 - tipRect.height;
    popup.style.top = `${top}px`;
    popup.style.left = `${left}px`;
  }
  _hideTip() {
    clearTimeout(this._timer);
    if (this._popup) {
      this._popup.classList.remove("show");
      setTimeout(() => {
        if (this._popup && !this._popup.classList.contains("show")) {
          this._popup.remove();
        }
      }, 200);
    }
  }
  _applyStyles() {
  }
};
customElements.define("ui-tooltip", UITooltip);

// src/components/tree/tree.js
var UITree = class extends UIComponent {
  static properties = {
    size: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    multiselect: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        line-height: 1.5;
      }
    `
    );
  }
  /* ------------------------------------------------------------------ */
  /*  Lifecycle                                                          */
  /* ------------------------------------------------------------------ */
  constructor() {
    super();
    this._onItemSelect = this._onItemSelect.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tree");
    this.addEventListener("ui-select", this._onItemSelect);
    this._ensureTabIndex();
    this._observeSlot();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("ui-select", this._onItemSelect);
    if (this._slotObserver) {
      this._slotObserver.disconnect();
      this._slotObserver = null;
    }
  }
  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */
  render() {
    return `<slot></slot>`;
  }
  /* ------------------------------------------------------------------ */
  /*  Selection management                                               */
  /* ------------------------------------------------------------------ */
  _onItemSelect(e) {
    const item = e.detail?.item;
    if (!item) return;
    if (!this.multiselect) {
      for (const sel of this.querySelectorAll("ui-tree-item[selected]")) {
        if (sel !== item) sel.deselect();
      }
    }
  }
  /** Get all currently selected items. */
  get selectedItems() {
    return [...this.querySelectorAll("ui-tree-item[selected]")];
  }
  /** Get all selected values. */
  get selectedValues() {
    return this.selectedItems.map((item) => item.value);
  }
  /* ------------------------------------------------------------------ */
  /*  Tab index management                                               */
  /* ------------------------------------------------------------------ */
  /** Ensure at least the first root item is in the tab order. */
  _ensureTabIndex() {
    const first = this.querySelector(":scope > ui-tree-item:not([disabled])");
    if (first && first.getAttribute("tabindex") === "-1") {
      first.setAttribute("tabindex", "0");
    }
  }
  _observeSlot() {
    this._slotObserver = new MutationObserver(() => this._ensureTabIndex());
    this._slotObserver.observe(this, { childList: true });
  }
  /* ------------------------------------------------------------------ */
  /*  Styling helpers                                                    */
  /* ------------------------------------------------------------------ */
  _applyStyles() {
    const vars = {};
    const sz = resolveSize(this.size);
    if (sz) vars["font-size"] = sz;
    if (this.color) {
      const c = resolveColor(this.color);
      if (c) vars["color"] = c;
    }
    if (this.background) {
      const bg = resolveColor(this.background);
      if (bg) {
        const hoverBg = resolveColorHover(this.background) || bg;
        vars["--_tree-select-bg"] = bg;
        vars["--_tree-select-bg-hover"] = hoverBg;
      }
    }
    this._setDynamicVars(vars);
  }
  _update() {
    this._applyStyles();
    super._update();
  }
  /* ------------------------------------------------------------------ */
  /*  Public API                                                         */
  /* ------------------------------------------------------------------ */
  /** Expand all items in the tree. */
  expandAll() {
    for (const item of this.querySelectorAll("ui-tree-item[data-has-children]")) {
      item.expand();
    }
  }
  /** Collapse all items in the tree. */
  collapseAll() {
    for (const item of this.querySelectorAll("ui-tree-item[data-has-children]")) {
      item.collapse();
    }
  }
  /** Deselect all items. */
  deselectAll() {
    for (const item of this.querySelectorAll("ui-tree-item[selected]")) {
      item.deselect();
    }
  }
};
customElements.define("ui-tree", UITree);

// src/components/tree/item.js
var UITreeItem = class extends UIComponent {
  static properties = {
    value: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    expanded: { type: Boolean, default: false, reflect: true },
    selected: { type: Boolean, default: false, reflect: true },
    href: { type: String, default: "", reflect: true },
    target: { type: String, default: "", reflect: true },
    channel: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        user-select: none;
        font-size: var(--_size, inherit);
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.45;
      }

      /* ---- Clickable row ---- */
      .row {
        all: unset;
        display: flex;
        align-items: center;
        gap: 0.35em;
        width: 100%;
        box-sizing: border-box;
        padding: 0.25em 0.5em;
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
        line-height: 1.5;
        color: var(--_color, var(--ui-text-color, inherit));
        background: var(--_bg, transparent);
        text-decoration: none;
        border-radius: var(--ui-radius, 0.25em);
        transition: background-color 0.12s ease;
      }

      .row:hover {
        background: var(--_bg-hover, var(--ui-bg-subtle, rgba(0, 0, 0, 0.06)));
      }

      :host([selected]) .row {
        background: var(--_select-bg, var(--ui-indigo-100, rgba(99, 102, 241, 0.12)));
        color: var(--_select-color, var(--ui-indigo-700, #4338ca));
      }

      :host([selected]) .row:hover {
        background: var(--_select-bg-hover, var(--ui-indigo-200, rgba(99, 102, 241, 0.2)));
      }

      .row:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: -0.125em;
      }

      /* ---- Expand/collapse caret ---- */
      .caret {
        display: none;
        flex-shrink: 0;
        width: 1em;
        height: 1em;
        align-items: center;
        justify-content: center;
        font-size: 0.75em;
        transition: transform 0.15s ease;
      }

      .caret svg {
        width: 1em;
        height: 1em;
        fill: currentColor;
        opacity: 0.55;
      }

      :host([data-has-children]) .caret {
        display: inline-flex;
      }

      :host([expanded]) .caret {
        transform: rotate(90deg);
      }

      /* Spacer for leaf items to align with parent items */
      .spacer {
        display: inline-flex;
        width: 1em;
        flex-shrink: 0;
        font-size: 0.75em;
      }

      :host([data-has-children]) .spacer {
        display: none;
      }

      /* ---- Children group ---- */
      .children {
        display: none;
        flex-direction: column;
        padding-left: 1.25em;
      }

      :host([expanded]) .children {
        display: flex;
      }
    `
    );
  }
  /* ------------------------------------------------------------------ */
  /*  Lifecycle                                                          */
  /* ------------------------------------------------------------------ */
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._childObserver = null;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "treeitem");
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "-1");
    requestAnimationFrame(() => this._applySelectedColors());
    this.addEventListener("click", this._onClick);
    this.addEventListener("keydown", this._onKeyDown);
    this._assignSlots();
    this._observeChildren();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._onClick);
    this.removeEventListener("keydown", this._onKeyDown);
    if (this._childObserver) {
      this._childObserver.disconnect();
      this._childObserver = null;
    }
  }
  /* ------------------------------------------------------------------ */
  /*  Render — completely static, no dependency on child state           */
  /* ------------------------------------------------------------------ */
  render() {
    return `
      <div class="row"${this.disabled ? ' aria-disabled="true"' : ""} part="row">
        <span class="caret" aria-hidden="true">
          <svg viewBox="0 0 16 16"><path d="M6 3l5 5-5 5z"/></svg>
        </span>
        <span class="spacer"></span>
        <slot></slot>
      </div>
      <div class="children" role="group" part="children">
        <slot name="children"></slot>
      </div>
    `;
  }
  /* ------------------------------------------------------------------ */
  /*  Slot distribution                                                  */
  /* ------------------------------------------------------------------ */
  _assignSlots() {
    let hasChildren = false;
    for (const child of this.children) {
      if (child.tagName === "UI-TREE-ITEM") {
        if (child.getAttribute("slot") !== "children") {
          child.setAttribute("slot", "children");
        }
        hasChildren = true;
      }
    }
    if (hasChildren) {
      if (!this.hasAttribute("data-has-children")) {
        this.setAttribute("data-has-children", "");
        this.setAttribute("aria-expanded", this.expanded ? "true" : "false");
      }
    } else {
      this.removeAttribute("data-has-children");
      this.removeAttribute("aria-expanded");
    }
  }
  _observeChildren() {
    this._childObserver = new MutationObserver(() => this._assignSlots());
    this._childObserver.observe(this, { childList: true });
  }
  _update() {
    this._applyStyles();
    super._update();
  }
  _applyStyles() {
    this._vars = {};
    const bg = this.background;
    const color = this.color;
    const size = this.size;
    if (bg) {
      this._vars["--_bg"] = resolveColor(bg);
      this._vars["--_bg-hover"] = resolveColorHover(bg);
    }
    if (color) this._vars["--_color"] = resolveColor(color);
    if (size) this._vars["--_size"] = resolveSize(size);
    this._setDynamicVars(this._vars);
  }
  /** Derive selected-state and hover colours from the nearest inherited background token. */
  _applySelectedColors() {
    const token = getComputedStyle(this).getPropertyValue("--ui-background-token").trim();
    if (!token) return;
    if (!this.background) {
      const hoverBg = resolveColorLighter(token, 1);
      if (hoverBg) this._vars["--_bg-hover"] = hoverBg;
    }
    const selectBg = resolveColorLighter(token, 4);
    const selectBgHover = resolveColorLighter(token, 3);
    const selectColor = resolveColorDarker(token, 4);
    if (selectBg) this._vars["--_select-bg"] = selectBg;
    if (selectBgHover) this._vars["--_select-bg-hover"] = selectBgHover;
    if (selectColor) this._vars["--_select-color"] = selectColor;
    this._setDynamicVars(this._vars);
  }
  /* ------------------------------------------------------------------ */
  /*  Expand / collapse                                                  */
  /* ------------------------------------------------------------------ */
  get _hasChildren() {
    return this.hasAttribute("data-has-children");
  }
  expand() {
    if (!this._hasChildren || this.expanded) return;
    this.expanded = true;
    this.setAttribute("aria-expanded", "true");
    this.emit("ui-expand");
  }
  collapse() {
    if (!this._hasChildren || !this.expanded) return;
    this.expanded = false;
    this.setAttribute("aria-expanded", "false");
    this.emit("ui-collapse");
  }
  toggle() {
    this.expanded ? this.collapse() : this.expand();
  }
  /* ------------------------------------------------------------------ */
  /*  Selection                                                          */
  /* ------------------------------------------------------------------ */
  select() {
    if (this.disabled) return;
    this.selected = true;
    this.emit("ui-select", { value: this.value, item: this });
  }
  deselect() {
    this.selected = false;
  }
  /* ------------------------------------------------------------------ */
  /*  Event handlers                                                     */
  /* ------------------------------------------------------------------ */
  _onClick(e) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    const origin = e.target.closest("ui-tree-item");
    if (origin && origin !== this) return;
    e.stopPropagation();
    if (this._hasChildren) {
      this.toggle();
    }
    this.select();
    if (this.href) {
      if (this.channel) {
        document.dispatchEvent(new CustomEvent(this.channel, {
          bubbles: false,
          detail: { src: this.href, item: this }
        }));
      } else {
        const navEvent = new CustomEvent("ui-navigate", {
          bubbles: true,
          composed: true,
          cancelable: true,
          detail: { href: this.href, target: this.target, item: this }
        });
        if (this.dispatchEvent(navEvent)) {
          if (this.target) {
            window.open(this.href, this.target);
          } else {
            window.location.href = this.href;
          }
        }
      }
    }
  }
  _onKeyDown(e) {
    const origin = e.target.closest("ui-tree-item");
    if (origin && origin !== this) return;
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        e.stopPropagation();
        if (this._hasChildren && !this.expanded) {
          this.expand();
        } else if (this._hasChildren && this.expanded) {
          const firstChild = this.querySelector(":scope > ui-tree-item:not([disabled])");
          if (firstChild) firstChild.focus();
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        e.stopPropagation();
        if (this._hasChildren && this.expanded) {
          this.collapse();
        } else {
          const parent = this.parentElement?.closest("ui-tree-item");
          if (parent) parent.focus();
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        e.stopPropagation();
        this._focusNext();
        break;
      case "ArrowUp":
        e.preventDefault();
        e.stopPropagation();
        this._focusPrev();
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        e.stopPropagation();
        if (this._hasChildren) this.toggle();
        this.select();
        if (this.href) {
          if (this.channel) {
            document.dispatchEvent(new CustomEvent(this.channel, {
              bubbles: false,
              detail: { src: this.href, item: this }
            }));
          } else {
            const navEvent = new CustomEvent("ui-navigate", {
              bubbles: true,
              composed: true,
              cancelable: true,
              detail: { href: this.href, target: this.target, item: this }
            });
            if (this.dispatchEvent(navEvent)) {
              if (this.target) {
                window.open(this.href, this.target);
              } else {
                window.location.href = this.href;
              }
            }
          }
        }
        break;
      case "Home":
        e.preventDefault();
        e.stopPropagation();
        this._focusFirst();
        break;
      case "End":
        e.preventDefault();
        e.stopPropagation();
        this._focusLast();
        break;
    }
  }
  /* ------------------------------------------------------------------ */
  /*  Keyboard navigation helpers                                        */
  /* ------------------------------------------------------------------ */
  /** Get all visible tree items in the tree (flattened, depth-first). */
  _getVisibleItems() {
    const tree = this.closest("ui-tree");
    if (!tree) return [];
    return [...tree.querySelectorAll("ui-tree-item:not([disabled])")].filter((item) => {
      let el = item.parentElement?.closest("ui-tree-item");
      while (el) {
        if (!el.expanded) return false;
        el = el.parentElement?.closest("ui-tree-item");
      }
      return true;
    });
  }
  _focusNext() {
    const items = this._getVisibleItems();
    const idx = items.indexOf(this);
    if (idx >= 0 && idx < items.length - 1) {
      items[idx + 1].focus();
    }
  }
  _focusPrev() {
    const items = this._getVisibleItems();
    const idx = items.indexOf(this);
    if (idx > 0) {
      items[idx - 1].focus();
    }
  }
  _focusFirst() {
    const items = this._getVisibleItems();
    if (items.length) items[0].focus();
  }
  _focusLast() {
    const items = this._getVisibleItems();
    if (items.length) items[items.length - 1].focus();
  }
};
customElements.define("ui-tree-item", UITreeItem);

// src/components/pagination/pagination.js
var UIPagination = class extends UIComponent {
  static properties = {
    total: { type: Number, default: 1, reflect: true },
    current: { type: Number, default: 1, reflect: true },
    siblings: { type: Number, default: 1, reflect: true },
    background: { type: String, default: "indigo-500", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    compact: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
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
    `
    );
  }
  constructor() {
    super();
    this._onPageClick = this._onPageClick.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot?.addEventListener("click", this._onPageClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.shadowRoot?.removeEventListener("click", this._onPageClick);
  }
  _update() {
    this._applyStyles();
    super._update();
  }
  _applyStyles() {
    const vars = {};
    if (this.background) {
      vars["--_active-bg"] = resolveColor(this.background);
      vars["--_active-color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    }
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
  }
  _onPageClick(e) {
    const btn = e.target.closest("button");
    if (!btn || btn.disabled || btn.classList.contains("active")) return;
    const page = Number(btn.dataset.page);
    if (!page || page === this.current) return;
    this.current = page;
    this.emit("ui-change", { page });
  }
  /** Build the page-number range with ellipsis. */
  _getRange() {
    const total = Math.max(1, this.total);
    const current = Math.max(1, Math.min(this.current, total));
    const siblings = Math.max(0, this.siblings);
    const range = [];
    const left = Math.max(2, current - siblings);
    const right = Math.min(total - 1, current + siblings);
    range.push(1);
    if (left > 2) range.push("\u2026");
    for (let i = left; i <= right; i++) range.push(i);
    if (right < total - 1) range.push("\u2026");
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
        <button class="arrow" data-page="${current - 1}" ${current <= 1 ? "disabled" : ""} aria-label="Previous page">${prevSvg}</button>
        <span class="compact-label">${current} / ${total}</span>
        <button class="arrow" data-page="${current + 1}" ${current >= total ? "disabled" : ""} aria-label="Next page">${nextSvg}</button>
      `;
    }
    const range = this._getRange();
    const pages = range.map((p) => {
      if (p === "\u2026") return '<span class="ellipsis">\u2026</span>';
      const active = p === current ? ' class="active" aria-current="page"' : "";
      return `<button data-page="${p}"${active}>${p}</button>`;
    }).join("");
    return `
      <button class="arrow" data-page="${current - 1}" ${current <= 1 ? "disabled" : ""} aria-label="Previous page">${prevSvg}</button>
      ${pages}
      <button class="arrow" data-page="${current + 1}" ${current >= total ? "disabled" : ""} aria-label="Next page">${nextSvg}</button>
    `;
  }
};
customElements.define("ui-pagination", UIPagination);

// src/components/menu/menu.js
var UIMenu = class extends UIComponent {
  static properties = {
    target: { type: String, default: "", reflect: true },
    elevation: { type: String, default: "3", reflect: true },
    size: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    open: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: contents;
      }

      .menu {
        position: fixed;
        z-index: 10000;
        min-width: 10em;
        padding: 0.35em 0;
        border-radius: var(--ui-radius, 0.5em);
        border: 1px solid var(--ui-border-color, #e5e7eb);
        background: var(--_bg, var(--ui-bg, #fff));
        color: var(--_color, var(--ui-text-color, #1f2937));
        box-shadow: var(--_elevation, 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05));
        opacity: 0;
        transform: scale(0.95);
        transition: opacity 0.12s ease, transform 0.12s ease;
        pointer-events: none;
        font-family: inherit;
      }

      .menu.visible {
        opacity: 1;
        transform: scale(1);
        pointer-events: auto;
      }
    `
    );
  }
  constructor() {
    super();
    this._x = 0;
    this._y = 0;
    this._onContextMenu = this._onContextMenu.bind(this);
    this._onDocClick = this._onDocClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onItemClick = this._onItemClick.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this._attachTarget();
    this.addEventListener("click", this._onItemClick);
  }
  disconnectedCallback() {
    this._detachTarget();
    this.removeEventListener("click", this._onItemClick);
    document.removeEventListener("click", this._onDocClick, true);
    document.removeEventListener("keydown", this._onKeyDown);
    super.disconnectedCallback();
  }
  _applyStyles() {
    const vars = {};
    if (this.background) vars["--_bg"] = resolveColor(this.background);
    if (this.color) vars["--_color"] = resolveColor(this.color);
    const elev = resolveElevation(this.elevation);
    if (elev) vars["--_elevation"] = elev;
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
  }
  _update() {
    this._applyStyles();
    this._detachTarget();
    this._attachTarget();
    super._update();
  }
  _attachTarget() {
    if (!this.target) return;
    const el = document.querySelector(this.target);
    if (el) {
      this._targetEl = el;
      el.addEventListener("contextmenu", this._onContextMenu);
    }
  }
  _detachTarget() {
    if (this._targetEl) {
      this._targetEl.removeEventListener("contextmenu", this._onContextMenu);
      this._targetEl = null;
    }
  }
  _onContextMenu(e) {
    e.preventDefault();
    this.show(e.clientX, e.clientY);
  }
  _onDocClick(e) {
    const menu = this.shadowRoot?.querySelector(".menu");
    if (menu && !menu.contains(e.target) && !this.contains(e.target)) {
      this.hide();
    }
  }
  _onKeyDown(e) {
    if (e.key === "Escape") this.hide();
  }
  _onItemClick(e) {
    const item = e.target.closest("ui-menu-item");
    if (item && !item.hasAttribute("disabled")) {
      this.emit("ui-select", { value: item.getAttribute("value") || "", item });
      this.hide();
    }
  }
  /** Open the menu at the given viewport coordinates. */
  show(x = 0, y = 0) {
    this._x = x;
    this._y = y;
    const menu = this.shadowRoot?.querySelector(".menu");
    if (!menu) return;
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
    menu.classList.add("visible");
    requestAnimationFrame(() => {
      const rect = menu.getBoundingClientRect();
      if (rect.right > window.innerWidth) menu.style.left = `${window.innerWidth - rect.width - 4}px`;
      if (rect.bottom > window.innerHeight) menu.style.top = `${window.innerHeight - rect.height - 4}px`;
    });
    if (!this.open) this.open = true;
    document.addEventListener("click", this._onDocClick, true);
    document.addEventListener("keydown", this._onKeyDown);
    this.emit("ui-open");
  }
  /** Close the menu. */
  hide() {
    const menu = this.shadowRoot?.querySelector(".menu");
    if (menu) menu.classList.remove("visible");
    if (this.hasAttribute("open")) this.removeAttribute("open");
    document.removeEventListener("click", this._onDocClick, true);
    document.removeEventListener("keydown", this._onKeyDown);
    this.emit("ui-close");
  }
  render() {
    return `
      <div class="menu" role="menu">
        <slot></slot>
      </div>
    `;
  }
};
var UIMenuItem = class extends UIComponent {
  static properties = {
    value: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    divider: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.45;
      }

      .item {
        display: flex;
        align-items: center;
        gap: 0.6em;
        padding: 0.45em 1em;
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
        line-height: 1.4;
        white-space: nowrap;
        transition: background 0.1s ease;
        user-select: none;
      }

      .item:hover {
        background: var(--ui-bg-subtle, rgba(0,0,0,0.06));
      }

      :host([divider]) .item {
        padding: 0;
        margin: 0.25em 0;
        height: 1px;
        background: var(--ui-border-color, #e5e7eb);
        cursor: default;
      }

      :host([divider]) .item:hover {
        background: var(--ui-border-color, #e5e7eb);
      }
    `
    );
  }
  render() {
    return `<div class="item" role="menuitem"><slot></slot></div>`;
  }
};
customElements.define("ui-menu", UIMenu);
customElements.define("ui-menu-item", UIMenuItem);

// src/components/popover/popover.js
var UIPopover = class extends UIComponent {
  static properties = {
    placement: { type: String, default: "bottom", reflect: true },
    trigger: { type: String, default: "click", reflect: true },
    elevation: { type: String, default: "3", reflect: true },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    width: { type: String, default: "", reflect: true },
    padding: { type: String, default: "", reflect: true },
    open: { type: Boolean, default: false, reflect: true },
    arrow: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: inline-block;
        position: relative;
      }

      .trigger-wrap {
        display: inline-block;
        cursor: pointer;
      }

      .panel {
        position: absolute;
        z-index: 9999;
        min-width: 8em;
        padding: var(--_padding, 0.75em 1em);
        border-radius: var(--ui-radius, 0.5em);
        border: 1px solid var(--ui-border-color, #e5e7eb);
        background: var(--_bg, var(--ui-bg, #fff));
        color: var(--_color, var(--ui-text-color, #1f2937));
        box-shadow: var(--_elevation, 0 10px 15px rgba(0,0,0,0.1));
        font-family: inherit;
        font-size: inherit;
        line-height: 1.5;
        opacity: 0;
        transform: scale(0.95);
        pointer-events: none;
        transition: opacity 0.15s ease, transform 0.15s ease;
        box-sizing: border-box;
      }

      .panel.visible {
        opacity: 1;
        transform: scale(1);
        pointer-events: auto;
      }

      /* \u2500\u2500 Placement \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      :host([placement="bottom"]) .panel { top: 100%; left: 50%; transform-origin: top center; margin-top: 0.5em; }
      :host([placement="bottom"]) .panel.visible { transform: translateX(-50%) scale(1); }
      :host([placement="bottom"]) .panel:not(.visible) { transform: translateX(-50%) scale(0.95); }

      :host([placement="top"]) .panel { bottom: 100%; left: 50%; transform-origin: bottom center; margin-bottom: 0.5em; }
      :host([placement="top"]) .panel.visible { transform: translateX(-50%) scale(1); }
      :host([placement="top"]) .panel:not(.visible) { transform: translateX(-50%) scale(0.95); }

      :host([placement="left"]) .panel { right: 100%; top: 50%; transform-origin: center right; margin-right: 0.5em; }
      :host([placement="left"]) .panel.visible { transform: translateY(-50%) scale(1); }
      :host([placement="left"]) .panel:not(.visible) { transform: translateY(-50%) scale(0.95); }

      :host([placement="right"]) .panel { left: 100%; top: 50%; transform-origin: center left; margin-left: 0.5em; }
      :host([placement="right"]) .panel.visible { transform: translateY(-50%) scale(1); }
      :host([placement="right"]) .panel:not(.visible) { transform: translateY(-50%) scale(0.95); }

      /* \u2500\u2500 Arrow \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .arrow-tip {
        display: none;
        position: absolute;
        width: 0.6em;
        height: 0.6em;
        background: var(--_bg, var(--ui-bg, #fff));
        border: 1px solid var(--ui-border-color, #e5e7eb);
        transform: rotate(45deg);
      }

      :host([arrow]) .arrow-tip { display: block; }

      :host([placement="bottom"][arrow]) .arrow-tip { top: -0.35em; left: 50%; margin-left: -0.3em; border-right: none; border-bottom: none; }
      :host([placement="top"][arrow]) .arrow-tip    { bottom: -0.35em; left: 50%; margin-left: -0.3em; border-left: none; border-top: none; }
      :host([placement="left"][arrow]) .arrow-tip   { right: -0.35em; top: 50%; margin-top: -0.3em; border-left: none; border-bottom: none; }
      :host([placement="right"][arrow]) .arrow-tip  { left: -0.35em; top: 50%; margin-top: -0.3em; border-right: none; border-top: none; }
    `
    );
  }
  constructor() {
    super();
    this._onDocClick = this._onDocClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._hoverTimeout = null;
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
  }
  disconnectedCallback() {
    document.removeEventListener("click", this._onDocClick, true);
    document.removeEventListener("keydown", this._onKeyDown);
    clearTimeout(this._hoverTimeout);
    super.disconnectedCallback();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (!this._initialised) return;
    this._applyStyles();
  }
  _applyStyles() {
    const vars = {};
    if (this._background) vars["--_bg"] = resolveColor(this._background);
    if (this._color) vars["--_color"] = resolveColor(this._color);
    if (this._padding) vars["--_padding"] = this._padding;
    const elev = resolveElevation(this._elevation);
    if (elev) vars["--_elevation"] = elev;
    const fontSize = resolveSize(this._size);
    if (fontSize) vars["font-size"] = fontSize;
    if (this._width) vars["--_width"] = this._width;
    this._setDynamicVars(vars);
  }
  _update() {
    super._update();
    const panel = this.shadowRoot?.querySelector(".panel");
    if (panel && this._width) panel.style.width = this._width;
    const triggerWrap = this.shadowRoot?.querySelector(".trigger-wrap");
    if (!triggerWrap) return;
    if (this._trigger === "click") {
      triggerWrap.addEventListener("click", (e) => {
        e.stopPropagation();
        this._open ? this.hide() : this.show();
      });
    } else if (this._trigger === "hover") {
      triggerWrap.addEventListener("mouseenter", () => {
        clearTimeout(this._hoverTimeout);
        this.show();
      });
      triggerWrap.addEventListener("mouseleave", () => {
        this._hoverTimeout = setTimeout(() => this.hide(), 200);
      });
      const panelEl = this.shadowRoot?.querySelector(".panel");
      if (panelEl) {
        panelEl.addEventListener("mouseenter", () => clearTimeout(this._hoverTimeout));
        panelEl.addEventListener("mouseleave", () => {
          this._hoverTimeout = setTimeout(() => this.hide(), 200);
        });
      }
    }
    if (this._open) this.show();
  }
  show() {
    const panel = this.shadowRoot?.querySelector(".panel");
    if (!panel) return;
    panel.classList.add("visible");
    if (!this.hasAttribute("open")) this.setAttribute("open", "");
    document.addEventListener("click", this._onDocClick, true);
    document.addEventListener("keydown", this._onKeyDown);
    this.emit("ui-open");
  }
  hide() {
    const panel = this.shadowRoot?.querySelector(".panel");
    if (panel) panel.classList.remove("visible");
    this.removeAttribute("open");
    document.removeEventListener("click", this._onDocClick, true);
    document.removeEventListener("keydown", this._onKeyDown);
    this.emit("ui-close");
  }
  _onDocClick(e) {
    if (!this.contains(e.target) && !this.shadowRoot?.contains(e.target)) {
      this.hide();
    }
  }
  _onKeyDown(e) {
    if (e.key === "Escape") this.hide();
  }
  render() {
    return `
      <div class="trigger-wrap">
        <slot name="trigger"></slot>
      </div>
      <div class="panel" role="dialog">
        <div class="arrow-tip"></div>
        <slot></slot>
      </div>
    `;
  }
};
customElements.define("ui-popover", UIPopover);

// src/components/clipboard/clipboard.js
var UIClipboard = class extends UIComponent {
  static properties = {
    value: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    feedback: { type: String, default: "Copied!", reflect: true },
    duration: { type: Number, default: 2e3, reflect: true },
    flat: { type: Boolean, default: false, reflect: true },
    outline: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: inline-block;
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }

      .btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.4em;
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
        font-weight: 500;
        line-height: 1;
        padding: 0.45em 0.75em;
        border-radius: var(--ui-button-radius, 0.375em);
        background: var(--_bg, var(--ui-bg-subtle, rgba(0,0,0,0.06)));
        color: var(--_color, var(--ui-text-color, #374151));
        border: 1px solid transparent;
        transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;
        user-select: none;
        white-space: nowrap;
        box-sizing: border-box;
      }

      :host([flat]) .btn {
        background: transparent;
        border-color: transparent;
      }

      :host([outline]) .btn {
        background: transparent;
        border-color: var(--_outline, var(--ui-border-color, #d1d5db));
      }

      .btn:hover {
        filter: brightness(0.95);
      }

      .btn:active {
        transform: scale(0.96);
      }

      .btn:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: 0.125em;
      }

      .icon {
        width: 1.1em;
        height: 1.1em;
        flex-shrink: 0;
      }

      .icon svg {
        display: block;
        width: 100%;
        height: 100%;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .label {
        display: inline-block;
      }

      /* Success state */
      :host([data-copied]) .icon-copy { display: none; }
      :host(:not([data-copied])) .icon-check { display: none; }
      :host([data-copied]) .btn {
        color: var(--ui-green-600, #16a34a);
      }
    `
    );
  }
  constructor() {
    super();
    this._timer = null;
    this._onBtnClick = this._onBtnClick.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this._attachListeners();
  }
  disconnectedCallback() {
    clearTimeout(this._timer);
    this._detachListeners();
    super.disconnectedCallback();
  }
  _attachListeners() {
    this._detachListeners();
    const btn = this.shadowRoot?.querySelector(".btn");
    if (btn) btn.addEventListener("click", this._onBtnClick);
  }
  _detachListeners() {
    const btn = this.shadowRoot?.querySelector(".btn");
    if (btn) btn.removeEventListener("click", this._onBtnClick);
  }
  _onBtnClick() {
    this._copy();
  }
  _applyStyles() {
    const vars = {};
    if (this.background) {
      vars["--_bg"] = resolveColor(this.background);
      vars["--_color"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars["--_color"] = resolveColor(this.color);
    }
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
  }
  _update() {
    this._applyStyles();
    super._update();
    this._attachListeners();
  }
  async _copy() {
    if (this.disabled || !this.value) return;
    try {
      await navigator.clipboard.writeText(this.value);
      this.setAttribute("data-copied", "");
      this.emit("ui-copy", { value: this.value });
      clearTimeout(this._timer);
      this._timer = setTimeout(() => {
        this.removeAttribute("data-copied");
      }, this.duration);
    } catch (err) {
      console.warn("[ui-clipboard] Copy failed:", err);
    }
  }
  render() {
    const copySvg = '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
    const checkSvg = '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>';
    const fb = this.feedback || "Copied!";
    return `
      <button class="btn" aria-label="Copy to clipboard">
        <span class="icon icon-copy">${copySvg}</span>
        <span class="icon icon-check">${checkSvg}</span>
        <span class="label"><slot>${this.hasAttribute("data-copied") ? fb : ""}</slot></span>
      </button>
    `;
  }
};
customElements.define("ui-clipboard", UIClipboard);

// src/components/kbd/kbd.js
var UIKbd = class extends UIComponent {
  static properties = {
    size: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    separator: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: inline-flex;
        align-items: center;
        gap: 0.3em;
        font-family: var(--ui-font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Code", monospace);
        /* font-size is set dynamically on :host via resolveSize(). */
        line-height: 1;
        vertical-align: baseline;
      }

      .key {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 1.6em;
        height: 1.6em;
        padding: 0.1em 0.4em;
        border-radius: 0.25em;
        border: 1px solid var(--_border, var(--ui-border-color, #d1d5db));
        border-bottom-width: 2px;
        background: var(--_bg, var(--ui-bg, #fff));
        color: var(--_color, var(--ui-text-color, #1f2937));
        font-size: inherit;
        font-family: inherit;
        font-weight: 600;
        white-space: nowrap;
        box-shadow: 0 1px 0 rgba(0,0,0,0.08);
        box-sizing: border-box;
      }

      .sep {
        color: var(--ui-text-muted, #9ca3af);
        font-weight: 400;
        font-size: 0.85em;
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
    this.shadowRoot?.querySelector("slot")?.addEventListener("slotchange", () => this._renderKeys());
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) {
      this._applyStyles();
      if (name === "separator") this._renderKeys();
    }
  }
  _applyStyles() {
    const vars = {};
    vars["font-size"] = resolveSize(this._size) || "0.85em";
    if (this._background) {
      const bg = resolveColor(this._background);
      vars["--_bg"] = bg;
      vars["--_border"] = bg;
    }
    if (this._color) vars["--_color"] = resolveColor(this._color);
    this._setDynamicVars(vars);
  }
  _update() {
    super._update();
    queueMicrotask(() => this._renderKeys());
  }
  _renderKeys() {
    const slot = this.shadowRoot?.querySelector("slot");
    if (!slot) return;
    const text = this._getSlotText(slot).trim();
    if (!text) return;
    const container = this.shadowRoot?.querySelector(".key-container");
    if (!container) return;
    const sep = this._separator || "+";
    const parts = text.split(/\s*\+\s*/);
    container.innerHTML = parts.map((key, i) => {
      const sepHtml = i < parts.length - 1 ? `<span class="sep">${sep.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</span>` : "";
      const esc = key.replace(/&/g, "&amp;").replace(/</g, "&lt;");
      return `<span class="key">${esc}</span>${sepHtml}`;
    }).join("");
  }
  _getSlotText(slot) {
    return slot.assignedNodes({ flatten: true }).map((n) => n.textContent || "").join("");
  }
  render() {
    return `
      <span class="key-container"></span>
      <slot style="display:none"></slot>
    `;
  }
};
customElements.define("ui-kbd", UIKbd);

// src/components/timeline/timeline.js
var UITimeline = class extends UIComponent {
  static properties = {
    size: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    lineColor: { type: String, default: "", reflect: true, attribute: "line-color" },
    alternate: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        position: relative;
        font-family: inherit;
      }

      .line {
        position: absolute;
        left: calc(0.55em + 1px);
        top: 0;
        bottom: 1.5em;
        width: 2px;
        transform: translateX(-50%);
        background: var(--_line-color, var(--ui-border-color, #d1d5db));
      }

      :host([alternate]) .line {
        left: 50%;
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
    requestAnimationFrame(() => this._applyAlternate());
    this._childObserver = new MutationObserver(() => this._applyAlternate());
    this._childObserver.observe(this, { childList: true });
  }
  disconnectedCallback() {
    super.disconnectedCallback?.();
    this._childObserver?.disconnect();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) {
      this._applyStyles();
      if (name === "alternate") this._applyAlternate();
    }
  }
  _applyStyles() {
    const vars = {};
    if (this._lineColor) vars["--_line-color"] = resolveColor(this._lineColor);
    else if (this._color) vars["--_line-color"] = resolveColor(this._color);
    if (this._color) vars["--_timeline-color"] = resolveColor(this._color);
    const fontSize = resolveSize(this._size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
  }
  /** Mark odd/even children for alternate layout */
  _applyAlternate() {
    const items = [...this.querySelectorAll(":scope > ui-timeline-item")];
    items.forEach((item, i) => {
      if (this._alternate) {
        item.setAttribute("_alt", i % 2 === 0 ? "left" : "right");
      } else {
        item.removeAttribute("_alt");
      }
    });
  }
  render() {
    return `
      <div class="line"></div>
      <slot></slot>
    `;
  }
};
var UITimelineItem = class extends UIComponent {
  static properties = {
    color: { type: String, default: "", reflect: true },
    icon: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        position: relative;
        padding-left: 2em;
        padding-bottom: 1.5em;
        font-family: inherit;
        line-height: 1.5;
      }

      :host(:last-child) {
        padding-bottom: 0;
      }

      /* Alternate layout \u2014 attribute set by parent ui-timeline */
      :host([_alt="right"]) {
        margin-left: 50%;
        padding-left: 2em;
        padding-right: 0;
      }

      :host([_alt="left"]) {
        width: 50%;
        text-align: right;
        padding-left: 0;
        padding-right: 2em;
      }

      :host([_alt="left"]) .dot {
        left: auto;
        right: calc(-0.55em - 1px);
        transform: translateX(50%);
      }

      :host([_alt="right"]) .dot {
        left: calc(-0.55em - 1px);
        transform: translateX(-50%);
      }

      .dot {
        position: absolute;
        left: calc(0.55em + 1px);
        transform: translateX(-50%);
        top: 0.35em;
        width: 0.75em;
        height: 0.75em;
        border-radius: 50%;
        background: var(--_dot-color, var(--_timeline-color, var(--ui-indigo-500, #6366f1)));
        border: 2px solid var(--ui-bg, #fff);
        box-sizing: border-box;
        z-index: 1;
      }

      .dot.has-icon {
        width: 1.1em;
        height: 1.1em;
        top: 0.15em;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--_dot-color, var(--_timeline-color, var(--ui-indigo-500, #6366f1)));
        color: #fff;
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyStyles();
  }
  _applyStyles() {
    const vars = {};
    if (this._color) vars["--_dot-color"] = resolveColor(this._color);
    this._setDynamicVars(vars);
  }
  render() {
    const esc = (s) => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const iconClass = this._icon ? " has-icon" : "";
    const dotContent = this._icon ? `<ui-icon size="0.65em">${esc(this._icon)}</ui-icon>` : "";
    return `
      <div class="dot${iconClass}">${dotContent}</div>
      <slot></slot>
    `;
  }
};
customElements.define("ui-timeline", UITimeline);
customElements.define("ui-timeline-item", UITimelineItem);

// src/components/steps/steps.js
var UISteps = class extends UIComponent {
  static properties = {
    current: { type: Number, default: 0, reflect: true },
    background: { type: String, default: "indigo-500", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    vertical: { type: Boolean, default: false, reflect: true },
    clickable: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        font-family: inherit;
      }

      .steps {
        display: flex;
        align-items: flex-start;
        gap: 0;
        counter-reset: step;
      }

      :host([vertical]) .steps {
        flex-direction: column;
      }

      ::slotted(ui-step) {
        flex: 1;
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
    this._syncSteps();
    this.addEventListener("click", this._onClick.bind(this));
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) {
      this._applyStyles();
      this._syncSteps();
    }
  }
  _applyStyles() {
    const vars = {};
    const fontSize = resolveSize(this._size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
  }
  _syncSteps() {
    const steps = [...this.querySelectorAll("ui-step")];
    const activeColor = resolveColor(this._background) || "var(--ui-indigo-500, #6366f1)";
    const textColor = this._color ? resolveColor(this._color) : contrastColorFor(this._background);
    steps.forEach((step, i) => {
      step._index = i;
      step._state = i < this._current ? "completed" : i === this._current ? "active" : "upcoming";
      step._activeColor = activeColor;
      step._activeTextColor = textColor;
      step._vertical = this._vertical;
      step._isLast = i === steps.length - 1;
      step._clickable = this._clickable;
      step._refresh();
    });
  }
  _onClick(e) {
    if (!this._clickable) return;
    const step = e.target.closest("ui-step");
    if (step && step._state === "completed") {
      this.current = step._index;
      this.emit("ui-change", { index: step._index });
    }
  }
  _update() {
    super._update();
    queueMicrotask(() => this._syncSteps());
  }
  render() {
    return `
      <div class="steps" role="list">
        <slot></slot>
      </div>
    `;
  }
};
var UIStep = class extends UIComponent {
  static properties = {
    label: { type: String, default: "", reflect: true },
    description: { type: String, default: "", reflect: true },
    icon: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: flex;
        align-items: flex-start;
        flex: 1;
        font-family: inherit;
      }

      .step {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        flex: 1;
      }

      .header {
        display: flex;
        align-items: center;
        width: 100%;
      }

      .connector {
        flex: 1;
        height: 2px;
        background: var(--ui-border-color, #d1d5db);
        transition: background 0.3s ease;
      }

      .connector.completed {
        background: var(--_active-color, var(--ui-indigo-500, #6366f1));
      }

      .connector.hidden {
        visibility: hidden;
      }

      .circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2em;
        height: 2em;
        border-radius: 50%;
        font-weight: 600;
        font-size: 0.85em;
        flex-shrink: 0;
        transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        box-sizing: border-box;
        border: 2px solid var(--ui-border-color, #d1d5db);
        background: var(--ui-bg, #fff);
        color: var(--ui-text-muted, #9ca3af);
      }

      .circle.active {
        border-color: var(--_active-color, var(--ui-indigo-500, #6366f1));
        background: var(--_active-color, var(--ui-indigo-500, #6366f1));
        color: var(--_active-text, #fff);
      }

      .circle.completed {
        border-color: var(--_active-color, var(--ui-indigo-500, #6366f1));
        background: var(--_active-color, var(--ui-indigo-500, #6366f1));
        color: var(--_active-text, #fff);
        cursor: pointer;
      }

      .circle.completed svg {
        width: 1em;
        height: 1em;
        fill: none;
        stroke: currentColor;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .content {
        text-align: center;
        margin-top: 0.5em;
        padding: 0 0.25em;
      }

      .label {
        font-weight: 600;
        font-size: 0.85em;
        color: var(--ui-text-color, #1f2937);
      }

      .label.muted {
        color: var(--ui-text-muted, #9ca3af);
      }

      .desc {
        font-size: 0.75em;
        color: var(--ui-text-muted, #6b7280);
        margin-top: 0.15em;
      }

      /* Vertical mode */
      :host([data-vertical]) .step {
        flex-direction: row;
        align-items: flex-start;
      }

      :host([data-vertical]) .header {
        flex-direction: column;
        width: auto;
        align-items: center;
      }

      :host([data-vertical]) .connector {
        width: 2px;
        height: 2em;
        flex: none;
      }

      :host([data-vertical]) .content {
        text-align: left;
        margin-top: 0;
        margin-left: 0.75em;
        padding-bottom: 1.5em;
      }
    `
    );
  }
  constructor() {
    super();
    this._index = 0;
    this._state = "upcoming";
    this._activeColor = "";
    this._activeTextColor = "";
    this._vertical = false;
    this._isLast = false;
    this._clickable = false;
  }
  _refresh() {
    const vars = {};
    if (this._activeColor) vars["--_active-color"] = this._activeColor;
    if (this._activeTextColor) vars["--_active-text"] = this._activeTextColor;
    this._setDynamicVars(vars);
    if (this._vertical) this.setAttribute("data-vertical", "");
    else this.removeAttribute("data-vertical");
    const circle = this.shadowRoot?.querySelector(".circle");
    const connLeft = this.shadowRoot?.querySelector(".conn-left");
    const connRight = this.shadowRoot?.querySelector(".conn-right");
    const labelEl = this.shadowRoot?.querySelector(".label");
    if (circle) {
      circle.className = `circle ${this._state}`;
      if (this._state === "completed") {
        circle.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>';
      } else {
        circle.textContent = String(this._index + 1);
      }
    }
    if (connLeft) {
      connLeft.className = `connector${this._index === 0 ? " hidden" : ""}${this._state !== "upcoming" ? " completed" : ""}`;
    }
    if (connRight) {
      connRight.className = `connector${this._isLast ? " hidden" : ""}${this._state === "completed" ? " completed" : ""}`;
    }
    if (labelEl) {
      labelEl.className = `label${this._state === "upcoming" ? " muted" : ""}`;
    }
  }
  render() {
    const esc = (s) => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const desc = this._description ? `<div class="desc">${esc(this._description)}</div>` : "";
    return `
      <div class="step">
        <div class="header">
          <div class="connector conn-left hidden"></div>
          <div class="circle">${this._index + 1}</div>
          <div class="connector conn-right hidden"></div>
        </div>
        <div class="content">
          <div class="label">${esc(this._label)}</div>
          ${desc}
          <slot></slot>
        </div>
      </div>
    `;
  }
};
customElements.define("ui-steps", UISteps);
customElements.define("ui-step", UIStep);

// src/components/stat/stat.js
var UIStat = class extends UIComponent {
  static properties = {
    label: { type: String, default: "", reflect: true },
    value: { type: String, default: "", reflect: true },
    trend: { type: String, default: "", reflect: true },
    icon: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    compact: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
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
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
    const slot = this.shadowRoot?.querySelector(".extra slot");
    if (slot) {
      const toggle = () => {
        const el = this.shadowRoot.querySelector(".extra");
        if (el) el.classList.toggle("empty", slot.assignedNodes({ flatten: true }).length === 0);
      };
      slot.addEventListener("slotchange", toggle);
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
      vars["--_bg"] = bg;
      const contrast = contrastColorFor(this._background);
      if (contrast) {
        if (!this._color) vars["--_color"] = contrast;
        vars["--_label-color"] = contrast === "#ffffff" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)";
        vars["--_border-color"] = "transparent";
      }
    }
    if (this._color) vars["--_color"] = resolveColor(this._color);
    const fontSize = resolveSize(this._size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
  }
  render() {
    const esc = (s) => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const upSvg = '<svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>';
    const downSvg = '<svg viewBox="0 0 24 24"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>';
    const neutralSvg = '<svg viewBox="0 0 24 24"><line x1="2" y1="12" x2="22" y2="12"/><polyline points="16 6 22 12 16 18"/></svg>';
    let trendHtml = "";
    if (this._trend) {
      const t = this._trend.trim().toLowerCase();
      const isUp = t === "up" || t.startsWith("+");
      const isDown = t === "down" || t.startsWith("-");
      const dir = isUp ? "up" : isDown ? "down" : "neutral";
      const svg = dir === "up" ? upSvg : dir === "down" ? downSvg : neutralSvg;
      const label = t === "up" || t === "down" ? "" : esc(this._trend);
      trendHtml = `<span class="trend ${dir}">${svg}${label}</span>`;
    }
    const iconHtml = this._icon ? `<div class="stat-icon"><ui-icon>${esc(this._icon)}</ui-icon></div>` : "";
    const labelHtml = this._label ? `<div class="label">${esc(this._label)}</div>` : "";
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
};
customElements.define("ui-stat", UIStat);

// src/components/image/image.js
var UIImage = class extends UIComponent {
  static properties = {
    src: { type: String, default: "", reflect: true },
    alt: { type: String, default: "", reflect: true },
    width: { type: String, default: "", reflect: true },
    height: { type: String, default: "", reflect: true },
    fit: { type: String, default: "cover", reflect: true },
    radius: { type: String, default: "", reflect: true },
    fallback: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    lazy: { type: Boolean, default: true, reflect: true },
    lightbox: { type: Boolean, default: false, reflect: true },
    caption: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: inline-block;
        position: relative;
        overflow: hidden;
        border-radius: var(--_radius, 0);
        line-height: 0;
      }

      .container {
        position: relative;
        width: var(--_width, auto);
        height: var(--_height, auto);
        overflow: hidden;
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: var(--_fit, cover);
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      img.loaded {
        opacity: 1;
      }

      :host([lightbox]) img {
        cursor: zoom-in;
      }

      /* Loading skeleton */
      .skeleton {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg,
          var(--ui-gray-100, #f3f4f6) 25%,
          var(--ui-gray-200, #e5e7eb) 50%,
          var(--ui-gray-100, #f3f4f6) 75%
        );
        background-size: 200% 100%;
        animation: _shimmer 1.5s ease-in-out infinite;
        transition: opacity 0.3s ease;
      }

      .skeleton.hidden {
        opacity: 0;
        pointer-events: none;
      }

      @keyframes _shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      /* Error state */
      .error-state {
        position: absolute;
        inset: 0;
        display: none;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 0.4em;
        background: var(--ui-gray-50, #f9fafb);
        color: var(--ui-text-muted, #9ca3af);
        font-family: inherit;
        font-size: 0.8em;
      }

      .error-state.visible {
        display: flex;
      }

      .error-state svg {
        width: 2em;
        height: 2em;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.5;
        stroke-linecap: round;
        stroke-linejoin: round;
        opacity: 0.5;
      }

      /* Caption */
      .caption {
        display: block;
        padding: 0.5em 0.25em;
        font-family: inherit;
        font-size: 0.8em;
        color: var(--ui-text-muted, #6b7280);
        line-height: 1.4;
        text-align: center;
      }

      /* \u2500\u2500 Lightbox overlay \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .lightbox {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 10000;
        background: rgba(0,0,0,0.85);
        align-items: center;
        justify-content: center;
        cursor: zoom-out;
        padding: 2em;
      }

      .lightbox.visible {
        display: flex;
      }

      .lightbox img {
        max-width: 90vw;
        max-height: 90vh;
        width: auto;
        height: auto;
        object-fit: contain;
        opacity: 1;
        border-radius: 0.25em;
      }

      .lightbox-close {
        position: absolute;
        top: 1em;
        right: 1em;
        width: 2em;
        height: 2em;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255,255,255,0.15);
        border: none;
        border-radius: 50%;
        color: #fff;
        font-size: 1.2em;
        cursor: pointer;
        transition: background 0.15s;
      }

      .lightbox-close:hover {
        background: rgba(255,255,255,0.3);
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyStyles();
  }
  _applyStyles() {
    const vars = {};
    if (this._width) vars["--_width"] = this._width;
    if (this._height) vars["--_height"] = this._height;
    if (this._fit) vars["--_fit"] = this._fit;
    if (this._radius) vars["--_radius"] = this._radius;
    const fontSize = resolveSize(this._size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
  }
  _update() {
    super._update();
    const img = this.shadowRoot?.querySelector(".main-img");
    if (!img) return;
    img.addEventListener("load", () => {
      img.classList.add("loaded");
      this.shadowRoot?.querySelector(".skeleton")?.classList.add("hidden");
      this.emit("ui-load");
    });
    img.addEventListener("error", () => {
      if (this._fallback && img.src !== this._fallback) {
        img.src = this._fallback;
        return;
      }
      this.shadowRoot?.querySelector(".skeleton")?.classList.add("hidden");
      this.shadowRoot?.querySelector(".error-state")?.classList.add("visible");
      this.emit("ui-error");
    });
    if (this._lightbox) {
      img.addEventListener("click", () => this._openLightbox());
    }
    const lb = this.shadowRoot?.querySelector(".lightbox");
    if (lb) {
      lb.addEventListener("click", () => this._closeLightbox());
    }
  }
  _openLightbox() {
    const lb = this.shadowRoot?.querySelector(".lightbox");
    if (lb) lb.classList.add("visible");
    document.addEventListener("keydown", this._lbKeyHandler = (e) => {
      if (e.key === "Escape") this._closeLightbox();
    });
  }
  _closeLightbox() {
    const lb = this.shadowRoot?.querySelector(".lightbox");
    if (lb) lb.classList.remove("visible");
    if (this._lbKeyHandler) {
      document.removeEventListener("keydown", this._lbKeyHandler);
      this._lbKeyHandler = null;
    }
  }
  render() {
    const esc = (s) => (s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    const loading = this._lazy ? ' loading="lazy"' : "";
    const errorSvg = '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
    const caption = this._caption ? `<span class="caption">${esc(this._caption)}</span>` : "";
    const lightbox = this._lightbox ? `
      <div class="lightbox">
        <button class="lightbox-close" aria-label="Close">\u2715</button>
        <img src="${esc(this._src)}" alt="${esc(this._alt)}">
      </div>
    ` : "";
    return `
      <div class="container">
        <div class="skeleton"></div>
        <img class="main-img" src="${esc(this._src)}" alt="${esc(this._alt)}"${loading}>
        <div class="error-state">${errorSvg}<span>Failed to load</span></div>
      </div>
      ${caption}
      ${lightbox}
    `;
  }
};
customElements.define("ui-image", UIImage);

// src/components/scroll-area/scroll-area.js
var UIScrollArea = class extends UIComponent {
  static properties = {
    height: { type: String, default: "", reflect: true },
    maxHeight: { type: String, default: "", reflect: true, attribute: "max-height" },
    width: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    direction: { type: String, default: "vertical", reflect: true },
    scrollbar: { type: String, default: "thin", reflect: true },
    padding: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        position: relative;
        overflow: hidden;
      }

      .scroll-container {
        width: var(--_width, 100%);
        height: var(--_height, auto);
        max-height: var(--_max-height, none);
        padding: var(--_padding, 0);
        box-sizing: border-box;
      }

      /* \u2500\u2500 Direction \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      :host([direction="vertical"]) .scroll-container,
      :host(:not([direction])) .scroll-container {
        overflow-x: hidden;
        overflow-y: auto;
      }

      :host([direction="horizontal"]) .scroll-container {
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
      }

      :host([direction="both"]) .scroll-container {
        overflow: auto;
      }

      /* \u2500\u2500 Scroll shadows \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .shadow {
        position: absolute;
        pointer-events: none;
        z-index: 1;
        opacity: 0;
        transition: opacity 0.2s ease;
      }

      .shadow-top {
        top: 0; left: 0; right: 0;
        height: var(--ui-scroll-shadow-size, 1.5em);
        background: linear-gradient(to bottom, var(--ui-scroll-shadow-color, rgba(0,0,0,0.07)), transparent);
      }

      .shadow-bottom {
        bottom: 0; left: 0; right: 0;
        height: var(--ui-scroll-shadow-size, 1.5em);
        background: linear-gradient(to top, var(--ui-scroll-shadow-color, rgba(0,0,0,0.07)), transparent);
      }

      :host([data-scroll-up]) .shadow-top { opacity: 1; }
      :host([data-scroll-down]) .shadow-bottom { opacity: 1; }

      /* \u2500\u2500 Thin scrollbar (default) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      :host([scrollbar="thin"]) .scroll-container {
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
      }

      :host([scrollbar="thin"]) .scroll-container:hover {
        scrollbar-color: rgba(0,0,0,0.25) transparent;
      }

      :host([scrollbar="thin"]) .scroll-container::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      :host([scrollbar="thin"]) .scroll-container::-webkit-scrollbar-track {
        background: transparent;
      }

      :host([scrollbar="thin"]) .scroll-container::-webkit-scrollbar-thumb {
        background: transparent;
        border-radius: 3px;
        transition: background 0.2s;
      }

      :host([scrollbar="thin"]) .scroll-container:hover::-webkit-scrollbar-thumb {
        background: rgba(0,0,0,0.25);
      }

      :host([scrollbar="thin"]) .scroll-container::-webkit-scrollbar-thumb:hover {
        background: rgba(0,0,0,0.4);
      }

      /* \u2500\u2500 Hidden scrollbar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      :host([scrollbar="hidden"]) .scroll-container {
        scrollbar-width: none;
      }

      :host([scrollbar="hidden"]) .scroll-container::-webkit-scrollbar {
        display: none;
      }

      /* \u2500\u2500 Auto scrollbar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      :host([scrollbar="auto"]) .scroll-container {
        scrollbar-width: auto;
      }
    `
    );
  }
  connectedCallback() {
    this._atBottom = false;
    this._scrollRAF = null;
    super.connectedCallback();
    this._applyStyles();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._scrollRAF) {
      cancelAnimationFrame(this._scrollRAF);
      this._scrollRAF = null;
    }
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyStyles();
  }
  /**
   * Override to re-attach scroll listeners after DOM rebuild.
   * The base class replaces innerHTML on every render, so listeners on
   * shadow-DOM children are lost.
   */
  _update() {
    if (this._scrollRAF) {
      cancelAnimationFrame(this._scrollRAF);
      this._scrollRAF = null;
    }
    super._update();
    if (this._initialised) this._attachScrollListener();
  }
  /**
   * Attach scroll + slotchange listeners to the current .scroll-container.
   * Called after every render since the container element is replaced.
   */
  _attachScrollListener() {
    const container = this.shadowRoot?.querySelector(".scroll-container");
    if (!container) return;
    container.addEventListener("scroll", () => {
      if (this._scrollRAF) return;
      this._scrollRAF = requestAnimationFrame(() => {
        this._scrollRAF = null;
        this._updateScrollIndicators();
      });
    }, { passive: true });
    const slot = container.querySelector("slot");
    if (slot) {
      slot.addEventListener("slotchange", () => {
        requestAnimationFrame(() => this._updateScrollIndicators());
      });
    }
    if (typeof requestAnimationFrame !== "undefined") {
      requestAnimationFrame(() => this._updateScrollIndicators());
    }
  }
  /** Update scroll shadow visibility based on scroll position. */
  _updateScrollIndicators() {
    const el = this.shadowRoot?.querySelector(".scroll-container");
    if (!el) return;
    const canScrollUp = el.scrollTop > 1;
    const canScrollDown = el.scrollTop < el.scrollHeight - el.clientHeight - 1;
    this.toggleAttribute("data-scroll-up", canScrollUp);
    this.toggleAttribute("data-scroll-down", canScrollDown);
    if (!canScrollDown && el.scrollHeight > el.clientHeight) {
      if (!this._atBottom) {
        this._atBottom = true;
        this.emit("ui-scroll-end");
      }
    } else {
      this._atBottom = false;
    }
  }
  _applyStyles() {
    const vars = {};
    if (this._height) vars["--_height"] = this._height;
    if (this._maxHeight) vars["--_max-height"] = this._maxHeight;
    if (this._width) vars["--_width"] = this._width;
    if (this._padding) vars["--_padding"] = resolveSize(this._padding) || this._padding;
    const fontSize = resolveSize(this._size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
  }
  /** Scroll to the top. */
  scrollToTop(behavior = "smooth") {
    this.shadowRoot?.querySelector(".scroll-container")?.scrollTo({ top: 0, behavior });
  }
  /** Scroll to the bottom. */
  scrollToBottom(behavior = "smooth") {
    const el = this.shadowRoot?.querySelector(".scroll-container");
    if (el) el.scrollTo({ top: el.scrollHeight, behavior });
  }
  /** Scroll to the left edge. */
  scrollToLeft(behavior = "smooth") {
    this.shadowRoot?.querySelector(".scroll-container")?.scrollTo({ left: 0, behavior });
  }
  /** Scroll to the right edge. */
  scrollToRight(behavior = "smooth") {
    const el = this.shadowRoot?.querySelector(".scroll-container");
    if (el) el.scrollTo({ left: el.scrollWidth, behavior });
  }
  render() {
    return `<div class="scroll-container"><slot></slot></div><div class="shadow shadow-top"></div><div class="shadow shadow-bottom"></div>`;
  }
};
customElements.define("ui-scroll-area", UIScrollArea);

// src/components/calendar/calendar.js
var UICalendar = class extends UIComponent {
  static properties = {
    value: { type: String, default: "", reflect: true },
    min: { type: String, default: "", reflect: true },
    max: { type: String, default: "", reflect: true },
    background: { type: String, default: "indigo-500", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    locale: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
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

      /* \u2500\u2500 Header \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

      /* \u2500\u2500 Grid \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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
    `
    );
  }
  constructor() {
    super();
    const now = /* @__PURE__ */ new Date();
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
      const d = /* @__PURE__ */ new Date(this.value + "T00:00:00");
      if (!isNaN(d.getTime())) {
        this._viewYear = d.getFullYear();
        this._viewMonth = d.getMonth();
      }
    }
  }
  _applyStyles() {
    const vars = {};
    if (this.background) {
      vars["--_accent"] = resolveColor(this.background);
      vars["--_accent-text"] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    }
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
  }
  _attachListeners() {
    this.shadowRoot?.querySelector(".prev")?.addEventListener("click", () => {
      this._viewMonth--;
      if (this._viewMonth < 0) {
        this._viewMonth = 11;
        this._viewYear--;
      }
      this._update();
    });
    this.shadowRoot?.querySelector(".next")?.addEventListener("click", () => {
      this._viewMonth++;
      if (this._viewMonth > 11) {
        this._viewMonth = 0;
        this._viewYear++;
      }
      this._update();
    });
    this.shadowRoot?.querySelectorAll(".day:not(.disabled):not(.outside)").forEach((el) => {
      el.addEventListener("click", () => {
        const iso = el.dataset.date;
        if (!iso) return;
        this.value = iso;
        this.emit("ui-change", { value: iso, date: /* @__PURE__ */ new Date(iso + "T00:00:00") });
      });
    });
  }
  render() {
    const loc = this.locale || void 0;
    const year = this._viewYear;
    const month = this._viewMonth;
    const today = /* @__PURE__ */ new Date();
    const todayISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const selectedISO = this.value || "";
    const minDate = this.min ? /* @__PURE__ */ new Date(this.min + "T00:00:00") : null;
    const maxDate = this.max ? /* @__PURE__ */ new Date(this.max + "T00:00:00") : null;
    const monthName = new Date(year, month).toLocaleDateString(loc, { month: "long", year: "numeric" });
    const dayHeaders = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(2024, 0, i + 1);
      dayHeaders.push(d.toLocaleDateString(loc, { weekday: "narrow" }));
    }
    const firstOfMonth = new Date(year, month, 1);
    const startDay = (firstOfMonth.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const cells = [];
    for (let i = startDay - 1; i >= 0; i--) {
      cells.push({ day: daysInPrevMonth - i, outside: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const dateObj = /* @__PURE__ */ new Date(iso + "T00:00:00");
      const disabled = minDate && dateObj < minDate || maxDate && dateObj > maxDate;
      cells.push({
        day: d,
        iso,
        today: iso === todayISO,
        selected: iso === selectedISO,
        disabled
      });
    }
    const remaining = 7 - cells.length % 7;
    if (remaining < 7) {
      for (let d = 1; d <= remaining; d++) {
        cells.push({ day: d, outside: true });
      }
    }
    const prevSvg = '<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>';
    const nextSvg = '<svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>';
    const dayHeadersHtml = dayHeaders.map((h) => `<span class="day-header">${h}</span>`).join("");
    const daysHtml = cells.map((c) => {
      if (c.outside) return `<span class="day outside">${c.day}</span>`;
      const cls = ["day"];
      if (c.today) cls.push("today");
      if (c.selected) cls.push("selected");
      if (c.disabled) cls.push("disabled");
      return `<span class="${cls.join(" ")}" data-date="${c.iso}">${c.day}</span>`;
    }).join("");
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
};
customElements.define("ui-calendar", UICalendar);

// src/components/drawer/drawer.js
var UIDrawer = class extends UIComponent {
  static properties = {
    open: { type: Boolean, default: false, reflect: true },
    placement: { type: String, default: "right", reflect: true },
    width: { type: String, default: "320px", reflect: true },
    height: { type: String, default: "320px", reflect: true },
    elevation: { type: String, default: "4", reflect: true },
    background: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    label: { type: String, default: "", reflect: true },
    persistent: { type: Boolean, default: false, reflect: true },
    noHeader: { type: Boolean, default: false, reflect: true, attribute: "no-header" }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: contents;
      }

      .backdrop {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 9998;
        background: rgba(0,0,0,0.4);
        opacity: 0;
        transition: opacity 0.25s ease;
      }

      .backdrop.visible {
        display: block;
        opacity: 1;
      }

      .panel {
        position: fixed;
        z-index: 9999;
        background: var(--_bg, var(--ui-bg, #fff));
        box-shadow: var(--_elevation, 0 20px 25px rgba(0,0,0,0.1));
        display: flex;
        flex-direction: column;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-sizing: border-box;
        font-family: inherit;
        overflow: hidden;
      }

      /* \u2500\u2500 Placement positions \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      :host([placement="right"]) .panel {
        top: 0; right: 0; bottom: 0;
        width: var(--_width, 320px);
        transform: translateX(100%);
      }
      :host([placement="left"]) .panel {
        top: 0; left: 0; bottom: 0;
        width: var(--_width, 320px);
        transform: translateX(-100%);
      }
      :host([placement="top"]) .panel {
        top: 0; left: 0; right: 0;
        height: var(--_height, 320px);
        transform: translateY(-100%);
      }
      :host([placement="bottom"]) .panel {
        bottom: 0; left: 0; right: 0;
        height: var(--_height, 320px);
        transform: translateY(100%);
      }

      .panel.visible,
      :host([placement="right"]) .panel.visible,
      :host([placement="left"]) .panel.visible,
      :host([placement="top"]) .panel.visible,
      :host([placement="bottom"]) .panel.visible {
        transform: translate(0, 0);
      }

      /* \u2500\u2500 Header \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75em 1em;
        border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
        flex-shrink: 0;
      }

      .header-title {
        font-weight: 600;
        font-size: 1em;
      }

      .close-btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75em;
        height: 1.75em;
        border-radius: var(--ui-button-radius, 0.375em);
        cursor: pointer;
        color: var(--ui-text-muted, #6b7280);
        transition: background 0.12s ease, color 0.12s ease;
      }

      .close-btn:hover {
        background: var(--ui-bg-subtle, rgba(0,0,0,0.06));
        color: var(--ui-text-color, #1f2937);
      }

      .close-btn:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: 0.125em;
      }

      .close-btn svg {
        width: 1em;
        height: 1em;
        fill: none;
        stroke: currentColor;
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      /* \u2500\u2500 Body \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .body {
        flex: 1;
        overflow-y: auto;
        padding: 1em;
        scrollbar-width: thin;
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
  }
  disconnectedCallback() {
    document.removeEventListener("keydown", this._escHandler);
    super.disconnectedCallback();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (!this._initialised) return;
    this._applyStyles();
    if (name === "open") this._open ? this._doOpen() : this._doClose("attribute");
  }
  _applyStyles() {
    const vars = {};
    if (this._background) vars["--_bg"] = resolveColor(this._background);
    if (this._width) vars["--_width"] = this._width;
    if (this._height) vars["--_height"] = this._height;
    const elev = resolveElevation(this._elevation);
    if (elev) vars["--_elevation"] = elev;
    const fontSize = resolveSize(this._size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
  }
  _update() {
    super._update();
    this.shadowRoot?.querySelector(".close-btn")?.addEventListener("click", () => this.hide("close-button"));
    this.shadowRoot?.querySelector(".backdrop")?.addEventListener("click", () => {
      if (!this._persistent) this.hide("backdrop");
    });
    this._escHandler = (e) => {
      if (e.key === "Escape" && !this._persistent) this.hide("escape");
    };
    if (this._open) this._doOpen();
  }
  /** Open the drawer. */
  show() {
    this.open = true;
  }
  /** Close the drawer. */
  hide(reason = "method") {
    this._doClose(reason);
  }
  _doOpen() {
    const panel = this.shadowRoot?.querySelector(".panel");
    const backdrop = this.shadowRoot?.querySelector(".backdrop");
    if (panel) requestAnimationFrame(() => panel.classList.add("visible"));
    if (backdrop) backdrop.classList.add("visible");
    document.addEventListener("keydown", this._escHandler);
    this.emit("ui-open");
  }
  _doClose(reason = "method") {
    const panel = this.shadowRoot?.querySelector(".panel");
    const backdrop = this.shadowRoot?.querySelector(".backdrop");
    if (panel) panel.classList.remove("visible");
    if (backdrop) backdrop.classList.remove("visible");
    document.removeEventListener("keydown", this._escHandler);
    if (this.hasAttribute("open")) this.removeAttribute("open");
    this.emit("ui-close", { reason });
  }
  render() {
    const esc = (s) => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const closeSvg = '<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    const header = this._noHeader ? "" : `
      <div class="header">
        <span class="header-title">${esc(this._label)}</span>
        <button class="close-btn" aria-label="Close drawer">${closeSvg}</button>
      </div>
    `;
    return `
      <div class="backdrop"></div>
      <div class="panel" role="dialog" aria-label="${esc(this._label)}">
        ${header}
        <div class="body"><slot></slot></div>
      </div>
    `;
  }
};
customElements.define("ui-drawer", UIDrawer);

// src/components/command/command.js
var UICommand = class extends UIComponent {
  static properties = {
    open: { type: Boolean, default: false, reflect: true },
    placeholder: { type: String, default: "Type a command\u2026", reflect: true },
    shortcut: { type: String, default: "k", reflect: true },
    noShortcut: { type: Boolean, default: false, reflect: true, attribute: "no-shortcut" },
    elevation: { type: String, default: "5", reflect: true },
    size: { type: String, default: "", reflect: true },
    width: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
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

      /* \u2500\u2500 Search input \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

      /* \u2500\u2500 Results list \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

      /* \u2500\u2500 Footer hint \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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
    `
    );
  }
  constructor() {
    super();
    this.__items = [];
    this._query = "";
    this._activeIndex = 0;
    this._keyHandler = this._onGlobalKey.bind(this);
    this._onInput = this._onInput.bind(this);
    this._onInputKeydown = this._onInputKeydown.bind(this);
    this._onBackdropClick = this._onBackdropClick.bind(this);
  }
  /* items property (JS only — not reflected) */
  set items(val) {
    this.__items = Array.isArray(val) ? val : [];
    if (this._initialised) this._renderResults();
  }
  get items() {
    return this.__items;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.noShortcut) document.addEventListener("keydown", this._keyHandler);
    this._attachPanelListeners();
  }
  disconnectedCallback() {
    document.removeEventListener("keydown", this._keyHandler);
    this._detachPanelListeners();
    super.disconnectedCallback();
  }
  _attachPanelListeners() {
    this._detachPanelListeners();
    const input = this.shadowRoot?.querySelector(".search-input");
    const backdrop = this.shadowRoot?.querySelector(".backdrop");
    if (input) {
      input.addEventListener("input", this._onInput);
      input.addEventListener("keydown", this._onInputKeydown);
    }
    if (backdrop) backdrop.addEventListener("click", this._onBackdropClick);
  }
  _detachPanelListeners() {
    const input = this.shadowRoot?.querySelector(".search-input");
    const backdrop = this.shadowRoot?.querySelector(".backdrop");
    if (input) {
      input.removeEventListener("input", this._onInput);
      input.removeEventListener("keydown", this._onInputKeydown);
    }
    if (backdrop) backdrop.removeEventListener("click", this._onBackdropClick);
  }
  _onInput() {
    const input = this.shadowRoot?.querySelector(".search-input");
    this._query = input?.value || "";
    this._activeIndex = 0;
    this._renderResults();
  }
  _onInputKeydown(e) {
    const filtered = this._filterItems();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      this._activeIndex = Math.min(this._activeIndex + 1, filtered.length - 1);
      this._renderResults();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this._activeIndex = Math.max(this._activeIndex - 1, 0);
      this._renderResults();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[this._activeIndex];
      if (item) this._selectItem(item.value, item.label);
    } else if (e.key === "Escape") {
      this.hide();
    }
  }
  _onBackdropClick(e) {
    if (e.target === e.currentTarget) this.hide();
  }
  _applyStyles() {
    const vars = {};
    const elev = resolveElevation(this.elevation);
    if (elev) vars["--_elevation"] = elev;
    if (this.width) vars["--_width"] = this.width;
    const fontSize = resolveSize(this.size);
    if (fontSize) vars["font-size"] = fontSize;
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
    const backdrop = this.shadowRoot?.querySelector(".backdrop");
    if (backdrop) backdrop.classList.add("visible");
    this._query = "";
    this._activeIndex = 0;
    const input = this.shadowRoot?.querySelector(".search-input");
    if (input) {
      input.value = "";
      requestAnimationFrame(() => input.focus());
    }
    this._renderResults();
    this.emit("ui-open");
  }
  _doClose() {
    const backdrop = this.shadowRoot?.querySelector(".backdrop");
    if (backdrop) backdrop.classList.remove("visible");
    if (this.hasAttribute("open")) this.removeAttribute("open");
    this.emit("ui-close");
  }
  _getItems() {
    const jsItems = this.__items || [];
    const domItems = [...this.querySelectorAll("ui-command-item")].map((el) => ({
      label: el.getAttribute("label") || el.textContent?.trim() || "",
      value: el.getAttribute("value") || "",
      description: el.getAttribute("description") || "",
      icon: el.getAttribute("icon") || "",
      group: el.getAttribute("group") || ""
    }));
    return [...jsItems, ...domItems];
  }
  _filterItems() {
    const all = this._getItems();
    if (!this._query) return all;
    const q = this._query.toLowerCase();
    return all.filter(
      (item) => (item.label || "").toLowerCase().includes(q) || (item.description || "").toLowerCase().includes(q) || (item.value || "").toLowerCase().includes(q)
    );
  }
  _renderResults() {
    const container = this.shadowRoot?.querySelector(".results");
    if (!container) return;
    const filtered = this._filterItems();
    if (filtered.length === 0) {
      container.innerHTML = '<div class="empty">No results found.</div>';
      return;
    }
    const groups = {};
    filtered.forEach((item) => {
      const g = item.group || "";
      if (!groups[g]) groups[g] = [];
      groups[g].push(item);
    });
    const esc = (s) => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
    let html = "";
    let idx = 0;
    for (const [group, items] of Object.entries(groups)) {
      if (group) html += `<div class="group-label">${esc(group)}</div>`;
      for (const item of items) {
        const iconHtml = item.icon ? `<span class="item-icon"><ui-icon>${esc(item.icon)}</ui-icon></span>` : "";
        const descHtml = item.description ? `<span class="item-desc">${esc(item.description)}</span>` : "";
        const activeClass = idx === this._activeIndex ? " active" : "";
        html += `<div class="item${activeClass}" data-index="${idx}" data-value="${esc(item.value)}" data-label="${esc(item.label)}">
          ${iconHtml}
          <span class="item-label">${esc(item.label)}</span>
          ${descHtml}
        </div>`;
        idx++;
      }
    }
    container.innerHTML = html;
    container.querySelectorAll(".item").forEach((el) => {
      el.addEventListener("click", () => {
        this._selectItem(el.dataset.value, el.dataset.label);
      });
    });
  }
  _selectItem(value, label) {
    this.emit("ui-select", { value, label, item: this._filterItems().find((i) => i.value === value) });
    this.hide();
  }
  _update() {
    this._applyStyles();
    super._update();
    this._attachPanelListeners();
    if (this.open) this._doOpen();
  }
  render() {
    const esc = (s) => (s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
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
            <span><kbd>\u2191</kbd><kbd>\u2193</kbd> navigate</span>
            <span><kbd>\u21B5</kbd> select</span>
            <span><kbd>esc</kbd> close</span>
          </div>
        </div>
      </div>
      <slot style="display:none"></slot>
    `;
  }
};
var UICommandItem = class extends HTMLElement {
  static get observedAttributes() {
    return ["value", "label", "description", "icon", "group"];
  }
  constructor() {
    super();
    this.style.display = "none";
  }
};
customElements.define("ui-command", UICommand);
customElements.define("ui-command-item", UICommandItem);

// src/components/list/list.js
var UIList = class extends UIComponent {
  static properties = {
    size: { type: String, default: "", reflect: true },
    dividers: { type: Boolean, default: false, reflect: true },
    hoverable: { type: Boolean, default: false, reflect: true },
    striped: { type: Boolean, default: false, reflect: true },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    bordered: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        font-family: inherit;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
      }

      :host([bordered]) {
        border: 1px solid var(--ui-border-color, #e5e7eb);
        border-radius: var(--ui-radius, 0.5em);
        overflow: hidden;
      }

      :host([dividers]) ::slotted(ui-list-item:not(:last-child)) {
        border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
      }

      /* hoverable \u2014 set an inherited CSS var that ui-list-item reads */
      :host([hoverable]) {
        --_list-hover-bg: var(--ui-gray-100, rgba(0,0,0,0.04));
      }
    `
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
    requestAnimationFrame(() => this._applyStriped());
    this._childObserver = new MutationObserver(() => this._applyStriped());
    this._childObserver.observe(this, { childList: true });
  }
  disconnectedCallback() {
    super.disconnectedCallback?.();
    this._childObserver?.disconnect();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) {
      this._applyStyles();
      if (name === "striped") this._applyStriped();
    }
  }
  _applyStyles() {
    const vars = {};
    if (this._background) vars["--_bg"] = resolveColor(this._background);
    if (this._color) vars["--_color"] = resolveColor(this._color);
    const fontSize = resolveSize(this._size);
    if (fontSize) vars["font-size"] = fontSize;
    this._setDynamicVars(vars);
  }
  /** Mark even children so ui-list-item can style striped rows */
  _applyStriped() {
    const items = [...this.querySelectorAll(":scope > ui-list-item")];
    items.forEach((item, i) => {
      if (this._striped && i % 2 === 1) item.setAttribute("_striped", "");
      else item.removeAttribute("_striped");
    });
  }
  render() {
    return `<div role="list"><slot></slot></div>`;
  }
};
var UIListItem = class extends UIComponent {
  static properties = {
    value: { type: String, default: "", reflect: true },
    description: { type: String, default: "", reflect: true },
    disabled: { type: Boolean, default: false, reflect: true },
    href: { type: String, default: "", reflect: true },
    target: { type: String, default: "", reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        font-family: inherit;
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }

      /* hoverable \u2014 read inherited var from ui-list */
      :host(:hover) .item {
        background: var(--_list-hover-bg);
      }

      /* striped \u2014 attribute set by parent ui-list */
      :host([_striped]) .item {
        background: var(--ui-gray-100, rgba(0,0,0,0.04));
      }

      .item {
        display: flex;
        align-items: center;
        gap: 0.75em;
        padding: 0.65em 0.85em;
        cursor: default;
        transition: background 0.1s ease;
        text-decoration: none;
        color: inherit;
      }

      a.item {
        cursor: pointer;
      }

      a.item:hover {
        text-decoration: none;
      }

      .leading {
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }

      .content {
        flex: 1;
        min-width: 0;
      }

      .label {
        font-weight: 500;
        line-height: 1.4;
      }

      .desc {
        font-size: 0.8em;
        color: var(--ui-text-muted, #6b7280);
        line-height: 1.3;
        margin-top: 0.1em;
      }

      .trailing {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        margin-left: auto;
      }

      /* Hide empty slots */
      .leading:empty, .trailing:empty { display: none; }
    `
    );
  }
  _update() {
    super._update();
    const el = this.shadowRoot?.querySelector(".item");
    if (el && !this._href) {
      el.addEventListener("click", () => {
        if (!this._disabled) this.emit("ui-click", { value: this._value });
      });
    }
  }
  render() {
    const esc = (s) => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const desc = this._description ? `<div class="desc">${esc(this._description)}</div>` : "";
    const tag = this._href ? "a" : "div";
    const hrefAttr = this._href ? ` href="${esc(this._href)}"` : "";
    const targetAttr = this._target ? ` target="${esc(this._target)}"` : "";
    return `
      <${tag} class="item" role="listitem"${hrefAttr}${targetAttr}>
        <span class="leading"><slot name="leading"></slot></span>
        <span class="content">
          <span class="label"><slot></slot></span>
          ${desc}
        </span>
        <span class="trailing"><slot name="trailing"></slot></span>
      </${tag}>
    `;
  }
};
customElements.define("ui-list", UIList);
customElements.define("ui-list-item", UIListItem);

// src/components/wiki/wiki.js
var _cache2 = /* @__PURE__ */ new Map();
var UIWiki = class _UIWiki extends UIComponent {
  static properties = {
    src: { type: String, default: "", reflect: true },
    background: { type: String, default: "", reflect: true },
    color: { type: String, default: "", reflect: true },
    size: { type: String, default: "", reflect: true },
    padding: { type: String, default: "", reflect: true },
    nocache: { type: Boolean, default: false, reflect: true },
    toc: { type: Boolean, default: false, reflect: true }
  };
  static styles() {
    return (
      /* css */
      `
      :host {
        display: block;
        line-height: 1.7;
        word-wrap: break-word;
        overflow-wrap: break-word;
      }

      .wiki {
        font-family: var(--ui-font, system-ui, -apple-system, sans-serif);
      }

      /* \u2500\u2500 Layout: TOC + content \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .wiki--toc {
        display: grid;
        grid-template-columns: 15em 1fr;
        gap: 2em;
        align-items: start;
      }

      .toc {
        position: sticky;
        top: 1em;
        max-height: calc(100vh - 2em);
        overflow-y: auto;
        padding: 1em;
        border-right: 1px solid var(--ui-border-color, #e5e7eb);
        font-size: 0.85em;
      }

      .toc-title {
        font-weight: 700;
        margin-bottom: 0.5em;
        font-size: 0.8em;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--ui-text-muted, #6b7280);
      }

      .toc a {
        display: block;
        text-decoration: none;
        color: var(--ui-text-muted, #6b7280);
        padding: 0.2em 0;
        transition: color 0.15s;
      }
      .toc a:hover {
        color: var(--ui-text-color, #111827);
      }

      .toc .toc-h2 { padding-left: 0; }
      .toc .toc-h3 { padding-left: 1em; }
      .toc .toc-h4 { padding-left: 2em; }

      /* \u2500\u2500 Content styles \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .content h1,
      .content h2,
      .content h3,
      .content h4,
      .content h5,
      .content h6 {
        margin: 1.25em 0 0.5em;
        line-height: 1.3;
        font-weight: 600;
      }

      .content h1 { font-size: 2em; border-bottom: 1px solid var(--ui-border-color, #e5e7eb); padding-bottom: 0.3em; }
      .content h2 { font-size: 1.5em; border-bottom: 1px solid var(--ui-border-color, #e5e7eb); padding-bottom: 0.25em; }
      .content h3 { font-size: 1.25em; }
      .content h4 { font-size: 1em; }
      .content h5 { font-size: 0.875em; }
      .content h6 { font-size: 0.85em; color: var(--ui-text-muted, #6b7280); }

      .content p {
        margin: 0 0 1em;
      }

      .content a {
        color: var(--ui-indigo-600, #4f46e5);
        text-decoration: none;
      }
      .content a:hover {
        text-decoration: underline;
      }

      .content img {
        max-width: 100%;
        height: auto;
        border-radius: var(--ui-radius, 0.375em);
      }

      /* Inline code */
      .content code {
        background: var(--ui-gray-100, #f3f4f6);
        color: var(--ui-rose-600, #e11d48);
        padding: 0.15em 0.4em;
        border-radius: 0.25em;
        font-size: 0.875em;
        font-family: var(--ui-font-mono, "SF Mono", "Fira Code", monospace);
      }

      /* Fenced code blocks */
      .content pre {
        background: var(--ui-gray-900, #111827);
        color: var(--ui-gray-100, #f3f4f6);
        padding: 1em 1.25em;
        border-radius: var(--ui-radius, 0.375em);
        overflow-x: auto;
        font-size: 0.85em;
        line-height: 1.6;
        margin: 0 0 1em;
      }

      .content pre code {
        background: none;
        color: inherit;
        padding: 0;
        border-radius: 0;
        font-size: inherit;
      }

      /* Block quotes */
      .content blockquote {
        border-left: 4px solid var(--ui-indigo-400, #818cf8);
        margin: 0 0 1em;
        padding: 0.5em 1em;
        color: var(--ui-text-muted, #6b7280);
        background: var(--ui-gray-50, #f9fafb);
        border-radius: 0 var(--ui-radius, 0.375em) var(--ui-radius, 0.375em) 0;
      }

      .content blockquote p:last-child {
        margin-bottom: 0;
      }

      /* Lists */
      .content ul,
      .content ol {
        margin: 0 0 1em;
        padding-left: 1.5em;
      }

      .content li {
        margin-bottom: 0.25em;
      }

      .content li > ul,
      .content li > ol {
        margin-bottom: 0;
        margin-top: 0.25em;
      }

      /* Task list */
      .content li.task-item {
        list-style: none;
        margin-left: -1.5em;
      }

      .content li.task-item input[type="checkbox"] {
        margin-right: 0.5em;
        pointer-events: none;
      }

      /* Tables */
      .content table {
        width: 100%;
        border-collapse: collapse;
        margin: 0 0 1em;
        font-size: 0.9em;
      }

      .content th,
      .content td {
        border: 1px solid var(--ui-border-color, #e5e7eb);
        padding: 0.5em 0.75em;
        text-align: left;
      }

      .content th {
        background: var(--ui-gray-100, #f3f4f6);
        font-weight: 600;
      }

      .content tr:nth-child(even) {
        background: var(--ui-gray-50, #f9fafb);
      }

      /* Horizontal rule */
      .content hr {
        border: none;
        border-top: 1px solid var(--ui-border-color, #e5e7eb);
        margin: 2em 0;
      }

      /* \u2500\u2500 Loading state \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      .wiki--loading .content { display: none; }
      .wiki--loaded  ::slotted(*) { display: none; }
      .wiki--error   .content { display: none; }

      @media (max-width: 768px) {
        .wiki--toc {
          grid-template-columns: 1fr;
        }
        .toc {
          position: static;
          max-height: none;
          border-right: none;
          border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
          padding: 0 0 0.75em;
          margin-bottom: 1em;
        }
      }
    `
    );
  }
  constructor() {
    super();
    this._markdown = "";
    this._headings = [];
  }
  render() {
    const tocClass = this.toc ? " wiki--toc" : "";
    const tocHtml = this.toc ? `<nav class="toc" part="toc"><div class="toc-title">Contents</div></nav>` : "";
    return `<div class="wiki${tocClass}">${tocHtml}<div class="content" part="content"></div></div><slot></slot>`;
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.src) this._startLoad();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === "src" && this._initialised && oldVal !== newVal) {
      this._startLoad();
    }
    if (this._initialised && ["background", "color", "size", "padding"].includes(name)) {
      this._applyStyles();
    }
  }
  _update() {
    super._update();
    this._applyStyles();
    if (this._markdown) this._renderMarkdown();
  }
  /* ------------------------------------------------------------------ */
  /*  Styling                                                            */
  /* ------------------------------------------------------------------ */
  _applyStyles() {
    const vars = {};
    if (this._background) {
      vars["--_bg"] = resolveColor(this._background) || this._background;
      vars["background"] = "var(--_bg)";
    }
    if (this._color) {
      vars["--_color"] = resolveColor(this._color) || this._color;
      vars["color"] = "var(--_color)";
    }
    if (this._size) {
      const sz = resolveSize(this._size);
      if (sz) vars["font-size"] = sz;
    }
    if (this._padding) {
      const pd = resolveSize(this._padding);
      vars["padding"] = pd || this._padding;
    }
    this._setDynamicVars(vars);
  }
  /* ------------------------------------------------------------------ */
  /*  Fetching                                                           */
  /* ------------------------------------------------------------------ */
  _startLoad() {
    const src = this.src;
    if (!src) return;
    this._fetchContent(src);
  }
  async _fetchContent(src) {
    const wrapper = this.shadowRoot?.querySelector(".wiki");
    if (wrapper) {
      wrapper.classList.remove("wiki--loaded", "wiki--error");
      wrapper.classList.add("wiki--loading");
    }
    try {
      let promise;
      if (!this.nocache && _cache2.has(src)) {
        promise = _cache2.get(src);
      } else {
        promise = fetch(src).then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
          return res.text();
        });
        if (!this.nocache) _cache2.set(src, promise);
      }
      const markdown = await promise;
      if (this.src !== src) return;
      this._markdown = markdown;
      this._renderMarkdown();
      if (wrapper) {
        wrapper.classList.remove("wiki--loading");
        wrapper.classList.add("wiki--loaded");
      }
      this.emit("ui-load", { src, markdown });
    } catch (err) {
      _cache2.delete(src);
      if (wrapper) {
        wrapper.classList.remove("wiki--loading");
        wrapper.classList.add("wiki--error");
      }
      this.emit("ui-error", { src, error: err });
    }
  }
  /* ------------------------------------------------------------------ */
  /*  Markdown → HTML                                                    */
  /* ------------------------------------------------------------------ */
  /** Parse the stored markdown and inject rendered HTML into .content. */
  _renderMarkdown() {
    const container = this.shadowRoot?.querySelector(".content");
    if (!container) return;
    const html = _UIWiki.parseMarkdown(this._markdown);
    container.innerHTML = html;
    if (this.toc) this._buildTOC(container);
  }
  /** Build a table-of-contents from the rendered headings. */
  _buildTOC(container) {
    const tocNav = this.shadowRoot?.querySelector(".toc");
    if (!tocNav) return;
    const headings = container.querySelectorAll("h1, h2, h3, h4");
    this._headings = [];
    const links = [];
    headings.forEach((h, i) => {
      const level = parseInt(h.tagName[1], 10);
      const text = h.textContent;
      const id = `heading-${i}`;
      h.id = id;
      this._headings.push({ level, text, id });
      links.push(`<a href="#${id}" class="toc-h${level}">${this._esc(text)}</a>`);
    });
    tocNav.innerHTML = `<div class="toc-title">Contents</div>${links.join("")}`;
    tocNav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      e.preventDefault();
      const id = a.getAttribute("href")?.slice(1);
      const target = container.querySelector(`#${id}`);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
  _esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  /* ------------------------------------------------------------------ */
  /*  Public API                                                         */
  /* ------------------------------------------------------------------ */
  /** Programmatically reload the markdown (bypasses cache). */
  reload() {
    _cache2.delete(this.src);
    this._fetchContent(this.src);
  }
  /** Clear the internal fetch cache. */
  static clearCache() {
    _cache2.clear();
  }
  /* ------------------------------------------------------------------ */
  /*  Static Markdown parser                                             */
  /* ------------------------------------------------------------------ */
  /**
   * Convert a Markdown string into HTML.
   *
   * Supports: headings, paragraphs, bold, italic, strikethrough,
   * inline code, code blocks (fenced ```), blockquotes, unordered
   * and ordered lists (with nesting), task lists, links, images,
   * horizontal rules, and GFM-style tables.
   *
   * @param {string} md — Raw Markdown text
   * @returns {string}  HTML string
   */
  static parseMarkdown(md) {
    if (!md) return "";
    const lines = md.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
    const blocks = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      const fenceMatch = line.match(/^(`{3,}|~{3,})\s*(.*)?$/);
      if (fenceMatch) {
        const fence = fenceMatch[1][0];
        const fenceLen = fenceMatch[1].length;
        const lang = (fenceMatch[2] || "").trim();
        const codeLines = [];
        i++;
        while (i < lines.length) {
          const closingMatch = lines[i].match(new RegExp(`^${fence === "`" ? "`" : "~"}{${fenceLen},}\\s*$`));
          if (closingMatch) {
            i++;
            break;
          }
          codeLines.push(lines[i]);
          i++;
        }
        const escaped = _UIWiki._escHtml(codeLines.join("\n"));
        const langAttr = lang ? ` class="language-${lang}"` : "";
        blocks.push(`<pre><code${langAttr}>${escaped}</code></pre>`);
        continue;
      }
      if (/^(\*{3,}|-{3,}|_{3,})\s*$/.test(line)) {
        blocks.push("<hr>");
        i++;
        continue;
      }
      const headingMatch = line.match(/^(#{1,6})\s+(.+?)(?:\s+#+)?\s*$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = _UIWiki._inlineFormat(headingMatch[2]);
        blocks.push(`<h${level}>${text}</h${level}>`);
        i++;
        continue;
      }
      if (line.match(/^>\s?/)) {
        const quoteLines = [];
        while (i < lines.length && lines[i].match(/^>\s?/)) {
          quoteLines.push(lines[i].replace(/^>\s?/, ""));
          i++;
        }
        const inner = _UIWiki.parseMarkdown(quoteLines.join("\n"));
        blocks.push(`<blockquote>${inner}</blockquote>`);
        continue;
      }
      if (i + 1 < lines.length && /^\|/.test(line) && /^\|[\s-:|]+\|/.test(lines[i + 1])) {
        const tableLines = [];
        while (i < lines.length && /^\|/.test(lines[i])) {
          tableLines.push(lines[i]);
          i++;
        }
        blocks.push(_UIWiki._parseTable(tableLines));
        continue;
      }
      if (/^(\s*)([-*+])\s/.test(line)) {
        const result = _UIWiki._parseList(lines, i, "ul");
        blocks.push(result.html);
        i = result.end;
        continue;
      }
      if (/^(\s*)\d+[.)]\s/.test(line)) {
        const result = _UIWiki._parseList(lines, i, "ol");
        blocks.push(result.html);
        i = result.end;
        continue;
      }
      if (line.trim() === "") {
        i++;
        continue;
      }
      const paraLines = [];
      while (i < lines.length && lines[i].trim() !== "" && !_UIWiki._isBlockStart(lines, i)) {
        paraLines.push(lines[i]);
        i++;
      }
      if (paraLines.length > 0) {
        blocks.push(`<p>${_UIWiki._inlineFormat(paraLines.join("\n"))}</p>`);
      }
    }
    return blocks.join("\n");
  }
  /**
   * Detect whether the current line starts a block-level construct
   * (heading, list, fence, hr, blockquote, table).
   */
  static _isBlockStart(lines, i) {
    const line = lines[i];
    if (/^#{1,6}\s/.test(line)) return true;
    if (/^(\*{3,}|-{3,}|_{3,})\s*$/.test(line)) return true;
    if (/^(`{3,}|~{3,})/.test(line)) return true;
    if (/^>\s?/.test(line)) return true;
    if (/^\s*[-*+]\s/.test(line)) return true;
    if (/^\s*\d+[.)]\s/.test(line)) return true;
    if (/^\|/.test(line) && i + 1 < lines.length && /^\|[\s-:|]+\|/.test(lines[i + 1])) return true;
    return false;
  }
  /** Parse a GFM-style table from the collected lines. */
  static _parseTable(tableLines) {
    const parseRow = (row) => row.replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
    const headers = parseRow(tableLines[0]);
    const rows = tableLines.slice(2).map(parseRow);
    const thCells = headers.map((h) => `<th>${_UIWiki._inlineFormat(h)}</th>`).join("");
    const bodyRows = rows.map((cols) => {
      const tds = cols.map((c) => `<td>${_UIWiki._inlineFormat(c)}</td>`).join("");
      return `<tr>${tds}</tr>`;
    }).join("\n");
    return `<table><thead><tr>${thCells}</tr></thead><tbody>${bodyRows}</tbody></table>`;
  }
  /**
   * Parse an ordered or unordered list starting at line index `start`.
   * Supports nesting by comparing leading whitespace.
   */
  static _parseList(lines, start, type) {
    const items = [];
    let i = start;
    const baseIndent = (lines[start].match(/^(\s*)/)?.[1] ?? "").length;
    const listPattern = type === "ul" ? /^(\s*)([-*+])\s(.*)$/ : /^(\s*)(\d+[.)])\s(.*)$/;
    while (i < lines.length) {
      const line = lines[i];
      if (line.trim() === "") {
        i++;
        continue;
      }
      const indent = (line.match(/^(\s*)/)?.[1] ?? "").length;
      if (indent < baseIndent) break;
      const match = line.match(listPattern);
      if (match && indent === baseIndent) {
        let text = match[3];
        const taskMatch = text.match(/^\[([xX ])\]\s(.*)/);
        let taskClass = "";
        let taskPrefix = "";
        if (taskMatch) {
          const checked = taskMatch[1].toLowerCase() === "x";
          taskClass = ' class="task-item"';
          taskPrefix = `<input type="checkbox"${checked ? " checked" : ""}>`;
          text = taskMatch[2];
        }
        i++;
        const subLines = [];
        while (i < lines.length) {
          const subLine = lines[i];
          if (subLine.trim() === "") {
            if (i + 1 < lines.length && (lines[i + 1].match(/^(\s*)/)?.[1] ?? "").length > baseIndent) {
              subLines.push(subLine);
              i++;
              continue;
            }
            break;
          }
          const subIndent = (subLine.match(/^(\s*)/)?.[1] ?? "").length;
          if (subIndent <= baseIndent) break;
          subLines.push(subLine);
          i++;
        }
        let subHtml = "";
        if (subLines.length > 0) {
          const firstSub = subLines.find((l) => l.trim() !== "");
          if (firstSub && (/^\s*[-*+]\s/.test(firstSub) || /^\s*\d+[.)]\s/.test(firstSub))) {
            const subType = /^\s*\d+[.)]\s/.test(firstSub) ? "ol" : "ul";
            const result = _UIWiki._parseList(subLines, 0, subType);
            subHtml = result.html;
          } else {
            subHtml = _UIWiki._inlineFormat(subLines.map((l) => l.trim()).join(" "));
          }
        }
        items.push(`<li${taskClass}>${taskPrefix}${_UIWiki._inlineFormat(text)}${subHtml}</li>`);
        continue;
      }
      if (indent <= baseIndent) break;
      i++;
    }
    return { html: `<${type}>${items.join("\n")}</${type}>`, end: i };
  }
  /**
   * Apply inline Markdown formatting to a string.
   *
   * Handles: images, links, bold, italic, strikethrough, inline code.
   */
  static _inlineFormat(text) {
    if (!text) return "";
    let s = _UIWiki._escHtml(text);
    s = s.replace(/`([^`]+?)`/g, "<code>$1</code>");
    s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    s = s.replace(/(\*{3}|_{3})(?!\s)(.+?)(?<!\s)\1/g, "<strong><em>$2</em></strong>");
    s = s.replace(/(\*{2}|_{2})(?!\s)(.+?)(?<!\s)\1/g, "<strong>$2</strong>");
    s = s.replace(/(\*|_)(?!\s)(.+?)(?<!\s)\1/g, "<em>$2</em>");
    s = s.replace(/~~(.+?)~~/g, "<del>$1</del>");
    s = s.replace(/ {2,}\n/g, "<br>");
    s = s.replace(/\n/g, " ");
    return s;
  }
  /** Escape HTML special characters. */
  static _escHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
};
customElements.define("ui-wiki", UIWiki);
export {
  NAMED_SIZES,
  UIApp,
  UIAppBanner,
  UIAppDrawer,
  UIAppFooter,
  UIAppHeader,
  UIAppMain,
  UIAppMainFooter,
  UIAppMainHeader,
  UIAppNav,
  UIAppNavFooter,
  UIAppNavHeader,
  UIAppSubheader,
  UIAvatar,
  UIBadge,
  UIBreadcrumb,
  UIBreadcrumbItem,
  UIButton,
  UIButtonGroup,
  UICalendar,
  UICallout,
  UICard,
  UICardBody,
  UICardFooter,
  UICardHeader,
  UICardMedia,
  UICarousel,
  UICarouselSlide,
  UIChart,
  UIClipboard,
  UICommand,
  UICommandItem,
  UIComponent,
  UIDetails,
  UIDialog,
  UIDivider,
  UIDrawer,
  UIDropdown,
  UIDropdownItem,
  UIForm,
  UIIcon,
  UIImage,
  UIInclude,
  UIInput,
  UIInputCheckbox,
  UIInputCode,
  UIInputColor,
  UIInputDate,
  UIInputFile,
  UIInputNumber,
  UIInputOTP,
  UIInputRadio,
  UIInputRadioGroup,
  UIInputRating,
  UIInputSelect,
  UIInputSlider,
  UIInputSwitch,
  UIInputTags,
  UIInputTextarea,
  UIKbd,
  UILayoutContainer,
  UILayoutGrid,
  UILayoutSpacer,
  UILayoutSplit,
  UILayoutStack,
  UIList,
  UIListItem,
  UIMap,
  UIMenu,
  UIMenuItem,
  UIPagination,
  UIPopover,
  UIProgress,
  UIScrollArea,
  UISkeleton,
  UISpinner,
  UIStat,
  UIStep,
  UISteps,
  UITab,
  UITable,
  UITabs,
  UIText,
  UITimeline,
  UITimelineItem,
  UIToast,
  UITooltip,
  UITree,
  UITreeItem,
  UIWiki,
  contrastColorFor,
  installTheme,
  isNamedSize,
  isPaletteToken,
  luminance,
  resolveColor,
  resolveColorHover,
  resolveRGB,
  resolveSize
};
