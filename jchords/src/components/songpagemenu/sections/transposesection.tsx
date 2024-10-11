import { ChangeEvent, useContext } from 'react';
import Key, { keyToString, realKeys, stringToKey } from 'shared/types/key';
import SongContext from 'src/pages/song/songcontext';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { updateSettings } from 'src/redux/settingsslice';

export default function MenuTransposeSection() {
  const { songChart } = useContext(SongContext);
  const dispatch = useAppDispatch();

  const originalKey: Key = songChart?.key ?? Key.None;
  const selectedKey: Key | undefined = useAppSelector((state) => state.settings.value.key);

  function updateKey(e: ChangeEvent<HTMLSelectElement>) {
    const newKey = stringToKey(e.target.value);
    dispatch(updateSettings({ key: newKey }));
  }

  return (
    <div className="menu-section">
      <h3>Transpose: </h3>
      <div className="menu-row">
        <p className="menu-row-text">Key:</p>
        <select
          disabled={originalKey === Key.None}
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
    </div>
  );
}
