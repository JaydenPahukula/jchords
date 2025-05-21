import { CreateAccountDialog } from 'shared/components/dialogs/createaccountdialog';
import { LoginDialog } from 'shared/components/dialogs/logindialog';
import { Dialog } from 'shared/enums/dialog';
import { DialogManifest } from 'shared/types/dialogmanifest';
import { OpenSongDialog } from 'src/components/dialogs/opensongdialog';

export const dialogManifest: DialogManifest = [
  {
    type: Dialog.OpenSong,
    component: OpenSongDialog,
  },
  { type: Dialog.Login, component: LoginDialog },
  { type: Dialog.CreateAccount, component: CreateAccountDialog },
];
