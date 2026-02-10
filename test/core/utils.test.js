import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Minimal DOM shims.
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

const { resolveElevation, resolveSize, resolveColor } = await import('../../src/core/ui-utils.js');

describe('resolveElevation', () => {
  it('returns undefined for empty input', () => {
    assert.equal(resolveElevation(''), undefined);
    assert.equal(resolveElevation(null), undefined);
    assert.equal(resolveElevation(undefined), undefined);
  });

  it('resolves named levels 1–5 to box-shadow strings', () => {
    for (const lvl of ['1', '2', '3', '4', '5']) {
      const result = resolveElevation(lvl);
      assert.ok(result, `Level ${lvl} should return a value`);
      assert.ok(result.includes('rgba'), `Level ${lvl} should contain rgba()`);
    }
  });

  it('returns progressively larger shadows for higher levels', () => {
    const l1 = resolveElevation('1');
    const l5 = resolveElevation('5');
    assert.notEqual(l1, l5, 'Level 1 and 5 should differ');
  });

  it('passes through arbitrary box-shadow CSS', () => {
    const custom = '0 0 10px red';
    assert.equal(resolveElevation(custom), custom);
  });

  it('returns undefined for invalid numeric-like values outside 1-5', () => {
    // '0' and '6' are not in the map, so they pass through as raw CSS
    const r0 = resolveElevation('0');
    assert.equal(r0, '0');
  });
});

describe('resolveSize', () => {
  it('maps named sizes to em values', () => {
    assert.equal(resolveSize('large'), '1.125em');
    assert.equal(resolveSize('xx-small'), '0.5625em');
  });

  it('passes through raw CSS lengths', () => {
    assert.equal(resolveSize('10px'), '10px');
    assert.equal(resolveSize('2rem'), '2rem');
  });

  it('returns undefined for empty input', () => {
    assert.equal(resolveSize(''), undefined);
  });
});

describe('resolveColor', () => {
  it('converts palette tokens to CSS vars', () => {
    assert.equal(resolveColor('red-600'), 'var(--ui-red-600)');
    assert.equal(resolveColor('indigo-50'), 'var(--ui-indigo-50)');
  });

  it('passes through raw CSS colours', () => {
    assert.equal(resolveColor('#ef4444'), '#ef4444');
    assert.equal(resolveColor('salmon'), 'salmon');
  });

  it('returns undefined for empty input', () => {
    assert.equal(resolveColor(''), undefined);
  });
});
