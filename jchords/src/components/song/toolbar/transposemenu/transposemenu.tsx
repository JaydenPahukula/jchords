import { ChangeEvent, ForwardedRef, forwardRef } from 'react';
import InvalidKeyError from 'src/errors/invalidkeyerror';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectRenderSettings, updateRenderSettings } from 'src/redux/slices/rendersettings';
import { selectSongData } from 'src/redux/slices/songdata';
import { allKeys, isKey } from 'src/types/key';
import calculateTransposeValue from 'src/utils/calculatetransposevalue';
import calculateAccidentals from 'src/utils/keytoaccidentals';
import transposeKey from 'src/utils/transposekey';

const TransposeMenu = forwardRef<HTMLDivElement>(function TransposeMenu(
  props: {},
  ref: ForwardedRef<HTMLDivElement>,
) {
  const dispatch = useAppDispatch();
  const { transposeValue, accidentalsType } = useAppSelector(selectRenderSettings).settings;
  const defaultKey = useAppSelector(selectSongData).defaultKey;

  function handleKeyChange(e: ChangeEvent<HTMLSelectElement>) {
    if (!isKey(e.target.value)) throw new InvalidKeyError(e.target.value);
    if (defaultKey !== undefined) {
      dispatch(
        updateRenderSettings({
          transposeValue: calculateTransposeValue(defaultKey, e.target.value),
          accidentalsType: calculateAccidentals(e.target.value),
        }),
      );
    }
  }

  const transposeOptions = [6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5];
  function handleTransposeChange(e: ChangeEvent<HTMLSelectElement>) {
    const n = parseInt(e.target.value);
    if (!Number.isNaN(n)) {
      dispatch(
        updateRenderSettings({
          transposeValue: (n + 12) % 12,
        }),
      );
    }
  }

  function handleAccidentalsChange(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === 'sharp') {
      dispatch(
        updateRenderSettings({
          accidentalsType: 'sharp',
        }),
      );
    } else if (e.target.value === 'flat') {
      dispatch(
        updateRenderSettings({
          accidentalsType: 'flat',
        }),
      );
    }
  }

  return (
    <div
      className="bg-bg0 text-fg0 width-52 absolute right-0 top-2 flex flex-col items-center gap-4 rounded-lg p-4 pb-6 shadow-md"
      ref={ref}
    >
      <h2 className="text-xl font-bold">Transpose</h2>
      <div className="flex w-full flex-col gap-2">
        <h3 className="text-lg font-normal">Automatic</h3>
        <div className="flex w-full justify-between gap-3">
          <label className="text-sm" htmlFor="automatic-transpose">
            Key:
          </label>
          <select
            className="flex-grow"
            id="automatic-transpose"
            value={
              defaultKey === undefined
                ? ''
                : transposeKey(
                    defaultKey,
                    transposeValue,
                    accidentalsType === 'auto' ? undefined : accidentalsType,
                  )
            }
            onChange={handleKeyChange}
          >
            {allKeys.map((key, i) => (
              <option key={i} value={key}>
                {key === defaultKey ? `${key} (default)` : key}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <h3 className="text-lg font-normal">Manual</h3>
        <div className="flex w-full justify-between gap-3">
          <label className="text-sm" htmlFor="manual-transpose">
            Transpose:
          </label>
          <select
            className="flex-grow"
            id="manual-transpose"
            value={((transposeValue + 5) % 12) - 5}
            onChange={handleTransposeChange}
          >
            {transposeOptions.map((n) => (
              <option key={n} value={n}>
                {n >= 0 ? '+' + n : n}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-full justify-between gap-3">
          <label className="text-sm" htmlFor="manual-accidentals">
            Accidentals:
          </label>
          <select
            className="flex-grow"
            id="manual-accidentals"
            value={accidentalsType}
            onChange={handleAccidentalsChange}
          >
            <option value={'sharp'}>Sharp</option>
            <option value={'flat'}>Flat</option>
          </select>
        </div>
      </div>
    </div>
  );
});

export default TransposeMenu;
