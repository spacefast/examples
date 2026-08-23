# Sam Rivera — CV

A clean, single-page web resume for a fictional senior product designer, built as a
no-build-step plain HTML & CSS site (`site/index.html` plus a small CSS and JS file).
It pairs an editorial "paper card" layout — serif headings, a deep-evergreen accent,
and a two-column main/sidebar grid that stacks on mobile — with a contact header,
a Profile blurb, an Experience timeline whose bullets lead with concrete outcomes,
a Selected-work link list, a Skills sidebar of tag chips and proficiency meters that
animate in on scroll, and Education / "beyond work" blocks.

A dedicated `@media print` stylesheet turns the page into a clean one-page PDF —
hiding the toolbar and badge, switching to high-contrast black ink, and keeping roles
from breaking across pages — driven by a "Download PDF" button that calls
`window.print()`. `prompt.md` is the copy-paste prompt that recreates the site from
a few answers and publishes it live to Spacefast.
