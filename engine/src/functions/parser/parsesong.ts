import { parseSectionLabel } from 'src/functions/parser/parsesectionlabel';
import { parseTimeSignature } from 'src/functions/parser/parsetimesignature';
import { ParsedLine } from 'src/types/parsedline'

export function parseSong(src: string): ParsedLine[] {
  return src.split("\n").map(parseLine).filter((line) => line !== null);
}

function parseLine(line: string, lineNum: number): ParsedLine | null {
  line = line.trimEnd();

  // order of precedence of line types
  const parseOrder: ((line: string, lineNum?: number) => ParsedLine | null)[] = [
    parseTimeSignature,
    parseSectionLabel
  ]

  for (const parser of parseOrder) {
    const result = parser(line, lineNum);
    if (result !== null) return result;
  }

  throw new Error("Unrecognized line type")
}