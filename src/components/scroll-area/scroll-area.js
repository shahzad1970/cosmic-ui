import { UIComponent } from '../../core/ui-component.js';
import { resolveSize } from '../../core/ui-utils.js';

/**
 * `<ui-scroll-area>` — Styled scrollable container with scroll indicators.
 *
 * Provides a scrollable area with custom-styled thin scrollbars that
 * appear on hover, plus subtle gradient shadows at scroll edges to
 * indicate more content is available. Works cross-browser with CSS-only
 * scrollbar styling.
 *
 * @element ui-scroll-area
 *
 * @attr {String}  height      - Container height (required for vertical scroll)
 * @attr {String}  max-height  - Maximum height before scrolling
 * @attr {String}  width       - Container width (for horizontal scroll)
 * @attr {String}  size        - Component size (named keyword or CSS length)
 * @attr {String}  direction   - Scroll direction: vertical | horizontal | both (default: vertical)
 * @attr {String}  scrollbar   - Scrollbar style: thin | auto | hidden (default: thin)
 * @attr {String}  padding     - Inner padding (named size or CSS length)
 *
 * @cssprop --ui-scroll-shadow-size  - Shadow gradient height/width (default: 1.5em)
 * @cssprop --ui-scroll-shadow-color - Shadow colour (default: rgba(0,0,0,0.07))
 *
 * @fires ui-scroll-end - Fired once when scrolled to the bottom (for infinite-scroll patterns)
 *
 * @slot (default) - Scrollable content
 *
 * @example
 *   <ui-scroll-area height="200px">
 *     <p>Long scrollable content here...</p>
 *   </ui-scroll-area>
 */
export class UIScrollArea extends UIComponent {
  static properties = {
    height:    { type: String, default: '',         reflect: true },
    maxHeight: { type: String, default: '',         reflect: true, attribute: 'max-height' },
    width:     { type: String, default: '',         reflect: true },
    size:      { type: String, default: '',         reflect: true },
    direction: { type: String, default: 'vertical', reflect: true },
    scrollbar: { type: String, default: 'thin',     reflect: true },
    padding:   { type: String, default: '',         reflect: true },
  };

  static styles() {
    return /* css */ `
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

      /* ── Direction ────────────────────────────── */
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

      /* ── Scroll shadows ──────────────────────── */
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

      /* ── Thin scrollbar (default) ─────────────── */
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

      /* ── Hidden scrollbar ─────────────────────── */
      :host([scrollbar="hidden"]) .scroll-container {
        scrollbar-width: none;
      }

      :host([scrollbar="hidden"]) .scroll-container::-webkit-scrollbar {
        display: none;
      }

      /* ── Auto scrollbar ───────────────────────── */
      :host([scrollbar="auto"]) .scroll-container {
        scrollbar-width: auto;
      }
    `;
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
    const container = this.shadowRoot?.querySelector('.scroll-container');
    if (!container) return;

    container.addEventListener('scroll', () => {
      if (this._scrollRAF) return;
      this._scrollRAF = requestAnimationFrame(() => {
        this._scrollRAF = null;
        this._updateScrollIndicators();
      });
    }, { passive: true });

    // Re-check when slotted content changes (dynamic content)
    const slot = container.querySelector('slot');
    if (slot) {
      slot.addEventListener('slotchange', () => {
        requestAnimationFrame(() => this._updateScrollIndicators());
      });
    }

    // Initial indicator state
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => this._updateScrollIndicators());
    }
  }

  /** Update scroll shadow visibility based on scroll position. */
  _updateScrollIndicators() {
    const el = this.shadowRoot?.querySelector('.scroll-container');
    if (!el) return;

    const canScrollUp = el.scrollTop > 1;
    const canScrollDown = el.scrollTop < el.scrollHeight - el.clientHeight - 1;

    this.toggleAttribute('data-scroll-up', canScrollUp);
    this.toggleAttribute('data-scroll-down', canScrollDown);

    // Fire ui-scroll-end once when scrolled to the bottom
    if (!canScrollDown && el.scrollHeight > el.clientHeight) {
      if (!this._atBottom) {
        this._atBottom = true;
        this.emit('ui-scroll-end');
      }
    } else {
      this._atBottom = false;
    }
  }

  _applyStyles() {
    const vars = {};
    if (this._height) vars['--_height'] = this._height;
    if (this._maxHeight) vars['--_max-height'] = this._maxHeight;
    if (this._width) vars['--_width'] = this._width;
    if (this._padding) vars['--_padding'] = resolveSize(this._padding) || this._padding;
    const fontSize = resolveSize(this._size);
    if (fontSize) vars['font-size'] = fontSize;
    this._setDynamicVars(vars);
  }

  /** Scroll to the top. */
  scrollToTop(behavior = 'smooth') {
    this.shadowRoot?.querySelector('.scroll-container')?.scrollTo({ top: 0, behavior });
  }

  /** Scroll to the bottom. */
  scrollToBottom(behavior = 'smooth') {
    const el = this.shadowRoot?.querySelector('.scroll-container');
    if (el) el.scrollTo({ top: el.scrollHeight, behavior });
  }

  /** Scroll to the left edge. */
  scrollToLeft(behavior = 'smooth') {
    this.shadowRoot?.querySelector('.scroll-container')?.scrollTo({ left: 0, behavior });
  }

  /** Scroll to the right edge. */
  scrollToRight(behavior = 'smooth') {
    const el = this.shadowRoot?.querySelector('.scroll-container');
    if (el) el.scrollTo({ left: el.scrollWidth, behavior });
  }

  render() {
    return `<div class="scroll-container"><slot></slot></div><div class="shadow shadow-top"></div><div class="shadow shadow-bottom"></div>`;
  }
}

customElements.define('ui-scroll-area', UIScrollArea);
