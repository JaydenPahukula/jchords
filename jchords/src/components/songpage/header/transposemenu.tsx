import { useContext } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
import Accidental from 'src/shared/enums/accidental';
import Mode from 'src/shared/enums/mode';
import calcKey from 'src/shared/functions/calckey';
import cmAccidentalsTypeToAccidental from 'src/shared/functions/cmaccidentalstypetoaccidental';
import keyToString from 'src/shared/functions/keytostring';
import { setAccidentalsType, setKey, setTransposeValue } from 'src/state/functions/transpose';
import updateRenderOptions from 'src/state/functions/updaterenderoptions';
import UIStateContext from 'src/state/uistatecontext';

// prettier-ignore
const majorKeyOptions = ['C','C#','Db','D','D#','Eb','E','F','F#','Gb','G','G#','Ab','A','A#','Bb','B'];
const minorKeyOptions = majorKeyOptions.map((s) => s + 'm');

export default function TransposeMenu() {
  const { currSong, renderOptions } = useContext(UIStateContext);

  const { defaultKey, defaultAccidental, mode } = currSong.value;
  const renderOpts = renderOptions.value;

  function handleSymbolTypeChange(e: JSX.TargetedMouseEvent<HTMLSelectElement>) {
    const val = e.currentTarget.value;
    if (val == 'chord' || val == 'roman') {
      updateRenderOptions({
        symbolType: val,
      });
    }
  }

  const transposeDisabled = renderOpts.symbolType === 'roman';

  const defaultKeyString = keyToString(defaultKey, defaultAccidental, mode);
  const currAccidental = cmAccidentalsTypeToAccidental(renderOpts.accidentalsType);
  const currKey = calcKey(defaultKey, renderOpts.transposeValue);

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
    <div class="w-60 rounded-lg bg-bg0 p-4 text-fg0 shadow-lg">
      <h2 class="mb-3 text-xl font-bold">Transpose</h2>
      <div class="mb-4 flex flex-col gap-1 border-t border-fg1 pt-4">
        <label class="flex w-full justify-between gap-4">
          Symbol Type:
          <select
            class="flex-grow px-1"
            value={renderOpts.symbolType}
            onChange={handleSymbolTypeChange}
          >
            <option value="chord">Chord</option>
            <option value="roman">Roman</option>
          </select>
        </label>
      </div>
      <div class="mb-5 flex flex-col gap-1 border-t border-fg1 pt-1 has-[:disabled]:text-fgdisabled">
        <h3 class="text-lg font-normal">Automatic</h3>
        <label class="flex w-full justify-between gap-4">
          Key:
          <select
            class="flex-grow px-1"
            value={keyToString(currKey, currAccidental, mode)}
            disabled={transposeDisabled}
            onChange={handleKeyChange}
          >
            {keyOptions.map((key) => (
              <option key={key} value={key}>
                {key === defaultKeyString ? `${key} (default)` : key}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div class="mb-1 flex flex-col gap-1 border-t border-fg1 pt-1 has-[:disabled]:text-fgdisabled">
        <h3 class="text-lg font-normal">Manual</h3>
        <label class="flex w-full justify-between gap-4">
          Transpose:
          <select
            class="flex-grow px-1"
            value={((renderOpts.transposeValue + 5) % 12) - 5}
            disabled={transposeDisabled}
            onChange={handleTransposeChange}
          >
            {transposeOptions.map((n) => (
              <option key={n} value={n}>
                {n >= 0 ? '+' + n : n}
              </option>
            ))}
          </select>
        </label>
        <label class="flex w-full justify-between gap-4">
          Accidentals:
          <select
            class="flex-grow px-1"
            value={currAccidental == Accidental.Flat ? 'flat' : 'sharp'}
            disabled={transposeDisabled}
            onChange={handleAccidentalsChange}
          >
            <option value={'sharp'}>Sharp</option>
            <option value={'flat'}>Flat</option>
          </select>
        </label>
      </div>
    </div>
  );
}
