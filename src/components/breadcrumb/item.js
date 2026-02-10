import { UIComponent } from '../../core/ui-component.js';
import { resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-breadcrumb-item>` — Single item inside a `<ui-breadcrumb>`.
 *
 * Renders as a link when `href` is provided, or plain text otherwise.
 * The last item (or one with `active`) is styled as the current page.
 *
 * @element ui-breadcrumb-item
 *
 * @attr {String}  href   - URL to navigate to (renders an `<a>`)
 * @attr {String}  target - Link target (_blank, _self, etc.)
 * @attr {Boolean} active - Marks as current page (bold, no link styling)
 *
 * @slot (default) - Item label text
 */
export class UIBreadcrumbItem extends UIComponent {
  static properties = {
    href:   { type: String,  default: '', reflect: true },
    target: { type: String,  default: '', reflect: true },
    active: { type: Boolean, default: false, reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: inline-flex;
        align-items: center;
        gap: 0.4em;
        white-space: nowrap;
      }

      a {
        color: var(--_link-color, var(--ui-blue-600, #2563eb));
        text-decoration: none;
        cursor: pointer;
      }

      a:hover {
        text-decoration: underline;
      }

      .label {
        color: inherit;
      }

      :host([active]) .label {
        font-weight: 600;
        color: var(--ui-text-color, #111827);
      }

      .sep {
        color: var(--ui-text-muted, #9ca3af);
        user-select: none;
        pointer-events: none;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.active) {
      this.setAttribute('aria-current', 'page');
    }
  }

  _update() {
    if (this.active) {
      this.setAttribute('aria-current', 'page');
    } else {
      this.removeAttribute('aria-current');
    }
    super._update();
  }

  /** Called by parent breadcrumb to set separator text. */
  _updateSeparator() {
    const sepEl = this.shadowRoot?.querySelector('.sep');
    if (sepEl) sepEl.textContent = this._separator || '';
  }

  render() {
    const sep = this._separator || '';
    if (this.href && !this.active) {
      const tgt = this.target ? ` target="${this.target}"` : '';
      return `<a href="${this.href}"${tgt}><slot></slot></a>${sep ? `<span class="sep">${sep}</span>` : ''}`;
    }
    return `<span class="label"><slot></slot></span>${sep ? `<span class="sep">${sep}</span>` : ''}`;
  }
}

customElements.define('ui-breadcrumb-item', UIBreadcrumbItem);
