import { Box, Grid } from '@radix-ui/themes';
import { useContext } from 'react';
import { Editor } from 'src/components/editor';
import { LeftMenu } from 'src/components/leftmenu';
import { TitleRow } from 'src/components/titlerow';
import { Toolbar } from 'src/components/toolbar';
import { StateContext } from 'src/state/statecontext';

export function EditorPage() {
  const state = useContext(StateContext);
  return (
    <Grid id="editor-page" rows="48px 36px 1fr" height="100vh">
      <TitleRow />
      <Toolbar />
      <Box>
        <LeftMenu />
        <Editor songSignal={state.currSong} />
      </Box>
    </Grid>
  );
}
