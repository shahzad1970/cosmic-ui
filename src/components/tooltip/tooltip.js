import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-tooltip>` — Hover / focus tooltip for contextual help.
 *
 * Wrap any element and add a `content` attribute. The tooltip appears
 * on hover or focus and auto-positions itself.
 *
 * @element ui-tooltip
 *
 * @attr {String}  content    - Tooltip text
 * @attr {String}  placement  - Position: "top" (default), "bottom", "left", "right"
 * @attr {Number}  delay      - Show delay in ms (default 200)
 * @attr {String}  background - Tooltip background colour
 * @attr {String}  color      - Tooltip text colour
 * @attr {String}  size       - Font size of tooltip text
 * @attr {String}  maxWidth   - Max width of tooltip (attribute: max-width, default "250px")
 * @attr {Boolean} disabled   - Disable the tooltip
 *
 * @slot (default) - The trigger element
 *
 * @example
 *   <ui-tooltip content="Save your work">
 *     <ui-button background="indigo-500">Save</ui-button>
 *   </ui-tooltip>
 *
 *   <ui-tooltip content="Delete permanently" placement="right">
 *     <ui-button background="red-500">Delete</ui-button>
 *   </ui-tooltip>
 */
export class UITooltip extends UIComponent {
  static properties = {
    content:   { type: String,  default: '',      reflect: true },
    placement: { type: String,  default: 'top',   reflect: true },
    delay:     { type: Number,  default: 200,     reflect: true },
    background:{ type: String,  default: '',      reflect: true },
    color:     { type: String,  default: '',      reflect: true },
    size:      { type: String,  default: '',      reflect: true },
    maxWidth:  { type: String,  default: '',      reflect: true, attribute: 'max-width' },
    disabled:  { type: Boolean, default: false,   reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: inline-block;
        position: relative;
      }
    `;
  }

  /** Shared stylesheet injected once into <head> for all tooltip popups. */
  static _ensureGlobalStyles() {
    if (UITooltip._stylesInjected) return;
    const style = document.createElement('style');
    style.textContent = /* css */ `
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
    UITooltip._stylesInjected = true;
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
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  }

  connectedCallback() {
    super.connectedCallback();
    UITooltip._ensureGlobalStyles();
    this.addEventListener('mouseenter', this._showTip);
    this.addEventListener('mouseleave', this._hideTip);
    this.addEventListener('focusin',    this._showTip);
    this.addEventListener('focusout',   this._hideTip);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mouseenter', this._showTip);
    this.removeEventListener('mouseleave', this._hideTip);
    this.removeEventListener('focusin',    this._showTip);
    this.removeEventListener('focusout',   this._hideTip);
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
      this._popup = document.createElement('div');
      this._popup.className = 'ui-tooltip-popup';
      this._popup.setAttribute('role', 'tooltip');
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

      // Apply custom styles
      if (this.background) popup.style.background = resolveColor(this.background) || this.background;
      if (this.color) popup.style.color = resolveColor(this.color) || this.color;
      if (this.size) {
        const sz = resolveSize(this.size);
        if (sz) popup.style.fontSize = sz;
      }
      if (this.maxWidth) popup.style.maxWidth = this.maxWidth;

      // Append to body so it escapes all overflow clipping
      if (!popup.parentNode) document.body.appendChild(popup);

      this._positionTip(popup);
      popup.classList.add('show');
    }, this.delay);
  }

  /** Position the tooltip relative to the trigger element using fixed coordinates. */
  _positionTip(popup) {
    const gap = 8;

    // Use the first slotted child's rect so the tip anchors to the visible
    // trigger, not the host (which may be stretched by a flex parent).
    const slot = this.shadowRoot?.querySelector('slot');
    const assigned = slot?.assignedElements?.() ?? [];
    const target = assigned[0] || this;
    const host = target.getBoundingClientRect();
    const tipRect = popup.getBoundingClientRect();

    const placement = this.placement || 'top';
    let top, left;

    switch (placement) {
      case 'bottom':
        top  = host.bottom + gap;
        left = host.left + host.width / 2 - tipRect.width / 2;
        break;
      case 'left':
        top  = host.top + host.height / 2 - tipRect.height / 2;
        left = host.left - tipRect.width - gap;
        break;
      case 'right':
        top  = host.top + host.height / 2 - tipRect.height / 2;
        left = host.right + gap;
        break;
      case 'top':
      default:
        top  = host.top - tipRect.height - gap;
        left = host.left + host.width / 2 - tipRect.width / 2;
        break;
    }

    // Clamp to viewport edges
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (left < 4)                      left = 4;
    if (left + tipRect.width > vw - 4) left = vw - 4 - tipRect.width;
    if (top < 4)                       top  = 4;
    if (top + tipRect.height > vh - 4) top  = vh - 4 - tipRect.height;

    popup.style.top  = `${top}px`;
    popup.style.left = `${left}px`;
  }

  _hideTip() {
    clearTimeout(this._timer);
    if (this._popup) {
      this._popup.classList.remove('show');
      // Remove from DOM after fade-out
      setTimeout(() => {
        if (this._popup && !this._popup.classList.contains('show')) {
          this._popup.remove();
        }
      }, 200);
    }
  }

  _applyStyles() {
    // Styling is applied inline on the popup at show-time
  }
}

customElements.define('ui-tooltip', UITooltip);
