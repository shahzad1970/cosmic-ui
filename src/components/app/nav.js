import { UIComponent } from '../../core/ui-component.js';
import { resolveColor, contrastColorFor, resolveElevation, resolveSize } from '../../core/ui-utils.js';

/**
 * `<ui-app-nav>` — Right-side navigation / detail panel.
 *
 * Must be a direct child of `<ui-app>`. Sits on the right beside the main
 * content area. Typically used for contextual navigation, detail views,
 * or secondary information panels.
 *
 * @element ui-app-nav
 *
 * @attr {String} background - Background colour (default: subtle bg)
 * @attr {String} color      - Text colour (auto-detected if omitted)
 * @attr {String} width      - Panel width (default: 16rem)
 * @attr {String} channel    - Document event name to listen for; toggles nav open/close on parent <ui-app>
 *
 * @slot (default) - Nav panel content
 */
export class UIAppNav extends UIComponent {
  static properties = {
    background: { type: String, default: '',      reflect: true },
    color:      { type: String, default: '',      reflect: true },
    width:      { type: String, default: '16rem', reflect: true },
    elevation:  { type: String, default: '',      reflect: true },
    size:       { type: String, default: '',      reflect: true },
    channel:    { type: String, default: '',      reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: flex;
        flex-direction: column;
        width: var(--_width, 16rem);
        min-height: 100%;
        padding: 1em;
        background: var(--_bg, inherit);
        color: var(--_color, inherit);
        font-size: var(--_size, inherit);
        overflow-y: auto;
        border-right: 1px solid var(--ui-border-color, #e5e7eb);
        box-shadow: var(--_elevation, none);
        box-sizing: border-box;
      }

      @media (max-width: 768px) {
        :host { border-right: none; width: 100%; }
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'complementary');
    this._onChannelEvent = () => this._toggleNav();
    if (this.channel) {
      document.addEventListener(this.channel, this._onChannelEvent);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.channel) {
      document.removeEventListener(this.channel, this._onChannelEvent);
    }
  }

  _onPropertyChanged(name, oldVal, newVal) {
    if (name === 'channel') {
      if (oldVal) document.removeEventListener(oldVal, this._onChannelEvent);
      if (newVal) document.addEventListener(newVal, this._onChannelEvent);
    }
  }

  /** Toggle the nav-open attribute on the parent <ui-app>. */
  _toggleNav() {
    const app = this.closest('ui-app');
    if (!app) return;
    if (app.hasAttribute('nav-open')) {
      app.removeAttribute('nav-open');
    } else {
      app.setAttribute('nav-open', '');
    }
  }

  _applyStyles() {
    const vars = {};
    if (this.width) vars['--_width'] = this.width;
    if (this.background) {
      vars['--_bg'] = resolveColor(this.background);
      vars['--_color'] = this.color ? resolveColor(this.color) : contrastColorFor(this.background);
    } else if (this.color) {
      vars['--_color'] = resolveColor(this.color);
    }
    const shadow = resolveElevation(this.elevation);
    if (shadow) vars['--_elevation'] = shadow;
    if (this.size) {
      const fs = resolveSize(this.size);
      if (fs) vars['--_size'] = fs;
    }
    this._setDynamicVars(vars);
  }

  _update() {
    this._applyStyles();
    super._update();
  }

  render() {
    return '<slot></slot>';
  }
}

customElements.define('ui-app-nav', UIAppNav);
