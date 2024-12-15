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
    <div className="toolbar-menu" ref={ref}>
      <h2 className="toolbar-menu-header">Transpose</h2>
      <div className="toolbar-menu-section">
        <h3 className="toolbar-menu-section-header">Automatic</h3>
        <div className="toolbar-menu-line">
          <label className="toolbar-menu-label" htmlFor="automatic transpose">
            Key:
          </label>
          <select
            className="toolbar-menu-select"
            name="automatic transpose"
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
      <div className="toolbar-menu-section">
        <h3 className="toolbar-menu-section-header">Manual</h3>
        <div className="toolbar-menu-line">
          <label className="toolbar-menu-label" htmlFor="manual transpose">
            Transpose:
          </label>
          <select
            className="toolbar-menu-select"
            name="manual transpose"
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
        <div className="toolbar-menu-line">
          <label className="toolbar-menu-label" htmlFor="manual accidentals">
            Accidentals:
          </label>
          <select
            className="toolbar-menu-select"
            name="manual accidentals"
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
