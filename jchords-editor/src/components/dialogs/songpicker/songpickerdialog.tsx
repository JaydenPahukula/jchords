import { ReactElement, useEffect, useState } from 'react';
import { getAllSongInfo, getSongSrc } from 'src/db/functions';
import { useAppDispatch } from 'src/redux/hooks';
import { closeSongPickerDialog } from 'src/redux/slices/dialog';
import { openSong, updateSongSrc } from 'src/redux/slices/songdata';
import Song from 'src/types/song';
import SongId from 'src/types/songid';
import SongInfo from 'src/types/songinfo';
import classes from 'src/utils/classes';
import './songpickerdialog.css';

export default function SongPickerDialog(): ReactElement {
  const [songList, setSongList] = useState<SongInfo[] | undefined>();
  const [isSongListLoading, setIsSongListLoading] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<SongId | undefined>(undefined);

  const dispatch = useAppDispatch();

  // load song list
  useEffect(() => {
    setIsSongListLoading(true);
    getAllSongInfo().then((result) => {
      setSongList(result);
      setIsSongListLoading(false);
    });
  }, []);

  function submit() {
    const info = songList?.find((info) => info.id === selectedId);
    if (info !== undefined) {
      const newSong: Song = {
        src: undefined,
        info: info,
      };
      dispatch(openSong(newSong));
      getSongSrc(info.id).then(
        (res) =>
          res !== undefined && dispatch(updateSongSrc({ id: info.id, newSrc: res, modify: false })),
      );
      dispatch(closeSongPickerDialog());
    }
  }

  return (
    <div id="song-picker-dialog" className="dialog">
      <h2>Select a song to open:</h2>
      <div id="song-picker-list">
        {isSongListLoading ? (
          <>Loading...</>
        ) : songList === undefined ? (
          <>Error</>
        ) : (
          songList.map((info) => {
            const isSelected = info.id === selectedId;
            return (
              <div
                key={info.id}
                className={classes({
                  'song-picker-list-item': !isSelected,
                  'song-picker-list-item-selected': isSelected,
                })}
                onClick={() => setSelectedId(info.id)}
              >
                {info.title}
              </div>
            );
          })
        )}
      </div>
      <div id="song-picker-dialog-footer">
        <button
          id="song-picker-confirm-button"
          disabled={selectedId === undefined}
          onClick={submit}
        >
          Open
        </button>
      </div>
    </div>
  );
}
