import { UIComponent } from '../../core/ui-component.js';
import { resolveSize } from '../../core/ui-utils.js';

/**
 * `<ui-skeleton>` — Loading placeholder skeleton screen.
 *
 * Shows a pulsing placeholder shape while content is loading.
 * Supports text lines, circles, rectangles, and custom dimensions.
 *
 * @element ui-skeleton
 *
 * @attr {String}  variant   - Shape: "text" (default), "circle", "rect"
 * @attr {String}  width     - Width: CSS length (default "100%" for text/rect, "2.5em" for circle)
 * @attr {String}  height    - Height: CSS length (default "1em" for text, "2.5em" for circle)
 * @attr {Number}  lines     - Number of text lines to render (default 1)
 * @attr {String}  gap       - Gap between lines (default "0.6em")
 * @attr {String}  size      - Font size (scales everything)
 * @attr {Boolean} animated  - Whether to animate (default true)
 * @attr {String}  radius    - Border radius override
 *
 * @example
 *   <ui-skeleton></ui-skeleton>
 *   <ui-skeleton lines="3"></ui-skeleton>
 *   <ui-skeleton variant="circle"></ui-skeleton>
 *   <ui-skeleton variant="rect" width="200px" height="120px"></ui-skeleton>
 */
export class UISkeleton extends UIComponent {
  static properties = {
    variant:  { type: String,  default: 'text',  reflect: true },
    width:    { type: String,  default: '',       reflect: true },
    height:   { type: String,  default: '',       reflect: true },
    lines:    { type: Number,  default: 1,        reflect: true },
    gap:      { type: String,  default: '',       reflect: true },
    size:     { type: String,  default: '',       reflect: true },
    animated: { type: Boolean, default: true,     reflect: true },
    radius:   { type: String,  default: '',       reflect: true },
  };

  static styles() {
    return /* css */ `
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
    `;
  }

  render() {
    const v = (this.variant || 'text').toLowerCase();

    if (v === 'circle') {
      return '<div class="bone circle-bone" part="bone"></div>';
    }

    if (v === 'rect') {
      return '<div class="bone rect-bone" part="bone"></div>';
    }

    // text — render N lines
    const n = Math.max(1, Math.floor(this.lines || 1));
    if (n === 1) {
      return '<div class="bone text-bone" part="bone"></div>';
    }
    const bones = Array.from({ length: n }, () => '<div class="bone text-bone" part="bone"></div>').join('');
    return `<div class="lines">${bones}</div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'presentation');
    this.setAttribute('aria-hidden', 'true');
  }

  _update() {
    super._update();
    this._applyStyles();
  }

  _applyStyles() {
    const vars = {};
    if (this.size) {
      const sz = resolveSize(this.size);
      if (sz) vars['font-size'] = sz;
    }
    if (this.width)  vars['--_w'] = this.width;
    if (this.height) vars['--_h'] = this.height;
    if (this.gap)    vars['--_gap'] = this.gap;
    if (this.radius) vars['--_radius'] = this.radius;
    this._setDynamicVars(vars);
  }
}

customElements.define('ui-skeleton', UISkeleton);
