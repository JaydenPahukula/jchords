import { useSignal } from '@preact/signals-react';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { deleteUser, User } from 'firebase/auth';
import { dispatchGrowl } from 'src/components/growl/growlprovider';
import { TrashIcon } from 'src/components/icons/trashicon';

interface DeleteAccountButtonProps {
  user: User;
}

export function DeleteAccountButton(props: DeleteAccountButtonProps) {
  const submitLoading = useSignal(false);

  function deleteAccount() {
    submitLoading.value = true;
    deleteUser(props.user)
      .then(() => {
        submitLoading.value = false;
        dispatchGrowl({ description: 'Deleted account successfully' });
      })
      .catch(() => {
        submitLoading.value = false;
        dispatchGrowl({ description: 'Something went wrong. Try again later' });
      });
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" variant="soft">
          <TrashIcon />
          Delete Account
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="400px">
        <AlertDialog.Title>Delete Account</AlertDialog.Title>
        <AlertDialog.Description mb="3">
          Are you sure you want to delete your account? This cannot be undone!
        </AlertDialog.Description>
        <Flex justify="end" gap="3">
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              color="red"
              variant="solid"
              onClick={deleteAccount}
              loading={submitLoading.value}
            >
              Delete Account
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
