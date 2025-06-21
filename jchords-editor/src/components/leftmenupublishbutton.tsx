import { useSignal } from '@preact/signals-react';
import { Button, Link } from '@radix-ui/themes';
import { useContext } from 'react';
import { growlManager } from 'shared/classes/growlmanager';
import { DialogType } from 'shared/enums/dialogtype';
import { Growl } from 'shared/types/growl';
import { showDialog } from 'src/state/functions/showdialog';
import { publishNewSong, saveSong } from 'src/state/functions/song';
import { StateContext } from 'src/state/statecontext';

const notSignedInGrowl: Growl = {
  description: (
    <>
      <Link color="blue" underline="always" onClick={() => showDialog(DialogType.Login)}>
        Sign in
      </Link>{' '}
      to save your work
    </>
  ),
};

const somethingWentWrongGrowl: Growl = {
  description: 'Something went wrong. Try again later',
};

const successGrowl: Growl = {
  description: 'Song saved successfully',
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
      loading.value = false;
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
    <Button variant="surface" disabled={disabled} loading={loading.value} onClick={submit}>
      {text}
    </Button>
  );
}
