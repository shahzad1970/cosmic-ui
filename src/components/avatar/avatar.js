import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, contrastColorFor } from '../../core/ui-utils.js';

/**
 * `<ui-avatar>` — User avatar with image, initials, or icon fallback.
 *
 * @element ui-avatar
 *
 * @attr {String}  src        - Image URL
 * @attr {String}  initials   - Fallback initials (e.g. "JS")
 * @attr {String}  alt        - Alt text for the image
 * @attr {String}  size       - Size: named keyword or CSS length (default "medium")
 * @attr {String}  background - Background colour for initials/fallback
 * @attr {String}  color      - Text colour for initials
 * @attr {Boolean} circle     - Circular shape (default true)
 * @attr {Boolean} square     - Square shape (overrides circle)
 * @attr {String}  status     - Status indicator dot: "online", "offline", "busy", "away"
 * @attr {String}  statusColor - Override status dot colour (attribute: status-color)
 *
 * @slot (default) - Custom icon or content (used when no src/initials)
 *
 * @example
 *   <ui-avatar src="photo.jpg" alt="Jane"></ui-avatar>
 *   <ui-avatar initials="JS" background="indigo-500"></ui-avatar>
 *   <ui-avatar status="online"><ui-icon name="user"></ui-icon></ui-avatar>
 */
export class UIAvatar extends UIComponent {
  static properties = {
    src:         { type: String,  default: '',       reflect: true },
    initials:    { type: String,  default: '',       reflect: true },
    alt:         { type: String,  default: '',       reflect: true },
    size:        { type: String,  default: '',       reflect: true },
    background:  { type: String,  default: '',         reflect: true },
    color:       { type: String,  default: '',       reflect: true },
    circle:      { type: Boolean, default: true,     reflect: true },
    square:      { type: Boolean, default: false,    reflect: true },
    status:      { type: String,  default: '',       reflect: true },
    statusColor: { type: String,  default: '',       reflect: true, attribute: 'status-color' },
  };

  static _statusColors = {
    online:  '#22c55e',
    offline: '#9ca3af',
    busy:    '#ef4444',
    away:    '#f59e0b',
  };

  static styles() {
    return /* css */ `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 2.5em;
        height: 2.5em;
        border-radius: 50%;
        overflow: visible;
        box-sizing: border-box;
        vertical-align: middle;
        background: var(--_bg, inherit);
        color: var(--_fg, inherit);
        font-weight: 600;
        font-size: var(--_size, 1em);
        user-select: none;
        flex-shrink: 0;
      }
      :host([square]) {
        border-radius: var(--ui-radius, 0.375em);
      }

      .inner {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .initials {
        font-size: 0.4em;
        line-height: 1;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .fallback {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
      .fallback svg {
        width: 60%;
        height: 60%;
        fill: currentColor;
        opacity: 0.7;
      }

      .status-dot {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0.65em;
        height: 0.65em;
        border-radius: 50%;
        border: 0.12em solid var(--ui-bg, #fff);
        box-sizing: border-box;
        background: var(--_status-color, #9ca3af);
      }
    `;
  }

  render() {
    let content;
    if (this.src) {
      const esc = (s) => (s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
      content = `<img src="${esc(this.src)}" alt="${esc(this.alt || this.initials)}" />`;
    } else if (this.initials) {
      content = `<span class="initials">${this._esc(this.initials)}</span>`;
    } else {
      content = `<span class="fallback"><slot>
        <svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2c0 .7.5 1.2 1.2 1.2h16.8c.7 0 1.2-.5 1.2-1.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
      </slot></span>`;
    }

    const statusDot = this.status ? '<span class="status-dot" part="status"></span>' : '';

    return `<div class="inner" part="inner">${content}</div>${statusDot}`;
  }

  _esc(s) {
    return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'img');
    if (!this.hasAttribute('aria-label')) this.setAttribute('aria-label', this.alt || this.initials || 'avatar');
    this._applyStyles();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyStyles();
  }

  _applyStyles() {
    const vars = {};

    // Size
    const sz = resolveSize(this.size);
    if (sz) vars['--_size'] = sz;

    // Background
    if (this.background) {
      vars['--_bg'] = resolveColor(this.background) || this.background;
    }

    // Foreground colour
    if (this.color) {
      vars['--_fg'] = resolveColor(this.color) || this.color;
    } else if (this.background) {
      vars['--_fg'] = contrastColorFor(this.background);
    }

    // Status dot colour
    if (this.status) {
      const sc = this.statusColor
        ? (resolveColor(this.statusColor) || this.statusColor)
        : UIAvatar._statusColors[this.status] || '#9ca3af';
      vars['--_status-color'] = sc;
    }

    this._setDynamicVars(vars);
  }
}

customElements.define('ui-avatar', UIAvatar);
