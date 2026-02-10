/**
 * UIComponent — Base class for all custom web components.
 *
 * Provides:
 *  - Shadow DOM with adopted stylesheets (or <style> fallback)
 *  - Declarative `static properties` for observed attributes with type coercion
 *  - Automatic attribute ↔ property reflection
 *  - Lifecycle helpers: render(), connectedCallback hooks
 *
 * Subclasses override `render()` and `styles()`.
 */
import { resolveColor, resolveColorHover } from './ui-utils.js';
export class UIComponent extends HTMLElement {
  /* ------------------------------------------------------------------ */
  /*  Static API                                                         */
  /* ------------------------------------------------------------------ */

  /**
   * Define reflected properties.
   * Each key maps to { type, default, reflect, attribute }.
   *
   *   static properties = {
   *     variant: { type: String, default: 'default', reflect: true },
   *     disabled: { type: Boolean, default: false, reflect: true },
   *   };
   */
  static properties = {};

  /** Override to provide component-scoped CSS (plain string). */
  static styles() {
    return ':host { font-family: inherit; }';
  }

  /** Observed attributes derived from `properties`. */
  static get observedAttributes() {
    return Object.entries(this.properties)
      .filter(([, v]) => v.reflect !== false)
      .map(([k, v]) => v.attribute ?? toKebab(k));
  }

  /**
   * Lazily-built lookup:  attribute-name → { propName, meta }.
   * Cached on the constructor so it's computed once per class.
   */
  static get _attrMap() {
    if (!this.hasOwnProperty('__attrMap')) {
      const map = {};
      for (const [name, meta] of Object.entries(this.properties)) {
        const attr = meta.attribute ?? toKebab(name);
        map[attr] = { propName: name, meta };
      }
      this.__attrMap = map;
    }
    return this.__attrMap;
  }

  /* ------------------------------------------------------------------ */
  /*  Instance                                                           */
  /* ------------------------------------------------------------------ */

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._initialised = false;

    // Seed property backing values from declared defaults.
    const props = /** @type {typeof UIComponent} */ (this.constructor).properties;
    for (const [name, meta] of Object.entries(props)) {
      const attr = meta.attribute ?? toKebab(name);
      // Define getter/setter on the instance for each property.
      Object.defineProperty(this, name, {
        get: () => this[`_${name}`],
        set: (v) => {
          const old = this[`_${name}`];
          this[`_${name}`] = coerce(v, meta.type);
          if (meta.reflect !== false) {
            reflectToAttribute(this, attr, this[`_${name}`], meta.type);
          }
          if (this._initialised && old !== this[`_${name}`]) {
            this._update();
          }
          // Auto-expose inheritable background vars for children.
          if (name === 'background') this._reflectBackgroundVars();
        },
        configurable: true,
      });
      // Set initial value (attribute wins over default).
      this[`_${name}`] = meta.default ?? defaultForType(meta.type);
    }
  }

  connectedCallback() {
    // Apply styles (sheet is cached on the constructor, created only once per class).
    const ctor = /** @type {typeof UIComponent} */ (this.constructor);
    const css = ctor.styles();
    if (css) {
      if (typeof CSSStyleSheet !== 'undefined' && this.shadowRoot.adoptedStyleSheets !== undefined) {
        if (!ctor.hasOwnProperty('__sheet')) {
          const sheet = new CSSStyleSheet();
          sheet.replaceSync(css);
          ctor.__sheet = sheet;
        }
        this.shadowRoot.adoptedStyleSheets = [ctor.__sheet];
      } else if (!this.shadowRoot.querySelector('style')) {
        const style = document.createElement('style');
        style.textContent = css;
        this.shadowRoot.prepend(style);
      }
    }

    // Read initial attribute values.
    const attrMap = ctor._attrMap;
    for (const [attr, { propName, meta }] of Object.entries(attrMap)) {
      if (this.hasAttribute(attr)) {
        this[`_${propName}`] = fromAttribute(this.getAttribute(attr), meta.type);
      }
    }

    // Reflect defaults that need an attribute for CSS (e.g. boolean true).
    const props = ctor.properties;
    for (const [name, meta] of Object.entries(props)) {
      if (meta.reflect === false) continue;
      const attr = meta.attribute ?? toKebab(name);
      if (!this.hasAttribute(attr) && meta.type === Boolean && this[`_${name}`]) {
        reflectToAttribute(this, attr, true, Boolean);
      }
    }

    this._initialised = true;

    // Reflect background vars if the attribute was set in HTML.
    if ('background' in props && this._background) {
      this._reflectBackgroundVars();
    }

    this._update();
  }

  disconnectedCallback() {
    this._initialised = false;
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (oldVal === newVal) return;
    const entry = /** @type {typeof UIComponent} */ (this.constructor)._attrMap[attr];
    if (entry) {
      this[`_${entry.propName}`] = fromAttribute(newVal, entry.meta.type);
    }
    if (this._initialised) {
      this._update();
    }
  }

  /** Override in subclass — return an HTML string or a DocumentFragment. */
  render() {
    return '';
  }

  /* ------------------------------------------------------------------ */
  /*  Internals                                                          */
  /* ------------------------------------------------------------------ */

  /** Reconcile shadow DOM with the latest render(). */
  _update() {
    const result = this.render();
    if (typeof result === 'string') {
      // Find existing <style> elements to preserve them.
      const styles = [...this.shadowRoot.querySelectorAll('style')];
      this.shadowRoot.innerHTML = result;
      for (const s of styles) this.shadowRoot.prepend(s);
    } else if (result instanceof DocumentFragment || result instanceof HTMLElement) {
      const styles = [...this.shadowRoot.querySelectorAll('style')];
      this.shadowRoot.replaceChildren(result);
      for (const s of styles) this.shadowRoot.prepend(s);
    }
  }

  /**
   * Set dynamic CSS custom properties on `:host` via an internal `<style>`
   * block inside the shadow DOM.  This avoids polluting the host element's
   * inline `style` attribute.
   *
   * @param {Record<string, string | undefined>} vars
   *   Map of CSS custom property names (including `--`) to values.
   *   Pass `undefined` or `''` to omit a property.
   *
   * @example
   *   this._setDynamicVars({ '--_bg': '#fff', '--_color': '#000' });
   */
  _setDynamicVars(vars) {
    if (!this.shadowRoot) return;
    let el = this.shadowRoot.getElementById('__dv');
    const pairs = Object.entries(vars)
      .filter(([, v]) => v !== undefined && v !== '')
      .map(([k, v]) => `${k}: ${v};`);

    if (pairs.length === 0) {
      if (el) el.textContent = '';
      return;
    }
    if (!el) {
      el = document.createElement('style');
      el.id = '__dv';
      this.shadowRoot.prepend(el);
    }
    el.textContent = `:host { ${pairs.join(' ')} }`;
  }

  /** Emit a custom event with sensible defaults. */
  emit(name, detail = {}) {
    const event = new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail,
    });
    this.dispatchEvent(event);
    return event;
  }

  /**
   * When `background` is set on any component, expose resolved colour values
   * as inheritable CSS custom properties on the host element so children
   * (e.g. buttons inside a banner) can use them for hover effects.
   *
   * Sets:  --ui-background, --ui-background-hover
   */
  _reflectBackgroundVars() {
    const bg = this._background;
    if (bg) {
      this.style.setProperty('--ui-background', resolveColor(bg));
      this.style.setProperty('--ui-background-token', bg.trim().toLowerCase());
      const hover = resolveColorHover(bg);
      if (hover) {
        this.style.setProperty('--ui-background-hover', hover);
      } else {
        this.style.removeProperty('--ui-background-hover');
      }
    } else {
      this.style.removeProperty('--ui-background');
      this.style.removeProperty('--ui-background-token');
      this.style.removeProperty('--ui-background-hover');
    }
  }
}

/* -------------------------------------------------------------------- */
/*  Helpers                                                              */
/* -------------------------------------------------------------------- */

/** Convert camelCase → kebab-case. */
function toKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/** Coerce a JS value to the declared type. */
function coerce(value, type) {
  if (type === Boolean) return Boolean(value);
  if (type === Number) return Number(value);
  return value == null ? '' : String(value);
}

/** Read an attribute string into the declared type. */
function fromAttribute(value, type) {
  if (type === Boolean) return value !== null && value !== 'false';
  if (type === Number) return value === null ? 0 : Number(value);
  return value ?? '';
}

/** Reflect a property value back to the host attribute. */
function reflectToAttribute(el, attr, value, type) {
  if (type === Boolean) {
    value ? el.setAttribute(attr, '') : el.removeAttribute(attr);
  } else {
    value != null && value !== '' ? el.setAttribute(attr, String(value)) : el.removeAttribute(attr);
  }
}

/** Return sensible zero-value for a type. */
function defaultForType(type) {
  if (type === Boolean) return false;
  if (type === Number) return 0;
  return '';
}
