import SongChart from 'shared/types/songchart';
import SongId from 'shared/types/songid';
import SongInfo from 'shared/types/songinfo';
import './leftmenu.css';
import SongList from './songlist/songlist';

export enum SubmitButtonStatus {
  None,
  Loading,
  Created,
  Updated,
  Failed,
}

interface LeftMenuProps {
  songId: SongId | undefined;
  setSongId: (id: SongId | undefined) => void;
  songInfo: SongInfo | undefined;
  setSongInfo: (info: SongInfo | undefined) => void;
  songChart: SongChart | undefined;
  setSongChart: (chart: SongChart | undefined) => void;
  submit: () => void;
  submitStatus: SubmitButtonStatus;
}

export default function LeftMenu(props: LeftMenuProps) {
  function setSongName(newName: string) {
    if (props.songInfo !== undefined) {
      props.setSongInfo({
        ...props.songInfo,
        name: newName,
      });
    }
  }

  function setSongArtist(newArtist: string) {
    if (props.songInfo !== undefined) {
      props.setSongInfo({
        ...props.songInfo,
        artist: newArtist,
      });
    }
  }

  return (
    <div id="left-menu">
      <h1 className="left-menu-title">JChords Editor</h1>
      {props.songId === undefined ? (
        <div className="left-menu-song-list-section">
          <h2 className="left-menu-header">Select a song to edit:</h2>
          <SongList songId={props.songId} setSongId={props.setSongId}></SongList>
        </div>
      ) : (
        <>
          <div>
            <button onClick={() => props.setSongId(undefined)}>&lt; Edit a different song</button>
          </div>
          <h2 className="left-menu-header">
            {props.songId === '' ? 'Creating a new song...' : 'ID = ' + props.songId}
          </h2>
          <div>
            <h2 className="left-menu-header">Title:</h2>
            <input
              id="name-input"
              className="left-menu-input"
              disabled={props.songInfo === undefined}
              value={props.songInfo?.name ?? ''}
              onChange={(e) => setSongName(e.target.value)}
            ></input>
          </div>
          <div>
            <h2 className="left-menu-header">Artist:</h2>
            <input
              id="artist-input"
              className="left-menu-input"
              disabled={props.songInfo === undefined}
              value={props.songInfo?.artist ?? ''}
              onChange={(e) => setSongArtist(e.target.value)}
            ></input>
          </div>
          <div className="left-menu-spacer"></div>
          {props.submitStatus === SubmitButtonStatus.None ? (
            <></>
          ) : props.submitStatus === SubmitButtonStatus.Loading ? (
            <p>Working...</p>
          ) : props.submitStatus === SubmitButtonStatus.Created ? (
            <p className="left-menu-submit-msg-success">Successfully created new song!</p>
          ) : props.submitStatus === SubmitButtonStatus.Updated ? (
            <p className="left-menu-submit-msg-success">Successfully updated song!</p>
          ) : (
            <p className="left-menu-submit-msg-failure">Something went wrong</p>
          )}
          <button
            id="left-menu-submit-button"
            disabled={
              props.songId === undefined ||
              props.songInfo === undefined ||
              props.songChart === undefined
            }
            onClick={props.submit}
          >
            UPDATE SONG
          </button>
        </>
      )}
    </div>
  );
}