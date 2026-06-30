# Mia's 30th

A themed birthday-party invite for a fictional rooftop bash, built as a static Astro
project (`site/`, builds to `dist/` with `astro build` — no backend). It opens on a
full-screen hero with the guest of honor's name, the date and venue, a live countdown
to the party, and a gentle confetti shower, then walks a guest through everything they
need: a dress-code callout and a card grid of the practical details (open bar, real
food, weather plan, the no-gifts ask), a host's note, an hour-by-hour run-of-show
timeline, an embedded Google Map with written directions for transit, parking, and
finding the door, and a genuinely working **RSVP form**. The form validates name and
email, branches on accept/decline, reveals a guest count and a +1 name field only when
someone's bringing a date, takes a dietary preference and a song request, and offers a
"can't make it" path with a box to leave the host a birthday note — then shows a
personalized confirmation and remembers the reply on return via `localStorage`. All the
content lives in one `src/data/party.ts` file so changing a single detail updates the
whole page. `prompt.md` is the copy-paste prompt that recreates the site from three
answers and publishes it live to Spacefast.
