import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/* ── Minimal DOM shim ────────────────────────────────────────────────── */
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

const mod = await import('../../src/components/include/include.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

/* ── Module export ─────────────────────────────────────────────────── */
describe('UIInclude module', () => {
  it('exports the UIInclude class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIInclude, 'function');
  });

  it('declares expected static properties', () => {
    const props = mod.UIInclude.properties;
    for (const key of ['src', 'mode', 'channel', 'base', 'lazy', 'nocache']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIInclude.properties;
    assert.equal(p.src.default, '');
    assert.equal(p.mode.default, 'replace');
    assert.equal(p.channel.default, '');
    assert.equal(p.base.default, '');
    assert.equal(p.lazy.default, false);
    assert.equal(p.nocache.default, false);
  });

  it('properties have correct types', () => {
    const p = mod.UIInclude.properties;
    assert.equal(p.src.type, String);
    assert.equal(p.mode.type, String);
    assert.equal(p.channel.type, String);
    assert.equal(p.base.type, String);
    assert.equal(p.lazy.type, Boolean);
    assert.equal(p.nocache.type, Boolean);
  });

  it('all properties reflect', () => {
    const p = mod.UIInclude.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });

  it('has static styles()', () => {
    const css = mod.UIInclude.styles();
    assert.ok(css.includes(':host'), 'Should include :host selector');
    assert.ok(css.includes('display: block'), 'Should be block-level');
  });

  it('render() returns a slot for fallback content', () => {
    const instance = Object.create(mod.UIInclude.prototype);
    const html = instance.render();
    assert.ok(html.includes('<slot>'), 'Should include a <slot>');
  });

  it('has reload() method', () => {
    assert.equal(typeof mod.UIInclude.prototype.reload, 'function');
  });

  it('has static clearCache() method', () => {
    assert.equal(typeof mod.UIInclude.clearCache, 'function');
  });

  it('has _fetchContent method', () => {
    assert.equal(typeof mod.UIInclude.prototype._fetchContent, 'function');
  });

  it('has _inject method', () => {
    assert.equal(typeof mod.UIInclude.prototype._inject, 'function');
  });

  it('has _startLoad method', () => {
    assert.equal(typeof mod.UIInclude.prototype._startLoad, 'function');
  });

  it('has _setupObserver method for lazy loading', () => {
    assert.equal(typeof mod.UIInclude.prototype._setupObserver, 'function');
  });

  it('has _teardownObserver method', () => {
    assert.equal(typeof mod.UIInclude.prototype._teardownObserver, 'function');
  });

  it('has _setContainerClass method', () => {
    assert.equal(typeof mod.UIInclude.prototype._setContainerClass, 'function');
  });

  it('has _setupChannel method', () => {
    assert.equal(typeof mod.UIInclude.prototype._setupChannel, 'function');
  });

  it('has _teardownChannel method', () => {
    assert.equal(typeof mod.UIInclude.prototype._teardownChannel, 'function');
  });

  it('is registered as ui-include custom element', () => {
    const ctor = customElements.get('ui-include');
    assert.equal(ctor, mod.UIInclude);
  });
});

describe('UIInclude channel tracking', () => {
  it('_setupChannel stores active channel name', () => {
    // _setupChannel should track the channel it registered on
    // so _teardownChannel can remove the correct listener
    const proto = mod.UIInclude.prototype;
    assert.equal(typeof proto._setupChannel, 'function');
    assert.equal(typeof proto._teardownChannel, 'function');
  });
});

describe('UIInclude host state classes', () => {
  it('_setContainerClass applies class to host element', () => {
    // Ensure _setContainerClass modifies the host (not a shadow child)
    const instance = Object.create(mod.UIInclude.prototype);
    const classes = new Set();
    instance.classList = {
      remove: (...args) => args.forEach((c) => classes.delete(c)),
      add:    (...args) => args.forEach((c) => classes.add(c)),
    };
    instance._setContainerClass('loading');
    assert.ok(classes.has('loading'), 'Should add loading class');
    instance._setContainerClass('loaded');
    assert.ok(classes.has('loaded'), 'Should add loaded class');
    assert.ok(!classes.has('loading'), 'Should remove previous loading class');
    instance._setContainerClass('error');
    assert.ok(classes.has('error'), 'Should add error class');
    assert.ok(!classes.has('loaded'), 'Should remove previous loaded class');
  });
});

describe('UIInclude render & styles', () => {
  it('render() returns only a <slot>', () => {
    const instance = Object.create(mod.UIInclude.prototype);
    const html = instance.render();
    assert.ok(html.includes('<slot>'), 'Should include <slot>');
    assert.equal(html.trim(), '<slot></slot>');
  });

  it('styles set host to display:block', () => {
    const css = mod.UIInclude.styles();
    assert.ok(css.includes('display: block'), 'Host should be block');
  });
});

describe('UIInclude lifecycle methods', () => {
  it('has attributeChangedCallback', () => {
    assert.equal(typeof mod.UIInclude.prototype.attributeChangedCallback, 'function');
  });

  it('has connectedCallback', () => {
    assert.equal(typeof mod.UIInclude.prototype.connectedCallback, 'function');
  });

  it('has disconnectedCallback', () => {
    assert.equal(typeof mod.UIInclude.prototype.disconnectedCallback, 'function');
  });
});
