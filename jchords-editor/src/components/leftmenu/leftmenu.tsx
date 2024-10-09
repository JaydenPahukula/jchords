import Key, { allKeys, keyToString, stringToKey } from 'shared/types/key';
import SongChart from 'shared/types/songchart';
import SongId from 'shared/types/songid';
import SongInfo from 'shared/types/songinfo';
import './leftmenu.css';
import SongList from './songlist/songlist';
import LeftMenuSubmitButton from './submitbutton/leftmenusubmitbutton';

interface LeftMenuProps {
  songId: SongId | undefined;
  setSongId: (id: SongId | undefined) => void;
  songInfo: SongInfo | undefined;
  setSongInfo: (info: SongInfo | undefined) => void;
  songChart: SongChart | undefined;
  setSongChart: (chart: SongChart | undefined) => void;
  submit: () => Promise<void>;
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

  function setSongKey(newKey: Key) {
    if (props.songChart !== undefined) {
      props.setSongChart({
        ...props.songChart,
        key: newKey,
      });
    }
  }

  const isInfoAndChartDefined = props.songInfo !== undefined && props.songChart !== undefined;

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
              className="left-menu-string-input"
              disabled={!isInfoAndChartDefined}
              value={props.songInfo?.name ?? ''}
              onChange={(e) => setSongName(e.target.value)}
            ></input>
          </div>
          <div>
            <h2 className="left-menu-header">Artist:</h2>
            <input
              className="left-menu-string-input"
              disabled={!isInfoAndChartDefined}
              value={props.songInfo?.artist ?? ''}
              onChange={(e) => setSongArtist(e.target.value)}
            ></input>
          </div>
          <div>
            <h2 className="left-menu-header">Key:</h2>
            <select
              id="artist-input"
              className="left-menu-key-input"
              disabled={!isInfoAndChartDefined}
              value={keyToString(props.songChart?.key ?? Key.None)}
              onChange={(e) => setSongKey(stringToKey(e.target.value))}
            >
              {allKeys.map((key: Key) => {
                const str = keyToString(key);
                return (
                  <option key={key} value={str}>
                    {str}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="left-menu-spacer"></div>
          <LeftMenuSubmitButton
            creatingSong={props.songId === ''}
            enabled={isInfoAndChartDefined}
            submit={props.submit}
          ></LeftMenuSubmitButton>
        </>
      )}
    </div>
  );
}
