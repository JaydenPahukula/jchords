import { useSignal } from '@preact/signals-react';
import { Button, Dialog, Flex } from '@radix-ui/themes';
import { dispatchGrowl } from 'src/components/growl/growlprovider';
import { DialogType } from 'src/enums/dialogtype';
import { deleteSong } from 'src/pages/editor/state/functions/song';
import { DialogProps } from 'src/types/dialog/dialogprops';

export function DeleteConfirmationDialog(props: DialogProps) {
  const loading = useSignal(false);

  function submit() {
    loading.value = true;
    deleteSong().then((success) => {
      loading.value = false;
      props.changeDialog(DialogType.None);
      if (success) {
        dispatchGrowl({
          description: 'Song deleted successfully',
        });
      } else {
        dispatchGrowl({
          description: 'Something went wrong. Try again later',
        });
      }
    });
  }

  return (
    <Dialog {...props} closeButton width="450px">
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
    </Dialog>
  );
}
