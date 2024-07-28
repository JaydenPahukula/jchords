import { useEffect, useState } from 'react';
import SongListLoadingComponent from './SongListLoading';
import DBManager from 'src/db/DBManager';
import SongInfo from 'src/types/SongInfo';
import './SongList.css';
import SongListRowComponent from './SongListRow';

export default function SongListComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [songList, setSongList] = useState<SongInfo[]>([]);

  useEffect(() => {
    let mounted = true;
    DBManager.getSongs().then((list) => {
      if (mounted) {
        setSongList(list);
        setIsLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return <SongListLoadingComponent></SongListLoadingComponent>;
  } else {
    return (
      <div className="song-list">
        <h2>Song List:</h2>
        {songList.map((song) => (
          <SongListRowComponent info={song}></SongListRowComponent>
        ))}
      </div>
    );
  }
}
