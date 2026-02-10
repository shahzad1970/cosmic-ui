import { UIComponent } from '../../core/ui-component.js';
import { resolveColor, contrastColorFor } from '../../core/ui-utils.js';

/**
 * `<ui-carousel-slide>` — Single slide inside a `<ui-carousel>`.
 *
 * Full-width flex container centring its content both horizontally
 * and vertically. Accepts any HTML content via the default slot.
 *
 * @element ui-carousel-slide
 *
 * @attr {String} background - Background colour: palette token or CSS colour
 * @attr {String} color      - Text colour: palette token or CSS colour
 * @attr {String} image      - Background image URL (covers the slide, content overlays on top)
 *
 * @slot (default)
 */
export class UICarouselSlide extends UIComponent {
  static properties = {
    background: { type: String, default: '', reflect: true },
    color:      { type: String, default: '', reflect: true },
    image:      { type: String, default: '', reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2em;
        background-color: var(--_bg, transparent);
        background-image: var(--_bg-image, none);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        color: var(--_color, inherit);
        box-sizing: border-box;
        min-height: 12em;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyColors();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyColors();
  }

  _applyColors() {
    const vars = {};
    if (this.background) {
      vars['--_bg'] = resolveColor(this.background);
      vars['--_color'] = this.color
        ? resolveColor(this.color)
        : contrastColorFor(this.background);
    } else if (this.color) {
      vars['--_color'] = resolveColor(this.color);
    }
    if (this.image) {
      vars['--_bg-image'] = `url(${this.image})`;
      // Default to white text on images unless color is explicit
      if (!this.color && !this.background) {
        vars['--_color'] = '#fff';
      }
    }
    this._setDynamicVars(vars);
  }

  render() {
    return '<slot></slot>';
  }
}

customElements.define('ui-carousel-slide', UICarouselSlide);
