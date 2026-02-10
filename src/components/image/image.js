import { UIComponent } from '../../core/ui-component.js';
import { resolveSize } from '../../core/ui-utils.js';

/**
 * `<ui-image>` — Enhanced image component.
 *
 * Wraps `<img>` with lazy loading, aspect ratio control, fallback on
 * error, loading skeleton, and optional lightbox on click.
 *
 * @element ui-image
 *
 * @attr {String}  src       - Image source URL (required)
 * @attr {String}  alt       - Alt text for accessibility
 * @attr {String}  width     - Image width (CSS length)
 * @attr {String}  height    - Image height (CSS length)
 * @attr {String}  fit       - Object-fit: cover | contain | fill | none | scale-down (default: cover)
 * @attr {String}  radius    - Border radius (CSS length)
 * @attr {String}  fallback  - Fallback image URL on load error
 * @attr {String}  size      - Component size
 * @attr {Boolean} lazy      - Enable lazy loading (default true)
 * @attr {Boolean} lightbox  - Click to view full-size in a lightbox overlay
 * @attr {String}  caption   - Image caption text
 *
 * @fires ui-load  - Emitted when the image loads successfully
 * @fires ui-error - Emitted when the image fails to load
 *
 * @example
 *   <ui-image src="/photo.jpg" alt="Sunset" width="300px" height="200px"></ui-image>
 *   <ui-image src="/photo.jpg" lightbox caption="Beautiful sunset"></ui-image>
 */
export class UIImage extends UIComponent {
  static properties = {
    src:      { type: String,  default: '',      reflect: true },
    alt:      { type: String,  default: '',      reflect: true },
    width:    { type: String,  default: '',      reflect: true },
    height:   { type: String,  default: '',      reflect: true },
    fit:      { type: String,  default: 'cover', reflect: true },
    radius:   { type: String,  default: '',      reflect: true },
    fallback: { type: String,  default: '',      reflect: true },
    size:     { type: String,  default: '',      reflect: true },
    lazy:     { type: Boolean, default: true,    reflect: true },
    lightbox: { type: Boolean, default: false,   reflect: true },
    caption:  { type: String,  default: '',      reflect: true },
  };

  static styles() {
    return /* css */ `
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

      /* ── Lightbox overlay ───────────────────── */
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
    `;
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
    if (this._width) vars['--_width'] = this._width;
    if (this._height) vars['--_height'] = this._height;
    if (this._fit) vars['--_fit'] = this._fit;
    if (this._radius) vars['--_radius'] = this._radius;
    const fontSize = resolveSize(this._size);
    if (fontSize) vars['font-size'] = fontSize;
    this._setDynamicVars(vars);
  }

  _update() {
    super._update();
    const img = this.shadowRoot?.querySelector('.main-img');
    if (!img) return;

    img.addEventListener('load', () => {
      img.classList.add('loaded');
      this.shadowRoot?.querySelector('.skeleton')?.classList.add('hidden');
      this.emit('ui-load');
    });

    img.addEventListener('error', () => {
      if (this._fallback && img.src !== this._fallback) {
        img.src = this._fallback;
        return;
      }
      this.shadowRoot?.querySelector('.skeleton')?.classList.add('hidden');
      this.shadowRoot?.querySelector('.error-state')?.classList.add('visible');
      this.emit('ui-error');
    });

    if (this._lightbox) {
      img.addEventListener('click', () => this._openLightbox());
    }

    // Lightbox close
    const lb = this.shadowRoot?.querySelector('.lightbox');
    if (lb) {
      lb.addEventListener('click', () => this._closeLightbox());
    }
  }

  _openLightbox() {
    const lb = this.shadowRoot?.querySelector('.lightbox');
    if (lb) lb.classList.add('visible');
    document.addEventListener('keydown', this._lbKeyHandler = (e) => {
      if (e.key === 'Escape') this._closeLightbox();
    });
  }

  _closeLightbox() {
    const lb = this.shadowRoot?.querySelector('.lightbox');
    if (lb) lb.classList.remove('visible');
    if (this._lbKeyHandler) {
      document.removeEventListener('keydown', this._lbKeyHandler);
      this._lbKeyHandler = null;
    }
  }

  render() {
    const esc = (s) => (s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const loading = this._lazy ? ' loading="lazy"' : '';
    const errorSvg = '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
    const caption = this._caption ? `<span class="caption">${esc(this._caption)}</span>` : '';

    const lightbox = this._lightbox ? `
      <div class="lightbox">
        <button class="lightbox-close" aria-label="Close">✕</button>
        <img src="${esc(this._src)}" alt="${esc(this._alt)}">
      </div>
    ` : '';

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
}

customElements.define('ui-image', UIImage);
