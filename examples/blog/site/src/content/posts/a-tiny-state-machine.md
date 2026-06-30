---
title: A Tiny State Machine in 40 Lines of JavaScript
description: Half the bugs I've shipped were really impossible states I forgot to forbid. A finite state machine you can read in one sitting fixes more of them than any library I've reached for.
pubDate: 2026-05-27
tags: ['javascript', 'patterns', 'code']
---

Most UI bugs aren't logic errors. They're *state* errors — the spinner that
keeps spinning after an error, the form you can submit twice, the modal that's
somehow both open and closed. They happen because we model state with a pile of
loose booleans (`isLoading`, `hasError`, `isOpen`) and nothing stops two of them
from being true at once.

A finite state machine forbids those combinations by construction. You don't
need XState to get the benefit. You need about forty lines.

## The whole machine

```js
// A minimal finite state machine.
// `spec` maps each state to its allowed { event: nextState } transitions.
export function createMachine(spec, initial) {
  let state = initial;
  const listeners = new Set();

  function send(event) {
    const transitions = spec[state];
    const next = transitions && transitions[event];

    if (!next) {
      // Illegal transition: ignore it loudly instead of corrupting state.
      console.warn(`Ignored "${event}" while in "${state}"`);
      return state;
    }

    state = next;
    for (const fn of listeners) fn(state, event);
    return state;
  }

  return {
    get state() {
      return state;
    },
    send,
    can: (event) => Boolean(spec[state] && spec[state][event]),
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
```

That's the engine. The interesting part is what you do with it.

## Modeling a fetch that can't lie

Here's the classic async flow, but now the impossible states simply don't
exist. There is no way to be `loading` and `error` at the same time, because
`loading` only knows how to become `success` or `failure`.

```js
const request = createMachine(
  {
    idle: { FETCH: 'loading' },
    loading: { RESOLVE: 'success', REJECT: 'failure' },
    success: { FETCH: 'loading' },
    failure: { FETCH: 'loading', RETRY: 'loading' },
  },
  'idle'
);

// Drive your UI off a single source of truth.
request.subscribe((state) => {
  button.disabled = state === 'loading';
  spinner.hidden = state !== 'loading';
  errorBox.hidden = state !== 'failure';
});

async function load(url) {
  if (!request.can('FETCH')) return; // double-click? politely ignored.
  request.send('FETCH');
  try {
    const data = await fetch(url).then((r) => r.json());
    request.send('RESOLVE');
    render(data);
  } catch {
    request.send('REJECT');
  }
}
```

Notice `request.can('FETCH')`. The double-submit bug — the one where an
impatient user clicks twice and you fire two requests — is gone for free,
because `loading` has no `FETCH` transition. The machine *can't* start a second
fetch. You didn't write a guard; you described reality.

## Why this beats a pile of booleans

With three booleans you have eight possible combinations and only three of them
are legal. Every component that reads that state has to remember which five are
nonsense. With a machine you have exactly the states you named, and the
transition table is a single, readable map of what's allowed to happen next.

> The boolean version asks "is this combination valid?" on every render. The
> machine version makes invalid combinations unrepresentable.

I reach for this constantly now — toggles, multi-step forms, media players,
onboarding flows. Anything with more than two states and a few rules about how
you move between them. It's not a framework. It's a habit, and it fits in a
file you can read before your coffee gets cold.
