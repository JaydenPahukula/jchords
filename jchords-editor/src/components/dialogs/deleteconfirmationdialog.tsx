import { useSignal } from '@preact/signals-react';
import { growlManager } from 'shared/classes/growlmanager';
import { GenericDialog } from 'shared/components/dialogs/genericdialog';
import { FormButton } from 'shared/components/generic/formbutton';
import { DialogProps } from 'shared/types/dialog/dialogprops';
import { deleteSong } from 'src/state/functions/song';

export function DeleteConfirmationDialog(props: DialogProps) {
  const loading = useSignal(false);

  function submit() {
    loading.value = true;
    deleteSong().then((success) => {
      loading.value = false;
      // props.changeDialog(DialogType.None);
      if (success) {
        growlManager.dispatchGrowl({
          content: 'Song deleted successfully',
        });
      } else {
        growlManager.dispatchGrowl({
          content: 'Something went wrong. Try again later',
        });
      }
    });
  }

  return (
    <GenericDialog {...props} closeButton class="w-md">
      <p className="my-4">Are you sure you want to delete this song? This cannot be undone.</p>
      <div className="flex justify-center">
        <div className="w-[50%]">
          <FormButton onClick={submit} loading={loading.value}>
            Delete
          </FormButton>
        </div>
      </div>
    </GenericDialog>
  );
}
