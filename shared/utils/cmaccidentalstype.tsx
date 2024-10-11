import AccidentalsType from '../types/accidentaltype';
import { cmAccidentalsTypeOptions } from '../types/cmrenderoptions';
import Settings from '../types/settings';
import calcAccidentalsType from './accidentalstype';

const accidentalsToCmAccidentals = (t: AccidentalsType | undefined): cmAccidentalsTypeOptions =>
  t == AccidentalsType.Flat
    ? cmAccidentalsTypeOptions.flat
    : t === AccidentalsType.Sharp
      ? cmAccidentalsTypeOptions.sharp
      : cmAccidentalsTypeOptions.sharp;

const calcCmAccidentalsType = (settings: Settings): cmAccidentalsTypeOptions =>
  settings.overrideAccidentals
    ? // manual override
      accidentalsToCmAccidentals(settings.accidentalsType)
    : // try to calculate from song key
      accidentalsToCmAccidentals(calcAccidentalsType(settings.key));

export default calcCmAccidentalsType;
