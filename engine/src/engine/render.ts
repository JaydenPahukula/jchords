import { songClassAttr } from 'src/constants';
import { ChordLine } from 'src/engine/lines/chordline';
import { EmptyLine } from 'src/engine/lines/emptyline';
import { KeyDeclarationLine } from 'src/engine/lines/keydeclarationline';
import { LyricLine } from 'src/engine/lines/lyricline';
import { RepeatChordsLine } from 'src/engine/lines/repeatchordsline';
import { SectionLabelLine } from 'src/engine/lines/sectionlabelline';
import { TimeSignatureLine } from 'src/engine/lines/timesignatureline';

import { ParsedLine } from 'src/engine/parsedline';
import { RenderError } from 'src/error';
import { RenderOptions } from 'src/types/renderopts';
import { RenderState } from 'src/types/renderstate';

export function render(src: string, opts: RenderOptions): string {
  // parsing lines
  const rawLines = src.split('\n');
  const parsedLines = rawLines.map(parseLine);

  let output = '';
  const state: RenderState = {
    currentLine: 0,
    lines: parsedLines,
    lastChordLine: null,
    lastLastChordLine: null,
  };

  // main rendering
  output += `<p class="${songClassAttr}">`;
  parsedLines.map((line) => {
    output += line.render(state, opts);
    state.currentLine++;
  });
  output += '</p>';

  return output;
}

function parseLine(line: string, lineNum: number): ParsedLine {
  line = line.trimEnd();

  // order of precedence for trying line types
  const parseOrder: ((line: string) => ParsedLine | null)[] = [
    TimeSignatureLine.tryParse,
    KeyDeclarationLine.tryParse,
    SectionLabelLine.tryParse,
    ChordLine.tryParse,
    RepeatChordsLine.tryParse,
    EmptyLine.tryParse,
    LyricLine.tryParse,
  ];

  for (const parser of parseOrder) {
    const result = parser(line);
    if (result !== null) return result;
  }

  throw new RenderError('Unrecognized line type', lineNum);
}
