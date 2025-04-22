import { FunctionComponent } from 'preact';
import Dialog from 'shared/enums/dialog';
import DialogProps from 'shared/types/dialogprops';

type DialogManifest = { type: Dialog; component: FunctionComponent<DialogProps> }[];

export default DialogManifest;
