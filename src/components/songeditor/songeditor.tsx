import { useEffect, useState } from 'react';
import DBManager from 'src/db/dbmanager';
import Chart from 'src/types/chart';
import SongInfo, { emptySongInfo } from 'src/types/songinfo';
import ChartEditorComponent from './charteditor/charteditor';
import SongEditorPickerComponent from './picker/songeditorpicker';
import './songeditor.css';

export default function SongEditorComponent() {
  const [songList, setSongList] = useState<SongInfo[]>([]);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [chart, setChart] = useState<Chart | undefined>();

  const creatingNewSong = selectedId === '';
  const songInfo: SongInfo | undefined = creatingNewSong
    ? emptySongInfo()
    : songList.find((song) => song.id === selectedId);

  useEffect(() => {
    DBManager.getAllSongInfo().then(setSongList);
  }, []);

  useEffect(() => {
    if (selectedId !== undefined) {
      DBManager.getSongChart(selectedId).then(setChart);
    }
  }, [selectedId]);

  return (
    <div className="song-editor">
      <h1>Welcome to the song editor!</h1>
      <p>Choose a song:</p>
      <SongEditorPickerComponent songs={songList} selectedId={selectedId} onIdSelected={setSelectedId} />
      <div>
        {creatingNewSong ? 'Creating a new song...  ' : `Selected song id: (${selectedId})  `}
        <button onClick={() => setSelectedId(undefined)}>Choose a different song</button>
      </div>
      {songInfo === undefined ? (
        <></>
      ) : (
        <>
          <div>
            <h2>Title:</h2>
            <input defaultValue={songInfo.name}></input>
          </div>
          <div>
            <h2>Artist:</h2>
            <input defaultValue={songInfo.artist}></input>
          </div>
          <ChartEditorComponent chart={chart} setChart={setChart} />
          <div>
            <h2>View Raw:</h2>
            <pre>{JSON.stringify(chart, undefined, 2)}</pre>
          </div>
        </>
      )}
    </div>
  );
}
