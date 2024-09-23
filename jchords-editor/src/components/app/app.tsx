import { useState } from 'react';
import Editor from 'src/components/editor/editor';
import LeftMenu from 'src/components/leftmenu/leftmenu';
import './app.css';

const MIN_LEFT_MENU_WIDTH = 300; // px

export default function App() {
  const [selectedSongId, setSelectedSongId] = useState<string | undefined>();

  return (
    <div id="app">
      <LeftMenu selectedSongId={selectedSongId} setSelectedSongId={setSelectedSongId}></LeftMenu>
      <Editor></Editor>
    </div>
  );
}
