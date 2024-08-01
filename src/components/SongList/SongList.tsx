import { useEffect, useState } from 'react';
import DBManager from 'src/db/DBManager';
import SongInfo from 'src/types/SongInfo';
import './SongList.css';
import SongListLoadingComponent from './SongListLoading';
import SongListRowComponent from './SongListRow';

export default function SongListComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [songList, setSongList] = useState<SongInfo[]>([]);

  useEffect(() => {
    let mounted = true;
    DBManager.getAllSongInfo().then((list) => {
      if (mounted) {
        setSongList(list);
        setIsLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return isLoading ? (
    <SongListLoadingComponent></SongListLoadingComponent>
  ) : (
    <div className="song-list">
      <h2>Song List:</h2>
      {songList.map((song) => (
        <SongListRowComponent info={song}></SongListRowComponent>
      ))}
    </div>
  );
}
