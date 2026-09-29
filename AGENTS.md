# AGENTS.md

JChords is a web app for writing, publishing and viewing chord charts, with a focus on simplicity and transposition. Production is at https://jchords.com. Scope and roadmap are in [README.md](README.md).

## Writing style

All writing in this repo must use concise, technical, unembellished, matter-of-fact language. This covers docs, code comments, commit messages, PR descriptions and this file. State facts. Omit filler, enthusiasm and speculation.

This file records durable project facts: architecture, workflows, conventions and design decisions. Do not add transient status here (current bugs, in-progress work, TODOs). Status and plans belong in the README roadmap.

## Repository layout

npm workspaces monorepo.

| Path         | Package            | Contents                                                                                               |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------------------ |
| `engine/`    | `jchords-engine`   | Markup parser and HTML renderer. Pure TypeScript, no DOM. Vitest tests. Vite sandbox in `sandbox/`.    |
| `frontend/`  | `jchords-frontend` | React 19 SPA: Vite, Tailwind v4, Radix, `@preact/signals-react`, react-router v7.                      |
| `backend/`   | `jchords-backend`  | Express app exported as one Firebase Cloud Function, `api`. Node 22, bundled to CommonJS with esbuild. |
| `shared/`    | `jchords-shared`   | API types, runtime type guards and utilities shared by frontend and backend. No build step.            |
| `firestore/` | n/a                | Firestore security rules and emulator seed data (`testdata/`).                                         |

Root files:

- `firebase.json`, `.firebaserc`: Firebase project `jchords-467fa`. Hosting serves `frontend/dist`, rewrites `/api/**` to the `api` function, and rewrites all other paths to `index.html`.
- `flake.nix`, `.envrc`: Nix dev shell with Node 22, firebase-tools, a JDK (required by the emulators) and gcloud. It sets `FIRESTORE_EMULATOR_HOST` and `GOOGLE_APPLICATION_CREDENTIALS=secrets/serviceaccount.json`.
- `secrets/`: gitignored. Never commit credentials.

Packages import each other through `file:` aliases: `engine`, `shared/...`. `engine` resolves to `engine/dist/`, so the frontend only sees engine changes after `npm run build --prefix engine`. `shared` exports its `.ts` sources directly and needs no build.

## Development

### Setup

Enter the dev shell with `direnv allow` or `nix develop`. Without Nix, install Node 22, `firebase-tools` and a JDK. Then:

```sh
npm ci
npm run build --prefix engine
```

### Running locally

Run each command in its own terminal, from the repo root:

```sh
npm run emulator                  # auth :9099, firestore :8080, functions :5001, emulator UI
npm run dev --prefix backend      # esbuild watch -> backend/dist; the functions emulator serves it
npm run dev --prefix frontend     # Vite on :5173
```

- Environment: `frontend/env/.env.development` (dev) points `VITE_API_URL` at the functions emulator. `frontend/env/.env` (prod) points it at `https://jchords.com/api`.
- Auth: the frontend connects to the auth emulator whenever `import.meta.env.DEV` is true.
- Seed data: the emulator imports `firestore/testdata` on start and exports back to it on exit (`--export-on-exit`). Do not commit incidental changes to `firestore/testdata/`. To refresh it from production, follow `firestore/README.md`.
- Mobile testing on the LAN: `opendevports.sh` opens ports 5173 and 9099. The functions emulator is not reachable from other devices; the commented `VITE_API_URL` in `.env.development` switches the API to production.

### Testing and checks

```sh
npm run tests --prefix engine           # vitest (script name is "tests")
npm run sandbox --prefix engine         # interactive engine page
npm run lint                            # eslint, all packages
npm run format                          # prettier, all packages
npx tsc --noEmit -p <engine|frontend|backend>
npm run build --prefix frontend         # production build to frontend/dist
npm run preview --prefix frontend       # build + serve the production bundle
```

- Only the engine has automated tests. Test frontend and backend changes manually against the emulators.
- `npm run preview` uses the production env file, so the preview talks to the production API.

### Production

- Deploys:
  - `npm run deploy-frontend`: Firebase Hosting
  - `npm run deploy-backend`: Cloud Functions
  - `npm run deploy-firestore-rules`
- Each deploy script runs lint first; lint errors block the deploy.
- Deploys affect the live site. Agents must not deploy unless explicitly instructed.

## Architecture

### Data flow

```
editor text ─► engine.parseSong ─► ParsedSong ─► engine.renderSong(opts) ─► HTML string ─► DOM
     │
     └─ PUT /api/song, PATCH /api/song/:id ─► backend (firebase-admin) ─► Firestore `song`
home page ◄─ GET /api/songlist          song page ◄─ GET /api/song/:id, rendered client-side
```

### Engine

- Public API (`engine/src/index.ts`):
  - `parseSong(source): ParsedSong`
  - `renderSong(parsed, opts?): string`
  - `defaultRenderOptions`
  - Types exported with a `JC` prefix (`JCKey`, `JCNote`, `JCRenderOptions`, …).
- Parsing: `engine/parse.ts` splits the source into lines. For each line it tries each line class's static `tryParse(line, state)` in a fixed precedence order; a line that matches nothing else is a lyric line. `ParseState` carries context across lines: current key, time signature and previous chord lines.
- Line types: one class per line type in `engine/lines/`. Each implements `ParsedLine.render(opts, state)`, which returns an HTML fragment.
- Rendering: `renderSong` wraps the fragments in `<pre class="jc-song">`. CSS class names live in `classes.ts`; markup symbols live in `symbols.ts`.
- Rendering may mutate the `ParsedSong` (cached chord strings, lyric marker widths). Parse again before rendering with different options.
- Transposition and accidental preference are render options. Stored source text is never rewritten.
- Individual chord symbols are parsed and rendered by the `chord-symbol` library.

### Backend

- Routes are registered in `backend/src/index.ts`; there is one handler per file in `handlers/`.
- Endpoints:
  - `GET /api/songlist`
  - `PUT /api/song`
  - `GET|PATCH|DELETE /api/song/:id`
  - `GET /api/user/:id`
- Firestore collection `song`:
  - Document ID is the song ID.
  - Document shape: `{ text, info: { title, artist, author } }`. `author` is a Firebase Auth UID.
  - The backend adds `id` to `info` when it returns a song.
- Firestore rules deny all client access. The backend's admin SDK is the only data path.
- Auth:
  - The client sends the raw Firebase ID token in the `authorization` header, with no `Bearer ` prefix.
  - `authenticate()` returns the UID, or `undefined` if the token is invalid.
  - Writes and deletes require the caller's UID to match `info.author`.
- Request bodies: the client sends `JSON.stringify(body)` without a `Content-Type` header, so the body arrives as a string and the handler parses it with `shared/functions/jsonparse`. Change both sides together.

### Frontend

- Routes (`router.tsx`):
  - `/` (home and search) and `/account`, under `HomeLayout`
  - `/editor`
  - `/song/:id`
- API: `functions/api/apifetch.ts` is the only fetch wrapper; it returns `undefined` on any failure. Each endpoint has a typed wrapper in `functions/api/endpoints/` that validates the response with a `shared` guard.
- Editor state: a module-level object of Preact signals (`pages/editor/state/state.ts`), provided through `StateContext`. It holds open tabs (song, `new`, `modified`), the current tab and the auth user. Tabs persist to `localStorage` with a debounce.
- Home pages: a separate `UserContext`.
- Components:
  - Shared UI primitives live in `components/ui/`, built on `radix-ui` primitives and styled with Tailwind plus colocated CSS.
  - Some older components use `@radix-ui/themes`. New code uses `components/ui/`.
- Theme tokens live in `style/theme.css`; CSS files import them through the `@theme` alias.

### Design decisions

- Scope is defined by the goals and non-goals in README.md. Check new features against them; features outside them are rejected by default.
- The engine is self-contained and DOM-free, so it can be tested in isolation and reused outside the app.
- The markup is plain text, derived from ChordMark, and readable without rendering.
- Charts render client-side from source text. The backend stores only source text and metadata.
- The API is same-origin under `/api` through a Hosting rewrite.
- Runtime validation uses hand-written guards (`generateInterfaceChecker`) rather than a schema library.

## Markup language

`engine/src` is authoritative. Update this section whenever the syntax changes.

Each line is classified in this order; the first match wins:

1. Time signature: `3/4`. Only the values in `types/timesignature.ts` are accepted. Default `4/4`.
2. Key declaration: `key G`, `key Bbm`. The keyword is case-insensitive. The first key found becomes `ParsedSong.startingKey`.
3. Section label: `#Verse 1`. Allowed characters: letters, digits, spaces and `-`.
4. Chord line: every token parses as a chord.
   - `C...` means 3 beats.
   - `[Am G]` is a sub-beat group: at least 2 chords in one beat.
   - `%` repeats the previous chord on the same line.
5. Repeat line: `%` repeats the previous chord line; `%%` repeats the one before it.
6. Empty line.
7. Lyric line: anything else. Each `_` marks the position of the next chord from the chord line directly above.

## Code style

These rules are mandatory. Match the surrounding code.

### Formatting

- Prettier config: single quotes, 2-space indent, 100-column width. It also organizes imports and sorts Tailwind classes. Run `npm run format`; do not hand-format or hand-sort imports.
- Code must pass `npm run lint` without new warnings.

### TypeScript

- Strict mode with `noUncheckedIndexedAccess`. Handle `undefined` from indexing explicitly. Use `!` only where an invariant guarantees a value.
- Do not use `any` for new code except at untyped boundaries (raw JSON).
- Prefix intentionally unused variables and parameters with `_`.
- Use `interface` for object shapes and `type` for unions, tuples and aliases.

### Imports

- Always use absolute imports:
  - inside a package: `src/...` (`engine`, `frontend`, `backend`)
  - across packages: `engine` or `shared/...`
- No relative imports.

### Files and naming

- File and directory names are all lowercase with no separators: `songpageheader.tsx`, `getsonglist.ts`.
- Put one primary export per file, and name the file after it.
- Use named exports. Do not add default exports.
- Naming:
  - `PascalCase` for components, classes, types and enums
  - `camelCase` for functions and variables
- Put a UI component's stylesheet next to it: `components/ui/button/{button.tsx,button.css}`.

### React

- Use signals (`signal`, `useSignal`, `useComputed`) for state shared across components; `useState` is acceptable for purely local state.
- Style with Tailwind utility classes in `className`. Use colocated CSS only for component-level styling that Tailwind cannot express cleanly. Use theme tokens instead of raw colors where a token exists.

### Data, API and error handling

- Define every API request or response type in `shared/types/api/` as an interface, with an `isX` guard built with `generateInterfaceChecker` in the same file. Change both together.
- Validate all untrusted data (request bodies, API responses, `localStorage`) with a guard before use.
- Frontend API functions return `undefined` on failure; they do not throw.
- Backend handlers check auth, then validate the body, then check ownership.

### Engine

- The engine must not depend on the DOM, React or Firebase.
- Escape all source text before placing it in HTML output.

### Comments and commits

- Keep comments short. Comment on why, not what.
- Commit messages: a short, lowercase, imperative summary (`add searching on the home page`), plus a body when the change needs explanation. One logical change per commit.
- Work on `main`. The branches `v0` to `v3` on `origin` are archived earlier versions.
