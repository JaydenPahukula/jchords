import { FunctionComponent } from 'preact';
import DialogProps from 'shared/components/dialogs/dialogprops';
import Dialog from 'shared/enums/dialog';

type DialogManifest = { type: Dialog; component: FunctionComponent<DialogProps> }[];

export default DialogManifest;
