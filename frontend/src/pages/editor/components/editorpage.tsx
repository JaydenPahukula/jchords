import { Grid } from '@radix-ui/themes';
import { DialogManager } from 'src/components/dialogs/dialogmanager';
import { Editor } from 'src/pages/editor/components/editor';
import { LeftMenu } from 'src/pages/editor/components/leftmenu/leftmenu';
import { TitleRow } from 'src/pages/editor/components/titlerow';
import { Toolbar } from 'src/pages/editor/components/toolbar';
import { dialogManifest } from 'src/pages/editor/dialogmanifest';
import { state } from 'src/pages/editor/state/state';
import { StateContext } from 'src/pages/editor/state/statecontext';

console.log('EditorPage load');
export function EditorPage() {
  console.log('EditorPage render');
  return (
    <StateContext.Provider value={state}>
      <DialogManager signal={state.dialog} manifest={dialogManifest} />
      <Grid id="editor-page" rows="min-content min-content 1fr" height="100vh" overflow="hidden">
        <TitleRow />
        <Toolbar />
        <Grid width="100%" columns="auto 1fr" overflow="hidden">
          <LeftMenu />
          <Editor songSignal={state.currSong} />
        </Grid>
      </Grid>
    </StateContext.Provider>
  );
}
