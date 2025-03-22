import { computed, useSignal } from '@preact/signals';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
import logIn, { LogInResult } from 'shared/auth/login';
import selectContent from 'shared/misc/selectcontent';
import FormInput from 'src/components/homepage/forminput';
import GenericHeader from 'src/components/homepage/genericheader';
import LockIcon from 'src/components/icons/lockicon';
import LoadingSpinner from 'src/components/loadingspinner/loadingspinner';

export default function LoginPage() {
  const emailInputText = useSignal<string>('');
  const passwordInputText = useSignal<string>('');
  const [result, setResult] = useState<LogInResult | -1>();

  const submitButtonDisabled = computed<boolean>(
    () => emailInputText.value.length == 0 || passwordInputText.value.length == 0,
  );

  const submitLoading = result == -1;

  function onFormSubmit(e: JSX.TargetedSubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setResult(-1);
    logIn(emailInputText.value, passwordInputText.value).then((res) => {
      if (res == LogInResult.Success) {
        route('/');
      } else {
        setResult(res);
      }
    });
  }

  return (
    <div id="loginpage" class="bg-bg-1 flex h-dvh w-full flex-col text-lg">
      <GenericHeader />
      <div class="flex flex-grow items-center justify-center p-4">
        <div class="bg-bg-0 w-96 max-w-full overflow-x-hidden overflow-y-auto rounded-lg p-10 shadow-md!">
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
        </div>
      </div>
    </div>
  );
}
