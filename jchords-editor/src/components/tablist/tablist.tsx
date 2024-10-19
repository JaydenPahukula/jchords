import { ReactElement } from 'react';
import PlusIcon18 from 'src/components/icons/plusicon18';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { openSongPickerDialog } from 'src/redux/slices/dialog';
import { closeSong, selectSongData, setCurrSong } from 'src/redux/slices/songdata';
import SongId from 'src/types/songid';
import classes from 'src/utils/classes';
import XIcon12 from '../icons/xicon12';
import './tablist.css';

export default function TabList(): ReactElement {
  const dispatch = useAppDispatch();
  const { currIndex, songs, order } = useAppSelector(selectSongData);

  const openSongPicker = () => dispatch(openSongPickerDialog());

  return (
    <div id="tablist">
      {order.map((id: SongId, i: number) => {
        const { song, modified } = songs[id];
        const selected = i === currIndex;
        return (
          <div
            key={id}
            className={classes({ tab: !selected, 'tab-selected': selected })}
            onClick={() => dispatch(setCurrSong(i))}
          >
            <h2 className="tab-title">{song.info.title}</h2>
            <button className="tab-close-button" onClick={() => dispatch(closeSong(i))}>
              <XIcon12 />
            </button>
          </div>
        );
      })}
      <div className="tab" onClick={openSongPicker}>
        <PlusIcon18 />
      </div>
    </div>
  );
}