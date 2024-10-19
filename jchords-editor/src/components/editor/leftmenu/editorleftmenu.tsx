import { ChangeEvent, ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectCurrSong, updateSongInfo } from 'src/redux/slices/songdata';
import './editorleftmenu.css';

export default function EditorLeftMenu(): ReactElement {
  const song = useAppSelector(selectCurrSong);
  const dispatch = useAppDispatch();

  const updateTitle = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(updateSongInfo({ id: song.info.id, update: { title: e.target.value } }));
  const updateArtist = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(updateSongInfo({ id: song.info.id, update: { artist: e.target.value } }));

  return (
    <div id="editor-left-menu">
      <div className="editor-left-menu-section">
        <h3 className="editor-left-menu-section-header">Title:</h3>
        <input
          className="editor-left-menu-input"
          value={song.info.title}
          onChange={updateTitle}
        ></input>
      </div>
      <div className="editor-left-menu-section">
        <h3 className="editor-left-menu-section-header">Artist:</h3>
        <input
          className="editor-left-menu-input"
          value={song.info.artist}
          onChange={updateArtist}
        ></input>
      </div>
    </div>
  );
}
