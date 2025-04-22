import { batch, useComputed, useSignal } from '@preact/signals';
import GenericDialog from 'shared/components/dialogs/genericdialog';
import FormButton from 'shared/components/generic/formbutton';
import FormInput from 'shared/components/generic/forminput';
import GoogleIcon from 'shared/components/icons/googleicon';
import LockIcon from 'shared/components/icons/lockicon';
import Dialog from 'shared/enums/dialog';
import LogInResult from 'shared/enums/loginresult';
import logIn from 'shared/functions/auth/login';
import logInWithGoogle from 'shared/functions/auth/loginwithgoogle';
import selectContent from 'shared/functions/lambdas/selectcontent';
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
  const submitDisabled = useComputed(
    () => submitLoading.value || emailInput.value.length === 0 || passwordInput.value.length === 0,
  );

  const errorMessage = useComputed(() => getErrorMessage(errorState.value));

  function clear() {
    batch(() => {
      emailInput.value = '';
      passwordInput.value = '';
    });
  }

  function submit() {
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
      <FormButton onClick={submit} loading={submitLoading.value} disabled={submitDisabled}>
        Sign In
      </FormButton>
      <div class="items my-6 flex w-full items-center">
        <hr class="grow"></hr>
        <p class="mx-2 text-sm">OR</p>
        <hr class="grow"></hr>
      </div>
      <FormButton onClick={signInWithGoogle} icon={<GoogleIcon />}>
        Sign in with Google
      </FormButton>
    </GenericDialog>
  );
}
