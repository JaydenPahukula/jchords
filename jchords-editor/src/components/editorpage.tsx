import { Grid } from '@radix-ui/themes';
import { Editor } from 'src/components/editor';
import { LeftMenu } from 'src/components/leftmenu';
import { TitleRow } from 'src/components/titlerow';
import { Toolbar } from 'src/components/toolbar';
import { useStateContext } from 'src/state/statecontext';

export function EditorPage() {
  const state = useStateContext();
  return (
    <Grid id="editor-page" rows="min-content min-content 1fr" height="100vh" overflow="hidden">
      <TitleRow />
      <Toolbar />
      <Grid width="100%" columns="auto 1fr" overflow="hidden">
        <LeftMenu />
        <Editor songSignal={state.currSong} />
      </Grid>
    </Grid>
  );
}
