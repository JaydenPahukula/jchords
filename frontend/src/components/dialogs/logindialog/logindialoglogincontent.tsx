import { batch } from '@preact/signals-react';
import { FormEvent, useEffect, useState } from 'react';
import { selectContent } from 'shared/functions/lambdas/selectcontent';
import { Button } from 'src/components/ui/button';
import { Dialog } from 'src/components/ui/dialog';
import { IconButton } from 'src/components/ui/iconbutton';
import { GoogleIcon } from 'src/components/ui/icons/googleicon';
import { XIcon } from 'src/components/ui/icons/xicon';
import { TextField } from 'src/components/ui/textfield';
import { LogInResult } from 'src/enums/loginresult';
import { logIn } from 'src/functions/auth/login';
import { logInWithGoogle } from 'src/functions/auth/loginwithgoogle';
import { bind } from 'src/functions/util/bind';

type State = 'none' | 'loading' | 'googleloading' | LogInResult;

function getErrorMessage(errorState: State): string | undefined {
  switch (errorState) {
    case LogInResult.BadCredentials:
      return 'Invalid email or password';
    case LogInResult.Failed:
      return 'Could not log in. Try again later';
    default:
      return undefined;
  }
}

interface LoginDialogLoginContentProps {
  disabled: boolean;
  close: () => void;
  switchToCreateAccount: () => void;
}

export function LoginDialogLoginContent(props: LoginDialogLoginContentProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState<State>('none');

  const allDisabled = props.disabled || state === 'loading' || state === 'googleloading';
  const submitDisabled = allDisabled || email.length === 0 || password.length === 0;

  const errorMessage = getErrorMessage(state);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    logIn(email, password).then((result) => {
      batch(() => {
        setState(result);
        if (result == LogInResult.Success) {
          props.close();
          setEmail('');
          setPassword('');
        }
      });
    });
  }

  function signInWithGoogle() {
    setState('googleloading');
    logInWithGoogle().then((result) => {
      batch(() => {
        setState(result);
        if (result == LogInResult.Success) {
          props.close();
          setEmail('');
          setPassword('');
        }
      });
    });
  }

  // override setTimeout for Firebase polling (WARNING: SUPER JANKY)
  useEffect(() => {
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: any[]): number => {
      if (timeout === 8000) timeout = 1000; // shorten Firebase's default polling delay to 1s
      return originalSetTimeout(handler, timeout, ...args);
    }) as any; // this is to fix type error
  }, []);

  return (
    <>
      <div className="-mt-4 -mr-4 -mb-4 flex justify-end">
        <Dialog.Close asChild>
          <IconButton variant="subtle" className="" icon={XIcon} />
        </Dialog.Close>
      </div>
      <Dialog.Title>Sign In</Dialog.Title>
      <Dialog.Description className="mb-4">
        or{' '}
        <span onClick={props.switchToCreateAccount} tabIndex={0} className="link">
          create an account
        </span>
      </Dialog.Description>
      <form onSubmit={onSubmit}>
        <TextField
          type="email"
          id="login-email-input"
          required
          disabled={allDisabled}
          title="Please enter a valid email address"
          value={email}
          onInput={bind(setEmail)}
          placeholder="Email"
          className="mb-5"
          xButton
        />
        <TextField
          type="password"
          id="login-password-input"
          required
          disabled={allDisabled}
          value={password}
          onInput={bind(setPassword)}
          onClick={selectContent}
          placeholder="Password"
          className="mb-5"
          xButton
        />
        {errorMessage && <p className="text-error-red">{errorMessage}</p>}
        <Button
          type="submit"
          loading={state === 'loading'}
          disabled={submitDisabled}
          className="w-full"
        >
          Sign In
        </Button>
      </form>
      <div className="my-3 flex items-center">
        <div className="border-b-gray-8 h-0 grow border-b-1" />
        <p className="mx-4">OR</p>
        <div className="border-b-gray-8 h-0 grow border-b-1" />
      </div>
      <Button
        variant="secondary"
        onClick={signInWithGoogle}
        loading={state === 'googleloading'}
        disabled={allDisabled}
        className="w-full"
      >
        <GoogleIcon className="bg-gray-1 outline-gray-1 rounded-full outline-4" />
        Sign in with Google
      </Button>
    </>
  );
}
