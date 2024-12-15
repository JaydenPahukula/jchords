import { ChangeEvent, ForwardedRef, forwardRef } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectRenderSettings, updateRenderSettings } from 'src/redux/slices/rendersettings';
import { cmAccidental } from 'src/types/cmsong';

const TransposeMenu = forwardRef<HTMLDivElement>(function TransposeMenu(
  props: {},
  ref: ForwardedRef<HTMLDivElement>,
) {
  const dispatch = useAppDispatch();
  const { transposeValue, accidentalsType } = useAppSelector(selectRenderSettings).settings;

  const transposeOptions = [6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5];

  function handleTransposeChange(e: ChangeEvent<HTMLSelectElement>) {
    const n = parseInt(e.target.value);
    if (!Number.isNaN(n)) {
      dispatch(
        updateRenderSettings({
          transposeValue: n,
        }),
      );
    }
  }

  function handleAccidentalsChange(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === cmAccidental.sharp) {
      dispatch(
        updateRenderSettings({
          accidentalsType: cmAccidental.sharp,
        }),
      );
    } else if (e.target.value === cmAccidental.flat) {
      dispatch(
        updateRenderSettings({
          accidentalsType: cmAccidental.flat,
        }),
      );
    }
  }

  return (
    <div className="toolbar-menu" ref={ref}>
      <h2 className="toolbar-menu-header">Transpose</h2>
      <div className="toolbar-menu-section">
        <h3 className="toolbar-menu-section-header">Manual</h3>
        <div className="toolbar-menu-line">
          <label className="toolbar-menu-label">Transpose:</label>
          <select
            className="toolbar-menu-select"
            value={transposeValue}
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
          <label className="toolbar-menu-label">Accidentals:</label>
          <select
            className="toolbar-menu-select"
            value={accidentalsType}
            onChange={handleAccidentalsChange}
          >
            <option value={cmAccidental.sharp}>Sharp</option>
            <option value={cmAccidental.flat}>Flat</option>
          </select>
        </div>
      </div>
    </div>
  );
});

export default TransposeMenu;
