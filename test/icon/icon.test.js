import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-tests for UIIcon (fetch-on-demand architecture).
 *
 * Validates module resolution, class shape, registry API, caching,
 * and icon-set management without a real DOM or network.
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

const mod = await import('../../src/components/icon/icon.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

const { UIIcon } = mod ?? {};

/* ================================================================== */
/*  Module basics                                                      */
/* ================================================================== */

describe('UIIcon module', () => {
  it('exports the UIIcon class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof UIIcon, 'function');
  });

  it('is registered as ui-icon', () => {
    assert.equal(globalThis.customElements.get('ui-icon'), UIIcon);
  });

  it('declares expected static properties', () => {
    const props = UIIcon.properties;
    for (const key of ['set', 'color', 'size', 'label', 'spin', 'stroke']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('name is not a reflected attribute (read from text content)', () => {
    assert.ok(!('name' in UIIcon.properties), 'name should not be in static properties');
  });

  it('has correct default values', () => {
    const p = UIIcon.properties;
    assert.equal(p.set.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.label.default, '');
    assert.equal(p.spin.default, false);
    assert.equal(p.stroke.default, 0);
  });
});

/* ================================================================== */
/*  Static registry API                                                */
/* ================================================================== */

describe('UIIcon registry', () => {
  it('ships with the "lucide" set registered', () => {
    assert.ok(UIIcon._sets.has('lucide'));
  });

  it('ships with the "heroicons" set registered', () => {
    assert.ok(UIIcon._sets.has('heroicons'));
  });

  it('has "lucide" as the default set', () => {
    assert.equal(UIIcon._defaultSet, 'lucide');
  });

  it('lucide set has a basePath ending in sets/lucide/', () => {
    const entry = UIIcon._sets.get('lucide');
    assert.ok(entry.basePath.endsWith('sets/lucide/'), `basePath: ${entry.basePath}`);
  });

  it('heroicons set has a basePath ending in sets/heroicons/', () => {
    const entry = UIIcon._sets.get('heroicons');
    assert.ok(entry.basePath.endsWith('sets/heroicons/'), `basePath: ${entry.basePath}`);
  });

  it('registerSet() adds a new set with basePath', () => {
    UIIcon.registerSet('test-set', { basePath: '/icons/test/' });
    assert.ok(UIIcon._sets.has('test-set'));
    assert.equal(UIIcon._sets.get('test-set').basePath, '/icons/test/');
  });

  it('registerSet() auto-appends trailing slash', () => {
    UIIcon.registerSet('no-slash', { basePath: '/icons/foo' });
    assert.equal(UIIcon._sets.get('no-slash').basePath, '/icons/foo/');
  });

  it('useSet() switches the default set', () => {
    const original = UIIcon._defaultSet;
    UIIcon.useSet('test-set');
    assert.equal(UIIcon._defaultSet, 'test-set');
    // restore
    UIIcon.useSet(original);
    assert.equal(UIIcon._defaultSet, original);
  });

  it('useSet() warns on unknown set and does NOT switch', () => {
    const original = UIIcon._defaultSet;
    UIIcon.useSet('nonexistent');
    assert.equal(UIIcon._defaultSet, original, 'Should not switch to an unknown set');
  });
});

/* ================================================================== */
/*  Cache & register API                                               */
/* ================================================================== */

describe('UIIcon caching', () => {
  it('register() pre-caches an icon in the default set', () => {
    UIIcon.register('my-logo', '<svg><circle cx="12" cy="12" r="10"/></svg>');
    assert.ok(UIIcon._cache.has(`${UIIcon._defaultSet}/my-logo`));
    assert.equal(UIIcon._cache.get(`${UIIcon._defaultSet}/my-logo`), '<svg><circle cx="12" cy="12" r="10"/></svg>');
  });

  it('register() pre-caches an icon in a named set', () => {
    UIIcon.register('custom-icon', '<svg><rect/></svg>', 'test-set');
    assert.ok(UIIcon._cache.has('test-set/custom-icon'));
  });

  it('_cache is a Map', () => {
    assert.ok(UIIcon._cache instanceof Map);
  });

  it('_pending is a Map', () => {
    assert.ok(UIIcon._pending instanceof Map);
  });

  it('clearCache() removes all entries', () => {
    UIIcon._cache.set('a/b', 'test');
    UIIcon._cache.set('c/d', 'test2');
    UIIcon.clearCache();
    assert.equal(UIIcon._cache.size, 0);
  });

  it('clearCache(setName) removes only that set', () => {
    UIIcon._cache.set('foo/icon1', '<svg/>');
    UIIcon._cache.set('foo/icon2', '<svg/>');
    UIIcon._cache.set('bar/icon1', '<svg/>');
    UIIcon.clearCache('foo');
    assert.equal(UIIcon._cache.has('foo/icon1'), false);
    assert.equal(UIIcon._cache.has('foo/icon2'), false);
    assert.equal(UIIcon._cache.has('bar/icon1'), true);
    // cleanup
    UIIcon.clearCache();
  });
});

/* ================================================================== */
/*  Styles & render                                                    */
/* ================================================================== */

describe('UIIcon styles & render', () => {
  it('static styles() returns a non-empty CSS string', () => {
    const css = UIIcon.styles();
    assert.ok(css.length > 0);
    assert.ok(css.includes(':host'));
    assert.ok(css.includes('svg'));
  });

  it('styles include spin animation keyframes', () => {
    const css = UIIcon.styles();
    assert.ok(css.includes('@keyframes ui-icon-spin'));
    assert.ok(css.includes(':host([spin])'));
  });

  it('render() returns a hidden slot for text content', () => {
    const html = UIIcon.prototype.render();
    assert.ok(html.includes('<slot'));
  });

  it('has _fetchIcon static async method', () => {
    assert.equal(typeof UIIcon._fetchIcon, 'function');
  });

  it('has _moduleBase static string for path resolution', () => {
    assert.equal(typeof UIIcon._moduleBase, 'string');
  });
});
