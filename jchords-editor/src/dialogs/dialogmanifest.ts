import { CreateAccountDialog } from 'shared/components/dialogs/createaccountdialog';
import { LoginDialog } from 'shared/components/dialogs/logindialog';
import { DialogType } from 'shared/enums/dialogtype';
import { DialogManifest } from 'shared/types/dialog/dialogmanifest';
import { DeleteConfirmationDialog } from 'src/components/dialogs/deleteconfirmationdialog';
import { ImportDialog } from 'src/components/dialogs/importdialog';
import { OpenSongDialog } from 'src/components/dialogs/opensongdialog';

export const dialogManifest: DialogManifest = [
  { type: DialogType.OpenSong, component: OpenSongDialog },
  { type: DialogType.Login, component: LoginDialog },
  { type: DialogType.CreateAccount, component: CreateAccountDialog },
  { type: DialogType.DialogConfirmation, component: DeleteConfirmationDialog },
  { type: DialogType.Import, component: ImportDialog },
];
