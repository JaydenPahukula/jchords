import { sectionClassName, songClassName } from 'src/constants';
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

/**
 *  Where the magic happens
 */
export function render(src: string, opts: RenderOptions): string {
  // parsing lines
  const rawLines = src.split('\n');
  const parsedLines = rawLines.map(parseLine);

  let output = '';
  const state: RenderState = {
    key: undefined,
    currentLine: 0,
    lines: parsedLines,
    lastChordLine: undefined,
    lastLastChordLine: undefined,
    currentSection: undefined,
  };

  // main rendering
  output += '<!-- Start of JChords rendered song -->\n';
  output += `<div class="${songClassName}">\n`;
  output += `<p class="${sectionClassName}">\n`;
  parsedLines.map((line) => {
    output += line.render(state, opts);
    state.currentLine++;
  });
  output += '</p>\n';
  output += '</div>\n';
  output += '<!-- End of JChords song -->\n';

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
