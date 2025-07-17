import { useSignal } from '@preact/signals-react';
import { Button } from '@radix-ui/themes';
import { dispatchGrowl } from 'src/components/growl/growlprovider';
import { DialogType } from 'src/enums/dialogtype';
import { showDialog } from 'src/pages/editor/state/functions/showdialog';
import { publishNewSong, saveSong } from 'src/pages/editor/state/functions/song';
import { useStateContext } from 'src/pages/editor/state/statecontext';
import { Growl } from 'src/types/growl/growl';

const notSignedInGrowl: Growl = {
  description: (
    <>
      <span className="link" onClick={() => showDialog(DialogType.Login)}>
        Sign in
      </span>{' '}
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
  const state = useStateContext();
  const loading = useSignal(false);

  const disabled = !state.isCurrSongModified.value;
  const text = state.isCurrSongNew.value ? 'Publish' : 'Update';

  function submit() {
    loading.value = true;
    if (state.user.value === null) {
      dispatchGrowl(notSignedInGrowl);
      loading.value = false;
    } else if (state.isCurrSongNew.value) {
      publishNewSong().then((success) => {
        loading.value = false;
        if (success) {
          dispatchGrowl(successGrowl);
        } else {
          dispatchGrowl(somethingWentWrongGrowl);
        }
      });
    } else {
      saveSong().then((success) => {
        loading.value = false;
        if (success) {
          dispatchGrowl(successGrowl);
        } else {
          dispatchGrowl(somethingWentWrongGrowl);
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
