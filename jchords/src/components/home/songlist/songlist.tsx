import { ReactElement, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PlayCircleIcon20 from 'src/components/icons/playcircleicon20';
import ResponsivenessContext from 'src/contexts/responsiveness';
import { getAllSongInfo } from 'src/db/functions';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectSongData, setLoading, setSongsLoaded, updateSongs } from 'src/redux/slices/songdata';
import './songlist.css';

export default function SongList(): ReactElement {
  const { isMobile } = useContext(ResponsivenessContext);
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
      <h2 id="songlist-header">All Songs</h2>
      {Object.keys(songs).map((id) => (
        <div className="songlist-item" key={id}>
          <div className="songlist-item-info">
            <h3 className="songlist-item-heading">{songs[id].title}</h3>
            <h4 className="songlist-item-subheading">{songs[id].artist}</h4>
          </div>
          <Link to={`/song/${id}`} className="songlist-item-button">
            {isMobile ? '' : 'Open'}
            <PlayCircleIcon20 />
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <>error</>
  );
}
