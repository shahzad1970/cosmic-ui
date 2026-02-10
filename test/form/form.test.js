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

const mod = await import('../../src/components/form/form.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIForm module', () => {
  it('exports the UIForm class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIForm, 'function');
  });

  it('declares all expected static properties', () => {
    const props = mod.UIForm.properties;
    const expected = ['name', 'action', 'method', 'disabled', 'loading', 'novalidate'];
    for (const key of expected) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIForm.properties;
    assert.equal(p.name.default, '');
    assert.equal(p.action.default, '');
    assert.equal(p.method.default, 'POST');
    assert.equal(p.disabled.default, false);
    assert.equal(p.loading.default, false);
    assert.equal(p.novalidate.default, false);
  });

  it('Boolean properties have correct type', () => {
    const p = mod.UIForm.properties;
    assert.equal(p.disabled.type, Boolean);
    assert.equal(p.loading.type, Boolean);
    assert.equal(p.novalidate.type, Boolean);
  });

  it('String properties have correct type', () => {
    const p = mod.UIForm.properties;
    assert.equal(p.name.type, String);
    assert.equal(p.action.type, String);
    assert.equal(p.method.type, String);
  });

  it('all properties reflect', () => {
    const p = mod.UIForm.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('has static styles()', () => {
    const css = mod.UIForm.styles();
    assert.ok(css.includes(':host'), 'Should include host styles');
    assert.ok(css.includes('display: block'), 'Should be block display');
  });

  it('has a render method returning a slot', () => {
    const proto = mod.UIForm.prototype;
    assert.equal(typeof proto.render, 'function');
  });

  it('is registered as ui-form', () => {
    const registered = globalThis.customElements.get('ui-form');
    assert.equal(registered, mod.UIForm);
  });

  it('has getValues method', () => {
    assert.equal(typeof mod.UIForm.prototype.getValues, 'function');
  });

  it('has getFormData method', () => {
    assert.equal(typeof mod.UIForm.prototype.getFormData, 'function');
  });

  it('has validate method', () => {
    assert.equal(typeof mod.UIForm.prototype.validate, 'function');
  });

  it('has submit method', () => {
    assert.equal(typeof mod.UIForm.prototype.submit, 'function');
  });

  it('has reset method', () => {
    assert.equal(typeof mod.UIForm.prototype.reset, 'function');
  });

  it('has _getInputs method', () => {
    assert.equal(typeof mod.UIForm.prototype._getInputs, 'function');
  });

  it('has _onSubmitEvent method', () => {
    assert.equal(typeof mod.UIForm.prototype._onSubmitEvent, 'function');
  });

  it('render returns a slot', () => {
    const html = mod.UIForm.prototype.render();
    assert.ok(html.includes('<slot>'), 'Should render a default slot');
  });

  it('styles include disabled opacity', () => {
    const css = mod.UIForm.styles();
    assert.ok(css.includes(':host([disabled])'), 'Should include disabled host styles');
  });

  it('styles include loading opacity', () => {
    const css = mod.UIForm.styles();
    assert.ok(css.includes(':host([loading])'), 'Should include loading host styles');
    assert.ok(css.includes('pointer-events: none'), 'Loading should disable pointer events');
  });

  it('has submitJson async method', () => {
    assert.equal(typeof mod.UIForm.prototype.submitJson, 'function');
  });

  it('has _sendJson async method', () => {
    assert.equal(typeof mod.UIForm.prototype._sendJson, 'function');
  });

  it('action defaults to empty string', () => {
    assert.equal(mod.UIForm.properties.action.default, '');
  });

  it('method defaults to POST', () => {
    assert.equal(mod.UIForm.properties.method.default, 'POST');
  });

  it('loading defaults to false', () => {
    assert.equal(mod.UIForm.properties.loading.default, false);
  });

  it('action, method, and loading reflect', () => {
    const p = mod.UIForm.properties;
    assert.equal(p.action.reflect, true, 'action should reflect');
    assert.equal(p.method.reflect, true, 'method should reflect');
    assert.equal(p.loading.reflect, true, 'loading should reflect');
  });
});
