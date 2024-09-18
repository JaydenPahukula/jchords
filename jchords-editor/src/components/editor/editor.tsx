import { useEffect, useState } from 'react';
import DBManager from 'shared/db/dbmanager';
import Chart, { makeEmptyChart } from 'shared/types/chart';
import SongInfo, { makeEmptySongInfo } from 'shared/types/songinfo';
import ChartEditorComponent from 'src/components/editor/charteditor/charteditor';
import InfoEditorComponent from 'src/components/editor/infoeditor/infoeditor';
import SongPickerComponent from 'src/components/editor/songpicker/songpicker';
import './editor.css';
import EditorSubmitButtonComponent from './submitbutton/editorsubmitbutton';

export default function EditorComponent() {
  const [songList, setSongList] = useState<SongInfo[]>([]);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [chart, setChart] = useState<Chart | undefined>();
  const [songInfo, setSongInfo] = useState<SongInfo | undefined>();

  function refreshSongList() {
    DBManager.getAllSongInfo().then(setSongList);
  }

  useEffect(() => {
    refreshSongList();
  }, []);

  useEffect(() => {
    if (selectedId !== undefined) {
      if (selectedId === '') {
        setChart(makeEmptyChart());
        setSongInfo(makeEmptySongInfo());
      } else {
        DBManager.getSongChart(selectedId).then(setChart);
        setSongInfo(songList.find((song) => song.id === selectedId));
      }
    }
  }, [songList, selectedId]);

  return (
    <div className="song-editor">
      {selectedId === undefined || songInfo === undefined ? (
        <>
          <h1>Welcome to the song editor!</h1>
          <p>Choose a song to edit:</p>
          <SongPickerComponent
            songs={songList}
            selectedId={selectedId}
            onIdSelected={setSelectedId}
          ></SongPickerComponent>
        </>
      ) : (
        <>
          <div>
            {selectedId === '' ? 'Creating a new song...  ' : `Selected song id: (${selectedId})  `}
            <button onClick={() => setSelectedId(undefined)}>Edit a different song</button>
          </div>
          <InfoEditorComponent info={songInfo} setInfo={setSongInfo}></InfoEditorComponent>
          <ChartEditorComponent chart={chart} setChart={setChart}></ChartEditorComponent>
          <EditorSubmitButtonComponent
            chart={chart}
            songInfo={songInfo}
            isNewSong={selectedId === ''}
            onSuccess={refreshSongList}
          ></EditorSubmitButtonComponent>
          <div>
            <h2>View Raw:</h2>
            <pre>{`songInfo: ${JSON.stringify(songInfo, undefined, 2)}\nchart: ${JSON.stringify(chart, undefined, 2)}`}</pre>
          </div>
        </>
      )}
    </div>
  );
}
