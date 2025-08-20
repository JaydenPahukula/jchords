import { batch, useComputed, useSignal } from '@preact/signals-react';
import { Box, Button, Text } from '@radix-ui/themes';
import { FormEvent, useState } from 'react';
import { selectContent } from 'shared/functions/lambdas/selectcontent';
import { LockIcon } from 'src/components/icons/lockicon';
import { Dialog } from 'src/components/ui/dialog';
import { TextField } from 'src/components/ui/textfield';
import { CreateAccountResult } from 'src/enums/createaccountresult';
import { createAccount } from 'src/functions/auth/createaccount';
import { useDebounce } from 'src/hooks/usedebounce';
import { DialogProps } from 'src/types/dialog/dialogprops';

type ErrorState = null | CreateAccountResult | 'loading' | 'mismatch';

function getErrorMessage(errorState: ErrorState): string {
  switch (errorState) {
    case CreateAccountResult.WeakPassword:
      return 'Please choose a stronger password';
    case CreateAccountResult.InvalidEmail:
      return 'Invalid email';
    case CreateAccountResult.EmailInUse:
      return 'Email is already in use';
    case CreateAccountResult.Failed:
      return 'Could not create account. Try again later';
    case 'mismatch':
      return 'Passwords do not match';
    default:
      return '';
  }
}

export function CreateAccountDialog(props: DialogProps) {
  const [open, setOpen] = useState(false);
  const emailInput = useSignal('');
  const displayNameInput = useSignal('');
  const passwordInput = useSignal('');
  const passwordInput2 = useSignal('');
  const errorState = useSignal<ErrorState>(null);

  const debounceMismatch = useDebounce(() => {
    errorState.value = mismatch.value ? 'mismatch' : null;
  });

  const mismatch = useComputed(() => {
    const isMismatch =
      passwordInput.value.length > 0 &&
      passwordInput2.value.length > 0 &&
      passwordInput.value !== passwordInput2.value;
    if (!isMismatch) debounceMismatch();
    else errorState.value = null;
    return isMismatch;
  });
  if (mismatch.value) void 0; // mismatch signal breaks without this

  const submitButtonDisabled = useComputed<boolean>(
    () =>
      emailInput.value.length === 0 ||
      displayNameInput.value.length === 0 ||
      passwordInput.value.length === 0 ||
      passwordInput2.value.length === 0 ||
      errorState.value === 'mismatch',
  );

  const submitLoading = useComputed(() => errorState.value === 'loading');

  const errorMessage = useComputed(() => getErrorMessage(errorState.value));

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (mismatch.value) {
      errorState.value = 'mismatch';
      return;
    }
    errorState.value = 'loading';
    createAccount(emailInput.value, passwordInput.value, displayNameInput.value).then((result) => {
      errorState.value = result;
      if (result === CreateAccountResult.Success) {
        setOpen(false);
        batch(() => {
          emailInput.value = '';
          passwordInput.value = '';
          passwordInput2.value = '';
        });
      }
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{props.children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Create Account</Dialog.Title>
        <Dialog.Description aria-describedby={undefined} />
        <form onSubmit={onSubmit}>
          <TextField
            type="email"
            id="create-account-email-input"
            disabled={submitLoading.value}
            required
            title="Please enter a valid email address"
            value={emailInput.value}
            onInput={(e) => (emailInput.value = e.currentTarget.value)}
            placeholder="Email"
            className="mb-5"
          />
          <TextField
            type="text"
            id="create-account-display-name-input"
            disabled={submitLoading.value}
            required
            value={displayNameInput.value}
            onInput={(e) => (displayNameInput.value = e.currentTarget.value)}
            placeholder="Display Name"
            className="mb-5"
          />
          <TextField
            type="password"
            id="create-account-password-input"
            disabled={submitLoading.value}
            required
            value={passwordInput.value}
            onInput={(e) => (passwordInput.value = e.currentTarget.value)}
            onClick={selectContent}
            placeholder="Password"
            className="mb-5"
            rightIcon={<LockIcon />}
          />
          <TextField
            type="password"
            id="create-account-confirm-password-input"
            disabled={submitLoading.value}
            required
            value={passwordInput2.value}
            onInput={(e) => (passwordInput2.value = e.currentTarget.value)}
            onClick={selectContent}
            placeholder="Confirm Password"
            className="mb-3"
            rightIcon={<LockIcon />}
          />
          <Text size="3" color="red">
            {errorMessage}
          </Text>
          <Box mt="3" width="100%" asChild>
            <Button size="3" variant="surface" disabled={submitButtonDisabled.value} type="submit">
              Create Account
            </Button>
          </Box>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
