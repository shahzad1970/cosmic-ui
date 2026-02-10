import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveElevation, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-drawer>` — Standalone slide-in panel.
 *
 * A general-purpose slide-in panel that can appear from any edge of the
 * viewport. Unlike `<ui-app-drawer>` (which only works inside `<ui-app>`),
 * this component works anywhere in the page.
 *
 * @element ui-drawer
 *
 * @attr {Boolean} open       - Whether the drawer is visible
 * @attr {String}  placement  - Edge to slide from: left | right | top | bottom (default: right)
 * @attr {String}  width      - Drawer width for left/right placement (default: 320px)
 * @attr {String}  height     - Drawer height for top/bottom placement (default: 320px)
 * @attr {String}  elevation  - Shadow depth: 1–5 (default: 4)
 * @attr {String}  background - Panel background colour
 * @attr {String}  size       - Component size
 * @attr {String}  label      - Drawer header title
 * @attr {Boolean} persistent - If true, clicking backdrop doesn't close
 * @attr {Boolean} noHeader   - Hide the built-in header bar (attribute: no-header)
 *
 * @slot (default) - Drawer body content
 *
 * @fires ui-open  - Emitted when the drawer opens
 * @fires ui-close - Emitted when the drawer closes; detail: { reason }
 *
 * @example
 *   <ui-drawer label="Settings" placement="right">
 *     <p>Drawer content here.</p>
 *   </ui-drawer>
 */
export class UIDrawer extends UIComponent {
  static properties = {
    open:       { type: Boolean, default: false,   reflect: true },
    placement:  { type: String,  default: 'right', reflect: true },
    width:      { type: String,  default: '320px', reflect: true },
    height:     { type: String,  default: '320px', reflect: true },
    elevation:  { type: String,  default: '4',     reflect: true },
    background: { type: String,  default: '',      reflect: true },
    size:       { type: String,  default: '',      reflect: true },
    label:      { type: String,  default: '',      reflect: true },
    persistent: { type: Boolean, default: false,   reflect: true },
    noHeader:   { type: Boolean, default: false,   reflect: true, attribute: 'no-header' },
  };

  static styles() {
    return /* css */ `
      :host {
        display: contents;
      }

      .backdrop {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 9998;
        background: rgba(0,0,0,0.4);
        opacity: 0;
        transition: opacity 0.25s ease;
      }

      .backdrop.visible {
        display: block;
        opacity: 1;
      }

      .panel {
        position: fixed;
        z-index: 9999;
        background: var(--_bg, var(--ui-bg, #fff));
        box-shadow: var(--_elevation, 0 20px 25px rgba(0,0,0,0.1));
        display: flex;
        flex-direction: column;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-sizing: border-box;
        font-family: inherit;
        overflow: hidden;
      }

      /* ── Placement positions ────────────────── */
      :host([placement="right"]) .panel {
        top: 0; right: 0; bottom: 0;
        width: var(--_width, 320px);
        transform: translateX(100%);
      }
      :host([placement="left"]) .panel {
        top: 0; left: 0; bottom: 0;
        width: var(--_width, 320px);
        transform: translateX(-100%);
      }
      :host([placement="top"]) .panel {
        top: 0; left: 0; right: 0;
        height: var(--_height, 320px);
        transform: translateY(-100%);
      }
      :host([placement="bottom"]) .panel {
        bottom: 0; left: 0; right: 0;
        height: var(--_height, 320px);
        transform: translateY(100%);
      }

      .panel.visible,
      :host([placement="right"]) .panel.visible,
      :host([placement="left"]) .panel.visible,
      :host([placement="top"]) .panel.visible,
      :host([placement="bottom"]) .panel.visible {
        transform: translate(0, 0);
      }

      /* ── Header ─────────────────────────────── */
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75em 1em;
        border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
        flex-shrink: 0;
      }

      .header-title {
        font-weight: 600;
        font-size: 1em;
      }

      .close-btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75em;
        height: 1.75em;
        border-radius: var(--ui-button-radius, 0.375em);
        cursor: pointer;
        color: var(--ui-text-muted, #6b7280);
        transition: background 0.12s ease, color 0.12s ease;
      }

      .close-btn:hover {
        background: var(--ui-bg-subtle, rgba(0,0,0,0.06));
        color: var(--ui-text-color, #1f2937);
      }

      .close-btn:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: 0.125em;
      }

      .close-btn svg {
        width: 1em;
        height: 1em;
        fill: none;
        stroke: currentColor;
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      /* ── Body ───────────────────────────────── */
      .body {
        flex: 1;
        overflow-y: auto;
        padding: 1em;
        scrollbar-width: thin;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this._escHandler);
    super.disconnectedCallback();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (!this._initialised) return;
    this._applyStyles();
    if (name === 'open') this._open ? this._doOpen() : this._doClose('attribute');
  }

  _applyStyles() {
    const vars = {};
    if (this._background) vars['--_bg'] = resolveColor(this._background);
    if (this._width) vars['--_width'] = this._width;
    if (this._height) vars['--_height'] = this._height;
    const elev = resolveElevation(this._elevation);
    if (elev) vars['--_elevation'] = elev;
    const fontSize = resolveSize(this._size);
    if (fontSize) vars['font-size'] = fontSize;
    this._setDynamicVars(vars);
  }

  _update() {
    super._update();

    // Close button
    this.shadowRoot?.querySelector('.close-btn')?.addEventListener('click', () => this.hide('close-button'));

    // Backdrop click
    this.shadowRoot?.querySelector('.backdrop')?.addEventListener('click', () => {
      if (!this._persistent) this.hide('backdrop');
    });

    // Escape key
    this._escHandler = (e) => { if (e.key === 'Escape' && !this._persistent) this.hide('escape'); };

    if (this._open) this._doOpen();
  }

  /** Open the drawer. */
  show() {
    this.open = true;
  }

  /** Close the drawer. */
  hide(reason = 'method') {
    this._doClose(reason);
  }

  _doOpen() {
    const panel = this.shadowRoot?.querySelector('.panel');
    const backdrop = this.shadowRoot?.querySelector('.backdrop');
    if (panel) requestAnimationFrame(() => panel.classList.add('visible'));
    if (backdrop) backdrop.classList.add('visible');
    document.addEventListener('keydown', this._escHandler);
    this.emit('ui-open');
  }

  _doClose(reason = 'method') {
    const panel = this.shadowRoot?.querySelector('.panel');
    const backdrop = this.shadowRoot?.querySelector('.backdrop');
    if (panel) panel.classList.remove('visible');
    if (backdrop) backdrop.classList.remove('visible');
    document.removeEventListener('keydown', this._escHandler);
    if (this.hasAttribute('open')) this.removeAttribute('open');
    this.emit('ui-close', { reason });
  }

  render() {
    const esc = (s) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const closeSvg = '<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

    const header = this._noHeader ? '' : `
      <div class="header">
        <span class="header-title">${esc(this._label)}</span>
        <button class="close-btn" aria-label="Close drawer">${closeSvg}</button>
      </div>
    `;

    return `
      <div class="backdrop"></div>
      <div class="panel" role="dialog" aria-label="${esc(this._label)}">
        ${header}
        <div class="body"><slot></slot></div>
      </div>
    `;
  }
}

customElements.define('ui-drawer', UIDrawer);
