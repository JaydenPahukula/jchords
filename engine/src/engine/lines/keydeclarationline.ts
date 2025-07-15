import { chordClassName, errorClassName, keyDeclarationLineClassName } from 'src/classes';
import { LineType, ParsedLine, ParseState } from 'src/engine/parse';
import { RenderState } from 'src/engine/render';
import { keyDeclarationKeyword } from 'src/symbols';
import { Accidental } from 'src/types/accidental';
import { Key } from 'src/types/key';
import { noteFromString } from 'src/types/note';
import { RenderOptions } from 'src/types/renderopts';

/**
 * Represents a parsed key declaration line. Will parse even if the chord is malformed, it will just show error on render
 */
export class KeyDeclarationLine implements ParsedLine {
  type = LineType.KeyDeclaration;

  // key is null if the key string is invalid
  key: Key | null;
  originalString: string;
  // used to parse for what is roughly a chord
  static parseRegex = new RegExp(`^${keyDeclarationKeyword}\\s+([A-Z#bm]{1,4})$`, 'i');

  constructor(original: string) {
    this.originalString = original;

    const match = original.match(/^([A-G][#b]?)(m?)$/);
    console.log(match);
    if (match === null || match[1] === undefined || match[2] === undefined) {
      this.key = null;
    } else {
      const noteString = match[1];
      let originalAccidental: Accidental | undefined;
      if (noteString.length == 2 && noteString.endsWith('#')) {
        originalAccidental = 'sharp';
      } else if (noteString.length == 2 && noteString.endsWith('b')) {
        originalAccidental = 'flat';
      }

      const note = noteFromString(noteString);
      const minor = match[2].length > 0;
      if (note !== null) {
        this.key = new Key(note, minor, originalAccidental);
      } else {
        this.key = null;
      }
    }
    console.log(this.key);
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

  render(opts: RenderOptions, state: RenderState): string {
    if (this.key == null) {
      return `<span class="${keyDeclarationLineClassName}">key:&nbsp<span class="${errorClassName}">${this.originalString}</span><br /></span>`;
    } else {
      const renderedKey = this.key.render(opts.accidentalPreference, opts.transpose);
      return `<span class="${keyDeclarationLineClassName}">key:&nbsp<span class="${chordClassName}">${renderedKey}</span><br /></span>`;
    }
  }
}
