import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, resolveElevation } from '../../core/ui-utils.js';

/**
 * `<ui-dialog>` — Modal / non-modal dialog overlay.
 *
 * Displays content in a centred overlay with an optional backdrop.
 * Open via the `open` attribute/property or `show()` / `showModal()`.
 *
 * @element ui-dialog
 *
 * @attr {Boolean} open       - Whether the dialog is visible
 * @attr {Boolean} modal      - Show as modal with backdrop (default true)
 * @attr {String}  width      - Dialog width (default: "min(90vw, 500px)")
 * @attr {String}  maxHeight  - Max height before scrolling (attribute: max-height)
 * @attr {String}  size       - Named size preset: "small" (360px), "medium" (500px), "large" (700px), "x-large" (900px), "full" (100vw × 100vh)
 * @attr {String}  padding    - Inner padding
 * @attr {String}  background - Panel background colour
 * @attr {String}  elevation  - Shadow depth: 1–5 or raw CSS box-shadow (default: 5)
 * @attr {Boolean} persistent - If true, clicking backdrop or pressing Escape does NOT close
 * @attr {Boolean} noHeader   - Hide the built-in header bar (attribute: no-header)
 * @attr {String}  label      - Dialog title shown in the header
 *
 * @slot (default) - Dialog body content
 *
 * @fires ui-open    - Emitted when the dialog opens
 * @fires ui-close   - Emitted when the dialog closes; detail: { reason }
 * @fires ui-request-close - Emitted when the user tries to close a persistent dialog
 *
 * @example
 *   <ui-dialog label="Confirm" open>
 *     <p>Are you sure?</p>
 *     <ui-button onclick="this.closest('ui-dialog').hide()">Close</ui-button>
 *   </ui-dialog>
 */
export class UIDialog extends UIComponent {
  static properties = {
    open:       { type: Boolean, default: false,    reflect: true },
    modal:      { type: Boolean, default: true,     reflect: true },
    width:      { type: String,  default: '',       reflect: true },
    maxHeight:  { type: String,  default: '',       reflect: true, attribute: 'max-height' },
    size:       { type: String,  default: '',       reflect: true },
    padding:    { type: String,  default: '',       reflect: true },
    background: { type: String,  default: '',       reflect: true },
    elevation:  { type: String,  default: '',       reflect: true },
    persistent: { type: Boolean, default: false,    reflect: true },
    noHeader:   { type: Boolean, default: false,    reflect: true, attribute: 'no-header' },
    label:      { type: String,  default: '',       reflect: true },
  };

  static _sizeMap = {
    small:    '360px',
    medium:   '500px',
    large:    '700px',
    'x-large':'900px',
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
        background: rgba(0,0,0,0.45);
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      .backdrop.visible {
        display: block;
        opacity: 1;
      }

      .panel {
        display: none;
        position: fixed;
        z-index: 9999;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.95);
        background: var(--_bg, var(--ui-bg, #fff));
        border-radius: var(--ui-radius, 0.5em);
        box-shadow: var(--_elevation, 0 25px 50px rgba(0,0,0,0.15), 0 12px 24px rgba(0,0,0,0.08));
        box-sizing: border-box;
        max-width: 95vw;
        max-height: var(--_max-h, 85vh);
        width: var(--_width, min(90vw, 500px));
        opacity: 0;
        transition: opacity 0.2s ease, transform 0.2s ease;
        outline: none;
        overflow: hidden;
        flex-direction: column;
      }
      .panel.visible {
        display: flex;
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }

      :host([size="full"]) .panel.visible {
        width: 100vw;
        height: 100vh;
        max-width: 100vw;
        max-height: 100vh;
        border-radius: 0;
      }

      .header {
        display: flex;
        align-items: center;
        padding: 1em 1.25em;
        border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
        gap: 0.5em;
        flex-shrink: 0;
      }
      .header-title {
        flex: 1;
        font-weight: 600;
        font-size: 1.1em;
        margin: 0;
        line-height: 1.3;
      }
      .close-btn {
        all: unset;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2em;
        height: 2em;
        border-radius: var(--ui-radius, 0.375em);
        color: var(--ui-text-muted, #6b7280);
        transition: background 0.15s ease, color 0.15s ease;
        font-size: 1em;
        flex-shrink: 0;
      }
      .close-btn:hover {
        background: var(--ui-bg-subtle, #f3f4f6);
        color: var(--ui-text-color, #111827);
      }
      .close-btn:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: 0.125em;
      }
      .close-btn svg { width: 1em; height: 1em; }

      .body {
        padding: var(--_padding, 1.25em);
        overflow-y: auto;
        flex: 1 1 auto;
      }
    `;
  }

  constructor() {
    super();
    this._onBackdropClick = this._onBackdropClick.bind(this);
    this._onKeyDown       = this._onKeyDown.bind(this);
    this._onCloseClick    = this._onCloseClick.bind(this);
  }

  render() {
    const headerHTML = this.noHeader ? '' : `
      <div class="header" part="header">
        <span class="header-title">${this._esc(this.label)}</span>
        <button class="close-btn" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>`;

    return `
      <div class="backdrop${this.open ? ' visible' : ''}" part="backdrop"></div>
      <div class="panel${this.open ? ' visible' : ''}" role="dialog" aria-modal="${this.modal}" aria-label="${this._esc(this.label)}" tabindex="-1" part="panel">
        ${headerHTML}
        <div class="body" part="body"><slot></slot></div>
      </div>
    `;
  }

  _esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.open) this._onOpen();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._onKeyDown);
  }

  _attachListeners() {
    const backdrop = this.shadowRoot.querySelector('.backdrop');
    const closeBtn = this.shadowRoot.querySelector('.close-btn');
    if (backdrop) backdrop.addEventListener('click', this._onBackdropClick);
    if (closeBtn) closeBtn.addEventListener('click', this._onCloseClick);
  }

  _applyStyles() {
    const vars = {};
    if (this.size && this.size !== 'full') {
      const preset = UIDialog._sizeMap[this.size];
      if (preset) vars['--_width'] = preset;
    } else if (this.width) {
      vars['--_width'] = this.width;
    }
    if (this.maxHeight)  vars['--_max-h']   = this.maxHeight;
    if (this.padding)    vars['--_padding']  = this.padding;
    if (this.background) vars['--_bg'] = resolveColor(this.background) || this.background;

    const shadow = resolveElevation(this.elevation);
    if (shadow) vars['--_elevation'] = shadow;

    this._setDynamicVars(vars);
  }

  /** Open the dialog programmatically. */
  show() { this.open = true; }

  /** Show as modal (same as show — modal is default). */
  showModal() { this.modal = true; this.open = true; }

  /** Close the dialog. */
  hide(reason = 'api') { this._requestClose(reason); }

  _update() {
    const wasOpen = this.shadowRoot?.querySelector('.panel.visible');
    super._update();
    this._attachListeners();
    this._applyStyles();
    const isOpen = this.open;
    if (isOpen && !wasOpen) this._onOpen();
    if (!isOpen && wasOpen) this._onClose('property');
  }

  _onOpen() {
    document.addEventListener('keydown', this._onKeyDown);
    // Focus the panel
    requestAnimationFrame(() => {
      const panel = this.shadowRoot.querySelector('.panel');
      if (panel) panel.focus();
    });
    this.emit('ui-open');
  }

  _onClose(reason) {
    document.removeEventListener('keydown', this._onKeyDown);
    this.emit('ui-close', { reason });
  }

  _requestClose(reason) {
    if (this.persistent) {
      this.emit('ui-request-close', { reason });
      // Quick shake to indicate it won't close
      const panel = this.shadowRoot.querySelector('.panel');
      if (panel) {
        panel.style.animation = 'none';
        panel.offsetHeight; // reflow
        panel.style.animation = 'shake 0.3s ease';
        setTimeout(() => panel.style.animation = '', 350);
      }
      return;
    }
    this.open = false;
  }

  _onBackdropClick() {
    this._requestClose('backdrop');
  }

  _onCloseClick() {
    this._requestClose('close-button');
  }

  _onKeyDown(e) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      this._requestClose('escape');
    }
  }
}

customElements.define('ui-dialog', UIDialog);
