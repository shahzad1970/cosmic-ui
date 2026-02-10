import { UIComponent } from '../../core/ui-component.js';

const LEAFLET_VERSION = '1.9.4';
const LEAFLET_BASE = `https://cdn.jsdelivr.net/npm/leaflet@${LEAFLET_VERSION}/dist`;
const LEAFLET_CSS_URL = `${LEAFLET_BASE}/leaflet.css`;
const LEAFLET_JS_URL = `${LEAFLET_BASE}/leaflet.js`;

/** OSM light tiles (free, no key). */
const TILE_LIGHT = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
/** CartoDB dark tiles (free, no key). */
const TILE_DARK = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png';

const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

/**
 * `<ui-map>` — Leaflet.js interactive map.
 *
 * Leaflet is lazy-loaded from CDN only when the component is first used.
 *
 * Provide map data via attributes (`lat`, `lng`, `zoom`), the `src`
 * attribute (URL to a JSON config file), or the `config` JS property.
 *
 * Markers can use `address` instead of `lat`/`lng` — addresses are
 * geocoded via Nominatim (OpenStreetMap, free, no API key).  Results are
 * cached for the lifetime of the page.
 *
 * Markers can specify a custom `icon` (string URL or object with
 * `url`, `size`, `anchor`, `popupAnchor`).  A top-level `icon` in the
 * config sets the default icon for all markers.
 *
 * @element ui-map
 *
 * @attr {String}  height   - Map height (default: 20em)
 * @attr {Number}  lat      - Center latitude  (default: 0)
 * @attr {Number}  lng      - Center longitude (default: 0)
 * @attr {Number}  zoom     - Zoom level 1–20  (default: 2)
 * @attr {String}  src      - URL to a map config JSON file
 * @attr {Boolean} dark     - Use dark tile theme
 * @attr {Boolean} no-zoom  - Disable scroll-wheel zoom
 *
 * @prop {Object}  config   - Map config object (JS only):
 *   {
 *     center: [lat, lng] | "address string",
 *     zoom: Number,
 *     icon: "url" | { url, size?, anchor?, popupAnchor? },
 *     markers: [
 *       { lat, lng, popup, icon },
 *       { address: "...", popup, icon }
 *     ],
 *     lines: [
 *       { points: [ [lat, lng], { address } ], color?, weight?, opacity?, dash? }
 *     ]
 *   }
 *
 * @example
 *   <ui-map lat="40.7128" lng="-74.006" zoom="13" height="20em"></ui-map>
 *   <ui-map src="/assets/map-config.json" dark></ui-map>
 */
export class UIMap extends UIComponent {
  static properties = {
    height: { type: String,  default: '20em', reflect: true },
    lat:    { type: Number,  default: 0,      reflect: true },
    lng:    { type: Number,  default: 0,      reflect: true },
    zoom:   { type: Number,  default: 2,      reflect: true },
    src:    { type: String,  default: '',      reflect: true },
    dark:   { type: Boolean, default: false,   reflect: true },
    noZoom: { type: Boolean, default: false,   reflect: true, attribute: 'no-zoom' },
  };

  static styles() {
    return /* css */ `
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
    `;
  }

  /** Shared Leaflet bootstrap promise (once per page). */
  static _leafletPromise = null;
  /** Cached Leaflet CSS text (fetched once, injected into each shadow root). */
  static _leafletCssText = null;
  /** Geocode cache: address → { lat, lng }  (persists for page lifetime). */
  static _geocodeCache = new Map();

  constructor() {
    super();
    this._config = null;
    this._map = null;
    this._markers = [];
    this._lines = [];
    this._tileLayer = null;
    this._loadedSrc = '';
    this._configFromSrc = null;
    this._srcRequestId = 0;
    this._initSeq = 0;
    this._refreshTimer = null;
  }

  /* ── config property (JS only) ──────────────────────────── */

  set config(value) {
    this._config = value && typeof value === 'object' ? value : null;
    if (this._initialised) this._scheduleRefresh();
  }

  get config() {
    return this._config;
  }

  /* ── Lifecycle ──────────────────────────────────────────── */

  connectedCallback() {
    super.connectedCallback(); // triggers _update()
  }

  disconnectedCallback() {
    clearTimeout(this._refreshTimer);
    this._initSeq++;
    this._destroyMap();
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
    this._setDynamicVars({ '--_height': this._height || '20em' });
  }

  /* ── Map refresh (debounced) ────────────────────────────── */

  _scheduleRefresh() {
    clearTimeout(this._refreshTimer);
    const delay = this._map ? 150 : 0;
    this._refreshTimer = setTimeout(() => this._doRefresh(), delay);
  }

  async _doRefresh() {
    const seq = ++this._initSeq;
    const container = this.shadowRoot?.querySelector('.map-container');
    if (!container) return;

    this._setOverlay('loading');

    try {
      // Load Leaflet JS + CSS in parallel
      const [L] = await Promise.all([
        UIMap._loadLeaflet(),
        this._injectLeafletCss(),
      ]);
      if (seq !== this._initSeq) return;

      // Resolve config (may fetch src)
      const resolved = await this._resolveConfig();
      if (seq !== this._initSeq) return;

      const center = resolved.center;
      const zoom = resolved.zoom;

      if (this._map) {
        // Incremental update
        this._map.setView(center, zoom);
        this._updateTiles(L);
        await this._updateMarkers(L, resolved.markers, resolved.icon);
        await this._updateLines(L, resolved.lines);
        this._map.invalidateSize();
      } else {
        // First render
        const map = L.map(container, {
          center,
          zoom,
          scrollWheelZoom: !this._noZoom,
          attributionControl: true,
        });
        this._map = map;
        this._addTiles(L);
        await this._updateMarkers(L, resolved.markers, resolved.icon);
        await this._updateLines(L, resolved.lines);
      }

      // Sync scroll-wheel zoom
      if (this._noZoom) this._map.scrollWheelZoom.disable();
      else this._map.scrollWheelZoom.enable();

      this._setOverlay('ready');
    } catch (err) {
      if (seq !== this._initSeq) return;
      this._setOverlay('error');
      console.warn('[ui-map] Map render failed:', err);
    }
  }

  /* ── Config resolution ──────────────────────────────────── */

  async _resolveConfig() {
    // src takes priority
    const srcCfg = await this._loadConfigFromSrc();
    const cfg = srcCfg || this._config || {};

    // Resolve center —  can be [lat, lng] or an address string
    let center = cfg.center;
    if (typeof center === 'string') {
      const coords = await UIMap._geocode(center);
      center = coords ? [coords.lat, coords.lng] : [this._lat || 0, this._lng || 0];
    } else {
      center = center || [this._lat || 0, this._lng || 0];
    }

    return {
      center,
      zoom: cfg.zoom ?? this._zoom ?? 2,
      icon: cfg.icon || null,
      markers: cfg.markers || [],
      lines: cfg.lines || [],
    };
  }

  async _loadConfigFromSrc() {
    const src = (this._src || '').trim();
    if (!src) return null;
    if (this._loadedSrc === src && this._configFromSrc) return this._configFromSrc;

    const requestId = ++this._srcRequestId;
    const response = await fetch(src, { cache: 'no-cache' });
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
      maxZoom: 19,
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
    // Clear existing
    for (const m of this._markers) this._map.removeLayer(m);
    this._markers = [];

    if (!markers || !markers.length) return;

    for (const m of markers) {
      let lat = m.lat ?? m[0];
      let lng = m.lng ?? m[1];

      // Geocode address if lat/lng not provided
      if (lat == null || lng == null) {
        const address = m.address || m[2];
        if (!address) continue;
        const coords = await UIMap._geocode(address);
        if (!coords) continue;
        lat = coords.lat;
        lng = coords.lng;
      }

      // Build Leaflet icon options
      const iconDef = m.icon || defaultIcon;
      const opts = {};
      if (iconDef) opts.icon = UIMap._buildIcon(L, iconDef);

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
    // Clear existing
    for (const ln of this._lines) this._map.removeLayer(ln);
    this._lines = [];

    if (!lines || !lines.length) return;

    for (const lineDef of lines) {
      const rawPoints = lineDef.points || lineDef;
      if (!Array.isArray(rawPoints) || !rawPoints.length) continue;

      // Resolve all points (may geocode addresses)
      const resolved = await Promise.all(
        rawPoints.map(p => UIMap._resolvePoint(p))
      );
      const coords = resolved.filter(c => c != null);
      if (coords.length < 2) continue;

      const polyline = L.polyline(coords, {
        color:     lineDef.color   || 'var(--ui-indigo-500, #6366f1)',
        weight:    lineDef.weight  ?? 3,
        opacity:   lineDef.opacity ?? 1,
        dashArray: lineDef.dash    || null,
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
    if (!def) return undefined;
    const url      = typeof def === 'string' ? def : def.url;
    if (!url) return undefined;

    const size     = (typeof def === 'object' && def.size)   || [25, 41];
    const anchor   = (typeof def === 'object' && def.anchor) || [Math.round(size[0] / 2), size[1]];
    const popupAnchor = (typeof def === 'object' && def.popupAnchor) || [0, -size[1]];

    return L.icon({ iconUrl: url, iconSize: size, iconAnchor: anchor, popupAnchor });
  }

  /* ── Geocoding (Nominatim — free, no key, cached) ───────── */

  /**
   * Resolve a point definition → [lat, lng].
   * Accepts: [lat, lng], { lat, lng }, { address: '...' }, or a string.
   */
  static async _resolvePoint(point) {
    if (Array.isArray(point)) return point;
    if (typeof point === 'string') {
      const c = await UIMap._geocode(point);
      return c ? [c.lat, c.lng] : null;
    }
    if (point && typeof point === 'object') {
      if (point.lat != null && point.lng != null) return [point.lat, point.lng];
      if (point.address) {
        const c = await UIMap._geocode(point.address);
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
    if (!address || typeof address !== 'string') return null;
    const key = address.trim().toLowerCase();
    if (UIMap._geocodeCache.has(key)) return UIMap._geocodeCache.get(key);

    try {
      const url = `${NOMINATIM_URL}?format=json&limit=1&q=${encodeURIComponent(address)}`;
      const res = await fetch(url);
      if (!res.ok) return null;
      const data = await res.json();
      if (!data.length) {
        UIMap._geocodeCache.set(key, null);
        return null;
      }
      const result = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      UIMap._geocodeCache.set(key, result);
      return result;
    } catch (err) {
      console.warn('[ui-map] Geocode failed for:', address, err);
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
      this._currentTileUrl = '';
    }
  }

  /* ── Overlay ────────────────────────────────────────────── */

  _setOverlay(state) {
    const loading = this.shadowRoot?.querySelector('.overlay-loading');
    const error = this.shadowRoot?.querySelector('.overlay-error');
    if (loading) loading.classList.toggle('hidden', state !== 'loading');
    if (error) error.classList.toggle('hidden', state !== 'error');
  }

  /* ── Leaflet CSS → shadow DOM ───────────────────────────── */

  async _injectLeafletCss() {
    if (this.shadowRoot.getElementById('__leaflet-css')) return;

    if (!UIMap._leafletCssText) {
      const res = await fetch(LEAFLET_CSS_URL);
      if (!res.ok) throw new Error(`Leaflet CSS fetch failed: ${res.status}`);
      UIMap._leafletCssText = await res.text();
    }

    const style = document.createElement('style');
    style.id = '__leaflet-css';
    style.textContent = UIMap._leafletCssText;
    this.shadowRoot.prepend(style);
  }

  /* ── Leaflet CDN loader (once per page, retries on fail) ── */

  static _loadLeaflet() {
    if (window.L) return Promise.resolve(window.L);
    if (UIMap._leafletPromise) return UIMap._leafletPromise;

    UIMap._leafletPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-ui-leaflet]');
      if (existing) {
        if (existing.dataset.loaded === 'true') return resolve(window.L);
        existing.addEventListener('load', () => resolve(window.L));
        existing.addEventListener('error', reject);
        return;
      }

      const script = document.createElement('script');
      script.src = LEAFLET_JS_URL;
      script.async = true;
      script.dataset.uiLeaflet = 'true';
      script.addEventListener('load', () => {
        script.dataset.loaded = 'true';
        resolve(window.L);
      });
      script.addEventListener('error', () => {
        UIMap._leafletPromise = null; // allow retry
        reject(new Error('Leaflet CDN load failed'));
      });
      document.head.appendChild(script);
    });

    return UIMap._leafletPromise;
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
}

customElements.define('ui-map', UIMap);
