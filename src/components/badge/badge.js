import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, contrastColorFor } from '../../core/ui-utils.js';

/**
 * `<ui-badge>` — A small status indicator / label component.
 *
 * @element ui-badge
 *
 * @attr {String}  background - Background colour: a palette token (e.g. "red-600", "indigo-500") or any CSS colour
 * @attr {String}  color      - Text colour: a palette token or any CSS colour (auto-detected if omitted)
 * @attr {String}  size       - Badge size: xx-small … xxx-large, or any CSS length
 * @attr {Boolean} pill       - Fully rounded ends (capsule shape)
 * @attr {Boolean} outline    - Border only, no fill; text and border use the background colour
 * @attr {Boolean} circle     - Circular shape (for single-character or icon badges)
 * @attr {Boolean} pulse      - Attention-getting pulse animation (glow radiates from the badge)
 * @attr {Boolean} bounce     - Gentle vertical hop animation
 * @attr {Boolean} shake      - Quick horizontal wiggle animation
 * @attr {Boolean} ping       - Expanding ring beacon animation
 *
 * @slot (default) - Badge content (text, number, icon)
 *
 * @example
 *   <ui-badge background="red-600">3</ui-badge>
 *   <ui-badge background="green-600" pill>Active</ui-badge>
 *   <ui-badge background="indigo-500" outline>Beta</ui-badge>
 *   <ui-badge background="red-600" circle>!</ui-badge>
 *   <ui-badge background="red-600" circle pulse>3</ui-badge>
 *   <ui-badge background="blue-600" bounce>New</ui-badge>
 *   <ui-badge background="amber-500" shake>!</ui-badge>
 *   <ui-badge background="green-600" circle ping>●</ui-badge>
 */
export class UIBadge extends UIComponent {
  static properties = {
    background: { type: String,  default: '',    reflect: true },
    color:      { type: String,  default: '',    reflect: true },
    size:       { type: String,  default: '',    reflect: true },
    pill:       { type: Boolean, default: false,        reflect: true },
    outline:    { type: Boolean, default: false,        reflect: true },
    circle:     { type: Boolean, default: false,        reflect: true },
    pulse:      { type: Boolean, default: false,        reflect: true },
    bounce:     { type: Boolean, default: false,        reflect: true },
    shake:      { type: Boolean, default: false,        reflect: true },
    ping:       { type: Boolean, default: false,        reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        line-height: 1;
        white-space: nowrap;
        vertical-align: middle;
        box-sizing: border-box;

        padding: 0.25em 0.55em;
        border-radius: var(--ui-radius, 0.25em);
        border: 0.1em solid transparent;

        background: var(--_bg, inherit);
        color: var(--_fg, inherit);
        border-color: var(--_border, transparent);

        transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
      }

      :host([pill]) {
        border-radius: 9999px;
      }

      :host([circle]) {
        border-radius: 50%;
        padding: 0.25em;
        min-width: 1.6em;
        min-height: 1.6em;
      }

      /* Outlined variant */
      :host([outline]) {
        background: transparent;
      }

      /* Pulse animation — glow radiates outward */
      @keyframes ui-badge-pulse {
        0%   { box-shadow: 0 0 0 0 var(--_pulse-color); }
        70%  { box-shadow: 0 0 0 0.55em transparent; }
        100% { box-shadow: 0 0 0 0 transparent; }
      }

      :host([pulse]) {
        animation: ui-badge-pulse 1.5s ease-in-out infinite;
      }

      /* Bounce animation — gentle vertical hop */
      @keyframes ui-badge-bounce {
        0%, 100% { transform: translateY(0); }
        30%      { transform: translateY(-0.35em); }
        50%      { transform: translateY(0.1em); }
        70%      { transform: translateY(-0.15em); }
      }

      :host([bounce]) {
        animation: ui-badge-bounce 1s ease-in-out infinite;
      }

      /* Shake animation — quick horizontal wiggle */
      @keyframes ui-badge-shake {
        0%, 100% { transform: translateX(0); }
        15%      { transform: translateX(-0.2em); }
        30%      { transform: translateX(0.2em); }
        45%      { transform: translateX(-0.15em); }
        60%      { transform: translateX(0.15em); }
        75%      { transform: translateX(-0.05em); }
      }

      :host([shake]) {
        animation: ui-badge-shake 0.6s ease-in-out infinite;
      }

      /* Ping animation — expanding ring beacon */
      :host([ping]) {
        position: relative;
        overflow: visible;
      }

      slot {
        display: inline;
      }

      /* Ping ring — rendered as a sibling span to avoid ::after limitations */
      .ping-ring {
        display: none;
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: var(--_bg);
        opacity: 0.75;
        animation: ui-badge-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        pointer-events: none;
      }

      :host([ping]) .ping-ring {
        display: block;
      }

      @keyframes ui-badge-ping {
        0%   { transform: scale(1); opacity: 0.75; }
        75%, 100% { transform: scale(1.8); opacity: 0; }
      }
    `;
  }

  render() {
    return '<span class="ping-ring"></span><slot></slot>';
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyStyles();
  }

  /** Compute CSS custom properties from current attribute values. */
  _applyStyles() {
    const vars = {};
    const isOutline = this.outline;

    if (this.background) {
      const bg = resolveColor(this.background);
      vars['--_bg'] = isOutline ? 'transparent' : bg;
      vars['--_border'] = isOutline ? bg : 'transparent';
      vars['--_pulse-color'] = bg;

      if (this.color) {
        vars['--_fg'] = resolveColor(this.color);
      } else if (isOutline) {
        vars['--_fg'] = bg;
      } else {
        vars['--_fg'] = contrastColorFor(this.background);
      }
    } else if (this.color) {
      vars['--_fg'] = resolveColor(this.color);
    }

    const fontSize = resolveSize(this.size);
    if (fontSize) vars['font-size'] = fontSize;

    this._setDynamicVars(vars);
  }
}

customElements.define('ui-badge', UIBadge);
