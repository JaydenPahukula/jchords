import React, { useEffect, useState } from 'react';
import DBManager from 'src/db/dbmanager';
import SongInfo, { emptySongInfo } from 'src/types/songinfo';
import ChartEditorComponent from './charteditor/charteditor';
import SongEditorPickerComponent from './picker/songeditorpicker';
import './songeditor.css';

export default function SongEditorComponent() {
  const [songList, setSongList] = useState<SongInfo[]>([]);
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const creatingNewSong = selectedId === '';
  const songInfo: SongInfo | undefined = creatingNewSong
    ? emptySongInfo()
    : songList.find((song) => song.id === selectedId);

  useEffect(() => {
    DBManager.getAllSongInfo().then((list) => {
      setSongList(list);
    });
  }, []);

  return (
    <div className="song-editor">
      <h1>Welcome to the song editor!</h1>
      <p>Choose a song:</p>
      <SongEditorPickerComponent songs={songList} selectedId={selectedId} onIdSelected={setSelectedId} />
      {selectedId !== undefined ? (
        <React.Fragment>
          <div>
            {creatingNewSong ? 'Creating a new song...  ' : `Selected song id: (${selectedId})  `}
            <button onClick={() => setSelectedId(undefined)}>Choose a different song</button>
          </div>
          {songInfo === undefined ? (
            <p>Could not find song</p>
          ) : (
            <React.Fragment>
              <div>
                <h2>Title:</h2>
                <input defaultValue={songInfo.name}></input>
              </div>
              <div>
                <h2>Artist:</h2>
                <input defaultValue={songInfo.artist}></input>
              </div>
              <ChartEditorComponent songId={selectedId} />
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <></>
      )}
    </div>
  );
}
