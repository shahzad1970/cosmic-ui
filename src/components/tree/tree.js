import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor, resolveColorHover } from '../../core/ui-utils.js';

/**
 * `<ui-tree>` — A hierarchical tree view container.
 *
 * Wraps `<ui-tree-item>` children in a navigable tree structure with
 * keyboard support, selection management, and optional multi-select.
 *
 * @element ui-tree
 *
 * @attr {String}  size       - Font-size keyword or CSS length
 * @attr {String}  background - Selection highlight colour (palette token or CSS colour)
 * @attr {Boolean} multiselect - Allow selecting multiple items at once
 *
 * @slot (default) - `<ui-tree-item>` children that form the tree nodes
 *
 * @fires ui-select - Bubbles from items; detail: { value, item }
 *
 * @example
 *   <ui-tree>
 *     <ui-tree-item>
 *       <ui-icon name="folder"></ui-icon> src
 *       <ui-tree-item value="main">main.js</ui-tree-item>
 *       <ui-tree-item value="utils">utils.js</ui-tree-item>
 *     </ui-tree-item>
 *     <ui-tree-item value="readme">README.md</ui-tree-item>
 *   </ui-tree>
 */
export class UITree extends UIComponent {

  static properties = {
    size:        { type: String,  default: '',    reflect: true },
    color:       { type: String,  default: '',    reflect: true },
    background:  { type: String,  default: '',    reflect: true },
    multiselect: { type: Boolean, default: false, reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        line-height: 1.5;
      }
    `;
  }

  /* ------------------------------------------------------------------ */
  /*  Lifecycle                                                          */
  /* ------------------------------------------------------------------ */

  constructor() {
    super();
    this._onItemSelect = this._onItemSelect.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute('role', 'tree');

    this.addEventListener('ui-select', this._onItemSelect);

    // Make the first item focusable by default
    this._ensureTabIndex();
    this._observeSlot();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('ui-select', this._onItemSelect);
    if (this._slotObserver) {
      this._slotObserver.disconnect();
      this._slotObserver = null;
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */

  render() {
    return `<slot></slot>`;
  }

  /* ------------------------------------------------------------------ */
  /*  Selection management                                               */
  /* ------------------------------------------------------------------ */

  _onItemSelect(e) {
    const item = e.detail?.item;
    if (!item) return;

    if (!this.multiselect) {
      // Deselect all other items
      for (const sel of this.querySelectorAll('ui-tree-item[selected]')) {
        if (sel !== item) sel.deselect();
      }
    }
  }

  /** Get all currently selected items. */
  get selectedItems() {
    return [...this.querySelectorAll('ui-tree-item[selected]')];
  }

  /** Get all selected values. */
  get selectedValues() {
    return this.selectedItems.map(item => item.value);
  }

  /* ------------------------------------------------------------------ */
  /*  Tab index management                                               */
  /* ------------------------------------------------------------------ */

  /** Ensure at least the first root item is in the tab order. */
  _ensureTabIndex() {
    const first = this.querySelector(':scope > ui-tree-item:not([disabled])');
    if (first && first.getAttribute('tabindex') === '-1') {
      first.setAttribute('tabindex', '0');
    }
  }

  _observeSlot() {
    this._slotObserver = new MutationObserver(() => this._ensureTabIndex());
    this._slotObserver.observe(this, { childList: true });
  }

  /* ------------------------------------------------------------------ */
  /*  Styling helpers                                                    */
  /* ------------------------------------------------------------------ */

  _applyStyles() {
    const vars = {};
    const sz = resolveSize(this.size);
    if (sz) vars['font-size'] = sz;
    if (this.color) {
      const c = resolveColor(this.color);
      if (c) vars['color'] = c;
    }

    if (this.background) {
      const bg = resolveColor(this.background);
      if (bg) {
        const hoverBg = resolveColorHover(this.background) || bg;
        vars['--_tree-select-bg'] = bg;
        vars['--_tree-select-bg-hover'] = hoverBg;
      }
    }

    this._setDynamicVars(vars);
  }

  _update() {
    this._applyStyles();
    super._update();
  }

  /* ------------------------------------------------------------------ */
  /*  Public API                                                         */
  /* ------------------------------------------------------------------ */

  /** Expand all items in the tree. */
  expandAll() {
    for (const item of this.querySelectorAll('ui-tree-item[data-has-children]')) {
      item.expand();
    }
  }

  /** Collapse all items in the tree. */
  collapseAll() {
    for (const item of this.querySelectorAll('ui-tree-item[data-has-children]')) {
      item.collapse();
    }
  }

  /** Deselect all items. */
  deselectAll() {
    for (const item of this.querySelectorAll('ui-tree-item[selected]')) {
      item.deselect();
    }
  }
}

customElements.define('ui-tree', UITree);
