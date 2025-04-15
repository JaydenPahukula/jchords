import { batch, useComputed, useSignal } from '@preact/signals';
import createAccount from 'shared/auth/createaccount';
import GenericDialog from 'shared/components/dialogs/genericdialog';
import FormButton from 'shared/components/generic/formbutton';
import FormInput from 'shared/components/generic/forminput';
import ArrowLeftIcon from 'shared/components/icons/arrowlefticon';
import LockIcon from 'shared/components/icons/lockicon';
import CreateAccountResult from 'shared/enums/createaccountresult';
import Dialog from 'shared/enums/dialog';
import useDebounce from 'shared/hooks/usedebounce';
import selectContent from 'shared/misc/selectcontent';
import DialogProps from 'shared/types/dialogprops';

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

export default function CreateAccountDialog(props: DialogProps) {
  const emailInput = useSignal('');
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
      passwordInput.value.length === 0 ||
      passwordInput2.value.length === 0 ||
      errorState.value === 'mismatch',
  );

  const submitLoading = useComputed(() => errorState.value === 'loading');

  const errorMessage = useComputed(() => getErrorMessage(errorState.value));

  function submit() {
    if (mismatch.value) {
      errorState.value = 'mismatch';
      return;
    }
    errorState.value = 'loading';
    createAccount(emailInput.value, passwordInput.value).then((result) => {
      errorState.value = result;
      if (result === CreateAccountResult.Success) {
        batch(() => {
          emailInput.value = '';
          passwordInput.value = '';
          passwordInput2.value = '';
        });
        props.changeDialog(Dialog.None); // close dialog
      }
    });
  }

  return (
    <GenericDialog
      dialogRef={props.dialogRef}
      closeButton
      otherButtons={[
        <div onClick={() => props.changeDialog(Dialog.Login)}>
          <ArrowLeftIcon />
        </div>,
      ]}
    >
      <h2 class="mb-6 text-3xl font-bold">Create Account</h2>
      <FormInput
        type="email"
        disabled={submitLoading}
        required
        title="Please enter a valid email address"
        value={emailInput}
        onInput={(e) => (emailInput.value = e.currentTarget.value)}
        placeholder="Email"
        onXClicked={() => (emailInput.value = '')}
        class="mb-8"
      />
      <FormInput
        type="password"
        disabled={submitLoading}
        required
        value={passwordInput}
        onInput={(e) => (passwordInput.value = e.currentTarget.value)}
        onClick={selectContent}
        placeholder="Password"
        onXClicked={() => (passwordInput.value = '')}
        icon={<LockIcon />}
        class="mb-8"
      />
      <FormInput
        type="password"
        disabled={submitLoading}
        required
        value={passwordInput2}
        onInput={(e) => (passwordInput2.value = e.currentTarget.value)}
        onClick={selectContent}
        placeholder="Confirm Password"
        onXClicked={() => (passwordInput2.value = '')}
        icon={<LockIcon />}
      />
      <p class="text-fg-error mt-1 h-8 text-sm">{errorMessage.value}</p>
      <FormButton disabled={submitButtonDisabled} onClick={submit}>
        Create Account
      </FormButton>
    </GenericDialog>
  );
  return <>createaccountdialog</>;
}
