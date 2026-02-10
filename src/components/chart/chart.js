import { UIComponent } from '../../core/ui-component.js';
import { resolveColor, resolveSize } from '../../core/ui-utils.js';

const CHART_JS_URL = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';

/**
 * `<ui-chart>` — Chart.js wrapper.
 *
 * Provide chart configuration via the `src` attribute (URL to a JSON file)
 * or the `config` JS property (a plain Chart.js config object).
 *
 * Chart.js is lazy-loaded from CDN on first use. The component shows a
 * loading spinner while the library and/or config are being fetched, and
 * an error message if either fails.
 *
 * @element ui-chart
 *
 * @attr {String}  src        - URL to a Chart.js config JSON file
 * @attr {String}  height     - Chart height (default: 8em)
 * @attr {String}  background - Background colour token or CSS colour for the chart frame
 * @attr {String}  color      - Text colour token or CSS colour for overlays / empty state
 * @attr {String}  size       - Font-size (CSS keyword or length); scales the whole component
 * @attr {Boolean} no-animate - Disable Chart.js animations
 *
 * @prop {Object}  config     - Chart.js configuration object (JS only)
 * @prop {Object}  chart      - Live Chart.js instance (read-only)
 *
 * @fires ui-load  - Fired after the chart renders or updates successfully
 * @fires ui-error - Fired when chart rendering fails (detail: { message })
 *
 * @example
 *   <ui-chart src="/assets/chart-line-config.json" height="12em"></ui-chart>
 */
export class UIChart extends UIComponent {
  static properties = {
    height:     { type: String,  default: '8em', reflect: true },
    src:        { type: String,  default: '',    reflect: true },
    background: { type: String,  default: '',    reflect: true },
    color:      { type: String,  default: '',    reflect: true },
    size:       { type: String,  default: '',    reflect: true },
    noAnimate:  { type: Boolean, default: false, reflect: true, attribute: 'no-animate' },
  };

  static styles() {
    return /* css */ `
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
    `;
  }

  /** Shared Chart.js bootstrap promise (once per page). */
  static _chartJsPromise = null;

  constructor() {
    super();
    this._config = null;      // config set via JS property
    this._chart = null;        // live Chart.js instance
    this._loadedSrc = '';      // last successfully loaded src URL
    this._configFromSrc = null;
    this._srcRequestId = 0;    // race-condition guard for src fetches
    this._refreshSeq = 0;      // race-condition guard for async refresh
    this._refreshTimer = null;  // debounce timer
  }

  /* ── config property (JS only, not reflected) ───────────── */

  set config(value) {
    this._config = value && typeof value === 'object' ? value : null;
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
    super.connectedCallback(); // triggers _update()
  }

  disconnectedCallback() {
    clearTimeout(this._refreshTimer);
    this._destroyChart();
    super.disconnectedCallback();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === 'src' && oldVal !== newVal) {
      this._loadedSrc = '';
      this._configFromSrc = null;
    }
  }

  /* ── Reactive updates ───────────────────────────────────── */

  _update() {
    // Height-only changes: just update CSS vars, don't re-render DOM
    if (this._chart && this.shadowRoot?.querySelector('canvas')) {
      this._applyStyles();
      this._scheduleRefresh();
      return;
    }
    // Full render path (initial or structural change)
    super._update();
    this._applyStyles();
    this._scheduleRefresh();
  }

  /** Pattern A — only set CSS vars when attribute has a value. */
  _applyStyles() {
    const vars = {};

    vars['--_height'] = this._height || '8em';

    if (this.background) vars['--_bg'] = resolveColor(this.background);
    if (this.color)      vars['--_fg'] = resolveColor(this.color);

    const fontSize = resolveSize(this.size);
    if (fontSize) vars['font-size'] = fontSize;

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
    // First render (no chart yet) runs immediately; subsequent updates debounce.
    const delay = this._chart ? 200 : 0;
    this._refreshTimer = setTimeout(() => this._doRefresh(), delay);
  }

  async _doRefresh() {
    const seq = ++this._refreshSeq;
    let canvas = this.shadowRoot?.querySelector('canvas');
    if (!canvas) {
      // No canvas → must be in "empty" state; re-render if config now exists
      if (this._src || this._config) {
        super._update();
        this._applyStyles();
        return this._doRefresh();
      }
      return;
    }

    this._setOverlay('loading');

    try {
      // Resolve config (may fetch src)
      const config = await this._resolveConfig();
      if (seq !== this._refreshSeq) return; // superseded

      if (!config) {
        this._destroyChart();
        this._setOverlay('empty');
        return;
      }

      // Ensure Chart.js is loaded
      await UIChart._loadChartJs();
      if (seq !== this._refreshSeq) return; // superseded

      // Apply animation toggle
      if (this._noAnimate) {
        config.options = config.options || {};
        config.options.animation = false;
      }

      // Incremental update if chart type hasn't changed
      if (this._chart && this._chart.config.type === config.type) {
        this._chart.data = config.data;
        this._chart.options = config.options || {};
        this._chart.update();
      } else {
        // Full rebuild needed (type changed or first render)
        this._destroyChart();

        // Replace canvas to guarantee a clean slate after destroy
        const fresh = document.createElement('canvas');
        fresh.setAttribute('part', 'canvas');
        canvas.replaceWith(fresh);
        canvas = fresh;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        this._chart = new window.Chart(ctx, config);
      }

      this._setOverlay('ready');
      this.emit('ui-load');
    } catch (err) {
      if (seq !== this._refreshSeq) return;
      this._destroyChart();
      this._setOverlay('error');
      this.emit('ui-error', { message: err.message || 'Chart render failed' });
      console.warn('[ui-chart] Chart render failed:', err);
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
    const src = (this._src || '').trim();
    if (!src) return null;
    if (this._loadedSrc === src && this._configFromSrc) {
      return this._configFromSrc;
    }

    const requestId = ++this._srcRequestId;
    const response = await fetch(src, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Failed to load chart config: ${src} (${response.status})`);
    const json = await response.json();
    if (requestId !== this._srcRequestId) return null; // stale
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
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(v => this._deepClone(v));
    const result = {};
    for (const key of Object.keys(obj)) {
      result[key] = typeof obj[key] === 'function' ? obj[key] : this._deepClone(obj[key]);
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
      type: base.type || 'line',
      data: base.data || {},
      options,
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
    const loading = this.shadowRoot?.querySelector('.overlay-loading');
    const error = this.shadowRoot?.querySelector('.overlay-error');
    if (loading) loading.classList.toggle('hidden', state !== 'loading');
    if (error) error.classList.toggle('hidden', state !== 'error');
  }

  /* ── Chart.js CDN loader (once per page, retries on fail) ── */

  static _loadChartJs() {
    if (window.Chart) return Promise.resolve(window.Chart);
    if (UIChart._chartJsPromise) return UIChart._chartJsPromise;

    UIChart._chartJsPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-ui-chartjs]');
      if (existing) {
        if (existing.dataset.loaded === 'true') return resolve(window.Chart);
        existing.addEventListener('load', () => resolve(window.Chart));
        existing.addEventListener('error', reject);
        return;
      }

      const script = document.createElement('script');
      script.src = CHART_JS_URL;
      script.async = true;
      script.dataset.uiChartjs = 'true';
      script.addEventListener('load', () => {
        script.dataset.loaded = 'true';
        resolve(window.Chart);
      });
      script.addEventListener('error', () => {
        UIChart._chartJsPromise = null; // allow retry
        reject(new Error('Chart.js CDN load failed'));
      });
      document.head.appendChild(script);
    });

    return UIChart._chartJsPromise;
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
}

customElements.define('ui-chart', UIChart);
