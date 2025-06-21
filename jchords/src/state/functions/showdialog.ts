import { DialogType } from 'shared/enums/dialogtype';
import { state } from 'src/state/state';

export function showDialog(dialog: DialogType) {
  state.dialog.value = dialog;
}
