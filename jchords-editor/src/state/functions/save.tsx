import { growlManager } from 'shared/classes/growlmanager';
import { Dialog } from 'shared/enums/dialog';
import { showDialog } from 'src/state/functions/showdialog';
import { state } from 'src/state/state';

const notSignedInGrowl = {
  content: (
    <span class="flex">
      <p onClick={() => showDialog(Dialog.Login)} class="link">
        Sign in
      </p>
      <p class="whitespace-pre"> to save your work</p>
    </span>
  ),
};

export function save() {
  if (state.user.value === null) {
    growlManager.dispatchGrowl(notSignedInGrowl);
    return;
  }
}
