import { Theme } from '@radix-ui/themes';
import { onAuthStateChanged } from 'firebase/auth';
import { StrictMode } from 'react';
import { DialogManager } from 'shared/components/dialogs/dialogmanager';
import { GrowlStack } from 'shared/components/growls/growlstack';
import { auth } from 'shared/firebase/auth';
import { EditorPage } from 'src/components/editorpage';
import { dialogManifest } from 'src/dialogs/dialogmanifest';
import { state } from 'src/state/state';
import { StateContext } from 'src/state/statecontext';

export function App() {
  onAuthStateChanged(auth, (user) => {
    console.log('user changed:', user);
    state.user.value = user;
  });

  return (
    <StrictMode>
      <Theme grayColor="slate">
        <StateContext.Provider value={state}>
          <DialogManager signal={state.dialog} manifest={dialogManifest} />
          <GrowlStack />
          <EditorPage />
        </StateContext.Provider>
      </Theme>
    </StrictMode>
  );
}
