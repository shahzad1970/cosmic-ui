import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-icon>` — Inline SVG icon component that fetches icons on demand.
 *
 * The icon name is specified as the element's text content.
 * Individual `.svg` files are fetched at runtime and cached in memory
 * so each icon is only downloaded once.
 *
 * Built-in sets live next to this file in `sets/lucide/` and `sets/heroicons/`.
 * Custom sets can be pointed at any URL base via `UIIcon.registerSet()`.
 *
 * @element ui-icon
 *
 * @slot (default) - Icon name as text content (e.g. "check", "arrow-right")
 * @attr {String}  src    - Direct URL to an SVG file (bypasses set lookup)
 * @attr {String}  set    - Icon set to use (default: "lucide")
 * @attr {String}  color  - Colour: palette token (e.g. "red-600") or CSS colour
 * @attr {String}  size   - Size: xx-small … xxx-large, or any CSS length
 * @attr {String}  label  - Accessible label (adds role="img" + aria-label)
 * @attr {Boolean} spin   - Continuously rotate the icon (e.g. for loaders)
 * @attr {Number}  stroke - Override default stroke-width
 *
 * @example
 *   <ui-icon>check</ui-icon>
 *   <ui-icon color="red-500" size="large">heart</ui-icon>
 *   <ui-icon set="heroicons">star</ui-icon>
 *   <ui-icon src="/assets/icons/custom.svg"></ui-icon>
 *   <ui-icon spin>loader</ui-icon>
 */
export class UIIcon extends UIComponent {
  /* ================================================================== */
  /*  Static — icon-set registry & SVG cache                            */
  /* ================================================================== */

  /**
   * In-memory cache of fetched SVG markup.
   * Key = "setName/iconName", value = SVG string.
   * @type {Map<string, string>}
   */
  static _cache = new Map();

  /**
   * In-flight fetch promises — deduplicates concurrent requests.
   * @type {Map<string, Promise<string>>}
   */
  static _pending = new Map();

  /**
   * Registered icon sets.
   * Key = set name, value = { basePath, config }.
   * @type {Map<string, { basePath: string, config: Object }>}
   */
  static _sets = new Map();

  /** Name of the global default icon set. */
  static _defaultSet = 'lucide';

  /**
   * Auto-detected base URL for this module (directory containing icon.js).
   * Used to resolve the built-in set paths relative to the component.
   * @type {string}
   */
  static _moduleBase = (() => {
    try {
      return new URL('.', import.meta.url).href;
    } catch {
      return '';
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
    if (basePath && !basePath.endsWith('/')) basePath += '/';
    this._sets.set(name, { basePath: basePath ?? '' });
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

    // Already cached
    if (this._cache.has(key)) return this._cache.get(key);

    // Already in-flight
    if (this._pending.has(key)) return this._pending.get(key);

    const entry = this._sets.get(setName);
    if (!entry || !entry.basePath) {
      console.warn(`[ui-icon] No basePath for set "${setName}".`);
      return '';
    }

    const url = `${entry.basePath}${iconName}.svg`;
    const promise = fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.text();
      })
      .then((svgText) => {
        this._cache.set(key, svgText);
        this._pending.delete(key);
        return svgText;
      })
      .catch((err) => {
        console.warn(`[ui-icon] Failed to load "${setName}/${iconName}": ${err.message}`);
        this._pending.delete(key);
        return '';
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
        if (key.startsWith(setName + '/')) this._cache.delete(key);
      }
    } else {
      this._cache.clear();
    }
  }

  /* ================================================================== */
  /*  Instance                                                          */
  /* ================================================================== */

  static properties = {
    src:    { type: String,  default: '',    reflect: true },
    set:    { type: String,  default: '',    reflect: true },
    color:  { type: String,  default: '',    reflect: true },
    size:   { type: String,  default: '',    reflect: true },
    label:  { type: String,  default: '',    reflect: true },
    spin:   { type: Boolean, default: false, reflect: true },
    stroke: { type: Number,  default: 0,    reflect: true },
  };

  static styles() {
    return /* css */ `
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
    `;
  }

  render() {
    return '<slot></slot>';
  }

  /** The icon name, read from text content. */
  get name() {
    return this.textContent.trim();
  }

  connectedCallback() {
    super.connectedCallback();

    // Watch for text content changes via the slot
    this._onSlotChange = () => this._updateIcon();
    this.shadowRoot.querySelector('slot')?.addEventListener('slotchange', this._onSlotChange);

    this._updateIcon();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.shadowRoot.querySelector('slot')?.removeEventListener('slotchange', this._onSlotChange);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._updateIcon();
  }

  /** Fetch (if needed) and display the icon. */
  async _updateIcon() {
    const sr = this.shadowRoot;
    if (!sr) return;

    // ── src mode: load SVG directly from the given URL ──
    if (this.src) {
      const url = this.src;
      const cacheKey = `__src__/${url}`;

      if (UIIcon._cache.has(cacheKey)) {
        this._renderSVG(UIIcon._cache.get(cacheKey));
        return;
      }

      const svgText = await this._fetchSrc(url, cacheKey);
      // Guard: src may have changed while fetching
      if (this.src !== url) return;
      this._renderSVG(svgText);
      return;
    }

    // ── set/name mode ──
    const iconName = this.name;
    if (!iconName) { this._clearSVG(); return; }

    const setName = this.set || UIIcon._defaultSet;
    const key = `${setName}/${iconName}`;

    // Fast-path: already cached → synchronous render
    if (UIIcon._cache.has(key)) {
      this._renderSVG(UIIcon._cache.get(key));
      return;
    }

    // Async fetch
    const svgText = await UIIcon._fetchIcon(setName, iconName);
    // Guard: text content might have changed while we were fetching
    const currentSet = this.set || UIIcon._defaultSet;
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
    if (UIIcon._pending.has(cacheKey)) return UIIcon._pending.get(cacheKey);

    const promise = fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.text();
      })
      .then((svgText) => {
        UIIcon._cache.set(cacheKey, svgText);
        UIIcon._pending.delete(cacheKey);
        return svgText;
      })
      .catch((err) => {
        console.warn(`[ui-icon] Failed to load src "${url}": ${err.message}`);
        UIIcon._pending.delete(cacheKey);
        return '';
      });

    UIIcon._pending.set(cacheKey, promise);
    return promise;
  }

  /** Remove any existing SVG from the shadow root. */
  _clearSVG() {
    const svg = this.shadowRoot?.querySelector('svg');
    if (svg) svg.remove();
  }

  /**
   * Inject fetched SVG directly into the shadow root and apply overrides.
   */
  _renderSVG(svgText) {
    this._clearSVG();
    if (!svgText) return;

    const sr = this.shadowRoot;
    const temp = document.createElement('template');
    temp.innerHTML = svgText;
    const svg = temp.content.querySelector('svg');
    if (!svg) return;

    // Stroke override
    if (this.stroke) {
      svg.setAttribute('stroke-width', String(this.stroke));
    }

    // Accessibility
    if (this.label) {
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', this.label);
      svg.removeAttribute('aria-hidden');
    } else {
      svg.setAttribute('aria-hidden', 'true');
    }

    sr.appendChild(svg);

    // Dynamic CSS vars for colour / size
    const vars = {};
    if (this.color) {
      vars['--_color'] = resolveColor(this.color);
    } else {
      vars['--_color'] = 'currentColor';
    }
    if (this.size) {
      const fontSize = resolveSize(this.size);
      if (fontSize) vars['--_size'] = fontSize;
    }
    this._setDynamicVars(vars);
  }
}

/* ================================================================== */
/*  Register built-in icon sets                                       */
/* ================================================================== */

UIIcon.registerSet('lucide', {
  basePath: UIIcon._moduleBase + 'sets/lucide/',
});

UIIcon.registerSet('heroicons', {
  basePath: UIIcon._moduleBase + 'sets/heroicons/',
});

customElements.define('ui-icon', UIIcon);
