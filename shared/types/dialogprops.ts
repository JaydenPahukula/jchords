import { RefObject } from 'preact';
import Dialog from 'shared/enums/dialog';

export default interface DialogProps {
  dialogRef: RefObject<HTMLDialogElement>;
  changeDialog: (newDialog: Dialog) => void;
}
