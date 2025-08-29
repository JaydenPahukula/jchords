import { useSignal } from '@preact/signals-react';
import { sendEmailVerification, User } from 'firebase/auth';
import { Button } from 'src/components/ui/button/button';
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
  const state = useSignal<VerifyEmailState>(VerifyEmailState.EmailSent);

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
    <div className="text-green-11 flex items-center gap-1">
      <CheckCircleIcon height="14px" width="14px" />
      Email verified
    </div>
  ) : (
    <div className="mb-4">
      <Button
        variant="primary"
        onClick={verifyEmail}
        loading={state.value === VerifyEmailState.Loading}
        disabled={state.value === VerifyEmailState.Loading}
      >
        <MailIcon />
        Verify Email
      </Button>
      {state.value === VerifyEmailState.EmailSent ? (
        <span className="text-green-11 mt-1 flex items-center gap-1 text-sm">
          <CheckCircleIcon /> Verification email sent
        </span>
      ) : state.value === VerifyEmailState.Error ? (
        <span className="text-red-11 mt-1 text-sm">ERROR</span>
      ) : (
        <></>
      )}
    </div>
  );
}
