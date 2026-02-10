/**
 * UITheme — Global colour palette & design tokens.
 *
 * Injects a `:root` stylesheet the first time it's imported.
 * Consumers can override any `--ui-*` variable on `:root` or a parent element.
 *
 * Primitive palette (Tailwind-derived, like Shoelace / Web Awesome):
 *   --ui-gray-50 … --ui-gray-950
 *   --ui-red-50  … --ui-red-950
 *   --ui-orange-50 … --ui-orange-950
 *   ... (amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo,
 *        violet, purple, fuchsia, pink, rose)
 *
 * Shared tokens:
 *   --ui-font, --ui-font-mono, --ui-focus-ring, --ui-border-color, etc.
 */

const THEME_ID = 'ui-theme-tokens';

const css = /* css */ `
:root {
  /* ================================================================ */
  /*  Primitive palette (shade 50–950)                                 */
  /*  Derived from the Tailwind CSS colour palette.                    */
  /* ================================================================ */

  /* ---- Gray ---- */
  --ui-gray-50:  #f9fafb;
  --ui-gray-100: #f3f4f6;
  --ui-gray-200: #e5e7eb;
  --ui-gray-300: #d1d5db;
  --ui-gray-400: #9ca3af;
  --ui-gray-500: #6b7280;
  --ui-gray-600: #4b5563;
  --ui-gray-700: #374151;
  --ui-gray-800: #1f2937;
  --ui-gray-900: #111827;
  --ui-gray-950: #030712;

  /* ---- Red ---- */
  --ui-red-50:  #fef2f2;
  --ui-red-100: #fee2e2;
  --ui-red-200: #fecaca;
  --ui-red-300: #fca5a5;
  --ui-red-400: #f87171;
  --ui-red-500: #ef4444;
  --ui-red-600: #dc2626;
  --ui-red-700: #b91c1c;
  --ui-red-800: #991b1b;
  --ui-red-900: #7f1d1d;
  --ui-red-950: #450a0a;

  /* ---- Orange ---- */
  --ui-orange-50:  #fff7ed;
  --ui-orange-100: #ffedd5;
  --ui-orange-200: #fed7aa;
  --ui-orange-300: #fdba74;
  --ui-orange-400: #fb923c;
  --ui-orange-500: #f97316;
  --ui-orange-600: #ea580c;
  --ui-orange-700: #c2410c;
  --ui-orange-800: #9a3412;
  --ui-orange-900: #7c2d12;
  --ui-orange-950: #431407;

  /* ---- Amber ---- */
  --ui-amber-50:  #fffbeb;
  --ui-amber-100: #fef3c7;
  --ui-amber-200: #fde68a;
  --ui-amber-300: #fcd34d;
  --ui-amber-400: #fbbf24;
  --ui-amber-500: #f59e0b;
  --ui-amber-600: #d97706;
  --ui-amber-700: #b45309;
  --ui-amber-800: #92400e;
  --ui-amber-900: #78350f;
  --ui-amber-950: #451a03;

  /* ---- Yellow ---- */
  --ui-yellow-50:  #fefce8;
  --ui-yellow-100: #fef9c3;
  --ui-yellow-200: #fef08a;
  --ui-yellow-300: #fde047;
  --ui-yellow-400: #facc15;
  --ui-yellow-500: #eab308;
  --ui-yellow-600: #ca8a04;
  --ui-yellow-700: #a16207;
  --ui-yellow-800: #854d0e;
  --ui-yellow-900: #713f12;
  --ui-yellow-950: #422006;

  /* ---- Lime ---- */
  --ui-lime-50:  #f7fee7;
  --ui-lime-100: #ecfccb;
  --ui-lime-200: #d9f99d;
  --ui-lime-300: #bef264;
  --ui-lime-400: #a3e635;
  --ui-lime-500: #84cc16;
  --ui-lime-600: #65a30d;
  --ui-lime-700: #4d7c0f;
  --ui-lime-800: #3f6212;
  --ui-lime-900: #365314;
  --ui-lime-950: #1a2e05;

  /* ---- Green ---- */
  --ui-green-50:  #f0fdf4;
  --ui-green-100: #dcfce7;
  --ui-green-200: #bbf7d0;
  --ui-green-300: #86efac;
  --ui-green-400: #4ade80;
  --ui-green-500: #22c55e;
  --ui-green-600: #16a34a;
  --ui-green-700: #15803d;
  --ui-green-800: #166534;
  --ui-green-900: #14532d;
  --ui-green-950: #052e16;

  /* ---- Emerald ---- */
  --ui-emerald-50:  #ecfdf5;
  --ui-emerald-100: #d1fae5;
  --ui-emerald-200: #a7f3d0;
  --ui-emerald-300: #6ee7b7;
  --ui-emerald-400: #34d399;
  --ui-emerald-500: #10b981;
  --ui-emerald-600: #059669;
  --ui-emerald-700: #047857;
  --ui-emerald-800: #065f46;
  --ui-emerald-900: #064e3b;
  --ui-emerald-950: #022c22;

  /* ---- Teal ---- */
  --ui-teal-50:  #f0fdfa;
  --ui-teal-100: #ccfbf1;
  --ui-teal-200: #99f6e4;
  --ui-teal-300: #5eead4;
  --ui-teal-400: #2dd4bf;
  --ui-teal-500: #14b8a6;
  --ui-teal-600: #0d9488;
  --ui-teal-700: #0f766e;
  --ui-teal-800: #115e59;
  --ui-teal-900: #134e4a;
  --ui-teal-950: #042f2e;

  /* ---- Cyan ---- */
  --ui-cyan-50:  #ecfeff;
  --ui-cyan-100: #cffafe;
  --ui-cyan-200: #a5f3fc;
  --ui-cyan-300: #67e8f9;
  --ui-cyan-400: #22d3ee;
  --ui-cyan-500: #06b6d4;
  --ui-cyan-600: #0891b2;
  --ui-cyan-700: #0e7490;
  --ui-cyan-800: #155e75;
  --ui-cyan-900: #164e63;
  --ui-cyan-950: #083344;

  /* ---- Sky ---- */
  --ui-sky-50:  #f0f9ff;
  --ui-sky-100: #e0f2fe;
  --ui-sky-200: #bae6fd;
  --ui-sky-300: #7dd3fc;
  --ui-sky-400: #38bdf8;
  --ui-sky-500: #0ea5e9;
  --ui-sky-600: #0284c7;
  --ui-sky-700: #0369a1;
  --ui-sky-800: #075985;
  --ui-sky-900: #0c4a6e;
  --ui-sky-950: #082f49;

  /* ---- Blue ---- */
  --ui-blue-50:  #eff6ff;
  --ui-blue-100: #dbeafe;
  --ui-blue-200: #bfdbfe;
  --ui-blue-300: #93c5fd;
  --ui-blue-400: #60a5fa;
  --ui-blue-500: #3b82f6;
  --ui-blue-600: #2563eb;
  --ui-blue-700: #1d4ed8;
  --ui-blue-800: #1e40af;
  --ui-blue-900: #1e3a8a;
  --ui-blue-950: #172554;

  /* ---- Indigo ---- */
  --ui-indigo-50:  #eef2ff;
  --ui-indigo-100: #e0e7ff;
  --ui-indigo-200: #c7d2fe;
  --ui-indigo-300: #a5b4fc;
  --ui-indigo-400: #818cf8;
  --ui-indigo-500: #6366f1;
  --ui-indigo-600: #4f46e5;
  --ui-indigo-700: #4338ca;
  --ui-indigo-800: #3730a3;
  --ui-indigo-900: #312e81;
  --ui-indigo-950: #1e1b4b;

  /* ---- Violet ---- */
  --ui-violet-50:  #f5f3ff;
  --ui-violet-100: #ede9fe;
  --ui-violet-200: #ddd6fe;
  --ui-violet-300: #c4b5fd;
  --ui-violet-400: #a78bfa;
  --ui-violet-500: #8b5cf6;
  --ui-violet-600: #7c3aed;
  --ui-violet-700: #6d28d9;
  --ui-violet-800: #5b21b6;
  --ui-violet-900: #4c1d95;
  --ui-violet-950: #2e1065;

  /* ---- Purple ---- */
  --ui-purple-50:  #faf5ff;
  --ui-purple-100: #f3e8ff;
  --ui-purple-200: #e9d5ff;
  --ui-purple-300: #d8b4fe;
  --ui-purple-400: #c084fc;
  --ui-purple-500: #a855f7;
  --ui-purple-600: #9333ea;
  --ui-purple-700: #7e22ce;
  --ui-purple-800: #6b21a8;
  --ui-purple-900: #581c87;
  --ui-purple-950: #3b0764;

  /* ---- Fuchsia ---- */
  --ui-fuchsia-50:  #fdf4ff;
  --ui-fuchsia-100: #fae8ff;
  --ui-fuchsia-200: #f5d0fe;
  --ui-fuchsia-300: #f0abfc;
  --ui-fuchsia-400: #e879f9;
  --ui-fuchsia-500: #d946ef;
  --ui-fuchsia-600: #c026d3;
  --ui-fuchsia-700: #a21caf;
  --ui-fuchsia-800: #86198f;
  --ui-fuchsia-900: #701a75;
  --ui-fuchsia-950: #4a044e;

  /* ---- Pink ---- */
  --ui-pink-50:  #fdf2f8;
  --ui-pink-100: #fce7f3;
  --ui-pink-200: #fbcfe8;
  --ui-pink-300: #f9a8d4;
  --ui-pink-400: #f472b6;
  --ui-pink-500: #ec4899;
  --ui-pink-600: #db2777;
  --ui-pink-700: #be185d;
  --ui-pink-800: #9d174d;
  --ui-pink-900: #831843;
  --ui-pink-950: #500724;

  /* ---- Rose ---- */
  --ui-rose-50:  #fff1f2;
  --ui-rose-100: #ffe4e6;
  --ui-rose-200: #fecdd3;
  --ui-rose-300: #fda4af;
  --ui-rose-400: #fb7185;
  --ui-rose-500: #f43f5e;
  --ui-rose-600: #e11d48;
  --ui-rose-700: #be123c;
  --ui-rose-800: #9f1239;
  --ui-rose-900: #881337;
  --ui-rose-950: #4c0519;

  /* ================================================================ */
  /*  Shared UI tokens                                                 */
  /* ================================================================ */

  --ui-font:            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                        "Helvetica Neue", Helvetica, Arial, sans-serif;
  --ui-font-mono:       ui-monospace, SFMono-Regular, "SF Mono", Menlo,
                        Consolas, "Liberation Mono", monospace;
  --ui-focus-ring:      var(--ui-indigo-500);
  --ui-border-color:    var(--ui-gray-300);
  --ui-text-color:      var(--ui-gray-900);
  --ui-text-muted:      var(--ui-gray-500);
  --ui-bg:              #fff;
  --ui-bg-subtle:       var(--ui-gray-50);
  --ui-radius:          0.375em;
  --ui-button-radius:   var(--ui-radius);
}
`;

/**
 * Inject the theme stylesheet into the document head (once).
 * Safe to call multiple times — it's a no-op after the first injection.
 */
export function installTheme() {
  if (typeof document === 'undefined') return;            // SSR guard
  if (document.getElementById(THEME_ID)) return;          // already injected

  const style = document.createElement('style');
  style.id = THEME_ID;
  style.textContent = css;
  document.head.prepend(style);                           // prepend so user styles win
}

// Auto-install on import.
installTheme();
