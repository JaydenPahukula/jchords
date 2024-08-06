import { useEffect, useState } from 'react';
import DBManager from 'src/db/dbmanager';
import SongInfo from 'src/types/songinfo';
import './songlist.css';
import SongListLoadingComponent from './songlistloading';
import SongListRowComponent from './songlistrow';

export default function SongListComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [songList, setSongList] = useState<SongInfo[]>([]);

  useEffect(() => {
    DBManager.getAllSongInfo().then((list) => {
      setSongList(list);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <SongListLoadingComponent></SongListLoadingComponent>
  ) : (
    <div className="song-list">
      <h2>Song List:</h2>
      {songList.map((song) => (
        <SongListRowComponent info={song} key={song.id}></SongListRowComponent>
      ))}
    </div>
  );
}
