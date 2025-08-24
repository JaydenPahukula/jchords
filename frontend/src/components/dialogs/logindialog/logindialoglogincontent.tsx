import { FormEvent, useEffect, useState } from 'react';
import { Button } from 'src/components/ui/button/button';
import { Dialog } from 'src/components/ui/dialog/dialog';
import { IconButton } from 'src/components/ui/iconbutton/iconbutton';
import { GoogleIcon } from 'src/components/ui/icons/googleicon';
import { XIcon } from 'src/components/ui/icons/xicon';
import { TextField } from 'src/components/ui/textfield/textfield';
import { LogInResult } from 'src/enums/loginresult';
import { logIn } from 'src/functions/auth/login';
import { logInWithGoogle } from 'src/functions/auth/loginwithgoogle';
import { bind } from 'src/functions/util/bind';

type State = 'none' | 'loading' | 'googleloading' | LogInResult;

function getErrorMessage(state: State): string | undefined {
  switch (state) {
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
  /** Cursed hack to notify the parent when the height has changed for animation stuff */
  recalcHeight: () => void;
}

export function LoginDialogLoginContent(props: LoginDialogLoginContentProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState<State>('none');

  const formDisabled = props.disabled || state === 'loading' || state === 'googleloading';
  const submitDisabled = formDisabled || email.length === 0 || password.length === 0;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    logIn(email, password).then((result) => {
      setState(result);
      if (result == LogInResult.Success) {
        props.close();
      }
    });
  }

  function signInWithGoogle() {
    setState('googleloading');
    logInWithGoogle().then((result) => {
      setState(result);
      if (result == LogInResult.Success) {
        props.close();
      }
    });
  }

  // override setTimeout for Firebase polling (WARNING: MEGA JANK)
  useEffect(() => {
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: any[]): number => {
      if (timeout === 8000) timeout = 1000; // shorten Firebase's default polling delay to 1s
      return originalSetTimeout(handler, timeout, ...args);
    }) as any; // this is to fix type error
  }, []);

  useEffect(() => {
    props.recalcHeight();
  }, [state]);

  return (
    <>
      <div className="-mt-4 -mr-4 -mb-4 flex justify-end">
        <Dialog.Close asChild>
          <IconButton variant="subtle" className="" icon={XIcon} disabled={props.disabled} />
        </Dialog.Close>
      </div>
      <Dialog.Title className="mb-1">Sign In</Dialog.Title>
      <Dialog.Description className="mb-4">
        or{' '}
        <button onClick={props.switchToCreateAccount} disabled={props.disabled} className="link">
          create an account
        </button>
      </Dialog.Description>
      <form onSubmit={onSubmit}>
        <TextField
          type="email"
          id="login-email-input"
          required
          disabled={formDisabled}
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
          disabled={formDisabled}
          value={password}
          onInput={bind(setPassword)}
          selectOnClick
          placeholder="Password"
          className="mb-2"
          xButton
        />
        <p className="text-error-red">{getErrorMessage(state)}</p>
        <Button
          type="submit"
          loading={state === 'loading'}
          disabled={submitDisabled}
          className="mt-3 mb-3 w-full"
        >
          Sign In
        </Button>
      </form>
      <div className="mb-3 flex items-center">
        <div className="border-b-gray-8 h-0 grow border-b-1" />
        <p className="mx-4">OR</p>
        <div className="border-b-gray-8 h-0 grow border-b-1" />
      </div>
      <Button
        variant="secondary"
        onClick={signInWithGoogle}
        loading={state === 'googleloading'}
        disabled={formDisabled}
        className="w-full"
      >
        <GoogleIcon className="bg-gray-1 outline-gray-1 rounded-full outline-4" />
        Sign in with Google
      </Button>
    </>
  );
}
