import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, contrastColorFor, resolveElevation } from '../../core/ui-utils.js';

/**
 * `<ui-carousel>` — Slide-based content carousel.
 *
 * Horizontal slider with prev/next arrows, dot indicators,
 * optional auto-play with pause-on-hover, looping, and
 * keyboard / touch-swipe navigation.
 *
 * @element ui-carousel
 *
 * @attr {String}  background  - Background colour: palette token or CSS colour
 * @attr {String}  color       - Text colour: palette token or CSS colour
 * @attr {String}  size        - Component size: keyword or CSS length
 * @attr {String}  elevation   - Shadow depth: 1–5 or raw CSS box-shadow
 * @attr {Number}  autoplay    - Auto-advance interval in ms (0 = off, default 0)
 * @attr {Boolean} loop        - Wrap around at the ends
 * @attr {Boolean} navigation  - Show prev / next arrow buttons (default true via attribute)
 * @attr {Boolean} indicators  - Show dot indicators (default true via attribute)
 *
 * @slot (default) - `<ui-carousel-slide>` elements
 *
 * @fires ui-slide-change - Emitted when the active slide changes (detail: { index })
 *
 * @example
 *   <ui-carousel loop autoplay="5000">
 *     <ui-carousel-slide>Slide 1</ui-carousel-slide>
 *     <ui-carousel-slide>Slide 2</ui-carousel-slide>
 *     <ui-carousel-slide>Slide 3</ui-carousel-slide>
 *   </ui-carousel>
 */
export class UICarousel extends UIComponent {
  static properties = {
    background: { type: String,  default: '',    reflect: true },
    color:      { type: String,  default: '',    reflect: true },
    size:       { type: String,  default: '',    reflect: true },
    elevation:  { type: String,  default: '',    reflect: true },
    autoplay:   { type: Number,  default: 0,     reflect: true },
    loop:       { type: Boolean, default: false, reflect: true },
    navigation: { type: Boolean, default: true,  reflect: true },
    indicators: { type: Boolean, default: true,  reflect: true },
  };

  static styles() {
    return /* css */ `
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

      /* ── Viewport — clips off-screen slides without hiding shadow/controls */
      .viewport {
        overflow: hidden;
        border-radius: inherit;
        position: relative;
      }

      /* ── Track ──────────────────────────────────────────── */
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

      /* ── Arrows ─────────────────────────────────────────── */
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

      /* ── Indicators ─────────────────────────────────────── */
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
    `;
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
    this.setAttribute('role', 'region');
    this.setAttribute('aria-roledescription', 'carousel');
    this.setAttribute('tabindex', '0');
    this._applyStyles();

    // Keyboard
    this.addEventListener('keydown', this._onKey);

    // Touch / pointer swipe
    this.addEventListener('pointerdown', this._onPointerDown);

    // Pause autoplay on hover
    this._onEnter = () => this._pauseAutoplay();
    this._onLeave = () => this._startAutoplay();
    this.addEventListener('mouseenter', this._onEnter);
    this.addEventListener('mouseleave', this._onLeave);

    // Observe children for dynamic slides
    this._observer = new MutationObserver(() => this._onSlidesChange());
    this._observer.observe(this, { childList: true });

    // Initial setup after first render
    requestAnimationFrame(() => {
      this._onSlidesChange();
      this._startAutoplay();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._onKey);
    this.removeEventListener('pointerdown', this._onPointerDown);
    this.removeEventListener('mouseenter', this._onEnter);
    this.removeEventListener('mouseleave', this._onLeave);
    this._stopAutoplay();
    if (this._observer) { this._observer.disconnect(); this._observer = null; }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (!this._initialised) return;
    this._applyStyles();
    if (name === 'autoplay') {
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
  get index() { return this._index; }

  /** Go to a specific slide by index. */
  goTo(i) {
    const slides = this._slides();
    if (!slides.length) return;
    let idx = i;
    if (this.loop) {
      idx = ((idx % slides.length) + slides.length) % slides.length;
    } else {
      idx = Math.max(0, Math.min(idx, slides.length - 1));
    }
    if (idx === this._index) return;
    this._index = idx;
    this._move();
    this.emit('ui-slide-change', { index: this._index });
  }

  /** Advance to the next slide. */
  next() { this.goTo(this._index + 1); }

  /** Go back to the previous slide. */
  prev() { this.goTo(this._index - 1); }

  /* ── Internal ──────────────────────────────────────────── */

  _slides() {
    return [...this.querySelectorAll('ui-carousel-slide')];
  }

  _applyStyles() {
    const vars = {};
    if (this.background) {
      vars['--_bg'] = resolveColor(this.background);
      vars['--_color'] = this.color
        ? resolveColor(this.color)
        : contrastColorFor(this.background);
    } else if (this.color) {
      vars['--_color'] = resolveColor(this.color);
    }
    const fontSize = resolveSize(this.size);
    if (fontSize) vars['font-size'] = fontSize;
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars['--_elevation'] = shadow;
    this._setDynamicVars(vars);
  }

  /** Translate the track to show the current slide. */
  _move() {
    const track = this.shadowRoot?.querySelector('.track');
    if (track) track.style.transform = `translateX(-${this._index * 100}%)`;
    this._updateControls();
  }

  /** Sync arrow disabled states and dot indicators. */
  _updateControls() {
    const root = this.shadowRoot;
    if (!root) return;
    const slides = this._slides();

    // Arrows
    const prevBtn = root.querySelector('.arrow--prev');
    const nextBtn = root.querySelector('.arrow--next');
    if (prevBtn) {
      prevBtn.disabled = !this.loop && this._index === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = !this.loop && this._index >= slides.length - 1;
    }

    // Dots
    root.querySelectorAll('.dot').forEach((dot, i) => {
      dot.setAttribute('aria-current', i === this._index ? 'true' : 'false');
    });
  }

  /** Re-render dots when slides are added / removed. */
  _onSlidesChange() {
    const slides = this._slides();

    // Mark slides with aria
    slides.forEach((s, i) => {
      s.setAttribute('role', 'tabpanel');
      s.setAttribute('aria-roledescription', 'slide');
      s.setAttribute('aria-label', `Slide ${i + 1} of ${slides.length}`);
    });

    // Rebuild dots
    const dotsEl = this.shadowRoot?.querySelector('.dots');
    if (dotsEl) {
      dotsEl.innerHTML = slides
        .map((_, i) =>
          `<button class="dot" aria-label="Go to slide ${i + 1}" aria-current="${i === this._index ? 'true' : 'false'}"></button>`
        ).join('');
      dotsEl.querySelectorAll('.dot').forEach((dot, i) => {
        dot.addEventListener('click', () => this.goTo(i));
      });
    }

    // Clamp index if slides were removed
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
    if (this._autoTimer) { clearInterval(this._autoTimer); this._autoTimer = null; }
  }

  _pauseAutoplay() {
    this._stopAutoplay();
  }

  /* ── Keyboard ──────────────────────────────────────────── */

  _onKey(e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); this.next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); this.prev(); }
  }

  /* ── Pointer / touch swipe ─────────────────────────────── */

  _onPointerDown(e) {
    // Only primary pointer (finger / left mouse)
    if (e.button !== 0) return;
    // Don't intercept clicks on arrow buttons or dot indicators
    const path = e.composedPath();
    if (path.some(el => el.classList && (el.classList.contains('arrow') || el.classList.contains('dot')))) return;
    this._swipeX = e.clientX;
    this._swiping = true;
    this.addEventListener('pointermove', this._onPointerMove);
    this.addEventListener('pointerup', this._onPointerUp);
    this.addEventListener('pointercancel', this._onPointerUp);
    this.setPointerCapture(e.pointerId);
  }

  _onPointerMove(e) {
    if (!this._swiping) return;
    this._swipeDelta = e.clientX - this._swipeX;
  }

  _onPointerUp(e) {
    if (!this._swiping) return;
    this._swiping = false;
    this.removeEventListener('pointermove', this._onPointerMove);
    this.removeEventListener('pointerup', this._onPointerUp);
    this.removeEventListener('pointercancel', this._onPointerUp);
    this.releasePointerCapture(e.pointerId);

    const threshold = 50; // px
    if (this._swipeDelta > threshold) this.prev();
    else if (this._swipeDelta < -threshold) this.next();
    this._swipeDelta = 0;
  }

  /* ── Render ────────────────────────────────────────────── */

  render() {
    /* Chevron SVGs — lightweight inline, no external icon dependency */
    const chevronLeft  = '<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>';
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
    const prevBtn = root.querySelector('.arrow--prev');
    const nextBtn = root.querySelector('.arrow--next');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());
    // Rebuild dot indicators (super._update re-renders innerHTML, wiping them)
    this._onSlidesChange();
  }
}

customElements.define('ui-carousel', UICarousel);
