import { UIComponent } from '../../core/ui-component.js';

/**
 * `<ui-layout-split>` — Resizable two-panel split layout.
 *
 * Splits its space into two panels separated by a draggable gutter.
 * Works horizontally (side-by-side, default) or vertically (stacked).
 *
 * @element ui-layout-split
 *
 * @attr {Boolean} vertical  - Stack panels vertically instead of side-by-side
 * @attr {String}  position  - Initial split position as a percentage (default: "50")
 * @attr {String}  min       - Minimum panel size as a percentage (default: "10")
 * @attr {String}  max       - Maximum panel size as a percentage (default: "90")
 * @attr {String}  gutterSize - Gutter width/height in pixels (attribute: gutter-size, default: "6")
 * @attr {Boolean} disabled  - Disable resizing
 * @attr {String}  width     - CSS width
 * @attr {String}  height    - CSS height
 * @attr {Boolean} full      - width: 100% + height: 100%
 *
 * @slot (default) - Exactly two child elements (the two panels)
 *
 * @fires ui-resize - Emitted when the split position changes; detail: { position: number }
 *
 * @example
 *   <ui-layout-split position="30" style="height: 400px">
 *     <div>Left panel</div>
 *     <div>Right panel</div>
 *   </ui-layout-split>
 *
 *   <ui-layout-split vertical position="60" style="height: 600px">
 *     <div>Top panel</div>
 *     <div>Bottom panel</div>
 *   </ui-layout-split>
 */
export class UILayoutSplit extends UIComponent {
  static properties = {
    vertical:   { type: Boolean, default: false, reflect: true },
    position:   { type: String,  default: '50',  reflect: true },
    min:        { type: String,  default: '10',  reflect: true },
    max:        { type: String,  default: '90',  reflect: true },
    gutterSize: { type: String,  default: '6',   reflect: true, attribute: 'gutter-size' },
    disabled:   { type: Boolean, default: false,  reflect: true },
    width:      { type: String,  default: '',     reflect: true },
    height:     { type: String,  default: '',     reflect: true },
    full:       { type: Boolean, default: false,  reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: flex;
        box-sizing: border-box;
        overflow: hidden;
      }
      :host([full]) { width: 100%; height: 100%; }
      :host([vertical]) { flex-direction: column; }

      .panel {
        overflow: auto;
        box-sizing: border-box;
      }
      .panel-a { flex: var(--_flex-a, 1 1 50%); }
      .panel-b { flex: var(--_flex-b, 1 1 50%); }

      .gutter {
        flex: 0 0 auto;
        background: var(--ui-border-color, #e5e7eb);
        position: relative;
        z-index: 1;
        transition: background 0.15s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .gutter::after {
        content: '';
        display: block;
        border-radius: 1px;
        opacity: 0.5;
        transition: opacity 0.15s ease;
      }
      .gutter:hover::after, .gutter.dragging::after {
        opacity: 0.9;
      }
      .gutter:hover, .gutter.dragging {
        background: var(--ui-focus-ring, #6366f1);
      }
      :host(:not([vertical])) .gutter {
        width: var(--_gutter, 6px);
        cursor: col-resize;
      }
      :host(:not([vertical])) .gutter::after {
        width: 2px;
        height: 24px;
        border-left: 1px solid rgba(255,255,255,0.7);
        border-right: 1px solid rgba(255,255,255,0.7);
      }
      :host([vertical]) .gutter {
        height: var(--_gutter, 6px);
        cursor: row-resize;
      }
      :host([vertical]) .gutter::after {
        width: 24px;
        height: 2px;
        border-top: 1px solid rgba(255,255,255,0.7);
        border-bottom: 1px solid rgba(255,255,255,0.7);
      }
      :host([disabled]) .gutter {
        cursor: default;
        pointer-events: none;
        opacity: 0.4;
      }

      /* Slotted children fill their panel */
      ::slotted(*) {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
    `;
  }

  constructor() {
    super();
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp   = this._onPointerUp.bind(this);
    this._dragging = false;
    this._rendered = false;
  }

  render() {
    return `
      <div class="panel panel-a"><slot name="__a"></slot></div>
      <div class="gutter" part="gutter"></div>
      <div class="panel panel-b"><slot name="__b"></slot></div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._assignSlots();

    // Observe children for slot assignment
    this._mo = new MutationObserver(() => this._assignSlots());
    this._mo.observe(this, { childList: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._mo?.disconnect();
  }

  /** Assign the first two light-DOM children to named slots. */
  _assignSlots() {
    const children = [...this.children];
    children.forEach(c => c.removeAttribute('slot'));
    if (children[0]) children[0].setAttribute('slot', '__a');
    if (children[1]) children[1].setAttribute('slot', '__b');
  }

  _attachListeners() {
    const gutter = this.shadowRoot.querySelector('.gutter');
    if (gutter) gutter.addEventListener('pointerdown', this._onPointerDown);
  }

  _onPointerDown(e) {
    if (this.disabled) return;
    e.preventDefault();
    this._dragging = true;
    const gutter = this.shadowRoot.querySelector('.gutter');
    gutter?.classList.add('dragging');
    gutter?.setPointerCapture(e.pointerId);
    gutter?.addEventListener('pointermove', this._onPointerMove);
    gutter?.addEventListener('pointerup', this._onPointerUp);
    gutter?.addEventListener('lostpointercapture', this._onPointerUp);
  }

  _onPointerMove(e) {
    if (!this._dragging) return;
    const rect = this.getBoundingClientRect();
    let pct;
    if (this.vertical) {
      pct = ((e.clientY - rect.top) / rect.height) * 100;
    } else {
      pct = ((e.clientX - rect.left) / rect.width) * 100;
    }

    const min = parseFloat(this.min) || 10;
    const max = parseFloat(this.max) || 90;
    pct = Math.max(min, Math.min(max, pct));

    this._position = String(Math.round(pct * 100) / 100);
    this.setAttribute('position', this._position);
    this._applyPosition(pct);
    this.emit('ui-resize', { position: pct });
  }

  _onPointerUp(e) {
    this._dragging = false;
    const gutter = this.shadowRoot.querySelector('.gutter');
    gutter?.classList.remove('dragging');
    gutter?.removeEventListener('pointermove', this._onPointerMove);
    gutter?.removeEventListener('pointerup', this._onPointerUp);
    gutter?.removeEventListener('lostpointercapture', this._onPointerUp);
  }

  _applyPosition(pct) {
    const g = `${parseFloat(this.gutterSize) || 6}px`;
    const a = `${pct}%`;
    const b = `${100 - pct}%`;
    this._setDynamicVars({
      '--_flex-a': `0 0 calc(${a} - ${g} / 2)`,
      '--_flex-b': `0 0 calc(${b} - ${g} / 2)`,
      '--_gutter': g,
    });
  }

  _applyLayout() {
    const pct = parseFloat(this.position) || 50;
    const g = `${parseFloat(this.gutterSize) || 6}px`;
    const a = `${pct}%`;
    const b = `${100 - pct}%`;

    const vars = {
      '--_flex-a': `0 0 calc(${a} - ${g} / 2)`,
      '--_flex-b': `0 0 calc(${b} - ${g} / 2)`,
      '--_gutter': g,
    };

    if (this.width)  vars['width']  = this.width;
    if (this.height) vars['height'] = this.height;

    this._setDynamicVars(vars);
  }

  _update() {
    if (!this._rendered) {
      super._update();
      this._rendered = true;
      this._attachListeners();
    }
    this._applyLayout();
  }
}

customElements.define('ui-layout-split', UILayoutSplit);
