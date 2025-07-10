import { Chord, ChordParseFailure, chordParserFactory, chordRendererFactory } from 'chord-symbol';
import { chordLineClassName } from 'src/constants/classes';
import {
  chordDurationSymbol,
  repeatChordSymbol,
  subBeatChordGroupEndSymbol,
  subBeatChordGroupStartSymbol,
} from 'src/constants/symbols';
import { LyricLine } from 'src/engine/lines/lyricline';
import { LineType, ParsedLine, ParseState } from 'src/engine/parse';
import { RenderOptions } from 'src/types/renderopts';

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
  originalLine: string;
  /** Undefined if there isn't a following lyric line */
  lyrics: LyricLine | undefined;

  constructor(chords: (ChordWithDuration | SubBeatChordGroup)[], originalLine: string) {
    this.chords = chords;
    this.originalLine = originalLine;

    this.lyrics = undefined;
    // ^ lyric line parsing can change this value
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

    const newLine = new ChordLine(chords, line);
    state.lastLastChordLine = state.lastChordLine;
    state.lastChordLine = newLine;
    return newLine;
  };

  render = (opts: RenderOptions): string => {
    const chordRenderFunction = chordRendererFactory({ printer: 'text', useShortNamings: true });

    //const hasLyrics = this.associatedLyrics !== undefined;
    let output = `<span class="${chordLineClassName}">`;

    if (this.lyrics !== undefined) {
      // align with lyrics

      let currentPos = 0;
      let accumulatedShift = 0; // how much the marker positions need to be shifted due to expanding them to fit the chords
      for (let i = 0; i < this.chords.length; i++) {
        const chordOrGroup = this.chords[i]!;

        // moving chord to its assigned position
        const assignedPos = this.lyrics.markers[i];
        if (assignedPos !== undefined) {
          while (assignedPos + accumulatedShift > currentPos) {
            output += ' ';
            currentPos += 1;
          }
        }

        if ((chordOrGroup as ChordWithDuration).chord !== undefined) {
          const chord = chordOrGroup as ChordWithDuration;
          const chordString = chordRenderFunction(chord.chord);
          output += chordString + ' ';
          currentPos += chordString.length + 1;
        } else {
          const group = chordOrGroup as SubBeatChordGroup;
          output += subBeatChordGroupStartSymbol + ' ';
          currentPos += subBeatChordGroupStartSymbol.length + 1;
          for (const chord of group) {
            const chordString = chordRenderFunction(chord);
            output += chordString + ' ';
            currentPos += chordString.length + 1;
          }
          output += subBeatChordGroupEndSymbol + ' ';
          currentPos += subBeatChordGroupEndSymbol.length + 1;
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
    } else {
      // align with TS
    }

    output += `<br /></span>`;
    return output;
  };
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
