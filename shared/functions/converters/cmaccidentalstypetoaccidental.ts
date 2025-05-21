import { Accidental } from 'shared/enums/accidental';
import { cmAccidentalsType } from 'shared/types/cm/cmrenderoptions';

/** Convert cmAccidentalsType to Accidental */
export function cmAccidentalsTypeToAccidental(accidentalsType: cmAccidentalsType): Accidental {
  return accidentalsType == 'flat' ? Accidental.Flat : Accidental.Sharp;
}
