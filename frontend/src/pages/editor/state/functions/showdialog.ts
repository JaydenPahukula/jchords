import { DialogType } from 'src/enums/dialogtype';
import { state } from 'src/pages/editor/state/state';

export function showDialog(dialog: DialogType) {
  state.dialog.value = dialog;
}
