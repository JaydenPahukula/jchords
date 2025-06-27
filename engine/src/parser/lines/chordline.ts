import { ChordParseFailure, chordParserFactory } from 'chord-symbol';
import {
  chordDurationSymbol,
  repeatChordSymbol,
  subBeatChordGroupEndSymbol,
  subBeatChordGroupStartSymbol,
} from 'src/constants';
import { ParsedLine } from 'src/parser/parsedline';
import { RenderState } from 'src/types/renderstate';

/**
 * Represents a parsed chord line
 *
 * Parses each individual chord twice, once during line parsing to check if it is
 * even a chord, then again during rendering because the rendering process has context,
 * so we can parse the chords with respect to the key.
 */
export class ChordLine implements ParsedLine {
  lineNum: number;
  chords: (RawChord | SubBeatChordGroup)[];

  /** function to parse chords with */
  static chordSymbolParse = chordParserFactory({});

  constructor(lineNum: number, chords: (RawChord | SubBeatChordGroup)[]) {
    this.lineNum = lineNum;
    this.chords = chords;
  }

  static tryParse = (line: string, lineNum: number): ChordLine | null => {
    let pos = 0;

    const chords: (RawChord | SubBeatChordGroup)[] = [];
    let inSubBeatGroup = false;
    let subBeatGroup: string[] = [];
    let lastChord: string | null = null;

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
        if (inSubBeatGroup) return null;
        else {
          inSubBeatGroup = true;
          lastChord = null;
          subBeatGroup = [];
        }
      } else if (currentChar == subBeatChordGroupEndSymbol) {
        // end of sub beat group
        if (!inSubBeatGroup) return null;
        else {
          inSubBeatGroup = false;
          if (subBeatGroup.length > 1) {
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
        } else {
          const maybeChord = ChordLine.chordSymbolParse(currentString);
          if ((maybeChord as ChordParseFailure).error !== undefined) return null; // not a chord
        }

        // parse duration
        let duration;
        while (pos + 1 < line.length && line[pos + 1] === chordDurationSymbol) {
          pos++;
          if (duration === undefined) duration = 0;
          duration++;
        }

        if (duration !== undefined && inSubBeatGroup) {
          return null; // cant define durations in a sub beat group
        }

        if (inSubBeatGroup) {
          subBeatGroup.push(currentString);
        } else {
          const newChord = {
            chord: currentString,
            duration: duration,
          };
          chords.push(newChord);
        }
        lastChord = currentString;
      }

      pos++;
    }

    if (chords.length == 0 || inSubBeatGroup) return null;

    return new ChordLine(lineNum, chords);
  };

  render = (state: RenderState): string => {
    return '';
  };
}

/**
 * A chord stored in a raw, unparsed format that has already been confirmed to be
 * a valid chord
 */
type RawChord = {
  chord: string;
  duration: number | undefined;
};

/** Like a list of `RawChord`s, but with no durations */
type SubBeatChordGroup = [string, string, ...string[]];
