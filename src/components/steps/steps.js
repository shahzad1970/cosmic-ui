import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, contrastColorFor } from '../../core/ui-utils.js';

/**
 * `<ui-steps>` — Step wizard / stepper.
 *
 * Renders a horizontal or vertical step indicator for multi-step flows
 * (wizards, onboarding, checkout). Each step shows a number or icon,
 * label, and optional description.
 *
 * @element ui-steps
 *
 * @attr {Number}  current    - Active step index (0-based, default 0)
 * @attr {String}  background - Active step colour
 * @attr {String}  color      - Active step text colour
 * @attr {String}  size       - Component size
 * @attr {Boolean} vertical   - Vertical layout
 * @attr {Boolean} clickable  - Allow clicking completed steps
 *
 * @slot (default) - `<ui-step>` elements
 *
 * @fires ui-change - Emitted when a step is clicked (if clickable); detail: { index }
 *
 * @example
 *   <ui-steps current="1" background="indigo-500">
 *     <ui-step label="Account"></ui-step>
 *     <ui-step label="Profile"></ui-step>
 *     <ui-step label="Review"></ui-step>
 *   </ui-steps>
 */
export class UISteps extends UIComponent {
  static properties = {
    current:    { type: Number,  default: 0,           reflect: true },
    background: { type: String,  default: 'indigo-500', reflect: true },
    color:      { type: String,  default: '',          reflect: true },
    size:       { type: String,  default: '',          reflect: true },
    vertical:   { type: Boolean, default: false,       reflect: true },
    clickable:  { type: Boolean, default: false,       reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        font-family: inherit;
      }

      .steps {
        display: flex;
        align-items: flex-start;
        gap: 0;
        counter-reset: step;
      }

      :host([vertical]) .steps {
        flex-direction: column;
      }

      ::slotted(ui-step) {
        flex: 1;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
    this._syncSteps();
    this.addEventListener('click', this._onClick.bind(this));
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) {
      this._applyStyles();
      this._syncSteps();
    }
  }

  _applyStyles() {
    const vars = {};
    const fontSize = resolveSize(this._size);
    if (fontSize) vars['font-size'] = fontSize;
    this._setDynamicVars(vars);
  }

  _syncSteps() {
    const steps = [...this.querySelectorAll('ui-step')];
    const activeColor = resolveColor(this._background) || 'var(--ui-indigo-500, #6366f1)';
    const textColor = this._color ? resolveColor(this._color) : contrastColorFor(this._background);

    steps.forEach((step, i) => {
      step._index = i;
      step._state = i < this._current ? 'completed' : i === this._current ? 'active' : 'upcoming';
      step._activeColor = activeColor;
      step._activeTextColor = textColor;
      step._vertical = this._vertical;
      step._isLast = i === steps.length - 1;
      step._clickable = this._clickable;
      step._refresh();
    });
  }

  _onClick(e) {
    if (!this._clickable) return;
    const step = e.target.closest('ui-step');
    if (step && step._state === 'completed') {
      this.current = step._index;
      this.emit('ui-change', { index: step._index });
    }
  }

  _update() {
    super._update();
    queueMicrotask(() => this._syncSteps());
  }

  render() {
    return `
      <div class="steps" role="list">
        <slot></slot>
      </div>
    `;
  }
}

/**
 * `<ui-step>` — Individual step in a stepper.
 *
 * @element ui-step
 *
 * @attr {String} label       - Step label text
 * @attr {String} description - Optional step description
 * @attr {String} icon        - Icon name for the step circle
 *
 * @slot (default) - Step description content
 */
export class UIStep extends UIComponent {
  static properties = {
    label:       { type: String, default: '', reflect: true },
    description: { type: String, default: '', reflect: true },
    icon:        { type: String, default: '', reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: flex;
        align-items: flex-start;
        flex: 1;
        font-family: inherit;
      }

      .step {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        flex: 1;
      }

      .header {
        display: flex;
        align-items: center;
        width: 100%;
      }

      .connector {
        flex: 1;
        height: 2px;
        background: var(--ui-border-color, #d1d5db);
        transition: background 0.3s ease;
      }

      .connector.completed {
        background: var(--_active-color, var(--ui-indigo-500, #6366f1));
      }

      .connector.hidden {
        visibility: hidden;
      }

      .circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2em;
        height: 2em;
        border-radius: 50%;
        font-weight: 600;
        font-size: 0.85em;
        flex-shrink: 0;
        transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        box-sizing: border-box;
        border: 2px solid var(--ui-border-color, #d1d5db);
        background: var(--ui-bg, #fff);
        color: var(--ui-text-muted, #9ca3af);
      }

      .circle.active {
        border-color: var(--_active-color, var(--ui-indigo-500, #6366f1));
        background: var(--_active-color, var(--ui-indigo-500, #6366f1));
        color: var(--_active-text, #fff);
      }

      .circle.completed {
        border-color: var(--_active-color, var(--ui-indigo-500, #6366f1));
        background: var(--_active-color, var(--ui-indigo-500, #6366f1));
        color: var(--_active-text, #fff);
        cursor: pointer;
      }

      .circle.completed svg {
        width: 1em;
        height: 1em;
        fill: none;
        stroke: currentColor;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .content {
        text-align: center;
        margin-top: 0.5em;
        padding: 0 0.25em;
      }

      .label {
        font-weight: 600;
        font-size: 0.85em;
        color: var(--ui-text-color, #1f2937);
      }

      .label.muted {
        color: var(--ui-text-muted, #9ca3af);
      }

      .desc {
        font-size: 0.75em;
        color: var(--ui-text-muted, #6b7280);
        margin-top: 0.15em;
      }

      /* Vertical mode */
      :host([data-vertical]) .step {
        flex-direction: row;
        align-items: flex-start;
      }

      :host([data-vertical]) .header {
        flex-direction: column;
        width: auto;
        align-items: center;
      }

      :host([data-vertical]) .connector {
        width: 2px;
        height: 2em;
        flex: none;
      }

      :host([data-vertical]) .content {
        text-align: left;
        margin-top: 0;
        margin-left: 0.75em;
        padding-bottom: 1.5em;
      }
    `;
  }

  constructor() {
    super();
    this._index = 0;
    this._state = 'upcoming';
    this._activeColor = '';
    this._activeTextColor = '';
    this._vertical = false;
    this._isLast = false;
    this._clickable = false;
  }

  _refresh() {
    const vars = {};
    if (this._activeColor) vars['--_active-color'] = this._activeColor;
    if (this._activeTextColor) vars['--_active-text'] = this._activeTextColor;
    this._setDynamicVars(vars);

    if (this._vertical) this.setAttribute('data-vertical', '');
    else this.removeAttribute('data-vertical');

    // Update DOM
    const circle = this.shadowRoot?.querySelector('.circle');
    const connLeft = this.shadowRoot?.querySelector('.conn-left');
    const connRight = this.shadowRoot?.querySelector('.conn-right');
    const labelEl = this.shadowRoot?.querySelector('.label');

    if (circle) {
      circle.className = `circle ${this._state}`;
      if (this._state === 'completed') {
        circle.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>';
      } else {
        circle.textContent = String(this._index + 1);
      }
    }

    if (connLeft) {
      connLeft.className = `connector${this._index === 0 ? ' hidden' : ''}${this._state !== 'upcoming' ? ' completed' : ''}`;
    }
    if (connRight) {
      connRight.className = `connector${this._isLast ? ' hidden' : ''}${this._state === 'completed' ? ' completed' : ''}`;
    }
    if (labelEl) {
      labelEl.className = `label${this._state === 'upcoming' ? ' muted' : ''}`;
    }
  }

  render() {
    const esc = (s) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const desc = this._description ? `<div class="desc">${esc(this._description)}</div>` : '';

    return `
      <div class="step">
        <div class="header">
          <div class="connector conn-left hidden"></div>
          <div class="circle">${this._index + 1}</div>
          <div class="connector conn-right hidden"></div>
        </div>
        <div class="content">
          <div class="label">${esc(this._label)}</div>
          ${desc}
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('ui-steps', UISteps);
customElements.define('ui-step', UIStep);
