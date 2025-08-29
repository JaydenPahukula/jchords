import { deleteUser, User } from 'firebase/auth';
import { useState } from 'react';
import { dispatchGrowl } from 'src/components/growl/growlprovider';
import { AlertDialog } from 'src/components/ui/alertdialog/alertdialog';
import { Button } from 'src/components/ui/button/button';
import { TrashIcon } from 'src/components/ui/icons/trashicon';

interface DeleteAccountButtonProps {
  user: User;
}

export function DeleteAccountButton(props: DeleteAccountButtonProps) {
  const [submitLoading, setSubmitLoading] = useState(false);

  function deleteAccount() {
    setSubmitLoading(true);
    deleteUser(props.user)
      .then(() => {
        dispatchGrowl({ description: 'Deleted account successfully' });
      })
      .catch(() => {
        dispatchGrowl({ description: 'Something went wrong. Try again later' });
      })
      .finally(() => setSubmitLoading(false));
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button variant="danger">
          <TrashIcon />
          Delete Account
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete Account</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete your account? This cannot be undone!
        </AlertDialog.Description>
        <div className="flex justify-end gap-3">
          <AlertDialog.Cancel asChild>
            <Button color="gray" variant="secondary">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button color="red" variant="danger" onClick={deleteAccount} loading={submitLoading}>
              Delete Account
            </Button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
