import AccidentalsType from './accidentaltype';
import Key from './key';

export default interface Settings {
  key: Key;
  overrideAccidentals: boolean;
  accidentalsType: AccidentalsType;
}

export const defaultSettings: Settings = {
  key: Key.None,
  overrideAccidentals: false,
  accidentalsType: AccidentalsType.Sharp,
};
