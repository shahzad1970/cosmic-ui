import { UIComponent } from '../../core/ui-component.js';

/**
 * `<ui-include>` — Load remote HTML content into the page.
 *
 * Fetches an HTML document (or fragment) from a URL and injects it into
 * the light DOM. Unlike `<iframe>`, the included content lives in the
 * same document context — it inherits styles, can access the parent DOM,
 * and participates in the normal layout flow.
 *
 * The component shows a default `<slot>` while loading, so you can
 * provide fallback / placeholder content:
 *
 *   <ui-include src="/partials/hero.html">
 *     <ui-spinner></ui-spinner>
 *   </ui-include>
 *
 * @element ui-include
 *
 * @attr {String}  src     - URL of the HTML to fetch (required)
 * @attr {String}  mode    - Insertion mode: "replace" (default) replaces children,
 *                           "append" appends to existing children,
 *                           "prepend" prepends before existing children
 * @attr {String}  channel - Event name to listen for on `document`. When received,
 *                           updates `src` from `event.detail.src`.
 * @attr {String}  base    - Base path prepended to the `src` received via channel events
 * @attr {Boolean} lazy    - Defer loading until the element is visible (IntersectionObserver)
 * @attr {Boolean} nocache - Bypass the internal fetch cache (always refetch)
 *
 * @fires ui-load    — Emitted after content is successfully injected.
 *                     detail: { src, html }
 * @fires ui-error   — Emitted when the fetch fails.
 *                     detail: { src, error }
 *
 * @example
 *   <ui-include src="/partials/header.html"></ui-include>
 *   <ui-include src="/snippets/alert.html" mode="append"></ui-include>
 *   <ui-include src="/heavy-section.html" lazy>Loading…</ui-include>
 */

/** @type {Map<string, Promise<string>>} */
const _cache = new Map();

export class UIInclude extends UIComponent {
  static properties = {
    src:     { type: String,  default: '',        reflect: true },
    mode:    { type: String,  default: 'replace', reflect: true },
    channel: { type: String,  default: '',        reflect: true },
    base:    { type: String,  default: '',        reflect: true },
    lazy:    { type: Boolean, default: false,      reflect: true },
    nocache: { type: Boolean, default: false,      reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
      }
    `;
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
    if (name === 'src' && this._initialised && oldVal !== newVal) {
      this._loaded = false;
      this._startLoad();
    }
    if (name === 'channel' && this._initialised) {
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
      this.setAttribute('src', this.base ? this.base + src : src);
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

    if (this.lazy && typeof IntersectionObserver !== 'undefined') {
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
      { rootMargin: '200px' }      // start loading slightly before visible
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

    this._setContainerClass('loading');

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

      // Guard: if src changed while we were fetching, abort
      if (this.src !== src) return;

      this._inject(html);
      this._loaded = true;
      this._setContainerClass('loaded');
      this.emit('ui-load', { src, html });
    } catch (err) {
      // Remove failed fetch from cache so retries work
      _cache.delete(src);
      this._setContainerClass('error');
      this.emit('ui-error', { src, error: err });
    }
  }

  /** Inject fetched HTML into the light DOM. */
  _inject(html) {
    const frag = document.createRange().createContextualFragment(html);

    switch (this.mode) {
      case 'append':
        this.appendChild(frag);
        break;
      case 'prepend':
        this.prepend(frag);
        break;
      case 'replace':
      default:
        // Clear existing light DOM children, then insert
        this.innerHTML = '';
        this.appendChild(frag);
        break;
    }
  }

  /** Update host CSS classes to reflect loading state (`loading`, `loaded`, `error`). */
  _setContainerClass(state) {
    this.classList.remove('loading', 'loaded', 'error');
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
}

customElements.define('ui-include', UIInclude);
