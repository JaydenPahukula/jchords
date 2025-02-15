import Accidental from '../enums/accidental';
import { cmAccidentalsType } from '../types/cm/cmrenderoptions';

/** Convert Accidental to cmAccidentalsType */
export default function accidentalToCmAccidentalsType(accidental: Accidental): cmAccidentalsType {
  return accidental == Accidental.Sharp ? 'sharp' : 'flat';
}
