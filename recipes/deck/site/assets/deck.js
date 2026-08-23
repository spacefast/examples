/* Northwind seed deck — reveal.js init, PDF export, and help overlay.
   reveal.js v5 ships its own print-view controller: navigating with ?print-pdf
   in the URL paginates the deck for clean PDF output (File → Print → Save as PDF),
   so no external print stylesheet is needed. */

const deck = new Reveal({
  hash: true,
  controls: true,
  progress: true,
  slideNumber: 'c/t',
  overview: true,
  transition: 'slide',
  transitionSpeed: 'default',
  backgroundTransition: 'fade',
  center: false,
  width: 1280,
  height: 800,
  margin: 0.06,
  minScale: 0.2,
  maxScale: 1.6,
  plugins: [RevealHighlight, RevealNotes],
});

deck.initialize();

/* ── Help overlay (press ? to toggle, E to export PDF) ── */
const help = document.getElementById('help');
const closeBtn = help.querySelector('.help-x');

function toggleHelp(show) {
  const next = typeof show === 'boolean' ? show : help.hasAttribute('hidden');
  if (next) help.removeAttribute('hidden');
  else help.setAttribute('hidden', '');
}

closeBtn.addEventListener('click', () => toggleHelp(false));
help.addEventListener('click', (e) => { if (e.target === help) toggleHelp(false); });

document.addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  // Don't hijack keys while a text field is focused.
  if (e.target && /^(input|textarea|select)$/i.test(e.target.tagName)) return;

  if (e.key === '?') {
    e.preventDefault();
    toggleHelp();
  } else if (e.key === 'Escape' && !help.hasAttribute('hidden')) {
    e.preventDefault();
    toggleHelp(false);
  } else if (e.key === 'e' || e.key === 'E') {
    // Jump into print-pdf mode, then open the print dialog.
    const url = new URL(window.location.href);
    if (!/print-pdf/gi.test(url.search)) {
      url.searchParams.set('print-pdf', '');
      window.location.href = url.toString();
    } else {
      window.print();
    }
  }
});

// If we arrived already in print-pdf mode (the E shortcut reloaded us), give the
// layout a beat to settle, then open the print dialog automatically.
if (/print-pdf/gi.test(window.location.search)) {
  window.addEventListener('load', () => setTimeout(() => window.print(), 700));
}
