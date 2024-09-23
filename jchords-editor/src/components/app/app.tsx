import { useEffect, useState } from 'react';
import DBManager from 'shared/db/dbmanager';
import SongInfo from 'shared/types/songinfo';
import Editor from 'src/components/editor/editor';
import LeftMenu from 'src/components/leftmenu/leftmenu';
import './app.css';

const MIN_LEFT_MENU_WIDTH = 300; // px

export default function App() {
  const [songList, setSongList] = useState<SongInfo[]>([]);
  const [selectedSongId, setSelectedSongId] = useState<string | undefined>();

  function refreshSongList() {
    DBManager.getAllSongInfo().then(setSongList);
  }

  useEffect(() => {
    refreshSongList();
  }, []);

  return (
    <div id="app">
      <LeftMenu selectedSongId={selectedSongId} setSelectedSongId={setSelectedSongId}></LeftMenu>
      <Editor></Editor>
    </div>
  );
}
