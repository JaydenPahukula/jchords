/**
 * A note in the 12 tone scale.
 *
 * C = 0, C# = 1, D = 2, ...
 */
export enum Note {
  C = 0,
  CSharp = 1,
  D = 2,
  DSharp = 3,
  E = 4,
  F = 5,
  FSharp = 6,
  G = 7,
  GSharp = 8,
  A = 9,
  ASharp = 10,
  B = 11,
}

/**
 * Converts a note into a string, taking into account render options. Uses the
 * original string to auto-choose accidental style if the preferrence is auto.
 */
export function noteToString(note: Note) {
  /* if (
    opts.accidentalsPreferrence == 'flats' ||
    (opts.accidentalsPreferrence == 'auto' && originalString?.charAt(1) === 'b')
  ) {
    return noteNamesFlat[note];
  } else {
    return noteNames[note];
  }*/
  return noteNamesSharp[note];
}

const noteNamesSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
//const noteNamesFlat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
