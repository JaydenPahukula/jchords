import { useEffect, useState } from 'react';
import DBManager from 'shared/db/dbmanager';
import SongInfo from 'shared/types/songinfo';
import './songlist.css';

const enum States {
  Ok,
  Loading,
  Failed,
}

interface SongListProps {
  selectedSongId: string | undefined;
  setSelectedSongId: (id: string | undefined) => void;
}

export default function SongList(props: SongListProps) {
  const [state, setState] = useState<States>(States.Loading);
  const [songList, setSongList] = useState<SongInfo[]>([]);

  useEffect(() => {
    setState(States.Loading);
    DBManager.getAllSongInfo()
      .then((list) => {
        setSongList(list);
        setState(States.Ok);
      })
      .catch(() => {
        setState(States.Failed);
      });
  }, []);

  return (
    <div className="song-list">
      {state === States.Ok ? (
        songList.map((info: SongInfo) => (
          <div
            className="song-list-row"
            onClick={() => props.setSelectedSongId(info.id)}
            key={info.id}
          >
            {info.name} ({info.id})
          </div>
        ))
      ) : state === States.Loading ? (
        <>loading...</>
      ) : (
        <>failed</>
      )}
    </div>
  );
}
