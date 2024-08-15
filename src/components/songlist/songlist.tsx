import { useEffect, useState } from 'react';
import SongListLoadingComponent from 'src/components/songlist/loading/songlistloading';
import SongListRowComponent from 'src/components/songlist/row/songlistrow';
import DBManager from 'src/db/dbmanager';
import SongInfo from 'src/types/songinfo';
import './songlist.css';

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
