import { useSignal } from '@preact/signals-react';
import { Button, Dialog, Flex } from '@radix-ui/themes';
import { growlManager } from 'shared/classes/growlmanager';
import { GenericDialog } from 'shared/components/dialogs/genericdialog';
import { DialogType } from 'shared/enums/dialogtype';
import { DialogProps } from 'shared/types/dialog/dialogprops';
import { deleteSong } from 'src/state/functions/song';

export function DeleteConfirmationDialog(props: DialogProps) {
  const loading = useSignal(false);

  function submit() {
    loading.value = true;
    deleteSong().then((success) => {
      loading.value = false;
      props.changeDialog(DialogType.None);
      if (success) {
        growlManager.dispatchGrowl({
          description: 'Song deleted successfully',
        });
      } else {
        growlManager.dispatchGrowl({
          description: 'Something went wrong. Try again later',
        });
      }
    });
  }

  return (
    <GenericDialog {...props} closeButton width="450px">
      <Dialog.Title>Delete Song</Dialog.Title>
      <Dialog.Description>
        Are you sure you want to delete this song? This cannot be undone.
      </Dialog.Description>
      <Flex justify="end" gap="3">
        <Dialog.Close>
          <Button color="gray" variant="outline">
            Cancel
          </Button>
        </Dialog.Close>
        <Button color="red" variant="solid" onClick={submit}>
          Delete
        </Button>
      </Flex>
    </GenericDialog>
  );
}
