import { batch } from '@preact/signals';
import Accidental from 'shared/enums/accidental';
import accidentalToCmAccidentalsType from 'shared/functions/accidentaltocmaccidentalstype';
import calcTransposeValue from 'shared/functions/calctransposevalue';
import stringToAccidental from 'shared/functions/stringtoaccidental';
import stringToKey from 'shared/functions/stringtokey';
import updateRenderOptions from 'src/state/functions/updaterenderoptions';
import state from 'src/state/state';

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
