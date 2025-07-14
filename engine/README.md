# JChords Engine

The canonical JChords rendering engine. Based heavily on [ChordMark](https://github.com/no-chris/chord-mark/) by Christophe Noël, but with substantial changes.

To run tests:

```sh
npm run sandbox
```

To spin up a quick and dirty sandbox for testing:

```sh
npm run sandbox
```

## TODO

- improve chord rendering
  - transposition
  - make instrumental bars align
  - option to show `%` signs
- Force lyric line symbol

# Markup Language

TODO write this

# Usage

## `parseSong`

`parseSong: (string) => ParsedSong`

Takes the song source markup as a `string`, and returns a `ParsedSong` object, which is an intermediate step that exists to be passed into the [`renderSong`](#rendersong) function.

## `renderSong`

`renderSong: (ParsedSong, RenderOpts) => string`

Takes the a `ParsedSong` object produced by the [`parseSong`](#parsesong) function, and renders it to an HTML string according to the supplied [`RenderOpts`](#type-renderopts)

## Type: `RenderOpts`

Object supplied to the [`renderSong`](#rendersong) function to customize the output.

| Field                   | Type      | Description                                                                                                                                          |
| ----------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alignChordsWithLyrics` | `boolean` | Whether or not to align chords with the position markers (`_`) in the following lyric line if applicable.                                            |
| `showChordDurations`    | `boolean` | Whether or not to render non-lyric aligned chords with symbols indicating their rhythm/duration, e.g. `\|` for separating bars or`.` for beat count. |

## Notes for documentation

### Chord alignments

Tries three ways of rendering chords in the following order of precedence:

1. If applicable, align them with the chord markers in a following lyric line
1. Else if applicable, render them in bars with duration markers, aligning them by "groups" divided by empty lines
1. Else just render the chords with no special alignment
