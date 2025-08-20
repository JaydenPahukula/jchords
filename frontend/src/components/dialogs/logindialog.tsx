import { batch, useComputed, useSignal } from '@preact/signals-react';
import { Box, Button, Flex, Separator, Text } from '@radix-ui/themes';
import { FormEvent, useEffect, useState } from 'react';
import { selectContent } from 'shared/functions/lambdas/selectcontent';
import { CreateAccountDialog } from 'src/components/dialogs/createaccountdialog';
import { GoogleIcon } from 'src/components/icons/googleicon';
import { LockIcon } from 'src/components/icons/lockicon';
import { Dialog } from 'src/components/ui/dialog';
import { TextField } from 'src/components/ui/textfield';
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

export function LoginDialog({ children }: DialogProps) {
  const emailInput = useSignal<string>('');
  const passwordInput = useSignal<string>('');
  const errorState = useSignal<ErrorState>(null);
  const googleLoading = useSignal(false);
  const [open, setOpen] = useState(false);

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
          setOpen(false);
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
          setOpen(false);
          emailInput.value = '';
          passwordInput.value = '';
        }
      });
    });
  }

  // override setTimeout for Firebase polling (WARNING: SUPER JANKY)
  useEffect(() => {
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: any[]): number => {
      if (timeout === 8000) timeout = 1000; // shorten Firebase's default polling delay to 1s
      return originalSetTimeout(handler, timeout, ...args);
    }) as any; // this is to fix type error
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content closeButton>
        <Dialog.Title>Sign In</Dialog.Title>
        <Dialog.Description className="mb-4">
          or{' '}
          <CreateAccountDialog>
            <Text tabIndex={0} className="link">
              create an account
            </Text>
          </CreateAccountDialog>
        </Dialog.Description>
        <form onSubmit={onSubmit}>
          <TextField
            type="email"
            id="login-email-input"
            required
            disabled={submitLoading.value || googleLoading.value}
            title="Please enter a valid email address"
            value={emailInput.value}
            onInput={(e) => (emailInput.value = e.currentTarget.value)}
            placeholder="Email"
            className="mb-5"
            xButton
          />
          <TextField
            type="password"
            id="login-password-input"
            required
            disabled={submitLoading.value || googleLoading.value}
            value={passwordInput.value}
            onInput={(e) => (passwordInput.value = e.currentTarget.value)}
            onClick={selectContent}
            placeholder="Password"
            className="mb-5"
            rightIcon={<LockIcon />}
            xButton
          />
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
      </Dialog.Content>
    </Dialog.Root>
  );
}
