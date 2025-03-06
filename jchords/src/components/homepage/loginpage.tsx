import { computed, signal } from '@preact/signals';
import { JSX } from 'preact/jsx-runtime';
import selectContent from 'shared/misc/selectcontent';
import LockIcon from '../icons/lockicon';
import XIcon from '../icons/xicon';
import GenericHeader from './genericheader';

export default function LoginPage() {
  const emailInputText = signal<string>('');
  const passwordInputText = signal<string>('');

  const submitButtonDisabled = computed<boolean>(
    () => emailInputText.value.length == 0 || passwordInputText.value.length == 0,
  );

  function onFormSubmit(e: JSX.TargetedSubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('hi');
  }

  function emailOnInput(e: JSX.TargetedInputEvent<HTMLInputElement>) {
    emailInputText.value = e.currentTarget.value;
  }

  function clearEmailInput() {
    emailInputText.value = '';
  }

  function passwordOnInput(e: JSX.TargetedInputEvent<HTMLInputElement>) {
    passwordInputText.value = e.currentTarget.value;
  }

  function clearPasswordInput() {
    passwordInputText.value = '';
  }

  return (
    <div id="homepage" class="bg-bg-1 flex h-dvh w-full flex-col text-lg">
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
            <div class="border-b-fg-2 has-focus:border-b-fg-0 mb-8 flex w-full items-center border-b-1 border-solid has-focus:border-b-[1.5px]">
              <input
                type="email"
                required
                title="Please enter a valid email address"
                value={emailInputText}
                onInput={emailOnInput}
                placeholder="Email"
                class="peer flex-grow p-0.5 outline-none"
              ></input>
              <div
                onMouseDown={clearEmailInput}
                class="hover:bg-bg-button hidden h-7 w-7 rounded-sm p-1 peer-focus:not-peer-placeholder-shown:block"
              >
                <XIcon />
              </div>
            </div>
            <div class="border-b-fg-2 has-focus:border-b-fg-0 mb-8 flex w-full items-center border-b-1 border-solid has-focus:border-b-[1.5px]">
              <input
                type="password"
                required
                value={passwordInputText}
                onInput={passwordOnInput}
                onClick={selectContent}
                placeholder="Password"
                class="peer flex-grow p-0.5 outline-none"
              ></input>
              <div
                onMouseDown={clearPasswordInput}
                class="hover:bg-bg-button hidden h-7 w-7 rounded-sm p-1 peer-focus:not-peer-placeholder-shown:block"
              >
                <XIcon />
              </div>
              <div class="not-peer-focus:text-fg-1 h-7 w-7 p-1">
                <LockIcon />
              </div>
            </div>
            <input
              disabled={submitButtonDisabled}
              type="submit"
              value="Sign In"
              class="bg-bg-button hover:not-disabled:bg-bg-button-hover active:not-disabled:bg-bg-button-active disabled:text-fg-disabled w-full cursor-pointer rounded-full p-2"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
}
