import DialogManager from 'shared/components/dialogs/dialogmanager';
import EditorPage from 'src/components/editorpage';
import dialogManifest from 'src/dialogs/dialogmanifest';
import state from 'src/state/state';
import StateContext from 'src/state/statecontext';

export default function App() {
  return (
    <>
      <DialogManager signal={state.dialog} manifest={dialogManifest} />
      <StateContext.Provider value={state}>
        <EditorPage />
      </StateContext.Provider>
    </>
  );
}
