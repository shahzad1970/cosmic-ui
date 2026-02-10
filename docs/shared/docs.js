/* ============================================================
   Cosmic UI — Docs shared JavaScript
   ============================================================ */

/**
 * Toggle the sidebar navigation by flipping the `nav-open` attribute
 * on the nearest `<ui-app>` ancestor.
 */
export function initHamburger() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.hamburger');
    if (!btn) return;

    const app = document.querySelector('ui-app');
    if (!app) return;

    const isOpen = app.hasAttribute('nav-open');
    if (isOpen) {
      app.removeAttribute('nav-open');
    } else {
      app.setAttribute('nav-open', '');
    }
  });
}

/** Extract the page filename from a pathname, e.g. '/docs/pages/details.html' → 'details.html' */
function pageFromPath(pathname) {
  let seg = (pathname || '').split('/').pop();
  if (!seg || seg === 'index.html' || seg === 'index') return 'home.html';
  // Ensure .html extension (handles clean-URL paths like /docs/pages/details)
  if (!seg.includes('.')) seg += '.html';
  return seg;
}

/**
 * Mark the matching tree item as selected (deselect others).
 */
export function highlightActiveLink(activePage) {
  const current = activePage || pageFromPath(location.pathname);
  document.querySelectorAll('ui-tree-item[href]').forEach((item) => {
    const href = item.getAttribute('href') || '';
    if (href === current) {
      item.setAttribute('selected', '');
    } else {
      item.removeAttribute('selected');
    }
  });
}

/**
 * Wire up clean-URL routing that complements the channel-based
 * navigation built into <ui-include> + <ui-tree-item>.
 */
export function initRouting() {
  // Derive the base directory from the current page location
  const basePath = location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1);

  // Listen for the same channel event to update URL, highlight, etc.
  document.addEventListener('docs-nav', (e) => {
    const href = e.detail?.src;
    if (!href) return;

    // Push a clean URL without .html: /docs/pages/details
    const slug = href.replace(/\.html$/, '');
    history.pushState(null, '', basePath + slug);

    // Update active highlight
    highlightActiveLink(href);

    // On mobile, close the nav
    if (window.innerWidth <= 768) {
      const app = document.querySelector('ui-app');
      if (app) app.removeAttribute('nav-open');
    }

    // Scroll main to top
    const main = document.querySelector('ui-app-main');
    if (main) main.scrollTop = 0;
  });

  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    const page = pageFromPath(location.pathname);
    const mainInclude = document.querySelector('ui-app-main ui-include');
    if (mainInclude) {
      const base = mainInclude.getAttribute('base') || '';
      mainInclude.setAttribute('src', base + page);
    }
    highlightActiveLink(page);
  });
}

/* Auto-init when the DOM is ready */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initHamburger();
    initRouting();

    // Restore the correct partial from the URL path on reload
    const page = pageFromPath(location.pathname);
    if (page && page !== 'home.html') {
      const mainInclude = document.querySelector('ui-app-main ui-include');
      if (mainInclude) {
        const base = mainInclude.getAttribute('base') || '';
        mainInclude.setAttribute('src', base + page);
      }
    }

    // Nav links are loaded via <ui-include>, so wait for the load event.
    const navInclude = document.querySelector('ui-app-nav ui-include');
    if (navInclude) {
      navInclude.addEventListener('ui-load', () => highlightActiveLink());
    } else {
      highlightActiveLink();
    }
  });
}
