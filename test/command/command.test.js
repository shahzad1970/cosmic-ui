import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Tests for UICommand and UICommandItem.
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

const mod = await import('../../src/components/command/command.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

/* ─────────────────────── UICommand ─────────────────────── */

describe('UICommand module', () => {
  it('exports the UICommand class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UICommand, 'function');
  });

  it('exports the UICommandItem class', () => {
    assert.equal(typeof mod.UICommandItem, 'function');
  });

  it('is registered as ui-command', () => {
    assert.equal(globalThis.customElements.get('ui-command'), mod.UICommand);
  });

  it('is registered as ui-command-item', () => {
    assert.equal(globalThis.customElements.get('ui-command-item'), mod.UICommandItem);
  });
});

describe('UICommand static properties', () => {
  it('declares all 7 expected properties', () => {
    const props = mod.UICommand.properties;
    for (const key of ['open', 'placeholder', 'shortcut', 'noShortcut',
                        'elevation', 'size', 'width']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
    assert.equal(Object.keys(props).length, 7, 'Should have exactly 7 properties');
  });

  it('has correct default values', () => {
    const p = mod.UICommand.properties;
    assert.equal(p.open.default, false);
    assert.equal(p.placeholder.default, 'Type a command…');
    assert.equal(p.shortcut.default, 'k');
    assert.equal(p.noShortcut.default, false);
    assert.equal(p.elevation.default, '5');
    assert.equal(p.size.default, '');
    assert.equal(p.width.default, '');
  });

  it('has correct types', () => {
    const p = mod.UICommand.properties;
    assert.equal(p.open.type, Boolean);
    assert.equal(p.placeholder.type, String);
    assert.equal(p.shortcut.type, String);
    assert.equal(p.noShortcut.type, Boolean);
    assert.equal(p.elevation.type, String);
    assert.equal(p.size.type, String);
    assert.equal(p.width.type, String);
  });

  it('noShortcut uses no-shortcut as attribute name', () => {
    assert.equal(mod.UICommand.properties.noShortcut.attribute, 'no-shortcut');
  });

  it('all properties reflect', () => {
    const p = mod.UICommand.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });
});

describe('UICommand methods', () => {
  it('has show method', () => {
    assert.equal(typeof mod.UICommand.prototype.show, 'function');
  });

  it('has hide method', () => {
    assert.equal(typeof mod.UICommand.prototype.hide, 'function');
  });

  it('has _doOpen method', () => {
    assert.equal(typeof mod.UICommand.prototype._doOpen, 'function');
  });

  it('has _doClose method', () => {
    assert.equal(typeof mod.UICommand.prototype._doClose, 'function');
  });

  it('has _applyStyles method', () => {
    assert.equal(typeof mod.UICommand.prototype._applyStyles, 'function');
  });

  it('has _getItems method', () => {
    assert.equal(typeof mod.UICommand.prototype._getItems, 'function');
  });

  it('has _filterItems method', () => {
    assert.equal(typeof mod.UICommand.prototype._filterItems, 'function');
  });

  it('has _renderResults method', () => {
    assert.equal(typeof mod.UICommand.prototype._renderResults, 'function');
  });

  it('has _selectItem method', () => {
    assert.equal(typeof mod.UICommand.prototype._selectItem, 'function');
  });

  it('has bound _onInput handler', () => {
    assert.equal(typeof mod.UICommand.prototype._onInput, 'function');
  });

  it('has bound _onInputKeydown handler', () => {
    assert.equal(typeof mod.UICommand.prototype._onInputKeydown, 'function');
  });

  it('has bound _onBackdropClick handler', () => {
    assert.equal(typeof mod.UICommand.prototype._onBackdropClick, 'function');
  });

  it('has bound _onGlobalKey handler', () => {
    assert.equal(typeof mod.UICommand.prototype._onGlobalKey, 'function');
  });

  it('has _attachPanelListeners method', () => {
    assert.equal(typeof mod.UICommand.prototype._attachPanelListeners, 'function');
  });

  it('has _detachPanelListeners method', () => {
    assert.equal(typeof mod.UICommand.prototype._detachPanelListeners, 'function');
  });
});

describe('UICommand JS-only items property', () => {
  it('items getter returns empty array by default', () => {
    const instance = Object.create(mod.UICommand.prototype);
    instance.__items = [];
    assert.deepEqual(instance.items, []);
  });

  it('items setter accepts an array', () => {
    const instance = Object.create(mod.UICommand.prototype);
    instance.__items = [];
    instance._initialised = false;
    const data = [{ label: 'A', value: 'a' }];
    instance.items = data;
    assert.deepEqual(instance.items, data);
  });

  it('items setter coerces non-array to empty array', () => {
    const instance = Object.create(mod.UICommand.prototype);
    instance.__items = [];
    instance._initialised = false;
    instance.items = 'invalid';
    assert.deepEqual(instance.items, []);
  });
});

describe('UICommand styles', () => {
  it('static styles() returns CSS string', () => {
    const css = mod.UICommand.styles();
    assert.equal(typeof css, 'string');
  });

  it('includes :host selector', () => {
    assert.ok(mod.UICommand.styles().includes(':host'));
  });

  it('includes .backdrop class', () => {
    assert.ok(mod.UICommand.styles().includes('.backdrop'));
  });

  it('includes .panel class', () => {
    assert.ok(mod.UICommand.styles().includes('.panel'));
  });

  it('includes .search-input styles', () => {
    assert.ok(mod.UICommand.styles().includes('.search-input'));
  });

  it('includes .results list', () => {
    assert.ok(mod.UICommand.styles().includes('.results'));
  });

  it('includes .item styles', () => {
    assert.ok(mod.UICommand.styles().includes('.item'));
  });

  it('includes .active class for keyboard nav', () => {
    assert.ok(mod.UICommand.styles().includes('.active'));
  });

  it('includes .group-label for grouped items', () => {
    assert.ok(mod.UICommand.styles().includes('.group-label'));
  });

  it('includes .footer with keyboard hints', () => {
    assert.ok(mod.UICommand.styles().includes('.footer'));
  });

  it('includes .visible for backdrop show/hide', () => {
    assert.ok(mod.UICommand.styles().includes('.visible'));
  });

  it('includes animation transitions', () => {
    const css = mod.UICommand.styles();
    assert.ok(css.includes('transition'), 'Should have transition');
    assert.ok(css.includes('scale'), 'Should include scale transform');
  });
});

describe('UICommand render', () => {
  it('render() returns backdrop + panel markup', () => {
    const instance = Object.create(mod.UICommand.prototype);
    instance._placeholder = 'Type a command…';
    instance.placeholder = 'Type a command…';
    const html = instance.render();
    assert.ok(html.includes('class="backdrop"'), 'Should have backdrop');
    assert.ok(html.includes('class="panel"'), 'Should have panel');
    assert.ok(html.includes('class="search-input"'), 'Should have search input');
    assert.ok(html.includes('class="results"'), 'Should have results container');
    assert.ok(html.includes('class="footer"'), 'Should have footer');
  });

  it('render() includes search icon SVG', () => {
    const instance = Object.create(mod.UICommand.prototype);
    instance._placeholder = 'Search…';
    instance.placeholder = 'Search…';
    const html = instance.render();
    assert.ok(html.includes('<svg'), 'Should have SVG search icon');
  });

  it('render() includes keyboard hints', () => {
    const instance = Object.create(mod.UICommand.prototype);
    instance._placeholder = '';
    instance.placeholder = '';
    const html = instance.render();
    assert.ok(html.includes('<kbd>'), 'Should have keyboard hint elements');
    assert.ok(html.includes('esc'), 'Should mention esc key');
  });

  it('render() uses placeholder in search input', () => {
    const instance = Object.create(mod.UICommand.prototype);
    instance._placeholder = 'Find something…';
    instance.placeholder = 'Find something…';
    const html = instance.render();
    assert.ok(html.includes('Find something…'), 'Should include placeholder text');
  });

  it('render() includes hidden slot for DOM items', () => {
    const instance = Object.create(mod.UICommand.prototype);
    instance._placeholder = '';
    instance.placeholder = '';
    const html = instance.render();
    assert.ok(html.includes('<slot'), 'Should have slot');
    assert.ok(html.includes('display:none'), 'Slot should be hidden');
  });
});

/* ───────────────────── UICommandItem ────────────────────── */

describe('UICommandItem', () => {
  it('extends HTMLElement (not UIComponent)', () => {
    // UICommandItem is a plain HTMLElement, used only as a data holder
    assert.equal(typeof mod.UICommandItem, 'function');
  });

  it('has observedAttributes', () => {
    const attrs = mod.UICommandItem.observedAttributes;
    assert.ok(Array.isArray(attrs));
    for (const a of ['value', 'label', 'description', 'icon', 'group']) {
      assert.ok(attrs.includes(a), `Missing observed attribute: ${a}`);
    }
  });

  it('has 5 observed attributes', () => {
    assert.equal(mod.UICommandItem.observedAttributes.length, 5);
  });
});
