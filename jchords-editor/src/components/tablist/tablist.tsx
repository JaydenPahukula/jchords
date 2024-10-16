import { ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { openSongPickerDialog } from 'src/redux/slices/dialog';
import { selectSongData, setCurrSong } from 'src/redux/slices/songdata';
import SongId from 'src/types/songid';
import classes from 'src/utils/classes';
import './tablist.css';

export default function TabList(): ReactElement {
  const dispatch = useAppDispatch();
  const { currSongId, songs, order } = useAppSelector(selectSongData);

  const openSongPicker = () => dispatch(openSongPickerDialog());

  return (
    <div id="tablist">
      {order.map((id: SongId) => {
        const { song, modified } = songs[id];
        const selected = id === currSongId;
        return (
          <div
            key={id}
            className={classes({ tab: !selected, 'tab-selected': selected })}
            onClick={() => dispatch(setCurrSong(id))}
          >
            {song.info.title}
          </div>
        );
      })}
      <div className="tab" onClick={openSongPicker}>
        +
      </div>
    </div>
  );
}
