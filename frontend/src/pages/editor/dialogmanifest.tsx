import { CreateAccountDialog } from 'src/components/dialogs/createaccountdialog';
import { LoginDialog } from 'src/components/dialogs/logindialog';
import { DialogType } from 'src/enums/dialogtype';
import { DeleteConfirmationDialog } from 'src/pages/editor/components/dialogs/deleteconfirmationdialog';
import { ImportDialog } from 'src/pages/editor/components/dialogs/importdialog';
import { OpenSongDialog } from 'src/pages/editor/components/dialogs/opensongdialog';
import { DialogManifest } from 'src/types/dialog/dialogmanifest';

export const dialogManifest: DialogManifest = [
  { type: DialogType.OpenSong, component: OpenSongDialog },
  { type: DialogType.Login, component: LoginDialog },
  { type: DialogType.CreateAccount, component: CreateAccountDialog },
  { type: DialogType.DialogConfirmation, component: DeleteConfirmationDialog },
  { type: DialogType.Import, component: ImportDialog },
];
