import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, resolveElevation } from '../../core/ui-utils.js';

/**
 * `<ui-popover>` — Anchored floating content panel.
 *
 * Displays interactive content (forms, rich previews) in a floating panel
 * anchored to a trigger element. Unlike tooltips, popovers support
 * interactive content and are dismissed on outside click or Escape.
 *
 * @element ui-popover
 *
 * @attr {String}  placement  - Panel position: top | bottom | left | right (default: bottom)
 * @attr {String}  trigger    - How to open: click | hover | manual (default: click)
 * @attr {String}  elevation  - Shadow depth: 1–5 (default: 3)
 * @attr {String}  background - Panel background colour
 * @attr {String}  color      - Panel text colour
 * @attr {String}  size       - Component size
 * @attr {String}  width      - Panel width
 * @attr {String}  padding    - Panel inner padding
 * @attr {Boolean} open       - Whether the popover is visible
 * @attr {Boolean} arrow      - Show an arrow pointing to the trigger
 *
 * @slot (default) - Content displayed in the floating panel
 * @slot trigger   - The trigger element (wrap your button/icon here)
 *
 * @fires ui-open  - Emitted when the popover opens
 * @fires ui-close - Emitted when the popover closes
 *
 * @example
 *   <ui-popover>
 *     <ui-button slot="trigger">Click me</ui-button>
 *     <p>Popover content here.</p>
 *   </ui-popover>
 */
export class UIPopover extends UIComponent {
  static properties = {
    placement:  { type: String,  default: 'bottom', reflect: true },
    trigger:    { type: String,  default: 'click',  reflect: true },
    elevation:  { type: String,  default: '3',      reflect: true },
    background: { type: String,  default: '',       reflect: true },
    color:      { type: String,  default: '',       reflect: true },
    size:       { type: String,  default: '',       reflect: true },
    width:      { type: String,  default: '',       reflect: true },
    padding:    { type: String,  default: '',       reflect: true },
    open:       { type: Boolean, default: false,    reflect: true },
    arrow:      { type: Boolean, default: false,    reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: inline-block;
        position: relative;
      }

      .trigger-wrap {
        display: inline-block;
        cursor: pointer;
      }

      .panel {
        position: absolute;
        z-index: 9999;
        min-width: 8em;
        padding: var(--_padding, 0.75em 1em);
        border-radius: var(--ui-radius, 0.5em);
        border: 1px solid var(--ui-border-color, #e5e7eb);
        background: var(--_bg, var(--ui-bg, #fff));
        color: var(--_color, var(--ui-text-color, #1f2937));
        box-shadow: var(--_elevation, 0 10px 15px rgba(0,0,0,0.1));
        font-family: inherit;
        font-size: inherit;
        line-height: 1.5;
        opacity: 0;
        transform: scale(0.95);
        pointer-events: none;
        transition: opacity 0.15s ease, transform 0.15s ease;
        box-sizing: border-box;
      }

      .panel.visible {
        opacity: 1;
        transform: scale(1);
        pointer-events: auto;
      }

      /* ── Placement ──────────────────────────── */
      :host([placement="bottom"]) .panel { top: 100%; left: 50%; transform-origin: top center; margin-top: 0.5em; }
      :host([placement="bottom"]) .panel.visible { transform: translateX(-50%) scale(1); }
      :host([placement="bottom"]) .panel:not(.visible) { transform: translateX(-50%) scale(0.95); }

      :host([placement="top"]) .panel { bottom: 100%; left: 50%; transform-origin: bottom center; margin-bottom: 0.5em; }
      :host([placement="top"]) .panel.visible { transform: translateX(-50%) scale(1); }
      :host([placement="top"]) .panel:not(.visible) { transform: translateX(-50%) scale(0.95); }

      :host([placement="left"]) .panel { right: 100%; top: 50%; transform-origin: center right; margin-right: 0.5em; }
      :host([placement="left"]) .panel.visible { transform: translateY(-50%) scale(1); }
      :host([placement="left"]) .panel:not(.visible) { transform: translateY(-50%) scale(0.95); }

      :host([placement="right"]) .panel { left: 100%; top: 50%; transform-origin: center left; margin-left: 0.5em; }
      :host([placement="right"]) .panel.visible { transform: translateY(-50%) scale(1); }
      :host([placement="right"]) .panel:not(.visible) { transform: translateY(-50%) scale(0.95); }

      /* ── Arrow ──────────────────────────────── */
      .arrow-tip {
        display: none;
        position: absolute;
        width: 0.6em;
        height: 0.6em;
        background: var(--_bg, var(--ui-bg, #fff));
        border: 1px solid var(--ui-border-color, #e5e7eb);
        transform: rotate(45deg);
      }

      :host([arrow]) .arrow-tip { display: block; }

      :host([placement="bottom"][arrow]) .arrow-tip { top: -0.35em; left: 50%; margin-left: -0.3em; border-right: none; border-bottom: none; }
      :host([placement="top"][arrow]) .arrow-tip    { bottom: -0.35em; left: 50%; margin-left: -0.3em; border-left: none; border-top: none; }
      :host([placement="left"][arrow]) .arrow-tip   { right: -0.35em; top: 50%; margin-top: -0.3em; border-left: none; border-bottom: none; }
      :host([placement="right"][arrow]) .arrow-tip  { left: -0.35em; top: 50%; margin-top: -0.3em; border-right: none; border-top: none; }
    `;
  }

  constructor() {
    super();
    this._onDocClick = this._onDocClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._hoverTimeout = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._onDocClick, true);
    document.removeEventListener('keydown', this._onKeyDown);
    clearTimeout(this._hoverTimeout);
    super.disconnectedCallback();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (!this._initialised) return;
    this._applyStyles();
  }

  _applyStyles() {
    const vars = {};
    if (this._background) vars['--_bg'] = resolveColor(this._background);
    if (this._color) vars['--_color'] = resolveColor(this._color);
    if (this._padding) vars['--_padding'] = this._padding;
    const elev = resolveElevation(this._elevation);
    if (elev) vars['--_elevation'] = elev;
    const fontSize = resolveSize(this._size);
    if (fontSize) vars['font-size'] = fontSize;
    if (this._width) vars['--_width'] = this._width;
    this._setDynamicVars(vars);
  }

  _update() {
    super._update();
    const panel = this.shadowRoot?.querySelector('.panel');
    if (panel && this._width) panel.style.width = this._width;

    // Wire trigger events
    const triggerWrap = this.shadowRoot?.querySelector('.trigger-wrap');
    if (!triggerWrap) return;

    if (this._trigger === 'click') {
      triggerWrap.addEventListener('click', (e) => {
        e.stopPropagation();
        this._open ? this.hide() : this.show();
      });
    } else if (this._trigger === 'hover') {
      triggerWrap.addEventListener('mouseenter', () => {
        clearTimeout(this._hoverTimeout);
        this.show();
      });
      triggerWrap.addEventListener('mouseleave', () => {
        this._hoverTimeout = setTimeout(() => this.hide(), 200);
      });
      const panelEl = this.shadowRoot?.querySelector('.panel');
      if (panelEl) {
        panelEl.addEventListener('mouseenter', () => clearTimeout(this._hoverTimeout));
        panelEl.addEventListener('mouseleave', () => {
          this._hoverTimeout = setTimeout(() => this.hide(), 200);
        });
      }
    }

    // Sync initial state
    if (this._open) this.show();
  }

  show() {
    const panel = this.shadowRoot?.querySelector('.panel');
    if (!panel) return;
    panel.classList.add('visible');
    if (!this.hasAttribute('open')) this.setAttribute('open', '');
    document.addEventListener('click', this._onDocClick, true);
    document.addEventListener('keydown', this._onKeyDown);
    this.emit('ui-open');
  }

  hide() {
    const panel = this.shadowRoot?.querySelector('.panel');
    if (panel) panel.classList.remove('visible');
    this.removeAttribute('open');
    document.removeEventListener('click', this._onDocClick, true);
    document.removeEventListener('keydown', this._onKeyDown);
    this.emit('ui-close');
  }

  _onDocClick(e) {
    if (!this.contains(e.target) && !this.shadowRoot?.contains(e.target)) {
      this.hide();
    }
  }

  _onKeyDown(e) {
    if (e.key === 'Escape') this.hide();
  }

  render() {
    return `
      <div class="trigger-wrap">
        <slot name="trigger"></slot>
      </div>
      <div class="panel" role="dialog">
        <div class="arrow-tip"></div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('ui-popover', UIPopover);
