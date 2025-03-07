import { computed, useSignal } from '@preact/signals';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
import createAccount, { CreateAccountResult } from 'shared/auth/createaccount';
import debounce from 'shared/misc/debounce';
import selectContent from 'shared/misc/selectcontent';
import LockIcon from '../icons/lockicon';
import XIcon from '../icons/xicon';
import LoadingSpinner from '../loadingspinner/loadingspinner';
import FormInput from './forminput';
import GenericHeader from './genericheader';

// -1 = loading

function ErrorMessage(props: { status: CreateAccountResult | -1; close: () => void }) {
  const status = props.status;
  if (status == CreateAccountResult.Success || status == -1) return <></>;
  return (
    <div class="bg-bg-error text-fg-9 mt-4 flex w-full items-center rounded-2xl p-2 pl-4">
      <p class="flex-grow leading-tight font-bold">
        {status === CreateAccountResult.EmailInUse
          ? 'Email is already in use'
          : status === CreateAccountResult.InvalidEmail
            ? 'Invalid email'
            : status === CreateAccountResult.WeakPassword
              ? 'Please choose a stronger password'
              : 'Could not create account. Try again later'}
      </p>
      <div
        onClick={props.close}
        class="hover:bg-bg-0/20 active:bg-bg-0/30 h-8 w-8 flex-shrink-0 rounded-lg p-1"
      >
        <XIcon />
      </div>
    </div>
  );
}

export default function CreateAccountPage() {
  const emailInputText = useSignal('a@a.a');
  const passwordInputText = useSignal('asdfasdf');
  const passwordInputText2 = useSignal('asdfasdf');
  const showMismatchError = useSignal(false);
  const [result, setResult] = useState<CreateAccountResult | -1>();

  const mismatch = computed(
    () =>
      passwordInputText.value.length > 0 &&
      passwordInputText2.value.length > 0 &&
      passwordInputText.value !== passwordInputText2.value,
  );

  const submitButtonDisabled = computed<boolean>(
    () =>
      emailInputText.value.length === 0 ||
      passwordInputText.value.length === 0 ||
      passwordInputText2.value.length === 0,
  );

  const submitLoading = result == -1;

  function onFormSubmit(e: JSX.TargetedSubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (mismatch.value) {
      showMismatchError.value = false;
      return;
    }
    setResult(-1);
    createAccount(emailInputText.value, passwordInputText.value).then((res) => {
      if (res === CreateAccountResult.Success) {
        route('/');
      } else {
        setResult(res);
      }
    });
  }

  const showError = debounce(() => {
    showMismatchError.value = mismatch.value;
  });

  function passwordOnInput(e: JSX.TargetedInputEvent<HTMLInputElement>) {
    passwordInputText.value = e.currentTarget.value;
    if (!mismatch.value) showMismatchError.value = false;
    else showError();
  }

  function clearPassword() {
    passwordInputText.value = '';
    showMismatchError.value = false;
  }

  function passwordOnInput2(e: JSX.TargetedInputEvent<HTMLInputElement>) {
    passwordInputText2.value = e.currentTarget.value;
    if (!mismatch.value) showMismatchError.value = false;
    else showError();
  }

  function clearPassword2() {
    passwordInputText.value = '';
    showMismatchError.value = false;
  }

  return (
    <div id="createaccountpage" class="bg-bg-1 flex h-dvh w-full flex-col text-lg">
      <GenericHeader />
      <div class="flex flex-grow items-center justify-center p-4">
        <div class="bg-bg-0 w-96 max-w-full overflow-x-hidden overflow-y-auto rounded-lg p-10 shadow-md!">
          <h2 class="mb-8 text-3xl font-bold">Create Account</h2>
          <form onSubmit={onFormSubmit}>
            <FormInput
              type="email"
              disabled={submitLoading}
              required
              title="Please enter a valid email address"
              value={emailInputText}
              onInput={(e) => (emailInputText.value = e.currentTarget.value)}
              placeholder="Email"
              onXClicked={() => (emailInputText.value = '')}
              class="mb-8"
            />
            <FormInput
              type="password"
              disabled={submitLoading}
              required
              value={passwordInputText}
              onInput={passwordOnInput}
              onClick={selectContent}
              placeholder="Password"
              onXClicked={clearPassword}
              icon={<LockIcon />}
              class="mb-8"
            />
            <FormInput
              type="password"
              disabled={submitLoading}
              required
              value={passwordInputText2}
              onInput={passwordOnInput2}
              onClick={selectContent}
              placeholder="Confirm Password"
              onXClicked={clearPassword2}
              icon={<LockIcon />}
            />
            <div class="h-8">
              <p hidden={computed(() => !showMismatchError.value)} class="text-fg-error text-sm">
                Passwords do not match
              </p>
            </div>
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
                value="Create"
                class="bg-bg-button hover:not-disabled:bg-bg-button-hover active:not-disabled:bg-bg-button-active disabled:text-fg-disabled h-11 w-full rounded-full not-disabled:cursor-pointer"
              ></input>
            )}
            <ErrorMessage status={result ?? -1} close={() => setResult(undefined)} />
          </form>
        </div>
      </div>
    </div>
  );
}
