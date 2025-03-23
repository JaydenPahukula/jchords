import GenericHeader from 'src/components/homepage/genericheader';

export default function LoginPage() {
  return (
    <div id="loginpage" class="bg-bg-1 flex h-dvh w-full flex-col text-lg">
      <GenericHeader />
      <div class="flex flex-grow items-center justify-center p-4">
        {/* <div class="bg-bg-0 w-96 max-w-full overflow-x-hidden overflow-y-auto rounded-lg p-10 shadow-md!">
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
        </div> */}
      </div>
    </div>
  );
}
