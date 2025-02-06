import Accidental from 'src/shared/enums/accidental';
import { cmAccidentalsType } from 'src/shared/types/cm/cmrenderoptions';

/** Convert cmAccidentalsType to Accidental */
export default function cmAccidentalsTypeToAccidental(
  accidentalsType: cmAccidentalsType,
): Accidental {
  return accidentalsType == 'flat' ? Accidental.Flat : Accidental.Sharp;
}
