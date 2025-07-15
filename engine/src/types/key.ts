import { Accidental, AccidentalPreference } from 'src/types/accidental';
import { Note, renderNote, tranposeNote } from 'src/types/note';

export class Key {
  constructor(
    public note: Note,
    public minor: boolean,
    public originalAccidental?: Accidental,
  ) {}

  render(accidentalsPreference?: AccidentalPreference, transpose?: number): string {
    let out = '';
    const note = transpose ? tranposeNote(this.note, transpose) : this.note;

    if (accidentalsPreference === 'original' || accidentalsPreference === undefined) {
      out += renderNote(note, this.originalAccidental);
    } else {
      out += renderNote(note, accidentalsPreference);
    }
    if (this.minor) out += 'm';

    return out;
  }
}
