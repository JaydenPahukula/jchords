import { batch, useComputed, useSignal } from '@preact/signals';
import { JSX } from 'preact/jsx-runtime';
import logIn from 'shared/auth/login';
import logInWithGoogle from 'shared/auth/loginwithgoogle';
import GenericDialog from 'shared/components/dialogs/genericdialog';
import FormInput from 'shared/components/generic/forminput';
import GoogleIcon from 'shared/components/icons/googleicon';
import LockIcon from 'shared/components/icons/lockicon';
import LoadingSpinner from 'shared/components/loadingspinner/loadingspinner';
import Dialog from 'shared/enums/dialog';
import LogInResult from 'shared/enums/loginresult';
import selectContent from 'shared/misc/selectcontent';
import DialogProps from 'shared/types/dialogprops';

type ErrorState = null | LogInResult | 'loading';

function getErrorMessage(errorState: ErrorState): string {
  switch (errorState) {
    case LogInResult.BadCredentials:
      return 'Invalid email or password';
    case LogInResult.Failed:
      return 'Could not log in. Try again later';
    default:
      return '';
  }
}

export default function LoginDialog(props: DialogProps) {
  const emailInput = useSignal<string>('');
  const passwordInput = useSignal<string>('');
  const errorState = useSignal<ErrorState>(null);

  const submitLoading = useComputed(() => errorState.value === 'loading');

  const errorMessage = useComputed(() => getErrorMessage(errorState.value));

  function clear() {
    batch(() => {
      emailInput.value = '';
      passwordInput.value = '';
    });
  }

  function onFormSubmit(e: JSX.TargetedSubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    errorState.value = 'loading';
    logIn(emailInput.value, passwordInput.value).then((result) => {
      errorState.value = result;
      if (result == LogInResult.Success) {
        clear();
        props.changeDialog(Dialog.None);
      }
    });
  }

  function signInWithGoogle() {
    errorState.value = 'loading';
    logInWithGoogle().then((result) => {
      errorState.value = result;
      if (result == LogInResult.Success) {
        clear();
        props.changeDialog(Dialog.None);
      }
    });
  }

  return (
    <GenericDialog dialogRef={props.dialogRef} closeButton>
      <form onSubmit={onFormSubmit}>
        <h2 class="text-3xl font-bold">Sign In</h2>
        <p class="mb-6">
          or{' '}
          <span onClick={() => props.changeDialog(Dialog.CreateAccount)} class="link">
            create an account
          </span>
        </p>
        <FormInput
          type="email"
          required
          disabled={submitLoading}
          title="Please enter a valid email address"
          value={emailInput}
          onInput={(e) => (emailInput.value = e.currentTarget.value)}
          placeholder="Email"
          onXClicked={() => (emailInput.value = '')}
          class="mb-8"
        />
        <FormInput
          type="password"
          required
          disabled={submitLoading}
          value={passwordInput}
          onInput={(e) => (passwordInput.value = e.currentTarget.value)}
          onClick={selectContent}
          placeholder="Password"
          onXClicked={() => (passwordInput.value = '')}
          icon={<LockIcon />}
        />
        <p class="text-fg-error mt-1 h-8 text-sm">{errorMessage.value}</p>
        {submitLoading.value ? (
          <div class="bg-bg-button flex h-11 w-full items-center justify-center rounded-full">
            <div class="w-6">
              <LoadingSpinner />
            </div>
          </div>
        ) : (
          <input
            type="submit"
            value="Sign In"
            class="bg-bg-button hover:enabled:bg-bg-button-hover active:enabled:bg-bg-button-active disabled:text-fg-disabled h-11 w-full rounded-full enabled:cursor-pointer"
          ></input>
        )}
      </form>
      <div class="items my-6 flex w-full items-center">
        <hr class="grow"></hr>
        <p class="mx-2 text-sm">OR</p>
        <hr class="grow"></hr>
      </div>
      <button
        onClick={signInWithGoogle}
        class="bg-bg-button hover:bg-bg-button-hover active:bg-bg-button-active flex h-11 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-full"
      >
        <div class="fixed h-11 w-11 self-start p-3">
          <GoogleIcon />
        </div>
        Sign in with Google
      </button>
    </GenericDialog>
  );
}
