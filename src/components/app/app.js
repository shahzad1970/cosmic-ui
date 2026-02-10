import { UIComponent } from '../../core/ui-component.js';
import { resolveColor, resolveSize } from '../../core/ui-utils.js';

/**
 * `<ui-app>` — Application root container.
 *
 * Wraps the entire application, providing:
 *  - Full-viewport sizing (height: 100dvh in app shell mode)
 *  - Normal page scrolling when `page` attribute is set
 *  - Base font, text colour, and background from theme tokens
 *  - A built-in CSS reset so consumers don't need a separate stylesheet
 *
 * Place as the only child of `<body>`:
 *
 * @element ui-app
 *
 * @attr {Boolean} page - Use normal page scrolling instead of fixed app shell
 * @attr {Boolean} nav-open - Show the navigation panel (useful on mobile where it is hidden by default)
 *
 * @slot (default) - Application content
 *
 * @example
 *   <body>
 *     <ui-app>
 *       <ui-app-banner background="indigo-600">My App</ui-app-banner>
 *       <ui-app-header>Dashboard</ui-app-header>
 *       <ui-app-subheader>Overview · Analytics</ui-app-subheader>
 *       <ui-app-drawer>Sidebar</ui-app-drawer>
 *       <ui-app-main-header>Page Title</ui-app-main-header>
 *       <ui-app-main>Content</ui-app-main>
 *       <ui-app-main-footer>Status</ui-app-main-footer>
 *       <ui-app-nav-header>Nav Title</ui-app-nav-header>
 *       <ui-app-nav>Right panel</ui-app-nav>
 *       <ui-app-nav-footer>Nav Footer</ui-app-nav-footer>
 *       <ui-app-footer>© 2026</ui-app-footer>
 *     </ui-app>
 *   </body>
 */
export class UIApp extends UIComponent {
  static properties = {
    page:       { type: Boolean, default: false, reflect: true },
    navOpen:    { type: Boolean, default: false, reflect: true, attribute: 'nav-open' },
    background: { type: String, default: '', reflect: true },
    color:      { type: String, default: '', reflect: true },
    size:       { type: String, default: '', reflect: true },
  };

  static styles() {
    return /* css */ `
      /* ============================================================ */
      /*  Application shell — CSS Grid layout                         */
      /*                                                               */
      /*  ┌────────────────────────────────────────────────┐           */
      /*  │  banner                                        │           */
      /*  │  header                                        │           */
      /*  │  subheader                                     │           */
      /*  ├──────────────┬───────────────────────┬─────────┤           */
      /*  │ nav-header   │  main-header          │ drawer  │           */
      /*  ├──────────────┤───────────────────────┤         │           */
      /*  │ nav          │  main                 │         │           */
      /*  ├──────────────┤───────────────────────┤         │           */
      /*  │ nav-footer   │  main-footer          │         │           */
      /*  ├──────────────┴───────────────────────┴─────────┤           */
      /*  │  footer                                        │           */
      /*  └────────────────────────────────────────────────┘           */
      /* ============================================================ */

      :host {
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows:
          auto            /* banner      */
          auto            /* header      */
          auto            /* subheader   */
          auto            /* nav-header / main-header */
          1fr             /* nav / main (fills remaining) */
          auto            /* nav-footer / main-footer */
          auto;           /* footer      */
        grid-template-areas:
          "banner       banner        banner"
          "header       header        header"
          "subheader    subheader     subheader"
          "nav-header   main-header   drawer"
          "nav          main          drawer"
          "nav-footer   main-footer   drawer"
          "footer       footer        footer";
        height: 100dvh;
        overflow-y: auto;

        /* Base typography & colours from theme tokens */
        font-family: var(--ui-font, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif);
        font-size: var(--_size, 1rem);
        line-height: 1.5;
        color: var(--_color, var(--ui-text-color, #111827));
        background: var(--_bg, var(--ui-bg, #fff));

        /* Smooth text rendering */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;

        /* Prevent horizontal overflow */
        overflow-x: hidden;
        box-sizing: border-box;
      }

      /* Page mode — normal scrolling document instead of fixed app shell. */
      :host([page]) {
        height: auto;
        min-height: 100dvh;
        overflow-y: visible;
      }

      /* ---- Grid area assignments ---- */
      ::slotted(ui-app-banner)      { grid-area: banner; }
      ::slotted(ui-app-header)      { grid-area: header; }
      ::slotted(ui-app-subheader)   { grid-area: subheader; }
      ::slotted(ui-app-drawer)      { grid-area: drawer; }
      ::slotted(ui-app-main-header) { grid-area: main-header; }
      ::slotted(ui-app-main)        { grid-area: main; }
      ::slotted(ui-app-main-footer) { grid-area: main-footer; }
      ::slotted(ui-app-nav-header)  { grid-area: nav-header; }
      ::slotted(ui-app-nav)         { grid-area: nav; }
      ::slotted(ui-app-nav-footer)  { grid-area: nav-footer; }
      ::slotted(ui-app-footer)      { grid-area: footer; }

      /* When drawer/nav aren't present, main area should span full width.
         This is handled naturally by CSS Grid — empty columns collapse to 0. */

      /* ---- Nav is hidden by default; toggle via nav-open attribute ---- */
      ::slotted(ui-app-nav),
      ::slotted(ui-app-nav-header),
      ::slotted(ui-app-nav-footer) {
        display: none;
      }

      :host([nav-open]) ::slotted(ui-app-nav),
      :host([nav-open]) ::slotted(ui-app-nav-header),
      :host([nav-open]) ::slotted(ui-app-nav-footer) {
        display: block;
      }

      /* ============================================================ */
      /*  Responsive — collapse to single-column on small screens     */
      /* ============================================================ */
      @media (max-width: 768px) {
        :host {
          grid-template-columns: 1fr;
          grid-template-rows:
            auto   /* banner      */
            auto   /* header      */
            auto   /* subheader   */
            auto   /* main-header */
            1fr    /* main        */
            auto   /* main-footer */
            auto;  /* footer      */
          grid-template-areas:
            "banner"
            "header"
            "subheader"
            "main-header"
            "main"
            "main-footer"
            "footer";
        }

        /* Hide side panels on mobile by default */
        ::slotted(ui-app-nav),
        ::slotted(ui-app-nav-header),
        ::slotted(ui-app-nav-footer),
        ::slotted(ui-app-drawer) {
          display: none;
        }

        /* When nav-open is toggled on mobile, show nav as full-width panel */
        :host([nav-open]) {
          grid-template-rows:
            auto   /* banner      */
            auto   /* header      */
            auto   /* subheader   */
            auto   /* nav-header  */
            1fr    /* nav         */
            auto   /* nav-footer  */
            auto;  /* footer      */
          grid-template-areas:
            "banner"
            "header"
            "subheader"
            "nav-header"
            "nav"
            "nav-footer"
            "footer";
        }

        /* Hide main content when nav is open on mobile */
        :host([nav-open]) ::slotted(ui-app-main),
        :host([nav-open]) ::slotted(ui-app-main-header),
        :host([nav-open]) ::slotted(ui-app-main-footer),
        :host([nav-open]) ::slotted(ui-app-drawer) {
          display: none;
        }
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._injectGlobalReset();
    this._applyDynamicStyles();
  }

  _onPropertyChanged(name, oldVal, newVal) {
    if (name === 'background' || name === 'color' || name === 'size') {
      this._applyDynamicStyles();
    }
  }

  /** Apply background, color, and size only when explicitly set. */
  _applyDynamicStyles() {
    const vars = {};
    if (this.background) vars['--_bg'] = resolveColor(this.background);
    if (this.color)      vars['--_color'] = resolveColor(this.color);
    if (this.size)       vars['--_size'] = resolveSize(this.size);
    this._setDynamicVars(vars);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Remove the global reset only if no other <ui-app> instances remain.
    if (typeof document !== 'undefined' && !document.querySelector('ui-app')) {
      const reset = document.getElementById('ui-app-reset');
      if (reset) reset.remove();
    }
  }

  render() {
    return '<slot></slot>';
  }

  /**
   * Inject a minimal global reset onto `<html>` and `<body>` so consumers
   * don't need a separate reset stylesheet. Idempotent — only runs once.
   * @private
   */
  _injectGlobalReset() {
    if (typeof document === 'undefined') return;
    if (document.getElementById('ui-app-reset')) return;

    // Ensure viewport meta is present for mobile responsiveness.
    if (!document.querySelector('meta[name="viewport"]')) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(meta);
    }

    const style = document.createElement('style');
    style.id = 'ui-app-reset';
    style.textContent = /* css */ `
      *, *::before, *::after {
        box-sizing: border-box;
      }

      html {
        /* Prevent iOS text-size inflation */
        -webkit-text-size-adjust: 100%;
        text-size-adjust: 100%;
      }

      body {
        margin: 0;
        padding: 0;
      }

      img, picture, video, canvas, svg {
        display: block;
        max-width: 100%;
      }

      input, button, textarea, select {
        font: inherit;
      }

      p, h1, h2, h3, h4, h5, h6 {
        overflow-wrap: break-word;
      }
    `;
    document.head.appendChild(style);
  }
}

customElements.define('ui-app', UIApp);
