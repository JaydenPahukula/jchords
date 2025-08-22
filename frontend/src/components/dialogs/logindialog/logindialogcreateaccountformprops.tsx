import { batch, useComputed, useSignal } from '@preact/signals-react';
import { Box, Button, Text } from '@radix-ui/themes';
import { FormEvent } from 'react';
import { selectContent } from 'shared/functions/lambdas/selectcontent';
import { Dialog } from 'src/components/ui/dialog';
import { IconButton } from 'src/components/ui/iconbutton';
import { ArrowLeftIcon } from 'src/components/ui/icons/arrowlefticon';
import { XIcon } from 'src/components/ui/icons/xicon';
import { TextField } from 'src/components/ui/textfield';
import { CreateAccountResult } from 'src/enums/createaccountresult';
import { createAccount } from 'src/functions/auth/createaccount';
import { useDebounce } from 'src/hooks/usedebounce';

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

interface LoginDialogCreateAccountFormProps {
  disabled: boolean;
  close: () => void;
  back: () => void;
}

export function LoginDialogCreateAccountForm(props: LoginDialogCreateAccountFormProps) {
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
        props.close();
        batch(() => {
          emailInput.value = '';
          passwordInput.value = '';
          passwordInput2.value = '';
        });
      }
    });
  }

  return (
    <>
      <div className="-mt-4 -mr-4 mb-2 -ml-4 flex justify-between">
        <IconButton variant="subtle" icon={ArrowLeftIcon} onClick={props.back} />
        <Dialog.Close asChild>
          <IconButton variant="subtle" className="" icon={XIcon} />
        </Dialog.Close>
      </div>
      <Dialog.Title className="-mt-2">Create Account</Dialog.Title>
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
    </>
  );
}
