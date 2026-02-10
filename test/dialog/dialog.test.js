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

const mod = await import('../../src/components/dialog/dialog.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIDialog module', () => {
  it('exports the UIDialog class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIDialog, 'function');
  });

  it('declares expected static properties', () => {
    const props = mod.UIDialog.properties;
    for (const key of ['open', 'modal', 'width', 'maxHeight', 'size',
                        'padding', 'background', 'elevation', 'persistent', 'noHeader', 'label']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIDialog.properties;
    assert.equal(p.open.default, false);
    assert.equal(p.modal.default, true);
    assert.equal(p.width.default, '');
    assert.equal(p.background.default, '');
    assert.equal(p.elevation.default, '');
    assert.equal(p.persistent.default, false);
    assert.equal(p.noHeader.default, false);
    assert.equal(p.label.default, '');
  });

  it('properties have correct types', () => {
    const p = mod.UIDialog.properties;
    assert.equal(p.open.type, Boolean);
    assert.equal(p.modal.type, Boolean);
    assert.equal(p.width.type, String);
    assert.equal(p.size.type, String);
    assert.equal(p.label.type, String);
    assert.equal(p.persistent.type, Boolean);
    assert.equal(p.noHeader.type, Boolean);
  });

  it('has kebab-case attribute mappings', () => {
    const p = mod.UIDialog.properties;
    assert.equal(p.maxHeight.attribute, 'max-height');
    assert.equal(p.noHeader.attribute, 'no-header');
  });

  it('all properties reflect', () => {
    const p = mod.UIDialog.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });

  it('has static styles()', () => {
    const css = mod.UIDialog.styles();
    assert.ok(css.includes('.backdrop'), 'Should include backdrop');
    assert.ok(css.includes('.panel'), 'Should include panel');
    assert.ok(css.includes('.header'), 'Should include header');
    assert.ok(css.includes('.body'), 'Should include body');
    assert.ok(css.includes('.close-btn'), 'Should include close button');
    assert.ok(css.includes('z-index'), 'Should include z-index');
  });

  it('render() returns backdrop and panel', () => {
    const instance = Object.create(mod.UIDialog.prototype);
    instance.open = false;
    instance.modal = true;
    instance.noHeader = false;
    instance.label = 'Test';
    const html = instance.render();
    assert.ok(html.includes('backdrop'), 'Should have backdrop');
    assert.ok(html.includes('panel'), 'Should have panel');
    assert.ok(html.includes('role="dialog"'), 'Should have dialog role');
    assert.ok(html.includes('<slot></slot>'), 'Should have slot');
    assert.ok(html.includes('header'), 'Should have header');
    assert.ok(html.includes('close-btn'), 'Should have close button');
  });

  it('render() omits header when noHeader is set', () => {
    const instance = Object.create(mod.UIDialog.prototype);
    instance.open = false;
    instance.modal = true;
    instance.noHeader = true;
    instance.label = '';
    const html = instance.render();
    assert.ok(!html.includes('header-title'), 'Should not have header');
  });

  it('has named size presets', () => {
    const map = mod.UIDialog._sizeMap;
    assert.equal(map.small, '360px');
    assert.equal(map.medium, '500px');
    assert.equal(map.large, '700px');
    assert.equal(map['x-large'], '900px');
  });

  it('has show/hide/showModal methods', () => {
    assert.equal(typeof mod.UIDialog.prototype.show, 'function');
    assert.equal(typeof mod.UIDialog.prototype.hide, 'function');
    assert.equal(typeof mod.UIDialog.prototype.showModal, 'function');
  });

  it('has event handler methods', () => {
    assert.equal(typeof mod.UIDialog.prototype._onBackdropClick, 'function');
    assert.equal(typeof mod.UIDialog.prototype._onCloseClick, 'function');
    assert.equal(typeof mod.UIDialog.prototype._onKeyDown, 'function');
    assert.equal(typeof mod.UIDialog.prototype._requestClose, 'function');
  });

  it('is registered as ui-dialog custom element', () => {
    assert.equal(globalThis.customElements.get('ui-dialog'), mod.UIDialog);
  });

  it('has _update method', () => {
    assert.equal(typeof mod.UIDialog.prototype._update, 'function');
  });

  it('has _attachListeners method', () => {
    assert.equal(typeof mod.UIDialog.prototype._attachListeners, 'function');
  });

  it('has _applyStyles method', () => {
    assert.equal(typeof mod.UIDialog.prototype._applyStyles, 'function');
  });

  it('has _esc method', () => {
    assert.equal(typeof mod.UIDialog.prototype._esc, 'function');
  });

  it('_esc escapes HTML entities and quotes', () => {
    const esc = mod.UIDialog.prototype._esc;
    assert.equal(esc('<b>'), '&lt;b>');
    assert.equal(esc('a&b'), 'a&amp;b');
    assert.equal(esc('say "hi"'), 'say &quot;hi&quot;');
    assert.equal(esc(null), '');
    assert.equal(esc(undefined), '');
    assert.equal(esc(123), '123');
  });

  it('has _onOpen and _onClose methods', () => {
    assert.equal(typeof mod.UIDialog.prototype._onOpen, 'function');
    assert.equal(typeof mod.UIDialog.prototype._onClose, 'function');
  });

  it('has _requestClose method', () => {
    assert.equal(typeof mod.UIDialog.prototype._requestClose, 'function');
  });

  it('render includes aria-modal attribute', () => {
    const instance = Object.create(mod.UIDialog.prototype);
    instance.open = false;
    instance.modal = true;
    instance.noHeader = false;
    instance.label = 'Test';
    const html = instance.render();
    assert.ok(html.includes('aria-modal="true"'), 'Should set aria-modal for modal dialog');
  });

  it('render includes tabindex=-1 on panel', () => {
    const instance = Object.create(mod.UIDialog.prototype);
    instance.open = false;
    instance.modal = true;
    instance.noHeader = false;
    instance.label = '';
    const html = instance.render();
    assert.ok(html.includes('tabindex="-1"'), 'Panel should have tabindex=-1 for focus');
  });

  it('styles include z-index layering for backdrop and panel', () => {
    const css = mod.UIDialog.styles();
    assert.ok(css.includes('9998'), 'Backdrop z-index should be 9998');
    assert.ok(css.includes('9999'), 'Panel z-index should be 9999');
  });

  it('render adds visible class when open is true', () => {
    const instance = Object.create(mod.UIDialog.prototype);
    instance.open = true;
    instance.modal = true;
    instance.noHeader = false;
    instance.label = 'Open';
    const html = instance.render();
    assert.ok(html.includes('backdrop visible'), 'Backdrop should have visible class');
    assert.ok(html.includes('panel visible'), 'Panel should have visible class');
  });

  it('render omits visible class when open is false', () => {
    const instance = Object.create(mod.UIDialog.prototype);
    instance.open = false;
    instance.modal = true;
    instance.noHeader = false;
    instance.label = '';
    const html = instance.render();
    assert.ok(!html.includes('backdrop visible'), 'Backdrop should not have visible class');
    assert.ok(!html.includes('panel visible'), 'Panel should not have visible class');
  });

  it('styles include close-btn focus-visible ring', () => {
    const css = mod.UIDialog.styles();
    assert.ok(css.includes('.close-btn:focus-visible'), 'Should have close-btn focus ring');
    assert.ok(css.includes('--ui-focus-ring'), 'Should use --ui-focus-ring token');
  });
});
