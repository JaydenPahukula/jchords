import { FunctionComponent } from 'preact';
import CreateAccountDialog from 'shared/components/dialogs/createaccountdialog';
import DialogProps from 'shared/components/dialogs/dialogprops';
import LoginDialog from 'shared/components/dialogs/logindialog';
import Dialog from 'shared/enums/dialog';

const DIALOGS: { type: Dialog; component: FunctionComponent<DialogProps> }[] = [
  { type: Dialog.Login, component: LoginDialog },
  { type: Dialog.CreateAccount, component: CreateAccountDialog },
];

export default DIALOGS;
