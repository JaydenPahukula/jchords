import { computed, useSignal } from '@preact/signals';
import { JSX } from 'preact/jsx-runtime';
import logIn, { LogInResult } from 'shared/auth/login';
import DialogProps from 'shared/components/dialogs/dialogprops';
import GenericDialog from 'shared/components/dialogs/genericdialog';
import FormInput from 'shared/components/generic/forminput';
import LockIcon from 'shared/components/icons/lockicon';
import LoadingSpinner from 'shared/components/loadingspinner/loadingspinner';
import Dialog from 'shared/enums/dialog';
import selectContent from 'shared/misc/selectcontent';

export default function LoginDialog(props: DialogProps) {
  const emailInputText = useSignal<string>('');
  const passwordInputText = useSignal<string>('');
  const state = useSignal<LogInResult | -1>();

  const submitButtonDisabled = computed<boolean>(
    () => emailInputText.value.length == 0 || passwordInputText.value.length == 0,
  );

  const submitLoading = state.value == -1;

  function onFormSubmit(e: JSX.TargetedSubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    state.value = -1;
    logIn(emailInputText.value, passwordInputText.value).then((result) => {
      if (result == LogInResult.Success) {
        props.changeDialog(Dialog.None); // close dialog
      } else {
        state.value = result;
      }
    });
  }

  return (
    <GenericDialog
      dialogRef={props.dialogRef}
      closeButton
      onClose={() => props.changeDialog(Dialog.None)}
    >
      <h2 class="text-3xl font-bold">Sign In</h2>
      <p class="mb-8">
        or{' '}
        <a href="/createaccount" class="link">
          create an account
        </a>
      </p>
      <form onSubmit={onFormSubmit}>
        <FormInput
          type="email"
          required
          disabled={submitLoading}
          title="Please enter a valid email address"
          value={emailInputText}
          onInput={(e) => (emailInputText.value = e.currentTarget.value)}
          placeholder="Email"
          onXClicked={() => (emailInputText.value = '')}
          class="mb-8"
        />
        <FormInput
          type="password"
          required
          disabled={submitLoading}
          value={passwordInputText}
          onInput={(e) => (passwordInputText.value = e.currentTarget.value)}
          onClick={selectContent}
          placeholder="Password"
          onXClicked={() => (passwordInputText.value = '')}
          icon={<LockIcon />}
          class="mb-8"
        />
        {submitLoading ? (
          <div class="bg-bg-button flex h-11 w-full items-center justify-center rounded-full">
            <div class="w-6">
              <LoadingSpinner />
            </div>
          </div>
        ) : (
          <input
            disabled={submitButtonDisabled}
            type="submit"
            value="Sign In"
            class="bg-bg-button hover:not-disabled:bg-bg-button-hover active:not-disabled:bg-bg-button-active disabled:text-fg-disabled h-11 w-full rounded-full not-disabled:cursor-pointer"
          ></input>
        )}
      </form>
    </GenericDialog>
  );
}
