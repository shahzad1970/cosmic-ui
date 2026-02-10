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

const mod = await import('../../src/components/avatar/avatar.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIAvatar module', () => {
  it('exports the UIAvatar class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIAvatar, 'function');
  });

  it('declares expected static properties', () => {
    const props = mod.UIAvatar.properties;
    for (const key of ['src', 'initials', 'alt', 'size', 'background', 'color',
                        'circle', 'square', 'status', 'statusColor']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIAvatar.properties;
    assert.equal(p.src.default, '');
    assert.equal(p.initials.default, '');
    assert.equal(p.alt.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.circle.default, true);
    assert.equal(p.square.default, false);
    assert.equal(p.status.default, '');
    assert.equal(p.statusColor.default, '');
  });

  it('properties have correct types', () => {
    const p = mod.UIAvatar.properties;
    assert.equal(p.src.type, String);
    assert.equal(p.initials.type, String);
    assert.equal(p.size.type, String);
    assert.equal(p.circle.type, Boolean);
    assert.equal(p.square.type, Boolean);
    assert.equal(p.status.type, String);
  });

  it('status-color uses kebab-case attribute', () => {
    assert.equal(mod.UIAvatar.properties.statusColor.attribute, 'status-color');
  });

  it('all properties reflect', () => {
    const p = mod.UIAvatar.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });

  it('has static styles()', () => {
    const css = mod.UIAvatar.styles();
    assert.ok(css.includes(':host'), 'Should include :host');
    assert.ok(css.includes('border-radius'), 'Should include border-radius');
    assert.ok(css.includes('.inner'), 'Should include inner wrapper');
    assert.ok(css.includes('.initials'), 'Should include initials style');
    assert.ok(css.includes('.status-dot'), 'Should include status dot');
    assert.ok(css.includes(':host([square])'), 'Should include square variant');
  });

  it('render() with src shows image', () => {
    const instance = Object.create(mod.UIAvatar.prototype);
    instance.src = 'photo.jpg';
    instance.initials = '';
    instance.alt = 'User';
    instance.status = '';
    const html = instance.render();
    assert.ok(html.includes('<img'), 'Should render img');
    assert.ok(html.includes('photo.jpg'), 'Should include src');
  });

  it('render() with initials shows text', () => {
    const instance = Object.create(mod.UIAvatar.prototype);
    instance.src = '';
    instance.initials = 'JS';
    instance.alt = '';
    instance.status = '';
    const html = instance.render();
    assert.ok(html.includes('initials'), 'Should have initials class');
    assert.ok(html.includes('JS'), 'Should show initials');
  });

  it('render() with no src/initials shows fallback slot', () => {
    const instance = Object.create(mod.UIAvatar.prototype);
    instance.src = '';
    instance.initials = '';
    instance.status = '';
    const html = instance.render();
    assert.ok(html.includes('<slot>'), 'Should have slot fallback');
    assert.ok(html.includes('fallback'), 'Should have fallback class');
  });

  it('render() with status shows status dot', () => {
    const instance = Object.create(mod.UIAvatar.prototype);
    instance.src = '';
    instance.initials = 'A';
    instance.alt = '';
    instance.status = 'online';
    const html = instance.render();
    assert.ok(html.includes('status-dot'), 'Should show status dot');
  });

  it('has status colour presets', () => {
    const c = mod.UIAvatar._statusColors;
    assert.ok(c.online, 'Should have online colour');
    assert.ok(c.offline, 'Should have offline colour');
    assert.ok(c.busy, 'Should have busy colour');
    assert.ok(c.away, 'Should have away colour');
  });

  it('has _applyStyles method', () => {
    assert.equal(typeof mod.UIAvatar.prototype._applyStyles, 'function');
  });

  it('is registered as ui-avatar custom element', () => {
    assert.equal(globalThis.customElements.get('ui-avatar'), mod.UIAvatar);
  });
});
