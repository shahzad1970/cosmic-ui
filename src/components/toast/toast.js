import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, contrastColorFor, resolveElevation } from '../../core/ui-utils.js';

/**
 * `<ui-toast>` — Transient notification that auto-dismisses.
 *
 * Toasts float in a fixed-position container at a screen corner and stack
 * automatically. Use the static `UIToast.show()` API for programmatic
 * creation, or place `<ui-toast>` elements in markup.
 *
 * @element ui-toast
 *
 * @attr {String}  background  - Background colour: palette token or CSS colour (default: gray-800)
 * @attr {String}  color       - Text colour: palette token or CSS colour (auto-detected if omitted)
 * @attr {String}  size        - Component size: xx-small … xxx-large, or any CSS length
 * @attr {String}  elevation   - Shadow depth: 1–5 or raw CSS box-shadow (default: 2)
 * @attr {Number}  duration    - Auto-dismiss delay in ms (default: 4000, 0 = persistent)
 * @attr {String}  position    - Screen corner: top-left | top-center | top-right | bottom-left | bottom-center | bottom-right (default: bottom-right)
 * @attr {Boolean} dismissible - Show close button (default: true)
 *
 * @slot (default) - Toast message content
 *
 * @fires ui-dismiss - Emitted when the toast is dismissed (auto or manual)
 *
 * @example
 *   UIToast.show('File saved successfully.', { background: 'green-600' });
 *   UIToast.show('Something went wrong!', { background: 'red-600', duration: 6000 });
 *   UIToast.show('Copied to clipboard.', { position: 'top-center' });
 */
export class UIToast extends UIComponent {
  static properties = {
    background:  { type: String,  default: 'gray-800',     reflect: true },
    color:       { type: String,  default: '',              reflect: true },
    size:        { type: String,  default: '',              reflect: true },
    elevation:   { type: String,  default: '',              reflect: true },
    duration:    { type: Number,  default: 4000,            reflect: true },
    position:    { type: String,  default: 'bottom-right',  reflect: true },
    dismissible: { type: Boolean, default: true,            reflect: true },
  };

  /** Valid position values. */
  static _positions = new Set([
    'top-left', 'top-center', 'top-right',
    'bottom-left', 'bottom-center', 'bottom-right',
  ]);

  /** Active containers keyed by position string. */
  static _containers = new Map();

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
    const toast = document.createElement('ui-toast');
    if (opts.background  !== undefined) toast.setAttribute('background', opts.background);
    if (opts.color       !== undefined) toast.setAttribute('color', opts.color);
    if (opts.size        !== undefined) toast.setAttribute('size', opts.size);
    if (opts.duration    !== undefined) toast.setAttribute('duration', String(opts.duration));
    if (opts.position    !== undefined) toast.setAttribute('position', opts.position);
    if (opts.dismissible === false)     toast.removeAttribute('dismissible');
    toast.textContent = message;

    /* Append to body — connectedCallback will move it into the correct container. */
    document.body.appendChild(toast);
    return toast;
  }

  /* ── Container management ────────────────────────────────── */

  /** Get (or create) the fixed-position container for a given corner. */
  static _getContainer(position) {
    const pos = UIToast._positions.has(position) ? position : 'bottom-right';

    if (UIToast._containers.has(pos)) return UIToast._containers.get(pos);

    const el = document.createElement('div');
    el.className = 'ui-toast-container';
    el.dataset.position = pos;
    el.setAttribute('role', 'log');
    el.setAttribute('aria-live', 'polite');

    const isBottom = pos.startsWith('bottom');
    const isCenter = pos.includes('center');
    const isLeft   = pos.includes('left');

    Object.assign(el.style, {
      position: 'fixed',
      zIndex: '10000',
      display: 'flex',
      flexDirection: isBottom ? 'column-reverse' : 'column',
      gap: '0.5em',
      padding: '1em',
      pointerEvents: 'none',
      maxHeight: '100vh',
      overflowY: 'auto',
      boxSizing: 'border-box',
      /* Vertical */
      top:    isBottom ? 'auto' : '0',
      bottom: isBottom ? '0'    : 'auto',
      /* Horizontal */
      left:  isCenter ? '50%' : (isLeft ? '0' : 'auto'),
      right: isCenter ? 'auto' : (isLeft ? 'auto' : '0'),
      transform: isCenter ? 'translateX(-50%)' : 'none',
    });

    document.body.appendChild(el);
    UIToast._containers.set(pos, el);
    return el;
  }

  /** Remove a container if it has no remaining toasts. */
  static _cleanupContainer(position) {
    const el = UIToast._containers.get(position);
    if (el && el.children.length === 0) {
      el.remove();
      UIToast._containers.delete(position);
    }
  }

  /* ── Styles ──────────────────────────────────────────────── */

  static styles() {
    return /* css */ `
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
    `;
  }

  render() {
    return '<slot></slot><button part="dismiss" aria-label="Dismiss">\u2715</button>';
  }

  /* ── Lifecycle ───────────────────────────────────────────── */

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'status');

    /* Move into the correct fixed container if needed. */
    if (!this.parentElement?.classList.contains('ui-toast-container')) {
      this._movedToContainer = false;
      const container = UIToast._getContainer(this.position);
      container.appendChild(this);   // triggers connectedCallback again
      return;
    }

    this._movedToContainer = true;

    /* Pause auto-dismiss on hover. */
    this._onMouseEnter = () => this._pauseTimer();
    this._onMouseLeave = () => this._resumeTimer();
    this.addEventListener('mouseenter', this._onMouseEnter);
    this.addEventListener('mouseleave', this._onMouseLeave);

    /* Start auto-dismiss timer. */
    this._startTimer();

    /* Entrance animation. */
    const slideFrom = this.position.startsWith('top') ? '-0.75em' : '0.75em';
    this.animate?.(
      [
        { opacity: 0, transform: `translateY(${slideFrom})` },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 200, easing: 'ease-out', fill: 'forwards' },
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimer();
    this.removeEventListener('mouseenter', this._onMouseEnter);
    this.removeEventListener('mouseleave', this._onMouseLeave);
  }

  _update() {
    super._update();
    this._attachListeners();
    this._applyStyles();
  }

  _attachListeners() {
    const btn = this.shadowRoot.querySelector('button');
    if (btn) btn.addEventListener('click', () => this.dismiss());
  }

  /* ── Public API ──────────────────────────────────────────── */

  /** Dismiss the toast with an exit animation. */
  dismiss() {
    this._clearTimer();
    const pos = this.position;
    const slideTo = pos.startsWith('top') ? '-0.75em' : '0.75em';

    if (this.animate) {
      const anim = this.animate(
        [
          { opacity: 1, transform: 'translateY(0)' },
          { opacity: 0, transform: `translateY(${slideTo})` },
        ],
        { duration: 150, easing: 'ease-in', fill: 'forwards' },
      );
      anim.onfinish = () => this._finishDismiss(pos);
    } else {
      this._finishDismiss(pos);
    }
  }

  /** @private */
  _finishDismiss(pos) {
    this.emit('ui-dismiss');
    this.remove();
    UIToast._cleanupContainer(pos);
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
    this._remaining -= (Date.now() - this._timerStart);
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

    const bg = resolveColor(this.background || 'gray-800');
    vars['--_bg'] = bg;

    if (this.color) {
      vars['--_fg'] = resolveColor(this.color);
    } else {
      vars['--_fg'] = contrastColorFor(this.background || 'gray-800');
    }

    const fontSize = resolveSize(this.size);
    if (fontSize) vars['font-size'] = fontSize;

    const shadow = resolveElevation(this.elevation);
    if (shadow) vars['--_elevation'] = shadow;

    this._setDynamicVars(vars);
  }
}

customElements.define('ui-toast', UIToast);
