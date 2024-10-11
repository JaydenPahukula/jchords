import AccidentalsType from '../types/accidentaltype';
import Key from '../types/key';

const calcAccidentalsType = (key: Key | undefined): AccidentalsType | undefined =>
  [
    undefined,
    undefined,
    AccidentalsType.Sharp,
    AccidentalsType.Flat,
    undefined,
    AccidentalsType.Sharp,
    AccidentalsType.Flat,
    undefined,
    undefined,
    AccidentalsType.Sharp,
    AccidentalsType.Flat,
    undefined,
    AccidentalsType.Sharp,
    AccidentalsType.Flat,
    undefined,
    AccidentalsType.Sharp,
    AccidentalsType.Flat,
    undefined,
  ][key ?? 0] ?? undefined;

export default calcAccidentalsType;
