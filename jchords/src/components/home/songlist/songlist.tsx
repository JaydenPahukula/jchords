import { ReactElement, useEffect } from 'react';
import { getAllSongInfo } from 'src/db/functions';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectSongData, setLoading, setSongsLoaded, updateSongs } from 'src/redux/slices/songdata';
import './songlist.css';

export default function SongList(): ReactElement {
  const dispatch = useAppDispatch();
  const { loading, songsLoaded, songs } = useAppSelector(selectSongData);

  useEffect(() => {
    // load songs if not loaded already
    if (!songsLoaded) {
      dispatch(setLoading(true));
      getAllSongInfo().then((result) => {
        if (result !== undefined) {
          dispatch(updateSongs(Object.fromEntries(result.map((info) => [info.id, info]))));
          dispatch(setSongsLoaded());
        }
        dispatch(setLoading(false));
      });
    }
  });

  return loading ? (
    <>loading...</>
  ) : songsLoaded ? (
    <div id="songlist">
      <div id="songlist-header">All Songs</div>
    </div>
  ) : (
    <>error</>
  );
}
