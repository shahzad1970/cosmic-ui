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

const mod = await import('../../src/components/input/radio.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIInputRadio module', () => {
  it('exports the UIInputRadio class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIInputRadio, 'function');
  });

  it('declares all expected static properties', () => {
    const props = mod.UIInputRadio.properties;
    const expected = ['checked', 'value', 'label', 'disabled'];
    for (const key of expected) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIInputRadio.properties;
    assert.equal(p.checked.default, false);
    assert.equal(p.value.default, '');
    assert.equal(p.label.default, '');
    assert.equal(p.disabled.default, false);
  });

  it('Boolean properties have correct type', () => {
    const p = mod.UIInputRadio.properties;
    assert.equal(p.checked.type, Boolean);
    assert.equal(p.disabled.type, Boolean);
  });

  it('String properties have correct type', () => {
    const p = mod.UIInputRadio.properties;
    assert.equal(p.value.type, String);
    assert.equal(p.label.type, String);
  });

  it('all properties reflect', () => {
    const p = mod.UIInputRadio.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('has static styles() with expected CSS selectors', () => {
    const css = mod.UIInputRadio.styles();
    assert.ok(css.includes('.circle'), 'Should include .circle styles');
    assert.ok(css.includes('.dot'), 'Should include .dot styles');
    assert.ok(css.includes(':host'), 'Should include :host styles');
    assert.ok(css.includes(':host([disabled])'), 'Should include disabled host styles');
    assert.ok(css.includes(':host([checked])'), 'Should include checked host styles');
    assert.ok(css.includes('.label-text'), 'Should include label-text styles');
  });

  it('render outputs correct HTML structure', () => {
    const inst = Object.create(mod.UIInputRadio.prototype);
    inst.label = 'Option A';
    const html = inst.render();
    assert.ok(html.includes('Option A'), 'Should render label text');
    assert.ok(html.includes('part="container"'), 'Should expose container CSS part');
    assert.ok(html.includes('part="circle"'), 'Should expose circle CSS part');
    assert.ok(html.includes('part="dot"'), 'Should expose dot CSS part');
    assert.ok(html.includes('class="label-text"'), 'Should have label-text element');
  });

  it('render escapes HTML in label', () => {
    const inst = Object.create(mod.UIInputRadio.prototype);
    inst.label = '<script>alert("x")</script>';
    const html = inst.render();
    assert.ok(!html.includes('<script>'), 'Should escape label HTML');
    assert.ok(html.includes('&lt;script>'), 'Should HTML-encode opening angle brackets');
  });

  it('is registered as ui-input-radio', () => {
    const registered = globalThis.customElements.get('ui-input-radio');
    assert.equal(registered, mod.UIInputRadio);
  });

  it('has _select method', () => {
    assert.equal(typeof mod.UIInputRadio.prototype._select, 'function');
  });

  it('has _onClick method', () => {
    assert.equal(typeof mod.UIInputRadio.prototype._onClick, 'function');
  });

  it('has _onKeyDown method', () => {
    assert.equal(typeof mod.UIInputRadio.prototype._onKeyDown, 'function');
  });

  it('has connectedCallback and disconnectedCallback', () => {
    assert.equal(typeof mod.UIInputRadio.prototype.connectedCallback, 'function');
    assert.equal(typeof mod.UIInputRadio.prototype.disconnectedCallback, 'function');
  });

  it('has render method that returns a string', () => {
    const inst = Object.create(mod.UIInputRadio.prototype);
    inst.label = 'Test';
    const html = inst.render();
    assert.equal(typeof html, 'string');
    assert.ok(html.length > 0, 'render should return non-empty string');
  });
});
