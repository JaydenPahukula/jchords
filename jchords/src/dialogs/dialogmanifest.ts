import { CreateAccountDialog } from 'shared/components/dialogs/createaccountdialog';
import { LoginDialog } from 'shared/components/dialogs/logindialog';
import { Dialog } from 'shared/enums/dialog';
import { DialogManifest } from 'shared/types/dialogmanifest';

export const dialogManifest: DialogManifest = [
  { type: Dialog.Login, component: LoginDialog },
  { type: Dialog.CreateAccount, component: CreateAccountDialog },
];
