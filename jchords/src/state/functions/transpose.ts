import { batch } from '@preact/signals';
import Accidental from 'src/shared/enums/accidental';
import accidentalToCmAccidentalsType from 'src/shared/functions/accidentaltocmaccidentalstype';
import calcTransposeValue from 'src/shared/functions/calctransposevalue';
import stringToAccidental from 'src/shared/functions/stringtoaccidental';
import stringToKey from 'src/shared/functions/stringtokey';
import state from 'src/state/state';
import updateRenderOptions from './updaterenderoptions';

export function resetTransposeOptions() {
  batch(() => {
    setTransposeValue(0);
    setAccidentalsType(state.currSong.value.defaultAccidental);
  });
}

export function setKey(keyString: string) {
  batch(() => {
    setTransposeValue(calcTransposeValue(state.currSong.value.defaultKey, stringToKey(keyString)));
    setAccidentalsType(stringToAccidental(keyString));
  });
}

export function setTransposeValue(value: number) {
  updateRenderOptions({
    transposeValue: ((value % 12) + 12) % 12,
  });
}

export function setAccidentalsType(accidental: Accidental) {
  updateRenderOptions({
    accidentalsType: accidentalToCmAccidentalsType(accidental),
  });
}
