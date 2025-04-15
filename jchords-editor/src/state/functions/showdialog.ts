import Dialog from 'shared/enums/dialog';
import state from 'src/state/state';

export default function showDialog(dialog: Dialog) {
  state.dialog.value = dialog;
}
