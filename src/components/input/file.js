import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-input-file>` — File upload with drag-and-drop zone.
 *
 * @element ui-input-file
 *
 * @attr {String}  accept    - Accepted file types (e.g. ".png,.jpg,image/*")
 * @attr {String}  name      - Form field name
 * @attr {String}  label     - Label text
 * @attr {String}  help      - Help text
 * @attr {String}  error     - Error message
 * @attr {String}  size      - Size keyword or CSS length
 * @attr {String}  background - Background colour of the drop zone
 * @attr {Boolean} disabled  - Disables the input
 * @attr {Boolean} required  - Marks as required
 * @attr {Boolean} multiple  - Allow multiple files
 *
 * @fires ui-change - When files are selected/dropped (detail: { files })
 */
export class UIInputFile extends UIComponent {

  static properties = {
    accept:     { type: String,  default: '',    reflect: true },
    name:       { type: String,  default: '',    reflect: true },
    label:      { type: String,  default: '',    reflect: true },
    help:       { type: String,  default: '',    reflect: true },
    error:      { type: String,  default: '',    reflect: true },
    size:       { type: String,  default: '',    reflect: true },
    background: { type: String,  default: '',    reflect: true },
    disabled:   { type: Boolean, default: false, reflect: true },
    required:   { type: Boolean, default: false, reflect: true },
    multiple:   { type: Boolean, default: false, reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        line-height: 1.5;
      }
      :host([disabled]) { opacity: 0.5; pointer-events: none; }

      .label {
        display: none;
        font-size: 0.875em;
        font-weight: 600;
        color: var(--ui-text-color, #374151);
        margin-bottom: 0.3em;
      }
      :host([label]) .label { display: block; }
      .req { color: var(--ui-red-500, #ef4444); margin-left: 0.15em; }

      .drop-zone {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
        padding: 1.5em;
        border: 2px dashed var(--_border, var(--ui-border-color, #d1d5db));
        border-radius: var(--ui-radius, 0.375em);
        background: var(--_bg, var(--ui-bg-subtle, #f9fafb));
        cursor: pointer;
        transition: border-color 0.15s ease, background-color 0.15s ease;
        text-align: center;
      }
      .drop-zone:hover {
        border-color: var(--_accent, var(--ui-indigo-500, #6366f1));
        background: rgba(99, 102, 241, 0.04);
      }
      :host([data-dragging]) .drop-zone {
        border-color: var(--_accent, var(--ui-indigo-500, #6366f1));
        background: rgba(99, 102, 241, 0.08);
      }
      :host([error]) .drop-zone { border-color: var(--ui-red-500, #ef4444); }

      .drop-icon {
        width: 2em;
        height: 2em;
        fill: none;
        stroke: var(--ui-text-muted, #9ca3af);
        stroke-width: 1.5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .drop-text { color: var(--ui-text-muted, #6b7280); font-size: 0.9em; }
      .drop-text strong { color: var(--_accent, var(--ui-indigo-500, #6366f1)); cursor: pointer; }

      .hidden-input {
        position: absolute;
        width: 1px; height: 1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;
        padding: 0;
        margin: -1px;
      }

      .file-list {
        margin-top: 0.5em;
        display: flex;
        flex-direction: column;
        gap: 0.3em;
      }
      .file-item {
        display: flex;
        align-items: center;
        gap: 0.5em;
        padding: 0.3em 0.5em;
        border-radius: var(--ui-radius, 0.25em);
        background: var(--ui-bg-subtle, #f3f4f6);
        font-size: 0.85em;
      }
      .file-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .file-size { color: var(--ui-text-muted, #9ca3af); font-size: 0.9em; flex-shrink: 0; }
      .file-remove {
        cursor: pointer; background: none; border: none;
        font-size: 1.1em; opacity: 0.5; padding: 0;
        font-family: inherit; line-height: 1;
      }
      .file-remove:hover { opacity: 1; }

      .file-icon {
        width: 1em; height: 1em;
        fill: none; stroke: var(--ui-text-muted, #9ca3af);
        stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round;
        flex-shrink: 0;
      }

      .help, .error-msg { display: none; font-size: 0.8em; margin-top: 0.3em; }
      .help { color: var(--ui-text-muted, #6b7280); }
      .error-msg { color: var(--ui-red-500, #ef4444); }
      :host([help]) .help       { display: block; }
      :host([error]) .error-msg { display: block; }
      :host([error]) .help      { display: none; }
    `;
  }

  constructor() {
    super();
    /** @type {File[]} */
    this._files = [];
    this._onZoneClick    = this._onZoneClick.bind(this);
    this._onFileChange   = this._onFileChange.bind(this);
    this._onDragOver     = this._onDragOver.bind(this);
    this._onDragLeave    = this._onDragLeave.bind(this);
    this._onDrop         = this._onDrop.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._attachListeners();
  }

  render() {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    return `
      <div class="label" part="label">
        ${esc(this.label)}<span class="req">${this.required ? ' *' : ''}</span>
      </div>
      <div class="drop-zone" part="dropzone">
        <svg class="drop-icon" viewBox="0 0 24 24">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        <div class="drop-text"><strong>Click to upload</strong> or drag and drop</div>
        ${this.accept ? `<div class="drop-text" style="font-size:0.8em">${esc(this.accept)}</div>` : ''}
        <input class="hidden-input" type="file"
               ${this.accept ? `accept="${esc(this.accept)}"` : ''}
               ${this.multiple ? 'multiple' : ''}
               ${this.name ? `name="${esc(this.name)}"` : ''} />
      </div>
      <div class="file-list" part="filelist"></div>
      <div class="help" part="help">${esc(this.help)}</div>
      <div class="error-msg" part="error">${esc(this.error)}</div>
    `;
  }

  _attachListeners() {
    const zone  = this.shadowRoot.querySelector('.drop-zone');
    const input = this.shadowRoot.querySelector('.hidden-input');
    if (zone) {
      zone.addEventListener('click',     this._onZoneClick);
      zone.addEventListener('dragover',  this._onDragOver);
      zone.addEventListener('dragleave', this._onDragLeave);
      zone.addEventListener('drop',      this._onDrop);
    }
    if (input) {
      input.addEventListener('change', this._onFileChange);
    }
  }

  _update() {
    this._applyStyles();
    super._update();
    this._attachListeners();
    this._renderFileList();
  }

  _applyStyles() {
    const vars = {};
    const sz = resolveSize(this.size);
    if (sz) vars['font-size'] = sz;
    if (this.background) {
      const bg = resolveColor(this.background);
      if (bg) vars['--_bg'] = bg;
    }
    this._setDynamicVars(vars);
  }

  _onZoneClick() {
    this.shadowRoot.querySelector('.hidden-input')?.click();
  }

  _onFileChange(e) {
    const files = [...e.target.files];
    this._setFiles(files);
  }

  _onDragOver(e) {
    e.preventDefault();
    this.setAttribute('data-dragging', '');
  }

  _onDragLeave() {
    this.removeAttribute('data-dragging');
  }

  _onDrop(e) {
    e.preventDefault();
    this.removeAttribute('data-dragging');
    const files = [...e.dataTransfer.files];
    this._setFiles(files);
  }

  _setFiles(files) {
    if (this.multiple) {
      this._files = [...this._files, ...files];
    } else {
      this._files = files.slice(0, 1);
    }
    this._renderFileList();
    this.emit('ui-change', { files: this._files });
  }

  _renderFileList() {
    const list = this.shadowRoot.querySelector('.file-list');
    if (!list) return;
    if (!this._files.length) { list.innerHTML = ''; return; }
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    list.innerHTML = this._files.map((f, i) => `
      <div class="file-item" data-index="${i}">
        <svg class="file-icon" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <span class="file-name">${esc(f.name)}</span>
        <span class="file-size">${this._formatSize(f.size)}</span>
        <button class="file-remove" data-index="${i}" aria-label="Remove">×</button>
      </div>
    `).join('');

    list.querySelectorAll('.file-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-index'));
        this._files.splice(idx, 1);
        this._renderFileList();
        this.emit('ui-change', { files: this._files });
      });
    });
  }

  _formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  /** Get current file list */
  get files() { return this._files; }

  /** Clear all files */
  clear() {
    this._files = [];
    this._renderFileList();
    const input = this.shadowRoot.querySelector('.hidden-input');
    if (input) input.value = '';
  }
}

customElements.define('ui-input-file', UIInputFile);
