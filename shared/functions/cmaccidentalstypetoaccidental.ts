import Accidental from '../enums/accidental';
import { cmAccidentalsType } from '../types/cm/cmrenderoptions';

/** Convert cmAccidentalsType to Accidental */
export default function cmAccidentalsTypeToAccidental(
  accidentalsType: cmAccidentalsType,
): Accidental {
  return accidentalsType == 'flat' ? Accidental.Flat : Accidental.Sharp;
}
