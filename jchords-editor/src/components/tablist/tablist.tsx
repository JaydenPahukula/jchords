import { ReactElement } from 'react';
import PlusIcon18 from 'src/components/icons/plusicon18';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { closeSong, openSong, selectSongData, setCurrSong } from 'src/redux/slices/songdata';
import classes from 'src/utils/classes';
import makeBlankSong from 'src/utils/makeblanksong';
import XIcon12 from '../icons/xicon12';
import './tablist.css';

export default function TabList(): ReactElement {
  const dispatch = useAppDispatch();
  const { currIndex, songs, order } = useAppSelector(selectSongData);

  const newSong = () => dispatch(openSong({ song: makeBlankSong(), isNew: true }));

  return (
    <div id="tablist">
      {order.map((id: string, i: number) => {
        const { song, srcModified, infoModified, isNew } = songs[id];
        const selected = i === currIndex;
        return (
          <div
            key={id}
            className={classes({ tab: !selected, 'tab-selected': selected })}
            onClick={() => dispatch(setCurrSong(i))}
          >
            <h2 className="tab-title">
              {song.info.title + (srcModified || infoModified || isNew ? ' *' : ' ')}
            </h2>
            <button className="tab-close-button" onClick={() => dispatch(closeSong(i))}>
              <XIcon12 />
            </button>
          </div>
        );
      })}
      <div className="tab" onClick={newSong}>
        <PlusIcon18 />
      </div>
    </div>
  );
}
