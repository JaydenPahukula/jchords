import { useContext } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
import Accidental from 'src/shared/enums/accidental';
import Mode from 'src/shared/enums/mode';
import calcKey from 'src/shared/functions/calckey';
import cmAccidentalsTypeToAccidental from 'src/shared/functions/cmaccidentalstypetoaccidental';
import keyToString from 'src/shared/functions/keytostring';
import { setAccidentalsType, setKey, setTransposeValue } from 'src/state/functions/transpose';
import UIStateContext from 'src/state/uistatecontext';

// prettier-ignore
const majorKeyOptions = ['C','C#','Db','D','D#','Eb','E','F','F#','Gb','G','G#','Ab','A','A#','Bb','B'];
const minorKeyOptions = majorKeyOptions.map((s) => s + 'm');

export default function TransposeMenu() {
  const { currSong, renderOptions } = useContext(UIStateContext);

  const { defaultKey, defaultAccidental, mode } = currSong.value;
  const currAccidentalsType = renderOptions.value.accidentalsType;
  const currTransposeValue = renderOptions.value.transposeValue;

  const defaultKeyString = keyToString(defaultKey, defaultAccidental, mode);
  const currAccidental = cmAccidentalsTypeToAccidental(currAccidentalsType);
  const currKey = calcKey(defaultKey, currTransposeValue);

  const keyOptions = mode == Mode.Major ? majorKeyOptions : minorKeyOptions;
  function handleKeyChange(e: JSX.TargetedMouseEvent<HTMLSelectElement>) {
    setKey(e.currentTarget.value);
  }

  const transposeOptions = [6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5];
  function handleTransposeChange(e: JSX.TargetedMouseEvent<HTMLSelectElement>) {
    const n = parseInt(e.currentTarget.value);
    if (Number.isNaN(n)) return;
    setTransposeValue(n);
  }

  function handleAccidentalsChange(e: JSX.TargetedMouseEvent<HTMLSelectElement>) {
    const acc = e.currentTarget.value === 'flat' ? Accidental.Flat : Accidental.Sharp;
    setAccidentalsType(acc);
  }

  return (
    <div class="flex w-56 flex-col gap-4 rounded-lg bg-bg0 p-4 text-fg0 shadow-lg">
      <h2 class="text-xl font-bold">Transpose</h2>
      <div class="flex flex-col gap-1">
        <h3 class="text-lg font-normal">Automatic</h3>
        <div class="flex w-full justify-between gap-3">
          <label class="text-sm" htmlFor="automatic-transpose">
            Key:
          </label>
          <select
            class="flex-grow"
            id="automatic-transpose"
            value={keyToString(currKey, currAccidental, mode)}
            onChange={handleKeyChange}
          >
            {keyOptions.map((key) => (
              <option key={key} value={key}>
                {key === defaultKeyString ? `${key} (default)` : key}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <h3 class="text-lg font-normal">Manual</h3>
        <div class="flex w-full justify-between gap-3">
          <label class="text-sm" htmlFor="manual-transpose">
            Transpose:
          </label>
          <select
            class="flex-grow"
            id="manual-transpose"
            value={((currTransposeValue + 5) % 12) - 5}
            onChange={handleTransposeChange}
          >
            {transposeOptions.map((n) => (
              <option key={n} value={n}>
                {n >= 0 ? '+' + n : n}
              </option>
            ))}
          </select>
        </div>
        <div class="flex w-full justify-between gap-3">
          <label class="text-sm" htmlFor="manual-accidentals">
            Accidentals:
          </label>
          <select
            class="flex-grow"
            id="manual-accidentals"
            value={currAccidental == Accidental.Flat ? 'flat' : 'sharp'}
            onChange={handleAccidentalsChange}
          >
            <option value={'sharp'}>Sharp</option>
            <option value={'flat'}>Flat</option>
          </select>
        </div>
      </div>
    </div>
  );
}
