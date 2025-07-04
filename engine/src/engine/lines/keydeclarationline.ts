import {
  chordClassName,
  errorClassName,
  keyDeclarationKeyword,
  keyDeclarationLineClassName,
} from 'src/constants';
import { LineType, ParsedLine } from 'src/engine/parsedline';
import { Key } from 'src/types/key';
import { Note, noteToString } from 'src/types/note';
import { RenderOptions } from 'src/types/renderopts';
import { RenderState } from 'src/types/renderstate';

/**
 * Represents a parsed key declaration line. Will parse even if the chord is malformed, it will just show error on render
 */
export class KeyDeclarationLine implements ParsedLine {
  type = LineType.KeyDeclaration;

  // key is null if the key string is invalid
  key: Key | null;
  original: string;
  static regex = new RegExp(`^${keyDeclarationKeyword}\\s+([A-Za-z#m]{1,4})$`, 'i');

  constructor(key: Key | null, original: string) {
    this.key = key;
    this.original = original;
  }

  static tryParse = (line: string): KeyDeclarationLine | null => {
    const initialMatch = line.match(KeyDeclarationLine.regex);
    if (initialMatch === null || initialMatch[1] === undefined) return null;

    const originalString = initialMatch[1];
    const match = originalString.match(/^([A-Ga-g][#b]?)(m?)$/);
    if (
      match === null ||
      match[1] === undefined ||
      match[2] === undefined ||
      !(match[1] in noteMappings)
    )
      return new KeyDeclarationLine(null, originalString);

    return new KeyDeclarationLine(
      {
        note: noteMappings[match[1]]!,
        minor: match[2].length != 0,
      },
      originalString,
    );
  };

  render(state: RenderState, opts: RenderOptions): string {
    if (this.key == null) {
      return `<span class="${keyDeclarationLineClassName}">key:&nbsp<span class="${errorClassName}">${this.original}</span><br /></span>\n`;
    } else {
      state.key = this.key;
      return `<span class="${keyDeclarationLineClassName}">key:&nbsp<span class="${chordClassName}">${noteToString(this.key.note, opts, this.original) + (this.key.minor ? 'm' : '')}</span><br /></span>\n`;
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
