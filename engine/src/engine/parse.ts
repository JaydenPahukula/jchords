import { ChordLine } from 'src/engine/lines/chordline';
import { EmptyLine } from 'src/engine/lines/emptyline';
import { KeyDeclarationLine } from 'src/engine/lines/keydeclarationline';
import { LyricLine } from 'src/engine/lines/lyricline';
import { RepeatChordsLine } from 'src/engine/lines/repeatchordsline';
import { SectionLabelLine } from 'src/engine/lines/sectionlabelline';
import { TimeSignatureLine } from 'src/engine/lines/timesignatureline';
import { BarAlignmentGroup } from 'src/types/baralignmentgroup';
import { Key } from 'src/types/key';
import { ParsedSong } from 'src/types/parsedsong';
import { RenderOptions } from 'src/types/renderopts';
import { TimeSignature } from 'src/types/timesignature';

/**
 * Parses a whole song, returning a `ParsedSong` object which can be used to render
 */
export function parseSong(source: string): ParsedSong {
  const rawLines = source.split('\n');

  const state: ParseState = { ...getDefaultParseState() };
  rawLines.forEach((line: string, lineNum: number) => {
    state.lineNum = lineNum;
    const parsedLine = parseLine(line, state);
    state.previousLines.push(parsedLine);
  });

  return {
    startingKey: state.firstKey,
    lines: state.previousLines,
  };
}

/**
 * Parses a single line
 */
function parseLine(line: string, state: ParseState): ParsedLine {
  line = line.trimEnd();

  // order of precedence for trying line types
  const parseOrder: ((line: string, state: ParseState) => ParsedLine | null)[] = [
    TimeSignatureLine.tryParse,
    KeyDeclarationLine.tryParse,
    SectionLabelLine.tryParse,
    ChordLine.tryParse,
    RepeatChordsLine.tryParse,
    EmptyLine.tryParse,
  ];

  for (const parser of parseOrder) {
    const result = parser(line, state);
    if (result !== null) return result;
  }
  return LyricLine.tryParse(line, state);
}

/**
 * Parser state, values to keep track of while incrementally parsing lines
 */
export type ParseState = {
  lineNum: number;
  previousLines: ParsedLine[];
  key: Key | undefined;
  timeSignature: TimeSignature;
  firstKey: Key | undefined;
  lastChordLine: ChordLine | undefined;
  lastLastChordLine: ChordLine | undefined;
  // For aligning bar widths of non-lyric-aligned chords per group. Empty lines separate groups
  currentBarAlignmentGroup: BarAlignmentGroup | null;
};

export const getDefaultParseState = (): ParseState => {
  return {
    lineNum: 0,
    previousLines: [],
    key: undefined,
    timeSignature: [4, 4],
    firstKey: undefined,
    lastChordLine: undefined,
    lastLastChordLine: undefined,
    currentBarAlignmentGroup: null,
  };
};

/**
 * A parsed line, which has all the info
 */
export interface ParsedLine {
  type: LineType;
  render(opts: RenderOptions): string;
}

export enum LineType {
  Chord,
  Empty,
  KeyDeclaration,
  Lyric,
  RepeatChords,
  SectionLabel,
  TimeSignature,
}
