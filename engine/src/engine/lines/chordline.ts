import { Chord, ChordParseFailure, chordParserFactory, chordRendererFactory } from 'chord-symbol';
import { chordClassName, chordLineClassName } from 'src/constants/classes';
import {
  chordDurationSymbol,
  repeatChordSymbol,
  subBeatChordGroupEndSymbol,
  subBeatChordGroupStartSymbol,
} from 'src/constants/symbols';
import { LyricLine } from 'src/engine/lines/lyricline';
import { LineType, ParsedLine, ParseState } from 'src/engine/parse';
import { RenderState } from 'src/engine/render';
import { Key } from 'src/types/key';
import { RenderOptions } from 'src/types/renderopts';
import { TimeSignature } from 'src/types/timesignature';

/**
 * Represents a parsed chord line
 *
 * Parses each individual chord twice, once during line parsing to check if it is
 * even a chord, then again during rendering because the rendering process has context,
 * so we can parse the chords with respect to the key.
 */
export class ChordLine implements ParsedLine {
  type = LineType.Chord;

  chords: (ChordWithDuration | SubBeatChordGroup)[];
  timeSignature: TimeSignature | undefined;
  key: Key | undefined;
  originalLine: string;
  /** Undefined if there isn't a following lyric line */
  lyrics: LyricLine | undefined;
  /** Should be populated BEFORE this line attempts to self-render */
  renderedChords: string[] | undefined;

  constructor(
    chords: (ChordWithDuration | SubBeatChordGroup)[],
    timeSignature: TimeSignature | undefined,
    key: Key | undefined,
    originalLine: string,
  ) {
    this.chords = chords;
    this.timeSignature = timeSignature;
    this.key = key;
    this.originalLine = originalLine;

    this.lyrics = undefined;
    // ^ lyric line parsing can change this value
    this.renderedChords = undefined;
  }

  static tryParse = (line: string, state: ParseState): ChordLine | null => {
    let pos = 0;
    const chords: (ChordWithDuration | SubBeatChordGroup)[] = [];
    let inSubBeatGroup = false;
    let subBeatGroup: Chord[] = [];
    let lastChord: string | null = null;

    const chordParseFunction = chordParserFactory({
      key: (state.key as string) ?? undefined,
    });

    // parsing char by char
    while (pos < line.length) {
      const currentChar = line[pos]!;

      if (currentChar == ' ') {
        // do nothing
      } else if (currentChar == chordDurationSymbol) {
        // chord duration is parsed immediately after chord parsing
        return null;
      } else if (currentChar == subBeatChordGroupStartSymbol) {
        // start of sub beat group
        if (inSubBeatGroup) {
          return null;
        } else {
          inSubBeatGroup = true;
          lastChord = null;
          subBeatGroup = [];
        }
      } else if (currentChar == subBeatChordGroupEndSymbol) {
        // end of sub beat group
        if (!inSubBeatGroup) return null;
        else {
          inSubBeatGroup = false;
          if (subBeatGroup.length >= 2) {
            chords.push(subBeatGroup as SubBeatChordGroup);
          } else return null;
        }
      } else {
        // maybe a chord, get all characters until the next special symbol and check
        let currentString = currentChar;
        while (
          pos + 1 < line.length &&
          line[pos + 1] !== subBeatChordGroupStartSymbol &&
          line[pos + 1] !== subBeatChordGroupEndSymbol &&
          line[pos + 1] !== chordDurationSymbol &&
          line[pos + 1] !== ' '
        ) {
          pos++;
          currentString += line[pos];
        }

        if (currentString === repeatChordSymbol) {
          // retrieve last chord to repeat
          if (lastChord === null) return null;
          currentString = lastChord;
        }

        const maybeChord = chordParseFunction(currentString);
        if ((maybeChord as ChordParseFailure).error !== undefined) return null; // not a chord
        const chord = maybeChord as Chord;

        // parse duration
        let duration;
        while (pos + 1 < line.length && line[pos + 1] === chordDurationSymbol) {
          pos++;
          if (duration === undefined) duration = 0;
          duration++;
        }

        if (duration !== undefined && inSubBeatGroup) return null; // cant define durations in a sub beat group

        if (inSubBeatGroup) {
          subBeatGroup.push(chord);
        } else {
          chords.push({
            chord: chord,
            duration: duration,
          });
        }
        lastChord = currentString;
      }

      pos++;
    }

    if (chords.length == 0 || inSubBeatGroup) return null;

    const newLine = new ChordLine(chords, state.timeSignature, state.key, line);
    state.lastLastChordLine = state.lastChordLine;
    state.lastChordLine = newLine;
    return newLine;
  };

  render = (opts: RenderOptions, state: RenderState): string => {
    if (this.renderedChords === undefined) this.prerenderChords(opts);

    let output = `<span class="${chordLineClassName}">`;

    if (this.lyrics !== undefined && opts.alignChordsWithLyrics) {
      // align with lyrics

      let currentPos = 0;
      let accumulatedShift = 0; // how much the marker positions need to be shifted due to expanding previous ones to fit the chords
      for (let i = 0; i < this.renderedChords!.length; i++) {
        const chordOrGroupString = this.renderedChords![i]!;
        const isGroup = chordOrGroupString.startsWith(subBeatChordGroupStartSymbol);

        // moving chord to its assigned position
        const assignedPos = this.lyrics.markers[i];
        if (assignedPos !== undefined) {
          while (assignedPos + accumulatedShift > currentPos) {
            output += ' ';
            currentPos += 1;
          }
        }

        if (chordOrGroupString.startsWith(subBeatChordGroupStartSymbol)) {
          // this is a chord
          output += `<span class="${chordClassName}">${chordOrGroupString}</span> `;
          currentPos += chordOrGroupString.length + 1;
        } else {
          // this is a sub beat group
          output += `<span class="${chordClassName}">${chordOrGroupString}</span> `;
          currentPos += chordOrGroupString.length + 1;
        }

        // checking if space needs to be added in the lyric line
        if (assignedPos !== undefined && this.lyrics.markers[i + 1] !== undefined) {
          const distToNextMarker = this.lyrics.markers[i + 1]! + accumulatedShift - currentPos;
          if (distToNextMarker < 0) {
            // grow the width of this marker in the lyric line
            this.lyrics.markerWidths[i] = -distToNextMarker;
            accumulatedShift += -distToNextMarker;
          }
        }
      }
    } else if (opts.showChordDurations && this.timeSignature !== undefined) {
      // align with duration
    } else {
      // no align
    }

    output += `<br /></span>`;
    return output;
  };

  /**
   * Prerenders the chords individually before the main rendering of the line, because the width of the rendered chord
   * is needed earlier
   */
  prerenderChords(opts: RenderOptions) {
    const chordRenderFunction = chordRendererFactory({ printer: 'text', useShortNamings: true });
    this.renderedChords = [];

    for (let i = 0; i < this.chords.length; i++) {
      const chordOrGroup = this.chords[i]!;
      if ((chordOrGroup as ChordWithDuration).chord !== undefined) {
        const chord = chordOrGroup as ChordWithDuration;
        this.renderedChords.push(chordRenderFunction(chord.chord));
      } else {
        const group = chordOrGroup as SubBeatChordGroup;
        let current = subBeatChordGroupStartSymbol + ' ';
        for (const chord of group) current += chordRenderFunction(chord);
        current += subBeatChordGroupEndSymbol;
        this.renderedChords.push(current);
      }
    }
  }
}

/**
 * A chord that has been parsed by chord symbol, with duration information
 */
type ChordWithDuration = {
  chord: Chord;
  duration: number | undefined;
};

/** Like a list of `RawChord`s, but with no durations */
type SubBeatChordGroup = [Chord, Chord, ...Chord[]];
