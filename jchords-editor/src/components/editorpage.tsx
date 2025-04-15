import { useContext } from 'preact/hooks';
import Editor from 'src/components/editor';
import LeftMenu from 'src/components/leftmenu';
import TitleRow from 'src/components/titlerow';
import Toolbar from 'src/components/toolbar';
import StateContext from 'src/state/statecontext';

export default function EditorPage() {
  const state = useContext(StateContext);
  return (
    <div id="editor-page" class="grid h-full w-full grid-rows-[min-content_min-content_auto]">
      <TitleRow />
      <Toolbar />
      <div class="flex grow overflow-hidden">
        <LeftMenu />
        <Editor songSignal={state.currSong} />
      </div>
    </div>
  );
}
