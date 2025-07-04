JChords Engine

Run `npm run tests` to run tests

Run `npm run sandbox` for a quick and dirty sandbox for testing the rendering.

TODO
  - a lot

Based heavily on ChordMark by Christophe Noël (https://github.com/no-chris/chord-mark/),
but with the following changes:
  - Chord lines with a following lyric line do not render bar separators or
  chord durations at all.
  - Bar separators are horizontally aligned across chord lines, but 
  unlike ChordMark, the alignment does not cross empty lines(? or maybe sections?).
  - Key declaration is case-insensitive and whitespace-agnostic
  - Better error reporting
    - Invalid keys will be highlighted as an error, rather than being treated as lyrics