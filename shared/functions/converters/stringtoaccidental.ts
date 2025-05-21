import { Accidental } from 'shared/enums/accidental';

const FLAT_KEYS = [
  'Db',
  'Bbm',
  'Eb',
  'Cm',
  'Dbm',
  'F',
  'Dm',
  'Gb',
  'Ebm',
  'Ab',
  'Fm',
  'Gbm',
  'Bb',
  'Gm',
  'B',
  'Abm',
];

export function stringToAccidental(s: string): Accidental {
  return FLAT_KEYS.includes(s) ? Accidental.Flat : Accidental.Sharp;
}
