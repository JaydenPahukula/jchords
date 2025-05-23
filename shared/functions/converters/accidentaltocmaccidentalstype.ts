import { Accidental } from 'shared/enums/accidental';
import { cmAccidentalsType } from 'shared/types/cm/cmrenderoptions';

/** Convert Accidental to cmAccidentalsType */
export function accidentalToCmAccidentalsType(accidental: Accidental): cmAccidentalsType {
  return accidental == Accidental.Sharp ? 'sharp' : 'flat';
}
