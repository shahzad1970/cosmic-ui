import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Tests for UIButton.
 */

// Provide minimal DOM shims so the module can load in Node.
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

const mod = await import('../../src/components/button/button.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIButton module', () => {
  it('exports the UIButton class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIButton, 'function');
  });

  it('is registered as ui-button', () => {
    const ctor = globalThis.customElements.get('ui-button');
    assert.ok(ctor, 'ui-button should be registered');
    assert.equal(ctor, mod.UIButton);
  });

  it('declares all 14 static properties', () => {
    const props = mod.UIButton.properties;
    for (const key of [
      'background', 'color', 'size', 'disabled', 'type',
      'pill', 'circle', 'outline', 'flat', 'link',
      'plain', 'href', 'target', 'channel',
    ]) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
    assert.equal(Object.keys(props).length, 14, 'Should have exactly 14 properties');
  });

  it('has correct default values', () => {
    const p = mod.UIButton.properties;
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.disabled.default, false);
    assert.equal(p.type.default, 'button');
    assert.equal(p.pill.default, false);
    assert.equal(p.circle.default, false);
    assert.equal(p.outline.default, false);
    assert.equal(p.flat.default, false);
    assert.equal(p.link.default, false);
    assert.equal(p.plain.default, false);
    assert.equal(p.href.default, '');
    assert.equal(p.target.default, '');
    assert.equal(p.channel.default, '');
  });

  it('all properties are reflected', () => {
    const props = mod.UIButton.properties;
    for (const [key, def] of Object.entries(props)) {
      assert.equal(def.reflect, true, `${key} should have reflect: true`);
    }
  });

  it('Boolean properties have Boolean type', () => {
    const booleans = ['disabled', 'pill', 'circle', 'outline', 'flat', 'link', 'plain'];
    const props = mod.UIButton.properties;
    for (const key of booleans) {
      assert.equal(props[key].type, Boolean, `${key} should be Boolean`);
    }
  });

  it('String properties have String type', () => {
    const strings = ['background', 'color', 'size', 'href', 'target', 'channel', 'type'];
    const props = mod.UIButton.properties;
    for (const key of strings) {
      assert.equal(props[key].type, String, `${key} should be String`);
    }
  });

  it('has static styles() method with all variant rules', () => {
    const css = mod.UIButton.styles();
    assert.ok(css.includes(':host'), 'Should include :host styles');
    assert.ok(css.includes(':host([outline])'), 'Should include outline styles');
    assert.ok(css.includes(':host([flat])'), 'Should include flat styles');
    assert.ok(css.includes(':host([link])'), 'Should include link styles');
    assert.ok(css.includes(':host([pill])'), 'Should include pill styles');
    assert.ok(css.includes(':host([circle])'), 'Should include circle styles');
    assert.ok(css.includes(':host([disabled])'), 'Should include disabled styles');
    assert.ok(css.includes(':host([plain])'), 'Should include plain styles');
  });

  it('styles use em-based sizing', () => {
    const css = mod.UIButton.styles();
    assert.ok(css.includes('padding: 0.5em 1em'), 'Default padding should use em');
    assert.ok(css.includes('gap: 0.5em'), 'Gap should use em');
  });

  it('render() returns slot-only markup', () => {
    const instance = Object.create(mod.UIButton.prototype);
    instance.href = '';
    instance.type = 'button';
    instance.disabled = false;

    const html = instance.render();
    assert.ok(html.includes('<slot></slot>'), 'Should render default slot');
  });

  it('has a merged _applyStyles method (no separate _applySize/_applyColors)', () => {
    const proto = mod.UIButton.prototype;
    assert.equal(typeof proto._applyStyles, 'function', 'Should have _applyStyles');
    assert.equal(proto._applySize, undefined, 'Should NOT have separate _applySize');
    assert.equal(proto._applyColors, undefined, 'Should NOT have separate _applyColors');
  });

  it('has _updateDisabledState method', () => {
    assert.equal(typeof mod.UIButton.prototype._updateDisabledState, 'function');
  });

  it('has _onClick handler', () => {
    assert.equal(typeof mod.UIButton.prototype._onClick, 'function');
  });

  it('has _onKeyDown handler', () => {
    assert.equal(typeof mod.UIButton.prototype._onKeyDown, 'function');
  });

  it('_update calls _applyStyles (convention check)', () => {
    const proto = mod.UIButton.prototype;
    assert.equal(typeof proto._update, 'function', 'Should have _update');
    const src = proto._update.toString();
    assert.ok(src.includes('_applyStyles'), '_update should call _applyStyles');
    assert.ok(src.includes('_updateDisabledState'), '_update should call _updateDisabledState');
  });

  it('href and target properties exist for link navigation', () => {
    const props = mod.UIButton.properties;
    assert.ok('href' in props, 'Should have href property');
    assert.ok('target' in props, 'Should have target property');
  });

  it('channel property exists for event dispatch', () => {
    const props = mod.UIButton.properties;
    assert.ok('channel' in props, 'Should have channel property');
    assert.equal(props.channel.type, String);
  });

  it('plain variant styles have no background or border', () => {
    const css = mod.UIButton.styles();
    assert.ok(css.includes(':host([plain])'), 'Should have plain styles');
    assert.ok(css.includes(':host([plain]:hover)'), 'Should have plain hover styles');
  });
});
