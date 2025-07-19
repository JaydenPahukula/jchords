# JChords Engine

The canonical JChords rendering engine. Uses a custom sheet music [markup language](#markup-language-guide), based heavily on [ChordMark](https://github.com/no-chris/chord-mark/) by Christophe Noël, but with substantial changes.

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
  - option to show `%` signs
- Force lyric line symbol
- Fix accidental rendering (Chord symbol seems to always default to sharps, disregarding the key or original accidental mark)

# Markup Language Guide

The following is a _moderately_ comprehensive overview of the JChords sheet music markup language.

## Lyrics

To write lyrics, simply write them out on a line, like so:

```
Do you remember those days hanging out at the village green
```

In the rare case where the engine may mistake lyrics for another line type, you can start the line with a colon (`:`), which forces the engine to treat the line as a lyric line.

## Sections

Section labels can be defined by a line starting with a hashtag (`#`). Whatever follows the hashtag and following whitespace will be rendered as a section label.

```
# Verse 2
```

turns into...

```
Verse 2
```

## Chords

Chords are defined by writing out the chord symbols on a line separated by whitespace, like so:

```
G F E A/F#
```

To repeat the previous chord, you can write `%` in place of a chord. For example:

```
G/E % D %
```

turns into...

```
G/E G/E D D
```

To repeat the entire last line of chords, put `%` on a line by itself (or `%%` to repeat the second-to-last line), like so:

```
G G/F G/E D
%
```

turns into...

```
G G/F G/E D
G G/F G/E D
```

> [!NOTE]
> Only the common western letter notation has been well tested in the context of this engine, but chord parsing is handled by the [ChordSymbol](https://github.com/no-chris/chord-symbol) library, which has support for more diverse inputs. This may become officially supported in the future.

## Chord Alignment

### Aligning with lyrics

If there is a lyric line immediately following a chord line (and if the `alignChordsWithLyrics` render option is not `false`) the engine will try to align chords with position markers (`_`) in the following lyric line.

```
# Verse
F Gm
_A bottle of white, _a bottle of red
C Bb F
_Perhaps a bottle of ro_se instead
```

turns into...

```
Verse
F                   Gm
A bottle of white,  a bottle of red
C                     Bb        F
Perhaps a bottle of rose instead
```

Chords that do not have an associated position marker will just be placed after the last lyric.

### Aligning by bars

If the chords aren't lyric aligned (and if the `showChordTimings` render option is not `false`) the engine will try to render the chords in bars, expressing their duration/timing.

To program chord durations, use dots (`.`) to specify the chord's duration. A chord with no dots is assumed to be a full bar in length. The engine will use the current [time signature](#time-signatures) to render the chords in bars, showing periods when necessary.

```
# Outro
C.. F.. Bb
C.. F.. Bb
D.. Em.. F.. G..
F.. Em. D. C
```

turns into...

```
Outro
|C    F     |Bb    |
|C    F     |Bb    |
|D    Em    |F  G  |
|F.. Em. D. |C     |
```

> [!NOTE]
> Specifying durations will have no effect on the output if the chord line is rendered with lyric alignment.

### Unaligned chords

If both previous alignments fail or are disabled in the render options, the chords will simply be printed on a line like so:

```
C F Bb
```

## Time Signatures

To set the time signature of the song (which is used when rendering chord durations), simply write the time signature on a line by itself in the form `X/Y`, like so:

```
4/4
```

or...

```
6/8
```

Time signatures can be set/changed at any point in the song, as many times as appropriate. The time signature will default to `4/4` when no time signature has been set.

> [!NOTE]
> Only relatively common time signatures are supported. See `src/types/timesignature.ts` to see all supported time signatures.

## Key Declaration

# API

## `parseSong: (string) => ParsedSong`

Takes the song source markup as a `string`, and returns a `ParsedSong` object, which is an intermediate step that exists to be passed into the [`renderSong`](#rendersong) function.

## `renderSong: (ParsedSong, RenderOpts) => string`

Takes the a `ParsedSong` object produced by the [`parseSong`](#parsesong) function, and renders it to an HTML string according to the supplied [`RenderOpts`](#type-renderopts)

## Types:

### `JCRenderOptions`

```ts
type JCRenderOptions = {
  accidentalPreference: JCAccidental | 'original';
  alignChordsWithLyrics: boolean;
  showChordTimings: boolean;
  transpose: number;
};
```

This is the object supplied to the [`renderSong`](#rendersong) function to customize the output.

| Field                   | Type                         | Description                                                                                                                                          |
| ----------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accidentalPreference`  | `JCAccidental \| 'original'` | When rendering chords and keys, should the renderer prefer sharps, flats, or make its own decision.                                                  |
| `alignChordsWithLyrics` | `boolean`                    | Whether or not to align chords with the position markers (`_`) in the following lyric line if applicable.                                            |
| `showChordDurations`    | `boolean`                    | Whether or not to render non-lyric aligned chords with symbols indicating their rhythm/duration, e.g. `\|` for separating bars or`.` for beat count. |
| `transpose`             | `number`                     | How many semitones up or down to transpose the song.                                                                                                 |

### `JCParsedSong`

```ts
interface ParsedSong {
  startingKey: JCKey | undefined;
   ...
}
```

### `JCAccidental`

```ts
type JCAccidental = 'flat' | 'sharp';
```

### `JCKey`

```ts
class JCKey {
  constructor(
    public note: JCNote,
    public minor: boolean,
    public originalAccidental?: JCAccidental,
  ) {...}
}
```

### `JCNote`

```ts
enum JCNote {
  C,
  CSharp,
  D,
  DSharp,
  E,
  F,
  FSharp,
  G,
  GSharp,
  A,
  ASharp,
  B,
}
```
