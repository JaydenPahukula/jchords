import { useSignal } from '@preact/signals-react';
import { useContext } from 'react';
import { growlManager } from 'shared/classes/growlmanager';
import { FormButton } from 'shared/components/generic/formbutton';
import { DialogType } from 'shared/enums/dialogtype';
import { Growl } from 'shared/types/growl';
import { showDialog } from 'src/state/functions/showdialog';
import { publishNewSong, saveSong } from 'src/state/functions/song';
import { StateContext } from 'src/state/statecontext';

const notSignedInGrowl: Growl = {
  content: (
    <span className="flex">
      <p onClick={() => showDialog(DialogType.Login)} className="link">
        Sign in
      </p>
      <p className="whitespace-pre"> to save your work</p>
    </span>
  ),
};

const somethingWentWrongGrowl: Growl = {
  content: 'Something went wrong. Try again later',
};

const successGrowl: Growl = {
  content: 'Song saved successfully',
};

export function LeftMenuPublishButton() {
  const state = useContext(StateContext);
  const loading = useSignal(false);

  const disabled = !state.isCurrSongModified.value;
  const text = state.isCurrSongNew.value ? 'Publish' : 'Update';

  function submit() {
    loading.value = true;
    if (state.user.value === null) {
      growlManager.dispatchGrowl(notSignedInGrowl);
    } else if (state.isCurrSongNew.value) {
      publishNewSong().then((success) => {
        loading.value = false;
        if (success) {
          growlManager.dispatchGrowl(successGrowl);
        } else {
          growlManager.dispatchGrowl(somethingWentWrongGrowl);
        }
      });
    } else {
      saveSong().then((success) => {
        loading.value = false;
        if (success) {
          growlManager.dispatchGrowl(successGrowl);
        } else {
          growlManager.dispatchGrowl(somethingWentWrongGrowl);
        }
      });
    }
  }

  return (
    <FormButton disabled={disabled} loading={loading.value} onClick={submit}>
      {text}
    </FormButton>
  );
}
