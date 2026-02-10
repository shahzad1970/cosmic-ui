import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-timeline>` — Vertical event timeline.
 *
 * Renders a vertical timeline of events. Place `<ui-timeline-item>`
 * children inside to define each event.
 *
 * @element ui-timeline
 *
 * @attr {String}  size       - Component size
 * @attr {String}  color      - Default line/dot colour
 * @attr {String}  line-color - Timeline line colour (attribute: line-color)
 * @attr {Boolean} alternate  - Alternate items left/right
 *
 * @slot (default) - `<ui-timeline-item>` elements
 *
 * @example
 *   <ui-timeline>
 *     <ui-timeline-item>
 *       <ui-text type="heading" size="small">Project started</ui-text>
 *       <ui-text size="x-small" color="gray-500">Jan 2024</ui-text>
 *       <ui-text size="small">Initial commit and project setup.</ui-text>
 *     </ui-timeline-item>
 *     <ui-timeline-item color="green-500" icon="check-circle">
 *       <ui-text type="heading" size="small">v1.0 released</ui-text>
 *       <ui-text size="x-small" color="gray-500">Mar 2024</ui-text>
 *       <ui-text size="small">First stable release.</ui-text>
 *     </ui-timeline-item>
 *   </ui-timeline>
 */
export class UITimeline extends UIComponent {
  static properties = {
    size:      { type: String, default: '',    reflect: true },
    color:     { type: String, default: '',    reflect: true },
    lineColor: { type: String, default: '',    reflect: true, attribute: 'line-color' },
    alternate: { type: Boolean, default: false, reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        position: relative;
        font-family: inherit;
      }

      .line {
        position: absolute;
        left: calc(0.55em + 1px);
        top: 0;
        bottom: 1.5em;
        width: 2px;
        transform: translateX(-50%);
        background: var(--_line-color, var(--ui-border-color, #d1d5db));
      }

      :host([alternate]) .line {
        left: 50%;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
    // Defer alternate marking — children may not be parsed yet
    requestAnimationFrame(() => this._applyAlternate());
    this._childObserver = new MutationObserver(() => this._applyAlternate());
    this._childObserver.observe(this, { childList: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    this._childObserver?.disconnect();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) {
      this._applyStyles();
      if (name === 'alternate') this._applyAlternate();
    }
  }

  _applyStyles() {
    const vars = {};
    if (this._lineColor) vars['--_line-color'] = resolveColor(this._lineColor);
    else if (this._color) vars['--_line-color'] = resolveColor(this._color);
    if (this._color) vars['--_timeline-color'] = resolveColor(this._color);
    const fontSize = resolveSize(this._size);
    if (fontSize) vars['font-size'] = fontSize;
    this._setDynamicVars(vars);
  }

  /** Mark odd/even children for alternate layout */
  _applyAlternate() {
    const items = [...this.querySelectorAll(':scope > ui-timeline-item')];
    items.forEach((item, i) => {
      if (this._alternate) {
        item.setAttribute('_alt', i % 2 === 0 ? 'left' : 'right');
      } else {
        item.removeAttribute('_alt');
      }
    });
  }

  render() {
    return `
      <div class="line"></div>
      <slot></slot>
    `;
  }
}

/**
 * `<ui-timeline-item>` — Individual timeline event.
 *
 * Provides a dot marker (plain or with icon). All content is composed
 * by the consumer in the default slot — use `<ui-text>` for headings,
 * timestamps, etc.
 *
 * @element ui-timeline-item
 *
 * @attr {String} color - Dot colour (palette token or CSS colour)
 * @attr {String} icon  - Icon name to show inside the dot
 *
 * @slot (default) - Event content (heading, timestamp, description — consumer-composed)
 */
export class UITimelineItem extends UIComponent {
  static properties = {
    color: { type: String, default: '', reflect: true },
    icon:  { type: String, default: '', reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        position: relative;
        padding-left: 2em;
        padding-bottom: 1.5em;
        font-family: inherit;
        line-height: 1.5;
      }

      :host(:last-child) {
        padding-bottom: 0;
      }

      /* Alternate layout — attribute set by parent ui-timeline */
      :host([_alt="right"]) {
        margin-left: 50%;
        padding-left: 2em;
        padding-right: 0;
      }

      :host([_alt="left"]) {
        width: 50%;
        text-align: right;
        padding-left: 0;
        padding-right: 2em;
      }

      :host([_alt="left"]) .dot {
        left: auto;
        right: calc(-0.55em - 1px);
        transform: translateX(50%);
      }

      :host([_alt="right"]) .dot {
        left: calc(-0.55em - 1px);
        transform: translateX(-50%);
      }

      .dot {
        position: absolute;
        left: calc(0.55em + 1px);
        transform: translateX(-50%);
        top: 0.35em;
        width: 0.75em;
        height: 0.75em;
        border-radius: 50%;
        background: var(--_dot-color, var(--_timeline-color, var(--ui-indigo-500, #6366f1)));
        border: 2px solid var(--ui-bg, #fff);
        box-sizing: border-box;
        z-index: 1;
      }

      .dot.has-icon {
        width: 1.1em;
        height: 1.1em;
        top: 0.15em;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--_dot-color, var(--_timeline-color, var(--ui-indigo-500, #6366f1)));
        color: #fff;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyStyles();
  }

  _applyStyles() {
    const vars = {};
    if (this._color) vars['--_dot-color'] = resolveColor(this._color);
    this._setDynamicVars(vars);
  }

  render() {
    const esc = (s) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const iconClass = this._icon ? ' has-icon' : '';
    const dotContent = this._icon ? `<ui-icon size="0.65em">${esc(this._icon)}</ui-icon>` : '';

    return `
      <div class="dot${iconClass}">${dotContent}</div>
      <slot></slot>
    `;
  }
}

customElements.define('ui-timeline', UITimeline);
customElements.define('ui-timeline-item', UITimelineItem);
