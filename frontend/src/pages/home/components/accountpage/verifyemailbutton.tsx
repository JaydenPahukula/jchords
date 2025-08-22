import { useSignal } from '@preact/signals-react';
import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { sendEmailVerification, User } from 'firebase/auth';
import { CheckCircleIcon } from 'src/components/ui/icons/checkcircleicon';
import { MailIcon } from 'src/components/ui/icons/mailicon';

const enum VerifyEmailState {
  None,
  Loading,
  EmailSent,
  Error,
}

interface VerifyEmailButtonProps {
  user: User;
}

export function VerifyEmailButton(props: VerifyEmailButtonProps) {
  const state = useSignal<VerifyEmailState>(VerifyEmailState.None);

  async function verifyEmail() {
    state.value = VerifyEmailState.Loading;
    await new Promise((resolve) => setTimeout(resolve, 500)); // for UI reasons
    sendEmailVerification(props.user)
      .then(() => {
        state.value = VerifyEmailState.EmailSent;
      })
      .catch((e) => {
        state.value = VerifyEmailState.Error;
        console.error('asdf:', e);
      });
  }

  return props.user.emailVerified ? (
    <Text size="2" color="green" asChild>
      <Flex align="center" gap="1">
        <CheckCircleIcon height="14px" width="14px" />
        Email verified
      </Flex>
    </Text>
  ) : (
    <>
      <Box>
        <Button
          onClick={verifyEmail}
          loading={state.value === VerifyEmailState.Loading}
          disabled={state.value === VerifyEmailState.Loading}
        >
          <MailIcon />
          Verify Email
        </Button>
      </Box>
      {state.value === VerifyEmailState.EmailSent ? (
        <Text size="2" color="green">
          Verification email sent
        </Text>
      ) : state.value === VerifyEmailState.Error ? (
        <Text size="2" color="red">
          ERROR
        </Text>
      ) : (
        <></>
      )}
    </>
  );
}
