import { UIComponent } from '../../core/ui-component.js';

/**
 * `<ui-form>` — Form wrapper that collects values from child `ui-input-*` components.
 *
 * Features:
 * - Collects values from all named `ui-input-*` children
 * - Built-in validation (checks `required`, displays errors)
 * - Serialises to plain object or FormData
 * - One-line JSON submission via `action` attribute or `submitJson()` method
 * - Loading state during async submission
 * - Fires `ui-submit`, `ui-response`, `ui-error`, `ui-invalid`, `ui-reset`
 *
 * @element ui-form
 *
 * @attr {String}  name       - Form name
 * @attr {String}  action     - URL to send JSON data to on submit
 * @attr {String}  method     - HTTP method (default POST)
 * @attr {Boolean} disabled   - Disables all child inputs
 * @attr {Boolean} loading    - Set automatically during async submission
 * @attr {Boolean} novalidate - Skip validation on submit
 *
 * @fires ui-submit   - When form is submitted and valid (detail: { values, formData })
 * @fires ui-response - When server responds successfully (detail: { ok, status, data, values })
 * @fires ui-error    - When server responds with error or fetch fails (detail: { ok, status, data, values } | { ok, error, message })
 * @fires ui-invalid  - When validation fails (detail: { errors })
 * @fires ui-reset    - When the form is reset
 */
export class UIForm extends UIComponent {

  static properties = {
    name:       { type: String,  default: '',     reflect: true },
    action:     { type: String,  default: '',     reflect: true },
    method:     { type: String,  default: 'POST', reflect: true },
    disabled:   { type: Boolean, default: false,  reflect: true },
    loading:    { type: Boolean, default: false,  reflect: true },
    novalidate: { type: Boolean, default: false,  reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
      }
      :host([disabled]) { opacity: 0.6; pointer-events: none; }
      :host([loading])  { opacity: 0.6; pointer-events: none; }
    `;
  }

  constructor() {
    super();
    this._onSubmitEvent = this._onSubmitEvent.bind(this);
  }

  render() {
    return `<slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    // Listen for submit triggered by ui-button type="submit" or programmatic
    this.addEventListener('click', this._onSubmitEvent);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._onSubmitEvent);
  }

  _onSubmitEvent(e) {
    // Only trigger on submit-type buttons
    const btn = e.target.closest('ui-button[type="submit"]');
    if (!btn) return;
    e.preventDefault();
    this.submit();
  }

  /**
   * Returns all named ui-input-* children inside this form.
   */
  _getInputs() {
    return Array.from(this.querySelectorAll('[name]')).filter(el =>
      el.tagName && el.tagName.startsWith('UI-INPUT')
    );
  }

  /**
   * Collects all named input values as a plain object.
   * @returns {Object} key–value map
   */
  getValues() {
    const values = {};
    for (const input of this._getInputs()) {
      const name = input.getAttribute('name');
      if (!name) continue;
      if (input.tagName === 'UI-INPUT-CHECKBOX' || input.tagName === 'UI-INPUT-SWITCH') {
        values[name] = input.checked ?? input.hasAttribute('checked');
      } else {
        values[name] = input.value ?? input.getAttribute('value') ?? '';
      }
    }
    return values;
  }

  /**
   * Returns a FormData instance populated with input values.
   * @returns {FormData}
   */
  getFormData() {
    const fd = new FormData();
    const values = this.getValues();
    for (const [k, v] of Object.entries(values)) {
      fd.append(k, String(v));
    }
    return fd;
  }

  /**
   * Validate all required inputs. Returns array of error objects.
   * @returns {Array<{name: string, element: Element, message: string}>}
   */
  validate() {
    const errors = [];
    for (const input of this._getInputs()) {
      const name = input.getAttribute('name');
      if (!input.hasAttribute('required')) continue;

      let empty = false;
      if (input.tagName === 'UI-INPUT-CHECKBOX' || input.tagName === 'UI-INPUT-SWITCH') {
        empty = !(input.checked ?? input.hasAttribute('checked'));
      } else {
        const val = input.value ?? input.getAttribute('value') ?? '';
        empty = val === '' || val === null || val === undefined;
      }

      if (empty) {
        const label = input.getAttribute('label') || name;
        const msg = `${label} is required`;
        errors.push({ name, element: input, message: msg });
        // Set error on the input
        input.setAttribute('error', msg);
      } else {
        // Clear error if previously set
        if (input.hasAttribute('error')) {
          const errVal = input.getAttribute('error');
          // Only clear auto-generated errors
          if (errVal.endsWith('is required')) input.removeAttribute('error');
        }
      }
    }
    return errors;
  }

  /**
   * Submit the form. Validates first unless `novalidate` is set.
   * If `action` is set, automatically sends JSON to the server.
   * @returns {boolean} true if submitted successfully (validation passed)
   */
  submit() {
    if (!this.novalidate) {
      const errors = this.validate();
      if (errors.length > 0) {
        this.emit('ui-invalid', { errors });
        // Focus first errored input
        errors[0]?.element?.focus?.();
        return false;
      }
    }

    const values = this.getValues();
    this.emit('ui-submit', { values, formData: this.getFormData() });

    // Auto-send JSON when action URL is set
    if (this.action) this._sendJson(this.action, this.method);

    return true;
  }

  /**
   * Validate and send form values as JSON to a URL.
   * @param {string} [url] - Target URL (falls back to `action` attribute)
   * @param {Object} [options] - Fetch options override (method, headers, etc.)
   * @returns {Promise<{ok: boolean, status?: number, data?: any, values?: Object, error?: Error}>}
   */
  async submitJson(url, options = {}) {
    if (!this.novalidate) {
      const errors = this.validate();
      if (errors.length > 0) {
        this.emit('ui-invalid', { errors });
        errors[0]?.element?.focus?.();
        return { ok: false, errors };
      }
    }

    return this._sendJson(
      url || this.action,
      options.method || this.method,
      options
    );
  }

  /**
   * Internal: sends collected values as JSON via fetch.
   * Sets `loading` during the request and emits `ui-response` or `ui-error`.
   * @param {string} url - Target URL
   * @param {string} [method] - HTTP method (default POST)
   * @param {Object} [options] - Extra fetch options (headers, etc.)
   * @returns {Promise<{ok: boolean, status?: number, data?: any, values: Object}>}
   */
  async _sendJson(url, method = 'POST', options = {}) {
    if (!url) {
      const err = new Error('No URL provided. Set the action attribute or pass a URL.');
      this.emit('ui-error', { ok: false, error: err, message: err.message });
      return { ok: false, error: err };
    }

    const values = this.getValues();
    this.loading = true;

    try {
      const resp = await fetch(url, {
        method: (method || 'POST').toUpperCase(),
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
        body: JSON.stringify(values),
      });

      let data = null;
      const ct = resp.headers.get('content-type') || '';
      if (ct.includes('json')) {
        data = await resp.json();
      } else {
        data = await resp.text();
      }

      const result = { ok: resp.ok, status: resp.status, data, values };

      if (resp.ok) {
        this.emit('ui-response', result);
      } else {
        this.emit('ui-error', result);
      }

      return result;
    } catch (err) {
      const result = { ok: false, error: err, message: err.message, values };
      this.emit('ui-error', result);
      return result;
    } finally {
      this.loading = false;
    }
  }

  /**
   * Reset all inputs to their default values and clear errors.
   */
  reset() {
    for (const input of this._getInputs()) {
      // Clear error
      if (input.hasAttribute('error')) {
        const errVal = input.getAttribute('error');
        if (errVal.endsWith('is required')) input.removeAttribute('error');
      }
      // Reset value
      if (input.tagName === 'UI-INPUT-CHECKBOX' || input.tagName === 'UI-INPUT-SWITCH') {
        input.checked = false;
        input.removeAttribute('checked');
      } else if (input.tagName === 'UI-INPUT-RATING') {
        input.value = 0;
      } else if (input.tagName === 'UI-INPUT-NUMBER') {
        const resetMin = Number(input.getAttribute('min'));
        input.value = isFinite(resetMin) ? resetMin : 0;
      } else {
        input.value = '';
        input.setAttribute('value', '');
      }
    }
    this.emit('ui-reset');
  }
}

customElements.define('ui-form', UIForm);
