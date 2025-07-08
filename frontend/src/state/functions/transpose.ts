import { batch } from '@preact/signals-react';
import { Accidental } from 'shared/enums/accidental';
import { calcTransposeValue } from 'shared/functions/calctransposevalue';
import { accidentalToCmAccidentalsType } from 'shared/functions/converters/accidentaltocmaccidentalstype';
import { stringToAccidental } from 'shared/functions/converters/stringtoaccidental';
import { stringToKey } from 'shared/functions/converters/stringtokey';
import { updateRenderOptions } from 'src/state/functions/updaterenderoptions';
import { state } from 'src/state/state';

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
