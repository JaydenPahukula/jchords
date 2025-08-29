import { FormEvent, useEffect, useState } from 'react';
import { Button } from 'src/components/ui/button/button';
import { Dialog } from 'src/components/ui/dialog/dialog';
import { IconButton } from 'src/components/ui/iconbutton/iconbutton';
import { ArrowLeftIcon } from 'src/components/ui/icons/arrowlefticon';
import { XIcon } from 'src/components/ui/icons/xicon';
import { TextField } from 'src/components/ui/textfield/textfield';
import { CreateAccountResult } from 'src/enums/createaccountresult';
import { createAccount } from 'src/functions/auth/createaccount';
import { bind } from 'src/functions/util/bind';
import { useDebounce } from 'src/hooks/usedebounce';

type State = 'none' | 'mismatch' | 'loading' | CreateAccountResult;

function getErrorMessage(state: State): string {
  switch (state) {
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
  recalcHeight: () => void;
}

export function LoginDialogCreateAccountForm(props: LoginDialogCreateAccountFormProps) {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [state, setState] = useState<State>('none');

  const mismatch = password1.length > 0 && password2.length > 0 && password1 !== password2;

  const formDisabled = props.disabled || state === 'loading';
  const submitDisabled =
    formDisabled || email.length === 0 || password1.length === 0 || password2.length === 0;

  const debounceSetMismatch = useDebounce((setMismatch: boolean) => {
    if (setMismatch) setState('mismatch');
  }, 1000);

  useEffect(() => {
    if (mismatch) {
      debounceSetMismatch(true);
    } else {
      debounceSetMismatch(false);
      setState('none');
    }
  }, [mismatch]);

  useEffect(() => {
    props.recalcHeight();
  }, [state]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (mismatch) {
      setState('mismatch');
      return;
    }
    setState('loading');
    createAccount(email, password1, displayName).then((result) => {
      setState(result);
      if (result === CreateAccountResult.Success) {
        props.close();
      }
    });
  }

  return (
    <>
      <div className="-mt-4 -mr-4 mb-2 -ml-4 flex justify-between">
        <IconButton variant="subtle" onClick={props.back} disabled={props.disabled}>
          <ArrowLeftIcon />
        </IconButton>
        <Dialog.Close asChild>
          <IconButton variant="subtle" className="" disabled={props.disabled}>
            <XIcon />
          </IconButton>
        </Dialog.Close>
      </div>
      <Dialog.Title className="-mt-2">Create Account</Dialog.Title>
      <Dialog.NoDescription />
      <form onSubmit={onSubmit}>
        <TextField
          type="email"
          id="create-account-email-input"
          disabled={formDisabled}
          required
          value={email}
          onInput={bind(setEmail)}
          placeholder="Email"
          className="mb-5"
        />
        <TextField
          type="text"
          id="create-account-display-name-input"
          disabled={formDisabled}
          required
          value={displayName}
          onInput={bind(setDisplayName)}
          placeholder="Display Name"
          className="mb-5"
        />
        <TextField
          type="password"
          id="create-account-password-input"
          disabled={formDisabled}
          required
          value={password1}
          onInput={bind(setPassword1)}
          selectOnClick
          placeholder="Password"
          className="mb-5"
        />
        <TextField
          type="password"
          id="create-account-confirm-password-input"
          disabled={formDisabled}
          required
          value={password2}
          onInput={bind(setPassword2)}
          selectOnClick
          placeholder="Confirm Password"
          className="mb-2"
        />
        <p className="text-red-11">{getErrorMessage(state)}</p>
        <Button
          variant="primary"
          loading={state === 'loading'}
          disabled={submitDisabled}
          type="submit"
          className="mt-3 w-full"
        >
          Create Account
        </Button>
      </form>
    </>
  );
}
