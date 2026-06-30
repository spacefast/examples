# DevHorizon 2026

A polished marketing-and-schedule site for DevHorizon 2026, a one-day, single-track web
development conference at the Lisbon Congress Centre. The site is a static Astro project
that leads with a full-bleed hero and a live countdown to the first talk, then walks
through everything an attendee needs: an "about" rundown of the single-track format, an
eight-speaker lineup whose cards expand to reveal each talk's abstract, an hour-by-hour
timeline from doors to the river-terrace after-party, Early Bird / Standard / Team ticket
tiers, venue and travel details with nearby hotels, a tiered sponsor wall, an FAQ, a code
of conduct, and a footer with a working newsletter signup. All content lives in a single
`src/data/conf.ts` file, the interactivity (countdown, mobile nav, card expand, signup)
is plain inline script, and the whole thing builds to static HTML with `astro build` —
no backend, ready to publish to Spacefast.
