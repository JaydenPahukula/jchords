import Accidental from 'src/shared/enums/accidental';
import { cmAccidentalsType } from 'src/shared/types/cm/cmrenderoptions';

/** Convert Accidental to cmAccidentalsType */
export default function accidentalToCmAccidentalsType(accidental: Accidental): cmAccidentalsType {
  return accidental == Accidental.Sharp ? 'sharp' : 'flat';
}
