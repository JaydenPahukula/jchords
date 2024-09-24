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
  songId: string | undefined;
  setSongId: (id: string | undefined) => void;
}

export default function SongList(props: SongListProps) {
  const [state, setState] = useState<States>(States.Loading);
  const [songList, setSongList] = useState<SongInfo[]>([]);

  function refreshSongList() {
    setState(States.Loading);
    DBManager.getAllSongInfo()
      .then((list) => {
        if (list !== undefined) {
          setSongList(list);
          setState(States.Ok);
        } else {
          setState(States.Failed);
        }
      })
      .catch(() => {
        setState(States.Failed);
      });
  }

  useEffect(refreshSongList, []);

  return (
    <div className="song-list">
      {state === States.Ok ? (
        <>
          {songList.map((info: SongInfo) => (
            <div className="song-list-row" onClick={() => props.setSongId(info.id)} key={info.id}>
              {info.name} ({info.id})
            </div>
          ))}
          <div className="song-list-row" onClick={() => props.setSongId('')} key={'new-song'}>
            Create a new song...
          </div>
        </>
      ) : state === States.Loading ? (
        <>loading...</>
      ) : (
        <>failed</>
      )}
    </div>
  );
}
