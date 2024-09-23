import { useEffect, useState } from 'react';
import DBManager from 'shared/db/dbmanager';
import SongInfo, { makeEmptySongInfo } from 'shared/types/songinfo';
import './leftmenu.css';
import SongList from './songlist/songlist';

interface LeftMenuProps {
  selectedSongId: string | undefined;
  setSelectedSongId: (id: string | undefined) => void;
}

export default function LeftMenu(props: LeftMenuProps) {
  const [selectedSongInfo, setSelectedSongInfo] = useState<SongInfo | undefined>();

  useEffect(() => {
    if (props.selectedSongId === '') {
      setSelectedSongInfo(makeEmptySongInfo());
    } else if (props.selectedSongId !== undefined) {
      DBManager.getSongInfo(props.selectedSongId).then(setSelectedSongInfo);
    }
  }, [props.selectedSongId]);

  function setSongName(newName: string) {
    if (selectedSongInfo !== undefined) {
      setSelectedSongInfo({
        ...selectedSongInfo,
        name: newName,
      });
    }
  }

  function setSongArtist(newArtist: string) {
    if (selectedSongInfo !== undefined) {
      setSelectedSongInfo({
        ...selectedSongInfo,
        artist: newArtist,
      });
    }
  }

  return (
    <div id="left-menu">
      <h1 className="left-menu-title">JChords Editor</h1>
      {props.selectedSongId === undefined ? (
        <div className="left-menu-song-list-section">
          <h2 className="left-menu-header">Select a song to edit:</h2>
          <SongList
            selectedSongId={props.selectedSongId}
            setSelectedSongId={props.setSelectedSongId}
          ></SongList>
        </div>
      ) : (
        <>
          <div>
            <button onClick={() => props.setSelectedSongId(undefined)}>
              &lt; Edit a different song
            </button>
          </div>
          <h2 className="left-menu-header">
            {props.selectedSongId === ''
              ? 'Creating a new song...'
              : 'ID = ' + props.selectedSongId}
          </h2>
          <div>
            <h2 className="left-menu-header">Title:</h2>
            <input
              className="left-menu-input"
              disabled={selectedSongInfo === undefined}
              value={selectedSongInfo?.name}
              onChange={(e) => setSongName(e.target.value)}
            ></input>
          </div>
          <div>
            <h2 className="left-menu-header">Artist:</h2>
            <input
              className="left-menu-input"
              disabled={selectedSongInfo === undefined}
              value={selectedSongInfo?.artist}
              onChange={(e) => setSongArtist(e.target.value)}
            ></input>
          </div>
        </>
      )}
    </div>
  );
}
