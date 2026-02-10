import { UIComponent } from '../../core/ui-component.js';
import { resolveColor, resolveColorHover, resolveColorLighter, resolveColorDarker, resolveSize } from '../../core/ui-utils.js';

/**
 * `<ui-tree-item>` — A node inside a `<ui-tree>`.
 *
 * Supports **rich content** — put icons, badges, text, or any HTML inside
 * the default slot.
 *
 * Supports **multi-level nesting** — place `<ui-tree-item>` children directly
 * inside another item.  The children auto-move to a nested group; a
 * disclosure caret appears automatically.
 *
 * @element ui-tree-item
 *
 * @attr {String}  value     - Machine-readable value emitted with selection events
 * @attr {Boolean} disabled  - Dims the item and blocks interaction
 * @attr {Boolean} expanded  - Whether the child group is visible
 * @attr {Boolean} selected  - Whether the item is selected
 * @attr {String}  href      - URL to navigate to when clicked
 * @attr {String}  target    - Link target (used with `href`)
 * @attr {String}  channel   - Event channel name; when set, dispatches a named event
 *                             on `document` instead of navigating (for SPA routing)
 *
 * @slot (default) - Visible label content (text, icons, HTML — anything).
 *                   Nested `<ui-tree-item>` children are automatically
 *                   redirected to the nested children panel.
 *
 * @fires ui-select   - Emitted when the item is selected (detail: { value, item })
 * @fires ui-navigate  - Cancellable; emitted before href navigation (detail: { href, target, item })
 * @fires ui-expand   - Emitted when the item is expanded
 * @fires ui-collapse - Emitted when the item is collapsed
 *
 * @example
 *   <!-- Simple item -->
 *   <ui-tree-item value="readme">README.md</ui-tree-item>
 *
 *   <!-- Rich item -->
 *   <ui-tree-item>
 *     <ui-icon name="folder"></ui-icon> src
 *     <ui-tree-item>main.js</ui-tree-item>
 *     <ui-tree-item>utils.js</ui-tree-item>
 *   </ui-tree-item>
 */
export class UITreeItem extends UIComponent {

  static properties = {
    value:      { type: String,  default: '',    reflect: true },
    disabled:   { type: Boolean, default: false, reflect: true },
    expanded:   { type: Boolean, default: false, reflect: true },
    selected:   { type: Boolean, default: false, reflect: true },
    href:       { type: String,  default: '',    reflect: true },
    target:     { type: String,  default: '',    reflect: true },
    channel:    { type: String,  default: '',    reflect: true },
    background: { type: String,  default: '',    reflect: true },
    color:      { type: String,  default: '',    reflect: true },
    size:       { type: String,  default: '',    reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        user-select: none;
        font-size: var(--_size, inherit);
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.45;
      }

      /* ---- Clickable row ---- */
      .row {
        all: unset;
        display: flex;
        align-items: center;
        gap: 0.35em;
        width: 100%;
        box-sizing: border-box;
        padding: 0.25em 0.5em;
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
        line-height: 1.5;
        color: var(--_color, var(--ui-text-color, inherit));
        background: var(--_bg, transparent);
        text-decoration: none;
        border-radius: var(--ui-radius, 0.25em);
        transition: background-color 0.12s ease;
      }

      .row:hover {
        background: var(--_bg-hover, var(--ui-bg-subtle, rgba(0, 0, 0, 0.06)));
      }

      :host([selected]) .row {
        background: var(--_select-bg, var(--ui-indigo-100, rgba(99, 102, 241, 0.12)));
        color: var(--_select-color, var(--ui-indigo-700, #4338ca));
      }

      :host([selected]) .row:hover {
        background: var(--_select-bg-hover, var(--ui-indigo-200, rgba(99, 102, 241, 0.2)));
      }

      .row:focus-visible {
        outline: 0.125em solid var(--ui-focus-ring, #6366f1);
        outline-offset: -0.125em;
      }

      /* ---- Expand/collapse caret ---- */
      .caret {
        display: none;
        flex-shrink: 0;
        width: 1em;
        height: 1em;
        align-items: center;
        justify-content: center;
        font-size: 0.75em;
        transition: transform 0.15s ease;
      }

      .caret svg {
        width: 1em;
        height: 1em;
        fill: currentColor;
        opacity: 0.55;
      }

      :host([data-has-children]) .caret {
        display: inline-flex;
      }

      :host([expanded]) .caret {
        transform: rotate(90deg);
      }

      /* Spacer for leaf items to align with parent items */
      .spacer {
        display: inline-flex;
        width: 1em;
        flex-shrink: 0;
        font-size: 0.75em;
      }

      :host([data-has-children]) .spacer {
        display: none;
      }

      /* ---- Children group ---- */
      .children {
        display: none;
        flex-direction: column;
        padding-left: 1.25em;
      }

      :host([expanded]) .children {
        display: flex;
      }
    `;
  }

  /* ------------------------------------------------------------------ */
  /*  Lifecycle                                                          */
  /* ------------------------------------------------------------------ */

  constructor() {
    super();
    this._onClick       = this._onClick.bind(this);
    this._onKeyDown     = this._onKeyDown.bind(this);
    this._childObserver = null;
  }

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute('role', 'treeitem');
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '-1');

    // Defer selected-color derivation — child connectedCallback fires before
    // the parent's, so --ui-background-token isn't available yet.
    requestAnimationFrame(() => this._applySelectedColors());

    this.addEventListener('click',   this._onClick);
    this.addEventListener('keydown', this._onKeyDown);

    this._assignSlots();
    this._observeChildren();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click',   this._onClick);
    this.removeEventListener('keydown', this._onKeyDown);
    if (this._childObserver) {
      this._childObserver.disconnect();
      this._childObserver = null;
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Render — completely static, no dependency on child state           */
  /* ------------------------------------------------------------------ */

  render() {
    return `
      <div class="row"${this.disabled ? ' aria-disabled="true"' : ''} part="row">
        <span class="caret" aria-hidden="true">
          <svg viewBox="0 0 16 16"><path d="M6 3l5 5-5 5z"/></svg>
        </span>
        <span class="spacer"></span>
        <slot></slot>
      </div>
      <div class="children" role="group" part="children">
        <slot name="children"></slot>
      </div>
    `;
  }

  /* ------------------------------------------------------------------ */
  /*  Slot distribution                                                  */
  /* ------------------------------------------------------------------ */

  _assignSlots() {
    let hasChildren = false;
    for (const child of this.children) {
      if (child.tagName === 'UI-TREE-ITEM') {
        if (child.getAttribute('slot') !== 'children') {
          child.setAttribute('slot', 'children');
        }
        hasChildren = true;
      }
    }
    if (hasChildren) {
      if (!this.hasAttribute('data-has-children')) {
        this.setAttribute('data-has-children', '');
        this.setAttribute('aria-expanded', this.expanded ? 'true' : 'false');
      }
    } else {
      this.removeAttribute('data-has-children');
      this.removeAttribute('aria-expanded');
    }
  }

  _observeChildren() {
    this._childObserver = new MutationObserver(() => this._assignSlots());
    this._childObserver.observe(this, { childList: true });
  }

  _update() {
    this._applyStyles();
    super._update();
  }

  _applyStyles() {
    this._vars = {};
    const bg = this.background;
    const color = this.color;
    const size = this.size;

    if (bg) {
      this._vars['--_bg'] = resolveColor(bg);
      this._vars['--_bg-hover'] = resolveColorHover(bg);
    }
    if (color) this._vars['--_color'] = resolveColor(color);
    if (size) this._vars['--_size'] = resolveSize(size);

    this._setDynamicVars(this._vars);
  }

  /** Derive selected-state and hover colours from the nearest inherited background token. */
  _applySelectedColors() {
    // Read the raw palette token set by any ancestor's _reflectBackgroundVars().
    const token = getComputedStyle(this).getPropertyValue('--ui-background-token').trim();
    if (!token) return;

    // Hover = 1 shade lighter than the inherited background
    if (!this.background) {
      const hoverBg = resolveColorLighter(token, 1);
      if (hoverBg) this._vars['--_bg-hover'] = hoverBg;
    }

    // Selected bg = 4 shades lighter, selected hover = 3 shades lighter
    // Selected text = 4 shades darker for strong contrast against light bg
    const selectBg = resolveColorLighter(token, 4);
    const selectBgHover = resolveColorLighter(token, 3);
    const selectColor = resolveColorDarker(token, 4);
    if (selectBg) this._vars['--_select-bg'] = selectBg;
    if (selectBgHover) this._vars['--_select-bg-hover'] = selectBgHover;
    if (selectColor) this._vars['--_select-color'] = selectColor;

    this._setDynamicVars(this._vars);
  }

  /* ------------------------------------------------------------------ */
  /*  Expand / collapse                                                  */
  /* ------------------------------------------------------------------ */

  get _hasChildren() {
    return this.hasAttribute('data-has-children');
  }

  expand() {
    if (!this._hasChildren || this.expanded) return;
    this.expanded = true;
    this.setAttribute('aria-expanded', 'true');
    this.emit('ui-expand');
  }

  collapse() {
    if (!this._hasChildren || !this.expanded) return;
    this.expanded = false;
    this.setAttribute('aria-expanded', 'false');
    this.emit('ui-collapse');
  }

  toggle() {
    this.expanded ? this.collapse() : this.expand();
  }

  /* ------------------------------------------------------------------ */
  /*  Selection                                                          */
  /* ------------------------------------------------------------------ */

  select() {
    if (this.disabled) return;
    this.selected = true;
    this.emit('ui-select', { value: this.value, item: this });
  }

  deselect() {
    this.selected = false;
  }

  /* ------------------------------------------------------------------ */
  /*  Event handlers                                                     */
  /* ------------------------------------------------------------------ */

  _onClick(e) {
    if (this.disabled) { e.preventDefault(); return; }

    // Ignore clicks bubbled from nested items
    const origin = e.target.closest('ui-tree-item');
    if (origin && origin !== this) return;

    e.stopPropagation();

    if (this._hasChildren) {
      this.toggle();
    }

    this.select();

    // Navigate if href is set
    if (this.href) {
      if (this.channel) {
        // Dispatch named channel event — let a <ui-include> handle it
        document.dispatchEvent(new CustomEvent(this.channel, {
          bubbles: false,
          detail: { src: this.href, item: this },
        }));
      } else {
        const navEvent = new CustomEvent('ui-navigate', {
          bubbles: true, composed: true, cancelable: true,
          detail: { href: this.href, target: this.target, item: this },
        });
        if (this.dispatchEvent(navEvent)) {
          if (this.target) {
            window.open(this.href, this.target);
          } else {
            window.location.href = this.href;
          }
        }
      }
    }
  }

  _onKeyDown(e) {
    // Only handle if the event targets this item directly
    const origin = e.target.closest('ui-tree-item');
    if (origin && origin !== this) return;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        e.stopPropagation();
        if (this._hasChildren && !this.expanded) {
          this.expand();
        } else if (this._hasChildren && this.expanded) {
          // Focus first child
          const firstChild = this.querySelector(':scope > ui-tree-item:not([disabled])');
          if (firstChild) firstChild.focus();
        }
        break;

      case 'ArrowLeft':
        e.preventDefault();
        e.stopPropagation();
        if (this._hasChildren && this.expanded) {
          this.collapse();
        } else {
          // Focus parent item
          const parent = this.parentElement?.closest('ui-tree-item');
          if (parent) parent.focus();
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        e.stopPropagation();
        this._focusNext();
        break;

      case 'ArrowUp':
        e.preventDefault();
        e.stopPropagation();
        this._focusPrev();
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        e.stopPropagation();
        if (this._hasChildren) this.toggle();
        this.select();
        if (this.href) {
          if (this.channel) {
            document.dispatchEvent(new CustomEvent(this.channel, {
              bubbles: false,
              detail: { src: this.href, item: this },
            }));
          } else {
            const navEvent = new CustomEvent('ui-navigate', {
              bubbles: true, composed: true, cancelable: true,
              detail: { href: this.href, target: this.target, item: this },
            });
            if (this.dispatchEvent(navEvent)) {
              if (this.target) {
                window.open(this.href, this.target);
              } else {
                window.location.href = this.href;
              }
            }
          }
        }
        break;

      case 'Home':
        e.preventDefault();
        e.stopPropagation();
        this._focusFirst();
        break;

      case 'End':
        e.preventDefault();
        e.stopPropagation();
        this._focusLast();
        break;
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Keyboard navigation helpers                                        */
  /* ------------------------------------------------------------------ */

  /** Get all visible tree items in the tree (flattened, depth-first). */
  _getVisibleItems() {
    const tree = this.closest('ui-tree');
    if (!tree) return [];
    return [...tree.querySelectorAll('ui-tree-item:not([disabled])')].filter(item => {
      // An item is visible if all its ancestor items are expanded
      let el = item.parentElement?.closest('ui-tree-item');
      while (el) {
        if (!el.expanded) return false;
        el = el.parentElement?.closest('ui-tree-item');
      }
      return true;
    });
  }

  _focusNext() {
    const items = this._getVisibleItems();
    const idx = items.indexOf(this);
    if (idx >= 0 && idx < items.length - 1) {
      items[idx + 1].focus();
    }
  }

  _focusPrev() {
    const items = this._getVisibleItems();
    const idx = items.indexOf(this);
    if (idx > 0) {
      items[idx - 1].focus();
    }
  }

  _focusFirst() {
    const items = this._getVisibleItems();
    if (items.length) items[0].focus();
  }

  _focusLast() {
    const items = this._getVisibleItems();
    if (items.length) items[items.length - 1].focus();
  }
}

customElements.define('ui-tree-item', UITreeItem);
