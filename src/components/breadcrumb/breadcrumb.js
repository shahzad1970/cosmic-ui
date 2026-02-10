import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, contrastColorFor } from '../../core/ui-utils.js';

/**
 * `<ui-breadcrumb>` — Navigation breadcrumb trail.
 *
 * A horizontal list of links showing the user's location within a
 * site hierarchy. Each `<ui-breadcrumb-item>` is separated by a
 * configurable separator character (default `/`).
 *
 * @element ui-breadcrumb
 *
 * @attr {String} separator  - Separator character between items (default `/`)
 * @attr {String} background - Background colour: palette token or CSS colour
 * @attr {String} color      - Text colour: palette token or CSS colour
 * @attr {String} size       - Component size: keyword or CSS length
 *
 * @slot (default) - One or more `<ui-breadcrumb-item>` elements
 *
 * @example
 *   <ui-breadcrumb>
 *     <ui-breadcrumb-item href="/">Home</ui-breadcrumb-item>
 *     <ui-breadcrumb-item href="/products">Products</ui-breadcrumb-item>
 *     <ui-breadcrumb-item active>Widget</ui-breadcrumb-item>
 *   </ui-breadcrumb>
 */
export class UIBreadcrumb extends UIComponent {
  static properties = {
    separator:  { type: String,  default: '/', reflect: true },
    background: { type: String,  default: '',  reflect: true },
    color:      { type: String,  default: '',  reflect: true },
    size:       { type: String,  default: '',  reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.4em;
        padding: 0.5em 0;
        background: var(--_bg, transparent);
        color: var(--_color, inherit);
        line-height: 1.5;
        box-sizing: border-box;
      }

      ::slotted(ui-breadcrumb-item:not(:last-child))::after {
        /* Separator injected via item component */
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'navigation');
    this.setAttribute('aria-label', 'Breadcrumb');
    this._applySeparator();

    this._slotObserver = new MutationObserver(() => this._applySeparator());
    this._slotObserver.observe(this, { childList: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._slotObserver) {
      this._slotObserver.disconnect();
      this._slotObserver = null;
    }
  }

  _update() {
    this._applyStyles();
    this._applySeparator();
    super._update();
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

    this._setDynamicVars(vars);
  }

  /** Push the separator value down to child items. */
  _applySeparator() {
    const items = this.querySelectorAll('ui-breadcrumb-item');
    const sep = this.separator || '/';
    items.forEach((item, i) => {
      item._separator = i < items.length - 1 ? sep : '';
      if (item._updateSeparator) item._updateSeparator();
    });
  }

  render() {
    return '<slot></slot>';
  }
}

customElements.define('ui-breadcrumb', UIBreadcrumb);
