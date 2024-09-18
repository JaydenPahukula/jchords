import { useState } from 'react';
import DBManager from 'shared/db/dbmanager';
import Chart from 'shared/types/chart';
import SongInfo from 'shared/types/songinfo';
import './editorsubmitbutton.css';

interface EditorSubmitButtonComponentProps {
  chart: Chart | undefined;
  songInfo: SongInfo;
  isNewSong: boolean;
  onSuccess: () => void;
}

export default function EditorSubmitButtonComponent(props: EditorSubmitButtonComponentProps) {
  const [successful, setSuccessful] = useState(false);
  const [resultString, setResultString] = useState('');

  function submit() {
    if (props.chart !== undefined) {
      if (props.isNewSong) {
        DBManager.createSong(props.songInfo, props.chart).then(
          (newId) => {
            setResultString(`Successfully created song! (id: ${newId})`);
            setSuccessful(true);
            props.onSuccess();
          },
          (error) => {
            console.error(error);
            setResultString('Failed to create song');
            setSuccessful(false);
          },
        );
      } else {
        Promise.all([
          DBManager.updateSongInfo(props.songInfo),
          DBManager.updateChart(props.songInfo.id, props.chart),
        ]).then(
          () => {
            setResultString('Successfully update song!');
            setSuccessful(true);
            props.onSuccess();
          },
          (error) => {
            console.error(error);
            setResultString('Failed to update song');
            setSuccessful(false);
          },
        );
      }
    }
  }

  return (
    <div className="flex-row">
      <button
        className="editor-submit-button"
        disabled={props.chart === undefined}
        onClick={submit}
      >
        {props.isNewSong ? 'Create Song' : 'Update Song'}
      </button>
      <p className={successful ? 'success-msg' : 'error-msg'}>{resultString}</p>
    </div>
  );
}
