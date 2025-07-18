import { batch, useComputed, useSignal } from '@preact/signals-react';
import { Box, Button, Dialog, Flex, Separator, Text } from '@radix-ui/themes';
import { FormEvent, useEffect } from 'react';
import { selectContent } from 'shared/functions/lambdas/selectcontent';
import { GenericDialog } from 'src/components/dialogs/genericdialog';
import { GoogleIcon } from 'src/components/icons/googleicon';
import { LockIcon } from 'src/components/icons/lockicon';
import { TextFieldWithX } from 'src/components/textfieldwithx';
import { DialogType } from 'src/enums/dialogtype';
import { LogInResult } from 'src/enums/loginresult';
import { logIn } from 'src/functions/auth/login';
import { logInWithGoogle } from 'src/functions/auth/loginwithgoogle';
import { DialogProps } from 'src/types/dialog/dialogprops';

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

export function LoginDialog(props: DialogProps) {
  const emailInput = useSignal<string>('');
  const passwordInput = useSignal<string>('');
  const errorState = useSignal<ErrorState>(null);
  const googleLoading = useSignal(false);

  const submitLoading = useComputed(() => errorState.value === 'loading');
  const submitDisabled = useComputed(
    () =>
      submitLoading.value ||
      emailInput.value.length === 0 ||
      passwordInput.value.length === 0 ||
      googleLoading.value,
  );

  const errorMessage = useComputed(() => getErrorMessage(errorState.value));

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    errorState.value = 'loading';
    logIn(emailInput.value, passwordInput.value).then((result) => {
      batch(() => {
        errorState.value = result;
        if (result == LogInResult.Success) {
          props.close();
          emailInput.value = '';
          passwordInput.value = '';
        }
      });
    });
  }

  function signInWithGoogle() {
    googleLoading.value = true;
    logInWithGoogle().then((result) => {
      batch(() => {
        googleLoading.value = false;
        if (result == LogInResult.Success) {
          props.close();
          emailInput.value = '';
          passwordInput.value = '';
        }
      });
    });
  }

  // override setTimeout for Firebase polling
  useEffect(() => {
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: any[]): number => {
      if (timeout === 8000) timeout = 1000; // shorten Firebase's default polling delay to 1s
      return originalSetTimeout(handler, timeout, ...args);
    }) as any; // this is to fix type error
  }, []);

  return (
    <GenericDialog {...props} closeButton>
      <Dialog.Title size="6" mb="1">
        Sign In
      </Dialog.Title>
      <Dialog.Description mb="4">
        or{' '}
        <Text
          tabIndex={0}
          className="link"
          onClick={() => props.changeDialog(DialogType.CreateAccount)}
        >
          create an account
        </Text>
      </Dialog.Description>
      <form onSubmit={onSubmit}>
        <TextFieldWithX
          type="email"
          id="login-email-input"
          required
          disabled={submitLoading.value || googleLoading.value}
          title="Please enter a valid email address"
          value={emailInput.value}
          onInput={(e) => (emailInput.value = e.currentTarget.value)}
          placeholder="Email"
          onXClicked={() => (emailInput.value = '')}
          size="3"
          mb="5"
        />
        <TextFieldWithX
          type="password"
          id="login-password-input"
          required
          disabled={submitLoading.value || googleLoading.value}
          value={passwordInput.value}
          onInput={(e) => (passwordInput.value = e.currentTarget.value)}
          onClick={selectContent}
          placeholder="Password"
          onXClicked={() => (passwordInput.value = '')}
          size="3"
          mb="3"
        >
          <LockIcon />
        </TextFieldWithX>
        <Text size="3" color="red">
          {errorMessage}
        </Text>
        <Box mt="3" width="100%" asChild>
          <Button
            size="3"
            type="submit"
            loading={submitLoading.value}
            variant="surface"
            disabled={submitDisabled.value}
          >
            Sign In
          </Button>
        </Box>
      </form>
      <Flex my="3" align="center">
        <Separator size="4" decorative={true} />
        <Text mx="2">OR</Text>
        <Separator size="4" decorative={true} />
      </Flex>
      <Box width="100%" asChild>
        <Button
          size="3"
          variant="surface"
          onClick={signInWithGoogle}
          loading={googleLoading.value}
          disabled={googleLoading.value || submitLoading.value}
        >
          <GoogleIcon />
          Sign in with Google
        </Button>
      </Box>
    </GenericDialog>
  );
}
