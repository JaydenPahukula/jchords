import { Theme } from '@radix-ui/themes';
import { onAuthStateChanged } from 'firebase/auth';
import { StrictMode } from 'react';
import { DialogManager } from 'shared/components/dialogs/dialogmanager';
import { GrowlProvider } from 'shared/components/growls/growlprovider';
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
      <Theme grayColor="slate" accentColor="gray">
        <StateContext.Provider value={state}>
          <GrowlProvider>
            <DialogManager signal={state.dialog} manifest={dialogManifest} />
            <EditorPage />
          </GrowlProvider>
        </StateContext.Provider>
      </Theme>
    </StrictMode>
  );
}
