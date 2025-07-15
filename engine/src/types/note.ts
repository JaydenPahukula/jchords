import { Accidental } from 'src/types/accidental';

export enum Note {
  C = 0,
  CSharp,
  D,
  DSharp,
  E,
  F,
  FSharp,
  G,
  GSharp,
  A,
  ASharp,
  B,
}

export function noteFromString(s: string): Note | null {
  return STRING_NOTE_MAP.get(s) ?? null;
}

/** Renderes a note with preference for a given accidental, defaults to sharps */
export function renderNote(note: Note, accidental?: Accidental): string {
  if (accidental === 'flat') {
    return noteStringsFlat[note] ?? '_';
  } else {
    return noteStringsSharp[note] ?? '_';
  }
}

export function tranposeNote(note: Note, amount: number): Note {
  return ((note.valueOf() + amount) % 12) as Note;
}

const STRING_NOTE_MAP = new Map<string, Note>([
  ['C', Note.C],
  ['C#', Note.CSharp],
  ['D', Note.D],
  ['D#', Note.DSharp],
  ['Db', Note.CSharp],
  ['E', Note.E],
  ['Eb', Note.DSharp],
  ['F', Note.F],
  ['F#', Note.FSharp],
  ['G', Note.G],
  ['G#', Note.GSharp],
  ['Gb', Note.FSharp],
  ['A', Note.A],
  ['A#', Note.ASharp],
  ['Ab', Note.GSharp],
  ['B', Note.B],
  ['Bb', Note.ASharp],
]);

const noteStringsFlat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const noteStringsSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
