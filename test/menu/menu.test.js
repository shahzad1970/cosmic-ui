import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Tests for UIMenu and UIMenuItem.
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

const mod = await import('../../src/components/menu/menu.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

/* ─────────────────────────── UIMenu ─────────────────────────── */

describe('UIMenu module', () => {
  it('exports the UIMenu class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIMenu, 'function');
  });

  it('exports the UIMenuItem class', () => {
    assert.equal(typeof mod.UIMenuItem, 'function');
  });

  it('is registered as ui-menu', () => {
    assert.equal(globalThis.customElements.get('ui-menu'), mod.UIMenu);
  });

  it('is registered as ui-menu-item', () => {
    assert.equal(globalThis.customElements.get('ui-menu-item'), mod.UIMenuItem);
  });
});

describe('UIMenu static properties', () => {
  it('declares all 6 expected properties', () => {
    const props = mod.UIMenu.properties;
    for (const key of ['target', 'elevation', 'size', 'background', 'color', 'open']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
    assert.equal(Object.keys(props).length, 6, 'Should have exactly 6 properties');
  });

  it('has correct default values', () => {
    const p = mod.UIMenu.properties;
    assert.equal(p.target.default, '');
    assert.equal(p.elevation.default, '3');
    assert.equal(p.size.default, '');
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.open.default, false);
  });

  it('has correct types', () => {
    const p = mod.UIMenu.properties;
    assert.equal(p.target.type, String);
    assert.equal(p.elevation.type, String);
    assert.equal(p.size.type, String);
    assert.equal(p.background.type, String);
    assert.equal(p.color.type, String);
    assert.equal(p.open.type, Boolean);
  });

  it('all properties reflect', () => {
    const p = mod.UIMenu.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });
});

describe('UIMenu methods', () => {
  it('has show method', () => {
    assert.equal(typeof mod.UIMenu.prototype.show, 'function');
  });

  it('has hide method', () => {
    assert.equal(typeof mod.UIMenu.prototype.hide, 'function');
  });

  it('has _applyStyles method', () => {
    assert.equal(typeof mod.UIMenu.prototype._applyStyles, 'function');
  });

  it('has _attachTarget method', () => {
    assert.equal(typeof mod.UIMenu.prototype._attachTarget, 'function');
  });

  it('has _detachTarget method', () => {
    assert.equal(typeof mod.UIMenu.prototype._detachTarget, 'function');
  });

  it('has bound _onContextMenu handler', () => {
    assert.equal(typeof mod.UIMenu.prototype._onContextMenu, 'function');
  });

  it('has bound _onDocClick handler', () => {
    assert.equal(typeof mod.UIMenu.prototype._onDocClick, 'function');
  });

  it('has bound _onKeyDown handler', () => {
    assert.equal(typeof mod.UIMenu.prototype._onKeyDown, 'function');
  });

  it('has bound _onItemClick handler', () => {
    assert.equal(typeof mod.UIMenu.prototype._onItemClick, 'function');
  });
});

describe('UIMenu styles', () => {
  it('static styles() returns CSS string', () => {
    const css = mod.UIMenu.styles();
    assert.equal(typeof css, 'string');
  });

  it('includes :host selector', () => {
    assert.ok(mod.UIMenu.styles().includes(':host'));
  });

  it('includes .menu class', () => {
    assert.ok(mod.UIMenu.styles().includes('.menu'));
  });

  it('includes .visible class for show/hide', () => {
    assert.ok(mod.UIMenu.styles().includes('.visible'));
  });

  it('includes fixed positioning', () => {
    assert.ok(mod.UIMenu.styles().includes('position: fixed'));
  });

  it('includes z-index for overlay', () => {
    assert.ok(mod.UIMenu.styles().includes('z-index'));
  });
});

describe('UIMenu render', () => {
  it('render() returns menu markup', () => {
    const instance = Object.create(mod.UIMenu.prototype);
    const html = instance.render();
    assert.ok(html.includes('class="menu"'), 'Should have .menu element');
    assert.ok(html.includes('role="menu"'), 'Should have role=menu');
    assert.ok(html.includes('<slot>'), 'Should have default slot');
  });
});

/* ─────────────────────── UIMenuItem ─────────────────────── */

describe('UIMenuItem static properties', () => {
  it('declares all 3 expected properties', () => {
    const props = mod.UIMenuItem.properties;
    for (const key of ['value', 'disabled', 'divider']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
    assert.equal(Object.keys(props).length, 3, 'Should have exactly 3 properties');
  });

  it('has correct default values', () => {
    const p = mod.UIMenuItem.properties;
    assert.equal(p.value.default, '');
    assert.equal(p.disabled.default, false);
    assert.equal(p.divider.default, false);
  });

  it('has correct types', () => {
    const p = mod.UIMenuItem.properties;
    assert.equal(p.value.type, String);
    assert.equal(p.disabled.type, Boolean);
    assert.equal(p.divider.type, Boolean);
  });

  it('all properties reflect', () => {
    const p = mod.UIMenuItem.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });
});

describe('UIMenuItem styles', () => {
  it('static styles() returns CSS string', () => {
    const css = mod.UIMenuItem.styles();
    assert.equal(typeof css, 'string');
  });

  it('includes :host selector', () => {
    assert.ok(mod.UIMenuItem.styles().includes(':host'));
  });

  it('includes .item class', () => {
    assert.ok(mod.UIMenuItem.styles().includes('.item'));
  });

  it('includes disabled styles', () => {
    assert.ok(mod.UIMenuItem.styles().includes(':host([disabled])'));
  });

  it('includes divider styles', () => {
    assert.ok(mod.UIMenuItem.styles().includes(':host([divider])'));
  });

  it('includes hover styles', () => {
    assert.ok(mod.UIMenuItem.styles().includes(':hover'));
  });
});

describe('UIMenuItem render', () => {
  it('render() returns item markup', () => {
    const instance = Object.create(mod.UIMenuItem.prototype);
    const html = instance.render();
    assert.ok(html.includes('class="item"'), 'Should have .item element');
    assert.ok(html.includes('role="menuitem"'), 'Should have role=menuitem');
    assert.ok(html.includes('<slot>'), 'Should have default slot');
  });
});
