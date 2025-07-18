# JChords Engine

The canonical JChords rendering engine. Uses a custom sheet music [markup language](#markup-language), based heavily on [ChordMark](https://github.com/no-chris/chord-mark/) by Christophe Noël, but with substantial changes.

To run tests:

```sh
npm run tests
```

To spin up a quick and dirty sandbox for testing:

```sh
npm run sandbox
```

## TODO

- improve chord rendering
  - make instrumental bars align
  - option to show `%` signs
- Force lyric line symbol
- Fix accidental rendering (Chord symbol seems to always default to sharps, disregarding the key or original accidental mark)

# Markup Language

## Lyrics

TODO

## Chords

TODO

Tries three ways of rendering chords in the following order of precedence:

1. If applicable, align them with the chord markers in a following lyric line
1. Else if applicable, render them in bars with duration markers, aligning them by "groups" divided by empty lines
1. Else just render the chords with no special alignment

## Time Signatures

The time signature of the song is used when showing chord lines that aren't associated with any lyrics. The default time signature of every song is 4/4, but it can be set/changed at any point in the song by writing the new time signature on a line by itself, like so...

```
4/4
```

or...

```
6/8
```

> [!NOTE]
> Only relatively common time signatures are supported. See `src/types/timesignature.ts` to see all supported time signatures.

##

# API

## `parseSong`

`parseSong: (string) => ParsedSong`

Takes the song source markup as a `string`, and returns a `ParsedSong` object, which is an intermediate step that exists to be passed into the [`renderSong`](#rendersong) function.

## `renderSong`

`renderSong: (ParsedSong, RenderOpts) => string`

Takes the a `ParsedSong` object produced by the [`parseSong`](#parsesong) function, and renders it to an HTML string according to the supplied [`RenderOpts`](#type-renderopts)

## Type: `RenderOpts`

Object supplied to the [`renderSong`](#rendersong) function to customize the output.

| Field                   | Type                                | Description                                                                                                                                          |
| ----------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accidentalPreference`  | `'flats' \| 'sharps' \| 'original'` | When rendering chords and keys, should the renderer prefer sharps, flats, or make its own decision.                                                  |
| `alignChordsWithLyrics` | `boolean`                           | Whether or not to align chords with the position markers (`_`) in the following lyric line if applicable.                                            |
| `showChordDurations`    | `boolean`                           | Whether or not to render non-lyric aligned chords with symbols indicating their rhythm/duration, e.g. `\|` for separating bars or`.` for beat count. |
| `transpose`             | `number`                            | How many semitones up or down to transpose the song.                                                                                                 |
