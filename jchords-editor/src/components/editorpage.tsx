import LeftMenu from 'src/components/leftmenu';
import TitleRow from 'src/components/titlerow';
import Toolbar from 'src/components/toolbar';

export default function EditorPage() {
  return (
    <div id="editor-page" class="grid h-full w-full grid-rows-[min-content_min-content_auto]">
      <TitleRow />
      <Toolbar />
      <div class="flex grow">
        <LeftMenu />
      </div>
    </div>
  );
}
