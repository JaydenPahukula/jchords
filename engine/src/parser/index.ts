import { ParserError } from 'src/classes/parsererror';
import { ChordLine } from 'src/parser/lines/chordline';
import { RepeatChordsLine } from 'src/parser/lines/repeatchordsline';
import { SectionLabelLine } from 'src/parser/lines/sectionlabelline';
import { TimeSignatureLine } from 'src/parser/lines/timesignatureline';
import { ParsedLine } from 'src/parser/parsedline';

export function parseSong(src: string): ParsedLine[] {
  return src
    .split('\n')
    .map(parseLine)
    .filter((line) => line !== null);
}

function parseLine(line: string, lineNum: number): ParsedLine | null {
  line = line.trimEnd();

  // order of precedence for trying line types
  const parseOrder: ((line: string) => ParsedLine | null)[] = [
    TimeSignatureLine.tryParse,
    SectionLabelLine.tryParse,
    ChordLine.tryParse,
    RepeatChordsLine.tryParse,
  ];

  for (const parser of parseOrder) {
    const result = parser(line);
    if (result !== null) return result;
  }

  throw new ParserError('Unrecognized line type', lineNum);
}
