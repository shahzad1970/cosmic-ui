import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

if (typeof globalThis.HTMLElement === 'undefined') {
  globalThis.HTMLElement = class HTMLElement {};
  globalThis.CSSStyleSheet = undefined;
  globalThis.CustomEvent = class CustomEvent extends Event {
    constructor(type, opts = {}) { super(type, opts); this.detail = opts.detail ?? null; }
  };
  globalThis.customElements = {
    _reg: new Map(),
    define(name, ctor) { this._reg.set(name, ctor); },
    get(name) { return this._reg.get(name); },
  };
}

const mod = await import('../../src/components/input/file.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIInputFile module', () => {
  it('exports the UIInputFile class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIInputFile, 'function');
  });

  it('declares all expected static properties', () => {
    const props = mod.UIInputFile.properties;
    const expected = [
      'accept', 'name', 'label', 'help', 'error',
      'size', 'background',
      'disabled', 'required', 'multiple',
    ];
    for (const key of expected) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIInputFile.properties;
    assert.equal(p.accept.default, '');
    assert.equal(p.name.default, '');
    assert.equal(p.label.default, '');
    assert.equal(p.help.default, '');
    assert.equal(p.error.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.background.default, '');
    assert.equal(p.disabled.default, false);
    assert.equal(p.required.default, false);
    assert.equal(p.multiple.default, false);
  });

  it('Boolean properties have correct type', () => {
    const p = mod.UIInputFile.properties;
    const bools = ['disabled', 'required', 'multiple'];
    for (const key of bools) {
      assert.equal(p[key].type, Boolean, `${key} should be Boolean`);
    }
  });

  it('String properties have correct type', () => {
    const p = mod.UIInputFile.properties;
    const strings = ['accept', 'name', 'label', 'help', 'error', 'size', 'background'];
    for (const key of strings) {
      assert.equal(p[key].type, String, `${key} should be String`);
    }
  });

  it('all properties reflect', () => {
    const p = mod.UIInputFile.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('has static styles() with expected CSS selectors', () => {
    const css = mod.UIInputFile.styles();
    assert.ok(css.includes('.drop-zone'), 'Should include drop-zone styles');
    assert.ok(css.includes('.file-list'), 'Should include file-list styles');
    assert.ok(css.includes('.file-item'), 'Should include file-item styles');
    assert.ok(css.includes('.file-name'), 'Should include file-name styles');
    assert.ok(css.includes('.file-size'), 'Should include file-size styles');
    assert.ok(css.includes('.file-remove'), 'Should include file-remove styles');
    assert.ok(css.includes('.hidden-input'), 'Should include hidden-input styles');
    assert.ok(css.includes(':host'), 'Should include host styles');
    assert.ok(css.includes(':host([disabled])'), 'Should include disabled styles');
    assert.ok(css.includes(':host([data-dragging])'), 'Should include dragging styles');
    assert.ok(css.includes(':host([error])'), 'Should include error styles');
    assert.ok(css.includes('.help'), 'Should include help styles');
    assert.ok(css.includes('.error-msg'), 'Should include error-msg styles');
    assert.ok(css.includes('.drop-icon'), 'Should include drop-icon styles');
    assert.ok(css.includes('.drop-text'), 'Should include drop-text styles');
  });

  it('render outputs correct HTML structure', () => {
    const inst = Object.create(mod.UIInputFile.prototype);
    inst.label = 'Upload';
    inst.help = 'Max 5MB';
    inst.error = '';
    inst.required = true;
    inst.accept = '.png,.jpg';
    inst.multiple = true;
    inst.disabled = false;
    inst.name = 'avatar';
    const html = inst.render();
    assert.ok(html.includes('Upload'), 'Should render label text');
    assert.ok(html.includes('Max 5MB'), 'Should render help text');
    assert.ok(html.includes('*'), 'Should render required asterisk');
    assert.ok(html.includes('part="label"'), 'Should expose label CSS part');
    assert.ok(html.includes('part="dropzone"'), 'Should expose dropzone CSS part');
    assert.ok(html.includes('part="filelist"'), 'Should expose filelist CSS part');
    assert.ok(html.includes('part="help"'), 'Should expose help CSS part');
    assert.ok(html.includes('part="error"'), 'Should expose error CSS part');
    assert.ok(html.includes('type="file"'), 'Should include file input');
    assert.ok(html.includes('accept=".png,.jpg"'), 'Should include accept attribute');
    assert.ok(html.includes('multiple'), 'Should include multiple attribute');
    assert.ok(html.includes('name="avatar"'), 'Should include name attribute');
    assert.ok(html.includes('Click to upload'), 'Should include upload prompt');
  });

  it('render escapes HTML in label, help, and error', () => {
    const inst = Object.create(mod.UIInputFile.prototype);
    inst.label = '<script>alert("x")</script>';
    inst.help = '<b>bold</b>';
    inst.error = '<img>';
    inst.required = false;
    inst.accept = '';
    inst.multiple = false;
    inst.disabled = false;
    inst.name = '';
    const html = inst.render();
    assert.ok(!html.includes('<script>'), 'Should escape label HTML');
    assert.ok(!html.includes('<b>'), 'Should escape help HTML');
    assert.ok(!html.includes('<img>'), 'Should escape error HTML');
  });

  it('render shows asterisk only when required is true', () => {
    const inst = Object.create(mod.UIInputFile.prototype);
    inst.label = 'File';
    inst.help = '';
    inst.error = '';
    inst.required = false;
    inst.accept = '';
    inst.multiple = false;
    inst.disabled = false;
    inst.name = '';
    const html = inst.render();
    assert.ok(!html.includes(' *'), 'Should not show asterisk when not required');
    inst.required = true;
    const html2 = inst.render();
    assert.ok(html2.includes(' *'), 'Should show asterisk when required');
  });

  it('is registered as ui-input-file', () => {
    const registered = globalThis.customElements.get('ui-input-file');
    assert.equal(registered, mod.UIInputFile);
  });

  it('has clear method', () => {
    assert.equal(typeof mod.UIInputFile.prototype.clear, 'function');
  });

  it('has _formatSize method', () => {
    const fn = mod.UIInputFile.prototype._formatSize;
    assert.equal(fn(500), '500 B');
    assert.equal(fn(1024), '1.0 KB');
    assert.equal(fn(1048576), '1.0 MB');
    assert.equal(fn(2621440), '2.5 MB');
  });

  it('has merged _applyStyles method (not separate _applySize/_applyColors)', () => {
    assert.equal(typeof mod.UIInputFile.prototype._applyStyles, 'function');
    assert.equal(mod.UIInputFile.prototype._applySize, undefined, '_applySize should not exist');
    assert.equal(mod.UIInputFile.prototype._applyColors, undefined, '_applyColors should not exist');
  });

  it('has _attachListeners method', () => {
    assert.equal(typeof mod.UIInputFile.prototype._attachListeners, 'function');
  });

  it('has _renderFileList method', () => {
    assert.equal(typeof mod.UIInputFile.prototype._renderFileList, 'function');
  });

  it('has _setFiles method', () => {
    assert.equal(typeof mod.UIInputFile.prototype._setFiles, 'function');
  });

  it('has drag/drop handler methods', () => {
    assert.equal(typeof mod.UIInputFile.prototype._onZoneClick, 'function');
    assert.equal(typeof mod.UIInputFile.prototype._onFileChange, 'function');
    assert.equal(typeof mod.UIInputFile.prototype._onDragOver, 'function');
    assert.equal(typeof mod.UIInputFile.prototype._onDragLeave, 'function');
    assert.equal(typeof mod.UIInputFile.prototype._onDrop, 'function');
  });

  it('has connectedCallback', () => {
    assert.equal(typeof mod.UIInputFile.prototype.connectedCallback, 'function');
  });

  it('has render method that returns a string', () => {
    const inst = Object.create(mod.UIInputFile.prototype);
    inst.label = '';
    inst.help = '';
    inst.error = '';
    inst.required = false;
    inst.accept = '';
    inst.multiple = false;
    inst.disabled = false;
    inst.name = '';
    const html = inst.render();
    assert.equal(typeof html, 'string');
    assert.ok(html.length > 0);
  });
});
