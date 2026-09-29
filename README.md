![](docs/underconstruction.gif)

# JChords

A web app for writing, sharing and using chord charts. Live at [jchords.com](https://jchords.com).

## Scope

JChords does two things well: transposing chord charts, and staying out of the way. Ultimate Guitar covers tabs and fingerings well, but it is weak at transposition and too heavy for simply reading and playing a chart.

### Goals

- **Uncluttered and uncomplicated** - Writing, searching, and reading chord charts
- **Strong transposition** - Any chart in any key, quickly and easily
- **Plain-text** - Charts are quick to write, and still readable without rendering
- **Portable/robust** - Charts work on a phone on a music stand as well as on a desktop.

Things like tabs, fingerings, and other extraneous features are decidedly out of scope.

## Development

See [AGENTS.md](AGENTS.md) for setup, commands, architecture and code style. Quick start:

```sh
npm ci
npm run build --prefix engine
npm run emulator              # terminal 1
npm run dev --prefix backend  # terminal 2
npm run dev --prefix frontend # terminal 3, http://localhost:5173
```

## Roadmap

### Stabilize

- Get `main` building and linting cleanly.
- Bring the engine tests up to date.
- Add CI (lint, type-check, test, build).
- Escape user-supplied text in rendered output: lyrics, and titles on the home page.

### Before initial release

- Engine rewrite
  - Make the format beat- and bar-agnostic: bars appear only where the writer places them, with no beat counting or duration-based layout. This removes most of the engine's complexity and makes the format more flexible
  - Document the markup
  - Rewrite the welcome song as a syntax tutorial
- UI rewrite
  - Give the app a professional look before v1
  - Settle on one component system
  - Make the site work well on mobile
- Public and private songs, and a "my songs" view
- Server-side search and pagination
- Email verification and account management
- Nashville numerals

### Future features

- Likes
- Playlists/setlists
- Profile pictures
- Dark mode
- Import from ChordPro and chords-over-lyrics text
- Print and PDF export
