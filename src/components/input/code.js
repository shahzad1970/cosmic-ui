import { UIComponent } from '../../core/ui-component.js';
import { resolveSize } from '../../core/ui-utils.js';

const CM_BASE = 'https://cdn.jsdelivr.net/npm/codemirror@5.65.15';
const CM_CSS_URL = `${CM_BASE}/lib/codemirror.css`;
const CM_JS_URL = `${CM_BASE}/lib/codemirror.js`;
const CM_MODE_JS = `${CM_BASE}/mode/javascript/javascript.js`;
const CM_MODE_CSS = `${CM_BASE}/mode/css/css.js`;
const CM_MODE_XML = `${CM_BASE}/mode/xml/xml.js`;
const CM_MODE_HTML = `${CM_BASE}/mode/htmlmixed/htmlmixed.js`;
const CM_ADDON_PLACEHOLDER = `${CM_BASE}/addon/display/placeholder.js`;

/**
 * `<ui-input-code>` — CodeMirror-based code editor.
 *
 * Loads CodeMirror 5 from CDN only when the component is first used.
 * The `value` property is set via JS (not reflected to attribute) — use
 * `el.value = '...'` rather than `setAttribute('value', '...')`.
 *
 * @element ui-input-code
 *
 * @attr {String}  value        - Current editor content (read via JS property)
 * @attr {String}  language     - Language id (json, javascript, html, css)
 * @attr {String}  height       - Editor height (default: 12em)
 * @attr {String}  size         - Font size (named keyword or CSS length)
 * @attr {Boolean} dark         - Dark editor theme (default: false)
 * @attr {String}  label        - Label text displayed above the editor
 * @attr {String}  placeholder  - Placeholder text when editor is empty
 * @attr {Boolean} line-numbers - Show line numbers (default: true)
 * @attr {Boolean} wrap         - Enable line wrapping (default: false)
 * @attr {Boolean} readonly     - Read-only mode
 * @attr {Boolean} disabled     - Disables the editor
 * @attr {Number}  tab-size     - Tab / indent width (default: 2)
 *
 * @fires ui-input  - On every keystroke   (detail: { value })
 * @fires ui-change - On blur/commit       (detail: { value })
 * @fires ui-focus  - On focus
 * @fires ui-blur   - On blur
 */
export class UIInputCode extends UIComponent {
  static properties = {
    value:       { type: String,  default: '',     reflect: false },
    language:    { type: String,  default: 'json', reflect: true },
    height:      { type: String,  default: '12em', reflect: true },
    size:        { type: String,  default: '',      reflect: true },
    dark:        { type: Boolean, default: true,     reflect: true },
    label:       { type: String,  default: '',      reflect: true },
    placeholder: { type: String,  default: '',     reflect: true },
    lineNumbers: { type: Boolean, default: true,   reflect: true, attribute: 'line-numbers' },
    wrap:        { type: Boolean, default: false,  reflect: true },
    readonly:    { type: Boolean, default: false,  reflect: true },
    disabled:    { type: Boolean, default: false,  reflect: true },
    tabSize:     { type: Number,  default: 2,      reflect: true, attribute: 'tab-size' },
  };

  /** Shared CodeMirror JS bootstrap promise (once per page). */
  static _cmPromise = null;
  /** Cached CodeMirror CSS text (fetched once, reused across instances). */
  static _cmCssText = null;

  static styles() {
    return /* css */ `
      :host {
        display: block;
        line-height: 1.5;
      }
      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }

      /* ── Label ─────────────────────────────────────────── */
      .label {
        display: none;
        font-size: 0.875em;
        font-weight: 600;
        color: var(--ui-text-color, #374151);
        margin-bottom: 0.3em;
      }
      :host([label]) .label { display: block; }

      .frame {
        position: relative;
        height: var(--_height, 12em);
        width: 100%;
        box-sizing: border-box;
        border: 1px solid var(--_border, var(--ui-border-color, #d1d5db));
        border-radius: var(--ui-radius, 0.375em);
        overflow: hidden;
        background: var(--_bg, var(--ui-bg, #fff));
        color: var(--_color, var(--ui-text-color, #111827));
      }
      :host([height="auto"]) .frame {
        height: auto;
      }
      :host(:focus-within) .frame {
        border-color: var(--ui-indigo-500, #6366f1);
        box-shadow: var(--ui-focus-ring, 0 0 0 3px rgba(99,102,241,.25));
      }

      /* ── Dark theme ────────────────────────────────────── */
      :host([dark]) .frame {
        --_bg: #1e1e2e;
        --_color: #cdd6f4;
        --_border: #45475a;
      }
      :host([dark]) .label {
        color: #cdd6f4;
      }
      :host([dark]) .loading {
        background: #1e1e2e;
        color: #6c7086;
      }
      :host([dark]) .error {
        background: #1e1e2e;
      }
      :host([dark]) .CodeMirror-gutters {
        border-right-color: #45475a;
      }
      :host([dark]) .CodeMirror pre.CodeMirror-placeholder {
        color: #6c7086;
      }
      /* Syntax tokens — dark */
      :host([dark]) .cm-s-default .cm-keyword   { color: #cba6f7; }
      :host([dark]) .cm-s-default .cm-atom      { color: #fab387; }
      :host([dark]) .cm-s-default .cm-number    { color: #fab387; }
      :host([dark]) .cm-s-default .cm-def       { color: #89b4fa; }
      :host([dark]) .cm-s-default .cm-variable  { color: #cdd6f4; }
      :host([dark]) .cm-s-default .cm-variable-2 { color: #89dceb; }
      :host([dark]) .cm-s-default .cm-variable-3 { color: #a6e3a1; }
      :host([dark]) .cm-s-default .cm-type      { color: #a6e3a1; }
      :host([dark]) .cm-s-default .cm-property  { color: #89b4fa; }
      :host([dark]) .cm-s-default .cm-operator  { color: #89dceb; }
      :host([dark]) .cm-s-default .cm-string    { color: #a6e3a1; }
      :host([dark]) .cm-s-default .cm-string-2  { color: #f9e2af; }
      :host([dark]) .cm-s-default .cm-comment   { color: #6c7086; font-style: italic; }
      :host([dark]) .cm-s-default .cm-tag       { color: #f38ba8; }
      :host([dark]) .cm-s-default .cm-attribute { color: #f9e2af; }
      :host([dark]) .cm-s-default .cm-bracket   { color: #9399b2; }
      :host([dark]) .cm-s-default .cm-meta      { color: #f9e2af; }
      :host([dark]) .cm-s-default .cm-qualifier { color: #89dceb; }
      :host([dark]) .cm-s-default .cm-builtin   { color: #f38ba8; }
      :host([dark]) .cm-s-default .cm-link      { color: #89b4fa; text-decoration: underline; }
      :host([dark]) .CodeMirror-cursor {
        border-left-color: #cdd6f4;
      }
      :host([dark]) .CodeMirror-selected,
      :host([dark]) .CodeMirror-focused .CodeMirror-selected {
        background: rgba(137,180,250,0.2);
      }
      :host([dark]) .CodeMirror-activeline-background {
        background: rgba(205,214,244,0.06);
      }
      :host([dark]) .CodeMirror-linenumber {
        color: #585b70;
      }
      :host([dark]) .CodeMirror-matchingbracket {
        color: #a6e3a1 !important;
        outline: 1px solid rgba(166,227,161,0.3);
      }

      .textarea {
        width: 100%;
        height: 100%;
        border: 0;
        margin: 0;
        padding: 0.75em;
        font-family: var(--ui-font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
        font-size: 0.9em;
        line-height: 1.5;
        color: inherit;
        background: transparent;
        resize: none;
        box-sizing: border-box;
        outline: none;
        white-space: pre;
        overflow: auto;
      }

      /* CodeMirror overrides (supplement the injected codemirror.css) */
      .CodeMirror {
        height: 100%;
        font-family: var(--ui-font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
        font-size: inherit;
        color: inherit;
        background: transparent;
        border-radius: inherit;
      }
      :host([height="auto"]) .CodeMirror {
        height: auto;
      }
      .CodeMirror-gutters {
        background: inherit;
        border-right-color: var(--ui-border-color, #d1d5db);
      }
      .CodeMirror pre.CodeMirror-placeholder {
        color: var(--ui-text-muted, #9ca3af);
      }

      .loading,
      .error {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: inherit;
        font-size: 0.85em;
        color: var(--ui-text-muted, #6b7280);
        background: var(--ui-bg, #fff);
        pointer-events: none;
      }
      .error { color: var(--ui-red-500, #ef4444); }
      .hidden { display: none; }
    `;
  }

  constructor() {
    super();
    this._editor = null;
    this._initSeq = 0; // race-condition guard for async bootstrap
    this._textContentValue = null; // captured from light DOM before render
  }

  connectedCallback() {
    // Capture textContent before shadow DOM replaces it.
    // This lets consumers write: <ui-input-code>code here</ui-input-code>
    if (!this._value && this.textContent.trim()) {
      this._textContentValue = this.textContent;
      // strip leading/trailing blank lines but preserve internal whitespace
      const lines = this._textContentValue.split('\n');
      // remove empty first/last lines (common when indented in HTML)
      while (lines.length && !lines[0].trim()) lines.shift();
      while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
      // detect common leading whitespace and unindent
      const minIndent = lines.reduce((min, l) => {
        if (!l.trim()) return min;
        const m = l.match(/^(\s*)/);
        return Math.min(min, m ? m[1].length : 0);
      }, Infinity);
      if (minIndent > 0 && minIndent < Infinity) {
        this._textContentValue = lines.map(l => l.slice(minIndent)).join('\n');
      } else {
        this._textContentValue = lines.join('\n');
      }
      this._value = this._textContentValue;
      this.textContent = ''; // clear light-DOM text
    }
    super.connectedCallback(); // triggers _update() → _bootstrap()
  }

  disconnectedCallback() {
    this._initSeq++;          // invalidate any in-flight bootstrap
    this._destroyEditor();
    super.disconnectedCallback();
  }

  /* -------------------------------------------------------------- */
  /*  Reactive updates                                               */
  /* -------------------------------------------------------------- */

  /**
   * When the CodeMirror editor is alive, push property changes into it
   * incrementally — no full re-render needed.  Otherwise fall through to
   * the standard render → bootstrap path.
   */
  _update() {
    if (this._editor) {
      this._sync();
      return;
    }
    // No editor yet — full render + init
    super._update();
    this._applyDynamicVars();
    this._bootstrap();
  }

  /** Push current property values into the live CodeMirror instance. */
  _sync() {
    const ed = this._editor;

    // value
    if (ed.getValue() !== (this._value || '')) {
      ed.setValue(this._value || '');
    }
    // language / mode
    ed.setOption('mode', this._resolveMode());
    // line numbers
    ed.setOption('lineNumbers', Boolean(this._lineNumbers));
    // line wrapping
    ed.setOption('lineWrapping', Boolean(this._wrap));
    // read-only
    ed.setOption('readOnly', Boolean(this._readonly));
    // tab size
    const ts = this._tabSize || 2;
    ed.setOption('tabSize', ts);
    ed.setOption('indentUnit', ts);
    // placeholder
    ed.setOption('placeholder', this._placeholder || '');
    // visual styling
    this._applyDynamicVars();
    const isAutoHeight = this._height === 'auto';
    if (!isAutoHeight) {
      ed.setSize('100%', this._height || '12em');
    }
    ed.refresh();
  }

  /** Build all dynamic CSS vars from current property values. */
  _applyDynamicVars() {
    const vars = {};
    if (this._height) vars['--_height'] = this._height;
    const sz = resolveSize(this._size);
    if (sz) vars['font-size'] = sz;
    this._setDynamicVars(vars);
  }

  /* -------------------------------------------------------------- */
  /*  Editor lifecycle                                               */
  /* -------------------------------------------------------------- */

  async _bootstrap() {
    const seq = ++this._initSeq;
    const textarea = this.shadowRoot?.querySelector('.textarea');
    if (!textarea) return;

    this._setStatus('loading');

    try {
      // Load CodeMirror JS + CSS in parallel
      const [CM] = await Promise.all([
        UIInputCode._loadCodeMirror(),
        this._injectCmCss(),
      ]);
      if (seq !== this._initSeq) return; // stale — another init superseded us

      const ts = this._tabSize || 2;

      // Create the editor
      this._editor = CM.fromTextArea(textarea, {
        lineNumbers: Boolean(this._lineNumbers),
        mode: this._resolveMode(),
        tabSize: ts,
        indentUnit: ts,
        indentWithTabs: false,
        lineWrapping: Boolean(this._wrap),
        readOnly: Boolean(this._readonly),
        placeholder: this._placeholder || '',
        viewportMargin: Infinity,
      });

      this._editor.setValue(this._value || '');
      const isAutoHeight = this._height === 'auto';
      if (!isAutoHeight) {
        this._editor.setSize('100%', this._height || '12em');
      }

      // Events — write directly to _value to avoid triggering _update()
      this._editor.on('change', () => {
        const val = this._editor.getValue();
        if (val === this._value) return; // echo guard (programmatic setValue)
        this._value = val;
        this.emit('ui-input', { value: val });
      });
      this._editor.on('blur', () => {
        this._value = this._editor.getValue();
        this.emit('ui-change', { value: this._value });
        this.emit('ui-blur');
      });
      this._editor.on('focus', () => this.emit('ui-focus'));

      this._setStatus('ready');
    } catch (err) {
      if (seq !== this._initSeq) return;
      this._setStatus('error');
      console.warn('[ui-input-code] CodeMirror failed to load', err);
    }
  }

  _destroyEditor() {
    if (this._editor) {
      this._editor.toTextArea();
      this._editor = null;
    }
  }

  /* -------------------------------------------------------------- */
  /*  CodeMirror CSS → shadow DOM                                    */
  /* -------------------------------------------------------------- */

  /**
   * Fetch the CodeMirror CSS once (cached globally) and inject it as a
   * `<style>` inside this shadow root.  This is required because the
   * CodeMirror DOM lives inside the shadow DOM and cannot see styles
   * in `document.head`.
   */
  async _injectCmCss() {
    if (this.shadowRoot.getElementById('__cm-css')) return;

    if (!UIInputCode._cmCssText) {
      const res = await fetch(CM_CSS_URL);
      if (!res.ok) throw new Error(`CodeMirror CSS fetch failed: ${res.status}`);
      UIInputCode._cmCssText = await res.text();
    }

    const style = document.createElement('style');
    style.id = '__cm-css';
    style.textContent = UIInputCode._cmCssText;
    this.shadowRoot.prepend(style);
  }

  /* -------------------------------------------------------------- */
  /*  Status overlay                                                 */
  /* -------------------------------------------------------------- */

  _setStatus(state) {
    const loading = this.shadowRoot?.querySelector('.loading');
    const error = this.shadowRoot?.querySelector('.error');
    if (!loading || !error) return;
    loading.classList.toggle('hidden', state !== 'loading');
    error.classList.toggle('hidden', state !== 'error');
  }

  /* -------------------------------------------------------------- */
  /*  Language → CodeMirror mode                                     */
  /* -------------------------------------------------------------- */

  _resolveMode() {
    const lang = (this._language || 'json').trim().toLowerCase();
    if (lang === 'json') return { name: 'javascript', json: true };
    if (lang === 'js' || lang === 'javascript') return 'javascript';
    if (lang === 'css') return 'css';
    if (lang === 'html' || lang === 'htmlmixed') return 'htmlmixed';
    if (lang === 'xml') return 'xml';
    return lang;
  }

  /* -------------------------------------------------------------- */
  /*  Static loader — loads CodeMirror JS once per page              */
  /* -------------------------------------------------------------- */

  static _loadCodeMirror() {
    if (window.CodeMirror) return Promise.resolve(window.CodeMirror);
    if (UIInputCode._cmPromise) return UIInputCode._cmPromise;

    UIInputCode._cmPromise = (async () => {
      const loadScript = (src) => new Promise((res, rej) => {
        const existing = document.querySelector(`script[data-ui-cm="${src}"]`);
        if (existing) {
          if (existing.dataset.loaded === 'true') return res();
          existing.addEventListener('load', res);
          existing.addEventListener('error', rej);
          return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.dataset.uiCm = src;
        s.addEventListener('load', () => { s.dataset.loaded = 'true'; res(); });
        s.addEventListener('error', rej);
        document.head.appendChild(s);
      });

      try {
        // Core first
        await loadScript(CM_JS_URL);
        // Independent modes in parallel
        await Promise.all([
          loadScript(CM_MODE_JS),
          loadScript(CM_MODE_CSS),
          loadScript(CM_MODE_XML),
          loadScript(CM_ADDON_PLACEHOLDER),
        ]);
        // htmlmixed depends on javascript, css, xml — load last
        await loadScript(CM_MODE_HTML);

        return window.CodeMirror;
      } catch (err) {
        UIInputCode._cmPromise = null; // allow retry on next use
        throw err;
      }
    })();

    return UIInputCode._cmPromise;
  }

  /* -------------------------------------------------------------- */
  /*  Render                                                         */
  /* -------------------------------------------------------------- */

  render() {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const labelHtml = this._label
      ? `<div class="label" part="label">${esc(this._label)}</div>`
      : '<div class="label" part="label"></div>';
    const ph = this._placeholder ? ` placeholder="${esc(this._placeholder)}"` : '';
    const ro = this._readonly ? ' readonly' : '';
    return `
      ${labelHtml}
      <div class="frame" part="frame">
        <textarea class="textarea" part="textarea"${ph}${ro}>${esc(this._value || '')}</textarea>
        <div class="loading" part="loading">Loading editor…</div>
        <div class="error hidden" part="error">Editor failed to load.</div>
      </div>
    `;
  }
}

customElements.define('ui-input-code', UIInputCode);
