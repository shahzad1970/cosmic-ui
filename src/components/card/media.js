import { UIComponent } from '../../core/ui-component.js';

/**
 * `<ui-card-media>` — Media area inside a `<ui-card>`.
 *
 * Full-width, zero-padding container for images, video, or other media.
 * Images inside are automatically stretched to fill the width.
 *
 * @element ui-card-media
 * @attr {String} height - Constrain media height (any CSS length)
 * @slot (default) - Typically an `<img>`, `<video>`, or `<picture>`
 */
export class UICardMedia extends UIComponent {
  static properties = {
    height: { type: String, default: '', reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        overflow: hidden;
        line-height: 0;
        box-sizing: border-box;
      }

      ::slotted(img),
      ::slotted(video),
      ::slotted(picture) {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyHeight();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (this._initialised) this._applyHeight();
  }

  _applyHeight() {
    const vars = {};
    if (this.height) vars['height'] = this.height;
    this._setDynamicVars(vars);
  }

  render() {
    return '<slot></slot>';
  }
}

customElements.define('ui-card-media', UICardMedia);
