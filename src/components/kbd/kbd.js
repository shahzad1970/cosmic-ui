import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-kbd>` — Keyboard shortcut display.
 *
 * Renders keyboard key(s) in a styled key-cap appearance.
 * Automatically splits on `+` to show multi-key combos.
 *
 * @element ui-kbd
 *
 * @attr {String} size       - Component size: keyword or CSS length
 * @attr {String} background - Key background colour (palette token or CSS colour)
 * @attr {String} color      - Key text colour (palette token or CSS colour)
 * @attr {String} separator  - Visual separator between keys (default: "+")
 *
 * @slot (default) - Key text (e.g. "⌘ + K", "Ctrl + Shift + P")
 *
 * @example
 *   <ui-kbd>⌘ + K</ui-kbd>
 *   <ui-kbd>Ctrl + C</ui-kbd>
 *   <ui-kbd size="large">Enter</ui-kbd>
 */
export class UIKbd extends UIComponent {
  static properties = {
    size:       { type: String, default: '', reflect: true },
    background: { type: String, default: '', reflect: true },
    color:      { type: String, default: '', reflect: true },
    separator:  { type: String, default: '', reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: inline-flex;
        align-items: center;
        gap: 0.3em;
        font-family: var(--ui-font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Code", monospace);
        /* font-size is set dynamically on :host via resolveSize(). */
        line-height: 1;
        vertical-align: baseline;
      }

      .key {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 1.6em;
        height: 1.6em;
        padding: 0.1em 0.4em;
        border-radius: 0.25em;
        border: 1px solid var(--_border, var(--ui-border-color, #d1d5db));
        border-bottom-width: 2px;
        background: var(--_bg, var(--ui-bg, #fff));
        color: var(--_color, var(--ui-text-color, #1f2937));
        font-size: inherit;
        font-family: inherit;
        font-weight: 600;
        white-space: nowrap;
        box-shadow: 0 1px 0 rgba(0,0,0,0.08);
        box-sizing: border-box;
      }

      .sep {
        color: var(--ui-text-muted, #9ca3af);
        font-weight: 400;
        font-size: 0.85em;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
    // Re-render when slot content changes
    this.shadowRoot?.querySelector('slot')?.addEventListener('slotchange', () => this._renderKeys());
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) {
      this._applyStyles();
      if (name === 'separator') this._renderKeys();
    }
  }

  _applyStyles() {
    const vars = {};
    vars['font-size'] = resolveSize(this._size) || '0.85em';
    if (this._background) {
      const bg = resolveColor(this._background);
      vars['--_bg'] = bg;
      vars['--_border'] = bg;
    }
    if (this._color) vars['--_color'] = resolveColor(this._color);
    this._setDynamicVars(vars);
  }

  _update() {
    super._update();
    // Use a microtask so the slot content has been distributed
    queueMicrotask(() => this._renderKeys());
  }

  _renderKeys() {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return;

    const text = this._getSlotText(slot).trim();
    if (!text) return;

    const container = this.shadowRoot?.querySelector('.key-container');
    if (!container) return;

    const sep = this._separator || '+';

    // Split on + (with surrounding whitespace)
    const parts = text.split(/\s*\+\s*/);
    container.innerHTML = parts.map((key, i) => {
      const sepHtml = i < parts.length - 1
        ? `<span class="sep">${sep.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>`
        : '';
      const esc = key.replace(/&/g, '&amp;').replace(/</g, '&lt;');
      return `<span class="key">${esc}</span>${sepHtml}`;
    }).join('');
  }

  _getSlotText(slot) {
    return slot.assignedNodes({ flatten: true })
      .map(n => n.textContent || '')
      .join('');
  }

  render() {
    return `
      <span class="key-container"></span>
      <slot style="display:none"></slot>
    `;
  }
}

customElements.define('ui-kbd', UIKbd);
