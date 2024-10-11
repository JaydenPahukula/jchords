import { ChangeEvent, useContext } from 'react';
import { stringToAccidentalsType } from 'shared/types/accidentaltype';
import Key, { keyToString, realKeys, stringToKey } from 'shared/types/key';
import Settings from 'shared/types/settings';
import SongContext from 'src/pages/song/songcontext';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { updateSettings } from 'src/redux/slices/settings';

export default function MenuTransposeSection() {
  const { songChart } = useContext(SongContext);
  const dispatch = useAppDispatch();

  const settings: Settings = useAppSelector((state) => state.settings.value);

  const originalKey: Key = songChart?.key ?? Key.None;
  const selectedKey: Key | undefined = settings.key;

  const disabled = originalKey === Key.None;
  const accidentalsDisabled = disabled || !settings.overrideAccidentals;

  function updateKey(e: ChangeEvent<HTMLSelectElement>) {
    const newKey = stringToKey(e.target.value);
    dispatch(updateSettings({ key: newKey }));
  }

  function updateOverrideAccidentals(e: ChangeEvent<HTMLInputElement>) {
    dispatch(updateSettings({ overrideAccidentals: e.target.checked }));
  }

  function updateAccidentalsType(e: ChangeEvent<HTMLSelectElement>) {
    dispatch(updateSettings({ accidentalsType: stringToAccidentalsType(e.target.value) }));
  }

  return (
    <div className="menu-section">
      <h3>Transpose</h3>
      <div className="menu-row">
        <label className="menu-row-text">Key:</label>
        <select
          disabled={disabled}
          value={keyToString(selectedKey ?? originalKey)}
          onChange={updateKey}
        >
          {realKeys.map((key: Key) => {
            const str = keyToString(key);
            return (
              <option value={str} key={key}>
                {str + (key === songChart?.key ? ' (original)' : '')}
              </option>
            );
          })}
        </select>
      </div>
      <div className="menu-row">Accidentals:</div>
      <div className="menu-row-indented">
        <label className={disabled ? 'menu-row-text-disabled' : 'menu-row-text'}>Override:</label>
        <input
          type="checkbox"
          disabled={disabled}
          checked={settings.overrideAccidentals}
          onChange={updateOverrideAccidentals}
        ></input>
      </div>
      <div className="menu-row-indented">
        <label className={accidentalsDisabled ? 'menu-row-text-disabled' : 'menu-row-text'}>
          Type:
        </label>
        <select
          disabled={accidentalsDisabled}
          value={settings.accidentalsType}
          onChange={updateAccidentalsType}
        >
          {['flat', 'sharp'].map((s: string) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
