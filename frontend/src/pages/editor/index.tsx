import { Theme } from '@radix-ui/themes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CreateAccountDialog } from 'src/components/dialogs/createaccountdialog';
import { DialogManager } from 'src/components/dialogs/dialogmanager';
import { LoginDialog } from 'src/components/dialogs/logindialog';
import { GrowlProvider } from 'src/components/growl/growlprovider';
import { DialogType } from 'src/enums/dialogtype';
import { DeleteConfirmationDialog } from 'src/pages/editor/components/dialogs/deleteconfirmationdialog';
import { ImportDialog } from 'src/pages/editor/components/dialogs/importdialog';
import { OpenSongDialog } from 'src/pages/editor/components/dialogs/opensongdialog';
import { EditorPage } from 'src/pages/editor/components/editorpage';
import { state } from 'src/pages/editor/state/state';
import { StateContext } from 'src/pages/editor/state/statecontext';
import 'src/style/theme.css';
import { DialogManifest } from 'src/types/dialog/dialogmanifest';

export const dialogManifest: DialogManifest = [
  { type: DialogType.OpenSong, component: OpenSongDialog },
  { type: DialogType.Login, component: LoginDialog },
  { type: DialogType.CreateAccount, component: CreateAccountDialog },
  { type: DialogType.DialogConfirmation, component: DeleteConfirmationDialog },
  { type: DialogType.Import, component: ImportDialog },
];

createRoot(document.body).render(
  <StrictMode>
    <Theme grayColor="slate" accentColor="gray">
      <StateContext.Provider value={state}>
        <GrowlProvider>
          <DialogManager signal={state.dialog} manifest={dialogManifest} />
          <EditorPage />
        </GrowlProvider>
      </StateContext.Provider>
    </Theme>
  </StrictMode>,
);
