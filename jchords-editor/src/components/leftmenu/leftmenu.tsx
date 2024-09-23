import SongList from 'src/components/songlist/songlist';
import './leftmenu.css';

interface LeftMenuProps {
  selectedSongId: string | undefined;
  setSelectedSongId: (id: string | undefined) => void;
}

export default function LeftMenu(props: LeftMenuProps) {
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
        </>
      )}
    </div>
  );
}
