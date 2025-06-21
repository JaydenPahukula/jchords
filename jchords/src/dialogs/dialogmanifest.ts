import { CreateAccountDialog } from 'shared/components/dialogs/createaccountdialog';
import { LoginDialog } from 'shared/components/dialogs/logindialog';
import { DialogType } from 'shared/enums/dialogtype';
import { DialogManifest } from 'shared/types/dialog/dialogmanifest';

export const dialogManifest: DialogManifest = [
  { type: DialogType.Login, component: LoginDialog },
  { type: DialogType.CreateAccount, component: CreateAccountDialog },
];
