import { chordClassName, errorClassName, keyDeclarationLineClassName } from 'src/constants/classes';
import { keyDeclarationKeyword } from 'src/constants/symbols';
import { LineType, ParsedLine, ParseState } from 'src/engine/parse';
import { Key } from 'src/types/key';
import { Note } from 'src/types/note';
import { RenderOptions } from 'src/types/renderopts';

/**
 * Represents a parsed key declaration line. Will parse even if the chord is malformed, it will just show error on render
 */
export class KeyDeclarationLine implements ParsedLine {
  type = LineType.KeyDeclaration;

  // key is null if the key string is invalid
  key: Key | null;
  originalString: string;
  static parseRegex = new RegExp(`^${keyDeclarationKeyword}\\s+([A-Za-z#m]{1,4})$`, 'i');

  constructor(original: string) {
    this.originalString = original;

    const match = original.match(/^([A-Ga-g][#b]?m?)$/);
    if (match === null || match[1] === undefined || !(match[1] in noteMappings)) this.key = null;
    else this.key = match[1];
    /* this.key = {
        note: noteMappings[match[1]]!,
        minor: match[2].length != 0,
      };*/
  }

  static tryParse = (line: string, state: ParseState): KeyDeclarationLine | null => {
    const match = line.match(KeyDeclarationLine.parseRegex);
    if (match === null || match[1] === undefined) return null;

    const parsed = new KeyDeclarationLine(match[1]);
    if (parsed.key !== null) {
      state.key = parsed.key;
      if (state.firstKey === undefined) state.firstKey = parsed.key;
    }
    return parsed;
  };

  render(opts: RenderOptions): string {
    if (this.key == null) {
      return `<span class="${keyDeclarationLineClassName}">key:&nbsp<span class="${errorClassName}">${this.originalString}</span><br /></span>`;
    } else {
      return `<span class="${keyDeclarationLineClassName}">key:&nbsp<span class="${chordClassName}">${this.key}</span><br /></span>`;
    }
  }
}

const noteMappings: { [key: string]: Note } = {
  c: Note.C,
  C: Note.C,
  'c#': Note.CSharp,
  'C#': Note.CSharp,
  db: Note.CSharp,
  Db: Note.CSharp,
  d: Note.D,
  D: Note.D,
  'd#': Note.DSharp,
  'D#': Note.DSharp,
  eb: Note.DSharp,
  Eb: Note.DSharp,
  e: Note.E,
  E: Note.E,
  f: Note.F,
  F: Note.F,
  'f#': Note.FSharp,
  'F#': Note.FSharp,
  gb: Note.FSharp,
  Gb: Note.FSharp,
  g: Note.G,
  G: Note.G,
  'g#': Note.GSharp,
  'G#': Note.GSharp,
  ab: Note.GSharp,
  Ab: Note.GSharp,
  a: Note.A,
  A: Note.A,
  'a#': Note.ASharp,
  'A#': Note.ASharp,
  bb: Note.ASharp,
  Bb: Note.ASharp,
  b: Note.B,
  B: Note.B,
};
